///<reference path='../ImportTS.d.ts' />
module tx {
    /**
     * TODO:类功能摘要
     * @author TimonXue
     * @Create Date 2013-4-7
     */
    export class CameoFilter extends AbstractFilter {
        constructor() {
            super();
        }


        applyFilterWithBmd(bmd:BitmapData):void {
            var data = this.applyFilter(bmd.getData(), bmd.getWidth(), bmd.getHeight());
            bmd.setData(data);
        }

        applyFilter(pixes:Uint8Array, width:number, height:number):Uint8Array {
            for (var x = 0; x < width; x++) {
                for (var y = 0; y < height; y++) {

                    // Index of the pixel in the array
                    var idx = (x + y * width) * 4;
                    var r = pixes[idx + 0];
                    var g = pixes[idx + 1];
                    var b = pixes[idx + 2];
                    var idx2 = (x + (y + 1) * width) * 4;
                    var r2 = pixes[idx2 + 0];
                    var g2 = pixes[idx2 + 1];
                    var b2 = pixes[idx2 + 2];
                    var fr = r2 - r + 128;
                    var fg = g2 - g + 128;
                    var fb = b2 - b + 128;
                    var gray = .299 * fr + .587 * fg + .114 * fb;
                    pixes[idx + 0] = gray; // Red channel
                    pixes[idx + 1] = gray; // Green channel
                    pixes[idx + 2] = gray; // Blue channel
                    pixes[idx + 3] = 255; // Alpha channel
                }
            }
            return pixes;
        }

        /**
         * Returns a clone of this object.
         * @method clone
         * @return {CameoFilter}
         **/
            clone() {
            return new CameoFilter();
        }

        toString() {
            return "[CameoFilter]";
        }
    }
}