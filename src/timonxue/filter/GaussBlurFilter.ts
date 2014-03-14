///<reference path='../ImportTS.d.ts' />
module tx {
    /**
     * TODO:类功能摘要
     * @author TimonXue
     * @Create Date 2013-4-7
     */
    export class GaussBlurFilter extends AbstractFilter {

        private radius:number;
        private sigma:number;

        /**
         * @param  {Number} radius 取样区域半径, 正数, 可选, 默认为 3.0
         * @param  {Number} sigma 标准方差, 可选, 默认取值为 radius / 3
         */
            constructor(radius:number = 3, sigma:number = 1) {
            super();
            this.radius = Math.floor(radius) || 3;
            this.sigma = sigma || radius / 3;

        }

        applyFilterWithBmd(bmd:BitmapData):void
        {
            var data = this.applyFilter(bmd.getData(),bmd.getWidth(),bmd.getHeight());
            bmd.setData(data);
        }

        /**
         * 高斯模糊
         * @param  {Array} pixes  pix array
         * @param  {Number} width 图片的宽度
         * @param  {Number} height 图片的高度
         * @return {Array}
         */
            applyFilter(pixes:Uint8Array, width:number, height:number):Uint8Array {

            var gaussMatrix = [],
                gaussSum = 0,
                x, y,
                r, g, b, a,
                i, j, k, len;


            a = 1 / (Math.sqrt(2 * Math.PI) * this.sigma);
            b = -1 / (2 * this.sigma * this.sigma);
            //生成高斯矩阵
            for (i = 0, x = -this.radius; x <= this.radius; x++, i++) {
                g = a * Math.exp(b * x * x);
                gaussMatrix[i] = g;
                gaussSum += g;

            }
            //归一化, 保证高斯矩阵的值在[0,1]之间
            for (i = 0, len = gaussMatrix.length; i < len; i++) {
                gaussMatrix[i] /= gaussSum;
            }
            //x 方向一维高斯运算
            for (y = 0; y < height; y++) {
                for (x = 0; x < width; x++) {
                    r = g = b = a = 0;
                    gaussSum = 0;
                    for (j = -this.radius; j <= this.radius; j++) {
                        k = x + j;
                        if (k >= 0 && k < width) {//确保 k 没超出 x 的范围
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
            //y 方向一维高斯运算
            for (x = 0; x < width; x++) {
                for (y = 0; y < height; y++) {
                    r = g = b = a = 0;
                    gaussSum = 0;
                    for (j = -this.radius; j <= this.radius; j++) {
                        k = y + j;
                        if (k >= 0 && k < height) {//确保 k 没超出 y 的范围
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
        }
    }
}