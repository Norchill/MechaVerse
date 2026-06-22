/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { ArrowUpRight, ShieldAlert, BadgeInfo, Check } from 'lucide-react';
import { Product } from '../types';

interface HeroSectionProps {
  heroProduct: Product;
  onAddToCart: (product: Product, size: string, color: string) => void;
  onProductClick: (product: Product) => void;
}

export default function HeroSection({ heroProduct, onAddToCart, onProductClick }: HeroSectionProps) {
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('WHITE');
  const [isAdded, setIsAdded] = useState(false);

  // Dynamic image swaps depending on selected color or looking gallery
  const [currentHeroImage, setCurrentHeroImage] = useState(heroProduct.img);

  const handleAddToCart = () => {
    onAddToCart(heroProduct, selectedSize, selectedColor);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1500);
  };

  const mainColors = ['WHITE', 'SILVER', 'ICE BLUE', 'BLACK'];

  const alternateThumbnails = [
    {
      id: 't1',
      title: 'White Spec',
      img: 'https://i.ibb.co/mFD5KYjT/jocks-white-1781843812677.jpg',
      code: 'PROT_DEC_01'
    },
    {
      id: 't2',
      title: 'Silver Spec',
      img: 'https://i.ibb.co/hRTVxmWn/jocks-silver-1781843845995.jpg',
      code: 'PROT_DEC_02'
    },
    {
      id: 't3',
      title: 'Ice Blue Spec',
      img: 'https://i.ibb.co/8LzdYtR5/jocks-ice-blue-1781843865736.jpg',
      code: 'PROT_DEC_03'
    },
    {
      id: 't4',
      title: 'Stealth Black Spec',
      img: 'https://i.ibb.co/cSgrSxJT/jocks-black-1781843825606.jpg',
      code: 'PROT_DEC_04'
    }
  ];

  return (
    <section id="hero" className="relative min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-zinc-950 text-white overflow-hidden pb-16 pt-6">
      
      {/* Abstract Grid Graphic Underlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Arctic Fog Accent */}
      <div className="absolute top-[20%] left-[-10%] w-[50%] h-[50%] bg-sky-500/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-[30%] right-[-10%] w-[40%] h-[50%] bg-zinc-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative z-10 pt-4 items-center">
        
        {/* LEFT COLUMN (GRID SIZE 4): Typography, Selection details & CTR button */}
        <div className="lg:col-span-4 flex flex-col justify-center space-y-8 relative order-2 lg:order-1">
          
          {/* Tagline */}
          <div className="flex items-center gap-2 text-sky-400 font-mono text-[10px] uppercase tracking-[0.3em]">
            <span className="w-1 h-3 bg-sky-400 block" />
            <span>CRITICAL THERMO DECK / SERIES-1</span>
          </div>

          {/* Main Display Typography */}
          <div className="space-y-1">
            <h2 className="text-white/40 font-mono text-xs tracking-[0.4em] uppercase">COLLECTION</h2>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-sans font-extrabold tracking-tight text-[#E2F0FD] uppercase leading-none">
              Jocks<sup>™</sup>
            </h1>
            <p className="text-[#E2F0FD]/40 font-mono text-[10px] tracking-wider uppercase mt-1">
              [ PROTOCOL AR-96 elevation protective construct ]
            </p>
          </div>

          {/* Interactive Options Cards */}
          <div className="space-y-6 bg-white/5 border border-white/10 rounded-xl p-5 md:p-6 backdrop-blur-md relative overflow-hidden">
            
            {/* Soft inner lighting */}
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-sky-400/5 rounded-full blur-xl" />

            {/* Sizing grid */}
            <div>
              <div className="flex justify-between text-[10px] font-mono mb-2 text-white/50 tracking-wider">
                <span>SIZE MATRIX</span>
                <span className="text-sky-400 font-bold uppercase">{selectedSize} SELECTED</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {['S', 'M', 'L', 'XL'].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 text-xs font-mono font-bold border transition-all duration-200 cursor-pointer ${
                      selectedSize === size
                        ? 'border-sky-400 bg-sky-400/15 text-sky-300 shadow shadow-sky-400/10'
                        : 'border-white/10 hover:border-white/20 hover:bg-white/5 text-white/60'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color picker */}
            <div>
              <div className="flex justify-between text-[10px] font-mono mb-2 text-white/50 tracking-wider">
                <span>DEPLOY COLOUR</span>
                <span className="text-sky-400 font-bold uppercase">{selectedColor}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {mainColors.map((color) => (
                  <button
                    key={color}
                    onClick={() => {
                      setSelectedColor(color);
                      // Visual cues: change preview image if it is one of our key options
                      if (color === 'WHITE') setCurrentHeroImage(alternateThumbnails[0].img);
                      else if (color === 'SILVER') setCurrentHeroImage(alternateThumbnails[1].img);
                      else if (color === 'ICE BLUE') setCurrentHeroImage(alternateThumbnails[2].img);
                      else if (color === 'BLACK') setCurrentHeroImage(alternateThumbnails[3].img);
                    }}
                    className={`px-3 py-1.5 text-[9px] font-mono font-bold tracking-widest border transition-all duration-200 uppercase cursor-pointer ${
                      selectedColor === color
                        ? 'border-sky-400 bg-sky-400/15 text-sky-300'
                        : 'border-white/10 hover:border-white/20 text-white/40 hover:text-white'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Price section & Active Checkout triggers */}
            <div className="pt-4 border-t border-white/5 flex items-center justify-between">
              <div>
                <p className="text-[9px] font-mono text-white/30 tracking-widest uppercase">ESTIMATED ASSET PRICE</p>
                <p className="text-2xl font-mono font-bold text-white tracking-tighter">${heroProduct.price.toFixed(2)}</p>
              </div>

              {/* Secure Info Alert Badge */}
              <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded px-2 py-1 text-[8px] font-mono text-white/60 uppercase">
                <ShieldAlert size={10} className="text-sky-300" />
                <span>850 DOWN CORE</span>
              </div>
            </div>

            {/* minimal geometric CTA button representing 190° angles */}
            <button
              onClick={handleAddToCart}
              className={`w-full py-4.5 rounded font-mono text-[10px] font-bold tracking-[0.3em] uppercase transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer ${
                isAdded
                  ? 'bg-emerald-500 text-slate-950 font-extrabold'
                  : 'bg-[#E2F0FD] hover:bg-sky-400 text-slate-950 hover:scale-[1.01] active:translate-y-px shadow-lg shadow-[#E2F0FD]/5'
              }`}
            >
              {isAdded ? (
                <>
                  <Check size={12} strokeWidth={3} />
                  <span>SECURED IN CARGO</span>
                </>
              ) : (
                <>
                  <span>DEPLOY CARGO ARMOR</span>
                  <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </>
              )}
            </button>
          </div>

          {/* Quick specs helper text below panel */}
          <div className="flex items-start gap-2.5 text-[10px] font-mono text-white/40 leading-relaxed uppercase">
            <BadgeInfo size={14} className="text-sky-400/60 flex-shrink-0 mt-0.5" />
            <p>
              Protected by a double-weave thermoregulatory weave layer. Certified Siberian Goose Down fill prevents thermal leakage under extreme storms.
            </p>
          </div>

        </div>

        {/* MIDDLE COLUMN (GRID SIZE 5): Centered model canvas layout */}
        <div className="lg:col-span-5 flex items-center justify-center relative order-1 lg:order-2">
          
          {/* Framed Graphic Border */}
          <div className="relative w-full aspect-[4/5] md:w-[85%] lg:w-full border border-white/10 rounded-2xl overflow-hidden bg-slate-900/40 p-1 ">
            
            {/* Hover Specs Overlay */}
            <div className="absolute top-4 left-4 z-20 flex gap-2">
              <span className="bg-slate-950/80 backdrop-blur-md border border-white/10 text-[9px] font-mono text-white/80 py-1 px-2 rounded-md uppercase tracking-widest">
                ACTIVE THERMAL SHIELD SYSTEM
              </span>
            </div>

            <div className="absolute bottom-4 right-4 z-20 flex flex-col gap-1 items-end bg-slate-950/80 backdrop-blur-md border border-white/10 text-[8px] font-mono text-white/60 p-2.5 rounded-lg">
              <p>COAT: MONOCHROMATIC REFLECT-X</p>
              <p>WWD: -30°C OPTIMIZED</p>
            </div>

            {/* Core model image with beautiful fade transition */}
            <div className="w-full h-full rounded-xl overflow-hidden relative">
              <img
                src={currentHeroImage}
                alt="Arctic Oversized Luxury Puffer"
                className="w-full h-full object-cover object-center transition-all duration-700 ease-in-out hover:scale-102"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Micro decorative coordinates */}
            <div className="absolute bottom-2 left-6 text-[8px] font-mono text-white/30 tracking-widest">
              SECURE DECK: APPAREL_AR01_NORTH
            </div>
            
          </div>
        </div>

        {/* RIGHT COLUMN (GRID SIZE 3): Alternate visuals Lookbook Swappable Deck */}
        <div className="lg:col-span-3 flex flex-col gap-6 order-3 justify-center">
          
          {/* Lookbook Heading */}
          <div className="border-b border-white/15 pb-2 text-right">
            <h3 className="text-xs font-mono font-bold tracking-[0.2em] text-[#E2F0FD] uppercase">LOOKBOOK CHANNELS</h3>
            <p className="text-[9px] font-mono text-white/30 uppercase mt-0.5">Toggle live models perspective</p>
          </div>

          {/* Symmetrical cards list */}
          <div className="flex flex-col gap-4">
            {alternateThumbnails.map((item) => {
              const isActive = currentHeroImage === item.img;
              return (
                <div
                  key={item.id}
                  onClick={() => setCurrentHeroImage(item.img)}
                  className={`group relative flex items-center gap-4 p-3 rounded-lg border transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-sky-400/5 border-sky-400/60 shadow-md shadow-sky-400/5'
                      : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10'
                  }`}
                >
                  {/* Thumbnail mask */}
                  <div className="w-16 h-20 rounded overflow-hidden flex-shrink-0 border border-white/10 bg-black">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Text descriptions */}
                  <div className="flex-1 min-w-0">
                    <p className={`text-[10px] font-mono font-bold uppercase transition-colors ${isActive ? 'text-sky-300' : 'text-white/80'}`}>
                      {item.title}
                    </p>
                    <p className="text-[9px] font-mono text-white/40 uppercase mt-1">{item.code}</p>
                    
                    {/* View Details Tag */}
                    <span 
                      onClick={(e) => {
                        e.stopPropagation();
                        // open dialog preview
                        onProductClick(heroProduct);
                      }}
                      className="inline-block mt-1 text-[8px] font-mono text-sky-400/50 hover:text-sky-400 transition-colors uppercase cursor-pointer"
                    >
                      Technical spec inspector &rarr;
                    </span>
                  </div>

                  {/* Active dot */}
                  {isActive && (
                    <div className="absolute right-3 top-3 w-1.5 h-1.5 bg-sky-400 rounded-full animate-bounce" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Quick Link to Master Specs view */}
          <button
            onClick={() => onProductClick(heroProduct)}
            className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded font-mono text-[9px] tracking-widest text-[#E2F0FD] uppercase transition-colors cursor-pointer"
          >
            INSPECT MOLECULAR SPECS &rarr;
          </button>

        </div>

      </div>
    </section>
  );
}
