
export interface IUser {
    id: string;
    name: string;
    email: string;
    emailVerified: Date | null;
    password: string;
    role: UserRole; 
    image: string | null;

    // Relaciones
    //user:  IUser
    //Order Order[]
}

export type UserRole = 'user' | 'admin' 
