export default function ProductDetail({ label, value, children }) {
  return (
    <div className="flex cursor-default flex-col">
      <span className="text-muted-foreground">{label}</span>
      <div className="flex items-center gap-1">
        <span>{value}</span>
        {children}
      </div>
    </div>
  );
}
