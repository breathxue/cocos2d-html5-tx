///<reference path='../ImportTS.d.ts' />
/**
* Created with JetBrains WebStorm.
* User: timonxue
* Date: 13-9-27
* Time: 下午3:47
* To change this template use File | Settings | File Templates.
*/
var tx;
(function (tx) {
    /**
    * TODO:类功能摘要
    * @author TimonXue
    * @Create Date 2013-4-7
    */
    var Event = (function () {
        function Event(type) {
            this.type = type;
        }
        Event.prototype.clone = function () {
            var t = new tx.Event(this.type);
            t.target = this.target;
            t.listener = this.listener;
            return t;
        };

        Event.prototype.destroy = function () {
            this.target = null;
            this.listener = null;
        };
        Event.ENTER_FRAME = "ENTER_FRAME";
        Event.COMPLETE = "COMPLETE";
        Event.CHANGE = "CHANGE";
        Event.SELECT = "SELECT";
        return Event;
    })();
    tx.Event = Event;
})(tx || (tx = {}));
//# sourceMappingURL=Event.js.map
