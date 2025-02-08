import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

document.addEventListener("DOMContentLoaded", function () {

    // Get the model path from the data-model attribute
    

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 1; // Adjust as needed

    // Renderer setup
    const canvas = document.getElementById('threeCanvas');
    if (!canvas) {
        console.error("Canvas element not found!");
        return;
    }

    const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const modelPath = canvas.getAttribute('data-model');
    const m = "jupiter.glb"

    // Load Model
    const loader = new GLTFLoader();
    loader.load(
        modelPath+m,
        function (gltf) {
            const model = gltf.scene;
            scene.add(model);
            let scale = 0.001;
            model.scale.set(scale, scale, scale);
            console.log("Model Loaded Successfully", model);
        }
    );

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;
    controls.enableRotate = true;
    controls.zoomSpeed = 0.4;
    controls.rotateSpeed = 0.5;

    // Handle Window Resize
    window.addEventListener('resize', () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    });

    // Animation Loop
    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }
    animate();
})