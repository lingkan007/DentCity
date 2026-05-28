import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const diffusionVertexShader = `
varying vec2 vUv;
void main() {
  gl_Position = vec4(position, 1.0);
  vUv = uv;
}
`;

const diffusionFragmentShader = `
precision mediump float;

uniform float uDiffuseRate;
uniform float uFeedRate;
uniform float uKillRate;
uniform float uTime;
uniform vec2 uResolution;
uniform sampler2D uPreviousTexture;
uniform vec2 uMouse;
uniform float uBrushSize;
uniform float uBrushStrength;
uniform float uTrailLength;
uniform float uStopDecay;

varying vec2 vUv;

vec3 encodeState(vec2 state) {
  return (state + 0.1) / 1.2;
}

vec2 decodeState(vec3 raw) {
  return raw * 1.2 - 0.1;
}

float lineDistance(vec2 p, vec2 a, vec2 b) {
  vec2 ab = b - a;
  float t = clamp(dot(p - a, ab) / dot(ab, ab), 0.0, 1.0);
  return length(p - (a + ab * t));
}

void main() {
  vec2 pixel = vUv * uResolution;
  vec2 texel = 1.0 / uResolution;

  vec3 previous = decodeState(texture2D(uPreviousTexture, vUv).rgb);
  float U = previous.r;
  float V = previous.g;

  vec3 left = decodeState(texture2D(uPreviousTexture, vUv + vec2(-texel.x, 0.0)).rgb);
  vec3 right = decodeState(texture2D(uPreviousTexture, vUv + vec2( texel.x, 0.0)).rgb);
  vec3 up = decodeState(texture2D(uPreviousTexture, vUv + vec2(0.0,  texel.y)).rgb);
  vec3 down = decodeState(texture2D(uPreviousTexture, vUv + vec2(0.0, -texel.y)).rgb);

  float diffuseU = (left.r + right.r + up.r + down.r) * 0.25 - U;
  float diffuseV = (left.g + right.g + up.g + down.g) * 0.25 - V;

  float reaction = U * V * V;
  U += (uDiffuseRate * diffuseU - reaction + uFeedRate * (1.0 - U)) * 0.8;
  V += (uDiffuseRate * 0.5 * diffuseV + reaction - (uKillRate + uFeedRate) * V) * 0.8;

  float trailState = texture2D(uPreviousTexture, vUv).b;
  vec2 mousePos = uMouse * uResolution;
  float cursor = lineDistance(pixel, mousePos, mousePos);
  float radius = uBrushSize * 2.0 + 2.0;

  float strength = exp(-cursor * cursor / (radius * radius * 0.25));
  strength = mix(strength * 0.05, strength, trailState);

  U += strength * uBrushStrength * 1.2;
  V += strength * uBrushStrength * 0.8;

  float newTrailState = mix(trailState, 1.0, strength * 0.8);
  newTrailState *= 0.98;
  newTrailState = max(newTrailState, 0.0);

  U = clamp(U, -0.1, 1.1);
  V = clamp(V, -0.1, 1.1);

  gl_FragColor = vec4(encodeState(vec2(U, V)), newTrailState, 1.0);
}
`;

const displayVertexShader = `
varying vec2 vUv;
void main() {
  gl_Position = vec4(position, 1.0);
  vUv = uv;
}
`;

