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

  // OrbitControls 추가
  // 카메라 이후에 등장필요
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.minDistance = 2
  controls.maxDistance = 4
  controls.maxPolarAngle = Math.PI / 2
  // controls.enableDamping = true
  controls.update()

  // 도형 추가
  const geometry = new THREE.IcosahedronGeometry(0.5, 0)
  const material = new THREE.MeshStandardMaterial({
    color: 0x004fff,
    metalness: 0.3,
    roughness: 0.4,
  })
  const obj = new THREE.Mesh(geometry, material)
  obj.rotation.y = 0.5
  obj.position.set(0.5, 0.5, 0)
  scene.add(obj)
  obj.castShadow = true
  obj.receiveShadow = true

  const geometry2 = new THREE.IcosahedronGeometry(0.5, 0)
  const material2 = new THREE.MeshStandardMaterial({
    color: 0xff0000,
    metalness: 0.5,
    roughness: 0.4,
  })
  const obj2 = new THREE.Mesh(geometry2, material2)
  obj2.position.set(-0.5, 1.2, 0.5)
  scene.add(obj2)
  obj2.castShadow = true

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
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.7)
  scene.add(ambientLight)

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7)
  directionalLight.position.set(-1.5, 2, 1)
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
  directionalLight.shadow.radius = 8

  function animate() {
    requestAnimationFrame(animate)
    obj.rotation.y += 0.01
    obj2.rotation.y += 0.015
    // required if controls.enableDamping or controls.autoRotate are set to true
    controls.update()
    renderer.render(scene, camera)
  }
  animate()

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
