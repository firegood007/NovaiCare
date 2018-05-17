//set session
export function setSen(k, val) {
  if (typeof val == 'string') {
    sessionStorage.setItem(k, val);
    return val;
  }
  sessionStorage.setItem(k, JSON.stringify(val));
  return val;
}

//get session
export function getSen(k) {
  let val = sessionStorage.getItem(k);

  try {
    if (typeof JSON.parse(val) != 'number') {
      val = JSON.parse(val);
    }
  } catch (e) {}
  return val;
}

//set local
export function setLoc(k, val) {
  if (typeof val == 'string') {
    localStorage.setItem(k, val);
    return val;
  }
  localStorage.setItem(k, JSON.stringify(val));
  return val;
}

//get local
export function getLoc(k) {
  let val = localStorage.getItem(k);

  try {
    if (typeof JSON.parse(val) != 'number') {
      val = JSON.parse(val);
    }
  } catch (e) {}
  return val;
}

//clear session
export function clearSessionKey(k) {
  if (k) {
    sessionStorage.removeItem(k);
  } else {
    sessionStorage.clear();
  }
}

//clear local
export function clearLocalKey(k) {
  if (k) {
    localStorage.removeItem(k);
  } else {
    localStorage.clear();
  }
}

//获取屏幕宽度高度
export function getClient() {
  let clientWidth = document.documentElement.clientWidth;
  let clientHeight = document.documentElement.clientHeight;

  return {
    clientWidth,
    clientHeight
  };
}

export function serialize(data) {
  if (data != null && data != '') {
    try {
      return JSON.parse(JSON.stringify(data));
    } catch (e) {
      if (data instanceof Array) {
        return [];
      }
      return {};
    }
  }
  return data;
}

Array.prototype.max = function(prop) {
  let result;
  if (!this.length) {
    return null;
  }

  if (prop.length) {
    result = this[0];
    this.forEach(item => {
      if (item[prop] > result[prop]) {
        result = item;
      }
    });
  } else {
    result = this[0];
    this.forEach(item => {
      if (item > result) {
        result = item;
      }
    });
  }
  return result;
};

Array.prototype.min = function(prop) {
  let result;
  if (!this.length) {
    return null;
  }

  if (prop.length) {
    result = this[0];
    this.forEach(item => {
      if (item[prop] < result[prop]) {
        result = item;
      }
    });
  } else {
    result = this[0];
    this.forEach(item => {
      if (item < result) {
        result = item;
      }
    });
  }
  return result;
};

//重写findIndex(某些手机不支持findIndex)
Array.prototype.findIndex = function(func) {
  let result = -1;

  this.forEach((item, index) => {
    var flag = func(item);

    if (flag) {
      result = index;
    }
  });
  return result;
};
