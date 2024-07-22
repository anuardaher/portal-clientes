const MainRoutes = {
  path: '/main',
  meta: {
    requiresAuth: true
  },
  redirect: '/main/dashboard/default',
  component: () => import('@/layouts/full/FullLayout.vue'),
  children: [
    {
      name: 'LandingPage',
      path: '/',
      component: () => import('@/views/dashboards/default/DefaultDashboard.vue')
    },
    {
      name: 'Default',
      path: '/dashboard/default',
      component: () => import('@/views/dashboards/default/DefaultDashboard.vue')
    },
    {
      name: 'Clientes',
      path: '/clientes',
      component: () => import('@/views/StarterPage.vue')
    },
    {
      name: 'Visitas',
      path: '/visitas',
      component: () => import('@/views/StarterPage.vue')
    },
    {
      name: 'Ocorrências',
      path: '/ocorrencias',
      component: () => import('@/views/StarterPage.vue')
    },
    {
      name: 'Pontos Cadastrados',
      path: '/pontos-cadastrados',
      component: () => import('@/views/StarterPage.vue')
    },
  ]
};

export default MainRoutes;
