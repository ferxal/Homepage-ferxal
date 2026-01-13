import fs from "node:fs";
import path from "node:path";

async function fetchBangumiData() {
  // 从 src/data/info.ts 中提取 bangumiUserId
  const infoPath = path.resolve("./src/data/info.ts");
  const infoContent = fs.readFileSync(infoPath, "utf-8");
  const match = infoContent.match(/bangumiUserId:\s*["'](.+?)["']/);
  
  const userId = match ? match[1] : null;

  if (!userId || userId === "your-user-id" || userId === "idealclover") {
    // 如果是默认值或未设置，可以跳过或使用默认
    if (!userId) {
        console.log("No Bangumi User ID found in src/data/info.ts, skipping fetch.");
        return;
    }
  }

  console.log(`Fetching Bangumi data for user: ${userId}...`);

  try {
    // Bangumi 收藏状态类型: 1 = 想看 (wish), 2 = 看过 (collect), 3 = 在看 (do)
    const statusTypes = [
      { id: 1, label: "planned" },
      { id: 2, label: "completed" },
      { id: 3, label: "watching" }
    ];

    let allAnimeList = [];

    for (const type of statusTypes) {
      console.log(`Fetching ${type.label} items...`);
      const response = await fetch(
        `https://api.bgm.tv/v0/users/${userId}/collections?subject_type=2&type=${type.id}&limit=30`,
        {
          headers: {
            "User-Agent": "idealclover/Homepage-ferxal (https://github.com/idealclover/Homepage)",
          },
        }
      );

      if (!response.ok) {
        console.warn(`Failed to fetch ${type.label} collections: ${response.statusText}`);
        continue;
      }

      const resData = await response.json();
      const collections = resData.data || [];

      const animeItems = await Promise.all(
        collections.map(async (item) => {
          const subject = item.subject;
          
          let studio = "Unknown";
          let genres = [];
          let description = subject.short_summary || "";
          let publicRating = subject.rating?.score || 0;

          try {
              const detailRes = await fetch(`https://api.bgm.tv/v0/subjects/${subject.id}`, {
                  headers: {
                      "User-Agent": "idealclover/Homepage-ferxal (https://github.com/idealclover/Homepage)",
                  },
              });
              if (detailRes.ok) {
                  const detail = await detailRes.json();
                  // 提取制作公司
                  const studioInfo = detail.infobox?.find(i => i.key === "制作" || i.key === "动画制作");
                  if (studioInfo) {
                      studio = Array.isArray(studioInfo.value) ? studioInfo.value[0].v : (typeof studioInfo.value === 'string' ? studioInfo.value : studioInfo.value.v || "Unknown");
                  }
                  // 提取标签作为流派
                  genres = detail.tags?.slice(0, 5).map(t => t.name) || [];
                  if (!description) description = detail.summary || "";
                  if (publicRating === 0) publicRating = detail.rating?.score || 0;
              }
          } catch (e) {
              console.warn(`Failed to fetch details for subject ${subject.id}`);
          }

          return {
            title: subject.name_cn || subject.name,
            cover: subject.images?.large || "",
            link: `https://bgm.tv/subject/${subject.id}`,
            status: type.label,
            rating: item.rate || publicRating || 0,
            progress: item.ep_status || 0,
            totalEpisodes: subject.eps || 0,
            description: description,
            year: subject.date ? subject.date.split("-")[0] : "Unknown",
            studio: studio,
            genre: genres,
          };
        })
      );
      allAnimeList = allAnimeList.concat(animeItems);
    }

    const outputPath = path.resolve("./src/data/bangumi-data.json");
    fs.writeFileSync(outputPath, JSON.stringify(allAnimeList, null, 2), "utf-8");
    console.log(`Successfully generated ${outputPath} with ${allAnimeList.length} items.`);
  } catch (error) {
    console.error("Error fetching Bangumi data:", error);
  }
}

fetchBangumiData();
