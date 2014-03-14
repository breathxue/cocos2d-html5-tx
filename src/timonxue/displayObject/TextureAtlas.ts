///<reference path='../ImportTS.d.ts' />
module tx{
    /**
     * TODO:类功能摘要
     * @author TimonXue
     * @Create Date 2013-4-7
     */
    export class TextureAtlas implements IDestroyable{

        public static CacheHelpFindPlistInDict:any = {};

        public static FindPlistInDict(prefix:string):string {
            if (TextureAtlas.CacheHelpFindPlistInDict[prefix] != null) {
                return TextureAtlas.CacheHelpFindPlistInDict[prefix];
            }
            var dict:any = cc.SAXParser.getInstance()._xmlDict;
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
        }

        private sNames:string[] = [];
        private mTextureRegions:Object;

        constructor(plist:string, texture?) {
            tx.Attach.addSpriteFrames(plist);
            this.parseAtlasXml(plist);
        }

        public destroy():void
        {
            this.sNames = null;
            this.mTextureRegions = null;
        }

        parseAtlasXml(atlasPlist:string):void {
            atlasPlist = cc.FileUtils.getInstance().fullPathForFilename(atlasPlist);
            var dict = cc.FileUtils.getInstance().dictionaryWithContentsOfFileThreadSafe(atlasPlist);
            if (dict != null) {
                this.mTextureRegions = dict["frames"];
            } else {
                cc.log("no dict");
            }
        }

        public getTexture(name:string):cc.SpriteFrame {
            return cc.SpriteFrameCache.getInstance().getSpriteFrame(name);
        }

        public getTextures(prefix:string = "", result:cc.SpriteFrame[] = null):cc.SpriteFrame[] {
            if (result == null) {
                result = [];
            }

            this.sNames = this.getNames(prefix, this.sNames);
            for (var key in this.sNames) {
                result.push(this.getTexture(this.sNames[key]));
            }

            this.sNames = [];
            return result;
        }

        public getNames(prefix:string = "", result:string[] = null):string[] {
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
        }

    }
}