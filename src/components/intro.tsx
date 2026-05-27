import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrambleTextPlugin);

const GRID: { char: string; fade: boolean }[][] = [
  [
    { char: "B", fade: true },
    { char: "Q", fade: true },
    { char: "E", fade: true },
    { char: "R", fade: true },
    { char: "S", fade: true },
    { char: "A", fade: true },
    { char: "D", fade: false },
    { char: "J", fade: true },
    { char: "P", fade: true },
  ],
  [
    { char: "D", fade: false },
    { char: "E", fade: false },
    { char: "S", fade: false },
    { char: "I", fade: false },
    { char: "G", fade: false },
    { char: "N", fade: false },
    { char: "E", fade: false },
    { char: "R", fade: false },
    { char: "J", fade: true },
  ],
  [
    { char: "S", fade: true },
    { char: "N", fade: false },
    { char: "D", fade: true },
    { char: "R", fade: true },
    { char: "F", fade: true },
    { char: "G", fade: true },
    { char: "V", fade: false },
    { char: "Y", fade: true },
    { char: "U", fade: true },
  ],
  [
    { char: "P", fade: true },
    { char: "G", fade: false },
    { char: "K", fade: true },
    { char: "M", fade: true },
    { char: "A", fade: true },
    { char: "E", fade: true },
    { char: "S", fade: true },
    { char: "X", fade: true },
    { char: "V", fade: true },
  ],
  [
    { char: "F", fade: true },
    { char: "I", fade: false },
    { char: "N", fade: true },
    { char: "M", fade: true },
    { char: "L", fade: true },
    { char: "O", fade: true },
    { char: "R", fade: true },
    { char: "O", fade: true },
    { char: "Y", fade: true },
  ],
  [
    { char: "I", fade: true },
    { char: "N", fade: false },
    { char: "N", fade: true },
    { char: "O", fade: true },
    { char: "V", fade: true },
    { char: "A", fade: true },
    { char: "T", fade: true },
    { char: "O", fade: true },
    { char: "R", fade: true },
  ],
  [
    { char: "P", fade: true },
    { char: "E", fade: false },
    { char: "L", fade: false },
    { char: "U", fade: false },
    { char: "S", fade: false },
    { char: "I", fade: false },
    { char: "V", fade: false },
    { char: "E", fade: false },
    { char: "X", fade: true },
  ],
  [
    { char: "C", fade: true },
    { char: "E", fade: false },
    { char: "F", fade: true },
    { char: "S", fade: true },
    { char: "K", fade: true },
    { char: "J", fade: true },
    { char: "I", fade: true },
    { char: "U", fade: true },
    { char: "Y", fade: true },
  ],
  [
    { char: "A", fade: false },
    { char: "R", fade: false },
    { char: "T", fade: false },
    { char: "I", fade: false },
    { char: "S", fade: false },
    { char: "T", fade: false },
    { char: "A", fade: true },
    { char: "L", fade: true },
    { char: "E", fade: true },
  ],
];

// Scramble duration — all cells finish at roughly the same time
const SCRAMBLE_DURATION = 3.5;

function Intro() {
  const tableRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!tableRef.current) return;

    const cells = tableRef.current.querySelectorAll<HTMLElement>(".scramble");

    // All cells start: same muted color, slightly below, invisible
    gsap.set(cells, { opacity: 0, y: 10, color: "#c2bab3" });

    // Phase 1: all rise up and fade in together
    gsap.to(cells, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out",
      stagger: { amount: 0.3, from: "start" },
    });

    // Phase 2: all scramble simultaneously, same color
    cells.forEach((cell) => {
      const text = cell.textContent ?? "";
      gsap.to(cell, {
        delay: 0.2,
        duration: SCRAMBLE_DURATION,
        ease: "power2.inOut",
        scrambleText: {
          text,
          chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
          revealDelay: 0.5,
          speed: 0.4,
        },
      });
    });

    // Phase 3: word cells fade to dark, noise cells fade out
    const resolveDelay = 0.2 + SCRAMBLE_DURATION;

    cells.forEach((cell) => {
      const isFade = cell.classList.contains("fadeOut");

      if (!isFade) {
        // Word cells: fade to dark
        gsap.to(cell, {
          delay: resolveDelay,
          color: "#1e1b18",
          duration: 0.6,
          ease: "power2.out",
        });
      } else {
        // Noise cells: fade out
        gsap.to(cell, {
          delay: resolveDelay + Math.random() * 0.4,
          opacity: 0,
          duration: 0.8,
          ease: "power2.in",
        });
      }
    });
  }, []);

  return (
    <div ref={tableRef} className="reveal w-full relative">
      <div className="w-full py-24 z-50 flex justify-center items-center">
        <div className="font-anonymous text-sm md:text-base p-8">
          <table className="table-auto w-full">
            <tbody>
              {GRID.map((row, ri) => (
                <tr key={ri}>
                  {row.map((cell, ci) => (
                    <td
                      key={ci}
                      className={`w-10 h-10 text-center scramble select-none${cell.fade ? " fadeOut" : ""}`}
                      style={{ willChange: "opacity, transform, color" }}
                    >
                      {cell.char}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Intro;
