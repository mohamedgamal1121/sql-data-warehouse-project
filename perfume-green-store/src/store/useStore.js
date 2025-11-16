import { create } from 'zustand';

export const useStore = create((set, get) => ({
  // Cart state
  cart: [],
  cartOpen: false,
  
  addToCart: (product) => {
    const cart = get().cart;
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      set({
        cart: cart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      });
    } else {
      set({ cart: [...cart, { ...product, quantity: 1 }] });
    }
  },
  
  removeFromCart: (productId) => {
    set({ cart: get().cart.filter(item => item.id !== productId) });
  },
  
  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeFromCart(productId);
    } else {
      set({
        cart: get().cart.map(item =>
          item.id === productId ? { ...item, quantity } : item
        )
      });
    }
  },
  
  clearCart: () => set({ cart: [] }),
  
  toggleCart: () => set({ cartOpen: !get().cartOpen }),
  
  setCartOpen: (open) => set({ cartOpen: open }),
  
  getCartTotal: () => {
    return get().cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  },
  
  getCartCount: () => {
    return get().cart.reduce((count, item) => count + item.quantity, 0);
  },
  
  // Product filters
  selectedCategory: 'all',
  searchQuery: '',
  priceRange: [0, 150],
  
  setCategory: (category) => set({ selectedCategory: category }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setPriceRange: (range) => set({ priceRange: range }),
  
  // Selected product for detail view
  selectedProduct: null,
  setSelectedProduct: (product) => set({ selectedProduct: product }),
  
  // User state
  user: null,
  greenPoints: 0,
  
  setUser: (user) => set({ user }),
  addGreenPoints: (points) => set({ greenPoints: get().greenPoints + points }),
  
  // UI state
  showWelcome: true,
  setShowWelcome: (show) => set({ showWelcome: show }),
  
  checkoutOpen: false,
  setCheckoutOpen: (open) => set({ checkoutOpen: open }),
  
  customLabOpen: false,
  setCustomLabOpen: (open) => set({ customLabOpen: open }),
  
  // Navigation
  cameraMode: 'explore', // 'explore', 'product', 'checkout'
  setCameraMode: (mode) => set({ cameraMode: mode }),
}));
