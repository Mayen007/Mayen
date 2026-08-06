import React from "react";

/**
 * Mayen logo mark — "In Frame"
 * A geometric M monogram framed by four corner brackets (viewfinder /
 * selection-frame language). Flat single-color construction, no layering.
 *
 * Props:
 *  - size:      rendered width/height in px (mark is always square)   default 160
 *  - color:     fill for the M and the corner brackets                default "#386EEB"
 *  - bracketOpacity: opacity applied to the corner brackets only, so   default 0.78
 *                     the M stays the visual anchor (0-1)
 *  - showFrame: toggle the corner brackets off for a mark-only use     default true
 *  - className: passthrough for layout/positioning
 */
export default function MayenLogo({
  size = 160,
  color = "#386EEB",
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

/* ---- Demo: light + dark context, plus a wordmark lockup ---- */
export function MayenLogoDemo() {
  return (
    <div className="w-full min-h-[420px] bg-slate-100 flex flex-col md:flex-row items-stretch justify-center gap-4 p-6">
      <div className="flex-1 bg-slate-50 rounded-xl flex flex-col items-center justify-center gap-6 py-10">
        <MayenLogo size={140} color="#386EEB" />
        <div className="flex items-center gap-2">
          <MayenLogo size={28} color="#386EEB" />
          <span className="text-2xl font-medium text-slate-900">Mayen</span>
        </div>
      </div>
      <div className="flex-1 bg-slate-950 rounded-xl flex flex-col items-center justify-center gap-6 py-10">
        <MayenLogo size={140} color="#FFFFFF" bracketOpacity={0.55} />
        <div className="flex items-center gap-2">
          <MayenLogo size={28} color="#FFFFFF" bracketOpacity={0.55} />
          <span className="text-2xl font-medium text-white">Mayen</span>
        </div>
      </div>
    </div>
  );
}
