import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { WEBGL } from './webgl'

if (WEBGL.isWebGLAvailable()) {
  // 장면
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0xffffff)

  // 카메라
  const fov = 120
  const aspect = innerWidth / innerHeight
  const near = 0.1
  const far = 1000
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
  camera.position.x = 0
  camera.position.y = 0.1
  camera.position.z = 1.8
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
  const geometry = new THREE.SphereGeometry(0.5, 32, 16)
  const material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
  })
  const cube = new THREE.Mesh(geometry, material)
  cube.rotation.y = -0.5
  scene.add(cube)

  // 바닥 추가
  const planeGeometry = new THREE.PlaneGeometry(20, 20, 1, 1)
  const planeMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
  })
  const plane = new THREE.Mesh(planeGeometry, planeMaterial)
  plane.rotation.x = -0.5 * Math.PI
  plane.position.y = -0.2
  scene.add(plane)

  // 빛
  // const ambientLight = new THREE.AmbientLight(0xffa500, 0.1)
  // scene.add(ambientLight)

  // const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
  // directionalLight.position.set(-1, 1, 1)
  // const dlHelper = new THREE.DirectionalLightHelper(
  //   directionalLight,
  //   0.2,
  //   0x0000ff
  // )
  // scene.add(dlHelper)
  // scene.add(directionalLight)

  // const hemisphereLight = new THREE.HemisphereLight(0x0000ff, 0xff0000, 1)
  // scene.add(hemisphereLight)

  // const pointLight = new THREE.PointLight(0xffffff, 1)
  // scene.add(pointLight)
  // pointLight.position.set(-2, 0.5, 0.5)
  // const plHelper = new THREE.PointLightHelper(pointLight, 0.1)
  // scene.add(plHelper)

  // const rectLight = new THREE.RectAreaLight(0xffffff, 2, 1, 1)
  // scene.add(rectLight)
  // rectLight.position.set(0.5, 0.5, 1)
  // rectLight.lookAt(0, 0, 0)

  const spotLight = new THREE.SpotLight(0xffffff, 0.5)
  scene.add(spotLight)

  function render(time) {
    time *= 0.0005

    cube.rotation.y = time

    renderer.render(scene, camera)

    requestAnimationFrame(render)
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
