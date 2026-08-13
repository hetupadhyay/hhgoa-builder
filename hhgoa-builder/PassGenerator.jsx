'use client';

import React, { useState, useEffect, useRef } from 'react';

const ADJECTIVES = [
  "Terminal-Dwelling", "Ocean-Coded", "Midnight-Shipping", "Fiber-Fueled", "Sun-Soaked",
  "Zero-Sleep", "Wave-Riding", "Espresso-Powered", "Sandbox-Breaking", "Signal-Chasing",
  "Salt-Air", "Coconut-Fueled", "Merge-Conflict", "Beachside", "Gas-Optimized", "Prod-Breaker"
];

const ROLE_NOUNS = {
  "Full-Stack": "Stack Slinger", "Frontend": "Pixel Whisperer", "Backend": "API Alchemist",
  "ML/AI": "Model Whisperer", "Design": "Interface Architect", "Product": "Roadmap Rebel",
  "DevOps": "Uptime Guardian", "Mobile": "Thumb-Zone Tactician", "Blockchain": "Ledger Loremaster"
};

const CLASSES = [
  { name: "GENESIS", tag: "where it all begins" },
  { name: "TRIANGLE", tag: "problem · solution · market" },
  { name: "BUILD", tag: "heads down, ship or ship" },
  { name: "LAUNCH", tag: "the world watches" }
];

export default function PassGenerator() {
  const [name, setName] = useState('');
  const [role, setRole] = useState('Full-Stack');
  const [seed, setSeed] = useState(Math.random());
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({ scale: 1, rotate: 0, tx: 0, ty: 0 });
  const canvasRef = useRef(null);

  useEffect(() => {
    renderCanvas();
  }, [name, role, seed, image, crop]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        setImage(img);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const renderCanvas = () => {
    const cvs = canvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext('2d');
    const CW = cvs.width;
    const CH = cvs.height;

    ctx.clearRect(0, 0, CW, CH);

    // Forest green gradient
    const grad = ctx.createRadialGradient(CW/2, CH*0.35, 100, CW/2, CH*0.5, CH*0.9);
    grad.addColorStop(0, '#0B6839');
    grad.addColorStop(1, '#064023');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, CW, CH);

    // Dotted border
    ctx.fillStyle = '#FEE101';
    for (let x = 30; x < CW - 30; x += 22) {
      ctx.fillRect(x, 26, 10, 4);
      ctx.fillRect(x, CH - 30, 10, 4);
    }

    // Top Bar
    ctx.fillStyle = '#FEE101';
    ctx.font = "700 24px monospace";
    ctx.fillText('HH GOA 2026', 60, 90);

    // Photo Box
    const photoSize = 740;
    const px = CW / 2 - photoSize / 2;
    const py = 150;

    ctx.strokeStyle = '#FEE101';
    ctx.lineWidth = 4;
    ctx.strokeRect(px - 4, py - 4, photoSize + 8, photoSize + 8);

    if (image) {
      ctx.save();
      ctx.beginPath();
      ctx.rect(px, py, photoSize, photoSize);
      ctx.clip();
      ctx.drawImage(image, px, py, photoSize, photoSize);
      ctx.restore();
    }

    // Name
    ctx.textAlign = 'center';
    ctx.fillStyle = '#FEE101';
    ctx.font = "900 80px serif";
    ctx.fillText((name || 'BUILDER').toUpperCase(), CW / 2, py + photoSize + 90);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', padding: '30px' }}>
      <div style={{ background: 'rgba(6,64,35,0.8)', padding: '24px', borderRadius: '16px', color: '#fff' }}>
        <h2>HH GOA 2026 Pass Generator</h2>
        <div style={{ marginTop: '15px' }}>
          <label>Photo</label>
          <input type="file" onChange={handleFileUpload} accept="image/*" />
        </div>
        <div style={{ marginTop: '15px' }}>
          <label>Name</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)}
            style={{ width: '100%', padding: '10px', marginTop: '5px' }}
          />
        </div>
      </div>
      <div>
        <canvas ref={canvasRef} width={1080} height={1350} style={{ width: '100%', borderRadius: '16px' }} />
      </div>
    </div>
  );
}
