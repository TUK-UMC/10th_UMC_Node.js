export interface OngoingMissionItem {
  membermissionId: number;
  status: string;
  mission: {
    missionId: number;
    title: string;
    store: { storeId: number; name: string };
  };
}
