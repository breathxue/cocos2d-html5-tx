///<reference path='../ImportTS.d.ts' />
/**
 * Created with JetBrains WebStorm.
 * User: timonxue
 * Date: 13-9-27
 * Time: 下午3:47
 * To change this template use File | Settings | File Templates.
 */
module tx {
    /**
     * TODO:类功能摘要
     * @author TimonXue
     * @Create Date 2013-4-7
     */
    export class Event implements IDestroyable{
        public static ENTER_FRAME:string ="ENTER_FRAME";
        public static COMPLETE:string = "COMPLETE";
        public static CHANGE:string = "CHANGE";
        public static SELECT:string = "SELECT";
        public type:string;
        public target:Object;
        public listener:Object;
        constructor(type:string) {
            this.type = type;
        }

        public clone():tx.Event
        {
            var t:tx.Event = new tx.Event(this.type);
            t.target = this.target;
            t.listener = this.listener;
            return t;
        }

        public destroy():void
        {
            this.target = null;
            this.listener = null;
        }
    }
}
