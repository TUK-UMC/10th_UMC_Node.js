// repositories/review.repository.ts
import { pool } from "../../db.config.js"; // 너 DB 연결

export const findMission = async (missionId: number) => {
    const [rows]: any = await pool.query(
        "SELECT * FROM Mission WHERE mission_id = ?",
        [missionId]
    );
    return rows[0];
};

export const findReview = async (userId: number) => {
    const [rows]: any = await pool.query(
        `SELECT * FROM Review r WHERE r.user_id = ?`,
        [userId]
    );
    return rows[0];
};

export const createReview = async (
    userId: number,
    restaurantId: number,
    content: string,
    star: number
) => {
    await pool.query(
        `INSERT INTO Review (restaurant_id, user_id, content, star, created_at)
     VALUES (?, ?, ?, ?, NOW())`,
        [restaurantId, userId, content, star]
    );
};


export const createMission = async (
    restaurantId: number,
    name: string,
    price: number,
    point: number
) => {
    const [result]: any = await pool.query(
        `INSERT INTO Mission 
     (restaurant_id, name, price, point, created_at)
     VALUES (?, ?, ?, ?, NOW())`,
        [restaurantId, name, price, point]
    );

    return {
        missionId: result.insertId,
        restaurantId,
        name,
        price,
        point
    };
};

export const findRestaurant = async (restaurantId: number) => {
    const [rows]: any = await pool.query(
        "SELECT * FROM Restaurant WHERE restaurant_id = ?",
        [restaurantId]
    );
    return rows[0];
};