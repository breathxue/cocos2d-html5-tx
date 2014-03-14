/**
 * Created with JetBrains WebStorm.
 * User: Zhangyajie
 * Date: 14-1-10
 * Time: 下午3:45
 * To change this template use File | Settings | File Templates.
 */
///<reference path='cocos2d.d.ts' />
declare module ccs {
    export class Class {
    }

    export class ArmatureDataManager extends Class {

        static getInstance():ArmatureDataManager;

        getRelativeData(configFilePath:string):RelativeData;

        getTextureData(id:string):TextureData;

        getTextureDatas():Object;

        removeAnimationData(id:string);

        removeArmatureData(id:string);

        removeArmatureFileInfo(configFilePath:string);

        removeTextureData(id:string);

        addAnimationData(id:string, animationData:AnimationData, configFilePath:string);

        addArmatureData(id:string, armatureData:ArmatureData, configFilePath:string);

        addArmatureFileInfo(imagePath:string, plistPath:string, configFilePath:string);

        addArmatureFileInfoAsync(imagePath:string, plistPath:string, configFilePath:string, target:Object, callback:Function);

        addRelativeData(configFilePath:string);

        addSpriteFrameFromFile(plistPath:string, imagePath:string, configFilePath:string);

        addTextureData(id:string, textureData:TextureData, configFilePath:string);

        getAnimationData(id:string):AnimationData;

        getAnimationDatas():Object;

        getArmatureData(id:string):ArmatureData;

        getArmatureDatas():Object;
    }

    export class RelativeData extends Class {

    }

    export class TextureData extends Class {
        addContourData(contourData:ContourData);

        getContourData(index:number):ContourData;
    }

    export class AnimationData extends Class {
        addMovement(moveData:MovementData);

        getMovement(moveName:string):MovementData;

        getMovementCount():number;
    }

    export class ArmatureData extends Class {
        addBoneData(boneData:BoneData);

        getBoneData(boneName:string):BoneData;

        getBoneDataDic():Object;
    }

    export class ContourData extends Class {

    }

    export class MovementData extends Class {
        addMovementBoneData(movBoneData:MovementBoneData);

        getMovementBoneData(boneName:string):MovementBoneData;
    }

    export class BaseData extends Class {
        copy(node:BaseData);

        getColor():cc.Color4B;

        setColor(color:cc.Color4B);

        subtract(from:BaseData, to:BaseData, lmit:Boolean);
    }

    export class BoneData extends BaseData {
        addDisplayData(displayData:DisplayData);

        getDisplayData(index:number):DisplayData;
    }

    export class MovementBoneData extends Class {
        addFrameData(frameData:FrameData);

        getFrameData(index:number):FrameData;
    }

    export class DisplayData extends Class {
        changeDisplayToTexture(displayName:string):string;

        copy(displayData:DisplayData);
    }

    export class FrameData extends BaseData {
        copy(frameData:FrameData);
    }

    export class NodeRGBA extends cc.NodeRGBA {
    }


    export class Armature extends NodeRGBA {

        addBone(bone:Bone, parentName:string);

        boundingBox():cc.Rect;

        changeBoneParent(bone:Bone, parentName:string);

        static create(name?:string, parentBone?):Armature;

        createBone(boneName:string):Bone;

        drawContour();

        getAnimation():ArmatureAnimation;

        getArmatureData():ArmatureData;

        getArmatureTransformDirty():Boolean;

        getBlendFunc():BlendFunc;

        getBone(name:string):Bone;

        getBoneAtPoint(x:number, y:number):Bone;

        getBoneDic():Object;

        getParentBone():Bone;

        getVersion():number;

        init(name?:string, parentBone?:Bone):Boolean;

        removeBone(bone:Bone, recursion:Boolean);

        setAnimation(animation:ArmatureAnimation);

        setArmatureData(armatureData:ArmatureData);

