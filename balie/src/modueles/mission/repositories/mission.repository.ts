import { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool } from "../../../db.config.js";
import { MissionCreate, MissionRestaurantCreate } from "../dtos/mission.dto.js";

export const addMission = async (data: MissionCreate): Promise<number> => {
    const conn = await pool.getConnection();
    try {
        const [result] = await pool.query<ResultSetHeader>(
            `INSERT INTO MISSION (point, title, content, type, is_deleted) VALUES (?, ?, ?, ?, ?);`,
            [data.point, data.title, data.content, data.type, 0]
        );
        return result.insertId;
    } catch (err) {
        throw new Error(`오류가 발생했어요: ${err}`);
    } finally {
        conn.release();
    }
};

export const addMissionRestaurant = async (data: MissionRestaurantCreate & { missionId: number }): Promise<number> => {
    const conn = await pool.getConnection();
    try {
        const [result] = await pool.query<ResultSetHeader>(
            `INSERT INTO MISSION_RESTAURANT (mission_id, restaurant_id) VALUES (?, ?);`,
            [data.missionId, data.restaurantId]
        );
        return result.insertId;
    } catch (err) {
        throw new Error(`오류가 발생했어요: ${err}`);
    } finally {
        conn.release();
    }
};

export const getMission = async (missionId: number): Promise<any | null> => {
    const conn = await pool.getConnection();
    try {
        const [mission] = await pool.query<RowDataPacket[]>(
            `SELECT * FROM MISSION WHERE mission_id = ?;`,
            [missionId]
        );
        if (mission.length === 0) return null;
        return mission[0];
    } catch (err) {
        throw new Error(`오류가 발생했어요: ${err}`);
    } finally {
        conn.release();
    }
};

export const getMissionRestaurant = async (missionId: number): Promise<any | null> => {
    const conn = await pool.getConnection();
    try {
        const [missionRestaurant] = await pool.query<RowDataPacket[]>(
            `SELECT * FROM MISSION_RESTAURANT WHERE mission_id = ?;`,
            [missionId]
        );
        if (missionRestaurant.length === 0) return null;
        return missionRestaurant[0];
    } catch (err) {
        throw new Error(`오류가 발생했어요: ${err}`);
    } finally {
        conn.release();
    }
};
