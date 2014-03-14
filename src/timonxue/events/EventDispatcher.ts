///<reference path='../ImportTS.d.ts' />

/**
 * Created with JetBrains WebStorm.
 * User: Timonxue
 * Date: 13-9-27
 * Time: 下午3:47
 * To change this template use File | Settings | File Templates.
 */
module tx {
    /**
     * TODO:类功能摘要
     * @author TimonXue
     * @Create Date 2013-4-7
     */
    export interface IEventDispatcher extends IDestroyable {
        // maintain a list of listeners
        addEventListener(eventType:string, theHandler:(e:Event) => void, listener?:Object);

        // remove a listener
        removeEventListener(eventType:string, theHandler:(e:Event) => void);

        // remove all listeners
        removeAllListeners(eventType:string);

        hasEventListener(eventType:string):Boolean;

        // dispatch event to all listeners
        dispatchEvent(theEvent:Event);

        // send event to a handler
        dispatchEventToHander(theEvent:Event, theHandler:(e:Event) => void);
    }

    export class EventDispatcher implements IEventDispatcher {

        public $_eventHandlers = {};
        private _target:Object;

        constructor(target?:Object) {
            this._target = target;
            if (this._target == null) {
                this._target = this;
            }
        }

        public destroy():void {
            this._target = null;
            this.$_eventHandlers = null;
        }

        // maintain a list of listeners
        public addEventListener(eventType:string, theHandler:(e:Event) => void, listener:Object = null) {
            this.$_eventHandlers[eventType] = this.$_eventHandlers[eventType] || [];
            this.$_eventHandlers[eventType].push([theHandler, listener]);
        }


        // remove a listener
        public removeEventListener(eventType:string, theHandler:(e:Event) => void) {
            this.$_eventHandlers[eventType] = this.$_eventHandlers[eventType] || [];
            var theHandlers = this.$_eventHandlers[eventType];
            if (theHandlers) {
                for (var i = 0; i < theHandlers.length; i += 1) {
                    if (theHandlers[i][0] == theHandler) {
                        theHandlers.splice(i, 1);
                    }
                }
            }
        }

        public hasEventListener(eventType:string):Boolean {
            this.$_eventHandlers[eventType] = this.$_eventHandlers[eventType] || [];
            var theHandlers = this.$_eventHandlers[eventType];

            return (theHandlers != null && theHandlers.length > 0);
//            if (theHandlers!=null && theHandlers.length > 0) {
//                return true;
//            }
//            else {
//                return false;
//            }
        }

        // remove all listeners
        public removeAllListeners(eventType:string) {
            this.$_eventHandlers[eventType] = [];
        }

        // dispatch event to all listeners
        public dispatchEvent(theEvent:Event) {
            theEvent.target = this._target;
            var theHandlers = this.$_eventHandlers[theEvent.type];
            if (theHandlers) {
                for (var i = 0; i < theHandlers.length; i += 1) {
                    theEvent.listener = theHandlers[i][1];
                    if(theHandlers[i][0]==null)
                    {
                        theHandlers.splice(i, 1);
                        i--;
                        continue;
                    }
                    this.dispatchEventToHander(theEvent, theHandlers[i][0], theHandlers[i][1]);
                }
            }
        }

        // send event to a handler
        public dispatchEventToHander(theEvent:Event, theHandler:(e:Event) => void, listener:Object = null) {
            listener = listener || this;
            theHandler.call(listener, theEvent);
        }
    }
}