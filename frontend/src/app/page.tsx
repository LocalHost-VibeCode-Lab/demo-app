'use client';
import { useEffect, useState } from 'react';
const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
export default function Home() {
  const [items, setItems] = useState<any[]>([]);
  useEffect(() => { fetch(`${API}/api/items`).then(r => r.json()).then(setItems); }, []);
  return <main style={{ maxWidth: 600, margin: '60px auto', padding: '0 16px' }}>
    <h1>demo-app</h1>
    <ul>{items.map(i => <li key={i.id}>{i.title}</li>)}</ul>
  </main>;
}
