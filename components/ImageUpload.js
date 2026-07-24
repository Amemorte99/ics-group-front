// components/ImageUpload.js
import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

export default function ImageUpload({ 
  onUpload, 
  currentImage, 
  label = "Image",
  folder = "general",
  multiple = false,
  onMultipleUpload = null,
  existingImages = []
}) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(currentImage || null);
  const [error, setError] = useState('');
  const [uploadedImages, setUploadedImages] = useState(existingImages || []);

  const onDrop = useCallback(async (acceptedFiles) => {
    if (acceptedFiles.length === 0) return;

    setUploading(true);
    setError('');

    try {
      const files = multiple ? acceptedFiles : [acceptedFiles[0]];
      const uploadedUrls = [];

      for (const file of files) {
        // Vérifier la taille
        if (file.size > 5 * 1024 * 1024) {
          setError(`Le fichier ${file.name} est trop volumineux (max 5MB)`);
          setUploading(false);
          return;
        }

        // Vérifier le type
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
        if (!allowedTypes.includes(file.type)) {
          setError(`Format de fichier non supporté: ${file.name}`);
          setUploading(false);
          return;
        }

        const formData = new FormData();
        formData.append('file', file);

        const token = localStorage.getItem('adminToken');
        
        if (!token) {
          setError('Vous devez être connecté');
          setUploading(false);
          return;
        }

        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.icsolution.fr/api';
        
        const response = await axios.post(`${API_URL}/upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.data && response.data.url) {
          uploadedUrls.push(response.data.url);
        }
      }

      // Gérer les différents cas d'upload
      if (multiple && onMultipleUpload) {
        // Upload multiple
        const newImages = [...uploadedImages, ...uploadedUrls];
        setUploadedImages(newImages);
        onMultipleUpload(newImages);
        setPreview(null);
      } else if (!multiple) {
        // Upload simple
        if (uploadedUrls.length > 0) {
          setPreview(uploadedUrls[0]);
          if (onUpload) {
            onUpload(uploadedUrls[0]);
          }
        }
      }
      
      setError('');

    } catch (err) {
      console.error('❌ Upload error:', err);
      if (err.response?.status === 401) {
        setError('Session expirée, veuillez vous reconnecter');
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Erreur lors de l\'upload de l\'image');
      }
    } finally {
      setUploading(false);
    }
  }, [onUpload, onMultipleUpload, multiple, uploadedImages]);

  const removeImage = (index) => {
    if (multiple && onMultipleUpload) {
      const newImages = uploadedImages.filter((_, i) => i !== index);
      setUploadedImages(newImages);
      onMultipleUpload(newImages);
    } else {
      setPreview(null);
      if (onUpload) {
        onUpload(null);
      }
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp', '.svg']
    },
    maxSize: 5 * 1024 * 1024,
    multiple: multiple,
  });

  return (
    <div className="image-upload-container">
      {/* Upload dropzone */}
      <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''} ${uploading ? 'uploading' : ''}`}>
        <input {...getInputProps()} />
        <div className="dropzone-content">
          {uploading ? (
            <>
              <div className="spinner"></div>
              <p>Upload en cours...</p>
            </>
          ) : (
            <>
              <span className="dropzone-icon">📤</span>
              <p className="dropzone-text">
                {isDragActive 
                  ? 'Déposez les fichiers ici...' 
                  : `Glissez-déposez une image ici, ou cliquez pour sélectionner`}
              </p>
              <p className="dropzone-hint">Formats: JPG, PNG, GIF, WebP, SVG (max 5MB)</p>
            </>
          )}
        </div>
      </div>

      {error && <p className="error-message">{error}</p>}

      {/* Image principale */}
      {!multiple && preview && (
        <div className="image-preview-wrapper">
          <div className="image-preview">
            <img src={preview} alt="Aperçu" style={{ maxHeight: '200px', objectFit: 'contain' }} />
            <div className="image-actions">
              <button type="button" className="btn-change" onClick={() => {
                setPreview(null);
                if (onUpload) onUpload(null);
              }}>
                🔄 Changer
              </button>
              <button type="button" className="btn-remove" onClick={() => {
                setPreview(null);
                if (onUpload) onUpload(null);
              }}>
                🗑️ Supprimer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Images multiples */}
      {multiple && uploadedImages.length > 0 && (
        <div className="multiple-images-preview">
          <div className="row g-2">
            {uploadedImages.map((url, index) => (
              <div key={index} className="col-4">
                <div className="image-preview-mini">
                  <img src={url} alt={`Image ${index + 1}`} />
                  <button 
                    type="button" 
                    className="btn-remove-mini"
                    onClick={() => removeImage(index)}
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <style jsx>{`
        .image-upload-container { 
          width: 100%; 
        }

        .dropzone {
          border: 2px dashed #d0d2d8;
          border-radius: 12px;
          padding: 30px 20px;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
          background: #f8f9fb;
          margin-bottom: 12px;
        }

        .dropzone:hover { 
          border-color: #4CAF50; 
          background: #f0f7f0; 
        }

        .dropzone.active { 
          border-color: #4CAF50; 
          background: #e8f5e9; 
        }

        .dropzone.uploading { 
          opacity: 0.6; 
          cursor: wait; 
        }

        .dropzone-content { 
          display: flex; 
          flex-direction: column; 
          align-items: center; 
          gap: 8px; 
        }

        .dropzone-icon { 
          font-size: 40px; 
        }

        .dropzone-text { 
          font-size: 14px; 
          color: #4a4d5e; 
          margin: 0; 
        }

        .dropzone-hint { 
          font-size: 12px; 
          color: #8c8f9c; 
          margin: 0; 
        }

        .error-message { 
          color: #EF5350; 
          font-size: 13px; 
          margin-top: 8px; 
        }

        .image-preview-wrapper {
          margin-top: 12px;
        }

        .image-preview {
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid #eef0f2;
          padding: 10px;
          background: #f8f9fb;
        }

        .image-preview img { 
          width: 100%; 
          max-height: 200px; 
          object-fit: contain; 
        }

        .image-actions {
          display: flex; 
          gap: 8px; 
          padding: 10px;
          justify-content: center; 
          border-top: 1px solid #eef0f2;
          background: #fff;
        }

        .btn-change, .btn-remove {
          padding: 6px 16px; 
          border: none; 
          border-radius: 6px;
          font-size: 13px; 
          font-weight: 500; 
          cursor: pointer; 
          transition: all 0.3s ease;
        }

        .btn-change { 
          background: #E8F5E9; 
          color: #1B5E20; 
        }

        .btn-change:hover { 
          background: #C8E6C9; 
        }

        .btn-remove { 
          background: #FFEBEE; 
          color: #C62828; 
        }

        .btn-remove:hover { 
          background: #FFCDD2; 
        }

        .multiple-images-preview {
          margin-top: 12px;
        }

        .image-preview-mini {
          position: relative;
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid #eef0f2;
          background: #f8f9fb;
          aspect-ratio: 1;
        }

        .image-preview-mini img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .btn-remove-mini {
          position: absolute;
          top: 4px;
          right: 4px;
          width: 24px;
          height: 24px;
          border: none;
          border-radius: 50%;
          background: rgba(239, 83, 80, 0.9);
          color: #fff;
          cursor: pointer;
          font-size: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .btn-remove-mini:hover {
          background: #EF5350;
          transform: scale(1.1);
        }

        .spinner {
          width: 40px; 
          height: 40px;
          border: 3px solid #eef0f2; 
          border-top-color: #4CAF50;
          border-radius: 50%; 
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin { 
          to { transform: rotate(360deg); } 
        }
      `}</style>
    </div>
  );
}