const tones = {
  brand: "border-brand-red/20 border-t-brand-red",
  white: "border-white/30 border-t-white",
} as const;

export default function Spinner({
  className = "h-5 w-5",
  tone = "brand",
  label = "Loading",
}: {
  className?: string;
  tone?: keyof typeof tones;
  label?: string;
}) {
  return (
    <span
      role="status"
      aria-label={label}
      className={`inline-block animate-spin rounded-full border-2 ${tones[tone]} ${className}`}
    />
  );
}
