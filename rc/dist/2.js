(window.webpackJsonp=window.webpackJsonp||[]).push([[2],[,,,,function(t,s,e){var i,h;i=[e(5),e(8),e(12)],void 0===(h=function(t,s,e){return class{constructor(t,s){this.sk=t,this.style=s,this.wheels=[],this.width=Math.max(document.documentElement.clientWidth,window.innerWidth||0),this.height=Math.max(document.documentElement.clientHeight,window.innerHeight||0),this.rpmSlider=null,this.lastPressedObj=null,this.createWheels(),this.createHand()}createHand(){const t=this.width/2,e=this.height/2,i=this.wheels[this.wheels.length-1].radius;this.hand=new s(this.sk,t,e,i,this.wheels)}createWheels(){this.wheels=[];const s=this.width/2,i=this.height/2;let h=e.getStyleConfig(this.style);for(var r=0;r<h.wheels.length;r++){const e=h.wheels[r];let a=new t(this.sk,s,i,e);this.wheels.push(a)}}preload(){this.wheels.forEach(t=>{t.preload()})}draw(){for(var t=this.wheels.length-1;t>-1;t--)this.wheels[t].draw();this.hand.draw(this.rpmSlider.value()),this.sk.fill(0),this.sk.textSize(18),this.sk.color("#000000"),this.sk.textFont("Playfair Display"),this.sk.text("RPM",this.width/2+100,this.height-20),this.sk.text("Style",this.width/2-100,this.height-20)}setup(){this.sk.colorMode(this.sk.HSB),this.rpmSlider=this.sk.createSlider(20,100,e.handConfig.defaultRpm),this.rpmSlider.position(this.width/2+100,e.interfaceHeight-50),this.rpmSlider.style("width","200px"),this.wheels.forEach(t=>{t.setup()}),this.sk.textAlign(this.sk.CENTER),this.sel=this.sk.createSelect(),this.sel.position(this.width/2-100,e.interfaceHeight-50),this.sel.option("Empty"),this.sel.option("4 on the Floor"),this.sel.option("Classic Half Time"),this.sel.option("The Dance Beat"),this.sel.option("Son Clave"),this.sel.option("Tresillo"),this.sel.changed(this.getStyleChangedListener())}reset(){let t=this.sel.value().toLowerCase().replace(/ /g,"_");this.sk.reset(t)}getIntersectObj(t,s){for(var e=0;e<this.wheels.length;e++){let i=this.wheels[e].getIntersectObj(t,s);if(null!=i)return i}return null}mousePressed(){this.lastPressedObj=this.getIntersectObj(this.sk.mouseX,this.sk.mouseY),null!=this.lastPressedObj&&this.lastPressedObj.mousePressed(this.sk.mouseX,this.sk.mouseY)}mouseReleased(){this.lastPressedObj&&(this.lastPressedObj.mouseReleased(this.sk.mouseX,this.sk.mouseY),this.lastPressedObj=null)}mouseDragged(){this.lastPressedObj&&this.lastPressedObj.mouseDragged(this.sk.mouseX,this.sk.mouseY)}}}.apply(s,i))||(t.exports=h)},function(t,s,e){var i,h;i=[e(6)],void 0===(h=function(t){return class{constructor(t,s,e,{radius:i,color:h,defaultBase:r=null,defaultBeatTypes:a=null}){this.sk=t,this.radius=i,this.beats=this.createBeats({base:r,types:a}),this.x=s,this.y=e,this.strokeColor=h,this.fillColor=h,this.dragOriginX=null,this.dragOriginY=null}createBeats({base:t=null,types:s=null}){return s?this.createPreconfiguredBeats(s):this.createDefaultBeats(t)}createDefaultBeats(s){let e=[];for(var i=0;i<s;i++){const h=2*i*Math.PI/s;let r=new t(this.sk,h);e.push(r)}return e}createPreconfiguredBeats(s){let e=[];for(var i=0;i<s.length;i++){const h=2*i*Math.PI/s.length;let r=new t(this.sk,h,s[i]);e.push(r)}return e}getBeatCenter(t){return{x:this.x+this.radius*Math.sin(t.radians),y:this.y-this.radius*Math.cos(t.radians)}}draw(){this.sk.stroke(this.strokeColor),this.sk.fill(this.fillColor),this.sk.circle(this.x,this.y,2*this.radius);for(var t=0;t<this.beats.length;t++){let s=this.beats[t];const{x:e,y:i}=this.getBeatCenter(s);s.draw(e,i)}}getIntersectObj(t,s){for(var e=0;e<this.beats.length;e++){let i=this.beats[e];if(this.sk.dist(t,s,i.x,i.y)<=i.currType.radius)return i}return this.sk.dist(t,s,this.x,this.y)<=this.radius?this:null}preload(){this.beats.forEach(t=>{t.preload()})}setup(){this.beats.forEach(t=>{t.setup()})}mousePressed(t,s){this.dragOriginX=t,this.dragOriginY=s}mouseReleased(t,s){this.dragOriginX=null,this.dragOriginY=null}mouseDragged(t,s){const e=this.sk.dist(this.dragOriginX,this.dragOriginY,this.x,this.y),i=this.sk.dist(t,s,this.x,this.y),h=this.sk.dist(this.dragOriginX,this.dragOriginY,t,s);var r=Math.acos((Math.pow(e,2)+Math.pow(i,2)-Math.pow(h,2))/(2*e*i));this.isClockWiseMove(t,s)||(r*=-1),this.beats.forEach(t=>{t.addRadians(r)}),this.dragOriginX=t,this.dragOriginY=s}isClockWiseMove(t,s){let e=[this.dragOriginX-this.x,this.dragOriginY-this.y],i=[t-this.x,s-this.y];return!(e[0]*i[1]<e[1]*i[0])}}}.apply(s,i))||(t.exports=h)},function(t,s,e){var i,h;i=[e(11)],void 0===(h=function(t){return class{constructor(t,s,e=null){this.sk=t,this.radians=s,this.defaultType=e,this.enabled=!0,this.isPlaying=!1,this.typeIndex=-1,this.currType=null,this.currSound=null,this.sounds=null}incrementTypeIndex(){this.typeIndex=(this.typeIndex+1)%t.length}preload(){this.sounds=[];for(var s=0;s<t.length;s++)if(""!=t[s].src){let e=this.sk.loadSound(t[s].src);this.sounds.push(e),this.setSoundOnEndedCallback(e,this)}else this.sounds.push(null)}setup(){this.defaultType?this.typeIndex=t.findIndex(t=>t.name==this.defaultType):this.typeIndex=0,this.currType=t[this.typeIndex],this.currSound=null,this.currSound=this.sounds[this.typeIndex]}addRadians(t){this.radians+=t,this.radians>2*Math.PI?this.radians=0:this.radians<0&&(this.radians+=2*Math.PI)}nextType(){this.incrementTypeIndex(),this.currType=t[this.typeIndex],this.enabled=!0,this.isPlaying=!1,null!=this.sounds&&(this.currSound=this.sounds[this.typeIndex])}setSoundOnEndedCallback(t,s){t.onended(()=>{s.isPlaying=!1})}draw(t,s){this.x=t,this.y=s,this.isPlaying&&this.swell(t,s),this.currType.strokeColor?(this.sk.stroke(this.currType.strokeColor),this.sk.strokeWeight(this.currType.strokeWeight)):this.sk.noStroke(),this.sk.fill(this.currType.color),this.sk.circle(t,s,this.currType.radius)}swell(t,s){const e=this.currSound.currentTime()/this.currSound.duration(),i=this.currType.radius+Math.sin(Math.PI*e)*(this.currType.swellRadius-this.currType.radius);this.sk.fill(this.currType.color),this.sk.noStroke(),this.sk.circle(t,s,i)}play(){if(this.enabled&&this.currSound)try{this.isPlaying=!0,this.currSound.play()}catch(t){console.log(t)}}mousePressed(t,s){this.isPlaying||(this.nextType(),this.play())}mouseReleased(t,s){}mouseDragged(t,s){}disable(){this.enabled=!1}enable(){this.enabled=!0}}}.apply(s,i))||(t.exports=h)},,function(t,s,e){var i,h;const r=60;i=[e(12)],void 0===(h=function(t){return class{constructor(s,e,i,h,r){this.sk=s,this.color=t.handConfig.color,this.baseWidth=t.handConfig.baseWidth,this.x=e,this.y=i,this.length=h,this.rotation=0,this.wheels=r}position(t){const{top:s,left:e}=this.container.position();this.handElem.css({top:s+this.container.height()/2,left:e+this.container.width()/2})}draw(t){const s=t/r,e=this.sk.frameRate(),i=2*s*Math.PI/e;if(i>10)return;const h=this.x-Math.cos(this.rotation)*this.baseWidth/2,a=this.y-Math.sin(this.rotation)*this.baseWidth/2,n=this.x+Math.cos(this.rotation)*this.baseWidth/2,l=this.y+Math.sin(this.rotation)*this.baseWidth/2,o=this.x+Math.sin(this.rotation)*this.length,d=this.y-Math.cos(this.rotation)*this.length;this.sk.fill(this.color),this.sk.triangle(h,a,n,l,o,d),this.rotation=(this.rotation+i)%(2*Math.PI),this.playIfNextBeatHit()}playIfNextBeatHit(){for(var t=0;t<this.wheels.length;t++){let e=this.wheels[t];for(var s=0;s<e.beats.length;s++){let t=e.beats[s];this.isBeatHit(t)?(t.play(),t.disable()):t.enable()}}}isBeatHit(t){return Math.abs(this.rotation-t.radians)<.1}}}.apply(s,i))||(t.exports=h)},function(t,s,e){var i,h;i=[e(14)],void 0===(h=function(t){}.apply(s,i))||(t.exports=h)},function(t,s,e){var i;void 0===(i=function(){return{wheels:[{radius:200,color:"#F39C6B",defaultBase:2},{radius:300,color:"#FF3864",defaultBase:3},{radius:400,color:"#261447",defaultBase:4}]}}.apply(s,[]))||(t.exports=i)},function(t,s,e){var i,h;i=[e(12)],void 0===(h=function(t){class s{constructor(t,s,e,i,h=null,r=null,a=null){this.name=t,this.src=s,this.color=e,this.radius=i,this.swellRadius=h,this.strokeColor=r,this.strokeWeight=a}}let e=[];return e.push(new s("nullBeat","",t.beatsConfig.nullBeat.color,t.beatsConfig.nullBeat.radius,t.beatsConfig.nullBeat.strokeColor,t.beatsConfig.nullBeat.strokeWeight)),Object.keys(t.beatsConfig.types).forEach((i,h)=>{e.push(new s(i,t.beatsConfig.types[i].src,t.beatsConfig.types[i].color,t.beatsConfig.types[i].radius,t.beatsConfig.types[i].swellRadius))}),e}.apply(s,i))||(t.exports=h)},function(t,s,e){var i,h;i=[e(12),e(10),e(13)],void 0===(h=function(t,s,e){return{defaultStyle:"empty",styleOptions:["Empty","4 on the Floor","Classic Half Time","The Dance Beat","Son Clave","Tresillo"],interfaceHeight:window.innerHeight,interfaceWidth:window.innerWidth,backgroundColor:"#f4f4f4",handConfig:{defaultRpm:30,color:"#ffffff",baseWidth:7},beatsConfig:{nullBeat:{radius:40,color:"#eef0e8",strokeColor:"#000000",strokeWeight:0},maxShockWaveRadiusMultiplyer:1.5,types:{type1:{radius:50,swellRadius:60,src:"./assets/bass_sample.mp3",color:"#32e5b2"},type2:{radius:60,swellRadius:70,src:"./assets/clap_sample.mp3",color:"#db0808"},type3:{name:"type3",radius:80,swellRadius:90,src:"./assets/hh_sample.mp3",color:"#4f4ad6"}}},getStyleConfig:t=>{switch(t){case"empty":return s;case"4_on_the_floor":return e;default:return s}}}}.apply(s,i))||(t.exports=h)},function(t,s,e){var i;void 0===(i=function(){return{wheels:[{radius:200,color:"#F39C6B",defaultBeatTypes:["type1","type2"]},{radius:300,color:"#FF3864",defaultBeatTypes:["nullBeat","type3","nullBeat","type3"]},{radius:400,color:"#261447",defaultBase:8}]}}.apply(s,[]))||(t.exports=i)},function(t,s,e){var i,h;i=[e(10)],void 0===(h=function(t){return t}.apply(s,i))||(t.exports=h)}]]);