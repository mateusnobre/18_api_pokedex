import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import UserPokemon from "./UserPokemon";

@Entity("pokemons")
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
  userPokemonId: number;
  
  @OneToMany(() => UserPokemon, user_pokemon => user_pokemon.pokemon)
  user_pokemons: UserPokemon[]
}

