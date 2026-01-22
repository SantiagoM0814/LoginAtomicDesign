export class User {
    constructor(
        public readonly id: string,
        public readonly correo: string,
        public readonly contrasena: string,
        public readonly nombre: string,
        public readonly createdAt: Date
    ) {}
}
