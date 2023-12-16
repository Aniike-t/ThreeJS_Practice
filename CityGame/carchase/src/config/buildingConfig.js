const buildingConfig = [
    { 
        type: 'Residential',
        scale:{x:0.75,y:0.75,z:0.75} ,rotate:{x:0,y:0,z:0},
        position: { x: [], y:[], z: [] },
        obj: '../../public/models/house_type02.obj',
        mtl: '../../public/models/house_type02.mtl' 
    },
    { 
        type: 'Commercial',scale:{x:1,y:1,z:1} ,
        rotate:{x:0,y:Math.PI/2,z:0} ,
        position:{ x: [20,17,17], y:[0,0,1.5], z: [17,17,17] }, 
        obj: '../../public/models_comm/OBJ_format/large_buildingA.obj', 
        mtl: '../../public/models_comm/OBJ_format/large_buildingA.mtl' 
    },
    { 
        type: 'SkyC',scale:{x:1,y:1,z:1} ,
        rotate:{x:0,y:Math.PI/2,z:0} ,
        position:{ x: [20,20,20], y:[0,0,0], z: [20,18.75,15] }, 
        obj: '../../public/models_comm/OBJ_format/skyscraperA.obj', 
        mtl: '../../public/models_comm/OBJ_format/skyscraperA.mtl' 
    },
    // Add more building configurations here
  ];
  
  export default buildingConfig;