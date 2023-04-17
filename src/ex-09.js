import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { WEBGL } from './webgl'

if (WEBGL.isWebGLAvailable()) {
  // 장면 추가
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0xeeeeee)

  // 카메라 추가
  const fov = 120
  const aspect = innerWidth / innerHeight
  const near = 0.1
  const far = 1000
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
  camera.position.x = 0
  camera.position.y = 1
  camera.position.z = 1.8
  camera.lookAt(new THREE.Vector3(0, 0, 0))

  // 렌더러 추가
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
  })
  renderer.setSize(innerWidth, innerHeight)
  document.body.appendChild(renderer.domElement)
  renderer.shadowMap.enabled = true

  // 카메라 이후에 등장필요
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.update()

  // 도형 추가
  // const geometry = new THREE.SphereGeometry(0.5, 32, 16)
  const geometry = new THREE.IcosahedronGeometry(0.5, 0)
  // const geometry = new THREE.ConeGeometry(0.4, 0.7, 6)
  const material = new THREE.MeshStandardMaterial({
    color: 0x004fff,
  })
  const cube = new THREE.Mesh(geometry, material)
  cube.rotation.y = 0.5
  cube.position.y = 0.5
  scene.add(cube)
  cube.castShadow = true
  cube.receiveShadow = true

  const geometry2 = new THREE.IcosahedronGeometry(0.5, 0)
  const material2 = new THREE.MeshStandardMaterial({
    color: 0x004fff,
  })
  const cube2 = new THREE.Mesh(geometry2, material2)
  cube2.position.set(-0.8, 1.2, 0.5)
  scene.add(cube2)
  cube2.castShadow = true

  // 바닥 추가
  const planeGeometry = new THREE.PlaneGeometry(20, 20, 1, 1)
  const planeMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
  })
  const plane = new THREE.Mesh(planeGeometry, planeMaterial)
  plane.rotation.x = -0.5 * Math.PI
  plane.position.y = -0.2
  scene.add(plane)
  plane.receiveShadow = true

  // 빛
  // const ambientLight = new THREE.AmbientLight(0xffa500, 0.1)
  // scene.add(ambientLight)
  // ambientLight.castShadow = true // AmbientLight는 그림자를 지원하지 않음.

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
  directionalLight.position.set(-0.5, 2, 1)
  const dlHelper = new THREE.DirectionalLightHelper(
    directionalLight,
    0.2,
    0x0000ff
  )
  scene.add(dlHelper)
  scene.add(directionalLight)
  directionalLight.castShadow = true // 그림자 지원
  directionalLight.shadow.mapSize.width = 2048
  directionalLight.shadow.mapSize.height = 2048
  directionalLight.shadow.radius = 6

  // const hemisphereLight = new THREE.HemisphereLight(0x0000ff, 0xff0000, 1)
  // scene.add(hemisphereLight)

  // const pointLight = new THREE.PointLight(0xffffff, 0.5)
  // pointLight.position.set(-1, 1, 0.5)
  // const plHelper = new THREE.PointLightHelper(pointLight, 0.1)
  // scene.add(pointLight)
  // scene.add(plHelper)
  // pointLight.castShadow = true // 그림자 지원

  // const rectLight = new THREE.RectAreaLight(0xffffff, 2, 1, 1)
  // scene.add(rectLight)
  // rectLight.position.set(0.5, 0.5, 1)
  // rectLight.lookAt(0, 0, 0)
  // rectLight.castShadow = true // RectAreaLight는 그림자를 지원하지 않음.

  // const spotLight = new THREE.SpotLight(0xffffff, 0.5)
  // scene.add(spotLight)
  // spotLight.castShadow = true // 그림자 지원

  function render(time) {
    time *= 0.0005

    cube.rotation.y = time
    cube2.rotation.y = time

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
