///<reference path='../ImportTS.d.ts' />
var tx;
(function (tx) {
    /**
    * TODO:类功能摘要
    * @author TimonXue
    * @Create Date 2013-4-7
    */
    var SharedObjectUtil = (function () {
        function SharedObjectUtil() {
        }
        SharedObjectUtil.init = function (sharedObjectGameName) {
            SharedObjectUtil.gameName = sharedObjectGameName;
            SharedObjectUtil.sharedObjectInited = true;
        };

        SharedObjectUtil.getGlobal = function (name) {
            var key = SharedObjectUtil.PREFIX + "_" + SharedObjectUtil.GLOBAL + "_" + name;
            var tmpObj = JSON.parse(localStorage.getItem(key));
            tmpObj = tmpObj ? tmpObj : new Object();
            SharedObjectUtil.__saveId = 0;
            SharedObjectUtil.saveObjectCashed = [];
            SharedObjectUtil.parseToRealObject(tmpObj);
            return new SharedObject(key, tmpObj);
        };

        SharedObjectUtil.getLocal = function (name) {
            var key = SharedObjectUtil.PREFIX + "_" + SharedObjectUtil.gameName + "_" + name;
            var tmpObj = JSON.parse(localStorage.getItem(key));
            tmpObj = tmpObj ? tmpObj : new Object();
            SharedObjectUtil.__saveId = 0;
            SharedObjectUtil.saveObjectCashed = [];
            SharedObjectUtil.parseToRealObject(tmpObj);
            return new SharedObject(key, tmpObj);
        };

        SharedObjectUtil.save = function (sharedObject) {
            var tmpObj = sharedObject.data;
            SharedObjectUtil.__saveId = 0;
            SharedObjectUtil.saveObjectCashed = [];
            var retObj = SharedObjectUtil.parseToSaveObject(tmpObj);
            localStorage.setItem(sharedObject.keyName, JSON.stringify(retObj));
        };

        SharedObjectUtil.registerClassAlias = function (name, cls) {
            SharedObjectUtil._registerClassAliasArr.push(new _registerClassAliasObject(name, cls));
        };

        SharedObjectUtil.parseToRealObject = function (object) {
            var returnObject = object;
            if (object[SharedObjectUtil.__registerClassName__] != null) {
                for (var j in SharedObjectUtil._registerClassAliasArr) {
                    if (object[SharedObjectUtil.__registerClassName__] == SharedObjectUtil._registerClassAliasArr[j].className) {
                        returnObject = new SharedObjectUtil._registerClassAliasArr[j].cls();
                    }
                }
            }
            if (object[SharedObjectUtil.__sameClassId__] != null) {
                returnObject = SharedObjectUtil.saveObjectCashed[object[SharedObjectUtil.__sameClassId__]];
                return returnObject;
            }
            if (object[SharedObjectUtil.__classId__] != null) {
                SharedObjectUtil.saveObjectCashed[object[SharedObjectUtil.__classId__]] = returnObject;
            }
            for (var i in object) {
                if (object[i] == null) {
                    //                    trace("This is an null");
                    returnObject[i] = null;
                } else if (object[i].constructor == Object) {
                    //                    trace("This is an Object");
                    returnObject[i] = SharedObjectUtil.parseToRealObject(object[i]);
                } else if (object[i].constructor == Array) {
                    //                    trace("This is an Array");
                    returnObject[i] = SharedObjectUtil.parseToRealObject(object[i]);
                } else {
                    returnObject[i] = object[i];
                }
            }

            return returnObject;
        };

        //private static
        SharedObjectUtil.parseToSaveObject = function (object) {
            var retObject = new Object();
            if (object["constructor"] == Array) {
                retObject = [];
            }
            var boolClass = Boolean;
            var stringClass = String;
            var pos;
            var tempId;
            for (var i in object) {
                //                trace("-------" + object[i] + "-------" + i + "--------------")
                //                if (object[i] == undefined) {
                //                    trace("This is an undefined");
                //                }
                if (object[i] == Function) {
                    //                    trace("This is an function");
                } else if (object[i] == null) {
                    //                    trace("This is an null");
                    retObject[i] = null;
                } else if (object[i].constructor == boolClass) {
                    //                    trace("This is an Boolean");
                    retObject[i] = object[i];
                } else if (object[i].constructor == stringClass) {
                    //                    trace("This is an String");
                    retObject[i] = object[i];
                } else if (object[i].constructor == Number) {
                    //                    trace("This is an Number");
                    retObject[i] = object[i];
                } else if (object[i].constructor == Object) {
                    //                    trace("This is an Object");
                    pos = SharedObjectUtil.saveObjectCashed.indexOf(object[i]);
                    if (pos != -1) {
                        retObject[i] = new Object();
                        retObject[i][SharedObjectUtil.__sameClassId__] = pos;
                    } else {
                        tempId = SharedObjectUtil.__saveId;
                        SharedObjectUtil.saveObjectCashed[tempId] = object[i];
                        SharedObjectUtil.__saveId++;
                        retObject[i] = SharedObjectUtil.parseToSaveObject(object[i]);
                        retObject[i][SharedObjectUtil.__classId__] = tempId;
                    }
                } else if (object[i].constructor == Array) {
                    //                    trace("This is an Array");
                    pos = SharedObjectUtil.saveObjectCashed.indexOf(object[i]);
                    if (pos != -1) {
                        retObject[i] = new Object();
                        retObject[i][SharedObjectUtil.__sameClassId__] = pos;
                    } else {
                        tempId = SharedObjectUtil.__saveId;
                        SharedObjectUtil.saveObjectCashed[tempId] = object[i];
                        SharedObjectUtil.__saveId++;
                        retObject[i] = SharedObjectUtil.parseToSaveObject(object[i]);
                        retObject[i][SharedObjectUtil.__classId__] = tempId;
                    }
                } else {
                    for (var j in SharedObjectUtil._registerClassAliasArr) {
                        if (object[i].constructor == SharedObjectUtil._registerClassAliasArr[j].cls) {
                            pos = SharedObjectUtil.saveObjectCashed.indexOf(object[i]);
                            if (pos != -1) {
                                //trace("aaaaaaaaaa");
                                retObject[i] = new Object();
                                retObject[i][SharedObjectUtil.__sameClassId__] = pos;
                            } else {
                                tempId = SharedObjectUtil.__saveId;
                                SharedObjectUtil.saveObjectCashed[tempId] = object[i];
                                SharedObjectUtil.__saveId++;
                                retObject[i] = SharedObjectUtil.parseToSaveObject(object[i]);
                                retObject[i][SharedObjectUtil.__registerClassName__] = SharedObjectUtil._registerClassAliasArr[j].className;
                                retObject[i][SharedObjectUtil.__classId__] = tempId;
                                //trace(SharedObjectUtil.__saveId++);
                            }
                        }
                    }
                }
            }
            return retObject;
        };
        SharedObjectUtil.PREFIX = "RiverRunGames";
        SharedObjectUtil.GLOBAL = "global";

        SharedObjectUtil.saveObjectCashed = [];
        SharedObjectUtil._registerClassAliasArr = [];
        SharedObjectUtil.__registerClassName__ = "__registerClassName__";
        SharedObjectUtil.__sameClassId__ = "__sameClassId__";
        SharedObjectUtil.__classId__ = "__classId__";
        SharedObjectUtil.__saveId = 0;
        return SharedObjectUtil;
    })();
    tx.SharedObjectUtil = SharedObjectUtil;

    var SharedObject = (function () {
        function SharedObject(keyName, data) {
            this.data = data;
            if (this.data == null) {
                this.data = new Object();
            }
            this.keyName = keyName;
        }
        return SharedObject;
    })();
    tx.SharedObject = SharedObject;

    var _registerClassAliasObject = (function () {
        function _registerClassAliasObject(className, cls) {
            this.className = className;
            this.cls = cls;
        }
        return _registerClassAliasObject;
    })();
    tx._registerClassAliasObject = _registerClassAliasObject;
})(tx || (tx = {}));
//# sourceMappingURL=SharedObjectUtil.js.map
