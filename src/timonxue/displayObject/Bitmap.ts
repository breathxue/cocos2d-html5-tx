///<reference path='../ImportTS.d.ts' />
module tx {
    /**
     * TODO:类功能摘要
     * @author TimonXue
     * @Create Date 2013-4-7
     */
    export class Bitmap extends tx.InteractiveNodeRGBA implements IMouseTouchEvent,IInteractiveObject,IEventDispatcher {
        _bmd:BitmapData;
        private _isTransparent:Boolean;
        _mouseTouchEventCoprocessor:MouseTouchEventCoprocessor;
        _filterOffset:cc.Point;
        _filters:AbstractFilter[];
        _filterSize:cc.Size;
        _currDataId:number;
        _renderBmd:BitmapData;

        constructor(bmd:BitmapData) {
            super();
            this._filterOffset = cc.p(0, 0);
            this._name = typeof(this) + DisplayObject.DisplayObjectCreateNum++;
            this._isTransparent = true;
            this.setBitmapData(bmd);
            this._mouseTouchEventCoprocessor = new tx.MouseTouchEventCoprocessor(this, this._ed);
            this._filters = [];
        }

        public destroy(isDestroyBmd:Boolean = false):void {
            if (this._bmd != null) {
                this._bmd.destroy();
            }
            this._bmd = null;
            super.destroy();
        }

        public setBitmapData(bmd:BitmapData):void {
            this._currDataId = -1;
            this._bmd = bmd;
        }

        public setFilters(arr:AbstractFilter[], offWidth:number = 0, offHeight:number = 0):void {
            this._currDataId = -1;
            this._filters = arr;
            this._filterSize = new cc.Size(offWidth, offHeight);
            this._filterOffset = new cc.Point(-offWidth / 2, -offHeight / 2);
        }

        public getBitmapData():BitmapData {
            return this._bmd;
        }

        public getWidth():number {
            return this._bmd.getWidth() * this.getScaleX();
        }

        public getHeight():number {
            return this._bmd.getHeight() * this.getScaleY();
        }

        public getContentSize():cc.Size
        {
            return new cc.Size(this._bmd.getWidth(),this._bmd.getHeight());
        }

        public draw(ctx:CanvasRenderingContext2D):void {
            //如果不存在滤镜bmd且更新过滤镜和数据内容
            if (!this._renderBmd || this._currDataId != this._bmd.dataId) {

                if (this._filters.length > 0) {
//                    this._renderBmd = this._bmd.clone();
//                    this._renderBmd = new tx.BitmapData(this._bmd.getWidth(),this._bmd.getHeight());
                    this._renderBmd = this._bmd.getBitmapDataByRect(new cc.Rect(-this._filterSize.width / 2, -this._filterSize.height / 2, this._bmd.getWidth() + this._filterSize.width, this._bmd.getHeight() + this._filterSize.height), true, 0)
                    for (var i in this._filters) {
                        this._filters[i].applyFilterWithBmd(this._renderBmd);
                    }
                }
                else {
                    this._renderBmd = this._bmd;
                }
                this._currDataId = this._bmd.dataId;
            }
            this.renderBmd(ctx, this._renderBmd);
        }

        private renderBmd(ctx:CanvasRenderingContext2D, bmd:BitmapData):void {
            if (bmd != null) {
                ctx.globalAlpha = this.getDisplayedOpacity() / 255.0;
                var size:cc.Size = new cc.Size(cc.EGLView.getInstance().getScaleX() * bmd.getWidth(), cc.EGLView.getInstance().getScaleY() * bmd.getHeight());
                var offset:cc.Point = cc.p(this._getOffset().x * cc.EGLView.getInstance().getScaleX(), this._getOffset().y * cc.EGLView.getInstance().getScaleY());
//                ctx.drawImage(bmd._getImageEle(), offset.x,offset.y, size.width,size.height, 0, 0, bmd.getWidth(), bmd.getHeight());
                cc.drawingUtil.drawImage(bmd._getImageEle(), cc.p(0, 0), new cc.Size(bmd.getWidth(), bmd.getHeight()), offset, size);
            }
        }

        public setTransparent(isTransparent:Boolean = true):void {
            this._isTransparent = isTransparent;
        }

        public getTransparent():Boolean {
            return this._isTransparent
        }

        public _getOffset():cc.Point {
            return this._filterOffset;
        }

        public onMouseDownTouchBegan(pos:cc.Point):void {
            var local:cc.Point = this.convertToNodeSpace(pos);
            var offset:cc.Point = cc.p(this._getOffset().x, this._getOffset().y);
            var t:cc.Color4B = this._bmd.getPixel4B(local.x - offset.x, this._bmd.getHeight() - local.y + offset.y);
            if (t && (!this._isTransparent || t.a > 0)) {
                this._mouseTouchEventCoprocessor.onMouseDownTouchBegan(pos);
            }
        }

        public onMouseTouchEndedUp(pos:cc.Point):void {
            var local:cc.Point = this.convertToNodeSpace(pos);
            var offset:cc.Point = cc.p(this._getOffset().x, this._getOffset().y);
            var t:cc.Color4B = this._bmd.getPixel4B(local.x - offset.x, this._bmd.getHeight() - local.y + offset.y);
            this._mouseTouchEventCoprocessor.onMouseTouchEndedUp(pos, t && (!this._isTransparent || t.a > 0));
        }


        public onMouseDraggedTouchMove(pos:cc.Point):void {
            var local:cc.Point = this.convertToNodeSpace(pos);
            var offset:cc.Point = cc.p(this._getOffset().x, this._getOffset().y);
            var t:cc.Color4B = this._bmd.getPixel4B(local.x - offset.x, this._bmd.getHeight() - local.y + offset.y);
            this._mouseTouchEventCoprocessor.onMouseDraggedTouchMove(pos, t && (!this._isTransparent || t.a > 0));
        }
    }
}