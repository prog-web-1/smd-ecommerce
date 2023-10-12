export interface UserPayload {
    sub: number;
    login: string;
    nome: string;
    iat?: number;
    exp?: number;
}