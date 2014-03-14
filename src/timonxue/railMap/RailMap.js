///<reference path='../ImportTS.d.ts' />
var tx;
(function (tx) {
    /**
    * TODO:类功能摘要
    * @author TimonXue
    * @Create Date 2013-4-7
    */
    var RailMap = (function () {
        function RailMap(debugPmc) {
            if (typeof debugPmc === "undefined") { debugPmc = null; }
            if (RailMap.__debug__) {
                this._debugMc = new cc.Node();
                debugPmc.addChild(this._debugMc);
            }
            this.isCircular = false;
            this._railArr = [];
        }
        /**
        * 删除轨道地图
        */
        RailMap.prototype.destroy = function () {
            for (var i = 0; i < this._railArr.length; i++) {
                (this._railArr[i]).destroy();
            }
            this._railArr = null;
            if (this._debugMc) {
                this._debugMc.getParent().removeChild(this._debugMc);
                this._debugMc = null;
            }
        };

        /**
        * 添加车子,车子添加后才能开
        */
        RailMap.prototype.addCar = function (car) {
            car.railMap = this;
            if (RailMap.__debug__ && this._debugMc) {
                car.setDebugMc(this._debugMc);
            }
        };

        RailMap.prototype.setRails = function (railArr) {
            this.totalDistance = 0;
            this._railArr = [];
            for (var j = 0; j < railArr.length; j++) {
                var tempRail = railArr[j];
                if (tempRail) {
                    this._railArr.push(tempRail);
                    if (RailMap.__debug__ && this._debugMc) {
                        tempRail.setDebugMc(this._debugMc);
                    }

                    //                    trace("ffffffffff",tempRail.getDistance());
                    this.totalDistance += tempRail.getDistance();
                }
            }
        };

        RailMap.prototype.getRails = function () {
            return this._railArr;
        };

        /**
        * 获得车厢当前的位置
        */
        RailMap.prototype.getPoint = function (car) {
            if (!this._railArr || this._railArr.length == 0) {
                return new tx.mVector();
            }
            if (car.isDerailed() < 0) {
                return (this._railArr[0]).getPointByDistance(0);
            }
            if (car.isDerailed() > 0) {
                //最后个轨道的最后
                return (this._railArr[this._railArr.length - 1]).getPointByDistance((this._railArr[this._railArr.length - 1]).getDistance());
            }

            //获得绝对距离
            var carDistance = car.distance % this.totalDistance;

            //循环负值的情况
            carDistance = carDistance >= 0 ? carDistance : this.totalDistance + carDistance;

            var tempDistance = 0;
            for (var i = 0; i < this._railArr.length; i++) {
                var tempRail = this._railArr[i];
                tempDistance += tempRail.getDistance();
                if (tempDistance > carDistance) {
                    return tempRail.getPointByDistance(carDistance - (tempDistance - tempRail.getDistance()));
                }
            }
            return new tx.mVector();
        };

        /**
        * 获得车厢当前的角度
        */
        RailMap.prototype.getRotation = function (car) {
            if (!this._railArr || this._railArr.length == 0) {
                return 0;
            }
            if (car.isDerailed() < 0) {
                return (this._railArr[0]).getRotationByDistance(0);
            }
            if (car.isDerailed() > 0) {
                //最后个轨道的最后
                return (this._railArr[this._railArr.length - 1]).getRotationByDistance((this._railArr[this._railArr.length - 1]).getDistance());
            }

            //获得绝对距离
            var carDistance = car.distance % this.totalDistance;

            //循环负值的情况
            carDistance = carDistance >= 0 ? carDistance : this.totalDistance + carDistance;

            var tempDistance = 0;
            for (var i = 0; i < this._railArr.length; i++) {
                var tempRail = this._railArr[i];
                tempDistance += tempRail.getDistance();
                if (tempDistance > carDistance) {
                    return tempRail.getRotationByDistance(carDistance - (tempDistance - tempRail.getDistance()));
                }
            }
            return 0;
        };
        RailMap.__debug__ = false;
        return RailMap;
    })();
    tx.RailMap = RailMap;
})(tx || (tx = {}));
//# sourceMappingURL=RailMap.js.map
