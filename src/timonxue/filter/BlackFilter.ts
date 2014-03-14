///<reference path='../ImportTS.d.ts' />
module tx {
    /**
     * TODO:类功能摘要
     * @author TimonXue
     * @Create Date 2013-4-7
     */
    export class BlackFilter extends AbstractFilter {
        constructor() {
            super();
        }


        applyFilterWithBmd(bmd:BitmapData):void {
            var data = this.applyFilter(bmd.getData(), bmd.getWidth(), bmd.getHeight());
            bmd.setData(data);
        }

        applyFilter(pixes:Uint8Array, width:number, height:number):Uint8Array {

            for ( var x = 0; x < width; x++) {
                for ( var y = 0; y < height; y++) {

                    // Index of the pixel in the array
                    var idx = (x + y * width) * 4;
                    var r = pixes[idx + 0];
                    var g = pixes[idx + 1];
                    var b = pixes[idx + 2];
                    var fr;
                    var fg;
                    var fb;
                    if((r+g+b)>=300)
                    {
                        fr=fg=fb=255;
                    }
                    else
                    {
                        fr=fg=fb=0;
                    }
                    pixes[idx + 0] = fr; // Red channel
                    pixes[idx + 1] = fg; // Green channel
                    pixes[idx + 2] = fb; // Blue channel
                    pixes[idx + 3] = 255; // Alpha channel
                }
            }
            return pixes;
        }

        /**
         * Returns a clone of this object.
         * @method clone
         * @return {BlackFilter}
         **/
            clone() {
            return new BlackFilter();
        }

        toString() {
            return "[BlackFilter]";
        }
    }
}