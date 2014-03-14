///<reference path='../ImportTS.d.ts' />
module tx{
    /**
     * TODO:类功能摘要
     * @author TimonXue
     * @Create Date 2013-4-7
     */
    export class PixelClip extends Bitmap implements IMouseTouchEvent {
        private mTexture:PixelObject;
//        private mTextures:PixelObject[];
        private mFrameScript:any[];
//        private mSounds:Vector.<Sound>;
        private mDurations:number[];
        private mStartTimes:number[];

        private mDefaultFrameDuration:number;
        private mCurrentTime:number;
        private mCurrentFrame:number;
        private mLoop:Boolean;
        private mPlaying:Boolean;

        public _pixelList:PixelList;


        constructor(s:string, plistName:string = null, fps:number = 12, matrix:Matrix = null) {
            if (fps <= 0) {
                trace("Invalid fps: " + fps);
            }
            this._pixelList = PixelList.checkOut(s, plistName, matrix);
            super(this._pixelList.getPixelByFrame(0).bitMapData);
            this.mTexture = this._pixelList.getPixelByFrame(0);
            this.mFrameScript = [];
            this.schedule(()=> {
                this.advanceTime(cc.Director.getInstance().getAnimationInterval());
            }, cc.Director.getInstance().getAnimationInterval());

            var numFrames:number = this._pixelList.length;

            this.mDefaultFrameDuration = 1.0 / fps;
            this.mLoop = true;
            this.mPlaying = true;
            this.mCurrentTime = 0.0;
            this.mCurrentFrame = 0;
//            this.mTextures = textures.concat();
//            this.mSounds = new Vector. < Sound > (numFrames);
            this.mDurations = new Array(numFrames);
            this.mStartTimes = new Array(numFrames);

            for (var i:number = 0; i < numFrames; ++i) {
                this.mDurations[i] = this.mDefaultFrameDuration;
                this.mStartTimes[i] = i * this.mDefaultFrameDuration;
            }
        }

        destroy():void {
            this.mTexture = null;
            this.mTexture = null
//            this.mTextures = null
            this.mFrameScript = null
            super.destroy();
        }

        /** Adds an additional frame, optionally with a sound and a custom duration. If the
         *  duration is omitted, the default framerate is used (as specified in the constructor). */
        public addFrame(texture:PixelObject, sound:any = null, duration:number = -1):void {
            this.addFrameAt(this.getNumFrames(), texture, sound, duration);
        }

        /** Adds a frame at a certain index, optionally with a sound and a custom duration. */
        public addFrameAt(frameID:number, texture:PixelObject, sound:any = null, duration:number = -1):void {
            if (frameID < 0 || frameID > this.getNumFrames()) {
                trace("Invalid frame id")
            }
            if (duration < 0) {
                duration = this.mDefaultFrameDuration
            }

            this._pixelList.splice(frameID, 0, texture);
//            this.mSounds.splice(frameID, 0, sound);
            this.mDurations.splice(frameID, 0, duration);

            if (frameID > 0 && frameID == this.getNumFrames())
                this.mStartTimes[frameID] = this.mStartTimes[Math.floor(frameID - 1)] + this.mDurations[Math.floor(frameID - 1)];
            else
                this.updateStartTimes();
        }


        /** Removes the frame at a certain ID. The successors will move down. */
        public removeFrameAt(frameID:number):void {
            if (frameID < 0 || frameID >= this.getNumFrames()) {
                trace("Invalid frame id");
            }
            if (this.getNumFrames() == 1) {
                trace("Movie clip must not be empty");
            }

            this._pixelList.splice(frameID, 1);
//        this.mSounds.splice(frameID, 1);
            this.mDurations.splice(frameID, 1);

            this.updateStartTimes();
        }


        /** Returns the texture of a certain frame. */
        public getFrameTexture(frameID:number):PixelObject {
            if (frameID < 0 || frameID >= this.getNumFrames()) {
                trace("Invalid frame id");
            }
            return this._pixelList.getPixelByFrame(frameID);
        }

        /** Sets the texture of a certain frame. */
        public setFrameTexture(frameID:number, texture:PixelObject):void {
            if (frameID < 0 || frameID >= this.getNumFrames()) {
                trace("Invalid frame id");
            }
            this._pixelList.splice(frameID, 1, texture);
        }

