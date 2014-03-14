///<reference path='../ImportTS.d.ts' />
/**
 * Created with JetBrains WebStorm.
 * User: admin
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
    export class Timer extends tx.EventDispatcher {
        public static TIMER:string = "TIMER";
        public static TIMER_COMPLETE:string = "TIMER_COMPLETE";

        private _isRunning:Boolean = false;
        private _repeatCount:number = 0;
        private _count:number = 0;
        private _id:number;

        constructor(s:number, repeatCount:number = 0) {
            super();
            this._isRunning = true;
            this._repeatCount = repeatCount;
            this._id = setInterval(()=> {
                this.run()
            }, s);
        }

        public destroy():void
        {
            clearInterval(this._id);
            super.destroy();
        }

        public run():void {
//            trace("this._isRunning", this._isRunning);
            if (this._isRunning) {
                this.dispatchEvent(new tx.Event(Timer.TIMER));
                this._count++;
                if (this._count >= this._repeatCount) {
                    if(this.$_eventHandlers)
                    {
                        this.dispatchEvent(new tx.Event(Timer.TIMER_COMPLETE));
                        this.destroy();
                    }
                }
            }
        }

        public start():void {
            this._isRunning = true;
        }

        public stop():void {
            this._isRunning = false;
        }

        public isRunning():Boolean {
            return this._isRunning;
        }
    }
    export var _enter:Timer;

    export function enterFrame():Timer {
        if (_enter == null) {
            _enter = new Timer(cc.Director.getInstance().getAnimationInterval() * 1000, Number.MAX_VALUE);
            _enter.run = ()=> {
                if (_enter.isRunning()) {
                    _enter.dispatchEvent(new tx.Event(tx.Event.ENTER_FRAME));
                }
            };
            _enter.start();
        }
        return _enter;
    }
}