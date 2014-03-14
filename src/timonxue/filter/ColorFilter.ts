///<reference path='../ImportTS.d.ts' />
module tx {
    /**
     * TODO:类功能摘要
     * @author TimonXue
     * @Create Date 2013-4-7
     */
    export class ColorFilter extends AbstractFilter {
        /**
         * Applies a color transform to DisplayObjects.
         * @class ColorFilter
         * @param {Number} [redMultiplier=1] The amount to multiply against the red channel. This is a range between 0 and 1.
         * @param {Number} [greenMultiplier=1] The amount to multiply against the green channel. This is a range between 0 and 1.
         * @param {Number} [blueMultiplier=1] The amount to multiply against the blue channel. This is a range between 0 and 1.
         * @param {Number} [alphaMultiplier=1] The amount to multiply against the alpha channel. This is a range between 0 and 1.
         * @param {Number} [redOffset=0] The amount to add to the red channel after it has been multiplied. This is a range
         * between -255 and 255.
         * @param {Number} [greenOffset=0] The amount to add to the green channel after it has been multiplied. This is a range
         * between -255 and 255.
         * @param {Number} [blueOffset=0] The amount to add to the blue channel after it has been multiplied. This is a range
         * between -255 and 255.
         * @param {Number} [alphaOffset=0] The amount to add to the alpha channel after it has been multiplied. This is a range
         * between -255 and 255.
         * @constructor
         * @extends Filter
         **/
            constructor(redMultiplier, greenMultiplier, blueMultiplier, alphaMultiplier, redOffset, greenOffset, blueOffset, alphaOffset) {
            super();
            this.initialize(redMultiplier, greenMultiplier, blueMultiplier, alphaMultiplier, redOffset, greenOffset, blueOffset, alphaOffset);
        }

// public properties:
        /**
         * Red channel multiplier.
         * @property redMultiplier
         * @type Number
         **/
        redMultiplier = 1;

        /**
         * Green channel multiplier.
         * @property greenMultiplier
         * @type Number
         **/
        greenMultiplier = 1;

        /**
         * Blue channel multiplier.
         * @property blueMultiplier
         * @type Number
         **/
        blueMultiplier = 1;

        /**
         * Alpha channel multiplier.
         * @property alphaMultiplier
         * @type Number
         **/
        alphaMultiplier = 1;

        /**
         * Red channel offset (added to value).
         * @property redOffset
         * @type Number
         **/
        redOffset = 0;

        /**
         * Green channel offset (added to value).
         * @property greenOffset
         * @type Number
         **/
        greenOffset = 0;

        /**
         * Blue channel offset (added to value).
         * @property blueOffset
         * @type Number
         **/
        blueOffset = 0;

        /**
         * Alpha channel offset (added to value).
         * @property alphaOffset
         * @type Number
         **/
        alphaOffset = 0;

// constructor:
        /**
         * Initialization method.
         * @method initialize
         * @param {Number} [redMultiplier=1] The amount to multiply against the red channel. This is a range between 0 and 1.
         * @param {Number} [greenMultiplier=1] The amount to multiply against the green channel. This is a range between 0 and 1.
         * @param {Number} [blueMultiplier=1] The amount to multiply against the blue channel. This is a range between 0 and 1.
         * @param {Number} [alphaMultiplier=1] The amount to multiply against the alpha channel. This is a range between 0 and 1.
         * @param {Number} [redOffset=0] The amount to add to the red channel after it has been multiplied. This is a range
         * between -255 and 255.
         * @param {Number} [greenOffset=0] The amount to add to the green channel after it has been multiplied. This is a range
         * between -255 and 255.
         * @param {Number} [blueOffset=0] The amount to add to the blue channel after it has been multiplied. This is a range
         * between -255 and 255.
         * @param {Number} [alphaOffset=0] The amount to add to the alpha channel after it has been multiplied. This is a range
         * between -255 and 255.
         * @protected
         **/
            initialize(redMultiplier:number, greenMultiplier:number, blueMultiplier:number, alphaMultiplier:number, redOffset:number, greenOffset:number, blueOffset:number, alphaOffset:number) {
            this.redMultiplier = redMultiplier != null ? redMultiplier : 1;
            this.greenMultiplier = greenMultiplier != null ? greenMultiplier : 1;
            this.blueMultiplier = blueMultiplier != null ? blueMultiplier : 1;
            this.alphaMultiplier = alphaMultiplier != null ? alphaMultiplier : 1;
            this.redOffset = redOffset || 0;
            this.greenOffset = greenOffset || 0;
            this.blueOffset = blueOffset || 0;
            this.alphaOffset = alphaOffset || 0;
        }

        applyFilterWithBmd(bmd:BitmapData):void
        {
            var data = this.applyFilter(bmd.getData(),bmd.getWidth(),bmd.getHeight());
            bmd.setData(data);
        }

// public methods:
//        applyFilter(ctx, x, y, width, height, targetCtx, targetX, targetY) {
//        targetCtx = targetCtx || ctx;
//        if (targetX == null) {
//        targetX = x;
//    }
//    if (targetY == null) {
//        targetY = y;
//    }
//    try {
//        var imageData = ctx.getImageData(x, y, width, height);
//    } catch (e) {
//        //if (!this.suppressCrossDomainErrors) throw new Error("unable to access local image data: " + e);
//        return false;
//    }
        applyFilter(pixes:Uint8Array, width:number, height:number):Uint8Array {
            var data = pixes;
            var l = data.length;
            for (var i = 0; i < l; i += 4) {
                data[i] = data[i] * this.redMultiplier + this.redOffset;
                data[i + 1] = data[i + 1] * this.greenMultiplier + this.greenOffset;
                data[i + 2] = data[i + 2] * this.blueMultiplier + this.blueOffset;
                data[i + 3] = data[i + 3] * this.alphaMultiplier + this.alphaOffset;
            }
            return pixes;
        }

        toString() {
            return "[ColorFilter]";
        }

        /**
         * Returns a clone of this ColorFilter instance.
         * @method clone
         * @return {ColorFilter} A clone of the current ColorFilter instance.
         **/
            clone() {
            return new ColorFilter(this.redMultiplier, this.greenMultiplier, this.blueMultiplier, this.alphaMultiplier, this.redOffset, this.greenOffset, this.blueOffset, this.alphaOffset);
        }

    }
}