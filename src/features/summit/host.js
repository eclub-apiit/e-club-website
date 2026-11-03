import * as T from 'three';

// An original, anonymous presenter with adult proportions and tailored clothing.
// Helpers belong to the scene so every geometry/material follows its disposal lifecycle.
export function buildPresenter(parent, { mesh, cylinder, rod, box, mat }) {
  const navy=mat('#20303e',0,.88), lapel=mat('#293b4c',0,.82);
  const shirt=mat('#e2e5df',0,.92), tie=mat('#32695f',0,.85);
  const skin=mat('#b58a6e',0,.88), skinShade=mat('#9c7059',0,.93);
  const hair=mat('#302a25',0,.98), detail=mat('#554237',0,.95), shoes=mat('#20292b',.08,.6);
  function ellipsoid(pos,scale,material,group=parent){const m=mesh(group,new T.SphereGeometry(1,32,24),material,pos);m.scale.set(...scale);return m;}
  function polygon(points,material,group=parent){
    const g=new T.BufferGeometry(),positions=[];
    const triangles=T.ShapeUtils.triangulateShape(points.map(p=>new T.Vector2(p[0],p[1])),[]);
    for(const tri of triangles)for(const i of tri)positions.push(...points[i]);
    g.setAttribute('position',new T.Float32BufferAttribute(positions,3));g.computeVertexNormals();
    material.side=T.DoubleSide;return mesh(group,g,material);
  }

  // A tapered jacket with a shoulder line, waist and two separate fronts.
  const torso=mesh(parent,new T.LatheGeometry([new T.Vector2(.155,.86),new T.Vector2(.158,.96),new T.Vector2(.145,1.1),new T.Vector2(.19,1.31),new T.Vector2(.185,1.36),new T.Vector2(.08,1.43)],40),navy);
  torso.scale.set(1.12,1,.64);
  cylinder(parent,.042,.047,.12,skin,[0,1.45,0]);
  polygon([[-.075,1.425,.14],[0,1.10,.14],[.075,1.425,.14]],shirt);
  // A clean, layered shirt front, collar and narrow notched lapels.
  polygon([[-.058,1.43,.155],[-.077,1.397,.155],[-.046,1.337,.155],[-.007,1.39,.155]],shirt);
  polygon([[.058,1.43,.155],[.007,1.39,.155],[.046,1.337,.155],[.077,1.397,.155]],shirt);
  polygon([[-.014,1.39,.159],[0,1.366,.159],[.014,1.39,.159],[0,1.408,.159]],tie);
  polygon([[0,1.368,.157],[-.017,1.18,.157],[0,1.15,.157],[.017,1.18,.157]],tie);
  for(const side of [-1,1])polygon([[-.07,1.42],[-.137,1.355],[-.09,1.29],[-.108,1.27],[-.004,1.10],[-.035,1.30]].map(([x,y])=>[x*side,y,.148]),lapel);
  for(const y of [1.035,.965])ellipsoid([.012,y,.112],[.008,.008,.003],detail);
  box(parent,.046,.015,.004,shirt,[-.125,1.3,.116],.001);
  // Natural leg spacing and shoes with a distinct toe.
  for(const side of [-1,1]){rod(parent,[side*.085,.89,-.005],[side*.09,.48,.005],.07,navy);rod(parent,[side*.09,.48,.005],[side*.095,.09,.02],.055,navy);ellipsoid([side*.095,.05,.065],[.065,.045,.14],shoes);}
  // Both forearms rest lightly at the lectern, with visible shirt cuffs and hands.
  for(const side of [-1,1]){
    const shoulder=[side*.19,1.31,0],elbow=[side*.265,1.08,.18],wrist=[side*.18,1.22,.46];
    ellipsoid(shoulder,[.072,.08,.065],navy);rod(parent,shoulder,elbow,.062,navy);ellipsoid(elbow,[.058,.058,.058],navy);rod(parent,elbow,wrist,.048,navy);
    rod(parent,[side*.185,1.217,.441],[side*.175,1.226,.48],.038,shirt);
    const hand=ellipsoid([side*.17,1.225,.505],[.037,.022,.066],skin);hand.rotation.y=side*.15;
    for(let f=0;f<3;f++)rod(parent,[side*.17-.018+f*.013,1.224,.532],[side*.17-.018+f*.013,1.22,.568],.006,skin);
  }
  // Jaw, cheeks and forehead form a continuous head, rather than a sphere.
  const face=new T.Group();face.position.set(0,1.49,0);face.rotation.set(-.035,-.09,.025);parent.add(face);
  const profile=[[.022,0],[.047,.012],[.063,.038],[.074,.082],[.077,.13],[.072,.185],[.05,.225],[0,.242]].map(([r,y])=>new T.Vector2(r,y));
  const head=mesh(face,new T.LatheGeometry(profile,48),skin);head.scale.z=.89;
  for(const side of [-1,1]){ellipsoid([side*.074,.112,-.002],[.014,.026,.012],skin,face);ellipsoid([side*.08,.11,.003],[.004,.014,.006],skinShade,face);}
  // A small nose bridge and tip, sculpted from the facial plane.
  polygon([[-.009,.143,.066],[-.012,.092,.072],[0,.087,.091],[.012,.092,.072],[.009,.143,.066],[0,.125,.078]],skin,face);
  ellipsoid([0,.093,.081],[.011,.007,.009],skin,face);
  // Restrained eye and mouth detail at architectural scale.
  for(const side of [-1,1]){
    const eye=ellipsoid([side*.03,.134,.064],[.012,.0035,.003],detail,face);eye.rotation.z=side*-.06;
    const brow=rod(face,[side*.018,.15,.064],[side*.044,.149,.058],.0025,hair);brow.castShadow=false;
  }
  const mouth=rod(face,[-.021,.056,.055],[.021,.056,.055],.0018,skinShade);mouth.castShadow=false;
  // Hair follows a varied hairline around the temples and a subtle side part.
  const vertices=[],indices=[],segments=64,rings=16;
  for(let j=0;j<=rings;j++)for(let i=0;i<=segments;i++){
    const a=i/segments*Math.PI*2,t=j/rings,front=Math.max(0,Math.sin(a));
    const boundary=.103+.074*front+.006*Math.cos(a*3);
    const y=boundary+(.247-boundary)*Math.sin(t*Math.PI/2);
    let radius=0;
    for(let q=0;q<profile.length-1;q++)if(y>=profile[q].y&&y<=profile[q+1].y){const f=(y-profile[q].y)/(profile[q+1].y-profile[q].y);radius=T.MathUtils.lerp(profile[q].x,profile[q+1].x,f)*1.045;break;}
    vertices.push(Math.cos(a)*radius*(1+.04*Math.sin(a)),y+.003,Math.sin(a)*radius*.89-.002);
    if(j<rings&&i<segments){const n=j*(segments+1)+i;indices.push(n,n+segments+1,n+1,n+1,n+segments+1,n+segments+2);}
  }
  const hairGeo=new T.BufferGeometry();hairGeo.setAttribute('position',new T.Float32BufferAttribute(vertices,3));hairGeo.setIndex(indices);hairGeo.computeVertexNormals();const hairMesh=mesh(face,hairGeo,hair);hairMesh.material.side=T.DoubleSide;
  return parent;
}
