import * as THREE from 'three'

function createGrid(scene, gridSize, cellSize) {
    const gridGeometry = new THREE.BufferGeometry();
    const positions = [];
    const colors = [];
    
    
    for (let i = -gridSize / 2; i <= gridSize / 2; i++) {
        // Vertices
        positions.push(i, 0, -gridSize / 2);
        positions.push(i, 0, gridSize / 2);
    
        positions.push(-gridSize / 2, 0, i);
        positions.push(gridSize / 2, 0, i);
    
        // Colors
        colors.push(1, 1, 1); // white for each vertex, modify as needed
        colors.push(1, 1, 1);
    
        colors.push(1, 1, 1);
        colors.push(1, 1, 1);
    }
    
    gridGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    gridGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    
    const gridMaterial = new THREE.LineBasicMaterial({ opacity: 0.2, transparent: true });
    const gridLines = new THREE.LineSegments(gridGeometry, gridMaterial);
    scene.add(gridLines);
  }

  export default createGrid;