///<reference path='../ImportTS.d.ts' />
module tx{
    /**
     * TODO:类功能摘要
     * @author TimonXue
     * @Create Date 2013-4-7
     */
    export class InteractiveSprite extends cc.Sprite implements IMouseTouchEvent,IInteractiveObject,IEventDispatcher {

        public static createWithSpriteFrame(spriteFrame:cc.SpriteFrame):InteractiveSprite {
            var sprite = new InteractiveSprite();
            if (sprite && sprite.initWithSpriteFrame(spriteFrame)) {
                return sprite;
            }
            return null;
        }

        public static createWithTexture(texture:cc.Texture2D):InteractiveSprite {
            var sprite = new InteractiveSprite();
            if (sprite && sprite.initWithTexture(texture)) {
                return sprite;
            }
            return null;
        }


        _ed:EventDispatcher;
        _touchLayer:cc.Layer;
        _mouseEnable:Boolean;
        _name:string;
        _mouseTouchEventCoprocessor:MouseTouchEventCoprocessor;

        constructor() {
            super();
            this._name = typeof(this) + DisplayObject.DisplayObjectCreateNum++;
            this._mouseEnable = false;
            this._ed = new EventDispatcher(this);
            this._touchLayer = cc.Layer.create();
            this.addChild(this._touchLayer);
            this._mouseTouchEventCoprocessor = new tx.MouseTouchEventCoprocessor(this, this._ed);
        }

        public destroy():void {
            this.removeChild(this._touchLayer);
            this._touchLayer = null;
            this._ed.destroy();
            this._ed = null;
        }


        public setMouseTouchEnabled(b:Boolean):void {
            if (this._mouseEnable != b) {
                this._mouseEnable = b;
                if (b) {
                    interactiveObjectCreate(this._touchLayer, this);
                }
                else {
                    interactiveObjectRemove(this._touchLayer);
                }
            }
        }

        public getMouseTouchEnabled():Boolean {
            return this._mouseEnable
        }

        public getTouchLayer():cc.Layer {
            return this._touchLayer;
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

        public getMc():cc.Node {
            return this;
        }

        public setName(v:string):void {
            this._name = v;
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

        public hasEventListener(eventType:string):Boolean {

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

        onMouseDown(event):void {
        }

        onMouseDragged(event):void {
        }

        onMouseUp(event):void {
        }

        onTouchBegan(touch:cc.Touch, event) {
        }

        onTouchMoved(touch:cc.Touch, event) {
        }

        onTouchEnded(touch:cc.Touch, event) {
        }

        onTouchesBegan(touch:cc.Touch[], event) {
        }

        onTouchesMoved(touch:cc.Touch[], event) {
        }

        onTouchesEnded(touch:cc.Touch[], event) {
        }

        private isInRect(x:number, y:number, rect:cc.Rect):Boolean {
            if (x >= 0 && y >= 0 && x <= rect.width && y <= rect.height) {
                return true;
            }
            else {
                return false;
            }
        }

        public onMouseDownTouchBegan(pos:cc.Point):void {
            var local:cc.Point = this.convertToNodeSpace(pos);
            var rect:cc.Rect = this.getBoundingBox();
            var offset = this._unflippedOffsetPositionFromCenter;
            if (this.isInRect(local.x - offset.x, local.y - offset.y, rect)) {
                this._mouseTouchEventCoprocessor.onMouseDownTouchBegan(pos);
            }
        }

        public onMouseTouchEndedUp(pos:cc.Point):void {
            var local:cc.Point = this.convertToNodeSpace(pos);
            var rect:cc.Rect = this.getBoundingBox();
            var offset = this._unflippedOffsetPositionFromCenter;
            this._mouseTouchEventCoprocessor.onMouseTouchEndedUp(pos,this.isInRect(local.x - offset.x, local.y - offset.y, rect));
        }

        public onMouseDraggedTouchMove(pos:cc.Point):void {
            var local:cc.Point = this.convertToNodeSpace(pos);
            var rect:cc.Rect = this.getBoundingBox();
            var offset = this._unflippedOffsetPositionFromCenter;
            this._mouseTouchEventCoprocessor.onMouseDraggedTouchMove(pos,this.isInRect(local.x - offset.x, local.y - offset.y, rect));
        }
    }
}