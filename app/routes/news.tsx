import NewsPage from "../news/NewsPage";

export function meta() {
  return [
    { title: "Live Malayalam News - Everything Kerala" },
    { name: "description", content: "Watch major Malayalam news channels live in a unified streaming dashboard." },
  ];
}

export default function NewsRoute() {
  return <NewsPage />;
}
