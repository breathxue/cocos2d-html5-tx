///<reference path='../ImportTS.d.ts' />
module tx
{

    /**
     * TODO:类功能摘要
     * @author TimonXue
     * @Create Date 2013-4-7
     */
    export class CLoadingBar {
        public mc;
        private rect:cc.Rect;

        constructor(mc:cc.Sprite)

        constructor(mc:ccs.ImageView)

        constructor(mc:any) {
            if (mc instanceof cc.Sprite) {
                this.rect = mc.getTextureRect();
            } else if (mc instanceof ccs.ImageView) {
                this.rect = mc._imageRenderer.getTextureRect();
            }
            this.mc = mc;

        }

        public setPercent(value:number):void {
            var rect = new cc.Rect(this.rect.x, this.rect.y, this.rect.width * value / 100, this.rect.height);
            this.mc.setTextureRect(rect);
        }
    }
}
