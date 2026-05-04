import { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool } from "../../db.config.js";
import { prisma } from "../../db.config.js";

// 1. User 데이터 삽입
// User 데이터 삽입
export const addUser = async (data: any) => {
    // 1. 이미 존재하는 이메일인지 확인
    const user = await prisma.user.findFirst({ where: { email: data.email } });

    if (user) {
        return null;
    }

    // 2. 새로운 유저 생성
    const created = await prisma.user.create({
        data: {
            email: data.email,
            name: data.name,
            gender: data.gender,
            birth: data.birth,
            address: data.address,
            phone: data.phone,
        }
    });

    return created.id;
};


export const getUser = async (userId: number) => {
    return await prisma.user.findFirstOrThrow({ where: { id: userId } });
};

// 음식 선호 카테고리 매핑
export const setPreference = async (userId: bigint, categoryId: number) => {
    await prisma.userPreference.create({
        data: {
            userId: userId,
            categoryId: categoryId,
        },
    });
};

// 사용자 선호 카테고리 반환 (JOIN)
export const getUserPreferencesByUserId = async (userId: bigint) => {
    return await prisma.userPreference.findMany({
        where: { userId: userId },
        include: {
            category: true, // 💡 핵심: JOIN 대신 include를 써서 연관 데이터를 가져옵니다!
        },
        orderBy: { categoryId: "asc" },
    });
};

export const findMission = async (missionId: number) => {
    const [rows]: any = await pool.query(
        "SELECT * FROM Mission WHERE mission_id = ?",
        [missionId]
    );
    return rows[0];
};

export const findOngoingMission = async (userId: number, missionId: number) => {
    const [rows]: any = await pool.query(
        `SELECT * FROM Complete 
     WHERE user_id = ? AND mission_id = ? AND is_completed = false`,
        [userId, missionId]
    );
    return rows[0];
};

export const insertChallenge = async (
    userId: number,
    missionId: number,
    restaurantId: number
) => {
    await pool.query(
        `INSERT INTO Complete 
     (user_id, mission_id, restaurant_id, is_completed)
     VALUES (?, ?, ?, false)`,
        [userId, missionId, restaurantId]
    );
};