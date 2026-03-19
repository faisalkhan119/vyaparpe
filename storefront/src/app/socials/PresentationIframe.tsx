"use client";
import { useEffect, useRef, useState } from "react";

export default function PresentationIframe() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeSrc, setIframeSrc] = useState("/sdg_presentation.html");

  useEffect(() => {
    // Append auto-cache buster strictly on the client to avoid Next.js hydration mismatch
    setIframeSrc("/sdg_presentation.html?v=" + new Date().getTime());

    // Aggressively keep the iframe focused so its internal listeners work natively
    const focusIframe = () => {
      if (document.activeElement !== iframeRef.current) {
        iframeRef.current?.focus();
      }
    };
    focusIframe();
    const interval = setInterval(focusIframe, 1000);
    window.addEventListener("click", focusIframe);
    window.addEventListener("touchstart", focusIframe);

    // Forward keyboard events down to the iframe presentation
    const handleKeyDown = (e: KeyboardEvent) => {
      const k = e.key || "";
      const c = e.keyCode || 0;

      // Prevent default scrolling for navigation keys
      if ([" ", "ArrowUp", "ArrowDown", "ArrowRight", "ArrowLeft", "PageUp", "PageDown"].includes(k) || [32, 38, 40, 39, 37, 33, 34].includes(c)) {
        e.preventDefault();
      }

      const isNext = ["ArrowRight", "ArrowDown", "PageDown", " "].includes(k) || [39, 40, 34, 32].includes(c);
      const isPrev = ["ArrowLeft", "ArrowUp", "PageUp"].includes(k) || [37, 38, 33].includes(c);

      if (isNext) {
        iframeRef.current?.contentWindow?.postMessage("next", "*");
      } else if (isPrev) {
        iframeRef.current?.contentWindow?.postMessage("prev", "*");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener("click", focusIframe);
      window.removeEventListener("touchstart", focusIframe);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <iframe
      ref={iframeRef}
      src={iframeSrc}
      className="fullscreen-iframe"
      title="SDG Presentation"
      style={{
        width: "100%",
        height: "100vh",
        border: "none",
        display: "block",
      }}
    />
  );
}
