///<reference path='ImportTS.d.ts' />
/**
 * Created with JetBrains WebStorm.
 * User: admin
 * Date: 13-9-18
 * Time: 上午11:41
 * To change this template use File | Settings | File Templates.
 */

class Root extends cc.Layer {
    public init():Boolean {
        super.init();

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
    }

    public run() {
        var d = new Date();
        trace(d.getTime());

        trace("aaaaaaaa");
        //this.circle.setPositionX(this.circle.getPositionX()+1);
    }
}

class Stage extends cc.Scene {
    public onEnter() {
        super.onEnter();
        cc.log("onEnter");
        var root = new Root();
        this.addChild(root);
        root.init();
    }
}