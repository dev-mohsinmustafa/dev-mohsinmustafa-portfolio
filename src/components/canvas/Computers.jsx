
// we can start creating our threejs react three fiber canvas  
import { Suspense, useEffect, useState } from 'react';

import { Canvas } from '@react-three/fiber';

// helpers to draw us on this canvas
import { OrbitControls, Preload, useGLTF } from '@react-three/drei';

// useGLTF is most important part which is going to allow us import 3D Models

import CanvasLoader from "../Loader";





const Computers = ({ isMobile }) => {
  // import our GLTS model 

  const computer = useGLTF("./desktop_pc/scene.gltf");
  // desktop is a model that adrian prepare 
  // first of all when creating 3js elements we not start with div tag we start with mesh 
  return (

    
    <mesh position={[0, -0.5, 0]}>
      {/* position={[0, -0.5, 0]} this is add by me */}

      {/* // incide mesh we create light otherwise we cannot see anything */}
      <hemisphereLight intensity={5} groundColor="black" />

      <pointLight intensity={1} />
      <spotLight position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />

      <primitive object={computer.scene}
        scale={isMobile ? 0.7 : 0.75}
        position={isMobile ? [0, -3, -2.2] : [0, -3.25, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
      />

    </mesh>
  )
}


// now we create another component to show light
const ComputersCanvas = () => {

  // for mobile responsive
  const [isMobile, setIsMobile] = useState(false);


  useEffect(() => {
    // check if we are on mobile device  which we can do by media query 

    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width : 500px)");

    // Set the initial value of the `isMobile` state variable
    setIsMobile(mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    }

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);


    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    }


  }, [])


  return (

    <Canvas
      frameloop='demand'
      shadows
      // camera most important part of every 3d scene
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    // 20 x-axis 3 y-axis 5 z-axis fov field of view
    >

      {/* now add a suspense  */}
      <Suspense fallback={<CanvasLoader />}>
        {/* these orbitcontrols allows us to move the model pic */}
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        //  these polar allow to move pic only moving center/horizontally not vertically
        />


        {/* for responsive pass props isMobile */}
        <Computers isMobile={isMobile} />

      </Suspense>


      <Preload all />


    </Canvas>
  )
}

export default ComputersCanvas;
// export default Computers;
