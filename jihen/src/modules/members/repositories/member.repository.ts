import { prisma } from "../../../db.config";
import { MissionStatus } from "../../../generated/prisma/enums";

interface Store {
  storeId: bigint;
  name: string;
}

interface Mission {
  missionId: bigint;
  title: string;
  store: Store;
}

interface OngoingMission {
  memberMissionId: bigint;
  status: MissionStatus;
  mission: Mission;
}

export const getOngoingMissionsByMemberId = async (memberId: number): Promise<OngoingMission[]> => {
  return await prisma.memberMission.findMany({
    where: { memberId: BigInt(memberId), status: MissionStatus.IN_PROGRESS },
    include: {
      mission: {
        include: { store: true },
      },
    },
    orderBy: { createdAt: "desc" },
  }) as OngoingMission[];
};
