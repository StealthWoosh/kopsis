import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useSalesStore = create(
  persist(
    (set) => ({
      products: [],
      theme: 'light',
      
      // Add product
      addProduct: (product) => set((state) => {
        const newProducts = [...state.products, product];
        return {
          products: newProducts,
        };
      }),
      
      // Update product (add sales)
      updateProduct: (productId, updates) => set((state) => ({
        products: state.products.map(p => 
          p.id === productId ? { ...p, ...updates } : p
        ),
      })),
      
      // Delete product
      deleteProduct: (productId) => set((state) => ({
        products: state.products.filter(p => p.id !== productId),
      })),
      
      // Toggle theme
      toggleTheme: () => set((state) => ({
        theme: state.theme === 'light' ? 'dark' : 'light',
      })),
      
      // Get totals
      getTotals: (products) => {
        let totalRevenue = 0;
        let totalItemsSold = 0;
        
        products.forEach(p => {
          const qty = p.quantitySold || 0;
          totalRevenue += (p.sellingPrice || 0) * qty;
          totalItemsSold += qty;
        });
        
        return {
          totalRevenue,
          totalItemsSold,
        };
      },
    }),
    {
      name: 'sales-tracker-storage',
    }
  )
);