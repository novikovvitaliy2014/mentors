
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'rules', component: () => import('pages/Rules.vue') },
      { path: 'contacts', component: () => import('pages/Contacts.vue') },
      // { path: 'userData', component: () => import('pages/UserData.vue') },
      // { path: 'findPlayers', component: () => import('pages/FindPlayers.vue') },
      { path: 'terms', component: () => import('pages/Terms.vue') }
    ]
  }
  // { path: '/rules', component: () => import('pages/Rules.vue') }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
