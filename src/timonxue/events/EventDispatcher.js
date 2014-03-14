///<reference path='../ImportTS.d.ts' />
/**
* Created with JetBrains WebStorm.
* User: Timonxue
* Date: 13-9-27
* Time: 下午3:47
* To change this template use File | Settings | File Templates.
*/
var tx;
(function (tx) {
    

    var EventDispatcher = (function () {
        function EventDispatcher(target) {
            this.$_eventHandlers = {};
            this._target = target;
            if (this._target == null) {
                this._target = this;
            }
        }
        EventDispatcher.prototype.destroy = function () {
            this._target = null;
            this.$_eventHandlers = null;
        };

        // maintain a list of listeners
        EventDispatcher.prototype.addEventListener = function (eventType, theHandler, listener) {
            if (typeof listener === "undefined") { listener = null; }
            this.$_eventHandlers[eventType] = this.$_eventHandlers[eventType] || [];
            this.$_eventHandlers[eventType].push([theHandler, listener]);
        };

        // remove a listener
        EventDispatcher.prototype.removeEventListener = function (eventType, theHandler) {
            this.$_eventHandlers[eventType] = this.$_eventHandlers[eventType] || [];
            var theHandlers = this.$_eventHandlers[eventType];
            if (theHandlers) {
                for (var i = 0; i < theHandlers.length; i += 1) {
                    if (theHandlers[i][0] == theHandler) {
                        theHandlers.splice(i, 1);
                    }
                }
            }
        };

        EventDispatcher.prototype.hasEventListener = function (eventType) {
            this.$_eventHandlers[eventType] = this.$_eventHandlers[eventType] || [];
            var theHandlers = this.$_eventHandlers[eventType];

            return (theHandlers != null && theHandlers.length > 0);
            //            if (theHandlers!=null && theHandlers.length > 0) {
            //                return true;
            //            }
            //            else {
            //                return false;
            //            }
        };

        // remove all listeners
        EventDispatcher.prototype.removeAllListeners = function (eventType) {
            this.$_eventHandlers[eventType] = [];
        };

        // dispatch event to all listeners
        EventDispatcher.prototype.dispatchEvent = function (theEvent) {
            theEvent.target = this._target;
            var theHandlers = this.$_eventHandlers[theEvent.type];
            if (theHandlers) {
                for (var i = 0; i < theHandlers.length; i += 1) {
                    theEvent.listener = theHandlers[i][1];
                    if (theHandlers[i][0] == null) {
                        theHandlers.splice(i, 1);
                        i--;
                        continue;
                    }
                    this.dispatchEventToHander(theEvent, theHandlers[i][0], theHandlers[i][1]);
                }
            }
        };

        // send event to a handler
        EventDispatcher.prototype.dispatchEventToHander = function (theEvent, theHandler, listener) {
            if (typeof listener === "undefined") { listener = null; }
            listener = listener || this;
            theHandler.call(listener, theEvent);
        };
        return EventDispatcher;
    })();
    tx.EventDispatcher = EventDispatcher;
})(tx || (tx = {}));
//# sourceMappingURL=EventDispatcher.js.map
