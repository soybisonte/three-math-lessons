import * as THREE from 'three'
import AbstractEntity from '@/engine/AbstractEntity'
import PostFX from '@/engine/PostFX'

export default class World {
  constructor(options) {

    this.canvas = options.canvas;
    this.renderer = null;
    this.camera = null;
    this.cameraConfig = {
      fov: 75,
      aspect:  window.innerWidth / window.innerHeight,
      near: 1,
      far: 10000,
    };
    this.scene = null;
    this.clock = new THREE.Clock();
    this.init();
    this.render();
    window.addEventListener('resize', this.onResize)

  }
  init() {
    const {canvas, cameraConfig, entities} = this;
    this.renderer = new THREE.WebGLRenderer({canvas, alpha:true});
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera = new THREE.PerspectiveCamera(cameraConfig.fov, cameraConfig.aspect, cameraConfig.near, cameraConfig.far);
    this.camera.position.z = 5;

    this.scene = new THREE.Scene();

    this.FX = new PostFX(this.scene, this.camera, this.renderer);

    this.setupLights();

    this.entity = new AbstractEntity(this.scene, {
      pos: { x: 0, y: 0, z: 0, },
      size: { width: 1, height: 1, depth: 1 }
    })
    this.renderer.render(this.scene, this.camera);
  }
  setupLights() {
    const {scene} = this;
    var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.125 );
				directionalLight.position.x = Math.random() - 0.5;
				directionalLight.position.y = Math.random() - 0.5;
				directionalLight.position.z = Math.random() - 0.5;
				directionalLight.position.normalize();
				scene.add(directionalLight);

        let pointLight = new THREE.PointLight(0xffffff, 3);
        scene.add(pointLight);
  }
  render = (time) => {
    time += 0.001

    this.entity.update(time)

    this.FX.composer.render(this.clock.getDelta());
    this.FX.update(time, {width: window.innerWidth, height: window.innerHeight});
    requestAnimationFrame(this.render)
  }
  onResize = () => {
    const {renderer, camera} = this;
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  }
}
