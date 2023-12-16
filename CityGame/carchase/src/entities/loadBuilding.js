import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import * as THREE from 'three';
import * as CANNON from 'cannon-es';

const loadBuilding = (objPath, mtlPath, positions, scene, scale, rotate) => {
  const mtlLoader = new MTLLoader();
  mtlLoader.load(mtlPath, (materials) => {
    materials.preload();
    const objLoader = new OBJLoader();
    objLoader.setMaterials(materials);

    // Iterate over the positions array
    for (let i = 0; i < positions.x.length; i++) {
      const position = {
        x: positions.x[i],
        y: positions.y[i],
        z: positions.z[i],
      };

      objLoader.load(objPath, (object) => {

        object.scale.set(scale.x, scale.y, scale.z);
        object.rotation.set(rotate.x, rotate.y, rotate.z);
        scene.add(object);
        object.position.set(position.x, position.y, position.z);

      });
    }
  });
};

export default loadBuilding;