// components/ImageUpload.js
import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

export default function ImageUpload({ 
  onUpload, 
  currentImage, 
  label = "Image",
  folder = "general",
  multiple = false
}) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(currentImage || null);
  const [error, setError] = useState('');

  const onDrop = useCallback(async (acceptedFiles) => {
    if (acceptedFiles.length === 0) return;

    setUploading(true);
    setError('');

    try {
      const formData = new FormData();
      
      if (multiple) {
        acceptedFiles.forEach(file => {
          formData.append('files', file);
        });
      } else {
        formData.append('file', acceptedFiles[0]);
      }

      const token = localStorage.getItem('adminToken');
      const endpoint = multiple 
        ? `${process.env.NEXT_PUBLIC_API_URL}/upload/multiple`
        : `${process.env.NEXT_PUBLIC_API_URL}/upload`;

      const response = await axios.post(endpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      const imageUrls = multiple ? response.data : [response.data.url];
      
      // Prévisualisation
      if (!multiple) {
        setPreview(response.data.url);
      }

      if (onUpload) {
        onUpload(multiple ? imageUrls : imageUrls[0]);
      }

    } catch (err) {
      console.error('Upload error:', err);
      setError('Erreur lors de l\'upload de l\'image');
    } finally {
      setUploading(false);
    }
  }, [onUpload, multiple]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp', '.svg']
    },
    maxSize: 5 * 1024 * 1024, // 5MB
    multiple: multiple,
  });

  const removeImage = () => {
    setPreview(null);
    if (onUpload) {
      onUpload(null);
    }
  };

  return (
    <div className="image-upload-container">
      {preview ? (
        <div className="image-preview-wrapper">
          <div className="image-preview">
            <img src={preview} alt="Aperçu" />
            <div className="image-actions">
              <button 
                type="button"
                className="btn-change"
                onClick={() => setPreview(null)}
              >
                🔄 Changer
              </button>
              <button 
                type="button"
                className="btn-remove"
                onClick={removeImage}
              >
                🗑️ Supprimer
              </button>
            </div>
          </div>
          {error && <p className="error-message">{error}</p>}
        </div>
      ) : (
        <div 
          {...getRootProps()} 
          className={`dropzone ${isDragActive ? 'active' : ''} ${uploading ? 'uploading' : ''}`}
        >
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
                    : `Glissez-déposez ${multiple ? 'vos images' : 'une image'} ici, ou cliquez pour sélectionner`}
                </p>
                <p className="dropzone-hint">Formats: JPG, PNG, GIF, WebP, SVG (max 5MB)</p>
              </>
            )}
          </div>
        </div>
      )}
      {error && !preview && <p className="error-message">{error}</p>}

      <style jsx>{`
        .image-upload-container {
          width: 100%;
        }

        .dropzone {
          border: 2px dashed #d0d2d8;
          border-radius: 12px;
          padding: 40px 20px;
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
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        .dropzone-icon {
          font-size: 48px;
        }

        .dropzone-text {
          font-size: 16px;
          color: #4a4d5e;
          margin: 0;
        }

        .dropzone-hint {
          font-size: 13px;
          color: #8c8f9c;
          margin: 0;
        }

        .image-preview-wrapper {
          position: relative;
        }

        .image-preview {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid #eef0f2;
          background: #f8f9fb;
        }

        .image-preview img {
          width: 100%;
          max-height: 300px;
          object-fit: contain;
          display: block;
        }

        .image-actions {
          display: flex;
          gap: 8px;
          padding: 12px;
          background: rgba(255,255,255,0.95);
          justify-content: center;
          border-top: 1px solid #eef0f2;
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

        .error-message {
          color: #EF5350;
          font-size: 13px;
          margin-top: 8px;
        }
      `}</style>
    </div>
  );
}