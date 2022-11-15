var $ltMAx$three = require("three");


const $4fa36e821943b400$var$canvas = document.querySelector("#c");
const $4fa36e821943b400$var$scene = new $ltMAx$three.Scene();
const $4fa36e821943b400$var$camera = new $ltMAx$three.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
const $4fa36e821943b400$var$renderer = new $ltMAx$three.WebGLRenderer($4fa36e821943b400$var$canvas);
$4fa36e821943b400$var$renderer.setSize(innerWidth, innerHeight);
document.body.appendChild($4fa36e821943b400$var$renderer.domElement);
const $4fa36e821943b400$var$animate = ()=>{
    requestAnimationFrame($4fa36e821943b400$var$animate);
    $4fa36e821943b400$var$renderer.render($4fa36e821943b400$var$scene, $4fa36e821943b400$var$camera);
};


//# sourceMappingURL=index.js.map