        setBlendFunc(blendFunc:BlendFunc);

        setColliderFilter(filter:ColliderFilter);

        setParentBone(parentBone:Bone);

        setVersion(version:number);

        updateOffsetPoint();
    }

    export class Bone extends NodeRGBA {
        addChildBone(child:Bone);

        addDisplay(displayData:cc.Sprite, index:number);

        changeDisplayByIndex(index:number, force:Boolean);

        changeDisplayWithIndex(index:number, force:Boolean);

        changeDisplayWithName(name:string, force:Boolean);

        static create(name?:string):Bone;

        getArmature():Armature;

        getBlendFunc():BlendFunc;

        getBoneData():BoneData;

        getChildArmature():Armature;

        getChildrenBone():any[];

        getColliderBodyList():Object;

        getColliderFilter():ColliderFilter;

        getDisplayManager():DisplayManager;

        getDisplayRenderNode():cc.Node;

        getDisplayRenderNodeType():number;

        getIgnoreMovementBoneData():Boolean;

        getName():string;

        getParentBone():Bone;

        getTween():Tween;

        getTweenData():FrameData;

        init(name?:string):Boolean;

        isTransformDirty():Boolean;

//        nodeToArmatureTransform() : {a:0|b:0|c:0|d:0|tx:0|ty:0};

        nodeToWorldTransform():cc.AffineTransform;

        release();

        removeChildBone(bone:Bone, recursion:Boolean);

        removeDisplay(index:number);

        removeFromParent(recursion:Boolean);

        setArmature(armature:Armature);

        setBlendFunc(blendFunc:BlendFunc);

        setBoneData(boneData:BoneData);

        setChildArmature(armature:Armature);

        setColliderFilter(filter:ColliderFilter);

        setColor(color:cc.Color3B);

        setDisplayManager(displayManager:DisplayManager);

        setIgnoreMovementBoneData(bool:Boolean);

        setName(name:string);

        setOpacity(opacity:number);

        setParentBone(parent:Bone):Bone;

        setTransformDirty(bool:Boolean);

        setZOrder(order:number);

        update(dt:number);

        updateColor();

        updateDisplayedColor(color:cc.Color3B);

        updateDisplayedOpacity(opacity:number);

        updateZOrder();

//        visit(ctx);
    }

    export class BlendFunc extends Class {
        src1:number;
        dst1:number;

        constructor(_src1:number, _dst1:number);
    }

    export class ColliderFilter extends Class {

    }

    export class DisplayManager extends Class {

    }

    export class Tween extends ProcessBase {
        arriveKeyFrame(keyFrameData:FrameData);

        static create(bone:Bone):ArmatureAnimation;

        getAnimation():ArmatureAnimation;

        init(bone:Bone):Boolean;

        /**
         * play animation by animation name.
         * @param {Number} animationName The animation name you want to play
         * @param {Number} durationTo
         *         he frames between two animation changing-over.It's meaning is changing to this animation need how many frames
         *         -1 : use the value from CCMovementData get from flash design panel
         * @param {Number} durationTween he
         *         frame count you want to play in the game.if  _durationTween is 80, then the animation will played 80 frames in a loop
         *         -1 : use the value from CCMovementData get from flash design panel
         * @param {Number} loop
         *          Whether the animation is loop.
         *         loop < 0 : use the value from CCMovementData get from flash design panel
         *         loop = 0 : this animation is not loop
         *         loop > 0 : this animation is loop
         * @param {Number} tweenEasing
         *          CCTween easing is used for calculate easing effect
         *         TWEEN_EASING_MAX : use the value from CCMovementData get from flash design panel
         *         -1 : fade out
         *         0  : line
         *         1  : fade in
         *         2  : fade in and out
         */
            play(...arg:any[]);

        setAnimation(animation:ArmatureAnimation);

        setBetween(from:FrameData, to:FrameData, limit:Boolean);

