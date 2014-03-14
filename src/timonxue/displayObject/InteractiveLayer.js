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
    var InteractiveLayer = (function (_super) {
        __extends(InteractiveLayer, _super);
        function InteractiveLayer() {
            _super.call(this);
            this._name = typeof (this) + tx.DisplayObject.DisplayObjectCreateNum++;
            this._mouseEnable = false;
            this._ed = new tx.EventDispatcher(this);
            this.setMouseTouchEnabled(true);
            this._mouseTouchEventCoprocessor = new tx.MouseTouchEventCoprocessor(this, this._ed);
        }
        InteractiveLayer.prototype.destroy = function () {
            this._ed.destroy();
            this._ed = null;
        };

        InteractiveLayer.prototype.setMouseTouchEnabled = function (b) {
            if (this._mouseEnable != b) {
                this._mouseEnable = b;
                if (b) {
                    tx.interactiveObjectCreate(this, this);
                } else {
                    tx.interactiveObjectRemove(this);
                }
            }
        };

        InteractiveLayer.prototype.getWidth = function () {
            return this.getBoundingBox().width;
        };

        InteractiveLayer.prototype.getHeight = function () {
            return this.getBoundingBox().height;
        };

        InteractiveLayer.prototype.setWidth = function (v) {
            this.setScaleX(v / this.getContentSize().width);
        };

        InteractiveLayer.prototype.setHeight = function (v) {
            this.setScaleY(v / this.getContentSize().height);
        };

        InteractiveLayer.prototype.getMouseTouchEnabled = function () {
            return this._mouseEnable;
        };

        InteractiveLayer.prototype.getMc = function () {
            return this;
        };

        InteractiveLayer.prototype.setName = function (v) {
            this._name = name;
        };

        InteractiveLayer.prototype.getName = function () {
            return this._name;
        };

        InteractiveLayer.prototype.addEventListener = function (eventType, theHandler, listener) {
            if (typeof listener === "undefined") { listener = null; }
            this._ed.addEventListener(eventType, theHandler, listener);
        };

        // remove a listener
        InteractiveLayer.prototype.removeEventListener = function (eventType, theHandler) {
            this._ed.removeEventListener(eventType, theHandler);
        };

        // remove all listeners
        InteractiveLayer.prototype.removeAllListeners = function (eventType) {
            this._ed.removeAllListeners(eventType);
        };

        InteractiveLayer.prototype.hasEventListener = function (eventType) {
            return this._ed.hasEventListener(eventType);
        };

        // dispatch event to all listeners
        InteractiveLayer.prototype.dispatchEvent = function (theEvent) {
            this._ed.dispatchEvent(theEvent);
        };

        // send event to a handler
        InteractiveLayer.prototype.dispatchEventToHander = function (theEvent, theHandler) {
            this._ed.dispatchEventToHander(theEvent, theHandler);
        };

        InteractiveLayer.prototype.onMouseDownTouchBegan = function (pos) {
            this._mouseTouchEventCoprocessor.onMouseDownTouchBegan(pos);
        };

        InteractiveLayer.prototype.onMouseTouchEndedUp = function (pos) {
            this._mouseTouchEventCoprocessor.onMouseTouchEndedUp(pos, true);
        };

        InteractiveLayer.prototype.onMouseDraggedTouchMove = function (pos) {
            this._mouseTouchEventCoprocessor.onMouseDraggedTouchMove(pos, true);
        };
        return InteractiveLayer;
    })(cc.Layer);
    tx.InteractiveLayer = InteractiveLayer;
})(tx || (tx = {}));
//# sourceMappingURL=InteractiveLayer.js.map
