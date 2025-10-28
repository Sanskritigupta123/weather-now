import React from "react";

export default function Loader() {
  return (
    <div className="center" style={{ marginTop: 16 }}>
      <div style={{ display: "inline-block", width: 36, height: 36, borderRadius: 18, border: "4px solid #c7d2fe", borderTopColor: "#3730a3", animation: "spin 1s linear infinite" }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
