///<reference path='../ImportTS.d.ts' />
module tx {
    /**
     * TODO:类功能摘要
     * @author TimonXue
     * @Create Date 2013-4-7
     */
    export class DropShadowFilter extends AbstractFilter {


        /**
         * Applies a DropShadowFilter to DisplayObjects of EaselJS. This filter has inherited the Filter class of EaselJS and has used BlurFilter of EaselJS at the blurring process.
         * @class DropShadowFilter
         * @extends Filter
         * @constructor
         * @param [distance=4] {Number} The offset distance for the shadow. The default value is 4.
         * @param [angle=45] {Number} The angle of the shadow. Valid values are 0 to 360 degrees. The default value is 45.
         * @param [color=0x000000] {uint} The color of the shadow. The default value is 0x000000. Valid values are in the hexadecimal format 0xRRGGBB.
         * @param [alpha=1] {Number} The alpha transparency value for the shadow color. Valid values are 0 to 1. The default value is 1.
         * @param [blurX=0] {Number} The amount of horizontal blur. The default value is 0. This value is passed to BlurFilter of EaselJS.
         * @param [blurY=0] {Number} The amount of vertical blur. The default value is 0. This value is passed to BlurFilter of EaselJS.
         * @param [strength=1] {uint} The strength of the shadow. The default value is 1. Valid values are 0 to 255. But as for this value, a low value is more preferable.
         * @param [quality=1] {Number} The number of blur iterations. The default value is 1. This value is passed to BlurFilter of EaselJS.
         * @param [inner=false] {Boolean} Specifies whether or not the shadow is an inner shadow. The default value is false, expressing outer shadow.
         * @param [knockout=false] {Boolean} Specifies whether or not the object has a knockout effect. The default value is false, expressing no knockout effect.
         * @param [hideObject=false] {Boolean} Specifies whether or not the object is hidden. If the value is true, the object is hidden and only the shadow is visible. The default value is false, expressing the object is visible.
         **/
            constructor(distance:number, angle:number, color:number, alpha:number, blurX:number, blurY:number, strength:number, quality:number, inner:Boolean, knockout:Boolean, hideObject:Boolean) {
            super();
            if (distance !== undefined) this._distance = distance;
            if (angle !== undefined) this._angle = (angle % 360 + 360) % 360;
            this.setOffset.call(this, this._distance, this._angle);
            if (!isNaN(color)) this.setColor(color);
            if (alpha !== undefined) this.alpha = alpha;
            this._blurFilter = new BlurFilter(blurX, blurY, quality);
            if (strength !== undefined) this.strength = strength >> 0;
            this.inner = !!inner;
            this.knockout = !!knockout;
            this.hideObject = !!hideObject;
        }


        /**
         * The alpha transparency value for the shadow color. Valid values are 0 to 1. The default value is 1.
         * @property alpha
         * @type Number
         * @default 1
         **/
        alpha = 1;

        /**
         * The strength of the shadow. The default value is 1. Valid values are 0 to 255. But as for this value, a low value is more preferable.
         * @property strength
         * @type uint
         * @default 1
         **/
        strength = 1;

        /**
         * Specifies whether or not the shadow is an inner shadow. The default value is false, expressing outer shadow.
         * @property inner
         * @type Boolean
         * @default false
         **/
        inner = false;

        /**
         * Specifies whether or not the object has a knockout effect. The default value is false, expressing no knockout effect.
         * @property knockout
         * @type Boolean
         * @default false
         **/
        knockout = false;

        /**
         * Specifies whether or not the object is hidden. If the value is true, the object is hidden and only the shadow is visible. The default value is false, expressing the object is visible.
         * @property hideObject
         * @type Boolean
         * @default false
         **/
        hideObject = false;


        getAngle() {
            return this._angle;
        }

        setAngle(value) {
            value = (value % 360 + 360) % 360;
            this.setOffset.call(this, this._distance, value);
            return this._angle = value;
        }

        /**
         * The offset distance for the shadow. The default value is 4.
         * @property distance
         * @type Number
         * @default 4
         **/
            getDistance() {
            return this._distance;
        }

        setDistance(value) {
            this.setOffset.call(this, value, this._angle);
            return this._distance = value;
        }

        /**
         * The color of the shadow. The default value is 0x000000. Valid values are in the hexadecimal format 0xRRGGBB.
         * @property color
         * @type uint
         * @default 0x000000
         **/
            getColor() {
            return this._red << 16 | this._green << 8 | this._blue;
        }

        setColor(value) {
            this._red = value >> 16 & 0xFF;
            this._green = value >> 8 & 0xFF;
            this._blue = value & 0xFF;
            return this.getColor();
        }

        /**
         * The amount of horizontal blur. The default value is 0. This value is passed to BlurFilter of EaselJS.
         * @property blurX
         * @type Number
         * @default 0
         **/
            getBlurX() {
            return this._blurFilter.blurX;
        }

