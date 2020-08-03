import React from "react";

const LoadingScreen = () => {
  return (
    <div style={{width: `100%`, height: `100vh`, background: `rgb(0, 0, 0)`}}>
      <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
        style={{margin: `auto`, paddingTop: `100px`, background: `rgb(0, 0, 0)`, display: `block`, shapeRendering: `auto`}}
        width="204px" height="204px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
        <g>
          <path d="M50 15A35 35 0 1 0 74.74873734152916 25.251262658470843" fill="none" stroke="#0071bf" strokeWidth="12"></path>
          <path d="M49 0L49 30L64 15L49 0" fill="#0071bf"></path>
          <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="4.761904761904762s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
        </g>
      </svg>
    </div>
  );
};

export default LoadingScreen;
