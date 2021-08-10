import { Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import Session from "./Session";
import Pokemon from './Pokemon'
import UserPokemon from "./UserPokemon";
@Entity("users")
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Session, session => session.user)
  sessions: Session[]
  
  @OneToMany(() => UserPokemon, user_pokemon => user_pokemon.user)
  user_pokemons: UserPokemon[]
}
