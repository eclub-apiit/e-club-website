import * as T from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { buildPresenter } from './host';

const clamp = T.MathUtils.clamp;
const ease = (a,b,v) => T.MathUtils.smoothstep(v,a,b);
const mix = T.MathUtils.lerp;

// Original, procedural models. No venue photographs or third-party 3D assets.
export function createSummitScene(canvas, { onReady, onError, annotations, reduced = false }) {
  let disposed=false, frame=0, progress=0, target=0, bookOverride=null, active=true, lastFrame=performance.now();
  let renderer, announced=false, brandingReady=false, warmFrames=0;
  try { renderer=new T.WebGLRenderer({canvas,antialias:true,alpha:false,powerPreference:'high-performance'}); }
  catch { onError(); return {update(){},setBook(){},dispose(){}}; }
  renderer.setPixelRatio(Math.min(devicePixelRatio,1.6));
  renderer.outputColorSpace=T.SRGBColorSpace;
  renderer.toneMapping=T.ACESFilmicToneMapping;
  renderer.toneMappingExposure=1.05;
  renderer.shadowMap.enabled=true;
  renderer.shadowMap.type=T.PCFShadowMap;
  const scene=new T.Scene(); scene.background=new T.Color('#060e12');
  const camera=new T.PerspectiveCamera(37,1,.08,160);
  const environment=new RoomEnvironment();
  const pmrem=new T.PMREMGenerator(renderer);
  const env=pmrem.fromScene(environment,.05);scene.environment=env.texture;scene.environmentIntensity=.32;
  environment.dispose();pmrem.dispose();
  const materials=[],textures=[],geometries=[];
  function mat(color,metalness=0,roughness=.6,extra={}) { const m=new T.MeshStandardMaterial({color,metalness,roughness,...extra});materials.push(m);return m; }
  const wall=mat('#a5a5a0',.05,.85), floor=mat('#394243',.18,.7), steel=mat('#344047',.85,.24), black=mat('#10191d',.55,.36), teal=mat('#23474c',.1,.9), pale=mat('#d9d6ca',.1,.5), wood=mat('#9b7960',.1,.6), copper=mat('#ac7a42',.85,.25), mint=mat('#64dcc1',.5,.3);
  const lightMat=mat('#d9f8f0',.1,.2,{emissive:'#b8f9e7',emissiveIntensity:2});
  const fabric=mat('#0e242b',0,.95);
  function mesh(parent,geometry,material,pos=[0,0,0]) { geometries.push(geometry);const m=new T.Mesh(geometry,material);m.position.set(...pos);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m; }
  function box(parent,w,h,d,material,pos,r=.02) {return mesh(parent,new RoundedBoxGeometry(w,h,d,2,Math.min(r,w/3,h/3,d/3)),material,pos);}
  function cylinder(parent,rt,rb,h,material,pos,segments=32) {return mesh(parent,new T.CylinderGeometry(rt,rb,h,segments),material,pos);}
  function rod(parent,a,b,r,material) {const start=new T.Vector3(...a),end=new T.Vector3(...b);const m=cylinder(parent,r,r,start.distanceTo(end),material);m.position.copy(start.clone().add(end).multiplyScalar(.5));m.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),end.sub(start).normalize());return m;}
  function texture(w,h,draw) {const c=document.createElement('canvas');c.width=w;c.height=h;draw(c.getContext('2d'),w,h);const tex=new T.CanvasTexture(c);tex.colorSpace=T.SRGBColorSpace;tex.anisotropy=Math.min(4,renderer.capabilities.getMaxAnisotropy());textures.push(tex);return {canvas:c,texture:tex};}
  function surface(parent,w,h,tex,pos) {const m=mat('#ffffff',0,.58,{map:tex});return mesh(parent,new T.PlaneGeometry(w,h),m,pos);}
  const screenArt=texture(1600,800,(ctx,w,h)=>{ctx.fillStyle='#062027';ctx.fillRect(0,0,w,h);ctx.strokeStyle='#266b70';ctx.lineWidth=2;for(let i=0;i<7;i++){ctx.beginPath();ctx.moveTo(w*.7+i*70,0);ctx.lineTo(w*.3+i*70,h);ctx.stroke();}ctx.fillStyle='#a2e3d5';ctx.font='22px sans-serif';ctx.textAlign='center';ctx.fillText('ENTREPRENEURSHIP THRIVES HERE.',w/2,h*.79);ctx.font='18px sans-serif';ctx.fillText('26 NOVEMBER 2026   /   APIIT E-CLUB',w/2,h*.89);});
  const weave=texture(128,128,(c,w,h)=>{c.fillStyle='#808080';c.fillRect(0,0,w,h);for(let y=0;y<h;y+=4)for(let x=0;x<w;x+=4){c.fillStyle=(x+y)%8?'#919191':'#727272';c.fillRect(x,y,3,1);c.fillRect(x,y,1,3);}}).texture;
  weave.wrapS=weave.wrapT=T.RepeatWrapping;weave.repeat.set(5,5);teal.bumpMap=weave;teal.bumpScale=.009;fabric.bumpMap=weave;fabric.bumpScale=.005;
  const grain=texture(512,128,(c,w,h)=>{c.fillStyle='#999185';c.fillRect(0,0,w,h);for(let y=0;y<h;y++){c.strokeStyle=`rgba(38,22,10,${.04+(Math.sin(y*4.18)+1)*.04})`;c.beginPath();c.moveTo(0,y);for(let x=0;x<w;x+=8)c.lineTo(x,y+Math.sin(x*.018+y*.2)*.8);c.stroke();}}).texture;
  wood.bumpMap=grain;wood.bumpScale=.008;wood.roughness=.52;
  const logo=new Image();logo.onload=()=>{if(disposed)return;const ctx=screenArt.canvas.getContext('2d');ctx.drawImage(logo,160,210,1280,316);screenArt.texture.needsUpdate=true;brandingReady=true;wake();};logo.onerror=()=>{if(disposed)return;brandingReady=true;wake();};logo.src='/summit/summit-wordmark.webp';
  const hemi=new T.HemisphereLight('#daece9','#1b2127',.8);scene.add(hemi);
  const key=new T.DirectionalLight('#fff1d7',2.5);key.position.set(4,12,8);key.castShadow=true;key.shadow.mapSize.set(1024,1024);key.shadow.camera.left=-18;key.shadow.camera.right=18;key.shadow.camera.top=18;key.shadow.camera.bottom=-18;key.shadow.normalBias=.035;scene.add(key);
  const rim=new T.DirectionalLight('#4ae4d2',1.8);rim.position.set(-8,5,-9);scene.add(rim);
  const fill=new T.DirectionalLight('#bddcff',.7);fill.position.set(-5,5,10);scene.add(fill);

  const room=new T.Group();scene.add(room);
  box(room,15,.3,21,floor,[0,-.18,1.5]);
  box(room,15,.12,21,black,[0,-.39,1.5]);
  // Ceiling cutaway: exposed beams, restrained suspended strip lights.
  box(room,15,5.5,.2,wall,[0,2.65,-9]);
  box(room,.18,5.5,21,wall,[-7.4,2.65,1.5]);
  // Deliberate cutaway: rear wall and perimeter frame describe the enclosure
  // while the open foreground keeps the audience-to-stage camera path visible.
  box(room,.18,.65,21,wall,[7.4,.2,1.5]);
  box(room,.18,5.5,4.5,wall,[7.4,2.65,-6.75]);
  box(room,.16,.22,21.3,black,[7.4,5.3,1.5]);
  for(const z of [-4.5,11.85])box(room,.16,5.3,.16,steel,[7.4,2.65,z]);
  for(let z=-8;z<12;z+=3.2){box(room,14.8,.24,.2,black,[0,5.3,z]);for(const x of [-4,4]){box(room,2.6,.055,.08,lightMat,[x,5.05,z]);rod(room,[x,5.3,z],[x,5.05,z],.012,steel);}}
  for(let z=-7;z<12;z+=2.1){box(room,.025,4.4,.025,pale,[-7.28,2.2,z]);}
  for(let x=-6.5;x<7;x+=.7)box(room,.018,.006,20,steel,[x,-.021,1.5],.001);
  box(room,13,.45,3.6,black,[0,.2,-6.9]);
  box(room,13,.035,.035,mint,[0,.44,-5.09]);
  box(room,4,.15,.42,steel,[0,.075,-4.88]);
  // Stage wall, side acoustic fins, large real wordmark screen.
  for(let x=-6.6;x<=6.6;x+=.22)box(room,.1,4.3,.13,fabric,[x,2.55,-8.72]);
  box(room,8.4,3.7,.18,black,[0,3.1,-8.5]);
  const screen=surface(room,8.12,3.42,screenArt.texture,[0,3.1,-8.39]);const screenMaterial=new T.MeshBasicMaterial({map:screenArt.texture,toneMapped:false});materials.push(screenMaterial);screen.material=screenMaterial;
  // Auditorium chairs use instancing: 84 chairs with solid cushions and metal legs.
  const chairPositions=[];for(let row=0;row<7;row++)for(let col=0;col<12;col++)chairPositions.push([(col-5.5)*1.02+(col<6?-.5:.5),0,-2.6+row*1.75]);
  function instanceChairs(parent,positions){
    const parts=[{size:[.77,.14,.72],pos:[0,.58,0],mat:teal},{size:[.77,.69,.12],pos:[0,1,.3],mat:teal},{size:[.065,.55,.065],pos:[-.3,.28,-.25],mat:steel},{size:[.065,.55,.065],pos:[.3,.28,-.25],mat:steel},{size:[.065,.55,.065],pos:[-.3,.28,.25],mat:steel},{size:[.065,.55,.065],pos:[.3,.28,.25],mat:steel}];
    const dummy=new T.Object3D();for(const part of parts){const geo=new RoundedBoxGeometry(...part.size,2,.03);geometries.push(geo);const im=new T.InstancedMesh(geo,part.mat,positions.length);positions.forEach((p,i)=>{const angle=p[3]||0;dummy.position.set(p[0]+part.pos[0]*Math.cos(angle)+part.pos[2]*Math.sin(angle),p[1]+part.pos[1],p[2]+part.pos[2]*Math.cos(angle)-part.pos[0]*Math.sin(angle));dummy.rotation.y=angle;dummy.updateMatrix();im.setMatrixAt(i,dummy.matrix);});im.castShadow=true;im.receiveShadow=true;parent.add(im);}
  }
  instanceChairs(room,chairPositions);
  for(const z of [-1.7,1.8,5.3,8.8])for(const x of [-.72,.72])box(room,.025,.015,.45,lightMat,[x,.005,z]);
  // Five seats on stage, speaker identities deliberately unassigned.
  const stageChairs=new T.Group();room.add(stageChairs);stageChairs.position.set(0,.46,-6.7);stageChairs.rotation.y=Math.PI;
  instanceChairs(stageChairs,[-3,-1.5,0,1.5,3].map(x=>[x,0,0]));
  for(const x of [-2.25,.75]){cylinder(room,.36,.36,.045,wood,[x,1.02,-6.02]);cylinder(room,.035,.035,.55,steel,[x,.74,-6.02]);cylinder(room,.23,.23,.04,steel,[x,.48,-6.02]);}
  const lectern=new T.Group();lectern.position.set(4.8,.46,-5.8);room.add(lectern);
  box(lectern,.75,.06,.6,steel,[0,.05,0]);box(lectern,.59,1.1,.2,black,[0,.6,0]);box(lectern,.78,.06,.6,wood,[0,1.2,0]);
  const lecternMark=surface(lectern,.47,.116,screenArt.texture,[0,.8,.106]);lecternMark.scale.y=2;
  rod(lectern,[.2,1.23,0],[.2,1.46,-.06],.012,steel);rod(lectern,[.2,1.46,-.06],[.08,1.52,-.3],.012,steel);const podiumMic=rod(lectern,[.08,1.52,-.3],[.04,1.53,-.39],.025,black);podiumMic.castShadow=false;
  box(lectern,.26,.005,.32,pale,[-.08,1.235,-.02],.001);
  // Architectural scale figure at the host position; no likeness or speaker claim.
  const host=new T.Group();host.position.set(4.8,.46,-6.4);room.add(host);
  buildPresenter(host,{mesh,cylinder,rod,box,mat});

  const micRoot=new T.Group();micRoot.scale.setScalar(.7);scene.add(micRoot);
  const mic=new T.Group();micRoot.add(mic);mic.rotation.z=-.28;
  const micMetal=mat('#81929a',.8,.27,{envMapIntensity:2}),micBody=mat('#29343c',.65,.32,{envMapIntensity:2});
  const shell=new T.Group(),head=new T.Group(),capsule=new T.Group(),connector=new T.Group();mic.add(shell,head,capsule,connector);
  cylinder(shell,.245,.18,2.25,micBody,[0,-.55,0],64);
  for(const y of [-1.58,-1.51,.48])cylinder(shell,.25,.25,.035,steel,[0,y,0],64);
  box(shell,.09,.26,.02,steel,[0,-.2,.245]);box(shell,.042,.11,.025,black,[0,-.16,.26]);
  const brand=texture(512,128,(c)=>{c.clearRect(0,0,512,128);c.fillStyle='#bee6db';c.font='500 40px sans-serif';c.textAlign='center';c.fillText('CONVERGENCE',256,65);c.font='17px sans-serif';c.fillText('THE VOICE OF POSSIBILITY',256,100);});
  const micLabel=surface(shell,.32,.08,brand.texture,[0,-.77,.235]);micLabel.material.transparent=true;
  // Grille: dark acoustic core with interwoven metal rings and meridians.
  mesh(head,new T.SphereGeometry(.37,48,32),fabric,[0,.88,0]);
  for(let lat=-12;lat<=12;lat++){const a=lat*Math.PI/28,r=.375*Math.cos(a);const tor=mesh(head,new T.TorusGeometry(Math.max(.02,r),.007,4,64),micMetal,[0,.88+.375*Math.sin(a),0]);tor.rotation.x=Math.PI/2;}
  for(let lon=0;lon<34;lon++){const tor=mesh(head,new T.TorusGeometry(.377,.006,4,64),micMetal,[0,.88,0]);tor.rotation.y=lon*Math.PI/34;}
  cylinder(head,.32,.255,.15,steel,[0,.51,0],64);cylinder(head,.325,.325,.026,mint,[0,.5,0]);
  cylinder(capsule,.17,.17,.48,copper,[0,.72,0]);cylinder(capsule,.2,.2,.045,pale,[0,.98,0]);
  for(let i=0;i<14;i++)cylinder(capsule,.18,.18,.008,copper,[0,.55+i*.025,0]);
  rod(capsule,[-.08,.48,0],[-.08,-.1,0],.012,mint);rod(capsule,[.08,.48,0],[.08,-.1,0],.012,copper);
  cylinder(connector,.17,.17,.23,steel,[0,-1.8,0]);cylinder(connector,.145,.145,.035,black,[0,-1.93,0]);
  for(let i=0;i<3;i++){const a=i*Math.PI*2/3;cylinder(connector,.018,.018,.14,copper,[Math.cos(a)*.075,-2.01,Math.sin(a)*.075]);}
  const base=cylinder(micRoot,1.3,1.4,.12,black,[0,-3,0],64);const rimRing=mesh(micRoot,new T.TorusGeometry(1.31,.012,8,80),mint,[0,-2.93,0]);rimRing.rotation.x=Math.PI/2;
  base.receiveShadow=true;

  const bookRoot=new T.Group();bookRoot.scale.setScalar(.8);scene.add(bookRoot);
  const book=new T.Group();bookRoot.add(book);book.rotation.set(.08,-.4,-.12);
  const coverArt=texture(1024,1400,(c,w,h)=>{c.fillStyle='#102c32';c.fillRect(0,0,w,h);c.strokeStyle='#28777b';c.lineWidth=2;for(let i=0;i<10;i++){c.beginPath();c.moveTo(w*.2+i*110,h);c.lineTo(w+i*110,h*.2);c.stroke();}c.fillStyle='#6ad6bd';c.font='24px sans-serif';c.fillText('APIIT ENTREPRENEURSHIP CLUB',85,115);c.fillStyle='#f0eee4';c.font='92px Georgia';c.fillText('Innovator’s',85,340);c.fillText('Digest',85,445);c.font='22px sans-serif';c.fillStyle='#77d8c6';c.fillText('VOLUME 4',85,520);c.fillStyle='#b9c9c7';c.fillText('Ideas. Insights. Innovation.',85,1190);c.fillStyle='#69c4b8';c.fillRect(85,1260,100,3);c.font='22px sans-serif';c.fillText('2026',850,1267);});
  box(book,2.2,3.05,.045,black,[0,0,-.18]);
  box(book,2.09,2.95,.28,pale,[0,0,0]);
  for(let i=0;i<18;i++)box(book,2.07,.006,.003,wall,[0,-1.43+i*.16,.143],.001);
  const pageArt=texture(1024,1400,(c,w,h)=>{c.fillStyle='#e7e4d8';c.fillRect(0,0,w,h);c.fillStyle='#154047';c.font='22px sans-serif';c.fillText('INNOVATOR’S DIGEST / 04',75,115);c.font='76px Georgia';c.fillText('Ideas worth',75,320);c.fillText('taking forward.',75,410);c.font='27px sans-serif';c.fillText('A new chapter in entrepreneurship.',75,535);c.strokeStyle='#a7b4ad';for(let y=680;y<1100;y+=32){c.beginPath();c.moveTo(75,y);c.lineTo(y%64?900:780,y);c.stroke();}c.font='22px sans-serif';c.fillText('LAUNCHING AT CONVERGENCE',75,1280);});
  surface(book,2.05,2.91,pageArt.texture,[0,0,.148]);
  const hinge=new T.Group();hinge.position.set(-1.1,0,.18);book.add(hinge);
  box(hinge,2.2,3.05,.045,black,[1.1,0,0]);surface(hinge,2.2,3.05,coverArt.texture,[1.1,0,.025]);
  const inside=surface(hinge,2.16,3,pale.map||pageArt.texture,[1.1,0,-.025]);inside.rotation.y=Math.PI;
  box(book,.065,3.05,.37,black,[-1.1,0,0]);
  // Circular plinth keeps the object grounded rather than floating in space.
  cylinder(bookRoot,2.2,2.25,.12,black,[0,-1.7,0],64);

  const boardRoot=new T.Group();boardRoot.scale.setScalar(.76);scene.add(boardRoot);
  box(boardRoot,9,.18,6,floor,[0,-.12,0]);
  box(boardRoot,5.3,.14,2.4,wood,[0,1.2,0],.08);
  for(const x of [-2,2])for(const z of [-.85,.85])box(boardRoot,.09,1.13,.09,steel,[x,.56,z]);
  const boardSeats=new T.Group();boardRoot.add(boardSeats);
  instanceChairs(boardSeats,[-1.7,0,1.7].flatMap(x=>[[x,0,1.9,0],[x,0,-1.9,Math.PI]]));
  const paperArt=texture(600,800,c=>{c.fillStyle='#eeeae0';c.fillRect(0,0,600,800);c.fillStyle='#23544e';c.font='27px sans-serif';c.fillText('THE BOARDROOM',48,90);c.font='18px sans-serif';c.fillText('YOUR NEXT MOVE.',48,140);c.strokeStyle='#b9c1b5';for(let y=250;y<700;y+=45){c.beginPath();c.moveTo(48,y);c.lineTo(540,y);c.stroke();}});
  for(let i=0;i<4;i++){const p=surface(boardRoot,.52,.72,paperArt.texture,[-1.7+i*1.1,1.278,i%2?.55:-.5]);p.rotation.x=-Math.PI/2;p.rotation.z=i*.15;rod(boardRoot,[-1.4+i*1.1,1.3,-.1],[-1.2+i*1.1,1.3,.3],.013,black);}
  for(const x of [-1.5,1.5]){cylinder(boardRoot,.1,.08,.2,pale,[x,1.38,.1]);cylinder(boardRoot,.085,.085,.008,black,[x,1.483,.1]);}
  const laptop=new T.Group();boardRoot.add(laptop);laptop.position.set(0,1.3,-.38);box(laptop,.9,.035,.58,steel,[0,0,0]);const lid=box(laptop,.9,.6,.035,black,[0,.3,-.27]);lid.rotation.x=-.18;const display=surface(laptop,.83,.52,screenArt.texture,[0,.31,-.23]);display.rotation.x=-.18;

  // Camera and look-at are interpolated independently: a real dolly through the room.
  const keys=[
    [0,[26,18,34],[0,1.7,0]],
    [.14,[.3,3,12],[0,2,-6]],
    [.22,[1.6,2.3,1.6],[1.2,2,-7]],
    [.32,[6,2.3,-3.4],[4.9,2,-6]],
    [.344,[6,2.3,-3.4],[4.9,2,-6]],
    [.356,[4,1,8],[0,0,0]],
    [.45,[2.6,1,7.5],[0,0,0]],
    [.54,[1,.5,8.2],[0,0,0]],
    [.58,[1.5,1,7.8],[0,0,0]],
    [.7,[.6,1,8.7],[-.4,0,0]],
    [.725,[.6,1,8.7],[-.4,0,0]],
    [.745,[7,7,9],[0,.7,0]],
    [.86,[3.8,4.6,6.5],[0,.8,0]],
    [.874,[3.8,4.6,6.5],[0,.8,0]],
    [.892,[0,3,9],[0,2,-6]],
    [1,[26,18,34],[0,1,0]],
  ];
  const annotationPoint=new T.Vector3();
  const callouts=annotations?[...annotations.querySelectorAll('[data-mic-callout]')]:[];
  const leaders=annotations?[...annotations.querySelectorAll('[data-mic-leader]')]:[];
  const anchors=[[head,[.2,.95,0]],[capsule,[.13,.8,0]],[connector,[.12,-1.8,0]]];
  const aim=new T.Vector3();let width=1,height=1,mobile=false;
  function resize(){const rect=canvas.getBoundingClientRect();width=Math.max(1,rect.width);height=Math.max(1,rect.height);mobile=width<760;renderer.setSize(width,height,false);camera.aspect=width/height;camera.updateProjectionMatrix();wake();}
  const resizeObserver=new ResizeObserver(resize);resizeObserver.observe(canvas);
  function render(){
    frame=0;if(disposed||!active||document.hidden)return;
    const now=performance.now(),dt=Math.min(.06,(now-lastFrame)/1000);lastFrame=now;const damping=1-Math.exp(-12*dt);
    progress=reduced||!announced?target:mix(progress,target,damping);if(Math.abs(progress-target)<.00008)progress=target;
    const p=progress;let k=0;while(k<keys.length-2&&p>keys[k+1][0])k++;
    const a=keys[k],b=keys[k+1],v=ease(a[0],b[0],p);
    camera.position.set(...a[1]).lerp(new T.Vector3(...b[1]),v);aim.set(...a[2]).lerp(new T.Vector3(...b[2]),v);
    if(mobile){camera.position.sub(aim).multiplyScalar(p<.14?1.25:1.12).add(aim);camera.setViewOffset(width,height,0,-height*.04,width,height);}
    else camera.setViewOffset(width,height,-width*.2,0,width,height);
    camera.lookAt(aim);camera.updateProjectionMatrix();
    room.visible=p<.35||p>.88;micRoot.visible=p>=.35&&p<.56;bookRoot.visible=p>=.56&&p<.735;boardRoot.visible=p>=.735&&p<=.88;
    // Fade the studio to black only at scene boundaries; keep each object opaque.
    const boundaries=[.35,.56,.735,.88];let shutter=1;for(const boundary of boundaries)shutter=Math.min(shutter,clamp(Math.abs(p-boundary)/.012,0,1));
    canvas.style.opacity=String(shutter);
    const explode=ease(.405,.48,p)*(1-ease(.515,.55,p));
    head.position.y=explode*1.5;capsule.position.x=explode*.9;capsule.position.y=explode*.3;connector.position.y=-explode*.65;shell.position.x=-explode*.2;
    mic.rotation.y=mix(-.4,.5,ease(.35,.55,p));mic.rotation.z=mix(-.28,-.12,explode);
    const coverAngle=-(bookOverride===null?ease(.625,.69,p):Number(bookOverride))*2.25;
    hinge.rotation.y=reduced?coverAngle:mix(hinge.rotation.y,coverAngle,damping);
    boardRoot.rotation.y=mix(-.12,.18,ease(.735,.88,p));
    renderer.render(scene,camera);
    // Reveal only a complete, textured frame after a hidden GPU warm-up frame.
    if(!announced&&brandingReady&&width>1&&height>1){warmFrames++;if(warmFrames>=2){announced=true;onReady();}}
    if(annotations){
      const show=micRoot.visible?ease(.425,.465,p)*(1-ease(.513,.538,p)):0;
      annotations.style.opacity=String(show);annotations.style.visibility=show>.01?'visible':'hidden';
      annotations.setAttribute('data-visible',show>.5?'true':'false');
      annotations.style.setProperty('--mic-width',`${width}px`);
      anchors.forEach(([object,local],i)=>{
        const label=callouts[i],leader=leaders[i];if(!label||!leader)return;
        annotationPoint.set(...local);object.localToWorld(annotationPoint);annotationPoint.project(camera);
        const x=(annotationPoint.x+1)*width/2,y=(1-annotationPoint.y)*height/2;
        const labelWidth=mobile?Math.min(112,width*.31):Math.min(185,width*.15);
        const left=mobile?width-labelWidth-12:width-labelWidth-30;
        const top=mobile?height*(height<290?[.05,.32,.59]:[.14,.46,.76])[i]:height*[.2,.41,.64][i];
        label.style.width=`${labelWidth}px`;label.style.transform=`translate(${left}px,${top}px)`;
        const endY=top+12,bend=Math.min(left-12,x+25);
        leader.setAttribute('points',`${x},${y} ${bend},${endY} ${left-7},${endY}`);
        const dot=leader.nextElementSibling;dot.setAttribute('cx',x);dot.setAttribute('cy',y);
      });
    }
    if((!announced&&brandingReady)||progress!==target||Math.abs(hinge.rotation.y-coverAngle)>.001)frame=requestAnimationFrame(render);
  }
  function wake(){if(!disposed&&!frame&&active&&!document.hidden){lastFrame=performance.now()-16;frame=requestAnimationFrame(render);}}
  function visibility(){wake();}document.addEventListener('visibilitychange',visibility);
  const intersection=new IntersectionObserver(entries=>{active=entries[0].isIntersecting;if(active)wake();},{rootMargin:'150px'});intersection.observe(canvas);
  const contextLost=e=>{e.preventDefault();onError();};canvas.addEventListener('webglcontextlost',contextLost);
  resize();
  return {
    update(value){target=clamp(value,0,1);wake();},
    setBook(value){bookOverride=value;wake();},
    dispose(){disposed=true;cancelAnimationFrame(frame);logo.onload=null;logo.onerror=null;resizeObserver.disconnect();intersection.disconnect();document.removeEventListener('visibilitychange',visibility);canvas.removeEventListener('webglcontextlost',contextLost);for(const g of new Set(geometries))g.dispose();for(const m of materials)m.dispose();for(const t of textures)t.dispose();env.dispose();renderer.dispose();renderer.forceContextLoss();}
  };
}
