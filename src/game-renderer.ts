import { WebGLRenderer } from "three";

export class GameRenderer extends WebGLRenderer {
    constructor() {
        super();
        this.setSize(window.innerWidth, window.innerHeight)
        window.addEventListener('resize', () => {
            this.setSize(window.innerWidth, window.innerHeight);
        });
    }
}
