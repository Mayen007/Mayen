import React from "react";

export function Logo({
  size = 160,
  color = "#2563eb",
  bracketOpacity = 0.78,
  showFrame = true,
  className = "",
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 1600 1600"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Mayen logo mark"
      className={className}
    >
      {showFrame && (
        <g fill={color} fillOpacity={bracketOpacity}>
          <path d="M 137.0,137.0 L 137.0,350.0 L 183.0,350.0 L 183.0,183.0 L 350.0,183.0 L 350.0,137.0 L 137.0,137.0 Z" />
          <path d="M 1417.0,183.0 L 1417.0,350.0 L 1463.0,350.0 L 1463.0,137.0 L 1250.0,137.0 L 1250.0,183.0 L 1417.0,183.0 Z" />
          <path d="M 183.0,1417.0 L 183.0,1250.0 L 137.0,1250.0 L 137.0,1463.0 L 350.0,1463.0 L 350.0,1417.0 L 183.0,1417.0 Z" />
          <path d="M 1463.0,1463.0 L 1463.0,1250.0 L 1417.0,1250.0 L 1417.0,1417.0 L 1250.0,1417.0 L 1250.0,1463.0 L 1463.0,1463.0 Z" />
        </g>
      )}
      <path
        fill={color}
        d="M 555.0,788.2 L 800.0,1079.2 L 1045.0,788.2 L 1045.0,1222.7 L 1195.0,1222.7 L 1195.0,377.3 L 800.0,846.3 L 405.0,377.3 L 405.0,1222.7 L 555.0,1222.7 L 555.0,788.2 Z"
      />
    </svg>
  );
}

export default Logo;

/* ---- Demo: light + dark context, plus a wordmark lockup ---- */
export function LogoDemo() {
  return (
    <div className="w-full min-h-[420px] bg-slate-100 flex flex-col md:flex-row items-stretch justify-center gap-4 p-6">
      <div className="flex-1 bg-slate-50 rounded-xl flex flex-col items-center justify-center gap-6 py-10">
        <Logo size={140} color="#386EEB" />
        <div className="flex items-center gap-2">
          <Logo size={28} color="#386EEB" />
          <span className="text-2xl font-medium text-slate-900">Mayen</span>
        </div>
      </div>
      <div className="flex-1 bg-slate-950 rounded-xl flex flex-col items-center justify-center gap-6 py-10">
        <Logo size={140} color="#FFFFFF" bracketOpacity={0.55} />
        <div className="flex items-center gap-2">
          <Logo size={28} color="#FFFFFF" bracketOpacity={0.55} />
          <span className="text-2xl font-medium text-white">Mayen</span>
        </div>
      </div>
    </div>
  );
}
