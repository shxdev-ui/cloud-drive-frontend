// src/components/FileManager.js

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { fetchAuthSession } from 'aws-amplify/auth';

const API = process.env.REACT_APP_API_URL;

async function getToken() {
  const session = await fetchAuthSession();
  return session.tokens?.idToken?.toString();
}

export default function FileManager() {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState('');
  const fileInput = useRef();

  useEffect(() => { loadFiles(); }, []);

  async function loadFiles() {
    try {
      const token = await getToken();
      const res = await axios.get(`${API}/files`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFiles(res.data.filter(f => f.status === 'ready'));
    } catch (err) {
      setError('Could not load files');
    }
  }

  async function handleUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setError('');

    try {
      const token = await getToken();

      // Step 1: Get a pre-signed upload URL from our server
      const urlRes = await axios.get(`${API}/files/upload-url`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { filename: file.name, filesize: file.size }
      });

      const { url, fields, fileKey } = urlRes.data;

      // Step 2: Upload directly to S3 using the pre-signed URL
      const formData = new FormData();
      Object.entries(fields).forEach(([k, v]) => formData.append(k, v));
      formData.append('file', file);

      await axios.post(url, formData, {
        onUploadProgress: (e) => {
          setUploadProgress(Math.round((e.loaded / e.total) * 100));
        }
      });

      // Step 3: Tell our server the upload is complete
      await axios.post(`${API}/files/confirm-upload`,
        { fileKey, fileSize: file.size },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUploadProgress(0);
      loadFiles();
    } catch (err) {
      setError(err.response?.data?.message || 'Upload failed. Check your storage limit.');
    } finally {
      setUploading(false);
      fileInput.current.value = '';
    }
  }

  async function handleDownload(file) {
    const token = await getToken();
    const res = await axios.get(`${API}/files/download-url`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { fileKey: file.fileKey }
    });
    window.open(res.data.url, '_blank');
  }

  async function handleDelete(file) {
    if (!window.confirm(`Delete ${file.fileName}?`)) return;
    const token = await getToken();
    await axios.delete(`${API}/files`, {
      headers: { Authorization: `Bearer ${token}` },
      data: { fileKey: file.fileKey, fileSize: file.fileSize }
    });
    loadFiles();
  }

  function formatSize(bytes) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
  }

  return (
    <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e0e0e0', padding: '24px', marginTop: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ margin: 0, fontSize: '18px' }}>My Files</h2>
        <label style={{
          padding: '8px 20px', background: '#1a73e8', color: '#fff',
          borderRadius: '8px', cursor: 'pointer', fontSize: '14px'
        }}>
          {uploading ? `Uploading ${uploadProgress}%...` : '+ Upload File'}
          <input ref={fileInput} type="file" style={{ display: 'none' }} onChange={handleUpload} disabled={uploading} />
        </label>
      </div>

      {error && (
        <div style={{ background: '#fce8e6', color: '#c5221f', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontSize: '14px' }}>
          {error}
        </div>
      )}

      {files.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px', color: '#999' }}>
          <div style={{ fontSize: '48px' }}>📂</div>
          <p>No files yet. Upload your first file!</p>
        </div>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #e0e0e0', color: '#666', textAlign: 'left' }}>
              <th style={{ padding: '8px 12px' }}>Name</th>
              <th style={{ padding: '8px 12px' }}>Size</th>
              <th style={{ padding: '8px 12px' }}>Uploaded</th>
              <th style={{ padding: '8px 12px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {files.map(file => (
              <tr key={file.fileKey} style={{ borderBottom: '1px solid #f0f0f0' }}>
                <td style={{ padding: '10px 12px' }}>📄 {file.fileName}</td>
                <td style={{ padding: '10px 12px', color: '#666' }}>{formatSize(file.fileSize)}</td>
                <td style={{ padding: '10px 12px', color: '#666' }}>{new Date(file.uploadedAt).toLocaleDateString('en-IN')}</td>
                <td style={{ padding: '10px 12px' }}>
                  <button onClick={() => handleDownload(file)} style={{ marginRight: '8px', padding: '4px 12px', borderRadius: '6px', border: '1px solid #1a73e8', color: '#1a73e8', background: '#fff', cursor: 'pointer', fontSize: '12px' }}>Download</button>
                  <button onClick={() => handleDelete(file)} style={{ padding: '4px 12px', borderRadius: '6px', border: '1px solid #ea4335', color: '#ea4335', background: '#fff', cursor: 'pointer', fontSize: '12px' }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}