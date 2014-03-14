///<reference path='../ImportTS.d.ts' />
module tx{
    /**
     * TODO:类功能摘要
     * @author TimonXue
     * @Create Date 2013-4-7
     */
    export class RailMap implements IDestroyable {
        /**
         * 是否DEBUG模式
         */
        public static __debug__:Boolean = false;

        public _railArr:AbstractRail[];
        public isCircular:Boolean;

        public totalDistance:number;
        private _debugMc:cc.Node;

        constructor(debugPmc:cc.Node = null) {
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
        public destroy():void {
            for (var i:number = 0; i < this._railArr.length; i++) {
                (this._railArr[i]).destroy();
            }
            this._railArr = null;
            if (this._debugMc) {
                this._debugMc.getParent().removeChild(this._debugMc);
                this._debugMc = null;
            }
        }


        /**
         * 添加车子,车子添加后才能开
         */
        public addCar(car:Car):void {
            car.railMap = this;
            if (RailMap.__debug__ && this._debugMc) {
                car.setDebugMc(this._debugMc);
            }
        }

        public setRails(railArr:AbstractRail[]):void {
            this.totalDistance = 0;
            this._railArr = [];
            for (var j:number = 0; j < railArr.length; j++) {
                var tempRail:AbstractRail = railArr[j];
                if (tempRail) {
                    this._railArr.push(tempRail);
                    if (RailMap.__debug__ && this._debugMc) {
                        tempRail.setDebugMc(this._debugMc);
                    }
//                    trace("ffffffffff",tempRail.getDistance());
                    this.totalDistance += tempRail.getDistance();
                }
            }
        }

        public getRails():AbstractRail[] {
            return this._railArr;
        }

        /**
         * 获得车厢当前的位置
         */
            getPoint(car:Car):mVector {
            if (!this._railArr || this._railArr.length == 0) {
                return new mVector();
            }
            if (car.isDerailed() < 0) {
                return (this._railArr[0]).getPointByDistance(0);//第一个轨道的最前
            }
            if (car.isDerailed() > 0) {
                //最后个轨道的最后
                return (this._railArr[this._railArr.length - 1]).getPointByDistance((this._railArr[this._railArr.length - 1]).getDistance());
            }
            //获得绝对距离
            var carDistance:number = car.distance % this.totalDistance;
            //循环负值的情况
            carDistance = carDistance >= 0 ? carDistance : this.totalDistance + carDistance;

            var tempDistance:number = 0;
            for (var i:number = 0; i < this._railArr.length; i++) {
                var tempRail:AbstractRail = this._railArr[i];
                tempDistance += tempRail.getDistance();
                if (tempDistance > carDistance) {
                    return tempRail.getPointByDistance(carDistance - (tempDistance - tempRail.getDistance()));
                }
            }
            return new mVector();
        }

        /**
         * 获得车厢当前的角度
         */
            getRotation(car:Car):number {
            if (!this._railArr || this._railArr.length == 0) {
                return 0;
            }
            if (car.isDerailed() < 0) {
                return (this._railArr[0]).getRotationByDistance(0);//第一个轨道的最前
            }
            if (car.isDerailed() > 0) {
                //最后个轨道的最后
                return (this._railArr[this._railArr.length - 1]).getRotationByDistance((this._railArr[this._railArr.length - 1]).getDistance());
            }

            //获得绝对距离
            var carDistance:number = car.distance % this.totalDistance;
            //循环负值的情况
            carDistance = carDistance >= 0 ? carDistance : this.totalDistance + carDistance;

            var tempDistance:number = 0;
            for (var i:number = 0; i < this._railArr.length; i++) {
                var tempRail:AbstractRail = this._railArr[i];
                tempDistance += tempRail.getDistance();
                if (tempDistance > carDistance) {
                    return tempRail.getRotationByDistance(carDistance - (tempDistance - tempRail.getDistance()));
                }
            }
            return 0;
        }
    }
}
