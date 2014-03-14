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
    var WidgetEx = (function (_super) {
        __extends(WidgetEx, _super);
        function WidgetEx(widget) {
            _super.call(this);
            this.widget = widget;
            this._mouseTouchEventCoprocessor = new tx.MouseTouchEventCoprocessor(this.widget, this);
            this.initEvent();
        }
        WidgetEx.prototype.destroy = function () {
            this.widget.addTouchEventListener(function () {
            }, this);
            this._mouseTouchEventCoprocessor.destroy();
            this._mouseTouchEventCoprocessor = null;
            this.widget = null;
            _super.prototype.destroy.call(this);
        };

        WidgetEx.prototype.initEvent = function (event) {
            if (typeof event === "undefined") { event = null; }
            this.widget.addTouchEventListener(this.onTouchEvent, this);
        };

        WidgetEx.prototype.onTouchEvent = function (obj, type) {
            var local;
            var pos;
            switch (type) {
                case ccs.TouchEventType.began:
                    local = this.widget.getTouchStartPos();
                    pos = this.widget.convertToWorldSpace(local);
                    this._mouseTouchEventCoprocessor.onMouseDownTouchBegan(pos);
                    break;
                case ccs.TouchEventType.ended:
                    local = this.widget.getTouchEndPos();
                    pos = this.widget.convertToWorldSpace(local);
                    this._mouseTouchEventCoprocessor.onMouseTouchEndedUp(pos, this.widget.hitTest(local));
                    break;
                case ccs.TouchEventType.moved:
                    local = this.widget.getTouchEndPos();
                    pos = this.widget.convertToWorldSpace(local);
                    this._mouseTouchEventCoprocessor.onMouseDraggedTouchMove(pos, this.widget.hitTest(local));
                    break;
            }
        };
        return WidgetEx;
    })(tx.EventDispatcher);
    tx.WidgetEx = WidgetEx;
})(tx || (tx = {}));
//# sourceMappingURL=WidgetEx.js.map
