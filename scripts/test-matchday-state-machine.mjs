const base=process.argv[2]||"http://127.0.0.1:3400";
async function post(body){const r=await fetch(`${base}/api/state`,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(body)});const b=await r.json();if(!r.ok)throw Error(b.error||`HTTP ${r.status}`);return b.state}
async function get(){return (await fetch(`${base}/api/state`)).json().then(x=>x.state)}
let s=await get();
if(s.match.phase!=="Team talk")throw Error(`Expected Team talk, got ${s.match.phase}`);
s=await post({action:"team-talk",tone:"Demanding"});
if(s.match.phase!=="Live"||s.match.teamTalk?.tone!=="Demanding")throw Error("Team talk did not start match");
const positionsBefore=JSON.stringify(s.match.playerPositions);
s=await post({action:"tick"});
if(s.match.minute!==5||s.match.momentum.length<2||JSON.stringify(s.match.playerPositions)===positionsBefore)throw Error("Live tick did not advance pitch state");
let ticks=0;while(ticks<40&&s.match.phase!=="Post-match"){if(s.match.phase==="Live"){s=await post({action:"tick"});ticks++;continue}if(s.match.phase==="Interruption"){const option=s.match.interruption?.options[0];s=await post({action:"resolve",option});continue}if(s.match.phase==="Half-time"){s=await post({action:"team-talk",tone:"Balanced"});continue}throw Error(`Unexpected blocking phase ${s.match.phase}`)}
if(s.match.phase!=="Post-match")throw Error(`Expected post-match, got ${s.match.phase}`);
console.log(JSON.stringify({initialPhase:"Team talk",teamTalk:"Demanding",minute:s.match.minute,phase:s.match.phase,momentumPoints:s.match.momentum.length,events:s.match.events.length,ball:s.match.ball,hasInterruption:Boolean(s.match.interruption),lastAction:s.match.lastAction},null,2));
