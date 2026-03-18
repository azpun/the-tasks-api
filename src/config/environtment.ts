import 'dotenv/config'
import fs from 'fs'
// import public from 'keys/public.pem'

const CONFIG = {
  db: process.env.DB_URL,
  jwt_public: fs.readFileSync('src/keys/public.pem', 'utf-8'),
  jwt_private: fs.readFileSync('src/keys/private.pem', 'utf-8')
}

export default CONFIG
