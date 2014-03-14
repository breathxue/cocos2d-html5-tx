///<reference path='../ImportTS.d.ts' />
module tx{

    export function bubblingRunFunction(mc:cc.Node, funString:string, parm:Arguments):void {
        var p = mc.getParent();
        if (p != null) {
            if (p[funString] != null) {
                p[funString].apply(p, parm)
            }
            tx.bubblingRunFunction(p, funString, parm);
        }
    }

    export function recursionRunFunction(node:cc.Node, funString:string, parm:Arguments):void {
        var children:cc.Node[] = node.getChildren();
        for (var i:number = 0; i < children.length; i++) {
            var child:cc.Node = children[i];
            if (child[funString] != null) {
                child[funString].apply(child, parm)
            }
            tx.recursionRunFunction(child, funString, parm);
        }
    }

    export function interactiveObjectCreate(mc:cc.Layer, listerOb:IInteractiveObject = null) {
        var t1:Object = mc;
        var t2:Object = listerOb;
        var same:Boolean = false;
        if (t1 == t2) {
            same = true;
        }
//        if ('mouse' in sys.capabilities) {
//            mc.setMouseEnabled(false);
//        } else {
//            cc.log("MOUSE Not supported");
//        }
//
//        if ('touches' in sys.capabilities) {
//            // listerOb is the default behavior. No need to set it explicitly.
        mc.setTouchMode(cc.TOUCH_ALL_AT_ONCE);
////            mc.setTouchMode(cc.TOUCH_ONE_BY_ONE);
        mc.setTouchEnabled(true);
//        } else {
//            cc.log("TOUCHES not supported");
//        }


        //重写的回调函数,记录上一次的回调函数
        var tempFunctionBegan:Function = mc.onTouchesBegan;
        mc.onTouchesBegan = (touches:cc.Touch[], event)=> {
            if (touches.length > 0) {
                if (!same) {
                    listerOb.onTouchBegan(touches[0], event);
                }
                listerOb.onMouseDownTouchBegan(touches[0].getLocation());
            }
            if (!same) {
                listerOb.onTouchesBegan(touches, event);
            }
            tempFunctionBegan(touches, event);
            return true;
        };
        mc.onTouchesBegan["lastCallBack"] = tempFunctionBegan;

        var tempFunctionEnded:Function = mc.onTouchesEnded;
        mc.onTouchesEnded = (touches:cc.Touch[], event)=> {
            if (touches.length > 0) {
                if (!same) {
                    listerOb.onTouchEnded(touches[0], event);
                }
                listerOb.onMouseTouchEndedUp(touches[0].getLocation());
            }
            if (!same) {
                listerOb.onTouchesEnded(touches, event);
            }
            tempFunctionEnded(touches, event);
            return true;
        };
        mc.onTouchesEnded["lastCallBack"] = tempFunctionEnded;

        var tempFunctionTouchesMoved:Function = mc.onTouchesMoved;
        mc.onTouchesMoved = (touches:cc.Touch[], event)=> {
//            trace("INNNNNNNNNNNNNNNNNNN onTouchesMoved");
//            cc.log("onTouchesMoved");
            if (touches.length > 0) {
                if (!same) {
                    listerOb.onTouchMoved(touches[0], event);
                }
                listerOb.onMouseDraggedTouchMove(touches[0].getLocation());
            }
            if (!same) {
                listerOb.onTouchesMoved(touches, event);
            }
            tempFunctionTouchesMoved(touches, event);
            return true;
        };
        mc.onTouchesMoved["lastCallBack"] = tempFunctionTouchesMoved;

        var tempFunctionTouchBegan:Function = mc.onTouchBegan;
        mc.onTouchBegan = (touch:cc.Touch, event)=> {
//            trace("INNNNNNNNNNNNNNNNNNN onTouchBegan");
            if (!same) {
                listerOb.onTouchBegan(touch, event);
            }
            listerOb.onMouseDownTouchBegan(touch.getLocation());
            tempFunctionTouchBegan(touch, event);

//            tx.bubblingRunFunction(mc,"onTouchBegan",arguments);
            tx.recursionRunFunction(mc, "onTouchBegan", arguments);
            return true;
        };
        mc.onTouchBegan["lastCallBack"] = tempFunctionTouchBegan;

        var tempFunctionTouchEnded:Function = mc.onTouchEnded;
        mc.onTouchEnded = (touch:cc.Touch, event)=> {
//            trace("INNNNNNNNNNNNNNNNNNN onTouchEnded");
            if (!same) {
                listerOb.onTouchEnded(touch, event);
            }
            listerOb.onMouseTouchEndedUp(touch.getLocation());
            tempFunctionTouchEnded(touch, event);
//            tx.bubblingRunFunction(mc,"onTouchEnded",arguments);
            tx.recursionRunFunction(mc, "onTouchEnded", arguments);
            return true;
        };
        mc.onTouchEnded["lastCallBack"] = tempFunctionTouchEnded;

        var tempFunctionTouchMoved:Function = mc.onTouchMoved;
        mc.onTouchMoved = (touch:cc.Touch, event)=> {
//            trace("INNNNNNNNNNNNNNNNNNN onTouchMoved");
            if (!same) {
                listerOb.onTouchMoved(touch, event);
            }
            listerOb.onMouseDraggedTouchMove(touch.getLocation());
            tempFunctionTouchMoved(touch, event);
//            tx.bubblingRunFunction(mc,"onTouchMoved",arguments);
            tx.recursionRunFunction(mc, "onTouchMoved", arguments);
            return true;
        };
        mc.onTouchMoved["lastCallBack"] = tempFunctionTouchMoved;

        var tempFunctionMouseDown:Function = mc.onMouseDown;
        mc.onMouseDown = (event)=> {
            if (!same) {
                listerOb.onMouseDown(event);
            }
            listerOb.onMouseDownTouchBegan(event.getLocation());
            tempFunctionMouseDown(event);
            return true;
        };
        mc.onMouseDown["lastCallBack"] = tempFunctionMouseDown;

        var tempFunctionMouseUp:Function = mc.onMouseUp;
        mc.onMouseUp = (event)=> {
            if (!same) {
                listerOb.onMouseUp(event);
            }
            listerOb.onMouseTouchEndedUp(event.getLocation());
            tempFunctionMouseUp(event);
            return true;
        };
        mc.onMouseUp["lastCallBack"] = tempFunctionMouseUp;

        var tempFunctionMouseDragged:Function = mc.onMouseDragged;
        mc.onMouseDragged = (event)=> {
            if (!same) {
                listerOb.onMouseDragged(event);
            }
            listerOb.onMouseDraggedTouchMove(event.getLocation());
            tempFunctionMouseDragged(event);
            return true;
        };
        mc.onMouseDragged["lastCallBack"] = tempFunctionMouseDragged;
    }

