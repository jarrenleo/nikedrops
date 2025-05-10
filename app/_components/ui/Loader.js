export default function Loader({
  height = 60,
  width = 60,
  strokeWidth = "4px",
  className,
}) {
  return (
    <svg
      className={`loader ${className}`}
      viewBox="0 0 40 40"
      height={height}
      width={width}
    >
      <circle
        className="track stroke-foreground"
        cx="20"
        cy="20"
        r="17.5"
        pathLength="100"
        strokeWidth={strokeWidth}
        fill="none"
      />
      <circle
        className="car stroke-foreground"
        cx="20"
        cy="20"
        r="17.5"
        pathLength="100"
        strokeWidth={strokeWidth}
        fill="none"
      />
    </svg>
  );
}
