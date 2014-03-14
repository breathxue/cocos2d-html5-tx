/**
 * Created with JetBrains WebStorm.
 * User: jijie
 * Date: 14-1-13
 * Time: ����2:05
 * To change this template use File | Settings | File Templates.
 */
declare var GameAPI:{
    loadAPI(func:(api:GameAPI)=>void):void;
    GameBreak:GameBreak;
    Branding:Branding;
}

interface GameAPI{
    GameBreak:GameBreak;
    Branding:Branding;
}

interface GameBreak{
    request(func1:()=>void, func2:()=>void):void
}

interface Branding{
    getLogo():LogoInfo;
}

interface LogoInfo{
    prototype:LogoInfo;
    new():LogoInfo;
    image:string;
    link:string;
    posX:number;
    posY:number;
    scale:number;
}
