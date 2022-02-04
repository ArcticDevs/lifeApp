export default [
  {
    title: 'Movies',
    route: 'movies-list',
    icon: 'MonitorIcon',
  },
  {
    title: 'Missions',
    route: 'mission-list',
    icon: 'CpuIcon',
  },
  {
    title: 'Students',
    icon: 'UserIcon',
    children: [
      {
        title: 'List',
        route: 'apps-users-list',
      },
      {
        title: 'View',
        route: { name: 'apps-users-view', params: { id: 21 } },
      },
      {
        title: 'Edit',
        route: { name: 'apps-users-edit', params: { id: 21 } },
      },
    ],
  },
]
