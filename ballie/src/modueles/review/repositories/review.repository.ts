import { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool } from "../../../db.config.js";
import { ReviewCreateRequest } from "../dtos/review.dots.js";

export const addReview = async (data: ReviewCreateRequest): Promise<number> => {
    const conn = await pool.getConnection();
    try {
        const [result] = await pool.query<ResultSetHeader>(
            `INSERT INTO REVIEW (user_id, restaurant_id, review_title, review_content, score) VALUES (?, ?, ?, ?, ?);`,
            [data.userId, data.restaurantId, data.review_title, data.review_content, data.score]
        );
        return result.insertId;
    } catch (err) {
        throw new Error(`오류가 발생했어요: ${err}`);
    } finally {
        conn.release();
    }
};

export const getReview = async (reviewId: number): Promise<any | null> => {
    const conn = await pool.getConnection();
    try {
        const [review] = await pool.query<RowDataPacket[]>(
            `SELECT review_id AS id, review_title AS title, review_content AS content, score FROM REVIEW WHERE review_id = ?;`,
            [reviewId]
        );
        if (review.length === 0) return null;
        return review[0];
    } catch (err) {
        throw new Error(`오류가 발생했어요: ${err}`);
    } finally {
        conn.release();
    }
};

export const getUserById = async (userId: number): Promise<any | null> => {
    const conn = await pool.getConnection();
    try {
        const [user] = await pool.query<RowDataPacket[]>(
            `SELECT user_id, user_name AS username FROM users WHERE user_id = ?;`,
            [userId]
        );
        if (user.length === 0) return null;
        return user[0];
    } catch (err) {
        throw new Error(`오류가 발생했어요: ${err}`);
    } finally {
        conn.release();
    }
};

export const getRestaurantById = async (restaurantId: number): Promise<any | null> => {
    const conn = await pool.getConnection();
    try {
        const [restaurant] = await pool.query<RowDataPacket[]>(
            `SELECT restaurant_id, restaurant_name AS name, restaurant_address AS address FROM RESTAURANT WHERE restaurant_id = ?;`,
            [restaurantId]
        );
        if (restaurant.length === 0) return null;
        return restaurant[0];
    } catch (err) {
        throw new Error(`오류가 발생했어요: ${err}`);
    } finally {
        conn.release();
    }
};
