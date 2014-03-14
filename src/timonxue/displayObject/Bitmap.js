var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
///<reference path='../ImportTS.d.ts' />
var tx;
(function (tx) {
    /**
    * TODO:类功能摘要
    * @author TimonXue
    * @Create Date 2013-4-7
    */
    var Bitmap = (function (_super) {
        __extends(Bitmap, _super);
        function Bitmap(bmd) {
            _super.call(this);
            this._filterOffset = cc.p(0, 0);
            this._name = typeof (this) + tx.DisplayObject.DisplayObjectCreateNum++;
            this._isTransparent = true;
            this.setBitmapData(bmd);
            this._mouseTouchEventCoprocessor = new tx.MouseTouchEventCoprocessor(this, this._ed);
            this._filters = [];
        }
        Bitmap.prototype.destroy = function (isDestroyBmd) {
            if (typeof isDestroyBmd === "undefined") { isDestroyBmd = false; }
            if (this._bmd != null) {
                this._bmd.destroy();
            }
            this._bmd = null;
            _super.prototype.destroy.call(this);
        };

        Bitmap.prototype.setBitmapData = function (bmd) {
            this._currDataId = -1;
            this._bmd = bmd;
        };

        Bitmap.prototype.setFilters = function (arr, offWidth, offHeight) {
            if (typeof offWidth === "undefined") { offWidth = 0; }
            if (typeof offHeight === "undefined") { offHeight = 0; }
            this._currDataId = -1;
            this._filters = arr;
            this._filterSize = new cc.Size(offWidth, offHeight);
            this._filterOffset = new cc.Point(-offWidth / 2, -offHeight / 2);
        };

        Bitmap.prototype.getBitmapData = function () {
            return this._bmd;
        };

        Bitmap.prototype.getWidth = function () {
            return this._bmd.getWidth() * this.getScaleX();
        };

        Bitmap.prototype.getHeight = function () {
            return this._bmd.getHeight() * this.getScaleY();
        };

        Bitmap.prototype.getContentSize = function () {
            return new cc.Size(this._bmd.getWidth(), this._bmd.getHeight());
        };

        Bitmap.prototype.draw = function (ctx) {
            //如果不存在滤镜bmd且更新过滤镜和数据内容
            if (!this._renderBmd || this._currDataId != this._bmd.dataId) {
                if (this._filters.length > 0) {
                    //                    this._renderBmd = this._bmd.clone();
                    //                    this._renderBmd = new tx.BitmapData(this._bmd.getWidth(),this._bmd.getHeight());
                    this._renderBmd = this._bmd.getBitmapDataByRect(new cc.Rect(-this._filterSize.width / 2, -this._filterSize.height / 2, this._bmd.getWidth() + this._filterSize.width, this._bmd.getHeight() + this._filterSize.height), true, 0);
                    for (var i in this._filters) {
                        this._filters[i].applyFilterWithBmd(this._renderBmd);
                    }
                } else {
                    this._renderBmd = this._bmd;
                }
                this._currDataId = this._bmd.dataId;
            }
            this.renderBmd(ctx, this._renderBmd);
        };

        Bitmap.prototype.renderBmd = function (ctx, bmd) {
            if (bmd != null) {
                ctx.globalAlpha = this.getDisplayedOpacity() / 255.0;
                var size = new cc.Size(cc.EGLView.getInstance().getScaleX() * bmd.getWidth(), cc.EGLView.getInstance().getScaleY() * bmd.getHeight());
                var offset = cc.p(this._getOffset().x * cc.EGLView.getInstance().getScaleX(), this._getOffset().y * cc.EGLView.getInstance().getScaleY());

                //                ctx.drawImage(bmd._getImageEle(), offset.x,offset.y, size.width,size.height, 0, 0, bmd.getWidth(), bmd.getHeight());
                cc.drawingUtil.drawImage(bmd._getImageEle(), cc.p(0, 0), new cc.Size(bmd.getWidth(), bmd.getHeight()), offset, size);
            }
        };

        Bitmap.prototype.setTransparent = function (isTransparent) {
            if (typeof isTransparent === "undefined") { isTransparent = true; }
            this._isTransparent = isTransparent;
        };

        Bitmap.prototype.getTransparent = function () {
            return this._isTransparent;
        };

        Bitmap.prototype._getOffset = function () {
            return this._filterOffset;
        };

        Bitmap.prototype.onMouseDownTouchBegan = function (pos) {
            var local = this.convertToNodeSpace(pos);
            var offset = cc.p(this._getOffset().x, this._getOffset().y);
            var t = this._bmd.getPixel4B(local.x - offset.x, this._bmd.getHeight() - local.y + offset.y);
            if (t && (!this._isTransparent || t.a > 0)) {
                this._mouseTouchEventCoprocessor.onMouseDownTouchBegan(pos);
            }
        };

        Bitmap.prototype.onMouseTouchEndedUp = function (pos) {
            var local = this.convertToNodeSpace(pos);
            var offset = cc.p(this._getOffset().x, this._getOffset().y);
            var t = this._bmd.getPixel4B(local.x - offset.x, this._bmd.getHeight() - local.y + offset.y);
            this._mouseTouchEventCoprocessor.onMouseTouchEndedUp(pos, t && (!this._isTransparent || t.a > 0));
        };

        Bitmap.prototype.onMouseDraggedTouchMove = function (pos) {
            var local = this.convertToNodeSpace(pos);
            var offset = cc.p(this._getOffset().x, this._getOffset().y);
            var t = this._bmd.getPixel4B(local.x - offset.x, this._bmd.getHeight() - local.y + offset.y);
            this._mouseTouchEventCoprocessor.onMouseDraggedTouchMove(pos, t && (!this._isTransparent || t.a > 0));
        };
        return Bitmap;
    })(tx.InteractiveNodeRGBA);
    tx.Bitmap = Bitmap;
})(tx || (tx = {}));
//# sourceMappingURL=Bitmap.js.map
