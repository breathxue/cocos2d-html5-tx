///<reference path='../ImportTS.d.ts' />
function trace() {
    var args = [];
    for (var _i = 0; _i < (arguments.length - 0); _i++) {
        args[_i] = arguments[_i + 0];
    }
    var out = "";
    for (var i = 0; i < args.length; i++) {
        var arg = args[i];
        if (arg instanceof cc.Point) {
            out += "(" + arg.x + "," + arg.y + ")" + " ";
        } else if (arg && arg["toString"]) {
            out += arg["toString"]() + " ";
        } else {
            out += arg + " ";
        }
    }

    //    var stack = getCallStack();
    //    out += "\t[";
    //    for (var i = 1; i < stack.length; i++) {
    //        if (stack[i].name) {
    //            out += "<=" + stack[i].name + "() ";
    //        }
    //    }
    //    out += "]";
    console.log(out);
    logToServer(out);
}

function getCallStack() {
    var stack = [];
    var fun = getCallStack;
    while (fun = fun.caller) {
        if (!fun)
            break;
        stack.push(fun);
        if (stack.length > 10) {
            return stack;
        }
    }
    return stack;
}

function logToServer(out) {
    var xh = TC.getXmlHttp();
    if (xh != null) {
        try  {
            xh.open("POST", "http://192.168.189.93:3051/web/log?user=log&project=" + TC.projectName, true);
            xh.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xh.send("msg=" + out);
        } catch (e) {
            TC.errorNum++;
        }
    }
}

function Trace() {
    var args = [];
    for (var _i = 0; _i < (arguments.length - 0); _i++) {
        args[_i] = arguments[_i + 0];
    }
    trace(args);
}

var TC = (function () {
    function TC() {
    }
    TC.init = function (projectName, debug) {
        if (typeof debug === "undefined") { debug = true; }
        TC.projectName = projectName;
        TC.__debug__ = debug;

        window.onerror = function (msg, url, line, column, errorObj) {
            logToServer("Error: " + msg + "\nurl: " + url + "\nline #: " + line);
            if (errorObj.stack) {
                logToServer(errorObj.stack.replace("/at /g", "<br/>at "));
            }
        };
    };

    TC.getXmlHttp = function () {
        if (!TC.__debug__ || TC.errorNum > 10) {
            return null;
        }
        try  {
            TC.xmlHttp = new XMLHttpRequest();
            return TC.xmlHttp;
        } catch (e) {
            try  {
                TC.xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
                return TC.xmlHttp;
            } catch (e) {
                try  {
                    TC.xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
                    return TC.xmlHttp;
                } catch (e) {
                    cc.log("您的浏览器不支持AJAX！");
                    return null;
                }
            }
        }
    };
    TC.errorNum = 0;
    return TC;
})();
//# sourceMappingURL=Trace.js.map
