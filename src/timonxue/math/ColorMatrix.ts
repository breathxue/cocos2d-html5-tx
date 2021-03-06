///<reference path='../ImportTS.d.ts' />
module tx{
    /**
     * TODO:类功能摘要
     * @author TimonXue
     * @Create Date 2013-4-7
     */
    export class ColorMatrix {

        /**
         * Provides helper functions for assembling a matrix for use with the {{#crossLink "ColorMatrixFilter"}}{{/crossLink}},
         * or can be used directly as the matrix for a ColorMatrixFilter. Most methods return the instance to facilitate
         * chained calls.
         * @class ColorMatrix
         * @param {Number} brightness
         * @param {Number} contrast
         * @param {Number} saturation
         * @param {Number} hue
         * @constructor
         **/
            constructor(brightness:number = 0, contrast:number = 0, saturation:number = 0, hue:number = 0) {
            this.initialize(brightness, contrast, saturation, hue);
        }

        /**
         * Array of delta values for contrast calculations.
         * @property DELTA_INDEX
         * @type Array
         * @protected
         * @static
         **/
        static DELTA_INDEX = [
            0, 0.01, 0.02, 0.04, 0.05, 0.06, 0.07, 0.08, 0.1, 0.11,
            0.12, 0.14, 0.15, 0.16, 0.17, 0.18, 0.20, 0.21, 0.22, 0.24,
            0.25, 0.27, 0.28, 0.30, 0.32, 0.34, 0.36, 0.38, 0.40, 0.42,
            0.44, 0.46, 0.48, 0.5, 0.53, 0.56, 0.59, 0.62, 0.65, 0.68,
            0.71, 0.74, 0.77, 0.80, 0.83, 0.86, 0.89, 0.92, 0.95, 0.98,
            1.0, 1.06, 1.12, 1.18, 1.24, 1.30, 1.36, 1.42, 1.48, 1.54,
            1.60, 1.66, 1.72, 1.78, 1.84, 1.90, 1.96, 2.0, 2.12, 2.25,
            2.37, 2.50, 2.62, 2.75, 2.87, 3.0, 3.2, 3.4, 3.6, 3.8,
            4.0, 4.3, 4.7, 4.9, 5.0, 5.5, 6.0, 6.5, 6.8, 7.0,
            7.3, 7.5, 7.8, 8.0, 8.4, 8.7, 9.0, 9.4, 9.6, 9.8,
            10.0
        ];

        /**
         * Identity matrix values.
         * @property IDENTITY_MATRIX
         * @type Array
         * @protected
         * @static
         **/
        static IDENTITY_MATRIX = [
            1, 0, 0, 0, 0,
            0, 1, 0, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 0, 1, 0,
            0, 0, 0, 0, 1
        ];

        /**
         * The constant length of a color matrix.
         * @property LENGTH
         * @type Number
         * @protected
         * @static
         **/
        static LENGTH = ColorMatrix.IDENTITY_MATRIX.length;


        /**
         * Initialization method.
         * @method initialize
         * @param {Number} brightness
         * @param {Number} contrast
         * @param {Number} saturation
         * @param {Number} hue
         * @protected
         */
            initialize(brightness, contrast, saturation, hue) {
            this.reset();
            this.adjustColor(brightness, contrast, saturation, hue);
            return this;
        }

        /**
         * Resets the matrix to identity values.
         * @method reset
         * @return {ColorMatrix} The ColorMatrix instance the method is called on (useful for chaining calls.)
         */
            reset() {
            return this.copyFromArray(ColorMatrix.IDENTITY_MATRIX);
        }

        /**
         * Shortcut method to adjust brightness, contrast, saturation and hue.
         * Equivalent to calling adjustHue(hue), adjustContrast(contrast),
         * adjustBrightness(brightness), adjustSaturation(saturation), in that order.
         * @method adjustColor
         * @param {Number} brightness
         * @param {Number} contrast
         * @param {Number} saturation
         * @param {Number} hue
         * @return {ColorMatrix} The ColorMatrix instance the method is called on (useful for chaining calls.)
         **/
            adjustColor(brightness, contrast, saturation, hue) {
            this.adjustHue(hue);
            this.adjustContrast(contrast);
            this.adjustBrightness(brightness);
            return this.adjustSaturation(saturation);
        }

