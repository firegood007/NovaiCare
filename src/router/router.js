const router = [
  /**在线模式 */
  {
    name: 'index', //首页
    path: '/',
    component: () => import('../pages/index/index')
  }, {
    name: 'cameral', //摄像机子页
    path: '/cameral/:id',
    component: () => import('../pages/cameral/cameral')
  }
];

export default router;
