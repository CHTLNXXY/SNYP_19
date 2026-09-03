import { Redis } from '@upstash/redis';

// Redis.fromEnv() automatically reads UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN
// (or the older KV_REST_API_URL / KV_REST_API_TOKEN names) once you connect an
// Upstash Redis integration to this project from the Vercel Marketplace.
const redis = Redis.fromEnv();

const STORAGE_KEY = 'perjalanan-snyp-bogor';

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const data = await redis.get(STORAGE_KEY);
      res.status(200).json(data || null);
      return;
    }

    if (req.method === 'POST') {
      const body = req.body && typeof req.body === 'object' ? req.body : JSON.parse(req.body || '{}');
      await redis.set(STORAGE_KEY, body);
      res.status(200).json({ ok: true });
      return;
    }

    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  } catch (err) {
    res.status(500).json({ error: 'Gagal terhubung ke storage', detail: String(err) });
  }
}
