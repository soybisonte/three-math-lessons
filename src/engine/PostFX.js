import * as THREE from 'three'
import { ShaderPass, BloomEffect, GlitchEffect, EffectComposer, EffectPass, RenderPass } from "postprocessing";
import { colorShader } from './ColorPass.js'

export default class PostFX {
  constructor(scene, camera, renderer) {
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.composer = new EffectComposer(renderer);
    this.passes = [];
    this.setup();
    this.setPasses();
  }
  setup() {
    const { composer, scene, camera } = this
    this.composer.addPass(new RenderPass(scene, camera))
  }
  setPasses() {
    const { composer, scene, camera } = this
    const effectPass = new EffectPass(camera, new BloomEffect());
    effectPass.renderToScreen = true;
    this.composer.addPass(effectPass);

    const effectPass2 = new ShaderPass(colorShader)
    effectPass2.renderToScreen = true;
    this.composer.addPass(effectPass2);

    const effectPass3 = new EffectPass(camera, new GlitchEffect());
    effectPass3.renderToScreen = true;
    this.composer.addPass(effectPass3);
  }
  update(time, canvas) {
    colorShader.uniforms.iResolution.value.set(canvas.width, canvas.height, 1);
    colorShader.uniforms.iTime.value = time;
  }
}
