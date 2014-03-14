///<reference path='../ImportTS.d.ts' />
var tx;
(function (tx) {
    /**
    * TODO:类功能摘要
    * @author TimonXue
    * @Create Date 2013-4-7
    */
    var AbstractRail = (function () {
        function AbstractRail() {
        }
        AbstractRail.prototype.destroy = function () {
        };

        AbstractRail.prototype.getDistance = function () {
            return 0;
        };

        AbstractRail.prototype.getPointByDistance = function (distance) {
            distance;
            return null;
        };

        AbstractRail.prototype.getRotationByDistance = function (distance) {
            distance;
            return 0;
        };

        AbstractRail.prototype.startPoint = function () {
            return null;
        };

        AbstractRail.prototype.endPoint = function () {
            return null;
        };

        AbstractRail.prototype.setDebugMc = function (mc) {
        };
        return AbstractRail;
    })();
    tx.AbstractRail = AbstractRail;
})(tx || (tx = {}));
//# sourceMappingURL=AbstractRail.js.map
