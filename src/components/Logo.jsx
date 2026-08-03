/**
 * Logo Component
 * Abstract monogram mark — a solid "M" silhouette with a negative-space "A"
 * cut through the lower center.
 *
 * Uses fill-rule="evenodd" to create the A as true transparency (not a
 * painted white shape), so the mark renders correctly on any background —
 * light, dark, gradient, or image — with no separate dark-mode variant needed.
 *
 * Usage:
 *   <Logo className="w-8 h-8" />        // sized via Tailwind
 *   <Logo size={40} />                   // sized via explicit pixel value
 */

export const Logo = ({ className = "w-8 h-8", size, ...props }) => {
  return (
    <svg
      viewBox="-52 -58 104 116"
      width={size}
      height={size}
      className={size ? undefined : className}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Mayen Akech logo"
      {...props}
    >
      <defs>
        <linearGradient
          id="mayen-logo-gradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#06B6D4" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>
      </defs>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        fill="url(#mayen-logo-gradient)"
        d="M -46 52 L -46 -52 L 0 8 L 46 -52 L 46 52 Z M 0 8 L 20 52 L -20 52 Z"
      />
    </svg>
  );
};
