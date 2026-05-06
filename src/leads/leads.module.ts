import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoLeadSchema } from '../shared/mongoose/lead.schema';
import { LeadsController } from './leads.controller';
import { LeadsService } from './leads.service';
import { LeadsRepository } from './leads.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'leads',
        schema: MongoLeadSchema,
      },
    ]),
  ],

  controllers: [LeadsController],

  providers: [
    LeadsService,
    LeadsRepository,
  ],

  exports: [
    LeadsService,
    LeadsRepository,
  ],
})
export class LeadModule {}