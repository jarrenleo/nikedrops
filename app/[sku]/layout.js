import Navigation from "../_components/navigation/Navigation";

export default function Layout({ children }) {
  return (
    <div className="p-4">
      <Navigation />
      {children}
    </div>
  );
}
