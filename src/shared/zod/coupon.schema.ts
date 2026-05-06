import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const CouponTypeEnum = [
  'PERCENT',
  'FLAT',
] as const;

export const RequirementTypeEnum = [
  'Service',
  'Product',
  'Consultation',
] as const;

// CreateCouponSchema 
export const CreateCouponSchema = z.object({
  code: z
    .string()
    .trim()
    .min(3, 'Coupon code is required')
    .transform((value) =>
      value.toUpperCase(),
    ),

  type: z.enum(CouponTypeEnum),

  discountValue: z
    .number({
      error: 'Discount value must be a number',
    })
    .positive(
      'Discount value must be greater than 0',
    ),

  minAmount: z
    .number()
    .positive()
    .nullable()
    .optional(),

  applicableRequirementTypes: z
    .array(
      z.enum(RequirementTypeEnum),
    )
    .optional()
    .default([]),

  maxUses: z
    .number()
    .int()
    .positive()
    .default(100),

  currentUses: z
    .number()
    .int()
    .min(0)
    .default(0),

  expiryDate: z.preprocess(
    (value) => new Date(value as string),

    z.date({
      error: 'Invalid expiry date',
    }),
  ),

  isActive: z
    .boolean()
    .default(true),
});

export const ValidateCouponSchema =
  z.object({
    couponCode: z
      .string()
      .trim()
      .min(1, 'Coupon code required')
      .transform((value) =>
        value.toUpperCase(),
      ),

    requirementType: z.enum(
      RequirementTypeEnum,
    ),

    budgetRange: z.preprocess(
      (value) => Number(value),

      z
        .number()
        .positive(
          'Budget must be greater than 0',
        ),
    ),
  });

export class CreateCouponDto
  extends createZodDto(
    CreateCouponSchema,
  ) {}

export class ValidateCouponDto
  extends createZodDto(
    ValidateCouponSchema,
  ) {}