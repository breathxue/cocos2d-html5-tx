///<reference path='../ImportTS.d.ts' />
var tx;
(function (tx) {
    /**
    * TODO:类功能摘要
    * @author TimonXue
    * @Create Date 2013-4-7
    */
    var mVector = (function () {
        function mVector(px, py) {
            if (typeof px === "undefined") { px = 0; }
            if (typeof py === "undefined") { py = 0; }
            this.x = px;
            this.y = py;
        }
        /**
        * 重新设定向量值
        * @param px x轴方向值
        * @param py y轴方向值
        */
        mVector.prototype.setTo = function (px, py) {
            this.x = px;
            this.y = py;
        };

        /**
        * 拷贝传入参数的向量值,重新设定向量值.
        * @param v 被拷贝的原始向量值
        */
        mVector.prototype.copyFrom = function (v) {
            this.x = v.x;
            this.y = v.y;
            return this;
        };

        /**
        * toString函数
        */
        mVector.prototype.toString = function () {
            var rx = Math.round(this.x * 1000) / 1000;
            var ry = Math.round(this.y * 1000) / 1000;
            return "[" + rx + "," + ry + "]";
        };

        /**
        * 获得当前向量的拷贝
        */
        mVector.prototype.clone = function () {
            return new mVector(this.x, this.y);
        };

        /**
        * 向量加 +
        * @param v 向量,加数
        * @return 返回被加后的新的向量
        */
        mVector.prototype.plus = function (v) {
            return new mVector(this.x + v.x, this.y + v.y);
        };

        /**
        * 向量加等于 +=
        * @param v 向量,加数
        * @return 返回被加后的向量
        */
        mVector.prototype.plusEquals = function (v) {
            this.x += v.x;
            this.y += v.y;
            return this;
        };

        /**
        * 向量减 -
        * @param v 向量,减数
        * @return 返回被加后的新的向量
        */
        mVector.prototype.minus = function (v) {
            return new mVector(this.x - v.x, this.y - v.y);
        };

        /**
        * 向量减等于 -=
        * @param v 向量,减数
        * @return 返回被加后的向量
        */
        mVector.prototype.minusEquals = function (v) {
            this.x -= v.x;
            this.y -= v.y;
            return this;
        };

        /**
        * 向量非 !
        * @return 返回和原始向量相反的新向量
        */
        mVector.prototype.negate = function () {
            return new mVector(-this.x, -this.y);
        };

        /**
        * 向量非等于 !=
        * @return 返回被相反计算后的向量
        */
        mVector.prototype.negateEquals = function () {
            this.x = -this.x;
            this.y = -this.y;
        };

        /**
        * 向量乘 *
        * @param s 数字,乘数
        * @return 返回被加后的新向量
        */
        mVector.prototype.mult = function (s) {
            return new mVector(this.x * s, this.y * s);
        };

        /**
        * 向量乘等于 *=
        * @param s 数字,乘数
        * @return 返回被加后的向量
        */
        mVector.prototype.multEquals = function (s) {
            this.x *= s;
            this.y *= s;
            return this;
        };

        /**
        * 向量旋转
        * @param ang 数字,角度
        * @return 返回被旋转后的新向量
        */
        mVector.prototype.rotateAngle = function (angle) {
            var cos = tx.TF_Class.cosD(angle);
            var sin = tx.TF_Class.sinD(angle);
            var result = new mVector(this.x * cos - this.y * sin, this.y * cos + this.x * sin);
            return result;
        };

        /**
        * 向量旋转等于
        * @param ang 数字,角度
        * @return 返回被旋转后的向量
        */
        mVector.prototype.rotateAngleEquals = function (angle) {
            return this.copyFrom(this.rotateAngle(angle));
        };

        /**
        * 向量围绕指定点旋转
        * @param ang 数字,角度
        * @param targetPoint 目标点
        * @return 返回被旋转后的新向量
        */
        mVector.prototype.rotateAngleForTarget = function (angle, targetPoint) {
            var tempVector = this.minus(targetPoint);
            var cos = tx.TF_Class.cosD(angle);
            var sin = tx.TF_Class.sinD(angle);
            var tempResult = new mVector(tempVector.x * cos - tempVector.y * sin, tempVector.y * cos + tempVector.x * sin);
            var result = tempResult.plus(targetPoint);

            return result;
        };

        /**
        * 向量围绕指定点旋转等于
        * @param ang 数字,角度
        * @param targetPoint 目标点
        * @return 返回被旋转后的新向量
        */
        mVector.prototype.rotateAngleForTargetEquals = function (angle, targetPoint) {
            return this.copyFrom(this.rotateAngleForTarget(angle, targetPoint));
        };

        /**
        * 向量旋转
        * @param radian 数字,弧度
        * @return 返回被旋转后的新向量
        */
        mVector.prototype.rotateRadian = function (radian) {
            var cos = Math.cos(radian);
            var sin = Math.sin(radian);
            var result = new mVector(this.x * cos - this.y * sin, this.y * cos + this.x * sin);
            return result;
        };

        /**
        * 向量旋转等于
        * @param radian 数字,弧度
        * @return 返回被旋转后的向量
        */
        mVector.prototype.rotateRadianEquals = function (radian) {
            return this.copyFrom(this.rotateRadian(radian));
        };

        /**
        * 向量围绕指定点旋转
        * @param radian 数字,弧度
        * @param targetPoint 目标点
        * @return 返回被旋转后的新向量
        */
        mVector.prototype.rotateRadianForTarget = function (radian, targetPoint) {
            var tempVector = this.minus(targetPoint);
            var cos = Math.cos(radian);
            var sin = Math.sin(radian);
            var tempResult = new mVector(tempVector.x * cos - tempVector.y * sin, tempVector.y * cos + tempVector.x * sin);
            var result = tempResult.plus(targetPoint);

            return result;
        };

        /**
        * 向量围绕指定点旋转等于
        * @param radian 数字,弧度
        * @param targetPoint 目标点
        * @return 返回被旋转后的新向量
        */
        mVector.prototype.rotateRadianForTargetEquals = function (radian, targetPoint) {
            return this.copyFrom(this.rotateRadianForTarget(radian, targetPoint));
        };

        /**
        * 向量点乘 .*
        * @param v 向量,乘数
        * @return 点乘数
        */
        mVector.prototype.dot = function (v) {
            return this.x * v.x + this.y * v.y;
        };

        /**
        * 向量点差 .x
        * @param v 向量,x数
        * @return 点x数
        */
        mVector.prototype.cross = function (v) {
            return this.x * v.y - this.y * v.x;
        };

        mVector.prototype.times = function (v) {
            return new mVector(this.x * v, this.y * v);
        };

        mVector.prototype.div = function (s) {
            if (s == 0) {
                s = 0.0001;
            }

            return new mVector(this.x / s, this.y / s);
        };

        mVector.prototype.divEquals = function (s) {
            if (s == 0) {
                s = 0.0001;
            }
            this.x /= s;
            this.y /= s;
            return this;
        };

        /**
        * 获得2点之间距离
        */
        mVector.prototype.distance = function (v) {
            var delta = this.minus(v);
            return delta.getLength();
        };

        /**
        * 规格化向量,设置向量长度为1,不改变原向量
        */
        mVector.prototype.normalize = function () {
            var m = this.getLength();
            if (m == 0) {
                m = 0.0001;
            }
            return this.mult(1 / m);
        };

        /**
        * 比较两向量的值是否相同
        */
        mVector.prototype.compare = function (v) {
            if (this.x == v.x && this.y == v.y) {
                return true;
            }
            return false;
        };

        /**
        * 获得向量法线
        */
        mVector.prototype.getNormal = function () {
            return new mVector(-this.y, this.x);
        };

        /**
        * 两向量是否互相垂直
        */
        mVector.prototype.isNormalTo = function (v) {
            return (this.dot(v) == 0);
        };

        /**
        * 获得2向量的角度差
        */
        mVector.prototype.angleBetween = function (v) {
            var dp = this.dot(v);
            var cosAngle = dp / (this.getLength() * v.getLength());
            return tx.TF_Class.acosD(cosAngle);
        };

        /**
        * 两向量夹角,弧度
        */
        mVector.prototype.radianBetween = function (v) {
            var cos = this.dot(v) / (this.getLength() * v.getLength());
            return Math.acos(cos);
        };

        /**
        * 获得向量长度
        */
        mVector.prototype.getLength = function () {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        };

        mVector.prototype.setLength = function (len) {
            var r = this.getLength();
            if (r) {
                this.multEquals(len / r);
            } else {
                this.x = len;
            }
        };

        /**
        * 设定向量的角度
        */
        mVector.prototype.setAngle = function (ang) {
            var r = this.getLength();
            this.x = r * tx.TF_Class.cosD(ang);
            this.y = r * tx.TF_Class.sinD(ang);
        };

        mVector.prototype.getAngle = function () {
            return tx.TF_Class.atan2D(this.y, this.x);
        };
        mVector.PI_OVER_ONE_EIGHTY = Math.PI / 180;
        return mVector;
    })();
    tx.mVector = mVector;
})(tx || (tx = {}));
//# sourceMappingURL=mVector.js.map
