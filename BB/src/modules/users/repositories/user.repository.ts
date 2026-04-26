import { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool } from "../../../db.config.js";

// 1. User 데이터 삽입
export const addUser = async (data: any): Promise<number | null> => {
    const conn = await pool.getConnection();

    try {
        // [confirm] 뒤에 타입을 명시해 줍니다. (조회 결과는 배열 형태예요)
        const [confirm] = await pool.query<RowDataPacket[]>(
            `SELECT EXISTS(SELECT 1 FROM user WHERE email = ?) as isExistEmail;`,
            [data.email]
        );

        // 이제 confirm[0] 뒤에 점을 찍어도 에러가 나지 않아요!
        if (confirm[0]?.isExistEmail) {
            return null;
        }

        // 삽입 결과는 ResultSetHeader 타입을 사용합니다.
        const [result] = await pool.query<ResultSetHeader>(
            `INSERT INTO user (email, name, gender, birth, address, detail_address, phone_number) VALUES (?, ?, ?, ?, ?, ?, ?);`,
            [
                data.email,
                data.name,
                data.gender,
                data.birth,
                data.address,
                data.detailAddress,
                data.phoneNumber,
            ]
        );

        return result.insertId;
    } catch (err) {
        throw new Error(`오류가 발생했어요: ${err}`);
    } finally {
        conn.release();
    }
};

// 2. 사용자 정보 얻기
export const getUser = async (userId: number): Promise<any | null> => {
    const conn = await pool.getConnection();

    try {
        const [user] = await pool.query<RowDataPacket[]>(
            `SELECT * FROM user WHERE id = ?;`,
            [userId]
        );

        if (user.length === 0) {
            return null;
        }

        return user[0]; // 배열의 첫 번째 요소(유저 정보)를 반환합니다.
    } catch (err) {
        throw new Error(`오류가 발생했어요: ${err}`);
    } finally {
        conn.release();
    }
};

// 3. 음식 선호 카테고리 매핑
export const setPreference = async (userId: number, foodCategoryId: number): Promise<void> => {
    const conn = await pool.getConnection();

    try {
        await pool.query(
            `INSERT INTO user_favor_category (food_category_id, user_id) VALUES (?, ?);`,
            [foodCategoryId, userId]
        );
    } catch (err) {
        throw new Error(`오류가 발생했어요: ${err}`);
    } finally {
        conn.release();
    }
};

// 4. 사용자 선호 카테고리 반환
export const getUserPreferencesByUserId = async (userId: number): Promise<any[]> => {
    const conn = await pool.getConnection();

    try {
        const [preferences] = await pool.query<RowDataPacket[]>(
            "SELECT ufc.id, ufc.food_category_id, ufc.user_id, fcl.name " +
            "FROM user_favor_category ufc JOIN food_category fcl on ufc.food_category_id = fcl.id " +
            "WHERE ufc.user_id = ? ORDER BY ufc.food_category_id ASC;",
            [userId]
        );

        return preferences as any[];
    } catch (err) {
        throw new Error(`오류가 발생했어요: ${err}`);
    } finally {
        conn.release();
    }
};