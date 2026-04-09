'use client';
import { useEffect, useState } from 'react';
const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4001';

export default function Home() {
  const [items, setItems] = useState<any[]>([]);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  useEffect(() => { fetch(`${API}/api/items`).then(r => r.json()).then(setItems); }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch(`${API}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus('sent');
      setForm({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }
  }

  const inputStyle: React.CSSProperties = {
    display: 'block', width: '100%', padding: '8px', marginTop: 4,
    marginBottom: 12, boxSizing: 'border-box', fontSize: 14,
    border: '1px solid #ccc', borderRadius: 4,
  };

  return (
    <main style={{ maxWidth: 600, margin: '60px auto', padding: '0 16px' }}>
      <h1>demo-app</h1>
      <ul>{items.map(i => <li key={i.id}>{i.title}</li>)}</ul>

      <h2 style={{ marginTop: 40 }}>Contact</h2>
      {status === 'sent' ? (
        <p style={{ color: 'green' }}>Message sent! We'll be in touch.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>Name
            <input style={inputStyle} value={form.name} required
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
          </label>
          <label>Email
            <input style={inputStyle} type="email" value={form.email} required
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
          </label>
          <label>Message
            <textarea style={{ ...inputStyle, height: 100, resize: 'vertical' }} value={form.message} required
              onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
          </label>
          {status === 'error' && <p style={{ color: 'red' }}>Something went wrong. Please try again.</p>}
          <button type="submit" disabled={status === 'sending'}
            style={{ padding: '8px 20px', fontSize: 14, cursor: 'pointer' }}>
            {status === 'sending' ? 'Sending…' : 'Send'}
          </button>
        </form>
      )}
    </main>
  );
}