    export function interactiveObjectRemove(mc:cc.Layer) {
        if (mc instanceof cc.Layer) {
            mc.onTouchesEnded = mc.onTouchesEnded["lastCallBack"];
            mc.onTouchesBegan = mc.onTouchesBegan["lastCallBack"];
            mc.onTouchesMoved = mc.onTouchesMoved["lastCallBack"];

            mc.onTouchBegan = mc.onTouchBegan["lastCallBack"];
            mc.onTouchEnded = mc.onTouchEnded["lastCallBack"];
            mc.onTouchMoved = mc.onTouchMoved["lastCallBack"];

            mc.onMouseDown = mc.onMouseDown["lastCallBack"];
            mc.onMouseUp = mc.onMouseUp["lastCallBack"];
            mc.onMouseDragged = mc.onMouseDragged["lastCallBack"];
        }
    }

    /**
     * TODO:类功能摘要
     * @author TimonXue
     * @Create Date 2013-4-7
     */
    export interface IInteractiveObject extends IEventDispatcher{
        getMc():cc.Node;
        setName(name:string);
        getName():string;
        onMouseDown(event):void
        onMouseDragged(event):void
        onMouseUp(event):void
        onTouchBegan(touch:cc.Touch, event)
        onTouchMoved(touch:cc.Touch, event)
        onTouchEnded(touch:cc.Touch, event)
        onTouchesBegan(touch:cc.Touch[], event)
        onTouchesMoved(touch:cc.Touch[], event)
        onTouchesEnded(touch:cc.Touch[], event)
        onMouseDownTouchBegan(pos:cc.Point):void
        onMouseTouchEndedUp(pos:cc.Point):void
        onMouseDraggedTouchMove(pos:cc.Point):void
        addEventListener(eventType:string, theHandler:(e:Event) => void);
        // remove a listener
        removeEventListener(eventType:string, theHandler:(e:Event) => void);
        // remove all listeners
        removeAllListeners(eventType:string);
        // dispatch event to all listeners
        dispatchEvent(theEvent:Event);
        // send event to a handler
        dispatchEventToHander(theEvent:Event, theHandler:(e:Event) => void);
    }
}