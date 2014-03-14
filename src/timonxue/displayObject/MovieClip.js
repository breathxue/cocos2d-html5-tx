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
    var MovieClip = (function (_super) {
        __extends(MovieClip, _super);
        function MovieClip(textures, fps) {
            if (typeof fps === "undefined") { fps = 12; }
            var _this = this;
            _super.call(this);
            if (textures.length > 0) {
                this.mTexture = textures[0];
                this.mFrameScript = [];
                _super.prototype.initWithSpriteFrame.call(this, textures[0]);
                this._init(textures, fps);
                this.schedule(function () {
                    _this.advanceTime(cc.Director.getInstance().getAnimationInterval());
                }, cc.Director.getInstance().getAnimationInterval());
            } else {
                trace("empty texture array");
            }
        }
        MovieClip.prototype.destroy = function () {
            this.mTexture = null;
            this.mTextures = null;
            this.mFrameScript = null;
            this.mDurations = null;
            this.mStartTimes = null;
            _super.prototype.destroy.call(this);
        };

        MovieClip.prototype._init = function (textures, fps) {
            if (fps <= 0) {
                trace("Invalid fps: " + fps);
            }
            var numFrames = textures.length;

            this.mDefaultFrameDuration = 1.0 / fps;
            this.mLoop = true;
            this.mPlaying = true;
            this.mCurrentTime = 0.0;
            this.mCurrentFrame = 0;
            this.mTextures = textures.concat();

            //            this.mSounds = new Vector. < Sound > (numFrames);
            this.mDurations = new Array(numFrames);
            this.mStartTimes = new Array(numFrames);

            for (var i = 0; i < numFrames; ++i) {
                this.mDurations[i] = this.mDefaultFrameDuration;
                this.mStartTimes[i] = i * this.mDefaultFrameDuration;
            }
        };

        /** Adds an additional frame, optionally with a sound and a custom duration. If the
        *  duration is omitted, the default framerate is used (as specified in the constructor). */
        MovieClip.prototype.addFrame = function (texture, sound, duration) {
            if (typeof sound === "undefined") { sound = null; }
            if (typeof duration === "undefined") { duration = -1; }
            this.addFrameAt(this.getNumFrames(), texture, sound, duration);
        };

        /** Adds a frame at a certain index, optionally with a sound and a custom duration. */
        MovieClip.prototype.addFrameAt = function (frameID, texture, sound, duration) {
            if (typeof sound === "undefined") { sound = null; }
            if (typeof duration === "undefined") { duration = -1; }
            if (frameID < 0 || frameID > this.getNumFrames()) {
                trace("Invalid frame id");
            }
            if (duration < 0) {
                duration = this.mDefaultFrameDuration;
            }

            this.mTextures.splice(frameID, 0, texture);

            //            this.mSounds.splice(frameID, 0, sound);
            this.mDurations.splice(frameID, 0, duration);

            if (frameID > 0 && frameID == this.getNumFrames())
                this.mStartTimes[frameID] = this.mStartTimes[Math.floor(frameID - 1)] + this.mDurations[Math.floor(frameID - 1)];
            else
                this.updateStartTimes();
        };

        /** Removes the frame at a certain ID. The successors will move down. */
        MovieClip.prototype.removeFrameAt = function (frameID) {
            if (frameID < 0 || frameID >= this.getNumFrames()) {
                trace("Invalid frame id");
            }
            if (this.getNumFrames() == 1) {
                trace("Movie clip must not be empty");
            }

            this.mTextures.splice(frameID, 1);

            //        this.mSounds.splice(frameID, 1);
            this.mDurations.splice(frameID, 1);

            this.updateStartTimes();
        };

        /** Returns the texture of a certain frame. */
        MovieClip.prototype.getFrameTexture = function (frameID) {
            if (frameID < 0 || frameID >= this.getNumFrames()) {
                trace("Invalid frame id");
            }
            return this.mTextures[frameID];
        };

        /** Sets the texture of a certain frame. */
        MovieClip.prototype.setFrameTexture = function (frameID, texture) {
            if (frameID < 0 || frameID >= this.getNumFrames()) {
                trace("Invalid frame id");
            }
            this.mTextures[frameID] = texture;
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
        MovieClip.prototype.getFrameDuration = function (frameID) {
            if (frameID < 0 || frameID >= this.getNumFrames()) {
                trace("Invalid frame id");
            }
            return this.mDurations[frameID];
        };

        /** Sets the duration of a certain frame (in seconds). */
        MovieClip.prototype.setFrameDuration = function (frameID, duration) {
            if (frameID < 0 || frameID >= this.getNumFrames()) {
                trace("Invalid frame id");
            }
            this.mDurations[frameID] = duration;
            this.updateStartTimes();
        };

        /** Starts playback. Beware that the clip has to be added to a juggler, too! */
        MovieClip.prototype.play = function () {
            this.mPlaying = true;
        };

        /** Pauses playback. */
        MovieClip.prototype.pause = function () {
            this.mPlaying = false;
        };

        /** Stops playback, resetting "currentFrame" to zero. */
        MovieClip.prototype.stop = function () {
            this.mPlaying = false;
            this.setCurrentFrame(1);
        };

        MovieClip.prototype.gotoAndPlay = function (v) {
            this.mPlaying = true;
            this.setCurrentFrame(v);
        };

        MovieClip.prototype.gotoAndStop = function (v) {
            this.mPlaying = false;
            this.setCurrentFrame(v);
        };

        MovieClip.prototype.addFrameScript = function (v, f, _this) {
            if (typeof _this === "undefined") { _this = null; }
            if (f != null) {
                this.mFrameScript[v] = [f, _this];
            }
        };

        // helpers
        MovieClip.prototype.updateStartTimes = function () {
            var numFrames = this.getNumFrames();

            this.mStartTimes.length = 0;
            this.mStartTimes[0] = 0;

            for (var i = 1; i < numFrames; ++i)
                this.mStartTimes[i] = this.mStartTimes[Math.floor(i - 1)] + this.mDurations[Math.floor(i - 1)];
        };

        // IAnimatable
        /** @inheritDoc */
        MovieClip.prototype.advanceTime = function (passedTime) {
            if (!this.mPlaying || passedTime <= 0.0)
                return;

            var finalFrame;
            var previousFrame = this.mCurrentFrame;
            var restTime = 0.0;
            var breakAfterFrame = false;
            var hasCompleteListener = this._ed.hasEventListener(tx.Event.COMPLETE);
            var dispatchCompleteEvent = false;
            var totalTime = this.getTotalTime();

            if (this.mLoop && this.mCurrentTime == totalTime) {
                this.mCurrentTime = 0.0;
                this.mCurrentFrame = 0;
            }

            if (this.mCurrentTime < totalTime) {
                this.mCurrentTime += passedTime;
                finalFrame = this.mTextures.length - 1;

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
                this._setTexture(this.mTextures[this.mCurrentFrame]);

            if (dispatchCompleteEvent)
                this.dispatchEvent(new tx.Event(tx.Event.COMPLETE));

            if (this.mLoop && restTime != 0)
                this.advanceTime(restTime);
        };

        /** Indicates if a (non-looping) movie has come to its end. */
        MovieClip.prototype.isComplete = function () {
            return !this.mLoop && this.mCurrentTime >= this.getTotalTime();
        };

        /** The total duration of the clip in seconds. */
        MovieClip.prototype.getTotalTime = function () {
            var numFrames = this.mTextures.length;
            return this.mStartTimes[Math.floor(numFrames - 1)] + this.mDurations[Math.floor(numFrames - 1)];
        };

        /** The time that has passed since the clip was started (each loop starts at zero). */
        MovieClip.prototype.getCurrentTime = function () {
            return this.mCurrentTime;
        };

        /** The total number of frames. */
        MovieClip.prototype.getNumFrames = function () {
            return this.mTextures.length;
        };

        /** Indicates if the clip should loop. */
        MovieClip.prototype.getLoop = function () {
            return this.mLoop;
        };

        MovieClip.prototype.setLoop = function (value) {
            this.mLoop = value;
        };

        /** The index of the frame that is currently displayed. */
        MovieClip.prototype.getCurrentFrame = function () {
            return this.mCurrentFrame + 1;
        };

        MovieClip.prototype.setCurrentFrame = function (value) {
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
                this._setTexture(this.mTextures[this.mCurrentFrame]);
                //            if (this.mSounds[this.mCurrentFrame]) this.mSounds[this.mCurrentFrame].play();
            }
        };

        /** The default number of frames per second. Individual frames can have different
        *  durations. If you change the fps, the durations of all frames will be scaled
        *  relatively to the previous value. */
        MovieClip.prototype.getFps = function () {
            return 1.0 / this.mDefaultFrameDuration;
        };

        MovieClip.prototype.setFps = function (value) {
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
        MovieClip.prototype.isPlaying = function () {
            if (this.mPlaying)
                return this.mLoop || this.mCurrentTime < this.getTotalTime();
            else
                return false;
        };

        MovieClip.prototype.runFrameScript = function () {
            var t = this.mFrameScript[this.mCurrentFrame];
            if (t != null) {
                t[1] = t[1] || this;
                t[0].call(t[1]);
            }
        };

        MovieClip.prototype.getCurrSpriteFrame = function () {
            return this.mTexture;
        };

        ///////////////////////////////starling Image////////////////////////
        /** The texture that is displayed on the quad. */
        MovieClip.prototype._getTexture = function () {
            return this.mTexture;
        };

        MovieClip.prototype._setTexture = function (value) {
            if (value == null) {
                trace("Texture cannot be null");
            } else if (value != this.mTexture) {
                this.mTexture = value;
                _super.prototype.setDisplayFrame.call(this, this.mTexture);
            }
        };
        return MovieClip;
    })(tx.InteractiveSprite);
    tx.MovieClip = MovieClip;
})(tx || (tx = {}));
//# sourceMappingURL=MovieClip.js.map
