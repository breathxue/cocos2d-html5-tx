///<reference path='../ImportTS.d.ts' />
/**
 * Created with JetBrains WebStorm.
 * User: admin
 * Date: 13-9-18
 * Time: 下午2:46
 * To change this template use File | Settings | File Templates.
 */
interface IClassName{
    getClassName():string;
}


function getQualifiedClassName(ob:IClassName):string {
    //通过构造函数获得类名
    return ob.getClassName();
}

function getDefinitionByName(name:string, module:string = null):any {
    if (module == null) {
        return eval(name + ".prototype.constructor");
    }
    else {
        if (name.indexOf(module) == -1) {
            return eval(module + "." + name + ".prototype.constructor");
        }
        else {
            return eval(name + ".prototype.constructor");
        }
    }
}

module tx{
    export function copyP(p:cc.Point):cc.Point {
        return cc.p(p.x, p.y);
    }

    export function copyR(r:cc.Rect):cc.Rect {
        return new cc.Rect(r.x, r.y, r.width, r.height);
    }

    export function copyS(s:cc.Size):cc.Size {
        return new cc.Size(s.width, s.height);
    }

    /**
     * TODO:类功能摘要
     * @author TimonXue
     * @Create Date 2013-4-7
     */
    export class Utils {
        public static SET_COLOR_4B_BY_UINT(drawingUtil:cc.DrawingPrimitive, uintNumber:number, alpha:number):void {
            drawingUtil.setDrawColor4B((uintNumber >>> 16) % 0x100, (uintNumber >>> 8) % 0x100, (uintNumber >>> 0) % 0x100, alpha);
//        var tt:number = 0x7FFF00F7;
//        cc.log((uintNumber).toString(16));
//        cc.log(((uintNumber>>0)%0x100).toString(16));
//        cc.log(((uintNumber>>8)%0x100).toString(16));
//        cc.log(((uintNumber>>16)%0x100).toString(16));
        }

        public static COLOR_4F(uintNumber:number, alpha:number = 1):cc.Color4F {
            return new cc.Color4F(((uintNumber >>> 16) % 0x100) / 255, ((uintNumber >>> 8) % 0x100) / 255, ((uintNumber >>> 0) % 0x100) / 255, alpha);
        }

        public static COLOR_4B_Trans(uintNumber:number, colorTransform:Boolean):cc.Color4B {
            return new cc.Color4B((uintNumber >>> 16) % 0x100, (uintNumber >>> 8) % 0x100, (uintNumber >>> 0) % 0x100, colorTransform ? ((uintNumber >>> 24) % 0x100) : 255);
        }

        public static COLOR_3B(uintNumber:number):cc.Color3B {
            return new cc.Color3B((uintNumber >>> 16) % 0x100, (uintNumber >>> 8) % 0x100, (uintNumber >>> 0) % 0x100);
        }


        public static COLOR_4B(uintNumber:number):cc.Color4B {
//            trace("aaa",uintNumber,(uintNumber >> 16));
//                    var tt:number = 0x80FF00F7;
//
//            cc.log((uintNumber).toString(16));
//            cc.log(((uintNumber>>0)%0x100).toString(16));
//            uintNumber = tt;
//        cc.log((uintNumber).toString());
//        cc.log((uintNumber).toString(16));
//        cc.log(((uintNumber>>0)%0x100).toString(16));
//        cc.log(((uintNumber>>8)%0x100).toString(16));
//        cc.log(((uintNumber>>16)%0x100).toString(16));
//            cc.log(((uintNumber>>>0)%0x100).toString(16));
//            cc.log(((uintNumber>>>8)%0x100).toString(16));
//            cc.log(((uintNumber>>>16)%0x100).toString(16));
//            cc.log(((uintNumber>>>24)%0x100).toString(16));
//
            return new cc.Color4B((uintNumber >>> 16) % 0x100, (uintNumber >>> 8) % 0x100, (uintNumber >>> 0) % 0x100, (uintNumber >>> 24) % 0x100);
        }

        public static C4B_TO_UINT(c4b:cc.Color4B):number {
            return Utils.COLOR_4B_TO_UINT(c4b.r, c4b.g, c4b.b, c4b.a);
        }

        public static C3B_TO_UINT(c3b:cc.Color3B):number {
            return Utils.COLOR_3B_TO_UINT(c3b.r, c3b.g, c3b.b);
        }

        public static COLOR_4B_TO_UINT(r:number, g:number, b:number, a:number):number {
            return a * 0x1000000 + r * 0x10000 + g * 0x100 + b;
        }

