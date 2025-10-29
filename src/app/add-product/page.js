'use client';

import { useSalesStore } from '@/store/salesStore';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AddProduct() {
  const { addProduct } = useSalesStore();
  const router = useRouter();
  
  const [name, setName] = useState('');
  const [sellingPrice, setSellingPrice] = useState('');
  const [quantitySold, setQuantitySold] = useState('0');
  
  const formatRupiah = (value) => {
    return `Rp ${(value || 0).toLocaleString('id-ID')}`;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!name.trim()) {
      alert('Please enter a product name');
      return;
    }
    
    if (!sellingPrice || parseFloat(sellingPrice) < 0) {
      alert('Please enter a valid selling price');
      return;
    }
    
    const newProduct = {
      id: Date.now().toString(),
      name: name.trim(),
      sellingPrice: parseFloat(sellingPrice),
      quantitySold: parseInt(quantitySold) || 0,
    };
    
    addProduct(newProduct);
    router.push('/');
  };
  
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background)', padding: '16px' }}>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px',
          marginBottom: '24px',
          backgroundColor: 'var(--card-bg)',
          padding: '12px 8px',
          borderBottom: '1px solid var(--border)'
        }}>
          <Link 
            href="/"
            style={{
              padding: '8px',
              textDecoration: 'none',
              fontSize: '28px',
              color: 'var(--text)',
              lineHeight: '1'
            }}
          >
            ‹
          </Link>
          <h1 style={{ 
            flex: 1,
            fontSize: '18px', 
            fontWeight: '600',
            color: 'var(--text)',
            margin: '0 8px'
          }}>
            Add New Product
          </h1>
          <div style={{ width: '44px' }}></div>
        </div>
        
        {/* Form */}
        <form onSubmit={handleSubmit} style={{ paddingBottom: '32px' }}>
          <div style={{
            backgroundColor: 'var(--card-bg)',
            borderRadius: '12px',
            padding: '20px',
            border: '1px solid var(--border)',
            marginBottom: '20px'
          }}>
            {/* Product Name */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ 
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                color: 'var(--text)',
                marginBottom: '8px'
              }}>
                Product Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter product name"
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid var(--border)',
                  backgroundColor: 'var(--background)',
                  color: 'var(--text)',
                  fontSize: '16px'
                }}
              />
            </div>
            
            {/* Selling Price */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ 
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                color: 'var(--text)',
                marginBottom: '8px'
              }}>
                Price (Rp)
              </label>
              <input
                type="number"
                value={sellingPrice}
                onChange={(e) => setSellingPrice(e.target.value)}
                placeholder="Enter price in Rupiah"
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid var(--border)',
                  backgroundColor: 'var(--background)',
                  color: 'var(--text)',
                  fontSize: '16px'
                }}
              />
            </div>
            
            {/* Initial Quantity */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ 
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                color: 'var(--text)',
                marginBottom: '8px'
              }}>
                Initial Quantity Sold
              </label>
              <input
                type="number"
                value={quantitySold}
                onChange={(e) => setQuantitySold(e.target.value)}
                placeholder="0"
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid var(--border)',
                  backgroundColor: 'var(--background)',
                  color: 'var(--text)',
                  fontSize: '16px'
                }}
              />
            </div>
            
            {/* Price Preview */}
            <div style={{
              padding: '16px',
              borderRadius: '8px',
              backgroundColor: 'var(--background)',
              textAlign: 'center'
            }}>
              <div style={{ 
                fontSize: '12px',
                fontWeight: '500',
                color: 'var(--text-secondary)',
                marginBottom: '8px',
                textTransform: 'uppercase'
              }}>
                Price Per Unit
              </div>
              <div style={{ 
                fontSize: '24px',
                fontWeight: 'bold',
                color: 'var(--success)'
              }}>
                {formatRupiah(parseFloat(sellingPrice) || 0)}
              </div>
            </div>
          </div>
          
          {/* Submit Button */}
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: '8px',
              backgroundColor: 'var(--primary)',
              color: '#ffffff',
              fontSize: '16px',
              fontWeight: '600',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}