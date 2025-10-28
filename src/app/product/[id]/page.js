'use client';

import { useSalesStore } from '@/store/salesStore';
import { useState, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ProductDetails({ params }) {
  // Unwrap the params Promise
  const unwrappedParams = use(params);
  const productId = unwrappedParams.id;
  
  const { products, updateProduct, deleteProduct } = useSalesStore();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  
  const product = products.find(p => p.id === productId);
  
  const formatRupiah = (value) => {
    return `Rp ${(value || 0).toLocaleString('id-ID')}`;
  };
  
  if (!product) {
    return (
      <div className="min-h-screen" style={{ 
        backgroundColor: 'var(--background)', 
        padding: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>❌</div>
          <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: 'var(--text)' }}>
            Product not found
          </h2>
          <Link 
            href="/"
            style={{
              display: 'inline-block',
              padding: '12px 24px',
              borderRadius: '8px',
              backgroundColor: 'var(--primary)',
              color: '#ffffff',
              fontWeight: '600',
              textDecoration: 'none'
            }}
          >
            Go Back to Home
          </Link>
        </div>
      </div>
    );
  }
  
  const profitPerUnit = (product.sellingPrice || 0) - (product.costPrice || 0);
  const totalRevenue = (product.quantitySold || 0) * (product.sellingPrice || 0);
  const totalProfit = (product.quantitySold || 0) * profitPerUnit;
  
  const recordSale = (saleQuantity) => {
    if (saleQuantity <= 0) return;
    updateProduct(product.id, {
      quantitySold: (product.quantitySold || 0) + saleQuantity,
    });
    setQuantity(1);
  };
  
  const removeSale = (saleQuantity) => {
    if (saleQuantity <= 0) return;
    const currentQty = product.quantitySold || 0;
    if (currentQty >= saleQuantity) {
      updateProduct(product.id, {
        quantitySold: currentQty - saleQuantity,
      });
      setQuantity(1);
    }
  };
  
  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete "${product.name}"? This action cannot be undone.`)) {
      deleteProduct(product.id);
      router.push('/');
    }
  };
  
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        padding: '12px 8px',
        backgroundColor: 'var(--card-bg)',
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
          margin: '0 8px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }}>
          {product.name}
        </h1>
        <div style={{ width: '44px' }}></div>
      </div>
      
      <div style={{ padding: '16px', paddingBottom: '32px' }}>
        {/* Product Info Cards */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
          <div style={{
            flex: 1,
            padding: '16px',
            borderRadius: '12px',
            backgroundColor: 'var(--card-bg)',
            border: '1px solid var(--border)'
          }}>
            <div style={{ 
              fontSize: '12px',
              fontWeight: '500',
              color: 'var(--text-secondary)',
              marginBottom: '8px',
              textTransform: 'uppercase'
            }}>
              Cost Price
            </div>
            <div style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--text)' }}>
              {formatRupiah(product.costPrice)}
            </div>
          </div>
          
          <div style={{
            flex: 1,
            padding: '16px',
            borderRadius: '12px',
            backgroundColor: 'var(--card-bg)',
            border: '1px solid var(--border)'
          }}>
            <div style={{ 
              fontSize: '12px',
              fontWeight: '500',
              color: 'var(--text-secondary)',
              marginBottom: '8px',
              textTransform: 'uppercase'
            }}>
              Selling Price
            </div>
            <div style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--text)' }}>
              {formatRupiah(product.sellingPrice)}
            </div>
          </div>
        </div>
        
        {/* Profit Per Unit */}
        <div style={{
          padding: '16px',
          borderRadius: '12px',
          backgroundColor: 'var(--card-bg)',
          border: '1px solid var(--border)',
          textAlign: 'center',
          marginBottom: '20px'
        }}>
          <div style={{ 
            fontSize: '12px',
            fontWeight: '500',
            color: 'var(--text-secondary)',
            marginBottom: '8px',
            textTransform: 'uppercase'
          }}>
            Profit Per Unit
          </div>
          <div style={{ 
            fontSize: '24px', 
            fontWeight: 'bold',
            color: profitPerUnit >= 0 ? 'var(--success)' : 'var(--danger)'
          }}>
            {formatRupiah(profitPerUnit)}
          </div>
        </div>
        
        {/* Quantity Sold */}
        <div style={{
          padding: '24px',
          borderRadius: '16px',
          backgroundColor: 'var(--primary)',
          textAlign: 'center',
          marginBottom: '20px'
        }}>
          <div style={{ 
            fontSize: '14px',
            fontWeight: '600',
            color: '#ffffff',
            opacity: 0.9,
            marginBottom: '8px'
          }}>
            Quantity Sold
          </div>
          <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#ffffff' }}>
            {product.quantitySold || 0}
          </div>
        </div>
        
        {/* Revenue & Profit */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{
            padding: '20px',
            borderRadius: '12px',
            backgroundColor: 'var(--card-bg)',
            border: '1px solid var(--border)',
            textAlign: 'center',
            marginBottom: '12px'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>💰</div>
            <div style={{ 
              fontSize: '12px',
              fontWeight: '500',
              color: 'var(--text-secondary)',
              marginBottom: '8px',
              textTransform: 'uppercase'
            }}>
              Total Revenue
            </div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--text)' }}>
              {formatRupiah(totalRevenue)}
            </div>
          </div>
          
          <div style={{
            padding: '20px',
            borderRadius: '12px',
            backgroundColor: 'var(--card-bg)',
            border: '1px solid var(--border)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>📈</div>
            <div style={{ 
              fontSize: '12px',
              fontWeight: '500',
              color: 'var(--text-secondary)',
              marginBottom: '8px',
              textTransform: 'uppercase'
            }}>
              Total Profit
            </div>
            <div style={{ 
              fontSize: '24px', 
              fontWeight: 'bold',
              color: totalProfit >= 0 ? 'var(--success)' : 'var(--danger)'
            }}>
              {formatRupiah(totalProfit)}
            </div>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ 
            fontSize: '18px', 
            fontWeight: '600',
            color: 'var(--text)',
            marginBottom: '12px'
          }}>
            Quick Actions
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
            <button
              onClick={() => recordSale(1)}
              style={{
                padding: '12px',
                borderRadius: '8px',
                backgroundColor: 'var(--success)',
                color: '#ffffff',
                fontSize: '14px',
                fontWeight: '600',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              +1 Sale
            </button>
            <button
              onClick={() => recordSale(5)}
              style={{
                padding: '12px',
                borderRadius: '8px',
                backgroundColor: 'var(--success)',
                color: '#ffffff',
                fontSize: '14px',
                fontWeight: '600',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              +5 Sales
            </button>
            <button
              onClick={() => recordSale(10)}
              style={{
                padding: '12px',
                borderRadius: '8px',
                backgroundColor: 'var(--success)',
                color: '#ffffff',
                fontSize: '14px',
                fontWeight: '600',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              +10 Sales
            </button>
            <button
              onClick={() => removeSale(1)}
              disabled={(product.quantitySold || 0) === 0}
              style={{
                padding: '12px',
                borderRadius: '8px',
                backgroundColor: (product.quantitySold || 0) === 0 ? 'var(--border)' : 'var(--warning)',
                color: '#ffffff',
                fontSize: '14px',
                fontWeight: '600',
                border: 'none',
                cursor: (product.quantitySold || 0) === 0 ? 'not-allowed' : 'pointer',
                opacity: (product.quantitySold || 0) === 0 ? 0.5 : 1
              }}
            >
              -1 Sale
            </button>
            <button
              onClick={() => removeSale(5)}
              disabled={(product.quantitySold || 0) < 5}
              style={{
                padding: '12px',
                borderRadius: '8px',
                backgroundColor: (product.quantitySold || 0) < 5 ? 'var(--border)' : 'var(--warning)',
                color: '#ffffff',
                fontSize: '14px',
                fontWeight: '600',
                border: 'none',
                cursor: (product.quantitySold || 0) < 5 ? 'not-allowed' : 'pointer',
                opacity: (product.quantitySold || 0) < 5 ? 0.5 : 1
              }}
            >
              -5 Sales
            </button>
            <button
              onClick={() => removeSale(10)}
              disabled={(product.quantitySold || 0) < 10}
              style={{
                padding: '12px',
                borderRadius: '8px',
                backgroundColor: (product.quantitySold || 0) < 10 ? 'var(--border)' : 'var(--warning)',
                color: '#ffffff',
                fontSize: '14px',
                fontWeight: '600',
                border: 'none',
                cursor: (product.quantitySold || 0) < 10 ? 'not-allowed' : 'pointer',
                opacity: (product.quantitySold || 0) < 10 ? 0.5 : 1
              }}
            >
              -10 Sales
            </button>
          </div>
        </div>
        
        {/* Record Custom Sale */}
        <div style={{
          padding: '20px',
          borderRadius: '12px',
          backgroundColor: 'var(--card-bg)',
          border: '1px solid var(--border)',
          marginBottom: '20px'
        }}>
          <h3 style={{ 
            fontSize: '14px', 
            fontWeight: '600',
            color: 'var(--text)',
            marginBottom: '12px'
          }}>
            Record Custom Sale
          </h3>
          <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', alignItems: 'center' }}>
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '8px',
                backgroundColor: 'var(--border)',
                border: 'none',
                fontSize: '24px',
                color: 'var(--text)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              −
            </button>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              style={{
                flex: 1,
                height: '44px',
                textAlign: 'center',
                fontSize: '18px',
                fontWeight: '600',
                borderRadius: '8px',
                border: '1px solid var(--border)',
                backgroundColor: 'var(--background)',
                color: 'var(--text)'
              }}
            />
            <button
              onClick={() => setQuantity(quantity + 1)}
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '8px',
                backgroundColor: 'var(--border)',
                border: 'none',
                fontSize: '24px',
                color: 'var(--text)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              +
            </button>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={() => recordSale(quantity)}
              style={{
                flex: 1,
                padding: '14px',
                borderRadius: '8px',
                backgroundColor: 'var(--success)',
                color: '#ffffff',
                fontSize: '16px',
                fontWeight: '600',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <span>✓</span>
              <span>Add {quantity}</span>
            </button>
            <button
              onClick={() => removeSale(quantity)}
              disabled={(product.quantitySold || 0) < quantity}
              style={{
                flex: 1,
                padding: '14px',
                borderRadius: '8px',
                backgroundColor: (product.quantitySold || 0) < quantity ? 'var(--border)' : 'var(--warning)',
                color: '#ffffff',
                fontSize: '16px',
                fontWeight: '600',
                border: 'none',
                cursor: (product.quantitySold || 0) < quantity ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                opacity: (product.quantitySold || 0) < quantity ? 0.5 : 1
              }}
            >
              <span>−</span>
              <span>Remove {quantity}</span>
            </button>
          </div>
        </div>
        
        {/* Delete Button */}
        <button
          onClick={handleDelete}
          style={{
            width: '100%',
            padding: '14px',
            borderRadius: '8px',
            backgroundColor: 'var(--danger)',
            color: '#ffffff',
            fontSize: '16px',
            fontWeight: '600',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
        >
          <span>🗑️</span>
          <span>Delete Product</span>
        </button>
      </div>
    </div>
  );
}