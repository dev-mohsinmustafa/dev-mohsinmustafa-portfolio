import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";



const Earth = () => {
  // import 3d model
  const earth = useGLTF("./planet/scene.gltf");

  return (
    <primitive object={earth.scene} scale={2.5} position-y={0} rotation-y={0} />
  )
}


const EarthCanvas = () => {
  return (
    <Canvas
      shadows
      frameloop='demand'
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-4, 3, 6],
      }}
    >
      {/* suspense is when while when our model is loading we have something to show so fallback */}
      <Suspense fallback={<CanvasLoader />}>
        {/* if it has loaded */}
        <OrbitControls
          autoRotate
          enableZoom={false}
          // this is just how rotation is happening
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />

        {/* return earth model */}
        <Earth />

        <Preload all />
      </Suspense>
    </Canvas>
  );
};


export default EarthCanvas