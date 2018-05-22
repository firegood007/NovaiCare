let apis = {
  //获取设备信息
  test: {
    url: 'test',
    type: offline
  },
  screen: {
    url: 'screen',
    type: offline
  },
  cameral: {
    url: 'cameral',
    type: offline
  }
};

// 不同环境分发
for (var k in apis) {
  if (process.env.NODE_ENV === 'development') {
    if (offline) {
      apis[k].url = apis[k].url;
    } else {
      apis[k].url = '/api/' + apis[k].url;
    }
  }
}

export default apis;
