///<reference path='../ImportTS.d.ts' />
module tx
{

    /**
     * TODO:类功能摘要
     * @author TimonXue
     * @Create Date 2013-4-7
     */
    export class ButtonEx extends WidgetEx implements IMouseTouchEvent {
        /******************/
        button:ccs.Button;
        private _parentTouchEnabled:Boolean;
        private _meTouchEnabled:Boolean;

        /******************/
            constructor(button:ccs.Button) {
            super(button);
            this._parentTouchEnabled = true;
            this._meTouchEnabled = true;
            this.button = button;
        }

        public goLock():void {
            this.button.setBright(false);
            this.setMeTouchEnabled(false);
        }

        public unLock():void {
            this.button.setBright(true);
            this.setMeTouchEnabled(true);
        }

        public setParentTouchEnabled(v:Boolean):void {
            this._parentTouchEnabled = v;
            this.button.setTouchEnabled(this._parentTouchEnabled && this._meTouchEnabled);
        }

        public setMeTouchEnabled(v:Boolean):void {
            this._meTouchEnabled = v;
            this.button.setTouchEnabled(this._parentTouchEnabled && this._meTouchEnabled);
        }
    }
}
