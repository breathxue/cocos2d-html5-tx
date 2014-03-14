///<reference path='../ImportTS.d.ts' />
class testInteractiveSprite {
    public _root:Root;

    constructor(root:Root) {
        this._root = root;

        this.testMouseEvent();

    }

    public testMouseEvent():void {
        var t1:tx.InteractiveSprite = tx.Attach.getInteractiveSprite("guoBg0150");
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
    }

    public onMouseTouchBegin():void {
        trace("testBitmap", "onMouseTouchBegin");
    }

    public onMouseTouchEnded():void {
        trace("testBitmap", "onMouseTouchEnded");
    }

    public onMouseTouchMove():void {
        trace("testBitmap", "onMouseTouchMove");
    }

    public onMouseTouchOver():void {
        trace("testBitmap", "onMouseTouchOver");
    }

    public onMouseTouchOut():void {
        trace("testBitmap", "onMouseTouchOut");
    }
}