///<reference path='../ImportTS.d.ts' />
module tx {
    /**
     * TODO:类功能摘要
     * @author TimonXue
     * @Create Date 2013-4-7
     */
    export class GlowFilter extends AbstractFilter {

        alpha = 1;
        strength = 1;
        inner = false;
        knockout = false;
        _red = 255;

        _green = 0;

        _blue = 0;

        _blurFilter:tx.BlurFilter = null;

        getColor() {
            return this._red << 16 | this._green << 8 | this._blue;
        }

        setColor(value) {
            this._red = value >> 16 & 0xFF;
            this._green = value >> 8 & 0xFF;
            this._blue = value & 0xFF;
            return this.getColor();
        }

        getBlurX() {
            return this._blurFilter.blurX;
        }

        setBlurX(value) {
            return this._blurFilter.blurX = value;
        }

        getBlurY() {
            return this._blurFilter.blurX;
        }

        setBlurY(value) {
            return this._blurFilter.blurX = value;
        }

        getQuality() {
            return this._blurFilter.quality;
        }

        setQuality(value) {
            return this._blurFilter.quality = value;
        }

        /**
         * Applies a GlowFilter to DisplayObjects of EaselJS. This filter has inherited the Filter class of EaselJS and has used BlurFilter of EaselJS at the blurring process.
         * @class GlowFilter
         * @extends Filter
         * @constructor
         * @param [color=0xFF0000] {number} The color of the glow. The default value is 0xFF0000. Valid values are in the hexadecimal format 0xRRGGBB.
         * @param [alpha=1] {Number} The alpha transparency value for the glow color. Valid values are 0 to 1.
         * @param [blurX=0] {Number} The amount of horizontal blur. The default value is 0. This value is passed to BlurFilter of EaselJS.
         * @param [blurY=0] {Number} The amount of vertical blur. The default value is 0. This value is passed to BlurFilter of EaselJS.
         * @param [strength=1] {uint} The strength of the glow. The default value is 1. Valid values are 0 to 255. But as for this value, a low value is more preferable.
         * @param [quality=1] {Number} The number of blur iterations. The default value is 1. This value is passed to BlurFilter of EaselJS.
         * @param [inner=false] {Boolean} Specifies whether the glow is an inner glow. The default value is false, expressing outer glow.
         * @param [knockout=false] {Boolean} Specifies whether the object has a knockout effect. The default value is false, expressing no knockout effect.
         */

            constructor(color:number, alpha:number = 1, blurX:number = 5, blurY:number = 5, strength:number =1, quality:number = 1, inner:Boolean = false, knockout:Boolean = false) {
            super();
            if (!isNaN(color)) this.setColor(color);
            if (alpha !== undefined) this.alpha = alpha;
            this._blurFilter = new BlurFilter(blurX, blurY, quality);
            if (strength !== undefined) this.strength = strength;
            this.inner = !!inner;
            this.knockout = !!knockout;
        }

        applyFilterWithBmd(bmd:BitmapData):void {

            if ((this.alpha <= 0 || this.strength <= 0) && !this.knockout) {
                return;
            }
            var width = bmd.getWidth();
            var height = bmd.getHeight();
//            targetCtx = targetCtx || ctx;
//            if (targetX === undefined) targetX = x;
//            if (targetY === undefined) targetY = y;
//            var tImgData = targetCtx.getImageData(targetX, targetY, width, height);
//            var tData = tImgData.data;
            var tData = bmd.getData();
            var dCvs = document.createElement("canvas");
            dCvs.width = bmd.getWidth();
            dCvs.height = bmd.getHeight();
            var dCtx = dCvs.getContext("2d");
            var dImgData = dCtx.getImageData(0, 0, width, height);
            var dData = dImgData.data;
            var inner = this.inner;
            var red = this._red;
            var green = this._green;
            var blue = this._blue;
            for (var i = 0, l = dData.length; i < l; i += 4) {
                var ia = i + 3;
                var alpha = tData[ia];
                if (!inner) {
                    if (alpha !== 0) {
                        dData[i] = red;
                        dData[i + 1] = green;
                        dData[i + 2] = blue;
                        dData[ia] = alpha;
                    }
                } else {
                    if (alpha !== 255) {
                        dData[i] = red;
                        dData[i + 1] = green;
                        dData[i + 2] = blue;
                        dData[ia] = 255 - alpha;
                    }
                }
            }
            dCtx.putImageData(dImgData, 0, 0);
            var strength = this.strength;
            if (0 < strength) {

                var data = dCtx.getImageData(0, 0, width, height);
                this._blurFilter.applyFilter(data.data,width, height);
                dCtx.putImageData(data, 0, 0);

                if (255 < strength) strength = 255;
                for (var j = 1; j < strength; j++) {
                    dCtx.drawImage(dCvs, 0, 0);
                }
            }
            var ga = this.alpha;
            if (ga < 0) ga = 0;
            else if (1 < ga) ga = 1;
            var gco;
            if (this.knockout) {
                if (inner) gco = "source-in";
                else gco = "source-out";
            } else {
                if (inner) gco = "source-atop";
                else gco = "destination-over";
            }

            bmd._temp_ctx.save();
            bmd._temp_ctx.setTransform(1, 0, 0, 1, 0, 0);
            bmd._temp_ctx.globalAlpha = ga;
            bmd._temp_ctx.globalCompositeOperation = gco;
            bmd._temp_ctx.drawImage(dCvs, 0, 0);
            bmd._temp_ctx.restore();
        }

        clone() {
            var f = this._blurFilter;
            return new GlowFilter(this.getColor(), this.alpha, f.blurX, f.blurY, this.strength, f.quality, this.inner, this.knockout);
        }

        /**
         * Returns a string representation of this filter.
         * @method toString
         * @return {String} A string representation of this filter.
         **/
            toString() {
            return "[GlowFilter]";
        }
    }
}