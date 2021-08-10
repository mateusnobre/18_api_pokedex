import {MigrationInterface, QueryRunner} from "typeorm";

export class creatingTables1628578570927 implements MigrationInterface {
    name = 'creatingTables1628578570927'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "sessions" ("id" SERIAL NOT NULL, "token" character varying NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_3238ef96f18b355b671619111bc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users_pokemons" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "pokemonId" integer NOT NULL, CONSTRAINT "PK_6d55d403210e0f141a18d79d387" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "sessions" DROP COLUMN "token"`);
        await queryRunner.query(`ALTER TABLE "sessions" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "sessions" ADD "token" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sessions" ADD "userId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sessions" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sessions" ADD "number" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sessions" ADD "image" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sessions" ADD "weight" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sessions" ADD "height" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sessions" ADD "baseExp" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sessions" ADD "description" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sessions" ADD "userPokemonId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sessions" ADD CONSTRAINT "FK_57de40bc620f456c7311aa3a1e6" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_pokemons" ADD CONSTRAINT "FK_576c5d6475f397b4a24cf58e6be" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_pokemons" ADD CONSTRAINT "FK_eb025b13aee5e0ce5a745196305" FOREIGN KEY ("pokemonId") REFERENCES "sessions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_pokemons" DROP CONSTRAINT "FK_eb025b13aee5e0ce5a745196305"`);
        await queryRunner.query(`ALTER TABLE "users_pokemons" DROP CONSTRAINT "FK_576c5d6475f397b4a24cf58e6be"`);
        await queryRunner.query(`ALTER TABLE "sessions" DROP CONSTRAINT "FK_57de40bc620f456c7311aa3a1e6"`);
        await queryRunner.query(`ALTER TABLE "sessions" DROP COLUMN "userPokemonId"`);
        await queryRunner.query(`ALTER TABLE "sessions" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "sessions" DROP COLUMN "baseExp"`);
        await queryRunner.query(`ALTER TABLE "sessions" DROP COLUMN "height"`);
        await queryRunner.query(`ALTER TABLE "sessions" DROP COLUMN "weight"`);
        await queryRunner.query(`ALTER TABLE "sessions" DROP COLUMN "image"`);
        await queryRunner.query(`ALTER TABLE "sessions" DROP COLUMN "number"`);
        await queryRunner.query(`ALTER TABLE "sessions" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "sessions" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "sessions" DROP COLUMN "token"`);
        await queryRunner.query(`ALTER TABLE "sessions" ADD "userId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sessions" ADD "token" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "users_pokemons"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "sessions"`);
    }

}
