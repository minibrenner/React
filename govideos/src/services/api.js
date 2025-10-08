const BASE_URL =
  (import.meta.env.VITE_API_URL || "http://localhost:3001").replace(/\/$/, "");

export async function fetchVideos({
  limit = 99999,
  offset = 0,
  tipo = "video",
} = {}) {
  const url = new URL("/api/videos", BASE_URL);
  url.searchParams.set("limit", String(limit));
  url.searchParams.set("offset", String(offset));
  url.searchParams.set("tipo", tipo);

  let response;

  try {
    response = await fetch(url.toString());
  } catch (error) {
    throw new Error("Nao foi possivel conectar na API de videos.");
  }

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(`Falha ao buscar videos (${response.status}) ${text}`);
  }

  return response.json();

  
}
