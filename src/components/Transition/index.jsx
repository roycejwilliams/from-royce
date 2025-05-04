import React, { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(useGSAP);

export default function Transition({ children }) {
  const [displayChildren, setDisplayChildren] = useState(children);
  const container = useRef(null);

  useGSAP(() => {
    if (children.key !== displayChildren.key) {
      gsap.to(container.current, { opacity: 0 }).then(() => {
        setDisplayChildren(children);
        window.scrollTo(0, 0);
        gsap.to(container.current, { opacity: 1 });
      });
    }
  }, [children]);

  useGSAP(() => {
    gsap.to(container.current, { opacity: 1 });
  });

  return (
    <div ref={container} style={{ opacity: 0 }}>
      {displayChildren}
    </div>
  );
}