// components/ImageUploadSimple.js
import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

export default function ImageUploadSimple({ onUploadComplete, existingImages = [] }) {
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState(existingImages || []);
  const [error, setError] = useState('');

  const onDrop = useCallback(async (acceptedFiles) => {
    if (acceptedFiles.length === 0) return;

    setUploading(true);
    setError('');

    try {
      const uploadedUrls = [];

      for (const file of acceptedFiles) {
        if (file.size > 5 * 1024 * 1024) {
          setError(`Le fichier ${file.name} est trop volumineux (max 5MB)`);
          setUploading(false);
          return;
        }

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

      const newImages = [...images, ...uploadedUrls];
      setImages(newImages);
      if (onUploadComplete) {
        onUploadComplete(newImages);
      }
      setError('');

    } catch (err) {
      console.error('❌ Upload error:', err);
      setError('Erreur lors de l\'upload de l\'image');
    } finally {
      setUploading(false);
    }
  }, [images, onUploadComplete]);

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    if (onUploadComplete) {
      onUploadComplete(newImages);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp', '.svg']
    },
    maxSize: 5 * 1024 * 1024,
    multiple: true,
  });

  return (
    <div className="image-upload-simple">
      <div className="dropzone-wrapper">
        <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''} ${uploading ? 'uploading' : ''}`}>
          <input {...getInputProps()} />
          <div className="dropzone-content">
            {uploading ? (
              <div className="spinner"></div>
            ) : (
              <>
                <span className="icon">📤</span>
                <p>Glissez-déposez ou cliquez pour ajouter des images</p>
              </>
            )}
          </div>
        </div>
      </div>

      {error && <p className="error">{error}</p>}

      {images.length > 0 && (
        <div className="images-grid">
          {images.map((url, index) => (
            <div key={index} className="image-item">
              <img src={url} alt={`Image ${index + 1}`} />
              <button type="button" className="remove-btn" onClick={() => removeImage(index)}>
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        .image-upload-simple {
          width: 100%;
        }

        .dropzone-wrapper {
          margin-bottom: 12px;
        }

        .dropzone {
          border: 2px dashed #d0d2d8;
          border-radius: 12px;
          padding: 24px;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
          background: #f8f9fb;
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
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .icon {
          font-size: 28px;
        }

        .spinner {
          width: 30px;
          height: 30px;
          border: 3px solid #eef0f2;
          border-top-color: #4CAF50;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .error {
          color: #EF5350;
          font-size: 13px;
          margin-top: 8px;
        }

        .images-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
          gap: 10px;
          margin-top: 12px;
        }

        .image-item {
          position: relative;
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid #eef0f2;
          background: #f8f9fb;
          aspect-ratio: 1;
        }

        .image-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .remove-btn {
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

        .remove-btn:hover {
          background: #EF5350;
          transform: scale(1.1);
        }
      `}</style>
    </div>
  );
}