import bcryptjs from "bcryptjs";

export const cryptoHashSync = (password:string) => {
    return bcryptjs.hashSync(password)
}

export const cryptoCompareSync = (password:string, hash:string) => {
    return bcryptjs.compareSync(password, hash)
}