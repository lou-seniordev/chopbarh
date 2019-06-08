import React from "react";

export default function Icon({ icon, height, clicked, color }) {
  return (
    <img
      onClick={clicked}
      src={icon}
      className="mx-3"
      alt="Icon"
      height={height}
      style={{ cursor: "pointer", fill: color }}
    />
  );
}
