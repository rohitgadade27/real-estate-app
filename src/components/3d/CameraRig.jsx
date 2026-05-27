import React, { useEffect, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { useTourStore, scenesConfig } from '../../store/tourStore';
import gsap from 'gsap';
import * as THREE from 'three';

const CameraRig = () => {
  const { camera } = useThree();
  const currentSceneId = useTourStore((state) => state.currentSceneId);
  const setTransitioning = useTourStore((state) => state.setTransitioning);
  
  // Create a dummy object to track the camera's lookAt target smoothly
  const targetRef = useRef(new THREE.Vector3(0, 5, 0));

  useEffect(() => {
    const targetScene = scenesConfig[currentSceneId];
    if (!targetScene) return;

    setTransitioning(true);

    // Animate camera position (smooth cinematic movement)
    gsap.to(camera.position, {
      x: targetScene.cameraPos[0],
      y: targetScene.cameraPos[1],
      z: targetScene.cameraPos[2],
      duration: 3,
      ease: "power3.inOut",
      onUpdate: () => {
        camera.lookAt(targetRef.current);
      },
      onComplete: () => {
        setTransitioning(false);
      }
    });

    // Animate camera lookAt target (smooth pan)
    gsap.to(targetRef.current, {
      x: targetScene.cameraTarget[0],
      y: targetScene.cameraTarget[1],
      z: targetScene.cameraTarget[2],
      duration: 3,
      ease: "power3.inOut"
    });

  }, [currentSceneId, camera, setTransitioning]);

  useFrame(() => {
    // Continually update the camera to look at the animated target
    camera.lookAt(targetRef.current);
  });

  return null;
};

export default CameraRig;
