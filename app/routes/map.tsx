import MapViewPage from "../map/MapViewPage";

export function meta() {
  return [
    { title: "Interactive Map - Everything Kerala" },
    { name: "description", content: "Explore famous places, attractions, and local digital services across Kerala on our interactive map." },
  ];
}

export default function MapRoute() {
  return <MapViewPage />;
}
