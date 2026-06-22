/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Navbar from './components/Navbar';
import SnowEffect from './components/SnowEffect';
import HeroSection from './components/HeroSection';
import ProductCollection from './components/ProductCollection';
import CampaignSection from './components/CampaignSection';
import CartDrawer from './components/CartDrawer';
import QuickView from './components/QuickView';
import { Product, CartItem } from './types';
import { HERO_PRODUCT } from './data';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [activeQuickViewProduct, setActiveQuickViewProduct] = useState<Product | null>(null);

  // Add cargo handler
  const handleAddToCart = (product: Product, size: string, color: string) => {
    setCartItems((prevItems) => {
      const existingIdx = prevItems.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedColor === color &&
          item.selectedSize === size
      );

      if (existingIdx > -1) {
        // Increment quantity of existing item
        const updated = [...prevItems];
        updated[existingIdx].quantity += 1;
        return updated;
      } else {
        // Append new brand-new selection item
        return [...prevItems, { product, selectedColor: color, selectedSize: size, quantity: 1 }];
      }
    });
    
    // Automatically trigger cart drawer pop open for dynamic user feedback!
    setCartOpen(true);
  };

  // Adjust item quantities
  const handleUpdateQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) {
      handleRemove(index);
    } else {
      setCartItems((prevItems) => {
        const updated = [...prevItems];
        updated[index].quantity = quantity;
        return updated;
      });
    }
  };

  // Remove individual cargo items
  const handleRemove = (index: number) => {
    setCartItems((prevItems) => {
      const updated = [...prevItems];
      updated.splice(index, 1);
      return updated;
    });
  };

  // Reset entire cargo hold on successful transaction
  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <div className="min-h-screen bg-slate-950 text-white relative font-sans overflow-x-hidden antialiased select-none">
      
      {/* 1. Global Interactive Falling Snow Layer */}
      <SnowEffect />

      {/* 2. Brand Navigational Header Bar */}
      <Navbar
        cartCount={totalCartCount}
        onCartClick={() => setCartOpen(true)}
        onProductClick={(product) => setActiveQuickViewProduct(product)}
      />

      {/* 3. Hero Campaign Platform */}
      <HeroSection
        heroProduct={HERO_PRODUCT}
        onAddToCart={handleAddToCart}
        onProductClick={(product) => setActiveQuickViewProduct(product)}
      />

      {/* 4. Symmetrical Grid Catalog */}
      <ProductCollection
        onProductClick={(product) => setActiveQuickViewProduct(product)}
        onAddToCart={handleAddToCart}
      />

      {/* 5. Full-bleed Interactive Poster Campaign Section */}
      <CampaignSection />

      {/* 6. Dynamic Slide-Out Shopping Cargo Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemove}
        onClear={handleClearCart}
      />

      {/* 7. Full-Screen Molecular Outerwear Spec Inspector Overlay */}
      <QuickView
        product={activeQuickViewProduct}
        onClose={() => setActiveQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
      />

    </div>
  );
}
