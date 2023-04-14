import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { WEBGL } from './webgl'

if (WEBGL.isWebGLAvailable()) {
  // 장면 추가
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0xeeeeee)

  // 카메라
  const fov = 80
  const aspect = innerWidth / innerHeight
  const near = 0.1
  const far = 1000
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
  // const camera = new THREE.PerspectiveCamera(
  //   75,
  //   innerWidth / innerHeight,
  //   0.1,
  //   1000
  // )
  // camera.position.set(0, 0, 1)
  camera.position.x = 2
  camera.position.y = 2
  camera.position.z = 1
  camera.lookAt(new THREE.Vector3(0, 0, 0))

  // 렌더러
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
  })
  renderer.setSize(innerWidth, innerHeight)
  document.body.appendChild(renderer.domElement)

  // 카메라 이후에 등장필요
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.update()

  // 도형 추가
  const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)
  const material = new THREE.MeshStandardMaterial({
    color: 0xff7f00,
  })
  const cube = new THREE.Mesh(geometry, material)
  cube.rotation.y = 0.5
  scene.add(cube)

  // 바닥 추가
  const planeGeometry = new THREE.PlaneGeometry(30, 30, 1, 1)
  const planeMaterial = new THREE.MeshStandardMaterial({
    color: 0xeeeeee,
  })
  const plane = new THREE.Mesh(planeGeometry, planeMaterial)
  plane.rotation.x = -0.5 * Math.PI
  plane.rotation.y = -0.5
  scene.add(plane)

  const pointLight = new THREE.PointLight(0xffffbb, 1)
  pointLight.position.set(0, 2, 12)
  scene.add(pointLight)

  function render(time) {
    renderer.render(scene, camera)
    // requestAnimationFrame(render)
  }
  requestAnimationFrame(render)

  // 반응형 처리

  function onWindowResize() {
    camera.aspect = innerWidth / innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(innerWidth, innerHeight)
  }

  window.addEventListener('resize', onWindowResize)
} else {
  var warning = WEBGL.getWebGLErrorMessage()
  document.body.appendChild(warning)
}
