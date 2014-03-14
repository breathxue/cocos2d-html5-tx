///<reference path='../ImportTS.d.ts' />
var tx;
(function (tx) {
    /**
    * TODO:类功能摘要
    * @author TimonXue
    * @Create Date 2013-4-7
    */
    var CLoadingBar = (function () {
        function CLoadingBar(mc) {
            if (mc instanceof cc.Sprite) {
                this.rect = mc.getTextureRect();
            } else if (mc instanceof ccs.ImageView) {
                this.rect = mc._imageRenderer.getTextureRect();
            }
            this.mc = mc;
        }
        CLoadingBar.prototype.setPercent = function (value) {
            var rect = new cc.Rect(this.rect.x, this.rect.y, this.rect.width * value / 100, this.rect.height);
            this.mc.setTextureRect(rect);
        };
        return CLoadingBar;
    })();
    tx.CLoadingBar = CLoadingBar;
})(tx || (tx = {}));
//# sourceMappingURL=CLoadingBar.js.map
