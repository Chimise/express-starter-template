import {z} from 'zod';

export const loginSchema = z.object({
    email: z.string().email('Please enter a valid email'),
    password: z.string({required_error: 'Password is required'}).min(5, 'Password should be at least five characters')
})