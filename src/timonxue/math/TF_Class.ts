///<reference path='../ImportTS.d.ts' />
module tx{
    /**
     * TODO:类功能摘要
     * @author TimonXue
     * @Create Date 2013-4-7
     */
    export class TF_Class {

        /**
         * 正弦函数
         */
        public static sinD(angle:number):number {
            return Math.sin((angle * Math.PI / 180));
        }

        /**
         * 余弦函数
         */
        public static cosD(angle:number):number {
            return Math.cos(angle * Math.PI / 180);
        }

        /**
         * 正切函数
         */
        public static tanD(angle:number):number {
            return Math.tan(angle * Math.PI / 180);
        }

        /**
         * 反正弦函数
         */
        public static asinD(ratio:number):number {
            return Math.asin(ratio) * (180 / Math.PI);
        }

        /**
         * 反余弦函数
         */
        public static acosD(ratio:number):number {
            return Math.acos(ratio) * (180 / Math.PI);
        }

        /**
         * 反正切函数
         */
        public static atanD(ratio:number):number {
            return Math.atan(ratio) * (180 / Math.PI);
        }

        /**
         * 两倍反正切函数
         */
        public static atan2D(y:number, x:number):number {
            return Math.atan2(y, x) * (180 / Math.PI);
        }

        /**
         * 2点之前距离
         */
        public static distance(x1:number, y1:number, x2:number, y2:number):number {
            var dx:number = x2 - x1;
            var dy:number = y2 - y1;
            return Math.sqrt(dx * dx + dy * dy);
        }

        /**
         * 2点连线的角度
         */
        public static angleOfLine(x1:number, y1:number, x2:number, y2:number):number {
            return TF_Class.atan2D(y2 - y1, x2 - x1);
        }

        /**
         * 角度转弧度
         */
        public static degreesToRadians(angle:number):number {
            return angle * (Math.PI / 180);
        }

        /**
         * 弧度转角度
         */
        public static radiansToDegrees(radian:number):number {
            return radian * (180 / Math.PI);
        }

        /**
         * 角度值归正函数,归正传入参数的角度值,返回0度至360度的角度值.
         */
        public static fixAngle(angle:number):number {
            return ((angle %= 360) < 0) ? angle + 360 : angle;
        }

        /**
         * 计算向量的角度和长度
         * @return 返回object,object.r为长度,object.t为角度
         */
        public static cartesianToPolar(p:mVector):Object {
            var radius:number = Math.sqrt(p.x * p.x + p.y + p.y);
            var theta:number = TF_Class.atan2D(p.y, p.x);
            return {r: radius, t: theta};
        }

        /**
         * 角度值归正函数,归正传入参数的角度值,返回-180度至180度的角度值.
         */
        public static FormatAngle(angle:number):number {
            angle = angle % 360;
            if (angle > 180) {
                angle = angle - 360;
            }
            if (angle < -180) {
                angle = angle + 360;
            }
            return angle;
        }

        /**
         * 角度值归正函数,归正传入参数的角度值,返回-90度至90度的角度值.
         */
        public static FormatAngle90(angle:number):number {
            angle = angle % 180;
            if (angle > 90) {
                angle = 180 - angle;
            }
            if (angle < -90) {
                angle = angle + 180;
            }
            return angle;
        }
    }
}