        tweenNodeTo(percent:number, node:FrameData):FrameData;

        updateFrameData(currentPercent:number):number;

        updateHandler();
    }


    export class ProcessBase extends Class {
        getAnimationInternal():number;

        getCurrentFrameIndex():number;

        getCurrentPercent():number;

        getLoop:number;

        getProcessScale:number;

        getRawDuration:number;

        getTweenEasing:number;

        gotoFrame(frameIndex:number);

        isComplete():Boolean;

        isPause():Boolean;

        isPlaying():Boolean;

        pause();

        /**
         * @param {Number} durationTo
         * @param {Number} tweenEasing
         *          CCTween easing is used for calculate easing effect
         *         TWEEN_EASING_MAX : use the value from CCMovementData get from flash design panel
         *         -1 : fade out
         *         0  : line
         *         1  : fade in
         *         2  : fade in and out
         */
            play(...arg:any[]);

        resume();

        setAnimationInternal(animationInternal:number);

        setProcessScale(processScale:number);

        stop();

        updateHandler();
    }

    var CC_MovementEventType_START;
    var CC_MovementEventType_COMPLETE;
    var CC_MovementEventType_LOOP_COMPLETE;

    export class ArmatureAnimation extends ProcessBase {

        callFrameEvent(args:any[]);

        callMovementEvent(args:any[]);

        static create(armature?:Armature):ArmatureAnimation;

        frameEvent(bone:Bone, frameEventName:string, originFrameIndex:number, currentFrameIndex:number);

        getAnimationData():AnimationData;

        getCurrentMovementID():string;

        getMovementCount():number;

        getUserObject():Object;

        gotoAndPause(frameIndex:number);

        gotoAndPlay(frameIndex:number);

        init(armature:Armature):Boolean;

        isIgnoreFrameEvent():Boolean;

        /**
         * play animation by animation name.
         * @param {Number} animationName The animation name you want to play
         * @param {Number} durationTo
         *         he frames between two animation changing-over.It's meaning is changing to this animation need how many frames
         *         -1 : use the value from CCMovementData get from flash design panel
         * @param {Number} durationTween he
         *         frame count you want to play in the game.if  _durationTween is 80, then the animation will played 80 frames in a loop
         *         -1 : use the value from CCMovementData get from flash design panel
         * @param {Number} loop
         *          Whether the animation is loop.
         *         loop < 0 : use the value from CCMovementData get from flash design panel
         *         loop = 0 : this animation is not loop
         *         loop > 0 : this animation is loop
         * @param {Number} tweenEasing
         *          CCTween easing is used for calculate easing effect
         *         TWEEN_EASING_MAX : use the value from CCMovementData get from flash design panel
         *         -1 : fade out
         *         0  : line
         *         1  : fade in
         *         2  : fade in and out
         */
            play(...arg:any[]);

        playByIndex(animationIndex:number, durationTo ?:number, durationTween ?:number, loop ?:Boolean, tweenEasing ?:number);

        playWithIndex(animationIndex:number, durationTo ?:number, durationTween ?:number, loop ?:Boolean, tweenEasing ?:number);

        playWithNames(movementNames:any[], durationTo:number, loop:Boolean);

        setAnimationData(aniData:AnimationData);

        setFrameEventCallFunc(target:Object, callFunc:Function);

        setIgnoreFrameEvent(bool:Boolean);

        setMovementEventCallFunc(target:Object, callFunc:Function);

        setSpeedScale(speedScale:number);

        setUserObject(userObject:Object);

        updateHandler();
    }

    export enum BrightStyle {
        none,// = -1;
        normal,// = 0;
        highlight,// = 1;
    }

    export enum WidgetType {
        widget,// = 0;
        container,// = 1;
    }

    export enum TextureResType {
        local,// = 0;
        plist,// = 1;
    }

    export enum TouchEventType {
        began,// = 0;
        moved,// = 1;
        ended,// = 2;
        canceled,// = 3;
    }

