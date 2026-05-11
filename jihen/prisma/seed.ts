import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client.js";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const adapter = new PrismaMariaDb({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
  connectionLimit: 10,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  const user = await prisma.user.create({
    data: {
      email: "test@umc.com",
      password: "1234",
      name: "테스트유저",
      gender: "male",
      birth: new Date("2000-01-01"),
      address: "서울시 강남구",
      phoneNumber: "010-1234-5678",
    },
  });

  const store = await prisma.practiceStore.create({
    data: { name: "테스트 맛집" },
  });

  await prisma.userStoreReview.createMany({
    data: [
      { storeId: store.id, userId: user.id, content: "너무 맛있어요!" },
      { storeId: store.id, userId: user.id, content: "분위기가 좋아요" },
      { storeId: store.id, userId: user.id, content: "가성비 최고" },
      { storeId: store.id, userId: user.id, content: "또 오고 싶어요" },
      { storeId: store.id, userId: user.id, content: "친절해요" },
      { storeId: store.id, userId: user.id, content: "웨이팅 있어요" },
      { storeId: store.id, userId: user.id, content: "양이 많아요" },
    ],
  });

  console.log(`유저 ID: ${user.id}, 가게 ID: ${store.id} 로 리뷰 7개 생성 완료`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
