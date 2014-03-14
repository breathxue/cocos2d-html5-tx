var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
///<reference path='../ImportTS.d.ts' />
var tx;
(function (tx) {
    /**
    * TODO:类功能摘要
    * @author TimonXue
    * @Create Date 2013-4-7
    */
    var ImageViewExButton = (function (_super) {
        __extends(ImageViewExButton, _super);
        /******************/
        function ImageViewExButton(button, frameNum) {
            _super.call(this, button);
            this.gotoAndStop(1);
            this._frameNum = frameNum;
            this._isEnable = true;
            this._isNormal = true;

            /******************/
            this.iniLock();

            /******************/
            this.initEvent();
        }
        ImageViewExButton.prototype.iniLock = function () {
            if (this.getNumFrames() <= 3) {
                return;
            }
            if (this._frameNum == 4) {
                this._isEnable = false;
                this.gotoAndStop(4);
                this.widget.setTouchEnabled(false);
            }
        };

        ImageViewExButton.prototype.goLock = function () {
            //            trace("goLockgoLockgoLockgoLockgoLockgoLock");
            if (this.getNumFrames() > 3) {
                this.gotoAndStop(4);
            }
            this._isEnable = false;
            this.widget.setTouchEnabled(false);
        };

        ImageViewExButton.prototype.unlock = function () {
            //            trace("unlockunlockunlockunlockunlockunlockunlockunlockunlock");
            this._isEnable = true;
            this.gotoAndStop(1);
            this.widget.setTouchEnabled(true);
        };

        // 添加事件;
        ImageViewExButton.prototype.initEvent = function (event) {
            if (typeof event === "undefined") { event = null; }
            _super.prototype.initEvent.call(this, event);
            this.addEventListener(tx.MouseTouchEvent.MOUSE_TOUCH_OVER, this.onMouseOver, this);
            this.addEventListener(tx.MouseTouchEvent.MOUSE_TOUCH_OUT, this.onMouseOut, this);
            this.addEventListener(tx.MouseTouchEvent.MOUSE_DOWN_TOUCH_BEGAN, this.onMousePress, this);
            this.addEventListener(tx.MouseTouchEvent.MOUSE_UP_TOUCH_ENDED, this.onMouseRelease, this);
        };

        // 删除所有事件;从舞台删除时自动调用;
        ImageViewExButton.prototype.removeEvent = function (evt) {
            this.removeEventListener(tx.MouseTouchEvent.MOUSE_TOUCH_OVER, this.onMouseOver);
            this.removeEventListener(tx.MouseTouchEvent.MOUSE_TOUCH_OUT, this.onMouseOut);
            this.removeEventListener(tx.MouseTouchEvent.MOUSE_DOWN_TOUCH_BEGAN, this.onMousePress);
            this.removeEventListener(tx.MouseTouchEvent.MOUSE_UP_TOUCH_ENDED, this.onMouseRelease);
        };

        ImageViewExButton.prototype.onMouseOver = function (evt) {
            if (this._isNormal && this._isEnable) {
                //				SoundsManager.instance.playSound(SoundsConfig.BUTTON_TOUCH, 1, 0);
            }
            if (this._isEnable) {
                this.gotoAndStop(3);
            }
        };

        ImageViewExButton.prototype.onMouseOut = function (evt) {
            if (this._isEnable) {
                this.gotoAndStop(1);
            }
        };

        ImageViewExButton.prototype.onMousePress = function (evt) {
            if (this._isEnable) {
                if (this.getNumFrames() > 2) {
                    this.gotoAndStop(3);
                } else {
                    this.gotoAndStop(2);
                }
            }
            if (this._isNormal && this._isEnable) {
                //				SoundsManager.instance.playSound(SoundsConfig.BUTTON_PRESS, 1, 0);
            }
        };

        ImageViewExButton.prototype.onMouseRelease = function (evt) {
            if (this._isEnable) {
                this.gotoAndStop(2);
            }
        };

        ImageViewExButton.prototype.setIsEnable = function (isEnable) {
            this._isEnable = isEnable;
        };

        ImageViewExButton.prototype.setIsNormal = function (isNormal) {
            this._isNormal = isNormal;
        };

        ImageViewExButton.prototype.isEnable = function () {
            return this._isEnable;
        };
        return ImageViewExButton;
    })(tx.ImageViewMovieClip);
    tx.ImageViewExButton = ImageViewExButton;
})(tx || (tx = {}));
//# sourceMappingURL=ImageViewExButton.js.map
