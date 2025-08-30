import { useState, useEffect } from 'react';
import { getCartItemCount } from '../services/cartService';

export const useCartItems = () => {
  const [cartItemCount, setCartItemCount] = useState(0);

  const updateCartCount = () => {
    setCartItemCount(getCartItemCount());
  };

  useEffect(() => {
    // Initial load
    updateCartCount();

    // Listen for localStorage changes (when user adds/removes items)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'bazarDigitalCart') {
        updateCartCount();
      }
    };

    // Listen for custom events (for same-tab updates)
    const handleCartUpdate = () => {
      updateCartCount();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('cartUpdated', handleCartUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);

  return {
    cartItemCount,
    updateCartCount,
  };
};

export default useCartItems;