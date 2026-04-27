import { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool } from "../../../db.config.js";

export const addRestaurant = async (data: any): Promise<number> => {
    const conn = await pool.getConnection();
    try {
        const [result] = await pool.query<ResultSetHeader>(
            `INSERT INTO RESTAURANT (restaurant_name, restaurant_address, region_id, food_category_id) VALUES (?, ?, ?, ?);`,
            [data.restaurantName, data.restaurantAddress, data.regionId, data.foodCategoryId]
        );
        return result.insertId;
    } catch (err) {
        throw new Error(`오류가 발생했어요: ${err}`);
    } finally {
        conn.release();
    }
};

export const getRestaurant = async (restaurantId: number): Promise<any | null> => {
    const conn = await pool.getConnection();
    try {
        const [restaurant] = await pool.query<RowDataPacket[]>(
            `SELECT * FROM RESTAURANT WHERE restaurant_id = ?;`,
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

export const getRegionById = async (regionId: number): Promise<any | null> => {
    const conn = await pool.getConnection();
    try {
        const [region] = await pool.query<RowDataPacket[]>(
            `SELECT * FROM REGION WHERE region_id = ?;`,
            [regionId]
        );
        if (region.length === 0) return null;
        return region[0];
    } catch (err) {
        throw new Error(`오류가 발생했어요: ${err}`);
    } finally {
        conn.release();
    }
};

export const getFoodCategoryById = async (foodCategoryId: number): Promise<any | null> => {
    const conn = await pool.getConnection();
    try {
        const [category] = await pool.query<RowDataPacket[]>(
            `SELECT * FROM FOOD_CATEGORY WHERE food_category_id = ?;`,
            [foodCategoryId]
        );
        if (category.length === 0) return null;
        return category[0];
    } catch (err) {
        throw new Error(`오류가 발생했어요: ${err}`);
    } finally {
        conn.release();
    }
};
