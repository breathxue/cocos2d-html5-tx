///<reference path='../ImportTS.d.ts' />
var tx;
(function (tx) {
    /**
    * TODO:类功能摘要
    * @author TimonXue
    * @Create Date 2013-4-7
    */
    var TF_Class = (function () {
        function TF_Class() {
        }
        /**
        * 正弦函数
        */
        TF_Class.sinD = function (angle) {
            return Math.sin((angle * Math.PI / 180));
        };

        /**
        * 余弦函数
        */
        TF_Class.cosD = function (angle) {
            return Math.cos(angle * Math.PI / 180);
        };

        /**
        * 正切函数
        */
        TF_Class.tanD = function (angle) {
            return Math.tan(angle * Math.PI / 180);
        };

        /**
        * 反正弦函数
        */
        TF_Class.asinD = function (ratio) {
            return Math.asin(ratio) * (180 / Math.PI);
        };

        /**
        * 反余弦函数
        */
        TF_Class.acosD = function (ratio) {
            return Math.acos(ratio) * (180 / Math.PI);
        };

        /**
        * 反正切函数
        */
        TF_Class.atanD = function (ratio) {
            return Math.atan(ratio) * (180 / Math.PI);
        };

        /**
        * 两倍反正切函数
        */
        TF_Class.atan2D = function (y, x) {
            return Math.atan2(y, x) * (180 / Math.PI);
        };

        /**
        * 2点之前距离
        */
        TF_Class.distance = function (x1, y1, x2, y2) {
            var dx = x2 - x1;
            var dy = y2 - y1;
            return Math.sqrt(dx * dx + dy * dy);
        };

        /**
        * 2点连线的角度
        */
        TF_Class.angleOfLine = function (x1, y1, x2, y2) {
            return TF_Class.atan2D(y2 - y1, x2 - x1);
        };

        /**
        * 角度转弧度
        */
        TF_Class.degreesToRadians = function (angle) {
            return angle * (Math.PI / 180);
        };

        /**
        * 弧度转角度
        */
        TF_Class.radiansToDegrees = function (radian) {
            return radian * (180 / Math.PI);
        };

        /**
        * 角度值归正函数,归正传入参数的角度值,返回0度至360度的角度值.
        */
        TF_Class.fixAngle = function (angle) {
            return ((angle %= 360) < 0) ? angle + 360 : angle;
        };

        /**
        * 计算向量的角度和长度
        * @return 返回object,object.r为长度,object.t为角度
        */
        TF_Class.cartesianToPolar = function (p) {
            var radius = Math.sqrt(p.x * p.x + p.y + p.y);
            var theta = TF_Class.atan2D(p.y, p.x);
            return { r: radius, t: theta };
        };

        /**
        * 角度值归正函数,归正传入参数的角度值,返回-180度至180度的角度值.
        */
        TF_Class.FormatAngle = function (angle) {
            angle = angle % 360;
            if (angle > 180) {
                angle = angle - 360;
            }
            if (angle < -180) {
                angle = angle + 360;
            }
            return angle;
        };

        /**
        * 角度值归正函数,归正传入参数的角度值,返回-90度至90度的角度值.
        */
        TF_Class.FormatAngle90 = function (angle) {
            angle = angle % 180;
            if (angle > 90) {
                angle = 180 - angle;
            }
            if (angle < -90) {
                angle = angle + 180;
            }
            return angle;
        };
        return TF_Class;
    })();
    tx.TF_Class = TF_Class;
})(tx || (tx = {}));
//# sourceMappingURL=TF_Class.js.map
