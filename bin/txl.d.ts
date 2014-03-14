/// <reference path="../src/timonxue/ImportTS.d.ts" />
declare function trace(...args: any[]): void;
/**
* Created with JetBrains WebStorm.
* User: admin
* Date: 13-9-27
* Time: 下午3:47
* To change this template use File | Settings | File Templates.
*/
declare module tx.ev {
    class Event {
        public type: string;
        public target: Object;
        constructor(type: string);
    }
}
/**
* Created with JetBrains WebStorm.
* User: admin
* Date: 13-9-27
* Time: 下午3:47
* To change this template use File | Settings | File Templates.
*/
declare module tx.ev {
    interface IEventDispatcher {
        addEventListener(eventType: string, theHandler: (e: ev.Event) => void): any;
        removeEventListener(eventType: string, theHandler: (e: ev.Event) => void): any;
        removeAllListeners(eventType: string): any;
        dispatchEvent(theEvent: ev.Event): any;
        dispatchEventToHander(theEvent: ev.Event, theHandler: (e: ev.Event) => void): any;
    }
    class EventDispatcher implements IEventDispatcher {
        private _eventHandlers;
        private _target;
        constructor(target?: Object);
        public destroy(): void;
        public addEventListener(eventType: string, theHandler: (e: ev.Event) => void): void;
        public removeEventListener(eventType: string, theHandler: (e: ev.Event) => void): void;
        public removeAllListeners(eventType: string): void;
        public dispatchEvent(theEvent: ev.Event): void;
        public dispatchEventToHander(theEvent: ev.Event, theHandler: (e: ev.Event) => void): void;
    }
}
declare module tx.ev {
    class MouseTouchEvent extends ev.Event {
        static MOUSE_DOWN_TOUCH_BEGAN: string;
        static MOUSE_UP_TOUCH_ENDED: string;
        static MOUSE_DRAGGED_TOUCH_MOVE: string;
        static MOUSE_TOUCH_OVER: string;
        static MOUSE_TOUCH_OUT: string;
        public pos: cc.Point;
        constructor(type: string, pos: cc.Point);
    }
}
declare module tx {
    function interactiveObjectCreate(mc: cc.Layer, listerOb?: IInteractiveObject): void;
    function interactiveObjectRemove(mc: cc.Layer): void;
    interface IInteractiveObject {
        onMouseDown(event: any): void;
        onMouseDragged(event: any): void;
        onMouseUp(event: any): void;
        onTouchBegan(touch: cc.Touch, event: any): any;
        onTouchMoved(touch: cc.Touch, event: any): any;
        onTouchEnded(touch: cc.Touch, event: any): any;
        onTouchesBegan(touch: cc.Touch[], event: any): any;
        onTouchesMoved(touch: cc.Touch[], event: any): any;
        onTouchesEnded(touch: cc.Touch[], event: any): any;
        onMouseDownTouchBegan(pos: cc.Point): void;
        onMouseTouchEndedUp(pos: cc.Point): void;
        onMouseDraggedTouchMove(pos: cc.Point): void;
    }
}
declare module tx {
    class InteractiveObject extends tx.ev.EventDispatcher implements tx.IInteractiveObject {
        public _mc: cc.Layer;
        constructor(mc: cc.Layer);
        public destroy(): void;
        public getMc(): cc.Layer;
        public onMouseDown(event: any): void;
        public onMouseDragged(event: any): void;
        public onMouseUp(event: any): void;
        public onTouchBegan(touch: cc.Touch, event: any): void;
        public onTouchMoved(touch: cc.Touch, event: any): void;
        public onTouchEnded(touch: cc.Touch, event: any): void;
        public onTouchesBegan(touch: cc.Touch[], event: any): void;
        public onTouchesMoved(touch: cc.Touch[], event: any): void;
        public onTouchesEnded(touch: cc.Touch[], event: any): void;
        public onMouseDownTouchBegan(pos: cc.Point): void;
        public onMouseTouchEndedUp(pos: cc.Point): void;
        public onMouseDraggedTouchMove(pos: cc.Point): void;
    }
}
declare module tx {
    class DragObject extends tx.InteractiveObject {
        private static _dragHander;
        private static _setDragHander;
        static StartDrag(mc: cc.Layer): void;
        static EndDrag(mc: cc.Layer): void;
        static SetToDragObject(mc: cc.Layer): void;
        static RemoveDragObject(mc: cc.Layer): void;
        private _startDragStartMousePos;
        private _startDragStartPos;
        private _fixedPos;
        constructor(mc: cc.Layer, fixedPos?: Boolean);
        public destroy(): void;
        public onMouseDownTouchBegan(pos: cc.Point): void;
        public onMouseTouchEndedUp(pos: cc.Point): void;
        public onMouseDraggedTouchMove(pos: cc.Point): void;
    }
}
declare module tx {
    class Bitmap extends cc.Layer implements tx.IInteractiveObject, tx.ev.IEventDispatcher {
        public _bmd: tx.BitmapData;
        public _opacity: number;
        public _mouseEnable: Boolean;
        public _isOver: Boolean;
        public _ed: tx.ev.EventDispatcher;
        constructor(bmd: tx.BitmapData);
        public setBitmapData(bmd: tx.BitmapData): void;
        public getBitmapData(): tx.BitmapData;
        public draw(ctx: CanvasRenderingContext2D): void;
        public getOpacity(): number;
        public setOpacity(t: number): void;
        public setMouseTouchEnabled(b: Boolean): void;
        public getMouseTouchEnabled(): Boolean;
        public addEventListener(eventType: string, theHandler: (e: tx.ev.Event) => void): void;
        public removeEventListener(eventType: string, theHandler: (e: tx.ev.Event) => void): void;
        public removeAllListeners(eventType: string): void;
        public dispatchEvent(theEvent: tx.ev.Event): void;
        public dispatchEventToHander(theEvent: tx.ev.Event, theHandler: (e: tx.ev.Event) => void): void;
        public onMouseDownTouchBegan(pos: cc.Point): void;
        public onMouseTouchEndedUp(pos: cc.Point): void;
        public onMouseDraggedTouchMove(pos: cc.Point): void;
    }
}
declare module tx {
    class BitmapData {
        private _ImgData;
        private _temp_Canvas;
        private _temp_ctx;
        private _width;
        private _height;
        private _transparent;
        private _fillColor;
        private _lock;
        constructor(width: number, height: number, transparent?: Boolean, fillColor?: number);
        public clone(): BitmapData;
        public draw(soucre: any, matrix?: tx.mh.Matrix, colorTransform?: any, blendMode?: string, clipRect?: cc.Rect, smoothing?: Boolean): void;
        private isInRect(x, y);
        public setPixel(x: number, y: number, color: number): void;
        public setPixel32(x: number, y: number, color: number): void;
        public getPixel(x: number, y: number): number;
        public getPixel3B(x: number, y: number): cc.Color3B;
        public getPixel32(x: number, y: number): number;
        public getPixel4B(x: number, y: number): cc.Color4B;
        public lock(): void;
        public unlock(): void;
        public _getImgData(): ImageData;
        public _getImageEle(): HTMLCanvasElement;
        public getData(): Uint8Array;
        public setData(data: Uint8Array): void;
        private updateImageEle();
        public getWidth(): number;
        public getHeight(): number;
    }
}
declare module tx.mh {
    class Matrix extends cc.AffineTransform {
    }
}
/**
* Created with JetBrains WebStorm.
* User: admin
* Date: 13-9-18
* Time: 下午2:46
* To change this template use File | Settings | File Templates.
*/
declare module tx {
    class Utils {
        static SET_COLOR_4B_BY_UINT(drawingUtil: cc.DrawingPrimitive, uintNumber: number, alpha: number): void;
        static COLOR_4F(uintNumber: number, alpha?: number): cc.Color4F;
        static COLOR_4B_Trans(uintNumber: number, colorTransform: Boolean): cc.Color4B;
        static COLOR_3B(uintNumber: number): cc.Color3B;
        static COLOR_4B(uintNumber: number): cc.Color4B;
        static C4B_TO_UINT(c4b: cc.Color4B): number;
        static C3B_TO_UINT(c3b: cc.Color3B): number;
        static COLOR_4B_TO_UINT(r: number, g: number, b: number, a: number): number;
        static COLOR_3B_TO_UINT(r: number, g: number, b: number): number;
        static CheckPosInMenuRect(menuItem: cc.MenuItem, pos: cc.Point): Boolean;
        static FadeOutAndRemoveFromParent(sprite: cc.Node, sec: number): void;
        static AllFadeIn(node: cc.Node, time: number): void;
        static AllFadeOut(node: cc.Node, time: number): void;
        static MaxPoint(p1: cc.Point, p2: cc.Point): cc.Point;
        static MinPoint(p1: cc.Point, p2: cc.Point): cc.Point;
        static GetRectScale(soucreWH: cc.Point, targetWH: cc.Point): number;
        static GetRealPixBitmapData(bmd: tx.BitmapData): tx.BitmapData;
    }
}
declare module tx {
    class Attach {
        static bitMapDataArray: any;
        /**
        * 从库中取得 Sprite
        */
        static getSprite(s: String, plistName?: string): cc.Sprite;
        /**
        * 从库中取得 BitmapData
        * @param s BitmapData在库中绑定的类名
        * @param repeatedUse_NoChange 这个BitmapData被多次使用且不会被修改时请打开此选项,这有助于节约内存资源,请不要dispose该对象,清理请使用clearBitmapDataCache()
        */
        static getBitmapData(s: String, repeatedUse_NoChange?: Boolean, plistName?: string): tx.BitmapData;
        /**
        * 不能在
        */
        static clearBitmapDataCache(): void;
    }
}
