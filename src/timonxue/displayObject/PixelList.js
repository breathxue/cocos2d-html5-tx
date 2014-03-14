///<reference path='../ImportTS.d.ts' />
var tx;
(function (tx) {
    /**
    * TODO:类功能摘要
    * @author TimonXue
    * @Create Date 2013-4-7
    */
    var PixelList = (function () {
        function PixelList(str, plistName, matrix) {
            if (typeof plistName === "undefined") { plistName = null; }
            if (typeof matrix === "undefined") { matrix = null; }
            this._currFrame = 0;
            this.count = 0;
            this._pixelArr = [];
            this._plistName = plistName;
            if (this._plistName == null) {
                this._plistName = tx.TextureAtlas.FindPlistInDict(str);
            }
            if (this._plistName) {
                this._frameNameArr = tx.Attach.getTextureAtlas(str, this._plistName).getNames(str);
                this.length = this._frameNameArr.length;
                if (PixelList.DELAY_CUT_TIME == 0) {
                    for (var i in this._frameNameArr) {
                        this._pixelArr.push(this.cutBimMap(this._frameNameArr[i], this._plistName, matrix));
                    }
                } else {
                    this._matrix = matrix;
                    tx.enterFrame().addEventListener(tx.Event.ENTER_FRAME, this.onRun, this);
                }
            } else {
                this._pixelArr.push(this.cutBimMap(str, this._plistName, matrix));
                this.length = 1;
            }
        }
        PixelList.checkOut = function (str, plistName, matrix) {
            if (typeof plistName === "undefined") { plistName = null; }
            if (typeof matrix === "undefined") { matrix = null; }
            //						trace("str",str);
            var pixelArr;
            if (str != null && PixelList.allList[str] != null) {
                pixelArr = PixelList.allList[str];
            } else {
                pixelArr = new PixelList(str, plistName, matrix);
                if (str != null) {
                    PixelList.allList[str] = pixelArr;
                }
            }
            return pixelArr;
        };

        PixelList.clear = function () {
            for (var pList in PixelList.allList) {
                PixelList.allList[pList].destory();
            }
            PixelList.allList = new Object();
        };

        PixelList.prototype.destory = function () {
            tx.enterFrame().removeEventListener(tx.Event.ENTER_FRAME, this.onRun);
            this._pixelArr = null;
            this._matrix = null;
        };

        PixelList.prototype.splice = function (start, frame, newObj) {
            if (typeof newObj === "undefined") { newObj = null; }
            this._pixelArr.splice(start, frame, newObj);
            this._frameNameArr.splice(start, frame, "new");
        };

        PixelList.prototype.getPixelByFrame = function (frame) {
            //已被清理
            if (!this._pixelArr) {
                return null;
            }
            if (this._pixelArr[frame] != null) {
                return this._pixelArr[frame];
            } else if (frame < this.length) {
                this._pixelArr[frame] = this.cutBimMap(this._frameNameArr[frame], this._plistName, this._matrix);
                return this._pixelArr[frame];
            } else {
                return null;
            }
        };

        PixelList.prototype.onRun = function (event) {
            this.count++;
            if (this.count > PixelList.DELAY_CUT_TIME) {
                if (this._currFrame >= this.length) {
                    tx.enterFrame().removeEventListener(tx.Event.ENTER_FRAME, this.onRun);
                    return;
                }

                //如果不存在
                if (!this._pixelArr[this._currFrame]) {
                    this._pixelArr[this._currFrame] = this.cutBimMap(this._frameNameArr[this._currFrame], this._plistName, this._matrix);
                    this._currFrame++;
                }
                this.count = 0;
            }
        };

        PixelList.prototype.cutBimMap = function (s, plistName, matrix) {
            if (typeof matrix === "undefined") { matrix = null; }
            //trace("cutBimMap",s)
            var bmd = tx.Attach.getBitmapData(s, true, plistName);

            var offset = cc.p(0, 0);

            var spriteFrame = cc.SpriteFrameCache.getInstance().getSpriteFrame(s);
            if (spriteFrame != undefined) {
                offset = cc.p(spriteFrame.getOffset().x, spriteFrame.getOffset().y);
                offset.y = (-bmd.getHeight() + offset.y);
            }

            //调整位置
            if (matrix) {
                offset.x += matrix.tx;
                offset.y += matrix.tx;
            }

            return new PixelObject(bmd, offset.x, offset.y);
        };
        PixelList.allList = new Object();
        PixelList.ABJUST_VALUE = 1;

        PixelList.DELAY_CUT_TIME = 10000000;
        return PixelList;
    })();
    tx.PixelList = PixelList;

    var PixelObject = (function () {
        function PixelObject(bitMapData, tx, ty) {
            this.bitMapData = bitMapData;
            this.tx = tx;
            this.ty = ty;
        }
        return PixelObject;
    })();
    tx.PixelObject = PixelObject;
})(tx || (tx = {}));
//# sourceMappingURL=PixelList.js.map
