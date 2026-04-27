export interface userMissionStartRequest {
    userId:number;
    missionId:number;
    missionStatus:'ACTIVE';
}

export const responseToUserMission=({
    user,
    mission,
    userMission,
}:{
    user:any;
    mission:any;
    userMission:any;
})=>{
    return {
        user_mission_id:userMission.user_mission_id,
        user_mission_status:userMission.status,
        user_id: user.user_id,
        mission_id: mission.mission_id,
        mission_content:mission.mission_content,
        mission_title:mission.mission_title,
        mission_score:mission.point,
        mission_type:mission.type,


    }
}