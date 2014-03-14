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
    var CurveRail = (function (_super) {
        __extends(CurveRail, _super);
        function CurveRail(p0x, p0y, p1x, p1y, p2x, p2y) {
            _super.call(this);
            this.p0 = new tx.mVector(p0x, p0y);
            this.p1 = new tx.mVector(p1x, p1y);
            this.p2 = new tx.mVector(p2x, p2y);

            this.block();
        }
        CurveRail.prototype.block = function () {
            this.blockLengthArr = new Array();

            //总长一定小于p0到p1到p2的长度
            //1除以分段数(总长除以/每段大小)
            this._partT = 1 / ((this.p1.minus(this.p0).getLength() + this.p2.minus(this.p1).getLength()) / CurveRail.MINI_BLOCK);

            this._distance = 0;

            var tempLastPoint = new tx.mVector(this.p0.x, this.p0.y);
            var tempPoint = new tx.mVector(0, 0);
            for (var tempT = this._partT; tempT < 1; tempT += this._partT) {
                tempPoint.x = this.p0.x * Math.pow(1 - tempT, 2) + this.p1.x * 2 * tempT * (1 - tempT) + this.p2.x * tempT * tempT;
                tempPoint.y = this.p0.y * Math.pow(1 - tempT, 2) + this.p1.y * 2 * tempT * (1 - tempT) + this.p2.y * tempT * tempT;
                this.blockLengthArr.push(tempPoint.minus(tempLastPoint).getLength());
                this._distance += tempPoint.minus(tempLastPoint).getLength();
                tempLastPoint = tempPoint.clone();
            }
            //trace(blockLengthArr.length);
        };

        CurveRail.prototype.destroy = function () {
            if (this._tdebugMc) {
                this._tdebugMc.getParent().removeChild(this._tdebugMc);
                this._tdebugMc = null;
            }
            this.p0 = null;
            this.p1 = null;
            this.p2 = null;
            this.blockLengthArr = null;
        };

        CurveRail.prototype.getDistance = function () {
            return this._distance;
        };

        CurveRail.prototype.getPointByDistance = function (distance) {
            if (distance >= this.getDistance()) {
                return this.p2;
            }

            if (distance <= 0) {
                return this.p0;
            }
            var tempLength = 0;
            for (var i = 0; i < this.blockLengthArr.length; i++) {
                tempLength += this.blockLengthArr[i]; //累计长度
                if (tempLength >= distance) {
                    var tempT = i * this._partT;
                    var tempPoint = new tx.mVector(0, 0);
                    tempPoint.x = this.p0.x * Math.pow(1 - tempT, 2) + this.p1.x * 2 * tempT * (1 - tempT) + this.p2.x * tempT * tempT;
                    tempPoint.y = this.p0.y * Math.pow(1 - tempT, 2) + this.p1.y * 2 * tempT * (1 - tempT) + this.p2.y * tempT * tempT;
                    return tempPoint;
                }
            }

            return this.p2;
        };

        CurveRail.prototype.getRotationByDistance = function (distance) {
            if (distance >= this.getDistance()) {
                return this.p2.minus(this.p1).getAngle();
            }

            if (distance <= 0) {
                return this.p1.minus(this.p0).getAngle();
            }

            var tempLength = 0;
            for (var i = 0; i < this.blockLengthArr.length; i++) {
                tempLength += this.blockLengthArr[i]; //累计长度
                if (tempLength >= distance) {
                    var tempT = i * this._partT;
                    var tempPointP0_P1 = new tx.mVector(0, 0);
                    var tempPointP1_P2 = new tx.mVector(0, 0);
                    tempPointP0_P1.x = this.p0.x + (this.p1.x - this.p0.x) * tempT;
                    tempPointP0_P1.y = this.p0.y + (this.p1.y - this.p0.y) * tempT;
                    tempPointP1_P2.x = this.p1.x + (this.p2.x - this.p1.x) * tempT;
                    tempPointP1_P2.y = this.p1.y + (this.p2.y - this.p1.y) * tempT;
                    return tempPointP1_P2.minus(tempPointP0_P1).getAngle();
                }
            }

            return this.p2.minus(this.p1).getAngle();
        };

        CurveRail.prototype.startPoint = function () {
            return this.p0;
        };

        CurveRail.prototype.endPoint = function () {
            return this.p2;
        };

        CurveRail.prototype.setDebugMc = function (pmc) {
            this._tdebugMc = new cc.Node();
            pmc.addChild(this._tdebugMc);
            //            this._tdebugMc.graphics.lineStyle(1, 0x000099);
            //            this._tdebugMc.graphics.moveTo(this.p0.x, this.p0.y);
            //            this._tdebugMc.graphics.curveTo(this.p1.x, this.p1.y, this.p2.x, this.p2.y);
        };
        CurveRail.MINI_BLOCK = 1;
        return CurveRail;
    })(tx.AbstractRail);
    tx.CurveRail = CurveRail;
})(tx || (tx = {}));
//# sourceMappingURL=CurveRail.js.map
