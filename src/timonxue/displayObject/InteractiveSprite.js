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
    var InteractiveSprite = (function (_super) {
        __extends(InteractiveSprite, _super);
        function InteractiveSprite() {
            _super.call(this);
            this._name = typeof (this) + tx.DisplayObject.DisplayObjectCreateNum++;
            this._mouseEnable = false;
            this._ed = new tx.EventDispatcher(this);
            this._touchLayer = cc.Layer.create();
            this.addChild(this._touchLayer);
            this._mouseTouchEventCoprocessor = new tx.MouseTouchEventCoprocessor(this, this._ed);
        }
        InteractiveSprite.createWithSpriteFrame = function (spriteFrame) {
            var sprite = new InteractiveSprite();
            if (sprite && sprite.initWithSpriteFrame(spriteFrame)) {
                return sprite;
            }
            return null;
        };

        InteractiveSprite.createWithTexture = function (texture) {
            var sprite = new InteractiveSprite();
            if (sprite && sprite.initWithTexture(texture)) {
                return sprite;
            }
            return null;
        };

        InteractiveSprite.prototype.destroy = function () {
            this.removeChild(this._touchLayer);
            this._touchLayer = null;
            this._ed.destroy();
            this._ed = null;
        };

        InteractiveSprite.prototype.setMouseTouchEnabled = function (b) {
            if (this._mouseEnable != b) {
                this._mouseEnable = b;
                if (b) {
                    tx.interactiveObjectCreate(this._touchLayer, this);
                } else {
                    tx.interactiveObjectRemove(this._touchLayer);
                }
            }
        };

        InteractiveSprite.prototype.getMouseTouchEnabled = function () {
            return this._mouseEnable;
        };

        InteractiveSprite.prototype.getTouchLayer = function () {
            return this._touchLayer;
        };

        InteractiveSprite.prototype.getWidth = function () {
            return this.getBoundingBox().width;
        };

        InteractiveSprite.prototype.getHeight = function () {
            return this.getBoundingBox().height;
        };

        InteractiveSprite.prototype.setWidth = function (v) {
            this.setScaleX(v / this.getContentSize().width);
        };

        InteractiveSprite.prototype.setHeight = function (v) {
            this.setScaleY(v / this.getContentSize().height);
        };

        InteractiveSprite.prototype.getMc = function () {
            return this;
        };

        InteractiveSprite.prototype.setName = function (v) {
            this._name = v;
        };

        InteractiveSprite.prototype.getName = function () {
            return this._name;
        };

        InteractiveSprite.prototype.addEventListener = function (eventType, theHandler, listener) {
            if (typeof listener === "undefined") { listener = null; }
            this._ed.addEventListener(eventType, theHandler, listener);
        };

        // remove a listener
        InteractiveSprite.prototype.removeEventListener = function (eventType, theHandler) {
            this._ed.removeEventListener(eventType, theHandler);
        };

        // remove all listeners
        InteractiveSprite.prototype.removeAllListeners = function (eventType) {
            this._ed.removeAllListeners(eventType);
        };

        InteractiveSprite.prototype.hasEventListener = function (eventType) {
            return this._ed.hasEventListener(eventType);
        };

        // dispatch event to all listeners
        InteractiveSprite.prototype.dispatchEvent = function (theEvent) {
            this._ed.dispatchEvent(theEvent);
        };

        // send event to a handler
        InteractiveSprite.prototype.dispatchEventToHander = function (theEvent, theHandler) {
            this._ed.dispatchEventToHander(theEvent, theHandler);
        };

        InteractiveSprite.prototype.onMouseDown = function (event) {
        };

        InteractiveSprite.prototype.onMouseDragged = function (event) {
        };

        InteractiveSprite.prototype.onMouseUp = function (event) {
        };

        InteractiveSprite.prototype.onTouchBegan = function (touch, event) {
        };

        InteractiveSprite.prototype.onTouchMoved = function (touch, event) {
        };

        InteractiveSprite.prototype.onTouchEnded = function (touch, event) {
        };

        InteractiveSprite.prototype.onTouchesBegan = function (touch, event) {
        };

        InteractiveSprite.prototype.onTouchesMoved = function (touch, event) {
        };

        InteractiveSprite.prototype.onTouchesEnded = function (touch, event) {
        };

        InteractiveSprite.prototype.isInRect = function (x, y, rect) {
            if (x >= 0 && y >= 0 && x <= rect.width && y <= rect.height) {
                return true;
            } else {
                return false;
            }
        };

        InteractiveSprite.prototype.onMouseDownTouchBegan = function (pos) {
            var local = this.convertToNodeSpace(pos);
            var rect = this.getBoundingBox();
            var offset = this._unflippedOffsetPositionFromCenter;
            if (this.isInRect(local.x - offset.x, local.y - offset.y, rect)) {
                this._mouseTouchEventCoprocessor.onMouseDownTouchBegan(pos);
            }
        };

        InteractiveSprite.prototype.onMouseTouchEndedUp = function (pos) {
            var local = this.convertToNodeSpace(pos);
            var rect = this.getBoundingBox();
            var offset = this._unflippedOffsetPositionFromCenter;
            this._mouseTouchEventCoprocessor.onMouseTouchEndedUp(pos, this.isInRect(local.x - offset.x, local.y - offset.y, rect));
        };

        InteractiveSprite.prototype.onMouseDraggedTouchMove = function (pos) {
            var local = this.convertToNodeSpace(pos);
            var rect = this.getBoundingBox();
            var offset = this._unflippedOffsetPositionFromCenter;
            this._mouseTouchEventCoprocessor.onMouseDraggedTouchMove(pos, this.isInRect(local.x - offset.x, local.y - offset.y, rect));
        };
        return InteractiveSprite;
    })(cc.Sprite);
    tx.InteractiveSprite = InteractiveSprite;
})(tx || (tx = {}));
//# sourceMappingURL=InteractiveSprite.js.map
