// Ensure ThreeJS is in global scope for the 'examples/'
global.THREE = require("three");

// Include any additional ThreeJS examples below
require("three/examples/js/controls/OrbitControls");

const canvasSketch = require("canvas-sketch");

const settings = {
  // Make the loop animated
  animate: true,
  // Get a WebGL canvas rather than 2D
  context: "webgl"
};

const sketch = ({ context }) => {
  // Create a renderer
  const renderer = new THREE.WebGLRenderer({
    canvas: context.canvas
  });

  // WebGL background color
  renderer.setClearColor("#000", 1);

  // Setup a camera
  const camera = new THREE.PerspectiveCamera(50, 1, 0.01, 100);
  camera.position.set(10, 8, 2);
  camera.lookAt(new THREE.Vector3());

  // Setup camera controller
  const controls = new THREE.OrbitControls(camera, context.canvas);

  // Setup your scene
  const scene = new THREE.Scene();

  // Setup a geometry
  const geometry = new THREE.SphereGeometry(1, 32, 16);
    //=====================ASSETS==============================
    const loader = new THREE.TextureLoader();
    const sunTexture = loader.load('assets/sun.jpg')
    const mercuryTexture = loader.load('assets/mercury.jpg')
    const venusTexture = loader.load('assets/venus.jpg')
    const earthTexture = loader.load('assets/earth.jpg')
    const moonTexture = loader.load('assets/moon.jpg')

  // Setup a material
  const material = new THREE.MeshBasicMaterial({
      map:sunTexture,
      roughness: 10
  });


  // Setup a mesh with geometry + material
  const sunMesh= new THREE.Mesh(geometry, material);
    const light = new THREE.PointLight('white',.5)
    light.position.set(1,2 ,0 )
    sunMesh.add(light)
    

    const mercuryGroup = new THREE.Group()
    const mercuryMaterial = new THREE.MeshBasicMaterial({
        map:mercuryTexture
    })
    const mercuryMesh = new THREE.Mesh(geometry,mercuryMaterial)
    mercuryMesh.position.set(2,1,0)
    mercuryMesh.scale.setScalar(.05)
    mercuryGroup.add(mercuryMesh)

    const venusGroup = new THREE.Group()
    const venusMaterial = new THREE.MeshBasicMaterial({
        map:venusTexture
    })
    const venusMesh = new THREE.Mesh(geometry,venusMaterial)
    venusMesh.position.set(4,2,0)
    venusMesh.scale.setScalar(.1)
    venusGroup.add(venusMesh)
    
    const earthGroup = new THREE.Group()
    const earthMaterial = new THREE.MeshBasicMaterial({
        map:earthTexture
    })
    const moonMaterial = new THREE.MeshBasicMaterial({
        map:moonTexture
    })
    const earthMesh = new THREE.Mesh(geometry,earthMaterial)
    const moonMesh = new THREE.Mesh(geometry,moonMaterial)
    earthMesh.position.set(6,4,0)
    earthMesh.scale.setScalar(.5)
    moonMesh.position.set(7,5,0)
    moonMesh.scale.setScalar(.05)
    earthGroup.add(earthMesh)
    earthGroup.add(moonMesh)
    

    ///====================SCENE===================================
    scene.add(sunMesh);
    scene.add(mercuryGroup)
    scene.add(venusGroup)
    scene.add(earthGroup)
   scene.add(new THREE.GridHelper(5,50))
  scene.add(new THREE.PointLightHelper(light,.5))
  let axesHelper = new THREE.AxesHelper(5)
  scene.add(axesHelper)

  // draw each frame
  return {
    // Handle resize events here
    resize({ pixelRatio, viewportWidth, viewportHeight }) {
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(viewportWidth, viewportHeight, false);
      camera.aspect = viewportWidth / viewportHeight;
      camera.updateProjectionMatrix();
    },
    // Update & render your scene here
    render({ time }) {
        sunMesh.rotation.y = time * .01
        mercuryMesh.rotation.y = time * .05
        mercuryGroup.rotation.y = time * 0.3
        venusMesh.rotation.y = time * .07
        venusGroup.rotation.y = time * 0.2
        earthMesh.rotation.y = time * .09
        earthGroup.rotation.y = time * 0.04
        moonMesh.rotation.y = time * 0.5
      controls.update();
      renderer.render(scene, camera);
    },
    // Dispose of events & renderer for cleaner hot-reloading
    unload() {
      controls.dispose();
      renderer.dispose();
    }
  };
};

canvasSketch(sketch, settings);
