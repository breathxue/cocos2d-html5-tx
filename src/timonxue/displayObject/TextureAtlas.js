///<reference path='../ImportTS.d.ts' />
var tx;
(function (tx) {
    /**
    * TODO:类功能摘要
    * @author TimonXue
    * @Create Date 2013-4-7
    */
    var TextureAtlas = (function () {
        function TextureAtlas(plist, texture) {
            this.sNames = [];
            tx.Attach.addSpriteFrames(plist);
            this.parseAtlasXml(plist);
        }
        TextureAtlas.FindPlistInDict = function (prefix) {
            if (TextureAtlas.CacheHelpFindPlistInDict[prefix] != null) {
                return TextureAtlas.CacheHelpFindPlistInDict[prefix];
            }
            var dict = cc.SAXParser.getInstance()._xmlDict;
            for (var key in dict) {
                var xmlDoc = cc.SAXParser.getInstance()._parserXML(dict[key], key);
                var plist = xmlDoc.documentElement;
                if (plist.tagName == 'plist') {
                    var dict2 = cc.FileUtils.getInstance().dictionaryWithContentsOfFileThreadSafe(key);
                    var mTextureRegions = dict2["frames"];
                    for (var name in mTextureRegions) {
                        if (name.indexOf(prefix) == 0) {
                            TextureAtlas.CacheHelpFindPlistInDict[prefix] = tx.Utils.removeFullPathForFilename(key);
                            return TextureAtlas.CacheHelpFindPlistInDict[prefix];
                        }
                    }
                }
            }
            return null;
        };

        TextureAtlas.prototype.destroy = function () {
            this.sNames = null;
            this.mTextureRegions = null;
        };

        TextureAtlas.prototype.parseAtlasXml = function (atlasPlist) {
            atlasPlist = cc.FileUtils.getInstance().fullPathForFilename(atlasPlist);
            var dict = cc.FileUtils.getInstance().dictionaryWithContentsOfFileThreadSafe(atlasPlist);
            if (dict != null) {
                this.mTextureRegions = dict["frames"];
            } else {
                cc.log("no dict");
            }
        };

        TextureAtlas.prototype.getTexture = function (name) {
            return cc.SpriteFrameCache.getInstance().getSpriteFrame(name);
        };

        TextureAtlas.prototype.getTextures = function (prefix, result) {
            if (typeof prefix === "undefined") { prefix = ""; }
            if (typeof result === "undefined") { result = null; }
            if (result == null) {
                result = [];
            }

            this.sNames = this.getNames(prefix, this.sNames);
            for (var key in this.sNames) {
                result.push(this.getTexture(this.sNames[key]));
            }

            this.sNames = [];
            return result;
        };

        TextureAtlas.prototype.getNames = function (prefix, result) {
            if (typeof prefix === "undefined") { prefix = ""; }
            if (typeof result === "undefined") { result = null; }
            if (result == null) {
                result = [];
            }

            for (var name in this.mTextureRegions) {
                if (name.indexOf(prefix) == 0) {
                    result.push(name);
                }
            }

            //            function sortNumber(a, b) {
            //                return a - b
            //            }
            result.sort();
            return result;
        };
        TextureAtlas.CacheHelpFindPlistInDict = {};
        return TextureAtlas;
    })();
    tx.TextureAtlas = TextureAtlas;
})(tx || (tx = {}));
//# sourceMappingURL=TextureAtlas.js.map
