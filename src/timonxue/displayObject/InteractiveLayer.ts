///<reference path='../ImportTS.d.ts' />
module tx{
    /**
     * TODO:类功能摘要
     * @author TimonXue
     * @Create Date 2013-4-7
     */
    export class InteractiveLayer extends cc.Layer implements IMouseTouchEvent,IInteractiveObject,IEventDispatcher {
        _ed:EventDispatcher;
        _mouseEnable:Boolean;
        _name:string;
        _mouseTouchEventCoprocessor:MouseTouchEventCoprocessor;

        constructor() {
            super();
            this._name = typeof(this) + DisplayObject.DisplayObjectCreateNum++;
            this._mouseEnable = false;
            this._ed = new EventDispatcher(this);
            this.setMouseTouchEnabled(true);
            this._mouseTouchEventCoprocessor = new tx.MouseTouchEventCoprocessor(this,this._ed);
        }

        public destroy():void {
            this._ed.destroy();
            this._ed = null;
        }

        public setMouseTouchEnabled(b:Boolean):void {
            if (this._mouseEnable != b) {
                this._mouseEnable = b;
                if (b) {
                    interactiveObjectCreate(this, this);
                }
                else {
                    interactiveObjectRemove(this);
                }
            }
        }


        public getWidth():number {
            return this.getBoundingBox().width;
        }

        public getHeight():number {
            return this.getBoundingBox().height;
        }

        public setWidth(v:number) {
            this.setScaleX(v / this.getContentSize().width)
        }

        public setHeight(v:number) {
            this.setScaleY(v / this.getContentSize().height)

        }

        public getMouseTouchEnabled():Boolean {
            return this._mouseEnable
        }

        public getMc():cc.Node {
            return this;
        }

        public setName(v:string):void {
            this._name = name;
        }

        public getName():string {
            return this._name;
        }

        addEventListener(eventType:string, theHandler:(e:Event) => void, listener:Object = null) {
            this._ed.addEventListener(eventType, theHandler, listener);
        }

        // remove a listener
        removeEventListener(eventType:string, theHandler:(e:Event) => void) {
            this._ed.removeEventListener(eventType, theHandler);
        }

        // remove all listeners
        removeAllListeners(eventType:string) {
            this._ed.removeAllListeners(eventType);
        }

        hasEventListener(eventType:string):Boolean {

            return this._ed.hasEventListener(eventType);
        }

        // dispatch event to all listeners
        dispatchEvent(theEvent:Event) {
            this._ed.dispatchEvent(theEvent);
        }

        // send event to a handler
        dispatchEventToHander(theEvent:Event, theHandler:(e:Event) => void) {
            this._ed.dispatchEventToHander(theEvent, theHandler);

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