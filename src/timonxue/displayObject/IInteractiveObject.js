///<reference path='../ImportTS.d.ts' />
var tx;
(function (tx) {
    function bubblingRunFunction(mc, funString, parm) {
        var p = mc.getParent();
        if (p != null) {
            if (p[funString] != null) {
                p[funString].apply(p, parm);
            }
            tx.bubblingRunFunction(p, funString, parm);
        }
    }
    tx.bubblingRunFunction = bubblingRunFunction;

    function recursionRunFunction(node, funString, parm) {
        var children = node.getChildren();
        for (var i = 0; i < children.length; i++) {
            var child = children[i];
            if (child[funString] != null) {
                child[funString].apply(child, parm);
            }
            tx.recursionRunFunction(child, funString, parm);
        }
    }
    tx.recursionRunFunction = recursionRunFunction;

    function interactiveObjectCreate(mc, listerOb) {
        if (typeof listerOb === "undefined") { listerOb = null; }
        var t1 = mc;
        var t2 = listerOb;
        var same = false;
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
        var tempFunctionBegan = mc.onTouchesBegan;
        mc.onTouchesBegan = function (touches, event) {
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

        var tempFunctionEnded = mc.onTouchesEnded;
        mc.onTouchesEnded = function (touches, event) {
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

        var tempFunctionTouchesMoved = mc.onTouchesMoved;
        mc.onTouchesMoved = function (touches, event) {
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

        var tempFunctionTouchBegan = mc.onTouchBegan;
        mc.onTouchBegan = function (touch, event) {
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

        var tempFunctionTouchEnded = mc.onTouchEnded;
        mc.onTouchEnded = function (touch, event) {
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

        var tempFunctionTouchMoved = mc.onTouchMoved;
        mc.onTouchMoved = function (touch, event) {
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

        var tempFunctionMouseDown = mc.onMouseDown;
        mc.onMouseDown = function (event) {
            if (!same) {
                listerOb.onMouseDown(event);
            }
            listerOb.onMouseDownTouchBegan(event.getLocation());
            tempFunctionMouseDown(event);
            return true;
        };
        mc.onMouseDown["lastCallBack"] = tempFunctionMouseDown;

        var tempFunctionMouseUp = mc.onMouseUp;
        mc.onMouseUp = function (event) {
            if (!same) {
                listerOb.onMouseUp(event);
            }
            listerOb.onMouseTouchEndedUp(event.getLocation());
            tempFunctionMouseUp(event);
            return true;
        };
        mc.onMouseUp["lastCallBack"] = tempFunctionMouseUp;

        var tempFunctionMouseDragged = mc.onMouseDragged;
        mc.onMouseDragged = function (event) {
            if (!same) {
                listerOb.onMouseDragged(event);
            }
            listerOb.onMouseDraggedTouchMove(event.getLocation());
            tempFunctionMouseDragged(event);
            return true;
        };
        mc.onMouseDragged["lastCallBack"] = tempFunctionMouseDragged;
    }
    tx.interactiveObjectCreate = interactiveObjectCreate;

    function interactiveObjectRemove(mc) {
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
    tx.interactiveObjectRemove = interactiveObjectRemove;

    
})(tx || (tx = {}));
//# sourceMappingURL=IInteractiveObject.js.map
