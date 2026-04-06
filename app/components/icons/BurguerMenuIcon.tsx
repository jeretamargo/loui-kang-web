import React from "react";

const BurguerMenuIcon = ({ className }: { className?: string }) => {
  return (
    <div className={className}>
      <svg
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        stroke="#F2ECE2"
        fill="#F2ECE2"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
        />
      </svg>
    </div>
  );
};

export default BurguerMenuIcon;