    export enum SizeType {
        ababsolute,// = 0;
        percent,// = 1;
    }

    export enum PositionType {
        absolute,// = 0;
        percent,// = 1;
    }

    export class Widget extends NodeRGBA {

        addChild(child:Widget, zOrder ?:number, tag ?:number);

        addNode(node:cc.Node, zOrger ?:number, tag ?:number);

        addTouchEventListener(selector:Function, target:Object);

        checkChildInfo(handleState:number, sender:Widget, touchPoint:cc.Point);

        clippingParentAreaContainPoint(pt:cc.Point):Boolean;

        static create():Widget;

        didNotSelectSelf();

        getBottomInParent():number;

        getChildByName(name:string):Widget;

        getChildren():any[];

        getChildrenCount():number;

        getContentSize():cc.Size;

        getDescription():string;

        getLayoutParameter(type:LayoutParameterType):LayoutParameter;

        getLeftInParent():number;

        getName():string;

        getNodeByTag(tag:number):cc.Node;

        getNodes():any[];


        getPositionPercent():cc.Point;

        getPositionType():PositionType;

        getRightInParent():number;

        getSize():cc.Size;

        getSizePercent():cc.Point;

        getSizeType():SizeType;

        getTopInParent():number;

        getTouchEndPos():cc.Point;

        getTouchMovePos():cc.Point;

        getTouchStartPos():cc.Point;

        getVirtualRenderer():cc.Node;

        getWidgetType():WidgetType;

        getWorldPosition():cc.Point;

        hitTest(pt:cc.Point):Boolean;

        ignoreContentAdaptWithSize(ignore:Boolean);

        init():Boolean;

        initRenderer();

        isBright():Boolean;

        isEnabled():Boolean;

        isFocused():Boolean;

        isIgnoreContentAdaptWithSize():Boolean;

        isTouchEnabled():Boolean;

        isUpdateEnabled():Boolean;

        onPressStateChangedToDisabled();

        onPressStateChangedToNormal();

        onPressStateChangedToPressed();

        onSizeChanged();

        onTouchCancelled(touchPoint:cc.Point);

        onTouchLongClicked(touchPoint:cc.Point);

        removeAllChildren(cleanup:Boolean);

        removeAllNodes();

        removeChild(child:Widget, cleanup ?:Boolean);

        removeNode(node:cc.Node);

        removeNodeByTag(tag:number);

        setBrightStyle(style:BrightStyle);

        setEnabled(enabled:Boolean);

        setFocused(focus:Boolean);

        setLayoutParameter(parameter:LayoutParameter);

        setName(name:string);

        setPosition(pos:cc.Point);

        setPosition(xValue:number, yValue:number);

        setPositionPercent(percent:cc.Point);

        setPositionType(type:PositionType);

        setSize(size:cc.Size);

        setSizePercent(percent:cc.Point);

        setSizeType(type:SizeType);

        setTouchEnabled(enable:Boolean);

        setUpdateEnabled(enable:Boolean);

        updateSizeAndPosition();
    }


    export enum LayoutParameterType {
        none,// = 0;
        linear,// = 1;
        relative,// = 2;
    }

    export class LayoutParameter extends Class {
        static create():LayoutParameter;

        getLayoutType():LayoutParameterType;

        getMargin():Margin;

        setMargin(margin:Margin);
    }

    export class Margin extends Class {
        equals(target:Margin):Boolean;

        setMargin(l:number, t:number, r:number, b:number);
    }


    export class UILayer extends cc.Layer {
        addWidget(widget:Widget);

        checkEventWidget(touch:cc.Touch, event:Object):Boolean;

        checkTouchEvent(root:Widget, touch:cc.Touch, event:Object):Boolean;

        clear();

        static create():UILayer;

//        getInputManager() : UIInputManager;

        getRootWidget():Widget;

