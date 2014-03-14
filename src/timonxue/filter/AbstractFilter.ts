///<reference path='../ImportTS.d.ts' />
module tx {
    /**
     * TODO:类功能摘要
     * @author TimonXue
     * @Create Date 2013-4-7
     */
    export class AbstractFilter
    {
        applyFilter(pixes:Uint8Array, width:number, height:number):Uint8Array
        {
            return pixes;
        }

        applyFilterWithBmd(bmd:BitmapData):void
        {

        }
    }
}