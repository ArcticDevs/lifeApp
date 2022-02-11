export default [
    {
      path: '/movies/list',
      name: 'movies-list',
      component: () => import('@/views/movies/List.vue'),
    },
    {
      path: '/movies/:subject',
      name: 'movies-subject',
      component: () => import('@/views/movies/Subject.vue'),
    },
    {
      path: '/movies/:subject/:level',
      name: 'movies-level',
      component: () => import('@/views/movies/Level.vue'),
    },
    {
      path: '/movies/:subject/:level/details/:topic',
      name: 'movies-level-details',
      component: () => import('@/views/movies/Details.vue'),
    },
    {
      path: '/movies/:subject/:level/details/:topic/add',
      name: 'movies-level-details-add',
      component: () => import('@/views/movies/AddDetails.vue'),
    },

  ]
  