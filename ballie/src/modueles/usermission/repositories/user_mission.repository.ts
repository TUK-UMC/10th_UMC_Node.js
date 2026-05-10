import { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool } from "../../../db.config.js";

export const addUserMission = async (data: { userId: number; missionId: number }): Promise<number> => {
    const conn = await pool.getConnection();
    try {
        const [result] = await pool.query<ResultSetHeader>(
            `INSERT INTO USER_MISSION (user_id, mission_id, mission_status) VALUES (?, ?, ?);`,
            [data.userId, data.missionId, "ACTIVE"]
        );
        return result.insertId;
    } catch (err) {
        throw new Error(`오류가 발생했어요: ${err}`);
    } finally {
        conn.release();
    }
};

export const getUserMission = async (userMissionId: number): Promise<any | null> => {
    const conn = await pool.getConnection();
    try {
        const [userMission] = await pool.query<RowDataPacket[]>(
            `SELECT user_mission_id, mission_status AS status FROM USER_MISSION WHERE user_mission_id = ?;`,
            [userMissionId]
        );
        if (userMission.length === 0) return null;
        return userMission[0];
    } catch (err) {
        throw new Error(`오류가 발생했어요: ${err}`);
    } finally {
        conn.release();
    }
};

export const getMissionById = async (missionId: number): Promise<any | null> => {
    const conn = await pool.getConnection();
    try {
        const [mission] = await pool.query<RowDataPacket[]>(
            `SELECT mission_id, title AS mission_title, content AS mission_content, point, type FROM MISSION WHERE mission_id = ?;`,
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

export const getUserById = async (userId: number): Promise<any | null> => {
    const conn = await pool.getConnection();
    try {
        const [user] = await pool.query<RowDataPacket[]>(
            `SELECT user_id FROM USERS WHERE user_id = ?;`,
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
