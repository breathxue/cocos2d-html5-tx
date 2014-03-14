///<reference path='../ImportTS.d.ts' />
module tx {
    export interface IMouseTouchEvent{
    }
    /**
     * TODO:类功能摘要
     * @author TimonXue
     * @Create Date 2013-4-7
     */
    export class MouseTouchEventCoprocessor {
        private _ed:tx.EventDispatcher;
        private _obj:cc.Node;
        private _isOver:Boolean;

        constructor(obj:cc.Node, ed:EventDispatcher) {
            this._obj = obj;
            this._ed = ed;
            this._isOver = false;
        }

        destroy():void {
            this._obj = null;
            this._ed = null;
        }

        public onMouseDownTouchBegan(pos:cc.Point):void {
            var local:cc.Point = this._obj.convertToNodeSpace(pos);
            var e:Event = new tx.MouseTouchEvent(tx.MouseTouchEvent.MOUSE_DOWN_TOUCH_BEGAN, local, pos);
            this._ed.dispatchEvent(e)
            if (!this._isOver) {
                this._isOver = true;
                var e:Event = new MouseTouchEvent(MouseTouchEvent.MOUSE_TOUCH_OVER, local, pos);
                this._ed.dispatchEvent(e);
            }
        }

        public onMouseTouchEndedUp(pos:cc.Point, isInRect:Boolean):void {
            var local:cc.Point = this._obj.convertToNodeSpace(pos);
            if (isInRect) {
                var e:Event = new MouseTouchEvent(MouseTouchEvent.MOUSE_UP_TOUCH_ENDED, local, pos);
                this._ed.dispatchEvent(e);
                if (this._isOver) {
                    this._isOver = false;
                    var e:Event = new MouseTouchEvent(MouseTouchEvent.MOUSE_TOUCH_OUT, local, pos);
                    this._ed.dispatchEvent(e);
                }
            }
            else {
                if (this._isOver) {
                    this._isOver = false;
                    var e:Event = new MouseTouchEvent(MouseTouchEvent.MOUSE_TOUCH_OUT, local, pos);
                    this._ed.dispatchEvent(e);
                    var e:Event = new MouseTouchEvent(MouseTouchEvent.MOUSE_TOUCH_CLICK, local, pos);
                    this._ed.dispatchEvent(e);
                }
            }
        }

        public onMouseDraggedTouchMove(pos:cc.Point, isInRect:Boolean):void {
            var local:cc.Point = this._obj.convertToNodeSpace(pos);
            if (isInRect) {
                var e:Event = new MouseTouchEvent(MouseTouchEvent.MOUSE_DRAGGED_TOUCH_MOVE, local, pos);
                this._ed.dispatchEvent(e);
                if (!this._isOver) {
                    this._isOver = true;
                    var e:Event = new MouseTouchEvent(MouseTouchEvent.MOUSE_TOUCH_OVER, local, pos);
                    this._ed.dispatchEvent(e);
                }
            }
            else {
                if (this._isOver) {
                    this._isOver = false;
                    var e:Event = new MouseTouchEvent(MouseTouchEvent.MOUSE_TOUCH_OUT, local, pos);
                    this._ed.dispatchEvent(e);
                }
            }
        }


    }
    export class MouseTouchEvent extends tx.Event {
        public static MOUSE_DOWN_TOUCH_BEGAN:string = "MOUSE_DOWN_TOUCH_BEGAN";
        public static MOUSE_UP_TOUCH_ENDED:string = "MOUSE_UP_TOUCH_ENDED";
        public static MOUSE_DRAGGED_TOUCH_MOVE:string = "MOUSE_DRAGGED_TOUCH_MOVE";
        public static MOUSE_TOUCH_OVER:string = "MOUSE_TOUCH_OVER";
        public static MOUSE_TOUCH_OUT:string = "MOUSE_TOUCH_OUT";
        public static MOUSE_TOUCH_CLICK:string = "MOUSE_TOUCH_CLICK";
        public pos:cc.Point;
        public worldPos:cc.Point;

        constructor(type:string, pos:cc.Point, worldPos:cc.Point) {
            super(type)
            this.pos = cc.p(pos.x, pos.y);
            this.worldPos = worldPos;
        }

        public destroy():void {
            this.pos = null;
            this.worldPos = null;
            super.destroy();
        }
    }
}