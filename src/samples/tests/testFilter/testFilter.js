///<reference path='../ImportTS.d.ts' />
var testFilter = (function () {
    function testFilter(root) {
        this._root = root;

        //        this.testOpacity();
        //        this.testMouseEvent();
        var t3 = new tx.Bitmap(tx.Attach.getBitmapData("aaaa", true, tx.Attach.getSprite("crystals.png")));
        t3.setPosition(cc.p(100, 200));
        this._root.addChild(t3);

        var t3 = new tx.Bitmap(tx.Attach.getBitmapData("bbbb", true, tx.Attach.getSprite("crystals.png")));
        t3.setPosition(cc.p(300, 200));

        //        t3.setFilters([new tx.GaussBlurFilter(5,5)]);
        //        t3.setFilters([new tx.BlurFilter(5, 5, 1)]);
        var color = 0xff0000;
        var alpha = 1;
        var blurX = 10;
        var blurY = 10;
        var strength = 2;
        var quality = 2;
        var inner = true;
        var knockout = true;
        var _glowFilter1 = new tx.GlowFilter(color, alpha, blurX, blurY, strength, quality, inner, knockout);

        //
        var color = 0xff0000;
        var alpha = 1;
        var blurX = 10;
        var blurY = 10;
        var strength = 2;
        var quality = 2;
        var inner = false;
        var knockout = false;
        var _glowFilter2 = new tx.GlowFilter(color, alpha, blurX, blurY, strength, quality, inner, knockout);
        t3.setFilters([_glowFilter2, _glowFilter1], 10, 10);

        //        var distance = 6;
        //        var angle = 60;
        //        var color = 0xFFFFFF;
        //        var alpha = 0.5;
        //        var blurX = 10;
        //        var blurY = 10;
        //        var strength = 2;
        //        var quality = 2;
        //        var inner = false;
        //        var knockout = false;
        //        var hideObject = false;
        //        var _dropShadowFilter = new tx.DropShadowFilter(distance, angle, color, alpha, blurX, blurY, strength, quality, inner, knockout, hideObject);
        //        t3.setFilters([_dropShadowFilter]);
        //        t3.setFilters([new tx.ColorFilter(0,0,0,1, 0,0,255,0)]);
        //        var matrix = new tx.ColorMatrix().adjustHue(180).adjustSaturation(-100);
        //        t3.setFilters([new tx.ColorMatrixFilter(matrix)]);
        //        t3.setFilters([new tx.NegativesFilter()]);
        //        t3.setFilters([new tx.BlackFilter()]);
        //        t3.setFilters([new tx.CameoFilter()]);
        //        t3.setFilters([new tx.SpreadFilter()]);
        this._root.addChild(t3);
    }
    testFilter.prototype.testMouseEvent = function () {
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

    testFilter.prototype.onMouseTouchBegin = function () {
        trace("testBitmap", "onMouseTouchBegin");
    };

    testFilter.prototype.onMouseTouchEnded = function () {
        trace("testBitmap", "onMouseTouchEnded");
    };

    testFilter.prototype.onMouseTouchMove = function () {
        trace("testBitmap", "onMouseTouchMove");
    };

    testFilter.prototype.onMouseTouchOver = function () {
        trace("testBitmap", "onMouseTouchOver");
    };

    testFilter.prototype.onMouseTouchOut = function () {
        trace("testBitmap", "onMouseTouchOut");
    };

    testFilter.prototype.testOpacity = function () {
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
    return testFilter;
})();
//# sourceMappingURL=testFilter.js.map
