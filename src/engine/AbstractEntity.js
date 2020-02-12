import * as THREE from 'three'

export default class AbstractEntity extends THREE.Object3D {
  constructor(scene, options) {
    super()
    this.scene = scene;
    this.boxSize = {
      width: options.size.width,
      height: options.size.height,
      depth: options.size.depth,
    };
    this.color = 0x44aa88;
    this.pos = options.pos
    this.setup();
  }
  setup() {
    // const texture = new THREE.TextureLoader().load(require('@/assets/images/newHeri.jpg'));
    // texture.wrapS = THREE.RepeatWrapping;
    // texture.wrapT = THREE.RepeatWrapping;
    const { scene, boxSize, pos } = this;
    this.geometry = new THREE.IcosahedronBufferGeometry(boxSize.width);
    this.material = new THREE.MeshPhongMaterial({
      color: 0xBBBBBB,
      specular: 0x666666,
      emissive: 0x333333,
      shininess: 10,
      opacity: 1,
      transparent: true });
    // this.material = new THREE.MeshBasicMaterial({map: texture});
    this.mesh = this.cube = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.set(pos.x, pos.y, pos.z);
    scene.add(this.mesh)
  }
  update(time, radius) {
    let delta = time;
    // this.mesh.position.x = 2 * radius * Math.cos(delta);
    // this.mesh.position.z = radius * Math.sin(delta);
    // this.mesh.position.y = 0.5 * radius * Math.sin(delta * radius * 0.31) * Math.cos(delta * radius * 0.31);
    this.mesh.rotation.x = delta * 0.002;
  }
}
