import bangumiData from "./bangumi-data.json";

export interface AnimeItem {
  title: string;
  cover: string;
  link: string;
  status: "watching" | "completed" | "planned" | "onhold" | "dropped";
  rating: number;
  progress: number;
  totalEpisodes: number;
  description: string;
  year: string;
  studio: string;
  genre: string[];
}

let animeList: AnimeItem[] = [];

if (Array.isArray(bangumiData) && bangumiData.length > 0) {
  animeList = (bangumiData as any[]).map((item: any) => ({
    title: item.title || "Unknown",
    cover: item.cover || "",
    link: item.link || "",
    status: item.status || "watching",
    rating: Number(item.rating) || 0,
    progress: Number(item.progress) || 0,
    totalEpisodes: Number(item.totalEpisodes) || 0,
    description: item.description || "",
    year: item.year || "",
    studio: item.studio || "",
    genre: Array.isArray(item.genre) ? item.genre : [],
  }));

  // 排序逻辑：在看 (watching) > 已看 (completed) > 想看 (planned)
  const statusOrder = {
    watching: 1,
    completed: 2,
    planned: 3,
    onhold: 4,
    dropped: 5,
  };
  animeList.sort((a, b) => {
    return (statusOrder[a.status as keyof typeof statusOrder] || 99) - (statusOrder[b.status as keyof typeof statusOrder] || 99);
  });
}

export default animeList;
