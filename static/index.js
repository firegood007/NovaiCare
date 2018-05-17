var IP = '10.20.13.190';
function goHistory() {
  if (window.location.hash !== '#/') {
    window.history.go(-1);
  } else {
    window.Android.returnDeviceList();
  }
}
let offline = false;
window.Android = {
  getIp() {
    return '127.0.0.1';
  },
  getLanguage() {
    return 1;
  },
  setLanguage() {},
  getVersionCode() {
    return 1;
  }
};

(function() {
  if (window.Android) {
    IP = window.Android.getIp();
    if (IP === '127.0.0.1') {
      offline = true;
    }
  }
})();
