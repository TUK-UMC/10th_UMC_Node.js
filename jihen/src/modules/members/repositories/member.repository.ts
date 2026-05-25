import { prisma } from "../../../db.config";

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
  membermissionId: bigint;
  status: number;
  mission: Mission;
}

export const getOngoingMissionsByMemberId = async (memberId: number): Promise<OngoingMission[]> => {
  return await prisma.memberMission.findMany({
    where: { memberId: BigInt(memberId), status: 0 },
    include: {
      mission: {
        include: { store: true },
      },
    },
    orderBy: { createdAt: "desc" },
  }) as OngoingMission[];
};