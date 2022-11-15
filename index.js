var $ltMAx$three = require("three");
var $ltMAx$gsap = require("gsap");

function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}

var $6597c10126238217$exports = {};
$6597c10126238217$exports = new URL("globe.a7af8433.jpg", "file:" + __filename).toString();


var $d5fa72fdd6efa6d8$exports = {};
$d5fa72fdd6efa6d8$exports = "#define GLSLIFY 1\nvarying vec2 vertexUV;\nvarying vec3 vertexNormal;\n\nvoid main() {\n    vertexUV = uv;\n    vertexNormal = normalize(normalMatrix * normal);\n    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}";


var $f5df5daef7585984$exports = {};
$f5df5daef7585984$exports = "#define GLSLIFY 1\nuniform sampler2D globeTexture;\nvarying vec2 vertexUV;\nvarying vec3 vertexNormal;\n\nvoid main() {\n\n    float intensity = 1.05 - dot(vertexNormal, vec3(0.0, 0.0, 1.0));\n\n    vec3 atmosphere = vec3(0.3, 0.6, 1.0) * pow(intensity, 1.5);\n    \n    gl_FragColor = vec4(atmosphere + texture2D(globeTexture, vertexUV).xyz, 1.0);\n}";


var $ceed418a60256804$exports = {};
$ceed418a60256804$exports = "#define GLSLIFY 1\nvarying vec3 vertexNormal;\n\nvoid main() {\n    vertexNormal = normalize(normalMatrix * normal);\n    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}";


var $08511085f5259fef$exports = {};
$08511085f5259fef$exports = "#define GLSLIFY 1\nvarying vec3 vertexNormal;\n\nvoid main() {\n\n    float intensity = pow(0.7 - dot(vertexNormal, vec3(0.0, 0.0, 1.0)), 2.0);\n    \n    gl_FragColor = vec4(0.3, 0.6, 1.0, 1.0) * intensity;\n}";



//canvas
const $4fa36e821943b400$var$canvas = document.querySelector("#c");
//scene
const $4fa36e821943b400$var$scene = new $ltMAx$three.Scene();
//camera
const $4fa36e821943b400$var$camera = new $ltMAx$three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//camera position
$4fa36e821943b400$var$camera.position.z = 15;
//renderer
const $4fa36e821943b400$var$renderer = new $ltMAx$three.WebGLRenderer({
    canvas: $4fa36e821943b400$var$canvas,
    antialias: true
});
$4fa36e821943b400$var$renderer.setSize(window.innerWidth, window.innerHeight);
//asset pixel ratio
$4fa36e821943b400$var$renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild($4fa36e821943b400$var$renderer.domElement);
//create a sphere
const $4fa36e821943b400$var$sphere = new $ltMAx$three.Mesh(new $ltMAx$three.SphereGeometry(5, 50, 50), new $ltMAx$three.ShaderMaterial({
    vertexShader: (0, (/*@__PURE__*/$parcel$interopDefault($d5fa72fdd6efa6d8$exports))),
    fragmentShader: (0, (/*@__PURE__*/$parcel$interopDefault($f5df5daef7585984$exports))),
    uniforms: {
        globeTexture: {
            value: new $ltMAx$three.TextureLoader().load((0, (/*@__PURE__*/$parcel$interopDefault($6597c10126238217$exports))))
        }
    }
}));
//create atmosphere
const $4fa36e821943b400$var$atmosphere = new $ltMAx$three.Mesh(new $ltMAx$three.SphereGeometry(5, 50, 50), new $ltMAx$three.ShaderMaterial({
    vertexShader: (0, (/*@__PURE__*/$parcel$interopDefault($ceed418a60256804$exports))),
    fragmentShader: (0, (/*@__PURE__*/$parcel$interopDefault($08511085f5259fef$exports))),
    blending: $ltMAx$three.AdditiveBlending,
    side: $ltMAx$three.BackSide
}));
//atm scale
$4fa36e821943b400$var$atmosphere.scale.set(1.1, 1.1, 1.1);
$4fa36e821943b400$var$scene.add($4fa36e821943b400$var$atmosphere);
//adding objects to the scene by group
const $4fa36e821943b400$var$group = new $ltMAx$three.Group();
$4fa36e821943b400$var$group.add($4fa36e821943b400$var$sphere);
$4fa36e821943b400$var$scene.add($4fa36e821943b400$var$group);
//stars background
const $4fa36e821943b400$var$starGeometry = new $ltMAx$three.BufferGeometry();
const $4fa36e821943b400$var$starMaterial = new $ltMAx$three.PointsMaterial({
    color: 0xffffff
});
const $4fa36e821943b400$var$starVertices = [];
for(let i = 0; i < 10000; i++){
    const x = (Math.random() - 0.5) * 2000;
    const y = (Math.random() - 0.5) * 2000;
    const z = -Math.random() * 3000;
    $4fa36e821943b400$var$starVertices.push(x, y, z);
}
$4fa36e821943b400$var$starGeometry.setAttribute("position", new $ltMAx$three.Float32BufferAttribute($4fa36e821943b400$var$starVertices, 3));
const $4fa36e821943b400$var$stars = new $ltMAx$three.Points($4fa36e821943b400$var$starGeometry, $4fa36e821943b400$var$starMaterial);
$4fa36e821943b400$var$scene.add($4fa36e821943b400$var$stars);
//mouse object
const $4fa36e821943b400$var$mouse = {
    x: undefined,
    y: undefined
};
//animation loop
const $4fa36e821943b400$var$animate = ()=>{
    //recoursive loop
    requestAnimationFrame($4fa36e821943b400$var$animate);
    //render method to animate the scene
    $4fa36e821943b400$var$renderer.render($4fa36e821943b400$var$scene, $4fa36e821943b400$var$camera);
    //rotation of the sphere
    $4fa36e821943b400$var$sphere.rotation.y += 0.002;
    //animation on mouse movement by gsap package
    (0, ($parcel$interopDefault($ltMAx$gsap))).to($4fa36e821943b400$var$group.rotation, {
        x: -$4fa36e821943b400$var$mouse.y * 0.3,
        y: $4fa36e821943b400$var$mouse.x * 0.5,
        duration: 2
    });
};
$4fa36e821943b400$var$animate();
//mouse event coord
addEventListener("mousemove", ()=>{
    $4fa36e821943b400$var$mouse.x = event.clientX / window.innerWidth * 2 - 1;
    $4fa36e821943b400$var$mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    console.log($4fa36e821943b400$var$mouse);
});


//# sourceMappingURL=index.js.map