const displayFragmentShader = `
precision mediump float;

uniform sampler2D uReactionDiffusionTexture;
uniform sampler2D uPaletteTexture;
uniform float uPixelSize;
uniform float uDistortionAmount;
uniform float uSoftness;
uniform float uEdgeWidth;
uniform float uEdgeAmp;
uniform float uDistortAmp;
uniform float uLineOpacity;
uniform int uIsDiagonal;
uniform vec2 uResolution;
uniform float uTime;

varying vec2 vUv;

float rand(vec2 p) {
  return fract(sin(dot(p, vec2(829., 483.))) * 39428.);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  float a = rand(i);
  float b = rand(i + vec2(1., 0.));
  float c = rand(i + vec2(0., 1.));
  float d = rand(i + vec2(1., 1.));
  vec2 u = f * f * (3. - 2. * f);
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

vec3 getRD(vec2 vUv) {
  vec2 uvPix = vUv * uResolution;
  vec2 uvPix2 = floor(uvPix / uPixelSize) * uPixelSize;
  vec2 uv2 = uvPix2 / uResolution;
  return texture2D(uReactionDiffusionTexture, uv2).rgb;
}

vec2 getFlow(vec3 rd) {
  float a = atan(rd.g, rd.r);
  float l = length(rd.rg);
  return vec2(cos(a) * l, sin(a) * l) * uDistortionAmount;
}

vec3 getTextureColor(vec2 uv, vec2 flow) {
  return texture2D(uPaletteTexture, vec2(clamp(0.5 + length(flow) * 0.5, 0., 1.), 0.)).rgb;
}

float diagGrid(vec2 uv, float stepSize) {
  uv *= uResolution;
  stepSize *= uPixelSize;
  uv = mod(uv, stepSize);
  float diag = uv.x - uv.y;
  float d = smoothstep(-uSoftness, uSoftness, diag) - smoothstep(stepSize - uSoftness, stepSize + uSoftness, diag);
  return d;
}

float straightGrid(vec2 uv, float stepSize) {
  uv *= uResolution;
  stepSize *= uPixelSize;
  uv = mod(uv + stepSize * 0.5, stepSize) - stepSize * 0.5;
  float d = smoothstep(-uSoftness, uSoftness, uv.x) - smoothstep(uEdgeWidth - uSoftness, uEdgeWidth + uSoftness, uv.x);
  d += smoothstep(-uSoftness, uSoftness, uv.y) - smoothstep(uEdgeWidth - uSoftness, uEdgeWidth + uSoftness, uv.y);
  return d;
}

void main() {
  vec3 rd = getRD(vUv);
  vec2 flow = getFlow(rd);
  vec2 uv = vUv + vec2(sin(flow.x), cos(flow.y)) * uDistortAmp;
  uv += noise(vec2(uTime * 0.5)) * uEdgeAmp * flow;

  float d;
  if (uIsDiagonal == 1) {
    d = diagGrid(uv, 8.);
  } else {
    d = straightGrid(uv, 8.);
  }

  vec3 color = getTextureColor(uv, flow);
  float l = clamp(d, 0., 1.) * uLineOpacity;
  color = mix(color, vec3(0.1, 0.25, 0.6), l);

  gl_FragColor = vec4(color, 1.0);
}
`;

function createPaletteTexture(colors: THREE.Color[]): THREE.DataTexture {
  const size = 256;
  const data = new Uint8Array(size * 4);
  for (let i = 0; i < size; i++) {
    const t = i / (size - 1);
    const colorIndex = t * (colors.length - 1);
    const idx = Math.floor(colorIndex);
    const f = colorIndex - idx;
    const c1 = colors[Math.min(idx, colors.length - 1)];
    const c2 = colors[Math.min(idx + 1, colors.length - 1)];
    const r = Math.floor((c1.r + (c2.r - c1.r) * f) * 255);
    const g = Math.floor((c1.g + (c2.g - c1.g) * f) * 255);
    const b = Math.floor((c1.b + (c2.b - c1.b) * f) * 255);
    data[i * 4] = r;
    data[i * 4 + 1] = g;
    data[i * 4 + 2] = b;
    data[i * 4 + 3] = 255;
  }
  const texture = new THREE.DataTexture(data, size, 1, THREE.RGBAFormat);
  texture.needsUpdate = true;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  return texture;
}

