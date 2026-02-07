export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {name: '登录', path: '/user/login', component: './user/login'},
      {name: '注册', path: '/user/register', component: './user/register'},
    ],
  },
  {path: '/welcome', name: '欢迎', icon: 'smile', component: './Welcome'},
  {path: '/article', name: '文章', icon: 'read', component: './article', footerRender: false},
  {
    path: '/add/article',
    name: '创建文章',
    component: './article/add',
    hideInMenu: true,
    footerRender: false
  },
  {
    path: '/article/:articleId',
    name: '文章详情',
    component: './article/detail',
    hideInMenu: true,
  },
  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      {path: '/admin', redirect: '/admin/user'},
      {path: '/admin/user', name: '用户管理', component: './admin/user'},
      {path: '/admin/article', name: '文章管理', component: './admin/article'},
      {path: '/admin/articleCategory', name: '文章分类管理', component: './admin/articlecategory'},
      {path: '/admin/articleTag', name: '文章标签管理', component: './admin/articletag'},
    ],
  },
  {path: '/', redirect: '/welcome'},
  {path: '*', layout: false, component: './404'},
];
