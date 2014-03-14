///<reference path='../ImportTS.d.ts' />
var TestEvent = (function () {
    function TestEvent(root) {
        this._root = root;

        var ed = new tx.EventDispatcher();
        ed.addEventListener("event", this.listnerHander, this);
        ed.dispatchEvent(new tx.Event("event"));

        //
        ed.removeEventListener("event", this.listnerHander);
        trace("removeOK");
        ed.dispatchEvent(new tx.Event("event"));
    }
    TestEvent.prototype.listnerHander = function (e) {
        trace("onHander", e.listener._root);
        trace("onHander2", this._root);
    };
    return TestEvent;
})();
//# sourceMappingURL=TestEvent.js.map
