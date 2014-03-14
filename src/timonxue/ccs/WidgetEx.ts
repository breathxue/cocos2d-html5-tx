///<reference path='../ImportTS.d.ts' />
module tx{
    /**
     * TODO:类功能摘要
     * @author TimonXue
     * @Create Date 2013-4-7
     */
    export class WidgetEx extends EventDispatcher implements IMouseTouchEvent,IDestroyable {
        public widget:ccs.Widget;
        _mouseTouchEventCoprocessor:MouseTouchEventCoprocessor;

        constructor(widget:ccs.Widget) {
            super();
            this.widget = widget;
            this._mouseTouchEventCoprocessor = new tx.MouseTouchEventCoprocessor(this.widget, this);
            this.initEvent();
        }

        destroy():void {
            this.widget.addTouchEventListener(()=> {
            }, this);
            this._mouseTouchEventCoprocessor.destroy();
            this._mouseTouchEventCoprocessor = null;
            this.widget = null;
            super.destroy();
        }


        initEvent(event:Event = null):void {
            this.widget.addTouchEventListener(this.onTouchEvent, this);
        }


        private onTouchEvent(obj:ccs.Widget, type:ccs.TouchEventType):void {
            var local:cc.Point;
            var pos:cc.Point;
            switch (type) {
                case ccs.TouchEventType.began:
                    local = this.widget.getTouchStartPos();
                    pos = this.widget.convertToWorldSpace(local);
                    this._mouseTouchEventCoprocessor.onMouseDownTouchBegan(pos);
                    break;
                case ccs.TouchEventType.ended:
                    local = this.widget.getTouchEndPos();
                    pos = this.widget.convertToWorldSpace(local);
                    this._mouseTouchEventCoprocessor.onMouseTouchEndedUp(pos, this.widget.hitTest(local));
                    break;
                case ccs.TouchEventType.moved:
                    local = this.widget.getTouchEndPos();
                    pos = this.widget.convertToWorldSpace(local);
                    this._mouseTouchEventCoprocessor.onMouseDraggedTouchMove(pos, this.widget.hitTest(local));
                    break;
            }
        }
    }
}