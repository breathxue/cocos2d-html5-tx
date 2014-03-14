///<reference path='../ImportTS.d.ts' />
module tx{
    /**
     * TODO:类功能摘要
     * @author TimonXue
     * @Create Date 2013-4-7
     */
    export class BitmapData implements IDestroyable {
        static GlobalResolutionEnblen:Boolean = true;
        _ImgData:ImageData;
        private _temp_Canvas:HTMLCanvasElement;
        _temp_ctx:CanvasRenderingContext2D;
        private _width:number;
        private _height:number;
        private _transparent:Boolean;
        private _fillColor:number;
        private _lock:Boolean;
        //数据编号,用来检查更新数据
        public dataId:number;

        constructor(width:number, height:number, transparent:Boolean = true, fillColor:number = 0xFFFFFFFF) {
            this.dataId = 0;
            this._lock = false;
            this._width = width;
            this._height = height;
            this._transparent = transparent;
            this._fillColor = fillColor;

            this._temp_Canvas = <HTMLCanvasElement>document.createElement("canvas");
            this._temp_ctx = this._temp_Canvas.getContext("2d");
            this._temp_Canvas.width = this._width;
            this._temp_Canvas.height = this._height;
            var color:number = this._fillColor % 0x1000000;
            var alpha:number = this._transparent ? ((this._fillColor >> 24) % 0x100) : 255;
            this._temp_ctx.fillStyle = tx.Utils.UINT_TO_3STRING(color);
            this._temp_ctx.globalAlpha = alpha / 255;
            this._temp_ctx.fillRect(0, 0, this._width, this._height);
            this._temp_ctx.globalAlpha = 1;
            this._ImgData = this._temp_ctx.getImageData(0, 0, this._width, this._height);
            //TODO:默认颜色填充
        }

        public destroy():void {
            this._temp_ctx = null;
            this._temp_Canvas = null;
            this._ImgData = null
        }

        public clone():BitmapData {
            var temp:BitmapData = new BitmapData(this._width, this._height, this._transparent, this._fillColor);
            for (var i = 0; i < this._ImgData.data.length; i++) {
                temp._ImgData.data[i] = this._ImgData.data[i];
            }
            temp.updateImageEle();
            return temp;

        }

