///<reference path='../ImportTS.d.ts' />
var testCcTx = (function () {
    function testCcTx(root) {
        this._root = root;

        tx.NodeTx.initNodeTx();
        var parent = new cc.Node();
        var child1 = new cc.Node();
        var child2 = new cc.Node();
        var child3 = new cc.Node();
        parent.addChild(child1);
        parent.addChild(child2);
        parent.addChild(child3);
        trace(parent.getChildIndex(child1));
        trace(parent.getChildIndex(child2));
        trace(parent.getChildIndex(child3));
        parent.setChildIndex(child1, 0);
        parent.setChildIndex(child2, 0);
        parent.setChildIndex(child3, 0);

        trace(parent.getChildIndex(child1));
        trace(parent.getChildIndex(child2));
        trace(parent.getChildIndex(child3));
    }
    return testCcTx;
})();
//# sourceMappingURL=testCcTx.js.map
