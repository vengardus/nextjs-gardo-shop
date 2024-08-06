import bcryptjs from "bcryptjs";

export const cryptoHashSync = (password:string) => {
    return bcryptjs.hashSync(password)
}