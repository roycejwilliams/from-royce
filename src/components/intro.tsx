"use client";
import React, {  useRef } from "react";
import { gsap } from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrambleTextPlugin);


function Intro() {

  const tableRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!tableRef.current) return;
    // Select all table cells with the "scramble" class
    const cells = tableRef.current.querySelectorAll('.scramble');

    cells.forEach((cell) => {
      const text = cell.textContent ?? "";
      // Create a timeline for each cell
      const tl = gsap.timeline();
      // Smooth scramble animation with easing
      tl.to(cell, {
        duration: 5,
        ease: "power2.inOut", // Smooth easing for scramble effect
        scrambleText: {
          text, // Scramble to the cell's original text
          chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
          revealDelay: 0.3,
        },
      });
      // If the cell should disappear, fade it out with easing
      if (cell.classList.contains("fadeOut")) {
        tl.to(cell, {
          duration: 1,
          ease: "power2.out", // Smooth easing for the fade-out effect
          opacity: 0,
        });
      }
    });
  }, []);

  return (
    <div ref={tableRef}  className="w-full  relative   ">
      
      {/* Crossword */}
     <div className="w-full h-[75vh]   z-50 flex justify-center items-center">
      <div data-scroll data-scroll-speed="0.2" className="text-[#999898] font-anonymous text-sm md:text-base ">
        <table className="table-auto w-full ">
          <tbody>
            <tr>
              <td  className=" w-10 h-10 text-center scramble fadeOut">
                B
              </td>
              <td  className=" w-10 h-10 text-center scramble fadeOut">
                Q
              </td>
              <td  className=" w-10 h-10 text-center scramble fadeOut">
                E
              </td>
              <td  className=" w-10 h-10 text-center scramble fadeOut">
                R
              </td>
              <td  className=" w-10 h-10 text-center scramble fadeOut">
                S
              </td>
              <td  className=" w-10 h-10 text-center scramble fadeOut">
                A
              </td>
              <td  className=" w-10 h-10 text-center scramble ">
                D
              </td>
              <td  className=" w-10 h-10 text-center scramble fadeOut">
                J
              </td>
              <td  className=" w-10 h-10 text-center scramble fadeOut">
                P
              </td>
            </tr>
          </tbody>
        </table>
        <table className="table-auto w-full">
          <tbody>
            <tr>
              <td  className=" w-10 h-10 text-center scramble">
                D
              </td>
              <td  className=" w-10 h-10 text-center scramble">
                E
              </td>
              <td  className=" w-10 h-10 text-center scramble">
                S
              </td>
              <td  className=" w-10 h-10 text-center scramble">
                I
              </td>
              <td  className=" w-10 h-10 text-center scramble">
                G
              </td>
              <td  className=" w-10 h-10 text-center scramble">
                N
              </td>
              <td  className=" w-10 h-10 text-center scramble">
                E
              </td>
              <td  className=" w-10 h-10 text-center scramble">
                R
              </td>
              <td  className=" w-10 h-10 text-center scramble fadeOut">
                J
              </td>
            </tr>
          </tbody>
        </table>
        <table className="table-auto w-full">
          <tbody>
            <tr>
              <td  className=" w-10 h-10 text-center scramble fadeOut">
                S
              </td>
              <td  className=" w-10 h-10 text-center scramble ">
                N
              </td>
              <td  className=" w-10 h-10 text-center scramble fadeOut">
                D
              </td>
              <td  className=" w-10 h-10 text-center scramble fadeOut">
                R
              </td>
              <td  className=" w-10 h-10 text-center scramble fadeOut">
                F
              </td>
              <td  className=" w-10 h-10 text-center scramble fadeOut">
                G
              </td>
              <td  className=" w-10 h-10 text-center scramble ">
                V
              </td>
              <td  className=" w-10 h-10 text-center scramble fadeOut">
                Y
              </td>
              <td  className=" w-10 h-10 text-center scramble fadeOut">
                U
              </td>
            </tr>
          </tbody>
        </table>
        <table className="table-auto w-full">
          <tbody>
            <tr>
              <td  className=" w-10 h-10 text-center scramble fadeOut">
                P
              </td>
              <td  className=" w-10 h-10 text-center scramble">
                G
              </td>
              <td  className=" w-10 h-10 text-center scramble fadeOut">
                K
              </td>
              <td  className=" w-10 h-10 text-center scramble fadeOut">
                M
              </td>
              <td  className=" w-10 h-10 text-center scramble fadeOut">
                A
              </td>
              <td  className=" w-10 h-10 text-center scramble fadeOut">
                E
              </td>
              <td  className=" w-10 h-10 text-center scramble fadeOut">
                S
              </td>
              <td  className=" w-10 h-10 text-center scramble fadeOut">
                X
              </td>
              <td  className=" w-10 h-10 text-center scramble fadeOut">
                V
              </td>
            </tr>
          </tbody>
        </table>
        <table className="table-auto w-full">
          <tbody>
            <tr>
              <td  className=" w-10 h-10 text-center scramble fadeOut">
                F
              </td>
              <td  className=" w-10 h-10 text-center scramble">
                I
              </td>
              <td  className=" w-10 h-10 text-center scramble fadeOut">
                N
              </td>
              <td  className=" w-10 h-10 text-center scramble fadeOut">
                M
              </td>
              <td  className=" w-10 h-10 text-center scramble fadeOut">
                L
              </td>
              <td  className=" w-10 h-10 text-center scramble fadeOut">
                O
              </td>
              <td  className=" w-10 h-10 text-center scramble fadeOut">
                R
              </td>
              <td  className=" w-10 h-10 text-center scramble fadeOut">
                O
              </td>
              <td  className=" w-10 h-10 text-center scramble fadeOut">
                Y
              </td>
            </tr>
          </tbody>
        </table>
        <table className="table-auto w-full">
          <tbody>
            <tr>
              <td  className=" w-10 h-10 text-center scramble fadeOut">
                I
              </td>
              <td  className=" w-10 h-10 text-center scramble">
                N
              </td>
              <td  className=" w-10 h-10 text-center scramble fadeOut">
                N
              </td>
              <td  className=" w-10 h-10 text-center scramble fadeOut">
                O
              </td>
              <td  className=" w-10 h-10 text-center scramble fadeOut">
                V
              </td>
              <td  className=" w-10 h-10 text-center scramble fadeOut">
                A
              </td>
              <td  className=" w-10 h-10 text-center scramble fadeOut">
                T
              </td>
              <td  className=" w-10 h-10 text-center scramble fadeOut">
                O
              </td>
              <td  className=" w-10 h-10 text-center scramble fadeOut">
                R
              </td>
            </tr>
          </tbody>
        </table>
        <table className="table-auto w-full">
          <tbody>
            <tr>
              <td  className=" w-10 h-10 text-center scramble fadeOut">
                P
              </td>
              <td  className=" w-10 h-10 text-center scramble">
                E
              </td>
              <td  className=" w-10 h-10 text-center scramble ">
                L
              </td>
              <td  className=" w-10 h-10 text-center scramble ">
                U
              </td>
              <td  className=" w-10 h-10 text-center scramble ">
                S
              </td>
              <td  className=" w-10 h-10 text-center scramble ">
                I
              </td>
              <td  className=" w-10 h-10 text-center scramble ">
                V
              </td>
              <td  className=" w-10 h-10 text-center scramble ">
                E
              </td>
              <td  className=" w-10 h-10 text-center scramble fadeOut">
                X
              </td>
            </tr>
          </tbody>
        </table>
        <table className="table-auto w-full">
          <tbody>
            <tr>
              <td  className=" w-10 h-10 text-center scramble fadeOut">
                C
              </td>
              <td  className=" w-10 h-10 text-center scramble ">
                E
              </td>
              <td  className=" w-10 h-10 text-center scramble fadeOut">
                F
              </td>
              <td  className=" w-10 h-10 text-center scramble fadeOut">
                S
              </td>
              <td  className=" w-10 h-10 text-center scramble fadeOut">
                K
              </td>
              <td  className=" w-10 h-10 text-center scramble fadeOut">
                J
              </td>
              <td  className=" w-10 h-10 text-center scramble fadeOut">
                I
              </td>
              <td  className=" w-10 h-10 text-center scramble fadeOut">
                U
              </td>
              <td  className=" w-10 h-10 text-center scramble fadeOut">
                Y
              </td>
            </tr>
          </tbody>
        </table>
        <table className="table-auto w-full">
          <tbody>
            <tr>
              <td  className=" w-10 h-10 text-center scramble ">
                A
              </td>
              <td  className=" w-10 h-10 text-center scramble">
                R
              </td>
              <td  className=" w-10 h-10 text-center scramble ">
                T
              </td>
              <td  className=" w-10 h-10 text-center scramble ">
                I
              </td>
              <td  className=" w-10 h-10 text-center scramble ">
                S
              </td>
              <td  className=" w-10 h-10 text-center scramble ">
                T
              </td>
              <td  className=" w-10 h-10 text-center scramble fadeOut">
                A
              </td>
              <td  className=" w-10 h-10 text-center scramble fadeOut">
                L
              </td>
              <td  className=" w-10 h-10 text-center scramble fadeOut">
                E
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      </div> 
    </div>
  );
}

export default Intro;
