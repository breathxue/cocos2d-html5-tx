///<reference path='../ImportTS.d.ts' />
module tx{
    /**
     * TODO:类功能摘要
     * @author TimonXue
     * @Create Date 2013-4-7
     */
    export class mVector {

        public static PI_OVER_ONE_EIGHTY:number = Math.PI / 180;

        public x:number;
        public y:number;

        constructor(px:number = 0, py:number = 0) {
            this.x = px;
            this.y = py;
        }

        /**
         * 重新设定向量值
         * @param px x轴方向值
         * @param py y轴方向值
         */
        public setTo(px:number, py:number):void {
            this.x = px;
            this.y = py;
        }

        /**
         * 拷贝传入参数的向量值,重新设定向量值.
         * @param v 被拷贝的原始向量值
         */
        public copyFrom(v:mVector):mVector {
            this.x = v.x;
            this.y = v.y;
            return this;
        }

        /**
         * toString函数
         */
        public toString():String {
            var rx:number = Math.round(this.x * 1000) / 1000;
            var ry:number = Math.round(this.y * 1000) / 1000;
            return "[" + rx + "," + ry + "]";
        }

        /**
         * 获得当前向量的拷贝
         */
        public clone():mVector {
            return new mVector(this.x, this.y);
        }

        /**
         * 向量加 +
         * @param v 向量,加数
         * @return 返回被加后的新的向量
         */
        public plus(v:mVector):mVector {
            return new mVector(this.x + v.x, this.y + v.y);
        }

        /**
         * 向量加等于 +=
         * @param v 向量,加数
         * @return 返回被加后的向量
         */
        public plusEquals(v:mVector):mVector {
            this.x += v.x;
            this.y += v.y;
            return this;
        }

        /**
         * 向量减 -
         * @param v 向量,减数
         * @return 返回被加后的新的向量
         */
        public minus(v:mVector):mVector {
            return new mVector(this.x - v.x, this.y - v.y);
        }

        /**
         * 向量减等于 -=
         * @param v 向量,减数
         * @return 返回被加后的向量
         */
        public minusEquals(v:mVector):mVector {
            this.x -= v.x;
            this.y -= v.y;
            return this;
        }

        /**
         * 向量非 !
         * @return 返回和原始向量相反的新向量
         */
        public negate():mVector {
            return new mVector(-this.x, -this.y);
        }

        /**
         * 向量非等于 !=
         * @return 返回被相反计算后的向量
         */
        public negateEquals():void {
            this.x = -this.x;
            this.y = -this.y;
        }

        /**
         * 向量乘 *
         * @param s 数字,乘数
         * @return 返回被加后的新向量
         */
        public mult(s:number):mVector {
            return new mVector(this.x * s, this.y * s);
        }

        /**
         * 向量乘等于 *=
         * @param s 数字,乘数
         * @return 返回被加后的向量
         */
        public multEquals(s:number):mVector {
            this.x *= s;
            this.y *= s;
            return this;
        }

        /**
         * 向量旋转
         * @param ang 数字,角度
         * @return 返回被旋转后的新向量
         */
        public rotateAngle(angle:number):mVector {
            var cos:number = TF_Class.cosD(angle);
            var sin:number = TF_Class.sinD(angle);
            var result:mVector = new mVector(this.x * cos - this.y * sin, this.y * cos + this.x * sin);
            return result;
        }

        /**
         * 向量旋转等于
         * @param ang 数字,角度
         * @return 返回被旋转后的向量
         */
        public rotateAngleEquals(angle:number):mVector {
            return this.copyFrom(this.rotateAngle(angle));
        }

        /**
         * 向量围绕指定点旋转
         * @param ang 数字,角度
         * @param targetPoint 目标点
         * @return 返回被旋转后的新向量
         */
        public rotateAngleForTarget(angle:number, targetPoint:mVector):mVector {
            var tempVector:mVector = this.minus(targetPoint);
            var cos:number = TF_Class.cosD(angle);
            var sin:number = TF_Class.sinD(angle);
            var tempResult:mVector = new mVector(tempVector.x * cos - tempVector.y * sin, tempVector.y * cos + tempVector.x * sin);
            var result:mVector = tempResult.plus(targetPoint);

            return result;
        }

        /**
         * 向量围绕指定点旋转等于
         * @param ang 数字,角度
         * @param targetPoint 目标点
         * @return 返回被旋转后的新向量
         */
        public rotateAngleForTargetEquals(angle:number, targetPoint:mVector):mVector {
            return this.copyFrom(this.rotateAngleForTarget(angle, targetPoint));
        }

