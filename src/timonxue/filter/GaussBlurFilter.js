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
    var GaussBlurFilter = (function (_super) {
        __extends(GaussBlurFilter, _super);
        /**
        * @param  {Number} radius 取样区域半径, 正数, 可选, 默认为 3.0
        * @param  {Number} sigma 标准方差, 可选, 默认取值为 radius / 3
        */
        function GaussBlurFilter(radius, sigma) {
            if (typeof radius === "undefined") { radius = 3; }
            if (typeof sigma === "undefined") { sigma = 1; }
            _super.call(this);
            this.radius = Math.floor(radius) || 3;
            this.sigma = sigma || radius / 3;
        }
        GaussBlurFilter.prototype.applyFilterWithBmd = function (bmd) {
            var data = this.applyFilter(bmd.getData(), bmd.getWidth(), bmd.getHeight());
            bmd.setData(data);
        };

        /**
        * 高斯模糊
        * @param  {Array} pixes  pix array
        * @param  {Number} width 图片的宽度
        * @param  {Number} height 图片的高度
        * @return {Array}
        */
        GaussBlurFilter.prototype.applyFilter = function (pixes, width, height) {
            var gaussMatrix = [], gaussSum = 0, x, y, r, g, b, a, i, j, k, len;

            a = 1 / (Math.sqrt(2 * Math.PI) * this.sigma);
            b = -1 / (2 * this.sigma * this.sigma);

            for (i = 0, x = -this.radius; x <= this.radius; x++, i++) {
                g = a * Math.exp(b * x * x);
                gaussMatrix[i] = g;
                gaussSum += g;
            }

            for (i = 0, len = gaussMatrix.length; i < len; i++) {
                gaussMatrix[i] /= gaussSum;
            }

            for (y = 0; y < height; y++) {
                for (x = 0; x < width; x++) {
                    r = g = b = a = 0;
                    gaussSum = 0;
                    for (j = -this.radius; j <= this.radius; j++) {
                        k = x + j;
                        if (k >= 0 && k < width) {
                            //r,g,b,a 四个一组
                            i = (y * width + k) * 4;
                            r += pixes[i] * gaussMatrix[j + this.radius];
                            g += pixes[i + 1] * gaussMatrix[j + this.radius];
                            b += pixes[i + 2] * gaussMatrix[j + this.radius];
                            a += pixes[i + 3] * gaussMatrix[j + this.radius];
                            gaussSum += gaussMatrix[j + this.radius];
                        }
                    }
                    i = (y * width + x) * 4;

                    // 除以 gaussSum 是为了消除处于边缘的像素, 高斯运算不足的问题
                    // console.log(gaussSum)
                    pixes[i] = r / gaussSum;
                    pixes[i + 1] = g / gaussSum;
                    pixes[i + 2] = b / gaussSum;
                    pixes[i + 3] = a / gaussSum;
                }
            }

            for (x = 0; x < width; x++) {
                for (y = 0; y < height; y++) {
                    r = g = b = a = 0;
                    gaussSum = 0;
                    for (j = -this.radius; j <= this.radius; j++) {
                        k = y + j;
                        if (k >= 0 && k < height) {
                            i = (k * width + x) * 4;
                            r += pixes[i] * gaussMatrix[j + this.radius];
                            g += pixes[i + 1] * gaussMatrix[j + this.radius];
                            b += pixes[i + 2] * gaussMatrix[j + this.radius];
                            a += pixes[i + 3] * gaussMatrix[j + this.radius];
                            gaussSum += gaussMatrix[j + this.radius];
                        }
                    }
                    i = (y * width + x) * 4;
                    pixes[i] = r / gaussSum;
                    pixes[i + 1] = g / gaussSum;
                    pixes[i + 2] = b / gaussSum;
                    pixes[i + 3] = a / gaussSum;
                    // pixes[i] = r ;
                    // pixes[i + 1] = g ;
                    // pixes[i + 2] = b ;
                    // pixes[i + 3] = a ;
                }
            }

            //end
            return pixes;
        };
        return GaussBlurFilter;
    })(tx.AbstractFilter);
    tx.GaussBlurFilter = GaussBlurFilter;
})(tx || (tx = {}));
//# sourceMappingURL=GaussBlurFilter.js.map
