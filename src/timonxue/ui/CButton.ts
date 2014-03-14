///<reference path='../ImportTS.d.ts' />
module tx
{

    /**
     * TODO:类功能摘要
     * @author TimonXue
     * @Create Date 2013-4-7
     */
    export class CButton {
        _button : MovieClip;
        _name : string;
        /******************/
        _frameNum : number;
        _isEnable : Boolean;

        /******************/
            constructor(button : tx.MovieClip, frameNum : number) {
            this._button = button;
            this._name = this._button.getName();
//            this._button.buttonMode = true;
//            this._button.mouseChildren = false;
            this._button.gotoAndStop(1);
            this._frameNum = frameNum;
            this._isEnable = true;
            /******************/
            this.iniLock();
            /******************/
            this.initEvent();
        }

        iniLock() : void {
            if (this._button.getNumFrames() <= 3) {
                return;
            }
            if (this._frameNum == 4) {
                this._isEnable = false;
                this._button.gotoAndStop(4);
                this._button.setMouseTouchEnabled(false);
            }
        }

        public goLock() : void {
            if (this._button.getNumFrames() > 3) {
                this._button.gotoAndStop(4);
            }
            this._isEnable = false;
            this._button.setMouseTouchEnabled(false);
        }

        public unlock() : void {
            this._isEnable = true;
            this._button.gotoAndStop(1);
            this._button.setMouseTouchEnabled(true);
        }

        public buttonMc() : tx.MovieClip {
            return this._button;
        }

        // 添加事件;
        initEvent(event:Event = null) : void {
//            this._button.removeEventListener(Event.ADDED_TO_STAGE, initEvent);
//            this._button.addEventListener(Event.REMOVED_FROM_STAGE, removeEvent);
            this._button.addEventListener(tx.MouseTouchEvent.MOUSE_TOUCH_OVER, this.onMouseOver);
            this._button.addEventListener(tx.MouseTouchEvent.MOUSE_TOUCH_OUT, this.onMouseOut);
            this._button.addEventListener(tx.MouseTouchEvent.MOUSE_DOWN_TOUCH_BEGAN, this.onMousePress);
            this._button.addEventListener(tx.MouseTouchEvent.MOUSE_UP_TOUCH_ENDED, this.onMouseRelease);
        }

        // 删除所有事件;从舞台删除时自动调用;
        public removeEvent(evt : Event) : void {
//            this._button.removeEventListener(Event.REMOVED_FROM_STAGE, removeEvent);
            this._button.removeEventListener(tx.MouseTouchEvent.MOUSE_TOUCH_OVER, this.onMouseOver);
            this._button.removeEventListener(tx.MouseTouchEvent.MOUSE_TOUCH_OUT, this.onMouseOut);
            this._button.removeEventListener(tx.MouseTouchEvent.MOUSE_DOWN_TOUCH_BEGAN, this.onMousePress);
            this._button.removeEventListener(tx.MouseTouchEvent.MOUSE_UP_TOUCH_ENDED, this.onMouseRelease);
//            this._button.addEventListener(Event.ADDED_TO_STAGE, initEvent,false,0,true);
        }

        onMouseOver(evt : tx.MouseTouchEvent) : void {
            if (this._isEnable) {
//				if (evt.buttonDown) {
                this._button.gotoAndStop(3);
//				} else {
//                    this._button.gotoAndStop(2);
//				}
            }
        }

        private onMouseOut(evt : tx.MouseTouchEvent) : void {
            if (this._isEnable) {
                this._button.gotoAndStop(1);
            }
        }

        private onMousePress(evt : tx.MouseTouchEvent) : void {
            if (this._isEnable) {
                if (this._button.getNumFrames() > 2) {
                    this._button.gotoAndStop(3);
                } else {
                    this._button.gotoAndStop(2);
                }
            }
        }

        private onMouseRelease(evt : tx.MouseTouchEvent) : void {
            if (this._isEnable) {
                this._button.gotoAndStop(2);
            }
        }

        public setIsEnable(isEnable : Boolean) : void {
            this._isEnable = isEnable;
        }

        public name() : string {
            return this._name;
        }

        public isEnable() : Boolean {
            return this._isEnable;
        }
    }
}
