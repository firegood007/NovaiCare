const router = [
  /**在线模式 */
  {
    name: 'index', //首页
    path: '/',
    component: () => import('../pages/index')
  }
];

export default router;
