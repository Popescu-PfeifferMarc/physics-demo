import { BoxGeometry, Group, Mesh, MeshBasicMaterial, Vector2, type Scene, type Vector3 } from "three";

export class Stickman extends Mesh {
    private static geometry = new BoxGeometry(0.2, 0.5, 0.2);
    private static material = new MeshBasicMaterial({ color: 0xff0000 });

    private health = 100;
    

    constructor(group: Group, position: Vector3) {
        super(Stickman.geometry, Stickman.material)
        this.position.x = position.x;
        this.position.y = 0.25;
        this.position.z = position.z;
        group.add(this);
    }

    public update(delta: number, stickmen: Stickman[]) {

    }


}