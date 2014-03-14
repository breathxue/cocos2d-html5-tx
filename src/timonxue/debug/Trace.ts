///<reference path='../ImportTS.d.ts' />
function trace(...args:any[]):void {
    var out:string = "";
    for (var i:number = 0; i < args.length; i++) {
        var arg = args[i];
        if (arg instanceof cc.Point) {
            out += "(" + arg.x + "," + arg.y + ")" + " ";
        } else if (arg && arg["toString"]) {
            out += arg["toString"]() + " ";
        }
        else {
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
    var fun:Function = getCallStack;
    while (fun = fun.caller) {
        if (!fun)break;
        stack.push(fun)
        if (stack.length > 10) {
            return stack;
        }
    }
    return stack;
}

function logToServer(out) {
    var xh = TC.getXmlHttp();
    if (xh != null) {
        try {
            xh.open("POST", "http://192.168.189.93:3051/web/log?user=log&project=" + TC.projectName, true);
            xh.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xh.send("msg=" + out);
        }
        catch (e) {
            TC.errorNum++;
        }
    }
}

function Trace(...args:any[]):void {
    trace(args);
}

class TC {
    private static xmlHttp;
    static projectName;
    static errorNum:number = 0;
    static __debug__:Boolean;

    static init(projectName:string, debug:Boolean = true) {
        TC.projectName = projectName;
        TC.__debug__ = debug;

        (<Window>window).onerror = <ErrorEventHandler>function (msg, url, line, column, errorObj) {
            logToServer("Error: " + msg + "\nurl: " + url + "\nline #: " + line);
            if (errorObj.stack) {
                logToServer((<string>errorObj.stack).replace("/at /g", "<br/>at "));
            }
        };
    }

    static getXmlHttp() {
        if (!TC.__debug__ || TC.errorNum > 10) {
            return null;
        }
        try {
            TC.xmlHttp = new XMLHttpRequest();
            return TC.xmlHttp;
        }
        catch (e) {
            try {
                TC.xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
                return TC.xmlHttp;
            }
            catch (e) {
                try {
                    TC.xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
                    return TC.xmlHttp;
                }
                catch (e) {
                    cc.log("您的浏览器不支持AJAX！");
                    return null;
                }
            }
        }
    }
}