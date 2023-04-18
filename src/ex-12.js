import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { WEBGL } from './webgl'

if (WEBGL.isWebGLAvailable()) {
  // 장면 추가
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0xeeeeee)
  const axesHelper = new THREE.AxesHelper(5)
  scene.add(axesHelper)

  // 카메라 추가
  const fov = 50
  const aspect = innerWidth / innerHeight
  const near = 1
  const far = 4000
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
  camera.position.set(0, 20, 100)
  // camera.lookAt(new THREE.Vector3(0, 0, 0))

  // 렌더러 추가
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
  })
  renderer.setSize(innerWidth, innerHeight)
  document.body.appendChild(renderer.domElement)

  // OrbitControls 추가
  // 카메라 이후에 등장필요
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true // 가중치
  controls.minDistance = 20 // 줌인 제한
  controls.maxDistance = 800 // 줌아웃 제한
  // controls.maxPolarAngle = Math.PI / 2 // 각도 제한

  // 컨트롤 업데이트
  // controls.update()

  const skyMaterialArray = []
  const texture_ft = new THREE.TextureLoader().load('../static/img/bay_ft.jpg')
  const texture_bk = new THREE.TextureLoader().load('../static/img/bay_bk.jpg')
  const texture_up = new THREE.TextureLoader().load('../static/img/bay_up.jpg')
  const texture_dn = new THREE.TextureLoader().load('../static/img/bay_dn.jpg')
  const texture_rt = new THREE.TextureLoader().load('../static/img/bay_rt.jpg')
  const texture_lf = new THREE.TextureLoader().load('../static/img/bay_lf.jpg')

  skyMaterialArray.push(
    new THREE.MeshStandardMaterial({
      map: texture_ft,
    })
  )
  skyMaterialArray.push(
    new THREE.MeshStandardMaterial({
      map: texture_bk,
    })
  )
  skyMaterialArray.push(
    new THREE.MeshStandardMaterial({
      map: texture_up,
    })
  )
  skyMaterialArray.push(
    new THREE.MeshStandardMaterial({
      map: texture_dn,
    })
  )
  skyMaterialArray.push(
    new THREE.MeshStandardMaterial({
      map: texture_rt,
    })
  )
  skyMaterialArray.push(
    new THREE.MeshStandardMaterial({
      map: texture_lf,
    })
  )

  // 반복문
  for (let i = 0; i < 6; i++) {
    skyMaterialArray[i].side = THREE.BackSide
  }

  // 메쉬 추가
  const skyGeometry = new THREE.BoxGeometry(2400, 2400, 2400)
  const sky = new THREE.Mesh(skyGeometry, skyMaterialArray)
  scene.add(sky)

  // 빛 추가
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
  scene.add(ambientLight)

  function animate() {
    requestAnimationFrame(animate)
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
