///<reference path='../ImportTS.d.ts' />
module tx{
    /**
     * TODO:类功能摘要
     * @author TimonXue
     * @Create Date 2013-4-7
     */
    export class InteractiveObject extends EventDispatcher implements IMouseTouchEvent,IInteractiveObject {
        _mc:cc.Node;
        _name:string;
        _mouseTouchEventCoprocessor:MouseTouchEventCoprocessor;
        constructor(target:Object = null)
        {
            super(target);
            this._name = typeof(this) + DisplayObject.DisplayObjectCreateNum++;
            this._mouseTouchEventCoprocessor = new tx.MouseTouchEventCoprocessor(this._mc,this);
        }

        public initWithLayer(mc:cc.Layer)
        {
            this._mc = mc;
            interactiveObjectCreate(mc, this);
        }

        public destroy():void {
            interactiveObjectRemove(<cc.Layer>this._mc);
            this._mc = null;
            super.destroy();
        }

        public getMc():cc.Node {
            return this._mc;
        }

        public setName(v:string):void {
            this._name = name;
        }

        public getName():string {
            return this._name;
        }

        public onMouseDown(event):void {
        }

        public onMouseDragged(event):void {
        }

        public onMouseUp(event):void {
        }

        public onTouchBegan(touch:cc.Touch, event) {
        }

        public onTouchMoved(touch:cc.Touch, event) {
        }

        public onTouchEnded(touch:cc.Touch, event) {
        }

        public onTouchesBegan(touch:cc.Touch[], event) {
        }

        public onTouchesMoved(touch:cc.Touch[], event) {
        }

        public onTouchesEnded(touch:cc.Touch[], event) {
        }

        public onMouseDownTouchBegan(pos:cc.Point):void {
            this._mouseTouchEventCoprocessor.onMouseDownTouchBegan(pos);
        }

        public onMouseTouchEndedUp(pos:cc.Point):void {
            this._mouseTouchEventCoprocessor.onMouseTouchEndedUp(pos,true);
        }

        public onMouseDraggedTouchMove(pos:cc.Point):void {
            this._mouseTouchEventCoprocessor.onMouseDraggedTouchMove(pos,true);
        }
    }
}