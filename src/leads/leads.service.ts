import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { LeadsRepository } from '../leads/leads.repository';
import { LeadType } from '../shared/zod/lead.schema';

@Injectable()
export class LeadsService {

  constructor(
    private readonly leadsRepository: LeadsRepository,
  ) {}

  async createLead(
    leadModel: LeadType,
  ) {

    // Duplicate prevention
    const existingLead =
      await this.leadsRepository.findRecentLead(
        leadModel.email,
        leadModel.phone,
      );

    if (existingLead) {
      throw new BadRequestException(
        'Duplicate submission detected',
      );
    }

    let discountAmount = 0;

    let finalPrice =
      leadModel.budgetRange;

    if (
      leadModel.couponCode === 'SAVE10'
    ) {

      // Minimum budget check
      if (leadModel.budgetRange < 500) {
        throw new BadRequestException(
          'Minimum ₹500 required',
        );
      }

      discountAmount =
        leadModel.budgetRange * 0.1;

      finalPrice =
        leadModel.budgetRange -
        discountAmount;
    }

    // Save lead
    const lead =
      await this.leadsRepository.createLead({
        ...leadModel,
        discountAmount,
        finalPrice,
      });

    return {
      success: true,
      message: 'Lead submitted successfully',
      data: lead,
    };
  }

  async getAllLeads() {

    const leads = await this.leadsRepository.getAllLeads();

    return {
      success: true,
      data: leads,
    };
  }
}