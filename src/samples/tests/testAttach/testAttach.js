///<reference path='../ImportTS.d.ts' />
var TestAttach = (function () {
    function TestAttach(root) {
        this._root = root;

        //        this.test1();
        this.testGetSprite();
        this.testGetBitmapData();
    }
    TestAttach.prototype.testGetBitmapData = function () {
        var t1 = new tx.Bitmap(tx.Attach.getBitmapData("crystals/0.png", true, s_crystalsList));
        t1.setPosition(cc.p(200, 200));
        this._root.addChild(t1);

        var t1 = new tx.Bitmap(tx.Attach.getBitmapData(s_crystalsPng));
        t1.setPosition(cc.p(400, 100));
        this._root.addChild(t1);

        var t1 = new tx.Bitmap(tx.Attach.getBitmapData("aaaa", true, tx.Attach.getSprite("crystals/0.png", s_crystalsList)));
        t1.setPosition(cc.p(300, 200));
        this._root.addChild(t1);
    };

    TestAttach.prototype.testGetSprite = function () {
        var t1 = tx.Attach.getSprite("crystals/0.png", s_crystalsList);
        t1.setPosition(cc.p(200, 200));
        this._root.addChild(t1);

        var t1 = tx.Attach.getSprite(s_crystalsPng);
        t1.setPosition(cc.p(400, 100));
        this._root.addChild(t1);
    };

    TestAttach.prototype.test1 = function () {
        cc.SpriteFrameCache.getInstance().addSpriteFrames(s_crystalsList);
        var fff = s_crystalsPng;

        //        var fff:string = "crystals/0.png";
        var tttt = cc.SpriteFrameCache.getInstance().getSpriteFrame(fff);
        if (tttt != undefined) {
            var t1 = cc.Sprite.createWithSpriteFrameName("crystals/0.png");
            //        trace(ttt);
            //        var t1:cc.Sprite = tx.Attach.getSprite("crystals/0.png", s_crystalsList);
        } else {
            var t1 = cc.Sprite.create(fff);
        }
        t1.setPosition(cc.p(200, 200));
        this._root.addChild(t1);
        //        var img:cc.Texture2D = cc.TextureCache.getInstance().addImage(s_crystalsPng);
        ////        var img2:cc.Texture2D = cc.TextureCache.getInstance().addImage("s_crystalsPng");
        //
        //        var t2:cc.Sprite = cc.Sprite.create(s_crystalsPng);
        //        t2.setPosition(cc.p(200, 200));
        //        root.addChild(t2);
        //        mySprite.initWithTexture(img, new cc.Rect(0, 0, 480, 320));
        //        this.addChild(mySprite, 0);
    };
    return TestAttach;
})();
//# sourceMappingURL=TestAttach.js.map
