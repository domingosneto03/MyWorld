import { MyBee } from "./MyBee.js";

export class MyAnimation
{
    constructor(scene, s=0, e=5, st=3, d=2)
    {
        this.scene=scene;
        this.bee = new MyBee(scene);
        this.startVal=s;
        this.endVal=e;
        this.animStartTimeSecs=st;
        this.animDurationSecs=d;
        this.length=(this.endVal-this.startVal);
        this.animVal=this.startVal;
    }

    

    update(timeSinceAppStart)
    {
      // Animation based on elapsed time since animation start
      var elapsedTimeSecs=timeSinceAppStart-this.animStartTimeSecs;

      if (elapsedTimeSecs>=0 && elapsedTimeSecs<=this.animDurationSecs)
          this.animVal=this.startVal + (elapsedTimeSecs/this.animDurationSecs) * this.length;
    }

    display()
    {
        this.scene.pushMatrix();
        this.scene.translate(this.animVal,0,0);

        this.bee.display();

        this.scene.popMatrix();
    }
}