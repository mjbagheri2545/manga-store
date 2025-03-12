import bcrypt from "bcrypt";
import { fakerFA as faker } from "@faker-js/faker";

export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

type RandomIntBetweenOptions = {
  min?: number;
  max: number;
};

export function randomInt({ min = 0, max }: RandomIntBetweenOptions) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function randomIndex(options: RandomIntBetweenOptions) {
  return Math.min(randomInt(options), options.max - 1);
}

type RandomDateOptions = {
  minYear?: string;
  maxYear?: string;
};

export function randomDate({
  minYear = "2021",
  maxYear = String(new Date().getFullYear()),
}: RandomDateOptions = {}) {
  return faker.date.between({
    from: new Date(minYear),
    to: new Date(maxYear),
  });
}