        /** Returns the sound of a certain frame. */
//        public getFrameSound(frameID:number):Sound {
//            if (frameID < 0 || frameID >= this.getNumFrames())  {trace("Invalid frame id")};
//            return this.mSounds[frameID];
//        }

        /** Sets the sound of a certain frame. The sound will be played whenever the frame
         *  is displayed. */
//        public setFrameSound(frameID:number, sound:Sound):void {
//            if (frameID < 0 || frameID >= this.getNumFrames()) {
//                trace("Invalid frame id");
//            }
//            this.mSounds[frameID] = sound;
//        }

        /** Returns the duration of a certain frame (in seconds). */
        public getFrameDuration(frameID:number):number {
            if (frameID < 0 || frameID >= this.getNumFrames()) {
                trace("Invalid frame id");
            }
            return this.mDurations[frameID];
        }

        /** Sets the duration of a certain frame (in seconds). */
        public setFrameDuration(frameID:number, duration:number):void {
            if (frameID < 0 || frameID >= this.getNumFrames()) {
                trace("Invalid frame id");
            }
            this.mDurations[frameID] = duration;
            this.updateStartTimes();
        }

        /** Starts playback. Beware that the clip has to be added to a juggler, too! */
        public play():void {
            this.mPlaying = true;
        }

        /** Pauses playback. */
        public pause():void {
            this.mPlaying = false;
        }

        /** Stops playback, resetting "currentFrame" to zero. */
        public stop():void {
            this.mPlaying = false;
            this.setCurrentFrame(1);
        }

        public gotoAndPlay(v:number):void {
            this.mPlaying = true;
            this.setCurrentFrame(v);
        }

        public gotoAndStop(v:number):void {
            this.mPlaying = false;
            this.setCurrentFrame(v);
        }

        public addFrameScript(v:number, f:()=>void, _this:Object = null):void {
            if (f != null) {
                this.mFrameScript[v] = [f, _this];
            }
        }

        // helpers
        private updateStartTimes():void {
            var numFrames:number = this.getNumFrames();

            this.mStartTimes.length = 0;
            this.mStartTimes[0] = 0;

            for (var i:number = 1; i < numFrames; ++i)
                this.mStartTimes[i] = this.mStartTimes[Math.floor(i - 1)] + this.mDurations[Math.floor(i - 1)];
        }

        // IAnimatable

        /** @inheritDoc */
        public advanceTime(passedTime:number):void {
            if (!this.mPlaying || passedTime <= 0.0) return;

            var finalFrame:number;
            var previousFrame:number = this.mCurrentFrame;
            var restTime:number = 0.0;
            var breakAfterFrame:Boolean = false;
            var hasCompleteListener:Boolean = this.hasEventListener(tx.Event.COMPLETE);
            var dispatchCompleteEvent:Boolean = false;
            var totalTime:number = this.getTotalTime();

            if (this.mLoop && this.mCurrentTime == totalTime) {
                this.mCurrentTime = 0.0;
                this.mCurrentFrame = 0;
            }

            if (this.mCurrentTime < totalTime) {
                this.mCurrentTime += passedTime;
                finalFrame = this._pixelList.length - 1;

                while (this.mCurrentTime > this.mStartTimes[this.mCurrentFrame] + this.mDurations[this.mCurrentFrame]) {
                    if (this.mCurrentFrame == finalFrame) {
                        if (this.mLoop && !hasCompleteListener) {
                            this.mCurrentTime -= totalTime;
                            this.mCurrentFrame = 0;
                        }
                        else {
                            breakAfterFrame = true;
                            restTime = this.mCurrentTime - totalTime;
                            dispatchCompleteEvent = hasCompleteListener;
                            this.mCurrentFrame = finalFrame;
                            this.mCurrentTime = totalTime;
                        }
                    }
                    else {
                        this.mCurrentFrame++;

                        // special case when we reach *exactly* the total time.
                        if (this.mCurrentFrame == finalFrame && this.mCurrentTime == totalTime)
                            dispatchCompleteEvent = hasCompleteListener;
                    }

//                    var sound:Sound = this.mSounds[this.mCurrentFrame];
//                    if (sound) sound.play();
                    if (this.mCurrentFrame != previousFrame) {
                        this.runFrameScript();
                    }
                    if (breakAfterFrame) break;
                }
            }

            if (this.mCurrentFrame != previousFrame)
                this._setTexture(this._pixelList.getPixelByFrame(this.mCurrentFrame));

            if (dispatchCompleteEvent)
                this.dispatchEvent(new tx.Event(tx.Event.COMPLETE));

            if (this.mLoop && restTime != 0)
                this.advanceTime(restTime);
        }

