
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import User from "./User";
import Pokemon from './Pokemon'

@Entity("users_pokemons")
export default class UserPokemon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  pokemonId: Number;

  @ManyToOne(() => User, user => user.user_pokemons)
  user: User
  
  @ManyToOne(() => Pokemon, pokemon => pokemon.user_pokemons)
  pokemon: Pokemon
}
