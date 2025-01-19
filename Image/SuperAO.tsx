import * as React from "react";

const SuperAO: React.FC<React.SVGProps<SVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    className={props.className}
  >
    {/* Shield background */}
    <path fill="#1a1a1a" d="m50 5 45 20v50L50 95 5 75V25Z"></path>
    {/* Border */}
    <path fill="#333" d="m50 10 40 18v44L50 90 10 72V28Z"></path>
    {/* Inner shield */}
    <path fill="#1a1a1a" d="m50 15 35 16v38L50 85 15 69V31Z"></path>
    {/* AO Logo (centered) */}
    <g fill="#fff" transform="matrix(.11 0 0 .11 26.405 38.23)">
      {/* First part of A */}
      <path d="M0 214h71.376l14.567-39.39-32.775-67.11z"></path>
      {/* Second part of A */}
      <path d="M189.366 160.75 109.978 1 85.943 55.709 160.96 214H215z"></path>
      {/* Outer O circle */}
      <path
        fillRule="evenodd"
        d="M322 214c59.094 0 107-47.906 107-107S381.094 0 322 0 215 47.906 215 107s47.906 107 107 107m0-42c35.899 0 65-29.101 65-65s-29.101-65-65-65-65 29.102-65 65c0 35.899 29.101 65 65 65"
        clipRule="evenodd"
      ></path>
    </g>
  </svg>
);

export default SuperAO;
