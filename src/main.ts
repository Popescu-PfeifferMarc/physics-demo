import './style.css'
import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';
import { ArcballControls } from 'three/addons/controls/ArcballControls.js';
import { Terrain } from './terrain';
import { GameCamera } from './game-camera';
import { GameRenderer } from './game-renderer';
import { Stickman, } from './stickman';

const main = async () => {
  if (!WebGL.isWebGL2Available()) {
    const warning = WebGL.getWebGL2ErrorMessage();
    document.body.appendChild(warning);
    return;
  }

  const scene = new THREE.Scene();

  const terrain = new Terrain(scene);
  const camera = new GameCamera();
  const renderer = new GameRenderer();

  const controls = new ArcballControls(camera, renderer.domElement, scene);

  // spawn enemy
  const stickmen: Stickman[] = [];
  const stickmenGroup = new THREE.Group();
  const spawnStickman = (point: THREE.Vector3) => {
    stickmen.push(new Stickman(stickmenGroup, point));
  }

  // Pointer event
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  function onPointerDown(event: PointerEvent) {
    // Convert the browser mouse coords to normalized device coordinates (-1 to +1)
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Raycast from camera through that point
    raycaster.setFromCamera(mouse, camera);

    // Check intersection with the terrain
    const intersects = raycaster.intersectObject(terrain);
    const intersect = intersects[0];
    if (!intersect || !intersect.face || !(intersect.face.normal.y > 0.9)) return;
    spawnStickman(intersect.point);
  }
  renderer.domElement.addEventListener('pointerdown', onPointerDown);

  // Loop
  const update = (delta: number) => {
    controls.update();

  }

  // Start
  let lastTime: number = 0;
  renderer.setAnimationLoop((time) => {
    const deltaTime = time - lastTime;
    lastTime = time;
    update(deltaTime);
    renderer.render(scene, camera);
  });

  document.body.appendChild(renderer.domElement);
}

await main();
