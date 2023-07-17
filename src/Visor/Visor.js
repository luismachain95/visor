
import { useEffect, useRef } from 'react';
import './Visor.css'; 

export const Visor = ({before, after, width, height}) => {

  const refContainer = useRef(null);
  const refAfter  = useRef(null);
  const refBefore = useRef(null);
  const refSlider = useRef(null);
  const refOverlay = useRef(null);

  useEffect(() => {
    console.log(refBefore.current.offsetWidth);
    console.log(refAfter.offsetWidth);
    refContainer.current.style.height = height + "px";

    refOverlay.current.style.width = (width / 2) + "px";
    refSlider.current.style.top = (height / 2) - (refSlider.current.offsetHeight / 2) + "px";
    refSlider.current.style.left = (width / 2) - (refSlider.current.offsetWidth / 2) + "px";
  
    refSlider.current.addEventListener("mousedown", slideReady);
    window.addEventListener("mouseup", slideFinish);

    refSlider.current.addEventListener("touchstart", slideReady);
    window.addEventListener("touchend", slideFinish);
  }, [width, height])

  let clicked = 0;

  function slideReady(e) {
    /* Prevent any other actions that may occur when moving over the image: */
    e.preventDefault();
    /* The slider is now clicked and ready to move: */
    clicked = 1;
    /* Execute a function when the slider is moved: */
    window.addEventListener("mousemove", slideMove);
    window.addEventListener("touchmove", slideMove);
  }

  function slideFinish() {
    /* The slider is no longer clicked: */
    clicked = 0;
  }
  function slideMove(e) {
    var pos;
    /* If the slider is no longer clicked, exit this function: */
    if (clicked === 0) return false;
    /* Get the cursor's x position: */
    pos = getCursorPos(e)
    /* Prevent the slider from being positioned outside the image: */
    if (pos < 0) pos = 0;
    if (pos > width) pos = width;
    /* Execute a function that will resize the overlay image according to the cursor: */
    slide(pos);
  }
  function getCursorPos(e) {
    var a, x = 0;
    e = (e.changedTouches) ? e.changedTouches[0] : e;
    /* Get the x positions of the image: */
    a = refOverlay.current.getBoundingClientRect();
    /* Calculate the cursor's x coordinate, relative to the image: */
    x = e.pageX - a.left;
    /* Consider any page scrolling: */
    x = x - window.pageXOffset;
    return x;
  }
  function slide(x) {
    /* Resize the image: */
    refOverlay.current.style.width = x + "px";
    /* Position the slider: */
    refSlider.current.style.left = refOverlay.current.offsetWidth - (refSlider.current.offsetWidth / 2) + "px";
  }

  return(
      <div className="img-comp-container" ref={refContainer}>
        <div className="img-comp-img">
          <img alt="imagen despues" ref={refAfter} src={after} width={width} height={height}/>
        </div>
        <div className="img-comp-slider" ref={refSlider}> </div>
        <div className="img-comp-img img-comp-overlay" ref={refOverlay}>
          <img alt="imagen antes" ref={refBefore} src={before} width={width} height={height}/>
        </div>
      </div>
  )
}