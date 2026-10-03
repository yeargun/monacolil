let A=(a,b,c)=>{let d=b,e=c;b<0&&(d=0);e>a.length&&(e=a.length);return d>=e?u():Zh(a,d,e)},Hd=(a,b)=>$h(a,nd("\\r\\n|\\r|\\n","g"),b),Ka=(a,b,c)=>{a.lineNumber=b;a.column=c},_a=a=>{if(!a)return{lineNumber:1,column:1};let b=a.lineNumber|0,c=a.column|0;return{lineNumber:b<1?1:b,column:c<1?1:c}},ab=(a,b,c,d,e)=>{b>d||b==d&&c>e?(a.startLineNumber=d,a.startColumn=e,a.endLineNumber=b,a.endColumn=c):(a.startLineNumber=b,a.startColumn=c,a.endLineNumber=d,a.endColumn=e)},_=(a,b,c,d)=>{let e={startLineNumber:0,startColumn:0,endLineNumber:0,endColumn:0};ab(e,a,b,c,d);return e},Xg=a=>{if(!a){let a={startLineNumber:0,startColumn:0,endLineNumber:0,endColumn:0};ab(a,1,1,1,1);return a}let b=a.startLineNumber|0,c=a.startColumn|0,d=a.endLineNumber|0,e=a.endColumn|0,f={startLineNumber:0,startColumn:0,endLineNumber:0,endColumn:0};ab(f,b,c,d,e);return f};function X(a){return{line:a[0],column:a[1]}}function _h(a){return{bufferIndex:a[0],start:X(a[1]),end:X(a[2]),lineFeedCnt:a[3],length:a[4]}}let pc=(a,b,c)=>{a.piece=_h(b);a.color=c;a.alive=!0;a.parent=a;a.left=a;a.right=a},Id=a=>{let b=a;for(;b.left!==n;b=b.left){}return b},Fb=a=>{if(a.right!==n)return Id(a.right);let b=a,c=0;for(;b.parent!==n&&c<1e5;b=b.parent){++c;if(b.parent.left===b)break}return b.parent===n||c>=1e5?n:b.parent};function lb(a){return[a.line,a.column]}function r(a){return[a.bufferIndex,lb(a.start),lb(a.end),a.lineFeedCnt,a.length]}let Jd=a=>a===n?0:(a.size_left+r(a.piece)[4]|0)+Jd(a.right)|0,Kd=a=>a===n?0:(a.lf_left+r(a.piece)[3]|0)+Kd(a.right)|0,La=a=>{let b=[0],c=a.length;for(let d=0;d<c;++d){let e=a.charCodeAt(d)|0;e==qc?d+1<c&&(a.charCodeAt(d+1)|0)==Md?(b.push(d+2),++d):b.push(d+1):e==Md&&b.push(d+1)}return b},Yg=(a,b,c,d)=>{if(c.buffer.length==0)return b;let e=c.lineStarts;e.length==0&&(e=La(c.buffer),c.lineStarts=e);let g=e[e.length-1],f=[d,[0,0],[e.length-1,c.buffer.length-g|0],e.length-1,c.buffer.length];a.buffers.push(c);return b===n?oa(a,n,f):oa(a,b,f)},Nd=(a,b)=>{a!==n&&(a.parent=b)},Od=(a,b)=>{let c=b.right,d=c.left,e=b.parent;c.size_left=c.size_left+(b.size_left+r(b.piece)[4]|0)|0;c.lf_left=c.lf_left+(b.lf_left+r(b.piece)[3]|0)|0;b.right=d;Nd(d,b);c.parent=e;e===n?a.root=c:e.left===b?e.left=c:e.right=c;c.left=b;b.parent=c},Pd=(a,b)=>{let c=b.left,d=c.right,e=b.parent;b.left=d;Nd(d,b);c.parent=e;b.size_left=b.size_left-(c.size_left+r(c.piece)[4]|0)|0;b.lf_left=b.lf_left-(c.lf_left+r(c.piece)[3]|0)|0;e===n?a.root=c:b===e.right?e.right=c:e.left=c;c.right=b;b.parent=c},Qd=(a,b,c,d)=>{let e=b.parent;e.left===b&&(e.size_left=e.size_left+c|0,e.lf_left=e.lf_left+d|0)},Gb=(a,b,c,d)=>{let e=b;for(;e!==a.root&&e!==n;e=e.parent)Qd(a,e,c,d)},Rd=(a,b)=>{((a,b)=>{let c=b;if(c!==a.root){for(;c!==a.root&&c===c.parent.right;c=c.parent){}if(c===a.root)return;c=c.parent;let b=Jd(c.left)-c.size_left|0,d=Kd(c.left)-c.lf_left|0,e=c;e.size_left=e.size_left+b|0;let f=c;f.lf_left=f.lf_left+d|0;for(;c!==a.root&&(b!=0||d!=0);c=c.parent)Qd(a,c,b,d)}})(a,b);let c=b;while(c!==a.root&&c.parent.color==1)if(c.parent===c.parent.parent.left){let b=c.parent.parent.right;b.color==1?(c.parent.color=0,b.color=0,c.parent.parent.color=1,c=c.parent.parent):(c===c.parent.right&&(c=c.parent,Od(a,c)),c.parent.color=0,c.parent.parent.color=1,Pd(a,c.parent.parent))}else{let b=c.parent.parent.left;b.color==1?(c.parent.color=0,b.color=0,c.parent.parent.color=1,c=c.parent.parent):(c===c.parent.left&&(c=c.parent,Pd(a,c)),c.parent.color=0,c.parent.parent.color=1,Od(a,c.parent.parent))}a.root.color=0},Sd=(a,b)=>{ai(a,b,n)},oa=(a,b,c)=>{let e={parent:null,left:null,right:null,color:0,piece:null,size_left:0,lf_left:0,alive:!1};pc(e,c,1);e.left=n;e.right=n;e.parent=n;e.size_left=0;e.lf_left=0;if(a.root===n){a.root=e;e.color=0}else if(b.right===n){b.right=e;e.parent=b}else{let a=Id(b.right);a.left=e;e.parent=a}Rd(a,e);return e},rc=(a,b,c)=>{let e={parent:null,left:null,right:null,color:0,piece:null,size_left:0,lf_left:0,alive:!1};pc(e,c,1);e.left=n;e.right=n;e.parent=n;e.size_left=0;e.lf_left=0;if(a.root===n){a.root=e;e.color=0}else if(b.left===n){b.left=e;e.parent=b}else{let c=b.left;for(;c.right!==n;c=c.right){}let d=c;d.right=e;e.parent=d}Rd(a,e);return e},wa=a=>{let b=a.root,c=1,d=0;for(;b!==n;b=b.right){c=c+(b.lf_left+r(b.piece)[3]|0)|0;d=d+(b.size_left+r(b.piece)[4]|0)|0}a.lineCnt=c;a.length=d;Hb(a,a.length)},Hb=(a,b)=>{a.cacheValid&&(a.cacheNode.alive==!1||a.cacheNodeStartOffset>=b)&&(a.cacheValid=!1)},O=(a,b,c)=>a.buffers[b].lineStarts[c[0]]+c[1]|0,xa=(a,b,c,d)=>{let e,f,g,h;return d[1]==0?d[0]-c[0]|0:(e=a.buffers[b].lineStarts,d[0]==e.length-1?d[0]-c[0]|0:(f=e[d[0]+1|0],g=e[d[0]]+d[1]|0,f>(g+1|0)?d[0]-c[0]|0:(h=g-1|0,(a.buffers[b].buffer.charCodeAt(h)|0)==qc?(d[0]-c[0]|0)+1|0:d[0]-c[0]|0)))},bb=(a,b,c)=>{let d=r(b.piece),j=a.buffers[d[0]].lineStarts,k=(j[d[1][0]]+d[1][1]|0)+c|0,e=d[1][0],f=d[2][0],g=e,h=0,i=0;while(e<=f){g=e+((f-e|0)/2|0)|0;h=j[g];i=g==j.length-1?a.buffers[d[0]].buffer.length:j[g+1|0];if(k<h)f=g-1|0;else if(k>=i)e=g+1|0;else break}return[g,k-h|0]},Ma=(a,b,c)=>bi(a,b,c,n),Td=a=>{let b=mb(a,0),c=mb(a,1),d=nb(a,0),e=nb(a,1);if(b===c){let c=O(a,r(b.piece)[0],r(b.piece)[1]);return A(a.buffers[r(b.piece)[0]].buffer,c+d|0,c+e|0)}let f=b,g=O(a,r(f.piece)[0],r(f.piece)[1]),h=A(a.buffers[r(f.piece)[0]].buffer,g+d|0,g+r(f.piece)[4]|0);f=Fb(f);let i=0;for(;f!==n&&i<1e5;++i){let b=O(a,r(f.piece)[0],r(f.piece)[1]);if(f===c){h=Q(h,A(a.buffers[r(f.piece)[0]].buffer,b,b+e|0));break}h=Q(h,A(a.buffers[r(f.piece)[0]].buffer,b,b+r(f.piece)[4]|0));f=Fb(f)}return h},sc=(a,b)=>b===n?u():Q(Q(sc(a,b.left),((a,b)=>{if(b===n)return u();let c=r(b.piece),d=O(a,c[0],c[1]),e=O(a,c[0],c[2]);return A(a.buffers[c[0]].buffer,d,e)})(a,b)),sc(a,b.right)),Ud=(a,b)=>a.lastVisitedLineNumber==b?a.lastVisitedLineValue:(a.lastVisitedLineNumber=b,a.lastVisitedLineValue=b==a.lineCnt?tc(a,b,0):a.eolNormalized?tc(a,b,a.eolLength):Hd(tc(a,b,0),u()),a.lastVisitedLineValue),tc=(a,b,c)=>{let d=Ma(a,b,1),e=0;e=b==a.lineCnt?a.length:Ma(a,b+1|0,1)-c|0;e<d&&(e=d);ob(a,d,n,0);ob(a,e,n,1);return Td(a)},Ib=(a,b)=>{if(b.length>na){let c=[],d=b;while(d.length>na){let b=d.charCodeAt(na-1|0)|0,e="";b==qc||b>=55296&&b<=56319?(e=A(d,0,na-1|0),d=A(d,na-1|0,d.length)):(e=A(d,0,na),d=A(d,na,d.length));let f=La(e);c.push([a.buffers.length,[0,0],[f.length-1,e.length-f[f.length-1]|0],f.length-1,e.length]);Af(a,e,f)}let e=La(d);c.push([a.buffers.length,[0,0],[e.length-1,d.length-e[e.length-1]|0],e.length-1,d.length]);Af(a,d,e);return c}let g=a.buffers[0].buffer.length,c=La(b),d=lb(a.lastChangeBufferPos);if(g!=0){for(let a=0;a<c.length;++a){let b=a;c[b]=c[b]+g|0}}a.buffers[0].lineStarts=a.buffers[0].lineStarts.concat(c.slice(1));a.buffers[0].buffer=Q(a.buffers[0].buffer,b);let h=a.buffers[0].buffer.length,i=a.buffers[0].lineStarts.length-1,e=[i,h-a.buffers[0].lineStarts[i]|0],f=[0,d,e,xa(a,0,d,e),h-g];a.lastChangeBufferPos=X(e);return[f]},uc=(a,b,c)=>{let d=r(b.piece),h=d[3],e=O(a,d[0],d[2]),f=O(a,d[0],c),g=xa(a,d[0],d[1],c),i=g-h|0,j=f-e|0;b.piece={bufferIndex:d[0],start:X(d[1]),end:X(c),lineFeedCnt:g,length:d[4]+j|0};Gb(a,b,j,i)},Vd=(a,b,c)=>{let d=r(b.piece),h=d[3],e=O(a,d[0],d[1]),f=xa(a,d[0],c,d[2]),g=O(a,d[0],c),i=f-h|0,j=e-g|0;b.piece={bufferIndex:d[0],start:X(c),end:X(d[2]),lineFeedCnt:f,length:d[4]+j|0};Gb(a,b,j,i)},Zg=(a,b,c)=>{a.lastVisitedLineNumber=0;a.lastVisitedLineValue=u();if(a.root!==n){ob(a,b,n,0);let d=mb(a,0),e=nb(a,0),f=Bf(a,0),g=r(d.piece);if(r(d.piece)[0]==0&&g[2][0]==lb(a.lastChangeBufferPos)[0]&&g[2][1]==lb(a.lastChangeBufferPos)[1]&&(f+g[4]|0)==b&&c.length<na){let g=a.buffers[0].buffer.length;a.buffers[0].buffer=Q(a.buffers[0].buffer,c);let b=La(c);for(let a=0;a<b.length;++a){let c=a;b[c]=b[c]+g|0}a.buffers[0].lineStarts=a.buffers[0].lineStarts.concat(b.slice(1));let h=a.buffers[0].lineStarts.length-1,e=[h,a.buffers[0].buffer.length-a.buffers[0].lineStarts[h]|0],i=r(d.piece)[4]+c.length|0,j=r(d.piece)[3],f=xa(a,0,r(d.piece)[1],e);d.piece={bufferIndex:r(d.piece)[0],start:X(r(d.piece)[1]),end:X(e),lineFeedCnt:f,length:i};a.lastChangeBufferPos=X(e);Gb(a,d,c.length,f-j|0);wa(a);return}if(f==b){let e=Ib(a,c),f=rc(a,d,e[e.length-1]),g=e.length-2;for(;g>=0;--g)f=rc(a,f,e[g]);Hb(a,b)}else if((f+r(d.piece)[4]|0)>b){let b=bb(a,d,e),f=[g[0],b,g[2],xa(a,g[0],b,g[2]),O(a,g[0],g[2])-O(a,g[0],b)|0];uc(a,d,b);let h=Ib(a,c);f[4]>0&&oa(a,d,f);let i=d;for(let b=0;b<h.length;++b)i=oa(a,i,h[b])}else{let b=Ib(a,c),e=oa(a,d,b[0]);for(let c=1;c<b.length;++c)e=oa(a,e,b[c])}}else{let b=Ib(a,c),d=rc(a,n,b[0]);for(let c=1;c<b.length;++c)d=oa(a,d,b[c])}wa(a)},$g=(a,b,c)=>{a.lastVisitedLineNumber=0;a.lastVisitedLineValue=u();if(c<=0||a.root===n)return;ob(a,b,n,0);ob(a,b+c|0,n,1);let d=mb(a,0),e=mb(a,1),f=nb(a,0),g=nb(a,1),h=Bf(a,0);if(d===e){let e=bb(a,d,f),i=bb(a,d,g);if(h==b){if(c==r(d.piece)[4]){Sd(a,d);wa(a);return}Vd(a,d,i);Hb(a,b);wa(a);return}if((h+r(d.piece)[4]|0)==(b+c|0)){uc(a,d,e);wa(a);return}let j=r(d.piece),k=j[1],l=j[2],o=j[4],p=j[3],m=xa(a,j[0],j[1],e),q=O(a,j[0],e)-O(a,j[0],k)|0;d.piece={bufferIndex:j[0],start:X(j[1]),end:X(e),lineFeedCnt:m,length:q};Gb(a,d,q-o|0,m-p|0);oa(a,d,[j[0],i,l,xa(a,j[0],i,l),O(a,j[0],l)-O(a,j[0],i)|0])}else{let c=[];uc(a,d,bb(a,d,f));Hb(a,b);r(d.piece)[4]==0&&c.push(d);Vd(a,e,bb(a,e,g));r(e.piece)[4]==0&&c.push(e);let h=Fb(d);for(;h!==n&&h!==e;h=Fb(h))c.push(h);for(let b=0;b<c.length;++b)Sd(a,c[b])}wa(a)},_g=(a,b,c,d,e,f)=>{let g=[];if(b.length==0||f<=0)return g;let h="g";!d&&(h="gi");let i=b;if(!c){let a=u(),c=0;for(;c<b.length;++c){let d=b.charAt(c);a=d=="\\"||d=="^"||d=="$"||d=="."||d=="|"||d=="?"||d=="*"||d=="+"||d=="("||d==")"||d=="["||d=="]"||d=="{"||d=="}"?Q(Q(a,"\\"),d):Q(a,d)}i=a}e&&(i=Q(Q("\\b(?:",i),")\\b"));let j=nd(i,h),k=a.lineCnt,l=1,m=f*3|0;for(;l<=k&&g.length<m;l=l+1|0){let b=Ud(a,l),c=Cf(j,b);for(;c&&g.length<m;c=Cf(j,b)){let a=c.index|0,b=c[0]+"";g.push(l);g.push(a+1|0);g.push((a+b.length|0)+1|0)}}return g},Jb=(a,b,c)=>Ma(a.tree,b,c),Xd=(a,b)=>{let d,c=a.tree;return ci((d=n,c),b,d)},Yd=a=>{let b=a.tree;return sc(b,b.root)},Wd=l=>{let m=Hd(l,I),v=[{buffer:m,lineStarts:La(m)}],w={root:null,buffers:[],lineCnt:0,length:0,eol:"",eolLength:0,eolNormalized:!1,lastChangeBufferPos:null,cacheNode:null,cacheNodeStartOffset:0,cacheNodeStartLineNumber:0,cacheHasLine:!1,cacheValid:!1,lastVisitedLineNumber:0,lastVisitedLineValue:"",posNode:null,posRemainder:0,posStart:0,walkLine:0,walkCol:0,tmpBuffer:null},c=I,d=!0;w.root=n;w.buffers=[];w.lineCnt=1;w.length=0;w.eol=c;w.eolLength=1;w.eolNormalized=d;w.lastChangeBufferPos={line:0,column:0};w.cacheNode=n;w.cacheNodeStartOffset=0;w.cacheNodeStartLineNumber=0;w.cacheHasLine=!1;w.cacheValid=!1;w.lastVisitedLineNumber=0;w.lastVisitedLineValue=u();w.posNode=n;w.posRemainder=0;w.posStart=0;w.walkLine=1;w.walkCol=1;w.tmpBuffer={buffer:u(),lineStarts:[0]};w.buffers=[{buffer:u(),lineStarts:[0]}];w.lastChangeBufferPos={line:0,column:0};w.root=n;w.lineCnt=1;w.length=0;w.eol=c;w.eolLength=1;w.eolNormalized=d;let e=n;for(let a=0;a<v.length;++a)e=Yg(w,e,v[a],a+1);w.cacheValid=!1;w.lastVisitedLineNumber=0;w.lastVisitedLineValue=u();wa(w);return{tree:w,bom:u(),mightContainRTLFlag:!1,mightContainUnusualLineTerminatorsFlag:!1,mightContainNonBasicASCII:!1}},$d=(a,b,c,d,e,f)=>{a.scheme=b;a.authority=c;a.path=d;a.query=e;a.fragment=f},cb=a=>{let b=a.scheme+":";(a.authority.length>0||a.scheme==Cd||a.scheme==Kg)&&(b=b+h+a.authority);b+=a.path;a.query.length>0&&(b=b+"?"+a.query);a.fragment.length>0&&(b=b+x+a.fragment);return b},Zd=a=>{let b=a.indexOf(":"),c=Cd,d=a;b>=0&&(c=A(a,0,b),d=A(a,b+1|0,a.length));let e=(a=>{let b=["",a];if(!a.startsWith(h))return b;let c=A(a,2,a.length),d=c.indexOf("/");return d<0?(b[0]=c,b[1]="",b):(b[0]=A(c,0,d),b[1]=A(c,d,c.length),b)})(d),n=e[1],f="",g="",i=n,j=i.indexOf(x);j>=0&&(f=A(i,j+1|0,i.length),i=A(i,0,j));let k=i.indexOf("?");k>=0&&(g=A(i,k+1|0,i.length),i=A(i,0,k));let m=[i,g,f];return{scheme:c,authority:e[0],path:m[0],query:m[1],fragment:m[2]}},ya=(a,b)=>{a.listeners.push(b);return()=>{let c=a.listeners.indexOf(b);c>=0&&a.listeners.splice(c,1)}},S=a=>{let b=a.listeners.slice(),c=0;for(;c<b.length;++c)b[c]()},wc=a=>{a.disposed=!0;a.listeners=[]},be=(a,b)=>{a.deco=b;a.maxEndLine=b.range.endLineNumber;a.maxEndColumn=b.range.endColumn;a.alive=!0;a.parent=a;a.left=a;a.right=a},_d=(a,b)=>a.startLineNumber!=b.startLineNumber?a.startLineNumber<b.startLineNumber:a.startColumn!=b.startColumn?a.startColumn<b.startColumn:a.endLineNumber!=b.endLineNumber?a.endLineNumber<b.endLineNumber:a.endColumn<b.endColumn,Kb=(a,b)=>{a!==y&&(a.parent=b)},xc=(a,b)=>{let c=b.right,d=c.left,e=b.parent;b.right=d;Kb(d,b);c.parent=e;e===y?a.root=c:e.left===b?e.left=c:e.right=c;c.left=b;b.parent=c;db(a,b);db(a,c)},yc=(a,b)=>{let c=b.left,d=c.right,e=b.parent;b.left=d;Kb(d,b);c.parent=e;e===y?a.root=c:e.right===b?e.right=c:e.left=c;c.right=b;b.parent=c;db(a,b);db(a,c)},ah=(a,b)=>{let c=b.parent.parent.right;if(c.color==1){c.color=0;b.parent.color=0;b.parent.parent.color=1;return b.parent.parent}b===b.parent.right&&(b=b.parent,xc(a,b));b.parent.color=0;b.parent.parent.color=1;yc(a,b.parent.parent);return b},bh=(a,b)=>{let c=b.parent.parent.left;if(c.color==1){c.color=0;b.parent.color=0;b.parent.parent.color=1;return b.parent.parent}b===b.parent.left&&(b=b.parent,yc(a,b));b.parent.color=0;b.parent.parent.color=1;xc(a,b.parent.parent);return b},ae=(a,b)=>{let c=b;for(;c!==y;c=c.parent)db(a,c)},ch=(a,b,c,d,e)=>{let m=a.nextId;a.nextId=m+1|0;let n={id:m,range:b,className:c,hoverMessage:d,isWholeLine:e,metadata:0},o={parent:null,left:null,right:null,color:0,deco:null,maxEndLine:0,maxEndColumn:0,alive:!1};be(o,n);o.color=1;o.left=y;o.right=y;o.parent=y;if(a.root===y){a.root=o;o.color=0;return n}let h=a.root,i=y;for(;h!==y;h=_d(b,h.deco.range)?h.left:h.right)i=h;let j=i;o.parent=j;_d(b,j.deco.range)?j.left=o:j.right=o;ae(a,o);let l=o;while(l.parent.color==1){l=l.parent===l.parent.parent.left?ah(a,l):bh(a,l);if(l===a.root)break}a.root.color=0;return n},db=(a,b)=>{let c=b.deco.range.endLineNumber,d=b.deco.range.endColumn;b.left!==y&&((b.left.maxEndLine>c||b.left.maxEndLine==c&&b.left.maxEndColumn>d)&&(c=b.left.maxEndLine,d=b.left.maxEndColumn));b.right!==y&&((b.right.maxEndLine>c||b.right.maxEndLine==c&&b.right.maxEndColumn>d)&&(c=b.right.maxEndLine,d=b.right.maxEndColumn));b.maxEndLine=c;b.maxEndColumn=d},zc=(a,b)=>{xc(a,b)},Ac=(a,b)=>{yc(a,b)},Bc=(a,b,c)=>{if(b===y)return y;if(b.deco.id==c)return b;let d=Bc(a,b.left,c);return d!==y?d:Bc(a,b.right,c)},Lb=(a,b,c)=>{let d=b.parent;d===y?a.root=c:d.left===b?d.left=c:d.right=c;c.parent=d},dh=(a,b)=>{let c=b.parent,d=c.right;d.color==1&&(d.color=0,c.color=1,zc(a,c),c=b.parent,d=c.right);let f=d.left,e=d.right;if(f.color==0&&e.color==0){d.color=1;return c}e.color==0&&(f.color=0,d.color=1,Ac(a,d),c=b.parent,d=c.right,e=d.right);d.color=c.color;c.color=0;e.color=0;zc(a,c);return a.root},eh=(a,b)=>{let c=b.parent,d=c.left;d.color==1&&(d.color=0,c.color=1,Ac(a,c),c=b.parent,d=c.left);let e=d.left,f=d.right;if(f.color==0&&e.color==0){d.color=1;return c}e.color==0&&(f.color=0,d.color=1,zc(a,d),c=b.parent,d=c.left,e=d.left);d.color=c.color;c.color=0;e.color=0;Ac(a,c);return a.root},fh=(a,b,c,d)=>{a.range=b;a.text=c;a.identifier=d},Cc=a=>{a.versionId=a.versionId+1|0;a.alternativeVersionId=a.alternativeVersionId+1|0},gh=a=>{if(a.past.length==0)return null;let b=a.past[a.past.length-1];a.past.splice(a.past.length-1,1);Cc(a);return b},hh=a=>{if(a.future.length==0)return null;let b=a.future[a.future.length-1];a.future.splice(a.future.length-1,1);Cc(a);return b},ih=(a,b,c)=>{a.range=b;a.matches=c},Dc=a=>{if(a.length==0)return!1;let b=a.charCodeAt(0)|0;return b>=48&&b<=57||(b>=65&&b<=90||(b>=97&&b<=122||(a=="_"||a=="$")))},pa=a=>{let c=a.length,b=0;for(;b<c;++b){let c=a.charAt(b);if(c!=i&&c!=Eb)return b}return c},P=(a,b)=>{let c=b-1|0;c<0&&(c=0);let f=a.length;c>f&&(c=f);let g=c,d=0;for(;g>d;++d)if(!Dc(a.charAt(g-d-1)))break;let m=g-d,h=c,e=0,n=a.length;for(;(h+e|0)<n;e=e+1|0)if(!Dc(a.charAt(h+e|0)))break;let o=h+e|0;return{word:A(a,m,o),startColumn:m+1,endColumn:o+1|0}},fe=(a,b,c,d)=>{a.buffer=Wd(b);a.languageId=c;a.uri=d;a.stack={past:[],future:[],versionId:1,alternativeVersionId:1};a.decorations={root:y,nextId:1,deleteWasY:y,deleteWasX:y,deleteWasRed:!1};a.contentEmitter={listeners:[],disposed:!1};a.versionId=1},Na=a=>Yd(a.buffer),Mb=(a,b)=>{a.buffer=Wd(b);a.versionId=a.versionId+1|0;S(a.contentEmitter)},F=a=>a.buffer.tree.lineCnt,fb=a=>a.buffer.tree.length,t=(a,b)=>Ud(a.buffer.tree,b),C=(a,b)=>{let c=a.buffer.tree;return b==c.lineCnt?c.length-Ma(c,b,1)|0:(Ma(c,b+1|0,1)-Ma(c,b,1)|0)-c.eolLength|0},ge=(a,b)=>{let d,e,c=a.buffer;return Jb((d=b.lineNumber,e=b.column,c),d,e)},aa=(a,b,c)=>Jb(a.buffer,b,c),T=(a,b)=>Xd(a.buffer,b),Ec=(a,b)=>{let d,c=a.buffer;return b.startLineNumber==b.endLineNumber&&b.startColumn==b.endColumn?u():(d=c.tree,b.startLineNumber==b.endLineNumber&&b.startColumn==b.endColumn?u():(zf(d,b.startLineNumber,b.startColumn,n,0),zf(d,b.endLineNumber,b.endColumn,n,1),Td(d)))},p=(a,b,c)=>{let d=[];for(let a=0;a<b.length;++a)d.push(b[a]);let e=0;for(;e<d.length;++e){let a=e+1;for(;a<d.length;++a){let b=d[e],c=d[a],f=b.range.startLineNumber,g=b.range.startColumn,h=c.range.startLineNumber,i=c.range.startColumn;(h>f||h==f&&i>g)&&(d[e]=c,d[a]=b)}}let f=[],g=0;for(;g<d.length;++g){let m,n,p,q,r,t,v,w,x,y,j=d[g],k=j.range,b=Q(u(),j.text),l=a.buffer,c=Jb((m=k.startLineNumber,n=k.startColumn,l),m,n),o=a.buffer,e=Jb((p=k.endLineNumber,q=k.endColumn,o),p,q),h=A((r=a.buffer,Yd(r)),c,e);if(e>c){let b=a.buffer,d=e-c|0;$g(b.tree,c,d)}b.length>0&&Zg(a.buffer.tree,c,b);let s=a.buffer,i=Xd((t=c+b.length|0,s),t);f.push((v=_(k.startLineNumber,k.startColumn,i.lineNumber,i.column),w=Q(u(),h),x=j.identifier,y={range:null,text:"",identifier:0},fh(y,v,w,x),y))}a.versionId=a.versionId+1|0;if(c){let b=a.stack;b.past.push(f);b.future=[];Cc(b)}S(a.contentEmitter);return f},kh=a=>{let b=gh(a.stack);if(!b)return!1;let c=p(a,b,!1);a.stack.future.push(c);return!0},lh=a=>{let b=hh(a.stack);if(!b)return!1;let c=p(a,b,!1);a.stack.past.push(c);return!0},Fc=(a,b,c,d,e,f)=>{let k=a.buffer.tree,g=[],h=_g(k,b,c,d,e,f),i=0;for(;(i+2|0)<h.length;i=i+3|0){let a,b,c;g.push((a=_(h[i],h[i+1|0],h[i],h[i+2|0]),b=[],c={range:null,matches:[]},ih(c,a,b),c))}return g},he=(a,b)=>P(t(a,b.lineNumber),b.column),ie=(a,b)=>ya(a.contentEmitter,b),ee=(d,e)=>{let a=vc;vc=vc+1|0;let g={scheme:Kg,authority:"",path:"/model/"+a.toString(),query:"",fragment:""},h={buffer:null,uri:null,languageId:"",stack:null,decorations:null,contentEmitter:null,versionId:0,decoScratchIdx:0};fe(h,d,e,g);eb.push(h);return h},jh=(a,b,c)=>{let e={buffer:null,uri:null,languageId:"",stack:null,decorations:null,contentEmitter:null,versionId:0,decoScratchIdx:0};fe(e,a,b,c);eb.push(e);return e},s=(a,b,c,d,e)=>({range:_(a,b,c,d),text:Q(u(),e),identifier:0}),Gc=(a,b,c,d,e)=>{let g={startLineNumber:0,startColumn:0,endLineNumber:0,endColumn:0};ab(g,b,c,d,e);a.startLineNumber=g.startLineNumber;a.startColumn=g.startColumn;a.endLineNumber=g.endLineNumber;a.endColumn=g.endColumn;a.selectionStartLineNumber=b;a.selectionStartColumn=c;a.positionLineNumber=d;a.positionColumn=e},ha=(a,b,c,d)=>{let e={startLineNumber:0,startColumn:0,endLineNumber:0,endColumn:0,selectionStartLineNumber:0,selectionStartColumn:0,positionLineNumber:0,positionColumn:0};Gc(e,a,b,c,d);return e},mh=a=>{if(!a){let a={startLineNumber:0,startColumn:0,endLineNumber:0,endColumn:0,selectionStartLineNumber:0,selectionStartColumn:0,positionLineNumber:0,positionColumn:0};Gc(a,1,1,1,1);return a}let b=a.selectionStartLineNumber|0,c=a.selectionStartColumn|0,d=a.positionLineNumber|0,e=a.positionColumn|0;b<1&&(b=a.startLineNumber|0,c=a.startColumn|0,d=a.endLineNumber|0,e=a.endColumn|0);let j={startLineNumber:0,startColumn:0,endLineNumber:0,endColumn:0,selectionStartLineNumber:0,selectionStartColumn:0,positionLineNumber:0,positionColumn:0};Gc(j,b,c,d,e);return j},je=(a,b)=>a.stateNames.indexOf(b),J=(a,b)=>{!(je(a,b)>=0)&&(a.stateNames.push(b),a.stateRules.push([]))},za=()=>"["+i+"\\t\\r\\n]+",Hc=()=>ua+va+".bracket",a=(a,b,c,d,e,f,g)=>{let j,k;J(a,b);let h=je(a,b),i=c;(c.length==0||c.charAt(0)!="^")&&(i="^(?:"+c+")");a.stateRules[h].push((j=nd(i,""),k={pattern:null,lineStart:!1,kind:0,token:"",next:""},((a,b,c,d,e,f)=>{a.pattern=b;a.lineStart=c;a.kind=d;a.token=e;a.next=f})(k,j,g,d,e,f),k))},Aa=(a,b,c,d)=>{let f={languageId:a,tokenPostfix:b,defaultToken:c,keywords:d,stateNames:[],stateRules:[],maxStack:100};J(f,m);return f},Ic=()=>{let c=Aa(sg,".js","source","break case catch class continue const constructor debugger default delete do else export extends false finally for from function get if import in instanceof let new null return set static super switch symbol this throw true try typeof undefined var void while with yield async await of type interface enum implements package private protected public readonly namespace abstract as asserts keyof infer never unknown any boolean number string unique".split(i));a(c,m,za(),0,"","",!1);a(c,m,"//.*",0,q,"",!1);a(c,m,Dd,1,q,q,!1);a(c,m,$,1,l,l,!1);a(c,m,R,1,l,U,!1);a(c,m,"`",1,l,wb,!1);a(c,m,"0[xX][0-9a-fA-F]+",0,ta,"",!1);a(c,m,"\\d+\\.\\d+([eE][+\\-]?\\d+)?",0,ta,"",!1);a(c,m,Ed,0,ta,"",!1);a(c,m,"[a-zA-Z_$][\\w$]*",4,ec,"",!1);a(c,m,eg,0,Hc(),"",!1);a(c,m,"[;,.]",0,ua+va,"",!1);a(c,m,"[+\\-*/%&|^~<>=!?:]+",0,ua+va,"",!1);J(c,q);a(c,q,Fd,2,q,"",!1);a(c,q,zd,0,q,"",!1);a(c,q,"\\*",0,q,"",!1);J(c,l);a(c,l,Ya,0,Wa,"",!1);a(c,l,$,2,l,"",!1);a(c,l,fc,0,l,"",!1);J(c,U);a(c,U,Ya,0,Wa,"",!1);a(c,U,R,2,l,"",!1);a(c,U,wg,0,l,"",!1);J(c,wb);a(c,wb,Ya,0,Wa,"",!1);a(c,wb,"`",2,l,"",!1);a(c,wb,"[^\\\\`]+",0,l,"",!1);return c},nh=()=>{let a=Ic();a.languageId=rg;a.tokenPostfix=".ts";return a},oh=()=>{let c=Aa("json",".json","",["true",yb,"null"]);a(c,m,za(),0,"","",!1);a(c,m,"[{}\\[\\]]",0,Hc(),"",!1);a(c,m,"[:,]",0,ua+va,"",!1);a(c,m,"true|false|null",4,xd,"",!1);a(c,m,"-?\\d+(\\.\\d+)?([eE][+\\-]?\\d+)?",0,ta,"",!1);a(c,m,$,1,l,l,!1);J(c,l);a(c,l,Ya,0,Wa,"",!1);a(c,l,$,2,l,"",!1);a(c,l,fc,0,l,"",!1);return c},ph=()=>{let c=Aa("python",".python","","False None True and as assert async await break class continue def del elif else except finally for from global if import in is lambda nonlocal not or pass raise return try while with yield match case".split(i));a(c,m,za(),0,"","",!1);a(c,m,"#.*",0,q,"",!1);a(c,m,dg,1,l,vb,!1);a(c,m,"'''",1,l,ub,!1);a(c,m,$,1,l,l,!1);a(c,m,R,1,l,U,!1);a(c,m,"\\d+\\.\\d+",0,ta,"",!1);a(c,m,Ed,0,ta,"",!1);a(c,m,_f,4,ec,"",!1);a(c,m,eg,0,Hc(),"",!1);a(c,m,"[:;,.=+\\-*/%<>!&|^~]+",0,ua+va,"",!1);J(c,l);a(c,l,Ya,0,Wa,"",!1);a(c,l,$,2,l,"",!1);a(c,l,fc,0,l,"",!1);J(c,U);a(c,U,Ya,0,Wa,"",!1);a(c,U,R,2,l,"",!1);a(c,U,wg,0,l,"",!1);J(c,vb);a(c,vb,dg,2,l,"",!1);a(c,vb,'[^"]+',0,l,"",!1);a(c,vb,$,0,l,"",!1);J(c,ub);a(c,ub,"'''",2,l,"",!1);a(c,ub,Ad,0,l,"",!1);a(c,ub,R,0,l,"",!1);return c},qh=()=>{let c=Aa("html",".html","","html head body div span script style link meta title p a ul ol li table tr td th form input button img h1 h2 h3 h4 h5 h6 section article nav footer header main pre code textarea select option".split(i));a(c,m,za(),0,"","",!1);a(c,m,"<!--",1,q,q,!1);a(c,m,"</?[a-zA-Z][\\w:-]*",1,fa,fa,!1);a(c,m,"[^<]+",0,"","",!1);J(c,q);a(c,q,"-->",2,q,"",!1);a(c,q,"[^-]+",0,q,"",!1);a(c,q,"-",0,q,"",!1);J(c,fa);a(c,fa,"/?>",2,fa,"",!1);a(c,fa,za(),0,"","",!1);a(c,fa,"[a-zA-Z_:][\\w:.-]*",0,"attribute.name","",!1);a(c,fa,"=",0,ua+va,"",!1);a(c,fa,$,1,Va,oc,!1);a(c,fa,R,1,Va,mc,!1);J(c,oc);a(c,oc,$,2,Va,"",!1);a(c,oc,Jg,0,Va,"",!1);J(c,mc);a(c,mc,R,2,Va,"",!1);a(c,mc,Ad,0,Va,"",!1);return c},rh=()=>{let c=Aa("css",".css","","important color background margin padding border display flex grid position top left right bottom width height font text align justify content absolute relative fixed block inline none auto inherit initial".split(i));a(c,m,za(),0,"","",!1);a(c,m,Dd,1,q,q,!1);a(c,m,$,1,l,l,!1);a(c,m,"#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})\\b",0,"number.hex","",!1);a(c,m,"-?\\d+(\\.\\d+)?(px|em|rem|%|vh|vw|pt|ex)?",0,ta,"",!1);a(c,m,"[a-zA-Z_-][\\w-]*",4,ec,"",!1);a(c,m,"[{}();:]",0,ua+va,"",!1);a(c,m,"[.,#>\\[\\]+~*]",0,ua+va,"",!1);J(c,q);a(c,q,Fd,2,q,"",!1);a(c,q,zd,0,q,"",!1);a(c,q,"\\*",0,q,"",!1);J(c,l);a(c,l,$,2,l,"",!1);a(c,l,Jg,0,l,"",!1);return c},sh=()=>{let c=Aa(Ig,".md","",[]);a(c,m,"^#{1,6}[ \\t].*$",0,xd,"",!0);a(c,m,"^\\s*[-*+]\\s+",0,xd,"",!0);a(c,m,"`+",1,l,nc,!1);a(c,m,"\\*\\*[^*]+\\*\\*",0,"strong","",!1);a(c,m,"\\*[^*]+\\*",0,"emphasis","",!1);a(c,m,"\\[[^\\]]+\\]\\([^\\)]+\\)",0,"string.link","",!1);a(c,m,"[^`*\\[#]+",0,"","",!1);a(c,m,".",0,"","",!1);J(c,nc);a(c,nc,"`+",2,l,"",!1);a(c,nc,"[^`]+",0,l,"",!1);return c},c=(a,b,c,d,e,f)=>{a.id=b;a.lexer=c;a.lineComment=d;a.blockCommentStart=e;a.blockCommentEnd=f;a.tokensProvider=k()},b=a=>{let b=0;for(;b<ia.length;++b)if(ia[b].id==a.id){ia[b]=a;return}ia.push(a)},Oa=()=>{let a,f,g,i,j,k,l,m,n,o,p,q,r,s,t,u;!le&&(le=!0,b((a=Ic(),f={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},c(f,sg,a,h,e,d),f)),b((g=nh(),i={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},c(i,rg,g,h,e,d),i)),b((j=oh(),k={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},c(k,"json",j,h,e,d),k)),b((l=ph(),m={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},c(m,"python",l,x,'"""','"""'),m)),b((n=qh(),o={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},c(o,"html",n,"","<!--","-->"),o)),b((p=rh(),q={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},c(q,"css",p,"",e,d),q)),b((r=sh(),s={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},c(s,Ig,r,"","",""),s)),b((t=Ic(),u={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},c(u,tb,t,"","",""),u)))},Ba=a=>{Oa();let b=0;for(;b<ia.length;++b)if(ia[b].id==a)return ia[b];return null},ke=()=>{Oa();let a=[],b=0;for(;b<ia.length;++b)a.push(ia[b].id);return a},vh=(a,b,c)=>{a.startLine=b;a.endLine=c},re=(a,b,c)=>{a.label=b;a.insertText=c;a.kind=18;a.detail=u()},Pa=(a,b,c,d,e)=>Fc(a,b,c,d,e,1e3),Jc=(a,b)=>{let c=Na(a),d=ge(a,b);if(d>=c.length)return null;let e=c.charAt(d),f="([{",g=")]}",h=f.indexOf(e);if(h>=0){let e=1,i=d+1;for(;i<c.length;++i){let d=c.charAt(i);if(d==f.charAt(h))e=e+1|0;else if(d==g.charAt(h)){e=e-1|0;if(e==0){let c=T(a,i);return _(b.lineNumber,b.column,c.lineNumber,c.column+1|0)}}}return null}h=g.indexOf(e);if(h>=0){let e=1,i=d-1|0;for(;i>=0;--i){let d=c.charAt(i);if(d==g.charAt(h))e=e+1|0;else if(d==f.charAt(h)){e=e-1|0;if(e==0){let c=T(a,i);return _(c.lineNumber,c.column,b.lineNumber,b.column+1|0)}}}}return null},Nb=(a,b)=>P(t(a,b.lineNumber),b.column).word,me=(a,b,c,d)=>{if(a.length!=0){if(c.length>=200)return;if(d.indexOf(a)>=0)return;if(b.length==0||a.indexOf(b)==0){let b;c.push((b={label:"",insertText:"",kind:0,detail:""},re(b,a,a),b));d.push(a)}}},ne=a=>{let b=u(),c=0;while(c<a.length){if(a.charAt(c)=="$"&&c+1<a.length){let b=a.charAt(c+1);if(b=="0"||b=="1"||b=="2"||b=="3"){c+=2;continue}if(b=="{"){let b=c+2;for(;b<a.length&&a.charAt(b)!="}";++b){}c=b+1;continue}}b+=a.charAt(c);++c}return b},oe=a=>{let b=u(),c=0,d=0;for(;d<a.length;d=d+1|0){let e=a.charAt(d);if(e=="{"){b=b+e+I;c=c+1|0;let a=0;for(;a<c;a=a+1|0)b+="  "}else{if(e=="}"){c>0&&(c=c-1|0);b+=I;let a=0;for(;a<c;a=a+1|0)b+="  "}b+=e}}return b},pe=(a,b)=>b?th(a):uh(a),th=a=>{let b=u(),c=0;for(;c<a.length;++c){let d=a.charCodeAt(c)|0;b=d>=97&&d<=122?b+qe(d-32):b+a.charAt(c)}return b},uh=a=>{let b=u(),c=0;for(;c<a.length;++c){let d=a.charCodeAt(c)|0;b=d>=65&&d<=90?b+qe(d+32):b+a.charAt(c)}return b},qe=a=>gi(a*1),se=a=>cb(a.uri),te=(a,b,c)=>{let d=[],e=0;for(;e<ja.length&&(c<=0||d.length<c);++e){let c=ja[e],f=a.length==0||c.a==a,g=b.length==0||c.h==b;f&&g&&d.push(c)}return d},ue=a=>te("",se(a),0),wh=(a,b,c)=>{let d=1,e=1,f=1,g=1,h=ve,i="";a&&(a.startLineNumber&&(d=a.startLineNumber|0),a.startColumn&&(e=a.startColumn|0),a.endLineNumber&&(f=a.endLineNumber|0),a.endColumn&&(g=a.endColumn|0),a.severity&&(h=a.severity|0),a.message&&(i=a.message+""));return{a:b,b:i,c:h,d,e,f,g,h:c}},Ca=(a,b,c)=>{Y(b,c);g(b,sa,Xa);g(b,sb,Gd);g(b,Qg,"40");g(b,hc,E);g(b,"max-width","420px");g(b,Sg,"6px 8px");g(b,"border",Yf);g(b,Ia,Rg);g(b,kc,"#cccccc");g(b,wd,"12px");K(a.widgetsHost,b)},Ob=a=>{Y(a.root,ag+a.theme);g(a.root,wd,a.fontSize.toString()+L);a.theme=="vs-dark"||a.theme=="hc-black"?(g(a.root,Ia,"#1e1e1e"),g(a.root,kc,"#d4d4d4"),g(a.cursorEl,Ia,Pg)):(g(a.root,Ia,"#fffffe"),g(a.root,kc,Wg),g(a.cursorEl,Ia,Wg));a.wordWrap?(g(a.linesHost,dc,Gg),Z(a.textarea,Cb,"soft")):(g(a.linesHost,dc,"pre"),Z(a.textarea,Cb,Za))},xe=(a,b)=>{a.theme=b;Ob(a);j(a)},ye=(a,b,c)=>{a.width=b;a.height=c;g(a.root,Ab,b.toString()+L);g(a.root,jc,c.toString()+L);j(a)},Ch=(a,b)=>{let c=0;for(;c<a.folds.length;++c){let d=a.folds[c];if(d.collapsed&&b>d.startLine&&b<=d.endLine)return!0}return!1},ze=(a,b)=>{let c=b,d=F(a.model);for(;c<=d&&Ch(a,c);c=c+1|0){}return c>d?d:c},Lc=(a,b)=>{let c=0;for(;c<a.folds.length;++c)if(a.folds[c].startLine==b)return a.folds[c];return null},Ae=e=>{let a=e.model,b=[],c=F(a),d=1;for(;d<=c;d=d+1|0){let e=t(a,d),f=pa(e);if(f!=e.length){let e=d,g=d+1|0;while(g<=c){let b=t(a,g),c=pa(b);if(c==b.length)g=g+1|0;else{if(c>f){e=g;g=g+1|0;continue}break}}if(e>d){let a,c,f;b.push((a=d,c=e,f={startLine:0,endLine:0,collapsed:!1},vh(f,a,c),f))}}}let g=0;for(;g<b.length;++g){let a=Lc(e,b[g].startLine);a!=null&&(b[g].collapsed=a.collapsed)}e.folds=b},Pb=(a,b)=>{let c=Lc(a,b);c==null&&(Ae(a),c=Lc(a,b));c!=null&&(c.collapsed=!c.collapsed,j(a))},Be=(a,b)=>{Ae(a);let c=0;for(;c<a.folds.length;++c)a.folds[c].collapsed=b;j(a)},j=a=>{let c,d,e,f,g,h,i;Ob(a);let b=ii((c=a.linesHost,d=a.margin,e=a.selectionHost,f=a.cursorEl,g=a.minimapCanvas,h=a.textarea,i=a.model,c),d,e,f,g,h,Na(i),a.languageId,a.lineHeight,a.width,a.height,a.scrollTop,a.showLineNumbers,a.showMinimap,a.theme,a.selection.selectionStartLineNumber,a.selection.selectionStartColumn,a.selection.positionLineNumber,a.selection.positionColumn,a.findQuery,a.wordWrap,a.tabSize);b>0&&(a.charWidth=b)},Ce=a=>{let b=(a.selection.positionLineNumber-1|0)*a.lineHeight|0,c=(a.selection.positionColumn-1|0)*a.charWidth|0;g(a.textarea,$a,b.toString()+L);g(a.textarea,Db,(c+Kc|0).toString()+L);g(a.cursorEl,$a,b.toString()+L);g(a.cursorEl,Db,c.toString()+L);_b(a.textarea,"")},Qb=(a,b,c)=>{let j,d=ji(a.scrollable,a.linesHost,b,c,a.lineHeight,a.charWidth,a.scrollTop),e=1,f=1;d.length>1&&(e=d[0],f=d[1]);e<1&&(e=1);let g=F(a.model);e>g&&(e=g);let i=a.model,k=C((j=e,i),j)+1|0;f<1&&(f=1);f>k&&(f=k);return{lineNumber:e,column:f}},Mc=(a,b)=>{let c=(b-1|0)*a.lineHeight|0,d=a.scrollTop+a.height|0;(c<a.scrollTop||(c+a.lineHeight|0)>d)&&(a.scrollTop=Ah(0,c-(a.height/3|0)|0))},Ah=(a,b)=>a>b?a:b,Rb=a=>{let i,l,b=F(a.model),c=a.selection.positionLineNumber;c<1&&(c=1);c>b&&(c=b);let h=a.model,j=C((i=c,h),i)+1|0,d=a.selection.positionColumn;d<1&&(d=1);d>j&&(d=j);let e=a.selection.selectionStartLineNumber,f=a.selection.selectionStartColumn;e<1&&(e=1);e>b&&(e=b);let k=a.model,m=C((l=e,k),l)+1|0;f<1&&(f=1);f>m&&(f=m);a.selection=ha(e,f,c,d)},w=(a,b,c)=>{a.selection=ha(b,c,b,c);Rb(a);Mc(a,a.selection.positionLineNumber);Ce(a)},z=(a,b,c,d,e)=>{a.selection=ha(b,c,d,e);Rb(a);Mc(a,a.selection.positionLineNumber);Ce(a)},ka=(a,b)=>{let n,f=a.selection,g=f.startLineNumber,h=f.startColumn,c=[s(g,h,f.endLineNumber,f.endColumn,b)];p(a.model,c,!0);let d=aa(a.model,g,h),m=a.model,e=T((n=d+b.length|0,m),n);w(a,e.lineNumber,e.column)},De=a=>{let b=u(),c=0;for(;c<a.length;++c){c!=0&&(b+=I);b+=a[c]}return b},Qa=(a,b)=>{if(!(a.readOnly||b.length==0)){if(b.length==1){let c=b=="("?")":b=="["?"]":b=="{"?"}":b=='"'||b==R?b:"";if(c.length>0){ka(a,b+c);qa(a,b+c);Sb(a,!1);j(a);return}}ka(a,b);qa(a,b);j(a)}},qa=(a,b)=>{let c=a.extraCursors.length;if(c!=0){let d=c-1;for(;d>=0;--d){let l,o,f=a.extraCursors[d],g=f.startLineNumber,h=f.startColumn,i=f.endLineNumber,j=f.endColumn,k=a.model;p((l=[s(g,h,i,j,b)],k),l,!0);let c=aa(a.model,g,h),n=a.model,e=T((o=c+b.length|0,n),o),q=e.lineNumber,r=e.column;a.extraCursors[d]=ha(q,r,q,r)}}},Ee=a=>{let c,d;if(!a.readOnly){let f=a.selection;if(f.startLineNumber!=f.endLineNumber||f.startColumn!=f.endColumn){ka(a,"");qa(a,"");j(a);return}if(f.positionLineNumber==1&&f.positionColumn==1)return;let g=f.positionLineNumber,h=f.positionColumn,b=aa(a.model,g,h),i=a.model,e=T((c=b-1|0,i),c),k=e.lineNumber,l=e.column,m=a.model;p((d=[s(k,l,g,h,"")],m),d,!0);w(a,k,l);Dh(a);j(a)}},Dh=a=>{let b=a.extraCursors.length;if(b!=0){let c=b-1;for(;c>=0;--c){let g,h,b=a.extraCursors[c],d=b.positionLineNumber,e=b.positionColumn;if(!(d==1&&e==1)){let b=aa(a.model,d,e),i=a.model,f=T((g=b-1|0,i),g),j=f.lineNumber,k=f.column,l=a.model;p((h=[s(j,k,d,e,"")],l),h,!0);a.extraCursors[c]=ha(j,k,j,k)}}}},Fe=a=>{let d,e;if(!a.readOnly){let f=a.selection;if(f.startLineNumber!=f.endLineNumber||f.startColumn!=f.endColumn){ka(a,"");qa(a,"");j(a);return}let g=f.positionLineNumber,h=f.positionColumn,b=aa(a.model,g,h);if(b>=fb(a.model))return;let i=a.model,c=T((d=b+1,i),d),k=c.lineNumber,l=c.column,m=a.model;p((e=[s(g,h,k,l,"")],m),e,!0);Eh(a);j(a)}},Eh=a=>{let b=a.extraCursors.length;if(b!=0){let c=b-1;for(;c>=0;--c){let i,j,d=a.extraCursors[c],e=d.positionLineNumber,f=d.positionColumn,b=aa(a.model,e,f);if(!(b>=fb(a.model))){let g=a.model,d=T((i=b+1,g),i),h=d.lineNumber,k=d.column,l=a.model;p((j=[s(e,f,h,k,"")],l),j,!0);a.extraCursors[c]=ha(e,f,e,f)}}}},Sb=(a,b)=>{let f,g,i,e=a.model,c=aa((f=a.selection.positionLineNumber,g=a.selection.positionColumn,e),f,g);c>0&&(--c);let h=a.model,d=T((i=c,h),i);b?z(a,a.selection.selectionStartLineNumber,a.selection.selectionStartColumn,d.lineNumber,d.column):w(a,d.lineNumber,d.column)},Nc=(a,b)=>{let f,g,k,e=a.model,c=aa((f=a.selection.positionLineNumber,g=a.selection.positionColumn,e),f,g);c<fb(a.model)&&(++c);let j=a.model,d=T((k=c,j),k);b?z(a,a.selection.selectionStartLineNumber,a.selection.selectionStartColumn,d.lineNumber,d.column):w(a,d.lineNumber,d.column)},Oc=(a,b)=>{let f,c=a.selection.positionLineNumber-1|0;c<1&&(c=1);c=ze(a,c);let d=a.selection.positionColumn,e=a.model,g=C((f=c,e),f)+1|0;d>g&&(d=g);b?z(a,a.selection.selectionStartLineNumber,a.selection.selectionStartColumn,c,d):w(a,c,d)},Pc=(a,b)=>{let h,c=a.selection.positionLineNumber+1|0,d=F(a.model);c>d&&(c=d);c=ze(a,c);let e=a.selection.positionColumn,g=a.model,i=C((h=c,g),h)+1|0;e>i&&(e=i);b?z(a,a.selection.selectionStartLineNumber,a.selection.selectionStartColumn,c,e):w(a,c,e)},Qc=(a,b)=>{let f=a.selection.positionLineNumber,c=t(a.model,f),d=pa(c),e=1;a.selection.positionColumn!=d+1&&d<c.length&&(e=d+1);b?z(a,a.selection.selectionStartLineNumber,a.selection.selectionStartColumn,f,e):w(a,f,e)},Rc=(a,b)=>{let c=a.selection.positionLineNumber,e=C(a.model,c)+1|0;b?z(a,a.selection.selectionStartLineNumber,a.selection.selectionStartColumn,c,e):w(a,c,e)},Ge=(a,b)=>{b?z(a,a.selection.selectionStartLineNumber,a.selection.selectionStartColumn,1,1):w(a,1,1)},He=(a,b)=>{let c=F(a.model),f=C(a.model,c)+1|0;b?z(a,a.selection.selectionStartLineNumber,a.selection.selectionStartColumn,c,f):w(a,c,f)},Ie=(a,b)=>{let c=a.height/a.lineHeight|0;c<1&&(c=1);let d=a.selection.positionLineNumber-c|0;d<1&&(d=1);b?z(a,a.selection.selectionStartLineNumber,a.selection.selectionStartColumn,d,a.selection.positionColumn):w(a,d,a.selection.positionColumn)},Je=(a,b)=>{let c=a.height/a.lineHeight|0;c<1&&(c=1);let d=a.selection.positionLineNumber+c|0,e=F(a.model);d>e&&(d=e);b?z(a,a.selection.selectionStartLineNumber,a.selection.selectionStartColumn,d,a.selection.positionColumn):w(a,d,a.selection.positionColumn)},Sc=(a,b)=>{let g,h,j,k,l,f=a.model,c=aa((g=a.selection.positionLineNumber,h=a.selection.positionColumn,f),g,h);c>0&&(--c);let i=a.model,d=T((j=c,i),j),e=P((k=a.model,t((l=d.lineNumber,k),l)),d.column);b?z(a,a.selection.selectionStartLineNumber,a.selection.selectionStartColumn,d.lineNumber,e.startColumn):w(a,d.lineNumber,e.startColumn)},Tc=(a,b)=>{let e,f,c=P((e=a.model,t((f=a.selection.positionLineNumber,e),f)),a.selection.positionColumn),d=c.endColumn;if(d==a.selection.positionColumn){let f,g,e=a.model,b=aa((f=a.selection.positionLineNumber,g=a.selection.positionColumn,e),f,g);if(b<fb(a.model)){let g,h,i,f=a.model,e=T((g=b+1,f),g);c=P((h=a.model,t((i=e.lineNumber,h),i)),e.column);d=c.endColumn}}b?z(a,a.selection.selectionStartLineNumber,a.selection.selectionStartColumn,a.selection.positionLineNumber,d):w(a,a.selection.positionLineNumber,d)},Ke=a=>{let c,d,e;if(!a.readOnly){let f=a.selection;if(f.startLineNumber!=f.endLineNumber||f.startColumn!=f.endColumn){ka(a,"");qa(a,"");j(a);return}let b=P((c=a.model,t((d=f.positionLineNumber,c),d)),f.positionColumn).startColumn;b==f.positionColumn&&f.positionColumn>1&&(b=f.positionColumn-1|0);let g=a.model;p((e=[s(f.positionLineNumber,b,f.positionLineNumber,f.positionColumn,"")],g),e,!0);w(a,f.positionLineNumber,b);j(a)}},Le=a=>{let c,d,e;if(!a.readOnly){let f=a.selection;if(f.startLineNumber!=f.endLineNumber||f.startColumn!=f.endColumn){ka(a,"");qa(a,"");j(a);return}let b=P((c=a.model,t((d=f.positionLineNumber,c),d)),f.positionColumn).endColumn;if(b==f.positionColumn){let d;b=f.positionColumn+1|0;let c=a.model,e=C((d=f.positionLineNumber,c),d)+1|0;b>e&&(b=e)}let g=a.model;p((e=[s(f.positionLineNumber,f.positionColumn,f.positionLineNumber,b,"")],g),e,!0);j(a)}},Me=a=>{kh(a.model);Rb(a);j(a)},Ne=a=>{lh(a.model);Rb(a);j(a)},Oe=a=>{let b=F(a.model);z(a,1,1,b,C(a.model,b)+1|0)},Da=a=>{let h,b=a.selection,c=b.startLineNumber,d=b.startColumn,e=b.endLineNumber,f=b.endColumn,g=a.model;return Ec((h=_(c,d,e,f),g),h)},Uc=a=>{let b=Da(a);if(b.length==0){let d,c=a.model;b=t((d=a.selection.positionLineNumber,c),d)+I}Ef(b)},Vc=a=>{Uc(a);if(!a.readOnly){if(a.selection.startLineNumber==a.selection.endLineNumber&&a.selection.startColumn==a.selection.endColumn){let c=a.selection.positionLineNumber;if(c<F(a.model)){let d,b=a.model;p((d=[s(c,1,c+1|0,1,"")],b),d,!0)}else{let d;p(a.model,[s((d=a.model,c),1,c,C(d,c)+1|0,"")],!0)}w(a,c,1)}else ka(a,"");j(a)}},Wc=(a,b)=>{if(!a.readOnly){let c=b;c.length==0&&(c=ki());if(c.length==0)return;ka(a,c);qa(a,c);j(a)}},Xc=(a,b)=>{if(!a.readOnly){let c=Eb;if(a.insertSpaces){let f=a.tabSize,b=u(),d=0;for(;d<f;++d)b+=i;c=b}let d=a.selection;if(d.startLineNumber!=d.endLineNumber||b){let e=d.startLineNumber;for(;e<=d.endLineNumber;e=e+1|0){let g,f=a.model,d=t((g=e,f),g);if(b){let b=0;if(d.length>0&&d.charAt(0)==Eb)b=1;else{for(;b<a.tabSize&&b<d.length&&d.charAt(b)==i;++b){}}if(b>0){let d,c=a.model;p((d=[s(e,1,e,b+1,"")],c),d,!0)}}else{let d,b=a.model;p((d=[s(e,1,e,1,c)],b),d,!0)}}j(a);return}Qa(a,c)}},Pe=a=>{if(!a.readOnly){let e=a.selection.positionLineNumber,b=t(a.model,e),c=A(b,0,pa(b)),d=u();a.selection.positionColumn>1&&(d=A(b,a.selection.positionColumn-2|0,a.selection.positionColumn-1|0));d=="{"&&(c+="  ");ka(a,I+c);qa(a,I+c);j(a)}},Tb=(a,b)=>{if(!a.readOnly){let g=a.selection.startLineNumber,h=a.selection.endLineNumber,i=g+b|0,c=F(a.model);if(i<1||(h+b|0)>c)return;let d=[],e=g;for(;e<=h;e=e+1|0){let b,c;d.push((b=a.model,t((c=e,b),c)))}let f=De(d);if(b<0){let d,i,j,k,l,m,n,c=a.model,b=t((d=g-1|0,c),d);p(a.model,[s((i=g-1|0,j=a.model,i),1,h,C(j,h)+1|0,f+I+b)],!0);z((k=g-1|0,l=h-1|0,m=a.model,a),k,1,l,C((n=h-1|0,m),n)+1|0)}else{let d,i,j,k,l,m,n,o,c=a.model,b=t((d=h+1|0,c),d);p(a.model,[s((i=h+1|0,j=a.model,g),1,i,C((k=h+1|0,j),k)+1|0,b+I+f)],!0);z((l=g+1|0,m=h+1|0,n=a.model,a),l,1,m,C((o=h+1|0,n),o)+1|0)}j(a)}},Qe=(a,b)=>{if(!a.readOnly){let f=a.selection.startLineNumber,g=a.selection.endLineNumber,c=[],d=f;for(;d<=g;d=d+1|0){let b,e;c.push((b=a.model,t((e=d,b),e)))}let e=De(c);if(b<0){let c,b=a.model;p((c=[s(f,1,f,1,e+I)],b),c,!0)}else{let h,j,k,l,m,c=C(a.model,g)+1|0,d=a.model;p((h=[s(g,c,g,c,I+e)],d),h,!0);let i=(g-f|0)+1|0;z((j=f+i|0,k=g+i|0,l=a.model,a),j,1,k,C((m=g+i|0,l),m)+1|0)}j(a)}},Re=(a,b)=>{let e,c=a.selection,d=c.positionLineNumber+b|0;if(!(d<1||(e=a.model,d>F(e)))){let b=c.positionColumn,e=C(a.model,d)+1|0;b>e&&(b=e);a.extraCursors.push(ha(d,b,d,b))}},Yc=(a,b,c)=>{if(b=="type"||b=="compositionType"){Qa(a,c);return!0}if(b=="paste"||b==Kf){Wc(a,c);return!0}if(b=="cut"||b==Mf){Vc(a);return!0}if(b=="copy"||b==Lf){Uc(a);return!0}if(b==qg||b==qg){Ee(a);return!0}if(b=="deleteRight"){Fe(a);return!0}if(b=="deleteWordLeft"||b=="deleteWordStartLeft"){Ke(a);return!0}if(b=="deleteWordRight"||b=="deleteWordEndRight"){Le(a);return!0}if(b=="undo"){Me(a);return!0}if(b=="redo"){Ne(a);return!0}if(b=="tab"||b=="editor.action.indentLines"){Xc(a,!1);return!0}if(b=="outdent"||b=="editor.action.outdentLines"){Xc(a,!0);return!0}if(b=="cursorLeft"){Sb(a,!1);return!0}if(b=="cursorRight"){Nc(a,!1);return!0}if(b=="cursorUp"){Oc(a,!1);return!0}if(b=="cursorDown"){Pc(a,!1);return!0}if(b=="cursorHome"||b=="cursorLineStart"){Qc(a,!1);return!0}if(b=="cursorEnd"||b=="cursorLineEnd"){Rc(a,!1);return!0}if(b=="cursorTop"){Ge(a,!1);return!0}if(b=="cursorBottom"){He(a,!1);return!0}if(b=="cursorPageUp"){Ie(a,!1);return!0}if(b=="cursorPageDown"){Je(a,!1);return!0}if(b=="cursorWordLeft"||b=="cursorWordStartLeft"){Sc(a,!1);return!0}if(b=="cursorWordRight"||b=="cursorWordEndRight"){Tc(a,!1);return!0}if(b=="cursorLeftSelect"){Sb(a,!0);return!0}if(b=="cursorRightSelect"){Nc(a,!0);return!0}if(b=="cursorUpSelect"){Oc(a,!0);return!0}if(b=="cursorDownSelect"){Pc(a,!0);return!0}if(b=="cursorHomeSelect"){Qc(a,!0);return!0}if(b=="cursorEndSelect"){Rc(a,!0);return!0}if(b=="cursorWordLeftSelect"){Sc(a,!0);return!0}if(b=="cursorWordRightSelect"){Tc(a,!0);return!0}if(b=="selectAll"){Oe(a);return!0}if(b=="expandLineSelection"){let b=F(a.model),c=a.selection.endLineNumber;c<b&&(++c);let d=1;if(c==a.selection.endLineNumber){let e,b=a.model;d=C((e=c,b),e)+1|0}z(a,a.selection.startLineNumber,1,c,d);return!0}if(b=="enter"){Pe(a);return!0}if(b==Tf){(a=>{if(!a.readOnly){let b=a.selection.startLineNumber,c=a.selection.endLineNumber;if(c<F(a.model)){let e,d=a.model;p((e=[s(b,1,c+1|0,1,"")],d),e,!0)}else if(b>1){let e,h,i,d=a.model,f=C((e=b-1|0,d),e)+1|0;p(a.model,[s((h=b-1|0,i=a.model,h),f,c,C(i,c)+1|0,"")],!0)}else{let d;p(a.model,[s((d=a.model,1),1,c,C(d,c)+1|0,"")],!0)}w(a,b,1);j(a)}})(a);return!0}if(b=="editor.action.moveLinesUpAction"){Tb(a,-1);return!0}if(b=="editor.action.moveLinesDownAction"){Tb(a,1);return!0}if(b=="editor.action.copyLinesUpAction"){Qe(a,-1);return!0}if(b=="editor.action.copyLinesDownAction"){Qe(a,1);return!0}if(b=="editor.action.insertCursorAbove"){Re(a,-1);return!0}if(b=="editor.action.insertCursorBelow"){Re(a,1);return!0}if(b=="editor.action.trimTrailingWhitespace"){(a=>{if(!a.readOnly){let b=1,c=F(a.model);for(;b<=c;b=b+1|0){let f,e=a.model,c=t((f=b,e),f),d=c.length;for(;d>0;--d){let a=c.charAt(d-1);if(a!=i&&a!=Eb)break}if(d<c.length){let f,e=a.model;p((f=[s(b,d+1,b,c.length+1,"")],e),f,!0)}}j(a)}})(a);return!0}if(b==Nf){(a=>{let c;if(!a.readOnly){let b=a.selection.endLineNumber,d=C(a.model,b)+1|0,e=a.model;p((c=[s(b,d,b,d,I)],e),c,!0);w(a,b+1|0,1);j(a)}})(a);return!0}if(b=="editor.action.insertLineBefore"){(a=>{let b;if(!a.readOnly){let c=a.selection.startLineNumber,d=a.model;p((b=[s(c,1,c,1,I)],d),b,!0);w(a,c,1);j(a)}})(a);return!0}if(b=="editor.action.joinLines"){(a=>{let f,g;if(!a.readOnly){let h=a.selection.startLineNumber;if(h>=F(a.model))return;let b=t(a.model,h),k=a.model,c=t((f=h+1|0,k),f),d=A(c,pa(c),c.length),e=b;e=b.length>0&&d.length>0?b+i+d:b+d;let l=a.model;p((g=[s(h,1,h+1|0,c.length+1,e)],l),g,!0);w(a,h,b.length+1);j(a)}})(a);return!0}if(b==$f){let c,d,b=P((c=a.model,t((d=a.selection.positionLineNumber,c),d)),a.selection.positionColumn);z(a,a.selection.positionLineNumber,b.startColumn,a.selection.positionLineNumber,b.endColumn);return!0}if(b=="editor.action.fontZoomIn"){a.fontSize=a.fontSize+1|0;a.lineHeight=a.fontSize+5|0;j(a);return!0}if(b=="editor.action.fontZoomOut"){a.fontSize>8&&(a.fontSize=a.fontSize-1|0,a.lineHeight=a.fontSize+5|0,j(a));return!0}return b=="editor.action.fontZoomReset"&&(a.fontSize=14,a.lineHeight=we,j(a),!0)},Fh=(a,b)=>{let c=G(b),d=ma(b),e=ac(b),f=pd(b);if(d&&!e&&(c=="z"||c=="Z")){o(b);Me(a)}else{if(d&&(c=="y"||c=="Y"||e&&(c=="z"||c=="Z"))){o(b);Ne(a);return}if(d&&(c=="a"||c=="A")){o(b);Oe(a);return}if(d&&(c=="c"||c=="C")){o(b);Uc(a);return}if(d&&(c=="x"||c=="X")){o(b);Vc(a);return}if(d&&(c=="v"||c=="V")){o(b);Wc(a,"");return}if(c=="Backspace"){o(b);d?Ke(a):Ee(a);return}if(c=="Delete"){o(b);d?Le(a):Fe(a);return}if(c==Bb){o(b);d?Yc(a,Nf,""):Pe(a);return}if(d&&e&&(c=="k"||c=="K")){o(b);Yc(a,Tf,"");return}if(c=="Tab"){o(b);Xc(a,e);return}if(c=="Home"){o(b);d?Ge(a,e):Qc(a,e);return}if(c=="End"){o(b);d?He(a,e):Rc(a,e);return}if(c=="PageUp"){o(b);Ie(a,e);return}if(c=="PageDown"){o(b);Je(a,e);return}if(c=="ArrowLeft"){o(b);d?Sc(a,e):Sb(a,e);return}if(c=="ArrowRight"){o(b);d?Tc(a,e):Nc(a,e);return}if(c==Ug){o(b);f?Tb(a,-1):Oc(a,e);return}if(c==vg){o(b);f?Tb(a,1):Pc(a,e);return}!d&&!f&&!Ff(b)&&c.length==1&&c!="Dead"&&(o(b),Qa(a,c))}},Se=(a,b)=>{o(b);let c=Da(a);li(b,c);Ef(c)},Te=a=>{if(!a)return"*";let b=a+"";return b.length>0&&b!="[object Object]"?b:a.language?a.language+"":a[0]?Te(a[0]):"*"},M=(a,b,c)=>{let f={a,b:Te(b),c};ra.push(f);return()=>{let a=0;for(;a<ra.length;++a)if(ra[a]===f){ra.splice(a,1);break}}},Gh=(a,b)=>a=="*"||a==b||a.length==0,Ra=(a,b)=>{let c=[],d=0;for(;d<ra.length;++d)ra[d].a==a&&Gh(ra[d].b,b)&&c.push(ra[d].c);return c},Ea=(a,b,c,d,e)=>Ta(a,b,c,d,e),Hh=a=>{let b=[];if(!a)return b;let c=a;a.suggestions&&(c=a.suggestions);let d=Ua(c),e=0;for(;e<d;++e){let a=Ha(c,e),d=ba(a,Bd,""),f=ba(a,pg,d);d.length==0&&(d=ba(a,pg,""));if(d.length>0){let g={label:"",insertText:"",kind:0,detail:""};re(g,d,f);g.kind=mi(a,"kind",18);b.push(g)}}return b},Ue=a=>{if(!a)return u();let b=ba(a,lc,"");if(b.length>0)return b;let f=a.contents,c=Ua(f);if(c==0){c=Ua(a);return c>0?ba(Ha(a,0),lc,ba(Ha(a,0),Bd,"")):a+""}let d=u(),e=0;for(;e<c;++e){let a=Ha(f,e),b=ba(a,lc,a+"");d.length>0&&(d+=I);d+=b}return d},Zc=a=>{let b=1,c=1,d=1,e=1;if(a){if(a.range)return Zc(a.range);a.startLineNumber&&(b=a.startLineNumber|0);a.startColumn&&(c=a.startColumn|0);a.endLineNumber&&(d=a.endLineNumber|0);a.endColumn&&(e=a.endColumn|0)}return _(b,c,d,e)},Ub=(a,b)=>{a.findOpen=!0;B(a.findWidget,ea);Da(a).length>0&&(a.findQuery=Da(a),_b(a.findInput,a.findQuery));ca(a.findInput)},$c=a=>{a.findOpen=!1;B(a.findWidget,E);ca(a.textarea)},_c=a=>{a.findQuery=pb(a.findInput);return a.findQuery.length==0?[]:Pa(a.model,a.findQuery,!1,!0,!1)},Sa=(a,b)=>{let c=_c(a);if(c.length!=0){b?(a.findIndex=a.findIndex-1|0,a.findIndex<0&&(a.findIndex=c.length-1)):(a.findIndex=a.findIndex+1|0,a.findIndex>=c.length&&(a.findIndex=0));let d=c[a.findIndex];z(a,d.range.startLineNumber,d.range.startColumn,d.range.endLineNumber,d.range.endColumn);j(a)}},Ve=a=>{let c;a.replaceQuery=pb(a.replaceInput);let b=_c(a);if(b.length!=0){a.findIndex>=b.length&&(a.findIndex=0);let d=b[a.findIndex],e=a.model;p((c=[s(d.range.startLineNumber,d.range.startColumn,d.range.endLineNumber,d.range.endColumn,a.replaceQuery)],e),c,!0);j(a);Sa(a,!1)}},We=a=>{a.replaceQuery=pb(a.replaceInput);let b=_c(a),c=b.length-1;for(;c>=0;--c){let f,d=b[c],e=a.model;p((f=[s(d.range.startLineNumber,d.range.startColumn,d.range.endLineNumber,d.range.endColumn,a.replaceQuery)],e),f,!0)}j(a)},Xe=a=>{let c,b=a.suggestItems;a.suggestOpen=b.length>0;if(!a.suggestOpen)B(a.suggestWidget,E);else{a.suggestIndex<0&&(a.suggestIndex=0);a.suggestIndex>=b.length&&(a.suggestIndex=0);let d=u(),e=0;for(;e<b.length&&e<16;++e){let c="";e==a.suggestIndex&&(c=" background:#04395e;");d=d+'<div class="monaco-list-row" data-suggest="'+e.toString()+'" style="padding:2px 6px;'+c+'">'+b[e].label+xb}bc(a.suggestWidget,d);let f=a.selection.positionLineNumber*a.lineHeight|0,h=((a.selection.positionColumn-1|0)*a.charWidth|0)+56|0;g((c=a.suggestWidget,c),$a,f.toString()+L);g(a.suggestWidget,Db,h.toString()+L);B(a.suggestWidget,ea)}},Ye=i=>{let m,n,o,p,a=(m=i.model,n=i.selection.positionLineNumber,o=i.selection.positionColumn,p={lineNumber:0,column:0},Ka(p,n,o),m),c=Nb(a,p),d=[],e=[],f=1,g=F(a);for(;f<=g&&d.length<200;f=f+1|0){let h=t(a,f),b=u(),g=0,i=h.length;for(;g<=i;++g){let a=!1,f=u();g<i&&(f=h.charAt(g),a=Dc(f));a?b+=f:(me(b,c,d,e),b=u())}}let h=Ba(a.languageId);if(h){let a=0;for(;a<h.lexer.keywords.length;++a)me(h.lexer.keywords[a],c,d,e)}i.suggestItems=d;i.suggestIndex=0;Xe(i);let l=Ra(mg,i.languageId);if(l.length!=0){Wb=Wb+1|0;let a=Wb,b=0;for(;b<l.length;++b){let c=Ea(l[b],"provideCompletionItems",i.modelFacade,{__proto__:null,lineNumber:i.selection.positionLineNumber,column:i.selection.positionColumn},k());cc(c,b=>{((a,b,c)=>{if(b==Wb){let b=Hh(c),d=0;for(;d<b.length;++d)a.suggestItems.push(b[d]);Xe(a)}})(i,a,b)})}}},Vb=a=>{a.suggestOpen=!1;B(a.suggestWidget,E)},Ze=a=>{let b,c,d;if(!(!a.suggestOpen||a.suggestItems.length==0)){let f=a.suggestItems[a.suggestIndex],e=P((b=a.model,t((c=a.selection.positionLineNumber,b),c)),a.selection.positionColumn),g=a.model;p((d=[s(a.selection.positionLineNumber,e.startColumn,a.selection.positionLineNumber,e.endColumn,ne(f.insertText))],g),d,!0);Vb(a);j(a)}},$e=(a,b)=>{!!a.suggestOpen&&(a.suggestIndex=a.suggestIndex+b|0,a.suggestIndex<0&&(a.suggestIndex=a.suggestItems.length-1),a.suggestIndex>=a.suggestItems.length&&(a.suggestIndex=0),Ye(a))},_e=(a,b,c)=>{a.hoverOpen=b.length>0;!a.hoverOpen?B(a.hoverWidget,E):($b(a.hoverWidget,b),g(a.hoverWidget,$a,(c.lineNumber*a.lineHeight|0).toString()+L),g(a.hoverWidget,Db,(((c.column-1|0)*a.charWidth|0)+56|0).toString()+L),B(a.hoverWidget,ea))},ad=a=>{let j={lineNumber:a.selection.positionLineNumber,column:a.selection.positionColumn},c=Nb(a.model,j),d=ue(a.model),e=0;for(;e<d.length;++e)d[e].d==j.lineNumber&&(c.length>0&&(c+=I),c+=d[e].b);_e(a,c,j);let f=Ra("hover",a.languageId),g=0;for(;g<f.length;++g){let b=Ea(f[g],"provideHover",a.modelFacade,{__proto__:null,lineNumber:j.lineNumber,column:j.column},k());cc(b,b=>{((a,b,c,d)=>{let e=Ue(d);if(e.length!=0){let d=c;d.length>0&&(d+=I);_e(a,d+e,b)}})(a,j,c,b)})}},af=a=>{a.hoverOpen=!1;B(a.hoverWidget,E)},V=(a,b,c)=>{let d="";c.length>0&&(d='<span class="keybinding">'+c+Vg);return'<div class="action-item" data-cmd="'+a+'"><span class="action-label">'+b+Vg+d+xb},bf=(a,b,c)=>{a.contextOpen=!0;let d='<div class="monaco-menu">';d+=V(sd,"Go to Definition","⌘F12");d+=V(td,"Go to References","⇧F12");d+=V(Uf,"Go to Symbol...","⇧⌘O");d+='<div class="action-item has-submenu"><span class="action-label">Peek</span><span class="submenu-hint">▶</span>';d+='<div class="submenu">';d+=V(Pf,"Peek Definition","⌥F12");d+=V(Jf,"Peek References","⇧F12");d+="</div></div>";d+=qd;d+=V(ud,"Rename Symbol","F2");d+=V(Vf,"Change All Occurrences","⌘F2");d+=V(rd,"Format Document","⇧⌥F");d+=qd;d+=V(Mf,"Cut","");d+=V(Lf,"Copy","");d+=V(Kf,"Paste","");d+=qd;d+=V(Qf,"Command Palette","F1");d+=xb;bc(a.contextWidget,d);g(a.contextWidget,$a,c.toString()+L);g(a.contextWidget,Db,b.toString()+L);B(a.contextWidget,ea)},bd=a=>{a.contextOpen=!1;B(a.contextWidget,E)},Ih=(a,b,c)=>{if(b=="actions.find"||b=="editor.action.startFindAction"){Ub(a,!1);return!0}if(b=="editor.action.startFindReplaceAction"){Ub(a,!0);return!0}if(b=="editor.action.nextMatchFindAction"){Sa(a,!1);return!0}if(b=="editor.action.previousMatchFindAction"){Sa(a,!0);return!0}if(b=="editor.action.replaceOne"){Ve(a);return!0}if(b=="editor.action.replaceAll"){We(a);return!0}if(b=="closeFindWidget"){$c(a);return!0}if(b==Of){Ye(a);return!0}if(b=="acceptSelectedSuggestion"){Ze(a);return!0}if(b=="hideSuggestWidget"){Vb(a);return!0}if(b=="editor.action.showHover"){ad(a);return!0}if(b==Wf){a.gotoOpen=!0;B(a.gotoWidget,ea);ca(a.gotoInput);return!0}if(b==ud){let c,d,b=P((c=a.model,t((d=a.selection.positionLineNumber,c),d)),a.selection.positionColumn);a.renameWord=b.word;a.renameOpen=!0;_b(a.renameInput,b.word);B(a.renameWidget,ea);ca(a.renameInput);return!0}if(b=="editor.action.triggerParameterHints"){let e,f,g,h,c=Nb((e=a.model,f=a.selection.positionLineNumber,g=a.selection.positionColumn,h={lineNumber:0,column:0},Ka(h,f,g),e),h)+"(value, options)",d=Ra(cg,a.languageId);if(d.length>0){let e=Ue(Ea(d[0],"provideSignatureHelp",a.modelFacade,{__proto__:null,lineNumber:a.selection.positionLineNumber,column:a.selection.positionColumn},k()));e.length>0&&(c=e)}$b(a.paramWidget,c);B(a.paramWidget,ea);return!0}if(b=="closeParameterHints"){B(a.paramWidget,E);return!0}if(b==Sf){let b=a.model,c=a.selection.positionLineNumber,e=Ba(a.languageId),f=h;e!=null&&e.lineComment.length>0&&(f=e.lineComment);let g=t(b,c),k=pa(g),l=A(g,k,g.length);if(l.indexOf(f)==0){let a=f.length;l.length>a&&l.charAt(a)==i&&(++a);let d=A(g,0,k)+A(l,a,l.length);p(b,[s(c,1,c,g.length+1,d)],!0)}else{let a=A(g,0,k)+f+i+l;p(b,[s(c,1,c,g.length+1,a)],!0)}j(a);return!0}if(b=="editor.action.blockComment"){let h=a.model,i=_(a.selection.startLineNumber,a.selection.startColumn,a.selection.endLineNumber,a.selection.endColumn),b=Ba(a.languageId),c=e,f=d;b!=null&&b.blockCommentStart.length>0&&(c=b.blockCommentStart,f=b.blockCommentEnd);let g=Ec(h,i);if(g.indexOf(c)==0&&g.length>=(c.length+f.length|0)){let a=A(g,c.length,g.length-f.length);p(h,[s(i.startLineNumber,i.startColumn,i.endLineNumber,i.endColumn,a)],!0)}else p(h,[s(i.startLineNumber,i.startColumn,i.endLineNumber,i.endColumn,c+g+f)],!0);j(a);return!0}if(b=="editor.action.jumpToBracket"){let c,d,e,f,b=Jc((c=a.model,d=a.selection.positionLineNumber,e=a.selection.positionColumn,f={lineNumber:0,column:0},Ka(f,d,e),c),f);b!=null&&(w(a,b.endLineNumber,b.endColumn),j(a));return!0}if(b=="editor.action.selectToBracket"){let c,d,e,f,b=Jc((c=a.model,d=a.selection.positionLineNumber,e=a.selection.positionColumn,f={lineNumber:0,column:0},Ka(f,d,e),c),f);b!=null&&(z(a,b.startLineNumber,b.startColumn,b.endLineNumber,b.endColumn),j(a));return!0}if(b=="editor.fold"){Pb(a,a.selection.positionLineNumber);return!0}if(b=="editor.unfold"){Pb(a,a.selection.positionLineNumber);return!0}if(b=="editor.foldAll"){Be(a,!0);return!0}if(b=="editor.unfoldAll"){Be(a,!1);return!0}if(b==rd){(a=>{let d,b=Ra(Xf,a.languageId);if(b.length>0){let e={},c=F(a.model);e.startLineNumber=1;e.startColumn=1;e.endLineNumber=c;e.endColumn=C(a.model,c)+1|0;let d=Ea(b[0],"provideDocumentRangeFormattingEdits",a.modelFacade,e,k())||Ea(b[0],"provideDocumentFormattingEdits",a.modelFacade,k(),k());cc(d,b=>{((a,b)=>{let c=Ua(b);if(c==0){let c;Mb(a.model,oe((c=a.model,Na(c))))}else{let d=c-1|0;for(;d>=0;--d){let h,c=Ha(b,d),e=Zc(c),f=ba(c,"text",""),g=a.model;p((h=[s(e.startLineNumber,e.startColumn,e.endLineNumber,e.endColumn,f)],g),h,!0)}}j(a)})(a,b)})}else{Mb(a.model,oe((d=a.model,Na(d))));j(a)}})(a);return!0}if(b==sd||b=="editor.action.revealDefinition"||b=="editor.action.goToDeclaration"){(a=>{let c,d,b=Ra(ng,a.languageId);if(b.length>0){let c=Ea(b[0],"provideDefinition",a.modelFacade,{__proto__:null,lineNumber:a.selection.positionLineNumber,column:a.selection.positionColumn},k());cc(c,b=>{((a,b)=>{if(!!b){let c=b;b[0]&&(c=b[0]);let d=Zc(c);w(a,d.startLineNumber,d.startColumn);j(a)}})(a,b)})}else{let b=P((c=a.model,t((d=a.selection.positionLineNumber,c),d)),a.selection.positionColumn),e=Pa(a.model,b.word,!1,!0,!0);e.length>0&&(w(a,e[0].range.startLineNumber,e[0].range.startColumn),j(a))}})(a);return!0}if(b==td||b==Jf||b==Pf){let f,g,b=P((f=a.model,t((g=a.selection.positionLineNumber,f),g)),a.selection.positionColumn),c=Pa(a.model,b.word,!1,!0,!0),d=u(),e=0;for(;e<c.length&&e<20;++e)d=d+'<div data-line="'+c[e].range.startLineNumber.toString()+'">'+c[e].range.startLineNumber.toString()+": "+c[e].matches[0]+xb;bc(a.hoverWidget,d);B(a.hoverWidget,ea);a.hoverOpen=!0;return!0}if(b==If){(a=>{let f,g,b=P((f=a.model,t((g=a.selection.positionLineNumber,f),g)),a.selection.positionColumn),c=Da(a);c.length==0&&(c=b.word,z(a,a.selection.positionLineNumber,b.startColumn,a.selection.positionLineNumber,b.endColumn));let d=Pa(a.model,c,!1,!0,!0),e=0;for(;e<d.length;++e){let b=d[e];if(!(b.range.startLineNumber==a.selection.startLineNumber&&b.range.startColumn==a.selection.startColumn)){a.extraCursors.push(a.selection);z(a,b.range.startLineNumber,b.range.startColumn,b.range.endLineNumber,b.range.endColumn);j(a);break}}})(a);return!0}if(b=="editor.action.selectHighlights"||b==Vf){let d,e,b=P((d=a.model,t((e=a.selection.positionLineNumber,d),e)),a.selection.positionColumn),c=Pa(a.model,b.word,!1,!0,!0);c.length>0&&(z(a,c[0].range.startLineNumber,c[0].range.startColumn,c[c.length-1].range.endLineNumber,c[c.length-1].range.endColumn),j(a));return!0}if(b=="editor.action.wordHighlight.trigger"){let e,f,g,h,b=(e=a.model,f=a.selection.positionLineNumber,g=a.selection.positionColumn,h={lineNumber:0,column:0},Ka(h,f,g),e),d=Nb(b,h);d.length==0?[]:Fc(b,d,!1,!0,!0,200);return!0}if(b=="editor.action.openLink"){let b=a.model,c=[],d=F(b),e=1;for(;e<=d;e=e+1|0){let a=t(b,e),d=a.indexOf("http://");d<0&&(d=a.indexOf("https://"));if(d>=0){let h,j,k,b=0,f=a.length;for(;(d+b|0)<f;b=b+1|0){let c=a.charAt(d+b|0);if(c==i||c==Eb||c==")"||c=='"')break}let g=d+b|0;c.push(_((h=e,j=d+1|0,k=e,h),j,k,g+1|0))}}c;return!0}if(b=="editor.action.transformToUppercase"){let b=Da(a);if(b.length>0){let d,c=a.model;p((d=[s(a.selection.startLineNumber,a.selection.startColumn,a.selection.endLineNumber,a.selection.endColumn,pe(b,!0))],c),d,!0);j(a)}return!0}if(b=="editor.action.transformToLowercase"){let b=Da(a);if(b.length>0){let d,c=a.model;p((d=[s(a.selection.startLineNumber,a.selection.startColumn,a.selection.endLineNumber,a.selection.endColumn,pe(b,!1))],c),d,!0);j(a)}return!0}if(b=="editor.action.insertSnippet"){Qa(a,ne(c));return!0}if(b=="editor.action.quickOutline"||b==Uf){Gf("symbols");return!0}if(b==Qf||b=="workbench.action.showCommands"){Gf("commands");return!0}if(b==Rf||b=="editor.action.gotoErrorNext"||b=="editor.action.marker.nextInFiles"){cf(a,!1);return!0}if(b=="editor.action.marker.prev"||b=="editor.action.gotoErrorPrev"){cf(a,!0);return!0}if(b=="editor.action.quickFix"||b=="editor.action.codeAction"){let b=Ra(og,a.languageId),c=u(),d=0;for(;d<b.length;++d){let e=Ea(b[d],"provideCodeActions",a.modelFacade,{__proto__:null,startLineNumber:a.selection.startLineNumber,startColumn:a.selection.startColumn,endLineNumber:a.selection.endLineNumber,endColumn:a.selection.endColumn},k()),f=Ua(e);e&&e.actions&&(f=Ua(e.actions),e=e.actions);let g=0;for(;g<f;++g)c=c+"<div>"+ba(Ha(e,g),"title",ba(Ha(e,g),Bd,"fix"))+xb}c.length==0&&(c="<div>No code actions</div>");bc(a.hoverWidget,c);B(a.hoverWidget,ea);a.hoverOpen=!0;return!0}if(b=="editor.action.smartSelect.expand"){let c,d,e,f,b=Jc((c=a.model,d=a.selection.positionLineNumber,e=a.selection.positionColumn,f={lineNumber:0,column:0},Ka(f,d,e),c),f);if(b)z(a,b.startLineNumber,b.startColumn,b.endLineNumber,b.endColumn);else{let c,d,b=P((c=a.model,t((d=a.selection.positionLineNumber,c),d)),a.selection.positionColumn);z(a,a.selection.positionLineNumber,b.startColumn,a.selection.positionLineNumber,b.endColumn)}j(a);return!0}if(b=="editor.action.smartSelect.shrink"){w(a,a.selection.positionLineNumber,a.selection.positionColumn);j(a);return!0}if(b=="editor.toggleFold"||b=="editor.foldRecursively"||b=="editor.unfoldRecursively"){Pb(a,a.selection.positionLineNumber);return!0}if(b=="editor.action.showContextMenu"){bf(a,80,a.selection.positionLineNumber*a.lineHeight|0);return!0}if(b=="editor.action.inlayHints.toggle"){let b=a.model,c=a.selection.positionLineNumber,d=[],e=pa(t(b,c)),f=1;for(;f<c;++f){let a=t(b,f),c=pa(a);c<e&&c!=a.length&&(d.push(a),e=c)}let h=u(),i=0;for(;i<d.length;++i)h=h+d[i]+I;$b(a.stickyWidget,h);B(a.stickyWidget,ea);return!0}return!1},cf=(a,b)=>{let c=ue(a.model);if(c.length!=0){let f=a.selection.positionLineNumber,d=c[0].d,e=0;for(;e<c.length;++e){let a=c[e].d;if(!b&&a>f){d=a;break}b&&a<f&&(d=a)}!b&&d<=f&&(d=c[0].d);w(a,d,1);ad(a);j(a)}},Oh=(a,b,c,d)=>{a.id=b;a.label=c;a.run=d},Fa=(a,b,c)=>{let d;return!a?c:(d=a[b],!d?c:d+"")},gb=(a,b,c)=>{let d;return!a?c:(d=a[b],!d?c:d+""!=yb&&(d+""!=Za&&!0))},df=(a,b,c)=>{let d;return!a?c:(d=a[b],!d?c:d|0)},fd=a=>{let e,f,b=a.view.root.clientWidth|0,c=a.view.root.clientHeight|0;b<1&&(b=a.view.width);c<1&&(c=a.view.height);let d=a.view;ye((e=b,f=c,d),e,f)},W=(a,b,c,d)=>{let e="";d&&d.text&&(e=d.text+"");if(d&&d.lineNumber){let b=d.lineNumber|0,c=1;d.column&&(c=d.column|0);w(a.view,b,c);j(a.view)}if(Yc(a.view,c,e))S(a.cursorEmitter);else{if(Ih(a.view,c,e)){S(a.cursorEmitter);return}let b=0;for(;b<a.actions.length;++b)if(a.actions[b].id==c){a.actions[b].run(a);break}}},gd=(a,b)=>{let c=Fa(b,"theme",a.view.theme);a.view.showLineNumbers=gb(b,"lineNumbers",a.view.showLineNumbers);a.view.readOnly=gb(b,"readOnly",a.view.readOnly);a.view.tabSize=df(b,"tabSize",a.view.tabSize);a.view.insertSpaces=gb(b,"insertSpaces",a.view.insertSpaces);a.view.fontSize=df(b,"fontSize",a.view.fontSize);a.view.wordWrap=gb(b,"wordWrap",a.view.wordWrap);if(b&&b.minimap){let d,c=b.minimap;a.view.showMinimap=gb((d=a.view.showMinimap,c),"enabled",d)}c!=a.view.theme?xe(a.view,c):j(a.view)},hd=a=>{!a.disposed&&(a.disposed=!0,wc(a.contentEmitter),wc(a.cursorEmitter))},cd=(a,b,c,d)=>{Oa();return ef(a,ee(b,c),d,c)},ef=(u,v,x,y)=>{Oa();let O={root:u,overflow:null,margin:null,scrollable:null,linesHost:null,textarea:null,minimapCanvas:null,widgetsHost:null,cursorEl:null,selectionHost:null,findWidget:null,findInput:null,replaceInput:null,suggestWidget:null,hoverWidget:null,contextWidget:null,gotoWidget:null,gotoInput:null,renameWidget:null,renameInput:null,paramWidget:null,stickyWidget:null,model:v,selection:ha(1,1,1,1),extraCursors:[],scrollTop:0,lineHeight:we,charWidth:Bh,width:800,height:400,showLineNumbers:!0,showMinimap:!0,theme:"vs",languageId:v.languageId,readOnly:!1,fontSize:14,tabSize:4,insertSpaces:!0,wordWrap:!1,mouseSelecting:!1,mouseAnchorLine:1,mouseAnchorColumn:1,folds:[],collapsed:[],findOpen:!1,findQuery:"",replaceQuery:"",findIndex:0,suggestOpen:!1,suggestItems:[],suggestIndex:0,hoverOpen:!1,contextOpen:!1,gotoOpen:!1,renameOpen:!1,renameWord:"",modelFacade:k(),overflow:D(N),margin:D(N),scrollable:D(N),linesHost:D(N),textarea:D("textarea"),minimapCanvas:D("canvas"),widgetsHost:D(N),cursorEl:D(N),selectionHost:D(N),findWidget:D(N),findInput:D(zb),replaceInput:D(zb),suggestWidget:D(N),hoverWidget:D(N),contextWidget:D(N),gotoWidget:D(N),gotoInput:D(zb),renameWidget:D(N),renameInput:D(zb),paramWidget:D(N),stickyWidget:D(N)};Y(O.root,ag+O.theme);g(O.root,sa,Eg);g(O.root,Fg,"hidden");Df(O.root,-1);g(O.root,"font-family","ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace");g(O.root,wd,O.fontSize.toString()+L);g(O.root,"line-height",O.lineHeight.toString()+L);Y(O.overflow,"overflow-guard");g(O.overflow,hc,Ja);g(O.overflow,jc,"100%");Y(O.margin,"margin");g(O.margin,Ab,Kc.toString()+L);g(O.margin,Ja,"0 0 "+Kc.toString()+L);g(O.margin,"user-select",E);Y(O.scrollable,"monaco-scrollable-element");g(O.scrollable,Ja,"1 1 auto");g(O.scrollable,Fg,Gd);g(O.scrollable,sa,Eg);Y(O.linesHost,"view-lines");O.wordWrap?(g(O.linesHost,dc,Gg),Z(O.textarea,Cb,"soft")):(g(O.linesHost,dc,"pre"),Z(O.textarea,Cb,Za));g(O.selectionHost,sa,Xa);g(O.selectionHost,"inset","0");g(O.selectionHost,sb,E);Y(O.cursorEl,"cursor");g(O.cursorEl,sa,Xa);g(O.cursorEl,Ab,"2px");g(O.cursorEl,jc,O.lineHeight.toString()+L);g(O.cursorEl,Ia,Pg);g(O.cursorEl,sb,E);Z(O.textarea,"class","inputarea");Z(O.textarea,Cb,Za);Z(O.textarea,"autocorrect",Za);Z(O.textarea,"autocapitalize",Za);Z(O.textarea,"spellcheck",yb);Df(O.textarea,0);g(O.textarea,sa,Xa);g(O.textarea,Ab,"1px");g(O.textarea,jc,"1px");g(O.textarea,"opacity","0");Y(O.minimapCanvas,"minimap");g(O.minimapCanvas,Ab,"64px");g(O.minimapCanvas,Ja,"0 0 64px");Y(O.widgetsHost,"overflowingContentWidgets");g(O.widgetsHost,sa,Xa);g(O.widgetsHost,"inset","0");g(O.widgetsHost,sb,E);Y(O.findWidget,"editor-widget find-widget");g(O.findWidget,sa,Xa);g(O.findWidget,$a,"8px");g(O.findWidget,"right","72px");g(O.findWidget,Qg,"50");g(O.findWidget,sb,Gd);g(O.findWidget,hc,E);g(O.findWidget,Ia,Rg);g(O.findWidget,"border",Yf);g(O.findWidget,Sg,"8px");od(O.findInput,"Find");od(O.replaceInput,"Replace");Z(O.findInput,hg,"find");Z(O.replaceInput,hg,Tg);K(O.findWidget,O.findInput);K(O.findWidget,O.replaceInput);hi(O.findWidget,O.findInput,O.replaceInput);K(O.widgetsHost,O.findWidget);Ca(O,O.suggestWidget,"suggest-widget");Ca(O,O.hoverWidget,"monaco-hover");Ca(O,O.contextWidget,"context-view");Ca(O,O.gotoWidget,"goto-line-widget");od(O.gotoInput,"Go to line");K(O.gotoWidget,O.gotoInput);Ca(O,O.renameWidget,"rename-box");K(O.renameWidget,O.renameInput);Ca(O,O.paramWidget,"parameter-hints-widget");Ca(O,O.stickyWidget,"sticky-widget");K(O.scrollable,O.selectionHost);K(O.scrollable,O.linesHost);K(O.scrollable,O.cursorEl);K(O.overflow,O.margin);K(O.overflow,O.scrollable);K(O.overflow,O.minimapCanvas);K(O.root,O.overflow);K(O.root,O.textarea);K(O.root,O.widgetsHost);Ob(O);B(O.findWidget,E);B(O.suggestWidget,E);B(O.hoverWidget,E);B(O.contextWidget,E);B(O.gotoWidget,E);B(O.renameWidget,E);B(O.paramWidget,E);let d=D("style");$b(d,".mtk-keyword{color:#569cd6}.mtk-string{color:#ce9178}.mtk-comment{color:#6a9955}.mtk-number{color:#b5cea8}.mtk-tag{color:#569cd6}.mtk-attr{color:#9cdcfe}.squiggly-error{text-decoration:underline wavy #f14c4c}.squiggly-warning{text-decoration:underline wavy #cca700}.squiggly-info{text-decoration:underline wavy #3794ff}.squiggly-hint{text-decoration:underline dotted #eeeeee}.folding{cursor:pointer;display:inline-block;width:12px}");K(O.root,d);O.theme=x;O.languageId=y;Ob(O);j(O);let J={view:null,contentEmitter:null,cursorEmitter:null,disposed:!1,actions:[],modelFacade:null},r;J.view=O;J.contentEmitter={listeners:[],disposed:!1};J.cursorEmitter={listeners:[],disposed:!1};J.disposed=!1;J.actions=[];J.modelFacade=k();let q=O.model;ie((r=()=>{S(J.contentEmitter)},q),r);let t=J.view;H(t.textarea,ic,a=>{if(t.suggestOpen){let b=G(a);if(b==vg){o(a);$e(t,1);return}if(b==Ug){o(a);$e(t,-1);return}if(b==Bb||b=="Tab"){o(a);Ze(t);return}if(b==yd){o(a);Vb(t);return}}if(ma(a)&&G(a)=="f"){o(a);Ub(t,!1)}else{if(ma(a)&&G(a)=="h"){o(a);Ub(t,!0);return}if(ma(a)&&G(a)=="g"){o(a);W(J,da,Wf,k());return}if(ma(a)&&G(a)==i){o(a);W(J,da,Of,k());return}if(ma(a)&&G(a)=="/"){o(a);W(J,da,Sf,k());return}if(ma(a)&&(G(a)=="d"||G(a)=="D")){o(a);W(J,da,If,k());return}if(G(a)=="F2"){o(a);W(J,da,ud,k());return}if(G(a)=="F12"){o(a);ac(a)?W(J,da,td,k()):W(J,da,sd,k());return}if(G(a)=="F8"){o(a);W(J,da,Rf,k());return}if(pd(a)&&ac(a)&&(G(a)=="f"||G(a)=="F")){o(a);W(J,da,rd,k());return}G(a)==yd&&(Vb(t),af(t),bd(t),$c(t));Fh(t,a);S(J.cursorEmitter)}},!1);H(t.textarea,"compositionend",a=>{let b=a.data+"";b.length>0&&Qa(t,b)},!1);H(t.textarea,zb,a=>{if(!Ff(a)){let b=a.target.value+"";b.length>0&&(Qa(t,b),_b(t.textarea,""))}},!1);H(t.textarea,"paste",a=>{o(a);Wc(t,ni(a))},!1);H(t.textarea,"copy",a=>{Se(t,a)},!1);H(t.textarea,"cut",a=>{Se(t,a);Vc(t)},!1);H(t.scrollable,"scroll",a=>{t.scrollTop=t.scrollable.scrollTop|0;j(t)},!1);H(t.root,"focus",a=>{ca(t.textarea)},!1);H(t.scrollable,gc,a=>{Hf(a)==0&&o(a);bd(t);af(t);let b=Qb(t,qb(a),rb(a)),d=b.lineNumber,e=b.column,c=oi(a);t.mouseSelecting=!0;t.mouseAnchorLine=d;t.mouseAnchorColumn=e;if(c>=3){let b=C(t.model,d)+1|0;z(t,d,1,d,b)}else if(c==2){w(t,d,e);W(J,da,$f,k())}else if(pd(a))t.extraCursors.push(ha(d,e,d,e));else if(ac(a)){let a=t.selection.selectionStartLineNumber,b=t.selection.selectionStartColumn;z(t,a,b,d,e)}else{t.extraCursors=[];w(t,d,e)}ca(t.textarea);j(t);S(J.cursorEmitter)},!1);H(t.margin,gc,a=>{Hf(a)==0&&o(a);let b=Qb(t,qb(a),rb(a));Pb(t,b.lineNumber);ca(t.textarea)},!1);H(t.root,"contextmenu",a=>{o(a);bf(t,qb(a)-pi(t.root)|0,rb(a)-qi(t.root)|0)},!1);H(t.contextWidget,gc,a=>{o(a);let c=a.target,b=Ta(c,vd,Hg,k(),k())+"";if(b.length==0||b==ug){let d,e,a=c.parentElement;b=Ta((d=k(),e=k(),a),vd,Hg,d,e)+""}b.length>0&&b!=ug&&(W(J,"menu",b,k()),bd(t))},!1);H(t.findWidget,gc,a=>{let d,e,c=a.target,b=Ta((d=k(),e=k(),c),vd,"data-find",d,e)+"";b=="next"&&Sa(t,!1);b=="prev"&&Sa(t,!0);b==Tg&&Ve(t);b=="all"&&We(t)},!1);H(t.findInput,ic,a=>{G(a)==Bb&&(o(a),Sa(t,ma(a)));G(a)==yd&&(o(a),$c(t))},!1);H(t.gotoInput,ic,a=>{if(G(a)==Bb){o(a);let b=pb(t.gotoInput),c=1;b.length>0&&(c=b|0);let d=F(t.model);c<1&&(c=1);c>d&&(c=d);w(t,c,1);t.gotoOpen=!1;B(t.gotoWidget,E);j(t);ca(t.textarea)}},!1);H(t.renameInput,ic,a=>{if(G(a)==Bb){o(a);let b=pb(t.renameInput);if(t.renameWord.length>0&&b.length>0){let a=Pa(t.model,t.renameWord,!1,!0,!0),c=a.length-1;for(;c>=0;--c){let f,d=a[c],e=t.model;p((f=[s(d.range.startLineNumber,d.range.startColumn,d.range.endLineNumber,d.range.endColumn,b)],e),f,!0)}}t.renameOpen=!1;B(t.renameWidget,E);j(t);ca(t.textarea)}},!1);H(t.scrollable,"mousemove",a=>{if(t.mouseSelecting){let e,f,b=Qb(t,qb(a),rb(a)),c=t.mouseAnchorLine,d=t.mouseAnchorColumn;z((e=b.lineNumber,f=b.column,t),c,d,e,f);j(t);S(J.cursorEmitter)}else if(ma(a)){let b=Qb(t,qb(a),rb(a));w(t,b.lineNumber,b.column);ad(t)}},!1);H(t.scrollable,"mouseup",a=>{t.mouseSelecting=!1},!1);H(t.root,"mouseleave",a=>{t.mouseSelecting=!1},!1);Xb.push(J);S(of);return J},Jh=(a,b)=>{let f=cd(a,Fa(b,lc,""),Fa(b,Dg,tb),Fa(b,"theme",hb));gd(f,b);j(f.view);return f},Kh=(a,b)=>{let c=D(N),d=D(N);g(a,hc,Ja);g(c,Ja,Og);g(d,Ja,Og);K(a,c);K(a,d);let e=Fa(b,"original",""),f=Fa(b,"modified",""),h=Fa(b,Dg,tb),l={a,b:cd(c,e,h,hb),c:cd(d,f,h,hb),d:[]};nf.push(l);S(pf);return l},dd=(a,b)=>M(Xf,a,b),ff=a=>({lineNumber:a.view.selection.positionLineNumber,column:a.view.selection.positionColumn}),gf=(a,b)=>{w(a.view,b.lineNumber,b.column);j(a.view)},hf=(a,b,c,d)=>{W(a,b,c,d)},jf=(a,b)=>{Mc(a.view,b);j(a.view)},kf=(a,b)=>{a.modelFacade=b;a.view.modelFacade=b},Lh=a=>ya(of,a),lf=a=>{Oa();if(Ba(a)==null){let d=Ba(tb);if(d){let e,f;b((e=d.lexer,f={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},c(f,a,e,"","",""),f))}}},mf=a=>F(a),ed=(a,b)=>t(a,b),Mh=(a,b)=>T(a,b),Nh=a=>ya(pf,a),f=(b,c,d,e)=>{let f=Aa(b,c,"",d);a(f,m,za(),0,"","",!1);if(e.length>0){let b=u(),c=0;for(;c<e.length;++c){let a=e.charAt(c);b=a=="/"||a=="*"||a=="-"||a=="+"||a=="?"||a=="."||a=="("||a==")"||a=="["||a=="]"||a=="{"||a=="}"||a=="^"||a=="$"||a=="|"||a=="\\"?b+"\\"+a:b+a}a(f,m,b+".*",0,q,"",!1)}a(f,m,Dd,1,q,q,!1);a(f,m,'"',1,l,l,!1);a(f,m,R,1,l,U,!1);a(f,m,Ed,0,ta,"",!1);a(f,m,_f,4,ec,"",!1);a(f,m,".",0,"","",!1);a(f,q,Fd,2,q,"",!1);a(f,q,zd,0,q,"",!1);a(f,q,"\\*",0,q,"",!1);a(f,l,'"',2,l,"",!1);a(f,l,fc,0,l,"",!1);a(f,U,R,2,l,"",!1);a(f,U,Ad,0,l,"",!1);return f},v=a=>({dispose:function(){a();return k()}}),la=(a,b)=>{Ta(a,"call",k(),b,k())},Yb=a=>!a?"":a.__lilUri?a.__lilUri+"":a.toString?Ta(a,"toString",k(),k(),k())+"":a.path?a.path+"":a+"",Zb=a=>{let c={},b=cb(a);c.scheme=a.scheme;c.authority=a.authority;c.path=a.path;c.query=a.query;c.fragment=a.fragment;c.fsPath=a.path;c.__lilUri=b;c.toString=function(){return b};return c},Th=a=>({owner:a.a,message:a.b,severity:a.c,startLineNumber:a.d,startColumn:a.e,endLineNumber:a.f,endColumn:a.g,resource:a.h}),id=a=>({lineNumber:a.lineNumber,column:a.column}),ib=a=>{if(!a)return null;let b=Yb(a);b.length==0&&a.uri&&(b=Yb(a.uri));let c=eb,d=0;for(;d<c.length;++d)if(cb(c[d].uri)==b)return c[d];return null},rf=a=>{let b=[];if(!a)return b;let c=0;for(;a[c];c=c+1|0){let i=a[c],j=i.range,d=j.startLineNumber|0,e=j.startColumn|0,f=j.endLineNumber|0,g=j.endColumn|0,h="";i.text&&(h=i.text+"");b.push(s(d,e,f,g,h))}return b},Ga=a=>{let b=0;for(;b<md.length;++b)if(md[b]===a)return xf[b];let d={};md.push(a);xf.push(d);let c=cb(a.uri);d.__lilUri=c;d.uri=Zb(a.uri);d.id=c;d.getValue=function(){return Na(a)};d.setValue=function(b){let c=b+"";Mb(a,c);return k()};d.getLineCount=function(){return mf(a)};d.getLineContent=function(b){return ed(a,b|0)};d.getLineLength=function(b){return ed(a,b|0).length};d.getLanguageId=function(){return a.languageId};d.getVersionId=function(){return a.versionId};d.getOffsetAt=function(b){let c=_a(b);return ge(a,c)};d.getPositionAt=function(b){return id(Mh(a,b|0))};d.getValueInRange=function(b){let c=Xg(b);return Ec(a,c)};d.getWordAtPosition=function(b){let d,c=he(a,_a(b));return c.word.length==0?k():(d={},d.word=c.word,d.startColumn=c.startColumn,d.endColumn=c.endColumn,d)};d.getWordUntilPosition=function(b){let c=he(a,_a(b)),d=b.column|0,e={};return c.word.length==0?(e.word="",e.startColumn=d,e.endColumn=d,e):(e.word=c.word,e.startColumn=c.startColumn,e.endColumn=d,e)};d.isDisposed=function(){return!1};d.isAttachedToEditor=function(){return!0};d.isTooLargeForSyncing=function(){return!1};d.onDidChangeAttached=function(a){return v(()=>{})};d.getOptions=function(){return{tabSize:2,insertSpaces:!0}};d.getFullModelRange=function(){let b=mf(a);return{startLineNumber:1,startColumn:1,endLineNumber:b,endColumn:ed(a,b).length+1}};d.getEOL=function(){return I};d.getValueLength=function(){return fb(a)};d.getLinesContent=function(){let b=[],c=1,d=F(a);for(;c<=d;c=c+1|0)b.push(t(a,c));return b};d.findMatches=function(b=void 0,c,d,e,f,g,h){let i=b+"",j=!!d,m=e+""!=yb,k=!!f,l=1e3;h&&(l=h|0);return Fc(a,i,j,m,k,l)};d.applyEdits=function(b){let c=rf(b);return p(a,c,!0)};d.onDidChangeContent=function(b){return v(ie(a,()=>{la(b,{})}))};d.dispose=function(){let b=eb,c=0;for(;c<b.length;++c)if(b[c]===a){b.splice(c,1);break}wc(a.contentEmitter);return k()};return d},jb=a=>{let b=0;for(;b<ld.length;++b)if(ld[b]===a)return wf[b];let c={};ld.push(a);wf.push(c);c.getValue=function(){return Na(a.view.model)};c.setValue=function(b){let c=b+"";Mb(a.view.model,c);w(a.view,1,1);j(a.view);return k()};c.getModel=function(){return Ga(a.view.model)};c.setModel=function(b){let c=ib(b);c!=null&&(a.view.model=c,a.view.languageId=c.languageId,w(a.view,1,1),j(a.view),kf(a,Ga(c)));return k()};c.getPosition=function(){return id(ff(a))};c.setPosition=function(b){gf(a,_a(b));return k()};c.getSelection=function(){return a.view.selection};c.setSelection=function(e){let f=mh(e);z(a.view,f.selectionStartLineNumber,f.selectionStartColumn,f.positionLineNumber,f.positionColumn);j(a.view);return k()};c.trigger=function(b=void 0,c,d){let e=b+"",f=c+"";hf(a,e,f,d);return k()};c.layout=function(b){if(b&&b.width){let c=b.width|0,d=b.height|0;ye(a.view,c,d)}else fd(a);return k()};c.focus=function(){ca(a.view.textarea);return k()};c.hasTextFocus=function(){return!0};c.dispose=function(){hd(a);return k()};c.executeEdits=function(b=void 0,c){let g=rf(c),d=p(a.view.model,g,!0);j(a.view);return d};c.deltaDecorations=function(f=void 0,g){let m=(a=>{let b=[];if(!a)return b;let c=0;for(;a[c];c=c+1|0){let i=a[c],j=i.range,d=j.startLineNumber|0,e=j.startColumn|0,f=j.endLineNumber|0,g=j.endColumn|0,h="";if(i.options){let a=i.options;a.inlineClassName?h=a.inlineClassName+"":a.className&&(h=a.className+"")}b.push({id:0,range:_(d,e,f,g),className:h,hoverMessage:"",isWholeLine:!1,metadata:0})}return b})(g),b=a.view.model,c=[],e=0;for(;e<c.length;++e){let d=b.decorations,g,f=c[e],a=Bc((g=d.root,d),g,f);if(a!==y){let b=d,c=a;b.deleteWasY=c;b.deleteWasX=y;b.deleteWasRed=c.color==1;if(c.left===y){let a=c.right;b.deleteWasX=a;Lb(b,c,a)}else if(c.right===y){let a=c.left;b.deleteWasX=a;Lb(b,c,a)}else{let a=c.right;for(;a.left!==y;a=a.left){}let d=a,e=d.right;b.deleteWasY=d;b.deleteWasRed=d.color==1;b.deleteWasX=e;let g=d.right;d.parent===c?g.parent=d:(Lb(b,d,d.right),d.right=c.right,Kb(d.right,d));Lb(b,c,d);d.left=c.left;Kb(d.left,d);d.color=c.color}let e=b.deleteWasX;c.alive=!1;ae(b,e.parent);if(!b.deleteWasRed){let a=e;for(;a!==b.root&&a.color==0;a=a.parent.left===a?dh(b,a):eh(b,a)){}a.color=0}y.parent=y;y.left=y;y.right=y}}di(b);b.decoScratchIdx=0;for(;b.decoScratchIdx<m.length;b.decoScratchIdx=b.decoScratchIdx+1|0){let c=m[b.decoScratchIdx],a=ch(b.decorations,c.range,c.className,c.hoverMessage,c.isWholeLine);ei(b,a.id)}let i=fi(b);j(a.view);return i};c.revealLine=function(b){jf(a,b|0);return k()};c.revealLineInCenter=function(b){jf(a,b|0);return k()};c.revealPosition=function(b){gf(a,_a(b));return k()};c.addAction=function(b){let g,c=b.id+"",d=c;b.label&&(d=b.label+"");let f=b.run;a.actions.push((g={id:"",label:"",run:null},Oh(g,c,d,f),g));return v(()=>{})};c.getAction=function(b){let c=b+"";return{id:c,run:function(){hf(a,"action",c,k());return k()}}};c.updateOptions=function(b){gd(a,b);return k()};c.onDidChangeModelContent=function(b){let c,d;return v((c=()=>{la(b,{})},d=a.contentEmitter,ya(d,c)))};c.onDidChangeCursorPosition=function(b){let c,d;return v((c=()=>{let c={position:id(ff(a))};la(b,c)},d=a.cursorEmitter,ya(d,c)))};c.getDomNode=function(){return a.view.root};kf(a,Ga(a.view.model));return c},sf=a=>({getOriginalEditor:function(){return jb(a.b)},getModifiedEditor:function(){return jb(a.c)},layout:function(){fd(a.b);fd(a.c);return k()},dispose:function(){hd(a.b);hd(a.c);return k()}}),tf=()=>({Method:0,Function:1,Constructor:2,Field:3,Variable:4,Class:5,Struct:6,Interface:7,Module:8,Property:9,Event:10,Operator:11,Unit:12,Value:13,Constant:14,Enum:15,EnumMember:16,Keyword:17,Text:18,Color:19,File:20,Reference:21,Folder:23,TypeParameter:24}),Uh=()=>({CtrlCmd:Ph,Shift:Qh,Alt:Rh,WinCtrl:Sh,chord:function(a=void 0,b){return a|0|(b|0)}}),Vh=()=>{let a=function(a=void 0,b,c,d,e){let k,l,m,n,o,f=a+"",g="",h="",i="",j="";b&&(g=b+"");c&&(h=c+"");d&&(i=d+"");e&&(j=e+"");return Zb((k=g,l=h,m=i,n=j,o={scheme:"",authority:"",path:"",query:"",fragment:""},$d(o,f,k,l,m,n),o))};a.parse=function(a=void 0){return Zb(Zd(a+""))};a.file=function(a=void 0){let b,c;return Zb((b=a+"",c={scheme:"",authority:"",path:"",query:"",fragment:""},$d(c,Cd,"",b,"",""),c))};return a},Wh=()=>({register:function(a=void 0){let b=a.id+"";lf(b);let c=0;for(;c<kd.length;++c)kd[c]==b&&la(vf[c],k());return k()},onLanguage:function(a=void 0,b){let c=a+"",d=ke(),e=0;for(;e<d.length;++e)if(d[e]==c){la(b,k());return v(()=>{})}kd.push(c);vf.push(b);return v(()=>{})},getLanguages:function(){let a=ke(),b=[],c=0;for(;c<a.length;++c)b.push({id:a[c]});return b},registerCompletionItemProvider:function(a=void 0,b){return v(M(mg,a,b))},registerHoverProvider:function(a=void 0,b){return v(M("hover",a,b))},registerDefinitionProvider:function(a=void 0,b){return v(M(ng,a,b))},registerReferenceProvider:function(a=void 0,b){return v(M("reference",a,b))},registerDocumentSymbolProvider:function(a=void 0,b){return v(M("documentSymbol",a,b))},registerDocumentFormattingEditProvider:function(a=void 0,b){return v(dd(a,b))},registerDocumentRangeFormattingEditProvider:function(a=void 0,b){return v(dd(a,b))},registerOnTypeFormattingEditProvider:function(a=void 0,b){return v(dd(a,b))},registerRenameProvider:function(a=void 0,b){return v(M("rename",a,b))},registerSignatureHelpProvider:function(a=void 0,b){return v(M(cg,a,b))},registerFoldingRangeProvider:function(a=void 0,b){return v(M("folding",a,b))},registerLinkProvider:function(a=void 0,b){return v(M("link",a,b))},registerCodeActionProvider:function(a=void 0,b){return v(M(og,a,b))},registerCodeLensProvider:function(a=void 0,b){return v(M("codeLens",a,b))},registerColorProvider:function(a=void 0,b){return v(M(kc,a,b))},registerDocumentHighlightProvider:function(a=void 0,b){return v(M("documentHighlight",a,b))},registerInlayHintsProvider:function(a=void 0,b){return v(M("inlayHints",a,b))},registerInlineCompletionsProvider:function(a=void 0,b){return v(M("inlineCompletions",a,b))},registerImplementationProvider:function(a=void 0,b){return v(M("implementation",a,b))},setLanguageConfiguration:function(d=void 0,e){let c=Ba(d+"");if(!(!c||!e)){let a=e.comments;if(a){a.lineComment&&(c.lineComment=a.lineComment+"");if(a.blockComment){let b=a.blockComment;b[0]&&(c.blockCommentStart=b[0]+"");b[1]&&(c.blockCommentEnd=b[1]+"")}}}return v(()=>{})},setTokensProvider:function(a=void 0,b){let d=a+"";lf(d);let c=Ba(d);c!=null&&(c.tokensProvider=b);return v(()=>{})},CompletionItemKind:tf()}),Xh=()=>({create:function(a=void 0,b){let c=null;b&&b.model&&(c=ib(b.model));if(c){let d=b&&b.language?b.language+"":c.languageId,e="vs";b&&b.theme&&(e=b.theme+"");let f=ef(a,c,e,d);gd(f,b);return jb(f)}return jb(Jh(a,b))},createDiffEditor:function(a=void 0,b){return sf(Kh(a,b))},createModel:function(a=void 0,b,c){let d=a+"",e=tb;b&&(e=b+"");if(c){let a=Ga(jh(d,e,Zd(Yb(c))));S(jd);return a}let f=Ga(ee(d,e));S(jd);return f},getModels:function(){let a=eb,b=[],c=0;for(;c<a.length;++c)b.push(Ga(a[c]));return b},getModel:function(a=void 0){let b=ib(a);return!b?k():Ga(b)},getEditors:function(){let c=Xb,a=[],b=0;for(;b<c.length;++b)a.push(jb(c[b]));return a},getDiffEditors:function(){let c=nf,a=[],b=0;for(;b<c.length;++b)a.push(sf(c[b]));return a},setTheme:function(a=void 0){let c=a+"";hb=c;let b=0;for(;b<Xb.length;++b)xe(Xb[b].view,c);return k()},defineTheme:function(a=void 0,b){let c=a+"";b;hb=c;return k()},setModelLanguage:function(a=void 0,b){let c=ib(a);c!=null&&(c.languageId=b+"");return k()},setModelMarkers:function(a=void 0,b,c){let d=ib(a);if(d){let w=b+"",v=[];if(c){let a=0;for(;c[a];a=a+1|0){let b,e;v.push(wh((b=c[a],e=d.uri,b),w,cb(e)))}}let l=se(d),q=[],r=0;for(;r<ja.length;++r){let a=ja[r];!(a.a==w&&a.h==l)&&q.push(a)}let g=[],h=0;for(;h<v.length;++h){let a=v[h];a.a=w;a.h=l;g.push(a)}let m=[],n=0;for(;n<q.length;++n)m.push(q[n]);let o=0;for(;o<g.length;++o)m.push(g[o]);ja=m;S(uf)}return k()},getModelMarkers:function(g=void 0){let h="",i="",j=0;g&&(g.owner&&(h=g.owner+""),g.resource&&(i=Yb(g.resource)),g.take&&(j=g.take|0));let d=te(h,i,j),e=[],f=0;for(;f<d.length;++f)e.push(Th(d[f]));return e},removeAllMarkers:function(a=void 0){let d=a+"",b=[],c=0;for(;c<ja.length;++c)ja[c].a!=d&&b.push(ja[c]);ja=b;return k()},onDidCreateModel:function(a=void 0){let c,d;return v((c=jd,ya((d=()=>{la(a,{})},c),d)))},onWillDisposeModel:function(){return v(()=>{})},onDidChangeModelLanguage:function(){return v(()=>{})},onDidCreateEditor:function(a=void 0){return v(Lh(()=>{la(a,{})}))},onDidCreateDiffEditor:function(a=void 0){return v(Nh(()=>{la(a,{})}))},onDidChangeMarkers:function(a=void 0){let c,d;return v((c=uf,ya((d=()=>{la(a,{})},c),d)))}}),Yh=function bootMonaco(){Oa();let a,g,j,k,l,m,n,o,p,q,r,s,t,u,v,w,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,S,T,U,V,W,X,Y,Z,$,_,aa,ba,ca,da,ea,fa,ha,ia,ja,ka,la,ma,na,oa,pa,qa,ra,sa,ta,ua,va,wa,xa,ya,za,Aa,Ba,Ca,Da,Ea,Fa,Ga,Ha,Ia,Ja,Ka,La,Ma,Na,Pa,Qa,Ra,Sa,Ta,Ua,Va,Wa,Xa,Ya,Za,$a,_a,ab,bb,cb,db,eb,fb,gb,hb,ib,jb,kb,lb,mb,nb,ob,pb,qb,rb,sb,tb,ub,vb,wb,xb,zb,Ab,Bb,Cb,Db,Eb,Fb,Gb,Hb,Ib,Jb,Kb,Lb,Mb,Nb,Ob,Pb,Qb,Rb,Sb,Tb,Ub,Vb,Wb,Xb,Yb,Zb,$b,_b;!qf&&(qf=!0,b((a=f("abap",".abap","abap-source abbreviated abstract accept accepting according activation actual add add-corresponding adjacent after alias aliases align all allocate alpha analysis analyzer and append appendage appending application archive area arithmetic as ascending aspect assert assign assigned assigning association asynchronous at attributes authority authority-check avg back background backup backward badi base before begin between big binary bintohex bit black blank blanks blob block blocks blue bound boundaries".split(i),"*"),g={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},c(g,"abap",a,"*",e,d),g)),b((j=f("apex",".apex",[],h),k={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},c(k,"apex",j,h,e,d),k)),b((l=f("azcli",".azcli",[],x),m={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},c(m,"azcli",l,x,e,d),m)),b((n=f("bat",".bat",[],"REM"),o={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},c(o,"bat",n,"REM",e,d),o)),b((p=f("bicep",".bicep",[],h),q={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},c(q,"bicep",p,h,e,d),q)),b((r=f(Cg,".cameligo","abs assert block Bytes case Crypto Current else failwith false for fun if in let let%entry let%init List list Map map match match%nat mod not operation Operation of record Set set sender skip source String then to true type with".split(i),h),s={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},c(s,Cg,r,h,e,d),s)),b((t=f(Ng,".clojure",[],";;"),u={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},c(u,Ng,t,";;",e,d),u)),b((v=f("coffee",".coffee","and or is isnt not on yes @ no off true false null this new delete typeof in instanceof return throw break continue debugger if else switch for while do try catch finally class extends super undefined then unless until loop of by when".split(i),x),w={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},c(w,"coffee",v,x,e,d),w)),b((y=f("cpp",".cpp","abstract amp array auto bool break case catch char class const constexpr const_cast continue cpu decltype default delegate delete do double dynamic_cast each else enum event explicit export extern false final finally float for friend gcnew generic goto if in initonly inline int interface interior_ptr internal literal long mutable namespace new noexcept nullptr __nullptr operator override partial pascal pin_ptr private property protected public ref".split(i),h),z={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},c(z,"cpp",y,h,e,d),z)),b((A=f("csharp",".csharp","extern alias using bool decimal sbyte byte short ushort int uint long ulong char float double object dynamic string assembly is as ref out this base new typeof void checked unchecked default delegate var const if else switch case while do for foreach in break continue goto return throw try catch finally lock yield from let where join on equals into orderby ascending descending".split(i),h),B={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},c(B,"csharp",A,h,e,d),B)),b((C=f("csp",".csp",[],""),D={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},c(D,"csp",C,"",e,d),D)),b((E=f("cypher",".cypher","ALL AND AS ASC ASCENDING BY CALL CASE CONTAINS CREATE DELETE DESC DESCENDING DETACH DISTINCT ELSE END ENDS EXISTS IN IS LIMIT MANDATORY MATCH MERGE NOT ON ON OPTIONAL OR ORDER REMOVE RETURN SET SKIP STARTS THEN UNION UNWIND WHEN WHERE WITH XOR YIELD".split(i),h),F={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},c(F,"cypher",E,h,e,d),F)),b((G=f("dart",".dart","abstract dynamic implements show as else import static assert enum in super async export interface switch await extends is sync break external library this case factory mixin throw catch false new true class final null try const finally on typedef continue for operator var covariant Function part void default get rethrow while deferred hide return with do if set yield".split(i),h),H={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},c(H,"dart",G,h,e,d),H)),b((I=f(lg,".dockerfile",[],""),J={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},c(J,lg,I,"",e,d),J)),b((K=f("ecl",".ecl","__compressed__ after all and any as atmost before beginc best between case cluster compressed compression const counter csv default descend embed encoding encrypt end endc endembed endmacro enum escape except exclusive expire export extend fail few fileposition first flat forward from full function functionmacro group grouped heading hole ifblock import in inner interface internal joined keep keyed last left limit linkcounted literal little_endian load".split(i),h),L={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},c(L,"ecl",K,h,e,d),L)),b((M=f("elixir",".elixir",[],x),N={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},c(N,"elixir",M,x,e,d),N)),b((O=f("flow9",".flow9","import require export forbid native if else cast unsafe switch default".split(i),h),P={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},c(P,"flow9",O,h,e,d),P)),b((Q=f(gg,".freemarker2",[yb,"true","in","as","using"],""),S={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},c(S,gg,Q,"",e,d),S)),b((T=f("fsharp",".fsharp","abstract and atomic as assert asr base begin break checked component const constraint constructor continue class default delegate do done downcast downto elif else end exception eager event external extern false finally for fun function fixed functor global if in include inherit inline interface internal land lor lsl lsr lxor lazy let match member mod module mutable namespace method mixin new not null of".split(i),h),U={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},c(U,"fsharp",T,h,e,d),U)),b((V=f("go",".go","break case chan const continue default defer else fallthrough for func go goto if import interface map package range return select struct switch type var bool true false uint8 uint16 uint32 uint64 int8 int16 int32 int64 float32 float64 complex64 complex128 byte rune uint int uintptr string nil".split(i),h),W={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},c(W,"go",V,h,e,d),W)),b((X=f(Mg,".graphql","null true false query mutation subscription extend schema directive scalar type interface union enum input implements fragment on".split(i),x),Y={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},c(Y,Mg,X,x,e,d),Y)),b((Z=f(kg,".handlebars",[],""),$={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},c($,kg,Z,"",e,d),$)),b((_=f("hcl",".hcl","var,local,path,for_each,any,string,number,bool,true,false,null,if ,else ,endif ,for ,in,endfor".split(","),x),aa={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},c(aa,"hcl",_,x,e,d),aa)),b((ba=f("ini",".ini",[],x),ca={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},c(ca,"ini",ba,x,e,d),ca)),b((da=f("java",".java","abstract continue for new switch assert default goto package synchronized boolean do if private this break double implements protected throw byte else import public throws case enum instanceof return transient catch extends int short try char final interface static void class finally long strictfp volatile const float native super while true false yield record sealed non-sealed permits".split(i),h),ea={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},c(ea,"java",da,h,e,d),ea)),b((fa=f("julia",".julia","begin while if for try return break continue function macro quote let local global const do struct module baremodule using import export end else elseif catch finally mutable primitive abstract type in isa where new".split(i),""),ha={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},c(ha,"julia",fa,"",e,d),ha)),b((ia=f("kotlin",".kotlin","as as? break class continue do else false for fun if in !in interface is !is null object package return super this throw true try typealias val var when while by catch constructor delegate dynamic field file finally get import init param property receiver set setparam where actual abstract annotation companion const crossinline data enum expect external final infix inline inner internal lateinit noinline".split(i),h),ja={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},c(ja,"kotlin",ia,h,e,d),ja)),b((ka=f("less",".less",[],h),la={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},c(la,"less",ka,h,e,d),la)),b((ma=f("lexon",".lexon","lexon lex clause terms contracts may pay pays appoints into to".split(i),Lg),na={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},c(na,"lexon",ma,Lg,e,d),na)),b((oa=f("liquid",".liquid",[],""),pa={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},c(pa,"liquid",oa,"",e,d),pa)),b((qa=f("lua",".lua","and break do else elseif end false for function goto if in local nil not or repeat return then true until while".split(i),ga),ra={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},c(ra,"lua",qa,ga,e,d),ra)),b((sa=f("m3",".m3","AND ANY ARRAY AS BEGIN BITS BRANDED BY CASE CONST DIV DO ELSE ELSIF END EVAL EXCEPT EXCEPTION EXIT EXPORTS FINALLY FOR FROM GENERIC IF IMPORT IN INTERFACE LOCK LOOP METHODS MOD MODULE NOT OBJECT OF OR OVERRIDES PROCEDURE RAISE RAISES READONLY RECORD REF REPEAT RETURN REVEAL SET THEN TO TRY TYPE TYPECASE UNSAFE UNTIL UNTRACED VALUE VAR WHILE WITH".split(i),""),ta={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},c(ta,"m3",sa,"",e,d),ta)),b((ua=f("mdx",".mdx",[],""),va={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},c(va,"mdx",ua,"",e,d),va)),b((wa=f("mips",".mips",".data .text syscall trap add addu addi addiu and andi div divu mult multu nor or ori sll slv sra srav srl srlv sub subu xor xori lhi lho lhi llo slt slti sltu sltiu beq bgtz blez bne j jal jalr jr lb lbu lh lhu lw li la sb sh sw mfhi mflo mthi mtlo move".split(i),x),xa={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},c(xa,"mips",wa,x,e,d),xa)),b((ya=f("msdax",".msdax","VAR RETURN NOT EVALUATE DATATABLE ORDER BY START AT DEFINE MEASURE ASC DESC IN BOOLEAN DOUBLE INTEGER DATETIME CURRENCY STRING".split(i),h),za={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},c(za,"msdax",ya,h,e,d),za)),b((Aa=f("mysql",".mysql","ACCESSIBLE ADD ALL ALTER ANALYZE AND AS ASC ASENSITIVE BEFORE BETWEEN BIGINT BINARY BLOB BOTH BY CALL CASCADE CASE CHANGE CHAR CHARACTER CHECK COLLATE COLUMN CONDITION CONSTRAINT CONTINUE CONVERT CREATE CROSS CUBE CUME_DIST CURRENT_DATE CURRENT_TIME CURRENT_TIMESTAMP CURRENT_USER CURSOR DATABASE DATABASES DAY_HOUR DAY_MICROSECOND DAY_MINUTE DAY_SECOND DEC DECIMAL DECLARE DEFAULT DELAYED DELETE DENSE_RANK DESC DESCRIBE DETERMINISTIC DISTINCT DISTINCTROW DIV DOUBLE DROP DUAL EACH ELSE ELSEIF EMPTY".split(i),ga),Ba={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},c(Ba,"mysql",Aa,ga,e,d),Ba)),b((Ca=f(fg,".objective-c","#import #include #define #else #endif #if #ifdef #ifndef #ident #undef @class @defs @dynamic @encode @end @implementation @interface @package @private @protected @property @protocol @public @selector @synthesize __declspec assign auto BOOL break bycopy byref case char Class const copy continue default do double else enum extern FALSE false float for goto if in int id inout IMP long nil nonatomic NULL oneway out private public protected".split(i),h),Da={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},c(Da,fg,Ca,h,e,d),Da)),b((Ea=f("pascal",".pascal","absolute abstract all and_then array as asm attribute begin bindable case class const contains default div else end except exports external far file finalization finally forward generic goto if implements import in index inherited initialization interrupt is label library mod module name near not object of on only operator or_else otherwise override package packed pow private program protected public published interface implementation qualified read".split(i),h),Fa={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},c(Fa,"pascal",Ea,h,e,d),Fa)),b((Ga=f(tg,".pascaligo","begin block case const else end fail for from function if is nil of remove return skip then type var while with option None transaction".split(i),h),Ha={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},c(Ha,tg,Ga,h,e,d),Ha)),b((Ia=f("perl",".perl","__DATA__ else lock __END__ elsif lt __FILE__ eq __LINE__ exp ne sub __PACKAGE__ for no and foreach or unless cmp ge package until continue gt while CORE if xor do le __DIE__ __WARN__".split(i),x),Ja={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},c(Ja,"perl",Ia,x,e,d),Ja)),b((Ka=f("pgsql",".pgsql","ALL ANALYSE ANALYZE AND ANY ARRAY AS ASC ASYMMETRIC AUTHORIZATION BINARY BOTH CASE CAST CHECK COLLATE COLLATION COLUMN CONCURRENTLY CONSTRAINT CREATE CROSS CURRENT_CATALOG CURRENT_DATE CURRENT_ROLE CURRENT_SCHEMA CURRENT_TIME CURRENT_TIMESTAMP CURRENT_USER DEFAULT DEFERRABLE DESC DISTINCT DO ELSE END EXCEPT FALSE FETCH FOR FOREIGN FREEZE FROM FULL GRANT GROUP HAVING ILIKE IN INITIALLY INNER INTERSECT INTO IS ISNULL JOIN LATERAL LEADING LEFT LIKE LIMIT LOCALTIME LOCALTIMESTAMP NATURAL".split(i),ga),La={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},c(La,"pgsql",Ka,ga,e,d),La)),b((Ma=f("php",".php",[],h),Na={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},c(Na,"php",Ma,h,e,d),Na)),b((Pa=f("pla",".pla",".i .o .mv .ilb .ob .label .type .phase .pair .symbolic .symbolic-output .kiss .p .e .end".split(i),x),Qa={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},c(Qa,"pla",Pa,x,e,d),Qa)),b((Ra=f(Bg,".postiats","abstype abst0ype absprop absview absvtype absviewtype absvt0ype absviewt0ype as and assume begin case classdec datasort datatype dataprop dataview datavtype dataviewtype do end extern extype extvar exception fn fnx fun prfn prfun praxi castfn if then else ifcase in infix infixl infixr prefix postfix implmnt implement primplmnt primplement import lam llam fix let local macdef macrodef nonfix symelim symintr overload of op rec sif scase".split(i),h),Sa={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},c(Sa,Bg,Ra,h,e,d),Sa)),b((Ta=f(jg,".powerquery","as each else error false if in is let meta otherwise section shared then true try type".split(i),h),Ua={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},c(Ua,jg,Ta,h,e,d),Ua)),b((Va=f(ig,".powershell","begin break catch class continue data define do dynamicparam else elseif end exit filter finally for foreach from function if in param process return switch throw trap try until using var while workflow parallel sequence inlinescript configuration".split(i),x),Wa={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},c(Wa,ig,Va,x,e,d),Wa)),b((Xa=f(Ag,".protobuf","syntax import weak public package option repeated oneof map reserved to max enum message service rpc stream returns package optional true false".split(i),h),Ya={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},c(Ya,Ag,Xa,h,e,d),Ya)),b((Za=f("pug",".pug","append block case default doctype each else extends for if in include mixin typeof unless var when".split(i),h),$a={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},c($a,"pug",Za,h,e,d),$a)),b((_a=f("qsharp",".qsharp","namespace open import export as operation function body adjoint newtype struct controlled if elif else repeat until fixup for in while return fail within apply Adjoint Controlled Adj Ctl is self auto distribute invert intrinsic let set w/ new not and or use borrow using borrowing mutable internal".split(i),h),ab={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},c(ab,"qsharp",_a,h,e,d),ab)),b((bb=f("r",".r","break next return if else for in repeat while array category character complex double function integer list logical matrix numeric vector data.frame factor library require attach detach source".split(i),x),cb={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},c(cb,"r",bb,x,e,d),cb)),b((db=f("razor",".razor",[],""),eb={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},c(eb,"razor",db,"",e,d),eb)),b((fb=f("redis",".redis","APPEND AUTH BGREWRITEAOF BGSAVE BITCOUNT BITFIELD BITOP BITPOS BLPOP BRPOP BRPOPLPUSH CLIENT KILL LIST GETNAME PAUSE REPLY SETNAME CLUSTER ADDSLOTS COUNT-FAILURE-REPORTS COUNTKEYSINSLOT DELSLOTS FAILOVER FORGET GETKEYSINSLOT INFO KEYSLOT MEET NODES REPLICATE RESET SAVECONFIG SET-CONFIG-EPOCH SETSLOT SLAVES SLOTS COMMAND COUNT GETKEYS CONFIG GET REWRITE SET RESETSTAT DBSIZE DEBUG OBJECT SEGFAULT DECR DECRBY DEL DISCARD DUMP ECHO EVAL EVALSHA EXEC EXISTS EXPIRE EXPIREAT FLUSHALL FLUSHDB GEOADD".split(i),""),gb={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},c(gb,"redis",fb,"",e,d),gb)),b((hb=f(zg,".redshift","AES128 AES256 ALL ALLOWOVERWRITE ANALYSE ANALYZE AND ANY ARRAY AS ASC AUTHORIZATION AZ64 BACKUP BETWEEN BINARY BLANKSASNULL BOTH BYTEDICT BZIP2 CASE CAST CHECK COLLATE COLUMN CONSTRAINT CREATE CREDENTIALS CROSS CURRENT_DATE CURRENT_TIME CURRENT_TIMESTAMP CURRENT_USER CURRENT_USER_ID DEFAULT DEFERRABLE DEFLATE DEFRAG DELTA DELTA32K DESC DISABLE DISTINCT DO ELSE EMPTYASNULL ENABLE ENCODE ENCRYPT ENCRYPTION END EXCEPT EXPLICIT FALSE FOR FOREIGN FREEZE FROM FULL GLOBALDICT256 GLOBALDICT64K GRANT GROUP GZIP".split(i),ga),ib={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},c(ib,zg,hb,ga,e,d),ib)),b((jb=f(Zf,".restructuredtext",[],""),kb={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},c(kb,Zf,jb,"",e,d),kb)),b((lb=f("ruby",".ruby","__LINE__ __ENCODING__ __FILE__ BEGIN END alias and begin break case class def defined? do else elsif end ensure for false if in module next nil not or redo rescue retry return self super then true undef unless until when while yield".split(i),x),mb={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},c(mb,"ruby",lb,x,e,d),mb)),b((nb=f("rust",".rust","as async await box break const continue crate dyn else enum extern false fn for if impl in let loop match mod move mut pub ref return self static struct super trait true try type unsafe use where while catch default union static abstract alignof become do final macro offsetof override priv proc pure sizeof typeof unsized virtual yield".split(i),h),ob={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},c(ob,"rust",nb,h,e,d),ob)),b((pb=f("sb",".sb","Else ElseIf EndFor EndIf EndSub EndWhile For Goto If Step Sub Then To While".split(i),R),qb={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},c(qb,"sb",pb,R,e,d),qb)),b((rb=f("scala",".scala","asInstanceOf catch class classOf def do else extends finally for foreach forSome if import isInstanceOf macro match new object package return throw trait try type until val var while with yield given enum then".split(i),h),sb={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},c(sb,"scala",rb,h,e,d),sb)),b((tb=f("scheme",".scheme","case do let loop if else when cons car cdr cond lambda lambda* syntax-rules format set! quote eval append list list? member? load".split(i),";"),ub={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},c(ub,"scheme",tb,";",e,d),ub)),b((vb=f("scss",".scss",[],h),wb={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},c(wb,"scss",vb,h,e,d),wb)),b((xb=f("shell",".shell","if then do else elif while until for in esac fi fin fil done exit set unset export function".split(i),x),zb={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},c(zb,"shell",xb,x,e,d),zb)),b((Ab=f(yg,".solidity","pragma solidity contract library using struct function modifier constructor address string bool Int Uint Byte Fixed Ufixed int int8 int16 int24 int32 int40 int48 int56 int64 int72 int80 int88 int96 int104 int112 int120 int128 int136 int144 int152 int160 int168 int176 int184 int192 int200 int208 int216 int224 int232 int240 int248 int256 uint uint8 uint16 uint24 uint32 uint40 uint48 uint56 uint64 uint72 uint80 uint88 uint96 uint104".split(i),h),Bb={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},c(Bb,yg,Ab,h,e,d),Bb)),b((Cb=f("sophia",".sophia","contract library entrypoint function stateful state hash signature tuple list address string bool int record datatype type option oracle oracle_query Call Bits Bytes Oracle String Crypto Address Auth Chain None Some bits bytes event let map private public true false var if else throw".split(i),h),Db={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},c(Db,"sophia",Cb,h,e,d),Db)),b((Eb=f("sparql",".sparql","add as asc ask base by clear construct copy create data delete desc describe distinct drop false filter from graph group having in insert limit load minus move named not offset optional order prefix reduced select service silent to true undef union using values where with".split(i),x),Fb={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},c(Fb,"sparql",Eb,x,e,d),Fb)),b((Gb=f("sql",".sql","ABORT ABSOLUTE ACTION ADA ADD AFTER ALL ALLOCATE ALTER ALWAYS ANALYZE AND ANY ARE AS ASC ASSERTION AT ATTACH AUTHORIZATION AUTOINCREMENT AVG BACKUP BEFORE BEGIN BETWEEN BIT BIT_LENGTH BOTH BREAK BROWSE BULK BY CASCADE CASCADED CASE CAST CATALOG CHAR CHARACTER CHARACTER_LENGTH CHAR_LENGTH CHECK CHECKPOINT CLOSE CLUSTERED COALESCE COLLATE COLLATION COLUMN COMMIT COMPUTE CONFLICT CONNECT CONNECTION CONSTRAINT CONSTRAINTS CONTAINS CONTAINSTABLE CONTINUE CONVERT CORRESPONDING COUNT CREATE".split(i),ga),Hb={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},c(Hb,"sql",Gb,ga,e,d),Hb)),b((Ib=f("st",".st","if end_if elsif else case of to __try __catch __finally do with by while repeat end_while end_repeat end_case for end_for task retain non_retain constant with at exit return interval priority address port on_channel then iec file uses version packagetype displayname copyright summary vendor common_source from extends implements".split(i),h),Jb={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},c(Jb,"st",Ib,h,e,d),Jb)),b((Kb=f("swift",".swift","#available #colorLiteral #column #dsohandle #else #elseif #endif #error #file #fileID #fileLiteral #filePath #function #if #imageLiteral #keyPath #line #selector #sourceLocation #warning Any Protocol Self Type actor as assignment associatedtype associativity async await break case catch class continue convenience default defer deinit didSet do dynamic dynamicType else enum extension fallthrough false fileprivate final for func get guard higherThan if import in indirect infix init inout internal".split(i),h),Lb={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},c(Lb,"swift",Kb,h,e,d),Lb)),b((Mb=f(bg,".systemverilog","accept_on alias always always_comb always_ff always_latch and assert assign assume automatic before begin bind bins binsof bit break buf bufif0 bufif1 byte case casex casez cell chandle checker class clocking cmos config const constraint context continue cover covergroup coverpoint cross deassign default defparam design disable dist do edge else end endcase endchecker endclass endclocking endconfig endfunction endgenerate endgroup endinterface endmodule endpackage endprimitive endprogram endproperty".split(i),h),Nb={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},c(Nb,bg,Mb,h,e,d),Nb)),b((Ob=f("tcl",".tcl",[],""),Pb={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},c(Pb,"tcl",Ob,"",e,d),Pb)),b((Qb=f("twig",".twig","apply autoescape block deprecated do embed extends flush for from if import include macro sandbox set use verbatim with endapply endautoescape endblock endembed endfor endif endmacro endsandbox endset endwith true false".split(i),""),Rb={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},c(Rb,"twig",Qb,"",e,d),Rb)),b((Sb=f(xg,".typespec",[],h),Tb={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},c(Tb,xg,Sb,h,e,d),Tb)),b((Ub=f("vb",".vb","AddHandler AddressOf Alias And AndAlso As Async Boolean ByRef Byte ByVal Call Case Catch CBool CByte CChar CDate CDbl CDec Char CInt Class CLng CObj Const Continue CSByte CShort CSng CStr CType CUInt CULng CUShort Date Decimal Declare Default Delegate Dim DirectCast Do Double Each Else ElseIf End EndIf Enum Erase Error Event Exit False Finally For Friend Function Get GetType GetXMLNamespace Global GoSub".split(i),R),Vb={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},c(Vb,"vb",Ub,R,e,d),Vb)),b((Wb=f("wgsl",".wgsl",[],h),Xb={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},c(Xb,"wgsl",Wb,h,e,d),Xb)),b((Yb=f("xml",".xml",[],""),Zb={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},c(Zb,"xml",Yb,"",e,d),Zb)),b(($b=f("yaml",".yaml","true True TRUE false False FALSE null Null Null ~".split(i),x),_b={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},c(_b,"yaml",$b,x,e,d),_b)));let bc={editor:Xh(),languages:Wh(),Uri:Vh(),MarkerSeverity:{Hint:xh,Info:yh,Warning:zh,Error:ve},KeyMod:Uh(),CompletionItemKind:tf()},ac=ri();ac.monaco=bc;ac.__lilEditor=!0;return bc},l="string",q="comment",m="root",d="*/",e="/*",h="//",qd='<div class="separator"></div>',U="stringS",Va="attribute.value",E="none",rd="editor.action.formatDocument",sd="editor.action.goToDefinition",td="editor.action.goToReferences",If="editor.action.addSelectionToNextFindMatch",da="keyboard",Wa="string.escape",Jf="editor.action.referenceSearch.trigger",sb="pointer-events",Ia="background",Kf="editor.action.clipboardPasteAction",i=" ",Lf="editor.action.clipboardCopyAction",sa="position",Mf="editor.action.clipboardCutAction",ud="editor.action.rename",Nf="editor.action.insertLineAfter",Of="editor.action.triggerSuggest",Pf="editor.action.peekDefinition",Qf="editor.action.quickCommand",N="div",Rf="editor.action.marker.next",Sf="editor.action.commentLine",ea="block",Tf="editor.action.deleteLines",ta="number",Xa="absolute",Uf="editor.action.gotoSymbol",Vf="editor.action.changeAll",tb="plaintext",dc="white-space",Wf="editor.action.gotoLine",$='\\"',ec="identifier",fc='[^\\\\"]+',ua="delim",ub="tstringS",I="\n",Xf="documentFormatting",L="px",gc="mousedown",vd="getAttribute",vb="tstring",wb="stringT",Yf="1px solid #454545",x="#",Zf="restructuredtext",$f="cursorWordSelect",va="iter",_f="[a-zA-Z_][\\w]*",xb="</div>",fa="tag",Ya="\\\\.",Ja="flex",hc="display",ag="monaco-editor ",ic="keydown",wd="font-size",bg="systemverilog",cg="signatureHelp",yb="false",zb="input",Ab="width",Bb="Enter",jc="height",dg='\\"\\"\\"',eg="[{}()\\[\\]]",fg="objective-c",gg="freemarker2",hg="data-monaco",xd="keyword",ga="--",ig="powershell",jg="powerquery",kg="handlebars",lg="dockerfile",mg="completion",ng="definition",og="codeAction",kc="color",lc="value",Cb="wrap",Db="left",pg="insertText",qg="deleteLeft",rg="typescript",sg="javascript",mc="attrS",tg="pascaligo",Za="off",$a="top",yd="Escape",ug="undefined",vg="ArrowDown",wg="[^\\\\']+",xg="typespec",yg="solidity",zg="redshift",Ag="protobuf",Bg="postiats",Cg="cameligo",Dg="language",Eg="relative",Fg="overflow",Gg="pre-wrap",Hg="data-cmd",Ig="markdown",nc="code",Jg='[^\\"]+',oc="attr",Kg="inmemory",zd="[^*]+",Ad="[^']+",Bd="label",R="'",Lg="COMMENT",Mg="graphql",Ng="clojure",Og="1 1 50%",Pg="#aeafad",Qg="z-index",Rg="#252526",Sg="padding",Tg="replace",Ug="ArrowUp",Vg="</span>",Wg="#000000",Cd="file",Dd="/\\*",Ed="\\d+",Fd="\\*/",Gd="auto",Eb="\t";let $lh0=(function(){const KEYWORDS={javascript:"break case catch class const continue debugger default delete do else export extends false finally for function if import in instanceof let new null return super switch this throw true try typeof undefined var void while with yield async await of static get set constructor",typescript:"break case catch class const continue debugger default delete do else export extends false finally for function if import in instanceof let new null return super switch this throw true try typeof undefined var void while with yield async await of static get set constructor type interface enum implements package private protected public readonly namespace abstract as asserts keyof infer never unknown any boolean number string unique satisfies",python:"False None True and as assert async await break class continue def del elif else except finally for from global if import in is lambda nonlocal not or pass raise return try while with yield match case",json:"true false null",};function keywordSet(id){const raw=KEYWORDS[id]??(id==="javascript"||id==="typescript"?KEYWORDS.typescript:"");return new Set(raw.split(" ").filter(Boolean))}function escapeHtml(text){return String(text??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function tokenClass(type){if(type.includes("comment"))return"mtk-comment";if(type.includes("string"))return"mtk-string";if(type.includes("regexp"))return"mtk-regexp";if(type.includes("number"))return"mtk-number";if(type.includes("keyword"))return"mtk-keyword";if(type.includes("type"))return"mtk-type";if(type.includes("function"))return"mtk-function";if(type.includes("tag"))return"mtk-tag";if(type.includes("attribute")||type.includes("attr"))return"mtk-attr";if(type.includes("key"))return"mtk-attr";return"mtk"}function pushToken(out,offset,type,text){if(!text)return;out.push({offset,type,text})}function tokenizeCLike(line,keywords,state){const out=[];let i=0;let mode=state.mode;while(i<line.length){if(mode==="block"){const end=line.indexOf("*/",i);if(end<0){pushToken(out,i,"comment",line.slice(i));return{tokens:out,mode:"block"}}pushToken(out,i,"comment",line.slice(i,end+2));i=end+2;mode="root";continue}const rest=line.slice(i);const two=rest.slice(0,2);if(two==="//"){pushToken(out,i,"comment",rest);break}if(two==="/*"){const end=rest.indexOf("*/");if(end<0){pushToken(out,i,"comment",rest);return{tokens:out,mode:"block"}}pushToken(out,i,"comment",rest.slice(0,end+2));i+=end+2;continue}if(rest[0]==='"'||rest[0]==="'"||rest[0]==="`"){const q=rest[0];let j=1;while(j<rest.length){if(rest[j]==="\\"){j+=2;continue}if(rest[j]===q){j+=1;break}j+=1}pushToken(out,i,"string",rest.slice(0,j));i+=j;continue}if(rest[0]==="/"&&/[^/\s]/.test(rest[1]??"")&&!/[a-zA-Z0-9_)]/.test(line[i-1]??"")){let j=1;while(j<rest.length&&rest[j]!=="/"){if(rest[j]==="\\")j+=2;else j+=1}if(rest[j]==="/"){j+=1;while(/[gimsuy]/.test(rest[j]??""))j+=1;pushToken(out,i,"regexp",rest.slice(0,j));i+=j;continue}}const num=rest.match(/^(0x[0-9a-fA-F]+|\d+\.\d+([eE][+-]?\d+)?|\d+)/);if(num){pushToken(out,i,"number",num[0]);i+=num[0].length;continue}const word=rest.match(/^[A-Za-z_$][\w$]*/);if(word){const next=line.slice(i+word[0].length).match(/^\s*\(/);let type="identifier";if(keywords.has(word[0]))type="keyword";else if(/^[A-Z]/.test(word[0]))type="type";else if(next)type="function";pushToken(out,i,type,word[0]);i+=word[0].length;continue}pushToken(out,i,"mtk",rest[0]);i+=1}return{tokens:out,mode}}function tokenizeJson(line){const out=[];let i=0;while(i<line.length){const rest=line.slice(i);if(rest[0]==='"'){let j=1;while(j<rest.length&&rest[j]!=='"'){if(rest[j]==="\\")j+=2;else j+=1}j=Math.min(rest.length,j+1);const after=line.slice(i+j).match(/^\s*:/);pushToken(out,i,after?"key":"string",rest.slice(0,j));i+=j;continue}const num=rest.match(/^-?\d+(\.\d+)?([eE][+-]?\d+)?/);if(num){pushToken(out,i,"number",num[0]);i+=num[0].length;continue}const word=rest.match(/^(true|false|null)/);if(word){pushToken(out,i,"keyword",word[0]);i+=word[0].length;continue}pushToken(out,i,"mtk",rest[0]);i+=1}return{tokens:out,mode:"root"}}function tokenizeHtml(line,state){const out=[];let i=0;let mode=state.mode;while(i<line.length){const rest=line.slice(i);if(mode==="comment"){const end=rest.indexOf("-->");if(end<0){pushToken(out,i,"comment",rest);return{tokens:out,mode:"comment"}}pushToken(out,i,"comment",rest.slice(0,end+3));i+=end+3;mode="root";continue}if(rest.startsWith("<!--")){const end=rest.indexOf("-->");if(end<0){pushToken(out,i,"comment",rest);return{tokens:out,mode:"comment"}}pushToken(out,i,"comment",rest.slice(0,end+3));i+=end+3;continue}if(rest[0]==="<"){const m=rest.match(/^<\/?[\w:-]+/);if(m){pushToken(out,i,"tag",m[0]);i+=m[0].length;continue}}const attr=rest.match(/^[\w:-]+=/);if(attr){pushToken(out,i,"attr",attr[0].slice(0,-1));pushToken(out,i+attr[0].length-1,"mtk","=");i+=attr[0].length;continue}if(rest[0]==='"'||rest[0]==="'"){const q=rest[0];let j=1;while(j<rest.length&&rest[j]!==q)j+=1;j=Math.min(rest.length,j+1);pushToken(out,i,"string",rest.slice(0,j));i+=j;continue}pushToken(out,i,"mtk",rest[0]);i+=1}return{tokens:out,mode}}function tokenizeCss(line,state){const out=[];let i=0;let mode=state.mode;while(i<line.length){const rest=line.slice(i);if(mode==="block"){const end=rest.indexOf("*/");if(end<0){pushToken(out,i,"comment",rest);return{tokens:out,mode:"block"}}pushToken(out,i,"comment",rest.slice(0,end+2));i+=end+2;mode="root";continue}if(rest.startsWith("/*")){const end=rest.indexOf("*/");if(end<0){pushToken(out,i,"comment",rest);return{tokens:out,mode:"block"}}pushToken(out,i,"comment",rest.slice(0,end+2));i+=end+2;continue}if(rest[0]==='"'||rest[0]==="'"){const q=rest[0];let j=1;while(j<rest.length&&rest[j]!==q)j+=1;j=Math.min(rest.length,j+1);pushToken(out,i,"string",rest.slice(0,j));i+=j;continue}const num=rest.match(/^-?[\d.]+(px|em|rem|%|vh|vw|s|ms)?/);if(num){pushToken(out,i,"number",num[0]);i+=num[0].length;continue}const word=rest.match(/^[A-Za-z_-][\w-]*/);if(word){const type=rest.slice(word[0].length).match(/^\s*:/)?"attr":"keyword";pushToken(out,i,type,word[0]);i+=word[0].length;continue}pushToken(out,i,"mtk",rest[0]);i+=1}return{tokens:out,mode}}function tokenizeMarkdown(line){const out=[];if(/^#{1,6}\s/.test(line)){pushToken(out,0,"keyword",line);return{tokens:out,mode:"root"}}if(/^```/.test(line)){pushToken(out,0,"string",line);return{tokens:out,mode:"root"}}let i=0;while(i<line.length){const rest=line.slice(i);const code=rest.match(/^`[^`]+`/);if(code){pushToken(out,i,"string",code[0]);i+=code[0].length;continue}pushToken(out,i,"mtk",rest[0]);i+=1}return{tokens:out,mode:"root"}}function tokenizePython(line,keywords,state){if(state.mode==="block"){const end=line.indexOf('"""');if(end<0)return{tokens:[{offset:0,type:"comment",text:line}],mode:"block"};return tokenizeCLike(line,keywords,{mode:"root"})}if(line.trimStart().startsWith("#")){return{tokens:[{offset:0,type:"comment",text:line}],mode:"root"}}return tokenizeCLike(line,keywords,state)}function tokenizeLine(languageId,line,state){if(languageId==="json")return tokenizeJson(line);if(languageId==="html")return tokenizeHtml(line,state);if(languageId==="css")return tokenizeCss(line,state);if(languageId==="markdown")return tokenizeMarkdown(line);if(languageId==="python")return tokenizePython(line,keywordSet("python"),state);if(languageId==="javascript"||languageId==="typescript"){return tokenizeCLike(line,keywordSet(languageId),state)}return{tokens:[{offset:0,type:"mtk",text:line}],mode:"root"}}function tokensToHtml(tokens){let html="";for(const tok of tokens){html+=`<span class="${tokenClass(tok.type)}">${escapeHtml(tok.text)}</span>`}return html||"<span>&nbsp;</span>"}function expandTabs(line,tabSize){const size=tabSize>0?tabSize:4;let out="";let col=0;for(const ch of line){if(ch==="\t"){const n=size-(col%size);out+=" ".repeat(n);col+=n}else{out+=ch;col+=1}}return out}function measureCharWidth(el,fontSize){const canvas=document.createElement("canvas");const ctx=canvas.getContext("2d");if(!ctx)return 8;const win=el?.ownerDocument?.defaultView;const cs=win&&typeof win.getComputedStyle==="function"?win.getComputedStyle(el):null;ctx.font=cs&&cs.font?cs.font:`${fontSize||14}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`;const w=ctx.measureText("m").width;return w>1?w:8}function findMatches(lines,query){if(!query)return[];const hits=[];for(let i=0;i<lines.length;i++){let from=0;while(from<=lines[i].length){const at=lines[i].indexOf(query,from);if(at<0)break;hits.push({line:i+1,start:at+1,end:at+query.length+1});from=at+Math.max(1,query.length)}}return hits}function matchBracket(lines,line,col){const pairs={"(":")","[":"]","{":"}"};const close={")":"(","]":"[","}":"{"};const text=lines.join("\n");let offset=0;for(let i=0;i<line-1;i++)offset+=lines[i].length+1;offset+=col-1;if(offset<0||offset>=text.length)return null;const ch=text[offset];if(pairs[ch]){let depth=1;for(let i=offset+1;i<text.length;i++){if(text[i]===ch)depth++;else if(text[i]===pairs[ch]){depth--;if(depth===0)return i}}}if(close[ch]){let depth=1;for(let i=offset-1;i>=0;i--){if(text[i]===ch)depth++;else if(text[i]===close[ch]){depth--;if(depth===0)return i}}}return null}function offsetToPos(lines,offset){let left=offset;for(let i=0;i<lines.length;i++){if(left<=lines[i].length)return{line:i+1,column:left+1};left-=lines[i].length+1}return{line:lines.length,column:(lines[lines.length-1]??"").length+1}}function foldHidden(folds,line){for(const f of folds){if(f.collapsed&&line>f.start&&line<=f.end)return true}return false}function hiddenBefore(folds,line){let n=0;for(const f of folds){if(f.collapsed&&f.end<line)n+=f.end-f.start}return n}function indentCols(line){const m=String(line??"").match(/^[\t ]*/);return(m?m[0]:"").replace(/\t/g,"  ").length}function foldStarts(folds,line){return folds.find((f)=>f.start===line)??null}function bindMarginOnce(margin){if(!margin||margin.getAttribute("data-fold-bound")==="1")return;margin.setAttribute("data-fold-bound","1");margin.addEventListener("mousedown",(ev)=>{const hit=ev.target?.closest?.("[data-fold]");if(!hit)return;ev.preventDefault();ev.stopPropagation();const line=Number(hit.getAttribute("data-fold"));globalThis.__lilChrome?.toggleFoldAt?.(line)})}function bindMinimapOnce(minimap){if(!minimap||minimap.getAttribute("data-nav-bound")==="1")return;minimap.setAttribute("data-nav-bound","1");minimap.addEventListener("mousedown",(ev)=>{const ed=globalThis.monaco?.editor?.getEditors?.()?.[0];const model=ed?.getModel?.();if(!ed||!model)return;const rect=minimap.getBoundingClientRect();const y=ev.clientY-rect.top;const line=Math.max(1,Math.min(model.getLineCount(),Math.floor((y/Math.max(1,rect.height))*model.getLineCount())+1));ed.setPosition({lineNumber:line,column:1});ed.revealLine?.(line);ed.focus?.()})}let cssInjected=false;function injectCss(){if(cssInjected||typeof document==="undefined")return;cssInjected=true;const style=document.createElement("style");style.textContent=`
@keyframes lil-cursor-blink{0%,49%{opacity:1}50%,100%{opacity:0}}
.monaco-editor .view-lines{position:relative;font-variant-ligatures:none}
.monaco-editor .view-line{position:absolute;left:0;right:0;white-space:pre;padding-left:0}
.monaco-editor .line-number{position:absolute;left:0;right:8px;color:#858585;text-align:right;user-select:none}
.monaco-editor .current-line{position:absolute;left:0;right:0;background:rgba(255,255,255,.04);pointer-events:none}
.monaco-editor .selected-text{position:absolute;background:rgba(38,79,120,.45);pointer-events:none}
.monaco-editor .find-match{position:absolute;background:rgba(234,192,98,.28);pointer-events:none}
.monaco-editor .bracket-match{position:absolute;border-bottom:1px solid #888;pointer-events:none}
.monaco-editor .word-highlight{position:absolute;pointer-events:none}
.monaco-editor .indent-guide{position:absolute;width:1px;background:rgba(255,255,255,.08);pointer-events:none}
.monaco-editor .folding{cursor:pointer;display:inline-block;width:12px;color:#c5c5c5}
.monaco-editor .folded-hint{opacity:.55;color:#808080}

.monaco-editor .mtk{color:#d4d4d4}
.monaco-editor .mtk-keyword{color:#569cd6}
.monaco-editor .mtk-string{color:#ce9178}
.monaco-editor .mtk-comment{color:#6a9955}
.monaco-editor .mtk-number{color:#b5cea8}
.monaco-editor .mtk-type{color:#4ec9b0}
.monaco-editor .mtk-function{color:#dcdcaa}
.monaco-editor .mtk-tag{color:#569cd6}
.monaco-editor .mtk-attr{color:#9cdcfe}
.monaco-editor .mtk-regexp{color:#d16969}
.monaco-editor .margin{position:relative;background:#1e1e1e;border-right:1px solid #2b2b2b}
.monaco-editor .find-widget input{background:#3c3c3c;border:1px solid #3c3c3c;color:#ccc;margin:2px;padding:4px 6px}
.monaco-editor .find-widget button{background:#0e639c;border:none;color:#fff;margin:2px;padding:4px 8px;cursor:pointer}
.monaco-editor textarea.inputarea{z-index:6}
`;document.head.appendChild(style)}const paintState=new WeakMap();function hostPaintEditor(linesHost,margin,selectionHost,cursorEl,minimap,textarea,value,languageId,lineHeight,width,height,scrollTop,showLineNumbers,showMinimap,theme,selStartLine,selStartCol,posLine,posCol,findQuery,wordWrap,tabSize,){if(!linesHost)return 8;injectCss();const rawLines=String(value??"").split("\n");const lines=rawLines.map((line)=>expandTabs(line,tabSize|0||4));const lh=Math.max(1,lineHeight|0||19);const charWidth=measureCharWidth(linesHost,14);const dark=theme==="vs-dark"||theme==="hc-black";const models=globalThis.monaco?.editor?.getModels?.()??[];const current=models.find((m)=>m.getValue?.()===String(value??""));const folds=current?._paintFolds??[];const visibleCount=lines.length-folds.reduce((n,f)=>n+(f.collapsed?f.end-f.start:0),0);const totalH=Math.max(lh,visibleCount*lh);const paintHeight=(height|0)>0?(height|0):Math.min(2400,Math.max(lh*24,visibleCount*lh));let state={mode:"root"};const vis=Math.max(12,Math.ceil(paintHeight/lh)+8);const visualStart=Math.max(0,Math.floor((scrollTop|0)/lh)-2);linesHost.style.position="relative";linesHost.style.height=totalH+"px";linesHost.style.whiteSpace=wordWrap?"pre-wrap":"pre";if(margin){margin.style.position="relative";margin.style.height=totalH+"px";margin.style.background=dark?"#1e1e1e":"#f3f3f3";bindMarginOnce(margin)}function yOf(line){return(line-1-hiddenBefore(folds,line))*lh}const visualLines=[];for(let i=0;i<lines.length;i++){const line=i+1;if(foldHidden(folds,line))continue;visualLines.push(line)}const from=Math.min(visualLines.length,visualStart);const to=Math.min(visualLines.length,from+vis);for(let i=0;i<(visualLines[from]??1)-1;i++){state=tokenizeLine(languageId||"plaintext",lines[i],state)}let linesHtml="";let marginHtml="";for(let v=from;v<to;v++){const line=visualLines[v];const i=line-1;const tok=tokenizeLine(languageId||"plaintext",lines[i],state);state={mode:tok.mode};const top=yOf(line);const currentLine=line===(posLine|0);const fold=foldStarts(folds,line);const foldedHint=fold?.collapsed?`<span class="folded-hint"> ⋯</span>`:"";linesHtml+=`<div class="view-line${currentLine?" current":""}" data-line="${line}" style="top:${top}px;height:${lh}px">${tokensToHtml(tok.tokens)}${foldedHint}</div>`;if(showLineNumbers){const glyph=fold?`<span class="folding" data-fold="${line}">${fold.collapsed?"▶":"▼"}</span>`:`<span class="folding"></span>`;marginHtml+=`<div class="line-number" data-line="${line}" style="top:${top}px;height:${lh}px;line-height:${lh}px">${glyph}${line}</div>`}}linesHost.innerHTML=linesHtml;if(margin)margin.innerHTML=marginHtml;const selHtml=[];function paintSel(sl,sc,eline,ec){if(sl>eline||(sl===eline&&sc>ec)){const tl=sl;const tc=sc;sl=eline;sc=ec;eline=tl;ec=tc}if(sl===eline&&sc===ec)return;for(let line=sl;line<=eline;line++){if(foldHidden(folds,line))continue;const startCol=line===sl?sc:1;const endCol=line===eline?ec:(lines[line-1]??"").length+1;const left=(Math.max(1,startCol)-1)*charWidth;const widthPx=Math.max(charWidth*0.4,(endCol-startCol)*charWidth);selHtml.push(`<div class="selected-text" style="top:${yOf(line)}px;left:${left}px;width:${widthPx}px;height:${lh}px"></div>`)}}paintSel(selStartLine|0,selStartCol|0,posLine|0,posCol|0);const extraSels=globalThis.monaco?.editor?.getEditors?.()?.[0]?.getSelections?.()??[];for(let i=1;i<extraSels.length;i++){const s=extraSels[i];paintSel(s.startLineNumber,s.startColumn,s.endLineNumber,s.endColumn)}if(!foldHidden(folds,posLine|0)){selHtml.push(`<div class="current-line" style="top:${yOf(posLine|0)}px;height:${lh}px"></div>`)}const tab=tabSize|0||2;for(let v=from;v<to;v++){const line=visualLines[v];const width=indentCols(lines[line-1]??"");for(let col=tab;col<=width;col+=tab){selHtml.push(`<div class="indent-guide core-guide" style="top:${yOf(line)}px;left:${col*charWidth}px;height:${lh}px"></div>`)}}const q=String(findQuery??"");if(q.length>0){for(const hit of findMatches(lines,q)){if(foldHidden(folds,hit.line))continue;const left=(hit.start-1)*charWidth;const widthPx=Math.max(charWidth,(hit.end-hit.start)*charWidth);selHtml.push(`<div class="find-match" style="top:${yOf(hit.line)}px;left:${left}px;width:${widthPx}px;height:${lh}px"></div>`)}}const br=matchBracket(rawLines,posLine|0,posCol|0);if(br!=null){const other=offsetToPos(rawLines,br);for(const p of[{line:posLine|0,column:posCol|0},other,]){if(foldHidden(folds,p.line))continue;selHtml.push(`<div class="bracket-match" style="top:${yOf(p.line)}px;left:${(p.column-1)*charWidth}px;width:${charWidth}px;height:${lh}px"></div>`)}}const marks=current?._paintMarkers??[];for(const m of marks){const line=m.line|1;if(foldHidden(folds,line))continue;const sc=m.sc|1;const ec=Math.max(sc+1,m.ec|(sc+1));const color=(m.severity|0)>=8?"#f14c4c":"#cca700";selHtml.push(`<div style="position:absolute;top:${yOf(line)+lh-3}px;left:${(sc-1)*charWidth}px;width:${Math.max(charWidth,(ec-sc)*charWidth)}px;height:3px;background:${color};pointer-events:none"></div>`,)}const highs=current?._paintHighlights??[];for(const h of highs){if(foldHidden(folds,h.line|1))continue;const left=((h.sc|1)-1)*charWidth;const widthPx=Math.max(charWidth,((h.ec|1)-(h.sc|1))*charWidth);selHtml.push(`<div class="word-highlight" style="top:${yOf(h.line|1)}px;left:${left}px;width:${widthPx}px;height:${lh}px;background:rgba(87,131,196,.28)"></div>`,)}if(selectionHost){selectionHost.style.position="absolute";selectionHost.style.inset="0";selectionHost.style.pointerEvents="none";selectionHost.innerHTML=selHtml.join("")}const caretTop=yOf(posLine|0);const caretLeft=((posCol|0)-1)*charWidth;if(cursorEl){cursorEl.style.top=caretTop+"px";cursorEl.style.left=caretLeft+"px";cursorEl.style.height=lh+"px";cursorEl.style.width="2px";cursorEl.style.background=dark?"#aeafad":"#000";cursorEl.style.display=foldHidden(folds,posLine|0)?"none":"block"}if(textarea){textarea.style.position="absolute";textarea.style.top=caretTop+"px";textarea.style.left=caretLeft+56+"px";textarea.style.width="1px";textarea.style.height=lh+"px";textarea.style.opacity="0";textarea.style.zIndex="8";textarea.style.pointerEvents="none";if(document.activeElement!==textarea){textarea.value=""}}if(minimap&&showMinimap){const w=64;const h=Math.max(1,height|0);minimap.width=w;minimap.height=h;minimap.style.display="block";bindMinimapOnce(minimap);const ctx=minimap.getContext("2d");if(ctx){ctx.fillStyle=dark?"#1e1e1e":"#f3f3f3";ctx.fillRect(0,0,w,h);ctx.fillStyle=dark?"#5a5a5a":"#6e6e6e";const row=Math.max(1,h/Math.max(1,lines.length));for(let i=0;i<lines.length;i++){const len=Math.min(60,lines[i].length);if(len>0)ctx.fillRect(2,i*row,len,Math.max(1,row))}ctx.fillStyle="#f14c4c";for(const m of marks){ctx.fillRect(w-4,((m.line|1)-1)*row,3,Math.max(2,row))}ctx.fillStyle="rgba(255,255,255,0.08)";const viewY=((scrollTop|0)/Math.max(1,totalH))*h;ctx.fillRect(0,viewY,w,Math.max(8,(height/Math.max(1,totalH))*h))}}else if(minimap&&!showMinimap){minimap.style.display="none"}paintState.set(linesHost,{charWidth,lineHeight:lh,lines,visualLines,folds,scrollable:linesHost.parentElement});return charWidth|0}function hostCoordsToPosition(scrollable,linesHost,clientX,clientY,lineHeight,charWidth,scrollTop){const state=linesHost?paintState.get(linesHost):null;const lh=state?.lineHeight||lineHeight||19;const cw=state?.charWidth||charWidth||8;const el=scrollable||linesHost;const rect=el.getBoundingClientRect();const y=clientY-rect.top+(el.scrollTop|scrollTop|0);const x=clientX-rect.left;let line=Math.floor(y/lh);const visual=state?.visualLines;if(visual&&visual.length){if(line<0)line=0;if(line>=visual.length)line=visual.length-1;line=visual[line]}else{line=line+1;const max=state?.lines?.length||1;if(line<1)line=1;if(line>max)line=max}let col=Math.floor(x/cw)+1;const lineLen=(state?.lines?.[line-1]??"").length+1;if(col<1)col=1;if(col>lineLen)col=lineLen;return[line,col]}function eventIsComposing(event){return!!(event&&event.isComposing)}function eventDeltaY(event){return event&&event.deltaY?event.deltaY|0:0}function hostStyleFindWidget(findWidget,findInput,replaceInput){if(!findWidget||findWidget.getAttribute("data-ready")==="1")return;findWidget.setAttribute("data-ready","1");const next=document.createElement("button");next.textContent="Next";next.setAttribute("data-find","next");const prev=document.createElement("button");prev.textContent="Prev";prev.setAttribute("data-find","prev");const repl=document.createElement("button");repl.textContent="Replace";repl.setAttribute("data-find","replace");const all=document.createElement("button");all.textContent="All";all.setAttribute("data-find","all");findWidget.appendChild(next);findWidget.appendChild(prev);findWidget.appendChild(repl);findWidget.appendChild(all)};return {get "hostPaintEditor"(){return hostPaintEditor},get "hostCoordsToPosition"(){return hostCoordsToPosition},get "eventIsComposing"(){return eventIsComposing},get "eventDeltaY"(){return eventDeltaY},get "hostStyleFindWidget"(){return hostStyleFindWidget}}})();let $lh1=(function(h0){function stringSlice(s,start,end){if(end===undefined)return s.slice(start);return s.slice(start,end)}function stringReplace(s,pattern,replacement){return s.replace(pattern,replacement)}function stringSplit(s,sep){return s.split(sep)}function stringFromCharCode1(a){return String.fromCharCode(a)}function newRegexp(pattern,flags=""){return new RegExp(pattern,flags)}function regexTest(re,s){return re.test(s)}function regexExec(re,s){return re.exec(s)}function regexLastIndex(re){return re.lastIndex}function regexSetLastIndex(re,value){re.lastIndex=value}function dateNow(){return Date.now()}function mathRandom(){return Math.random()}function scheduleTimeoutMs(fn,ms){return setTimeout(fn,ms)}function clearTimeoutId(id){clearTimeout(id)}function requestAnimationFrameOrNull(fn){const raf=(globalThis).requestAnimationFrame;if(typeof raf==="function")return raf.call(globalThis,fn);return setTimeout(()=>fn(Date.now()),16)}function createElement(tag){return document.createElement(tag)}function domCreateElement(tag){return document.createElement(tag)}function createTextNode(text){return document.createTextNode(text)}function appendChild(parent,child){return parent.appendChild(child)}function removeChild(parent,child){return parent.removeChild(child)}function setTextContent(el,text){el.textContent=text}function getTextContent(el){return el.textContent??""}function setInnerHTML(el,html){el.innerHTML=html}function getInnerHTML(el){return el.innerHTML}function setClassName(el,name){el.className=name}function setStyle(el,prop,value){el.style.setProperty(prop,value)}function setAttribute(el,name,value){el.setAttribute(name,value)}function addEventListener(target,eventName,handler,capture=false){target.addEventListener(eventName,handler,capture)}function removeEventListener(target,eventName,handler,capture=false){target.removeEventListener(eventName,handler,capture)}function focusElement(el){el.focus()}function getClientWidth(el){return el.clientWidth|0}function getClientHeight(el){return el.clientHeight|0}function getScrollTop(el){return el.scrollTop|0}function setScrollTop(el,value){el.scrollTop=value}function getScrollHeight(el){return el.scrollHeight|0}function preventDefault(event){event.preventDefault()}function stopPropagation(event){event.stopPropagation()}function eventKey(event){return event.key}function eventCode(event){return event.code}function eventKeyCode(event){return event.keyCode|0}function eventCtrlKey(event){return event.ctrlKey||event.metaKey}function eventShiftKey(event){return event.shiftKey}function eventAltKey(event){return event.altKey}function eventInputValue(event){const t=event.target;return t&&typeof t.value==="string"?t.value:""}function inputSetValue(el,value){el.value=value}function inputGetValue(el){return el.value}function canvasGetContext2d(canvas){try{return canvas.getContext("2d")}catch{return null}}function canvasSetSize(canvas,width,height){canvas.width=width;canvas.height=height}function canvasFillRect(ctx,x,y,w,h,color){if(!ctx){return}ctx.fillStyle=color;ctx.fillRect(x,y,w,h)}function clearChildren(el){while(el.firstChild){el.removeChild(el.firstChild)}}function setTabIndex(el,value){el.tabIndex=value}function getClipboardText(){if(navigator.clipboard&&navigator.clipboard.readText){return navigator.clipboard.readText()}return Promise.resolve("")}function setClipboardText(text){memoryClipboard=text;if(navigator.clipboard&&navigator.clipboard.writeText){return navigator.clipboard.writeText(text)}return Promise.resolve()}let memoryClipboard="";function clipboardRead(){return memoryClipboard}function clipboardWrite(text){memoryClipboard=text;try{void navigator.clipboard?.writeText(text)}catch{}}function clipboardReadEvent(event){const data=event.clipboardData?.getData("text/plain");if(typeof data==="string"&&data.length>0){memoryClipboard=data;return data}return memoryClipboard}function clipboardWriteEvent(event,text){memoryClipboard=text;event.clipboardData?.setData("text/plain",text)}function eventClientX(event){return event.clientX|0}function eventClientY(event){return event.clientY|0}function eventButton(event){return event.button|0}function eventDetail(event){return event.detail|0}function rectLeft(el){return el.getBoundingClientRect().left|0}function rectTop(el){return el.getBoundingClientRect().top|0}function getScrollLeft(el){return el.scrollLeft|0}function setScrollLeft(el,value){el.scrollLeft=value}function blurElement(el){el.blur()}function setPlaceholder(el,value){el.placeholder=value}function setDisplay(el,value){el.style.display=value}function classListAdd(el,name){el.classList.add(name)}function classListRemove(el,name){el.classList.remove(name)}function hostCall(obj,name,a,b,c){if(obj==null){return undefined}const fn=obj[name];if(typeof fn!=="function"){return undefined}try{return fn.call(obj,a,b,c)}catch(err){console.warn("hostCall",name,err);return undefined}}function hostThen(value,cb){if(value&&typeof value.then==="function"){value.then(cb,()=>cb(undefined));return}cb(value)}function jsArrayLen(value){if(Array.isArray(value)){return value.length}if(value&&Array.isArray(value.suggestions)){return value.suggestions.length}if(value&&Array.isArray(value.items)){return value.items.length}if(value&&Array.isArray(value.lenses)){return value.lenses.length}if(value&&Array.isArray(value.symbols)){return value.symbols.length}if(value&&Array.isArray(value.contents)){return value.contents.length}return 0}function jsArrayAt(value,index){if(Array.isArray(value)){return value[index]}const arr=value?.suggestions??value?.items??value?.lenses??value?.symbols??value?.contents;return Array.isArray(arr)?arr[index]:undefined}function jsPropString(value,key,fallback=""){if(value==null){return fallback}const v=value[key];if(v==null){return fallback}if(typeof v==="string"){return v}if(typeof v==="object"&&typeof v.value==="string"){return v.value}if(typeof v==="object"&&typeof v.label==="string"){return v.label}return String(v)}function jsPropInt(value,key,fallback=0){if(value==null){return fallback}const v=value[key];return typeof v==="number"?(v|0):fallback}function emptyBuf(){return Array(1).join("")}function beginIdList(holder){holder._ids=[]}function pushId(holder,id){holder._ids.push(id|0)}function takeIdList(holder){const out=holder._ids??[];holder._ids=[];return out}function concat2(a,b){return a+b}function pushNewBuffer(tree,text,lineStarts){const buf={buffer:text,lineStarts};tree.tmpBuffer=buf;tree.buffers.push(buf)}function makeNodePos(node,remainder,start){const rem=remainder|0;const off=start|0;const pos=[node,rem,off];pos.node=node;pos.remainder=rem;pos.nodeStartOffset=off;return pos}function hostNodeNext(node,sentinel){if(node.right!==sentinel){let cur=node.right;while(cur.left!==sentinel){cur=cur.left}return cur}let cur=node;let guard=0;while(cur.parent!==sentinel&&guard<100000){guard++;if(cur.parent.left===cur){break}cur=cur.parent}if(cur.parent===sentinel||guard>=100000){return sentinel}return cur.parent}function hostAccumulatedValue(tree,node,index){if(index<0){return 0}const piece=node.piece;const lineStarts=tree.buffers[piece.bufferIndex].lineStarts;const expected=(piece.start.line+index+1)|0;if(expected>piece.end.line){return((lineStarts[piece.end.line]|0)+piece.end.column-(lineStarts[piece.start.line]|0)-piece.start.column)|0}return((lineStarts[expected]|0)-(lineStarts[piece.start.line]|0)-piece.start.column)|0}function hostOffsetOfNode(tree,node){let pos=node.size_left|0;let cur=node;while(cur!==tree.root){if(cur.parent.right===cur){pos=(pos+(cur.parent.size_left|0)+cur.parent.piece.length)|0}cur=cur.parent}return pos}function hostNodeAt(tree,offset,sentinel){offset=offset|0;if(tree.cacheValid){const cached=tree.cacheNode;const cStart=tree.cacheNodeStartOffset|0;const cLen=cached.piece.length|0;if(cStart<=offset&&cStart+cLen>=offset){return makeNodePos(cached,offset-cStart,cStart)}}let rest=offset;let x=tree.root;let nodeStartOffset=0;let guard=0;while(x!==sentinel&&guard<100000){const sizeLeft=x.size_left|0;const pieceLen=x.piece.length|0;if(sizeLeft>rest){x=x.left}else if(sizeLeft+pieceLen>=rest){nodeStartOffset=(nodeStartOffset+sizeLeft)|0;tree.cacheNode=x;tree.cacheNodeStartOffset=nodeStartOffset;tree.cacheNodeStartLineNumber=0;tree.cacheHasLine=false;tree.cacheValid=true;return makeNodePos(x,rest-sizeLeft,nodeStartOffset)}else{rest=(rest-sizeLeft-pieceLen)|0;nodeStartOffset=(nodeStartOffset+sizeLeft+pieceLen)|0;x=x.right}guard++}return makeNodePos(sentinel,0,nodeStartOffset)}function hostNodeAt2(tree,lineNumber,column,sentinel){let line=lineNumber|0;let col=column|0;let x=tree.root;let nodeStartOffset=0;let guard=0;while(x!==sentinel&&guard<100000){const lfLeft=x.lf_left|0;const pieceLf=x.piece.lineFeedCnt|0;const xLeft=x.left;if(xLeft!==sentinel&&lfLeft>=line-1){x=xLeft}else if(lfLeft+pieceLf>line-1){const prevAccumulatedValue=hostAccumulatedValue(tree,x,line-lfLeft-2);const accumulatedValue=hostAccumulatedValue(tree,x,line-lfLeft-1);nodeStartOffset=(nodeStartOffset+x.size_left)|0;let rem=(prevAccumulatedValue+col-1)|0;if(rem>accumulatedValue){rem=accumulatedValue}return makeNodePos(x,rem,nodeStartOffset)}else if(lfLeft+pieceLf===line-1){const prevAccumulatedValue=hostAccumulatedValue(tree,x,line-lfLeft-2);const pieceLen=x.piece.length|0;if((prevAccumulatedValue+col-1)<=pieceLen){return makeNodePos(x,(prevAccumulatedValue+col-1)|0,nodeStartOffset)}col=(col-(pieceLen-prevAccumulatedValue))|0;break}else{line=(line-lfLeft-pieceLf)|0;nodeStartOffset=(nodeStartOffset+x.size_left+x.piece.length)|0;x=x.right}guard++}x=hostNodeNext(x,sentinel);let walk=0;while(x!==sentinel&&walk<100000){const pieceLf=x.piece.lineFeedCnt|0;const pieceLen=x.piece.length|0;if(pieceLf>0){const accumulatedValue=hostAccumulatedValue(tree,x,0);const start=hostOffsetOfNode(tree,x);let rem=(col-1)|0;if(rem>accumulatedValue){rem=accumulatedValue}return makeNodePos(x,rem,start)}else if(pieceLen>=col-1){return makeNodePos(x,(col-1)|0,hostOffsetOfNode(tree,x))}else{col=(col-pieceLen)|0}x=hostNodeNext(x,sentinel);walk++}return makeNodePos(sentinel,0,nodeStartOffset)}function nodeAtStash(tree,offset,sentinel,slot){if(!tree._stash){tree._stash=[null,null]}tree._stash[slot|0]=hostNodeAt(tree,offset,sentinel)}function nodeAt2Stash(tree,lineNumber,column,sentinel,slot){if(!tree._stash){tree._stash=[null,null]}tree._stash[slot|0]=hostNodeAt2(tree,lineNumber,column,sentinel)}function stashNode(tree,slot){return tree._stash[slot|0].node}function stashRem(tree,slot){return tree._stash[slot|0].remainder|0}function stashStart(tree,slot){return tree._stash[slot|0].nodeStartOffset|0}function hostCursorLine(cursor){return(cursor.line??cursor[0]??0)|0}function hostCursorCol(cursor){return(cursor.column??cursor[1]??0)|0}function hostOffsetInBuffer(tree,bufferIndex,cursor){const lineStarts=tree.buffers[bufferIndex].lineStarts;return(lineStarts[hostCursorLine(cursor)]+hostCursorCol(cursor))|0}function hostGetLineFeedCnt(tree,bufferIndex,start,end){const endLine=hostCursorLine(end);const endCol=hostCursorCol(end);const startLine=hostCursorLine(start);if(endCol===0){return(endLine-startLine)|0}const lineStarts=tree.buffers[bufferIndex].lineStarts;if(endLine===lineStarts.length-1){return(endLine-startLine)|0}const nextLineStartOffset=lineStarts[endLine+1]|0;const endOffset=(lineStarts[endLine]+endCol)|0;if(nextLineStartOffset>endOffset+1){return(endLine-startLine)|0}const previousCharOffset=(endOffset-1)|0;if(tree.buffers[bufferIndex].buffer.charCodeAt(previousCharOffset)===13){return(endLine-startLine+1)|0}return(endLine-startLine)|0}function hostPositionInBuffer(tree,node,remainder){const piece=node.piece;const lineStarts=tree.buffers[piece.bufferIndex].lineStarts;const startOffset=(lineStarts[piece.start.line]+piece.start.column+(remainder|0))|0;let low=piece.start.line|0;let high=piece.end.line|0;let mid=low;let midStart=0;let midStop=0;while(low<=high){mid=(low+(((high-low)/2)|0))|0;midStart=lineStarts[mid]|0;if(mid===lineStarts.length-1){midStop=tree.buffers[piece.bufferIndex].buffer.length|0}else{midStop=lineStarts[mid+1]|0}if(startOffset<midStart){high=(mid-1)|0}else if(startOffset>=midStop){low=(mid+1)|0}else{break}}return{line:mid,column:(startOffset-midStart)|0}}function hostGetIndexOf(tree,node,accumulatedValue){const piece=node.piece;const pos=hostPositionInBuffer(tree,node,accumulatedValue);const lineCnt=(pos.line-piece.start.line)|0;const span=(hostOffsetInBuffer(tree,piece.bufferIndex,piece.end)-hostOffsetInBuffer(tree,piece.bufferIndex,piece.start))|0;if(span===(accumulatedValue|0)){const realLineCnt=hostGetLineFeedCnt(tree,node.piece.bufferIndex,piece.start,pos);if(realLineCnt!==lineCnt){return{index:realLineCnt,remainder:0}}}return{index:lineCnt,remainder:pos.column|0}}function hostGetOffsetAt(tree,lineNumber,column,sentinel){let leftLen=0;let x=tree.root;let line=lineNumber|0;let guard=0;while(x!==sentinel&&guard<100000){guard++;if(x.left!==sentinel&&(x.lf_left+1)>=line){x=x.left}else if((x.lf_left+x.piece.lineFeedCnt+1)>=line){leftLen=(leftLen+x.size_left)|0;const acc=hostAccumulatedValue(tree,x,(line-x.lf_left-2)|0);return(leftLen+acc+(column|0)-1)|0}else{line=(line-x.lf_left-x.piece.lineFeedCnt)|0;leftLen=(leftLen+x.size_left+x.piece.length)|0;x=x.right}}return leftLen}function makePos(line,column){const lineN=line|0;const colN=column|0;const pos=[lineN,colN];pos.lineNumber=lineN;pos.column=colN;return pos}function hostGetPositionAt(tree,offset,sentinel){let rest=offset|0;if(rest<0){rest=0}let x=tree.root;let lfCnt=0;const originalOffset=rest;let guard=0;while(x!==sentinel&&guard<100000){guard++;if(x.size_left!==0&&x.size_left>=rest){x=x.left}else if((x.size_left+x.piece.length)>=rest){const out=hostGetIndexOf(tree,x,(rest-x.size_left)|0);lfCnt=(lfCnt+x.lf_left+out.index)|0;if(out.index===0){const lineStartOffset=hostGetOffsetAt(tree,lfCnt+1,1,sentinel);const column=(originalOffset-lineStartOffset)|0;return makePos(lfCnt+1,column+1)}return makePos(lfCnt+1,out.remainder+1)}else{rest=(rest-x.size_left-x.piece.length)|0;lfCnt=(lfCnt+x.lf_left+x.piece.lineFeedCnt)|0;if(x.right===sentinel){const lineStartOffset=hostGetOffsetAt(tree,lfCnt+1,1,sentinel);const column=(originalOffset-rest-lineStartOffset)|0;return makePos(lfCnt+1,column+1)}x=x.right}}return makePos(1,1)}function hostCalcSize(node,sentinel){if(node===sentinel){return 0}return(node.size_left+node.piece.length+hostCalcSize(node.right,sentinel))|0}function hostCalcLf(node,sentinel){if(node===sentinel){return 0}return(node.lf_left+node.piece.lineFeedCnt+hostCalcLf(node.right,sentinel))|0}function hostLeftest(node,sentinel){while(node.left!==sentinel){node=node.left}return node}function hostLeftRotate(tree,x,sentinel){const y=x.right;y.size_left=(y.size_left+x.size_left+x.piece.length)|0;y.lf_left=(y.lf_left+x.lf_left+x.piece.lineFeedCnt)|0;x.right=y.left;if(y.left!==sentinel){y.left.parent=x}y.parent=x.parent;if(x.parent===sentinel){tree.root=y}else if(x.parent.left===x){x.parent.left=y}else{x.parent.right=y}y.left=x;x.parent=y}function hostRightRotate(tree,y,sentinel){const x=y.left;y.left=x.right;if(x.right!==sentinel){x.right.parent=y}x.parent=y.parent;y.size_left=(y.size_left-(x.size_left+x.piece.length))|0;y.lf_left=(y.lf_left-(x.lf_left+x.piece.lineFeedCnt))|0;if(y.parent===sentinel){tree.root=x}else if(y===y.parent.right){y.parent.right=x}else{y.parent.left=x}x.right=y;y.parent=x}function hostUpdateMeta(tree,x,delta,lfDelta,sentinel){while(x!==tree.root&&x!==sentinel){if(x.parent.left===x){x.parent.size_left=(x.parent.size_left+delta)|0;x.parent.lf_left=(x.parent.lf_left+lfDelta)|0}x=x.parent}}function hostRecomputeMeta(tree,x,sentinel){if(x===tree.root){return}while(x!==tree.root&&x===x.parent.right){x=x.parent}if(x===tree.root){return}x=x.parent;const delta=(hostCalcSize(x.left,sentinel)-x.size_left)|0;const lfDelta=(hostCalcLf(x.left,sentinel)-x.lf_left)|0;x.size_left=(x.size_left+delta)|0;x.lf_left=(x.lf_left+lfDelta)|0;while(x!==tree.root&&(delta!==0||lfDelta!==0)){if(x.parent.left===x){x.parent.size_left=(x.parent.size_left+delta)|0;x.parent.lf_left=(x.parent.lf_left+lfDelta)|0}x=x.parent}}function hostDetach(node){node.alive=false;node.parent=node;node.left=node;node.right=node}function rbDeleteTree(tree,z,sentinel){let y;let x;if(z.left===sentinel){y=z;x=y.right}else if(z.right===sentinel){y=z;x=y.left}else{y=hostLeftest(z.right,sentinel);x=y.right}if(y===tree.root){tree.root=x;x.color=0;hostDetach(z);sentinel.parent=sentinel;tree.root.parent=sentinel;return}const yWasRed=y.color===1;if(y===y.parent.left){y.parent.left=x}else{y.parent.right=x}if(y===z){x.parent=y.parent;hostRecomputeMeta(tree,x,sentinel)}else{if(y.parent===z){x.parent=y}else{x.parent=y.parent}hostRecomputeMeta(tree,x,sentinel);y.left=z.left;y.right=z.right;y.parent=z.parent;y.color=z.color;if(z===tree.root){tree.root=y}else if(z===z.parent.left){z.parent.left=y}else{z.parent.right=y}if(y.left!==sentinel){y.left.parent=y}if(y.right!==sentinel){y.right.parent=y}y.size_left=z.size_left;y.lf_left=z.lf_left;hostRecomputeMeta(tree,y,sentinel)}hostDetach(z);if(x.parent.left===x){const newSizeLeft=hostCalcSize(x,sentinel);const newLFLeft=hostCalcLf(x,sentinel);if(newSizeLeft!==x.parent.size_left||newLFLeft!==x.parent.lf_left){const delta=(newSizeLeft-x.parent.size_left)|0;const lfDelta=(newLFLeft-x.parent.lf_left)|0;x.parent.size_left=newSizeLeft;x.parent.lf_left=newLFLeft;hostUpdateMeta(tree,x.parent,delta,lfDelta,sentinel)}}hostRecomputeMeta(tree,x.parent,sentinel);if(yWasRed){sentinel.parent=sentinel;return}while(x!==tree.root&&x.color===0){if(x===x.parent.left){let w=x.parent.right;if(w.color===1){w.color=0;x.parent.color=1;hostLeftRotate(tree,x.parent,sentinel);w=x.parent.right}if(w.left.color===0&&w.right.color===0){w.color=1;x=x.parent}else{if(w.right.color===0){w.left.color=0;w.color=1;hostRightRotate(tree,w,sentinel);w=x.parent.right}w.color=x.parent.color;x.parent.color=0;w.right.color=0;hostLeftRotate(tree,x.parent,sentinel);x=tree.root}}else{let w=x.parent.left;if(w.color===1){w.color=0;x.parent.color=1;hostRightRotate(tree,x.parent,sentinel);w=x.parent.left}if(w.left.color===0&&w.right.color===0){w.color=1;x=x.parent}else{if(w.left.color===0){w.right.color=0;w.color=1;hostLeftRotate(tree,w,sentinel);w=x.parent.left}w.color=x.parent.color;x.parent.color=0;w.left.color=0;hostRightRotate(tree,x.parent,sentinel);x=tree.root}}}x.color=0;sentinel.parent=sentinel}function splitLinesHost(text){const lines=[];let cur="";for(let i=0;i<text.length;i++){const ch=text.charAt(i);if(ch==="\n"){lines.push(cur);cur=""}else if(ch!=="\r"){cur+=ch}}lines.push(cur);return lines}function makeDiffChange(os,oe,ms,me){const change=[os,oe,ms,me];change.originalStart=os;change.originalEnd=oe;change.modifiedStart=ms;change.modifiedEnd=me;return change}class HostFastInts{pos=[0,0,0,0,0,0,0,0];neg=[0,0,0,0,0,0,0,0];get(idx){if(idx<0){const i=-idx-1;return i>=this.neg.length?0:this.neg[i]}return idx>=this.pos.length?0:this.pos[idx]}set(idx,value){if(idx<0){const i=-idx-1;while(this.neg.length<=i){this.neg.push(0)}this.neg[i]=value}else{while(this.pos.length<=idx){this.pos.push(0)}this.pos[idx]=value}}}class HostFastPaths{pos=[];neg=[];get(idx){if(idx<0){const i=-idx-1;return i>=this.neg.length?null:this.neg[i]}return idx>=this.pos.length?null:this.pos[idx]}set(idx,value){if(idx<0){const i=-idx-1;while(this.neg.length<=i){this.neg.push(null)}this.neg[i]=value}else{while(this.pos.length<=idx){this.pos.push(null)}this.pos[idx]=value}}}function hostSnake(seqX,seqY,x,y){let xi=x|0;let yi=y|0;while(xi<seqX.length&&yi<seqY.length&&seqX[xi]===seqY[yi]){xi++;yi++}return xi}function hostComputeLineDiff(original,modified){const seqX=splitLinesHost(original);const seqY=splitLinesHost(modified);const result=[];if(seqX.length===0&&seqY.length===0){return result}if(seqX.length===0){result.push(makeDiffChange(0,0,0,seqY.length));return result}if(seqY.length===0){result.push(makeDiffChange(0,seqX.length,0,0));return result}const V=new HostFastInts();const paths=new HostFastPaths();const first=hostSnake(seqX,seqY,0,0);V.set(0,first);paths.set(0,first===0?null:{prev:null,x:0,y:0,length:first});let foundK=0;let done=false;let d=0;const limit=seqX.length+seqY.length+2;while(!done&&d<=limit){d++;const lowerBound=-Math.min(d,seqY.length+(d%2));const upperBound=Math.min(d,seqX.length+(d%2));for(let k=lowerBound;k<=upperBound;k+=2){let maxXofDLineTop=-1;if(k!==upperBound){maxXofDLineTop=V.get(k+1)}let maxXofDLineLeft=-1;if(k!==lowerBound){maxXofDLineLeft=V.get(k-1)+1}const x=Math.min(Math.max(maxXofDLineTop,maxXofDLineLeft),seqX.length);const y=x-k;if(x<=seqX.length&&y<=seqY.length){const newMaxX=hostSnake(seqX,seqY,x,y);V.set(k,newMaxX);const lastPath=x===maxXofDLineTop?paths.get(k+1):paths.get(k-1);paths.set(k,newMaxX!==x?{prev:lastPath,x,y,length:newMaxX-x}:lastPath);if(V.get(k)===seqX.length&&V.get(k)-k===seqY.length){foundK=k;done=true;break}}}}let path=paths.get(foundK);let lastAligningPosS1=seqX.length;let lastAligningPosS2=seqY.length;while(true){let endX=0;let endY=0;let nextX=0;let nextY=0;let next=null;let hasPath=false;if(path!=null){hasPath=true;endX=path.x+path.length;endY=path.y+path.length;nextX=path.x;nextY=path.y;next=path.prev}if(endX!==lastAligningPosS1||endY!==lastAligningPosS2){result.push(makeDiffChange(endX,lastAligningPosS1,endY,lastAligningPosS2))}if(!hasPath){break}lastAligningPosS1=nextX;lastAligningPosS2=nextY;path=next}const reversed=[];for(let r=result.length-1;r>=0;r--){reversed.push(result[r])}return reversed}function hostWorkbenchCommand(kind){window.dispatchEvent(new CustomEvent("lil-workbench",{detail:String(kind||"")}))}function jsUndefined(){return undefined}function windowSelf(){return globalThis}function throwError(msg){throw new Error(msg)};return {get "stringSlice"(){return stringSlice},get "stringReplace"(){return stringReplace},get "stringSplit"(){return stringSplit},get "stringFromCharCode1"(){return stringFromCharCode1},get "newRegexp"(){return newRegexp},get "regexTest"(){return regexTest},get "regexExec"(){return regexExec},get "regexLastIndex"(){return regexLastIndex},get "regexSetLastIndex"(){return regexSetLastIndex},get "dateNow"(){return dateNow},get "mathRandom"(){return mathRandom},get "scheduleTimeoutMs"(){return scheduleTimeoutMs},get "clearTimeoutId"(){return clearTimeoutId},get "requestAnimationFrameOrNull"(){return requestAnimationFrameOrNull},get "createElement"(){return createElement},get "domCreateElement"(){return domCreateElement},get "createTextNode"(){return createTextNode},get "appendChild"(){return appendChild},get "removeChild"(){return removeChild},get "setTextContent"(){return setTextContent},get "getTextContent"(){return getTextContent},get "setInnerHTML"(){return setInnerHTML},get "getInnerHTML"(){return getInnerHTML},get "setClassName"(){return setClassName},get "setStyle"(){return setStyle},get "setAttribute"(){return setAttribute},get "addEventListener"(){return addEventListener},get "removeEventListener"(){return removeEventListener},get "focusElement"(){return focusElement},get "getClientWidth"(){return getClientWidth},get "getClientHeight"(){return getClientHeight},get "getScrollTop"(){return getScrollTop},get "setScrollTop"(){return setScrollTop},get "getScrollHeight"(){return getScrollHeight},get "preventDefault"(){return preventDefault},get "stopPropagation"(){return stopPropagation},get "eventKey"(){return eventKey},get "eventCode"(){return eventCode},get "eventKeyCode"(){return eventKeyCode},get "eventCtrlKey"(){return eventCtrlKey},get "eventShiftKey"(){return eventShiftKey},get "eventAltKey"(){return eventAltKey},get "eventInputValue"(){return eventInputValue},get "inputSetValue"(){return inputSetValue},get "inputGetValue"(){return inputGetValue},get "canvasGetContext2d"(){return canvasGetContext2d},get "canvasSetSize"(){return canvasSetSize},get "canvasFillRect"(){return canvasFillRect},get "clearChildren"(){return clearChildren},get "setTabIndex"(){return setTabIndex},get "getClipboardText"(){return getClipboardText},get "setClipboardText"(){return setClipboardText},get "clipboardRead"(){return clipboardRead},get "clipboardWrite"(){return clipboardWrite},get "clipboardReadEvent"(){return clipboardReadEvent},get "clipboardWriteEvent"(){return clipboardWriteEvent},get "eventClientX"(){return eventClientX},get "eventClientY"(){return eventClientY},get "eventButton"(){return eventButton},get "eventDetail"(){return eventDetail},get "rectLeft"(){return rectLeft},get "rectTop"(){return rectTop},get "getScrollLeft"(){return getScrollLeft},get "setScrollLeft"(){return setScrollLeft},get "blurElement"(){return blurElement},get "setPlaceholder"(){return setPlaceholder},get "setDisplay"(){return setDisplay},get "classListAdd"(){return classListAdd},get "classListRemove"(){return classListRemove},get "hostCall"(){return hostCall},get "hostThen"(){return hostThen},get "jsArrayLen"(){return jsArrayLen},get "jsArrayAt"(){return jsArrayAt},get "jsPropString"(){return jsPropString},get "jsPropInt"(){return jsPropInt},get "emptyBuf"(){return emptyBuf},get "beginIdList"(){return beginIdList},get "pushId"(){return pushId},get "takeIdList"(){return takeIdList},get "concat2"(){return concat2},get "pushNewBuffer"(){return pushNewBuffer},get "makeNodePos"(){return makeNodePos},get "nodeAtStash"(){return nodeAtStash},get "nodeAt2Stash"(){return nodeAt2Stash},get "stashNode"(){return stashNode},get "stashRem"(){return stashRem},get "stashStart"(){return stashStart},get "hostGetOffsetAt"(){return hostGetOffsetAt},get "hostGetPositionAt"(){return hostGetPositionAt},get "rbDeleteTree"(){return rbDeleteTree},get "hostComputeLineDiff"(){return hostComputeLineDiff},get "hostWorkbenchCommand"(){return hostWorkbenchCommand},get "jsUndefined"(){return jsUndefined},get "windowSelf"(){return windowSelf},get "throwError"(){return throwError},get "hostPaintEditor"(){return h0["hostPaintEditor"]},get "hostCoordsToPosition"(){return h0["hostCoordsToPosition"]},get "hostStyleFindWidget"(){return h0["hostStyleFindWidget"]},get "eventIsComposing"(){return h0["eventIsComposing"]},get "eventDeltaY"(){return h0["eventDeltaY"]}}})($lh0);let u=$lh1["emptyBuf"];let Zh=$lh1["stringSlice"];let $h=$lh1["stringReplace"];let nd=$lh1["newRegexp"];let ai=$lh1["rbDeleteTree"];let bi=$lh1["hostGetOffsetAt"];let mb=$lh1["stashNode"];let nb=$lh1["stashRem"];let Q=$lh1["concat2"];let zf=$lh1["nodeAt2Stash"];let ob=$lh1["nodeAtStash"];let Af=$lh1["pushNewBuffer"];let Bf=$lh1["stashStart"];let Cf=$lh1["regexExec"];let ci=$lh1["hostGetPositionAt"];let di=$lh1["beginIdList"];let ei=$lh1["pushId"];let fi=$lh1["takeIdList"];let k=$lh1["jsUndefined"];let gi=$lh1["stringFromCharCode1"];let D=$lh1["domCreateElement"];let Y=$lh1["setClassName"];let g=$lh1["setStyle"];let Df=$lh1["setTabIndex"];let Z=$lh1["setAttribute"];let od=$lh1["setPlaceholder"];let K=$lh1["appendChild"];let hi=$lh1["hostStyleFindWidget"];let B=$lh1["setDisplay"];let $b=$lh1["setTextContent"];let ii=$lh1["hostPaintEditor"];let _b=$lh1["inputSetValue"];let ji=$lh1["hostCoordsToPosition"];let Ef=$lh1["clipboardWrite"];let ki=$lh1["clipboardRead"];let G=$lh1["eventKey"];let ma=$lh1["eventCtrlKey"];let ac=$lh1["eventShiftKey"];let pd=$lh1["eventAltKey"];let o=$lh1["preventDefault"];let Ff=$lh1["eventIsComposing"];let li=$lh1["clipboardWriteEvent"];let Ta=$lh1["hostCall"];let Ua=$lh1["jsArrayLen"];let Ha=$lh1["jsArrayAt"];let ba=$lh1["jsPropString"];let mi=$lh1["jsPropInt"];let ca=$lh1["focusElement"];let pb=$lh1["inputGetValue"];let bc=$lh1["setInnerHTML"];let cc=$lh1["hostThen"];let Gf=$lh1["hostWorkbenchCommand"];let H=$lh1["addEventListener"];let ni=$lh1["clipboardReadEvent"];let Hf=$lh1["eventButton"];let qb=$lh1["eventClientX"];let rb=$lh1["eventClientY"];let oi=$lh1["eventDetail"];let pi=$lh1["rectLeft"];let qi=$lh1["rectTop"];let ri=$lh1["windowSelf"];let fk=$lh1["stringSplit"];let gk=$lh1["regexTest"];let hk=$lh1["regexLastIndex"];let ik=$lh1["regexSetLastIndex"];let jk=$lh1["dateNow"];let kk=$lh1["mathRandom"];let lk=$lh1["scheduleTimeoutMs"];let mk=$lh1["clearTimeoutId"];let nk=$lh1["requestAnimationFrameOrNull"];let ok=$lh1["createTextNode"];let pk=$lh1["removeChild"];let qk=$lh1["getTextContent"];let rk=$lh1["getInnerHTML"];let sk=$lh1["removeEventListener"];let tk=$lh1["getClientWidth"];let uk=$lh1["getClientHeight"];let vk=$lh1["getScrollTop"];let wk=$lh1["setScrollTop"];let xk=$lh1["getScrollHeight"];let yk=$lh1["stopPropagation"];let zk=$lh1["eventCode"];let Ak=$lh1["eventKeyCode"];let Bk=$lh1["eventInputValue"];let Ck=$lh1["canvasGetContext2d"];let Dk=$lh1["canvasSetSize"];let Ek=$lh1["canvasFillRect"];let Fk=$lh1["clearChildren"];let Gk=$lh1["throwError"];let Hk=$lh1["getScrollLeft"];let Ik=$lh1["setScrollLeft"];let Jk=$lh1["blurElement"];let Kk=$lh1["classListAdd"];let Lk=$lh1["classListRemove"];let Mk=$lh1["eventDeltaY"];let Nk=$lh1["hostComputeLineDiff"];let $lh2=(function(){// Microsoft Monaco Editor 0.56.0, MIT. See NOTICE.md and provider/provenance.json.
// Module dependencies are explicit arguments; module initialization runs once on first use.
       function createRegister({typescriptVersion:typescriptVersion$1,languages,Emitter,loadMode}) {

var ModuleKind = /* @__PURE__ */ ((ModuleKind2) => {
  ModuleKind2[ModuleKind2["None"] = 0] = "None";
  ModuleKind2[ModuleKind2["CommonJS"] = 1] = "CommonJS";
  ModuleKind2[ModuleKind2["AMD"] = 2] = "AMD";
  ModuleKind2[ModuleKind2["UMD"] = 3] = "UMD";
  ModuleKind2[ModuleKind2["System"] = 4] = "System";
  ModuleKind2[ModuleKind2["ES2015"] = 5] = "ES2015";
  ModuleKind2[ModuleKind2["ESNext"] = 99] = "ESNext";
  return ModuleKind2;
})(ModuleKind || {});
var JsxEmit = /* @__PURE__ */ ((JsxEmit2) => {
  JsxEmit2[JsxEmit2["None"] = 0] = "None";
  JsxEmit2[JsxEmit2["Preserve"] = 1] = "Preserve";
  JsxEmit2[JsxEmit2["React"] = 2] = "React";
  JsxEmit2[JsxEmit2["ReactNative"] = 3] = "ReactNative";
  JsxEmit2[JsxEmit2["ReactJSX"] = 4] = "ReactJSX";
  JsxEmit2[JsxEmit2["ReactJSXDev"] = 5] = "ReactJSXDev";
  return JsxEmit2;
})(JsxEmit || {});
var NewLineKind = /* @__PURE__ */ ((NewLineKind2) => {
  NewLineKind2[NewLineKind2["CarriageReturnLineFeed"] = 0] = "CarriageReturnLineFeed";
  NewLineKind2[NewLineKind2["LineFeed"] = 1] = "LineFeed";
  return NewLineKind2;
})(NewLineKind || {});
var ScriptTarget = /* @__PURE__ */ ((ScriptTarget2) => {
  ScriptTarget2[ScriptTarget2["ES3"] = 0] = "ES3";
  ScriptTarget2[ScriptTarget2["ES5"] = 1] = "ES5";
  ScriptTarget2[ScriptTarget2["ES2015"] = 2] = "ES2015";
  ScriptTarget2[ScriptTarget2["ES2016"] = 3] = "ES2016";
  ScriptTarget2[ScriptTarget2["ES2017"] = 4] = "ES2017";
  ScriptTarget2[ScriptTarget2["ES2018"] = 5] = "ES2018";
  ScriptTarget2[ScriptTarget2["ES2019"] = 6] = "ES2019";
  ScriptTarget2[ScriptTarget2["ES2020"] = 7] = "ES2020";
  ScriptTarget2[ScriptTarget2["ESNext"] = 99] = "ESNext";
  ScriptTarget2[ScriptTarget2["JSON"] = 100] = "JSON";
  ScriptTarget2[ScriptTarget2["Latest"] = 99 /* ESNext */] = "Latest";
  return ScriptTarget2;
})(ScriptTarget || {});
var ModuleResolutionKind = /* @__PURE__ */ ((ModuleResolutionKind2) => {
  ModuleResolutionKind2[ModuleResolutionKind2["Classic"] = 1] = "Classic";
  ModuleResolutionKind2[ModuleResolutionKind2["NodeJs"] = 2] = "NodeJs";
  return ModuleResolutionKind2;
})(ModuleResolutionKind || {});
class LanguageServiceDefaultsImpl {
  constructor(compilerOptions, diagnosticsOptions, workerOptions, inlayHintsOptions, modeConfiguration) {
    this._onDidChange = new Emitter();
    this._onDidExtraLibsChange = new Emitter();
    this._extraLibs = /* @__PURE__ */ Object.create(null);
    this._removedExtraLibs = /* @__PURE__ */ Object.create(null);
    this._eagerModelSync = false;
    this.setCompilerOptions(compilerOptions);
    this.setDiagnosticsOptions(diagnosticsOptions);
    this.setWorkerOptions(workerOptions);
    this.setInlayHintsOptions(inlayHintsOptions);
    this.setModeConfiguration(modeConfiguration);
    this._onDidExtraLibsChangeTimeout = -1;
  }
  get onDidChange() {
    return this._onDidChange.event;
  }
  get onDidExtraLibsChange() {
    return this._onDidExtraLibsChange.event;
  }
  get modeConfiguration() {
    return this._modeConfiguration;
  }
  get workerOptions() {
    return this._workerOptions;
  }
  get inlayHintsOptions() {
    return this._inlayHintsOptions;
  }
  getExtraLibs() {
    return this._extraLibs;
  }
  addExtraLib(content, _filePath) {
    let filePath;
    if (typeof _filePath === "undefined") {
      filePath = `ts:extralib-${Math.random().toString(36).substring(2, 15)}`;
    } else {
      filePath = _filePath;
    }
    if (this._extraLibs[filePath] && this._extraLibs[filePath].content === content) {
      return {
        dispose: () => {
        }
      };
    }
    let myVersion = 1;
    if (this._removedExtraLibs[filePath]) {
      myVersion = this._removedExtraLibs[filePath] + 1;
    }
    if (this._extraLibs[filePath]) {
      myVersion = this._extraLibs[filePath].version + 1;
    }
    this._extraLibs[filePath] = {
      content,
      version: myVersion
    };
    this._fireOnDidExtraLibsChangeSoon();
    return {
      dispose: () => {
        let extraLib = this._extraLibs[filePath];
        if (!extraLib) {
          return;
        }
        if (extraLib.version !== myVersion) {
          return;
        }
        delete this._extraLibs[filePath];
        this._removedExtraLibs[filePath] = myVersion;
        this._fireOnDidExtraLibsChangeSoon();
      }
    };
  }
  setExtraLibs(libs) {
    for (const filePath in this._extraLibs) {
      this._removedExtraLibs[filePath] = this._extraLibs[filePath].version;
    }
    this._extraLibs = /* @__PURE__ */ Object.create(null);
    if (libs && libs.length > 0) {
      for (const lib of libs) {
        const filePath = lib.filePath || `ts:extralib-${Math.random().toString(36).substring(2, 15)}`;
        const content = lib.content;
        let myVersion = 1;
        if (this._removedExtraLibs[filePath]) {
          myVersion = this._removedExtraLibs[filePath] + 1;
        }
        this._extraLibs[filePath] = {
          content,
          version: myVersion
        };
      }
    }
    this._fireOnDidExtraLibsChangeSoon();
  }
  _fireOnDidExtraLibsChangeSoon() {
    if (this._onDidExtraLibsChangeTimeout !== -1) {
      return;
    }
    this._onDidExtraLibsChangeTimeout = window.setTimeout(() => {
      this._onDidExtraLibsChangeTimeout = -1;
      this._onDidExtraLibsChange.fire(void 0);
    }, 0);
  }
  getCompilerOptions() {
    return this._compilerOptions;
  }
  setCompilerOptions(options) {
    this._compilerOptions = options || /* @__PURE__ */ Object.create(null);
    this._onDidChange.fire(void 0);
  }
  getDiagnosticsOptions() {
    return this._diagnosticsOptions;
  }
  setDiagnosticsOptions(options) {
    this._diagnosticsOptions = options || /* @__PURE__ */ Object.create(null);
    this._onDidChange.fire(void 0);
  }
  setWorkerOptions(options) {
    this._workerOptions = options || /* @__PURE__ */ Object.create(null);
    this._onDidChange.fire(void 0);
  }
  setInlayHintsOptions(options) {
    this._inlayHintsOptions = options || /* @__PURE__ */ Object.create(null);
    this._onDidChange.fire(void 0);
  }
  setMaximumWorkerIdleTime(value) {
  }
  setEagerModelSync(value) {
    this._eagerModelSync = value;
  }
  getEagerModelSync() {
    return this._eagerModelSync;
  }
  setModeConfiguration(modeConfiguration) {
    this._modeConfiguration = modeConfiguration || /* @__PURE__ */ Object.create(null);
    this._onDidChange.fire(void 0);
  }
}
const typescriptVersion = typescriptVersion$1;
const modeConfigurationDefault = {
  completionItems: true,
  hovers: true,
  documentSymbols: true,
  definitions: true,
  references: true,
  documentHighlights: true,
  rename: true,
  diagnostics: true,
  documentRangeFormattingEdits: true,
  signatureHelp: true,
  onTypeFormattingEdits: true,
  codeActions: true,
  inlayHints: true
};
const typescriptDefaults = new LanguageServiceDefaultsImpl(
  { allowNonTsExtensions: true, target: 99 /* Latest */ },
  { noSemanticValidation: false, noSyntaxValidation: false, onlyVisible: false },
  {},
  {},
  modeConfigurationDefault
);
const javascriptDefaults = new LanguageServiceDefaultsImpl(
  { allowNonTsExtensions: true, allowJs: true, target: 99 /* Latest */ },
  { noSemanticValidation: true, noSyntaxValidation: false, onlyVisible: false },
  {},
  {},
  modeConfigurationDefault
);
const getTypeScriptWorker = () => {
  return getMode().then((mode) => mode.getTypeScriptWorker());
};
const getJavaScriptWorker = () => {
  return getMode().then((mode) => mode.getJavaScriptWorker());
};
function getMode() {
  return loadMode();
}
languages.onLanguage("typescript", () => {
  return getMode().then((mode) => mode.setupTypeScript(typescriptDefaults));
});
languages.onLanguage("javascript", () => {
  return getMode().then((mode) => mode.setupJavaScript(javascriptDefaults));
});


return {get JsxEmit(){return JsxEmit},get ModuleKind(){return ModuleKind},get ModuleResolutionKind(){return ModuleResolutionKind},get NewLineKind(){return NewLineKind},get ScriptTarget(){return ScriptTarget},get getJavaScriptWorker(){return getJavaScriptWorker},get getTypeScriptWorker(){return getTypeScriptWorker},get javascriptDefaults(){return javascriptDefaults},get typescriptDefaults(){return typescriptDefaults},get typescriptVersion(){return typescriptVersion}};
}

;return {get "createRegister"(){return createRegister}}})();let $lh3=(function(){// Microsoft Monaco Editor 0.56.0, MIT. See NOTICE.md and provider/provenance.json.
// Module dependencies are explicit arguments; module initialization runs once on first use.
       function createFeatures({typescriptDefaults,libFileSet,Uri,editor,MarkerTag,MarkerSeverity,Range,languages}) {

function flattenDiagnosticMessageText(diag, newLine, indent = 0) {
  if (typeof diag === "string") {
    return diag;
  } else if (diag === void 0) {
    return "";
  }
  let result = "";
  if (indent) {
    result += newLine;
    for (let i = 0; i < indent; i++) {
      result += "  ";
    }
  }
  result += diag.messageText;
  indent++;
  if (diag.next) {
    for (const kid of diag.next) {
      result += flattenDiagnosticMessageText(kid, newLine, indent);
    }
  }
  return result;
}
function displayPartsToString(displayParts) {
  if (displayParts) {
    return displayParts.map((displayPart) => displayPart.text).join("");
  }
  return "";
}
class Adapter {
  constructor(_worker) {
    this._worker = _worker;
  }
  // protected _positionToOffset(model: editor.ITextModel, position: monaco.IPosition): number {
  // 	return model.getOffsetAt(position);
  // }
  // protected _offsetToPosition(model: editor.ITextModel, offset: number): monaco.IPosition {
  // 	return model.getPositionAt(offset);
  // }
  _textSpanToRange(model, span) {
    let p1 = model.getPositionAt(span.start);
    let p2 = model.getPositionAt(span.start + span.length);
    let { lineNumber: startLineNumber, column: startColumn } = p1;
    let { lineNumber: endLineNumber, column: endColumn } = p2;
    return { startLineNumber, startColumn, endLineNumber, endColumn };
  }
}
class LibFiles {
  constructor(_worker) {
    this._worker = _worker;
    this._libFiles = {};
    this._hasFetchedLibFiles = false;
    this._fetchLibFilesPromise = null;
  }
  isLibFile(uri) {
    if (!uri) {
      return false;
    }
    if (uri.path.indexOf("/lib.") === 0) {
      return !!libFileSet[uri.path.slice(1)];
    }
    return false;
  }
  getOrCreateModel(fileName) {
    const uri = Uri.parse(fileName);
    const model = editor.getModel(uri);
    if (model) {
      return model;
    }
    if (this.isLibFile(uri) && this._hasFetchedLibFiles) {
      return editor.createModel(this._libFiles[uri.path.slice(1)], "typescript", uri);
    }
    const matchedLibFile = typescriptDefaults.getExtraLibs()[fileName];
    if (matchedLibFile) {
      return editor.createModel(matchedLibFile.content, "typescript", uri);
    }
    return null;
  }
  _containsLibFile(uris) {
    for (let uri of uris) {
      if (this.isLibFile(uri)) {
        return true;
      }
    }
    return false;
  }
  async fetchLibFilesIfNecessary(uris) {
    if (!this._containsLibFile(uris)) {
      return;
    }
    await this._fetchLibFiles();
  }
  _fetchLibFiles() {
    if (!this._fetchLibFilesPromise) {
      this._fetchLibFilesPromise = this._worker().then((w) => w.getLibFiles()).then((libFiles) => {
        this._hasFetchedLibFiles = true;
        this._libFiles = libFiles;
      });
    }
    return this._fetchLibFilesPromise;
  }
}
class DiagnosticsAdapter extends Adapter {
  constructor(_libFiles, _defaults, _selector, worker) {
    super(worker);
    this._libFiles = _libFiles;
    this._defaults = _defaults;
    this._selector = _selector;
    this._disposables = [];
    this._listener = /* @__PURE__ */ Object.create(null);
    const onModelAdd = (model) => {
      if (model.getLanguageId() !== _selector) {
        return;
      }
      const maybeValidate = () => {
        const { onlyVisible } = this._defaults.getDiagnosticsOptions();
        if (onlyVisible) {
          if (model.isAttachedToEditor()) {
            this._doValidate(model);
          }
        } else {
          this._doValidate(model);
        }
      };
      let handle;
      const changeSubscription = model.onDidChangeContent(() => {
        clearTimeout(handle);
        handle = window.setTimeout(maybeValidate, 500);
      });
      const visibleSubscription = model.onDidChangeAttached(() => {
        const { onlyVisible } = this._defaults.getDiagnosticsOptions();
        if (onlyVisible) {
          if (model.isAttachedToEditor()) {
            maybeValidate();
          } else {
            editor.setModelMarkers(model, this._selector, []);
          }
        }
      });
      this._listener[model.uri.toString()] = {
        dispose() {
          changeSubscription.dispose();
          visibleSubscription.dispose();
          clearTimeout(handle);
        }
      };
      maybeValidate();
    };
    const onModelRemoved = (model) => {
      editor.setModelMarkers(model, this._selector, []);
      const key = model.uri.toString();
      if (this._listener[key]) {
        this._listener[key].dispose();
        delete this._listener[key];
      }
    };
    this._disposables.push(
      editor.onDidCreateModel((model) => onModelAdd(model))
    );
    this._disposables.push(editor.onWillDisposeModel(onModelRemoved));
    this._disposables.push(
      editor.onDidChangeModelLanguage((event) => {
        onModelRemoved(event.model);
        onModelAdd(event.model);
      })
    );
    this._disposables.push({
      dispose() {
        for (const model of editor.getModels()) {
          onModelRemoved(model);
        }
      }
    });
    const recomputeDiagostics = () => {
      for (const model of editor.getModels()) {
        onModelRemoved(model);
        onModelAdd(model);
      }
    };
    this._disposables.push(this._defaults.onDidChange(recomputeDiagostics));
    this._disposables.push(this._defaults.onDidExtraLibsChange(recomputeDiagostics));
    editor.getModels().forEach((model) => onModelAdd(model));
  }
  dispose() {
    this._disposables.forEach((d) => d && d.dispose());
    this._disposables = [];
  }
  async _doValidate(model) {
    const worker = await this._worker(model.uri);
    if (model.isDisposed()) {
      return;
    }
    const promises = [];
    const { noSyntaxValidation, noSemanticValidation, noSuggestionDiagnostics } = this._defaults.getDiagnosticsOptions();
    if (!noSyntaxValidation) {
      promises.push(worker.getSyntacticDiagnostics(model.uri.toString()));
    }
    if (!noSemanticValidation) {
      promises.push(worker.getSemanticDiagnostics(model.uri.toString()));
    }
    if (!noSuggestionDiagnostics) {
      promises.push(worker.getSuggestionDiagnostics(model.uri.toString()));
    }
    const allDiagnostics = await Promise.all(promises);
    if (!allDiagnostics || model.isDisposed()) {
      return;
    }
    const diagnostics = allDiagnostics.reduce((p, c) => c.concat(p), []).filter(
      (d) => (this._defaults.getDiagnosticsOptions().diagnosticCodesToIgnore || []).indexOf(d.code) === -1
    );
    const relatedUris = diagnostics.map((d) => d.relatedInformation || []).reduce((p, c) => c.concat(p), []).map(
      (relatedInformation) => relatedInformation.file ? Uri.parse(relatedInformation.file.fileName) : null
    );
    await this._libFiles.fetchLibFilesIfNecessary(relatedUris);
    if (model.isDisposed()) {
      return;
    }
    editor.setModelMarkers(
      model,
      this._selector,
      diagnostics.map((d) => this._convertDiagnostics(model, d))
    );
  }
  _convertDiagnostics(model, diag) {
    const diagStart = diag.start || 0;
    const diagLength = diag.length || 1;
    const { lineNumber: startLineNumber, column: startColumn } = model.getPositionAt(diagStart);
    const { lineNumber: endLineNumber, column: endColumn } = model.getPositionAt(
      diagStart + diagLength
    );
    const tags = [];
    if (diag.reportsUnnecessary) {
      tags.push(MarkerTag.Unnecessary);
    }
    if (diag.reportsDeprecated) {
      tags.push(MarkerTag.Deprecated);
    }
    return {
      severity: this._tsDiagnosticCategoryToMarkerSeverity(diag.category),
      startLineNumber,
      startColumn,
      endLineNumber,
      endColumn,
      message: flattenDiagnosticMessageText(diag.messageText, "\n"),
      code: diag.code.toString(),
      tags,
      relatedInformation: this._convertRelatedInformation(model, diag.relatedInformation)
    };
  }
  _convertRelatedInformation(model, relatedInformation) {
    if (!relatedInformation) {
      return [];
    }
    const result = [];
    relatedInformation.forEach((info) => {
      let relatedResource = model;
      if (info.file) {
        relatedResource = this._libFiles.getOrCreateModel(info.file.fileName);
      }
      if (!relatedResource) {
        return;
      }
      const infoStart = info.start || 0;
      const infoLength = info.length || 1;
      const { lineNumber: startLineNumber, column: startColumn } = relatedResource.getPositionAt(infoStart);
      const { lineNumber: endLineNumber, column: endColumn } = relatedResource.getPositionAt(
        infoStart + infoLength
      );
      result.push({
        resource: relatedResource.uri,
        startLineNumber,
        startColumn,
        endLineNumber,
        endColumn,
        message: flattenDiagnosticMessageText(info.messageText, "\n")
      });
    });
    return result;
  }
  _tsDiagnosticCategoryToMarkerSeverity(category) {
    switch (category) {
      case 1 /* Error */:
        return MarkerSeverity.Error;
      case 3 /* Message */:
        return MarkerSeverity.Info;
      case 0 /* Warning */:
        return MarkerSeverity.Warning;
      case 2 /* Suggestion */:
        return MarkerSeverity.Hint;
    }
    return MarkerSeverity.Info;
  }
}
class SuggestAdapter extends Adapter {
  get triggerCharacters() {
    return ["."];
  }
  async provideCompletionItems(model, position, _context, token) {
    const wordInfo = model.getWordUntilPosition(position);
    const wordRange = new Range(
      position.lineNumber,
      wordInfo.startColumn,
      position.lineNumber,
      wordInfo.endColumn
    );
    const resource = model.uri;
    const offset = model.getOffsetAt(position);
    const worker = await this._worker(resource);
    if (model.isDisposed()) {
      return;
    }
    const info = await worker.getCompletionsAtPosition(resource.toString(), offset);
    if (!info || model.isDisposed()) {
      return;
    }
    const suggestions = info.entries.map((entry) => {
      let range = wordRange;
      if (entry.replacementSpan) {
        const p1 = model.getPositionAt(entry.replacementSpan.start);
        const p2 = model.getPositionAt(entry.replacementSpan.start + entry.replacementSpan.length);
        range = new Range(p1.lineNumber, p1.column, p2.lineNumber, p2.column);
      }
      const tags = [];
      if (entry.kindModifiers !== void 0 && entry.kindModifiers.indexOf("deprecated") !== -1) {
        tags.push(languages.CompletionItemTag.Deprecated);
      }
      return {
        uri: resource,
        position,
        offset,
        range,
        label: entry.name,
        insertText: entry.name,
        sortText: entry.sortText,
        kind: SuggestAdapter.convertKind(entry.kind),
        tags
      };
    });
    return {
      suggestions
    };
  }
  async resolveCompletionItem(item, token) {
    const myItem = item;
    const resource = myItem.uri;
    const position = myItem.position;
    const offset = myItem.offset;
    const worker = await this._worker(resource);
    const details = await worker.getCompletionEntryDetails(
      resource.toString(),
      offset,
      myItem.label
    );
    if (!details) {
      return myItem;
    }
    return {
      uri: resource,
      position,
      label: details.name,
      kind: SuggestAdapter.convertKind(details.kind),
      detail: displayPartsToString(details.displayParts),
      documentation: {
        value: SuggestAdapter.createDocumentationString(details)
      }
    };
  }
  static convertKind(kind) {
    switch (kind) {
      case Kind.primitiveType:
      case Kind.keyword:
        return languages.CompletionItemKind.Keyword;
      case Kind.variable:
      case Kind.localVariable:
        return languages.CompletionItemKind.Variable;
      case Kind.memberVariable:
      case Kind.memberGetAccessor:
      case Kind.memberSetAccessor:
        return languages.CompletionItemKind.Field;
      case Kind.function:
      case Kind.memberFunction:
      case Kind.constructSignature:
      case Kind.callSignature:
      case Kind.indexSignature:
        return languages.CompletionItemKind.Function;
      case Kind.enum:
        return languages.CompletionItemKind.Enum;
      case Kind.module:
        return languages.CompletionItemKind.Module;
      case Kind.class:
        return languages.CompletionItemKind.Class;
      case Kind.interface:
        return languages.CompletionItemKind.Interface;
      case Kind.warning:
        return languages.CompletionItemKind.File;
    }
    return languages.CompletionItemKind.Property;
  }
  static createDocumentationString(details) {
    let documentationString = displayPartsToString(details.documentation);
    if (details.tags) {
      for (const tag of details.tags) {
        documentationString += `

${tagToString(tag)}`;
      }
    }
    return documentationString;
  }
}
function tagToString(tag) {
  let tagLabel = `*@${tag.name}*`;
  if (tag.name === "param" && tag.text) {
    const [paramName, ...rest] = tag.text;
    tagLabel += `\`${paramName.text}\``;
    if (rest.length > 0) tagLabel += ` \u2014 ${rest.map((r) => r.text).join(" ")}`;
  } else if (Array.isArray(tag.text)) {
    tagLabel += ` \u2014 ${tag.text.map((r) => r.text).join(" ")}`;
  } else if (tag.text) {
    tagLabel += ` \u2014 ${tag.text}`;
  }
  return tagLabel;
}
class SignatureHelpAdapter extends Adapter {
  constructor() {
    super(...arguments);
    this.signatureHelpTriggerCharacters = ["(", ","];
  }
  static _toSignatureHelpTriggerReason(context) {
    switch (context.triggerKind) {
      case languages.SignatureHelpTriggerKind.TriggerCharacter:
        if (context.triggerCharacter) {
          if (context.isRetrigger) {
            return { kind: "retrigger", triggerCharacter: context.triggerCharacter };
          } else {
            return { kind: "characterTyped", triggerCharacter: context.triggerCharacter };
          }
        } else {
          return { kind: "invoked" };
        }
      case languages.SignatureHelpTriggerKind.ContentChange:
        return context.isRetrigger ? { kind: "retrigger" } : { kind: "invoked" };
      case languages.SignatureHelpTriggerKind.Invoke:
      default:
        return { kind: "invoked" };
    }
  }
  async provideSignatureHelp(model, position, token, context) {
    const resource = model.uri;
    const offset = model.getOffsetAt(position);
    const worker = await this._worker(resource);
    if (model.isDisposed()) {
      return;
    }
    const info = await worker.getSignatureHelpItems(resource.toString(), offset, {
      triggerReason: SignatureHelpAdapter._toSignatureHelpTriggerReason(context)
    });
    if (!info || model.isDisposed()) {
      return;
    }
    const ret = {
      activeSignature: info.selectedItemIndex,
      activeParameter: info.argumentIndex,
      signatures: []
    };
    info.items.forEach((item) => {
      const signature = {
        label: "",
        parameters: []
      };
      signature.documentation = {
        value: displayPartsToString(item.documentation)
      };
      signature.label += displayPartsToString(item.prefixDisplayParts);
      item.parameters.forEach((p, i, a) => {
        const label = displayPartsToString(p.displayParts);
        const parameter = {
          label,
          documentation: {
            value: displayPartsToString(p.documentation)
          }
        };
        signature.label += label;
        signature.parameters.push(parameter);
        if (i < a.length - 1) {
          signature.label += displayPartsToString(item.separatorDisplayParts);
        }
      });
      signature.label += displayPartsToString(item.suffixDisplayParts);
      ret.signatures.push(signature);
    });
    return {
      value: ret,
      dispose() {
      }
    };
  }
}
class QuickInfoAdapter extends Adapter {
  async provideHover(model, position, token) {
    const resource = model.uri;
    const offset = model.getOffsetAt(position);
    const worker = await this._worker(resource);
    if (model.isDisposed()) {
      return;
    }
    const info = await worker.getQuickInfoAtPosition(resource.toString(), offset);
    if (!info || model.isDisposed()) {
      return;
    }
    const documentation = displayPartsToString(info.documentation);
    const tags = info.tags ? info.tags.map((tag) => tagToString(tag)).join("  \n\n") : "";
    const contents = displayPartsToString(info.displayParts);
    return {
      range: this._textSpanToRange(model, info.textSpan),
      contents: [
        {
          value: "```typescript\n" + contents + "\n```\n"
        },
        {
          value: documentation + (tags ? "\n\n" + tags : "")
        }
      ]
    };
  }
}
class DocumentHighlightAdapter extends Adapter {
  async provideDocumentHighlights(model, position, token) {
    const resource = model.uri;
    const offset = model.getOffsetAt(position);
    const worker = await this._worker(resource);
    if (model.isDisposed()) {
      return;
    }
    const entries = await worker.getDocumentHighlights(resource.toString(), offset, [
      resource.toString()
    ]);
    if (!entries || model.isDisposed()) {
      return;
    }
    return entries.flatMap((entry) => {
      return entry.highlightSpans.map((highlightSpans) => {
        return {
          range: this._textSpanToRange(model, highlightSpans.textSpan),
          kind: highlightSpans.kind === "writtenReference" ? languages.DocumentHighlightKind.Write : languages.DocumentHighlightKind.Text
        };
      });
    });
  }
}
class DefinitionAdapter extends Adapter {
  constructor(_libFiles, worker) {
    super(worker);
    this._libFiles = _libFiles;
  }
  async provideDefinition(model, position, token) {
    const resource = model.uri;
    const offset = model.getOffsetAt(position);
    const worker = await this._worker(resource);
    if (model.isDisposed()) {
      return;
    }
    const entries = await worker.getDefinitionAtPosition(resource.toString(), offset);
    if (!entries || model.isDisposed()) {
      return;
    }
    await this._libFiles.fetchLibFilesIfNecessary(
      entries.map((entry) => Uri.parse(entry.fileName))
    );
    if (model.isDisposed()) {
      return;
    }
    const result = [];
    for (let entry of entries) {
      const refModel = this._libFiles.getOrCreateModel(entry.fileName);
      if (refModel) {
        result.push({
          uri: refModel.uri,
          range: this._textSpanToRange(refModel, entry.textSpan)
        });
      }
    }
    return result;
  }
}
class ReferenceAdapter extends Adapter {
  constructor(_libFiles, worker) {
    super(worker);
    this._libFiles = _libFiles;
  }
  async provideReferences(model, position, context, token) {
    const resource = model.uri;
    const offset = model.getOffsetAt(position);
    const worker = await this._worker(resource);
    if (model.isDisposed()) {
      return;
    }
    const entries = await worker.getReferencesAtPosition(resource.toString(), offset);
    if (!entries || model.isDisposed()) {
      return;
    }
    await this._libFiles.fetchLibFilesIfNecessary(
      entries.map((entry) => Uri.parse(entry.fileName))
    );
    if (model.isDisposed()) {
      return;
    }
    const result = [];
    for (let entry of entries) {
      const refModel = this._libFiles.getOrCreateModel(entry.fileName);
      if (refModel) {
        result.push({
          uri: refModel.uri,
          range: this._textSpanToRange(refModel, entry.textSpan)
        });
      }
    }
    return result;
  }
}
class OutlineAdapter extends Adapter {
  async provideDocumentSymbols(model, token) {
    const resource = model.uri;
    const worker = await this._worker(resource);
    if (model.isDisposed()) {
      return;
    }
    const root = await worker.getNavigationTree(resource.toString());
    if (!root || model.isDisposed()) {
      return;
    }
    const convert = (item, containerLabel) => {
      const result2 = {
        name: item.text,
        detail: "",
        kind: outlineTypeTable[item.kind] || languages.SymbolKind.Variable,
        range: this._textSpanToRange(model, item.spans[0]),
        selectionRange: this._textSpanToRange(model, item.spans[0]),
        tags: [],
        children: item.childItems?.map((child) => convert(child, item.text)),
        containerName: containerLabel
      };
      return result2;
    };
    const result = root.childItems ? root.childItems.map((item) => convert(item)) : [];
    return result;
  }
}
class Kind {
}
Kind.unknown = "";
Kind.keyword = "keyword";
Kind.script = "script";
Kind.module = "module";
Kind.class = "class";
Kind.interface = "interface";
Kind.type = "type";
Kind.enum = "enum";
Kind.variable = "var";
Kind.localVariable = "local var";
Kind.function = "function";
Kind.localFunction = "local function";
Kind.memberFunction = "method";
Kind.memberGetAccessor = "getter";
Kind.memberSetAccessor = "setter";
Kind.memberVariable = "property";
Kind.constructorImplementation = "constructor";
Kind.callSignature = "call";
Kind.indexSignature = "index";
Kind.constructSignature = "construct";
Kind.parameter = "parameter";
Kind.typeParameter = "type parameter";
Kind.primitiveType = "primitive type";
Kind.label = "label";
Kind.alias = "alias";
Kind.const = "const";
Kind.let = "let";
Kind.warning = "warning";
let outlineTypeTable = /* @__PURE__ */ Object.create(null);
outlineTypeTable[Kind.module] = languages.SymbolKind.Module;
outlineTypeTable[Kind.class] = languages.SymbolKind.Class;
outlineTypeTable[Kind.enum] = languages.SymbolKind.Enum;
outlineTypeTable[Kind.interface] = languages.SymbolKind.Interface;
outlineTypeTable[Kind.memberFunction] = languages.SymbolKind.Method;
outlineTypeTable[Kind.memberVariable] = languages.SymbolKind.Property;
outlineTypeTable[Kind.memberGetAccessor] = languages.SymbolKind.Property;
outlineTypeTable[Kind.memberSetAccessor] = languages.SymbolKind.Property;
outlineTypeTable[Kind.variable] = languages.SymbolKind.Variable;
outlineTypeTable[Kind.const] = languages.SymbolKind.Variable;
outlineTypeTable[Kind.localVariable] = languages.SymbolKind.Variable;
outlineTypeTable[Kind.variable] = languages.SymbolKind.Variable;
outlineTypeTable[Kind.function] = languages.SymbolKind.Function;
outlineTypeTable[Kind.localFunction] = languages.SymbolKind.Function;
class FormatHelper extends Adapter {
  static _convertOptions(options) {
    return {
      ConvertTabsToSpaces: options.insertSpaces,
      TabSize: options.tabSize,
      IndentSize: options.tabSize,
      IndentStyle: 2 /* Smart */,
      NewLineCharacter: "\n",
      InsertSpaceAfterCommaDelimiter: true,
      InsertSpaceAfterSemicolonInForStatements: true,
      InsertSpaceBeforeAndAfterBinaryOperators: true,
      InsertSpaceAfterKeywordsInControlFlowStatements: true,
      InsertSpaceAfterFunctionKeywordForAnonymousFunctions: true,
      InsertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis: false,
      InsertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets: false,
      InsertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces: false,
      PlaceOpenBraceOnNewLineForControlBlocks: false,
      PlaceOpenBraceOnNewLineForFunctions: false
    };
  }
  _convertTextChanges(model, change) {
    return {
      text: change.newText,
      range: this._textSpanToRange(model, change.span)
    };
  }
}
class FormatAdapter extends FormatHelper {
  constructor() {
    super(...arguments);
    this.canFormatMultipleRanges = false;
  }
  async provideDocumentRangeFormattingEdits(model, range, options, token) {
    const resource = model.uri;
    const startOffset = model.getOffsetAt({
      lineNumber: range.startLineNumber,
      column: range.startColumn
    });
    const endOffset = model.getOffsetAt({
      lineNumber: range.endLineNumber,
      column: range.endColumn
    });
    const worker = await this._worker(resource);
    if (model.isDisposed()) {
      return;
    }
    const edits = await worker.getFormattingEditsForRange(
      resource.toString(),
      startOffset,
      endOffset,
      FormatHelper._convertOptions(options)
    );
    if (!edits || model.isDisposed()) {
      return;
    }
    return edits.map((edit) => this._convertTextChanges(model, edit));
  }
}
class FormatOnTypeAdapter extends FormatHelper {
  get autoFormatTriggerCharacters() {
    return [";", "}", "\n"];
  }
  async provideOnTypeFormattingEdits(model, position, ch, options, token) {
    const resource = model.uri;
    const offset = model.getOffsetAt(position);
    const worker = await this._worker(resource);
    if (model.isDisposed()) {
      return;
    }
    const edits = await worker.getFormattingEditsAfterKeystroke(
      resource.toString(),
      offset,
      ch,
      FormatHelper._convertOptions(options)
    );
    if (!edits || model.isDisposed()) {
      return;
    }
    return edits.map((edit) => this._convertTextChanges(model, edit));
  }
}
class CodeActionAdaptor extends FormatHelper {
  async provideCodeActions(model, range, context, token) {
    const resource = model.uri;
    const start = model.getOffsetAt({
      lineNumber: range.startLineNumber,
      column: range.startColumn
    });
    const end = model.getOffsetAt({
      lineNumber: range.endLineNumber,
      column: range.endColumn
    });
    const formatOptions = FormatHelper._convertOptions(model.getOptions());
    const errorCodes = context.markers.filter((m) => m.code).map((m) => m.code).map(Number);
    const worker = await this._worker(resource);
    if (model.isDisposed()) {
      return;
    }
    const codeFixes = await worker.getCodeFixesAtPosition(
      resource.toString(),
      start,
      end,
      errorCodes,
      formatOptions
    );
    if (!codeFixes || model.isDisposed()) {
      return { actions: [], dispose: () => {
      } };
    }
    const actions = codeFixes.filter((fix) => {
      return fix.changes.filter((change) => change.isNewFile).length === 0;
    }).map((fix) => {
      return this._tsCodeFixActionToMonacoCodeAction(model, context, fix);
    });
    return {
      actions,
      dispose: () => {
      }
    };
  }
  _tsCodeFixActionToMonacoCodeAction(model, context, codeFix) {
    const edits = [];
    for (const change of codeFix.changes) {
      for (const textChange of change.textChanges) {
        edits.push({
          resource: model.uri,
          versionId: void 0,
          textEdit: {
            range: this._textSpanToRange(model, textChange.span),
            text: textChange.newText
          }
        });
      }
    }
    const action = {
      title: codeFix.description,
      edit: { edits },
      diagnostics: context.markers,
      kind: "quickfix"
    };
    return action;
  }
}
class RenameAdapter extends Adapter {
  constructor(_libFiles, worker) {
    super(worker);
    this._libFiles = _libFiles;
  }
  async provideRenameEdits(model, position, newName, token) {
    const resource = model.uri;
    const fileName = resource.toString();
    const offset = model.getOffsetAt(position);
    const worker = await this._worker(resource);
    if (model.isDisposed()) {
      return;
    }
    const renameInfo = await worker.getRenameInfo(fileName, offset, {
      allowRenameOfImportPath: false
    });
    if (renameInfo.canRename === false) {
      return {
        edits: [],
        rejectReason: renameInfo.localizedErrorMessage
      };
    }
    if (renameInfo.fileToRename !== void 0) {
      throw new Error("Renaming files is not supported.");
    }
    const renameLocations = await worker.findRenameLocations(
      fileName,
      offset,
      /*strings*/
      false,
      /*comments*/
      false,
      /*prefixAndSuffix*/
      false
    );
    if (!renameLocations || model.isDisposed()) {
      return;
    }
    const edits = [];
    for (const renameLocation of renameLocations) {
      const model2 = this._libFiles.getOrCreateModel(renameLocation.fileName);
      if (model2) {
        edits.push({
          resource: model2.uri,
          versionId: void 0,
          textEdit: {
            range: this._textSpanToRange(model2, renameLocation.textSpan),
            text: newName
          }
        });
      } else {
        throw new Error(`Unknown file ${renameLocation.fileName}.`);
      }
    }
    return { edits };
  }
}
class InlayHintsAdapter extends Adapter {
  async provideInlayHints(model, range, token) {
    const resource = model.uri;
    const fileName = resource.toString();
    const start = model.getOffsetAt({
      lineNumber: range.startLineNumber,
      column: range.startColumn
    });
    const end = model.getOffsetAt({
      lineNumber: range.endLineNumber,
      column: range.endColumn
    });
    const worker = await this._worker(resource);
    if (model.isDisposed()) {
      return null;
    }
    const tsHints = await worker.provideInlayHints(fileName, start, end);
    const hints = tsHints.map((hint) => {
      return {
        ...hint,
        label: hint.text,
        position: model.getPositionAt(hint.position),
        kind: this._convertHintKind(hint.kind)
      };
    });
    return { hints, dispose: () => {
    } };
  }
  _convertHintKind(kind) {
    switch (kind) {
      case "Parameter":
        return languages.InlayHintKind.Parameter;
      case "Type":
        return languages.InlayHintKind.Type;
      default:
        return languages.InlayHintKind.Type;
    }
  }
}


return {get Adapter(){return Adapter},get CodeActionAdaptor(){return CodeActionAdaptor},get DefinitionAdapter(){return DefinitionAdapter},get DiagnosticsAdapter(){return DiagnosticsAdapter},get DocumentHighlightAdapter(){return DocumentHighlightAdapter},get FormatAdapter(){return FormatAdapter},get FormatHelper(){return FormatHelper},get FormatOnTypeAdapter(){return FormatOnTypeAdapter},get InlayHintsAdapter(){return InlayHintsAdapter},get Kind(){return Kind},get LibFiles(){return LibFiles},get OutlineAdapter(){return OutlineAdapter},get QuickInfoAdapter(){return QuickInfoAdapter},get ReferenceAdapter(){return ReferenceAdapter},get RenameAdapter(){return RenameAdapter},get SignatureHelpAdapter(){return SignatureHelpAdapter},get SuggestAdapter(){return SuggestAdapter},get flattenDiagnosticMessageText(){return flattenDiagnosticMessageText}};
}

;return {get "createFeatures"(){return createFeatures}}})();let $lh4=(function(){function createWorkerManager({editor,createWebWorker,moduleUrl}){class WorkerManager{constructor(_modeId,_defaults){this._modeId=_modeId;this._defaults=_defaults;this._worker=null;this._client=null;this._configChangeListener=this._defaults.onDidChange(()=>this._stopWorker());this._updateExtraLibsToken=0;this._extraLibsChangeListener=this._defaults.onDidExtraLibsChange(()=>this._updateExtraLibs());}dispose(){this._configChangeListener.dispose();this._extraLibsChangeListener.dispose();this._stopWorker();}_stopWorker(){if(this._worker){this._worker.dispose();this._worker=null;}this._client=null;}async _updateExtraLibs(){if(!this._worker){return;}const myToken=++this._updateExtraLibsToken;const proxy=await this._worker.getProxy();if(this._updateExtraLibsToken!==myToken){return;}proxy.updateExtraLibs(this._defaults.getExtraLibs());}_getClient(){if(!this._client){this._client=(async()=>{this._worker=createWebWorker({moduleId:"vs/language/typescript/tsWorker",createWorker:()=>new Worker(new URL('./workers/ts.worker.js',moduleUrl),{type:"module"}),label:this._modeId,keepIdleModels:true,createData:{compilerOptions:this._defaults.getCompilerOptions(),extraLibs:this._defaults.getExtraLibs(),customWorkerPath:this._defaults.workerOptions.customWorkerPath,inlayHintsOptions:this._defaults.inlayHintsOptions}});if(this._defaults.getEagerModelSync()){return await this._worker.withSyncedResources(editor.getModels().filter((model)=>model.getLanguageId()===this._modeId).map((model)=>model.uri));}return await this._worker.getProxy();})();}return this._client;}async getLanguageServiceWorker(...resources){const client=await this._getClient();if(this._worker){await this._worker.withSyncedResources(resources);}return client;}}return{get WorkerManager(){return WorkerManager}};};return {get "createWorkerManager"(){return createWorkerManager}}})();let $lh5=(function(){function createMode({WorkerManager,languages,Adapter,CodeActionAdaptor,DefinitionAdapter,DiagnosticsAdapter,DocumentHighlightAdapter,FormatAdapter,FormatHelper,FormatOnTypeAdapter,InlayHintsAdapter,Kind,LibFiles,OutlineAdapter,QuickInfoAdapter,ReferenceAdapter,RenameAdapter,SignatureHelpAdapter,SuggestAdapter,flattenDiagnosticMessageText}){let javaScriptWorker;let typeScriptWorker;function setupTypeScript(defaults){typeScriptWorker=setupMode(defaults,"typescript");}function setupJavaScript(defaults){javaScriptWorker=setupMode(defaults,"javascript");}function getJavaScriptWorker(){return new Promise((resolve,reject)=>{if(!javaScriptWorker){return reject("JavaScript not registered!");}resolve(javaScriptWorker);});}function getTypeScriptWorker(){return new Promise((resolve,reject)=>{if(!typeScriptWorker){return reject("TypeScript not registered!");}resolve(typeScriptWorker);});}function setupMode(defaults,modeId){const providers=[];const client=new WorkerManager(modeId,defaults);const worker=(...uris)=>{return client.getLanguageServiceWorker(...uris);};const libFiles=new LibFiles(worker);function registerProviders(){const{modeConfiguration}=defaults;disposeAll(providers);if(modeConfiguration.completionItems){providers.push(languages.registerCompletionItemProvider(modeId,new SuggestAdapter(worker)));}if(modeConfiguration.signatureHelp){providers.push(languages.registerSignatureHelpProvider(modeId,new SignatureHelpAdapter(worker)));}if(modeConfiguration.hovers){providers.push(languages.registerHoverProvider(modeId,new QuickInfoAdapter(worker)));}if(modeConfiguration.documentHighlights){providers.push(languages.registerDocumentHighlightProvider(modeId,new DocumentHighlightAdapter(worker)));}if(modeConfiguration.definitions){providers.push(languages.registerDefinitionProvider(modeId,new DefinitionAdapter(libFiles,worker)));}if(modeConfiguration.references){providers.push(languages.registerReferenceProvider(modeId,new ReferenceAdapter(libFiles,worker)));}if(modeConfiguration.documentSymbols){providers.push(languages.registerDocumentSymbolProvider(modeId,new OutlineAdapter(worker)));}if(modeConfiguration.rename){providers.push(languages.registerRenameProvider(modeId,new RenameAdapter(libFiles,worker)));}if(modeConfiguration.documentRangeFormattingEdits){providers.push(languages.registerDocumentRangeFormattingEditProvider(modeId,new FormatAdapter(worker)));}if(modeConfiguration.onTypeFormattingEdits){providers.push(languages.registerOnTypeFormattingEditProvider(modeId,new FormatOnTypeAdapter(worker)));}if(modeConfiguration.codeActions){providers.push(languages.registerCodeActionProvider(modeId,new CodeActionAdaptor(worker)));}if(modeConfiguration.inlayHints){providers.push(languages.registerInlayHintsProvider(modeId,new InlayHintsAdapter(worker)));}if(modeConfiguration.diagnostics){providers.push(new DiagnosticsAdapter(libFiles,defaults,modeId,worker));}}registerProviders();return worker;}function disposeAll(disposables){while(disposables.length){disposables.pop().dispose();}}return{get CodeActionAdaptor(){return CodeActionAdaptor},get DefinitionAdapter(){return DefinitionAdapter},get DiagnosticsAdapter(){return DiagnosticsAdapter},get DocumentHighlightAdapter(){return DocumentHighlightAdapter},get FormatAdapter(){return FormatAdapter},get FormatOnTypeAdapter(){return FormatOnTypeAdapter},get InlayHintsAdapter(){return InlayHintsAdapter},get LibFiles(){return LibFiles},get OutlineAdapter(){return OutlineAdapter},get QuickInfoAdapter(){return QuickInfoAdapter},get ReferenceAdapter(){return ReferenceAdapter},get RenameAdapter(){return RenameAdapter},get SignatureHelpAdapter(){return SignatureHelpAdapter},get SuggestAdapter(){return SuggestAdapter},get WorkerManager(){return WorkerManager},get getJavaScriptWorker(){return getJavaScriptWorker},get getTypeScriptWorker(){return getTypeScriptWorker},get setupJavaScript(){return setupJavaScript},get setupTypeScript(){return setupTypeScript},get Adapter(){return Adapter},get FormatHelper(){return FormatHelper},get Kind(){return Kind},get flattenDiagnosticMessageText(){return flattenDiagnosticMessageText}};};return {get "createMode"(){return createMode}}})();let $lh6=(function(){const typescriptVersion="5.9.3";;return {get "typescriptVersion"(){return typescriptVersion}}})();let $lh7=(function(){const libFileSet={};libFileSet["lib.d.ts"]=true;libFileSet["lib.decorators.d.ts"]=true;libFileSet["lib.decorators.legacy.d.ts"]=true;libFileSet["lib.dom.asynciterable.d.ts"]=true;libFileSet["lib.dom.d.ts"]=true;libFileSet["lib.dom.iterable.d.ts"]=true;libFileSet["lib.es2015.collection.d.ts"]=true;libFileSet["lib.es2015.core.d.ts"]=true;libFileSet["lib.es2015.d.ts"]=true;libFileSet["lib.es2015.generator.d.ts"]=true;libFileSet["lib.es2015.iterable.d.ts"]=true;libFileSet["lib.es2015.promise.d.ts"]=true;libFileSet["lib.es2015.proxy.d.ts"]=true;libFileSet["lib.es2015.reflect.d.ts"]=true;libFileSet["lib.es2015.symbol.d.ts"]=true;libFileSet["lib.es2015.symbol.wellknown.d.ts"]=true;libFileSet["lib.es2016.array.include.d.ts"]=true;libFileSet["lib.es2016.d.ts"]=true;libFileSet["lib.es2016.full.d.ts"]=true;libFileSet["lib.es2016.intl.d.ts"]=true;libFileSet["lib.es2017.arraybuffer.d.ts"]=true;libFileSet["lib.es2017.d.ts"]=true;libFileSet["lib.es2017.date.d.ts"]=true;libFileSet["lib.es2017.full.d.ts"]=true;libFileSet["lib.es2017.intl.d.ts"]=true;libFileSet["lib.es2017.object.d.ts"]=true;libFileSet["lib.es2017.sharedmemory.d.ts"]=true;libFileSet["lib.es2017.string.d.ts"]=true;libFileSet["lib.es2017.typedarrays.d.ts"]=true;libFileSet["lib.es2018.asyncgenerator.d.ts"]=true;libFileSet["lib.es2018.asynciterable.d.ts"]=true;libFileSet["lib.es2018.d.ts"]=true;libFileSet["lib.es2018.full.d.ts"]=true;libFileSet["lib.es2018.intl.d.ts"]=true;libFileSet["lib.es2018.promise.d.ts"]=true;libFileSet["lib.es2018.regexp.d.ts"]=true;libFileSet["lib.es2019.array.d.ts"]=true;libFileSet["lib.es2019.d.ts"]=true;libFileSet["lib.es2019.full.d.ts"]=true;libFileSet["lib.es2019.intl.d.ts"]=true;libFileSet["lib.es2019.object.d.ts"]=true;libFileSet["lib.es2019.string.d.ts"]=true;libFileSet["lib.es2019.symbol.d.ts"]=true;libFileSet["lib.es2020.bigint.d.ts"]=true;libFileSet["lib.es2020.d.ts"]=true;libFileSet["lib.es2020.date.d.ts"]=true;libFileSet["lib.es2020.full.d.ts"]=true;libFileSet["lib.es2020.intl.d.ts"]=true;libFileSet["lib.es2020.number.d.ts"]=true;libFileSet["lib.es2020.promise.d.ts"]=true;libFileSet["lib.es2020.sharedmemory.d.ts"]=true;libFileSet["lib.es2020.string.d.ts"]=true;libFileSet["lib.es2020.symbol.wellknown.d.ts"]=true;libFileSet["lib.es2021.d.ts"]=true;libFileSet["lib.es2021.full.d.ts"]=true;libFileSet["lib.es2021.intl.d.ts"]=true;libFileSet["lib.es2021.promise.d.ts"]=true;libFileSet["lib.es2021.string.d.ts"]=true;libFileSet["lib.es2021.weakref.d.ts"]=true;libFileSet["lib.es2022.array.d.ts"]=true;libFileSet["lib.es2022.d.ts"]=true;libFileSet["lib.es2022.error.d.ts"]=true;libFileSet["lib.es2022.full.d.ts"]=true;libFileSet["lib.es2022.intl.d.ts"]=true;libFileSet["lib.es2022.object.d.ts"]=true;libFileSet["lib.es2022.regexp.d.ts"]=true;libFileSet["lib.es2022.string.d.ts"]=true;libFileSet["lib.es2023.array.d.ts"]=true;libFileSet["lib.es2023.collection.d.ts"]=true;libFileSet["lib.es2023.d.ts"]=true;libFileSet["lib.es2023.full.d.ts"]=true;libFileSet["lib.es2023.intl.d.ts"]=true;libFileSet["lib.es2024.arraybuffer.d.ts"]=true;libFileSet["lib.es2024.collection.d.ts"]=true;libFileSet["lib.es2024.d.ts"]=true;libFileSet["lib.es2024.full.d.ts"]=true;libFileSet["lib.es2024.object.d.ts"]=true;libFileSet["lib.es2024.promise.d.ts"]=true;libFileSet["lib.es2024.regexp.d.ts"]=true;libFileSet["lib.es2024.sharedmemory.d.ts"]=true;libFileSet["lib.es2024.string.d.ts"]=true;libFileSet["lib.es5.d.ts"]=true;libFileSet["lib.es6.d.ts"]=true;libFileSet["lib.esnext.array.d.ts"]=true;libFileSet["lib.esnext.collection.d.ts"]=true;libFileSet["lib.esnext.d.ts"]=true;libFileSet["lib.esnext.decorators.d.ts"]=true;libFileSet["lib.esnext.disposable.d.ts"]=true;libFileSet["lib.esnext.error.d.ts"]=true;libFileSet["lib.esnext.float16.d.ts"]=true;libFileSet["lib.esnext.full.d.ts"]=true;libFileSet["lib.esnext.intl.d.ts"]=true;libFileSet["lib.esnext.iterator.d.ts"]=true;libFileSet["lib.esnext.promise.d.ts"]=true;libFileSet["lib.esnext.sharedmemory.d.ts"]=true;libFileSet["lib.scripthost.d.ts"]=true;libFileSet["lib.webworker.asynciterable.d.ts"]=true;libFileSet["lib.webworker.d.ts"]=true;libFileSet["lib.webworker.importscripts.d.ts"]=true;libFileSet["lib.webworker.iterable.d.ts"]=true;;return {get "libFileSet"(){return libFileSet}}})();let $lh8=(function(){class Emitter{constructor(){this._listeners=[];}get event(){return(listener)=>{this._listeners.push(listener);return{dispose:()=>{this._listeners=this._listeners.filter((fn)=>fn!==listener);},};};}fire(value){for(const listener of this._listeners.slice()){listener(value);}}}class Range{constructor(startLineNumber,startColumn,endLineNumber,endColumn){this.startLineNumber=startLineNumber;this.startColumn=startColumn;this.endLineNumber=endLineNumber;this.endColumn=endColumn;}static isIRange(value){return Boolean(value&&typeof value.startLineNumber==="number"&&typeof value.startColumn==="number",);}}function monaco(){return globalThis.monaco;}function live(ns){return new Proxy({},{get(_target,key){return monaco()?.[ns]?.[key];},set(_target,key,value){const root=monaco()?.[ns];if(root)root[key]=value;return true;},},);}const MarkerTag={Unnecessary:1,Deprecated:2};const MarkerSeverity={Hint:1,Info:2,Warning:4,Error:8,};const languages=live("languages");const editor=live("editor");const Uri=new Proxy(function UriShim(){},{get(_target,key){return monaco()?.Uri?.[key];},apply(_target,_thisArg,args){return monaco()?.Uri?.(...args);},});;return {get "languages"(){return languages},get "editor"(){return editor},get "Uri"(){return Uri},get "Emitter"(){return Emitter},get "Range"(){return Range},get "MarkerTag"(){return MarkerTag},get "MarkerSeverity"(){return MarkerSeverity}}})();let $lh9=(function(){const DEFAULT_CHANNEL="default";const INITIALIZE="$initialize";const HOST_CHANNEL="editorWorkerHost";function getWorker(opts){const env=globalThis.MonacoEnvironment;if(typeof env?.getWorker==="function"){return env.getWorker("",opts.label??"typescript");}if(typeof opts.createWorker==="function"){return opts.createWorker();}throw new Error("MonacoEnvironment.getWorker is required for the TypeScript worker");}function modelUrl(resource){if(!resource)return"";if(typeof resource==="string")return resource;if(typeof resource.toString==="function")return String(resource.toString());return String(resource);}function linesOf(model){if(typeof model.getLinesContent==="function"){const rows=model.getLinesContent();if(Array.isArray(rows)&&rows.length)return rows.map((line)=>String(line??""));}return String(model.getValue?.()??"").split(/\r\n|\r|\n/);}class WorkerProtocol{constructor(post){this._workerId=1;this._lastReq=0;this._pending=Object.create(null);this._channels=new Map();this._post=post;}setChannel(name,handler){this._channels.set(name,handler);}send(channel,method,args){const req=String(++this._lastReq);return new Promise((resolve,reject)=>{this._pending[req]={resolve,reject};this._post({vsWorker:this._workerId,req,channel,method,args,type:0,});});}handle(message){if(!message||!message.vsWorker)return;if(message.type===1){const pending=this._pending[message.seq];if(!pending)return;delete this._pending[message.seq];if(message.err){pending.reject(message.err);return;}pending.resolve(message.res);return;}if(message.type===0){const handler=message.channel===DEFAULT_CHANNEL?null:this._channels.get(message.channel);const fn=handler?.[message.method];Promise.resolve(typeof fn==="function"?fn.apply(handler,message.args):undefined).then((res)=>{this._post({vsWorker:this._workerId,seq:message.req,res,err:undefined,type:1,});}).catch((err)=>{this._post({vsWorker:this._workerId,seq:message.req,res:undefined,err:{$isError:true,name:err?.name,message:String(err?.message??err),stack:err?.stack},type:1,});});}}remote(){const send=this.send.bind(this);return new Proxy({},{get(_target,name){if(name==="then")return undefined;if(typeof name!=="string")return undefined;if(name.charCodeAt(0)===36){return(...args)=>send(DEFAULT_CHANNEL,name,args);}return undefined;},},);}}class MonacoWebWorker{constructor(workerPromise,host,keepIdleModels){this._synced=new Map();this._keepIdleModels=Boolean(keepIdleModels);this._worker=null;this._protocol=null;this._proxy=null;this._ready=Promise.resolve(workerPromise).then((worker)=>{this._worker=worker;this._protocol=new WorkerProtocol((msg,transfer)=>worker.postMessage(msg,transfer??[]));this._protocol.setChannel(HOST_CHANNEL,{$fhr:(method,args)=>{if(!host||typeof host[method]!=="function"){return Promise.reject(new Error("Missing method "+method));}return host[method](...args);},});worker.addEventListener("message",(ev)=>this._protocol.handle(ev.data));return this._protocol.send(DEFAULT_CHANNEL,INITIALIZE,[1]).then(()=>this._protocol.remote());});}getProxy(){if(!this._proxy){this._proxy=this._ready.then((remote)=>{return new Proxy({},{get(_target,name){if(name==="then")return undefined;if(typeof name!=="string")return undefined;return(...args)=>remote.$fmr(name,args);},},);});}return this._proxy;}async withSyncedResources(resources){const proxy=await this._ready;const monaco=globalThis.monaco;for(const resource of resources??[]){const url=modelUrl(resource);const model=monaco?.editor?.getModel?.(resource)??monaco?.editor?.getModels?.()?.find((row)=>modelUrl(row.uri)===url);if(!model)continue;if(!this._synced.has(url)){await proxy.$acceptNewModel({url,lines:linesOf(model),EOL:model.getEOL?.()||"\n",versionId:model.getVersionId?.()??1,});const unsub=model.onDidChangeContent?.(()=>{Promise.resolve(proxy.$acceptRemovedModel(url)).then(()=>proxy.$acceptNewModel({url,lines:linesOf(model),EOL:model.getEOL?.()||"\n",versionId:model.getVersionId?.()??1,}),);});this._synced.set(url,unsub);}}return this.getProxy();}dispose(){for(const unsub of this._synced.values()){unsub?.dispose?.();}this._synced.clear();this._worker?.terminate?.();}}function createWebWorker(opts){const worker=Promise.resolve(getWorker(opts)).then((w)=>{w.postMessage("ignore");w.postMessage(opts.createData??{});return w;});return new MonacoWebWorker(worker,opts.host,opts.keepIdleModels);};return {get "createWebWorker"(){return createWebWorker}}})();let $lh10=(function(h2,h3,h4,h5,h6,h7,h8,h9){function createProvider(moduleUrl){let registerPromise,modePromise,api;async function loadMode(){if(!modePromise)modePromise=(async()=>{await 0;const features=(0,h3["createFeatures"])({typescriptDefaults:api.typescriptDefaults,libFileSet:(0,h7["libFileSet"]),Uri:(0,h8["Uri"]),editor:(0,h8["editor"]),MarkerTag:(0,h8["MarkerTag"]),MarkerSeverity:(0,h8["MarkerSeverity"]),Range:(0,h8["Range"]),languages:(0,h8["languages"])});const{WorkerManager}=(0,h4["createWorkerManager"])({editor:(0,h8["editor"]),createWebWorker:(0,h9["createWebWorker"]),moduleUrl});return (0,h5["createMode"])({WorkerManager,languages:(0,h8["languages"]),...features});})();return modePromise;}return async function loadRegister(){if(!registerPromise)registerPromise=(async()=>{await 0;return api=(0,h2["createRegister"])({typescriptVersion:(0,h6["typescriptVersion"]),languages:(0,h8["languages"]),Emitter:(0,h8["Emitter"]),loadMode});})();return registerPromise;};};return {get "createProvider"(){return createProvider}}})($lh2,$lh3,$lh4,$lh5,$lh6,$lh7,$lh8,$lh9);let $lh11=(function(h9){function createAttach(loadRegister){const SOLID_LIB=`
declare module "solid-js" {
  export type Accessor<T> = () => T;
  export type Setter<T> = (value: T | ((prev: T) => T)) => T;
  export function createSignal<T>(value: T): [Accessor<T>, Setter<T>];
  export function createMemo<T>(fn: () => T): Accessor<T>;
  export function createEffect(fn: () => void): void;
  export function onMount(fn: () => void): void;
  export function onCleanup(fn: () => void): void;
  export function Show(props: { when: unknown; fallback?: unknown; children?: unknown }): unknown;
  export function For<T>(props: { each: T[]; children?: (item: T, index?: Accessor<number>) => unknown }): unknown;
}
declare module "solid-js/web" {
  export function render(code: () => unknown, element: Element): () => void;
}
declare module "solid-js/jsx-runtime" {
  export namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
    type Element = any;
    type ElementChildrenAttribute = { children: {} };
  }
}
declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
  type Element = any;
}
`;function disposable(fn){return{dispose:typeof fn==="function"?fn:()=>{}};}function wordUntil(model,position){const word=model.getWordAtPosition?.(position);const column=position?.column??1;if(!word){return{word:"",startColumn:column,endColumn:column};}const take=Math.max(0,column-word.startColumn);return{word:String(word.word??"").slice(0,take),startColumn:word.startColumn,endColumn:column,};}function enhanceModel(model){if(!model||model.__tsReady)return model;model.__tsReady=true;if(typeof model.getWordUntilPosition!=="function"){model.getWordUntilPosition=(position)=>wordUntil(model,position);}if(typeof model.isDisposed!=="function"){model.isDisposed=()=>Boolean(model.__disposed);}if(typeof model.isAttachedToEditor!=="function"){model.isAttachedToEditor=()=>true;}if(typeof model.isTooLargeForSyncing!=="function"){model.isTooLargeForSyncing=()=>false;}if(typeof model.onDidChangeAttached!=="function"){model.onDidChangeAttached=()=>disposable();}if(typeof model.onWillDispose!=="function"){const orig=typeof model.dispose==="function"?model.dispose.bind(model):()=>{};const listeners=[];model.onWillDispose=(listener)=>{listeners.push(listener);return disposable(()=>{const i=listeners.indexOf(listener);if(i>=0)listeners.splice(i,1);});};model.dispose=()=>{model.__disposed=true;for(const listener of listeners.slice())listener(model);return orig();};}if(typeof model.getOptions!=="function"){model.getOptions=()=>({tabSize:2,insertSpaces:true});}return model;}function syncPaintMarkers(monaco,model){if(!model)return;const rows=monaco.editor.getModelMarkers?.({resource:model.uri})??[];model._paintMarkers=rows.map((m)=>({line:m.startLineNumber,sc:m.startColumn,ec:m.endColumn,severity:Number(m.severity??8),}));}function patchMonacoApi(monaco){const modelCreated=[];const modelDisposed=[];const modelLanguage=[];const languageWaiters=new Map();const languages=monaco.languages;languages.CompletionItemKind=languages.CompletionItemKind??monaco.CompletionItemKind??{Method:0,Function:1,Constructor:2,Field:3,Variable:4,Class:5,Interface:7,Module:8,Property:9,Enum:15,Keyword:17,File:20,};languages.CompletionItemTag={Deprecated:1};languages.SignatureHelpTriggerKind={Invoke:1,TriggerCharacter:2,ContentChange:3};languages.DocumentHighlightKind={Text:0,Read:1,Write:2};languages.InlayHintKind={Type:1,Parameter:2};languages.SymbolKind=languages.SymbolKind??{File:0,Module:1,Namespace:2,Package:3,Class:4,Method:5,Property:6,Field:7,Constructor:8,Enum:9,Interface:10,Function:11,Variable:12,Constant:13,String:14,Number:15,Boolean:16,Array:17,Object:18,Key:19,Null:20,EnumMember:21,Struct:22,Event:23,Operator:24,TypeParameter:25,};if(typeof languages.onLanguage!=="function"){languages.onLanguage=(languageId,callback)=>{const ids=(languages.getLanguages?.()??[]).map((row)=>row.id);if(ids.includes(languageId)){queueMicrotask(callback);return disposable();}const list=languageWaiters.get(languageId)??[];list.push(callback);languageWaiters.set(languageId,list);return disposable(()=>{languageWaiters.set(languageId,(languageWaiters.get(languageId)??[]).filter((fn)=>fn!==callback),);});};}languages.registerOnTypeFormattingEditProvider=(selector,provider)=>languages.registerDocumentFormattingEditProvider(selector,provider);if(typeof languages.registerDocumentRangeFormattingEditProvider!=="function"){languages.registerDocumentRangeFormattingEditProvider=(selector,provider)=>{return languages.registerDocumentFormattingEditProvider(selector,{provideDocumentFormattingEdits(model,options,token){const range=model.getFullModelRange?.()??{startLineNumber:1,startColumn:1,endLineNumber:model.getLineCount?.()??1,endColumn:(model.getLineLength?.(model.getLineCount?.()??1)??0)+1,};return provider.provideDocumentRangeFormattingEdits(model,range,options,token);},provideDocumentRangeFormattingEdits:provider.provideDocumentRangeFormattingEdits?.bind(provider),});};}const origCreate=monaco.editor.createModel.bind(monaco.editor);monaco.editor.createModel=(value,language,uri)=>{const model=enhanceModel(origCreate(value,language,uri));for(const listener of modelCreated.slice())listener(model);return model;};const origGetModels=monaco.editor.getModels.bind(monaco.editor);monaco.editor.getModels=()=>origGetModels().map(enhanceModel);const origGetModel=monaco.editor.getModel.bind(monaco.editor);monaco.editor.getModel=(uri)=>{const model=origGetModel(uri);return model?enhanceModel(model):model;};const origSetMarkers=monaco.editor.setModelMarkers.bind(monaco.editor);monaco.editor.setModelMarkers=(model,owner,markers)=>{origSetMarkers(model,owner,markers);syncPaintMarkers(monaco,model);};monaco.editor.onDidCreateModel=(listener)=>{modelCreated.push(listener);return disposable(()=>{const i=modelCreated.indexOf(listener);if(i>=0)modelCreated.splice(i,1);});};monaco.editor.onWillDisposeModel=(listener)=>{modelDisposed.push(listener);return disposable(()=>{const i=modelDisposed.indexOf(listener);if(i>=0)modelDisposed.splice(i,1);});};monaco.editor.onDidChangeModelLanguage=(listener)=>{modelLanguage.push(listener);return disposable(()=>{const i=modelLanguage.indexOf(listener);if(i>=0)modelLanguage.splice(i,1);});};monaco.editor.createWebWorker=(opts)=>(0,h9["createWebWorker"])(opts);monaco.MarkerTag={Unnecessary:1,Deprecated:2};}async function attachTypescript(monaco){patchMonacoApi(monaco);const ts=await loadRegister();monaco.languages.typescript=ts;monaco.typescript=ts;ts.typescriptDefaults?.setEagerModelSync?.(true);ts.javascriptDefaults?.setEagerModelSync?.(true);ts.typescriptDefaults?.setCompilerOptions?.({target:ts.ScriptTarget?.ES2020??7,module:ts.ModuleKind?.ESNext??99,moduleResolution:ts.ModuleResolutionKind?.NodeJs??2,jsx:ts.JsxEmit?.Preserve??1,jsxImportSource:"solid-js",allowNonTsExtensions:true,allowImportingTsExtensions:true,allowJs:true,noEmit:true,strict:true,});ts.javascriptDefaults?.setCompilerOptions?.({allowNonTsExtensions:true,allowJs:true,checkJs:true,jsx:ts.JsxEmit?.Preserve??1,noEmit:true,});ts.typescriptDefaults?.addExtraLib?.(SOLID_LIB,"ts:solid-js.d.ts");return ts;}return{attachTypescript,SOLID_LIB};};return {get "createAttach"(){return createAttach}}})($lh9);let $lh12=(function(h10,h11){function createPackage(bootMonaco,moduleUrl){const{attachTypescript}=(0,h11["createAttach"])((0,h10["createProvider"])(moduleUrl));function configureWorkers(baseHref){const base=baseHref??new URL("./workers/",moduleUrl).href;globalThis.MonacoEnvironment={getWorker(_id,label){const file=label==="json"?"json.worker.js":label==="css"||label==="scss"||label==="less"?"css.worker.js":label==="html"||label==="handlebars"||label==="razor"?"html.worker.js":label==="typescript"||label==="javascript"?"ts.worker.js":"editor.worker.js";return new Worker(new URL(file,base),{name:String(label??file)})},}}configureWorkers();function createMonaco(){const monaco=bootMonaco();globalThis.monaco=monaco;globalThis.__lilEditor=true;return monaco}const monaco=createMonaco();const ready=attachTypescript(monaco);return{monaco,ready,bootMonaco,attachTypescript,createMonaco,configureWorkers};};return {get "createPackage"(){return createPackage}}})($lh10,$lh11);let si=$lh12["createPackage"];let Ld={parent:null,left:null,right:null,color:0,piece:null,size_left:0,lf_left:0,alive:!1};pc(Ld,[0,[0,0],[0,0],0,0],0);let n=Ld;let qc=13,Md=10,na=65535;let vc=1;let ce={startLineNumber:0,startColumn:0,endLineNumber:0,endColumn:0};ab(ce,1,1,1,1);let de={parent:null,left:null,right:null,color:0,deco:null,maxEndLine:0,maxEndColumn:0,alive:!1};be(de,{id:0,range:ce,className:"",hoverMessage:"",isWholeLine:!1,metadata:0});let y=de;let eb=[];let ia=[],le=!1;let xh=1,yh=2,zh=4,ve=8,ja=[];let we=19,Bh=8,Kc=56;let ra=[];let Wb=0;let hb="vs",Xb=[],nf=[],of={listeners:[],disposed:!1},pf={listeners:[],disposed:!1};let qf=!1;let Ph=2048,Qh=1024,Rh=512,Sh=256;let uf={listeners:[],disposed:!1},jd={listeners:[],disposed:!1},vf=[],kd=[],ld=[],wf=[],md=[],xf=[];let kb=si(Yh,import.meta.url),yf=kb.monaco,_j=yf,ak=yf,bk=kb.ready,ck=kb.attachTypescript,dk=kb.createMonaco,ek=kb.configureWorkers;export{_j as monaco,ak as default,bk as ready,ck as attachTypescript,dk as createMonaco,ek as configureWorkers,Yh as bootMonaco};