        getWidgetByName(name:string):Widget;

        getWidgetByTag(tag:number):Widget;

        removeWidget(widget:Widget);
    }

    export class GUIReader extends Class {
        getFileDesignSize(fileName:string):cc.Size;

        static getInstance():GUIReader;

        getVersionInteger():number;

        static purge();

        storeFileDesignSize(fileName:string, size:cc.Size);

        widgetFromJsonFile(fileName:string):Widget;
    }

    export enum LayoutBackGroundColorType {
        none,// = 0;
        solid,// = 1;
        gradient,// = 2;
    }

    export enum LayoutType {
        absolute,// = 0;
        linearVertical,// = 1;
        linearHorizontal,// = 2;
        relative,// = 3;
    }

    export enum LayoutClippingType {
        stencil,// = 0;
        scissor,// = 1;
    }

    export var BACKGROUNDIMAGEZ:number;
    export var BACKGROUNDIMAGEZ:number;

    export class Layout extends Widget {
        addBackGroundImage();

        addChild(locChild:Widget, zOrder ?:number, tag ?:number);

        static create():Layout;

        getBackGroundImageTextureSize():cc.Size;

        getDescription():string;

        getLayoutType():LayoutType;

        isClippingEnabled():Boolean;

        removeBackGroundImage();

        requestDoLayout();

        setBackGroundColor(color:cc.Color3B, endColor:cc.Color3B);

        setBackGroundColorOpacity(opacity:number);

        setBackGroundColorType(type:LayoutBackGroundColorType);

        setBackGroundColorVector(vector:cc.Point);

        setBackGroundImage(fileName:string, texType:TextureResType);

        setBackGroundImageCapInsets(capInsets:cc.Rect);

        setBackGroundImageScale9Enabled(able:Boolean);

        setClippingEnabled(able:Boolean);

        setClippingType(type:LayoutClippingType);

        setLayoutType(type:LayoutType);
    }

    export enum PageViewEventType {
        turning,// = 0;
    }

    export enum PVTouchDir {
        touchLeft,// = 0;
        touchRight,// = 1;
    }

    export class PageView extends Layout {
        addChild(widget:Widget, zOrder ?:number, tag ?:number):Boolean;

        addEventListenerPageView(selector:Function, target:Object);

        addPage(page:Layout);

        addWidgetToPage(widget:Widget, pageIdx:number, forceCreate:Boolean);

        static create():PageView;

        createPage():Layout;

        getCurPageIndex():number;

        getDescription():string;

        getPages():any[];

        getPositionXByIndex(idx:number):number;

        insertPage(page:Layout, idx:number);

        removeChild(child:Widget);

        removePage(page:Layout);

        removePageAtIndex(index:number);

        scrollToPage(idx:number);
    }

    export enum ScrollViewDir {
        none,// = 0;
        vertical,// = 1;
        horizontal,// = 2;
        both,// = 3;
    }

    export enum ScrollViewEventType {
        scrollToTop,// = 0;
        scrollToBottom,// = 1;
        scrollToLeft,// = 2;
        scrollToRight,// = 3;
        scrolling,// = 4;
        bounceTop,// = 5;
        bounceBottom,// = 6;
        bounceLeft,// = 7;
        bounceRight,// = 8;
    }

    export var AUTOSCROLLMAXSPEED:number;
    export var SCROLLDIR_UP:cc.Point;
    export var SCROLLDIR_DOWN:cc.Point;
    export var SCROLLDIR_LEFT:cc.Point;
    export var SCROLLDIR_RIGHT:cc.Point;

    export class ScrollView extends Layout {
        addChild(widget:Widget, zOrder ?:number, tag ?:number):Boolean;

        addEventListenerScrollView(selector:Function, target:Object);

        checkChildInfo(handleState:number, sender:Widget, touchPoint:cc.Point);

        static create():ScrollView;

        getChildByName(name:string):Widget;

