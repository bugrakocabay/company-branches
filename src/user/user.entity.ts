import { Column, DataType, Model, Table } from 'sequelize-typescript';

enum roleType {
  OWNER = 'owner',
  EMPLOYEE = 'employee',
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
