import { cn } from "@/lib/utils";
import type { Mark } from "@/lib/game";

// Hand-drawn SVG pieces. Unlike emoji, they render identically on every OS
// and take the exact theme color through `currentColor`.

const BOLT_PATH = "M13.6 1.8 4.2 13.4h6.6l-1.3 8.8 9.9-12.3h-6.7l.9-8.1Z";

/** An 8-tooth gear with a center bore, built once at module load. */
const GEAR_PATH = (() => {
  const cx = 12;
  const cy = 12;
  const teeth = 8;
  const rOuter = 10.6;
  const rRoot = 8;
  const rBore = 3.4;
  const step = (Math.PI * 2) / teeth;
  const pt = (r: number, a: number) =>
    `${(cx + r * Math.cos(a)).toFixed(2)} ${(cy + r * Math.sin(a)).toFixed(2)}`;

  const outline: string[] = [];
  for (let i = 0; i < teeth; i++) {
    const a = i * step - Math.PI / 2;
    outline.push(pt(rRoot, a - step * 0.3), pt(rOuter, a - step * 0.17), pt(rOuter, a + step * 0.17), pt(rRoot, a + step * 0.3));
  }
  const body = `M${outline.join("L")}Z`;
  const bore = `M${cx + rBore} ${cy}A${rBore} ${rBore} 0 1 0 ${cx - rBore} ${cy}A${rBore} ${rBore} 0 1 0 ${cx + rBore} ${cy}Z`;
  return body + bore;
})();

interface MarkProps {
  className?: string;
}

export function BoltMark({ className }: MarkProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className={cn("text-bolt", className)}>
      <path d={BOLT_PATH} fill="currentColor" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  );
}

export function GearMark({ className }: MarkProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className={cn("text-gear", className)}>
      <path d={GEAR_PATH} fill="currentColor" fillRule="evenodd" stroke="currentColor" strokeWidth="0.8" strokeLinejoin="round" />
    </svg>
  );
}

export function PlayerMark({ mark, className }: MarkProps & { mark: Mark }) {
  return mark === "P1" ? <BoltMark className={className} /> : <GearMark className={className} />;
}
