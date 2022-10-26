import { Column, DataType, Model, Table } from 'sequelize-typescript';

enum roleType {
  owner = 'owner',
  employee = 'employee',
}

@Table
export class User extends Model {
  @Column
  email: string;

  @Column
  first_name: string;

  @Column
  last_name: string;

  @Column
  password: string;

  @Column({ type: DataType.ENUM({ values: Object.keys(roleType) }) })
  role: roleType;
}
