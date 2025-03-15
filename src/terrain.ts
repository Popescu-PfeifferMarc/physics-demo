import { type Scene, BoxGeometry, MeshBasicMaterial, Mesh } from "three";

export class Terrain extends Mesh {
    private static geometry = new BoxGeometry(10, 0.5, 10);
    private static material = new MeshBasicMaterial({ color: 0x00ff00 });

    constructor(scene: Scene) {
        super(Terrain.geometry, Terrain.material)
        this.position.y = -0.5;
        scene.add(this);
    }
}