        setBlurX(value) {
            return this._blurFilter.blurX = value;
        }

        /**
         * The amount of vertical blur. The default value is 0. This value is passed to BlurFilter of EaselJS.
         * @property blurY
         * @type Number
         * @default 0
         **/
            getBlurY() {
            return this._blurFilter.blurY;
        }

        setBlurY(value) {
            return this._blurFilter.blurY = value;
        }

        /**
         * The number of blur iterations. The default value is 1. This value is passed to BlurFilter of EaselJS.
         * @property quality
         * @type Number
         * @default 1
         **/
            getQuality() {
            return this._blurFilter.quality;
        }

        setQuality(value) {
            return this._blurFilter.quality = value;
        }

        _angle = 45;

        _distance = 4;

        _offsetX = 0;

        _offsetY = 0;

        _red = 0;

        _green = 0;

        _blue = 0;

        _blurFilter:tx.BlurFilter = null;

        /**
         * Returns a rectangle with values indicating the margins required to draw the filter or null.
         * For example, a filter that will extend the drawing area 4 pixels to the left, and 7 pixels to the right
         * (but no pixels up or down) would return a rectangle with (x=-4, y=0, width=11, height=0).
         * @method getBounds
         * @return {Rectangle} a rectangle object indicating the margins required to draw the filter or null if the filter does not effect bounds.
         **/
            getBounds() {
            if (this.inner) {
                return null;
            } else {
                var bounds = this._blurFilter.getBounds();
                var ox = this._offsetX;
                var oy = this._offsetY;
                if (ox !== 0) {
                    if (ox < 0) {
                        bounds.x += ox;
                        bounds.width += -ox;
                    } else {
                        bounds.width += ox;
                    }
                }
                if (oy !== 0) {
                    if (oy < 0) {
                        bounds.y += oy;
                        bounds.height += -oy;
                    } else {
                        bounds.height += oy;
                    }
                }
                return bounds;
            }
        }


        /**
         * Applies the DropShadowFilter to the specified context.
         * @method applyFilter
         * @param ctx {CanvasRenderingContext2D} The 2D context to use as the source.
         * @param x {Number} The x position to use for the source rect.
         * @param y {Number} The y position to use for the source rect.
         * @param width {Number} The width to use for the source rect.
         * @param height {Number} The height to use for the source rect.
         * @param [targetCtx] {CanvasRenderingContext2D} The 2D context to draw the result to. Defaults to the context passed to ctx.
         * @param [targetX] {Number} The x position to draw the result to. Defaults to the value passed to x.
         * @param [targetY] {Number} The y position to draw the result to. Defaults to the value passed to y.
         * @return {Boolean} If the filter was applied successfully.
         **/
//            applyFilter(ctx, x, y, width, height, targetCtx, targetX, targetY) {
//        targetCtx = targetCtx || ctx;
//        if (targetX === undefined) targetX = x;
//        if (targetY === undefined) targetY = y;
//        var tImgData = targetCtx.getImageData(targetX, targetY, width, height);
//        var tData = tImgData.data;
            applyFilterWithBmd(bmd:BitmapData):void {
            if ((this.alpha <= 0 || this.strength <= 0) && (!this.knockout && !this.hideObject)) {
                return;
            }
            var width = bmd.getWidth();
            var height = bmd.getHeight();


            var tData = bmd.getData();
            var dCvs = document.createElement("canvas");
            dCvs.width = width;
            dCvs.height = height;
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
                if (this.hideObject) {
                    if (inner) gco = "source-in";
                    else gco = "copy";
                } else {
                    if (inner) gco = "source-atop";
                    else gco = "destination-over";
                }
            }
            bmd._temp_ctx.save();
            bmd._temp_ctx.setTransform(1, 0, 0, 1, 0, 0);
            bmd._temp_ctx.globalAlpha = ga;
            bmd._temp_ctx.globalCompositeOperation = gco;
            bmd._temp_ctx.drawImage(dCvs, this._offsetX, this._offsetY);
            bmd._temp_ctx.restore();
        }


        /**
         * Returns a clone of this DropShadowFilter instance.
         * @method clone
         * @return {DropShadowFilter} A clone of this DropShadowFilter instance.
         **/
            clone() {
            var f = this._blurFilter;
            return new DropShadowFilter(this._distance, this._angle, this.getColor(), this.alpha, f.blurX, f.blurY, this.strength, f.quality, this.inner, this.knockout, this.hideObject);
        }


        /**
         * Returns a string representation of this filter.
         * @method toString
         * @return {String} A string representation of this filter.
         **/
            toString() {
            return "[DropShadowFilter]";
        }


        setOffset(distance, angle) {
            var r = (angle) * Math.PI/180;
            this._offsetX = Math.cos(r) * distance;
            this._offsetY = Math.sin(r) * distance;
        }
    }
}