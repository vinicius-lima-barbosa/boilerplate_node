import { z } from 'zod';

export const EditUserSchema = z.object({
  name: z.string().min(1)
});

type EditUserDto = z.infer<typeof EditUserSchema>;
export default EditUserDto;
