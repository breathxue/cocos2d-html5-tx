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
    var InteractiveNodeRGBA = (function (_super) {
        __extends(InteractiveNodeRGBA, _super);
        function InteractiveNodeRGBA() {
            _super.call(this);
            this._name = typeof (this) + tx.DisplayObject.DisplayObjectCreateNum++;
            this._mouseEnable = false;
            this._ed = new tx.EventDispatcher(this);
            this._touchLayer = cc.Layer.create();
            this.addChild(this._touchLayer);
            this._mouseTouchEventCoprocessor = new tx.MouseTouchEventCoprocessor(this, this._ed);
        }
        InteractiveNodeRGBA.prototype.destroy = function () {
            this.removeChild(this._touchLayer);
            this._touchLayer = null;
            this._ed.destroy();
            this._ed = null;
        };

        InteractiveNodeRGBA.prototype.setMouseTouchEnabled = function (b) {
            if (this._mouseEnable != b) {
                this._mouseEnable = b;
                if (b) {
                    tx.interactiveObjectCreate(this._touchLayer, this);
                } else {
                    tx.interactiveObjectRemove(this._touchLayer);
                }
            }
        };

        InteractiveNodeRGBA.prototype.getMouseTouchEnabled = function () {
            return this._mouseEnable;
        };

        InteractiveNodeRGBA.prototype.getTouchLayer = function () {
            return this._touchLayer;
        };

        InteractiveNodeRGBA.prototype.getWidth = function () {
            return this.getBoundingBox().width;
        };

        InteractiveNodeRGBA.prototype.getHeight = function () {
            return this.getBoundingBox().height;
        };

        InteractiveNodeRGBA.prototype.setWidth = function (v) {
            this.setScaleX(v / this.getContentSize().width);
        };

        InteractiveNodeRGBA.prototype.setHeight = function (v) {
            this.setScaleY(v / this.getContentSize().height);
        };

        InteractiveNodeRGBA.prototype.getMc = function () {
            return this;
        };

        InteractiveNodeRGBA.prototype.setName = function (v) {
            this._name = name;
        };

        InteractiveNodeRGBA.prototype.getName = function () {
            return this._name;
        };

        InteractiveNodeRGBA.prototype.addEventListener = function (eventType, theHandler, listener) {
            if (typeof listener === "undefined") { listener = null; }
            this._ed.addEventListener(eventType, theHandler, listener);
        };

        // remove a listener
        InteractiveNodeRGBA.prototype.removeEventListener = function (eventType, theHandler) {
            this._ed.removeEventListener(eventType, theHandler);
        };

        // remove all listeners
        InteractiveNodeRGBA.prototype.removeAllListeners = function (eventType) {
            this._ed.removeAllListeners(eventType);
        };

        InteractiveNodeRGBA.prototype.hasEventListener = function (eventType) {
            return this._ed.hasEventListener(eventType);
        };

        // dispatch event to all listeners
        InteractiveNodeRGBA.prototype.dispatchEvent = function (theEvent) {
            this._ed.dispatchEvent(theEvent);
        };

        // send event to a handler
        InteractiveNodeRGBA.prototype.dispatchEventToHander = function (theEvent, theHandler) {
            this._ed.dispatchEventToHander(theEvent, theHandler);
        };

        InteractiveNodeRGBA.prototype.onMouseDown = function (event) {
        };

        InteractiveNodeRGBA.prototype.onMouseDragged = function (event) {
        };

        InteractiveNodeRGBA.prototype.onMouseUp = function (event) {
        };

        InteractiveNodeRGBA.prototype.onTouchBegan = function (touch, event) {
        };

        InteractiveNodeRGBA.prototype.onTouchMoved = function (touch, event) {
        };

        InteractiveNodeRGBA.prototype.onTouchEnded = function (touch, event) {
        };

        InteractiveNodeRGBA.prototype.onTouchesBegan = function (touch, event) {
        };

        InteractiveNodeRGBA.prototype.onTouchesMoved = function (touch, event) {
        };

        InteractiveNodeRGBA.prototype.onTouchesEnded = function (touch, event) {
        };

        InteractiveNodeRGBA.prototype.onMouseDownTouchBegan = function (pos) {
            this._mouseTouchEventCoprocessor.onMouseDownTouchBegan(pos);
        };

        InteractiveNodeRGBA.prototype.onMouseTouchEndedUp = function (pos) {
            this._mouseTouchEventCoprocessor.onMouseTouchEndedUp(pos, true);
        };

        InteractiveNodeRGBA.prototype.onMouseDraggedTouchMove = function (pos) {
            this._mouseTouchEventCoprocessor.onMouseDraggedTouchMove(pos, true);
        };
        return InteractiveNodeRGBA;
    })(cc.NodeRGBA);
    tx.InteractiveNodeRGBA = InteractiveNodeRGBA;
})(tx || (tx = {}));
//# sourceMappingURL=InteractiveNodeRGBA.js.map
