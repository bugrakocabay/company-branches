import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { comparePasswords, hashPassword } from './helpers/hashPassword';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userRepo: typeof User) {}

  async create(
    email: string,
    password: string,
    first_name: string,
    last_name: string,
    role: string,
  ) {
    const emailInDb = await this.userRepo.findOne({ where: { email } });
    if (emailInDb) throw new BadRequestException('email in use');

    const hashedPassword = hashPassword(password);
    const user = this.userRepo.create({
      email,
      password: hashedPassword,
      first_name,
      last_name,
      role,
    });

    return user;
  }

  async signin(email: string, password: string) {
    const user = await this.userRepo.findOne({ where: { email } });
    if (!user) throw new BadRequestException('cant find this user :S');

    const match = comparePasswords(password, user.password);
    if (!match) throw new BadRequestException('Incorrect credentials');

    return user;
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) throw new BadRequestException('cant find this user :S');

    return user;
  }

  async findAll() {
    return await this.userRepo.findAll();
  }
}
