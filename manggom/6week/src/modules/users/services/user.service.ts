// import { UserSignUpRequest } from "../dto/user.dto.js"; //인터페이스 가져오기 
// import { responseFromUser } from "../dto/user.dto.js";
// import {
//   addUser,
//   getUser,
//   getUserPreferencesByUserId,
//   setPreference,
// } from "../repositories/user.repository.js";


// export const userSignUp = async (data: UserSignUpRequest) => {
//   // 1. 유저 추가 (기존에 흩어져 있던 addUser 로직을 하나로 합쳤습니다)
//   const joinUserId = await addUser({
//     email: data.email,
//     name: data.name,
//     gender: data.gender,
//     birth: new Date(data.birth), 
//     address: data.address,
//     phone_num: data.phonenum,
//   });



//   // 2. 가입 실패 확인 (이메일 중복 등)
//   if (joinUserId === null) {
//     throw new Error("이미 존재하는 이메일입니다.");
//   }

//   // 3. 디버깅 로그 (터미널에서 확인용)
//   console.log("방금 생성된 ID:", joinUserId); 

//   // 4. 유저 정보 가져오기
//   const user = await getUser(joinUserId);
//   console.log("DB에서 가져온 데이터:", user); 

//   // 5. 유저 데이터가 없을 경우 방어 코드
//   if (!user) {
//     throw new Error("가입은 성공했으나 유저 정보를 불러오는데 실패했습니다.");
//   }

//   // 6. DTO를 통해 응답 반환
//   return responseFromUser(user);
// };

import { UserSignUpRequest } from "../dto/user.dto.js"; //인터페이스 가져오기 
import { responseFromUser } from "../dto/user.dto.js";
import {
  addUser,
  getUser,
  getUserPreferencesByUserId,
  setPreference,
} from "../repositories/user.repository.js";

export const userSignUp = async (data: UserSignUpRequest) => {
  const joinUserId = await addUser({
    email: data.email,
    name: data.name,
    gender: data.gender,
    birth: new Date(data.birth), // 문자열을 Date 객체로 변환해서 넘겨줍니다. 
    address: data.address,
    detailAddress: data.detailAddress,
    phoneNumber: data.phoneNumber,
  });

  if (joinUserId === null) {
    throw new Error("이미 존재하는 이메일입니다.");
  }

  for (const preference of data.preferences) {
    await setPreference(joinUserId, preference);
  }

  const user = await getUser(joinUserId);
  const preferences = await getUserPreferencesByUserId(joinUserId);

  return responseFromUser({ user, preferences });
};
