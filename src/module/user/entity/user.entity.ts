import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  //Columna primaria autoincremental
  @PrimaryGeneratedColumn()
  id: number;
  //Columna de tipo texto
  @Column()
  name: String;
  lastName: String;
  username: String;
  email: String;
  password: String;
  role: String;
}
