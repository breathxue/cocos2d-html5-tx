var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
///<reference path='../ImportTS.d.ts' />
var tx;
(function (tx) {
    /**
    * TODO:类功能摘要
    * @author TimonXue
    * @Create Date 2013-4-7
    */
    var DragObject = (function (_super) {
        __extends(DragObject, _super);
        function DragObject(targetMc, iObject, touchLayer, fixedPos) {
            _super.call(this, targetMc);
            this._mc = targetMc;
            this._iObject = iObject;
            this._fixedPos = fixedPos;
            this._touchLayer = touchLayer;
            this._startDragStartPos = cc.p(targetMc.getPosition().x, targetMc.getPosition().y);
            if (iObject != null) {
                iObject.addEventListener.call(iObject, tx.MouseTouchEvent.MOUSE_DOWN_TOUCH_BEGAN, this.onEventMouseTouchBegin, this);
                iObject.addEventListener.call(iObject, tx.MouseTouchEvent.MOUSE_UP_TOUCH_ENDED, this.onEventMouseTouchEnded, this);
                iObject.addEventListener.call(iObject, tx.MouseTouchEvent.MOUSE_DRAGGED_TOUCH_MOVE, this.onEventMouseTouchMove, this);
            } else if (this._touchLayer != null) {
                tx.interactiveObjectCreate(this._touchLayer, this);
            }
            //            iObject.addEventListener()
        }
        DragObject.StartDragByInteractiveObject = function (iObject) {
            DragObject.EndDragByInteractiveObject(iObject);
            var temp = new DragObject(iObject.getMc(), iObject, null, true);
            DragObject._dragHander.push(temp);
        };

        DragObject.EndDragByInteractiveObject = function (mc) {
            for (var i = 0; i < DragObject._dragHander.length; i++) {
                if (DragObject._dragHander[i].getMc() == mc.getMc()) {
                    DragObject._dragHander[i].destroy();
                    DragObject._dragHander.splice(i, 1);
                    return;
                }
            }
        };

        DragObject.StartDrag = function (targetMc, touchLayer) {
            if (typeof touchLayer === "undefined") { touchLayer = null; }
            DragObject.EndDrag(targetMc);
            if (targetMc instanceof tx.InteractiveNodeRGBA) {
                touchLayer = targetMc.getTouchLayer();
            } else if (targetMc instanceof cc.Layer) {
                touchLayer = targetMc;
            } else if (!(touchLayer instanceof cc.Layer)) {
                return;
            }
            var temp = new DragObject(targetMc, null, touchLayer, true);
            DragObject._dragHander.push(temp);
        };

        DragObject.EndDrag = function (targetMc) {
            for (var i = 0; i < DragObject._dragHander.length; i++) {
                if (DragObject._dragHander[i].getMc() == targetMc) {
                    DragObject._dragHander[i].destroy();
                    DragObject._dragHander.splice(i, 1);
                    return;
                }
            }
        };

        DragObject.SetInteractiveObjectToDragObject = function (mc) {
            DragObject.RemoveInteractiveObjectDragObject(mc);
            var temp = new DragObject(mc.getMc(), mc);
            DragObject._setDragHander.push(temp);
        };

        DragObject.RemoveInteractiveObjectDragObject = function (mc) {
            for (var i = 0; i < DragObject._setDragHander.length; i++) {
                if (DragObject._setDragHander[i].getMc() == mc.getMc()) {
                    DragObject._setDragHander[i].destroy();
                    DragObject._setDragHander.splice(i, 1);
                    return;
                }
            }
        };

        DragObject.SetToDragObject = function (targetMc, touchLayer) {
            if (typeof touchLayer === "undefined") { touchLayer = null; }
            DragObject.RemoveDragObject(targetMc);

            //            if (targetMc instanceof tx.InteractiveNodeRGBA) {
            //                touchLayer = (<tx.InteractiveNodeRGBA>targetMc).getTouchLayer();
            //            }
            if (targetMc["getTouchLayer"] != null) {
                touchLayer = targetMc["getTouchLayer"]();
            } else if (targetMc instanceof cc.Layer) {
                touchLayer = targetMc;
            } else if (!(touchLayer instanceof cc.Layer)) {
                return;
            }
            var temp = new DragObject(targetMc, null, touchLayer);
            DragObject._setDragHander.push(temp);
        };

        DragObject.RemoveDragObject = function (targetMc) {
            for (var i = 0; i < DragObject._setDragHander.length; i++) {
                if (DragObject._setDragHander[i].getMc() == targetMc) {
                    DragObject._setDragHander[i].destroy();
                    DragObject._setDragHander.splice(i, 1);
                    return;
                }
            }
        };

        DragObject.prototype.destroy = function () {
            if (this._touchLayer != null) {
                tx.interactiveObjectRemove(this._touchLayer);
            }
            if (this._iObject != null) {
                this._iObject.removeEventListener.call(this._iObject, tx.MouseTouchEvent.MOUSE_DOWN_TOUCH_BEGAN, this.onEventMouseTouchBegin);
                this._iObject.removeEventListener.call(this._iObject, tx.MouseTouchEvent.MOUSE_UP_TOUCH_ENDED, this.onEventMouseTouchEnded);
                this._iObject.removeEventListener.call(this._iObject, tx.MouseTouchEvent.MOUSE_DRAGGED_TOUCH_MOVE, this.onEventMouseTouchMove);
            }
            this._mc = null;
        };

        DragObject.prototype.onEventMouseTouchBegin = function (e) {
            (e.listener).onMouseDownTouchBegan(e.worldPos);
        };

        DragObject.prototype.onEventMouseTouchEnded = function (e) {
            (e.listener).onMouseTouchEndedUp(e.worldPos);
        };

        DragObject.prototype.onEventMouseTouchMove = function (e) {
            (e.listener).onMouseDraggedTouchMove(e.worldPos);
        };

        DragObject.prototype.onMouseDownTouchBegan = function (pos) {
            if (!this._fixedPos) {
                this._startDragStartMousePos = new cc.Point(pos.x, pos.y);
                this._startDragStartPos = cc.p(this._mc.getPosition().x, this._mc.getPosition().y);
            }
        };

        DragObject.prototype.onMouseTouchEndedUp = function (pos) {
            if (!this._fixedPos) {
                this._startDragStartMousePos = null;
            }
        };

        DragObject.prototype.onMouseDraggedTouchMove = function (pos) {
            if (this._startDragStartMousePos == null) {
                this._startDragStartMousePos = new cc.Point(pos.x, pos.y);
            }
            var post = new cc.Point(pos.x, pos.y);
            post.x -= this._startDragStartMousePos.x;
            post.y -= this._startDragStartMousePos.y;
            this._mc.setPositionX(this._startDragStartPos.x + post.x);
            this._mc.setPositionY(this._startDragStartPos.y + post.y);
        };
        DragObject._dragHander = [];
        DragObject._setDragHander = [];
        return DragObject;
    })(tx.InteractiveObject);
    tx.DragObject = DragObject;
})(tx || (tx = {}));
//# sourceMappingURL=DragObject.js.map
