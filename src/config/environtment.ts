import 'dotenv/config'
import fs from 'fs'
import path from 'path'

// Load RSA keys: prefer env vars (required on Vercel), fall back to local .pem files for dev
function loadKey(envVar: string, filePath: string): string {
  if (process.env[envVar]) {
    // In Vercel (or CI), the key is stored as a base64-encoded env var
    // to avoid newline escaping issues. Decode it here.
    return Buffer.from(process.env[envVar]!, 'base64').toString('utf-8')
  }
  // Local development fallback: read from file
  const resolved = path.resolve(filePath)
  if (fs.existsSync(resolved)) {
    return fs.readFileSync(resolved, 'utf-8')
  }
  throw new Error(
    `RSA key not found. Set the ${envVar} environment variable or provide the file at ${filePath}`
  )
}

const CONFIG = {
  db: process.env.DB_URL,
  jwt_public: loadKey('JWT_PUBLIC_KEY', 'src/keys/public.pem'),
  jwt_private: loadKey('JWT_PRIVATE_KEY', 'src/keys/private.pem')
}

export default CONFIG
