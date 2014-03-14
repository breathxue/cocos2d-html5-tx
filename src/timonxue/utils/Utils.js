///<reference path='../ImportTS.d.ts' />

function getQualifiedClassName(ob) {
    //通过构造函数获得类名
    return ob.getClassName();
}

function getDefinitionByName(name, module) {
    if (typeof module === "undefined") { module = null; }
    if (module == null) {
        return eval(name + ".prototype.constructor");
    } else {
        if (name.indexOf(module) == -1) {
            return eval(module + "." + name + ".prototype.constructor");
        } else {
            return eval(name + ".prototype.constructor");
        }
    }
}

var tx;
(function (tx) {
    function copyP(p) {
        return cc.p(p.x, p.y);
    }
    tx.copyP = copyP;

    function copyR(r) {
        return new cc.Rect(r.x, r.y, r.width, r.height);
    }
    tx.copyR = copyR;

    function copyS(s) {
        return new cc.Size(s.width, s.height);
    }
    tx.copyS = copyS;

    /**
    * TODO:类功能摘要
    * @author TimonXue
    * @Create Date 2013-4-7
    */
    var Utils = (function () {
        function Utils() {
        }
        Utils.SET_COLOR_4B_BY_UINT = function (drawingUtil, uintNumber, alpha) {
            drawingUtil.setDrawColor4B((uintNumber >>> 16) % 0x100, (uintNumber >>> 8) % 0x100, (uintNumber >>> 0) % 0x100, alpha);
            //        var tt:number = 0x7FFF00F7;
            //        cc.log((uintNumber).toString(16));
            //        cc.log(((uintNumber>>0)%0x100).toString(16));
            //        cc.log(((uintNumber>>8)%0x100).toString(16));
            //        cc.log(((uintNumber>>16)%0x100).toString(16));
        };

        Utils.COLOR_4F = function (uintNumber, alpha) {
            if (typeof alpha === "undefined") { alpha = 1; }
            return new cc.Color4F(((uintNumber >>> 16) % 0x100) / 255, ((uintNumber >>> 8) % 0x100) / 255, ((uintNumber >>> 0) % 0x100) / 255, alpha);
        };

        Utils.COLOR_4B_Trans = function (uintNumber, colorTransform) {
            return new cc.Color4B((uintNumber >>> 16) % 0x100, (uintNumber >>> 8) % 0x100, (uintNumber >>> 0) % 0x100, colorTransform ? ((uintNumber >>> 24) % 0x100) : 255);
        };

        Utils.COLOR_3B = function (uintNumber) {
            return new cc.Color3B((uintNumber >>> 16) % 0x100, (uintNumber >>> 8) % 0x100, (uintNumber >>> 0) % 0x100);
        };

        Utils.COLOR_4B = function (uintNumber) {
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
        };

        Utils.C4B_TO_UINT = function (c4b) {
            return Utils.COLOR_4B_TO_UINT(c4b.r, c4b.g, c4b.b, c4b.a);
        };

        Utils.C3B_TO_UINT = function (c3b) {
            return Utils.COLOR_3B_TO_UINT(c3b.r, c3b.g, c3b.b);
        };

        Utils.COLOR_4B_TO_UINT = function (r, g, b, a) {
            return a * 0x1000000 + r * 0x10000 + g * 0x100 + b;
        };

        Utils.COLOR_3B_TO_UINT = function (r, g, b) {
            return r * 0x10000 + g * 0x100 + b;
        };

        Utils.UINT_TO_3STRING = function (uintNumber) {
            var ret = uintNumber.toString(16);
            for (var i = ret.length; i < 6; i++) {
                ret = "0" + ret;
            }
            return ret;
        };

        Utils.CheckPosInMenuRect = function (menuItem, pos) {
            var local = menuItem.convertToNodeSpace(pos);
            var r = menuItem.rect();
            r.x = 0;
            r.y = 0;
            return cc.rectContainsPoint(r, local);
        };

        //=.=放大点
        Utils.CheckPosInMenuRect2 = function (menuItem, pos, offset) {
            if (typeof offset === "undefined") { offset = 0; }
            var local = menuItem.convertToNodeSpace(pos);
            var r = menuItem.rect();
            r.x = 0 - offset;
            r.y = 0 - offset;
            r.width += offset + offset;
            r.height += offset + offset;
            return cc.rectContainsPoint(r, local);
        };

        Utils.SetOpacity = function (node, v) {
            if (node["setOpacity"] != null) {
                node["setOpacity"](v);
            }
            var children = node.getChildren();
            for (var i = 0; i < children.length; i++) {
                Utils.SetOpacity(children[i], v);
            }
        };

        Utils.FadeOutAndRemoveFromParent = function (sprite, sec) {
            var removeFromParentAndCleanup = function (nodeExecutingAction, data) {
                nodeExecutingAction.removeFromParent(data);
            };
            var returnFunction = function () {
                return removeFromParentAndCleanup;
            };

            var action = cc.Sequence.create(cc.FadeOut.create(sec), cc.CallFunc.create(returnFunction(), sprite, true));
            sprite.runAction(action);

            var children = sprite.getChildren();
            for (var i = 0; i < children.length; i++) {
                Utils.AllFadeOut(children[i], sec);
            }
        };

        Utils.AllFadeIn = function (node, time) {
            if (node["setOpacity"] != null) {
                node["setOpacity"](0);
                var action = cc.FadeIn.create(time);
                node.runAction(action);
            }
            var children = node.getChildren();
            for (var i = 0; i < children.length; i++) {
                Utils.AllFadeIn(children[i], time);
            }
        };

        Utils.AllFadeOut = function (node, time) {
            if (node["setOpacity"] != null) {
                var action = cc.FadeOut.create(time);
                node.runAction(action);
            }
            var children = node.getChildren();
            for (var i = 0; i < children.length; i++) {
                Utils.AllFadeOut(children[i], time);
            }
        };

        Utils.MaxPoint = function (p1, p2) {
            var tempPoint = new cc.Point(0, 0);
            tempPoint.x = p1.x > p2.x ? p1.x : p2.x;
            tempPoint.y = p1.y > p2.y ? p1.y : p2.y;
            return tempPoint;
        };

        Utils.MinPoint = function (p1, p2) {
            var tempPoint = new cc.Point(0, 0);
            tempPoint.x = p1.x < p2.x ? p1.x : p2.x;
            tempPoint.y = p1.y < p2.y ? p1.y : p2.y;
            return tempPoint;
        };

        Utils.GetRectScale = function (soucreWH, targetWH) {
            var xScale = targetWH.x / soucreWH.x;
            var yScale = targetWH.y / soucreWH.y;
            return xScale < yScale ? xScale : yScale;
        };

        Utils.GetRealPixBitmapData = function (bmd) {
            var tempBmd;
            var data = bmd.getData();
            var width = bmd.getWidth();
            var height = bmd.getHeight();
            var minPoint = new cc.Point(width, height);
            var maxPoint = new cc.Point(0, 0);
            for (var i = 0; i < width; i++) {
                for (var j = 0; j < height; j++) {
                    var a = data[((j * width + i) * 4) + 3];
                    if (a != 0) {
                        maxPoint = tx.Utils.MaxPoint(maxPoint, new cc.Point(i, j));
                        minPoint = tx.Utils.MinPoint(minPoint, new cc.Point(i, j));
                    }
                }
            }

            var newWidth = maxPoint.x - minPoint.x;
            var newHeight = maxPoint.y - minPoint.y;

            tempBmd = new tx.BitmapData(newWidth, newHeight, true, 0);
            var tempData = tempBmd.getData();
            for (var i = 0; i < newWidth; i++) {
                for (var j = 0; j < newHeight; j++) {
                    tempData[((j * newWidth + i) * 4)] = data[(((j + minPoint.y) * width + i + minPoint.x) * 4)];
                    tempData[((j * newWidth + i) * 4) + 1] = data[(((j + minPoint.y) * width + i + minPoint.x) * 4) + 1];
                    tempData[((j * newWidth + i) * 4) + 2] = data[(((j + minPoint.y) * width + i + minPoint.x) * 4) + 2];
                    tempData[((j * newWidth + i) * 4) + 3] = data[(((j + minPoint.y) * width + i + minPoint.x) * 4) + 3];
                }
            }
            tempBmd.setData(tempData);
            return tempBmd;
        };

        Utils.removeFullPathForFilename = function (filename) {
            //trace("aaa",filename);
            var searchResolutionsOrderArray = cc.FileUtils.getInstance().getSearchResolutionsOrder();
            var searchPath = cc.FileUtils.getInstance().getSearchPath();
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
        };

        Utils.GetXmlDoc = function (path) {
            var fullPath = cc.FileUtils.getInstance().fullPathForFilename(path);
            var textxml = cc.SAXParser.getInstance().getList(fullPath);
            var xmlDoc = cc.SAXParser.getInstance()._parserXML(textxml, path);
            var plist = xmlDoc.documentElement;
            return plist;
        };

        Utils.FixedStringNum = function (v, fixed) {
            var ret = "" + v;
            for (var i = ret.length; i < fixed; i++) {
                ret = "0" + ret;
            }
            return ret;
        };

        Utils.GetAliceName = function (name) {
            var ret;
            var pos = name.lastIndexOf(".");
            if (pos != -1) {
                ret = name.substr(0, pos + 1);
            }

            //去除0000
            ret = ret.substr(0, ret.length - 4);
            return ret;
        };

        Utils.GetOffsetByTarget = function (currNode) {
            currNode._unflippedOffsetPositionFromCenter;
            return null;
        };

        Utils.GetBoundingBoxByTarget = function (currNode, target) {
            if (target instanceof cc.Node) {
                target = target.nodeToParentTransform();
            }
            var rect = cc.rect(0, 0, currNode._contentSize._width, currNode._contentSize._height);
            var trans = (target == null) ? currNode.nodeToParentTransform() : cc.AffineTransformConcat(currNode.nodeToParentTransform(), target);
            rect = cc.RectApplyAffineTransform(rect, trans);

            //query child's BoundingBox
            if (!currNode._children)
                return rect;

            var touchLayer;
            if (currNode["getTouchLayer"] != null) {
                touchLayer = currNode["getTouchLayer"]();
            }

            var locChildren = currNode._children;
            for (var i = 0; i < locChildren.length; i++) {
                var child = locChildren[i];
                if (child && child._visible && child != touchLayer) {
                    var childRect = Utils.GetBoundingBoxByTarget(child, trans);
                    if (childRect)
                        rect = cc.rectUnion(rect, childRect);
                }
            }
            return rect;
        };
        return Utils;
    })();
    tx.Utils = Utils;
})(tx || (tx = {}));
//# sourceMappingURL=Utils.js.map
