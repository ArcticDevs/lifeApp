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
]
