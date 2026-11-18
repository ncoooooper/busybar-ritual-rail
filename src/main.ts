import {surface,panel,rect,label,read,persist,wrap,mint,amber,type Frame,type Key} from "@shared/surface";
import {loadValues} from "@shared/settings";

const names=["Morning","Focus","Shutdown"];
const defaults=["Water | Light | Stretch | Plan","Clear desk | Pick task | Silence phone","Save work | Write next step | Close desk"];
let steps=defaults.map(split);
function split(s:string){return s.split("|").map(x=>x.trim()).filter(Boolean).slice(0,7);}
function day(){const d=new Date();return [d.getFullYear(),d.getMonth()+1,d.getDate()].join("-");}
type Journal={day:string; steps:string; count:number};
let route=read("route",0), records=read<Record<string,Journal>>("journal",{}), ready=false;
function count(){
 const record=records[route];
 return record&&record.day===day()&&record.steps===steps[route].join("|")?Math.min(record.count,steps[route].length):0;
}
function draw():Frame{
 const completed=count(), list=steps[route], finished=completed===list.length;
 const view=[label("route",names[route].toUpperCase(),0,0,amber,"front","tiny"),
 {...label("step",finished?"All done!":list[completed],0,7,mint),width:72,scroll_rate:30},
 ...panel("RITUAL RAIL",["Route "+(route+1)+"/3: "+names[route],completed+" of "+list.length+" complete",
 finished?"All stops complete":"> "+list[completed].slice(0,27),list[completed+1]?"Next: "+list[completed+1].slice(0,22):"",
 "Wheel: route / click: done","Start: undo last step"])];
 for(let i=0;i<list.length;i++)view.push(rect("pip"+i,43+i*4,1,3,3,i<completed?mint:"#394551FF"));
 return view;
}
function input(k:Key){
 if(!ready)return;
 if(k==="up"||k==="down"){route=wrap(route+(k==="up"?1:-1),3);persist("route",route);}
 if(k==="ok"||k==="start"){
   const n=Math.min(steps[route].length,Math.max(0,count()+(k==="ok"?1:-1)));
   records[route]={day:day(),steps:steps[route].join("|"),count:n};persist("journal",records);
 }
 console.log("route",names[route],count(),steps[route].join("|"));
}
const refresh=surface(draw,input,undefined,{enabled:false});
void loadValues().then(settings=>{
 steps=defaults.map((value,i)=>{const list=split(String(settings?.["route"+i]||value));return list.length?list:split(value);});
 ready=true;refresh();
 console.log("resumed",names[route],count(),steps[route].join("|"));
});
