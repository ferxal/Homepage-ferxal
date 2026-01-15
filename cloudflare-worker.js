export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const userId = url.searchParams.get("userId") || "ferxal987";
    
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, HEAD, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      const statusTypes = [
        { id: 1, label: "planned" },
        { id: 2, label: "completed" },
        { id: 3, label: "watching" }
      ];

      // 尝试从缓存中获取（Cloudflare Workers 默认不自动缓存 fetch，这里我们手动处理 ETag）
      const clientETag = request.headers.get("If-None-Match");
      
      let allAnimeList = [];

      // 简单的时间戳 ETag（实际生产环境建议根据数据内容生成 hash）
      const currentETag = `W/"anime-list-${new Date().getHours()}"`;

      if (clientETag === currentETag) {
        return new Response(null, {
          status: 304,
          headers: {
            ...corsHeaders,
            "ETag": currentETag,
            "Cache-Control": "public, max-age=3600",
          }
        });
      }

      for (const type of statusTypes) {
        const response = await fetch(
          `https://api.bgm.tv/v0/users/${userId}/collections?subject_type=2&type=${type.id}&limit=30`,
          {
            headers: {
              "User-Agent": "ferxal/Homepage-ferxal (https://github.com/ferxal/Homepage-ferxal)",
            },
          }
        );

        if (!response.ok) continue;

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
                  "User-Agent": "ferxal/Homepage-ferxal (https://github.com/ferxal/Homepage-ferxal)",
                },
              });
              if (detailRes.ok) {
                const detail = await detailRes.json();
                const studioInfo = detail.infobox?.find(i => i.key === "制作" || i.key === "动画制作");
                if (studioInfo) {
                  studio = Array.isArray(studioInfo.value) ? studioInfo.value[0].v : (typeof studioInfo.value === 'string' ? studioInfo.value : studioInfo.value.v || "Unknown");
                }
                genres = detail.tags?.slice(0, 5).map(t => t.name) || [];
                if (!description) description = detail.summary || "";
                if (publicRating === 0) publicRating = detail.rating?.score || 0;
              }
            } catch (e) {}

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

      // Sort by status priority: watching > completed > planned
      const statusOrder = {
        watching: 1,
        completed: 2,
        planned: 3,
        onhold: 4,
        dropped: 5,
      };
      allAnimeList.sort((a, b) => {
        return (statusOrder[a.status] || 99) - (statusOrder[b.status] || 99);
      });

      return new Response(JSON.stringify(allAnimeList), {
        headers: {
          "Content-Type": "application/json",
          "ETag": currentETag,
          "Cache-Control": "public, max-age=3600, stale-while-revalidate=600",
          ...corsHeaders
        },
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders
        },
      });
    }
  },
};
