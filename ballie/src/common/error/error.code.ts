/**
 * 에러 코드 규칙
 *
 * prefix 규칙:
 *   S   - Server/공통 (인증, 서버 오류 등)
 *   U   - User 도메인
 *   R   - Restaurant 도메인
 *   M   - Mission 도메인
 *   UM  - UserMission 도메인
 *   RV  - Review 도메인
 *   A   - Auth 도메인 (토큰)
 *
 * 번호 규칙: 001부터 순차 부여
 */
export const ErrorCode = {
  // S: Server / 공통
  INTERNAL_SERVER_ERROR: "S001",
  UNAUTHORIZED: "S002",
  FORBIDDEN: "S003",
  BAD_REQUEST: "S004",
  NOT_FOUND: "S005",
  CONFLICT: "S006",

  // A: Auth
  INVALID_TOKEN: "A001",
  EXPIRED_TOKEN: "A002",

  // U: User
  USER_NOT_FOUND: "U001",
  DUPLICATE_USER_EMAIL: "U002",
  INVALID_CATEGORY: "U003",

  // R: Restaurant
  RESTAURANT_NOT_FOUND: "R001",
  RESTAURANT_CREATE_FAILED: "R002",
  REGION_NOT_FOUND: "R003",
  FOOD_CATEGORY_NOT_FOUND: "R004",

  // M: Mission
  MISSION_NOT_FOUND: "M001",
  MISSION_CREATE_FAILED: "M002",

  // UM: UserMission
  USER_MISSION_NOT_FOUND: "UM001",
  USER_MISSION_INVALID_STATUS: "UM002",

  // RV: Review
  REVIEW_CREATE_FAILED: "RV001",
} as const;

export type ErrorCodeType = typeof ErrorCode[keyof typeof ErrorCode];
