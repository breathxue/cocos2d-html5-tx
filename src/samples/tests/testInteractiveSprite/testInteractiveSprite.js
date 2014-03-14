///<reference path='../ImportTS.d.ts' />
var testInteractiveSprite = (function () {
    function testInteractiveSprite(root) {
        this._root = root;

        this.testMouseEvent();
    }
    testInteractiveSprite.prototype.testMouseEvent = function () {
        var t1 = tx.Attach.getInteractiveSprite("guoBg0150");
        t1.setPosition(cc.p(200, 200));
        t1.setMouseTouchEnabled(true);
        t1.addEventListener(tx.MouseTouchEvent.MOUSE_DOWN_TOUCH_BEGAN, this.onMouseTouchBegin);
        t1.addEventListener(tx.MouseTouchEvent.MOUSE_UP_TOUCH_ENDED, this.onMouseTouchEnded);
        t1.addEventListener(tx.MouseTouchEvent.MOUSE_DRAGGED_TOUCH_MOVE, this.onMouseTouchMove);
        t1.addEventListener(tx.MouseTouchEvent.MOUSE_TOUCH_OVER, this.onMouseTouchOver);
        t1.addEventListener(tx.MouseTouchEvent.MOUSE_TOUCH_OUT, this.onMouseTouchOut);

        //        tx.DragObject.SetInteractiveObjectToDragObject(t1);
        tx.DragObject.SetToDragObject(t1);

        //        tx.DragObject.SetToDragObject(t1.getTouchLayer(),t1);
        this._root.addChild(t1);
    };

    testInteractiveSprite.prototype.onMouseTouchBegin = function () {
        trace("testBitmap", "onMouseTouchBegin");
    };

    testInteractiveSprite.prototype.onMouseTouchEnded = function () {
        trace("testBitmap", "onMouseTouchEnded");
    };

    testInteractiveSprite.prototype.onMouseTouchMove = function () {
        trace("testBitmap", "onMouseTouchMove");
    };

    testInteractiveSprite.prototype.onMouseTouchOver = function () {
        trace("testBitmap", "onMouseTouchOver");
    };

    testInteractiveSprite.prototype.onMouseTouchOut = function () {
        trace("testBitmap", "onMouseTouchOut");
    };
    return testInteractiveSprite;
})();
//# sourceMappingURL=testInteractiveSprite.js.map
