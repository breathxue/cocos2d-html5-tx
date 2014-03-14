///<reference path='ImportTS.d.ts' />
/**
* Created with JetBrains WebStorm.
* User: admin
* Date: 13-9-18
* Time: 上午11:41
* To change this template use File | Settings | File Templates.
*/
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Root = (function (_super) {
    __extends(Root, _super);
    function Root() {
        _super.apply(this, arguments);
    }
    Root.prototype.init = function () {
        _super.prototype.init.call(this);

        new testCcTx(this);

        //        tx.enterFrame().addEventListener(tx.Event.ENTER_FRAME, this.run, this);
        //        var v = new tx.Timer(5000, 3);
        //        v.addEventListener(tx.Timer.TIMER, this.run);
        //        v.addEventListener(tx.Timer.TIMER_COMPLETE, ()=> {
        //            trace("fffffff")
        //        });
        //        v.start();
        //        new TestAttach(this);
        //        new TestEvent(this);
        //        new TestBitmap(this);
        //        new testMovieClip(this);
        //        new testFilter(this);
        //          new testInteractiveSprite(this);
        //          new testPixelClip(this);
        //        setInterval(this.run,1000);
        //        cc.Director.getInstance().getActionManager().addAction()
        //        var t = new cc.Layer();
        //        this.addChild(t);
        //        cc.Director.getInstance().getScheduler().
        //        this.schedule(()=> {
        //            this.run();
        //        },1);
        return true;
    };

    Root.prototype.run = function () {
        var d = new Date();
        trace(d.getTime());

        trace("aaaaaaaa");
        //this.circle.setPositionX(this.circle.getPositionX()+1);
    };
    return Root;
})(cc.Layer);

var Stage = (function (_super) {
    __extends(Stage, _super);
    function Stage() {
        _super.apply(this, arguments);
    }
    Stage.prototype.onEnter = function () {
        _super.prototype.onEnter.call(this);
        cc.log("onEnter");
        var root = new Root();
        this.addChild(root);
        root.init();
    };
    return Stage;
})(cc.Scene);
//# sourceMappingURL=Root.js.map
