import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import User from "./User";

@Entity("sessions")
export default class Session {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  number: number;

  @Column()
  image: string;
  
  @Column()
  weight: number;
  
  @Column()
  height: string;
  
  @Column()
  baseExp: number;

  @Column()
  description: string;

  @Column()
  userId: number;
  
  @ManyToMany(() => User)
  @JoinTable()
  users: User[];
}

