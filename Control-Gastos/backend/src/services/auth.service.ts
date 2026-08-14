import { UserModel } from '../models/user.model';
import { generateToken } from '../config/jwt';
import { LoginResponse, LoginRequest } from '../types';

export class AuthService {
  static async login(credentials: LoginRequest): Promise<LoginResponse | null> {
    const { username, password } = credentials;
    
    const user = await UserModel.validatePassword(username, password);
    if (!user) return null;

    const token = generateToken({
      id: user.id,
      username: user.username,
      role: user.role,
    });

    return {
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    };
  }


  static async getUserById(id: number) {
    return await UserModel.findById(id);
  }
}