'use client';

import { useSalesStore } from '@/store/salesStore';
import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const { products, theme, toggleTheme, deleteProduct, updateProduct, getTotals } = useSalesStore();
  const router = useRouter();
  
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);
  
  const totals = getTotals(products);
  
  const formatRupiah = (value) => {
    return `Rp ${(value || 0).toLocaleString('id-ID')}`;
  };
  
  const handleAddSale = (product, e) => {
    e.stopPropagation();
    updateProduct(product.id, {
      quantitySold: (product.quantitySold || 0) + 1,
    });
  };
  
  const handleRemoveSale = (product, e) => {
    e.stopPropagation();
    if ((product.quantitySold || 0) > 0) {
      updateProduct(product.id, {
        quantitySold: (product.quantitySold || 0) - 1,
      });
    }
  };
  
  const handleDelete = (product, e) => {
    e.stopPropagation();
    if (confirm(`Are you sure you want to delete "${product.name}"?`)) {
      deleteProduct(product.id);
    }
  };
  
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background)', padding: '16px' }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '24px' 
        }}>
          <h1 style={{ 
            fontSize: '24px', 
            fontWeight: 'bold',
            color: 'var(--text)'
          }}>
            Oshivema - Ice Cream Tracker
          </h1>
          <button
            onClick={toggleTheme}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'var(--card-bg)',
              border: '1px solid var(--border)',
              cursor: 'pointer',
              color: 'var(--primary)'
            }}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
        
        {/* Summary Cards Grid - Only 2 cards now */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px', 
          marginBottom: '24px' 
        }}>
          {/* Items Sold */}
          <div style={{
            backgroundColor: 'var(--card-bg)',
            borderRadius: '16px',
            padding: '20px',
            border: '1px solid var(--border)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <div style={{ fontSize: '24px', marginBottom: '12px' }}>🍦</div>
            <div style={{ 
              fontSize: '18px', 
              fontWeight: '600',
              color: 'var(--text)',
              marginBottom: '4px'
            }}>
              {totals.totalItemsSold}
            </div>
            <div style={{ 
              fontSize: '12px',
              color: 'var(--text-secondary)',
              textAlign: 'center'
            }}>
              Es Krim Terjual
            </div>
          </div>
          
          {/* Revenue */}
          <div style={{
            backgroundColor: 'var(--card-bg)',
            borderRadius: '16px',
            padding: '20px',
            border: '1px solid var(--border)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <div style={{ fontSize: '24px', marginBottom: '12px' }}>💰</div>
            <div style={{ 
              fontSize: '18px', 
              fontWeight: '600',
              color: 'var(--text)',
              marginBottom: '4px'
            }}>
              {formatRupiah(totals.totalRevenue)}
            </div>
            <div style={{ 
              fontSize: '12px',
              color: 'var(--text-secondary)',
              textAlign: 'center'
            }}>
              Total Penjualan
            </div>
          </div>
        </div>
        
        {/* Products Section Header */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '16px' 
        }}>
          <h2 style={{ 
            fontSize: '18px', 
            fontWeight: '600',
            color: 'var(--text)'
          }}>
            Products
          </h2>
          <Link 
            href="/add-product"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'var(--primary)',
              color: '#ffffff',
              padding: '8px 16px',
              borderRadius: '20px',
              fontSize: '14px',
              fontWeight: '600',
              textDecoration: 'none'
            }}
          >
            <span>+</span>
            <span>Add Product</span>
          </Link>
        </div>
        
        {/* Products List */}
        {products.length === 0 ? (
          <div style={{
            backgroundColor: 'var(--card-bg)',
            borderRadius: '16px',
            padding: '40px',
            border: '1px dashed var(--border)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '64px', marginBottom: '16px' }}>📦</div>
            <p style={{ 
              color: 'var(--text-secondary)',
              fontSize: '16px'
            }}>
              No products yet. Add your first product to start tracking sales!
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {products.map((product) => {
              const totalRevenue = (product.quantitySold || 0) * (product.sellingPrice || 0);
              
              return (
                <div
                  key={product.id}
                  onClick={() => router.push(`/product/${product.id}`)}
                  style={{
                    backgroundColor: 'var(--card-bg)',
                    borderRadius: '12px',
                    padding: '16px',
                    border: '1px solid var(--border)',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                    cursor: 'pointer',
                    transition: 'box-shadow 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.08)';
                  }}
                >
                  {/* Product Header with Action Buttons */}
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    marginBottom: '12px'
                  }}>
                    <h3 style={{ 
                      fontSize: '16px', 
                      fontWeight: '600',
                      color: 'var(--text)',
                      flex: 1,
                      marginRight: '8px'
                    }}>
                      {product.name}
                    </h3>
                    
                    {/* Quick Action Buttons */}
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {/* Add Sale Button (+) */}
                      <button
                        onClick={(e) => handleAddSale(product, e)}
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '18px',
                          border: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          fontSize: '20px',
                          fontWeight: 'bold',
                          color: 'var(--success)',
                          backgroundColor: 'rgba(16, 185, 129, 0.15)',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(16, 185, 129, 0.25)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(16, 185, 129, 0.15)';
                        }}
                      >
                        +
                      </button>
                      
                      {/* Remove Sale Button (-) */}
                      <button
                        onClick={(e) => handleRemoveSale(product, e)}
                        disabled={(product.quantitySold || 0) === 0}
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '18px',
                          border: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: (product.quantitySold || 0) === 0 ? 'not-allowed' : 'pointer',
                          fontSize: '20px',
                          fontWeight: 'bold',
                          color: (product.quantitySold || 0) === 0 ? 'var(--text-secondary)' : 'var(--warning)',
                          backgroundColor: (product.quantitySold || 0) === 0 ? 'rgba(107, 114, 128, 0.1)' : 'rgba(245, 158, 11, 0.15)',
                          transition: 'all 0.2s',
                          opacity: (product.quantitySold || 0) === 0 ? 0.5 : 1
                        }}
                        onMouseEnter={(e) => {
                          if ((product.quantitySold || 0) > 0) {
                            e.currentTarget.style.backgroundColor = 'rgba(245, 158, 11, 0.25)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if ((product.quantitySold || 0) > 0) {
                            e.currentTarget.style.backgroundColor = 'rgba(245, 158, 11, 0.15)';
                          }
                        }}
                      >
                        −
                      </button>
                      
                      {/* Delete Button (×) */}
                      <button
                        onClick={(e) => handleDelete(product, e)}
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '18px',
                          border: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          fontSize: '20px',
                          fontWeight: 'bold',
                          color: 'var(--danger)',
                          backgroundColor: 'rgba(244, 67, 54, 0.15)',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(244, 67, 54, 0.25)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(244, 67, 54, 0.15)';
                        }}
                      >
                        ×
                      </button>
                    </div>
                  </div>
                  
                  {/* Quantity Badge */}
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '4px',
                    marginBottom: '12px'
                  }}>
                    <span style={{ fontSize: '14px' }}>📦</span>
                    <span style={{ 
                      fontSize: '12px',
                      color: 'var(--text-secondary)'
                    }}>
                      {product.quantitySold || 0} Terjual
                    </span>
                  </div>
                  
                  {/* Product Details - Only Revenue now */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <span style={{ 
                        fontSize: '12px',
                        color: 'var(--text-secondary)'
                      }}>
                        Harga Per Es Krim:
                      </span>
                      <span style={{ 
                        fontSize: '16px',
                        fontWeight: '600',
                        color: 'var(--text)'
                      }}>
                        {formatRupiah(product.sellingPrice || 0)}
                      </span>
                    </div>
                    
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <span style={{ 
                        fontSize: '12px',
                        color: 'var(--text-secondary)'
                      }}>
                        Total Penjualan:
                      </span>
                      <span style={{ 
                        fontSize: '18px',
                        fontWeight: '600',
                        color: 'var(--success)'
                      }}>
                        {formatRupiah(totalRevenue)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