        getChildByTag(tag:number):Widget;

        getChildren():any[];

        getChildrenCount():number;

        getDescription():string;

        getDirection():ScrollViewDir;

        getInnerContainer():Layout;

        getLayoutType():LayoutType;

        interceptTouchEvent(handleState:number, sender:Widget, touchPoint:cc.Point);

        isBounceEnabled():Boolean;

        isInertiaScrollEnabled():Boolean;

        removeChild(child:Widget):Boolean;

        setBounceEnabled(enabled:Boolean);

        setDirection(dir:ScrollViewDir);

        setInertiaScrollEnabled(enabled:Boolean);

        setLayoutType(type:LayoutType);

        setInnerContainerSize(size:cc.Size);

        getInnerContainerSize():cc.Size;

        jumpToDestination(d:cc.Point);
    }


    export enum ListViewEventType {
        listViewOnselectedItem,// = 0;
    }

    export enum ListViewGravity {
        left,// = 0;
        right,// = 1;
        centerHorizontal,// = 2;
        top,// = 3;
        bottom,// = 4;
        centerVertical,// = 5;
    }

    export class ListView extends ScrollView {

    }

    export var NORMAL_RENDERER_ZORDER:number;
    export var PRESSED_RENDERER_ZORDER:number;
    export var DISABLED_RENDERER_ZORDER:number;
    export var TITLE_RENDERER_ZORDER:number;

    export class Button extends Widget {
        static create():Button;

        getContentSize():cc.Size;

        getDescription():string;

        getTitleColor():cc.Color3B;

        getTitleFontName():string;

        getTitleFontSize():cc.Size;

        getTitleText():string;

        getVirtualRenderer():cc.Node;

        ignoreContentAdaptWithSize(ignore:Boolean);

        isFlippedX():Boolean;

        isFlippedY():Boolean;

        loadTextureDisabled(disabled:string, texType:TextureResType);

        loadTextureNormal(normal:string, texType:TextureResType);

        loadTexturePressed(selected:string, texType:TextureResType);

        loadTextures(normal:string, selected:string, disabled:string, texType:TextureResType);

        setAnchorPoint(point:cc.Point, y?:number);

        setCapInsets(capInsets:cc.Rect);

        setCapInsetsDisabledRenderer(capInsets:cc.Rect);

        setCapInsetsNormalRenderer(capInsets:cc.Rect);

        setCapInsetsPressedRenderer(capInsets:cc.Rect);

        setColor(color:cc.Color3B);

        setFlippedX(flipX:Boolean);

        setFlippedY(flipY:Boolean);

        setPressedActionEnabled(enabled:Boolean);

        setScale9Enabled(able:Boolean);

        setTitleColor(color:cc.Color3B);

        setTitleFontName(fontName:string);

        setTitleFontSize(size:cc.Size);

        setTitleText(text:string);

        setBright(val:Boolean);
    }

    export class CheckBox extends Widget {
        addEventListenerCheckBox(selector:Function, target:Object);

        static create():CheckBox;

        getContentSize():cc.Size;

        getDescription():string;

        getVirtualRenderer():cc.Node;

        isFlippedX():Boolean;

        isFlippedY():Boolean;

        loadTextureBackGround(background:string, texType:TextureResType);

        loadTextureBackGroundDisabled(backgroundDisabled:string, texType:TextureResType);

        loadTextureBackGroundSelected(backGroundSelected:string, texType:TextureResType);

        loadTextureFrontCross(cross:string, texType:TextureResType);

        loadTextureFrontCrossDisabled(frontCrossDisabled:string, texType:TextureResType);

        loadTextures(backGround:string, backGroundSelected:string, cross:string, backGroundDisabled:string, frontCrossDisabled:string, texType:TextureResType);

        setAnchorPoint(point:cc.Point, y?:number);

        setFlippedX(flipX:Boolean);

        setFlippedY(flipY:Boolean);
    }

