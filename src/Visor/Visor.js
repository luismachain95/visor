/**
 * Visor
 * Modificaciones by Luis
 * 
 * Codigo Base: 
 * https://letsbuildui.dev/articles/how-to-build-an-image-comparison-slider
 */

import React, { useState, useEffect, useRef, useCallback } from "react";
import { ReactComponent as CompareIcon } from "./slider.svg";
import "./Visor.css";


const Visor = ({ before, after, width, borderColor, textBefore, textAfter, text }) => {
  let style = {};
  style = (width)? {...style, width} : style; 
  style = (borderColor)? {...style, borderColor} : style; 
     
  const [isResizing, setIsResizing] = useState(false);
  const beforeImageRef = useRef();
  const handleRef = useRef();

  const setPositioning = useCallback((x) => {
    const { left, width } = beforeImageRef.current.getBoundingClientRect();
    const handleWidth = handleRef.current.offsetWidth;

    if (x >= left && x <= width + left - handleWidth) {
      handleRef.current.style.left = `${((x - left) / width) * 100}%`;
      beforeImageRef.current.style.clipPath = `inset(0 ${
        100 - ((x - left) / width) * 100
      }% 0 0)`;
    }
  }, []);

  const handleResize = useCallback(
    (e) => {
      if (e.clientX) {
        setPositioning(e.clientX);
      } else if (e.touches[0] && e.touches[0].clientX) {
        setPositioning(e.touches[0].clientX);
      }
    },
    [setPositioning]
  );

  // Set initial positioning on component mount
  useEffect(() => {
    const { left, width } = beforeImageRef.current.getBoundingClientRect();
    const handleWidth = handleRef.current.offsetWidth;

    setPositioning(width / 2 + left - handleWidth / 2);
  }, [setPositioning]);

  const handleResizeEnd = useCallback(() => {
    setIsResizing(false);

    window.removeEventListener("mousemove", handleResize);
    window.removeEventListener("touchmove", handleResize);
    window.removeEventListener("mouseup", handleResizeEnd);
    window.removeEventListener("touchend", handleResizeEnd);
  }, [handleResize]);

  const onKeyDown = useCallback(
    (e) => {
      const { offsetLeft, offsetParent } = handleRef.current;

      if (e.code === "ArrowLeft") {
        setPositioning(offsetLeft + offsetParent.offsetLeft - 10);
      }

      if (e.code === "ArrowRight") {
        setPositioning(offsetLeft + offsetParent.offsetLeft + 10);
      }
    },
    [setPositioning]
  );

  // Add keydown event on mount
  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  useEffect(() => {
    if (isResizing) {
      window.addEventListener("mousemove", handleResize);
      window.addEventListener("touchmove", handleResize);
      window.addEventListener("mouseup", handleResizeEnd);
      window.addEventListener("touchend", handleResizeEnd);
    }

    return () => {
      window.removeEventListener("mousemove", handleResize);
      window.addEventListener("touchmove", handleResize);
      window.removeEventListener("mouseup", handleResizeEnd);
      window.removeEventListener("touchend", handleResizeEnd);
      window.removeEventListener("keyup", onKeyDown);
    };
  }, [isResizing, handleResize, handleResizeEnd, onKeyDown]);

  return (
    <>
      <div className="comparison-slider" style={style}>
        {text && 
        <>
          <span className="text before">{textBefore}</span>
          <span className="text after">{textAfter}</span>
        </>
        }
        
        <div
          ref={handleRef}
          className="handle"
          onMouseDown={() => setIsResizing(true)}
          onTouchStart={() => setIsResizing(true)}
        >
          <CompareIcon />
        </div>
        <div ref={beforeImageRef} className="comparison-item before">
          <img draggable="false" src={before} alt="Before"  />
        </div>
        <div className="comparison-item">
          <img draggable="false" src={after} alt="After" />
        </div>
      </div>
      
    </>
  );
};

export default Visor;
