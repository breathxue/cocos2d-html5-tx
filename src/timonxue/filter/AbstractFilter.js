///<reference path='../ImportTS.d.ts' />
var tx;
(function (tx) {
    /**
    * TODO:类功能摘要
    * @author TimonXue
    * @Create Date 2013-4-7
    */
    var AbstractFilter = (function () {
        function AbstractFilter() {
        }
        AbstractFilter.prototype.applyFilter = function (pixes, width, height) {
            return pixes;
        };

        AbstractFilter.prototype.applyFilterWithBmd = function (bmd) {
        };
        return AbstractFilter;
    })();
    tx.AbstractFilter = AbstractFilter;
})(tx || (tx = {}));
//# sourceMappingURL=AbstractFilter.js.map