        public static COLOR_3B_TO_UINT(r:number, g:number, b:number):number {
            return r * 0x10000 + g * 0x100 + b;
        }

        public static UINT_TO_3STRING(uintNumber:number):string {
            var ret:string = uintNumber.toString(16);
            for (var i:number = ret.length; i < 6; i++) {
                ret = "0" + ret;
            }
            return ret;
        }

        public static CheckPosInMenuRect(menuItem:cc.MenuItem, pos:cc.Point):Boolean {
            var local:cc.Point = menuItem.convertToNodeSpace(pos);
            var r:cc.Rect = menuItem.rect();
            r.x = 0;
            r.y = 0;
            return cc.rectContainsPoint(r, local);
        }

        //=.=放大点
        public static CheckPosInMenuRect2(menuItem:cc.MenuItem, pos:cc.Point, offset:number = 0):Boolean {
            var local:cc.Point = menuItem.convertToNodeSpace(pos);
            var r:cc.Rect = menuItem.rect();
            r.x = 0 - offset;
            r.y = 0 - offset;
            r.width += offset + offset;
            r.height += offset + offset;
            return cc.rectContainsPoint(r, local);
        }

        public static SetOpacity(node:cc.Node, v:number):void {
            if (node["setOpacity"] != null) {
                node["setOpacity"](v);
            }
            var children:cc.Node[] = node.getChildren();
            for (var i:number = 0; i < children.length; i++) {
                Utils.SetOpacity(children[i], v);
            }
        }

        public static FadeOutAndRemoveFromParent(sprite:cc.Node, sec:number):void {
            var removeFromParentAndCleanup:Function = function (nodeExecutingAction, data):void {
                nodeExecutingAction.removeFromParent(data);
            };
            var returnFunction:Function = function ():Function {
                return removeFromParentAndCleanup;
            };

            var action:cc.Action = cc.Sequence.create(cc.FadeOut.create(sec),
                cc.CallFunc.create(returnFunction(), sprite, true));
            sprite.runAction(action);

            var children:cc.Node[] = sprite.getChildren();
            for (var i:number = 0; i < children.length; i++) {
                Utils.AllFadeOut(children[i], sec);
            }
        }

        public static AllFadeIn(node:cc.Node, time:number):void {
            if (node["setOpacity"] != null) {
                node["setOpacity"](0);
                var action:cc.Action = cc.FadeIn.create(time);
                node.runAction(action);
            }
            var children:cc.Node[] = node.getChildren();
            for (var i:number = 0; i < children.length; i++) {
                Utils.AllFadeIn(children[i], time);
            }
        }

        public static AllFadeOut(node:cc.Node, time:number):void {
            if (node["setOpacity"] != null) {
                var action:cc.Action = cc.FadeOut.create(time);
                node.runAction(action);
            }
            var children:cc.Node[] = node.getChildren();
            for (var i:number = 0; i < children.length; i++) {
                Utils.AllFadeOut(children[i], time);
            }
        }

        public static MaxPoint(p1:cc.Point, p2:cc.Point):cc.Point {
            var tempPoint:cc.Point = new cc.Point(0, 0);
            tempPoint.x = p1.x > p2.x ? p1.x : p2.x;
            tempPoint.y = p1.y > p2.y ? p1.y : p2.y;
            return tempPoint;
        }

        public static MinPoint(p1:cc.Point, p2:cc.Point):cc.Point {
            var tempPoint:cc.Point = new cc.Point(0, 0);
            tempPoint.x = p1.x < p2.x ? p1.x : p2.x;
            tempPoint.y = p1.y < p2.y ? p1.y : p2.y;
            return tempPoint;
        }

        public static GetRectScale(soucreWH:cc.Point, targetWH:cc.Point):number {
            var xScale:number = targetWH.x / soucreWH.x;
            var yScale:number = targetWH.y / soucreWH.y;
            return xScale < yScale ? xScale : yScale;
        }

