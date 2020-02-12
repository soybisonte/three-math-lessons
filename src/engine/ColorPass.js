import * as THREE from 'three'
export const colorShader = {
    uniforms: {
      tDiffuse: { value: null },
      color:    { value: new THREE.Color(0xff0000) },
      iTime: { value: 0 },
      iResolution:  { value: new THREE.Vector3() },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1);
      }
    `,
    // fragmentShader: `
    //   uniform vec3 color;
    //   uniform sampler2D tDiffuse;
    //   varying vec2 vUv;
    //   void main() {
    //     vec4 previousPassColor = texture2D(tDiffuse, vUv);
    //     gl_FragColor = vec4(previousPassColor.rgb * color, previousPassColor.a);
    //   }
    // `,
    fragmentShader:`
    #include <common>

uniform vec3 iResolution;
uniform float iTime;

// By iq: https://www.shadertoy.com/user/iq
// license: Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.
void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = fragCoord/iResolution.xy;

    // Time varying pixel color
    vec3 col = 0.5 + 0.5*cos(iTime+uv.xyx+vec3(0,2,4));

    // Output to screen
    fragColor = vec4(col,1.0);
}

void main() {
  mainImage(gl_FragColor, gl_FragCoord.xy);
}
`
  };
