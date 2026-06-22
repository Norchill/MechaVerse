/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { X, Shield, Activity, HardHat, Compass, Wind, ShoppingCart } from 'lucide-react';
import { Product } from '../types';

interface QuickViewProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, color: string) => void;
}

export default function QuickView({ product, onClose, onAddToCart }: QuickViewProps) {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0] || 'M');
      setSelectedColor(product.colors[0] || 'WHITE');
      setIsAdded(false);
    }
  }, [product]);

  if (!product) return null;

  const handleAddToCart = () => {
    onAddToCart(product, selectedSize, selectedColor);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 1000); // short transition prior to close
  };

  return (
    <div id="quickview-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Dynamic Glass Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Main Container */}
      <div className="relative bg-slate-900/90 border border-white/10 rounded-2xl w-full max-w-4xl p-6 md:p-8 text-white shadow-2xl backdrop-blur-2xl overflow-hidden z-10 transition-all duration-300">
        
        {/* Subtle Arctic Gradients */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-slate-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/40 hover:text-white hover:bg-white/10 p-2 rounded-full transition-all z-20"
        >
          <X size={20} />
        </button>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
          
          {/* Left Column: Heavy Product Image Display */}
          <div className="flex flex-col gap-4">
            <div className="relative w-full aspect-[3/4] bg-slate-950/50 border border-white/10 rounded-xl overflow-hidden group">
              {/* Product Badge */}
              <div className="absolute top-3 left-3 bg-sky-400 text-slate-950 text-[9px] font-mono font-bold px-2 py-0.5 uppercase tracking-widest rounded-sm z-10 shadow-lg">
                TECHNICAL SHELL
              </div>
              
              <img
                src={(product.colorImages && selectedColor && product.colorImages[selectedColor]) || product.img}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />

              {/* Decorative Tech Overlay */}
              <div className="absolute bottom-3 left-3 bg-black/60 border border-white/10 backdrop-blur-sm text-[8px] font-mono text-white/70 p-2 rounded-md space-y-1">
                <p>LATITUDE: 78.2232° N</p>
                <p>ELEVATION: 1050 M</p>
              </div>
            </div>
          </div>

          {/* Right Column: Descriptions & Detailed Technical Specs */}
          <div className="flex flex-col justify-between">
            <div className="space-y-4">
              {/* Title Section */}
              <div>
                <span className="text-xs text-sky-400 font-mono tracking-[0.2em] font-bold uppercase block mb-1">
                  NEW EXPEDITION LAYER
                </span>
                <h2 className="text-2xl font-extrabold font-sans tracking-tight text-white uppercase">
                  {product.name}
                </h2>
                <p className="text-xs text-white/50 tracking-wide font-mono uppercase mt-0.5">
                  {product.subName}
                </p>
              </div>

              {/* Price */}
              <div className="text-xl font-mono font-bold text-white tracking-tight border-b border-white/10 pb-4">
                ${product.price.toFixed(2)}
              </div>

              {/* Description */}
              <p className="text-xs text-white/70 leading-relaxed font-sans font-light">
                {product.description}
              </p>

              {/* Technical Spec Matrix (Super Cool Grid!) */}
              <div className="grid grid-cols-2 gap-3 text-[11px] font-mono pt-2">
                <div className="bg-white/10 border border-white/15 p-3 rounded-lg flex flex-col justify-between">
                  <span className="text-[#E2F0FD]/80 uppercase flex items-center gap-1 text-[9px] font-bold">
                    <Wind size={11} className="text-sky-400" /> WARMTH CORE
                  </span>
                  <span className="text-white font-semibold mt-1 leading-snug break-words">{product.specs.insulation}</span>
                </div>
                <div className="bg-white/10 border border-white/15 p-3 rounded-lg flex flex-col justify-between">
                  <span className="text-[#E2F0FD]/80 uppercase flex items-center gap-1 text-[9px] font-bold">
                    <Shield size={11} className="text-sky-400" /> MEMBRANE
                  </span>
                  <span className="text-white font-semibold mt-1 leading-snug break-words">{product.specs.membrane}</span>
                </div>
                <div className="bg-white/10 border border-white/15 p-3 rounded-lg flex flex-col justify-between">
                  <span className="text-[#E2F0FD]/80 uppercase flex items-center gap-1 text-[9px] font-bold">
                    <Activity size={11} className="text-sky-400" /> COLD LIMIT
                  </span>
                  <span className="text-white font-semibold mt-1 leading-snug break-words">{product.specs.temperatureRating}</span>
                </div>
                <div className="bg-white/10 border border-white/15 p-3 rounded-lg flex flex-col justify-between">
                  <span className="text-[#E2F0FD]/80 uppercase flex items-center gap-1 text-[9px] font-bold">
                    <Compass size={11} className="text-sky-400" /> WATER BARRIER
                  </span>
                  <span className="text-white font-semibold mt-1 leading-snug break-words">{product.specs.waterproofRate}</span>
                </div>
              </div>

              {/* Interactive Sizing selector */}
              <div className="pt-2">
                <span className="text-xs font-mono font-bold tracking-wider uppercase text-sky-300 block mb-2">
                  ALLOCATE SIZE
                </span>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`h-8 min-w-10 px-3 rounded font-mono text-[11px] font-bold border transition-all cursor-pointer ${
                        selectedSize === sz
                          ? 'border-sky-400 bg-sky-400/20 text-sky-300 shadow shadow-sky-400/15'
                          : 'border-white/20 hover:border-white/40 text-white/80 hover:text-white'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Interactive Color Color Swatches */}
              <div>
                <span className="text-xs font-mono font-bold tracking-wider uppercase text-sky-300 block mb-2">
                  DEPLOY SHADE
                </span>
                <div className="flex gap-2">
                  {product.colors.map((clr) => (
                    <button
                      key={clr}
                      onClick={() => setSelectedColor(clr)}
                      className={`px-3 py-1.5 font-mono text-[9px] font-bold border rounded uppercase transition-all tracking-wider ${
                        selectedColor === clr
                          ? 'border-sky-400 bg-sky-400/20 text-sky-300 shadow shadow-sky-400/15'
                          : 'border-white/20 hover:border-white/40 text-white/80 hover:text-white'
                      }`}
                    >
                      {clr}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Add to Cart Button */}
            <div className="pt-6 mt-6 border-t border-white/10 flex gap-4">
              <button
                onClick={handleAddToCart}
                disabled={isAdded}
                className={`flex-1 py-4.5 rounded font-mono text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 flex items-center justify-center gap-2 outline-none cursor-pointer ${
                  isAdded
                    ? 'bg-emerald-500 text-slate-950'
                    : 'bg-white text-slate-950 hover:bg-sky-400 active:scale-98 shadow-md shadow-white/5'
                }`}
              >
                {isAdded ? (
                  <>
                    <span>ALLOCATED TO CARGO HOLD</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart size={13} />
                    <span>EQUIP PRODUCT &mdash; ${product.price.toFixed(2)}</span>
                  </>
                )}
              </button>
            </div>
          </div>

        </div>

        {/* Outer Grid Barcode Accent */}
        <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-white/30 tracking-widest uppercase">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
            <span>ACTIVE SECURITY HANDSHAKE PROTOCOL v12.1</span>
          </div>
          <div>MODEL ID: {product.id.toUpperCase()}</div>
        </div>

      </div>
    </div>
  );
}
