import axios from 'axios';
import { Indicator, Toast } from 'mint-ui';
import { getLoc } from '../utils';
import api from './config';
let Loading = true;

////添加请求拦截器
axios.interceptors.request.use(
  config => {
    if (Loading) {
      Loading = false;
      Indicator.open({
        text: 'Loading...',
        spinnerType: 'triple-bounce'
      });
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

//添加响应拦截
axios.interceptors.response.use(
  response => {
    Loading = true;
    Indicator.close();
    return response;
  },
  error => {
    Loading = true;
    Indicator.close();
    return Promise.resolve(error.response);
  }
);

function checkStatus(response) {
  if (response && response.status === 200) {
    return response.data;
  }
  let locale = getLoc('lang') == null ? 'zh' : getLoc('lang');
  return {
    status: 501,
    msg: locale == 'zh' ? '网络异常' : 'Network exception'
  };
}

function checkCode(res) {
  if (res.status === 501) {
    Toast(res.msg);
  }

  if (res.status === 10000001) {
    let locale = getLoc('lang') == null ? 'zh' : getLoc('lang');
    Toast(locale == 'zh' ? '服务器异常' : 'Server exception');
  }
  return res;
}

export default {
  post(url, data) {
    if (url.type) {
      return this.get(url, data);
    } else {
      return axios({
        method: 'post',
        baseURL: process.env.NODE_ENV === 'development' ? '' : 'http://' + IP + ':5000',
        url: url.url,
        data: JSON.stringify(data),
        // timeout: 5000,
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Content-Type': 'application/json; charset=UTF-8'
        }
      })
        .then(response => {
          return checkStatus(response);
        })
        .then(res => {
          return checkCode(res);
        });
    }
  },
  get(url, params) {
    console.log(url);
    if (url.type) {
      return new Promise((resolve, reject) => {
        return resolve(api[url.url]);
      });
    } else {
      return axios({
        method: 'get',
        baseURL: process.env.NODE_ENV === 'development' ? '' : 'http://' + IP + ':5000',
        url: url.url,
        params, // get 请求时带的参数
        timeout: 10000,
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        }
      })
        .then(response => {
          return checkStatus(response);
        })
        .then(res => {
          return checkCode(res);
        });
    }
  },
  all() {
    return axios.all.call(this, arguments);
  }
};
