"use client";

import { useEffect, useRef } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&@*+=-∫∂λφπΣΩ<>";

export default function MatrixRain() {
    const boxRef = useRef<HTMLDivElement | null>(null);
    
    useEffect(() => {
        const box = boxRef.current;
        if(!box) return;

        const boxWidth = box.offsetWidth;
        const boxHeight = box.offsetHeight;

        const columnWidth = 12;
        const numOfCols = Math.floor(boxWidth / columnWidth);
        const columns: HTMLDivElement[] = [];

        for (let i=0; i<numOfCols; i++) {
            const col = document.createElement("div");
            col.className = "matrix-column";
            col.style.left = `${i * 12}px`;
            box.appendChild(col);
            columns.push(col);
        }

        columns.forEach((col) => {
            let y = Math.random() * -100;
            const speed = 1 + Math.random() * 3;
            const index = Math.floor(Math.random() * CHARS.length)
            function animate() {
                y += speed;

                col.style.transform = `translateY(${y}px)`;
                col.innerText = CHARS[index];

                if(y > boxHeight) {
                    y = Math.random() * -100;
                }

                requestAnimationFrame(animate);
            }
            animate();
        });
    }, []);

    return (
        <div
            ref={boxRef}
            className="relative overflow-hidden w-full h-full matrix-box"
        >
        </div>
    );
};