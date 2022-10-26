import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BranchesController } from './branches.controller';
import { Branch } from './branches.entity';
import { BranchesService } from './branches.service';

@Module({
  imports: [SequelizeModule.forFeature([Branch])],
  controllers: [BranchesController],
  providers: [BranchesService],
})
export class BranchesModule {}
