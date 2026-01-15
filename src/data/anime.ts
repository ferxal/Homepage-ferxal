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

async function getAnimeList(): Promise<AnimeItem[]> {
  try {
    const response = await fetch("https://api.1t.nz/get/anime");
    if (!response.ok) {
      throw new Error(`Failed to fetch anime data: ${response.statusText}`);
    }
    const data = await response.json();
    return data as AnimeItem[];
  } catch (error) {
    console.error("Error fetching anime list from API:", error);
    // Fallback to local data if fetch fails
    try {
      const bangumiData = await import("./bangumi-data.json");
      return (bangumiData.default as any[]).map((item: any) => ({
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
    } catch (e) {
      return [];
    }
  }
}

const animeList = await getAnimeList();
export default animeList;
