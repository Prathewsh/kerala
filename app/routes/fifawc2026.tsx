import FIFAWCPage from "../fifawc/FIFAWCPage";

export function meta() {
  return [
    { title: "FIFA World Cup 2026 Live Dashboard - Everything Kerala" },
    { name: "description", content: "Live scores, match schedules, group standings, and statistics for the FIFA World Cup 2026." },
  ];
}

export default function FIFAWCRoute() {
  return <FIFAWCPage />;
}
