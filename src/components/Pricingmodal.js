// src/components/PricingModal.js

import React, { useState } from 'react';
import axios from 'axios';
import { fetchAuthSession } from 'aws-amplify/auth';

const API = process.env.REACT_APP_API_URL;

export default function PricingModal({ onClose, onUpgraded }) {
  const [loading, setLoading] = useState('');

  async function handleSubscribe(plan) {
    setLoading(plan);
    try {
      const session = await fetchAuthSession();
      const token = session.tokens?.idToken?.toString();

      // Get subscription details from our server
      const res = await axios.post(`${API}/payments/subscribe`,
        { plan },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const { subscriptionId, razorpayKeyId } = res.data;

      // Open Razorpay checkout
      const options = {
        key: razorpayKeyId,
        subscription_id: subscriptionId,
        name: 'CloudDrive',
        description: `${plan === 'pro' ? 'Pro (100GB)' : 'Power (1TB)'} Plan`,
        handler: async function(response) {
          // Payment successful — verify with our server
          await axios.post(`${API}/payments/verify`,
            { ...response, plan },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          alert('🎉 Upgrade successful! Your storage has been increased.');
          onUpgraded();
          onClose();
        },
        prefill: { email: session.tokens?.idToken?.payload?.email },
        theme: { color: '#1a73e8' }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      alert('Could not start payment. Please try again.');
    }
    setLoading('');
  }

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
      <div style={{ background: '#fff', borderRadius: '16px', padding: '32px', maxWidth: '600px', width: '90%' }}>
        <h2 style={{ marginTop: 0 }}>Upgrade your plan</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
          {[
            { plan: 'pro', name: 'Pro', price: '₹199/mo', storage: '100 GB', features: ['File versioning', 'Shareable links', 'Priority support'] },
            { plan: 'power', name: 'Power', price: '₹599/mo', storage: '1 TB', features: ['Everything in Pro', 'Up to 10GB per file', 'Custom domain'] }
          ].map(({ plan, name, price, storage, features }) => (
            <div key={plan} style={{ border: '2px solid #e0e0e0', borderRadius: '12px', padding: '20px', textAlign: 'center' }}>
              <h3 style={{ margin: '0 0 4px' }}>{name}</h3>
              <div style={{ fontSize: '24px', fontWeight: '600', color: '#1a73e8', margin: '8px 0' }}>{price}</div>
              <div style={{ fontSize: '14px', color: '#666', marginBottom: '16px' }}>{storage} storage</div>
              <ul style={{ textAlign: 'left', paddingLeft: '16px', fontSize: '13px', color: '#444', marginBottom: '16px' }}>
                {features.map(f => <li key={f}>{f}</li>)}
              </ul>
              <button
                onClick={() => handleSubscribe(plan)}
                disabled={loading === plan}
                style={{ width: '100%', padding: '10px', background: '#1a73e8', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px' }}>
                {loading === plan ? 'Processing...' : `Get ${name}`}
              </button>
            </div>
          ))}
        </div>
        <button onClick={onClose} style={{ width: '100%', padding: '10px', background: '#fff', border: '1px solid #ccc', borderRadius: '8px', cursor: 'pointer' }}>
          Maybe later
        </button>
      </div>
    </div>
  );
}