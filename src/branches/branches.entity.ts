import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../user/user.entity';

@Table
export class Branch extends Model {
  @Column
  name: string;

  @Column
  latitude: number;

  @Column
  longitude: number;

  @Column
  full_address: string;

  @Column
  phone: string;

  @Column
  branch_id: string;

  @ForeignKey(() => User)
  @Column
  user_id: number;

  @BelongsTo(() => User)
  user: User;
}
