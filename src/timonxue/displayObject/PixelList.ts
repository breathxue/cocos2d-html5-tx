///<reference path='../ImportTS.d.ts' />
module tx
{
    /**
     * TODO:类功能摘要
     * @author TimonXue
     * @Create Date 2013-4-7
     */
    export class PixelList {
        private static allList:any = new Object();
        public static ABJUST_VALUE:number = 1;
        /**
         * 延时拍摄,帧数,每帧拍摄延时,0代表不延时
         * 由于获得的时候一定会拍摄,所以如果将此值设置一个极大值,则会变成需要时拍摄的方式
         */
        public static DELAY_CUT_TIME:number = 10000000;


        public static checkOut(str:string, plistName:string = null, matrix:Matrix = null):PixelList {
            //						trace("str",str);
            var pixelArr:PixelList;
            if (str != null && PixelList.allList[str] != null) {
                pixelArr = PixelList.allList[str];
            }
            else {
                pixelArr = new PixelList(str, plistName, matrix);
                if (str != null) {
                    PixelList.allList[str] = pixelArr;
                }
            }
            return pixelArr;
        }

        public static clear():void {
            for (var pList in PixelList.allList) {
                PixelList.allList[pList].destory();
            }
            PixelList.allList = new Object();
        }

        private _plistName:string;
        private _pixelArr:PixelObject[];
        private _currFrame:number = 0;
        private _matrix:Matrix;
        public length:number;
        private count:number = 0;
        private _frameNameArr:string[];

        constructor(str:string, plistName:string = null, matrix:Matrix = null) {
            this._pixelArr = [];
            this._plistName = plistName;
            if (this._plistName == null) {
                this._plistName = tx.TextureAtlas.FindPlistInDict(str);
            }
            if (this._plistName) {
                this._frameNameArr = Attach.getTextureAtlas(str, this._plistName).getNames(str);
                this.length = this._frameNameArr.length;
                if (PixelList.DELAY_CUT_TIME == 0) {
                    for (var i in this._frameNameArr) {
                        this._pixelArr.push(this.cutBimMap(this._frameNameArr[i], this._plistName, matrix))
                    }
                }
                else {
                    this._matrix = matrix;
                    tx.enterFrame().addEventListener(Event.ENTER_FRAME, this.onRun, this);
                }

            }
            else {
                this._pixelArr.push(this.cutBimMap(str, this._plistName, matrix))
                this.length = 1;
            }
        }

        public destory():void {
            tx.enterFrame().removeEventListener(Event.ENTER_FRAME, this.onRun);
            this._pixelArr = null;
            this._matrix = null;
        }

        public splice(start:number,frame:number,newObj:PixelObject = null)
        {
            this._pixelArr.splice(start,frame,newObj);
            this._frameNameArr.splice(start,frame,"new");
        }

        public getPixelByFrame(frame:number):PixelObject {
            //已被清理
            if (!this._pixelArr) {
                return null;
            }
            if (this._pixelArr[frame] != null) {
                return this._pixelArr[frame];
            }
            else if (frame < this.length) {
                this._pixelArr[frame] = this.cutBimMap(this._frameNameArr[frame], this._plistName, this._matrix)
                return this._pixelArr[frame];
            }
            else {
                return null;
            }
        }

        private onRun(event:Event):void {
            this.count++;
            if (this.count > PixelList.DELAY_CUT_TIME) {
                if (this._currFrame >= this.length) {
                    tx.enterFrame().removeEventListener(Event.ENTER_FRAME, this.onRun);
                    return;
                }
                //如果不存在
                if (!this._pixelArr[this._currFrame]) {
                    this._pixelArr[this._currFrame] = this.cutBimMap(this._frameNameArr[this._currFrame], this._plistName, this._matrix);
                    this._currFrame++;
                }
                this.count = 0;
            }
        }

        private cutBimMap(s:string, plistName:string, matrix:Matrix = null):PixelObject {
            //trace("cutBimMap",s)
            var bmd:BitmapData = tx.Attach.getBitmapData(s, true, plistName);

            var offset:cc.Point = cc.p(0, 0);

            var spriteFrame:cc.SpriteFrame = cc.SpriteFrameCache.getInstance().getSpriteFrame(s);
            if (spriteFrame != undefined) {
                offset = cc.p(spriteFrame.getOffset().x,spriteFrame.getOffset().y);
                offset.y = (-bmd.getHeight() + offset.y)
            }

            //调整位置
            if (matrix) {
                offset.x += matrix.tx;
                offset.y += matrix.tx;
            }

            return new PixelObject(bmd, offset.x, offset.y);
        }
    }

    export class PixelObject {
        public bitMapData:BitmapData;
        public tx:number;
        public ty:number;

        constructor(bitMapData:BitmapData, tx:number, ty:number) {
            this.bitMapData = bitMapData;
            this.tx = tx;
            this.ty = ty;
        }
    }
}
