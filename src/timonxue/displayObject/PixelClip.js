var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
///<reference path='../ImportTS.d.ts' />
var tx;
(function (tx) {
    /**
    * TODO:类功能摘要
    * @author TimonXue
    * @Create Date 2013-4-7
    */
    var PixelClip = (function (_super) {
        __extends(PixelClip, _super);
        function PixelClip(s, plistName, fps, matrix) {
            if (typeof plistName === "undefined") { plistName = null; }
            if (typeof fps === "undefined") { fps = 12; }
            if (typeof matrix === "undefined") { matrix = null; }
            var _this = this;
            if (fps <= 0) {
                trace("Invalid fps: " + fps);
            }
            this._pixelList = tx.PixelList.checkOut(s, plistName, matrix);
            _super.call(this, this._pixelList.getPixelByFrame(0).bitMapData);
            this.mTexture = this._pixelList.getPixelByFrame(0);
            this.mFrameScript = [];
            this.schedule(function () {
                _this.advanceTime(cc.Director.getInstance().getAnimationInterval());
            }, cc.Director.getInstance().getAnimationInterval());

            var numFrames = this._pixelList.length;

            this.mDefaultFrameDuration = 1.0 / fps;
            this.mLoop = true;
            this.mPlaying = true;
            this.mCurrentTime = 0.0;
            this.mCurrentFrame = 0;

            //            this.mTextures = textures.concat();
            //            this.mSounds = new Vector. < Sound > (numFrames);
            this.mDurations = new Array(numFrames);
            this.mStartTimes = new Array(numFrames);

            for (var i = 0; i < numFrames; ++i) {
                this.mDurations[i] = this.mDefaultFrameDuration;
                this.mStartTimes[i] = i * this.mDefaultFrameDuration;
            }
        }
        PixelClip.prototype.destroy = function () {
            this.mTexture = null;
            this.mTexture = null;

            //            this.mTextures = null
            this.mFrameScript = null;
            _super.prototype.destroy.call(this);
        };

        /** Adds an additional frame, optionally with a sound and a custom duration. If the
        *  duration is omitted, the default framerate is used (as specified in the constructor). */
        PixelClip.prototype.addFrame = function (texture, sound, duration) {
            if (typeof sound === "undefined") { sound = null; }
            if (typeof duration === "undefined") { duration = -1; }
            this.addFrameAt(this.getNumFrames(), texture, sound, duration);
        };

        /** Adds a frame at a certain index, optionally with a sound and a custom duration. */
        PixelClip.prototype.addFrameAt = function (frameID, texture, sound, duration) {
            if (typeof sound === "undefined") { sound = null; }
            if (typeof duration === "undefined") { duration = -1; }
            if (frameID < 0 || frameID > this.getNumFrames()) {
                trace("Invalid frame id");
            }
            if (duration < 0) {
                duration = this.mDefaultFrameDuration;
            }

            this._pixelList.splice(frameID, 0, texture);

            //            this.mSounds.splice(frameID, 0, sound);
            this.mDurations.splice(frameID, 0, duration);

            if (frameID > 0 && frameID == this.getNumFrames())
                this.mStartTimes[frameID] = this.mStartTimes[Math.floor(frameID - 1)] + this.mDurations[Math.floor(frameID - 1)];
            else
                this.updateStartTimes();
        };

        /** Removes the frame at a certain ID. The successors will move down. */
        PixelClip.prototype.removeFrameAt = function (frameID) {
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
        };

        /** Returns the texture of a certain frame. */
        PixelClip.prototype.getFrameTexture = function (frameID) {
            if (frameID < 0 || frameID >= this.getNumFrames()) {
                trace("Invalid frame id");
            }
            return this._pixelList.getPixelByFrame(frameID);
        };

        /** Sets the texture of a certain frame. */
        PixelClip.prototype.setFrameTexture = function (frameID, texture) {
            if (frameID < 0 || frameID >= this.getNumFrames()) {
                trace("Invalid frame id");
            }
            this._pixelList.splice(frameID, 1, texture);
        };

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
        PixelClip.prototype.getFrameDuration = function (frameID) {
            if (frameID < 0 || frameID >= this.getNumFrames()) {
                trace("Invalid frame id");
            }
            return this.mDurations[frameID];
        };

        /** Sets the duration of a certain frame (in seconds). */
        PixelClip.prototype.setFrameDuration = function (frameID, duration) {
            if (frameID < 0 || frameID >= this.getNumFrames()) {
                trace("Invalid frame id");
            }
            this.mDurations[frameID] = duration;
            this.updateStartTimes();
        };

        /** Starts playback. Beware that the clip has to be added to a juggler, too! */
        PixelClip.prototype.play = function () {
            this.mPlaying = true;
        };

        /** Pauses playback. */
        PixelClip.prototype.pause = function () {
            this.mPlaying = false;
        };

        /** Stops playback, resetting "currentFrame" to zero. */
        PixelClip.prototype.stop = function () {
            this.mPlaying = false;
            this.setCurrentFrame(1);
        };

        PixelClip.prototype.gotoAndPlay = function (v) {
            this.mPlaying = true;
            this.setCurrentFrame(v);
        };

        PixelClip.prototype.gotoAndStop = function (v) {
            this.mPlaying = false;
            this.setCurrentFrame(v);
        };

        PixelClip.prototype.addFrameScript = function (v, f, _this) {
            if (typeof _this === "undefined") { _this = null; }
            if (f != null) {
                this.mFrameScript[v] = [f, _this];
            }
        };

        // helpers
        PixelClip.prototype.updateStartTimes = function () {
            var numFrames = this.getNumFrames();

            this.mStartTimes.length = 0;
            this.mStartTimes[0] = 0;

            for (var i = 1; i < numFrames; ++i)
                this.mStartTimes[i] = this.mStartTimes[Math.floor(i - 1)] + this.mDurations[Math.floor(i - 1)];
        };

        // IAnimatable
        /** @inheritDoc */
        PixelClip.prototype.advanceTime = function (passedTime) {
            if (!this.mPlaying || passedTime <= 0.0)
                return;

            var finalFrame;
            var previousFrame = this.mCurrentFrame;
            var restTime = 0.0;
            var breakAfterFrame = false;
            var hasCompleteListener = this.hasEventListener(tx.Event.COMPLETE);
            var dispatchCompleteEvent = false;
            var totalTime = this.getTotalTime();

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
                        } else {
                            breakAfterFrame = true;
                            restTime = this.mCurrentTime - totalTime;
                            dispatchCompleteEvent = hasCompleteListener;
                            this.mCurrentFrame = finalFrame;
                            this.mCurrentTime = totalTime;
                        }
                    } else {
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
                    if (breakAfterFrame)
                        break;
                }
            }

            if (this.mCurrentFrame != previousFrame)
                this._setTexture(this._pixelList.getPixelByFrame(this.mCurrentFrame));

            if (dispatchCompleteEvent)
                this.dispatchEvent(new tx.Event(tx.Event.COMPLETE));

            if (this.mLoop && restTime != 0)
                this.advanceTime(restTime);
        };

        /** Indicates if a (non-looping) movie has come to its end. */
        PixelClip.prototype.isComplete = function () {
            return !this.mLoop && this.mCurrentTime >= this.getTotalTime();
        };

        /** The total duration of the clip in seconds. */
        PixelClip.prototype.getTotalTime = function () {
            var numFrames = this._pixelList.length;
            return this.mStartTimes[Math.floor(numFrames - 1)] + this.mDurations[Math.floor(numFrames - 1)];
        };

        /** The time that has passed since the clip was started (each loop starts at zero). */
        PixelClip.prototype.getCurrentTime = function () {
            return this.mCurrentTime;
        };

        /** The total number of frames. */
        PixelClip.prototype.getNumFrames = function () {
            return this._pixelList.length;
        };

        /** Indicates if the clip should loop. */
        PixelClip.prototype.getLoop = function () {
            return this.mLoop;
        };

        PixelClip.prototype.setLoop = function (value) {
            this.mLoop = value;
        };

        /** The index of the frame that is currently displayed. */
        PixelClip.prototype.getCurrentFrame = function () {
            return this.mCurrentFrame + 1;
        };

        PixelClip.prototype.setCurrentFrame = function (value) {
            value--;
            if (value < 0) {
                value = 0;
            }
            if (value >= this.getNumFrames()) {
                value = this.getNumFrames() - 1;
            }
            this.mCurrentTime = 0.0;
            for (var i = 0; i < value; ++i) {
                this.mCurrentTime += this.getFrameDuration(i);
            }
            if (this.mCurrentFrame != value) {
                this.mCurrentFrame = value;
                this.runFrameScript();
                this._setTexture(this._pixelList.getPixelByFrame(this.mCurrentFrame));
                //            if (this.mSounds[this.mCurrentFrame]) this.mSounds[this.mCurrentFrame].play();
            }
        };

        /** The default number of frames per second. Individual frames can have different
        *  durations. If you change the fps, the durations of all frames will be scaled
        *  relatively to the previous value. */
        PixelClip.prototype.getFps = function () {
            return 1.0 / this.mDefaultFrameDuration;
        };

        PixelClip.prototype.setFps = function (value) {
            if (value <= 0) {
                trace("Invalid fps: " + value);
            }

            var newFrameDuration = 1.0 / value;
            var acceleration = newFrameDuration / this.mDefaultFrameDuration;
            this.mCurrentTime *= acceleration;
            this.mDefaultFrameDuration = newFrameDuration;

            for (var i = 0; i < this.getNumFrames(); ++i) {
                var duration = this.mDurations[i] * acceleration;
                this.mDurations[i] = duration;
            }
            this.updateStartTimes();
        };

        /** Indicates if the clip is still playing. Returns <code>false</code> when the end
        *  is reached. */
        PixelClip.prototype.isPlaying = function () {
            if (this.mPlaying)
                return this.mLoop || this.mCurrentTime < this.getTotalTime();
            else
                return false;
        };

        PixelClip.prototype.runFrameScript = function () {
            var t = this.mFrameScript[this.mCurrentFrame];
            if (t != null) {
                t[1] = t[1] || this;
                t[0].call(t[1]);
            }
        };

        ///////////////////////////////starling Image////////////////////////
        /** The texture that is displayed on the quad. */
        PixelClip.prototype._getTexture = function () {
            return this.mTexture;
        };

        PixelClip.prototype._setTexture = function (value) {
            if (value == null) {
                trace("Texture cannot be null");
            } else if (value != this.mTexture) {
                this.mTexture = value;
                this.setBitmapData(this.mTexture.bitMapData);
            }
        };

        PixelClip.prototype._getOffset = function () {
            return cc.p(_super.prototype._getOffset.call(this).x + this.mTexture.tx, _super.prototype._getOffset.call(this).y + this.mTexture.ty);
        };
        return PixelClip;
    })(tx.Bitmap);
    tx.PixelClip = PixelClip;
})(tx || (tx = {}));
//# sourceMappingURL=PixelClip.js.map
