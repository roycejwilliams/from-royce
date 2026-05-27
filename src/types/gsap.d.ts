/* eslint-disable @typescript-eslint/no-explicit-any */
// Type stubs for GSAP Simply (private registry package).
// The actual types ship with the package when installed via authenticated registry.
declare module "gsap" {
  const gsap: any;
  export default gsap;
  export const gsap: any;
  export function to(targets: any, vars: any): any;
  export function from(targets: any, vars: any): any;
  export function fromTo(targets: any, fromVars: any, toVars: any): any;
  export function set(targets: any, vars: any): any;
  export function timeline(vars?: any): any;
  export function registerPlugin(...args: any[]): void;
}

declare module "gsap/ScrollTrigger" {
  export const ScrollTrigger: any;
  export default ScrollTrigger;
}

declare module "gsap/ScrambleTextPlugin" {
  export const ScrambleTextPlugin: any;
  export default ScrambleTextPlugin;
}
