import { Model } from 'mongoose';
import { CreateCouponSchema } from '../shared/zod/coupon.schema';

export const couponSeedData = [
  {
    code: 'SAVE10',
    type: 'PERCENT',
    discountValue: 10,
    minAmount: 500,
    requirementType: null,
    maxUses: 100,
    currentUses: 0,
    expiryDate: new Date('2026-12-31'),
  },
  {
    code: 'FLAT100',
    type: 'FLAT',
    discountValue: 100,
    minAmount: null,
    requirementType: 'Service',
    maxUses: 100,
    currentUses: 0,
    expiryDate: new Date('2026-12-31'),
  },
  {
    code: 'NEWUSER',
    type: 'PERCENT',
    discountValue: 20,
    minAmount: null,
    requirementType: null,
    maxUses: 100,
    currentUses: 0,
    expiryDate: new Date('2026-12-31'),
  },
  {
    code: 'EXPIRE50',
    type: 'PERCENT',
    discountValue: 50,
    minAmount: null,
    requirementType: null,
    maxUses: 100,
    currentUses: 0,
    expiryDate: new Date('2025-12-31'),
  },
];
