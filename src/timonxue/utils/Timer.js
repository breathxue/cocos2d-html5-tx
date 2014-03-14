var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
///<reference path='../ImportTS.d.ts' />
/**
* Created with JetBrains WebStorm.
* User: admin
* Date: 13-9-27
* Time: 下午3:47
* To change this template use File | Settings | File Templates.
*/
var tx;
(function (tx) {
    /**
    * TODO:类功能摘要
    * @author TimonXue
    * @Create Date 2013-4-7
    */
    var Timer = (function (_super) {
        __extends(Timer, _super);
        function Timer(s, repeatCount) {
            if (typeof repeatCount === "undefined") { repeatCount = 0; }
            var _this = this;
            _super.call(this);
            this._isRunning = false;
            this._repeatCount = 0;
            this._count = 0;
            this._isRunning = true;
            this._repeatCount = repeatCount;
            this._id = setInterval(function () {
                _this.run();
            }, s);
        }
        Timer.prototype.destroy = function () {
            clearInterval(this._id);
            _super.prototype.destroy.call(this);
        };

        Timer.prototype.run = function () {
            //            trace("this._isRunning", this._isRunning);
            if (this._isRunning) {
                this.dispatchEvent(new tx.Event(Timer.TIMER));
                this._count++;
                if (this._count >= this._repeatCount) {
                    if (this.$_eventHandlers) {
                        this.dispatchEvent(new tx.Event(Timer.TIMER_COMPLETE));
                        this.destroy();
                    }
                }
            }
        };

        Timer.prototype.start = function () {
            this._isRunning = true;
        };

        Timer.prototype.stop = function () {
            this._isRunning = false;
        };

        Timer.prototype.isRunning = function () {
            return this._isRunning;
        };
        Timer.TIMER = "TIMER";
        Timer.TIMER_COMPLETE = "TIMER_COMPLETE";
        return Timer;
    })(tx.EventDispatcher);
    tx.Timer = Timer;
    tx._enter;

    function enterFrame() {
        if (tx._enter == null) {
            tx._enter = new Timer(cc.Director.getInstance().getAnimationInterval() * 1000, Number.MAX_VALUE);
            tx._enter.run = function () {
                if (tx._enter.isRunning()) {
                    tx._enter.dispatchEvent(new tx.Event(tx.Event.ENTER_FRAME));
                }
            };
            tx._enter.start();
        }
        return tx._enter;
    }
    tx.enterFrame = enterFrame;
})(tx || (tx = {}));
//# sourceMappingURL=Timer.js.map
