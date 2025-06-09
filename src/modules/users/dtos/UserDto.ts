import { z } from 'zod';

export class UserDto {
  static editUserSchema = z.object({
    name: z.string().min(1)
  });

  static validateEditUser(data: unknown) {
    return this.editUserSchema.parse(data) as EditUserDto;
  }
}

export type EditUserDto = z.infer<typeof UserDto.editUserSchema>;
