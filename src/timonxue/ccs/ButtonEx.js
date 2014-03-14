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
    var ButtonEx = (function (_super) {
        __extends(ButtonEx, _super);
        /******************/
        function ButtonEx(button) {
            _super.call(this, button);
            this._parentTouchEnabled = true;
            this._meTouchEnabled = true;
            this.button = button;
        }
        ButtonEx.prototype.goLock = function () {
            this.button.setBright(false);
            this.setMeTouchEnabled(false);
        };

        ButtonEx.prototype.unLock = function () {
            this.button.setBright(true);
            this.setMeTouchEnabled(true);
        };

        ButtonEx.prototype.setParentTouchEnabled = function (v) {
            this._parentTouchEnabled = v;
            this.button.setTouchEnabled(this._parentTouchEnabled && this._meTouchEnabled);
        };

        ButtonEx.prototype.setMeTouchEnabled = function (v) {
            this._meTouchEnabled = v;
            this.button.setTouchEnabled(this._parentTouchEnabled && this._meTouchEnabled);
        };
        return ButtonEx;
    })(tx.WidgetEx);
    tx.ButtonEx = ButtonEx;
})(tx || (tx = {}));
//# sourceMappingURL=ButtonEx.js.map
