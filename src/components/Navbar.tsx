/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { ShoppingBag, Search, Command, X, ArrowRight } from 'lucide-react';
import SoundSystem from './SoundSystem';
import { Product } from '../types';
import { NEW_COLLECTION_PRODUCTS } from '../data';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
  onProductClick: (product: Product) => void;
}

export default function Navbar({ cartCount, onCartClick, onProductClick }: NavbarProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = NEW_COLLECTION_PRODUCTS.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.subName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <header className="sticky top-0 left-0 right-0 z-40 bg-zinc-950/40 backdrop-blur-md border-b border-white/5 font-mono">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 h-18 flex items-center justify-between">
          
          {/* Brand Logo - Top Left */}
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 bg-sky-400 rotate-45 animate-pulse" />
            <a href="#" className="font-extrabold text-[#E2F0FD] tracking-[0.25em] text-sm uppercase">
              FRZN™
            </a>
          </div>

          {/* Symmetrical Middle Main Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-[11px] text-white/60 tracking-widest uppercase">
            <a href="#hero" className="hover:text-sky-300 transition-colors">
              CATALOG
            </a>
            <span className="text-white/10">/</span>
            <a href="#collection" className="hover:text-sky-300 transition-colors">
              NEW EXTRACTIONS
            </a>
            <span className="text-white/10">/</span>
            <a href="#campaign" className="hover:text-sky-300 transition-colors">
              BUILT FOR COLD
            </a>
          </nav>

          {/* Utilities Row: Sound, Search, Cart - Top Right */}
          <div className="flex items-center gap-4">
            
            {/* Dynamic wind sound module */}
            <SoundSystem />

            {/* Tactical Search Toggle */}
            <button
              id="global-search-btn"
              onClick={() => setSearchOpen(true)}
              className="text-[#E2F0FD]/60 hover:text-sky-300 p-2 rounded-full hover:bg-white/5 transition-all text-sm flex items-center gap-1 relative cursor-pointer"
              title="Tactical Spectrum Search"
            >
              <Search size={15} />
              <span className="text-[9px] uppercase hidden lg:inline tracking-wider">SEARCH</span>
            </button>

            {/* Visual Cart Icon Button with dynamic badge indicator */}
            <button
              id="active-cart-trigger"
              onClick={onCartClick}
              className="text-[#E2F0FD] p-2 bg-white/5 hover:bg-sky-400 hover:text-slate-950 rounded-full border border-white/10 transition-all flex items-center gap-2 relative cursor-pointer"
              title="Secured Cargo Drawer"
            >
              <ShoppingBag size={14} />
              <span className="text-[10px] font-bold tracking-widest hidden sm:inline uppercase">CARGO SECURE</span>
              {cartCount > 0 && (
                <div className="absolute -top-1.5 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-sky-400 text-[10px] font-extrabold font-mono text-slate-950 shadow shadow-sky-400/30 animate-bounce">
                  {cartCount}
                </div>
              )}
            </button>

          </div>
        </div>
      </header>

      {/* Global Slide-Down Searching Overlay Panel */}
      {searchOpen && (
        <div id="search-modal-spectrum" className="fixed inset-0 z-50 overflow-hidden bg-slate-950/90 backdrop-blur-lg flex flex-col pt-24 font-mono px-6">
          <div className="w-full max-w-2xl mx-auto flex flex-col gap-6">
            
            {/* Searching Row */}
            <div className="flex items-center justify-between border-b border-white/20 pb-3">
              <div className="flex items-center gap-3-width flex-1">
                <Search size={22} className="text-sky-400" />
                <input
                  type="text"
                  placeholder="LOOKING FOR SPECIFIC SPECS? TYPE HERE..."
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-white border-none w-full outline-none focus:ring-0 text-sm tracking-widest placeholder-white/20 uppercase"
                />
              </div>
              
              <button
                onClick={() => {
                  setSearchOpen(false);
                  setSearchQuery('');
                }}
                className="text-white/40 hover:text-white hover:bg-white/15 p-1 rounded-full border border-white/10"
              >
                <X size={18} />
              </button>
            </div>

            {/* Results Deck */}
            <div className="flex-1 overflow-y-auto max-h-[400px] scrollbar-thin text-white/50 space-y-4 pr-2">
              <p className="text-[9px] uppercase tracking-widest text-[#E2F0FD]/30">
                SPECTRUM DOCK &bull; MATCHED APPAREL [{filteredProducts.length}]
              </p>

              {searchQuery === '' ? (
                <div className="py-6 text-center text-xs text-white/30 space-y-2">
                  <p>TRY ENTERING PRESETS FOR THE ARCTIC WEATHER DECK:</p>
                  <div className="flex flex-wrap justify-center gap-2 pt-2">
                    {['SILVER', 'STEALTH', 'ICEFIELD', 'WHITE'].map((term) => (
                      <button
                        key={term}
                        onClick={() => setSearchQuery(term)}
                        className="text-[10px] bg-white/5 border border-white/10 rounded px-2.5 py-1 text-sky-300 hover:text-white hover:bg-sky-400/20 uppercase transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="text-center py-12 text-xs text-white/20 uppercase">
                  No matching defensive hardware matching "{searchQuery}"
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredProducts.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => {
                        onProductClick(p);
                        setSearchOpen(false);
                        setSearchQuery('');
                      }}
                      className="flex gap-4 items-center p-2 rounded border border-white/5 hover:border-white/20 bg-white/5 cursor-pointer transition-all hover:bg-white/10 "
                    >
                      <img
                        src={p.img}
                        alt={p.name}
                        className="w-12 h-14 object-cover object-center rounded border border-white/10 bg-slate-900"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs text-white font-bold tracking-wider uppercase truncate">{p.name}</h4>
                        <p className="text-[9px] text-[#E2F0FD]/40 truncate uppercase">{p.subName}</p>
                      </div>
                      <div className="text-right text-xs font-bold text-white font-mono flex items-center gap-2">
                        <span>${p.price.toFixed(2)}</span>
                        <ArrowRight size={12} className="text-sky-400" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="text-[9px] text-white/20 border-t border-white/5 pt-3 uppercase flex justify-between items-center tracking-widest">
              <span>SCAN COMPLETE &mdash; SECURED DIRECTORY V.12</span>
              <span className="flex items-center gap-1 text-[8px]">
                <Command size={10} /> Esc to close
              </span>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
