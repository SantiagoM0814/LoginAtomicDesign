export class AuthService {

    validateEmail (correo: string): boolean { }
    validatePassword (contrasena: string): string { }
    verifyPassword (plain: string, hashed: string): boolean { }
}