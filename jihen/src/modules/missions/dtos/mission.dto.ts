export interface AddMissionRequest {
  title: string;
  description?: string;
  rewardPoint: number;
  startAt?: string;
  endAt?: string;
}
export interface AddMissionResponse { missionId: number; }

export interface ChallengeMissionRequest {}
export interface ChallengeMissionResponse { challengeId: number; }

export interface MissionItem {
  missionId: number;
  title: string;
  description: string | null;
  rewardPoint: number;
  startAt: Date | null;
  endAt: Date | null;
}
