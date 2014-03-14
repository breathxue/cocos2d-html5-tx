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
    var NodeTx = (function (_super) {
        __extends(NodeTx, _super);
        function NodeTx() {
            _super.apply(this, arguments);
        }
        NodeTx.initNodeTx = function () {
            var prototype = cc.Node["prototype"];
            prototype["getChildIndex"] = _getChildIndex;
            prototype["getChildAt"] = _getChildAt;
            prototype["removeChildAt"] = _removeChildAt;
            prototype["setChildIndex"] = _setChildIndex;
            prototype["swapDGChildrenAt"] = _swapDGChildrenAt;
            prototype["swapDGChildren"] = _swapDGChildren;

            /**
            * 获得子对象的序列深度
            * @param child 子对象
            * @return 返回的序列深度 -1 为无该子对象
            */
            function _getChildIndex(child) {
                for (var i = 0; i < this._children.length; i++) {
                    if (child == this._children[i]) {
                        return i;
                    }
                }
                return -1;
            }

            /**
            * 通过序列ID获得子对象
            * @return 返回找到的子对象
            */
            function _getChildAt(index) {
                return this._children[index];
            }

            /**
            * 通过序列ID移除子对象
            * @param i 序列ID
            * TODO:美术子元件暂时不去除,如果要出去可能要利用数据
            */
            function _removeChildAt(i) {
                if (i >= 0 && i < this._children.length) {
                    this._children.splice(i, 1);
                }
            }

            /**
            * 交换2个序列深度上的子对象的显示位置
            * @param child1Index 深度参数1
            * @param child2Index 深度参数2
            * @return 是否交换成功
            */
            function _swapDGChildrenAt(child1Index, child2Index) {
                var child1 = this.getChildAt(child1Index);
                var child2 = this.getChildAt(child2Index);
                if (child1 && child2 && child1.getZOrder() == child2.getZOrder()) {
                    this._children[child1Index] = child2;
                    this._children[child2Index] = child1;
                    return true;
                } else {
                    return false;
                }
            }

            /**
            * 交换2个子对象的显示位置
            * @param child1 子对象1
            * @param child2 子对象2
            * @return 是否交换成功
            */
            function _swapDGChildren(child1, child2) {
                if (child1.getZOrder() == child2.getZOrder()) {
                    var child1Index = this.getChildIndex(child1);
                    var child2Index = this.getChildIndex(child2);
                    if (child1Index == -1 || child2Index == -1) {
                        return false;
                    } else {
                        this._children[child1Index] = child2;
                        this._children[child2Index] = child1;
                        return true;
                    }
                }
                return false;
            }

            /**
            * 设定子元件的层次位置.
            * @param child 子显示对象
            * @param index 指定的深度
            * @return 是否设置成功
            */
            function _setChildIndex(child, index) {
                var child1Index = this.getChildIndex(child);
                if (child1Index == -1) {
                    return false;
                } else {
                    var minLevel = -1;
                    var maxLevel = this._children.length;

                    for (var i = 0; i < this._children.length; i++) {
                        if ((this._children[i]).getZOrder() < child.getZOrder()) {
                            minLevel = i;
                        }
                        if (i < maxLevel && (this._children[i]).getZOrder() > child.getZOrder()) {
                            maxLevel = i;
                        }
                    }

                    //前一个LEVEL的最后一个位置+1
                    minLevel += 1;

                    //后一个LEVEL最前位置-1
                    maxLevel -= 1;
                    if (index < minLevel) {
                        index = minLevel;
                    }
                    if (index > maxLevel) {
                        index = maxLevel;
                    }
                    this._children.splice(child1Index, 1);
                    this._children.splice(index, 0, child);
                    return true;
                }
            }
        };
        return NodeTx;
    })(cc.Node);
    tx.NodeTx = NodeTx;
})(tx || (tx = {}));
//# sourceMappingURL=NodeTx.js.map
