import { prisma } from "../../../db.config.js";
import { UserMissionStatus } from "../../../generated/prisma/enums.js";

export const addUserMission = async (data: { userId: number; missionId: number }): Promise<number> => {
  const result = await prisma.userMission.create({
    data: {
      userId: BigInt(data.userId),
      missionId: BigInt(data.missionId),
      userMissionStatus: "ACTIVE",
    },
  });
  return Number(result.userMissionId);
};

export const getUserMission = async (userMissionId: number) => {
  return await prisma.userMission.findUnique({ where: { userMissionId: BigInt(userMissionId) } });
};

export const getMissionById = async (missionId: number) => {
  return await prisma.mission.findUnique({ where: { missionId: BigInt(missionId) } });
};

export const getUserById = async (userId: number) => {
  return await prisma.user.findUnique({ where: { userId: BigInt(userId) } });
};

export const getUserMissionById = async (userMisssionId : number) => {
  return await prisma.userMission.findUnique({where : {userMissionId : BigInt(userMisssionId)}})
}

export const updateUserMissionStatus = async (userMissionId: number) => {
  return await prisma.userMission.update({
    where: { userMissionId: BigInt(userMissionId) },
    data: { userMissionStatus: UserMissionStatus.COMPLETED },
  });
};
export const getRestaurantMissionbyUserId = async (userId:number)=>{
  return await prisma.userMission.findMany({
    where : {userId:BigInt(userId)},
    include : {
      mission : {
        include : {
          missionRestaurant : {
            include : {
              restaurant: true
            }
          }
        }
      }
    }
  })
}

export const getActiveUserMissions = async (userId : number ) =>{
  return await prisma.userMission.findMany({
    where : {userId : BigInt(userId) , userMissionStatus : 'ACTIVE' },
    include : {mission : true}   
  })
}




