///<reference path='../ImportTS.d.ts' />
class testPixelClip {
    public _root:Root;
    public ll:tx.Bitmap;
    public iii:number;
    public pixelList:tx.PixelList;
    public pixelClip:tx.PixelClip;

    constructor(root:Root) {
        this._root = root;
        this.iii = 0;

//        this.testPixelList();
        this.testPixelClip();

        this._root.schedule(()=> {
            this.run();
        });

    }

    public run() {
        this.iii++;
//        var d = new Date();
//        trace(d.getTime());
//        this.runTestPixelList();
//        this.runTestMovieClips();
    }

    public testPixelClip():void {
        this.pixelClip = new tx.PixelClip("guoBg", s_gameAni_List,100);
        this.pixelClip.setPosition(200, 300);
        this.pixelClip.setAnchorPoint(cc.p(0, 1))
        this._root.addChild(this.pixelClip);
        this.pixelClip.setMouseTouchEnabled(true);
//        this.pixelClip.gotoAndStop(150);
        this.pixelClip.addEventListener(tx.MouseTouchEvent.MOUSE_DOWN_TOUCH_BEGAN,this.onMouseMove,this)
    }

    public testPixelList():void {
        this.pixelList = tx.PixelList.checkOut("guoBg", s_gameAni_List);
        var pobj:tx.PixelObject = this.pixelList.getPixelByFrame(0);
        this.ll = new tx.Bitmap(pobj.bitMapData);
////        this.ll = cc.Sprite.createWithSpriteFrameName("guoBg0000");
        this.ll.setPosition(200 + pobj.tx, 300 + pobj.ty);
//        this.ll.setPosition(200, 300);
        this.ll.setAnchorPoint(cc.p(0, 1))
        this._root.addChild(this.ll);
        this.ll.setMouseTouchEnabled(true);
        this.ll.addEventListener(tx.MouseTouchEvent.MOUSE_DOWN_TOUCH_BEGAN,this.onMouseMove,this)
    }

    public runTestPixelList():void {
        var pobj:tx.PixelObject = this.pixelList.getPixelByFrame(this.iii);
        this.ll.setBitmapData(pobj.bitMapData);
////        this.ll = cc.Sprite.createWithSpriteFrameName("guoBg0000");
        this.ll.setPosition(200 + pobj.tx, 300 + pobj.ty);
//        this.ll.setPosition(200 + pobj.tx, 300 + (-pobj.bitMapData.getHeight() + pobj.ty));
//        this.ll.setPosition(200, 300);

    }

    public onMouseMove(e:tx.MouseTouchEvent):void
    {
        trace("move");
    }
}