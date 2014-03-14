///<reference path='../ImportTS.d.ts' />
var tx;
(function (tx) {
    /**
    * TODO:类功能摘要
    * @author TimonXue
    * @Create Date 2013-4-7
    */
    var BitmapData = (function () {
        function BitmapData(width, height, transparent, fillColor) {
            if (typeof transparent === "undefined") { transparent = true; }
            if (typeof fillColor === "undefined") { fillColor = 0xFFFFFFFF; }
            this.dataId = 0;
            this._lock = false;
            this._width = width;
            this._height = height;
            this._transparent = transparent;
            this._fillColor = fillColor;

            this._temp_Canvas = document.createElement("canvas");
            this._temp_ctx = this._temp_Canvas.getContext("2d");
            this._temp_Canvas.width = this._width;
            this._temp_Canvas.height = this._height;
            var color = this._fillColor % 0x1000000;
            var alpha = this._transparent ? ((this._fillColor >> 24) % 0x100) : 255;
            this._temp_ctx.fillStyle = tx.Utils.UINT_TO_3STRING(color);
            this._temp_ctx.globalAlpha = alpha / 255;
            this._temp_ctx.fillRect(0, 0, this._width, this._height);
            this._temp_ctx.globalAlpha = 1;
            this._ImgData = this._temp_ctx.getImageData(0, 0, this._width, this._height);
            //TODO:默认颜色填充
        }
        BitmapData.prototype.destroy = function () {
            this._temp_ctx = null;
            this._temp_Canvas = null;
            this._ImgData = null;
        };

        BitmapData.prototype.clone = function () {
            var temp = new BitmapData(this._width, this._height, this._transparent, this._fillColor);
            for (var i = 0; i < this._ImgData.data.length; i++) {
                temp._ImgData.data[i] = this._ImgData.data[i];
            }
            temp.updateImageEle();
            return temp;
        };

        BitmapData.prototype.draw = function (soucre, matrix, colorTransform, blendMode, clipRect, smoothing) {
            if (typeof matrix === "undefined") { matrix = null; }
            if (typeof colorTransform === "undefined") { colorTransform = null; }
            if (typeof blendMode === "undefined") { blendMode = null; }
            if (typeof clipRect === "undefined") { clipRect = null; }
            if (typeof smoothing === "undefined") { smoothing = false; }
            var _this = this;
            cc.renderContext.clearRect(0, 0, cc.canvas.width, -cc.canvas.height);
            var oldParent = soucre.getParent();
            if (oldParent) {
                oldParent.removeChild(soucre);
            }

            if (clipRect == null) {
                clipRect = new cc.Rect(0, 0, this._width, this._height);
            }

            //转换全局缩放
            if (BitmapData.GlobalResolutionEnblen) {
                if (cc.EGLView.getInstance()._resolutionPolicy != cc.RESOLUTION_POLICY.UNKNOWN) {
                    var designResolutionSize = cc.EGLView.getInstance().getDesignResolutionSize();
                    cc.EGLView.getInstance()._frameSize = new cc.Size(this._width, this._height);
                    var result = cc.EGLView.getInstance()._rpShowAll.apply(cc.EGLView.getInstance(), new cc.Size(this._width, this._height));
                    cc.EGLView.getInstance()._setScaleXYForRenderTexture();
                    //                    cc.EGLView.getInstance().setFrameSize(designResolutionSize.width, designResolutionSize.height);
                    //                    if ((cc.EGLView.getInstance())["_adjustSize"]) {
                    //                        cc.EGLView.getInstance()._adjustSize();
                    //                    }
                }
            }

            var scene = cc.Scene.create();
            scene.setAnchorPoint(cc.p(0, 0));
            scene.addChild(soucre);

            //record tranMatrix;
            if (matrix == null) {
                matrix = new tx.Matrix(1, 0, 0, 1, 0, 0);
            }
            var oldTran = soucre.nodeToParentTransform();
            soucre._transform = matrix;

            scene.draw = function (ctx) {
                var color = _this._fillColor % 0x1000000;
                var alpha = _this._transparent ? ((_this._fillColor >> 24) % 0x100) : 255;
                ctx.fillStyle = tx.Utils.UINT_TO_3STRING(color);
                ctx.globalAlpha = alpha / 255;
                ctx.fillRect(0, 0, _this._width, -_this._height);
                ctx.globalAlpha = 1;
            };

            var tempNode = new cc.Node();
            scene.addChild(tempNode);
            tempNode.draw = function (ctx) {
                _this._ImgData = ctx.getImageData(clipRect.x, cc.canvas.height - _this._height + clipRect.y, clipRect.width, clipRect.height);

                //                for (var i = 0; i < this._ImgData.data.length; i += 4) {
                //                    cc.log
                //                    this._ImgData.data[i] = 255 - this._ImgData.data[i];
                //                    this._ImgData.data[i + 1] = 255 - this._ImgData.data[i + 1];
                //                    this._ImgData.data[i + 2] = 255 - this._ImgData.data[i + 2];
                //                    this._ImgData.data[i + 3] = 255;
                //                }
                //                this._temp_ctx.putImageData(this._ImgData, 0, 0);
                _this.updateImageEle();

                //recover
                soucre._transform = oldTran;
                scene.removeChild(soucre);
                if (oldParent) {
                    oldParent.addChild(soucre);
                }

                //还原全局缩放
                if (BitmapData.GlobalResolutionEnblen) {
                    if (cc.EGLView.getInstance()._resolutionPolicy != cc.RESOLUTION_POLICY.UNKNOWN) {
                        cc.EGLView.getInstance().setDesignResolutionSize(designResolutionSize.width, designResolutionSize.height, cc.EGLView.getInstance()._resolutionPolicy);
                        //                        if ((cc.EGLView.getInstance())["_adjustSize"]) {
                        //                            cc.EGLView.getInstance()._adjustSize();
                        //                        }
                    }
                }
            };
            scene.visit();

            //解决闪屏问题的bug
            cc.Director.getInstance().getRunningScene().visit();
        };

        BitmapData.prototype.isInRect = function (x, y) {
            if (x >= 0 && y >= 0 && x <= this._width && y <= this._height) {
                return true;
            } else {
                return false;
            }
        };

        BitmapData.prototype.setPixel = function (x, y, color) {
            if (this.isInRect(x, y)) {
                x = Math.floor(x);
                y = Math.floor(y);
                var c = tx.Utils.COLOR_3B(color);

                //            trace(c.r, c.g, c.b);
                this._ImgData.data[(y * this._width + x) * 4] = c.r;
                this._ImgData.data[((y * this._width + x) * 4) + 1] = c.g;
                this._ImgData.data[((y * this._width + x) * 4) + 2] = c.b;
                this._ImgData.data[((y * this._width + x) * 4) + 3] = 1;
                this.updateImageEle();
            }
        };

        BitmapData.prototype.setPixel32 = function (x, y, color) {
            if (this.isInRect(x, y)) {
                x = Math.floor(x);
                y = Math.floor(y);
                var c = tx.Utils.COLOR_4B(color);

                //            trace(c.r, c.g, c.b, c.a);
                this._ImgData.data[(y * this._width + x) * 4] = c.r;
                this._ImgData.data[((y * this._width + x) * 4) + 1] = c.g;
                this._ImgData.data[((y * this._width + x) * 4) + 2] = c.b;
                this._ImgData.data[((y * this._width + x) * 4) + 3] = c.a;
                this.updateImageEle();
            }
        };

        BitmapData.prototype.getPixel = function (x, y) {
            var color = this.getPixel3B(x, y);
            if (color) {
                return tx.Utils.C3B_TO_UINT(color);
            } else {
                return NaN;
            }
        };

        BitmapData.prototype.getPixel3B = function (x, y) {
            if (this.isInRect(x, y)) {
                x = Math.floor(x);
                y = Math.floor(y);
                var r = this._ImgData.data[(y * this._width + x) * 4];
                var g = this._ImgData.data[((y * this._width + x) * 4) + 1];
                var b = this._ImgData.data[((y * this._width + x) * 4) + 2];
                return new cc.Color3B(r, g, b);
            } else {
                return null;
            }
        };

        BitmapData.prototype.getPixel32 = function (x, y) {
            var color = this.getPixel4B(x, y);
            if (color) {
                return tx.Utils.C4B_TO_UINT(color);
            } else {
                return NaN;
            }
        };

        BitmapData.prototype.getPixel4B = function (x, y) {
            if (this.isInRect(x, y)) {
                x = Math.floor(x);
                y = Math.floor(y);
                var r = this._ImgData.data[(y * this._width + x) * 4];
                var g = this._ImgData.data[((y * this._width + x) * 4) + 1];
                var b = this._ImgData.data[((y * this._width + x) * 4) + 2];
                var a = this._ImgData.data[((y * this._width + x) * 4) + 3];
                return new cc.Color4B(r, g, b, a);
            } else {
                return null;
            }
        };

        BitmapData.prototype.getBitmapDataByRect = function (rect, transparent, fillColor) {
            if (typeof transparent === "undefined") { transparent = true; }
            if (typeof fillColor === "undefined") { fillColor = 0xFFFFFFFF; }
            rect = tx.copyR(rect);
            var temp = new BitmapData(rect.width, rect.height, transparent, fillColor);

            //            temp._ImgData = this._temp_ctx.createImageData(rect.width, rect.height);
            var startX = rect.x > 0 ? rect.x : 0;
            var startY = rect.y > 0 ? rect.y : 0;
            var width = (rect.width + rect.x) < this._width ? (rect.width + rect.x) : this._width;
            var height = (rect.height + rect.y) < this._height ? (rect.height + rect.y) : this._height;

            for (var j = startY; j < height; j++) {
                for (var i = startX; i < width; i++) {
                    temp._ImgData.data[(((j - rect.y) * rect.width + (i - rect.x)) * 4)] = this._ImgData.data[((j * this._width + i) * 4)];
                    temp._ImgData.data[(((j - rect.y) * rect.width + (i - rect.x)) * 4) + 1] = this._ImgData.data[((j * this._width + i) * 4) + 1];
                    temp._ImgData.data[(((j - rect.y) * rect.width + (i - rect.x)) * 4) + 2] = this._ImgData.data[((j * this._width + i) * 4) + 2];
                    temp._ImgData.data[(((j - rect.y) * rect.width + (i - rect.x)) * 4) + 3] = this._ImgData.data[((j * this._width + i) * 4) + 3];
                    //                    temp._ImgData.data[(((j - rect.y) * rect.width + (i - rect.x)) * 4)] = 255;
                    //                    temp._ImgData.data[(((j - rect.y) * rect.width + (i - rect.x)) * 4) + 1] = 255;
                    //                    temp._ImgData.data[(((j - rect.y) * rect.width + (i - rect.x)) * 4) + 2] = 255;
                    //                    temp._ImgData.data[(((j - rect.y) * rect.width + (i - rect.x)) * 4) + 3] = 255;
                    //                    trace((((j - rect.y) * rect.width + (i - rect.x)) * 4));
                    //                    trace(((j * rect.width + i) * 4));
                }
                //                trace("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
            }
            temp.updateImageEle();
            return temp;
        };

        BitmapData.prototype.lock = function () {
            this._lock = true;
        };

        BitmapData.prototype.unlock = function () {
            if (this._lock == true) {
                this._lock = false;
                this.updateImageEle();
            }
        };

        BitmapData.prototype._getImgData = function () {
            return this._ImgData;
        };

        BitmapData.prototype._getImageEle = function () {
            return this._temp_Canvas;
        };

        BitmapData.prototype.getData = function () {
            return this._ImgData.data;
        };

        BitmapData.prototype.setData = function (data) {
            this._ImgData.data = data;
            this.updateImageEle();
        };

        BitmapData.prototype.updateImageEle = function () {
            if (!this._lock) {
                this._temp_ctx.clearRect(0, 0, this._width, this._height);
                this._temp_ctx.putImageData(this._ImgData, 0, 0);
                this.dataId++;
            }
        };

        BitmapData.prototype.getWidth = function () {
            return this._width;
        };

        BitmapData.prototype.getHeight = function () {
            return this._height;
        };
        BitmapData.GlobalResolutionEnblen = true;
        return BitmapData;
    })();
    tx.BitmapData = BitmapData;
})(tx || (tx = {}));
//# sourceMappingURL=BitmapData.js.map
