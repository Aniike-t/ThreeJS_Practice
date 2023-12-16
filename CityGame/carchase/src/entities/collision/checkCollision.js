import * as THREE from 'three';

const raycaster = new THREE.Raycaster();


function checkCollisions(carContainer,scene) {
    // Update the raycaster based on the car's position and direction
    raycaster.set(carContainer.position, new THREE.Vector3(0, 0.1, -1).applyQuaternion(carContainer.quaternion));

    // Check for intersections with objects in the scene
    const intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
        // Collision detected
        const collidingObject = intersects[0].object;
        
    }
}


export default checkCollisions;