        /** Indicates if a (non-looping) movie has come to its end. */
        public isComplete():Boolean {
            return !this.mLoop && this.mCurrentTime >= this.getTotalTime();
        }

        /** The total duration of the clip in seconds. */
        public getTotalTime():number {
            var numFrames:number = this._pixelList.length;
            return this.mStartTimes[Math.floor(numFrames - 1)] + this.mDurations[Math.floor(numFrames - 1)];
        }

        /** The time that has passed since the clip was started (each loop starts at zero). */
        public getCurrentTime():number {
            return this.mCurrentTime;
        }

        /** The total number of frames. */
        public getNumFrames():number {
            return this._pixelList.length;
        }

        /** Indicates if the clip should loop. */
        public getLoop():Boolean {
            return this.mLoop;
        }

        public setLoop(value:Boolean):void {
            this.mLoop = value;
        }

        /** The index of the frame that is currently displayed. */
        public getCurrentFrame():number {
            return this.mCurrentFrame + 1;
        }

        public setCurrentFrame(value:number):void {
            value--;
            if (value < 0) {
                value = 0;
            }
            if (value >= this.getNumFrames()) {
                value = this.getNumFrames() - 1;
            }
            this.mCurrentTime = 0.0;
            for (var i:number = 0; i < value; ++i) {
                this.mCurrentTime += this.getFrameDuration(i);
            }
            if (this.mCurrentFrame != value) {
                this.mCurrentFrame = value;
                this.runFrameScript();
                this._setTexture(this._pixelList.getPixelByFrame(this.mCurrentFrame));
//            if (this.mSounds[this.mCurrentFrame]) this.mSounds[this.mCurrentFrame].play();
            }
        }

        /** The default number of frames per second. Individual frames can have different
         *  durations. If you change the fps, the durations of all frames will be scaled
         *  relatively to the previous value. */
        public getFps():number {
            return 1.0 / this.mDefaultFrameDuration;
        }

        public setFps(value:number):void {
            if (value <= 0) {
                trace("Invalid fps: " + value);
            }

            var newFrameDuration:number = 1.0 / value;
            var acceleration:number = newFrameDuration / this.mDefaultFrameDuration;
            this.mCurrentTime *= acceleration;
            this.mDefaultFrameDuration = newFrameDuration;

            for (var i:number = 0; i < this.getNumFrames(); ++i) {
                var duration:number = this.mDurations[i] * acceleration;
                this.mDurations[i] = duration;
            }
            this.updateStartTimes();
        }

        /** Indicates if the clip is still playing. Returns <code>false</code> when the end
         *  is reached. */
        public isPlaying():Boolean {
            if (this.mPlaying)
                return this.mLoop || this.mCurrentTime < this.getTotalTime();
            else
                return false;
        }

        private runFrameScript():void {
            var t:any[] = this.mFrameScript[this.mCurrentFrame];
            if (t != null) {
                t[1] = t[1] || this;
                t[0].call(t[1]);
            }
        }

        ///////////////////////////////starling Image////////////////////////
        /** The texture that is displayed on the quad. */
        private _getTexture():PixelObject {
            return this.mTexture;
        }

        private _setTexture(value:PixelObject):void {
            if (value == null) {
                trace("Texture cannot be null");
            }
            else if (value != this.mTexture) {
                this.mTexture = value;
                this.setBitmapData(this.mTexture.bitMapData)
            }
        }

        public _getOffset():cc.Point {
            return cc.p(super._getOffset().x + this.mTexture.tx, super._getOffset().y + this.mTexture.ty);
        }
    }
}