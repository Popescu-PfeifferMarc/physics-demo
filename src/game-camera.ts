import { PerspectiveCamera } from "three";

export class GameCamera extends PerspectiveCamera {

    constructor() {
        super(75, window.innerWidth / window.innerHeight, 0.01, 1000);
        this.position.y = 10;
        this.position.z = 7.5;
        this.position.x = 7.5;
        this.lookAt(0, 0, 0);
        this.updateProjectionMatrix();

        window.addEventListener('resize', () => {
            this.aspect = window.innerWidth / window.innerHeight;
            this.updateProjectionMatrix();
        });
    }
    
}