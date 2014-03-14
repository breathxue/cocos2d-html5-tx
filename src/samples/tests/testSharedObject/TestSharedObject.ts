///<reference path='../ImportTS.d.ts' />
class TestSharedObject {
    public _root:Root;
    public _so:tx.SharedObject;

    constructor(root:Root) {
        this._root = root;

//        this.test1();

        this.test2();

    }

    public test2():void {
//        tx.SharedObjectUtil.registerClassAlias("tx.testMovieClip",testMovieClip);
        tx.SharedObjectUtil.registerClassAlias("Object1",Object1);
        tx.SharedObjectUtil.registerClassAlias("Object2",Object2);
        tx.SharedObjectUtil.registerClassAlias("Object3",Object3);
        tx.SharedObjectUtil.init("GAMENAME111")
        this._so = tx.SharedObjectUtil.getLocal("test1");
        this._so.data["aaa"] = new testMovieClip(new cc.Node());
        this._so.data["bbb"] = {a:1,b:2};
        this._so.data["ccc"] = 111;
        this._so.data["ddd"] = "ddd";
        this._so.data["eee"] = [1,2,3];
        this._so.data["fff"] = true;
        this._so.data["ggg"] = undefined;
        this._so.data["hhh"] = NaN;
        this._so.data["iii"] = null;
        this._so.data["jjj"] = "";
        var t = new Object1();
        this._so.data["kkk"] = t;
        this._so.data["lll"] = t;
        tx.SharedObjectUtil.save(this._so);
    }

    public test1():void {
        tx.SharedObjectUtil.init("GAMENAME111")
        this._so = tx.SharedObjectUtil.getLocal("test1");
        trace(this._so.data["aaa"])
        trace(this._so.data["bbb"])
        this._so.data["aaa"] = 1;
        this._so.data["bbb"] = "aaaa";
        tx.SharedObjectUtil.save(this._so);
    }
}

class Object1 {
    ob1_1:Boolean = true;
    ob1_2:number = 1;
    ob1_3:string;
    ob1_4:any[];
    ob1_5:Object;
    ob1_6:Object2;
    ob1_7:Object3;
    ob1_8:Object;
    ob1_9:Object2[];
    constructor()
    {
       this.ob1_3 = "obj1_3";
       this.ob1_4 = [1,"obj1_4111",true,[2,"obj1_4222",false,[3,"obj1_4333",true]],{obj1_5arr:[1,"obj1_5111",true,[2,"obj1_5222",false,[3,"obj1_5333",true]]],obj1_5a:true,obj1_5b:1,obj1_5c:"obj1_5c"}];
       this.ob1_5 = {obj1_5arr:[1,"obj1_5111",true,[2,"obj1_5222",false,[3,"obj1_5333",true]]],obj1_5a:true,obj1_5b:1,obj1_5c:"obj1_5c",obj1_5Obj:{obj1_5arr:[1,"obj1_5111",true,[2,"obj1_5222",false,[3,"obj1_5333",true]]],obj1_5a:true,obj1_5b:1,obj1_5c:"obj1_5c"}};
       this.ob1_6 = new Object2();
       this.ob1_7 = new Object3();
       this.ob1_8 = {ob1_8_obj2:new Object2(),ob1_8_obj3:new Object3,ob1_8_obj:{obj1_5arr:[1,"obj1_5111",true,[2,"obj1_5222",false,[3,"obj1_5333",true]]],obj1_5a:true,obj1_5b:1,obj1_5c:"obj1_5c"}}
       this.ob1_9 = [new Object2(),new Object2()]
    }
}

class Object2 {
    ob2_1:Boolean = true;
    ob2_2:number = 1;
    ob2_3:string;
    ob2_4:any[];
    ob2_5:Object;
    ob2_6:Object3;
    ob2_7:Object3[];
    ob2_8:Object;
    constructor()
    {
        this.ob2_3 = "obj2_3";
        this.ob2_4 = [1,"obj2_4111",true,[2,"obj2_4222",false,[3,"obj2_4333",true]],{obj2_5arr:[1,"obj2_5111",true,[2,"obj2_5222",false,[3,"obj2_5333",true]]],obj2_5a:true,obj2_5b:1,obj2_5c:"obj2_5c"}];
        this.ob2_5 = {obj2_5arr:[1,"obj2_5111",true,[2,"obj2_5222",false,[3,"obj2_5333",true]]],obj2_5a:true,obj2_5b:1,obj2_5c:"obj2_5c",obj2_5Obj:{obj2_5arr:[1,"obj2_5111",true,[2,"obj2_5222",false,[3,"obj2_5333",true]]],obj2_5a:true,obj2_5b:1,obj2_5c:"obj2_5c"}};
        this.ob2_6 = new Object3();
        this.ob2_7 = [new Object3(),new Object3()]
        this.ob2_8 = {ob2_8_obj2:new Object3(),ob2_8_obj3:new Object3(),ob2_8_obj:{obj2_5arr:[1,"obj2_5111",true,[2,"obj2_5222",false,[3,"obj2_5333",true]]],obj2_5a:true,obj2_5b:1,obj2_5c:"obj2_5c"}}
    }
}

class Object3 {
    ob3_1:Boolean = true;
    ob3_2:number = 1;
    ob3_3:string;
    ob3_4:any[];
    ob3_5:Object;
    constructor()
    {
        this.ob3_3 = "obj3_3";
        this.ob3_4 = [1,"obj3_4111",true,[2,"obj3_4222",false,[3,"obj3_4333",true]],{obj3_5arr:[1,"obj3_5111",true,[2,"obj3_5222",false,[3,"obj3_5333",true]]],obj3_5a:true,obj3_5b:1,obj3_5c:"obj3_5c"}];
        this.ob3_5 = {obj2_5arr:[1,"obj3_5111",true,[2,"obj3_5222",false,[3,"obj3_5333",true]]],obj3_5a:true,obj3_5b:1,obj3_5c:"obj3_5c",obj3_5Obj:{obj3_5arr:[1,"obj3_5111",true,[2,"obj3_5222",false,[3,"obj3_5333",true]]],obj3_5a:true,obj3_5b:1,obj3_5c:"obj3_5c"}};
    }
}