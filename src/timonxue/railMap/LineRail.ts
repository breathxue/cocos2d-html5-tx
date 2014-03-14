///<reference path='../ImportTS.d.ts' />
module tx{
    /**
     * TODO:类功能摘要
     * @author TimonXue
     * @Create Date 2013-4-7
     */
    export class LineRail extends AbstractRail implements IDestroyable {
        private sp:mVector;
        private ep:mVector;
        private _tdebugMc:cc.Node;

        constructor(sx:number, sy:number, ex:number, ey:number) {
            super();
            this.sp = new mVector(sx, sy);
            this.ep = new mVector(ex, ey);
        }

        public destroy():void {
            if (this._tdebugMc) {
                this._tdebugMc.getParent().removeChild(this._tdebugMc);
                this._tdebugMc = null;
            }
            this.sp = null;
            this.ep = null;
        }

        public getDistance():number {
            return this.ep.minus(this.sp).getLength();
        }

        public getPointByDistance(distance:number):mVector {
            if (distance >= this.getDistance()) {
                return this.ep;
            }
            if (distance <= 0) {
                return this.sp;
            }
            var tempPoint:mVector = this.ep.minus(this.sp); //获得结束点相对于开始点的位置;
            tempPoint.setLength(distance);//获得目标点相对于开始点的位置;
            return tempPoint.plusEquals(this.sp);//返回目标点的绝对位置;
        }

        public getRotationByDistance(distance:number):number {
            distance;
            return this.ep.minus(this.sp).getAngle();
        }

        public startPoint():mVector {
            return this.sp;
        }

        public endPoint():mVector {
            return this.ep;
        }

        setDebugMc(pmc:cc.Node):void {
            this._tdebugMc = new cc.Node();
            pmc.addChild(this._tdebugMc);
//            this._tdebugMc.graphics.lineStyle(1, 0x000099);
//            this._tdebugMc.graphics.moveTo(this.sp.x, this.sp.y);
//            this._tdebugMc.graphics.lineTo(this.ep.x, this.ep.y);
        }

    }
}
