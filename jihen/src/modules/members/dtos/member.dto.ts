export interface OngoingMissionItem {
  membermissionId: number;
  status: number;
  mission: {
    missionId: number;
    title: string;
    store: { storeId: number; name: string };
  };
}