        public draw(soucre:any, matrix:Matrix = null, colorTransform = null, blendMode:string = null, clipRect:cc.Rect = null, smoothing:Boolean = false):void {
            cc.renderContext.clearRect(0, 0, cc.canvas.width, -cc.canvas.height);
            var oldParent:cc.Node = soucre.getParent();
            if (oldParent) {
                oldParent.removeChild(soucre);
            }

            if (clipRect == null) {
                clipRect = new cc.Rect(0, 0, this._width, this._height);
            }
            //转换全局缩放
            if (BitmapData.GlobalResolutionEnblen) {
                if (cc.EGLView.getInstance()._resolutionPolicy != cc.RESOLUTION_POLICY.UNKNOWN) {
                    var designResolutionSize:cc.Size = cc.EGLView.getInstance().getDesignResolutionSize();
                    cc.EGLView.getInstance()._frameSize = new cc.Size(this._width, this._height)//designResolutionSize;
                    var result = cc.EGLView.getInstance()._rpShowAll.apply(cc.EGLView.getInstance(), new cc.Size(this._width, this._height));//designResolutionSize);
                    cc.EGLView.getInstance()._setScaleXYForRenderTexture();
//                    cc.EGLView.getInstance().setFrameSize(designResolutionSize.width, designResolutionSize.height);
//                    if ((cc.EGLView.getInstance())["_adjustSize"]) {
//                        cc.EGLView.getInstance()._adjustSize();
//                    }
                }
            }

            var scene:cc.Scene = cc.Scene.create();
            scene.setAnchorPoint(cc.p(0, 0));
            scene.addChild(soucre);
            //record tranMatrix;
            if (matrix == null) {
                matrix = new Matrix(1, 0, 0, 1, 0, 0);
            }
            var oldTran:cc.AffineTransform = soucre.nodeToParentTransform();
            soucre._transform = matrix;

            scene.draw = (ctx:CanvasRenderingContext2D)=> {
                var color:number = this._fillColor % 0x1000000;
                var alpha:number = this._transparent ? ((this._fillColor >> 24) % 0x100) : 255;
                ctx.fillStyle = tx.Utils.UINT_TO_3STRING(color);
                ctx.globalAlpha = alpha / 255;
                ctx.fillRect(0, 0, this._width, -this._height);
                ctx.globalAlpha = 1;
            };

            var tempNode:cc.Node = new cc.Node();
            scene.addChild(tempNode);
            tempNode.draw = (ctx:CanvasRenderingContext2D)=> {
                this._ImgData = ctx.getImageData(clipRect.x, cc.canvas.height - this._height + clipRect.y, clipRect.width, clipRect.height);

//                for (var i = 0; i < this._ImgData.data.length; i += 4) {
//                    cc.log
//                    this._ImgData.data[i] = 255 - this._ImgData.data[i];
//                    this._ImgData.data[i + 1] = 255 - this._ImgData.data[i + 1];
//                    this._ImgData.data[i + 2] = 255 - this._ImgData.data[i + 2];
//                    this._ImgData.data[i + 3] = 255;
//                }

//                this._temp_ctx.putImageData(this._ImgData, 0, 0);
                this.updateImageEle();

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
        }

        private isInRect(x:number, y:number):Boolean {
            if (x >= 0 && y >= 0 && x <= this._width && y <= this._height) {
                return true;
            }
            else {
                return false;
            }
        }

        public setPixel(x:number, y:number, color:number):void {
            if (this.isInRect(x, y)) {
                x = Math.floor(x);
                y = Math.floor(y);
                var c:cc.Color3B = Utils.COLOR_3B(color);
//            trace(c.r, c.g, c.b);
                this._ImgData.data[(y * this._width + x) * 4] = c.r;
                this._ImgData.data[((y * this._width + x) * 4) + 1] = c.g;
                this._ImgData.data[((y * this._width + x) * 4) + 2] = c.b;
                this._ImgData.data[((y * this._width + x) * 4) + 3] = 1;
                this.updateImageEle();
            }
        }

        public setPixel32(x:number, y:number, color:number):void {
            if (this.isInRect(x, y)) {
                x = Math.floor(x);
                y = Math.floor(y);
                var c:cc.Color4B = Utils.COLOR_4B(color);
//            trace(c.r, c.g, c.b, c.a);
                this._ImgData.data[(y * this._width + x) * 4] = c.r;
                this._ImgData.data[((y * this._width + x) * 4) + 1] = c.g;
                this._ImgData.data[((y * this._width + x) * 4) + 2] = c.b;
                this._ImgData.data[((y * this._width + x) * 4) + 3] = c.a;
                this.updateImageEle();
            }
        }

        public getPixel(x:number, y:number):number {
            var color:cc.Color3B = this.getPixel3B(x, y)
            if (color) {
                return Utils.C3B_TO_UINT(color);
            } else {
                return NaN;
            }
        }

        public getPixel3B(x:number, y:number):cc.Color3B {
            if (this.isInRect(x, y)) {
                x = Math.floor(x);
                y = Math.floor(y);
                var r:number = this._ImgData.data[(y * this._width + x) * 4];
                var g:number = this._ImgData.data[((y * this._width + x) * 4) + 1];
                var b:number = this._ImgData.data[((y * this._width + x) * 4) + 2];
                return new cc.Color3B(r, g, b);
            }
            else {
                return null;
            }
        }

        public getPixel32(x:number, y:number):number {
            var color:cc.Color4B = this.getPixel4B(x, y);
            if (color) {
                return Utils.C4B_TO_UINT(color);
            } else {
                return NaN;
            }
        }

        public getPixel4B(x:number, y:number):cc.Color4B {
            if (this.isInRect(x, y)) {
                x = Math.floor(x);
                y = Math.floor(y);
                var r:number = this._ImgData.data[(y * this._width + x) * 4];
                var g:number = this._ImgData.data[((y * this._width + x) * 4) + 1];
                var b:number = this._ImgData.data[((y * this._width + x) * 4) + 2];
                var a:number = this._ImgData.data[((y * this._width + x) * 4) + 3];
                return new cc.Color4B(r, g, b, a);
            }
            else {
                return null;
            }
        }

        public getBitmapDataByRect(rect:cc.Rect, transparent:Boolean = true, fillColor:number = 0xFFFFFFFF):BitmapData {
            rect = tx.copyR(rect);
            var temp:BitmapData = new BitmapData(rect.width, rect.height, transparent, fillColor);
//            temp._ImgData = this._temp_ctx.createImageData(rect.width, rect.height);
            var startX:number = rect.x > 0 ? rect.x : 0;
            var startY:number = rect.y > 0 ? rect.y : 0;
            var width:number = (rect.width + rect.x) < this._width ? (rect.width + rect.x) : this._width;
            var height:number = (rect.height + rect.y) < this._height ? (rect.height + rect.y) : this._height;
//            trace("fffffffffffffffff", startX, startY, width, height);

            for (var j:number = startY; j < height; j++) {
                for (var i:number = startX; i < width; i++) {
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


        }

        public lock():void {
            this._lock = true;
        }

        public unlock():void {
            if (this._lock == true) {
                this._lock = false;
                this.updateImageEle();

            }
        }

        public _getImgData():ImageData {
            return this._ImgData;
        }

        public _getImageEle():HTMLCanvasElement {
            return this._temp_Canvas;
        }

        public getData():Uint8Array {//CanvasPixelArray {
            return this._ImgData.data;

        }

        public setData(data:Uint8Array):void {//CanvasPixelArray):void {
            this._ImgData.data = data;
            this.updateImageEle();
        }

        updateImageEle():void {
            if (!this._lock) {
                this._temp_ctx.clearRect(0, 0, this._width, this._height);
                this._temp_ctx.putImageData(this._ImgData, 0, 0);
                this.dataId++;
            }
        }

        public getWidth():number {
            return this._width;
        }

        public getHeight():number {
            return this._height;
        }
    }
}
