/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Eye, Plus, ShoppingCart, SlidersHorizontal } from 'lucide-react';
import { Product } from '../types';
import { NEW_COLLECTION_PRODUCTS } from '../data';

interface ProductCollectionProps {
  onProductClick: (product: Product) => void;
  onAddToCart: (product: Product, size: string, color: string) => void;
}

export default function ProductCollection({ onProductClick, onAddToCart }: ProductCollectionProps) {
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'SHELL' | 'INSULATED' | 'SPEC-OPS'>('ALL');
  const [hoveredProductId, setHoveredProductId] = useState<string | null>(null);

  const categories: Array<'ALL' | 'SHELL' | 'INSULATED' | 'SPEC-OPS'> = ['ALL', 'SHELL', 'INSULATED', 'SPEC-OPS'];

  const filteredProducts = activeFilter === 'ALL'
    ? NEW_COLLECTION_PRODUCTS
    : NEW_COLLECTION_PRODUCTS.filter(p => p.category === activeFilter);

  return (
    <section id="collection" className="relative bg-zinc-950 text-white py-24 px-6 md:px-12 border-t border-b border-white/5 overflow-hidden">
      
      {/* Background visual watermarks - graffiti/stencil and subtle elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-sans font-extrabold text-[15vw] text-white/[0.01] pointer-events-none select-none tracking-[0.2em]">
        COLLECTION
      </div>

      <div className="max-w-[1440px] mx-auto space-y-12 relative z-10">
        
        {/* Symmetrical Catalog Header & Filters Category row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-sky-400 font-mono text-[9px] uppercase tracking-[0.3em]">
              <span className="w-1.5 h-1.5 bg-sky-400 rounded-full" />
              <span>OUTERWEAR MATRIX DECK</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight uppercase font-sans">
              NEW COLLECTION
            </h2>
          </div>

          {/* Categories select row layout */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-2 mr-4 text-white/40 text-[10px] uppercase font-mono hidden lg:flex">
              <SlidersHorizontal size={12} className="text-sky-400" />
              <span>FILTER SPECIES:</span>
            </div>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4.5 py-2 font-mono text-[10px] tracking-widest uppercase border transition-all duration-300 cursor-pointer ${
                  activeFilter === cat
                    ? 'border-sky-400 bg-sky-400/10 text-sky-300'
                    : 'border-white/15 text-white/50 hover:border-white/30 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Catalog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => {
            const isHovered = hoveredProductId === product.id;
            
            return (
              <div
                key={product.id}
                onMouseEnter={() => setHoveredProductId(product.id)}
                onMouseLeave={() => setHoveredProductId(null)}
                className="group flex flex-col justify-between border border-white/10 rounded-2xl p-4 bg-slate-900/20 backdrop-blur-md relative overflow-hidden transition-all duration-300 hover:border-sky-500/30 hover:bg-slate-900/30 focus-within:ring-2 focus-within:ring-sky-400"
              >
                
                {/* Floating tags */}
                <div className="absolute top-6 left-6 z-10 flex flex-col gap-1.5">
                  {product.isNew && (
                    <span className="bg-sky-400 text-slate-950 font-mono font-bold text-[8px] tracking-[0.2em] px-2 py-0.5 rounded-sm uppercase">
                      NEW EXP
                    </span>
                  )}
                  <span className="bg-slate-950/80 backdrop-blur-sm border border-white/10 text-white/70 font-mono text-[8px] tracking-widest px-2 py-0.5 rounded-sm uppercase">
                    {product.category}
                  </span>
                </div>

                {/* Main clickable product card frame */}
                <div
                  onClick={() => onProductClick(product)}
                  className="relative aspect-[3/4] rounded-xl overflow-hidden bg-slate-950/40 border border-white/5 transition-colors cursor-pointer"
                >
                  
                  {/* Model Photo rendering */}
                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-103"
                    referrerPolicy="no-referrer"
                  />

                  {/* Dark mask overlaying on hover to reveal specs button triggers */}
                  <div className={`absolute inset-0 bg-slate-950/60 backdrop-blur-[2px] transition-all duration-300 flex flex-col justify-end p-5 space-y-3 ${
                    isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'
                  }`}>
                    
                    <p className="text-[10px] font-sans text-white/80 leading-relaxed uppercase pr-2 line-clamp-3">
                      {product.description}
                    </p>

                    {/* Miniature technical stats list */}
                    <div className="space-y-1 text-[8px] font-mono text-sky-400/95 border-t border-white/10 pt-2 uppercase">
                      <p>TEMP: &nbsp;{product.specs.temperatureRating}</p>
                      <p>SHELL: {product.specs.membrane}</p>
                    </div>

                    <div className="flex gap-2 pt-1.5">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onProductClick(product);
                        }}
                        className="flex-1 py-2 rounded bg-white text-slate-950 hover:bg-sky-400 font-mono text-[9px] font-extrabold tracking-widest uppercase flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Eye size={11} />
                        <span>INSPECT</span>
                      </button>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          // add size Medium as default catalog quick addition
                          onAddToCart(product, 'M', product.colors[0] || 'WHITE');
                        }}
                        className="p-2 rounded bg-white/10 hover:bg-sky-400 hover:text-slate-950 border border-white/10 text-white hover:border-sky-400 transition-all flex items-center justify-center cursor-pointer"
                        title="Quick Dispatch to secure storage"
                      >
                        <Plus size={13} />
                      </button>
                    </div>

                  </div>
                </div>

                {/* Symmetrical Text Breakdown */}
                <div className="pt-4 flex justify-between items-start gap-3">
                  <div className="space-y-0.5">
                    <h3 className="font-extrabold text-sm text-white tracking-wide uppercase truncate group-hover:text-sky-300 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-[10px] text-white/40 tracking-wider font-mono uppercase truncate">
                      {product.subName}
                    </p>
                    
                    {/* Small color dots selector */}
                    <div className="flex gap-1.5 pt-1.5">
                      {product.colors.map((color) => {
                        let bgClass = 'bg-white';
                        if (color.includes('SILVER')) bgClass = 'bg-slate-300 border border-white/20';
                        if (color.includes('BLACK')) bgClass = 'bg-zinc-800';
                        if (color.includes('BLUE')) bgClass = 'bg-sky-300';
                        return (
                          <span
                            key={color}
                            className={`w-2.5 h-2.5 rounded-full ${bgClass}`}
                            title={color}
                          />
                        );
                      })}
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-mono font-bold text-white tracking-tighter">${product.price.toFixed(2)}</p>
                    <span className="text-[8px] font-mono text-white/30 tracking-widest uppercase">CAT_AR_091</span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Tactical Status Margin Overlay Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-[10px] font-mono text-white/30 tracking-widest uppercase gap-4">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>THERMAL DISPATCH DIRECTORY SYNCHRONIZED [GEO_LOC: 78N]</span>
          </div>
          <div className="flex items-center gap-5">
            <span>6/6 CORE SHELLS DEPLOYED</span>
            <span>&bull;</span>
            <span>SHIPPING PROTOCOL: FREE AIR EXPRESS SECURED ABOVE $1800</span>
          </div>
        </div>

      </div>
    </section>
  );
}
