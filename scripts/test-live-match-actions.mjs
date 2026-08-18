const base=process.argv[2]||"http://127.0.0.1:3300";
async function post(body){const r=await fetch(`${base}/api/state`,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(body)});const b=await r.json();if(!r.ok)throw Error(b.error||`HTTP ${r.status}`);return b.state}
async function get(){return (await fetch(`${base}/api/state`)).json().then(x=>x.state)}
const initial=await get();
let state=await post({action:"patch",patch:{match:{...initial.match,phase:"Ready",minute:0,homeGoals:0,awayGoals:0,events:[],momentum:[50],paused:false,substitutions:[],lastAction:"Match ready"}}});
state=await post({action:"tick"}); const tick={minute:state.match.minute,momentum:state.match.momentum.slice(),lastAction:state.match.lastAction};
state=await post({action:"match-action",id:"pause"}); const pausedAt=state.match.minute; state=await post({action:"tick"}); const stayedPaused=state.match.minute===pausedAt;
state=await post({action:"match-action",id:"pause"}); state=await post({action:"match-action",id:"shout"}); const shout=state.match.lastAction;
const out=state.tactics.starters[0]; const incoming=state.tactics.bench[0]; state=await post({action:"substitute",id:out,inId:incoming}); const substitution=state.match.substitutions.at(-1);
state=await post({action:"individual",id:incoming,instruction:{pressingIntensity:"Aggressive",creativeFreedom:"Expressive",defensiveDuty:"Attack"}}); const instruction=state.tactics.individualInstructions[incoming];
console.log(JSON.stringify({tick,pausedAt,stayedPaused,shout,substitution,instruction,momentumPoints:state.match.momentum.length},null,2));
