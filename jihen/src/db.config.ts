import "dotenv/config";
import { PrismaClient } from "./generated/prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } = process.env;
if (!DB_HOST || !DB_USER || !DB_PASSWORD || !DB_NAME || !DB_PORT) {
  throw new Error("필수 DB 환경변수(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT)가 설정되지 않았습니다.");
}

const adapter = new PrismaMariaDb({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  port: parseInt(DB_PORT, 10),
  connectionLimit: 10,
});

export const prisma = new PrismaClient({
  adapter,
  log: ["query", "info", "error", "warn"],
});
