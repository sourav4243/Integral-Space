"use client";

import { useRef, useCallback } from "react";

// All sounds are synthesized via Web Audio API — no external files needed.
// Gated behind user interaction to respect autoplay policies.

const thwipAudio = typeof window !== "undefined" ? new Audio("/projects-assets/web-shot-sound.mp3") : null;
if (thwipAudio) {
    thwipAudio.preload = "auto";
}

export function useSpideyAudio() {
  const ctxRef = useRef<AudioContext | null>(null);

  const getCtx = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = new AudioContext();
    }
    if (ctxRef.current.state === "suspended") {
      ctxRef.current.resume();
    }
    return ctxRef.current;
  }, []);

  // THWIP - Replaced synthesized noise with actual mp3 file
  const playThwip = useCallback(() => {
    try {
      if (thwipAudio) {
        // Clone to allow instant overlapping playback for fast clicking
        const clone = thwipAudio.cloneNode() as HTMLAudioElement;
        clone.volume = 0.8;
        clone.play().catch(() => {
          // silently fail if autoplay blocked
        });
      }
    } catch {
      // Audio context not available — silently fail
    }
  }, []);

  // THUD — low frequency impact when card lands
  const playThud = useCallback(() => {
    try {
      const ctx = getCtx();
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.setValueAtTime(80, now);
      osc.frequency.exponentialRampToValueAtTime(30, now + 0.15);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.25);

      // Click transient
      const click = ctx.createOscillator();
      click.type = "square";
      click.frequency.setValueAtTime(150, now);

      const clickGain = ctx.createGain();
      clickGain.gain.setValueAtTime(0.2, now);
      clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

      click.connect(clickGain);
      clickGain.connect(ctx.destination);
      click.start(now);
      click.stop(now + 0.05);
    } catch {
      // silently fail
    }
  }, [getCtx]);

  // SPIDER-SENSE — eerie high-frequency sweep (very quiet)
  const playSpiderSense = useCallback(() => {
    try {
      const ctx = getCtx();
      const now = ctx.currentTime;

      // Two detuned oscillators for that unsettling shimmer
      for (const detune of [0, 15]) {
        const osc = ctx.createOscillator();
        osc.type = "sine";
        osc.frequency.setValueAtTime(1800, now);
        osc.frequency.linearRampToValueAtTime(2400, now + 0.15);
        osc.frequency.linearRampToValueAtTime(1800, now + 0.3);
        osc.detune.value = detune;

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.06, now + 0.05);
        gain.gain.linearRampToValueAtTime(0.06, now + 0.2);
        gain.gain.linearRampToValueAtTime(0, now + 0.35);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.4);
      }
    } catch {
      // silently fail
    }
  }, [getCtx]);

  return { playThwip, playThud, playSpiderSense };
}
