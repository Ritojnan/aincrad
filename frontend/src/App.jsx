import './App.css'
import React, { useRef, useState,useEffect  } from 'react'
import { Canvas, useFrame ,useThree} from '@react-three/fiber'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";


const CameraController = () => {
  const { camera, gl } = useThree();
  useEffect(
     () => {
        const controls = new OrbitControls(camera, gl.domElement);
        controls.minDistance = 3;
        controls.maxDistance = 20;
        return () => {
          controls.dispose();
        };
     },
     [camera, gl]
  );
  return null;
};

function Box(props) {
  // This reference will give us direct access to the mesh
  const meshRef = useRef()
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (meshRef.current.rotation.x += delta))
  // Return view, these are regular three.js elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Canvas>
         <CameraController />
         <ambientLight />
         <directionalLight position={[0, 40, 5]} color="red" />
         <directionalLight position={[4,0, 5]} color="blue" />

         <spotLight intensity={0.3} position={[5, 10, 50]} />

         
         <mesh>
            <boxGeometry attach="geometry" args={[3, 2, 1]} />
            <meshPhongMaterial attach="material" color="hotpink" />
         </mesh>
      </Canvas>

      <Canvas>
      <ambientLight intensity={0.1} />
      <directionalLight position={[0, 0, 5]} color="red" />

      <mesh
  onClick={(e) => console.log('click')}
  onContextMenu={(e) => console.log('context menu')}
  onDoubleClick={(e) => console.log('double click')}
  onWheel={(e) => console.log('wheel spins')}
  onPointerUp={(e) => console.log('up')}
  onPointerDown={(e) => console.log('down')}
  onPointerOver={(e) => console.log('over')}
  onPointerOut={(e) => console.log('out')}
  onPointerEnter={(e) => console.log('enter')}
  onPointerLeave={(e) => console.log('leave')}
  onPointerMove={(e) => console.log('move')}
  onPointerMissed={() => console.log('missed')}
  onUpdate={(self) => console.log('props have been updated')}
>  <boxGeometry args={[2, 2, 2]} />
    <meshStandardMaterial />
  </mesh>
  <ambientLight />
    <pointLight position={[10, 10, 10]} />
    <Box position={[-1.2, 0, 0]} />
    <Box position={[1.2, 0, 0]} />

  </Canvas>
    </>
  )
}

export default App
