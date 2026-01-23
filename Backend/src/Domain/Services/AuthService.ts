import bcrypt from 'bcryptjs';

export class AuthService {

    normalizeEmail(correo: string): string {
        return correo.toLowerCase().trim();
    }

    validateEmail (correo: string): boolean { 

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(correo);
    }
    validatePassword (contrasena: string): boolean {

        return contrasena.length >= 6;
     }
        async verifyPassword (plain: string, hashed: string): Promise<boolean> { 

        return await bcrypt.compare(plain, hashed);
    }
}