        public static GetRealPixBitmapData(bmd:tx.BitmapData):tx.BitmapData {

            var tempBmd:tx.BitmapData;
            var data:Uint8Array = bmd.getData();
            var width:number = bmd.getWidth();
            var height:number = bmd.getHeight();
            var minPoint:cc.Point = new cc.Point(width, height);
            var maxPoint:cc.Point = new cc.Point(0, 0);
            for (var i:number = 0; i < width; i++) {
                for (var j:number = 0; j < height; j++) {
                    var a:number = data[((j * width + i) * 4) + 3];
                    if (a != 0) {
                        maxPoint = tx.Utils.MaxPoint(maxPoint, new cc.Point(i, j));
                        minPoint = tx.Utils.MinPoint(minPoint, new cc.Point(i, j));
                    }
                }
            }

            var newWidth = maxPoint.x - minPoint.x;
            var newHeight = maxPoint.y - minPoint.y;

            tempBmd = new tx.BitmapData(newWidth, newHeight, true, 0);
            var tempData:Uint8Array = tempBmd.getData();
            for (var i:number = 0; i < newWidth; i++) {
                for (var j:number = 0; j < newHeight; j++) {
                    tempData[((j * newWidth + i) * 4)] = data[(((j + minPoint.y) * width + i + minPoint.x) * 4)];
                    tempData[((j * newWidth + i) * 4) + 1] = data[(((j + minPoint.y) * width + i + minPoint.x) * 4) + 1];
                    tempData[((j * newWidth + i) * 4) + 2] = data[(((j + minPoint.y) * width + i + minPoint.x) * 4) + 2];
                    tempData[((j * newWidth + i) * 4) + 3 ] = data[(((j + minPoint.y) * width + i + minPoint.x) * 4) + 3];
                }
            }
            tempBmd.setData(tempData);
            return tempBmd;
        }

        public static removeFullPathForFilename(filename:string):string {
            //trace("aaa",filename);
            var searchResolutionsOrderArray:any[] = cc.FileUtils.getInstance().getSearchResolutionsOrder();
            var searchPath:any[] = cc.FileUtils.getInstance().getSearchPath();
            for (var key in searchResolutionsOrderArray) {
                filename = filename.replace(searchResolutionsOrderArray[key] + "/", "");
            }
            for (var key2 in searchPath) {
                var path = searchPath[key2];
                if (path.length > 0 && path.lastIndexOf('/') !== path.length - 1)
                    path += '/';
                filename = filename.replace(path, "");
            }
            return filename;
        }

        public static GetXmlDoc(path:string):Node {
            var fullPath:string = cc.FileUtils.getInstance().fullPathForFilename(path);
            var textxml:string = cc.SAXParser.getInstance().getList(fullPath);
            var xmlDoc:Document = cc.SAXParser.getInstance()._parserXML(textxml, path);
            var plist:Node = xmlDoc.documentElement;
            return plist;
        }

        public static FixedStringNum(v:number, fixed:number):string {
            var ret:string = "" + v;
            for (var i:number = ret.length; i < fixed; i++) {
                ret = "0" + ret;
            }
            return ret;
        }

        public static GetAliceName(name:string):string {
            var ret:string;
            var pos = name.lastIndexOf(".");
            if (pos != -1) {
                ret = name.substr(0, pos + 1);
            }
            //去除0000
            ret = ret.substr(0, ret.length - 4);
            return ret;
        }

        public static GetOffsetByTarget(currNode:cc.Sprite):cc.Point
        {
            currNode._unflippedOffsetPositionFromCenter
            return null;
        }

        public static GetBoundingBoxByTarget(currNode:cc.Node, target?:cc.Node):cc.Rect;

        public static GetBoundingBoxByTarget(currNode:cc.Node, target?:cc.AffineTransform):cc.Rect;

        public static GetBoundingBoxByTarget(currNode:cc.Node, target?:any):cc.Rect {
            if (target instanceof cc.Node) {
                target = target.nodeToParentTransform();
            }
            var rect:cc.Rect = cc.rect(0, 0, currNode._contentSize._width, currNode._contentSize._height);
            var trans:cc.AffineTransform = (target == null) ? currNode.nodeToParentTransform() : cc.AffineTransformConcat(currNode.nodeToParentTransform(), target);
            rect = cc.RectApplyAffineTransform(rect, trans);


            //query child's BoundingBox
            if (!currNode._children)
                return rect;

            var touchLayer:cc.Node;
            if (currNode["getTouchLayer"] != null) {
                touchLayer = currNode["getTouchLayer"]();
            }

            var locChildren:cc.Node[] = currNode._children;
            for (var i = 0; i < locChildren.length; i++) {
                var child:cc.Node = locChildren[i];
                if (child && child._visible && child != touchLayer) {
                    var childRect:cc.Rect = Utils.GetBoundingBoxByTarget(child, trans);
                    if (childRect)
                        rect = cc.rectUnion(rect, childRect);
                }
            }
            return rect;
        }
    }
}
