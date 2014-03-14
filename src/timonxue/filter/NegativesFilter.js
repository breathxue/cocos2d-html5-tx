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
    var NegativesFilter = (function (_super) {
        __extends(NegativesFilter, _super);
        function NegativesFilter() {
            _super.call(this);
        }
        NegativesFilter.prototype.applyFilterWithBmd = function (bmd) {
            var data = this.applyFilter(bmd.getData(), bmd.getWidth(), bmd.getHeight());
            bmd.setData(data);
        };

        NegativesFilter.prototype.applyFilter = function (pixes, width, height) {
            for (var x = 0; x < width; x++) {
                for (var y = 0; y < height; y++) {
                    // Index of the pixel in the array
                    var idx = (x + y * width) * 4;
                    var r = pixes[idx + 0];
                    var g = pixes[idx + 1];
                    var b = pixes[idx + 2];
                    var fr = 255 - r;
                    var fg = 255 - g;
                    var fb = 255 - b;
                    pixes[idx + 0] = fr; // Red channel
                    pixes[idx + 1] = fg; // Green channel
                    pixes[idx + 2] = fb; // Blue channel
                    pixes[idx + 3] = 255; // Alpha channel
                    // add black border
                    //                    if (x < 8 || y < 8 || x > (width - 8) || y > (height - 8)) {
                    //                        pixes[idx + 0] = 0;
                    //                        pixes[idx + 1] = 0;
                    //                        pixes[idx + 2] = 0;
                    //                    }
                }
            }
            return pixes;
        };

        /**
        * Returns a clone of this object.
        * @method clone
        * @return {NegativesFilter}
        **/
        NegativesFilter.prototype.clone = function () {
            return new NegativesFilter();
        };

        NegativesFilter.prototype.toString = function () {
            return "[NegativesFilter]";
        };
        return NegativesFilter;
    })(tx.AbstractFilter);
    tx.NegativesFilter = NegativesFilter;
})(tx || (tx = {}));
//# sourceMappingURL=NegativesFilter.js.map
