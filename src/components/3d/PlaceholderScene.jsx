import React from 'react';
import Hotspot from './Hotspot';
import { Image } from '@react-three/drei';
import { scenesConfig } from '../../store/tourStore';

const PlaceholderScene = () => {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 20, 5]} intensity={1.5} castShadow />
      
      {/* Ground Plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
        <planeGeometry args={[1000, 1000]} />
        <meshStandardMaterial color="#0f172a" roughness={0.8} />
      </mesh>

      {/* Render all AI Generated Images as massive floating gallery screens */}
      {Object.values(scenesConfig).map((scene) => (
        <group key={`image-group-${scene.id}`}>
          {/* Add a stylish TV-like frame behind the image */}
          <mesh position={[scene.cameraTarget[0], scene.cameraTarget[1], scene.cameraTarget[2] - 0.2]}>
             <boxGeometry args={[42, 42, 0.2]} />
             <meshStandardMaterial color="#000000" metalness={0.8} roughness={0.2} />
          </mesh>
          {/* The AI Generated Image mapped as a Texture */}
          <Image 
            url={scene.image} 
            position={scene.cameraTarget} 
            scale={[40, 40]} 
            transparent 
          />
        </group>
      ))}

      {/* Render all Hotspots */}
      {Object.values(scenesConfig).map((scene) => (
        <Hotspot key={`hotspot-${scene.id}`} sceneId={scene.id} />
      ))}
    </>
  );
};

export default PlaceholderScene;
