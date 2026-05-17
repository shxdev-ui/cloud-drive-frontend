// src/App.js

import React, { useState, useEffect } from 'react';
import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import FileManager from './components/Filemanager';
import Dashboard from './components/Dashboard';

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID,
      userPoolClientId: process.env.REACT_APP_COGNITO_CLIENT_ID,
      region: process.env.REACT_APP_AWS_REGION,
    }
  }
});

export default function App() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <div style={{ fontFamily: 'Inter, sans-serif', minHeight: '100vh', background: '#f8f9fa' }}>
          <nav style={{
            background: '#fff', borderBottom: '1px solid #e0e0e0',
            padding: '12px 24px', display: 'flex',
            justifyContent: 'space-between', alignItems: 'center'
          }}>
            <h1 style={{ margin: 0, fontSize: '20px', color: '#1a73e8' }}>☁️ CloudDrive</h1>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <span style={{ fontSize: '14px', color: '#666' }}>{user?.signInDetails?.loginId}</span>
              <button onClick={signOut} style={{
                padding: '6px 16px', borderRadius: '6px',
                border: '1px solid #ccc', background: '#fff',
                cursor: 'pointer', fontSize: '13px'
              }}>Sign out</button>
            </div>
          </nav>
          <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '24px' }}>
            <Dashboard user={user} />
            <FileManager user={user} />
          </div>
        </div>
      )}
    </Authenticator>
  );
}