        /**
         * Adjusts the brightness of pixel color by adding the specified value to the red, green and blue channels.
         * Positive values will make the image brighter, negative values will make it darker.
         * @method adjustBrightness
         * @param {Number} value A value between -255 & 255 that will be added to the RGB channels.
         * @return {ColorMatrix} The ColorMatrix instance the method is called on (useful for chaining calls.)
         **/
            adjustBrightness(value) {
            if (value == 0 || isNaN(value)) {
                return this;
            }
            value = this._cleanValue(value, 255);
            this._multiplyMatrix([
                1, 0, 0, 0, value,
                0, 1, 0, 0, value,
                0, 0, 1, 0, value,
                0, 0, 0, 1, 0,
                0, 0, 0, 0, 1
            ]);
            return this;
        }

        /**
         * Adjusts the contrast of pixel color.
         * Positive values will increase contrast, negative values will decrease contrast.
         * @method adjustContrast
         * @param {Number} value A value between -100 & 100.
         * @return {ColorMatrix} The ColorMatrix instance the method is called on (useful for chaining calls.)
         **/
            adjustContrast(value) {
            if (value == 0 || isNaN(value)) {
                return this;
            }
            value = this._cleanValue(value, 100);
            var x;
            if (value < 0) {
                x = 127 + value / 100 * 127;
            } else {
                x = value % 1;
                if (x == 0) {
                    x = ColorMatrix.DELTA_INDEX[value];
                } else {
                    x = ColorMatrix.DELTA_INDEX[(value << 0)] * (1 - x) + ColorMatrix.DELTA_INDEX[(value << 0) + 1] * x; // use linear interpolation for more granularity.
                }
                x = x * 127 + 127;
            }
            this._multiplyMatrix([
                x / 127, 0, 0, 0, 0.5 * (127 - x),
                0, x / 127, 0, 0, 0.5 * (127 - x),
                0, 0, x / 127, 0, 0.5 * (127 - x),
                0, 0, 0, 1, 0,
                0, 0, 0, 0, 1
            ]);
            return this;
        }

        /**
         * Adjusts the color saturation of the pixel.
         * Positive values will increase saturation, negative values will decrease saturation (trend towards greyscale).
         * @method adjustSaturation
         * @param {Number} value A value between -100 & 100.
         * @return {ColorMatrix} The ColorMatrix instance the method is called on (useful for chaining calls.)
         **/
            adjustSaturation(value) {
            if (value == 0 || isNaN(value)) {
                return this;
            }
            value = this._cleanValue(value, 100);
            var x = 1 + ((value > 0) ? 3 * value / 100 : value / 100);
            var lumR = 0.3086;
            var lumG = 0.6094;
            var lumB = 0.0820;
            this._multiplyMatrix([
                lumR * (1 - x) + x, lumG * (1 - x), lumB * (1 - x), 0, 0,
                lumR * (1 - x), lumG * (1 - x) + x, lumB * (1 - x), 0, 0,
                lumR * (1 - x), lumG * (1 - x), lumB * (1 - x) + x, 0, 0,
                0, 0, 0, 1, 0,
                0, 0, 0, 0, 1
            ]);
            return this;
        }


        /**
         * Adjusts the hue of the pixel color.
         * @method adjustHue
         * @param {Number} value A value between -180 & 180.
         * @return {ColorMatrix} The ColorMatrix instance the method is called on (useful for chaining calls.)
         **/
            adjustHue(value) {
            if (value == 0 || isNaN(value)) {
                return this;
            }
            value = this._cleanValue(value, 180) / 180 * Math.PI;
            var cosVal = Math.cos(value);
            var sinVal = Math.sin(value);
            var lumR = 0.213;
            var lumG = 0.715;
            var lumB = 0.072;
            this._multiplyMatrix([
                lumR + cosVal * (1 - lumR) + sinVal * (-lumR), lumG + cosVal * (-lumG) + sinVal * (-lumG), lumB + cosVal * (-lumB) + sinVal * (1 - lumB), 0, 0,
                lumR + cosVal * (-lumR) + sinVal * (0.143), lumG + cosVal * (1 - lumG) + sinVal * (0.140), lumB + cosVal * (-lumB) + sinVal * (-0.283), 0, 0,
                lumR + cosVal * (-lumR) + sinVal * (-(1 - lumR)), lumG + cosVal * (-lumG) + sinVal * (lumG), lumB + cosVal * (1 - lumB) + sinVal * (lumB), 0, 0,
                0, 0, 0, 1, 0,
                0, 0, 0, 0, 1
            ]);
            return this;
        }

