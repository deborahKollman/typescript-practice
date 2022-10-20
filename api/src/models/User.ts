import {Model, Column, Table, CreatedAt, UpdatedAt, PrimaryKey, AutoIncrement} from 'sequelize-typescript';
@Table
export class User extends Model<User> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id!: number;

    @Column
    name!: string;

    @Column
    lastName!: string;

    @CreatedAt
    @Column
    createdAt!: Date;

    @UpdatedAt
    @Column
    updatedAt!: Date;
}