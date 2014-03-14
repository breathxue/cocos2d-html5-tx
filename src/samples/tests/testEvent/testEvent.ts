///<reference path='../ImportTS.d.ts' />
class TestEvent {
    public _root:Root;

    constructor(root:Root) {
        this._root = root;

        var ed:tx.EventDispatcher = new tx.EventDispatcher();
        ed.addEventListener("event",this.listnerHander,this);
        ed.dispatchEvent(new tx.Event("event"));
        //
        ed.removeEventListener("event",this.listnerHander);
        trace("removeOK");
        ed.dispatchEvent(new tx.Event("event"));

    }

    public listnerHander(e:tx.Event):void
    {
        trace("onHander", (<TestEvent>e.listener)._root);
        trace("onHander2", this._root);
    }

}