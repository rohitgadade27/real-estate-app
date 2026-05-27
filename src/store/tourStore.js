import { create } from 'zustand';

export const scenesConfig = {
  aerial: {
    id: 'aerial',
    name: 'Exterior Aerial',
    cameraPos: [0, 5, 30],
    cameraTarget: [0, 5, 0],
    nextScene: 'lobby',
    hotspotPos: [12, 5, 15],
    image: '/scene_9_aerial_1779885922967.png'
  },
  lobby: {
    id: 'lobby',
    name: 'Building Entrance',
    cameraPos: [40, 5, 30],
    cameraTarget: [40, 5, 0],
    nextScene: 'livingRoom',
    hotspotPos: [52, 5, 15],
    image: '/scene_1_entrance_1779885753053.png'
  },
  livingRoom: {
    id: 'livingRoom',
    name: 'Living Room',
    cameraPos: [80, 5, 30],
    cameraTarget: [80, 5, 0],
    nextScene: 'kitchen',
    hotspotPos: [92, 5, 15],
    image: '/scene_2_living_1779885800272.png'
  },
  kitchen: {
    id: 'kitchen',
    name: 'Kitchen',
    cameraPos: [120, 5, 30],
    cameraTarget: [120, 5, 0],
    nextScene: 'bedroom',
    hotspotPos: [132, 5, 15],
    image: '/scene_3_kitchen_1779885815187.png'
  },
  bedroom: {
    id: 'bedroom',
    name: 'Bedroom',
    cameraPos: [160, 5, 30],
    cameraTarget: [160, 5, 0],
    nextScene: 'balcony',
    hotspotPos: [172, 5, 15],
    image: '/scene_4_bedroom_1779885835588.png'
  },
  balcony: {
    id: 'balcony',
    name: 'Balcony',
    cameraPos: [200, 5, 30],
    cameraTarget: [200, 5, 0],
    nextScene: 'bathroom',
    hotspotPos: [212, 5, 15],
    image: '/scene_5_balcony_1779885850717.png'
  },
  bathroom: {
    id: 'bathroom',
    name: 'Bathroom',
    cameraPos: [240, 5, 30],
    cameraTarget: [240, 5, 0],
    nextScene: 'masterBed',
    hotspotPos: [252, 5, 15],
    image: '/scene_6_bathroom_1779885873025.png'
  },
  masterBed: {
    id: 'masterBed',
    name: 'Master Bedroom',
    cameraPos: [280, 5, 30],
    cameraTarget: [280, 5, 0],
    nextScene: 'masterBath',
    hotspotPos: [292, 5, 15],
    image: '/scene_7_masterbed_1779885893505.png'
  },
  masterBath: {
    id: 'masterBath',
    name: 'Master Bathroom',
    cameraPos: [320, 5, 30],
    cameraTarget: [320, 5, 0],
    nextScene: 'aerial',
    hotspotPos: [332, 5, 15],
    image: '/scene_8_masterbath_1779885909053.png'
  }
};

export const useTourStore = create((set) => ({
  currentSceneId: 'aerial',
  isTransitioning: false,
  setTransitioning: (val) => set({ isTransitioning: val }),
  goToScene: (sceneId) => set({ currentSceneId: sceneId })
}));
