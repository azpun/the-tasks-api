import 'dotenv/config'
import fs from 'fs'
import path from 'path'

// Load RSA keys: prefer env vars (required on Vercel), fall back to local .pem files for dev
function loadKey(envVar: string, filePath: string): string {
  const envKey = process.env[envVar]

  // First check if the key is available as an environment variable (e.g., on Vercel)
  if (envKey) {
    // In Vercel (or CI), the key is stored as a base64-encoded env var
    // to avoid newline escaping issues. Decode it here.
    try {
      return Buffer.from(envKey.trim(), 'base64').toString('utf-8')
    } catch (err) {
      throw new Error(`Gagal men-decode Base64 untuk variable ${envVar}. Pastikan formatnya benar.`, { cause: err })
    }
  }
  // Local development fallback: read from file
  const resolved = path.resolve(filePath)
  if (fs.existsSync(resolved)) {
    return fs.readFileSync(resolved, 'utf-8')
  }

  // Key not found
  throw new Error(`RSA key not found. Set the ${envVar} environment variable or provide the file at ${filePath}`)
}

const CONFIG = {
  db: process.env.DB_URL,
  jwt_public: loadKey('JWT_PUBLIC_KEY', 'keys/public.pem'),
  jwt_private: loadKey('JWT_PRIVATE_KEY', 'keys/private.pem')
} as const // Menggunakan 'as const' untuk immutability

export default CONFIG
