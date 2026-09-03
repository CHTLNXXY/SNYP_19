# Perjalanan SNYP di Bogor

Checklist perjalanan interaktif (peta + detail) yang statusnya kesimpen di server, jadi tetap ada walau tab ditutup atau dibuka dari HP lain.

## Isi folder ini
- `index.html` — halaman utamanya (peta + detail)
- `api/state.js` — serverless function di Vercel buat baca/simpan status checklist
- `package.json` — daftar dependency (cuma satu: `@upstash/redis`)
- `.gitignore`

## Langkah upload ke GitHub

1. Buat repo baru di GitHub (public atau private, bebas)
2. Di folder ini, jalankan:
   ```
   git init
   git add .
   git commit -m "Perjalanan SNYP di Bogor"
   git branch -M main
   git remote add origin <URL_REPO_GITHUB_LU>
   git push -u origin main
   ```

## Langkah deploy ke Vercel

1. Buka [vercel.com](https://vercel.com), login pakai akun GitHub
2. Klik **Add New → Project**, pilih repo yang baru lu push
3. Biarkan semua setting default, klik **Deploy**
4. Setelah selesai, situs lu udah online — tapi checklist-nya BELUM bisa nyimpen ke server sampai step berikutnya

## Nyalain penyimpanan (Upstash Redis)

Dulu ini namanya "Vercel KV", sekarang produknya udah pindah nama jadi **Upstash Redis** lewat Vercel Marketplace. Caranya:

1. Buka project lu di dashboard Vercel
2. Masuk tab **Storage** (atau **Marketplace**)
3. Cari **Upstash** → pilih **Redis** → klik **Continue/Install**
4. Ikuti langkah provisioning (bikin database baru, region terdekat pilih Singapore biar cepet)
5. Setelah terhubung, Vercel otomatis nambahin environment variable (`KV_REST_API_URL`, `KV_REST_API_TOKEN`, atau `UPSTASH_REDIS_REST_URL`/`UPSTASH_REDIS_REST_TOKEN`) ke project lu — kode di `api/state.js` udah otomatis baca ini, nggak perlu ubah apa-apa
6. Redeploy project (Vercel biasanya nawarin redeploy otomatis setelah integrasi baru ditambahin)

Setelah itu, checklist yang lu centang di HP bakal kesimpen beneran di server, dan tetap sama walau dibuka dari device lain.

## Testing lokal (opsional)
Kalau mau coba dulu di laptop sebelum push:
```
npm install -g vercel
vercel dev
```
