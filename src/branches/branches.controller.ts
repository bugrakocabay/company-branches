import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { OwnerGuard } from 'src/guards/owner.guard';
import { CurrentUser } from 'src/user/decorators/current-user.decorator';
import { User } from 'src/user/user.entity';
import { BranchesService } from './branches.service';
import { CreateBranchDto } from './dtos/create-branch.dto';
import { UpdateBranchDto } from './dtos/update-branch.dto';

@Controller('api/branches')
@UseGuards(AuthGuard)
export class BranchesController {
  constructor(private branchService: BranchesService) {}

  @Post('create')
  @UseGuards(OwnerGuard)
  createBranch(@Body() dto: CreateBranchDto, @CurrentUser() user: User) {
    return this.branchService.create(dto, user);
  }

  @Get()
  listBranches() {
    return this.branchService.findAll();
  }

  @Delete(':id')
  @UseGuards(OwnerGuard)
  deleteBranch(@Param('id') id: number) {
    return this.branchService.delete(id);
  }

  @Patch(':id')
  @UseGuards(OwnerGuard)
  updateBranch(@Param('id') id: number, @Body() dto: UpdateBranchDto) {
    return this.branchService.update(id, dto);
  }
}