export default function FluidBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let W = window.innerWidth;
    let H = window.innerHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const scene = new THREE.Scene();
    const displayScene = new THREE.Scene();
    const geometry = new THREE.PlaneGeometry(2, 2);

    const rtOptions: THREE.RenderTargetOptions = {
      type: THREE.FloatType,
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
    };
    let rtA = new THREE.WebGLRenderTarget(W, H, rtOptions);
    let rtB = new THREE.WebGLRenderTarget(W, H, rtOptions);

    const colors = [
      new THREE.Color('#0A165E'),
      new THREE.Color('#D4AF37'),
      new THREE.Color('#F5F7FA'),
      new THREE.Color('#FFFFFF'),
    ];
    const paletteTexture = createPaletteTexture(colors);

    const diffusionMaterial = new THREE.ShaderMaterial({
      vertexShader: diffusionVertexShader,
      fragmentShader: diffusionFragmentShader,
      uniforms: {
        uDiffuseRate: { value: 0.8 },
        uFeedRate: { value: 0.054 },
        uKillRate: { value: 0.062 },
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(W, H) },
        uPreviousTexture: { value: rtA.texture },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uBrushSize: { value: 12.0 },
        uBrushStrength: { value: 0.15 },
        uTrailLength: { value: 0.85 },
        uStopDecay: { value: 0.94 },
      },
    });
    const mesh = new THREE.Mesh(geometry, diffusionMaterial);
    scene.add(mesh);

    const displayMaterial = new THREE.ShaderMaterial({
      vertexShader: displayVertexShader,
      fragmentShader: displayFragmentShader,
      uniforms: {
        uReactionDiffusionTexture: { value: rtB.texture },
        uPaletteTexture: { value: paletteTexture },
        uPixelSize: { value: 4.0 },
        uDistortionAmount: { value: 0.15 },
        uSoftness: { value: 1.2 },
        uEdgeWidth: { value: 0.5 },
        uEdgeAmp: { value: 0.4 },
        uDistortAmp: { value: 0.4 },
        uLineOpacity: { value: 0.5 },
        uIsDiagonal: { value: 0 },
        uResolution: { value: new THREE.Vector2(W, H) },
        uTime: { value: 0 },
      },
    });
    const displayMesh = new THREE.Mesh(geometry, displayMaterial);
    displayScene.add(displayMesh);

    const clock = new THREE.Clock();
    const mouse = new THREE.Vector2(0.5, 0.5);
    const targetMouse = new THREE.Vector2(0.5, 0.5);
    const handleMove = (e: PointerEvent) => {
      targetMouse.x = e.clientX / window.innerWidth;
      targetMouse.y = 1.0 - e.clientY / window.innerHeight;
    };

    const handleClick = (e: MouseEvent) => {
      targetMouse.x = e.clientX / window.innerWidth;
      targetMouse.y = 1.0 - e.clientY / window.innerHeight;
      mouse.copy(targetMouse);
    };

    const handleResize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      renderer.setSize(W, H);
      rtA.dispose();
      rtB.dispose();
      rtA = new THREE.WebGLRenderTarget(W, H, rtOptions);
      rtB = new THREE.WebGLRenderTarget(W, H, rtOptions);
      diffusionMaterial.uniforms.uResolution.value.set(W, H);
      displayMaterial.uniforms.uResolution.value.set(W, H);
    };

    window.addEventListener('pointermove', handleMove);
    container.addEventListener('click', handleClick);
    window.addEventListener('resize', handleResize);

    let animationId: number;

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();
      mouse.lerp(targetMouse, 0.05);

      diffusionMaterial.uniforms.uDiffuseRate.value = 0.8;
      diffusionMaterial.uniforms.uFeedRate.value = 0.054;
      diffusionMaterial.uniforms.uKillRate.value = 0.062;
      diffusionMaterial.uniforms.uTime.value = elapsedTime;
      diffusionMaterial.uniforms.uResolution.value.set(W, H);
      diffusionMaterial.uniforms.uMouse.value.copy(mouse);
      diffusionMaterial.uniforms.uBrushSize.value = 12.0;
      diffusionMaterial.uniforms.uBrushStrength.value = 0.15;
      diffusionMaterial.uniforms.uTrailLength.value = 0.85;
      diffusionMaterial.uniforms.uStopDecay.value = 0.94;
      diffusionMaterial.uniforms.uPreviousTexture.value = rtA.texture;

      renderer.setRenderTarget(rtB);
      renderer.render(scene, camera);
      renderer.setRenderTarget(null);

      displayMaterial.uniforms.uReactionDiffusionTexture.value = rtB.texture;
      displayMaterial.uniforms.uPaletteTexture.value = paletteTexture;
      displayMaterial.uniforms.uPixelSize.value = 4.0;
      displayMaterial.uniforms.uDistortionAmount.value = 0.15;
      displayMaterial.uniforms.uSoftness.value = 1.2;
      displayMaterial.uniforms.uEdgeWidth.value = 0.5;
      displayMaterial.uniforms.uEdgeAmp.value = 0.4;
      displayMaterial.uniforms.uDistortAmp.value = 0.4;
      displayMaterial.uniforms.uLineOpacity.value = 0.5;
      displayMaterial.uniforms.uIsDiagonal.value = 0;
      displayMaterial.uniforms.uResolution.value.set(W, H);
      displayMaterial.uniforms.uTime.value = elapsedTime;

      renderer.render(displayScene, camera);

      const temp = rtA;
      rtA = rtB;
      rtB = temp;
    };

    animate();

    return () => {
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationId);
      rtA.dispose();
      rtB.dispose();
      geometry.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}
    />
  );
}