        /**
         * 向量旋转
         * @param radian 数字,弧度
         * @return 返回被旋转后的新向量
         */
        public rotateRadian(radian:number):mVector {
            var cos:number = Math.cos(radian);
            var sin:number = Math.sin(radian);
            var result:mVector = new mVector(this.x * cos - this.y * sin, this.y * cos + this.x * sin);
            return result;
        }

        /**
         * 向量旋转等于
         * @param radian 数字,弧度
         * @return 返回被旋转后的向量
         */
        public rotateRadianEquals(radian:number):mVector {
            return this.copyFrom(this.rotateRadian(radian));
        }

        /**
         * 向量围绕指定点旋转
         * @param radian 数字,弧度
         * @param targetPoint 目标点
         * @return 返回被旋转后的新向量
         */
        public rotateRadianForTarget(radian:number, targetPoint:mVector):mVector {
            var tempVector:mVector = this.minus(targetPoint);
            var cos:number = Math.cos(radian);
            var sin:number = Math.sin(radian);
            var tempResult:mVector = new mVector(tempVector.x * cos - tempVector.y * sin, tempVector.y * cos + tempVector.x * sin);
            var result:mVector = tempResult.plus(targetPoint);

            return result;
        }

        /**
         * 向量围绕指定点旋转等于
         * @param radian 数字,弧度
         * @param targetPoint 目标点
         * @return 返回被旋转后的新向量
         */
        public rotateRadianForTargetEquals(radian:number, targetPoint:mVector):mVector {
            return this.copyFrom(this.rotateRadianForTarget(radian, targetPoint));
        }

        /**
         * 向量点乘 .*
         * @param v 向量,乘数
         * @return 点乘数
         */
        public dot(v:mVector):number {
            return this.x * v.x + this.y * v.y;
        }

        /**
         * 向量点差 .x
         * @param v 向量,x数
         * @return 点x数
         */
        public cross(v:mVector):number {
            return this.x * v.y - this.y * v.x;
        }

        public times(v:number):mVector {
            return new mVector(this.x * v, this.y * v);
        }

        public div(s:number):mVector {
            if (s == 0) {
                s = 0.0001;
            }

            return new mVector(this.x / s, this.y / s);
        }

        public divEquals(s:number):mVector {
            if (s == 0) {
                s = 0.0001;
            }
            this.x /= s;
            this.y /= s;
            return this;
        }

        /**
         * 获得2点之间距离
         */
        public distance(v:mVector):number {
            var delta:mVector = this.minus(v);
            return delta.getLength();
        }

        /**
         * 规格化向量,设置向量长度为1,不改变原向量
         */
        public normalize():mVector {
            var m:number = this.getLength();
            if (m == 0) {
                m = 0.0001;
            }
            return this.mult(1 / m);
        }

        /**
         * 比较两向量的值是否相同
         */
        public compare(v:mVector):Boolean {
            if (this.x == v.x && this.y == v.y) {
                return true;
            }
            return false;
        }

        /**
         * 获得向量法线
         */
        public getNormal():mVector {
            return new mVector(-this.y, this.x);
        }

        /**
         * 两向量是否互相垂直
         */
        public isNormalTo(v:mVector):Boolean {
            return (this.dot(v) == 0)
        }

        /**
         * 获得2向量的角度差
         */
        public angleBetween(v:mVector):number {
            var dp:number = this.dot(v);
            var cosAngle:number = dp / (this.getLength() * v.getLength());
            return TF_Class.acosD(cosAngle);
        }

        /**
         * 两向量夹角,弧度
         */
        public radianBetween(v:mVector):number {
            var cos:number = this.dot(v) / (this.getLength() * v.getLength());
            return Math.acos(cos);
        }

        /**
         * 获得向量长度
         */
        public getLength():number {
            return Math.sqrt(this.x * this.x + this.y * this.y)
        }

        public setLength(len:number):void {
            var r:number = this.getLength();
            if (r) {
                this.multEquals(len / r);
            } else {
                this.x = len;
            }
        }

        /**
         * 设定向量的角度
         */
        public setAngle(ang:number):void {
            var r:number = this.getLength();
            this.x = r * TF_Class.cosD(ang);
            this.y = r * TF_Class.sinD(ang);
        }

        public getAngle():number {
            return TF_Class.atan2D(this.y, this.x);
        }

    }
}