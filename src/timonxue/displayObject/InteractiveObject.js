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
    var InteractiveObject = (function (_super) {
        __extends(InteractiveObject, _super);
        function InteractiveObject(target) {
            if (typeof target === "undefined") { target = null; }
            _super.call(this, target);
            this._name = typeof (this) + tx.DisplayObject.DisplayObjectCreateNum++;
            this._mouseTouchEventCoprocessor = new tx.MouseTouchEventCoprocessor(this._mc, this);
        }
        InteractiveObject.prototype.initWithLayer = function (mc) {
            this._mc = mc;
            tx.interactiveObjectCreate(mc, this);
        };

        InteractiveObject.prototype.destroy = function () {
            tx.interactiveObjectRemove(this._mc);
            this._mc = null;
            _super.prototype.destroy.call(this);
        };

        InteractiveObject.prototype.getMc = function () {
            return this._mc;
        };

        InteractiveObject.prototype.setName = function (v) {
            this._name = name;
        };

        InteractiveObject.prototype.getName = function () {
            return this._name;
        };

        InteractiveObject.prototype.onMouseDown = function (event) {
        };

        InteractiveObject.prototype.onMouseDragged = function (event) {
        };

        InteractiveObject.prototype.onMouseUp = function (event) {
        };

        InteractiveObject.prototype.onTouchBegan = function (touch, event) {
        };

        InteractiveObject.prototype.onTouchMoved = function (touch, event) {
        };

        InteractiveObject.prototype.onTouchEnded = function (touch, event) {
        };

        InteractiveObject.prototype.onTouchesBegan = function (touch, event) {
        };

        InteractiveObject.prototype.onTouchesMoved = function (touch, event) {
        };

        InteractiveObject.prototype.onTouchesEnded = function (touch, event) {
        };

        InteractiveObject.prototype.onMouseDownTouchBegan = function (pos) {
            this._mouseTouchEventCoprocessor.onMouseDownTouchBegan(pos);
        };

        InteractiveObject.prototype.onMouseTouchEndedUp = function (pos) {
            this._mouseTouchEventCoprocessor.onMouseTouchEndedUp(pos, true);
        };

        InteractiveObject.prototype.onMouseDraggedTouchMove = function (pos) {
            this._mouseTouchEventCoprocessor.onMouseDraggedTouchMove(pos, true);
        };
        return InteractiveObject;
    })(tx.EventDispatcher);
    tx.InteractiveObject = InteractiveObject;
})(tx || (tx = {}));
//# sourceMappingURL=InteractiveObject.js.map
