///<reference path='../ImportTS.d.ts' />
var TestBitmap = (function () {
    function TestBitmap(root) {
        this._root = root;

        //        this.testOpacity();
        this.testMouseEvent();
        //        var t3 = new tx.Bitmap(tx.Attach.getBitmapData("aaaa",true,tx.Attach.getSprite("crystals/0.png", s_crystalsList)));
        //        t3.setPosition(cc.p(300, 200));
        //        this._root.addChild(t3);
    }
    TestBitmap.prototype.testMouseEvent = function () {
        var t1 = new tx.Bitmap(tx.Attach.getBitmapData("crystals/0.png", true, s_crystalsList));
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

    TestBitmap.prototype.onMouseTouchBegin = function () {
        trace("testBitmap", "onMouseTouchBegin");
    };

    TestBitmap.prototype.onMouseTouchEnded = function () {
        trace("testBitmap", "onMouseTouchEnded");
    };

    TestBitmap.prototype.onMouseTouchMove = function () {
        trace("testBitmap", "onMouseTouchMove");
    };

    TestBitmap.prototype.onMouseTouchOver = function () {
        trace("testBitmap", "onMouseTouchOver");
    };

    TestBitmap.prototype.onMouseTouchOut = function () {
        trace("testBitmap", "onMouseTouchOut");
    };

    TestBitmap.prototype.testOpacity = function () {
        var t1 = new tx.Bitmap(tx.Attach.getBitmapData("crystals/0.png", true, s_crystalsList));
        t1.setPosition(cc.p(200, 200));
        t1.setCascadeOpacityEnabled(true);
        t1.setOpacity(127);
        var t2 = new tx.Bitmap(tx.Attach.getBitmapData(s_crystalsPng));
        t2.setPosition(cc.p(200, 0));
        t2.setOpacity(127);
        t1.addChild(t2);
        this._root.addChild(t1);
        //        t1.setOpacity(127);
    };
    return TestBitmap;
})();
//# sourceMappingURL=TestBitmap.js.map
