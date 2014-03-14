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
    var MouseTouchEventCoprocessor = (function () {
        function MouseTouchEventCoprocessor(obj, ed) {
            this._obj = obj;
            this._ed = ed;
            this._isOver = false;
        }
        MouseTouchEventCoprocessor.prototype.destroy = function () {
            this._obj = null;
            this._ed = null;
        };

        MouseTouchEventCoprocessor.prototype.onMouseDownTouchBegan = function (pos) {
            var local = this._obj.convertToNodeSpace(pos);
            var e = new tx.MouseTouchEvent(tx.MouseTouchEvent.MOUSE_DOWN_TOUCH_BEGAN, local, pos);
            this._ed.dispatchEvent(e);
            if (!this._isOver) {
                this._isOver = true;
                var e = new MouseTouchEvent(MouseTouchEvent.MOUSE_TOUCH_OVER, local, pos);
                this._ed.dispatchEvent(e);
            }
        };

        MouseTouchEventCoprocessor.prototype.onMouseTouchEndedUp = function (pos, isInRect) {
            var local = this._obj.convertToNodeSpace(pos);
            if (isInRect) {
                var e = new MouseTouchEvent(MouseTouchEvent.MOUSE_UP_TOUCH_ENDED, local, pos);
                this._ed.dispatchEvent(e);
                if (this._isOver) {
                    this._isOver = false;
                    var e = new MouseTouchEvent(MouseTouchEvent.MOUSE_TOUCH_OUT, local, pos);
                    this._ed.dispatchEvent(e);
                }
            } else {
                if (this._isOver) {
                    this._isOver = false;
                    var e = new MouseTouchEvent(MouseTouchEvent.MOUSE_TOUCH_OUT, local, pos);
                    this._ed.dispatchEvent(e);
                    var e = new MouseTouchEvent(MouseTouchEvent.MOUSE_TOUCH_CLICK, local, pos);
                    this._ed.dispatchEvent(e);
                }
            }
        };

        MouseTouchEventCoprocessor.prototype.onMouseDraggedTouchMove = function (pos, isInRect) {
            var local = this._obj.convertToNodeSpace(pos);
            if (isInRect) {
                var e = new MouseTouchEvent(MouseTouchEvent.MOUSE_DRAGGED_TOUCH_MOVE, local, pos);
                this._ed.dispatchEvent(e);
                if (!this._isOver) {
                    this._isOver = true;
                    var e = new MouseTouchEvent(MouseTouchEvent.MOUSE_TOUCH_OVER, local, pos);
                    this._ed.dispatchEvent(e);
                }
            } else {
                if (this._isOver) {
                    this._isOver = false;
                    var e = new MouseTouchEvent(MouseTouchEvent.MOUSE_TOUCH_OUT, local, pos);
                    this._ed.dispatchEvent(e);
                }
            }
        };
        return MouseTouchEventCoprocessor;
    })();
    tx.MouseTouchEventCoprocessor = MouseTouchEventCoprocessor;
    var MouseTouchEvent = (function (_super) {
        __extends(MouseTouchEvent, _super);
        function MouseTouchEvent(type, pos, worldPos) {
            _super.call(this, type);
            this.pos = cc.p(pos.x, pos.y);
            this.worldPos = worldPos;
        }
        MouseTouchEvent.prototype.destroy = function () {
            this.pos = null;
            this.worldPos = null;
            _super.prototype.destroy.call(this);
        };
        MouseTouchEvent.MOUSE_DOWN_TOUCH_BEGAN = "MOUSE_DOWN_TOUCH_BEGAN";
        MouseTouchEvent.MOUSE_UP_TOUCH_ENDED = "MOUSE_UP_TOUCH_ENDED";
        MouseTouchEvent.MOUSE_DRAGGED_TOUCH_MOVE = "MOUSE_DRAGGED_TOUCH_MOVE";
        MouseTouchEvent.MOUSE_TOUCH_OVER = "MOUSE_TOUCH_OVER";
        MouseTouchEvent.MOUSE_TOUCH_OUT = "MOUSE_TOUCH_OUT";
        MouseTouchEvent.MOUSE_TOUCH_CLICK = "MOUSE_TOUCH_CLICK";
        return MouseTouchEvent;
    })(tx.Event);
    tx.MouseTouchEvent = MouseTouchEvent;
})(tx || (tx = {}));
//# sourceMappingURL=MouseTouchEvent.js.map
