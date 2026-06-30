export async function loader() {
  try {
    const res = await fetch("https://what-s-happening-in-kerala.vercel.app/api/news?limit=12");
    if (!res.ok) throw new Error("Failed to fetch from upstream");
    const data = await res.json();
    return Response.json(data);
  } catch (error: any) {
    console.error("Error in api/news proxy loader:", error);
    return Response.json(
      { items: [], error: error.message || "Failed to fetch news" },
      { status: 500 }
    );
  }
}
