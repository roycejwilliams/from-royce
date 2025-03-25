import React from "react";
import { useRef,  } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

// Extend the Window interface
declare global {
  interface Window {
    prevScrollY?: number; // Add the prevScrollY property
  }
}

function Idea() {
  const svgContainer = useRef(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

   useGSAP(() => {
     if (!svgContainer.current || !svgRef.current) return;

     const ctx = gsap.context(() => {
        //Create an infinite spinning animation
       const spinAnimation = gsap.to(svgRef.current, {
         rotation: 360,
         duration: 10,  //Fixed duration for consistent speed
         repeat: -1,  //Infinite spin
         ease: "linear", // Smooth constant spin
       });

        //Listener for scroll event to change spin direction
       const handleScroll = () => {
         const velocity = gsap.utils.clamp(
           -1,
           1,
           window.scrollY - (window.prevScrollY || 0)
         );  //Calculate scroll velocity
         const direction = velocity >= 0 ? 1 : -1;  //Positive for clockwise, negative for counterclockwise
         spinAnimation.timeScale(direction);  //Adjust spin direction
         window.prevScrollY = window.scrollY;  //Save current scroll position
       };

        //Attach scroll event listener
       window.addEventListener("scroll", handleScroll);

       return () => {
         window.removeEventListener("scroll", handleScroll);  //Cleanup listener on component unmount
       };
     }, svgContainer);

     return () => ctx.revert(); 
   }, []);

  return (
    <section
      ref={svgContainer}
      className=" min-h-[85vh] flex justify-center items-center "
    >
      <div className="relative w-full   float-right h-full  uppercase tracking-[0.3em] text-xs flex justify-center items-center  text-white  ">
        <h1 className="text-center mt-4 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 font-anonymous text-white w-1/4 font-light leading-loose  uppercase  float-right text-2xl ">
          <span className="font-cylburn text-9xl">F</span>ullfilling the
          EveryDay <span className="font-cylburn text-9xl">I</span>dea.
        </h1>
        <div className="flex justify-center p-60 w-auto items-center relative ">
          <svg
            ref={svgRef}
            width="553"
            height="556"
            viewBox="0 0 553 556"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className=" max-w-full absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
          >
            <path
              d="M266.82 30.6848C269.934 30.8695 273.312 29.0503 278.493 24.4048C282.71 20.6158 288.902 12.7125 293.566 8.66148C295.698 6.76838 297.653 5.44173 299.333 4.67586C298.274 3.89178 296.811 3.42037 295.038 3.31524C278.843 2.35485 262.242 17.094 261.778 24.9042C261.536 28.9771 264.089 30.5229 266.82 30.6848ZM267.693 32.1791C264.051 31.9632 260.661 29.935 260.963 24.8559C261.479 16.1833 278.685 1.7685 295.168 2.74594C297.181 2.86528 298.835 3.34805 300.122 4.338C301.259 3.82837 302.279 3.64846 303.046 3.69392C303.812 3.73938 303.939 4.0354 303.778 4.31437C303.107 4.27459 302.228 4.51094 301.035 5.16147C302.204 6.52906 302.809 8.4883 302.646 11.2195C302.324 16.6339 296.015 22.4627 291.272 22.1814C289.834 22.0961 288.902 21.6081 288.271 20.8975C288.135 20.7452 288.051 20.5478 288.06 20.4041C288.065 20.3083 288.122 20.1674 288.271 20.0801C288.589 20.3874 289.097 20.7541 290.151 20.8166C293.121 20.9928 300.876 15.9229 301.266 9.35852C301.358 7.82523 300.998 6.60178 300.288 5.59801C299.637 6.04022 298.932 6.57543 298.119 7.29661C293.911 10.9419 286.275 21.308 280.592 26.3084C276.378 30.0495 272.197 32.4462 267.693 32.1791Z"
              fill="white"
            />
            <path
              d="M325.501 35.4494C325.332 36.3001 325.084 37.0514 324.756 37.7034C324.436 38.3568 324.028 38.8895 323.532 39.3013C323.046 39.707 322.473 39.9843 321.815 40.133C321.156 40.2818 320.413 40.2745 319.585 40.1112C318.75 39.9464 318.056 39.6701 317.503 39.2824C316.958 38.8962 316.538 38.4231 316.243 37.8631C315.957 37.297 315.787 36.6464 315.733 35.9111C315.687 35.1774 315.748 34.3852 315.917 33.5345L317.822 23.9009L319.397 24.2117L317.487 33.8683C317.398 34.3205 317.341 34.807 317.318 35.328C317.302 35.8504 317.368 36.3413 317.516 36.8005C317.672 37.2612 317.93 37.6704 318.289 38.0279C318.656 38.387 319.177 38.6331 319.851 38.7662C320.526 38.8993 321.101 38.8694 321.577 38.6767C322.061 38.4855 322.459 38.2056 322.77 37.8372C323.09 37.4702 323.338 37.0413 323.515 36.5506C323.691 36.0599 323.825 35.5885 323.914 35.1363L325.824 25.4797L327.411 25.7928L325.501 35.4494Z"
              fill="white"
            />
            <path
              d="M359.959 49.6761L358.033 49.0093L355.96 41.3603L353.712 40.5824L351.565 46.7712L350.048 46.2462L355.061 31.7981L359.823 33.446C361.41 33.9953 362.519 34.7676 363.149 35.7628C363.782 36.7507 363.861 37.9311 363.384 39.3039C363.174 39.9092 362.878 40.4183 362.495 40.8314C362.114 41.237 361.68 41.5458 361.194 41.7575C360.707 41.9693 360.169 42.0891 359.58 42.117C358.999 42.1473 358.398 42.0799 357.777 41.9147L359.959 49.6761ZM361.812 38.7598C362.152 37.7781 362.094 36.9561 361.638 36.2939C361.191 35.6267 360.436 35.1092 359.373 34.7413L356.128 33.6185L354.162 39.287L357.407 40.4099C358.47 40.7778 359.381 40.845 360.14 40.6117C360.909 40.3735 361.466 39.7562 361.812 38.7598Z"
              fill="white"
            />
            <path
              d="M393.452 51.4015C392.794 52.7237 391.893 53.5019 390.747 53.736C389.601 53.9702 388.283 53.7177 386.792 52.9785L383.695 51.443L380.779 57.309L379.34 56.5959L386.147 42.9014L390.662 45.1397C392.167 45.8858 393.169 46.7924 393.668 47.8595C394.171 48.9196 394.098 50.1002 393.452 51.4015ZM392.013 50.6884C392.483 49.7439 392.524 48.9143 392.138 48.1996C391.755 47.4779 391.067 46.8706 390.073 46.3779L386.976 44.8423L384.305 50.2152L387.402 51.7507C388.396 52.2435 389.295 52.4275 390.098 52.3027C390.906 52.1709 391.544 51.6328 392.013 50.6884Z"
              fill="white"
            />
            <path
              d="M420.346 70.184C419.769 71.0287 419.124 71.785 418.411 72.4529C417.699 73.1208 416.947 73.6247 416.157 73.9647C415.366 74.3047 414.535 74.4471 413.664 74.392C412.804 74.3349 411.931 74.0048 411.047 73.4017C410.163 72.7985 409.535 72.1051 409.162 71.3213C408.8 70.5355 408.631 69.7107 408.654 68.8468C408.683 67.9873 408.883 67.107 409.253 66.2058C409.617 65.3002 410.088 64.425 410.666 63.5802C411.243 62.7355 411.888 61.9792 412.601 61.3113C413.306 60.639 414.06 60.1319 414.862 59.7899C415.67 59.4522 416.505 59.312 417.365 59.3691C418.236 59.4242 419.107 59.7489 419.978 60.3432C420.849 60.9375 421.466 61.6276 421.828 62.4134C422.2 63.1972 422.37 64.022 422.336 64.8879C422.302 65.7538 422.106 66.6418 421.749 67.5518C421.392 68.4618 420.924 69.3392 420.346 70.184ZM419.01 69.2726C419.579 68.4408 420.01 67.6377 420.303 66.8634C420.607 66.0871 420.771 65.3623 420.796 64.6891C420.822 64.0158 420.698 63.407 420.427 62.8625C420.167 62.3161 419.759 61.8535 419.204 61.4749C418.513 61.0039 417.832 60.7755 417.16 60.7897C416.494 60.8084 415.847 60.9864 415.219 61.3239C414.59 61.6613 414.003 62.1118 413.457 62.6754C412.917 63.2433 412.428 63.8465 411.992 64.485C411.56 65.1169 411.175 65.7906 410.837 66.5059C410.51 67.2191 410.306 67.9261 410.224 68.6269C410.147 69.3213 410.218 69.9848 410.438 70.6174C410.67 71.248 411.131 71.7989 411.821 72.2699C412.505 72.7366 413.184 72.9628 413.856 72.9485C414.533 72.9278 415.181 72.7552 415.8 72.4307C416.424 72.0997 417.006 71.6502 417.546 71.0822C418.09 70.5078 418.578 69.9046 419.01 69.2726Z"
              fill="white"
            />
            <path
              d="M447.331 95.2175C446.9 95.6914 446.41 96.0327 445.861 96.2414C445.318 96.4443 444.755 96.5348 444.173 96.513C443.59 96.4911 443.017 96.3611 442.452 96.1229C441.887 95.8847 441.373 95.5556 440.911 95.1356C440.274 94.5581 439.798 93.9094 439.481 93.1895C439.164 92.4696 439.06 91.7367 439.168 90.9909L438.072 92.1958L437.065 91.2824L440.196 87.841L441.202 88.7544C440.85 89.1416 440.617 89.5784 440.501 90.0648C440.392 90.5453 440.371 91.0272 440.438 91.5104C440.505 91.9935 440.658 92.4643 440.896 92.9227C441.145 93.3806 441.457 93.7801 441.833 94.1214C442.169 94.4258 442.52 94.6605 442.888 94.8252C443.261 94.9842 443.633 95.0742 444.005 95.095C444.382 95.1101 444.747 95.0457 445.1 94.9016C445.458 94.7628 445.785 94.5316 446.079 94.208C446.41 93.8439 446.613 93.4584 446.688 93.0513C446.768 92.6495 446.757 92.2328 446.653 91.8011C446.555 91.3747 446.396 90.9457 446.176 90.5141C445.962 90.0767 445.738 89.6369 445.507 89.1948C445.228 88.6776 444.953 88.1546 444.685 87.6258C444.421 87.0913 444.238 86.5556 444.134 86.0189C444.031 85.4822 444.036 84.9486 444.149 84.4181C444.267 83.8819 444.563 83.3537 445.036 82.8336C445.457 82.3713 445.928 82.0502 446.451 81.8704C446.979 81.6848 447.515 81.6121 448.059 81.6524C448.603 81.6926 449.145 81.8408 449.683 82.0969C450.226 82.3472 450.72 82.6745 451.166 83.0787C451.715 83.5774 452.119 84.1495 452.377 84.7948C452.641 85.4454 452.692 86.12 452.532 86.8186L453.605 85.6397L454.655 86.5925L451.713 89.8259L450.663 88.873C450.973 88.5321 451.19 88.1486 451.314 87.7226C451.448 87.2961 451.489 86.8686 451.435 86.4401C451.386 86.0057 451.261 85.5862 451.059 85.1813C450.862 84.7707 450.59 84.4079 450.243 84.0929C449.937 83.8147 449.613 83.5842 449.272 83.4016C448.931 83.219 448.586 83.1112 448.235 83.0782C447.89 83.0395 447.544 83.0837 447.196 83.2109C446.854 83.3434 446.53 83.5772 446.225 83.9124C445.957 84.2071 445.801 84.5242 445.756 84.8634C445.717 85.208 445.748 85.574 445.85 85.9616C445.957 86.3434 446.112 86.7477 446.315 87.1746C446.529 87.601 446.746 88.0355 446.967 88.4781C447.258 89.0169 447.531 89.5703 447.785 90.1385C448.039 90.7066 448.216 91.273 448.315 91.8375C448.414 92.4021 448.397 92.9722 448.264 93.5478C448.136 94.1177 447.826 94.6743 447.331 95.2175Z"
              fill="white"
            />
            <path
              d="M466.386 119.811L460 112.413L471.59 102.435L477.976 109.834L476.937 110.728L471.6 104.545L467.453 108.115L471.388 112.675L470.349 113.57L466.414 109.01L462.089 112.734L467.426 118.917L466.386 119.811Z"
              fill="white"
            />
            <path
              d="M486.609 140.425L488.534 139.383L486.582 138.387L487.058 137.552L488.924 138.714L488.806 136.521L489.768 136.508L489.699 138.696L491.542 137.516L492.028 138.338L490.103 139.381L492.055 140.377L491.579 141.212L489.713 140.049L489.832 142.242L488.869 142.255L488.939 140.067L487.095 141.247L486.609 140.425Z"
              fill="white"
            />
            <path
              d="M496.496 195.808C495.639 193.464 496.875 190.97 500.212 189.754C505.038 187.996 512.733 191.016 514.402 190.408C514.672 190.31 514.926 190.166 515.09 190.055C514.609 188.596 514.521 187.657 514.754 186.755C515.254 186.726 515.927 186.889 516.239 187.184C516.564 187.935 516.652 188.873 516.337 189.55C517.566 191.656 523.589 195.695 529.136 193.674C530.264 193.263 531.124 192.541 531.644 191.585C530.962 191.118 530.129 190.655 529.144 190.197C524.124 187.786 511.572 184.9 504.722 181.674C499.611 179.296 495.748 176.412 494.2 172.174C492.948 168.748 493.46 164.832 498.24 163.09C506.403 160.116 526.48 170.171 532.145 185.681C532.836 187.574 533.069 189.329 532.718 190.887C533.593 191.743 534.148 192.563 534.411 193.284C534.675 194.006 534.453 194.24 534.133 194.203C533.903 193.572 533.381 192.842 532.326 192.052C531.626 193.635 530.188 194.874 527.978 195.679C522.837 197.552 516.606 194.203 515.37 190.822C515.133 191.01 514.788 191.187 514.337 191.351C511.992 192.206 505.878 190.857 500.511 192.812C498.978 193.371 497.88 194.282 497.508 195.082C497.25 195.635 497.242 195.894 497.423 196.39C497.506 196.615 497.683 196.959 497.855 197.152C497.781 197.23 497.646 197.279 497.461 197.193C497.154 197.05 496.759 196.529 496.496 195.808ZM495.223 170.78C496.294 173.71 499.308 176.086 505.633 178.992C510.788 181.354 520.505 183.893 526.079 186.563C528.727 187.795 530.677 189.077 532.094 190.297C532.346 189.03 532.196 187.501 531.571 185.788C526.004 170.549 505.871 161.178 498.52 163.857C494.687 165.253 494.285 168.21 495.223 170.78Z"
              fill="white"
            />
            <path
              d="M513.847 219.653L511.657 210.128L526.563 206.709L528.753 216.234L527.417 216.541L525.586 208.581L520.252 209.804L521.602 215.674L520.266 215.981L518.916 210.111L513.353 211.386L515.184 219.347L513.847 219.653Z"
              fill="white"
            />
            <path
              d="M523.01 247.831C522.373 247.897 521.78 247.825 521.232 247.615C520.692 247.404 520.212 247.096 519.793 246.692C519.374 246.288 519.034 245.809 518.772 245.254C518.51 244.7 518.347 244.113 518.282 243.491C518.193 242.636 518.271 241.835 518.515 241.087C518.759 240.339 519.171 239.723 519.749 239.239L518.128 239.407L517.988 238.055L522.615 237.575L522.756 238.927C522.235 238.981 521.77 239.151 521.36 239.437C520.957 239.722 520.62 240.067 520.348 240.473C520.076 240.878 519.876 241.331 519.747 241.831C519.627 242.338 519.593 242.844 519.646 243.349C519.693 243.8 519.798 244.209 519.962 244.577C520.134 244.944 520.351 245.26 520.614 245.523C520.885 245.785 521.2 245.98 521.559 246.108C521.918 246.244 522.316 246.289 522.751 246.244C523.241 246.193 523.649 246.041 523.976 245.787C524.304 245.541 524.573 245.222 524.784 244.831C524.995 244.448 525.163 244.022 525.287 243.554C525.419 243.084 525.546 242.608 525.669 242.124C525.806 241.552 525.95 240.979 526.103 240.406C526.263 239.832 526.483 239.31 526.765 238.841C527.046 238.372 527.405 237.977 527.843 237.657C528.289 237.336 528.862 237.139 529.561 237.066C530.183 237.002 530.748 237.077 531.257 237.291C531.774 237.504 532.222 237.807 532.601 238.2C532.979 238.593 533.284 239.064 533.514 239.613C533.751 240.162 533.901 240.736 533.963 241.334C534.04 242.072 533.959 242.768 533.721 243.421C533.483 244.082 533.072 244.619 532.487 245.034L534.072 244.869L534.219 246.279L529.871 246.73L529.724 245.32C530.183 245.273 530.6 245.131 530.976 244.896C531.361 244.667 531.676 244.375 531.922 244.02C532.175 243.664 532.362 243.267 532.481 242.831C532.609 242.394 532.648 241.942 532.6 241.476C532.557 241.064 532.469 240.676 532.337 240.313C532.205 239.949 532.02 239.639 531.781 239.381C531.55 239.122 531.262 238.924 530.918 238.787C530.575 238.658 530.178 238.616 529.727 238.663C529.331 238.704 529.003 238.836 528.743 239.06C528.484 239.291 528.264 239.585 528.081 239.941C527.906 240.297 527.751 240.702 527.618 241.156C527.493 241.616 527.365 242.085 527.234 242.562C527.092 243.158 526.926 243.753 526.736 244.346C526.547 244.939 526.3 245.479 525.997 245.966C525.695 246.453 525.302 246.867 524.819 247.207C524.344 247.547 523.741 247.755 523.01 247.831Z"
              fill="white"
            />
            <path
              d="M520.794 279.21L520.98 269.439L536.27 269.729L536.084 279.5L534.713 279.474L534.868 271.308L529.397 271.204L529.282 277.226L527.911 277.2L528.026 271.178L522.32 271.07L522.165 279.236L520.794 279.21Z"
              fill="white"
            />
            <path
              d="M518.736 309.636L518.987 307.931L523.522 307.141L524.403 301.158L520.284 299.12L520.535 297.416L534.925 304.67L534.607 306.826L518.736 309.636ZM524.991 306.895L533.168 305.502L525.739 301.816L524.991 306.895Z"
              fill="white"
            />
            <path
              d="M512.342 341.604L512.903 339.643L520.431 337.149L521.085 334.862L514.786 333.064L515.228 331.52L529.933 335.717L528.547 340.562C528.085 342.177 527.374 343.327 526.414 344.011C525.462 344.698 524.287 344.842 522.89 344.444C522.274 344.268 521.749 344 521.316 343.641C520.89 343.284 520.557 342.868 520.319 342.394C520.081 341.92 519.932 341.39 519.872 340.804C519.81 340.226 519.845 339.622 519.976 338.993L512.342 341.604ZM523.348 342.844C524.347 343.129 525.165 343.025 525.801 342.533C526.443 342.05 526.919 341.267 527.229 340.186L528.173 336.885L522.404 335.238L521.459 338.539C521.149 339.621 521.132 340.534 521.407 341.278C521.686 342.032 522.333 342.554 523.348 342.844Z"
              fill="white"
            />
            <path
              d="M506.032 372.604C504.991 371.711 504.299 370.694 503.957 369.554C503.621 368.417 503.731 367.219 504.285 365.96C504.717 364.981 505.283 364.24 505.982 363.737C506.689 363.237 507.472 362.915 508.329 362.771C509.183 362.635 510.089 362.661 511.047 362.852C512.001 363.05 512.947 363.354 513.884 363.766C514.821 364.178 515.684 364.669 516.475 365.238C517.263 365.815 517.898 366.465 518.381 367.189C518.861 367.921 519.152 368.714 519.253 369.57C519.362 370.428 519.2 371.347 518.768 372.326C518.387 373.191 517.907 373.864 517.329 374.343C516.75 374.823 516.082 375.071 515.323 375.088L516.954 375.804L516.401 377.059L511.809 375.041L512.362 373.786C512.856 374.003 513.363 374.111 513.885 374.11C514.41 374.119 514.904 374.033 515.368 373.853C515.832 373.672 516.251 373.4 516.625 373.035C517.003 372.681 517.299 372.261 517.513 371.775C517.847 371.017 517.946 370.309 517.809 369.652C517.668 369.001 517.375 368.398 516.928 367.843C516.481 367.289 515.931 366.791 515.28 366.351C514.626 365.919 513.944 365.547 513.236 365.235C512.535 364.927 511.801 364.677 511.032 364.484C510.267 364.301 509.532 364.235 508.828 364.283C508.131 364.335 507.491 364.528 506.909 364.861C506.331 365.204 505.874 365.754 505.541 366.512C504.772 368.257 505.291 369.936 507.099 371.549L506.032 372.604Z"
              fill="white"
            />
            <path
              d="M486.905 401.944L487.765 400.575L493.762 404.335L497.248 398.789L491.251 395.029L492.106 393.67L505.063 401.793L504.208 403.152L498.41 399.517L494.924 405.063L500.722 408.698L499.862 410.068L486.905 401.944Z"
              fill="white"
            />
            <path
              d="M471.366 435.616L472.909 437.168L473.317 435.017L474.254 435.24L473.662 437.354L475.735 436.625L476.019 437.544L473.897 438.092L475.549 439.528L474.897 440.224L473.353 438.672L472.945 440.822L472.009 440.6L472.601 438.486L470.527 439.215L470.244 438.296L472.365 437.748L470.713 436.312L471.366 435.616Z"
              fill="white"
            />
            <path
              d="M439.25 462.375C439.916 456.75 442.286 451.487 446.415 448.196C451.108 444.458 455.111 446.546 456.549 448.346C458.736 451.084 458.467 455.901 455.051 458.623C452.648 460.537 449.806 460.286 448.158 458.223C447.349 457.21 447.118 455.921 447.225 454.978C447.361 453.764 447.714 453.053 448.052 452.784C448.202 452.664 448.308 452.642 448.397 452.754C448.517 452.904 448.254 453.421 448.201 453.893C448.087 454.904 448.296 456.088 449.045 457.026C450.543 458.901 453.198 458.995 455.15 457.439C457.44 455.615 457.955 451.338 456.038 448.938C454.69 447.25 451.744 445.792 448.065 448.723C445.024 451.146 442.828 455.473 442.085 462.387C441.485 468.02 442.171 478.03 441.413 484.157C441.254 485.573 441.035 486.913 440.733 488.074C442.599 483.642 444.038 478.137 445.052 477.33C445.24 477.18 445.48 477.173 445.787 477.174C446.29 477.264 446.979 477.82 447.346 478.202C448.956 480.295 446.061 486.284 446.953 487.169C447.05 487.214 447.223 487.2 447.485 486.99C449.1 485.704 450.961 478.575 451.097 471.593C451.195 471.638 451.262 471.645 451.36 471.69C451.502 471.945 451.486 472.695 451.515 473.346C451.313 479.092 449.737 485.81 447.823 487.335C447.184 487.844 446.157 487.865 445.438 486.965C444.269 485.502 446.318 478.838 445.471 477.855C444.195 478.872 441.142 491.431 437.726 494.153C437.125 494.631 436.832 494.496 436.765 494.181C437.666 493.464 438.576 491.757 438.978 488.184C439.667 482.663 438.37 469.888 439.25 462.375Z"
              fill="white"
            />
            <path
              d="M417.45 486.451C416.892 485.593 416.452 484.715 416.129 483.817C415.803 482.929 415.649 482.061 415.665 481.212C415.68 480.374 415.891 479.581 416.299 478.832C416.7 478.088 417.343 477.428 418.228 476.855L422.397 474.151L430.732 486.973L426.563 489.676C425.692 490.242 424.829 490.549 423.977 490.599C423.122 490.66 422.306 490.523 421.53 490.189C420.746 489.859 420.012 489.367 419.326 488.713C418.633 488.063 418.008 487.309 417.45 486.451ZM418.797 485.578C419.887 487.255 421.048 488.345 422.28 488.85C423.51 489.366 424.689 489.258 425.816 488.527L428.638 486.697L421.797 476.174L418.975 478.004C417.848 478.735 417.265 479.76 417.228 481.079C417.184 482.401 417.707 483.901 418.797 485.578Z"
              fill="white"
            />
            <path
              d="M384.272 496.892L393.095 492.689L399.687 506.488L390.863 510.692L390.273 509.455L397.646 505.942L395.288 501.003L389.85 503.594L389.259 502.357L394.697 499.766L392.237 494.616L384.863 498.13L384.272 496.892Z"
              fill="white"
            />
            <path
              d="M356.347 508.54L357.979 507.99L360.744 511.671L366.474 509.739L366.419 505.145L368.051 504.595L368.128 520.707L366.062 521.404L356.347 508.54ZM361.631 512.868L366.588 519.52L366.495 511.228L361.631 512.868Z"
              fill="white"
            />
            <path
              d="M330.778 526.248L332.121 525.975L332.879 529.695L336.095 529.042L333.59 516.744L331.178 517.234L330.904 515.89L337.324 514.586L337.598 515.929L335.174 516.422L337.679 528.72L340.895 528.067L340.137 524.346L341.481 524.073L342.512 529.137L331.809 531.312L330.778 526.248Z"
              fill="white"
            />
            <path
              d="M300.927 520.74L307.437 520.014L307.59 521.377L305.132 521.651L306.526 534.124L308.983 533.85L309.136 535.213L302.625 535.938L302.473 534.576L304.919 534.303L303.525 521.83L301.079 522.103L300.927 520.74Z"
              fill="white"
            />
            <path
              d="M275.501 531.52C275.491 530.497 275.588 529.507 275.79 528.552C275.992 527.597 276.32 526.754 276.774 526.024C277.228 525.293 277.828 524.701 278.574 524.249C279.312 523.804 280.216 523.577 281.286 523.567C282.356 523.557 283.269 523.767 284.023 524.198C284.769 524.636 285.38 525.216 285.855 525.939C286.323 526.661 286.663 527.498 286.875 528.449C287.095 529.4 287.21 530.387 287.219 531.41C287.229 532.434 287.133 533.423 286.931 534.378C286.737 535.333 286.409 536.18 285.947 536.919C285.477 537.657 284.873 538.249 284.135 538.694C283.389 539.146 282.489 539.377 281.434 539.387C280.38 539.397 279.479 539.182 278.733 538.744C277.979 538.314 277.368 537.733 276.9 537.003C276.432 536.273 276.085 535.433 275.857 534.482C275.629 533.531 275.511 532.543 275.501 531.52ZM277.118 531.505C277.128 532.513 277.234 533.418 277.437 534.221C277.632 535.032 277.912 535.72 278.276 536.287C278.641 536.854 279.09 537.284 279.624 537.576C280.151 537.875 280.75 538.022 281.422 538.016C282.257 538.008 282.947 537.806 283.49 537.41C284.026 537.015 284.454 536.499 284.777 535.863C285.099 535.227 285.323 534.522 285.448 533.747C285.566 532.973 285.621 532.199 285.614 531.425C285.607 530.66 285.537 529.887 285.405 529.107C285.265 528.335 285.028 527.638 284.694 527.016C284.36 526.402 283.921 525.898 283.379 525.505C282.828 525.119 282.135 524.93 281.299 524.938C280.471 524.946 279.785 525.148 279.242 525.543C278.699 525.947 278.266 526.459 277.944 527.079C277.622 527.707 277.402 528.408 277.284 529.183C277.166 529.965 277.111 530.739 277.118 531.505Z"
              fill="white"
            />
            <path
              d="M248.351 520.497L250.324 520.774L254.63 534.446L256.439 521.636L258.029 521.86L255.89 537.002L253.651 536.687L249.539 523.646L247.814 535.865L246.213 535.639L248.351 520.497Z"
              fill="white"
            />
            <path
              d="M204.561 518.353L203.766 520.392L205.899 519.892L206.075 520.837L203.901 521.155L205.408 522.752L204.682 523.384L203.321 521.669L202.677 523.761L201.775 523.448L202.57 521.408L200.437 521.909L200.261 520.964L202.435 520.646L200.928 519.048L201.654 518.416L203.015 520.131L203.659 518.039L204.561 518.353Z"
              fill="white"
            />
            <path
              d="M158.847 486.69C161.016 487.926 161.684 490.627 159.922 493.711C157.374 498.171 149.549 500.838 148.668 502.38C148.525 502.63 148.424 502.904 148.37 503.095C149.681 503.897 150.354 504.557 150.76 505.395C150.396 505.741 149.777 506.051 149.348 506.028C148.615 505.665 147.942 505.005 147.745 504.286C145.446 503.472 138.239 504.283 135.31 509.409C134.715 510.451 134.525 511.558 134.745 512.623C135.567 512.539 136.502 512.354 137.551 512.067C142.941 510.663 154.387 504.755 161.701 502.79C167.138 501.303 171.951 501.007 175.871 503.241C179.041 505.047 181.181 508.365 178.657 512.783C174.347 520.327 152.525 525.626 138.178 517.452C136.427 516.454 135.116 515.265 134.377 513.849C133.155 513.761 132.202 513.494 131.535 513.114C130.868 512.734 130.885 512.413 131.153 512.234C131.737 512.567 132.607 512.786 133.923 512.707C133.434 511.048 133.731 509.173 134.898 507.13C137.612 502.379 144.533 500.909 147.661 502.691C147.721 502.393 147.869 502.036 148.107 501.619C149.346 499.452 154.884 496.531 157.717 491.571C158.527 490.154 158.776 488.749 158.544 487.898C158.383 487.31 158.222 487.107 157.763 486.846C157.555 486.727 157.197 486.579 156.941 486.543C156.947 486.436 157.018 486.311 157.215 486.257C157.542 486.168 158.18 486.31 158.847 486.69ZM175.991 504.966C173.28 503.422 169.444 503.556 162.738 505.426C157.277 506.954 148.218 511.295 142.239 512.86C139.422 513.63 137.105 513.912 135.234 513.896C135.86 515.026 136.963 516.096 138.547 516.999C152.644 525.031 174.067 519.173 177.948 512.379C179.972 508.837 178.368 506.321 175.991 504.966Z"
              fill="white"
            />
            <path
              d="M132.617 475.538L140.454 481.377L131.301 493.629L123.464 487.789L124.285 486.691L130.835 491.571L134.11 487.187L129.28 483.588L130.1 482.49L134.93 486.089L138.346 481.517L131.796 476.636L132.617 475.538Z"
              fill="white"
            />
            <path
              d="M100.631 467.292L106.566 472.904L110.331 468.932L105.954 464.794L106.897 463.799L111.274 467.937L116.143 462.799L117.31 463.902L106.79 475.002L99.6876 468.287L100.631 467.292Z"
              fill="white"
            />
            <path
              d="M93.2082 441.044L97.573 445.929L96.5494 446.841L94.9019 444.998L85.5321 453.348L87.1797 455.192L86.1561 456.104L81.7913 451.219L82.8149 450.307L84.4546 452.142L93.8244 443.792L92.1847 441.957L93.2082 441.044Z"
              fill="white"
            />
            <path
              d="M82.034 426.503L83.2055 428.115L76.3639 440.705L86.8372 433.11L87.7814 434.408L75.4012 443.386L74.0711 441.557L80.5943 429.545L70.6048 436.789L69.6538 435.481L82.034 426.503Z"
              fill="white"
            />
            <path
              d="M62.2503 396.334L66.8935 404.934L53.4289 412.186L48.7857 403.586L49.9928 402.935L53.8733 410.123L58.6917 407.528L55.8301 402.228L57.0372 401.578L59.8989 406.878L64.9236 404.172L61.0431 396.985L62.2503 396.334Z"
              fill="white"
            />
            <path
              d="M49.3297 369.878L49.8777 371.4L37.8896 375.707L46.2292 375.587L46.6183 376.667L40.1094 381.87L52.0975 377.563L52.6416 379.073L38.2492 384.244L37.5424 382.282L44.1188 376.955L35.6442 377.011L34.9373 375.049L49.3297 369.878Z"
              fill="white"
            />
            <path
              d="M36.8243 328.546L38.724 338.133L23.7212 341.098L21.8216 331.511L23.1667 331.245L24.7542 339.258L30.123 338.196L28.9523 332.288L30.2974 332.022L31.4681 337.931L37.0668 336.824L35.4793 328.812L36.8243 328.546Z"
              fill="white"
            />
            <path
              d="M32.4354 299.814L32.5598 301.802L20.033 308.771L32.9453 307.966L33.0456 309.568L17.7823 310.52L17.6411 308.263L29.589 301.611L17.2731 302.38L17.1722 300.766L32.4354 299.814Z"
              fill="white"
            />
            <path
              d="M21.8686 261.888L21.765 263.256L17.9789 262.969L17.7309 266.241L30.2459 267.187L30.4319 264.733L31.7991 264.837L31.304 271.369L29.9368 271.265L30.1237 268.8L17.6086 267.854L17.3606 271.126L21.1467 271.412L21.0431 272.779L15.8898 272.389L16.7153 261.499L21.8686 261.888Z"
              fill="white"
            />
            <path
              d="M30.4583 224.576L28.3637 223.941L29.0244 226.028L28.0947 226.276L27.6133 224.133L26.1336 225.758L25.4483 225.083L27.0563 223.595L24.9211 223.113L25.1655 222.19L27.2601 222.826L26.5993 220.739L27.5291 220.491L28.0105 222.634L29.4902 221.009L30.1755 221.684L28.5674 223.172L30.7027 223.654L30.4583 224.576Z"
              fill="white"
            />
            <path
              d="M44.3975 194.631C45.734 191.812 45.3096 188.001 42.9372 181.464C40.9987 176.14 35.9817 167.45 33.9678 161.613C33.0088 158.93 32.5089 156.622 32.4269 154.778C31.3031 155.468 30.3185 156.649 29.5578 158.254C22.6082 172.914 30.0745 193.806 37.1478 197.15C40.8362 198.894 43.2255 197.104 44.3975 194.631ZM46.1105 194.38C44.5479 197.676 41.398 200.063 36.7982 197.888C28.9439 194.174 22.0052 172.841 29.0782 157.921C29.9417 156.099 31.0085 154.745 32.4087 153.92C32.3609 152.677 32.5757 151.663 32.9047 150.969C33.2336 150.275 33.5557 150.268 33.7544 150.521C33.4665 151.129 33.3568 152.032 33.5142 153.381C35.2205 152.807 37.2646 152.977 39.7381 154.147C44.6416 156.465 47.6899 164.49 45.6543 168.784C45.0375 170.086 44.2357 170.768 43.3404 171.088C43.1485 171.157 42.9338 171.162 42.8036 171.1C42.7168 171.059 42.6072 170.954 42.5821 170.783C42.9864 170.603 43.5163 170.269 43.9687 169.315C45.2434 166.626 43.4401 157.543 37.4951 154.732C36.1065 154.076 34.8366 153.953 33.6398 154.237C33.8064 155.006 34.0393 155.859 34.4046 156.882C36.213 162.144 42.9747 173.092 45.4886 180.228C47.3837 185.531 48.0433 190.302 46.1105 194.38Z"
              fill="white"
            />
            <path
              d="M68.0652 149.185L66.9657 150.902L59.0371 151.136L57.7543 153.14L63.2753 156.666L62.4095 158.018L49.5208 149.786L52.2381 145.543C53.1438 144.128 54.1547 143.23 55.2707 142.849C56.3802 142.464 57.5472 142.662 58.7719 143.445C59.3118 143.789 59.738 144.196 60.0504 144.664C60.3562 145.128 60.5552 145.622 60.6474 146.144C60.7397 146.667 60.7305 147.217 60.62 147.795C60.5137 148.367 60.3075 148.935 60.0016 149.5L68.0652 149.185ZM57.8746 144.846C56.9989 144.287 56.1854 144.152 55.4341 144.441C54.6804 144.72 54.0002 145.333 53.3936 146.281L51.5421 149.172L56.5988 152.402L58.4503 149.51C59.057 148.563 59.3355 147.693 59.2859 146.901C59.2339 146.099 58.7635 145.414 57.8746 144.846Z"
              fill="white"
            />
            <path
              d="M80.5157 118.573C81.294 119.238 81.9769 119.96 82.5645 120.739C83.1521 121.518 83.5723 122.319 83.825 123.141C84.0777 123.963 84.1295 124.803 83.9803 125.662C83.8303 126.51 83.4072 127.34 82.7111 128.153C82.015 128.966 81.2567 129.516 80.4362 129.801C79.6149 130.076 78.7756 130.155 77.9182 130.039C77.0659 129.918 76.2113 129.624 75.3544 129.16C74.4924 128.701 73.6723 128.139 72.894 127.475C72.1158 126.81 71.4329 126.088 70.8453 125.309C70.2526 124.536 69.8294 123.733 69.5759 122.9C69.3274 122.061 69.2781 121.217 69.4281 120.369C69.5773 119.51 69.9949 118.68 70.6808 117.879C71.3668 117.078 72.1204 116.54 72.9417 116.266C73.7622 115.98 74.6016 115.901 75.4598 116.027C76.318 116.154 77.1807 116.444 78.0477 116.897C78.9148 117.35 79.7375 117.908 80.5157 118.573ZM79.4639 119.801C78.6976 119.147 77.9449 118.633 77.206 118.258C76.4662 117.873 75.7625 117.632 75.0951 117.535C74.4277 117.437 73.8084 117.494 73.2371 117.705C72.665 117.904 72.1604 118.259 71.7234 118.77C71.1798 119.405 70.8786 120.057 70.82 120.726C70.7664 121.389 70.8735 122.051 71.1413 122.711C71.4092 123.371 71.7939 124.003 72.2957 124.606C72.8026 125.203 73.3501 125.753 73.9382 126.255C74.5204 126.752 75.1492 127.207 75.8246 127.62C76.4991 128.021 77.1807 128.3 77.8694 128.457C78.5522 128.608 79.2203 128.609 79.8739 128.458C80.5266 128.296 81.1248 127.898 81.6685 127.263C82.2071 126.634 82.5057 125.985 82.5644 125.316C82.617 124.641 82.5154 123.979 82.2595 123.329C81.9976 122.674 81.6133 122.048 81.1064 121.451C80.5936 120.848 80.0461 120.299 79.4639 119.801Z"
              fill="white"
            />
            <path
              d="M106.679 91.0632C107.352 91.8338 107.912 92.6409 108.359 93.4847C108.807 94.3174 109.082 95.1551 109.186 95.9977C109.29 96.8292 109.193 97.6444 108.895 98.4431C108.603 99.2367 108.06 99.98 107.265 100.673L103.519 103.938L93.4553 92.423L97.2007 89.1581C97.984 88.4753 98.7941 88.0489 99.6312 87.8788C100.469 87.6978 101.296 87.718 102.112 87.9394C102.934 88.1556 103.731 88.539 104.502 89.0894C105.28 89.6346 106.005 90.2926 106.679 91.0632ZM105.468 92.1181C104.152 90.6122 102.849 89.6964 101.558 89.3709C100.268 89.0343 99.1159 89.3074 98.103 90.1904L95.5678 92.4005L103.827 101.851L106.362 99.6407C107.375 98.7577 107.807 97.6609 107.658 96.3504C107.514 95.0348 106.785 93.624 105.468 92.1181Z"
              fill="white"
            />
            <path
              d="M135.231 71.2847C135.702 72.0129 136.046 72.7252 136.264 73.4215C136.488 74.1136 136.565 74.7796 136.495 75.4197C136.428 76.0489 136.209 76.6456 135.839 77.2098C135.468 77.7739 134.929 78.2846 134.22 78.7419C133.504 79.2034 132.813 79.4866 132.146 79.5915C131.485 79.6922 130.854 79.6438 130.252 79.4464C129.652 79.2383 129.077 78.8886 128.527 78.3975C127.983 77.9021 127.476 77.2903 127.005 76.5621L121.673 68.3154L123.022 67.4453L128.367 75.7116C128.617 76.0987 128.915 76.4875 129.261 76.8782C129.613 77.2646 130.002 77.5714 130.428 77.7987C130.861 78.0217 131.331 78.137 131.838 78.1445C132.352 78.1478 132.897 77.9631 133.475 77.5905C134.053 77.2179 134.446 76.7971 134.654 76.328C134.869 75.8547 134.961 75.3774 134.929 74.8961C134.903 74.4106 134.783 73.9301 134.569 73.4548C134.355 72.9795 134.122 72.5482 133.872 72.1612L128.527 63.8949L129.886 63.0184L135.231 71.2847Z"
              fill="white"
            />
            <path
              d="M168.197 53.9262C168.379 55.2853 168.218 56.5044 167.714 57.5833C167.207 58.6552 166.327 59.4758 165.076 60.0452C164.102 60.4884 163.186 60.6646 162.329 60.5739C161.468 60.476 160.671 60.1953 159.935 59.7315C159.207 59.2646 158.549 58.6412 157.962 57.8614C157.381 57.0783 156.879 56.2212 156.454 55.29C156.029 54.3588 155.712 53.4176 155.501 52.4663C155.298 51.5118 155.257 50.6034 155.379 49.7411C155.508 48.8756 155.819 48.0902 156.313 47.3848C156.804 46.6723 157.537 46.0944 158.511 45.6512C159.371 45.2598 160.177 45.0778 160.928 45.1052C161.679 45.1327 162.343 45.3928 162.92 45.8857L162.181 44.2651L163.429 43.6973L165.51 48.2607L164.262 48.8285C164.038 48.338 163.732 47.9197 163.342 47.5734C162.956 47.2168 162.53 46.9514 162.064 46.7771C161.598 46.6028 161.104 46.5271 160.582 46.55C160.064 46.5625 159.563 46.6787 159.08 46.8987C158.326 47.2416 157.781 47.704 157.446 48.2859C157.117 48.8645 156.935 49.5096 156.899 50.2213C156.863 50.9329 156.941 51.6697 157.134 52.4316C157.334 53.1903 157.595 53.9215 157.915 54.6252C158.233 55.3218 158.615 55.998 159.06 56.6538C159.509 57.2993 160.012 57.8384 160.57 58.2712C161.125 58.6969 161.73 58.9793 162.386 59.1186C163.046 59.2476 163.753 59.1406 164.507 58.7977C166.242 58.0084 166.973 56.41 166.699 54.0025L168.197 53.9262Z"
              fill="white"
            />
            <path
              d="M199.448 35.0232L198.134 35.4161L197.043 31.7792L193.9 32.7196L197.505 44.7414L199.863 44.0361L200.256 45.3495L193.98 47.2268L193.587 45.9134L195.955 45.2048L192.35 33.183L189.207 34.1233L190.297 37.7602L188.984 38.1531L187.499 33.2029L197.963 30.073L199.448 35.0232Z"
              fill="white"
            />
            <path
              d="M237.143 29.8509L236.956 27.67L235.263 29.0589L234.688 28.2877L236.499 27.0447L234.441 26.2743L234.813 25.3874L236.792 26.3277L236.447 24.1661L237.394 24.0504L237.581 26.2313L239.274 24.8424L239.85 25.6135L238.038 26.8566L240.096 27.6269L239.724 28.5138L237.746 27.5735L238.09 29.7351L237.143 29.8509Z"
              fill="white"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}

export default Idea;
