/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Compass, Thermometer, ShieldCheck, ArrowRight } from 'lucide-react';

export default function CampaignSection() {
  const [activeStatTab, setActiveStatTab] = useState<'altitude' | 'membrane' | 'temp'>('altitude');

  const campaignStats = {
    altitude: {
      title: 'TARGET PEAK DOCK',
      value: 'ELEVATION 4,810M',
      desc: 'Tested on Mt. Mont Blanc and local Svalbard glacier valleys. Guaranteed structural cohesion at peak air densities and extreme low pressures.'
    },
    membrane: {
      title: 'FRZN-TEX™ BARRIER',
      value: '40,000MM COLUMN',
      desc: 'Triple-membrane technology that blocks 100% of liquid moisture molecules while permitting hot vapor columns to escape seamlessly.'
    },
    temp: {
      title: 'CRYOGENIC RATING',
      value: 'TOLERANCE -45°C',
      desc: 'Engineered with premium Polish Goose down composite matrix and aerogel zones to provide sustained temperature cores during absolute stasis.'
    }
  };

  return (
    <section id="campaign" className="relative h-screen bg-slate-950 flex flex-col justify-between overflow-hidden text-white font-sans">
      
      {/* Background Cinematic Wide mountain image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/arctic_mountain_1781668732404.jpg"
          alt="Arctic Majestic Mountain peaks"
          className="w-full h-full object-cover object-center brightness-65 saturate-[0.80] contrast-105 select-none"
          referrerPolicy="no-referrer"
        />
        {/* Deep, rich radial and gradient overlay to allow readable letters */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-slate-950/40 to-slate-950/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/70" />
      </div>

      {/* Campaign Decorative Header - Top Row */}
      <div className="relative z-10 p-6 md:p-12 flex justify-between items-start font-mono text-[10px] tracking-widest text-white/50 uppercase border-b border-white/5 bg-slate-950/20 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <Compass size={14} className="text-sky-300 animate-spin-slow" />
          <span>EXPEDITION REGISTRY: SPB_902N</span>
        </div>
        <div className="hidden sm:block text-right">
          <span>LAT: 78.2232° N / LONG: 15.6469° E</span>
        </div>
      </div>

      {/* Campaign Tagline & Core message - Middle Symmetrical Row */}
      <div className="relative z-10 max-w-[1440px] mx-auto w-full px-6 md:px-12 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-12 py-12 flex-1">
        
        {/* Massive Bold Slogan Typography */}
        <div className="space-y-4 max-w-2xl">
          <p className="text-sky-400 font-mono text-xs tracking-[0.4em] uppercase font-bold">
            THE ABSOLUTE EXPEDITION MATRIC
          </p>
          <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-sans font-extrabold tracking-tight leading-none text-[#E2F0FD] uppercase group cursor-default">
            <span className="block hover:text-sky-300 transition-colors">BUILT FOR COLD</span>
            <span className="block hover:text-sky-300 transition-colors">MADE FOR HEIGHT</span>
            <span className="block hover:text-sky-300 transition-colors">FORGED TO LAST</span>
          </h2>
        </div>

        {/* Right side interactive specifications cards */}
        <div className="w-full lg:max-w-md bg-slate-950/70 border border-white/10 rounded-xl p-5 md:p-6 backdrop-blur-lg space-y-5">
          
          {/* Navigation selectors */}
          <div className="flex justify-between border-b border-white/10 pb-3 text-[9px] font-mono">
            {Object.keys(campaignStats).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveStatTab(tab as any)}
                className={`uppercase tracking-wider mr-2 last:mr-0 transition-colors pb-1 border-b cursor-pointer ${
                  activeStatTab === tab
                    ? 'border-sky-400 text-sky-300 font-bold'
                    : 'border-transparent text-white/40 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Render active specification */}
          <div className="space-y-2 min-h-[110px]">
            <p className="text-[10px] text-sky-400 font-mono tracking-widest uppercase">
              {campaignStats[activeStatTab].title}
            </p>
            <h4 className="text-2xl font-sans font-bold tracking-tight uppercase">
              {campaignStats[activeStatTab].value}
            </h4>
            <p className="text-xs text-white/60 leading-relaxed font-sans font-light">
              {campaignStats[activeStatTab].desc}
            </p>
          </div>

          {/* Interactive feedback alert */}
          <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-lg p-3 text-[10px] font-mono text-[#E2F0FD]/80 uppercase">
            <ShieldCheck size={14} className="text-emerald-400 flex-shrink-0" />
            <span>CERTIFIED FIELD-PROVEN SYSTEM CORE BY SVALBARD LABS</span>
          </div>

        </div>

      </div>

      {/* Campaign Footer Barcode element - Bottom Row */}
      <div className="relative z-10 p-6 md:p-12 border-t border-white/5 bg-slate-950/70 backdrop-blur-md">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] font-mono uppercase tracking-widest text-[#E2F0FD]/40">
          
          <div className="max-w-sm space-y-1">
            <p className="text-white text-xs font-bold tracking-wider">FRZNV™ INC</p>
            <p className="text-white/40 leading-relaxed text-[9px]">
              Born in extreme altitudes, designed as responses to deep winter storms. Strictly not for the casual, but forged for those who climb.
            </p>
          </div>

          {/* Symmetrical High-tech Barcode and serial signatures */}
          <div className="flex items-center gap-4 border border-white/10 bg-white/5 p-3 rounded-lg">
            <div className="text-right">
              <p className="text-[10px] font-bold text-white tracking-widest">SERIAL ID: FR-092-A</p>
              <p className="text-[8px] text-white/30 uppercase mt-0.5">ESTABLISHED 2026 SVALBARD</p>
            </div>
            {/* Elegant SVG/Flex Barcode */}
            <div className="flex items-stretch gap-[1.5px] h-9 w-20 px-1 border-l border-white/10 pl-3">
              <span className="w-[1.5px] bg-sky-300" />
              <span className="w-[3px] bg-sky-300" />
              <span className="w-[1.5px] bg-sky-300/30" />
              <span className="w-[1.5px] bg-sky-300" />
              <span className="w-[4px] bg-sky-300" />
              <span className="w-[1.5px] bg-sky-300/10" />
              <span className="w-[2px] bg-sky-300" />
              <span className="w-[1.5px] bg-sky-300" />
              <span className="w-[3.5px] bg-sky-300" />
              <span className="w-[1.5px] bg-sky-300" />
              <span className="w-[1.5px] bg-sky-300" />
              <span className="w-[2.5px] bg-sky-300" />
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
