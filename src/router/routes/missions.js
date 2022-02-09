export default [
  {
    path: '/mission/list',
    name: 'mission-list',
    component: () => import('@/views/missions/List.vue'),
  },
  {
    path: '/mission/add',
    name: 'add-mission',
    component: () => import('@/views/missions/AddMission.vue'),
  },
  {
    path: '/mission/:missionId',
    name: 'mission-details',
    component: () => import('@/views/missions/MissionDetails.vue'),
  },
]
