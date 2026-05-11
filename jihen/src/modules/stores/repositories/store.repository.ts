import { type ResultSetHeader, type RowDataPacket } from "mysql2";
import { pool } from "../../../db.config.js";
import { type AddStoreRequest, type AddReviewRequest, type AddMissionRequest } from "../dtos/store.dto.js";

export const addStore = async (data: AddStoreRequest): Promise<number> => {
  const conn = await pool.getConnection();
  try {
    const [result] = await pool.query<ResultSetHeader>(
      `INSERT INTO store (region_id, name, address, category) VALUES (?, ?, ?, ?);`,
      [data.regionId, data.name, data.address, data.category]
    );
    return result.insertId;
  } catch (err) {
    throw new Error(`오류가 발생했어요: ${err}`);
  } finally {
    conn.release();
  }
};

export const getStoreById = async (storeId: number): Promise<any | null> => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT * FROM store WHERE store_id = ?;`,
      [storeId]
    );
    return rows[0] ?? null;
  } catch (err) {
    throw new Error(`오류가 발생했어요: ${err}`);
  } finally {
    conn.release();
  }
};

export const addReview = async (storeId: number, data: AddReviewRequest): Promise<number> => {
  const conn = await pool.getConnection();
  try {
    const [result] = await pool.query<ResultSetHeader>(
      `INSERT INTO review (member_id, store_id, body, score) VALUES (?, ?, ?, ?);`,
      [data.memberId, storeId, data.body, data.score]
    );
    return result.insertId;
  } catch (err) {
    throw new Error(`오류가 발생했어요: ${err}`);
  } finally {
    conn.release();
  }
};

export const addMission = async (storeId: number, data: AddMissionRequest): Promise<number> => {
  const conn = await pool.getConnection();
  try {
    const [result] = await pool.query<ResultSetHeader>(
      `INSERT INTO mission (store_id, title, description, reward_point, start_at, end_at) VALUES (?, ?, ?, ?, ?, ?);`,
      [storeId, data.title, data.description ?? null, data.rewardPoint, data.startAt ?? null, data.endAt ?? null]
    );
    return result.insertId;
  } catch (err) {
    throw new Error(`오류가 발생했어요: ${err}`);
  } finally {
    conn.release();
  }
};

export const getMissionById = async (missionId: number): Promise<any | null> => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT * FROM mission WHERE mission_id = ?;`,
      [missionId]
    );
    return rows[0] ?? null;
  } catch (err) {
    throw new Error(`오류가 발생했어요: ${err}`);
  } finally {
    conn.release();
  }
};

export const getChallengingMission = async (memberId: number, missionId: number): Promise<any | null> => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT * FROM member_mission WHERE member_id = ? AND mission_id = ? AND status = 0;`,
      [memberId, missionId]
    );
    return rows[0] ?? null;
  } catch (err) {
    throw new Error(`오류가 발생했어요: ${err}`);
  } finally {
    conn.release();
  }
};

export const challengeMission = async (memberId: number, missionId: number): Promise<number> => {
  const conn = await pool.getConnection();
  try {
    const [result] = await pool.query<ResultSetHeader>(
      `INSERT INTO member_mission (member_id, mission_id, status) VALUES (?, ?, 0);`,
      [memberId, missionId]
    );
    return result.insertId;
  } catch (err) {
    throw new Error(`오류가 발생했어요: ${err}`);
  } finally {
    conn.release();
  }
};
