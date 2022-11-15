import * as THREE from "three";
import globe from "../img/globe.jpg";
//shader in glsl
import vertexShader from "../shader/vertex.glsl";
import fragmentShader from "../shader/fragment.glsl";
import atmosphereVertexShader from "../shader/atmosphereVertex.glsl";
import atmosphereFragmentShader from "../shader/atmosphereFragment.glsl";
import gsap from "gsap";

//canvas
const canvas = document.querySelector("#c");

//scene
const scene = new THREE.Scene();

//camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

//camera position
camera.position.z = 15;

//renderer
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

//asset pixel ratio
renderer.setPixelRatio(window.devicePixelRatio);

document.body.appendChild(renderer.domElement);

//create a sphere

const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(5, 50, 50),
  new THREE.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    uniforms: {
      globeTexture: {
        value: new THREE.TextureLoader().load(globe),
      },
    },
  })
);

//create atmosphere

const atmosphere = new THREE.Mesh(
  new THREE.SphereGeometry(5, 50, 50),
  new THREE.ShaderMaterial({
    vertexShader: atmosphereVertexShader,
    fragmentShader: atmosphereFragmentShader,
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide,
  })
);

//atm scale
atmosphere.scale.set(1.1, 1.1, 1.1);

scene.add(atmosphere);

//adding objects to the scene by group
const group = new THREE.Group();
group.add(sphere);
scene.add(group);

//stars background
const starGeometry = new THREE.BufferGeometry();
const starMaterial = new THREE.PointsMaterial({
  color: 0xffffff,
});

const starVertices = [];
for (let i = 0; i < 10000; i++) {
  const x = (Math.random() - 0.5) * 2000;
  const y = (Math.random() - 0.5) * 2000;
  const z = -Math.random() * 3000;
  starVertices.push(x, y, z);
}

starGeometry.setAttribute(
  "position",
  new THREE.Float32BufferAttribute(starVertices, 3)
);

const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);

//mouse object
const mouse = {
  x: undefined,
  y: undefined,
};

//animation loop
const animate = () => {
  //recoursive loop
  requestAnimationFrame(animate);
  //render method to animate the scene
  renderer.render(scene, camera);
  //rotation of the sphere
  sphere.rotation.y += 0.002;
  //animation on mouse movement by gsap package
  gsap.to(group.rotation, {
    x: -mouse.y * 0.3,
    y: mouse.x * 0.5,
    duration: 2,
  });
};

animate();

//mouse event coord

addEventListener("mousemove", () => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  console.log(mouse);
});
