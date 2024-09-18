import { ring } from "ldrs";
ring.register();

export default function Spinner({ size, stroke }) {
  return <l-ring size={size} stroke={stroke} color="white"></l-ring>;
}
