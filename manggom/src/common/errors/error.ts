import { AppError } from "./app.error.js";

export class DuplicateUserEmailError extends AppError {
  constructor(message: string, data?: unknown) {
    super({
      errorCode: "U001",
      statusCode: 409,
      message,
      data,
    });
  }
}

// 가게를 못찾는 에러 
export class storefindError extends AppError {
  constructor(message: string, data?: unknown) {
    super({
      errorCode: "S001",
      statusCode: 404, //404가 일반적으로 못찾는 경우니까 해당 경우를 이용
      message,
      data,
    });
  }
}

//미션 불러오는 에러
export class MissionUpdateError extends AppError {
  constructor(message: string, data?: unknown) {
    super({
      errorCode: "M001",
      statusCode: 404, //404가 일반적으로 못찾는 경우니까 해당 경우를 이용
      message,
      data,
    });
  }
}


//똑같은 미션이 업데이트 되는 에러
export class DuplicateMissionError extends AppError {
  constructor(message: string, data?: unknown) {
    super({
      errorCode: "M010",
      statusCode: 409, // 409는 주로 충돌임
      message,
      data,
    });
  }
}

//미션 상태가 변경되지 않는 에러
export class NotFixMissionStatusError extends AppError {
  constructor(message: string, data?: unknown) {
    super({
      errorCode: "M050",
      statusCode: 409, // 409는 주로 충돌임
      message,
      data,
    });
  }

}
  // 이미 완료된 미션 에러
 export class AlreadyCompletedMissionError extends AppError {
  constructor(message: string, data?: unknown) {
    super({ 
        errorCode: "M100", 
        statusCode: 409, 
        message, 
        data 
    });
  }
}