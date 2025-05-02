import React, { useState } from 'react';
import { useDropzone, DropzoneOptions, FileWithPath, Accept } from 'react-dropzone';
import axios from 'axios';

interface PhotoUploadProps {
  onUpload: (file: any) => void;
  setIsLoading: (file: any) => void;
}

const PhotoUpload: React.FC<PhotoUploadProps> = ({ onUpload,setIsLoading }) => {
  const [preview, setPreview] = useState<string | null>(null);

  const onDrop = async (acceptedFiles: FileWithPath[]) => {
    const file = acceptedFiles[0];
    setPreview(URL.createObjectURL(file)); // Show preview
  
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'my-upload-preset'); // <-- must match your Cloudinary config
  
    try {
        setIsLoading(true)
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/du2nkzxdu/image/upload',
        formData
      );
  
      console.log('Uploaded to Cloudinary:', response.data.secure_url);
      onUpload(response.data.secure_url); // Use this for try-on
    } catch (error) {
      console.error('Upload to Cloudinary failed:', error);
    } finally {
      setIsLoading(false); // Set loading to false after upload attempt
    }
  };
  
  

  const acceptTypes: Accept = {
    'image/png': ['.png'],
    'image/jpeg': ['.jpg', '.jpeg'],
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: acceptTypes,
  } as DropzoneOptions);

  return (
    <div
  {...getRootProps()}
  className="mt-5 upload-area border p-5 rounded mb-4 d-flex justify-content-center align-items-center flex-column"
  style={{
    background: 'linear-gradient(45deg, #6a11cb 0%, #2575fc 100%)',
    cursor: 'pointer',
    transition: 'transform 0.3s ease-in-out',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    border: '2px dashed #fff',
    maxWidth: '400px',
    margin: 'auto',
  }}
>
  <input {...getInputProps()} />
  {preview ? (
    <div className="preview-container">
      <img
        src={preview}
        alt="Uploaded preview"
        className="img-fluid rounded mb-3"
        style={{ maxWidth: '100%', maxHeight: '200px' }}
      />
    </div>
  ) : (
    <div className="text-center text-white" style={{ fontSize: '1.2em', fontWeight: 'bold' }}>
      <p>Drag and drop a photo or click to upload</p>
      <p style={{ fontSize: '1em', fontWeight: 'normal' }}>
        Please upload a clear photo of yourself so we can suggest the best looks. Follow these guidelines:
      </p>
      <ul style={{ listStyle: 'none', padding: 0, fontSize: '1em', fontWeight: 'normal' }}>
        <li>✅ Face to knees (or full body) should be visible</li>
        <li>✅ Use a plain, distraction-free background</li>
        <li>✅ Good lighting helps a lot</li>
        <li>✅ No filters</li>
      </ul>
      <p className="mt-3" style={{ fontSize: '0.9em', fontWeight: 'normal' }}>
        These suggestions will help the dress fit naturally in the virtual try-on!
      </p>
    </div>
  )}
</div>

  );
};

export default PhotoUpload;
