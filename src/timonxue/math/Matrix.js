var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
///<reference path='../ImportTS.d.ts' />
var tx;
(function (tx) {
    /**
    * TODO:类功能摘要
    * @author TimonXue
    * @Create Date 2013-4-7
    */
    var Matrix = (function (_super) {
        __extends(Matrix, _super);
        function Matrix() {
            _super.apply(this, arguments);
        }
        return Matrix;
    })(cc.AffineTransform);
    tx.Matrix = Matrix;
})(tx || (tx = {}));
//# sourceMappingURL=Matrix.js.map