        /**
         * Concatenates (multiplies) the specified matrix with this one.
         * @method concat
         * @param {Array} matrix An array or ColorMatrix instance.
         * @return {ColorMatrix} The ColorMatrix instance the method is called on (useful for chaining calls.)
         **/
            concat(matrix) {
            matrix = this._fixMatrix(matrix);
            if (matrix.length != ColorMatrix.LENGTH) {
                return this;
            }
            this._multiplyMatrix(matrix);
            return this;
        }

        /**
         * Returns a clone of this ColorMatrix.
         * @method clone
         * @return {ColorMatrix} A clone of this ColorMatrix.
         **/
            clone() {
            return (new ColorMatrix()).copyMatrix(this);
        }

        /**
         * Return a length 25 (5x5) array instance containing this matrix's values.
         * @method toArray
         * @return {Array} An array holding this matrix's values.
         **/
            toArray():any[] {
            var arr = [];
            for (var i = 0, l = ColorMatrix.LENGTH; i < l; i++) {
                arr[i] = this[i];
            }
            return arr;
        }

        copyFromArray(any:any[]):ColorMatrix {
            var l = ColorMatrix.LENGTH;
            for (var i = 0; i < l; i++) {
                this[i] = any[i];
            }
            return this;
        }

        /**
         * Copy the specified matrix's values to this matrix.
         * @method copyMatrix
         * @param {ColorMatrix} matrix An array or ColorMatrix instance.
         * @return {ColorMatrix} The ColorMatrix instance the method is called on (useful for chaining calls.)
         **/
            copyMatrix(matrix) {
            var l = ColorMatrix.LENGTH;
            for (var i = 0; i < l; i++) {
                this[i] = matrix[i];
            }
            return this;
        }

        /**
         * Returns a string representation of this object.
         * @method toString
         * @return {String} a string representation of the instance.
         **/
            toString() {
            return "[ColorMatrix (" + this.toArray() + ")]";
        }

// private methods:

        /**
         * @method _multiplyMatrix
         * @param {Array} matrix
         * @protected
         **/
            _multiplyMatrix(matrix) {
            var col = [];

            for (var i = 0; i < 5; i++) {
                for (var j = 0; j < 5; j++) {
                    col[j] = this[j + i * 5];
                }
                for (var j = 0; j < 5; j++) {
                    var val = 0;
                    for (var k = 0; k < 5; k++) {
                        val += matrix[j + k * 5] * col[k];
                    }
                    this[j + i * 5] = val;
                }
            }
        }

        /**
         * Make sure values are within the specified range, hue has a limit of 180, brightness is 255, others are 100.
         * @method _cleanValue
         * @param {Number} value The raw number
         * @param {Number} limit The maximum that the number can be. The minimum is the limit * -1.
         * @protected
         **/
            _cleanValue(value, limit) {
            return Math.min(limit, Math.max(-limit, value));
        }

        //
        /**
         * Makes sure matrixes are 5x5 (25 long).
         * @method _fixMatrix
         * @param {Array} matrix
         * @protected
         **/
            _fixMatrix(matrix) {
            if (matrix instanceof ColorMatrix) {
                matrix = (<ColorMatrix>matrix).toArray();
            }
            if (matrix.length < ColorMatrix.LENGTH) {
                matrix = matrix.slice(0, matrix.length).concat(ColorMatrix.IDENTITY_MATRIX.slice(matrix.length, ColorMatrix.LENGTH));
            } else if (matrix.length > ColorMatrix.LENGTH) {
                matrix = matrix.slice(0, ColorMatrix.LENGTH);
            }
            return matrix;
        }

    }
}