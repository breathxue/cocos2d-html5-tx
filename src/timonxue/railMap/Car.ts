///<reference path='../ImportTS.d.ts' />
module tx{
    /**
     * TODO:类功能摘要
     * @author TimonXue
     * @Create Date 2013-4-7
     */
    export class Car implements IDestroyable
	{
		public distance : number;
		public railMap : RailMap;
		private _tdebugMc : cc.Node;

        constructor(startDistance : number = 0)
		{
			this.distance = startDistance;
		}

		public destroy() : void
		{
			if(this._tdebugMc)
			{
                this._tdebugMc.getParent().removeChild(this._tdebugMc);
                this._tdebugMc = null;
			}
            this.railMap = null;
		}

		/**
		 * 前进
		 */
		public forward(distance : number) : void
		{
			if(!this.railMap)
			{
				return;
			}
            this.distance += distance;
		}

		/**
		 * 后退
		 */
		public back(distance : number) : void
		{
			if(!this.railMap)
			{
				return;
			}
            this.distance -= distance;
		}

		/**
		 * 车子是否出轨
		 */
		public isDerailed() : number
		{
			if(!this.railMap)
			{
				return 1;
			}
			if(!this.railMap.isCircular)
			{
				if( this.distance > this.railMap.totalDistance)
				{
					return 1;
				}
				if( this.distance < 0)
				{
					return -1;
				}
			}

			return 0;
		}

		/**
		 * debug显示车子
		 */
		public print() : void
		{
			if(this._tdebugMc)
			{
                this._tdebugMc.setPosition(this.getX(),this.getY());
                this._tdebugMc.setRotation(this.getRotation());
			}
		}

		public getX() : number
		{
			if(this.railMap == null)
			{
				return 0;
			}
			else
			{
				return this.railMap.getPoint(this).x;
			}
		}

		public getY() : number
		{
			if(this.railMap == null)
			{
				return 0;
			}
			else
			{
				return this.railMap.getPoint(this).y;
			}
		}

		public getRotation() : number
		{
			if(this.railMap == null)
			{
				return 0;
			}
			else
			{
				return this.railMap.getRotation(this);
			}
		}

		setDebugMc(pmc : cc.Node) : void
		{
            this._tdebugMc = new cc.Node();
			pmc.addChild(this._tdebugMc);
//            this._tdebugMc.graphics.beginFill(0x990000);
//            this._tdebugMc.graphics.drawRect(-3, -2, 6, 4);
//            this._tdebugMc.graphics.endFill();
			
			this.print();
		}
	}
}
