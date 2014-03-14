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
    var SpreadFilter = (function (_super) {
        __extends(SpreadFilter, _super);
        function SpreadFilter() {
            _super.call(this);
        }
        SpreadFilter.prototype.applyFilterWithBmd = function (bmd) {
            var data = this.applyFilter(bmd.getData(), bmd.getWidth(), bmd.getHeight());
            bmd.setData(data);
        };

        SpreadFilter.prototype.applyFilter = function (pixes, width, height) {
            for (var x = 0; x < width; x++) {
                for (var y = 0; y < height; y++) {
                    // Index of the pixel in the array
                    var idx = (x + y * width) * 4;
                    var r = pixes[idx + 0];
                    var g = pixes[idx + 1];
                    var b = pixes[idx + 2];

                    var rand = Math.floor(Math.random() * 10) % 3;
                    var idx2 = (x + rand + (y + rand) * width) * 4;
                    var r2 = pixes[idx2 + 0];
                    var g2 = pixes[idx2 + 1];
                    var b2 = pixes[idx2 + 2];
                    var fr = r2;
                    var fg = g2;
                    var fb = b2;
                    pixes[idx + 0] = fr; // Red channel
                    pixes[idx + 1] = fg; // Green channel
                    pixes[idx + 2] = fb; // Blue channel
                    pixes[idx + 3] = 255; // Alpha channel
                }
            }
            return pixes;
        };

        /**
        * Returns a clone of this object.
        * @method clone
        * @return {SpreadFilter}
        **/
        SpreadFilter.prototype.clone = function () {
            return new SpreadFilter();
        };

        SpreadFilter.prototype.toString = function () {
            return "[SpreadFilter]";
        };
        return SpreadFilter;
    })(tx.AbstractFilter);
    tx.SpreadFilter = SpreadFilter;
})(tx || (tx = {}));
//# sourceMappingURL=SpreadFilter.js.map
