import type { Route } from "./+types/home";
import Home from "../home/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Everything Kerala - The Kerala Hub" },
    { name: "description", content: "A curated directory of websites, services, and mobile applications made for Kerala." },
  ];
}

export default function HomePage() {
  return <Home />;
}
