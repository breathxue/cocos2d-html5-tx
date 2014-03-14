///<reference path='../ImportTS.d.ts' />
var testMovieClip = (function () {
    function testMovieClip(root) {
        var _this = this;
        this.textAtlas = [];
        this.iii = 0;
        this._root = root;

        //        var ttt = cc.FileUtils.getInstance().fullPathForFilename("cccc.png");
        //        trace(tx.Utils.removeFullPathForFilename(ttt));
        //        trace(ttt);
        //        tx.TextureAtlas.FindPlistInDict("guoBg");
        //        this.testTextureAtlas();
        //        this.testMovieClip();
        this.testAttachMovieClip();

        this._root.schedule(function () {
            _this.run();
        });
    }
    testMovieClip.prototype.run = function () {
        this.iii++;
        var d = new Date();
        trace(d.getTime());
        //        this.runTestTextureAtlas();
        //        this.runTestMovieClips();
    };

    testMovieClip.prototype.testAttachMovieClip = function () {
        this._testMovieClip = (tx.Attach.getInteractiveSprite("guoBg", null, 1000));
        this._testMovieClip.setPosition(200, 300);
        this._testMovieClip.setAnchorPoint(cc.p(0, 1));
        this._root.addChild(this._testMovieClip);

        for (var i = 0; i < this._testMovieClip.getNumFrames(); i += 2) {
            this._testMovieClip.addFrameScript(i, function (n) {
                var _this = this;
                return function () {
                    trace("ffffff", n, _this.iii);
                };
            }(i), this);
        }

        for (var i = 0; i < this._testMovieClip.getNumFrames(); i += 2) {
            this._testMovieClip.addFrameScript(i, this.frameFun, this);
        }
    };

    testMovieClip.prototype.testMovieClip = function () {
        var t = new tx.TextureAtlas(s_gameAni_List);
        this._testMovieClip = new tx.MovieClip(t.getTextures("guoBg"));
        this._testMovieClip.setPosition(200, 300);
        this._testMovieClip.setAnchorPoint(cc.p(0, 1));
        this._root.addChild(this._testMovieClip);

        for (var i = 0; i < this._testMovieClip.getNumFrames(); i += 2) {
            this._testMovieClip.addFrameScript(i, function (n) {
                var _this = this;
                return function () {
                    trace("ffffff", n, _this.iii);
                };
            }(i), this);
        }

        for (var i = 0; i < this._testMovieClip.getNumFrames(); i += 2) {
            this._testMovieClip.addFrameScript(i, this.frameFun, this);
        }
    };

    testMovieClip.prototype.frameFun = function () {
        trace(this.iii);
    };

    testMovieClip.prototype.runTestMovieClips = function () {
        this._testMovieClip.advanceTime(1 / 30);
        this._testMovieClip.gotoAndStop(this.iii);
    };

    testMovieClip.prototype.testTextureAtlas = function () {
        var t = new tx.TextureAtlas(s_gameAni_List);
        this.textAtlas = t.getTextures("guoBg");

        //        var tempSpriteFrame:cc.SpriteFrame = cc.SpriteFrameCache.getInstance().getSpriteFrame("guoBg0000");
        var tempSpriteFrame2 = this.textAtlas[0];

        this.ll = cc.Sprite.createWithSpriteFrame(tempSpriteFrame2);

        ////        this.ll = cc.Sprite.createWithSpriteFrameName("guoBg0000");
        this.ll.setPosition(200, 300);
        this.ll.setAnchorPoint(cc.p(0, 1));
        this._root.addChild(this.ll);
    };

    testMovieClip.prototype.runTestTextureAtlas = function () {
        this.ll.setDisplayFrame(this.textAtlas[this.iii]);
    };
    return testMovieClip;
})();
//# sourceMappingURL=testMovieClip.js.map
