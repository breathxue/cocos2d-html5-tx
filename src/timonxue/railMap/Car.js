///<reference path='../ImportTS.d.ts' />
var tx;
(function (tx) {
    /**
    * TODO:类功能摘要
    * @author TimonXue
    * @Create Date 2013-4-7
    */
    var Car = (function () {
        function Car(startDistance) {
            if (typeof startDistance === "undefined") { startDistance = 0; }
            this.distance = startDistance;
        }
        Car.prototype.destroy = function () {
            if (this._tdebugMc) {
                this._tdebugMc.getParent().removeChild(this._tdebugMc);
                this._tdebugMc = null;
            }
            this.railMap = null;
        };

        /**
        * 前进
        */
        Car.prototype.forward = function (distance) {
            if (!this.railMap) {
                return;
            }
            this.distance += distance;
        };

        /**
        * 后退
        */
        Car.prototype.back = function (distance) {
            if (!this.railMap) {
                return;
            }
            this.distance -= distance;
        };

        /**
        * 车子是否出轨
        */
        Car.prototype.isDerailed = function () {
            if (!this.railMap) {
                return 1;
            }
            if (!this.railMap.isCircular) {
                if (this.distance > this.railMap.totalDistance) {
                    return 1;
                }
                if (this.distance < 0) {
                    return -1;
                }
            }

            return 0;
        };

        /**
        * debug显示车子
        */
        Car.prototype.print = function () {
            if (this._tdebugMc) {
                this._tdebugMc.setPosition(this.getX(), this.getY());
                this._tdebugMc.setRotation(this.getRotation());
            }
        };

        Car.prototype.getX = function () {
            if (this.railMap == null) {
                return 0;
            } else {
                return this.railMap.getPoint(this).x;
            }
        };

        Car.prototype.getY = function () {
            if (this.railMap == null) {
                return 0;
            } else {
                return this.railMap.getPoint(this).y;
            }
        };

        Car.prototype.getRotation = function () {
            if (this.railMap == null) {
                return 0;
            } else {
                return this.railMap.getRotation(this);
            }
        };

        Car.prototype.setDebugMc = function (pmc) {
            this._tdebugMc = new cc.Node();
            pmc.addChild(this._tdebugMc);

            //            this._tdebugMc.graphics.beginFill(0x990000);
            //            this._tdebugMc.graphics.drawRect(-3, -2, 6, 4);
            //            this._tdebugMc.graphics.endFill();
            this.print();
        };
        return Car;
    })();
    tx.Car = Car;
})(tx || (tx = {}));
//# sourceMappingURL=Car.js.map
