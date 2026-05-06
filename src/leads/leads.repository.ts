import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoLead } from '../shared/mongoose/lead.schema';

@Injectable()
export class LeadsRepository {

  constructor(
    @InjectModel('leads')
    private readonly leadModel: Model<MongoLead>,
  ) {}

  async createLead(
    payload: Partial<MongoLead>,
  ) {
    return this.leadModel.create(payload);
  }

  async findRecentLead(
    email: string,
    phone: string,
  ) {
    return this.leadModel.findOne({
      $or: [
        { email },
        { phone },
      ],

      createdAt: {
        $gte: new Date(
          Date.now() - 5 * 60 * 1000,
        ),
      },
    });
  }

  async getAllLeads() {
    return this.leadModel
      .find()
      .sort({ createdAt: -1 });
  }

  async findLeadByEmail(
    email: string,
  ) {
    return this.leadModel.findOne({
      email,
    });
  }
}