import bcrypt from 'bcrypt'

// enkripsi password
export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10)
}

// cek dan dekripsi password
export const comparePassword = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash)
}
