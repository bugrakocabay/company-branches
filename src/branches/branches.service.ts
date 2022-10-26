import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/user/user.entity';
import { Branch } from './branches.entity';
import { CreateBranchDto } from './dtos/create-branch.dto';

@Injectable()
export class BranchesService {
  constructor(@InjectModel(Branch) private branchRepo: typeof Branch) {}

  async create(branchDto: CreateBranchDto, user: User) {
    const newBranch = { ...branchDto, user_id: user.id };

    return await this.branchRepo.create(newBranch);
  }

  async findAll() {
    return this.branchRepo.findAll();
  }

  async delete(id: number) {
    const branch = await this.branchRepo.findOne({ where: { id } });
    if (!branch) throw new NotFoundException('branch not found');

    await this.branchRepo.destroy({ where: { id } });
    return { msg: 'branch has been deleted' };
  }

  async update(id: number, attrs: Partial<Branch>) {
    const foundBranch = await this.branchRepo.findOne({ where: { id } });
    if (!foundBranch) throw new NotFoundException('branch not found');

    await this.branchRepo.update(attrs, { where: { id } });
    return await this.branchRepo.findOne({ where: { id } });
  }
}
