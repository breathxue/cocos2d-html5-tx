///<reference path='../ImportTS.d.ts' />
module tx{
    /**
     * TODO:类功能摘要
     * @author TimonXue
     * @Create Date 2013-4-7
     */
    export class AbstractRail implements IDestroyable {

        constructor() {
        }

        public destroy():void {
        }

        public getDistance():number {
            return 0;
        }

        public getPointByDistance(distance:number):mVector {
            distance;
            return null;
        }

        public getRotationByDistance(distance:number):number {
            distance;
            return 0;
        }


        public startPoint():mVector {
            return null;
        }

        public endPoint():mVector {
            return null;
        }

        setDebugMc(mc:cc.Node):void {
        }
    }
}
