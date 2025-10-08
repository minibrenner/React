import { config as loadEnv } from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

loadEnv({ path: path.resolve(process.cwd(), ".env") });
loadEnv({
  path: path.resolve(__dirname, ".env"),
  override: true,
});
import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";
import { videos as fallbackVideos } from "../src/data/videos.js";

const app = express();

app.use(cors());
app.use(express.json());

const PLACEHOLDER_THUMB = "/placeholder-thumb.svg";

const requiredDbVars = ["DB_HOST", "DB_USER", "DB_PASS", "DB_NAME"];
const hasDbConfig = requiredDbVars.every((envName) => Boolean(process.env[envName]));

let pool = null;

if (hasDbConfig) {
  pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
  });
} else {
  console.warn(
    "MySQL desabilitado - variaveis DB_HOST, DB_USER, DB_PASS ou DB_NAME ausentes. Usando dados de fallback."
  );
}

const normalizeVideo = (video) => ({
  id: video.id,
  youtubeId: video.youtubeId ?? video.youtubeid ?? null,
  title: video.title ?? video.titulo ?? "",
  description: video.description ?? video.descricao ?? "",
  category: video.category ?? video.categoria ?? "",
  company: video.company ?? video.empresa ?? "",
  publishedAt: video.publishedAt ?? video.data_publica ?? null,
  destaque: Boolean(video.destaque),
  tipo: video.tipo ?? "video",
  thumbUrl:
    video.thumbUrl ??
    video.thumb_url ??
    video.thumbnail ??
    video.thumbnail_url ??
    PLACEHOLDER_THUMB,
});

const fallbackData = fallbackVideos.map((video) =>
  normalizeVideo({
    ...video,
    tipo: video.tipo ?? "video",
  })
);

const applyFilters = ({ data, tipo, limit, offset }) => {
  const filtered =
    tipo && tipo !== "all" ? data.filter((item) => item.tipo === tipo) : data;

  return filtered.slice(offset, offset + limit);
};

app.get("/api/videos", async (req, res) => {
  const limit = Math.min(Number(req.query.limit ?? 4) || 4, 100);
  const offset = Number(req.query.offset ?? 0) || 0;
  const tipoValue =
    typeof req.query.tipo === "string" ? req.query.tipo.trim() : "";
  const tipo = tipoValue || null;

  if (!pool) {
    const data = applyFilters({
      data: fallbackData,
      tipo,
      limit,
      offset,
    });

    res.setHeader("x-data-source", "fallback");
    return res.json(data);
  }

  try {
    const [rows] = await pool.query(
      `SELECT
        id,
        titulo,
        descricao,
        categoria,
        empresa,
        data_publica,
        destaque,
        tipo,
        youtubeId,
        '' AS thumbUrl
      FROM goVideos
      WHERE (? IS NULL OR tipo = ?)
      ORDER BY data_publica DESC
      LIMIT ? OFFSET ?`,
      [tipo, tipo, limit, offset]
    );

    const data = rows.map((row) => normalizeVideo(row));

    res.json(data);
  } catch (error) {
    console.error("Error fetching videos - using fallback data", error);

    const data = applyFilters({
      data: fallbackData,
      tipo,
      limit,
      offset,
    });

    res.setHeader("x-data-source", "fallback");
    res.setHeader("x-db-error", error?.message ?? "unknown");
    res.json(data);
  }
});

const port = Number(process.env.PORT || 3001);
app.listen(port, () => {
  console.log(`API on http://localhost:${port}`);
});
