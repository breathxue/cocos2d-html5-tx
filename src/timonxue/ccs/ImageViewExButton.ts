///<reference path='../ImportTS.d.ts' />
module tx
{

    /**
     * TODO:类功能摘要
     * @author TimonXue
     * @Create Date 2013-4-7
     */
    export class ImageViewExButton extends ImageViewMovieClip implements IMouseTouchEvent {
        /******************/
        _frameNum:number;
        _isEnable:Boolean;
        _isNormal:Boolean;

        /******************/
            constructor(button:ccs.ImageView, frameNum:number) {
            super(button);
            this.gotoAndStop(1);
            this._frameNum = frameNum;
            this._isEnable = true;
            this._isNormal = true;
            /******************/
            this.iniLock();
            /******************/
            this.initEvent();
        }

        iniLock():void {
            if (this.getNumFrames() <= 3) {
                return;
            }
            if (this._frameNum == 4) {
                this._isEnable = false;
                this.gotoAndStop(4);
                this.widget.setTouchEnabled(false);
            }
        }

        public goLock():void {
//            trace("goLockgoLockgoLockgoLockgoLockgoLock");
            if (this.getNumFrames() > 3) {
                this.gotoAndStop(4);
            }
            this._isEnable = false;
            this.widget.setTouchEnabled(false);
        }

        public unlock():void {
//            trace("unlockunlockunlockunlockunlockunlockunlockunlockunlock");
            this._isEnable = true;
            this.gotoAndStop(1);
            this.widget.setTouchEnabled(true);
        }

        // 添加事件;
        initEvent(event:Event = null):void {
            super.initEvent(event);
            this.addEventListener(tx.MouseTouchEvent.MOUSE_TOUCH_OVER, this.onMouseOver, this);
            this.addEventListener(tx.MouseTouchEvent.MOUSE_TOUCH_OUT, this.onMouseOut, this);
            this.addEventListener(tx.MouseTouchEvent.MOUSE_DOWN_TOUCH_BEGAN, this.onMousePress, this);
            this.addEventListener(tx.MouseTouchEvent.MOUSE_UP_TOUCH_ENDED, this.onMouseRelease, this);
        }

        // 删除所有事件;从舞台删除时自动调用;
        public removeEvent(evt:Event):void {
            this.removeEventListener(tx.MouseTouchEvent.MOUSE_TOUCH_OVER, this.onMouseOver);
            this.removeEventListener(tx.MouseTouchEvent.MOUSE_TOUCH_OUT, this.onMouseOut);
            this.removeEventListener(tx.MouseTouchEvent.MOUSE_DOWN_TOUCH_BEGAN, this.onMousePress);
            this.removeEventListener(tx.MouseTouchEvent.MOUSE_UP_TOUCH_ENDED, this.onMouseRelease);
        }

        onMouseOver(evt:tx.MouseTouchEvent):void {
            if (this._isNormal && this._isEnable) {
//				SoundsManager.instance.playSound(SoundsConfig.BUTTON_TOUCH, 1, 0);
            }
            if (this._isEnable) {
                this.gotoAndStop(3);
            }
        }

        private onMouseOut(evt:tx.MouseTouchEvent):void {
            if (this._isEnable) {
                this.gotoAndStop(1);
            }
        }

        private onMousePress(evt:tx.MouseTouchEvent):void {
            if (this._isEnable) {
                if (this.getNumFrames() > 2) {
                    this.gotoAndStop(3);
                } else {
                    this.gotoAndStop(2);
                }
            }
            if (this._isNormal && this._isEnable) {
//				SoundsManager.instance.playSound(SoundsConfig.BUTTON_PRESS, 1, 0);
            }
        }

        private onMouseRelease(evt:tx.MouseTouchEvent):void {
            if (this._isEnable) {
                this.gotoAndStop(2);
            }
        }

        public setIsEnable(isEnable:Boolean):void {
            this._isEnable = isEnable;
        }

        public setIsNormal(isNormal:Boolean):void {
            this._isNormal = isNormal;
        }

        public isEnable():Boolean {
            return this._isEnable;
        }
    }
}
