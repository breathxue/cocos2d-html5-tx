///<reference path='../ImportTS.d.ts' />
module tx{
    /**
     * TODO:类功能摘要
     * @author TimonXue
     * @Create Date 2013-4-7
     */
    export class SharedObjectUtil {
        private static gameName:String;
        private static PREFIX:String = "RiverRunGames";
        private static GLOBAL:String = "global";
        private static sharedObjectInited:Boolean;
        private static saveObjectCashed:any[] = [];
        private static _registerClassAliasArr:_registerClassAliasObject[] = [];
        private static __registerClassName__:string = "__registerClassName__";
        private static __sameClassId__:string = "__sameClassId__";
        private static __classId__:string = "__classId__";
        private static __saveId:number = 0;

        public static init(sharedObjectGameName:String):void {
            SharedObjectUtil.gameName = sharedObjectGameName;
            SharedObjectUtil.sharedObjectInited = true;
        }

        public static getGlobal(name:String):SharedObject {
            var key:string = SharedObjectUtil.PREFIX + "_" + SharedObjectUtil.GLOBAL + "_" + name;
            var tmpObj:Object = JSON.parse(localStorage.getItem(key));
            tmpObj = tmpObj ? tmpObj : new Object();
            SharedObjectUtil.__saveId = 0;
            SharedObjectUtil.saveObjectCashed = [];
            SharedObjectUtil.parseToRealObject(tmpObj);
            return new SharedObject(key, tmpObj);
        }

        public static getLocal(name:string):SharedObject {
            var key:string = SharedObjectUtil.PREFIX + "_" + SharedObjectUtil.gameName + "_" + name;
            var tmpObj:Object = JSON.parse(localStorage.getItem(key));
            tmpObj = tmpObj ? tmpObj : new Object();
            SharedObjectUtil.__saveId = 0;
            SharedObjectUtil.saveObjectCashed = [];
            SharedObjectUtil.parseToRealObject(tmpObj);
            return new SharedObject(key, tmpObj);

        }

        public static save(sharedObject:SharedObject):void {
            var tmpObj:Object = sharedObject.data;
            SharedObjectUtil.__saveId = 0;
            SharedObjectUtil.saveObjectCashed = [];
            var retObj:Object = SharedObjectUtil.parseToSaveObject(tmpObj);
            localStorage.setItem(sharedObject.keyName, JSON.stringify(retObj));
        }


        public static registerClassAlias(name:string, cls:any):void {
            SharedObjectUtil._registerClassAliasArr.push(new _registerClassAliasObject(name, cls))
        }

        private static parseToRealObject(object:Object):Object {
            var returnObject:Object = object;
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
                }
                else if (object[i].constructor == Object) {
//                    trace("This is an Object");
                    returnObject[i] = SharedObjectUtil.parseToRealObject(object[i]);
                }
                else if (object[i].constructor == Array) {
//                    trace("This is an Array");
                    returnObject[i] = SharedObjectUtil.parseToRealObject(object[i]);
                }
                else {
                    returnObject[i] = object[i];
                }
            }

            return returnObject;
        }

        //private static

        private static parseToSaveObject(object:Object):Object {
            var retObject:Object = new Object();
            if (object["constructor"] == Array) {
                retObject = [];
            }
            var boolClass:any = Boolean;
            var stringClass:any = String;
            var pos:number;
            var tempId:number;
            for (var i in object) {
//                trace("-------" + object[i] + "-------" + i + "--------------")
//                if (object[i] == undefined) {
//                    trace("This is an undefined");
//                }
                if (object[i] == Function) {
//                    trace("This is an function");
                }
                else if (object[i] == null) {
//                    trace("This is an null");
                    retObject[i] = null;
                }
                else if (object[i].constructor == boolClass) {
//                    trace("This is an Boolean");
                    retObject[i] = object[i];
                }
                else if (object[i].constructor == stringClass) {
//                    trace("This is an String");
                    retObject[i] = object[i];
                }
                else if (object[i].constructor == Number) {
//                    trace("This is an Number");
                    retObject[i] = object[i];
                }
                else if (object[i].constructor == Object) {
//                    trace("This is an Object");
                    pos = SharedObjectUtil.saveObjectCashed.indexOf(object[i]);
                    if (pos != -1) {
                        retObject[i] = new Object();
                        retObject[i][SharedObjectUtil.__sameClassId__] = pos;
                    }
                    else {
                        tempId = SharedObjectUtil.__saveId;
                        SharedObjectUtil.saveObjectCashed[tempId] = object[i];
                        SharedObjectUtil.__saveId++;
                        retObject[i] = SharedObjectUtil.parseToSaveObject(object[i]);
                        retObject[i][SharedObjectUtil.__classId__] = tempId;
                    }
                }
                else if (object[i].constructor == Array) {
//                    trace("This is an Array");
                    pos = SharedObjectUtil.saveObjectCashed.indexOf(object[i]);
                    if (pos != -1) {
                        retObject[i] = new Object();
                        retObject[i][SharedObjectUtil.__sameClassId__] = pos;
                    }
                    else {
                        tempId = SharedObjectUtil.__saveId;
                        SharedObjectUtil.saveObjectCashed[tempId] = object[i];
                        SharedObjectUtil.__saveId++;
                        retObject[i] = SharedObjectUtil.parseToSaveObject(object[i]);
                        retObject[i][SharedObjectUtil.__classId__] = tempId;

                    }
                }
                else {
                    //trace("This is an Class",object,object.constructor,i,object[i].constructor);
                    for (var j in SharedObjectUtil._registerClassAliasArr) {
                        if (object[i].constructor == SharedObjectUtil._registerClassAliasArr[j].cls) {
                            pos = SharedObjectUtil.saveObjectCashed.indexOf(object[i]);
                            if (pos != -1) {
                                //trace("aaaaaaaaaa");
                                retObject[i] = new Object();
                                retObject[i][SharedObjectUtil.__sameClassId__] = pos;
                            }
                            else {
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
        }
    }

    export class SharedObject {
        constructor(keyName:string, data:Object) {
            this.data = data;
            if (this.data == null) {
                this.data = new Object();
            }
            this.keyName = keyName;
        }

        public data:Object;
        public keyName:string;
    }

    export class _registerClassAliasObject {
        constructor(className:string, cls:Object) {
            this.className = className;
            this.cls = cls;
        }

        public className:string;
        public cls:any;
    }
}