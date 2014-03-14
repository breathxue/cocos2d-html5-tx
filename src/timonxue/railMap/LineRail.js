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
    var LineRail = (function (_super) {
        __extends(LineRail, _super);
        function LineRail(sx, sy, ex, ey) {
            _super.call(this);
            this.sp = new tx.mVector(sx, sy);
            this.ep = new tx.mVector(ex, ey);
        }
        LineRail.prototype.destroy = function () {
            if (this._tdebugMc) {
                this._tdebugMc.getParent().removeChild(this._tdebugMc);
                this._tdebugMc = null;
            }
            this.sp = null;
            this.ep = null;
        };

        LineRail.prototype.getDistance = function () {
            return this.ep.minus(this.sp).getLength();
        };

        LineRail.prototype.getPointByDistance = function (distance) {
            if (distance >= this.getDistance()) {
                return this.ep;
            }
            if (distance <= 0) {
                return this.sp;
            }
            var tempPoint = this.ep.minus(this.sp);
            tempPoint.setLength(distance); //获得目标点相对于开始点的位置;
            return tempPoint.plusEquals(this.sp);
        };

        LineRail.prototype.getRotationByDistance = function (distance) {
            distance;
            return this.ep.minus(this.sp).getAngle();
        };

        LineRail.prototype.startPoint = function () {
            return this.sp;
        };

        LineRail.prototype.endPoint = function () {
            return this.ep;
        };

        LineRail.prototype.setDebugMc = function (pmc) {
            this._tdebugMc = new cc.Node();
            pmc.addChild(this._tdebugMc);
            //            this._tdebugMc.graphics.lineStyle(1, 0x000099);
            //            this._tdebugMc.graphics.moveTo(this.sp.x, this.sp.y);
            //            this._tdebugMc.graphics.lineTo(this.ep.x, this.ep.y);
        };
        return LineRail;
    })(tx.AbstractRail);
    tx.LineRail = LineRail;
})(tx || (tx = {}));
//# sourceMappingURL=LineRail.js.map