    export class ImageView extends Widget {
        _imageTexType:number;

        _textureFile:string;

        _imageRenderer:Sprite;

        static create() : ImageView;

        getContentSize() : cc.Size;

        getDescription() : string;

        getVirtualRenderer() : cc.Node;

        ignoreContentAdaptWithSize(ignore : Boolean);

        isFlippedX() : Boolean;

        isFlippedY() : Boolean;

        loadTexture(fileName : string , texType : TextureResType);

        setAnchorPoint(point : cc.Point , y ?: number);

        setCapInsets(capInsets : cc.Rect);

        setFlippedX(flipX : Boolean);

        setFlippedY(flipY : Boolean);

        setScale9Enabled(able : Boolean);

        setTextureRect(rect : cc.Rect);
    }

    export var LABELRENDERERZ : number;//-1

    export class Label extends Widget {
        static create() : Label;

        getContentSize() : cc.Size;

        getDescription() : string;

        getStringLength() : number;

        getStringValue() : string;

        getTouchScaleChangeAble() : Boolean;

        getVirtualRenderer() : cc.Node;

        isFlippedX() : Boolean;

        isFlippedY() : Boolean;

        isTouchScaleChangeEnabled() : Boolean;

        setAnchorPoint(point : cc.Point , y?:number);

        setFlippedX(flipX : number);

        setFlippedY(flipY : number);

        setFontName(name : string);

        setFontSize(size : number);

        setScale(scale : number);

        setScaleX(scaleX : number);

        setScaleY(scaleY : number);

        setText(text : string);

        setTextAreaSize(size : cc.Size);

        setTextHorizontalAlignment(alignment : number);//cc.TEXT_ALIGNMENT_LEFT|cc.TEXT_ALIGNMENT_CENTER|cc.TEXT_ALIGNMENT_RIGHT

        setTextVerticalAlignment(verticalAlignment : number); //cc.VERTICAL_TEXT_ALIGNMENT_TOP|cc.VERTICAL_TEXT_ALIGNMENT_CENTER|cc.VERTICAL_TEXT_ALIGNMENT_BOTTOM

        setTouchScaleChangeAble(enable : Boolean);

        setTouchScaleChangeEnabled(enable : Boolean);
    }

    export var LABELATLASRENDERERZ : number;//-1

    export class LabelAtlas extends Widget {
        static create() : LabelAtlas;

        getContentSize() : cc.Size;

        getDescription() : string;

        getStringValue() : string;

        getVirtualRenderer() : cc.Node;

        setAnchorPoint(point : cc.Point , y?:number);

        setProperty(stringValue : string , charMapFile : string , itemWidth : number , itemHeight : number , startCharMap : string);

        setStringValue(value : string);
    }

    export var LABELBMFONTRENDERERZ : number;//-1

    export class LabelBMFont extends Widget {
        static create() : LabelBMFont;

        getContentSize() : cc.Size;

        getDescription() : string;

        getStringValue() : string;

        getVirtualRenderer() : cc.Node;

        setAnchorPoint(point : cc.Point , y?:number);

        setFntFile(fileName : string);

        setText(value : string);
    }

    export enum LoadingBarType {
        left,// = 0;
        right,// = 1;
    }

    export var BARRENDERERZ : number;//-1

    export class LoadingBar extends Widget {
        static create() : LoadingBar;

        getContentSize() : cc.Size;

        getDescription() : string;

        getDirection() : LoadingBarType;

        getPercent() : number;

        getVirtualRenderer() : cc.Node;

        ignoreContentAdaptWithSize(ignore : Boolean);

        loadTexture(texture:string , texType : TextureResType);

        setCapInsets(capInsets : cc.Rect);

        setDirection(dir : LoadingBarType);

        setPercent(percent : number);

        setScale9Enabled(enabled : Boolean);
    }

    export enum SliderEventType {
        percent_changed,// = 0;
    }

