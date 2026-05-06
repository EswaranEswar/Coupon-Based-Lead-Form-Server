import { Schema, Document } from 'mongoose';

export const MongoRequirementTypeEnum = [
  'Service',
  'Product',
  'Consultation',
] as const;

export const MongoLeadSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      index: true,
    },

    city: {
      type: String,
      required: true,
      trim: true,
    },

    requirementType: {
      type: String,
      enum: MongoRequirementTypeEnum,
      required: true,
    },

    budgetRange: {
      type: Number,
      required: true,
    },

    message: {
      type: String,
      default: null,
      trim: true,
    },

    couponCode: {
      type: String,
      default: null,
      trim: true,
    },

    discountAmount: {
      type: Number,
      default: 0,
    },

    finalPrice: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export interface MongoLead extends Document {
  name: string;
  phone: string;
  email: string;

  city: string;

  requirementType:
    (typeof MongoRequirementTypeEnum)[number];

  budgetRange: number;

  message?: string | null;

  couponCode?: string | null;

  discountAmount: number;

  finalPrice: number;
}