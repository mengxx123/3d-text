$(function() {
  //Makes window responsive
    window.addEventListener( 'resize', onWindowResize, false );

    function onWindowResize() {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth, window.innerHeight );

    }

  //Global variables/Basics
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );
  // Camera Position
  camera.position.y = 100;
  camera.position.z = 100;
  camera.position.x = 0;
  camera.lookAt(0, 0, 0)

  var renderer = new THREE.WebGLRenderer();
  renderer.shadowMapEnabled = true;
  renderer.shadowMapSoft = true;
  renderer.setClearColor(0x000000);
  renderer.setSize(window.innerWidth, window.innerHeight);

  //adds lights
  var light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
  scene.add(light);

  var loader = new THREE.FontLoader();
    loader.load('fonts/OpenSansBold.json', function(font) {
      var loader = new THREE.FontLoader();
      var textGeo = new THREE.TextGeometry('CJH', {
        font: font,
        size: 200,
        height: 50,
        curveSegments: 12,
        position: 3,
        bevelThickness: 2,
        bevelSize: 5,
        bevelEnabled: true,
      });

      var textMaterial = new THREE.MeshPhongMaterial({ color: 0x1861b3 });

      var myText = new THREE.Mesh(textGeo, textMaterial);
      myText.position.set(0, 0, 0);
      myText.material.color.setHex('0xff0000');
      console.log("this is the meshed text",myText);
      scene.add(myText);
    });

    function deleteText(){
        var textArray = scene.children;
        console.log("this is textArray",textArray);
        var lastTextAdded = textArray[textArray.length-1];
        if(lastTextAdded instanceof THREE.Mesh){
            scene.remove(lastTextAdded);
        }
    }

  //adds orbit controls
  var controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.addEventListener('change', render);

  //Renders the scene
  render();
  function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }

  renderer.render(scene, camera);
  $('#webGL-container').append(renderer.domElement);
  //Last Brackets before app end
});
