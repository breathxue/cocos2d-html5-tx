///<reference path='../ImportTS.d.ts' />
class testMovieClip {
    public _root:cc.Node;
    public ll:cc.Sprite;
    public textAtlas:cc.SpriteFrame[] = [];
    public _testMovieClip:tx.MovieClip;
    public iii:number;

    constructor(root:cc.Node) {
        this.iii = 0;
        this._root = root;

//        var ttt = cc.FileUtils.getInstance().fullPathForFilename("cccc.png");
//        trace(tx.Utils.removeFullPathForFilename(ttt));
//        trace(ttt);



//        tx.TextureAtlas.FindPlistInDict("guoBg");


//        this.testTextureAtlas();
//        this.testMovieClip();
        this.testAttachMovieClip();

        this._root.schedule(()=> {
            this.run();
        });
    }

    public run() {
        this.iii++;
        var d = new Date();
        trace(d.getTime());
//        this.runTestTextureAtlas();
//        this.runTestMovieClips();
    }

    public testAttachMovieClip():void {
        this._testMovieClip = <tx.MovieClip>(tx.Attach.getInteractiveSprite("guoBg",null,1000));
        this._testMovieClip.setPosition(200, 300);
        this._testMovieClip.setAnchorPoint(cc.p(0, 1))
        this._root.addChild(this._testMovieClip);

        for (var i:number = 0; i < this._testMovieClip.getNumFrames(); i += 2) {
            this._testMovieClip.addFrameScript(i, function (n:number) {
                return ()=> {
                    trace("ffffff", n, this.iii);
                }
            }(i), this)
        }

        for (var i:number = 0; i < this._testMovieClip.getNumFrames(); i += 2) {
            this._testMovieClip.addFrameScript(i, this.frameFun, this)
        }

    }

    public testMovieClip():void {
        var t:tx.TextureAtlas = new tx.TextureAtlas(s_gameAni_List);
        this._testMovieClip = new tx.MovieClip(t.getTextures("guoBg"));
        this._testMovieClip.setPosition(200, 300);
        this._testMovieClip.setAnchorPoint(cc.p(0, 1))
        this._root.addChild(this._testMovieClip);

        for (var i:number = 0; i < this._testMovieClip.getNumFrames(); i += 2) {
            this._testMovieClip.addFrameScript(i, function (n:number) {
                return ()=> {
                    trace("ffffff", n, this.iii);
                }
            }(i), this)
        }

        for (var i:number = 0; i < this._testMovieClip.getNumFrames(); i += 2) {
            this._testMovieClip.addFrameScript(i, this.frameFun, this)
        }

    }

    public frameFun():void {
        trace(this.iii);
    }

    public runTestMovieClips():void {
        this._testMovieClip.advanceTime(1 / 30);
        this._testMovieClip.gotoAndStop(this.iii);
    }

    public testTextureAtlas():void {

        var t:tx.TextureAtlas = new tx.TextureAtlas(s_gameAni_List);
        this.textAtlas = t.getTextures("guoBg")

//        var tempSpriteFrame:cc.SpriteFrame = cc.SpriteFrameCache.getInstance().getSpriteFrame("guoBg0000");
        var tempSpriteFrame2:cc.SpriteFrame = this.textAtlas[0];

        this.ll = cc.Sprite.createWithSpriteFrame(tempSpriteFrame2);
////        this.ll = cc.Sprite.createWithSpriteFrameName("guoBg0000");
        this.ll.setPosition(200, 300);
        this.ll.setAnchorPoint(cc.p(0, 1))
        this._root.addChild(this.ll);
    }


    public runTestTextureAtlas():void {
        this.ll.setDisplayFrame(this.textAtlas[this.iii]);
    }
}