// Source-owned message transport shared by the four LilScript workers.
export function installWorker(handle) {
 self.onmessage=(e)=>{
  const msg=e.data||{};
  const method=String(msg.method||msg.type||'ping');
  const uri=String(msg.uri||'');
  const value=String(msg.value||msg.prefix||'');
  let res='pong';
  try {res=handle(method,uri,value)}
  catch(err){self.postMessage({id:msg.id??msg.req,err:String(err)});return}
  self.postMessage({id:msg.id??msg.req,res});
 };
}
