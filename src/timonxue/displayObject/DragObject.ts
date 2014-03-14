///<reference path='../ImportTS.d.ts' />
module tx{
    /**
     * TODO:类功能摘要
     * @author TimonXue
     * @Create Date 2013-4-7
     */
    export class DragObject extends InteractiveObject {
        private static _dragHander:DragObject[] = [];//new Array<DragObject>;
        private static _setDragHander:DragObject[] = [];//new DragObject[];

        public static StartDragByInteractiveObject(iObject:tx.IInteractiveObject):void {
            DragObject.EndDragByInteractiveObject(iObject);
            var temp:DragObject = new DragObject(iObject.getMc(), iObject, null, true);
            DragObject._dragHander.push(temp);
        }

        public static EndDragByInteractiveObject(mc:tx.IInteractiveObject):void {
            for (var i:number = 0; i < DragObject._dragHander.length; i++) {
                if (DragObject._dragHander[i].getMc() == mc.getMc()) {
                    DragObject._dragHander[i].destroy();
                    DragObject._dragHander.splice(i, 1);
                    return;
                }
            }
        }

        public static StartDrag(targetMc:cc.Node, touchLayer:cc.Layer):void;

        public static StartDrag(targetMc:cc.Layer):void;

        public static StartDrag(targetMc:tx.InteractiveNodeRGBA):void;

        public static StartDrag(targetMc:any, touchLayer:cc.Layer = null):void {
            DragObject.EndDrag(targetMc)
            if (targetMc instanceof tx.InteractiveNodeRGBA) {
                touchLayer = (<tx.InteractiveNodeRGBA>targetMc).getTouchLayer();
            }
            else if (targetMc instanceof cc.Layer) {
                touchLayer = targetMc;
            }
            else if (!(touchLayer instanceof cc.Layer)) {
                return;
            }
            var temp:DragObject = new DragObject(targetMc, null, touchLayer, true);
            DragObject._dragHander.push(temp);
        }

        public static EndDrag(targetMc:cc.Node):void {
            for (var i:number = 0; i < DragObject._dragHander.length; i++) {
                if (DragObject._dragHander[i].getMc() == targetMc) {
                    DragObject._dragHander[i].destroy();
                    DragObject._dragHander.splice(i, 1);
                    return;
                }
            }
        }

        public static SetInteractiveObjectToDragObject(mc:tx.IInteractiveObject):void {
            DragObject.RemoveInteractiveObjectDragObject(mc);
            var temp:DragObject = new DragObject(mc.getMc(), mc);
            DragObject._setDragHander.push(temp);
        }

        public static RemoveInteractiveObjectDragObject(mc:tx.IInteractiveObject):void {
            for (var i:number = 0; i < DragObject._setDragHander.length; i++) {
                if (DragObject._setDragHander[i].getMc() == mc.getMc()) {
                    DragObject._setDragHander[i].destroy();
                    DragObject._setDragHander.splice(i, 1);
                    return;
                }
            }
        }

        public static SetToDragObject(targetMc:cc.Node, touchLayer:cc.Layer):void;

        public static SetToDragObject(targetMc:cc.Layer):void;

        public static SetToDragObject(targetMc:tx.InteractiveNodeRGBA):void;

        public static SetToDragObject(targetMc:any, touchLayer:cc.Layer = null):void {
            DragObject.RemoveDragObject(targetMc);
//            if (targetMc instanceof tx.InteractiveNodeRGBA) {
//                touchLayer = (<tx.InteractiveNodeRGBA>targetMc).getTouchLayer();
//            }
            if (targetMc["getTouchLayer"] != null) {
                touchLayer = targetMc["getTouchLayer"]();
            }
            else if (targetMc instanceof cc.Layer) {
                touchLayer = targetMc;
            }
            else if (!(touchLayer instanceof cc.Layer)) {
                return;
            }
            var temp:DragObject = new DragObject(targetMc, null, touchLayer);
            DragObject._setDragHander.push(temp);
        }

