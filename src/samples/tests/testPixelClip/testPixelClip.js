///<reference path='../ImportTS.d.ts' />
var testPixelClip = (function () {
    function testPixelClip(root) {
        var _this = this;
        this._root = root;
        this.iii = 0;

        //        this.testPixelList();
        this.testPixelClip();

        this._root.schedule(function () {
            _this.run();
        });
    }
    testPixelClip.prototype.run = function () {
        this.iii++;
        //        var d = new Date();
        //        trace(d.getTime());
        //        this.runTestPixelList();
        //        this.runTestMovieClips();
    };

    testPixelClip.prototype.testPixelClip = function () {
        this.pixelClip = new tx.PixelClip("guoBg", s_gameAni_List, 100);
        this.pixelClip.setPosition(200, 300);
        this.pixelClip.setAnchorPoint(cc.p(0, 1));
        this._root.addChild(this.pixelClip);
        this.pixelClip.setMouseTouchEnabled(true);

        //        this.pixelClip.gotoAndStop(150);
        this.pixelClip.addEventListener(tx.MouseTouchEvent.MOUSE_DOWN_TOUCH_BEGAN, this.onMouseMove, this);
    };

    testPixelClip.prototype.testPixelList = function () {
        this.pixelList = tx.PixelList.checkOut("guoBg", s_gameAni_List);
        var pobj = this.pixelList.getPixelByFrame(0);
        this.ll = new tx.Bitmap(pobj.bitMapData);

        ////        this.ll = cc.Sprite.createWithSpriteFrameName("guoBg0000");
        this.ll.setPosition(200 + pobj.tx, 300 + pobj.ty);

        //        this.ll.setPosition(200, 300);
        this.ll.setAnchorPoint(cc.p(0, 1));
        this._root.addChild(this.ll);
        this.ll.setMouseTouchEnabled(true);
        this.ll.addEventListener(tx.MouseTouchEvent.MOUSE_DOWN_TOUCH_BEGAN, this.onMouseMove, this);
    };

    testPixelClip.prototype.runTestPixelList = function () {
        var pobj = this.pixelList.getPixelByFrame(this.iii);
        this.ll.setBitmapData(pobj.bitMapData);

        ////        this.ll = cc.Sprite.createWithSpriteFrameName("guoBg0000");
        this.ll.setPosition(200 + pobj.tx, 300 + pobj.ty);
        //        this.ll.setPosition(200 + pobj.tx, 300 + (-pobj.bitMapData.getHeight() + pobj.ty));
        //        this.ll.setPosition(200, 300);
    };

    testPixelClip.prototype.onMouseMove = function (e) {
        trace("move");
    };
    return testPixelClip;
})();
//# sourceMappingURL=testPixelClip.js.map
