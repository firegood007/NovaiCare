//入口文件
import FastClick from 'fastclick';
if ('addEventListener' in document) {
  document.addEventListener(
    'fastclick',
    function() {
      FastClick.attach(document.body);
    },
    false
  );
}

import Vue from 'vue'; // 导入Vue
import VueRouter from 'vue-router'; //导入VueRouter
import touch from './utils/vue-touch';  // 导入Vue touch手势库
import VueI18n from 'vue-i18n'; // 导入国际化文件
import router from './router/'; // 导入路由
import Locales from './locale';  // 导入国际化配置语言
import { setLoc, getLoc } from './utils'; // 导入 locastorage sessionStorage 方法
import MintUI from 'mint-ui'; // 导入mint-ui
import components from './components/index.js'; // 加载公共组件
import App from './App'; // 主入口

//全局引入第三方插件
Vue.use(MintUI);
Vue.use(VueRouter);
Vue.use(VueI18n);
console.log(touch);
Vue.directive('touch', touch);

let locale = getLoc('lang') == null ? 'zh' : getLoc('lang');
if (window.Android) {
  locale = window.Android.getLanguage() === 0 ? 'en' : 'zh';
}
setLoc('lang', locale);
const messages = Object.create(null);
Object.keys(Locales).forEach(local => {
  messages[local] = {
    ...Locales[local]
  };
});
const i18n = new VueI18n({
  locale,
  messages
});

Vue.prototype.$indicator = MintUI.Indicator; // 加载 样式
Vue.prototype.$msgbox = MintUI.MessageBox;
Vue.prototype.$alert = MintUI.MessageBox.alert; // 提示信息
Vue.prototype.$confirm = MintUI.MessageBox.confirm; // 带有确定和取消的提示信息
Vue.prototype.$prompt = MintUI.MessageBox.prompt;  // 提示框
Vue.prototype.$msgClose = MintUI.MessageBox.close;

Vue.config.productionTip = false; // vue 在生产环境下的提示信息 关闭

Object.keys(components).forEach(key => {
  var name = key.replace(/(\w)/, v => v.toUpperCase()); //首字母大写
  Vue.component(`vx${name}`, components[key]);
});

window.v = new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount('#app');
