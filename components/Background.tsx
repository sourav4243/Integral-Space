"use client";

import React from "react";

const STAR_COUNT = 30;

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export default function Background() {
  const stars = Array.from({ length: STAR_COUNT }).map((_, i) => {
    const tailLength = `${rand(5, 7.5).toFixed(2)}em`;
    const topOffset = `${rand(0, 100).toFixed(2)}vh`;
    const fallDuration = `${rand(6, 12).toFixed(2)}s`; 
    const fallDelay = `${rand(0, 10).toFixed(2)}s`; 

    return {
      key: `star-${i}`,
      style: {
        ["--star-tail-length" as any]: tailLength,
        ["--top-offset" as any]: topOffset,
        ["--fall-duration" as any]: fallDuration,
        ["--fall-delay" as any]: fallDelay,
      } as React.CSSProperties,
    };
  });

  return (
    <>
      <div className="stars" aria-hidden>
        {stars.map((s) => (
          <div className="star" key={s.key} style={s.style} />
        ))}
      </div>

      <style jsx global>{`
        :root {
          --primary-color: #a8d1ff;
        }

        body {
          margin: 0;
          min-height: 100vh;
          background: radial-gradient(ellipse at bottom, #040a1c 0%, #0c0d13 100%);
          overflow: hidden;
        }

        .stars {
          position: fixed;
          top: -150;
          left: -50;
          width: 100%;
          height: 120%;
          transform: rotate(-45deg);
          pointer-events: none;
          z-index: -1;
        }

        .star {
          /* default CSS variables (will be overridden per-star) */
          --star-color: var(--primary-color);
          --star-tail-length: 6em;
          --star-tail-height: 2px;
          --star-width: calc(var(--star-tail-length) / 6);
          --fall-duration: 9s;
          --tail-fade-duration: var(--fall-duration);
          --top-offset: 50vh;
          --fall-delay: 0s;

          position: absolute;
          top: var(--top-offset);
          left: 0;
          width: var(--star-tail-length);
          height: var(--star-tail-height);
          color: var(--star-color);
          background: linear-gradient(45deg, currentColor, transparent);
          border-radius: 50%;
          filter: drop-shadow(0 0 6px currentColor);
          transform: translate3d(104em, 0, 0);
          animation:
            fall var(--fall-duration) var(--fall-delay) linear infinite,
            tail-fade var(--tail-fade-duration) var(--fall-delay) ease-out infinite;
        }

        /* small mobile optimization: drop tail-fade (less paint) */
        @media screen and (max-width: 750px) {
          .star {
            animation: fall var(--fall-duration) var(--fall-delay) linear infinite;
          }
        }

        .star::before,
        .star::after {
          position: absolute;
          content: "";
          top: 0;
          left: calc(var(--star-width) / -2);
          width: var(--star-width);
          height: 100%;
          background: linear-gradient(45deg, transparent, currentColor, transparent);
          border-radius: inherit;
          animation: blink 2s linear infinite;
        }

        .star::before {
          transform: rotate(45deg);
        }
        .star::after {
          transform: rotate(-45deg);
        }

        @keyframes fall {
          to {
            transform: translate3d(-30em, 0, 0);
          }
        }

        @keyframes tail-fade {
          0%,
          50% {
            width: var(--star-tail-length);
            opacity: 1;
          }
          70%,
          80% {
            width: 0;
            opacity: 0.4;
          }
          100% {
            width: 0;
            opacity: 0;
          }
        }

        @keyframes blink {
          50% {
            opacity: 0.6;
          }
        }
      `}</style>
    </>
  );
}
