import React, { useRef, useState } from 'react';
import { Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useTourStore, scenesConfig } from '../../store/tourStore';
import './Hotspot.css';

const Hotspot = ({ sceneId }) => {
  const meshRef = useRef();
  const [hovered, setHover] = useState(false);
  const goToScene = useTourStore((state) => state.goToScene);
  const isTransitioning = useTourStore((state) => state.isTransitioning);
  const currentSceneId = useTourStore((state) => state.currentSceneId);
  
  const sceneData = scenesConfig[sceneId];
  
  // Only show hotspots for the NEXT available scene
  const currentSceneData = scenesConfig[currentSceneId];
  const isNextScene = currentSceneData && currentSceneData.nextScene === sceneId;

  useFrame((state) => {
    // Make the hotspot slowly bob up and down
    if (meshRef.current && isNextScene) {
      meshRef.current.position.y = sceneData.hotspotPos[1] + Math.sin(state.clock.elapsedTime * 3) * 0.5;
    }
  });

  if (!sceneData || !isNextScene) return null;

  return (
    <group position={sceneData.hotspotPos} ref={meshRef}>
      {/* Invisible interactive mesh for pointer events in 3D space */}
      <mesh 
        onClick={() => !isTransitioning && goToScene(sceneId)}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
        scale={[2, 2, 2]}
      >
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshBasicMaterial visible={false} />
      </mesh>

      {/* HTML Overlay Marker attached to the 3D coordinate */}
      <Html center className={`hotspot-html ${hovered ? 'hovered' : ''}`}>
        <div className="hotspot-pulse" onClick={() => !isTransitioning && goToScene(sceneId)}>
          <div className="hotspot-inner"></div>
          {hovered && <div className="hotspot-tooltip">Enter {sceneData.name}</div>}
        </div>
      </Html>
    </group>
  );
};

export default Hotspot;
