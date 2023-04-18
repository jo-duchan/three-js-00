import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { WEBGL } from './webgl'

if (WEBGL.isWebGLAvailable()) {
  const FogClolor = 0x004fff
  const ObjColor = 0xffffff
  const FloorColor = 0x555555

  // 장면 추가
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(FogClolor)
  // scene.fog = new THREE.Fog(FogClolor, 1, 8)
  scene.fog = new THREE.FogExp2(FogClolor, 0.6)

  // 카메라 추가
  const fov = 80
  const aspect = innerWidth / innerHeight
  const near = 0.1
  const far = 1000
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)

  camera.position.x = 0
  camera.position.y = 2
  camera.position.z = 3
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
  // controls.minDistance = 2 // 줌인 제한
  // controls.maxDistance = 4 // 줌아웃 제한
  controls.maxPolarAngle = Math.PI / 2 // 각도 제한
  controls.enableDamping = true // 마우스 우클릭으로 카메라 위치 변경

  // 컨트롤 업데이트
  controls.update()

  // 도형 추가
  const geometry = new THREE.TorusGeometry(0.7, 0.3, 12, 80)
  const material = new THREE.MeshStandardMaterial({
    color: ObjColor,
  })
  const obj = new THREE.Mesh(geometry, material)
  obj.position.y = 0.8
  obj.position.z = 0
  scene.add(obj)

  // 바닥 추가
  const planeGeometry = new THREE.PlaneGeometry(30, 30, 1, 1)
  const planeMaterial = new THREE.MeshStandardMaterial({
    color: FloorColor,
  })
  const plane = new THREE.Mesh(planeGeometry, planeMaterial)
  plane.rotation.x = -0.5 * Math.PI
  plane.position.y = -0.5
  scene.add(plane)

  // 빛 추가
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
  directionalLight.position.set(1, 1, 1)
  scene.add(directionalLight)

  function animate() {
    requestAnimationFrame(animate)
    obj.rotation.y += 0.01
    // required if controls.enableDamping or controls.autoRotate are set to true
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
