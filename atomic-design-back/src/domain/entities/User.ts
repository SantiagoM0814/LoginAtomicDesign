export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  createdAt: string;
}

export class UserEntity implements User {
  constructor(
    public id: string,
    public email: string,
    public password: string,
    public name: string,
    public createdAt: string
  ) {}

  static create(
    id: string,
    email: string,
    password: string,
    name: string,
    createdAt: string
  ): UserEntity {
    return new UserEntity(id, email, password, name, createdAt);
  }

  isValidPassword(hashedPassword: string): boolean {
    return this.password === hashedPassword;
  }

  toPublicUser() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = this;
    return userWithoutPassword;
  }
}
