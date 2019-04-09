import React from "react";

export default function Icon({ icon, height }) {
  return <img src={icon} className="mx-3" alt="Icon" height={height} />;
}
