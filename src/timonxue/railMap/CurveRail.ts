///<reference path='../ImportTS.d.ts' />
module tx{
    /**
     * TODO:类功能摘要
     * @author TimonXue
     * @Create Date 2013-4-7
     */
    export class CurveRail extends AbstractRail implements IDestroyable {

        /**
         * 分段长度,做分段量长
         */
        public static MINI_BLOCK:number = 1;

        private p0:mVector;
        private p1:mVector;
        private p2:mVector;

        private _partT:number;
        private blockLengthArr:any[];
        private _distance:number;
        private _tdebugMc:cc.Node;


        constructor(p0x:number, p0y:number, p1x:number, p1y:number, p2x:number, p2y:number) {
            super();
            this.p0 = new mVector(p0x, p0y);
            this.p1 = new mVector(p1x, p1y);
            this.p2 = new mVector(p2x, p2y);

            this.block();
        }

        private block():void {
            this.blockLengthArr = new Array();
            //总长一定小于p0到p1到p2的长度
            //1除以分段数(总长除以/每段大小)
            this._partT = 1 / ((this.p1.minus(this.p0).getLength() + this.p2.minus(this.p1).getLength()) / CurveRail.MINI_BLOCK);

            this._distance = 0;

            var tempLastPoint:mVector = new mVector(this.p0.x, this.p0.y);
            var tempPoint:mVector = new mVector(0, 0);
            for (var tempT:number = this._partT; tempT < 1; tempT += this._partT) {
                tempPoint.x = this.p0.x * Math.pow(1 - tempT, 2) + this.p1.x * 2 * tempT * (1 - tempT) + this.p2.x * tempT * tempT;
                tempPoint.y = this.p0.y * Math.pow(1 - tempT, 2) + this.p1.y * 2 * tempT * (1 - tempT) + this.p2.y * tempT * tempT;
                this.blockLengthArr.push(tempPoint.minus(tempLastPoint).getLength());
                this._distance += tempPoint.minus(tempLastPoint).getLength();
                tempLastPoint = tempPoint.clone();
            }

            //trace(blockLengthArr.length);
        }

        public destroy():void {
            if (this._tdebugMc) {
                this._tdebugMc.getParent().removeChild(this._tdebugMc);
                this._tdebugMc = null;
            }
            this.p0 = null;
            this.p1 = null;
            this.p2 = null;
            this.blockLengthArr = null;
        }

        public getDistance():number {
            return this._distance;
        }

        public getPointByDistance(distance:number):mVector {
            if (distance >= this.getDistance()) {
                return this.p2;
            }

            if (distance <= 0) {
                return this.p0;
            }
            var tempLength:number = 0;
            for (var i:number = 0; i < this.blockLengthArr.length; i++) {
                tempLength += this.blockLengthArr[i];//累计长度
                if (tempLength >= distance) {
                    var tempT:number = i * this._partT;//获得T值
                    var tempPoint:mVector = new mVector(0, 0);
                    tempPoint.x = this.p0.x * Math.pow(1 - tempT, 2) + this.p1.x * 2 * tempT * (1 - tempT) + this.p2.x * tempT * tempT;
                    tempPoint.y = this.p0.y * Math.pow(1 - tempT, 2) + this.p1.y * 2 * tempT * (1 - tempT) + this.p2.y * tempT * tempT;
                    return tempPoint;
                }
            }

            return this.p2;
        }

        public getRotationByDistance(distance:number):number {
            if (distance >= this.getDistance()) {
                return this.p2.minus(this.p1).getAngle();
            }

            if (distance <= 0) {
                return this.p1.minus(this.p0).getAngle();
            }

            var tempLength:number = 0;
            for (var i:number = 0; i < this.blockLengthArr.length; i++) {
                tempLength += this.blockLengthArr[i];//累计长度
                if (tempLength >= distance) {
                    var tempT:number = i * this._partT;//获得T值
                    var tempPointP0_P1:mVector = new mVector(0, 0);
                    var tempPointP1_P2:mVector = new mVector(0, 0);
                    tempPointP0_P1.x = this.p0.x + (this.p1.x - this.p0.x) * tempT;
                    tempPointP0_P1.y = this.p0.y + (this.p1.y - this.p0.y) * tempT;
                    tempPointP1_P2.x = this.p1.x + (this.p2.x - this.p1.x) * tempT;
                    tempPointP1_P2.y = this.p1.y + (this.p2.y - this.p1.y) * tempT;
                    return tempPointP1_P2.minus(tempPointP0_P1).getAngle();
                }
            }

            return this.p2.minus(this.p1).getAngle();
        }

        public startPoint():mVector {
            return this.p0;
        }

        public endPoint():mVector {
            return this.p2;
        }

        setDebugMc(pmc:cc.Node):void {
            this._tdebugMc = new cc.Node();
            pmc.addChild(this._tdebugMc);
//            this._tdebugMc.graphics.lineStyle(1, 0x000099);
//            this._tdebugMc.graphics.moveTo(this.p0.x, this.p0.y);
//            this._tdebugMc.graphics.curveTo(this.p1.x, this.p1.y, this.p2.x, this.p2.y);
        }
    }
}
