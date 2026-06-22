/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function SoundSystem() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const filterRef = useRef<BiquadFilterNode | null>(null);
  const timerRef = useRef<number | null>(null);

  const startWindSynth = () => {
    try {
      // Create audio context if it doesn't exist
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }

      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // 1. Generate White Noise Buffer
      const bufferSize = 2 * ctx.sampleRate;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      
      // Simple pink/white noise approximation
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        // Pink noise filtering approximation
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
        output[i] *= 0.11; // scale down
        b6 = white * 0.115926;
      }

      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = noiseBuffer;
      noiseSource.loop = true;

      // 2. Create Dynamic Filter
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.Q.value = 4.0; // high quality value means narrower swoosh
      filter.frequency.value = 350; // starting freq

      // 3. Gain node for smooth volume transitions
      const gainNode = ctx.createGain();
      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 1.2); // soft fade-in

      // Connect nodes
      noiseSource.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);

      // Save references for controls
      gainNodeRef.current = gainNode;
      filterRef.current = filter;

      noiseSource.start(0);
      setIsPlaying(true);

      // 4. Modulator loop to make "gusty windy" variations
      let phase = 0;
      const modulateWind = () => {
        if (!filterRef.current || !ctx) return;
        phase += 0.015;
        // Gust formulas combining multiple sine waves for unpredictability
        const gust = Math.sin(phase) * 120 + Math.sin(phase * 1.7) * 60 + Math.cos(phase * 0.4) * 180;
        const targetFreq = 420 + gust; // sweeps between 100Hz and 800Hz
        
        filterRef.current.frequency.setTargetAtTime(
          Math.max(120, targetFreq),
          ctx.currentTime,
          0.1
        );
        timerRef.current = requestAnimationFrame(modulateWind);
      };
      modulateWind();

    } catch (e) {
      console.error('Audio initialization error:', e);
    }
  };

  const stopWindSynth = () => {
    if (timerRef.current) {
      cancelAnimationFrame(timerRef.current);
    }
    const ctx = audioCtxRef.current;
    const gainNode = gainNodeRef.current;

    if (ctx && gainNode) {
      gainNode.gain.setValueAtTime(gainNode.gain.value, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.5); // smooth fade-out
      setTimeout(() => {
        try {
          ctx.close();
        } catch(err){}
        audioCtxRef.current = null;
        gainNodeRef.current = null;
        filterRef.current = null;
      }, 600);
    }
    setIsPlaying(false);
  };

  const toggleSound = () => {
    if (isPlaying) {
      stopWindSynth();
    } else {
      startWindSynth();
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) cancelAnimationFrame(timerRef.current);
    };
  }, []);

  return (
    <button
      id="sound-toggle-btn"
      onClick={toggleSound}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-mono transition-all duration-300 ${
        isPlaying
          ? 'bg-sky-500/10 border-sky-400 text-sky-400 shadow-md shadow-sky-400/10'
          : 'bg-white/5 border-white/15 text-white/50 hover:text-white hover:border-white/30'
      }`}
      title={isPlaying ? 'Mute Arctic Atmosphere' : 'Play Arctic Wind Atmosphere'}
    >
      {isPlaying ? (
        <>
          <Volume2 size={13} className="animate-pulse" />
          <span className="tracking-wider text-[10px] uppercase">ATMOSPHERE ON</span>
          <div className="flex items-end gap-0.5 h-2.5 px-0.5">
            <span className="w-[1.5px] bg-sky-400 animate-[soundwave_0.8s_infinite] h-1.5" />
            <span className="w-[1.5px] bg-sky-400 animate-[soundwave_1.2s_infinite_-0.2s] h-2.5" />
            <span className="w-[1.5px] bg-sky-400 animate-[soundwave_0.9s_infinite_-0.4s] h-2" />
          </div>
        </>
      ) : (
        <>
          <VolumeX size={13} />
          <span className="tracking-wider text-[10px] uppercase">SOUND OFF</span>
        </>
      )}
    </button>
  );
}
