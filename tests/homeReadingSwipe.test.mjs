import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {build} from 'esbuild';
const code=(await build({entryPoints:['src/utils/homeReadingSwipe.ts'],bundle:true,format:'cjs',platform:'node',write:false})).outputFiles[0].text;
function setup({scrollable=false,interactive=false,zoom=1}={}) {
  class Element { closest() { return interactive ? {} : null; } }
  const listeners=new Map(); let opens=0;
  const element=new Element();element.addEventListener=(type,cb)=>listeners.set(type,cb);
  element.removeEventListener=type=>listeners.delete(type);
  const context=vm.createContext({module:{exports:{}},Element,window:{innerHeight:800,innerWidth:400,scrollY:0,visualViewport:{scale:zoom},getSelection:()=>null},document:{scrollingElement:{scrollHeight:scrollable?1000:800},documentElement:{clientHeight:800}}});
  vm.runInContext(code,context);
  const cleanup=context.module.exports.attachHomeReadingSwipe(element,()=>opens++);
  const touch=(x,y)=>({clientX:x,clientY:y,identifier:1});
  const emit=(type,x,y,time=0,count=1)=>listeners.get(type)?.({target:element,timeStamp:time,touches:type==='touchend'?[]:Array.from({length:count},()=>touch(x,y)),changedTouches:[touch(x,y)]});
  return {emit,cleanup,listeners,get opens(){return opens;}};
}
test('short upward swipe in bottom area opens Reading once; unmount removes listeners',()=>{
 const s=setup();s.emit('touchstart',200,740);s.emit('touchmove',205,690,150);s.emit('touchend',205,685,250);
 assert.equal(s.opens,1);s.emit('touchend',205,685,300);assert.equal(s.opens,1);
 s.cleanup();assert.equal(s.listeners.size,0);
});
test('taps, long presses, sideways, downward, edge and upper-screen gestures are ignored',()=>{
 for(const [x,y,endX,endY,duration] of [[200,740,200,725,200],[200,740,200,680,1500],[200,740,300,690,200],[200,700,200,760,200],[10,740,10,680,200],[200,400,200,340,200]]){
  const s=setup();s.emit('touchstart',x,y);s.emit('touchmove',endX,endY,100);s.emit('touchend',endX,endY,duration);assert.equal(s.opens,0);
 }
});
test('scrolling, interactive controls, zoom, multitouch and cancelled touches remain native',()=>{
 for(const opts of [{scrollable:true},{interactive:true},{zoom:2}]){
  const s=setup(opts);s.emit('touchstart',200,740);s.emit('touchend',200,680,200);assert.equal(s.opens,0);
 }
 for(const type of ['touchcancel','touchmove']){
  const s=setup();s.emit('touchstart',200,740);s.emit(type,200,710,100,2);s.emit('touchend',200,680,200);assert.equal(s.opens,0);
 }
});
