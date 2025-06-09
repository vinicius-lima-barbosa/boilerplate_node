import { z } from 'zod';

export class AuthDto {
  static registerSchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(6)
  });

  static loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
  });

  static validateRegister(data: unknown) {
    return this.registerSchema.parse(data) as RegisterDto;
  }

  static validateLogin(data: unknown) {
    return this.loginSchema.parse(data) as LoginDto;
  }
}

export type RegisterDto = z.infer<typeof AuthDto.registerSchema>;
export type LoginDto = z.infer<typeof AuthDto.loginSchema>;
