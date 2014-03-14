///<reference path='../ImportTS.d.ts' />
var tx;
(function (tx) {
    /**
    * TODO:类功能摘要
    * @author TimonXue
    * @Create Date 2013-4-7
    */
    var CButton = (function () {
        /******************/
        function CButton(button, frameNum) {
            this._button = button;
            this._name = this._button.getName();

            //            this._button.buttonMode = true;
            //            this._button.mouseChildren = false;
            this._button.gotoAndStop(1);
            this._frameNum = frameNum;
            this._isEnable = true;

            /******************/
            this.iniLock();

            /******************/
            this.initEvent();
        }
        CButton.prototype.iniLock = function () {
            if (this._button.getNumFrames() <= 3) {
                return;
            }
            if (this._frameNum == 4) {
                this._isEnable = false;
                this._button.gotoAndStop(4);
                this._button.setMouseTouchEnabled(false);
            }
        };

        CButton.prototype.goLock = function () {
            if (this._button.getNumFrames() > 3) {
                this._button.gotoAndStop(4);
            }
            this._isEnable = false;
            this._button.setMouseTouchEnabled(false);
        };

        CButton.prototype.unlock = function () {
            this._isEnable = true;
            this._button.gotoAndStop(1);
            this._button.setMouseTouchEnabled(true);
        };

        CButton.prototype.buttonMc = function () {
            return this._button;
        };

        // 添加事件;
        CButton.prototype.initEvent = function (event) {
            if (typeof event === "undefined") { event = null; }
            //            this._button.removeEventListener(Event.ADDED_TO_STAGE, initEvent);
            //            this._button.addEventListener(Event.REMOVED_FROM_STAGE, removeEvent);
            this._button.addEventListener(tx.MouseTouchEvent.MOUSE_TOUCH_OVER, this.onMouseOver);
            this._button.addEventListener(tx.MouseTouchEvent.MOUSE_TOUCH_OUT, this.onMouseOut);
            this._button.addEventListener(tx.MouseTouchEvent.MOUSE_DOWN_TOUCH_BEGAN, this.onMousePress);
            this._button.addEventListener(tx.MouseTouchEvent.MOUSE_UP_TOUCH_ENDED, this.onMouseRelease);
        };

        // 删除所有事件;从舞台删除时自动调用;
        CButton.prototype.removeEvent = function (evt) {
            //            this._button.removeEventListener(Event.REMOVED_FROM_STAGE, removeEvent);
            this._button.removeEventListener(tx.MouseTouchEvent.MOUSE_TOUCH_OVER, this.onMouseOver);
            this._button.removeEventListener(tx.MouseTouchEvent.MOUSE_TOUCH_OUT, this.onMouseOut);
            this._button.removeEventListener(tx.MouseTouchEvent.MOUSE_DOWN_TOUCH_BEGAN, this.onMousePress);
            this._button.removeEventListener(tx.MouseTouchEvent.MOUSE_UP_TOUCH_ENDED, this.onMouseRelease);
            //            this._button.addEventListener(Event.ADDED_TO_STAGE, initEvent,false,0,true);
        };

        CButton.prototype.onMouseOver = function (evt) {
            if (this._isEnable) {
                //				if (evt.buttonDown) {
                this._button.gotoAndStop(3);
                //				} else {
                //                    this._button.gotoAndStop(2);
                //				}
            }
        };

        CButton.prototype.onMouseOut = function (evt) {
            if (this._isEnable) {
                this._button.gotoAndStop(1);
            }
        };

        CButton.prototype.onMousePress = function (evt) {
            if (this._isEnable) {
                if (this._button.getNumFrames() > 2) {
                    this._button.gotoAndStop(3);
                } else {
                    this._button.gotoAndStop(2);
                }
            }
        };

        CButton.prototype.onMouseRelease = function (evt) {
            if (this._isEnable) {
                this._button.gotoAndStop(2);
            }
        };

        CButton.prototype.setIsEnable = function (isEnable) {
            this._isEnable = isEnable;
        };

        CButton.prototype.name = function () {
            return this._name;
        };

        CButton.prototype.isEnable = function () {
            return this._isEnable;
        };
        return CButton;
    })();
    tx.CButton = CButton;
})(tx || (tx = {}));
//# sourceMappingURL=CButton.js.map
