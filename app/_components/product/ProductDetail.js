export default function ProductDetail({ label, value, children }) {
  return (
    <div className="flex flex-col">
      <span className="text-xs text-muted-foreground">{label}</span>
      <div className="flex items-center gap-1">
        <span className={`text-sm`}>{value}</span>
        {children}
      </div>
    </div>
  );
}
