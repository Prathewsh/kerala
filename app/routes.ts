import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("map", "routes/map.tsx"),
  route("news", "routes/news.tsx"),
  route("fifawc2026", "routes/fifawc2026.tsx"),
  route("api/news", "routes/api.news.ts")
] satisfies RouteConfig;
