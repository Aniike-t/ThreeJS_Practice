

const roadConfig = [
    { 
        type: 'road',
        scale:{x:1,y:1,z:1} ,rotate:{x:0,y:Math.PI/2,z:0},
        position: { 
            x: [19,19,19,18,18,18,19,18,19,18], 
            y: [0,0,0,0,0,0,0,0,0,0], 
            z: [19,18,17,19,18,17,16,16,15,15] },
        obj: '../../public/models/road/road_drivewayDouble.obj',
        mtl: '../../public/models/road/road_drivewayDouble.mtl' 
    },

    // Add more building configurations here
  ];
  
  export default roadConfig;