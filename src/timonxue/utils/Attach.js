///<reference path='../ImportTS.d.ts' />
var tx;
(function (tx) {
    /**
    * TODO:类功能摘要
    * @author TimonXue
    * @Create Date 2013-4-7
    */
    var Attach = (function () {
        function Attach() {
        }
        Attach.addSpriteFrames = function (plistName) {
            if (typeof plistName === "undefined") { plistName = null; }
            //            trace("aaaaaaaaaaa",plistName);
            if (plistName != null && !Attach.plistAddCache[plistName]) {
                cc.SpriteFrameCache.getInstance().addSpriteFrames(plistName);
                Attach.plistAddCache[plistName] = true;
            }
        };

        /**
        * 从库中取得 Sprite
        * @param s 图片名(xxx.png)或者plist中子图片名
        */
        Attach.getSprite = function (s, plistName) {
            if (typeof plistName === "undefined") { plistName = null; }
            Attach.addSpriteFrames(plistName);
            var haveSpriteFrame = cc.SpriteFrameCache.getInstance().getSpriteFrame(s);
            if (haveSpriteFrame != undefined) {
                return cc.Sprite.createWithSpriteFrameName(s);
            } else {
                return cc.Sprite.create(s);
            }
        };

        Attach.getInteractiveSprite = function (s, plistName, fps) {
            if (typeof plistName === "undefined") { plistName = null; }
            if (typeof fps === "undefined") { fps = 12; }
            if (s instanceof cc.SpriteFrame) {
                return tx.InteractiveSprite.createWithSpriteFrame(s);
            }

            Attach.addSpriteFrames(plistName);
            var haveSpriteFrame = cc.SpriteFrameCache.getInstance().getSpriteFrame(s);
            var texture = cc.TextureCache.getInstance().textureForKey(s);
            if (haveSpriteFrame != undefined) {
                return tx.InteractiveSprite.createWithSpriteFrame(haveSpriteFrame);
            } else if (texture != undefined) {
                return tx.InteractiveSprite.createWithTexture(texture);
            } else {
                //否则就是拿MC
                return Attach.getMovieClip(s, plistName, fps);
            }
        };

        Attach.getTextureAtlas = function (s, plistName) {
            if (typeof plistName === "undefined") { plistName = null; }
            if (plistName == null) {
                plistName = tx.TextureAtlas.FindPlistInDict(s);
            }
            if (plistName == null) {
                return null;
            }
            return new tx.TextureAtlas(plistName);
        };

        Attach.getTextures = function (s, plistName) {
            if (typeof plistName === "undefined") { plistName = null; }
            var ta = Attach.getTextureAtlas(s, plistName);
            if (ta == null) {
                return null;
            }
            return ta.getTextures(s);
        };

        Attach.getPixelClip = function (s, plistName, fps) {
            if (typeof plistName === "undefined") { plistName = null; }
            if (typeof fps === "undefined") { fps = 12; }
            return new tx.PixelClip(s, plistName, fps);
        };

        Attach.getMovieClip = function (s, plistName, fps) {
            if (typeof plistName === "undefined") { plistName = null; }
            if (typeof fps === "undefined") { fps = 12; }
            var ta = Attach.getTextureAtlas(s, plistName);
            if (ta == null) {
                throw new Error("plistName is null, name = " + s);
            }
            var a = ta.getTextures(s);
            if (a.length > 0) {
                return new tx.MovieClip(a, fps);
            } else {
                throw new Error("have not MovieClip" + s);
            }
        };

        /**
        * 从库中取得 BitmapData
        * @param s BitmapData在库中绑定的类名
        * @param repeatedUse_NoChange 这个BitmapData被多次使用且不会被修改时请打开此选项,这有助于节约内存资源,请不要dispose该对象,清理请使用clearBitmapDataCache()
        * @param: plistName_soucre  plistName或者soucre
        */
        Attach.getBitmapData = function (s, repeatedUse_NoChange, plistName_soucre) {
            if (typeof repeatedUse_NoChange === "undefined") { repeatedUse_NoChange = false; }
            if (typeof plistName_soucre === "undefined") { plistName_soucre = null; }
            if (repeatedUse_NoChange) {
                if (!Attach.bitMapDataArray) {
                    Attach.bitMapDataArray = {};
                }
                if (Attach.bitMapDataArray[s] != null) {
                    //如果无效的BITMAP DATA(已被dispose),则删除
                    //						if((Attach.bitMapDataArray[i][1] as BitmapData).width == 0 && (Attach.bitMapDataArray[i][1] as BitmapData).height == 0)
                    //						{
                    //							Attach.bitMapDataArray.splice(i, 1);
                    //							break;
                    //						}
                    //						else
                    //						{
                    //找到了返回
                    //                    trace("yes")
                    return Attach.bitMapDataArray[s];
                    //						}
                }
                //找不到就创建新的
            }

            // var temp:Class;
            var tempMc;
            var offset = cc.p(0, 0);
            if (plistName_soucre instanceof cc.Node) {
                //如果是图片的话
                tempMc = plistName_soucre;
            } else if (plistName_soucre instanceof cc.SpriteFrame) {
                //如果是图片的话
                tempMc = cc.Sprite.createWithSpriteFrame(plistName_soucre);
                offset = plistName_soucre.getOffset();
            } else {
                Attach.addSpriteFrames(plistName_soucre);
                var spriteFrame = cc.SpriteFrameCache.getInstance().getSpriteFrame(s);
                if (spriteFrame != undefined) {
                    tempMc = cc.Sprite.createWithSpriteFrameName(s);
                    offset = spriteFrame.getOffset();
                } else {
                    tempMc = cc.Sprite.create(s);
                }
            }
            tempMc.setAnchorPoint(cc.p(0, 1));

            //拍图片
            var rect = tempMc.getBoundingBox();
            if (rect.width <= 0) {
                rect.width = 1;
            }
            if (rect.height <= 0) {
                rect.height = 1;
            }

            //            console.log(rect.width+" "+tempMc.getTexture().getPixelsWide()+" "+tempMc.getContentSize().width);
            //            var filePath:string = "zhuangshi.plist"
            //            trace("============================", filePath,s);
            //            var dict = cc.FileUtils.getInstance().dictionaryWithContentsOfFileThreadSafe(filePath);
            //            if (dict) {
            //                var framesDict = dict["frames"];
            //                for (var key in framesDict) {
            //                    trace("key::::",key);
            //                    var frameDict = framesDict[s];
            //                    if (frameDict) {
            //            trace(offset.x, offset.y);
            //                    }
            //                }
            //            }else{
            //                trace("no dict");
            //            }
            //            trace(tempMc.getOffset().x,tempMc.getOffset().y);
            //            trace("aaaaaaaaaaaaaaaaaaaaa",rect.width,rect.height,spriteFrame.getOriginalSize().width,spriteFrame.getOriginalSize().height,offset.x,offset.y);
            var returnBmd = new tx.BitmapData(rect.width, rect.height, true, 0);
            returnBmd.draw(tempMc, new tx.Matrix(1, 0, 0, 1, -offset.x, -offset.y));

            //        var returnObj : BitmapData = new temp(null, null);
            if (repeatedUse_NoChange) {
                Attach.bitMapDataArray[s] = returnBmd;
            }
            return returnBmd;
        };

        /**
        * 不能在
        */
        Attach.clearBitmapDataCache = function () {
            for (var i = 0; i < Attach.bitMapDataArray.length; i++) {
                Attach.bitMapDataArray[i][1].dispose();
            }
            Attach.bitMapDataArray = {};
        };
        Attach.bitMapDataArray = {};
        Attach.plistAddCache = {};
        return Attach;
    })();
    tx.Attach = Attach;
})(tx || (tx = {}));
//# sourceMappingURL=Attach.js.map