        public static RemoveDragObject(targetMc:cc.Node):void {
            for (var i:number = 0; i < DragObject._setDragHander.length; i++) {
                if (DragObject._setDragHander[i].getMc() == targetMc) {
                    DragObject._setDragHander[i].destroy();
                    DragObject._setDragHander.splice(i, 1);
                    return;
                }
            }
        }

        private _startDragStartMousePos:cc.Point;
        private _startDragStartPos:cc.Point;
        private _fixedPos:Boolean;
        private _iObject:tx.IInteractiveObject;
        private _touchLayer:cc.Layer;

        constructor(targetMc:cc.Node, iObject?:tx.IInteractiveObject, touchLayer?:cc.Layer, fixedPos?:Boolean) {
            super(targetMc);
            this._mc = targetMc;
            this._iObject = iObject;
            this._fixedPos = fixedPos;
            this._touchLayer = touchLayer;
            this._startDragStartPos = cc.p(targetMc.getPosition().x, targetMc.getPosition().y);
            if (iObject != null) {
                iObject.addEventListener.call(iObject, tx.MouseTouchEvent.MOUSE_DOWN_TOUCH_BEGAN, this.onEventMouseTouchBegin, this);
                iObject.addEventListener.call(iObject, tx.MouseTouchEvent.MOUSE_UP_TOUCH_ENDED, this.onEventMouseTouchEnded, this);
                iObject.addEventListener.call(iObject, tx.MouseTouchEvent.MOUSE_DRAGGED_TOUCH_MOVE, this.onEventMouseTouchMove, this);
            }
            else if (this._touchLayer != null) {
                interactiveObjectCreate(this._touchLayer, this);
            }
//            iObject.addEventListener()
        }

        public destroy():void {
            if (this._touchLayer != null) {
                interactiveObjectRemove(this._touchLayer);
            }
            if (this._iObject != null) {
                this._iObject.removeEventListener.call(this._iObject, tx.MouseTouchEvent.MOUSE_DOWN_TOUCH_BEGAN, this.onEventMouseTouchBegin);
                this._iObject.removeEventListener.call(this._iObject, tx.MouseTouchEvent.MOUSE_UP_TOUCH_ENDED, this.onEventMouseTouchEnded);
                this._iObject.removeEventListener.call(this._iObject, tx.MouseTouchEvent.MOUSE_DRAGGED_TOUCH_MOVE, this.onEventMouseTouchMove);
            }
            this._mc = null;
        }

        public onEventMouseTouchBegin(e:tx.MouseTouchEvent):void {
            (<DragObject>(e.listener)).onMouseDownTouchBegan(e.worldPos);
        }

        public onEventMouseTouchEnded(e:tx.MouseTouchEvent):void {
            (<DragObject>(e.listener)).onMouseTouchEndedUp(e.worldPos);
        }

        public onEventMouseTouchMove(e:tx.MouseTouchEvent):void {
            (<DragObject>(e.listener)).onMouseDraggedTouchMove(e.worldPos);
        }

        public onMouseDownTouchBegan(pos:cc.Point):void {
            if (!this._fixedPos) {
                this._startDragStartMousePos = new cc.Point(pos.x, pos.y);
                this._startDragStartPos = cc.p(this._mc.getPosition().x, this._mc.getPosition().y);
            }
        }

        public onMouseTouchEndedUp(pos:cc.Point):void {
            if (!this._fixedPos) {
                this._startDragStartMousePos = null
            }
        }

        public onMouseDraggedTouchMove(pos:cc.Point):void {
            if (this._startDragStartMousePos == null) {
                this._startDragStartMousePos = new cc.Point(pos.x, pos.y);
            }
            var post:cc.Point = new cc.Point(pos.x, pos.y);
            post.x -= this._startDragStartMousePos.x;
            post.y -= this._startDragStartMousePos.y;
            this._mc.setPositionX(this._startDragStartPos.x + post.x);
            this._mc.setPositionY(this._startDragStartPos.y + post.y);
        }
    }
}