    export var BASEBARRENDERERZ : number;//-3
    export var PROGRESSBARRENDERERZ : number;//-2
    export var SLIDBALLRENDERERZ : number;//-1

    export class Slider extends Widget {
        addEventListenerSlider(selector : Function , target : Object);

        static create() : Slider;

        getContentSize() : cc.Size;

        getDescription() : string;

        getPercent() : number;

        getPercentWithBallPos(px : number) : number;

        getVirtualRenderer() : cc.Node;

        ignoreContentAdaptWithSize(ignore : Boolean);

        loadBarTexture(fileName : string , texType : TextureResType);

        loadProgressBarTexture(fileName : string , texType : TextureResType);

        loadSlidBallTextureDisabled(disabled : string , texType : TextureResType);

        loadSlidBallTextureNormal(normal : string , texType : TextureResType);

        loadSlidBallTexturePressed(pressed : string , texType : TextureResType);

        loadSlidBallTextures(normal : string , pressed : string , disabled : string ,texType : TextureResType);

        setCapInsetProgressBarRebderer(capInsets : cc.Rect);

        setCapInsets(capInsets : cc.Rect);

        setCapInsetsBarRenderer(capInsets : cc.Rect);

        setPercent(percent : number);

        setScale9Enabled(able : Boolean);
    }

    export enum TextFiledEventType {
        attach_with_me,// = 0;
        detach_with_ime,// = 1;
        insert_text,// = 2;
        delete_backward,// = 3;
    }

    export var TEXTFIELDRENDERERZ : number;//-1

    export class TextField extends Widget {
        addEventListenerSlider(selector : Function , target : Object);

        static create() : TextField;

        didNotSelectSelf();

        getAttachWithIME() : Boolean;

        getContentSize() : cc.Size;

        getDeleteBackward() : Boolean;

        getDescription() : string;

        getDetachWithIME() : Boolean;

        getInsertText() : string;

        getMaxLength() : number;

        getStringValue() : string;

        getVirtualRenderer() : cc.Node;

        hitTest(pt : cc.Point) : Boolean;

        isMaxLengthEnabled() : Boolean;

        isPasswordEnabled() : Boolean;

        onTouchBegan(touchPoint : cc.Point);

        onTouchEnded(touchPoint : cc.Point);

        setAnchorPoint(point : cc.Point , y?:number);

        setAttachWithIME(attach : Boolean);

        setDeleteBackward(deleteBackward : Boolean);

        setDetachWithIME(detach : Boolean);

        setFontName(name : string);

        setFontSize(size : cc.Size);

        setInsertText(insertText : string);

        setMaxLength(length : number);

        setMaxLengthEnabled(enable : Boolean);

        setPasswordEnabled(enable : Boolean);

        setPasswordStyleText(styleText : string);

        setPlaceHolder(value : string);

        setText(text : string);

        setTouchSize(size : cc.Size);
    }

    export class SceneReader extends Class {
        createNodeWithSceneFile(pszFileName : string) : cc.Node;

        createObject(inputFiles : Object , parenet : Node);

        static getInstance() : SceneReader;

        static purge();

        purge();

        setPropertyFromJsonDict(node : Node , dict : Object);
    }

    export class ActionManager extends Class {
        getActionByName(jsonName : string , actionName : string);

        static getInstance() : ActionManager;

        initWithDictionary(jsonName : string , dic : Object , root : Object);

        playActionByName(jsonName : string , actionName : string , fun ?: cc.CallFunc);

        static purge();

        releaseActions();
    }

    export class Sprite extends cc.Sprite {

    }

    export class Skin extends Sprite {
        static create(fileName : string , rect ?: cc.Rect) : Skin;

        static createWithSpriteFrameName(pszSpriteFrameName : string) : Skin;

        getBoundingBox() : cc.Rect;

        getDisplayName() : string;
    }


}