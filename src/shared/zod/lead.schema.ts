import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const LeadSchema = z.object({
  name: z.string().min(3),
  phone: z.string().min(10),
  email: z.email(),
  city: z.string().min(1),
  requirementType: z.enum(['Service', 'Product', 'Consultation']),
  budgetRange: z.number(),
  message: z.string().optional(),
  couponCode: z.string().optional(),
});

export type LeadType = z.infer<typeof LeadSchema>
export class LeadDto extends createZodDto(LeadSchema) {}