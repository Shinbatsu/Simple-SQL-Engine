flat=function*(a,_=0){if(_-a.length)for(let x of a[_])for(let y of[...flat(a,_+1)])yield [x,...y];else yield``}
comb=function*(a,stack,_=0){yield(_?_:``)==stack.length?a:[...a.reduce((a,b)=>{if(!a.has(t=stack[_](b)))a.set(t,[]);a.get(t).push(b);return a},new Map()).entries()].map(([key,value])=>[key,...comb(value,stack,_+1)])}
with(Array)query=function(thrower=function(){throw new Error('Duplicate '+thrower.caller.name.toUpperCase``)}) {
    let sql,rO,rS,rG,rW=[],rH=[]
    let handler={
        select:(F=x=>x)=>rS?thrower():(rS=F)&&handler,
        from:(...D)=>sql?thrower():(sql=of(...D.length-1?flat(D):D[0]))&&handler,
        where:(...S)=>rW.push(S)&&handler,
        orderBy:F=>rO?thrower():(rO=F)&&handler,
        groupBy:(...S)=>rG?thrower():(rG=S)&&handler,
        having:(...S)=>(rH=of(...rH,S))&&handler,
        execute:(f=(a,s)=>a.filter(r=>s.some(f=>f(r))))=>{
            let res=rH.reduce(f,comb(rW.reduce(f,sql),rG?rG:[]).next``.value);
            if(rS&&res)res=res.map(rS);
            return sql?rO?res.sort(rO):res:[]}}
  return handler;}