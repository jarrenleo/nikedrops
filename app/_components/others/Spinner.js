export default function Spinner({ isMini = false }) {
  return <div className={!isMini ? "spinner" : "mini-spinner"}></div>;
}
