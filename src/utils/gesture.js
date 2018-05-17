import $ from 'zepto';
import Hammer from 'hammerjs';
const space = 2.5;
var time = null;
var Nova = function() {
  this.left = 0;
  this.top = 0;
  this.baseWidth = 0;
  this.baseHeight = 0;
  this.width = 0;
  this.height = 0;
  this.scaleValX = 1; //缩放
  this.scaleValY = 1; //缩放
  this.rotateVal = 0; //缩放
  this.curStatus = 0; //记录当前手势的状态, 0:拖动, 1:缩放, 2:按压, 3 点击
  this.initialScaleX = 1;
  this.initialScaleY = 1;
  this.mc = null;
  this.min = 64;
};
Nova.prototype = {
  //初始化
  init: function($targetObj, option, callback) {
    var self = this;
    this.left = option.left;
    this.top = option.top;
    this.width = option.width;
    this.height = option.height;
    this.baseWidth = option.width;
    this.baseHeight = option.height;
    this.maxWidth = option.maxWidth;
    this.maxHeight = option.maxHeight;
    this.mc = new Hammer($targetObj[0]);
    this.lt= new Hammer($targetObj.find('.btnLt')[0]);
    this.lb = new Hammer($targetObj.find('.btnLb')[0]);
    this.rt = new Hammer($targetObj.find('.btnRt')[0]);
    this.rb = new Hammer($targetObj.find('.btnRb')[0]);
    this.mc.get('pan').set({ direction: Hammer.DIRECTION_ALL });
    this.rb.get('pan').set({ direction: Hammer.DIRECTION_ALL });
    this.lb.get('pan').set({ direction: Hammer.DIRECTION_ALL });
    this.mc.get('pinch').set({ enable: true });
    callback(self.left, self.top, self.scaleVal, self.rotateVal);
  },
  //拖动
  drag: function($targetObj, callback) {
    var self = this;
    this.mc.on('panmove', function(ev) {
      if (self.hasMask($targetObj)) {
        return;
      }
      $targetObj.trigger('tap');
      $targetObj.css("left", self.left + ev.deltaX).css("top", self.top + ev.deltaY);
      callback(false, self.left + ev.deltaX, self.top + ev.deltaY, self.width, self.height);
    });
    this.mc.on('panend', function(ev) {
      if (self.hasMask($targetObj)) {
        return;
      }
      self.left = self.left + ev.deltaX;
      self.top = self.top + ev.deltaY;
      callback($targetObj, self.left, self.top, self.width, self.height);
    });
  },
  // 点击
  tap: function($targetObj, callback) {
    var self = this;
    // 这样写是 因为组织事件的冒泡， 此事件与hold事件冲突。
    $targetObj.on('tap', function(ev) {
      ev.stopPropagation();
      if (self.hasMask($targetObj)) {
        return;
      }
      callback($targetObj, {width: self.width, height: self.height, left: self.left, top: self.top});
    });
  },
  //按压操作
  hold: function($targetObj, callback) {
    var self = this;
    this.mc.on('press', function(ev) {
      if (self.hasMask($targetObj)) {
        return;
      }
      callback($targetObj, self.left, self.top, self.width, self.height);
    });
  },
  formatScale: function(currentScaleX, currentScaleY) {
    var self = this;
    if (self.baseWidth * currentScaleX <= 64) {
      currentScaleX = 64 / self.baseWidth;
    }
    if (self.baseHeight * currentScaleY <= 64) {
      currentScaleY = 64 / self.baseHeight;
    }
    if (self.baseWidth * currentScaleX >= self.maxWidth) {
      currentScaleX = self.maxWidth / self.baseWidth;
    }
    if (self.baseHeight * currentScaleY >= self.maxHeight) {
      currentScaleY = self.maxHeight / self.baseHeight;
    }
    return {
      currentScaleX: currentScaleX,
      currentScaleY: currentScaleY
    };
  },
  //缩放
  scale: function($targetObj, callback) {
    var self = this;
    this.initialScaleX = self.scaleValX || 1;
    this.initialScaleY = self.scaleValY || 1;
    var currentScaleX, currentScaleY;
    this.mc.on('pinchstart pinchmove', function(ev) {
      if (self.hasMask($targetObj)) {
        return;
      }
      clearTimeout(time);
      self.mc.get('pan').set({ enable: false });
      ev.srcEvent.preventDefault();
      currentScaleX = ev.scale - 1;
      currentScaleY = ev.scale - 1;
      currentScaleX = self.initialScaleX + currentScaleX;
      currentScaleY = self.initialScaleY + currentScaleY;
      var newscale = self.formatScale(currentScaleX, currentScaleY);
      currentScaleX = newscale.currentScaleX;
      currentScaleY = newscale.currentScaleY;
      self.scaleValX = currentScaleX;
      self.scaleValY = currentScaleY;
      var width = self.baseWidth * currentScaleX;
      var left = (self.baseWidth * currentScaleX - self.width) / 2;
      var top = (self.baseHeight * currentScaleY - self.height) / 2;
      $targetObj.css({
        width: self.baseWidth * currentScaleX,
        height: self.baseHeight * currentScaleY,
        left: self.left - left,
        top: self.top - top
      });
    });
    this.mc.on('pinchend', function(ev) {
      if (self.hasMask($targetObj)) {
        return;
      }
      var newscale = self.formatScale(currentScaleX, currentScaleY);
      currentScaleX = newscale.currentScaleX;
      currentScaleY = newscale.currentScaleY;
      var newwidth = self.baseWidth * currentScaleX;
      var newheight = self.baseHeight * currentScaleY;
      var lefts = (newwidth - self.width) / 2;
      var tops = (newheight - self.height) / 2;
      self.left = self.left - lefts;
      self.top = self.top - tops;
      self.width = newwidth;
      self.height = newheight;
      self.initialScaleX = self.scaleValX = currentScaleX;
      self.initialScaleY = self.scaleValY = currentScaleY;
      //self.mc.get('pan').set({ enable: true });
      time = setTimeout(function() {
        self.mc.get('pan').set({ enable: true });
        callback($targetObj, {width: self.width, height: self.height, left: self.left, top: self.top});
      }, 300);
    });
  },
  formatSize: function(x, y) {
    var self = this;
    x = x >= self.min ? x : self.min;
    y = y >= self.min ? y : self.min;
    x = x >= self.maxWidth ? self.maxWidth : x;
    y = y >= self.maxHeight ? self.maxHeight: y;
    return {x: x, y: y};
  },
  // 右下操作
  rightbottom: function($targetObj, callback) {
    var self = this;
    this.rb.on('panup panstart panmove', function(ev) {
      if (self.hasMask($targetObj)) {
        return;
      }
      self.mc.get('pan').set({ enable: false });
      clearTimeout(time);
      var x = self.width + ev.deltaX;
      var y = self.height + ev.deltaY;
      var result = self.formatSize(x, y);
      $targetObj.css({
        width: result.x,
        height: result.y
      });
    });
    this.rb.on('panend', function(ev) {
      if (self.hasMask($targetObj)) {
        return;
      }
      self.width = self.width + ev.deltaX;
      self.height = self.height + ev.deltaY;
      var result = self.formatSize(self.width, self.height);
      self.width = result.x;
      self.height = result.y;
      self.initialScaleX = self.scaleValX = self.width / self.baseWidth;
      self.initialScaleY = self.scaleValY = self.height / self.baseHeight;
      time = setTimeout(function() {
        self.mc.get('pan').set({ enable: true });
      }, 300);
      callback($targetObj, {width: self.width, height: self.height, left: self.left, top: self.top});
    });
  },
  //右上操作
  rightTop: function($targetObj, callback) {
    var self = this;
    var $btnRt = $targetObj.find('.btnRt');
    this.rt.on('tap', function(ev) {
      if (self.hasMask($targetObj)) {
        return;
      }
      callback($targetObj);
    });
  },
  // 左下操作
  leftbottom: function($targetObj, callback) {
    var self = this;
    this.lb.on('panstart panmove', function(ev) {
      if (self.hasMask($targetObj)) {
        return;
      }
      clearTimeout(time);
      self.mc.get('pan').set({ enable: false });
      var x = ev.deltaX;
      var y = ev.deltaY;
      var result = self.formatSize(self.width - x, self.height + y);
      var left = result.x <= self.min ? (self.left + self.width - self.min) : (self.left + x);
      if (result.x >= self.maxWidth) {
        left = self.left + self.width - self.maxWidth;
      }
      $targetObj.css({
        width: result.x,
        height: result.y,
        left: left
      });
    });
    this.lb.on('panend', function(ev) {
      if (self.hasMask($targetObj)) {
        return;
      }
      var x = ev.deltaX;
      var y = ev.deltaY;
      var result = self.formatSize(self.width - x, self.height + y);
      var left = result.x <= self.min ? (self.left + self.width - self.min) : (self.left + x);
      if (result.x >= self.maxWidth) {
        left = self.left + self.width - self.maxWidth;
      }
      self.width = result.x;
      self.height = result.y;
      self.left = left;
      self.initialScaleX = self.scaleValX = self.width / self.baseWidth;
      self.initialScaleY = self.scaleValY = self.height / self.baseHeight;
      time = setTimeout(function() {
        self.mc.get('pan').set({ enable: true });
      }, 300);
      callback($targetObj, {width: self.width, height: self.height, left: self.left, top: self.top});
    });
  },
  // 左上操作 和 双击 操作。
  lefttop: function($targetObj, callback) {
    var self = this;
    self.mc.on('doubletap', function(ev) {
      if (self.hasMask($targetObj)) {
        return;
      }
      callback($targetObj, self.width, self.height, self.left, self.top, function(width, height, left, top) {
        self.width = width;
        self.height = height;
        self.left = left;
        self.top = top;
        self.initialScaleX = self.scaleValX = width / self.baseWidth;
        self.initialScaleY = self.scaleValY = height / self.baseHeight;
      });
    });
    self.lt.on('tap', function(ev) {
      if (self.hasMask($targetObj)) {
        return;
      }
      callback($targetObj, self.width, self.height, self.left, self.top, function(width, height, left, top) {
        self.width = width;
        self.height = height;
        self.left = left;
        self.top = top;
        self.initialScaleX = self.scaleValX = width / self.baseWidth; //缩放
        self.initialScaleY = self.scaleValY = height / self.baseHeight; //缩放
      });
    });
  },
  //判断是否是右mask 的源
  hasMask: function($targetObj) {
    return $targetObj.find('.move-lock').hasClass('active');
  }
};
export default Nova;