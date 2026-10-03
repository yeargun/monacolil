let a=(a,b,c)=>{let d=b,e=c;if(b<0)d=0;if(e>a.length)e=a.length;return d>=e?Vg():Wg(a,d,e)},b=(a,b)=>Xg(a,Yg("\\r\\n|\\r|\\n","g"),b),c=a=>a<1?1:a,e=(a,b,c)=>{a.lineNumber=b;a.column=c},d=function(a){if(!a)return{lineNumber:1,column:1};let b=a.lineNumber|0,d=a.column|0;return{lineNumber:c(b),column:c(d)}},h=(a,b,c,d,e)=>{if(b>d||b==d&&c>e){a.startLineNumber=d;a.startColumn=e;a.endLineNumber=b;a.endColumn=c}else{a.startLineNumber=b;a.startColumn=c;a.endLineNumber=d;a.endColumn=e}},f=(a,b,c,d)=>{let e={startLineNumber:0,startColumn:0,endLineNumber:0,endColumn:0};h(e,a,b,c,d);return e},g=function(a){if(!a){let a={startLineNumber:0,startColumn:0,endLineNumber:0,endColumn:0};h(a,1,1,1,1);return a}let b=a.startLineNumber|0,c=a.startColumn|0,d=a.endLineNumber|0,e=a.endColumn|0,f={startLineNumber:0,startColumn:0,endLineNumber:0,endColumn:0};h(f,b,c,d,e);return f};function Zg(a){return{line:a[0],column:a[1]}}function $g(a){return{bufferIndex:a[0],start:Zg(a[1]),end:Zg(a[2]),lineFeedCnt:a[3],length:a[4]}}let p=(a,b,c)=>{a.piece=$g(b);a.color=c;a.alive=!0;a.parent=a;a.left=a;a.right=a},i=a=>{let b=a;while(b.left!==o)b=b.left;return b},j=a=>{let b=a;while(b.right!==o)b=b.right;return b},k=a=>{if(a.right!==o)return i(a.right);let b=a,c=0;while(b.parent!==o&&c<1e5){++c;if(b.parent.left===b)break;b=b.parent}return b.parent===o||c>=1e5?o:b.parent};function _g(a){return[a.line,a.column]}function ah(a){return[a.bufferIndex,_g(a.start),_g(a.end),a.lineFeedCnt,a.length]}let l=a=>a===o?0:(a.size_left+ah(a.piece)[4]|0)+l(a.right)|0,m=a=>a===o?0:(a.lf_left+ah(a.piece)[3]|0)+m(a.right)|0,r=a=>{let b=[0],c=a.length;for(let d=0;d<c;++d){let e=a.charCodeAt(d)|0;if(e==s){if(d+1<c&&(a.charCodeAt(d+1)|0)==t){b.push(d+2);++d}else b.push(d+1)}else if(e==t)b.push(d+1)}return b},w=(a,b,c,d)=>{a.root=o;a.lineCnt=1;a.eol=c;a.eolLength=c.length;a.eolNormalized=d;a.lastChangeBufferPos={line:0,column:0};a.cacheNode=o;a.lastVisitedLineValue=Vg();a.posNode=o;a.walkLine=1;a.walkCol=1;a.tmpBuffer={buffer:Vg(),lineStarts:[0]};{a.buffers=[{buffer:Vg(),lineStarts:[0]}];a.lastChangeBufferPos={line:0,column:0};a.root=o;a.lineCnt=1;a.length=0;a.eol=c;a.eolLength=c.length;a.eolNormalized=d;let e=o;for(let c=0;c<b.length;++c)e=x(a,e,b[c],c+1);a.cacheValid=!1;a.lastVisitedLineNumber=0;a.lastVisitedLineValue=Vg();I(a)}},x=(a,b,c,d)=>{if(c.buffer.length==0)return b;let e=c.lineStarts;if(e.length==0){e=r(c.buffer);c.lineStarts=e}let g=e[e.length-1],f=[d,[0,0],[e.length-1,c.buffer.length-g|0],e.length-1,c.buffer.length];a.buffers.push(c);return b===o?G(a,o,f):G(a,b,f)},y=(a,b)=>{if(a!==o)a.parent=b},z=(a,b)=>{let c=b.right,d=c.left,e=b.parent;c.size_left=c.size_left+(b.size_left+ah(b.piece)[4]|0)|0;c.lf_left=c.lf_left+(b.lf_left+ah(b.piece)[3]|0)|0;b.right=d;y(d,b);c.parent=e;if(e===o)a.root=c;else if(e.left===b)e.left=c;else e.right=c;c.left=b;b.parent=c},A=(a,b)=>{let c=b.left,d=c.right,e=b.parent;b.left=d;y(d,b);c.parent=e;b.size_left=b.size_left-(c.size_left+ah(c.piece)[4]|0)|0;b.lf_left=b.lf_left-(c.lf_left+ah(c.piece)[3]|0)|0;if(e===o)a.root=c;else if(b===e.right)e.right=c;else e.left=c;c.right=b;b.parent=c},B=(a,b,c,d)=>{let e=b.parent;if(e.left===b){e.size_left=e.size_left+c|0;e.lf_left=e.lf_left+d|0}},C=(a,b,c,d)=>{let e=b;while(e!==a.root&&e!==o){B(a,e,c,d);e=e.parent}},E=(a,b)=>{((a,b)=>{let c=b;if(c===a.root)return;while(c!==a.root&&c===c.parent.right)c=c.parent;if(c===a.root)return;c=c.parent;let d=l(c.left)-c.size_left|0,e=m(c.left)-c.lf_left|0,f=c;f.size_left=f.size_left+d|0;let g=c;g.lf_left=g.lf_left+e|0;while(c!==a.root&&(d!=0||e!=0)){B(a,c,d,e);c=c.parent}})(a,b);let c=b;while(c!==a.root&&c.parent.color==1)if(c.parent===c.parent.parent.left){let b=c.parent.parent.right;if(b.color==1){c.parent.color=0;b.color=0;c.parent.parent.color=1;c=c.parent.parent}else{if(c===c.parent.right){c=c.parent;z(a,c)}c.parent.color=0;c.parent.parent.color=1;A(a,c.parent.parent)}}else{let b=c.parent.parent.left;if(b.color==1){c.parent.color=0;b.color=0;c.parent.parent.color=1;c=c.parent.parent}else{if(c===c.parent.left){c=c.parent;A(a,c)}c.parent.color=0;c.parent.parent.color=1;z(a,c.parent.parent)}}a.root.color=0},F=(a,b)=>{bh(a,b,o)},G=(a,b,c)=>{let e={parent:null,left:null,right:null,color:0,piece:null,size_left:0,lf_left:0,alive:!1};p(e,c,1);e.left=o;e.right=o;e.parent=o;e.size_left=0;e.lf_left=0;if(a.root===o){a.root=e;e.color=0}else if(b.right===o){b.right=e;e.parent=b}else{let a=i(b.right);a.left=e;e.parent=a}E(a,e);return e},H=(a,b,c)=>{let e={parent:null,left:null,right:null,color:0,piece:null,size_left:0,lf_left:0,alive:!1};p(e,c,1);e.left=o;e.right=o;e.parent=o;e.size_left=0;e.lf_left=0;if(a.root===o){a.root=e;e.color=0}else if(b.left===o){b.left=e;e.parent=b}else{let a=j(b.left);a.right=e;e.parent=a}E(a,e);return e},I=a=>{let b=a.root,c=1,d=0;while(b!==o){c=c+(b.lf_left+ah(b.piece)[3]|0)|0;d=d+(b.size_left+ah(b.piece)[4]|0)|0;b=b.right}a.lineCnt=c;a.length=d;J(a,a.length)},J=(a,b)=>{if(a.cacheValid&&(a.cacheNode.alive==!1||a.cacheNodeStartOffset>=b))a.cacheValid=!1},K=(a,b,c)=>a.buffers[b].lineStarts[c[0]]+c[1]|0,L=(a,b,c,d)=>{let e,f,g,h;return d[1]==0?d[0]-c[0]|0:(e=a.buffers[b].lineStarts,d[0]==e.length-1?d[0]-c[0]|0:(f=e[d[0]+1|0],g=e[d[0]]+d[1]|0,f>(g+1|0)?d[0]-c[0]|0:(h=g-1|0,(a.buffers[b].buffer.charCodeAt(h)|0)==s?(d[0]-c[0]|0)+1|0:d[0]-c[0]|0)))},M=(a,b,c)=>{let d=ah(b.piece),j=a.buffers[d[0]].lineStarts,k=(j[d[1][0]]+d[1][1]|0)+c|0,e=d[1][0],f=d[2][0],g=e,h=0,i=0;while(e<=f){g=e+((f-e|0)/2|0)|0;h=j[g];if(g==j.length-1)i=a.buffers[d[0]].buffer.length;else i=j[g+1|0];if(k<h)f=g-1|0;else if(k>=i)e=g+1|0;else break}return[g,k-h|0]},N=(a,b,c)=>ch(a,b,c,o),P=b=>{let c=dh(b,0),d=dh(b,1),e=eh(b,0),f=eh(b,1);if(c===d){let d=K(b,ah(c.piece)[0],ah(c.piece)[1]);return a(b.buffers[ah(c.piece)[0]].buffer,d+e|0,d+f|0)}let g=c,h=K(b,ah(g.piece)[0],ah(g.piece)[1]),i=a(b.buffers[ah(g.piece)[0]].buffer,h+e|0,h+ah(g.piece)[4]|0);g=k(g);let j=0;while(g!==o&&j<1e5){let c=K(b,ah(g.piece)[0],ah(g.piece)[1]);if(g===d){i=fh(i,a(b.buffers[ah(g.piece)[0]].buffer,c,c+f|0));break}i=fh(i,a(b.buffers[ah(g.piece)[0]].buffer,c,c+ah(g.piece)[4]|0));g=k(g);++j}return i},R=(b,c)=>c===o?Vg():fh(fh(R(b,c.left),((b,c)=>{if(c===o)return Vg();let d=ah(c.piece),e=K(b,d[0],d[1]),f=K(b,d[0],d[2]);return a(b.buffers[d[0]].buffer,e,f)})(b,c)),R(b,c.right)),S=a=>a.lineCnt,T=(a,c)=>{if(a.lastVisitedLineNumber==c)return a.lastVisitedLineValue;a.lastVisitedLineNumber=c;if(c==a.lineCnt)a.lastVisitedLineValue=U(a,c,0);else if(a.eolNormalized)a.lastVisitedLineValue=U(a,c,a.eolLength);else a.lastVisitedLineValue=b(U(a,c,0),Vg());return a.lastVisitedLineValue},U=(a,b,c)=>{let d=N(a,b,1),e=0;if(b==a.lineCnt)e=a.length;else e=N(a,b+1|0,1)-c|0;if(e<d)e=d;hh(a,d,o,0);hh(a,e,o,1);return P(a)},V=(b,c)=>{if(c.length>u){let d=[],e=c;while(e.length>u){let c=e.charCodeAt(u-1|0)|0,f="";if(c==s||c>=55296&&c<=56319){f=a(e,0,u-1|0);e=a(e,u-1|0,e.length)}else{f=a(e,0,u);e=a(e,u,e.length)}let g=r(f);d.push([b.buffers.length,[0,0],[g.length-1,f.length-g[g.length-1]|0],g.length-1,f.length]);ih(b,f,g)}let f=r(e);d.push([b.buffers.length,[0,0],[f.length-1,e.length-f[f.length-1]|0],f.length-1,e.length]);ih(b,e,f);return d}let h=b.buffers[0].buffer.length,d=r(c),e=_g(b.lastChangeBufferPos);if(h!=0){for(let a=0;a<d.length;++a){let b=a;d[b]=d[b]+h|0}}b.buffers[0].lineStarts=b.buffers[0].lineStarts.concat(d.slice(1));b.buffers[0].buffer=fh(b.buffers[0].buffer,c);let i=b.buffers[0].buffer.length,j=b.buffers[0].lineStarts.length-1,f=[j,i-b.buffers[0].lineStarts[j]|0],g=[0,e,f,L(b,0,e,f),i-h];b.lastChangeBufferPos=Zg(f);return[g]},W=(a,b,c)=>{let d=ah(b.piece),h=d[3],e=K(a,d[0],d[2]),f=K(a,d[0],c),g=L(a,d[0],d[1],c),i=g-h|0,j=f-e|0;b.piece={bufferIndex:d[0],start:Zg(d[1]),end:Zg(c),lineFeedCnt:g,length:d[4]+j|0};C(a,b,j,i)},X=(a,b,c)=>{let d=ah(b.piece),h=d[3],e=K(a,d[0],d[1]),f=L(a,d[0],c,d[2]),g=K(a,d[0],c),i=f-h|0,j=e-g|0;b.piece={bufferIndex:d[0],start:Zg(c),end:Zg(d[2]),lineFeedCnt:f,length:d[4]+j|0};C(a,b,j,i)},Y=(a,b,c)=>{a.lastVisitedLineNumber=0;a.lastVisitedLineValue=Vg();if(a.root!==o){hh(a,b,o,0);let d=dh(a,0),e=eh(a,0),f=jh(a,0),g=ah(d.piece);if(ah(d.piece)[0]==0&&g[2][0]==_g(a.lastChangeBufferPos)[0]&&g[2][1]==_g(a.lastChangeBufferPos)[1]&&(f+g[4]|0)==b&&c.length<u){{let g=a.buffers[0].buffer.length;a.buffers[0].buffer=fh(a.buffers[0].buffer,c);let b=r(c);for(let a=0;a<b.length;++a){let c=a;b[c]=b[c]+g|0}a.buffers[0].lineStarts=a.buffers[0].lineStarts.concat(b.slice(1));let h=a.buffers[0].lineStarts.length-1,e=[h,a.buffers[0].buffer.length-a.buffers[0].lineStarts[h]|0],i=ah(d.piece)[4]+c.length|0,j=ah(d.piece)[3],f=L(a,0,ah(d.piece)[1],e);d.piece={bufferIndex:ah(d.piece)[0],start:Zg(ah(d.piece)[1]),end:Zg(e),lineFeedCnt:f,length:i};a.lastChangeBufferPos=Zg(e);C(a,d,c.length,f-j|0)}I(a);return}if(f==b){{let b=V(a,c),e=H(a,d,b[b.length-1]),f=b.length-2;while(f>=0){e=H(a,e,b[f]);--f}}J(a,b)}else if((f+ah(d.piece)[4]|0)>b){let b=M(a,d,e),f=[g[0],b,g[2],L(a,g[0],b,g[2]),K(a,g[0],g[2])-K(a,g[0],b)|0];W(a,d,b);let h=V(a,c);if(f[4]>0)G(a,d,f);let i=d;for(let b=0;b<h.length;++b)i=G(a,i,h[b])}else{{let b=V(a,c),e=G(a,d,b[0]);for(let c=1;c<b.length;++c)e=G(a,e,b[c])}}}else{let b=V(a,c),d=H(a,o,b[0]);for(let c=1;c<b.length;++c)d=G(a,d,b[c])}I(a)},Z=(a,b,c)=>{a.lastVisitedLineNumber=0;a.lastVisitedLineValue=Vg();if(c<=0||a.root===o)return;hh(a,b,o,0);hh(a,b+c|0,o,1);let d=dh(a,0),e=dh(a,1),f=eh(a,0),g=eh(a,1),h=jh(a,0);if(d===e){let e=M(a,d,f),i=M(a,d,g);if(h==b){if(c==ah(d.piece)[4]){F(a,d);I(a);return}X(a,d,i);J(a,b);I(a);return}if((h+ah(d.piece)[4]|0)==(b+c|0)){W(a,d,e);I(a);return}{let b=ah(d.piece),c=b[1],f=b[2],j=b[4],k=b[3],g=L(a,b[0],b[1],e),l=K(a,b[0],e)-K(a,b[0],c)|0;d.piece={bufferIndex:b[0],start:Zg(b[1]),end:Zg(e),lineFeedCnt:g,length:l};C(a,d,l-j|0,g-k|0);G(a,d,[b[0],i,f,L(a,b[0],i,f),K(a,b[0],f)-K(a,b[0],i)|0])}I(a);return}let i=[];W(a,d,M(a,d,f));J(a,b);if(ah(d.piece)[4]==0)i.push(d);X(a,e,M(a,e,g));if(ah(e.piece)[4]==0)i.push(e);let n=k(d);while(n!==o&&n!==e){i.push(n);n=k(n)}for(let b=0;b<i.length;++b)F(a,i[b]);I(a)},$=(a,b,c,d,e,f)=>{let g=[];if(b.length==0||f<=0)return g;let h="g";if(!d)h="gi";let i=b;if(!c){let a;{let c=Vg(),d=0;while(d<b.length){let a=b.charAt(d);if(a=="\\"||a=="^"||a=="$"||a=="."||a=="|"||a=="?"||a=="*"||a=="+"||a=="("||a==")"||a=="["||a=="]"||a=="{"||a=="}")c=fh(fh(c,"\\"),a);else c=fh(c,a);++d}a=c}i=a}if(e)i=fh(fh("\\b(?:",i),")\\b");let j=Yg(i,h),k=S(a),l=1,m=f*3|0;while(l<=k&&g.length<m){let b=T(a,l),c=kh(j,b);while(c&&g.length<m){let a=c.index|0,d=c[0]+"";g.push(l);g.push(a+1|0);g.push((a+d.length|0)+1|0);c=kh(j,b)}l=l+1|0}return g},ba=(a,b,c)=>N(a.tree,b,c),ca=(a,b)=>{let d,c=a.tree;return lh((d=o,c),b,d)},da=a=>{let b=a.tree;return R(b,b.root)},_=function(a,c){let d;{let e=b(a,c),i=[{buffer:e,lineStarts:r(e)}],j={root:null,buffers:[],lineCnt:0,length:0,eol:"",eolLength:0,eolNormalized:!1,lastChangeBufferPos:null,cacheNode:null,cacheNodeStartOffset:0,cacheNodeStartLineNumber:0,cacheHasLine:!1,cacheValid:!1,lastVisitedLineNumber:0,lastVisitedLineValue:"",posNode:null,posRemainder:0,posStart:0,walkLine:0,walkCol:0,tmpBuffer:null};w(j,i,c,!0);d=j}return{tree:d,bom:Vg(),mightContainRTLFlag:!1,mightContainUnusualLineTerminatorsFlag:!1,mightContainNonBasicASCII:!1}},ja=(a,b,c,d,e,f)=>{a.scheme=b;a.authority=c;a.path=d;a.query=e;a.fragment=f},ka=a=>{let b=a.scheme+":";if(a.authority.length>0||a.scheme=="file"||a.scheme=="inmemory")b=b+"//"+a.authority;b=b+a.path;if(a.query.length>0)b=b+"?"+a.query;if(a.fragment.length>0)b=b+"#"+a.fragment;return b},fa=function(b){let c=b.indexOf(":"),d="file",e=b;if(c>=0){d=a(b,0,c);e=a(b,c+1|0,b.length)}let f=(b=>{let c=["",b];if(!b.startsWith("//"))return c;let d=a(b,2,b.length),e=d.indexOf("/");return e<0?(c[0]=d,c[1]="",c):(c[0]=a(d,0,e),c[1]=a(d,e,d.length),c)})(e),g;{let j=f[1],b="",c="",d=j,e=d.indexOf("#");if(e>=0){b=a(d,e+1|0,d.length);d=a(d,0,e)}let h=d.indexOf("?");if(h>=0){c=a(d,h+1|0,d.length);d=a(d,0,h)}g=[d,c,b]}let n=g;return{scheme:d,authority:f[0],path:n[0],query:n[1],fragment:n[2]}},ha=()=>{let a=ia;ia=ia+1|0;return{scheme:"inmemory",authority:"",path:"/model/"+a.toString(),query:"",fragment:""}},ma=(a,b)=>{a.listeners.push(b);return()=>{let c=a.listeners.indexOf(b);if(c>=0)a.listeners.splice(c,1)}},na=a=>{let b=a.listeners.slice(),c=0;while(c<b.length){b[c]();++c}},oa=a=>{a.disposed=!0;a.listeners=[]},za=(a,b)=>{a.deco=b;a.maxEndLine=b.range.endLineNumber;a.maxEndColumn=b.range.endColumn;a.alive=!0;a.parent=a;a.left=a;a.right=a},pa=(a,b)=>a.startLineNumber!=b.startLineNumber?a.startLineNumber<b.startLineNumber:a.startColumn!=b.startColumn?a.startColumn<b.startColumn:a.endLineNumber!=b.endLineNumber?a.endLineNumber<b.endLineNumber:a.endColumn<b.endColumn,qa=(a,b)=>{if(a!==xa)a.parent=b},ra=(a,b)=>{let c=b.right,d=c.left,e=b.parent;b.right=d;qa(d,b);c.parent=e;if(e===xa)a.root=c;else if(e.left===b)e.left=c;else e.right=c;c.left=b;b.parent=c;Ba(a,b);Ba(a,c)},sa=(a,b)=>{let c=b.left,d=c.right,e=b.parent;b.left=d;qa(d,b);c.parent=e;if(e===xa)a.root=c;else if(e.right===b)e.right=c;else e.left=c;c.right=b;b.parent=c;Ba(a,b);Ba(a,c)},ta=(a,b)=>{let c=b.parent.parent.right;if(c.color==1){c.color=0;b.parent.color=0;b.parent.parent.color=1;return b.parent.parent}if(b===b.parent.right){b=b.parent;ra(a,b)}b.parent.color=0;b.parent.parent.color=1;sa(a,b.parent.parent);return b},ua=(a,b)=>{let c=b.parent.parent.left;if(c.color==1){c.color=0;b.parent.color=0;b.parent.parent.color=1;return b.parent.parent}if(b===b.parent.left){b=b.parent;sa(a,b)}b.parent.color=0;b.parent.parent.color=1;ra(a,b.parent.parent);return b},va=(a,b)=>{let c=b;while(c!==xa){Ba(a,c);c=c.parent}},wa=(a,b,c,d,e)=>{let j=a.nextId;a.nextId=j+1|0;let k={id:j,range:b,className:c,hoverMessage:d,isWholeLine:e,metadata:0},l={parent:null,left:null,right:null,color:0,deco:null,maxEndLine:0,maxEndColumn:0,alive:!1},h;za(l,k);l.color=1;l.left=xa;l.right=xa;l.parent=xa;if(a.root===xa){a.root=l;l.color=0;return k}{let c=a.root,d=xa;while(c!==xa){d=c;if(pa(b,c.deco.range))c=c.left;else c=c.right}h=d}let m=h;l.parent=m;if(pa(b,m.deco.range))m.left=l;else m.right=l;va(a,l);{let b=l;while(b.parent.color==1){if(b.parent===b.parent.parent.left)b=ta(a,b);else b=ua(a,b);if(b===a.root)break}a.root.color=0}return k},Ba=(a,b)=>{let c=b.deco.range.endLineNumber,d=b.deco.range.endColumn;if(b.left!==xa)if(b.left.maxEndLine>c||b.left.maxEndLine==c&&b.left.maxEndColumn>d){c=b.left.maxEndLine;d=b.left.maxEndColumn}if(b.right!==xa)if(b.right.maxEndLine>c||b.right.maxEndLine==c&&b.right.maxEndColumn>d){c=b.right.maxEndLine;d=b.right.maxEndColumn}b.maxEndLine=c;b.maxEndColumn=d},Ca=(a,b)=>{ra(a,b)},Da=(a,b)=>{sa(a,b)},Ea=(a,b,c)=>{if(b===xa)return xa;if(b.deco.id==c)return b;let d=Ea(a,b.left,c);return d!==xa?d:Ea(a,b.right,c)},Fa=(a,b,c)=>{let d=b.parent;if(d===xa)a.root=c;else if(d.left===b)d.left=c;else d.right=c;c.parent=d},Ga=(a,b)=>{let c=b.parent,d=c.right;if(d.color==1){d.color=0;c.color=1;Ca(a,c);c=b.parent;d=c.right}let f=d.left,e=d.right;if(f.color==0&&e.color==0){d.color=1;return c}if(e.color==0){f.color=0;d.color=1;Da(a,d);c=b.parent;d=c.right;e=d.right}d.color=c.color;c.color=0;e.color=0;Ca(a,c);return a.root},Ha=(a,b)=>{let c=b.parent,d=c.left;if(d.color==1){d.color=0;c.color=1;Da(a,c);c=b.parent;d=c.left}let e=d.left,f=d.right;if(f.color==0&&e.color==0){d.color=1;return c}if(e.color==0){f.color=0;d.color=1;Ca(a,d);c=b.parent;d=c.left;e=d.left}d.color=c.color;c.color=0;e.color=0;Da(a,c);return a.root},Ia=(a,b)=>{a.deleteWasY=b;a.deleteWasX=xa;a.deleteWasRed=b.color==1;if(b.left===xa){let c=b.right;a.deleteWasX=c;Fa(a,b,c)}else if(b.right===xa){let c=b.left;a.deleteWasX=c;Fa(a,b,c)}else{let c;{let a=b.right;while(a.left!==xa)a=a.left;c=a}let e=c,d=e.right;a.deleteWasY=e;a.deleteWasRed=e.color==1;a.deleteWasX=d;{let c=e.right;if(e.parent===b)c.parent=e;else{Fa(a,e,e.right);e.right=b.right;qa(e.right,e)}Fa(a,b,e);e.left=b.left;qa(e.left,e);e.color=b.color}}let c=a.deleteWasX;b.alive=!1;va(a,c.parent);if(!a.deleteWasRed){{let b=c;while(b!==a.root&&b.color==0)if(b.parent.left===b)b=Ga(a,b);else b=Ha(a,b);b.color=0}}xa.parent=xa;xa.left=xa;xa.right=xa},Ma=(a,b,c,d)=>{a.range=b;a.text=c;a.identifier=d},Oa=a=>{a.versionId=a.versionId+1|0;a.alternativeVersionId=a.alternativeVersionId+1|0},Pa=a=>{if(a.past.length==0)return null;let b=a.past[a.past.length-1];a.past.splice(a.past.length-1,1);Oa(a);return b},Qa=a=>{if(a.future.length==0)return null;let b=a.future[a.future.length-1];a.future.splice(a.future.length-1,1);Oa(a);return b},Ra=(a,b,c)=>{a.range=b;a.matches=c},Sa=a=>{if(a.length==0)return!1;let b=a.charCodeAt(0)|0;return b>=48&&b<=57?!0:b>=65&&b<=90?!0:b>=97&&b<=122?!0:a=="_"||a=="$"},Ta=a=>{let c=a.length,b=0;while(b<c){let c=a.charAt(b);if(c!=" "&&c!="\t")return b;++b}return c},Ua=(b,c)=>{let d=c-1|0;if(d<0)d=0;let g=b.length;if(d>g)d=g;let h=d,e=0;while(h>e){if(!Sa(b.charAt(h-e-1)))break;++e}let n=h-e,i=d,f=0,o=b.length;while((i+f|0)<o){if(!Sa(b.charAt(i+f|0)))break;f=f+1|0}let p=i+f|0;return{word:a(b,n,p),startColumn:n+1,endColumn:p+1|0}},ab=(a,b,c,d)=>{a.buffer=_(b,"\n");a.languageId=c;a.uri=d;a.stack={past:[],future:[],versionId:1,alternativeVersionId:1};a.decorations={root:xa,nextId:1,deleteWasY:xa,deleteWasX:xa,deleteWasRed:!1};a.contentEmitter={listeners:[],disposed:!1};a.versionId=1},bb=a=>da(a.buffer),cb=(a,b)=>{a.buffer=_(b,"\n");a.versionId=a.versionId+1|0;na(a.contentEmitter)},db=a=>S(a.buffer.tree),eb=a=>a.buffer.tree.length,fb=(a,b)=>T(a.buffer.tree,b),gb=(a,b)=>{let c=a.buffer.tree;return b==c.lineCnt?c.length-N(c,b,1)|0:(N(c,b+1|0,1)-N(c,b,1)|0)-c.eolLength|0},hb=(a,b)=>{let d,e,c=a.buffer;return ba((d=b.lineNumber,e=b.column,c),d,e)},ib=(a,b,c)=>ba(a.buffer,b,c),jb=(a,b)=>ca(a.buffer,b),kb=(a,b)=>{let d,c=a.buffer;return b.startLineNumber==b.endLineNumber&&b.startColumn==b.endColumn?Vg():(d=c.tree,b.startLineNumber==b.endLineNumber&&b.startColumn==b.endColumn?Vg():(gh(d,b.startLineNumber,b.startColumn,o,0),gh(d,b.endLineNumber,b.endColumn,o,1),P(d)))},lb=(b,c,d)=>{let e=[];for(let a=0;a<c.length;++a)e.push(c[a]);let g=0;while(g<e.length){let a=g+1;while(a<e.length){let b=e[g],c=e[a],d=b.range.startLineNumber,f=b.range.startColumn,h=c.range.startLineNumber,i=c.range.startColumn;if(h>d||h==d&&i>f){e[g]=c;e[a]=b}++a}++g}let h=[],i=0;while(i<e.length){let o,p,r,s,t,v,w,x,y,z,l=e[i],m=l.range,c=fh(Vg(),l.text),n=b.buffer,d=ba((o=m.startLineNumber,p=m.startColumn,n),o,p),q=b.buffer,g=ba((r=m.endLineNumber,s=m.endColumn,q),r,s),j=a((t=b.buffer,da(t)),d,g);if(g>d){let a=b.buffer,c=g-d|0;Z(a.tree,d,c)}if(c.length>0)Y(b.buffer.tree,d,c);let u=b.buffer,k=ca((v=d+c.length|0,u),v);h.push((w=f(m.startLineNumber,m.startColumn,k.lineNumber,k.column),x=fh(Vg(),j),y=l.identifier,z={range:null,text:"",identifier:0},Ma(z,w,x,y),z));++i}b.versionId=b.versionId+1|0;if(d){let a=b.stack;a.past.push(h);a.future=[];Oa(a)}na(b.contentEmitter);return h},mb=a=>{let b=Pa(a.stack);if(!b)return!1;let c=lb(a,b,!1);a.stack.future.push(c);return!0},nb=a=>{let b=Qa(a.stack);if(!b)return!1;let c=lb(a,b,!1);a.stack.past.push(c);return!0},ob=(a,b,c)=>{let d=0;while(d<b.length){let c=a.decorations;{let f,e=b[d],a=Ea((f=c.root,c),f,e);if(a!==xa)Ia(c,a)}++d}mh(a);a.decoScratchIdx=0;while(a.decoScratchIdx<c.length){let d=c[a.decoScratchIdx],b=wa(a.decorations,d.range,d.className,d.hoverMessage,d.isWholeLine);nh(a,b.id);a.decoScratchIdx=a.decoScratchIdx+1|0}return oh(a)},pb=(a,b,c,d,e,g)=>{let h;{let l=a.buffer.tree,i=[],j=$(l,b,c,d,e,g),k=0;while((k+2|0)<j.length){let a,b,c;i.push((a=f(j[k],j[k+1|0],j[k],j[k+2|0]),b=[],c={range:null,matches:[]},Ra(c,a,b),c));k=k+3|0}h=i}return h},qb=(a,b)=>Ua(fb(a,b.lineNumber),b.column),rb=(a,b)=>ma(a.contentEmitter,b),Wa=function(a,b="plaintext"){let e=ha(),f={buffer:null,uri:null,languageId:"",stack:null,decorations:null,contentEmitter:null,versionId:0,decoScratchIdx:0};ab(f,a,b,e);_a.push(f);return f},Xa=function(a,b,c){let e={buffer:null,uri:null,languageId:"",stack:null,decorations:null,contentEmitter:null,versionId:0,decoScratchIdx:0};ab(e,a,b,c);_a.push(e);return e},Ya=function(){return _a},Za=function(a,b,c,d,e){return{range:f(a,b,c,d),text:fh(Vg(),e),identifier:0}},ub=(a,b,c,d,e)=>{let g={startLineNumber:0,startColumn:0,endLineNumber:0,endColumn:0};h(g,b,c,d,e);a.startLineNumber=g.startLineNumber;a.startColumn=g.startColumn;a.endLineNumber=g.endLineNumber;a.endColumn=g.endColumn;a.selectionStartLineNumber=b;a.selectionStartColumn=c;a.positionLineNumber=d;a.positionColumn=e},sb=(a,b,c,d)=>{let e={startLineNumber:0,startColumn:0,endLineNumber:0,endColumn:0,selectionStartLineNumber:0,selectionStartColumn:0,positionLineNumber:0,positionColumn:0};ub(e,a,b,c,d);return e},tb=function(a){if(!a){let a={startLineNumber:0,startColumn:0,endLineNumber:0,endColumn:0,selectionStartLineNumber:0,selectionStartColumn:0,positionLineNumber:0,positionColumn:0};ub(a,1,1,1,1);return a}let b=a.selectionStartLineNumber|0,c=a.selectionStartColumn|0,d=a.positionLineNumber|0,e=a.positionColumn|0;if(b<1){b=a.startLineNumber|0;c=a.startColumn|0;d=a.endLineNumber|0;e=a.endColumn|0}let j={startLineNumber:0,startColumn:0,endLineNumber:0,endColumn:0,selectionStartLineNumber:0,selectionStartColumn:0,positionLineNumber:0,positionColumn:0};ub(j,b,c,d,e);return j},vb=(a,b)=>a.stateNames.indexOf(b),wb=(a,b)=>{if(vb(a,b)>=0)return;a.stateNames.push(b);a.stateRules.push([])},xb=()=>"["+" "+"\\t\\r\\n]+",yb=()=>"delim"+"iter",zb=()=>yb()+".bracket",Ab=(a,b,c,d,e,f,g)=>{let j,k;wb(a,b);let h=vb(a,b),i=c;if(c.length==0||c.charAt(0)!="^")i="^(?:"+c+")";a.stateRules[h].push((j=Yg(i,""),k={pattern:null,lineStart:!1,kind:0,token:"",next:""},((a,b,c,d,e,f)=>{a.pattern=b;a.lineStart=c;a.kind=d;a.token=e;a.next=f})(k,j,g,d,e,f),k))},Bb=(a,b,c,d)=>{let f={languageId:a,tokenPostfix:b,defaultToken:c,keywords:d,stateNames:[],stateRules:[],maxStack:100};wb(f,"root");return f},Eb=()=>{let b=Bb("javascript",".js","source",["break","case","catch","class","continue","const","constructor","debugger","default","delete","do","else","export","extends","false","finally","for","from","function","get","if","import","in","instanceof","let","new","null","return","set","static","super","switch","symbol","this","throw","true","try","typeof","undefined","var","void","while","with","yield","async","await","of","type","interface","enum","implements","package","private","protected","public","readonly","namespace","abstract","as","asserts","keyof","infer","never","unknown","any","boolean","number","string","unique"]);Ab(b,"root",xb(),0,"","",!1);Ab(b,"root","//.*",0,"comment","",!1);Ab(b,"root","/\\*",1,"comment","comment",!1);Ab(b,"root","\\\"",1,"string","string",!1);Ab(b,"root","'",1,"string","stringS",!1);Ab(b,"root","`",1,"string","stringT",!1);Ab(b,"root","0[xX][0-9a-fA-F]+",0,"number","",!1);Ab(b,"root","\\d+\\.\\d+([eE][+\\-]?\\d+)?",0,"number","",!1);Ab(b,"root","\\d+",0,"number","",!1);Ab(b,"root","[a-zA-Z_$][\\w$]*",4,"identifier","",!1);Ab(b,"root","[{}()\\[\\]]",0,zb(),"",!1);Ab(b,"root","[;,.]",0,yb(),"",!1);Ab(b,"root","[+\\-*/%&|^~<>=!?:]+",0,yb(),"",!1);wb(b,"comment");Ab(b,"comment","\\*/",2,"comment","",!1);Ab(b,"comment","[^*]+",0,"comment","",!1);Ab(b,"comment","\\*",0,"comment","",!1);wb(b,"string");Ab(b,"string","\\\\.",0,"string.escape","",!1);Ab(b,"string","\\\"",2,"string","",!1);Ab(b,"string","[^\\\\\"]+",0,"string","",!1);wb(b,"stringS");Ab(b,"stringS","\\\\.",0,"string.escape","",!1);Ab(b,"stringS","'",2,"string","",!1);Ab(b,"stringS","[^\\\\']+",0,"string","",!1);wb(b,"stringT");Ab(b,"stringT","\\\\.",0,"string.escape","",!1);Ab(b,"stringT","`",2,"string","",!1);Ab(b,"stringT","[^\\\\`]+",0,"string","",!1);return b},Fb=()=>{let a=Eb();a.languageId="typescript";a.tokenPostfix=".ts";return a},Gb=()=>{let b=Bb("json",".json","",["true","false","null"]);Ab(b,"root",xb(),0,"","",!1);Ab(b,"root","[{}\\[\\]]",0,zb(),"",!1);Ab(b,"root","[:,]",0,yb(),"",!1);Ab(b,"root","true|false|null",4,"keyword","",!1);Ab(b,"root","-?\\d+(\\.\\d+)?([eE][+\\-]?\\d+)?",0,"number","",!1);Ab(b,"root","\\\"",1,"string","string",!1);wb(b,"string");Ab(b,"string","\\\\.",0,"string.escape","",!1);Ab(b,"string","\\\"",2,"string","",!1);Ab(b,"string","[^\\\\\"]+",0,"string","",!1);return b},Hb=()=>{let b=Bb("python",".python","",["False","None","True","and","as","assert","async","await","break","class","continue","def","del","elif","else","except","finally","for","from","global","if","import","in","is","lambda","nonlocal","not","or","pass","raise","return","try","while","with","yield","match","case"]);Ab(b,"root",xb(),0,"","",!1);Ab(b,"root","#.*",0,"comment","",!1);Ab(b,"root","\\\"\\\"\\\"",1,"string","tstring",!1);Ab(b,"root","'''",1,"string","tstringS",!1);Ab(b,"root","\\\"",1,"string","string",!1);Ab(b,"root","'",1,"string","stringS",!1);Ab(b,"root","\\d+\\.\\d+",0,"number","",!1);Ab(b,"root","\\d+",0,"number","",!1);Ab(b,"root","[a-zA-Z_][\\w]*",4,"identifier","",!1);Ab(b,"root","[{}()\\[\\]]",0,zb(),"",!1);Ab(b,"root","[:;,.=+\\-*/%<>!&|^~]+",0,yb(),"",!1);wb(b,"string");Ab(b,"string","\\\\.",0,"string.escape","",!1);Ab(b,"string","\\\"",2,"string","",!1);Ab(b,"string","[^\\\\\"]+",0,"string","",!1);wb(b,"stringS");Ab(b,"stringS","\\\\.",0,"string.escape","",!1);Ab(b,"stringS","'",2,"string","",!1);Ab(b,"stringS","[^\\\\']+",0,"string","",!1);wb(b,"tstring");Ab(b,"tstring","\\\"\\\"\\\"",2,"string","",!1);Ab(b,"tstring","[^\"]+",0,"string","",!1);Ab(b,"tstring","\\\"",0,"string","",!1);wb(b,"tstringS");Ab(b,"tstringS","'''",2,"string","",!1);Ab(b,"tstringS","[^']+",0,"string","",!1);Ab(b,"tstringS","'",0,"string","",!1);return b},Ib=()=>{let b=Bb("html",".html","",["html","head","body","div","span","script","style","link","meta","title","p","a","ul","ol","li","table","tr","td","th","form","input","button","img","h1","h2","h3","h4","h5","h6","section","article","nav","footer","header","main","pre","code","textarea","select","option"]);Ab(b,"root",xb(),0,"","",!1);Ab(b,"root","<!--",1,"comment","comment",!1);Ab(b,"root","</?[a-zA-Z][\\w:-]*",1,"tag","tag",!1);Ab(b,"root","[^<]+",0,"","",!1);wb(b,"comment");Ab(b,"comment","-->",2,"comment","",!1);Ab(b,"comment","[^-]+",0,"comment","",!1);Ab(b,"comment","-",0,"comment","",!1);wb(b,"tag");Ab(b,"tag","/?>",2,"tag","",!1);Ab(b,"tag",xb(),0,"","",!1);Ab(b,"tag","[a-zA-Z_:][\\w:.-]*",0,"attribute.name","",!1);Ab(b,"tag","=",0,yb(),"",!1);Ab(b,"tag","\\\"",1,"attribute.value","attr",!1);Ab(b,"tag","'",1,"attribute.value","attrS",!1);wb(b,"attr");Ab(b,"attr","\\\"",2,"attribute.value","",!1);Ab(b,"attr","[^\\\"]+",0,"attribute.value","",!1);wb(b,"attrS");Ab(b,"attrS","'",2,"attribute.value","",!1);Ab(b,"attrS","[^']+",0,"attribute.value","",!1);return b},Jb=()=>{let b=Bb("css",".css","",["important","color","background","margin","padding","border","display","flex","grid","position","top","left","right","bottom","width","height","font","text","align","justify","content","absolute","relative","fixed","block","inline","none","auto","inherit","initial"]);Ab(b,"root",xb(),0,"","",!1);Ab(b,"root","/\\*",1,"comment","comment",!1);Ab(b,"root","\\\"",1,"string","string",!1);Ab(b,"root","#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})\\b",0,"number.hex","",!1);Ab(b,"root","-?\\d+(\\.\\d+)?(px|em|rem|%|vh|vw|pt|ex)?",0,"number","",!1);Ab(b,"root","[a-zA-Z_-][\\w-]*",4,"identifier","",!1);Ab(b,"root","[{}();:]",0,yb(),"",!1);Ab(b,"root","[.,#>\\[\\]+~*]",0,yb(),"",!1);wb(b,"comment");Ab(b,"comment","\\*/",2,"comment","",!1);Ab(b,"comment","[^*]+",0,"comment","",!1);Ab(b,"comment","\\*",0,"comment","",!1);wb(b,"string");Ab(b,"string","\\\"",2,"string","",!1);Ab(b,"string","[^\\\"]+",0,"string","",!1);return b},Kb=()=>{let b=Bb("markdown",".md","",[]);Ab(b,"root","^#{1,6}[ \\t].*$",0,"keyword","",!0);Ab(b,"root","^\\s*[-*+]\\s+",0,"keyword","",!0);Ab(b,"root","`+",1,"string","code",!1);Ab(b,"root","\\*\\*[^*]+\\*\\*",0,"strong","",!1);Ab(b,"root","\\*[^*]+\\*",0,"emphasis","",!1);Ab(b,"root","\\[[^\\]]+\\]\\([^\\)]+\\)",0,"string.link","",!1);Ab(b,"root","[^`*\\[#]+",0,"","",!1);Ab(b,"root",".",0,"","",!1);wb(b,"code");Ab(b,"code","`+",2,"string","",!1);Ab(b,"code","[^`]+",0,"string","",!1);return b},Rb=(a,b,c,d,e,f)=>{a.id=b;a.lexer=c;a.lineComment=d;a.blockCommentStart=e;a.blockCommentEnd=f;a.tokensProvider=ph()},Lb=a=>{let b=0;while(b<Pb.length){if(Pb[b].id==a.id){Pb[b]=a;return}++b}Pb.push(a)},Mb=()=>{let a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p;if(Qb)return;Qb=!0;Lb((a=Eb(),b={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},Rb(b,"javascript",a,"//","/*","*/"),b));Lb((c=Fb(),d={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},Rb(d,"typescript",c,"//","/*","*/"),d));Lb((e=Gb(),f={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},Rb(f,"json",e,"//","/*","*/"),f));Lb((g=Hb(),h={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},Rb(h,"python",g,"#","\"\"\"","\"\"\""),h));Lb((i=Ib(),j={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},Rb(j,"html",i,"","<!--","-->"),j));Lb((k=Jb(),l={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},Rb(l,"css",k,"","/*","*/"),l));Lb((m=Kb(),n={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},Rb(n,"markdown",m,"","",""),n));Lb((o=Eb(),p={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},Rb(p,"plaintext",o,"","",""),p))},Nb=a=>{Mb();let b=0;while(b<Pb.length){if(Pb[b].id==a)return Pb[b];++b}return null},Ob=function(){Mb();let a=[],b=0;while(b<Pb.length){a.push(Pb[b].id);++b}return a},gc=(a,b,c)=>{a.startLine=b;a.endLine=c},hc=(a,b,c)=>{a.label=b;a.insertText=c;a.kind=18;a.detail=Vg()},Sb=(a,b,c,d,e)=>pb(a,b,c,d,e,1e3),Tb=a=>{let b=[],c=db(a),d=1;while(d<=c){let e=fb(a,d),f=Ta(e);if(f==e.length){d=d+1|0;continue}let g=d,h=d+1|0;while(h<=c){let b=fb(a,h),c=Ta(b);if(c==b.length){h=h+1|0;continue}if(c>f){g=h;h=h+1|0;continue}break}if(g>d){let a,c,e;b.push((a=d,c=g,e={startLine:0,endLine:0,collapsed:!1},gc(e,a,c),e))}d=d+1|0}return b},Ub=(a,b)=>{let c=bb(a),d=hb(a,b);if(d>=c.length)return null;let e=c.charAt(d),g="([{",h=")]}",i=g.indexOf(e);if(i>=0){let e=1,j=d+1;while(j<c.length){let d=c.charAt(j);if(d==g.charAt(i))e=e+1|0;else if(d==h.charAt(i)){e=e-1|0;if(e==0){let c=jb(a,j);return f(b.lineNumber,b.column,c.lineNumber,c.column+1|0)}}++j}return null}i=h.indexOf(e);if(i>=0){let e=1,j=d-1|0;while(j>=0){let d=c.charAt(j);if(d==h.charAt(i))e=e+1|0;else if(d==g.charAt(i)){e=e-1|0;if(e==0){let c=jb(a,j);return f(c.lineNumber,c.column,b.lineNumber,b.column+1|0)}}--j}}return null},Vb=(a,b)=>Ua(fb(a,b.lineNumber),b.column).word,Wb=(a,b,c,d)=>{if(a.length==0)return;if(c.length>=200)return;if(d.indexOf(a)>=0)return;if(b.length==0||a.indexOf(b)==0){let b;c.push((b={label:"",insertText:"",kind:0,detail:""},hc(b,a,a),b));d.push(a)}},Xb=(a,b)=>{let c=Vb(a,b),d=[],e=[],f=1,g=db(a);while(f<=g&&d.length<200){{let h=fb(a,f),b=Vg(),g=0,i=h.length;while(g<=i){let a=!1,f=Vg();if(g<i){f=h.charAt(g);a=Sa(f)}if(a)b=b+f;else{Wb(b,c,d,e);b=Vg()}++g}}f=f+1|0}let h=Nb(a.languageId);if(h){let a=0;while(a<h.lexer.keywords.length){Wb(h.lexer.keywords[a],c,d,e);++a}}return d},Yb=a=>{let b=Vg(),c=0;while(c<a.length){if(a.charAt(c)=="$"&&c+1<a.length){let b=a.charAt(c+1);if(b=="0"||b=="1"||b=="2"||b=="3"){c=c+2;continue}if(b=="{"){let b=c+2;while(b<a.length&&a.charAt(b)!="}")++b;c=b+1;continue}}b=b+a.charAt(c);++c}return b},Zb=(b,c,d)=>{let e=Nb(d),f="//";if(e&&e.lineComment.length>0)f=e.lineComment;let g=fb(b,c),h=Ta(g),i=a(g,h,g.length);if(i.indexOf(f)==0){let d=f.length;if(i.length>d&&i.charAt(d)==" ")++d;let e=a(g,0,h)+a(i,d,i.length);lb(b,[Za(c,1,c,g.length+1,e)],!0)}else{let d=a(g,0,h)+f+" "+i;lb(b,[Za(c,1,c,g.length+1,d)],!0)}},$b=(a,b)=>{let c=Vb(a,b);if(c.length==0)return[];return pb(a,c,!1,!0,!0,200)},_b=a=>{let b=[],c=db(a),d=1;while(d<=c){let c=fb(a,d),e=c.indexOf("http://");if(e<0)e=c.indexOf("https://");if(e>=0){let i,j,k,a=0,g=c.length;while((e+a|0)<g){let b=c.charAt(e+a|0);if(b==" "||b=="\t"||b==")"||b=="\"")break;a=a+1|0}let h=e+a|0;b.push(f((i=d,j=e+1|0,k=d,i),j,k,h+1|0))}d=d+1|0}return b},ac=(a,b)=>{let c=[],d=Ta(fb(a,b)),e=1;while(e<b){let b=fb(a,e),f=Ta(b);if(f<d&&f!=b.length){c.push(b);d=f}++e}return c},bc=a=>{let b=Vg(),c=0,d=0;while(d<a.length){let e=a.charAt(d);if(e=="{"){b=b+e+"\n";c=c+1|0;let a=0;while(a<c){b=b+"  ";a=a+1|0}}else{if(e=="}"){if(c>0)c=c-1|0;b=b+"\n";let a=0;while(a<c){b=b+"  ";a=a+1|0}}b=b+e}d=d+1|0}return b},cc=(a,b)=>b?dc(a):ec(a),dc=a=>{let b=Vg(),c=0;while(c<a.length){let d=a.charCodeAt(c)|0;if(d>=97&&d<=122)b=b+fc(d-32);else b=b+a.charAt(c);++c}return b},ec=a=>{let b=Vg(),c=0;while(c<a.length){let d=a.charCodeAt(c)|0;if(d>=65&&d<=90)b=b+fc(d+32);else b=b+a.charAt(c);++c}return b},fc=a=>qh(a*1),ic=a=>ka(a.uri),jc=(a,b,c)=>{let d=[],e=0;while(e<a.length){let f=a[e];f.owner=b;f.resource=c;d.push(f);++e}return d},kc=(a,b,c)=>{let d=[],e=0;while(e<rc.length&&(c<=0||d.length<c)){let c=rc[e],f=a.length==0||c.owner==a,g=b.length==0||c.resource==b;if(f&&g)d.push(c);++e}return d},lc=a=>kc("",ic(a),0),mc=(a,b,c)=>{let d=1,e=1,f=1,g=1,h=qc,i="";if(a){if(a.startLineNumber)d=a.startLineNumber|0;if(a.startColumn)e=a.startColumn|0;if(a.endLineNumber)f=a.endLineNumber|0;if(a.endColumn)g=a.endColumn|0;if(a.severity)h=a.severity|0;if(a.message)i=a.message+""}return{owner:b,message:i,severity:h,startLineNumber:d,startColumn:e,endLineNumber:f,endColumn:g,resource:c}},xc=(a,b,c)=>{a.root=b;a.model=c;a.selection=sb(1,1,1,1);a.lineHeight=uc;a.charWidth=vc;a.width=800;a.height=400;a.showLineNumbers=!0;a.showMinimap=!0;a.theme="vs";a.languageId=c.languageId;a.fontSize=14;a.tabSize=4;a.insertSpaces=!0;a.mouseAnchorLine=1;a.mouseAnchorColumn=1;a.modelFacade=ph();a.overflow=rh("div");a.margin=rh("div");a.scrollable=rh("div");a.linesHost=rh("div");a.textarea=rh("textarea");a.minimapCanvas=rh("canvas");a.widgetsHost=rh("div");a.cursorEl=rh("div");a.selectionHost=rh("div");a.findWidget=rh("div");a.findInput=rh("input");a.replaceInput=rh("input");a.suggestWidget=rh("div");a.hoverWidget=rh("div");a.contextWidget=rh("div");a.gotoWidget=rh("div");a.gotoInput=rh("input");a.renameWidget=rh("div");a.renameInput=rh("input");a.paramWidget=rh("div");a.stickyWidget=rh("div");sh(a.root,"monaco-editor "+a.theme);th(a.root,"position","relative");th(a.root,"overflow","hidden");uh(a.root,-1);th(a.root,"font-family","ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace");th(a.root,"font-size",a.fontSize.toString()+"px");th(a.root,"line-height",a.lineHeight.toString()+"px");sh(a.overflow,"overflow-guard");th(a.overflow,"display","flex");th(a.overflow,"height","100%");sh(a.margin,"margin");th(a.margin,"width",wc.toString()+"px");th(a.margin,"flex","0 0 "+wc.toString()+"px");th(a.margin,"user-select","none");sh(a.scrollable,"monaco-scrollable-element");th(a.scrollable,"flex","1 1 auto");th(a.scrollable,"overflow","auto");th(a.scrollable,"position","relative");sh(a.linesHost,"view-lines");if(a.wordWrap){th(a.linesHost,"white-space","pre-wrap");vh(a.textarea,"wrap","soft")}else{th(a.linesHost,"white-space","pre");vh(a.textarea,"wrap","off")}th(a.selectionHost,"position","absolute");th(a.selectionHost,"inset","0");th(a.selectionHost,"pointer-events","none");sh(a.cursorEl,"cursor");th(a.cursorEl,"position","absolute");th(a.cursorEl,"width","2px");th(a.cursorEl,"height",a.lineHeight.toString()+"px");th(a.cursorEl,"background","#aeafad");th(a.cursorEl,"pointer-events","none");vh(a.textarea,"class","inputarea");vh(a.textarea,"wrap","off");vh(a.textarea,"autocorrect","off");vh(a.textarea,"autocapitalize","off");vh(a.textarea,"spellcheck","false");uh(a.textarea,0);th(a.textarea,"position","absolute");th(a.textarea,"width","1px");th(a.textarea,"height","1px");th(a.textarea,"opacity","0");sh(a.minimapCanvas,"minimap");th(a.minimapCanvas,"width","64px");th(a.minimapCanvas,"flex","0 0 64px");sh(a.widgetsHost,"overflowingContentWidgets");th(a.widgetsHost,"position","absolute");th(a.widgetsHost,"inset","0");th(a.widgetsHost,"pointer-events","none");sh(a.findWidget,"editor-widget find-widget");th(a.findWidget,"position","absolute");th(a.findWidget,"top","8px");th(a.findWidget,"right","72px");th(a.findWidget,"z-index","50");th(a.findWidget,"pointer-events","auto");th(a.findWidget,"display","none");th(a.findWidget,"background","#252526");th(a.findWidget,"border","1px solid #454545");th(a.findWidget,"padding","8px");wh(a.findInput,"Find");wh(a.replaceInput,"Replace");vh(a.findInput,"data-monaco","find");vh(a.replaceInput,"data-monaco","replace");xh(a.findWidget,a.findInput);xh(a.findWidget,a.replaceInput);yh(a.findWidget,a.findInput,a.replaceInput);xh(a.widgetsHost,a.findWidget);yc(a,a.suggestWidget,"suggest-widget");yc(a,a.hoverWidget,"monaco-hover");yc(a,a.contextWidget,"context-view");yc(a,a.gotoWidget,"goto-line-widget");wh(a.gotoInput,"Go to line");xh(a.gotoWidget,a.gotoInput);yc(a,a.renameWidget,"rename-box");xh(a.renameWidget,a.renameInput);yc(a,a.paramWidget,"parameter-hints-widget");yc(a,a.stickyWidget,"sticky-widget");xh(a.scrollable,a.selectionHost);xh(a.scrollable,a.linesHost);xh(a.scrollable,a.cursorEl);xh(a.overflow,a.margin);xh(a.overflow,a.scrollable);xh(a.overflow,a.minimapCanvas);xh(a.root,a.overflow);xh(a.root,a.textarea);xh(a.root,a.widgetsHost);zc(a);zh(a.findWidget,"none");zh(a.suggestWidget,"none");zh(a.hoverWidget,"none");zh(a.contextWidget,"none");zh(a.gotoWidget,"none");zh(a.renameWidget,"none");zh(a.paramWidget,"none");let d=rh("style");Ah(d,".mtk-keyword{color:#569cd6}.mtk-string{color:#ce9178}.mtk-comment{color:#6a9955}.mtk-number{color:#b5cea8}.mtk-tag{color:#569cd6}.mtk-attr{color:#9cdcfe}.squiggly-error{text-decoration:underline wavy #f14c4c}.squiggly-warning{text-decoration:underline wavy #cca700}.squiggly-info{text-decoration:underline wavy #3794ff}.squiggly-hint{text-decoration:underline dotted #eeeeee}.folding{cursor:pointer;display:inline-block;width:12px}");xh(a.root,d)},yc=(a,b,c)=>{sh(b,c);th(b,"position","absolute");th(b,"pointer-events","auto");th(b,"z-index","40");th(b,"display","none");th(b,"max-width","420px");th(b,"padding","6px 8px");th(b,"border","1px solid #454545");th(b,"background","#252526");th(b,"color","#cccccc");th(b,"font-size","12px");xh(a.widgetsHost,b)},zc=a=>{sh(a.root,"monaco-editor "+a.theme);th(a.root,"font-size",a.fontSize.toString()+"px");if(a.theme=="vs-dark"||a.theme=="hc-black"){th(a.root,"background","#1e1e1e");th(a.root,"color","#d4d4d4");th(a.cursorEl,"background","#aeafad")}else{th(a.root,"background","#fffffe");th(a.root,"color","#000000");th(a.cursorEl,"background","#000000")}if(a.wordWrap){th(a.linesHost,"white-space","pre-wrap");vh(a.textarea,"wrap","soft")}else{th(a.linesHost,"white-space","pre");vh(a.textarea,"wrap","off")}},Ac=(a,b)=>{a.theme=b;zc(a);Ic(a)},Bc=(a,b,c)=>{a.width=b;a.height=c;th(a.root,"width",b.toString()+"px");th(a.root,"height",c.toString()+"px");Ic(a)},Cc=(a,b)=>{let c=0;while(c<a.folds.length){let d=a.folds[c];if(d.collapsed&&b>d.startLine&&b<=d.endLine)return!0;++c}return!1},Dc=(a,b)=>{let c=b,d=db(a.model);while(c<=d&&Cc(a,c))c=c+1|0;return c>d?d:c},Ec=(a,b)=>{let c=0;while(c<a.folds.length){if(a.folds[c].startLine==b)return a.folds[c];++c}return null},Fc=a=>{let b=Tb(a.model),c=0;while(c<b.length){let d=Ec(a,b[c].startLine);if(d)b[c].collapsed=d.collapsed;++c}a.folds=b},Gc=(a,b)=>{let c=Ec(a,b);if(!c){Fc(a);c=Ec(a,b)}if(!c)return;c.collapsed=!c.collapsed;Ic(a)},Hc=(a,b)=>{Fc(a);let c=0;while(c<a.folds.length){a.folds[c].collapsed=b;++c}Ic(a)},Ic=a=>{let c,d,e,f,g,h,i;zc(a);let b=Bh((c=a.linesHost,d=a.margin,e=a.selectionHost,f=a.cursorEl,g=a.minimapCanvas,h=a.textarea,i=a.model,c),d,e,f,g,h,bb(i),a.languageId,a.lineHeight,a.width,a.height,a.scrollTop,a.showLineNumbers,a.showMinimap,a.theme,a.selection.selectionStartLineNumber,a.selection.selectionStartColumn,a.selection.positionLineNumber,a.selection.positionColumn,a.findQuery,a.wordWrap,a.tabSize);if(b>0)a.charWidth=b},Jc=a=>{let b=(a.selection.positionLineNumber-1|0)*a.lineHeight|0,c=(a.selection.positionColumn-1|0)*a.charWidth|0;th(a.textarea,"top",b.toString()+"px");th(a.textarea,"left",(c+wc|0).toString()+"px");th(a.cursorEl,"top",b.toString()+"px");th(a.cursorEl,"left",c.toString()+"px");Ch(a.textarea,"")},Kc=(a,b,c)=>{let j,d=Dh(a.scrollable,a.linesHost,b,c,a.lineHeight,a.charWidth,a.scrollTop),e=1,f=1;if(d.length>1){e=d[0];f=d[1]}if(e<1)e=1;let g=db(a.model);if(e>g)e=g;let i=a.model,k=gb((j=e,i),j)+1|0;if(f<1)f=1;if(f>k)f=k;return{lineNumber:e,column:f}},Lc=(a,b)=>{let c=(b-1|0)*a.lineHeight|0,d=a.scrollTop+a.height|0;if(c<a.scrollTop||(c+a.lineHeight|0)>d)a.scrollTop=tc(0,c-(a.height/3|0)|0)},tc=(a,b)=>a>b?a:b,Mc=a=>{let i,l,b=db(a.model),c=a.selection.positionLineNumber;if(c<1)c=1;if(c>b)c=b;let h=a.model,j=gb((i=c,h),i)+1|0,d=a.selection.positionColumn;if(d<1)d=1;if(d>j)d=j;let e=a.selection.selectionStartLineNumber,f=a.selection.selectionStartColumn;if(e<1)e=1;if(e>b)e=b;let k=a.model,m=gb((l=e,k),l)+1|0;if(f<1)f=1;if(f>m)f=m;a.selection=sb(e,f,c,d)},Nc=(a,b,c)=>{a.selection=sb(b,c,b,c);Mc(a);Lc(a,a.selection.positionLineNumber);Jc(a)},Oc=(a,b,c,d,e)=>{a.selection=sb(b,c,d,e);Mc(a);Lc(a,a.selection.positionLineNumber);Jc(a)},Pc=(a,b)=>{let n,f=a.selection,g=f.startLineNumber,h=f.startColumn,c=[Za(g,h,f.endLineNumber,f.endColumn,b)];lb(a.model,c,!0);let d=ib(a.model,g,h),m=a.model,e=jb((n=d+b.length|0,m),n);Nc(a,e.lineNumber,e.column)},Qc=a=>{let b=Vg(),c=0;while(c<a.length){if(c!=0)b=b+"\n";b=b+a[c];++c}return b},Rc=(a,b)=>{if(a.readOnly||b.length==0)return;if(b.length==1){let c=b=="("?")":b=="["?"]":b=="{"?"}":b=="\""||b=="'"?b:"";if(c.length>0){Pc(a,b+c);Sc(a,b+c);Xc(a,!1);Ic(a);return}}Pc(a,b);Sc(a,b);Ic(a)},Sc=(a,b)=>{let d=a.extraCursors.length;if(d==0)return;let c=d-1;while(c>=0){let l,o,f=a.extraCursors[c],g=f.startLineNumber,h=f.startColumn,i=f.endLineNumber,j=f.endColumn,k=a.model;lb((l=[Za(g,h,i,j,b)],k),l,!0);let d=ib(a.model,g,h),n=a.model,e=jb((o=d+b.length|0,n),o),p=e.lineNumber,q=e.column;a.extraCursors[c]=sb(p,q,p,q);--c}},Tc=a=>{let i,m;if(a.readOnly)return;let d=a.selection;if(d.startLineNumber!=d.endLineNumber||d.startColumn!=d.endColumn){Pc(a,"");Sc(a,"");Ic(a);return}if(d.positionLineNumber==1&&d.positionColumn==1)return;let e=d.positionLineNumber,f=d.positionColumn,b=ib(a.model,e,f),h=a.model,c=jb((i=b-1|0,h),i),j=c.lineNumber,k=c.column,l=a.model;lb((m=[Za(j,k,e,f,"")],l),m,!0);Nc(a,j,k);Uc(a);Ic(a)},Uc=a=>{let c=a.extraCursors.length;if(c==0)return;let b=c-1;while(b>=0){let j,n,e=a.extraCursors[b],f=e.positionLineNumber,g=e.positionColumn;if(f==1&&g==1){--b;continue}let c=ib(a.model,f,g),i=a.model,d=jb((j=c-1|0,i),j),k=d.lineNumber,l=d.column,m=a.model;lb((n=[Za(k,l,f,g,"")],m),n,!0);a.extraCursors[b]=sb(k,l,k,l);--b}},Vc=a=>{let j,n;if(a.readOnly)return;let d=a.selection;if(d.startLineNumber!=d.endLineNumber||d.startColumn!=d.endColumn){Pc(a,"");Sc(a,"");Ic(a);return}let e=d.positionLineNumber,f=d.positionColumn,b=ib(a.model,e,f);if(b>=eb(a.model))return;let i=a.model,c=jb((j=b+1,i),j),k=c.lineNumber,l=c.column,m=a.model;lb((n=[Za(e,f,k,l,"")],m),n,!0);Wc(a);Ic(a)},Wc=a=>{let c=a.extraCursors.length;if(c==0)return;let b=c-1;while(b>=0){let k,o,e=a.extraCursors[b],f=e.positionLineNumber,g=e.positionColumn,c=ib(a.model,f,g);if(c>=eb(a.model)){--b;continue}let j=a.model,d=jb((k=c+1,j),k),l=d.lineNumber,m=d.column,n=a.model;lb((o=[Za(f,g,l,m,"")],n),o,!0);a.extraCursors[b]=sb(f,g,f,g);--b}},Xc=(a,b)=>{let f,g,i,e=a.model,c=ib((f=a.selection.positionLineNumber,g=a.selection.positionColumn,e),f,g);if(c>0)--c;let h=a.model,d=jb((i=c,h),i);if(b)Oc(a,a.selection.selectionStartLineNumber,a.selection.selectionStartColumn,d.lineNumber,d.column);else Nc(a,d.lineNumber,d.column)},Yc=(a,b)=>{let f,g,k,e=a.model,c=ib((f=a.selection.positionLineNumber,g=a.selection.positionColumn,e),f,g);if(c<eb(a.model))++c;let j=a.model,d=jb((k=c,j),k);if(b)Oc(a,a.selection.selectionStartLineNumber,a.selection.selectionStartColumn,d.lineNumber,d.column);else Nc(a,d.lineNumber,d.column)},Zc=(a,b)=>{let f,c=a.selection.positionLineNumber-1|0;if(c<1)c=1;c=Dc(a,c);let d=a.selection.positionColumn,e=a.model,g=gb((f=c,e),f)+1|0;if(d>g)d=g;if(b)Oc(a,a.selection.selectionStartLineNumber,a.selection.selectionStartColumn,c,d);else Nc(a,c,d)},$c=(a,b)=>{let h,c=a.selection.positionLineNumber+1|0,d=db(a.model);if(c>d)c=d;c=Dc(a,c);let e=a.selection.positionColumn,g=a.model,i=gb((h=c,g),h)+1|0;if(e>i)e=i;if(b)Oc(a,a.selection.selectionStartLineNumber,a.selection.selectionStartColumn,c,e);else Nc(a,c,e)},_c=(a,b)=>{let f=a.selection.positionLineNumber,c=fb(a.model,f),d=Ta(c),e=1;if(a.selection.positionColumn!=d+1&&d<c.length)e=d+1;if(b)Oc(a,a.selection.selectionStartLineNumber,a.selection.selectionStartColumn,f,e);else Nc(a,f,e)},ad=(a,b)=>{let c=a.selection.positionLineNumber,e=gb(a.model,c)+1|0;if(b)Oc(a,a.selection.selectionStartLineNumber,a.selection.selectionStartColumn,c,e);else Nc(a,c,e)},bd=(a,b)=>{if(b)Oc(a,a.selection.selectionStartLineNumber,a.selection.selectionStartColumn,1,1);else Nc(a,1,1)},cd=(a,b)=>{let c=db(a.model),f=gb(a.model,c)+1|0;if(b)Oc(a,a.selection.selectionStartLineNumber,a.selection.selectionStartColumn,c,f);else Nc(a,c,f)},dd=(a,b)=>{let c=a.height/a.lineHeight|0;if(c<1)c=1;let d=a.selection.positionLineNumber-c|0;if(d<1)d=1;if(b)Oc(a,a.selection.selectionStartLineNumber,a.selection.selectionStartColumn,d,a.selection.positionColumn);else Nc(a,d,a.selection.positionColumn)},ed=(a,b)=>{let c=a.height/a.lineHeight|0;if(c<1)c=1;let d=a.selection.positionLineNumber+c|0,e=db(a.model);if(d>e)d=e;if(b)Oc(a,a.selection.selectionStartLineNumber,a.selection.selectionStartColumn,d,a.selection.positionColumn);else Nc(a,d,a.selection.positionColumn)},fd=(a,b)=>{let g,h,j,k,l,f=a.model,c=ib((g=a.selection.positionLineNumber,h=a.selection.positionColumn,f),g,h);if(c>0)--c;let i=a.model,d=jb((j=c,i),j),e=Ua((k=a.model,fb((l=d.lineNumber,k),l)),d.column);if(b)Oc(a,a.selection.selectionStartLineNumber,a.selection.selectionStartColumn,d.lineNumber,e.startColumn);else Nc(a,d.lineNumber,e.startColumn)},gd=(a,b)=>{let e,f,c=Ua((e=a.model,fb((f=a.selection.positionLineNumber,e),f)),a.selection.positionColumn),d=c.endColumn;if(d==a.selection.positionColumn){let f,g,e=a.model,b=ib((f=a.selection.positionLineNumber,g=a.selection.positionColumn,e),f,g);if(b<eb(a.model)){let g,h,i,f=a.model,e=jb((g=b+1,f),g);c=Ua((h=a.model,fb((i=e.lineNumber,h),i)),e.column);d=c.endColumn}}if(b)Oc(a,a.selection.selectionStartLineNumber,a.selection.selectionStartColumn,a.selection.positionLineNumber,d);else Nc(a,a.selection.positionLineNumber,d)},hd=a=>{let e,f,h;if(a.readOnly)return;let d=a.selection;if(d.startLineNumber!=d.endLineNumber||d.startColumn!=d.endColumn){Pc(a,"");Sc(a,"");Ic(a);return}let c=Ua((e=a.model,fb((f=d.positionLineNumber,e),f)),d.positionColumn).startColumn;if(c==d.positionColumn&&d.positionColumn>1)c=d.positionColumn-1|0;let g=a.model;lb((h=[Za(d.positionLineNumber,c,d.positionLineNumber,d.positionColumn,"")],g),h,!0);Nc(a,d.positionLineNumber,c);Ic(a)},id=a=>{let e,f,h;if(a.readOnly)return;let d=a.selection;if(d.startLineNumber!=d.endLineNumber||d.startColumn!=d.endColumn){Pc(a,"");Sc(a,"");Ic(a);return}let c=Ua((e=a.model,fb((f=d.positionLineNumber,e),f)),d.positionColumn).endColumn;if(c==d.positionColumn){let e;c=d.positionColumn+1|0;let b=a.model,f=gb((e=d.positionLineNumber,b),e)+1|0;if(c>f)c=f}let g=a.model;lb((h=[Za(d.positionLineNumber,d.positionColumn,d.positionLineNumber,c,"")],g),h,!0);Ic(a)},jd=a=>{mb(a.model);Mc(a);Ic(a)},kd=a=>{nb(a.model);Mc(a);Ic(a)},ld=a=>{let b=db(a.model);Oc(a,1,1,b,gb(a.model,b)+1|0)},md=a=>{let i,b=a.selection,c=b.startLineNumber,d=b.startColumn,e=b.endLineNumber,g=b.endColumn,h=a.model;return kb((i=f(c,d,e,g),h),i)},nd=a=>{let b=md(a);if(b.length==0){let d,c=a.model;b=fb((d=a.selection.positionLineNumber,c),d)+"\n"}Eh(b)},od=a=>{nd(a);if(a.readOnly)return;if(a.selection.startLineNumber==a.selection.endLineNumber&&a.selection.startColumn==a.selection.endColumn){let c=a.selection.positionLineNumber;if(c<db(a.model)){let d,b=a.model;lb((d=[Za(c,1,c+1|0,1,"")],b),d,!0)}else{let d;lb(a.model,[Za((d=a.model,c),1,c,gb(d,c)+1|0,"")],!0)}Nc(a,c,1)}else Pc(a,"");Ic(a)},pd=(a,b)=>{if(a.readOnly)return;let c=b;if(c.length==0)c=Fh();if(c.length==0)return;Pc(a,c);Sc(a,c);Ic(a)},qd=(a,b)=>{if(a.readOnly)return;let c="\t";if(a.insertSpaces){let b;{let e=a.tabSize,c=Vg(),d=0;while(d<e){c=c+" ";++d}b=c}c=b}let d=a.selection;if(d.startLineNumber!=d.endLineNumber||b){let e=d.startLineNumber;while(e<=d.endLineNumber){let g,f=a.model,d=fb((g=e,f),g);if(b){let b=0;if(d.length>0&&d.charAt(0)=="\t")b=1;else{while(b<a.tabSize&&b<d.length&&d.charAt(b)==" ")++b}if(b>0){let d,c=a.model;lb((d=[Za(e,1,e,b+1,"")],c),d,!0)}}else{let d,b=a.model;lb((d=[Za(e,1,e,1,c)],b),d,!0)}e=e+1|0}Ic(a);return}Rc(a,c)},rd=b=>{if(b.readOnly)return;let g=b.selection.positionLineNumber,c=fb(b.model,g),e=a(c,0,Ta(c)),f=Vg();if(b.selection.positionColumn>1)f=a(c,b.selection.positionColumn-2|0,b.selection.positionColumn-1|0);if(f=="{")e=e+"  ";Pc(b,"\n"+e);Sc(b,"\n"+e);Ic(b)},td=(a,b)=>{if(a.readOnly)return;let g=a.selection.startLineNumber,h=a.selection.endLineNumber,i=g+b|0,c=db(a.model);if(i<1||(h+b|0)>c)return;let d=[],e=g;while(e<=h){let b,c;d.push((b=a.model,fb((c=e,b),c)));e=e+1|0}let f=Qc(d);if(b<0){let d,i,j,k,l,m,n,c=a.model,b=fb((d=g-1|0,c),d);lb(a.model,[Za((i=g-1|0,j=a.model,i),1,h,gb(j,h)+1|0,f+"\n"+b)],!0);Oc((k=g-1|0,l=h-1|0,m=a.model,a),k,1,l,gb((n=h-1|0,m),n)+1|0)}else{let d,i,j,k,l,m,n,o,c=a.model,b=fb((d=h+1|0,c),d);lb(a.model,[Za((i=h+1|0,j=a.model,g),1,i,gb((k=h+1|0,j),k)+1|0,b+"\n"+f)],!0);Oc((l=g+1|0,m=h+1|0,n=a.model,a),l,1,m,gb((o=h+1|0,n),o)+1|0)}Ic(a)},ud=(a,b)=>{if(a.readOnly)return;let f=a.selection.startLineNumber,g=a.selection.endLineNumber,c=[],d=f;while(d<=g){let b,e;c.push((b=a.model,fb((e=d,b),e)));d=d+1|0}let e=Qc(c);if(b<0){let c,b=a.model;lb((c=[Za(f,1,f,1,e+"\n")],b),c,!0)}else{let h,j,k,l,m,c=gb(a.model,g)+1|0,d=a.model;lb((h=[Za(g,c,g,c,"\n"+e)],d),h,!0);let i=(g-f|0)+1|0;Oc((j=f+i|0,k=g+i|0,l=a.model,a),j,1,k,gb((m=g+i|0,l),m)+1|0)}Ic(a)},vd=(a,b)=>{let f,d=a.selection,e=d.positionLineNumber+b|0;if(e<1||(f=a.model,e>db(f)))return;let c=d.positionColumn,h=gb(a.model,e)+1|0;if(c>h)c=h;a.extraCursors.push(sb(e,c,e,c))},Ad=(b,c,d)=>{if(c=="type"||c=="compositionType"){Rc(b,d);return!0}if(c=="paste"||c=="editor.action.clipboardPasteAction"){pd(b,d);return!0}if(c=="cut"||c=="editor.action.clipboardCutAction"){od(b);return!0}if(c=="copy"||c=="editor.action.clipboardCopyAction"){nd(b);return!0}if(c=="deleteLeft"||c=="deleteLeft"){Tc(b);return!0}if(c=="deleteRight"){Vc(b);return!0}if(c=="deleteWordLeft"||c=="deleteWordStartLeft"){hd(b);return!0}if(c=="deleteWordRight"||c=="deleteWordEndRight"){id(b);return!0}if(c=="undo"){jd(b);return!0}if(c=="redo"){kd(b);return!0}if(c=="tab"||c=="editor.action.indentLines"){qd(b,!1);return!0}if(c=="outdent"||c=="editor.action.outdentLines"){qd(b,!0);return!0}if(c=="cursorLeft"){Xc(b,!1);return!0}if(c=="cursorRight"){Yc(b,!1);return!0}if(c=="cursorUp"){Zc(b,!1);return!0}if(c=="cursorDown"){$c(b,!1);return!0}if(c=="cursorHome"||c=="cursorLineStart"){_c(b,!1);return!0}if(c=="cursorEnd"||c=="cursorLineEnd"){ad(b,!1);return!0}if(c=="cursorTop"){bd(b,!1);return!0}if(c=="cursorBottom"){cd(b,!1);return!0}if(c=="cursorPageUp"){dd(b,!1);return!0}if(c=="cursorPageDown"){ed(b,!1);return!0}if(c=="cursorWordLeft"||c=="cursorWordStartLeft"){fd(b,!1);return!0}if(c=="cursorWordRight"||c=="cursorWordEndRight"){gd(b,!1);return!0}if(c=="cursorLeftSelect"){Xc(b,!0);return!0}if(c=="cursorRightSelect"){Yc(b,!0);return!0}if(c=="cursorUpSelect"){Zc(b,!0);return!0}if(c=="cursorDownSelect"){$c(b,!0);return!0}if(c=="cursorHomeSelect"){_c(b,!0);return!0}if(c=="cursorEndSelect"){ad(b,!0);return!0}if(c=="cursorWordLeftSelect"){fd(b,!0);return!0}if(c=="cursorWordRightSelect"){gd(b,!0);return!0}if(c=="selectAll"){ld(b);return!0}if(c=="expandLineSelection"){let a=db(b.model),c=b.selection.endLineNumber;if(c<a)++c;let d=1;if(c==b.selection.endLineNumber){let e,a=b.model;d=gb((e=c,a),e)+1|0}Oc(b,b.selection.startLineNumber,1,c,d);return!0}if(c=="enter"){rd(b);return!0}if(c=="editor.action.deleteLines"){(a=>{if(a.readOnly)return;let c=a.selection.startLineNumber,d=a.selection.endLineNumber;if(d<db(a.model)){let e,b=a.model;lb((e=[Za(c,1,d+1|0,1,"")],b),e,!0)}else if(c>1){let e,h,i,b=a.model,f=gb((e=c-1|0,b),e)+1|0;lb(a.model,[Za((h=c-1|0,i=a.model,h),f,d,gb(i,d)+1|0,"")],!0)}else{let c;lb(a.model,[Za((c=a.model,1),1,d,gb(c,d)+1|0,"")],!0)}Nc(a,c,1);Ic(a)})(b);return!0}if(c=="editor.action.moveLinesUpAction"){td(b,-1);return!0}if(c=="editor.action.moveLinesDownAction"){td(b,1);return!0}if(c=="editor.action.copyLinesUpAction"){ud(b,-1);return!0}if(c=="editor.action.copyLinesDownAction"){ud(b,1);return!0}if(c=="editor.action.insertCursorAbove"){vd(b,-1);return!0}if(c=="editor.action.insertCursorBelow"){vd(b,1);return!0}if(c=="editor.action.trimTrailingWhitespace"){(a=>{if(a.readOnly)return;let b=1,c=db(a.model);while(b<=c){let f,e=a.model,c=fb((f=b,e),f),d=c.length;while(d>0){let a=c.charAt(d-1);if(a!=" "&&a!="\t")break;--d}if(d<c.length){let f,e=a.model;lb((f=[Za(b,d+1,b,c.length+1,"")],e),f,!0)}b=b+1|0}Ic(a)})(b);return!0}if(c=="editor.action.insertLineAfter"){(a=>{let f;if(a.readOnly)return;let b=a.selection.endLineNumber,d=gb(a.model,b)+1|0,e=a.model;lb((f=[Za(b,d,b,d,"\n")],e),f,!0);Nc(a,b+1|0,1);Ic(a)})(b);return!0}if(c=="editor.action.insertLineBefore"){(a=>{let d;if(a.readOnly)return;let b=a.selection.startLineNumber,c=a.model;lb((d=[Za(b,1,b,1,"\n")],c),d,!0);Nc(a,b,1);Ic(a)})(b);return!0}if(c=="editor.action.joinLines"){(b=>{let m,o;if(b.readOnly)return;let i=b.selection.startLineNumber;if(i>=db(b.model))return;let d=fb(b.model,i),l=b.model,e=fb((m=i+1|0,l),m),g=a(e,Ta(e),e.length),h=d;if(d.length>0&&g.length>0)h=d+" "+g;else h=d+g;let n=b.model;lb((o=[Za(i,1,i+1|0,e.length+1,h)],n),o,!0);Nc(b,i,d.length+1);Ic(b)})(b);return!0}if(c=="cursorWordSelect"){{let c,d,a=Ua((c=b.model,fb((d=b.selection.positionLineNumber,c),d)),b.selection.positionColumn);Oc(b,b.selection.positionLineNumber,a.startColumn,b.selection.positionLineNumber,a.endColumn)}return!0}if(c=="editor.action.fontZoomIn"){b.fontSize=b.fontSize+1|0;b.lineHeight=b.fontSize+5|0;Ic(b);return!0}if(c=="editor.action.fontZoomOut"){if(b.fontSize>8){b.fontSize=b.fontSize-1|0;b.lineHeight=b.fontSize+5|0;Ic(b)}return!0}return c=="editor.action.fontZoomReset"?(b.fontSize=14,b.lineHeight=uc,Ic(b),!0):!1},Bd=(a,b)=>{let c=Gh(b),d=Hh(b),e=Ih(b),f=Jh(b);if(d&&!e&&(c=="z"||c=="Z")){Kh(b);jd(a);return}if(d&&(c=="y"||c=="Y"||e&&(c=="z"||c=="Z"))){Kh(b);kd(a);return}if(d&&(c=="a"||c=="A")){Kh(b);ld(a);return}if(d&&(c=="c"||c=="C")){Kh(b);nd(a);return}if(d&&(c=="x"||c=="X")){Kh(b);od(a);return}if(d&&(c=="v"||c=="V")){Kh(b);pd(a,"");return}if(c=="Backspace"){Kh(b);if(d)hd(a);else Tc(a);return}if(c=="Delete"){Kh(b);if(d)id(a);else Vc(a);return}if(c=="Enter"){Kh(b);if(d)Ad(a,"editor.action.insertLineAfter","");else rd(a);return}if(d&&e&&(c=="k"||c=="K")){Kh(b);Ad(a,"editor.action.deleteLines","");return}if(c=="Tab"){Kh(b);qd(a,e);return}if(c=="Home"){Kh(b);if(d)bd(a,e);else _c(a,e);return}if(c=="End"){Kh(b);if(d)cd(a,e);else ad(a,e);return}if(c=="PageUp"){Kh(b);dd(a,e);return}if(c=="PageDown"){Kh(b);ed(a,e);return}if(c=="ArrowLeft"){Kh(b);if(d)fd(a,e);else Xc(a,e);return}if(c=="ArrowRight"){Kh(b);if(d)gd(a,e);else Yc(a,e);return}if(c=="ArrowUp"){Kh(b);if(f)td(a,-1);else Zc(a,e);return}if(c=="ArrowDown"){Kh(b);if(f)td(a,1);else $c(a,e);return}if(!d&&!f&&!Lh(b)&&c.length==1&&c!="Dead"){Kh(b);Rc(a,c)}},Cd=(a,b)=>{Kh(b);let c=md(a);Mh(b,c);Eh(c)},Dd=a=>{if(!a)return"*";let b=a+"";return b.length>0&&b!="[object Object]"?b:a.language?a.language+"":a[0]?Dd(a[0]):"*"},Ed=(a,b,c)=>{let f={kind:a,languageId:Dd(b),provider:c};Ld.push(f);return()=>{let a=0;while(a<Ld.length){if(Ld[a]===f){Ld.splice(a,1);break}++a}}},Fd=(a,b)=>a=="*"||a==b||a.length==0,Gd=(a,b)=>{let c=[],d=0;while(d<Ld.length){if(Ld[d].kind==a&&Fd(Ld[d].languageId,b))c.push(Ld[d].provider);++d}return c},Hd=(a,b,c,d,e)=>Nh(a,b,c,d,e),Id=a=>{let b=[];if(!a)return b;let c=a;if(a.suggestions)c=a.suggestions;let d=Oh(c),e=0;while(e<d){let a=Ph(c,e),d=Qh(a,"label",""),f=Qh(a,"insertText",d);if(d.length==0)d=Qh(a,"insertText","");if(d.length>0){let g={label:"",insertText:"",kind:0,detail:""};hc(g,d,f);g.kind=Rh(a,"kind",18);b.push(g)}++e}return b},Jd=a=>{if(!a)return Vg();let b=Qh(a,"value","");if(b.length>0)return b;let f=a.contents,c=Oh(f);if(c==0){c=Oh(a);return c>0?Qh(Ph(a,0),"value",Qh(Ph(a,0),"label","")):a+""}let d=Vg(),e=0;while(e<c){let a=Ph(f,e),b=Qh(a,"value",a+"");if(d.length>0)d=d+"\n";d=d+b;++e}return d},Kd=a=>{let b=1,c=1,d=1,e=1;if(a){if(a.range)return Kd(a.range);if(a.startLineNumber)b=a.startLineNumber|0;if(a.startColumn)c=a.startColumn|0;if(a.endLineNumber)d=a.endLineNumber|0;if(a.endColumn)e=a.endColumn|0}return f(b,c,d,e)},Nd=(a,b)=>{a.findOpen=!0;zh(a.findWidget,"block");if(md(a).length>0){a.findQuery=md(a);Ch(a.findInput,a.findQuery)}Sh(a.findInput)},Od=a=>{a.findOpen=!1;zh(a.findWidget,"none");Sh(a.textarea)},Pd=a=>{a.findQuery=Th(a.findInput);if(a.findQuery.length==0)return[];return Sb(a.model,a.findQuery,!1,!0,!1)},Qd=(a,b)=>{let c=Pd(a);if(c.length==0)return;if(b){a.findIndex=a.findIndex-1|0;if(a.findIndex<0)a.findIndex=c.length-1}else{a.findIndex=a.findIndex+1|0;if(a.findIndex>=c.length)a.findIndex=0}let d=c[a.findIndex];Oc(a,d.range.startLineNumber,d.range.startColumn,d.range.endLineNumber,d.range.endColumn);Ic(a)},Rd=a=>{let e;a.replaceQuery=Th(a.replaceInput);let b=Pd(a);if(b.length==0)return;if(a.findIndex>=b.length)a.findIndex=0;let c=b[a.findIndex],d=a.model;lb((e=[Za(c.range.startLineNumber,c.range.startColumn,c.range.endLineNumber,c.range.endColumn,a.replaceQuery)],d),e,!0);Ic(a);Qd(a,!1)},Sd=a=>{a.replaceQuery=Th(a.replaceInput);let b=Pd(a),c=b.length-1;while(c>=0){let f,d=b[c],e=a.model;lb((f=[Za(d.range.startLineNumber,d.range.startColumn,d.range.endLineNumber,d.range.endColumn,a.replaceQuery)],e),f,!0);--c}Ic(a)},Ud=a=>{let g,d=a.suggestItems;a.suggestOpen=d.length>0;if(!a.suggestOpen){zh(a.suggestWidget,"none");return}if(a.suggestIndex<0)a.suggestIndex=0;if(a.suggestIndex>=d.length)a.suggestIndex=0;let b=Vg(),c=0;while(c<d.length&&c<16){let e="";if(c==a.suggestIndex)e=" background:#04395e;";b=b+"<div class=\"monaco-list-row\" data-suggest=\""+c.toString()+"\" style=\"padding:2px 6px;"+e+"\">"+d[c].label+"</div>";++c}Uh(a.suggestWidget,b);let e=a.selection.positionLineNumber*a.lineHeight|0,f=((a.selection.positionColumn-1|0)*a.charWidth|0)+56|0;th((g=a.suggestWidget,g),"top",e.toString()+"px");th(a.suggestWidget,"left",f.toString()+"px");zh(a.suggestWidget,"block")},Vd=a=>{let g,h,i,j,b=Xb((g=a.model,h=a.selection.positionLineNumber,i=a.selection.positionColumn,j={lineNumber:0,column:0},e(j,h,i),g),j);a.suggestItems=b;a.suggestIndex=0;Ud(a);let c=Gd("completion",a.languageId);if(c.length==0)return;le=le+1|0;let d=le,f=0;while(f<c.length){let b=Hd(c[f],"provideCompletionItems",a.modelFacade,{__proto__:null,lineNumber:a.selection.positionLineNumber,column:a.selection.positionColumn},ph());Vh(b,b=>{((a,b,c)=>{if(b!=le)return;let d=Id(c),e=0;while(e<d.length){a.suggestItems.push(d[e]);++e}Ud(a)})(a,d,b)});++f}},Wd=a=>{a.suggestOpen=!1;zh(a.suggestWidget,"none")},Xd=a=>{let d,e,g;if(!a.suggestOpen||a.suggestItems.length==0)return;let c=a.suggestItems[a.suggestIndex],b=Ua((d=a.model,fb((e=a.selection.positionLineNumber,d),e)),a.selection.positionColumn),f=a.model;lb((g=[Za(a.selection.positionLineNumber,b.startColumn,a.selection.positionLineNumber,b.endColumn,Yb(c.insertText))],f),g,!0);Wd(a);Ic(a)},Yd=(a,b)=>{if(!a.suggestOpen)return;a.suggestIndex=a.suggestIndex+b|0;if(a.suggestIndex<0)a.suggestIndex=a.suggestItems.length-1;if(a.suggestIndex>=a.suggestItems.length)a.suggestIndex=0;Vd(a)},$d=(a,b,c)=>{a.hoverOpen=b.length>0;if(!a.hoverOpen){zh(a.hoverWidget,"none");return}Ah(a.hoverWidget,b);th(a.hoverWidget,"top",(c.lineNumber*a.lineHeight|0).toString()+"px");th(a.hoverWidget,"left",(((c.column-1|0)*a.charWidth|0)+56|0).toString()+"px");zh(a.hoverWidget,"block")},_d=a=>{let j={lineNumber:a.selection.positionLineNumber,column:a.selection.positionColumn},c=Vb(a.model,j),d=lc(a.model),e=0;while(e<d.length){if(d[e].startLineNumber==j.lineNumber){if(c.length>0)c=c+"\n";c=c+d[e].message}++e}$d(a,c,j);let f=Gd("hover",a.languageId),g=0;while(g<f.length){let b=Hd(f[g],"provideHover",a.modelFacade,{__proto__:null,lineNumber:j.lineNumber,column:j.column},ph());Vh(b,b=>{((a,b,c,d)=>{let e=Jd(d);if(e.length==0)return;let f=c;if(f.length>0)f=f+"\n";$d(a,f+e,b)})(a,j,c,b)});++g}},ae=a=>{a.hoverOpen=!1;zh(a.hoverWidget,"none")},be=(a,b,c)=>{let d="";if(c.length>0)d="<span class=\"keybinding\">"+c+"</span>";return"<div class=\"action-item\" data-cmd=\""+a+"\"><span class=\"action-label\">"+b+"</span>"+d+"</div>"},ce=(a,b,c)=>{a.contextOpen=!0;let d="<div class=\"monaco-menu\">";d=d+be("editor.action.goToDefinition","Go to Definition","⌘F12");d=d+be("editor.action.goToReferences","Go to References","⇧F12");d=d+be("editor.action.gotoSymbol","Go to Symbol...","⇧⌘O");d=d+"<div class=\"action-item has-submenu\"><span class=\"action-label\">Peek</span><span class=\"submenu-hint\">▶</span>";d=d+"<div class=\"submenu\">";d=d+be("editor.action.peekDefinition","Peek Definition","⌥F12");d=d+be("editor.action.referenceSearch.trigger","Peek References","⇧F12");d=d+"</div></div>";d=d+"<div class=\"separator\"></div>";d=d+be("editor.action.rename","Rename Symbol","F2");d=d+be("editor.action.changeAll","Change All Occurrences","⌘F2");d=d+be("editor.action.formatDocument","Format Document","⇧⌥F");d=d+"<div class=\"separator\"></div>";d=d+be("editor.action.clipboardCutAction","Cut","");d=d+be("editor.action.clipboardCopyAction","Copy","");d=d+be("editor.action.clipboardPasteAction","Paste","");d=d+"<div class=\"separator\"></div>";d=d+be("editor.action.quickCommand","Command Palette","F1");d=d+"</div>";Uh(a.contextWidget,d);th(a.contextWidget,"top",c.toString()+"px");th(a.contextWidget,"left",b.toString()+"px");zh(a.contextWidget,"block")},de=a=>{a.contextOpen=!1;zh(a.contextWidget,"none")},je=(b,c,d)=>{if(c=="actions.find"||c=="editor.action.startFindAction"){Nd(b,!1);return!0}if(c=="editor.action.startFindReplaceAction"){Nd(b,!0);return!0}if(c=="editor.action.nextMatchFindAction"){Qd(b,!1);return!0}if(c=="editor.action.previousMatchFindAction"){Qd(b,!0);return!0}if(c=="editor.action.replaceOne"){Rd(b);return!0}if(c=="editor.action.replaceAll"){Sd(b);return!0}if(c=="closeFindWidget"){Od(b);return!0}if(c=="editor.action.triggerSuggest"){Vd(b);return!0}if(c=="acceptSelectedSuggestion"){Xd(b);return!0}if(c=="hideSuggestWidget"){Wd(b);return!0}if(c=="editor.action.showHover"){_d(b);return!0}if(c=="editor.action.gotoLine"){b.gotoOpen=!0;zh(b.gotoWidget,"block");Sh(b.gotoInput);return!0}if(c=="editor.action.rename"){{let c,d,a=Ua((c=b.model,fb((d=b.selection.positionLineNumber,c),d)),b.selection.positionColumn);b.renameWord=a.word;b.renameOpen=!0;Ch(b.renameInput,a.word);zh(b.renameWidget,"block");Sh(b.renameInput)}return!0}if(c=="editor.action.triggerParameterHints"){{let f,g,h,i,c=Vb((f=b.model,g=b.selection.positionLineNumber,h=b.selection.positionColumn,i={lineNumber:0,column:0},e(i,g,h),f),i)+"(value, options)",d=Gd("signatureHelp",b.languageId);if(d.length>0){let e=Jd(Hd(d[0],"provideSignatureHelp",b.modelFacade,{__proto__:null,lineNumber:b.selection.positionLineNumber,column:b.selection.positionColumn},ph()));if(e.length>0)c=e}Ah(b.paramWidget,c);zh(b.paramWidget,"block")}return!0}if(c=="closeParameterHints"){zh(b.paramWidget,"none");return!0}if(c=="editor.action.commentLine"){Zb(b.model,b.selection.positionLineNumber,b.languageId);Ic(b);return!0}if(c=="editor.action.blockComment"){{let h=b.model,i=f(b.selection.startLineNumber,b.selection.startColumn,b.selection.endLineNumber,b.selection.endColumn),c=Nb(b.languageId),d="/*",e="*/";if(c&&c.blockCommentStart.length>0){d=c.blockCommentStart;e=c.blockCommentEnd}let g=kb(h,i);if(g.indexOf(d)==0&&g.length>=(d.length+e.length|0)){let b=a(g,d.length,g.length-e.length);lb(h,[Za(i.startLineNumber,i.startColumn,i.endLineNumber,i.endColumn,b)],!0)}else lb(h,[Za(i.startLineNumber,i.startColumn,i.endLineNumber,i.endColumn,d+g+e)],!0)}Ic(b);return!0}if(c=="editor.action.jumpToBracket"){let c,d,f,g,a=Ub((c=b.model,d=b.selection.positionLineNumber,f=b.selection.positionColumn,g={lineNumber:0,column:0},e(g,d,f),c),g);if(a){Nc(b,a.endLineNumber,a.endColumn);Ic(b)}return!0}if(c=="editor.action.selectToBracket"){let c,d,f,g,a=Ub((c=b.model,d=b.selection.positionLineNumber,f=b.selection.positionColumn,g={lineNumber:0,column:0},e(g,d,f),c),g);if(a){Oc(b,a.startLineNumber,a.startColumn,a.endLineNumber,a.endColumn);Ic(b)}return!0}if(c=="editor.fold"){Gc(b,b.selection.positionLineNumber);return!0}if(c=="editor.unfold"){Gc(b,b.selection.positionLineNumber);return!0}if(c=="editor.foldAll"){Hc(b,!0);return!0}if(c=="editor.unfoldAll"){Hc(b,!1);return!0}if(c=="editor.action.formatDocument"){(a=>{let d,b=Gd("documentFormatting",a.languageId);if(b.length>0){let e={},c=db(a.model);e.startLineNumber=1;e.startColumn=1;e.endLineNumber=c;e.endColumn=gb(a.model,c)+1|0;let d=Hd(b[0],"provideDocumentRangeFormattingEdits",a.modelFacade,e,ph())||Hd(b[0],"provideDocumentFormattingEdits",a.modelFacade,ph(),ph());Vh(d,b=>{((a,b)=>{let c=Oh(b);if(c==0){let c;cb(a.model,bc((c=a.model,bb(c))));Ic(a);return}let d=c-1|0;while(d>=0){let h,c=Ph(b,d),e=Kd(c),f=Qh(c,"text",""),g=a.model;lb((h=[Za(e.startLineNumber,e.startColumn,e.endLineNumber,e.endColumn,f)],g),h,!0);--d}Ic(a)})(a,b)});return}cb(a.model,bc((d=a.model,bb(d))));Ic(a)})(b);return!0}if(c=="editor.action.goToDefinition"||c=="editor.action.revealDefinition"||c=="editor.action.goToDeclaration"){(a=>{let e,f,b=Gd("definition",a.languageId);if(b.length>0){let c=Hd(b[0],"provideDefinition",a.modelFacade,{__proto__:null,lineNumber:a.selection.positionLineNumber,column:a.selection.positionColumn},ph());Vh(c,b=>{((a,b)=>{if(!b)return;let c=b;if(b[0])c=b[0];let d=Kd(c);Nc(a,d.startLineNumber,d.startColumn);Ic(a)})(a,b)});return}let c=Ua((e=a.model,fb((f=a.selection.positionLineNumber,e),f)),a.selection.positionColumn),d=Sb(a.model,c.word,!1,!0,!0);if(d.length>0){Nc(a,d[0].range.startLineNumber,d[0].range.startColumn);Ic(a)}})(b);return!0}if(c=="editor.action.goToReferences"||c=="editor.action.referenceSearch.trigger"||c=="editor.action.peekDefinition"){{let f,g,a=Ua((f=b.model,fb((g=b.selection.positionLineNumber,f),g)),b.selection.positionColumn),c=Sb(b.model,a.word,!1,!0,!0),d=Vg(),e=0;while(e<c.length&&e<20){d=d+"<div data-line=\""+c[e].range.startLineNumber.toString()+"\">"+c[e].range.startLineNumber.toString()+": "+c[e].matches[0]+"</div>";++e}Uh(b.hoverWidget,d);zh(b.hoverWidget,"block");b.hoverOpen=!0}return!0}if(c=="editor.action.addSelectionToNextFindMatch"){(a=>{let f,g,b=Ua((f=a.model,fb((g=a.selection.positionLineNumber,f),g)),a.selection.positionColumn),c=md(a);if(c.length==0){c=b.word;Oc(a,a.selection.positionLineNumber,b.startColumn,a.selection.positionLineNumber,b.endColumn)}let d=Sb(a.model,c,!1,!0,!0),e=0;while(e<d.length){let b=d[e];if(!(b.range.startLineNumber==a.selection.startLineNumber&&b.range.startColumn==a.selection.startColumn)){a.extraCursors.push(a.selection);Oc(a,b.range.startLineNumber,b.range.startColumn,b.range.endLineNumber,b.range.endColumn);Ic(a);break}++e}})(b);return!0}if(c=="editor.action.selectHighlights"||c=="editor.action.changeAll"){let d,e,a=Ua((d=b.model,fb((e=b.selection.positionLineNumber,d),e)),b.selection.positionColumn),c=Sb(b.model,a.word,!1,!0,!0);if(c.length>0){Oc(b,c[0].range.startLineNumber,c[0].range.startColumn,c[c.length-1].range.endLineNumber,c[c.length-1].range.endColumn);Ic(b)}return!0}if(c=="editor.action.wordHighlight.trigger"){let a,c,d,f;$b((a=b.model,c=b.selection.positionLineNumber,d=b.selection.positionColumn,f={lineNumber:0,column:0},e(f,c,d),a),f);return!0}if(c=="editor.action.openLink"){_b(b.model);return!0}if(c=="editor.action.transformToUppercase"){let a=md(b);if(a.length>0){let d,c=b.model;lb((d=[Za(b.selection.startLineNumber,b.selection.startColumn,b.selection.endLineNumber,b.selection.endColumn,cc(a,!0))],c),d,!0);Ic(b)}return!0}if(c=="editor.action.transformToLowercase"){let a=md(b);if(a.length>0){let d,c=b.model;lb((d=[Za(b.selection.startLineNumber,b.selection.startColumn,b.selection.endLineNumber,b.selection.endColumn,cc(a,!1))],c),d,!0);Ic(b)}return!0}if(c=="editor.action.insertSnippet"){Rc(b,Yb(d));return!0}if(c=="editor.action.quickOutline"||c=="editor.action.gotoSymbol"){Wh("symbols");return!0}if(c=="editor.action.quickCommand"||c=="workbench.action.showCommands"){Wh("commands");return!0}if(c=="editor.action.marker.next"||c=="editor.action.gotoErrorNext"||c=="editor.action.marker.nextInFiles"){ke(b,!1);return!0}if(c=="editor.action.marker.prev"||c=="editor.action.gotoErrorPrev"){ke(b,!0);return!0}if(c=="editor.action.quickFix"||c=="editor.action.codeAction"){{let a=Gd("codeAction",b.languageId),c=Vg(),d=0;while(d<a.length){let e=Hd(a[d],"provideCodeActions",b.modelFacade,{__proto__:null,startLineNumber:b.selection.startLineNumber,startColumn:b.selection.startColumn,endLineNumber:b.selection.endLineNumber,endColumn:b.selection.endColumn},ph()),f=Oh(e);if(e&&e.actions){f=Oh(e.actions);e=e.actions}let g=0;while(g<f){c=c+"<div>"+Qh(Ph(e,g),"title",Qh(Ph(e,g),"label","fix"))+"</div>";++g}++d}if(c.length==0)c="<div>No code actions</div>";Uh(b.hoverWidget,c);zh(b.hoverWidget,"block");b.hoverOpen=!0}return!0}if(c=="editor.action.smartSelect.expand"){let c,d,f,g,a=Ub((c=b.model,d=b.selection.positionLineNumber,f=b.selection.positionColumn,g={lineNumber:0,column:0},e(g,d,f),c),g);if(a)Oc(b,a.startLineNumber,a.startColumn,a.endLineNumber,a.endColumn);else{let c,d,a=Ua((c=b.model,fb((d=b.selection.positionLineNumber,c),d)),b.selection.positionColumn);Oc(b,b.selection.positionLineNumber,a.startColumn,b.selection.positionLineNumber,a.endColumn)}Ic(b);return!0}if(c=="editor.action.smartSelect.shrink"){Nc(b,b.selection.positionLineNumber,b.selection.positionColumn);Ic(b);return!0}if(c=="editor.toggleFold"||c=="editor.foldRecursively"||c=="editor.unfoldRecursively"){Gc(b,b.selection.positionLineNumber);return!0}if(c=="editor.action.showContextMenu"){ce(b,80,b.selection.positionLineNumber*b.lineHeight|0);return!0}if(c=="editor.action.inlayHints.toggle"){let a=ac(b.model,b.selection.positionLineNumber),c=Vg(),d=0;while(d<a.length){c=c+a[d]+"\n";++d}Ah(b.stickyWidget,c);zh(b.stickyWidget,"block");return!0}return!1},ke=(a,b)=>{let c=lc(a.model);if(c.length==0)return;let f=a.selection.positionLineNumber,d=c[0].startLineNumber,e=0;while(e<c.length){let a=c[e].startLineNumber;if(!b&&a>f){d=a;break}if(b&&a<f)d=a;++e}if(!b&&d<=f)d=c[0].startLineNumber;Nc(a,d,1);_d(a);Ic(a)},me=(a,b,c)=>{let d;return!a?c:(d=a[b],!d?c:d+"")},ne=(a,b,c)=>{let d;return!a?c:(d=a[b],!d?c:d+""=="false"?!1:d+""=="off"?!1:!0)},oe=(a,b,c)=>{let d;return!a?c:(d=a[b],!d?c:d|0)},Pf=a=>{let e,f,b=a.view.root.clientWidth|0,c=a.view.root.clientHeight|0;if(b<1)b=a.view.width;if(c<1)c=a.view.height;let d=a.view;Bc((e=b,f=c,d),e,f)},Qf=(a,b,c,d)=>{let e="";if(d&&d.text)e=d.text+"";if(d&&d.lineNumber){let b=d.lineNumber|0,c=1;if(d.column)c=d.column|0;Nc(a.view,b,c);Ic(a.view)}if(Ad(a.view,c,e)){na(a.cursorEmitter);return}if(je(a.view,c,e)){na(a.cursorEmitter);return}let f=0;while(f<a.actions.length){if(a.actions[f].id==c){a.actions[f].run(a);break}++f}},Rf=(a,b)=>{let c=me(b,"theme",a.view.theme);a.view.showLineNumbers=ne(b,"lineNumbers",a.view.showLineNumbers);a.view.readOnly=ne(b,"readOnly",a.view.readOnly);a.view.tabSize=oe(b,"tabSize",a.view.tabSize);a.view.insertSpaces=ne(b,"insertSpaces",a.view.insertSpaces);a.view.fontSize=oe(b,"fontSize",a.view.fontSize);a.view.wordWrap=ne(b,"wordWrap",a.view.wordWrap);if(b&&b.minimap){let d,c=b.minimap;a.view.showMinimap=ne((d=a.view.showMinimap,c),"enabled",d)}if(c!=a.view.theme)Ac(a.view,c);else Ic(a.view)},Sf=a=>{if(a.disposed)return;a.disposed=!0;oa(a.contentEmitter);oa(a.cursorEmitter)},Wf=a=>{Pf(a.original);Pf(a.modified)},Xf=a=>{Sf(a.original);Sf(a.modified)},pe=(a,b,c,d)=>{Mb();return qe(a,Wa(b,c),d,c)},qe=(a,b,c,d)=>{Mb();let i={root:null,overflow:null,margin:null,scrollable:null,linesHost:null,textarea:null,minimapCanvas:null,widgetsHost:null,cursorEl:null,selectionHost:null,findWidget:null,findInput:null,replaceInput:null,suggestWidget:null,hoverWidget:null,contextWidget:null,gotoWidget:null,gotoInput:null,renameWidget:null,renameInput:null,paramWidget:null,stickyWidget:null,model:null,selection:null,extraCursors:[],scrollTop:0,lineHeight:0,charWidth:0,width:0,height:0,showLineNumbers:!1,showMinimap:!1,theme:"",languageId:"",readOnly:!1,fontSize:0,tabSize:0,insertSpaces:!1,wordWrap:!1,mouseSelecting:!1,mouseAnchorLine:0,mouseAnchorColumn:0,folds:[],collapsed:[],findOpen:!1,findQuery:"",replaceQuery:"",findIndex:0,suggestOpen:!1,suggestItems:[],suggestIndex:0,hoverOpen:!1,contextOpen:!1,gotoOpen:!1,renameOpen:!1,renameWord:"",modelFacade:null};xc(i,a,b);i.theme=c;i.languageId=d;zc(i);Ic(i);let g={view:null,contentEmitter:null,cursorEmitter:null,disposed:!1,actions:[],modelFacade:null};((a,b)=>{let f;a.view=b;a.contentEmitter={listeners:[],disposed:!1};a.cursorEmitter={listeners:[],disposed:!1};a.modelFacade=ph();let e=b.model;rb((f=()=>{na(a.contentEmitter)},e),f);{let d=a.view;Xh(d.textarea,"keydown",b=>{if(d.suggestOpen){let a=Gh(b);if(a=="ArrowDown"){Kh(b);Yd(d,1);return}if(a=="ArrowUp"){Kh(b);Yd(d,-1);return}if(a=="Enter"||a=="Tab"){Kh(b);Xd(d);return}if(a=="Escape"){Kh(b);Wd(d);return}}if(Hh(b)&&Gh(b)=="f"){Kh(b);Nd(d,!1);return}if(Hh(b)&&Gh(b)=="h"){Kh(b);Nd(d,!0);return}if(Hh(b)&&Gh(b)=="g"){Kh(b);Qf(a,"keyboard","editor.action.gotoLine",ph());return}if(Hh(b)&&Gh(b)==" "){Kh(b);Qf(a,"keyboard","editor.action.triggerSuggest",ph());return}if(Hh(b)&&Gh(b)=="/"){Kh(b);Qf(a,"keyboard","editor.action.commentLine",ph());return}if(Hh(b)&&(Gh(b)=="d"||Gh(b)=="D")){Kh(b);Qf(a,"keyboard","editor.action.addSelectionToNextFindMatch",ph());return}if(Gh(b)=="F2"){Kh(b);Qf(a,"keyboard","editor.action.rename",ph());return}if(Gh(b)=="F12"){Kh(b);if(Ih(b))Qf(a,"keyboard","editor.action.goToReferences",ph());else Qf(a,"keyboard","editor.action.goToDefinition",ph());return}if(Gh(b)=="F8"){Kh(b);Qf(a,"keyboard","editor.action.marker.next",ph());return}if(Jh(b)&&Ih(b)&&(Gh(b)=="f"||Gh(b)=="F")){Kh(b);Qf(a,"keyboard","editor.action.formatDocument",ph());return}if(Gh(b)=="Escape"){Wd(d);ae(d);de(d);Od(d)}Bd(d,b);na(a.cursorEmitter)},!1);Xh(d.textarea,"compositionend",a=>{let b=a.data+"";if(b.length>0)Rc(d,b)},!1);Xh(d.textarea,"input",a=>{if(Lh(a))return;let b=a.target.value+"";if(b.length>0){Rc(d,b);Ch(d.textarea,"")}},!1);Xh(d.textarea,"paste",a=>{Kh(a);pd(d,Yh(a))},!1);Xh(d.textarea,"copy",a=>{Cd(d,a)},!1);Xh(d.textarea,"cut",a=>{Cd(d,a);od(d)},!1);Xh(d.scrollable,"scroll",a=>{d.scrollTop=d.scrollable.scrollTop|0;Ic(d)},!1);Xh(d.root,"focus",a=>{Sh(d.textarea)},!1);Xh(d.scrollable,"mousedown",b=>{if(Zh(b)==0)Kh(b);de(d);ae(d);let c=Kc(d,$h(b),_h(b)),f=c.lineNumber,g=c.column,e=ai(b);d.mouseSelecting=!0;d.mouseAnchorLine=f;d.mouseAnchorColumn=g;if(e>=3){let b=gb(d.model,f)+1|0;Oc(d,f,1,f,b)}else if(e==2){Nc(d,f,g);Qf(a,"keyboard","cursorWordSelect",ph())}else if(Jh(b))d.extraCursors.push(sb(f,g,f,g));else if(Ih(b)){let a=d.selection.selectionStartLineNumber,b=d.selection.selectionStartColumn;Oc(d,a,b,f,g)}else{d.extraCursors=[];Nc(d,f,g)}Sh(d.textarea);Ic(d);na(a.cursorEmitter)},!1);Xh(d.margin,"mousedown",a=>{if(Zh(a)==0)Kh(a);let b=Kc(d,$h(a),_h(a));Gc(d,b.lineNumber);Sh(d.textarea)},!1);Xh(d.root,"contextmenu",a=>{Kh(a);ce(d,$h(a)-bi(d.root)|0,_h(a)-ci(d.root)|0)},!1);Xh(d.contextWidget,"mousedown",b=>{Kh(b);let e=b.target,c=Nh(e,"getAttribute","data-cmd",ph(),ph())+"";if(c.length==0||c=="undefined"){let b,d,a=e.parentElement;c=Nh((b=ph(),d=ph(),a),"getAttribute","data-cmd",b,d)+""}if(c.length>0&&c!="undefined"){Qf(a,"menu",c,ph());de(d)}},!1);Xh(d.findWidget,"mousedown",a=>{let e,f,c=a.target,b=Nh((e=ph(),f=ph(),c),"getAttribute","data-find",e,f)+"";if(b=="next")Qd(d,!1);if(b=="prev")Qd(d,!0);if(b=="replace")Rd(d);if(b=="all")Sd(d)},!1);Xh(d.findInput,"keydown",a=>{if(Gh(a)=="Enter"){Kh(a);Qd(d,Hh(a))}if(Gh(a)=="Escape"){Kh(a);Od(d)}},!1);Xh(d.gotoInput,"keydown",a=>{if(Gh(a)=="Enter"){Kh(a);{let a=Th(d.gotoInput),b=1;if(a.length>0)b=a|0;let c=db(d.model);if(b<1)b=1;if(b>c)b=c;Nc(d,b,1);d.gotoOpen=!1;zh(d.gotoWidget,"none");Ic(d);Sh(d.textarea)}}},!1);Xh(d.renameInput,"keydown",a=>{if(Gh(a)=="Enter"){Kh(a);{let a=Th(d.renameInput);if(d.renameWord.length>0&&a.length>0){let b=Sb(d.model,d.renameWord,!1,!0,!0),c=b.length-1;while(c>=0){let g,e=b[c],f=d.model;lb((g=[Za(e.range.startLineNumber,e.range.startColumn,e.range.endLineNumber,e.range.endColumn,a)],f),g,!0);--c}}d.renameOpen=!1;zh(d.renameWidget,"none");Ic(d);Sh(d.textarea)}}},!1);Xh(d.scrollable,"mousemove",b=>{if(d.mouseSelecting){let g,h,c=Kc(d,$h(b),_h(b)),e=d.mouseAnchorLine,f=d.mouseAnchorColumn;Oc((g=c.lineNumber,h=c.column,d),e,f,g,h);Ic(d);na(a.cursorEmitter);return}if(Hh(b)){let a=Kc(d,$h(b),_h(b));Nc(d,a.lineNumber,a.column);_d(d)}},!1);Xh(d.scrollable,"mouseup",a=>{d.mouseSelecting=!1},!1);Xh(d.root,"mouseleave",a=>{d.mouseSelecting=!1},!1)}})(g,i);Ff.push(g);na(Hf);return g},re=function(a,b){let f=pe(a,me(b,"value",""),me(b,"language","plaintext"),me(b,"theme",Ef));Rf(f,b);Ic(f.view);return f},se=function(a,b){let c=rh("div"),d=rh("div");th(a,"display","flex");th(c,"flex","1 1 50%");th(d,"flex","1 1 50%");xh(a,c);xh(a,d);let e=me(b,"original",""),f=me(b,"modified",""),g=me(b,"language","plaintext"),k={root:a,original:pe(c,e,g,Ef),modified:pe(d,f,g,Ef),changes:[]};Gf.push(k);na(If);return k},ve=function(a,b){Ef=a},we=function(a){Ef=a;let b=0;while(b<Ff.length){Ac(Ff[b].view,a);++b}},ye=function(a,b,c){let d=[];if(c){let e=0;while(c[e]){let f,g;d.push(mc((f=c[e],g=a.uri,f),b,ka(g)));e=e+1|0}}{let c=ic(a),e;{let h;{let a=[],d=0;while(d<rc.length){let e=rc[d];if(!(e.owner==b&&e.resource==c))a.push(e);++d}h=a}let j=h,i=jc(d,b,c),a=[],f=0;while(f<j.length){a.push(j[f]);++f}let g=0;while(g<i.length){a.push(i[g]);++g}e=a}rc=e}},Ae=function(a){{let b=[],c=0;while(c<rc.length){if(rc[c].owner!=a)b.push(rc[c]);++c}rc=b}},Ge=function(a,b){return Ed("documentFormatting",a,b)},Te=function(a,b){cb(a.view.model,b);Nc(a.view,1,1);Ic(a.view)},Ue=function(a){return a.view.model},Ve=function(a,b){a.view.model=b;a.view.languageId=b.languageId;Nc(a.view,1,1);Ic(a.view)},We=function(a){return{lineNumber:a.view.selection.positionLineNumber,column:a.view.selection.positionColumn}},Xe=function(a,b){Nc(a.view,b.lineNumber,b.column);Ic(a.view)},Ze=function(a,b){Oc(a.view,b.selectionStartLineNumber,b.selectionStartColumn,b.positionLineNumber,b.positionColumn);Ic(a.view)},$e=function(a,b,c,d){Qf(a,b,c,d)},af=function(a,b,c){Bc(a.view,b,c)},df=function(a,b){let c;{let d=lb(a.view.model,b,!0);Ic(a.view);c=d}return c},ef=function(a,b,c){let d;{let e=ob(a.view.model,b,c);Ic(a.view);d=e}return d},ff=function(a,b){Lc(a.view,b);Ic(a.view)},gf=function(a,b,c,d){let e;a.actions.push((e={id:"",label:"",run:null},((a,b,c,d)=>{a.id=b;a.label=c;a.run=d})(e,b,c,d),e))},hf=function(a,b){a.modelFacade=b;a.view.modelFacade=b},jf=function(a,b){return ma(a.contentEmitter,b)},kf=function(a,b){return ma(a.cursorEmitter,b)},lf=function(a){return ma(Hf,a)},mf=function(a){Mb();if(Nb(a)!=null)return;let c=Nb("plaintext");if(c){let b,d;Lb((b=c.lexer,d={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},Rb(d,a,b,"","",""),d))}},nf=function(a,b){let c=Nb(a);if(!c||!b)return;let d=b.comments;if(d){if(d.lineComment)c.lineComment=d.lineComment+"";if(d.blockComment){let a=d.blockComment;if(a[0])c.blockCommentStart=a[0]+"";if(a[1])c.blockCommentEnd=a[1]+""}}},of=function(a,b){mf(a);let c=Nb(a);if(c)c.tokensProvider=b},pf=function(a,b){return kb(a,b)},rf=function(a,b){cb(a,b)},sf=function(a){return db(a)},tf=function(a,b){return fb(a,b)},uf=function(a,b){return hb(a,b)},vf=function(a,b){return jb(a,b)},wf=function(a){return a.languageId},zf=function(a,b){return lb(a,b,!0)},Af=function(a){let b=Ya(),c=0;while(c<b.length){if(b[c]===a){b.splice(c,1);break}++c}oa(a.contentEmitter)},Bf=function(a){return ma(If,a)},Cf=function(a){let b=[],c=1,d=db(a);while(c<=d){b.push(fb(a,c));c=c+1|0}return b},$f=(a,b,c,d)=>{let e=Bb(a,b,"",c);Ab(e,"root",xb(),0,"","",!1);if(d.length>0){let a=Vg(),b=0;while(b<d.length){let c=d.charAt(b);if(c=="/"||c=="*"||c=="-"||c=="+"||c=="?"||c=="."||c=="("||c==")"||c=="["||c=="]"||c=="{"||c=="}"||c=="^"||c=="$"||c=="|"||c=="\\")a=a+"\\"+c;else a=a+c;++b}Ab(e,"root",a+".*",0,"comment","",!1)}Ab(e,"root","/\\*",1,"comment","comment",!1);Ab(e,"root","\"",1,"string","string",!1);Ab(e,"root","'",1,"string","stringS",!1);Ab(e,"root","\\d+",0,"number","",!1);Ab(e,"root","[a-zA-Z_][\\w]*",4,"identifier","",!1);Ab(e,"root",".",0,"","",!1);Ab(e,"comment","\\*/",2,"comment","",!1);Ab(e,"comment","[^*]+",0,"comment","",!1);Ab(e,"comment","\\*",0,"comment","",!1);Ab(e,"string","\"",2,"string","",!1);Ab(e,"string","[^\\\\\"]+",0,"string","",!1);Ab(e,"stringS","'",2,"string","",!1);Ab(e,"stringS","[^']+",0,"string","",!1);return e},_f=()=>{let a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,$,_,aa,ba,ca,da,ea,fa,ga,ha,ia,ja,ka,la,ma,na,oa,pa,qa,ra,sa,ta,ua,va,wa,xa,ya,za,Aa,Ba,Ca,Da,Ea,Fa,Ga,Ha,Ia,Ja,Ka,La,Ma,Na,Oa,Pa,Qa,Ra,Sa,Ta,Ua,Va,Wa,Xa,Ya,Za,$a,_a,ab,bb,cb,db,eb,fb,gb,hb,ib,jb,kb,lb,mb,nb,ob,pb,qb,rb,sb,tb,ub,vb,wb,xb,yb,zb,Ab,Bb,Cb,Db,Eb,Fb,Gb,Hb,Ib,Jb,Kb,Mb,Nb,Ob,Pb,Qb;if(ag)return;ag=!0;Lb((a=$f("abap",".abap",["abap-source","abbreviated","abstract","accept","accepting","according","activation","actual","add","add-corresponding","adjacent","after","alias","aliases","align","all","allocate","alpha","analysis","analyzer","and","append","appendage","appending","application","archive","area","arithmetic","as","ascending","aspect","assert","assign","assigned","assigning","association","asynchronous","at","attributes","authority","authority-check","avg","back","background","backup","backward","badi","base","before","begin","between","big","binary","bintohex","bit","black","blank","blanks","blob","block","blocks","blue","bound","boundaries"],"*"),b={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},Rb(b,"abap",a,"*","/*","*/"),b));Lb((c=$f("apex",".apex",[],"//"),d={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},Rb(d,"apex",c,"//","/*","*/"),d));Lb((e=$f("azcli",".azcli",[],"#"),f={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},Rb(f,"azcli",e,"#","/*","*/"),f));Lb((g=$f("bat",".bat",[],"REM"),h={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},Rb(h,"bat",g,"REM","/*","*/"),h));Lb((i=$f("bicep",".bicep",[],"//"),j={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},Rb(j,"bicep",i,"//","/*","*/"),j));Lb((k=$f("cameligo",".cameligo",["abs","assert","block","Bytes","case","Crypto","Current","else","failwith","false","for","fun","if","in","let","let%entry","let%init","List","list","Map","map","match","match%nat","mod","not","operation","Operation","of","record","Set","set","sender","skip","source","String","then","to","true","type","with"],"//"),l={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},Rb(l,"cameligo",k,"//","/*","*/"),l));Lb((m=$f("clojure",".clojure",[],";;"),n={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},Rb(n,"clojure",m,";;","/*","*/"),n));Lb((o=$f("coffee",".coffee",["and","or","is","isnt","not","on","yes","@","no","off","true","false","null","this","new","delete","typeof","in","instanceof","return","throw","break","continue","debugger","if","else","switch","for","while","do","try","catch","finally","class","extends","super","undefined","then","unless","until","loop","of","by","when"],"#"),p={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},Rb(p,"coffee",o,"#","/*","*/"),p));Lb((q=$f("cpp",".cpp",["abstract","amp","array","auto","bool","break","case","catch","char","class","const","constexpr","const_cast","continue","cpu","decltype","default","delegate","delete","do","double","dynamic_cast","each","else","enum","event","explicit","export","extern","false","final","finally","float","for","friend","gcnew","generic","goto","if","in","initonly","inline","int","interface","interior_ptr","internal","literal","long","mutable","namespace","new","noexcept","nullptr","__nullptr","operator","override","partial","pascal","pin_ptr","private","property","protected","public","ref"],"//"),r={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},Rb(r,"cpp",q,"//","/*","*/"),r));Lb((s=$f("csharp",".csharp",["extern","alias","using","bool","decimal","sbyte","byte","short","ushort","int","uint","long","ulong","char","float","double","object","dynamic","string","assembly","is","as","ref","out","this","base","new","typeof","void","checked","unchecked","default","delegate","var","const","if","else","switch","case","while","do","for","foreach","in","break","continue","goto","return","throw","try","catch","finally","lock","yield","from","let","where","join","on","equals","into","orderby","ascending","descending"],"//"),t={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},Rb(t,"csharp",s,"//","/*","*/"),t));Lb((u=$f("csp",".csp",[],""),v={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},Rb(v,"csp",u,"","/*","*/"),v));Lb((w=$f("cypher",".cypher",["ALL","AND","AS","ASC","ASCENDING","BY","CALL","CASE","CONTAINS","CREATE","DELETE","DESC","DESCENDING","DETACH","DISTINCT","ELSE","END","ENDS","EXISTS","IN","IS","LIMIT","MANDATORY","MATCH","MERGE","NOT","ON","ON","OPTIONAL","OR","ORDER","REMOVE","RETURN","SET","SKIP","STARTS","THEN","UNION","UNWIND","WHEN","WHERE","WITH","XOR","YIELD"],"//"),x={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},Rb(x,"cypher",w,"//","/*","*/"),x));Lb((y=$f("dart",".dart",["abstract","dynamic","implements","show","as","else","import","static","assert","enum","in","super","async","export","interface","switch","await","extends","is","sync","break","external","library","this","case","factory","mixin","throw","catch","false","new","true","class","final","null","try","const","finally","on","typedef","continue","for","operator","var","covariant","Function","part","void","default","get","rethrow","while","deferred","hide","return","with","do","if","set","yield"],"//"),z={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},Rb(z,"dart",y,"//","/*","*/"),z));Lb((A=$f("dockerfile",".dockerfile",[],""),B={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},Rb(B,"dockerfile",A,"","/*","*/"),B));Lb((C=$f("ecl",".ecl",["__compressed__","after","all","and","any","as","atmost","before","beginc","best","between","case","cluster","compressed","compression","const","counter","csv","default","descend","embed","encoding","encrypt","end","endc","endembed","endmacro","enum","escape","except","exclusive","expire","export","extend","fail","few","fileposition","first","flat","forward","from","full","function","functionmacro","group","grouped","heading","hole","ifblock","import","in","inner","interface","internal","joined","keep","keyed","last","left","limit","linkcounted","literal","little_endian","load"],"//"),D={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},Rb(D,"ecl",C,"//","/*","*/"),D));Lb((E=$f("elixir",".elixir",[],"#"),F={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},Rb(F,"elixir",E,"#","/*","*/"),F));Lb((G=$f("flow9",".flow9",["import","require","export","forbid","native","if","else","cast","unsafe","switch","default"],"//"),H={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},Rb(H,"flow9",G,"//","/*","*/"),H));Lb((I=$f("freemarker2",".freemarker2",["false","true","in","as","using"],""),J={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},Rb(J,"freemarker2",I,"","/*","*/"),J));Lb((K=$f("fsharp",".fsharp",["abstract","and","atomic","as","assert","asr","base","begin","break","checked","component","const","constraint","constructor","continue","class","default","delegate","do","done","downcast","downto","elif","else","end","exception","eager","event","external","extern","false","finally","for","fun","function","fixed","functor","global","if","in","include","inherit","inline","interface","internal","land","lor","lsl","lsr","lxor","lazy","let","match","member","mod","module","mutable","namespace","method","mixin","new","not","null","of"],"//"),L={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},Rb(L,"fsharp",K,"//","/*","*/"),L));Lb((M=$f("go",".go",["break","case","chan","const","continue","default","defer","else","fallthrough","for","func","go","goto","if","import","interface","map","package","range","return","select","struct","switch","type","var","bool","true","false","uint8","uint16","uint32","uint64","int8","int16","int32","int64","float32","float64","complex64","complex128","byte","rune","uint","int","uintptr","string","nil"],"//"),N={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},Rb(N,"go",M,"//","/*","*/"),N));Lb((O=$f("graphql",".graphql",["null","true","false","query","mutation","subscription","extend","schema","directive","scalar","type","interface","union","enum","input","implements","fragment","on"],"#"),P={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},Rb(P,"graphql",O,"#","/*","*/"),P));Lb((Q=$f("handlebars",".handlebars",[],""),R={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},Rb(R,"handlebars",Q,"","/*","*/"),R));Lb((S=$f("hcl",".hcl",["var","local","path","for_each","any","string","number","bool","true","false","null","if ","else ","endif ","for ","in","endfor"],"#"),T={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},Rb(T,"hcl",S,"#","/*","*/"),T));Lb((U=$f("ini",".ini",[],"#"),V={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},Rb(V,"ini",U,"#","/*","*/"),V));Lb((W=$f("java",".java",["abstract","continue","for","new","switch","assert","default","goto","package","synchronized","boolean","do","if","private","this","break","double","implements","protected","throw","byte","else","import","public","throws","case","enum","instanceof","return","transient","catch","extends","int","short","try","char","final","interface","static","void","class","finally","long","strictfp","volatile","const","float","native","super","while","true","false","yield","record","sealed","non-sealed","permits"],"//"),X={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},Rb(X,"java",W,"//","/*","*/"),X));Lb((Y=$f("julia",".julia",["begin","while","if","for","try","return","break","continue","function","macro","quote","let","local","global","const","do","struct","module","baremodule","using","import","export","end","else","elseif","catch","finally","mutable","primitive","abstract","type","in","isa","where","new"],""),Z={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},Rb(Z,"julia",Y,"","/*","*/"),Z));Lb(($=$f("kotlin",".kotlin",["as","as?","break","class","continue","do","else","false","for","fun","if","in","!in","interface","is","!is","null","object","package","return","super","this","throw","true","try","typealias","val","var","when","while","by","catch","constructor","delegate","dynamic","field","file","finally","get","import","init","param","property","receiver","set","setparam","where","actual","abstract","annotation","companion","const","crossinline","data","enum","expect","external","final","infix","inline","inner","internal","lateinit","noinline"],"//"),_={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},Rb(_,"kotlin",$,"//","/*","*/"),_));Lb((aa=$f("less",".less",[],"//"),ba={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},Rb(ba,"less",aa,"//","/*","*/"),ba));Lb((ca=$f("lexon",".lexon",["lexon","lex","clause","terms","contracts","may","pay","pays","appoints","into","to"],"COMMENT"),da={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},Rb(da,"lexon",ca,"COMMENT","/*","*/"),da));Lb((ea=$f("liquid",".liquid",[],""),fa={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},Rb(fa,"liquid",ea,"","/*","*/"),fa));Lb((ga=$f("lua",".lua",["and","break","do","else","elseif","end","false","for","function","goto","if","in","local","nil","not","or","repeat","return","then","true","until","while"],"--"),ha={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},Rb(ha,"lua",ga,"--","/*","*/"),ha));Lb((ia=$f("m3",".m3",["AND","ANY","ARRAY","AS","BEGIN","BITS","BRANDED","BY","CASE","CONST","DIV","DO","ELSE","ELSIF","END","EVAL","EXCEPT","EXCEPTION","EXIT","EXPORTS","FINALLY","FOR","FROM","GENERIC","IF","IMPORT","IN","INTERFACE","LOCK","LOOP","METHODS","MOD","MODULE","NOT","OBJECT","OF","OR","OVERRIDES","PROCEDURE","RAISE","RAISES","READONLY","RECORD","REF","REPEAT","RETURN","REVEAL","SET","THEN","TO","TRY","TYPE","TYPECASE","UNSAFE","UNTIL","UNTRACED","VALUE","VAR","WHILE","WITH"],""),ja={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},Rb(ja,"m3",ia,"","/*","*/"),ja));Lb((ka=$f("mdx",".mdx",[],""),la={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},Rb(la,"mdx",ka,"","/*","*/"),la));Lb((ma=$f("mips",".mips",[".data",".text","syscall","trap","add","addu","addi","addiu","and","andi","div","divu","mult","multu","nor","or","ori","sll","slv","sra","srav","srl","srlv","sub","subu","xor","xori","lhi","lho","lhi","llo","slt","slti","sltu","sltiu","beq","bgtz","blez","bne","j","jal","jalr","jr","lb","lbu","lh","lhu","lw","li","la","sb","sh","sw","mfhi","mflo","mthi","mtlo","move"],"#"),na={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},Rb(na,"mips",ma,"#","/*","*/"),na));Lb((oa=$f("msdax",".msdax",["VAR","RETURN","NOT","EVALUATE","DATATABLE","ORDER","BY","START","AT","DEFINE","MEASURE","ASC","DESC","IN","BOOLEAN","DOUBLE","INTEGER","DATETIME","CURRENCY","STRING"],"//"),pa={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},Rb(pa,"msdax",oa,"//","/*","*/"),pa));Lb((qa=$f("mysql",".mysql",["ACCESSIBLE","ADD","ALL","ALTER","ANALYZE","AND","AS","ASC","ASENSITIVE","BEFORE","BETWEEN","BIGINT","BINARY","BLOB","BOTH","BY","CALL","CASCADE","CASE","CHANGE","CHAR","CHARACTER","CHECK","COLLATE","COLUMN","CONDITION","CONSTRAINT","CONTINUE","CONVERT","CREATE","CROSS","CUBE","CUME_DIST","CURRENT_DATE","CURRENT_TIME","CURRENT_TIMESTAMP","CURRENT_USER","CURSOR","DATABASE","DATABASES","DAY_HOUR","DAY_MICROSECOND","DAY_MINUTE","DAY_SECOND","DEC","DECIMAL","DECLARE","DEFAULT","DELAYED","DELETE","DENSE_RANK","DESC","DESCRIBE","DETERMINISTIC","DISTINCT","DISTINCTROW","DIV","DOUBLE","DROP","DUAL","EACH","ELSE","ELSEIF","EMPTY"],"--"),ra={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},Rb(ra,"mysql",qa,"--","/*","*/"),ra));Lb((sa=$f("objective-c",".objective-c",["#import","#include","#define","#else","#endif","#if","#ifdef","#ifndef","#ident","#undef","@class","@defs","@dynamic","@encode","@end","@implementation","@interface","@package","@private","@protected","@property","@protocol","@public","@selector","@synthesize","__declspec","assign","auto","BOOL","break","bycopy","byref","case","char","Class","const","copy","continue","default","do","double","else","enum","extern","FALSE","false","float","for","goto","if","in","int","id","inout","IMP","long","nil","nonatomic","NULL","oneway","out","private","public","protected"],"//"),ta={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},Rb(ta,"objective-c",sa,"//","/*","*/"),ta));Lb((ua=$f("pascal",".pascal",["absolute","abstract","all","and_then","array","as","asm","attribute","begin","bindable","case","class","const","contains","default","div","else","end","except","exports","external","far","file","finalization","finally","forward","generic","goto","if","implements","import","in","index","inherited","initialization","interrupt","is","label","library","mod","module","name","near","not","object","of","on","only","operator","or_else","otherwise","override","package","packed","pow","private","program","protected","public","published","interface","implementation","qualified","read"],"//"),va={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},Rb(va,"pascal",ua,"//","/*","*/"),va));Lb((wa=$f("pascaligo",".pascaligo",["begin","block","case","const","else","end","fail","for","from","function","if","is","nil","of","remove","return","skip","then","type","var","while","with","option","None","transaction"],"//"),xa={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},Rb(xa,"pascaligo",wa,"//","/*","*/"),xa));Lb((ya=$f("perl",".perl",["__DATA__","else","lock","__END__","elsif","lt","__FILE__","eq","__LINE__","exp","ne","sub","__PACKAGE__","for","no","and","foreach","or","unless","cmp","ge","package","until","continue","gt","while","CORE","if","xor","do","le","__DIE__","__WARN__"],"#"),za={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},Rb(za,"perl",ya,"#","/*","*/"),za));Lb((Aa=$f("pgsql",".pgsql",["ALL","ANALYSE","ANALYZE","AND","ANY","ARRAY","AS","ASC","ASYMMETRIC","AUTHORIZATION","BINARY","BOTH","CASE","CAST","CHECK","COLLATE","COLLATION","COLUMN","CONCURRENTLY","CONSTRAINT","CREATE","CROSS","CURRENT_CATALOG","CURRENT_DATE","CURRENT_ROLE","CURRENT_SCHEMA","CURRENT_TIME","CURRENT_TIMESTAMP","CURRENT_USER","DEFAULT","DEFERRABLE","DESC","DISTINCT","DO","ELSE","END","EXCEPT","FALSE","FETCH","FOR","FOREIGN","FREEZE","FROM","FULL","GRANT","GROUP","HAVING","ILIKE","IN","INITIALLY","INNER","INTERSECT","INTO","IS","ISNULL","JOIN","LATERAL","LEADING","LEFT","LIKE","LIMIT","LOCALTIME","LOCALTIMESTAMP","NATURAL"],"--"),Ba={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},Rb(Ba,"pgsql",Aa,"--","/*","*/"),Ba));Lb((Ca=$f("php",".php",[],"//"),Da={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},Rb(Da,"php",Ca,"//","/*","*/"),Da));Lb((Ea=$f("pla",".pla",[".i",".o",".mv",".ilb",".ob",".label",".type",".phase",".pair",".symbolic",".symbolic-output",".kiss",".p",".e",".end"],"#"),Fa={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},Rb(Fa,"pla",Ea,"#","/*","*/"),Fa));Lb((Ga=$f("postiats",".postiats",["abstype","abst0ype","absprop","absview","absvtype","absviewtype","absvt0ype","absviewt0ype","as","and","assume","begin","case","classdec","datasort","datatype","dataprop","dataview","datavtype","dataviewtype","do","end","extern","extype","extvar","exception","fn","fnx","fun","prfn","prfun","praxi","castfn","if","then","else","ifcase","in","infix","infixl","infixr","prefix","postfix","implmnt","implement","primplmnt","primplement","import","lam","llam","fix","let","local","macdef","macrodef","nonfix","symelim","symintr","overload","of","op","rec","sif","scase"],"//"),Ha={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},Rb(Ha,"postiats",Ga,"//","/*","*/"),Ha));Lb((Ia=$f("powerquery",".powerquery",["as","each","else","error","false","if","in","is","let","meta","otherwise","section","shared","then","true","try","type"],"//"),Ja={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},Rb(Ja,"powerquery",Ia,"//","/*","*/"),Ja));Lb((Ka=$f("powershell",".powershell",["begin","break","catch","class","continue","data","define","do","dynamicparam","else","elseif","end","exit","filter","finally","for","foreach","from","function","if","in","param","process","return","switch","throw","trap","try","until","using","var","while","workflow","parallel","sequence","inlinescript","configuration"],"#"),La={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},Rb(La,"powershell",Ka,"#","/*","*/"),La));Lb((Ma=$f("protobuf",".protobuf",["syntax","import","weak","public","package","option","repeated","oneof","map","reserved","to","max","enum","message","service","rpc","stream","returns","package","optional","true","false"],"//"),Na={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},Rb(Na,"protobuf",Ma,"//","/*","*/"),Na));Lb((Oa=$f("pug",".pug",["append","block","case","default","doctype","each","else","extends","for","if","in","include","mixin","typeof","unless","var","when"],"//"),Pa={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},Rb(Pa,"pug",Oa,"//","/*","*/"),Pa));Lb((Qa=$f("qsharp",".qsharp",["namespace","open","import","export","as","operation","function","body","adjoint","newtype","struct","controlled","if","elif","else","repeat","until","fixup","for","in","while","return","fail","within","apply","Adjoint","Controlled","Adj","Ctl","is","self","auto","distribute","invert","intrinsic","let","set","w/","new","not","and","or","use","borrow","using","borrowing","mutable","internal"],"//"),Ra={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},Rb(Ra,"qsharp",Qa,"//","/*","*/"),Ra));Lb((Sa=$f("r",".r",["break","next","return","if","else","for","in","repeat","while","array","category","character","complex","double","function","integer","list","logical","matrix","numeric","vector","data.frame","factor","library","require","attach","detach","source"],"#"),Ta={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},Rb(Ta,"r",Sa,"#","/*","*/"),Ta));Lb((Ua=$f("razor",".razor",[],""),Va={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},Rb(Va,"razor",Ua,"","/*","*/"),Va));Lb((Wa=$f("redis",".redis",["APPEND","AUTH","BGREWRITEAOF","BGSAVE","BITCOUNT","BITFIELD","BITOP","BITPOS","BLPOP","BRPOP","BRPOPLPUSH","CLIENT","KILL","LIST","GETNAME","PAUSE","REPLY","SETNAME","CLUSTER","ADDSLOTS","COUNT-FAILURE-REPORTS","COUNTKEYSINSLOT","DELSLOTS","FAILOVER","FORGET","GETKEYSINSLOT","INFO","KEYSLOT","MEET","NODES","REPLICATE","RESET","SAVECONFIG","SET-CONFIG-EPOCH","SETSLOT","SLAVES","SLOTS","COMMAND","COUNT","GETKEYS","CONFIG","GET","REWRITE","SET","RESETSTAT","DBSIZE","DEBUG","OBJECT","SEGFAULT","DECR","DECRBY","DEL","DISCARD","DUMP","ECHO","EVAL","EVALSHA","EXEC","EXISTS","EXPIRE","EXPIREAT","FLUSHALL","FLUSHDB","GEOADD"],""),Xa={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},Rb(Xa,"redis",Wa,"","/*","*/"),Xa));Lb((Ya=$f("redshift",".redshift",["AES128","AES256","ALL","ALLOWOVERWRITE","ANALYSE","ANALYZE","AND","ANY","ARRAY","AS","ASC","AUTHORIZATION","AZ64","BACKUP","BETWEEN","BINARY","BLANKSASNULL","BOTH","BYTEDICT","BZIP2","CASE","CAST","CHECK","COLLATE","COLUMN","CONSTRAINT","CREATE","CREDENTIALS","CROSS","CURRENT_DATE","CURRENT_TIME","CURRENT_TIMESTAMP","CURRENT_USER","CURRENT_USER_ID","DEFAULT","DEFERRABLE","DEFLATE","DEFRAG","DELTA","DELTA32K","DESC","DISABLE","DISTINCT","DO","ELSE","EMPTYASNULL","ENABLE","ENCODE","ENCRYPT","ENCRYPTION","END","EXCEPT","EXPLICIT","FALSE","FOR","FOREIGN","FREEZE","FROM","FULL","GLOBALDICT256","GLOBALDICT64K","GRANT","GROUP","GZIP"],"--"),Za={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},Rb(Za,"redshift",Ya,"--","/*","*/"),Za));Lb(($a=$f("restructuredtext",".restructuredtext",[],""),_a={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},Rb(_a,"restructuredtext",$a,"","/*","*/"),_a));Lb((ab=$f("ruby",".ruby",["__LINE__","__ENCODING__","__FILE__","BEGIN","END","alias","and","begin","break","case","class","def","defined?","do","else","elsif","end","ensure","for","false","if","in","module","next","nil","not","or","redo","rescue","retry","return","self","super","then","true","undef","unless","until","when","while","yield"],"#"),bb={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},Rb(bb,"ruby",ab,"#","/*","*/"),bb));Lb((cb=$f("rust",".rust",["as","async","await","box","break","const","continue","crate","dyn","else","enum","extern","false","fn","for","if","impl","in","let","loop","match","mod","move","mut","pub","ref","return","self","static","struct","super","trait","true","try","type","unsafe","use","where","while","catch","default","union","static","abstract","alignof","become","do","final","macro","offsetof","override","priv","proc","pure","sizeof","typeof","unsized","virtual","yield"],"//"),db={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},Rb(db,"rust",cb,"//","/*","*/"),db));Lb((eb=$f("sb",".sb",["Else","ElseIf","EndFor","EndIf","EndSub","EndWhile","For","Goto","If","Step","Sub","Then","To","While"],"'"),fb={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},Rb(fb,"sb",eb,"'","/*","*/"),fb));Lb((gb=$f("scala",".scala",["asInstanceOf","catch","class","classOf","def","do","else","extends","finally","for","foreach","forSome","if","import","isInstanceOf","macro","match","new","object","package","return","throw","trait","try","type","until","val","var","while","with","yield","given","enum","then"],"//"),hb={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},Rb(hb,"scala",gb,"//","/*","*/"),hb));Lb((ib=$f("scheme",".scheme",["case","do","let","loop","if","else","when","cons","car","cdr","cond","lambda","lambda*","syntax-rules","format","set!","quote","eval","append","list","list?","member?","load"],";"),jb={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},Rb(jb,"scheme",ib,";","/*","*/"),jb));Lb((kb=$f("scss",".scss",[],"//"),lb={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},Rb(lb,"scss",kb,"//","/*","*/"),lb));Lb((mb=$f("shell",".shell",["if","then","do","else","elif","while","until","for","in","esac","fi","fin","fil","done","exit","set","unset","export","function"],"#"),nb={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},Rb(nb,"shell",mb,"#","/*","*/"),nb));Lb((ob=$f("solidity",".solidity",["pragma","solidity","contract","library","using","struct","function","modifier","constructor","address","string","bool","Int","Uint","Byte","Fixed","Ufixed","int","int8","int16","int24","int32","int40","int48","int56","int64","int72","int80","int88","int96","int104","int112","int120","int128","int136","int144","int152","int160","int168","int176","int184","int192","int200","int208","int216","int224","int232","int240","int248","int256","uint","uint8","uint16","uint24","uint32","uint40","uint48","uint56","uint64","uint72","uint80","uint88","uint96","uint104"],"//"),pb={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},Rb(pb,"solidity",ob,"//","/*","*/"),pb));Lb((qb=$f("sophia",".sophia",["contract","library","entrypoint","function","stateful","state","hash","signature","tuple","list","address","string","bool","int","record","datatype","type","option","oracle","oracle_query","Call","Bits","Bytes","Oracle","String","Crypto","Address","Auth","Chain","None","Some","bits","bytes","event","let","map","private","public","true","false","var","if","else","throw"],"//"),rb={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},Rb(rb,"sophia",qb,"//","/*","*/"),rb));Lb((sb=$f("sparql",".sparql",["add","as","asc","ask","base","by","clear","construct","copy","create","data","delete","desc","describe","distinct","drop","false","filter","from","graph","group","having","in","insert","limit","load","minus","move","named","not","offset","optional","order","prefix","reduced","select","service","silent","to","true","undef","union","using","values","where","with"],"#"),tb={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},Rb(tb,"sparql",sb,"#","/*","*/"),tb));Lb((ub=$f("sql",".sql",["ABORT","ABSOLUTE","ACTION","ADA","ADD","AFTER","ALL","ALLOCATE","ALTER","ALWAYS","ANALYZE","AND","ANY","ARE","AS","ASC","ASSERTION","AT","ATTACH","AUTHORIZATION","AUTOINCREMENT","AVG","BACKUP","BEFORE","BEGIN","BETWEEN","BIT","BIT_LENGTH","BOTH","BREAK","BROWSE","BULK","BY","CASCADE","CASCADED","CASE","CAST","CATALOG","CHAR","CHARACTER","CHARACTER_LENGTH","CHAR_LENGTH","CHECK","CHECKPOINT","CLOSE","CLUSTERED","COALESCE","COLLATE","COLLATION","COLUMN","COMMIT","COMPUTE","CONFLICT","CONNECT","CONNECTION","CONSTRAINT","CONSTRAINTS","CONTAINS","CONTAINSTABLE","CONTINUE","CONVERT","CORRESPONDING","COUNT","CREATE"],"--"),vb={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},Rb(vb,"sql",ub,"--","/*","*/"),vb));Lb((wb=$f("st",".st",["if","end_if","elsif","else","case","of","to","__try","__catch","__finally","do","with","by","while","repeat","end_while","end_repeat","end_case","for","end_for","task","retain","non_retain","constant","with","at","exit","return","interval","priority","address","port","on_channel","then","iec","file","uses","version","packagetype","displayname","copyright","summary","vendor","common_source","from","extends","implements"],"//"),xb={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},Rb(xb,"st",wb,"//","/*","*/"),xb));Lb((yb=$f("swift",".swift",["#available","#colorLiteral","#column","#dsohandle","#else","#elseif","#endif","#error","#file","#fileID","#fileLiteral","#filePath","#function","#if","#imageLiteral","#keyPath","#line","#selector","#sourceLocation","#warning","Any","Protocol","Self","Type","actor","as","assignment","associatedtype","associativity","async","await","break","case","catch","class","continue","convenience","default","defer","deinit","didSet","do","dynamic","dynamicType","else","enum","extension","fallthrough","false","fileprivate","final","for","func","get","guard","higherThan","if","import","in","indirect","infix","init","inout","internal"],"//"),zb={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},Rb(zb,"swift",yb,"//","/*","*/"),zb));Lb((Ab=$f("systemverilog",".systemverilog",["accept_on","alias","always","always_comb","always_ff","always_latch","and","assert","assign","assume","automatic","before","begin","bind","bins","binsof","bit","break","buf","bufif0","bufif1","byte","case","casex","casez","cell","chandle","checker","class","clocking","cmos","config","const","constraint","context","continue","cover","covergroup","coverpoint","cross","deassign","default","defparam","design","disable","dist","do","edge","else","end","endcase","endchecker","endclass","endclocking","endconfig","endfunction","endgenerate","endgroup","endinterface","endmodule","endpackage","endprimitive","endprogram","endproperty"],"//"),Bb={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},Rb(Bb,"systemverilog",Ab,"//","/*","*/"),Bb));Lb((Cb=$f("tcl",".tcl",[],""),Db={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},Rb(Db,"tcl",Cb,"","/*","*/"),Db));Lb((Eb=$f("twig",".twig",["apply","autoescape","block","deprecated","do","embed","extends","flush","for","from","if","import","include","macro","sandbox","set","use","verbatim","with","endapply","endautoescape","endblock","endembed","endfor","endif","endmacro","endsandbox","endset","endwith","true","false"],""),Fb={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},Rb(Fb,"twig",Eb,"","/*","*/"),Fb));Lb((Gb=$f("typespec",".typespec",[],"//"),Hb={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},Rb(Hb,"typespec",Gb,"//","/*","*/"),Hb));Lb((Ib=$f("vb",".vb",["AddHandler","AddressOf","Alias","And","AndAlso","As","Async","Boolean","ByRef","Byte","ByVal","Call","Case","Catch","CBool","CByte","CChar","CDate","CDbl","CDec","Char","CInt","Class","CLng","CObj","Const","Continue","CSByte","CShort","CSng","CStr","CType","CUInt","CULng","CUShort","Date","Decimal","Declare","Default","Delegate","Dim","DirectCast","Do","Double","Each","Else","ElseIf","End","EndIf","Enum","Erase","Error","Event","Exit","False","Finally","For","Friend","Function","Get","GetType","GetXMLNamespace","Global","GoSub"],"'"),Jb={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},Rb(Jb,"vb",Ib,"'","/*","*/"),Jb));Lb((Kb=$f("wgsl",".wgsl",[],"//"),Mb={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},Rb(Mb,"wgsl",Kb,"//","/*","*/"),Mb));Lb((Nb=$f("xml",".xml",[],""),Ob={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},Rb(Ob,"xml",Nb,"","/*","*/"),Ob));Lb((Pb=$f("yaml",".yaml",["true","True","TRUE","false","False","FALSE","null","Null","Null","~"],"#"),Qb={id:"",lexer:null,lineComment:"",blockCommentStart:"",blockCommentEnd:"",tokensProvider:null},Rb(Qb,"yaml",Pb,"#","/*","*/"),Qb))},fg=a=>({dispose:function(){a();return ph()}}),gg=(a,b)=>{Nh(a,"call",ph(),b,ph())},hg=a=>!a?"":a.__lilUri?a.__lilUri+"":a.toString?Nh(a,"toString",ph(),ph(),ph())+"":a.path?a.path+"":a+"",ig=a=>{let c={},b=ka(a);c.scheme=a.scheme;c.authority=a.authority;c.path=a.path;c.query=a.query;c.fragment=a.fragment;c.fsPath=a.path;c.__lilUri=b;c.toString=function(){return b};return c},jg=a=>({owner:a.owner,message:a.message,severity:a.severity,startLineNumber:a.startLineNumber,startColumn:a.startColumn,endLineNumber:a.endLineNumber,endColumn:a.endColumn,resource:a.resource}),kg=a=>({lineNumber:a.lineNumber,column:a.column}),lg=a=>{if(!a)return null;let b=hg(a);if(b.length==0&&a.uri)b=hg(a.uri);let c=Ya(),d=0;while(d<c.length){if(ka(c[d].uri)==b)return c[d];++d}return null},mg=a=>{let b=[];if(!a)return b;let c=0;while(a[c]){let i=a[c],j=i.range,d=j.startLineNumber|0,e=j.startColumn|0,f=j.endLineNumber|0,g=j.endColumn|0,h="";if(i.text)h=i.text+"";b.push(Za(d,e,f,g,h));c=c+1|0}return b},og=a=>{let b=0;while(b<Ig.length){if(Ig[b]===a)return Jg[b];++b}let e={};Ig.push(a);Jg.push(e);let c=ka(a.uri);e.__lilUri=c;e.uri=ig(a.uri);e.id=c;e.getValue=function(){return bb(a)};e.setValue=function(b){rf(a,b+"");return ph()};e.getLineCount=function(){return sf(a)};e.getLineContent=function(b){return tf(a,b|0)};e.getLineLength=function(b){return tf(a,b|0).length};e.getLanguageId=function(){return wf(a)};e.getVersionId=function(){return a.versionId};e.getOffsetAt=function(b){return uf(a,d(b))};e.getPositionAt=function(b){return kg(vf(a,b|0))};e.getValueInRange=function(b){return pf(a,g(b))};e.getWordAtPosition=function(b){let e,c=qb(a,d(b));return c.word.length==0?ph():(e={},e.word=c.word,e.startColumn=c.startColumn,e.endColumn=c.endColumn,e)};e.getWordUntilPosition=function(b){let c=qb(a,d(b)),e=b.column|0,f={};return c.word.length==0?(f.word="",f.startColumn=e,f.endColumn=e,f):(f.word=c.word,f.startColumn=c.startColumn,f.endColumn=e,f)};e.isDisposed=function(){return!1};e.isAttachedToEditor=function(){return!0};e.isTooLargeForSyncing=function(){return!1};e.onDidChangeAttached=function(a){return fg(()=>{})};e.getOptions=function(){return{tabSize:2,insertSpaces:!0}};e.getFullModelRange=function(){let b=sf(a);return{startLineNumber:1,startColumn:1,endLineNumber:b,endColumn:tf(a,b).length+1}};e.getEOL=function(){return"\n"};e.getValueLength=function(){return eb(a)};e.getLinesContent=function(){return Cf(a)};e.findMatches=function(b=void 0,c,d,e,f,g,h){let i=b+"",j=!!d,m=e+""!="false",k=!!f,l=1e3;if(h)l=h|0;return pb(a,i,j,m,k,l)};e.applyEdits=function(b){return zf(a,mg(b))};e.onDidChangeContent=function(b){return fg(rb(a,()=>{gg(b,{})}))};e.dispose=function(){Af(a);return ph()};return e},pg=a=>{let b=0;while(b<Gg.length){if(Gg[b]===a)return Hg[b];++b}let c={};Gg.push(a);Hg.push(c);c.getValue=function(){return bb(a.view.model)};c.setValue=function(b){Te(a,b+"");return ph()};c.getModel=function(){return og(Ue(a))};c.setModel=function(b){let c=lg(b);if(c){Ve(a,c);hf(a,og(c))}return ph()};c.getPosition=function(){return kg(We(a))};c.setPosition=function(b){Xe(a,d(b));return ph()};c.getSelection=function(){return a.view.selection};c.setSelection=function(b){Ze(a,tb(b));return ph()};c.trigger=function(b=void 0,c,d){let e=b+"",f=c+"";$e(a,e,f,d);return ph()};c.layout=function(b){if(b&&b.width)af(a,b.width|0,b.height|0);else Pf(a);return ph()};c.focus=function(){Sh(a.view.textarea);return ph()};c.hasTextFocus=function(){return!0};c.dispose=function(){Sf(a);return ph()};c.executeEdits=function(b=void 0,c){return df(a,mg(c))};c.deltaDecorations=function(b=void 0,c){return ef(a,[],(a=>{let b=[];if(!a)return b;let c=0;while(a[c]){let j=a[c],k=j.range,d=k.startLineNumber|0,e=k.startColumn|0,g=k.endLineNumber|0,h=k.endColumn|0,i="";if(j.options){let a=j.options;if(a.inlineClassName)i=a.inlineClassName+"";else if(a.className)i=a.className+""}b.push({id:0,range:f(d,e,g,h),className:i,hoverMessage:"",isWholeLine:!1,metadata:0});c=c+1|0}return b})(c))};c.revealLine=function(b){ff(a,b|0);return ph()};c.revealLineInCenter=function(b){ff(a,b|0);return ph()};c.revealPosition=function(b){Xe(a,d(b));return ph()};c.addAction=function(b){let c=b.id+"",d=c;if(b.label)d=b.label+"";gf(a,c,d,b.run);return fg(()=>{})};c.getAction=function(b){let c=b+"";return{id:c,run:function(){$e(a,"action",c,ph());return ph()}}};c.updateOptions=function(b){Rf(a,b);return ph()};c.onDidChangeModelContent=function(b){return fg(jf(a,()=>{gg(b,{})}))};c.onDidChangeCursorPosition=function(b){return fg(kf(a,()=>{let c={position:kg(We(a))};gg(b,c)}))};c.getDomNode=function(){return a.view.root};hf(a,og(Ue(a)));return c},qg=a=>({getOriginalEditor:function(){return pg(a.original)},getModifiedEditor:function(){return pg(a.modified)},layout:function(){Wf(a);return ph()},dispose:function(){Xf(a);return ph()}}),ug=()=>({Method:0,Function:1,Constructor:2,Field:3,Variable:4,Class:5,Struct:6,Interface:7,Module:8,Property:9,Event:10,Operator:11,Unit:12,Value:13,Constant:14,Enum:15,EnumMember:16,Keyword:17,Text:18,Color:19,File:20,Reference:21,Folder:23,TypeParameter:24}),Bg=function(){let a={editor:(()=>({create:function(a=void 0,b){let c=null;if(b&&b.model)c=lg(b.model);if(c){let d=b&&b.language?b.language+"":wf(c),e="vs";if(b&&b.theme)e=b.theme+"";let f=qe(a,c,e,d);Rf(f,b);return pg(f)}return pg(re(a,b))},createDiffEditor:function(a=void 0,b){return qg(se(a,b))},createModel:function(a=void 0,b,c){let d=a+"",e="plaintext";if(b)e=b+"";if(c){let a=og(Xa(d,e,fa(hg(c))));na(Dg);return a}let f=og(Wa(d,e));na(Dg);return f},getModels:function(){return(()=>{let a=Ya(),b=[],c=0;while(c<a.length){b.push(og(a[c]));++c}return b})()},getModel:function(a=void 0){let b=lg(a);return!b?ph():og(b)},getEditors:function(){return(()=>{let a=Ff,b=[],c=0;while(c<a.length){b.push(pg(a[c]));++c}return b})()},getDiffEditors:function(){let a=Gf,b=[],c=0;while(c<a.length){b.push(qg(a[c]));++c}return b},setTheme:function(a=void 0){we(a+"");return ph()},defineTheme:function(a=void 0,b){ve(a+"",b);return ph()},setModelLanguage:function(a=void 0,b){let c=lg(a);if(c)c.languageId=b+"";return ph()},setModelMarkers:function(a=void 0,b,c){let d=lg(a);if(d){ye(d,b+"",c);na(Cg)}return ph()},getModelMarkers:function(a=void 0){let b="",c="",d=0;if(a){if(a.owner)b=a.owner+"";if(a.resource)c=hg(a.resource);if(a.take)d=a.take|0}return((a,b,c)=>{let d=kc(a,b,c),e=[],f=0;while(f<d.length){e.push(jg(d[f]));++f}return e})(b,c,d)},removeAllMarkers:function(a=void 0){Ae(a+"");return ph()},onDidCreateModel:function(a=void 0){let c,d;return fg((c=Dg,ma((d=()=>{gg(a,{})},c),d)))},onWillDisposeModel:function(){return fg(()=>{})},onDidChangeModelLanguage:function(){return fg(()=>{})},onDidCreateEditor:function(a=void 0){return fg(lf(()=>{gg(a,{})}))},onDidCreateDiffEditor:function(a=void 0){return fg(Bf(()=>{gg(a,{})}))},onDidChangeMarkers:function(a=void 0){let c,d;return fg((c=Cg,ma((d=()=>{gg(a,{})},c),d)))}}))(),languages:(()=>({register:function(a=void 0){let b=a.id+"";mf(b);let c=0;while(c<Fg.length){if(Fg[c]==b)gg(Eg[c],ph());++c}return ph()},onLanguage:function(a=void 0,b){let c=a+"",d=Ob(),e=0;while(e<d.length){if(d[e]==c){gg(b,ph());return fg(()=>{})}++e}Fg.push(c);Eg.push(b);return fg(()=>{})},getLanguages:function(){let a=Ob(),b=[],c=0;while(c<a.length){b.push({id:a[c]});++c}return b},registerCompletionItemProvider:function(a=void 0,b){return fg(Ed("completion",a,b))},registerHoverProvider:function(a=void 0,b){return fg(Ed("hover",a,b))},registerDefinitionProvider:function(a=void 0,b){return fg(Ed("definition",a,b))},registerReferenceProvider:function(a=void 0,b){return fg(Ed("reference",a,b))},registerDocumentSymbolProvider:function(a=void 0,b){return fg(Ed("documentSymbol",a,b))},registerDocumentFormattingEditProvider:function(a=void 0,b){return fg(Ge(a,b))},registerDocumentRangeFormattingEditProvider:function(a=void 0,b){return fg(Ge(a,b))},registerOnTypeFormattingEditProvider:function(a=void 0,b){return fg(Ge(a,b))},registerRenameProvider:function(a=void 0,b){return fg(Ed("rename",a,b))},registerSignatureHelpProvider:function(a=void 0,b){return fg(Ed("signatureHelp",a,b))},registerFoldingRangeProvider:function(a=void 0,b){return fg(Ed("folding",a,b))},registerLinkProvider:function(a=void 0,b){return fg(Ed("link",a,b))},registerCodeActionProvider:function(a=void 0,b){return fg(Ed("codeAction",a,b))},registerCodeLensProvider:function(a=void 0,b){return fg(Ed("codeLens",a,b))},registerColorProvider:function(a=void 0,b){return fg(Ed("color",a,b))},registerDocumentHighlightProvider:function(a=void 0,b){return fg(Ed("documentHighlight",a,b))},registerInlayHintsProvider:function(a=void 0,b){return fg(Ed("inlayHints",a,b))},registerInlineCompletionsProvider:function(a=void 0,b){return fg(Ed("inlineCompletions",a,b))},registerImplementationProvider:function(a=void 0,b){return fg(Ed("implementation",a,b))},setLanguageConfiguration:function(a=void 0,b){nf(a+"",b);return fg(()=>{})},setTokensProvider:function(a=void 0,b){of(a+"",b);return fg(()=>{})},CompletionItemKind:ug()}))(),Uri:(()=>{let a=function(a=void 0,b,c,d,e){let k,l,m,n,o,f=a+"",g="",h="",i="",j="";if(b)g=b+"";if(c)h=c+"";if(d)i=d+"";if(e)j=e+"";return ig((k=g,l=h,m=i,n=j,o={scheme:"",authority:"",path:"",query:"",fragment:""},ja(o,f,k,l,m,n),o))};a.parse=function(a=void 0){return ig(fa(a+""))};a.file=function(a=void 0){return ig({scheme:"file",authority:"",path:a+"",query:"",fragment:""})};return a})(),MarkerSeverity:{Hint:nc,Info:oc,Warning:pc,Error:qc},KeyMod:(()=>({CtrlCmd:bg,Shift:cg,Alt:dg,WinCtrl:eg,chord:function(a=void 0,b){return a|0|(b|0)}}))(),CompletionItemKind:ug()},b=di();b.monaco=a;b.__lilEditor=!0;return a},bootMonaco=function(){(function(){Mb();_f()})();return Bg()};let $lh0=(function(){const KEYWORDS={javascript:"break case catch class const continue debugger default delete do else export extends false finally for function if import in instanceof let new null return super switch this throw true try typeof undefined var void while with yield async await of static get set constructor",typescript:"break case catch class const continue debugger default delete do else export extends false finally for function if import in instanceof let new null return super switch this throw true try typeof undefined var void while with yield async await of static get set constructor type interface enum implements package private protected public readonly namespace abstract as asserts keyof infer never unknown any boolean number string unique satisfies",python:"False None True and as assert async await break class continue def del elif else except finally for from global if import in is lambda nonlocal not or pass raise return try while with yield match case",json:"true false null",};function keywordSet(id){const raw=KEYWORDS[id]??(id==="javascript"||id==="typescript"?KEYWORDS.typescript:"");return new Set(raw.split(" ").filter(Boolean))}function escapeHtml(text){return String(text??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function tokenClass(type){if(type.includes("comment"))return"mtk-comment";if(type.includes("string"))return"mtk-string";if(type.includes("regexp"))return"mtk-regexp";if(type.includes("number"))return"mtk-number";if(type.includes("keyword"))return"mtk-keyword";if(type.includes("type"))return"mtk-type";if(type.includes("function"))return"mtk-function";if(type.includes("tag"))return"mtk-tag";if(type.includes("attribute")||type.includes("attr"))return"mtk-attr";if(type.includes("key"))return"mtk-attr";return"mtk"}function pushToken(out,offset,type,text){if(!text)return;out.push({offset,type,text})}function tokenizeCLike(line,keywords,state){const out=[];let i=0;let mode=state.mode;while(i<line.length){if(mode==="block"){const end=line.indexOf("*/",i);if(end<0){pushToken(out,i,"comment",line.slice(i));return{tokens:out,mode:"block"}}pushToken(out,i,"comment",line.slice(i,end+2));i=end+2;mode="root";continue}const rest=line.slice(i);const two=rest.slice(0,2);if(two==="//"){pushToken(out,i,"comment",rest);break}if(two==="/*"){const end=rest.indexOf("*/");if(end<0){pushToken(out,i,"comment",rest);return{tokens:out,mode:"block"}}pushToken(out,i,"comment",rest.slice(0,end+2));i+=end+2;continue}if(rest[0]==='"'||rest[0]==="'"||rest[0]==="`"){const q=rest[0];let j=1;while(j<rest.length){if(rest[j]==="\\"){j+=2;continue}if(rest[j]===q){j+=1;break}j+=1}pushToken(out,i,"string",rest.slice(0,j));i+=j;continue}if(rest[0]==="/"&&/[^/\s]/.test(rest[1]??"")&&!/[a-zA-Z0-9_)]/.test(line[i-1]??"")){let j=1;while(j<rest.length&&rest[j]!=="/"){if(rest[j]==="\\")j+=2;else j+=1}if(rest[j]==="/"){j+=1;while(/[gimsuy]/.test(rest[j]??""))j+=1;pushToken(out,i,"regexp",rest.slice(0,j));i+=j;continue}}const num=rest.match(/^(0x[0-9a-fA-F]+|\d+\.\d+([eE][+-]?\d+)?|\d+)/);if(num){pushToken(out,i,"number",num[0]);i+=num[0].length;continue}const word=rest.match(/^[A-Za-z_$][\w$]*/);if(word){const next=line.slice(i+word[0].length).match(/^\s*\(/);let type="identifier";if(keywords.has(word[0]))type="keyword";else if(/^[A-Z]/.test(word[0]))type="type";else if(next)type="function";pushToken(out,i,type,word[0]);i+=word[0].length;continue}pushToken(out,i,"mtk",rest[0]);i+=1}return{tokens:out,mode}}function tokenizeJson(line){const out=[];let i=0;while(i<line.length){const rest=line.slice(i);if(rest[0]==='"'){let j=1;while(j<rest.length&&rest[j]!=='"'){if(rest[j]==="\\")j+=2;else j+=1}j=Math.min(rest.length,j+1);const after=line.slice(i+j).match(/^\s*:/);pushToken(out,i,after?"key":"string",rest.slice(0,j));i+=j;continue}const num=rest.match(/^-?\d+(\.\d+)?([eE][+-]?\d+)?/);if(num){pushToken(out,i,"number",num[0]);i+=num[0].length;continue}const word=rest.match(/^(true|false|null)/);if(word){pushToken(out,i,"keyword",word[0]);i+=word[0].length;continue}pushToken(out,i,"mtk",rest[0]);i+=1}return{tokens:out,mode:"root"}}function tokenizeHtml(line,state){const out=[];let i=0;let mode=state.mode;while(i<line.length){const rest=line.slice(i);if(mode==="comment"){const end=rest.indexOf("-->");if(end<0){pushToken(out,i,"comment",rest);return{tokens:out,mode:"comment"}}pushToken(out,i,"comment",rest.slice(0,end+3));i+=end+3;mode="root";continue}if(rest.startsWith("<!--")){const end=rest.indexOf("-->");if(end<0){pushToken(out,i,"comment",rest);return{tokens:out,mode:"comment"}}pushToken(out,i,"comment",rest.slice(0,end+3));i+=end+3;continue}if(rest[0]==="<"){const m=rest.match(/^<\/?[\w:-]+/);if(m){pushToken(out,i,"tag",m[0]);i+=m[0].length;continue}}const attr=rest.match(/^[\w:-]+=/);if(attr){pushToken(out,i,"attr",attr[0].slice(0,-1));pushToken(out,i+attr[0].length-1,"mtk","=");i+=attr[0].length;continue}if(rest[0]==='"'||rest[0]==="'"){const q=rest[0];let j=1;while(j<rest.length&&rest[j]!==q)j+=1;j=Math.min(rest.length,j+1);pushToken(out,i,"string",rest.slice(0,j));i+=j;continue}pushToken(out,i,"mtk",rest[0]);i+=1}return{tokens:out,mode}}function tokenizeCss(line,state){const out=[];let i=0;let mode=state.mode;while(i<line.length){const rest=line.slice(i);if(mode==="block"){const end=rest.indexOf("*/");if(end<0){pushToken(out,i,"comment",rest);return{tokens:out,mode:"block"}}pushToken(out,i,"comment",rest.slice(0,end+2));i+=end+2;mode="root";continue}if(rest.startsWith("/*")){const end=rest.indexOf("*/");if(end<0){pushToken(out,i,"comment",rest);return{tokens:out,mode:"block"}}pushToken(out,i,"comment",rest.slice(0,end+2));i+=end+2;continue}if(rest[0]==='"'||rest[0]==="'"){const q=rest[0];let j=1;while(j<rest.length&&rest[j]!==q)j+=1;j=Math.min(rest.length,j+1);pushToken(out,i,"string",rest.slice(0,j));i+=j;continue}const num=rest.match(/^-?[\d.]+(px|em|rem|%|vh|vw|s|ms)?/);if(num){pushToken(out,i,"number",num[0]);i+=num[0].length;continue}const word=rest.match(/^[A-Za-z_-][\w-]*/);if(word){const type=rest.slice(word[0].length).match(/^\s*:/)?"attr":"keyword";pushToken(out,i,type,word[0]);i+=word[0].length;continue}pushToken(out,i,"mtk",rest[0]);i+=1}return{tokens:out,mode}}function tokenizeMarkdown(line){const out=[];if(/^#{1,6}\s/.test(line)){pushToken(out,0,"keyword",line);return{tokens:out,mode:"root"}}if(/^```/.test(line)){pushToken(out,0,"string",line);return{tokens:out,mode:"root"}}let i=0;while(i<line.length){const rest=line.slice(i);const code=rest.match(/^`[^`]+`/);if(code){pushToken(out,i,"string",code[0]);i+=code[0].length;continue}pushToken(out,i,"mtk",rest[0]);i+=1}return{tokens:out,mode:"root"}}function tokenizePython(line,keywords,state){if(state.mode==="block"){const end=line.indexOf('"""');if(end<0)return{tokens:[{offset:0,type:"comment",text:line}],mode:"block"};return tokenizeCLike(line,keywords,{mode:"root"})}if(line.trimStart().startsWith("#")){return{tokens:[{offset:0,type:"comment",text:line}],mode:"root"}}return tokenizeCLike(line,keywords,state)}function tokenizeLine(languageId,line,state){if(languageId==="json")return tokenizeJson(line);if(languageId==="html")return tokenizeHtml(line,state);if(languageId==="css")return tokenizeCss(line,state);if(languageId==="markdown")return tokenizeMarkdown(line);if(languageId==="python")return tokenizePython(line,keywordSet("python"),state);if(languageId==="javascript"||languageId==="typescript"){return tokenizeCLike(line,keywordSet(languageId),state)}return{tokens:[{offset:0,type:"mtk",text:line}],mode:"root"}}function tokensToHtml(tokens){let html="";for(const tok of tokens){html+=`<span class="${tokenClass(tok.type)}">${escapeHtml(tok.text)}</span>`}return html||"<span>&nbsp;</span>"}function expandTabs(line,tabSize){const size=tabSize>0?tabSize:4;let out="";let col=0;for(const ch of line){if(ch==="\t"){const n=size-(col%size);out+=" ".repeat(n);col+=n}else{out+=ch;col+=1}}return out}function measureCharWidth(el,fontSize){const canvas=document.createElement("canvas");const ctx=canvas.getContext("2d");if(!ctx)return 8;const win=el?.ownerDocument?.defaultView;const cs=win&&typeof win.getComputedStyle==="function"?win.getComputedStyle(el):null;ctx.font=cs&&cs.font?cs.font:`${fontSize||14}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`;const w=ctx.measureText("m").width;return w>1?w:8}function findMatches(lines,query){if(!query)return[];const hits=[];for(let i=0;i<lines.length;i++){let from=0;while(from<=lines[i].length){const at=lines[i].indexOf(query,from);if(at<0)break;hits.push({line:i+1,start:at+1,end:at+query.length+1});from=at+Math.max(1,query.length)}}return hits}function matchBracket(lines,line,col){const pairs={"(":")","[":"]","{":"}"};const close={")":"(","]":"[","}":"{"};const text=lines.join("\n");let offset=0;for(let i=0;i<line-1;i++)offset+=lines[i].length+1;offset+=col-1;if(offset<0||offset>=text.length)return null;const ch=text[offset];if(pairs[ch]){let depth=1;for(let i=offset+1;i<text.length;i++){if(text[i]===ch)depth++;else if(text[i]===pairs[ch]){depth--;if(depth===0)return i}}}if(close[ch]){let depth=1;for(let i=offset-1;i>=0;i--){if(text[i]===ch)depth++;else if(text[i]===close[ch]){depth--;if(depth===0)return i}}}return null}function offsetToPos(lines,offset){let left=offset;for(let i=0;i<lines.length;i++){if(left<=lines[i].length)return{line:i+1,column:left+1};left-=lines[i].length+1}return{line:lines.length,column:(lines[lines.length-1]??"").length+1}}function foldHidden(folds,line){for(const f of folds){if(f.collapsed&&line>f.start&&line<=f.end)return true}return false}function hiddenBefore(folds,line){let n=0;for(const f of folds){if(f.collapsed&&f.end<line)n+=f.end-f.start}return n}function indentCols(line){const m=String(line??"").match(/^[\t ]*/);return(m?m[0]:"").replace(/\t/g,"  ").length}function foldStarts(folds,line){return folds.find((f)=>f.start===line)??null}function bindMarginOnce(margin){if(!margin||margin.getAttribute("data-fold-bound")==="1")return;margin.setAttribute("data-fold-bound","1");margin.addEventListener("mousedown",(ev)=>{const hit=ev.target?.closest?.("[data-fold]");if(!hit)return;ev.preventDefault();ev.stopPropagation();const line=Number(hit.getAttribute("data-fold"));globalThis.__lilChrome?.toggleFoldAt?.(line)})}function bindMinimapOnce(minimap){if(!minimap||minimap.getAttribute("data-nav-bound")==="1")return;minimap.setAttribute("data-nav-bound","1");minimap.addEventListener("mousedown",(ev)=>{const ed=globalThis.monaco?.editor?.getEditors?.()?.[0];const model=ed?.getModel?.();if(!ed||!model)return;const rect=minimap.getBoundingClientRect();const y=ev.clientY-rect.top;const line=Math.max(1,Math.min(model.getLineCount(),Math.floor((y/Math.max(1,rect.height))*model.getLineCount())+1));ed.setPosition({lineNumber:line,column:1});ed.revealLine?.(line);ed.focus?.()})}let cssInjected=false;function injectCss(){if(cssInjected||typeof document==="undefined")return;cssInjected=true;const style=document.createElement("style");style.textContent=`
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
`;document.head.appendChild(style)}const paintState=new WeakMap();function hostPaintEditor(linesHost,margin,selectionHost,cursorEl,minimap,textarea,value,languageId,lineHeight,width,height,scrollTop,showLineNumbers,showMinimap,theme,selStartLine,selStartCol,posLine,posCol,findQuery,wordWrap,tabSize,){if(!linesHost)return 8;injectCss();const rawLines=String(value??"").split("\n");const lines=rawLines.map((line)=>expandTabs(line,tabSize|0||4));const lh=Math.max(1,lineHeight|0||19);const charWidth=measureCharWidth(linesHost,14);const dark=theme==="vs-dark"||theme==="hc-black";const models=globalThis.monaco?.editor?.getModels?.()??[];const current=models.find((m)=>m.getValue?.()===String(value??""));const folds=current?._paintFolds??[];const visibleCount=lines.length-folds.reduce((n,f)=>n+(f.collapsed?f.end-f.start:0),0);const totalH=Math.max(lh,visibleCount*lh);const paintHeight=(height|0)>0?(height|0):Math.min(2400,Math.max(lh*24,visibleCount*lh));let state={mode:"root"};const vis=Math.max(12,Math.ceil(paintHeight/lh)+8);const visualStart=Math.max(0,Math.floor((scrollTop|0)/lh)-2);linesHost.style.position="relative";linesHost.style.height=totalH+"px";linesHost.style.whiteSpace=wordWrap?"pre-wrap":"pre";if(margin){margin.style.position="relative";margin.style.height=totalH+"px";margin.style.background=dark?"#1e1e1e":"#f3f3f3";bindMarginOnce(margin)}function yOf(line){return(line-1-hiddenBefore(folds,line))*lh}const visualLines=[];for(let i=0;i<lines.length;i++){const line=i+1;if(foldHidden(folds,line))continue;visualLines.push(line)}const from=Math.min(visualLines.length,visualStart);const to=Math.min(visualLines.length,from+vis);for(let i=0;i<(visualLines[from]??1)-1;i++){state=tokenizeLine(languageId||"plaintext",lines[i],state)}let linesHtml="";let marginHtml="";for(let v=from;v<to;v++){const line=visualLines[v];const i=line-1;const tok=tokenizeLine(languageId||"plaintext",lines[i],state);state={mode:tok.mode};const top=yOf(line);const currentLine=line===(posLine|0);const fold=foldStarts(folds,line);const foldedHint=fold?.collapsed?`<span class="folded-hint"> ⋯</span>`:"";linesHtml+=`<div class="view-line${currentLine?" current":""}" data-line="${line}" style="top:${top}px;height:${lh}px">${tokensToHtml(tok.tokens)}${foldedHint}</div>`;if(showLineNumbers){const glyph=fold?`<span class="folding" data-fold="${line}">${fold.collapsed?"▶":"▼"}</span>`:`<span class="folding"></span>`;marginHtml+=`<div class="line-number" data-line="${line}" style="top:${top}px;height:${lh}px;line-height:${lh}px">${glyph}${line}</div>`}}linesHost.innerHTML=linesHtml;if(margin)margin.innerHTML=marginHtml;const selHtml=[];function paintSel(sl,sc,eline,ec){if(sl>eline||(sl===eline&&sc>ec)){const tl=sl;const tc=sc;sl=eline;sc=ec;eline=tl;ec=tc}if(sl===eline&&sc===ec)return;for(let line=sl;line<=eline;line++){if(foldHidden(folds,line))continue;const startCol=line===sl?sc:1;const endCol=line===eline?ec:(lines[line-1]??"").length+1;const left=(Math.max(1,startCol)-1)*charWidth;const widthPx=Math.max(charWidth*0.4,(endCol-startCol)*charWidth);selHtml.push(`<div class="selected-text" style="top:${yOf(line)}px;left:${left}px;width:${widthPx}px;height:${lh}px"></div>`)}}paintSel(selStartLine|0,selStartCol|0,posLine|0,posCol|0);const extraSels=globalThis.monaco?.editor?.getEditors?.()?.[0]?.getSelections?.()??[];for(let i=1;i<extraSels.length;i++){const s=extraSels[i];paintSel(s.startLineNumber,s.startColumn,s.endLineNumber,s.endColumn)}if(!foldHidden(folds,posLine|0)){selHtml.push(`<div class="current-line" style="top:${yOf(posLine|0)}px;height:${lh}px"></div>`)}const tab=tabSize|0||2;for(let v=from;v<to;v++){const line=visualLines[v];const width=indentCols(lines[line-1]??"");for(let col=tab;col<=width;col+=tab){selHtml.push(`<div class="indent-guide core-guide" style="top:${yOf(line)}px;left:${col*charWidth}px;height:${lh}px"></div>`)}}const q=String(findQuery??"");if(q.length>0){for(const hit of findMatches(lines,q)){if(foldHidden(folds,hit.line))continue;const left=(hit.start-1)*charWidth;const widthPx=Math.max(charWidth,(hit.end-hit.start)*charWidth);selHtml.push(`<div class="find-match" style="top:${yOf(hit.line)}px;left:${left}px;width:${widthPx}px;height:${lh}px"></div>`)}}const br=matchBracket(rawLines,posLine|0,posCol|0);if(br!=null){const other=offsetToPos(rawLines,br);for(const p of[{line:posLine|0,column:posCol|0},other,]){if(foldHidden(folds,p.line))continue;selHtml.push(`<div class="bracket-match" style="top:${yOf(p.line)}px;left:${(p.column-1)*charWidth}px;width:${charWidth}px;height:${lh}px"></div>`)}}const marks=current?._paintMarkers??[];for(const m of marks){const line=m.line|1;if(foldHidden(folds,line))continue;const sc=m.sc|1;const ec=Math.max(sc+1,m.ec|(sc+1));const color=(m.severity|0)>=8?"#f14c4c":"#cca700";selHtml.push(`<div style="position:absolute;top:${yOf(line)+lh-3}px;left:${(sc-1)*charWidth}px;width:${Math.max(charWidth,(ec-sc)*charWidth)}px;height:3px;background:${color};pointer-events:none"></div>`,)}const highs=current?._paintHighlights??[];for(const h of highs){if(foldHidden(folds,h.line|1))continue;const left=((h.sc|1)-1)*charWidth;const widthPx=Math.max(charWidth,((h.ec|1)-(h.sc|1))*charWidth);selHtml.push(`<div class="word-highlight" style="top:${yOf(h.line|1)}px;left:${left}px;width:${widthPx}px;height:${lh}px;background:rgba(87,131,196,.28)"></div>`,)}if(selectionHost){selectionHost.style.position="absolute";selectionHost.style.inset="0";selectionHost.style.pointerEvents="none";selectionHost.innerHTML=selHtml.join("")}const caretTop=yOf(posLine|0);const caretLeft=((posCol|0)-1)*charWidth;if(cursorEl){cursorEl.style.top=caretTop+"px";cursorEl.style.left=caretLeft+"px";cursorEl.style.height=lh+"px";cursorEl.style.width="2px";cursorEl.style.background=dark?"#aeafad":"#000";cursorEl.style.display=foldHidden(folds,posLine|0)?"none":"block"}if(textarea){textarea.style.position="absolute";textarea.style.top=caretTop+"px";textarea.style.left=caretLeft+56+"px";textarea.style.width="1px";textarea.style.height=lh+"px";textarea.style.opacity="0";textarea.style.zIndex="8";textarea.style.pointerEvents="none";if(document.activeElement!==textarea){textarea.value=""}}if(minimap&&showMinimap){const w=64;const h=Math.max(1,height|0);minimap.width=w;minimap.height=h;minimap.style.display="block";bindMinimapOnce(minimap);const ctx=minimap.getContext("2d");if(ctx){ctx.fillStyle=dark?"#1e1e1e":"#f3f3f3";ctx.fillRect(0,0,w,h);ctx.fillStyle=dark?"#5a5a5a":"#6e6e6e";const row=Math.max(1,h/Math.max(1,lines.length));for(let i=0;i<lines.length;i++){const len=Math.min(60,lines[i].length);if(len>0)ctx.fillRect(2,i*row,len,Math.max(1,row))}ctx.fillStyle="#f14c4c";for(const m of marks){ctx.fillRect(w-4,((m.line|1)-1)*row,3,Math.max(2,row))}ctx.fillStyle="rgba(255,255,255,0.08)";const viewY=((scrollTop|0)/Math.max(1,totalH))*h;ctx.fillRect(0,viewY,w,Math.max(8,(height/Math.max(1,totalH))*h))}}else if(minimap&&!showMinimap){minimap.style.display="none"}paintState.set(linesHost,{charWidth,lineHeight:lh,lines,visualLines,folds,scrollable:linesHost.parentElement});return charWidth|0}function hostCoordsToPosition(scrollable,linesHost,clientX,clientY,lineHeight,charWidth,scrollTop){const state=linesHost?paintState.get(linesHost):null;const lh=state?.lineHeight||lineHeight||19;const cw=state?.charWidth||charWidth||8;const el=scrollable||linesHost;const rect=el.getBoundingClientRect();const y=clientY-rect.top+(el.scrollTop|scrollTop|0);const x=clientX-rect.left;let line=Math.floor(y/lh);const visual=state?.visualLines;if(visual&&visual.length){if(line<0)line=0;if(line>=visual.length)line=visual.length-1;line=visual[line]}else{line=line+1;const max=state?.lines?.length||1;if(line<1)line=1;if(line>max)line=max}let col=Math.floor(x/cw)+1;const lineLen=(state?.lines?.[line-1]??"").length+1;if(col<1)col=1;if(col>lineLen)col=lineLen;return[line,col]}function eventIsComposing(event){return!!(event&&event.isComposing)}function eventDeltaY(event){return event&&event.deltaY?event.deltaY|0:0}function hostStyleFindWidget(findWidget,findInput,replaceInput){if(!findWidget||findWidget.getAttribute("data-ready")==="1")return;findWidget.setAttribute("data-ready","1");const next=document.createElement("button");next.textContent="Next";next.setAttribute("data-find","next");const prev=document.createElement("button");prev.textContent="Prev";prev.setAttribute("data-find","prev");const repl=document.createElement("button");repl.textContent="Replace";repl.setAttribute("data-find","replace");const all=document.createElement("button");all.textContent="All";all.setAttribute("data-find","all");findWidget.appendChild(next);findWidget.appendChild(prev);findWidget.appendChild(repl);findWidget.appendChild(all)};return {get "hostPaintEditor"(){return hostPaintEditor},get "hostCoordsToPosition"(){return hostCoordsToPosition},get "eventIsComposing"(){return eventIsComposing},get "eventDeltaY"(){return eventDeltaY},get "hostStyleFindWidget"(){return hostStyleFindWidget}}})();let $lh1=(function(h0){function stringSlice(s,start,end){if(end===undefined)return s.slice(start);return s.slice(start,end)}function stringReplace(s,pattern,replacement){return s.replace(pattern,replacement)}function stringSplit(s,sep){return s.split(sep)}function stringFromCharCode1(a){return String.fromCharCode(a)}function newRegexp(pattern,flags=""){return new RegExp(pattern,flags)}function regexTest(re,s){return re.test(s)}function regexExec(re,s){return re.exec(s)}function regexLastIndex(re){return re.lastIndex}function regexSetLastIndex(re,value){re.lastIndex=value}function dateNow(){return Date.now()}function mathRandom(){return Math.random()}function scheduleTimeoutMs(fn,ms){return setTimeout(fn,ms)}function clearTimeoutId(id){clearTimeout(id)}function requestAnimationFrameOrNull(fn){const raf=(globalThis).requestAnimationFrame;if(typeof raf==="function")return raf.call(globalThis,fn);return setTimeout(()=>fn(Date.now()),16)}function createElement(tag){return document.createElement(tag)}function domCreateElement(tag){return document.createElement(tag)}function createTextNode(text){return document.createTextNode(text)}function appendChild(parent,child){return parent.appendChild(child)}function removeChild(parent,child){return parent.removeChild(child)}function setTextContent(el,text){el.textContent=text}function getTextContent(el){return el.textContent??""}function setInnerHTML(el,html){el.innerHTML=html}function getInnerHTML(el){return el.innerHTML}function setClassName(el,name){el.className=name}function setStyle(el,prop,value){el.style.setProperty(prop,value)}function setAttribute(el,name,value){el.setAttribute(name,value)}function addEventListener(target,eventName,handler,capture=false){target.addEventListener(eventName,handler,capture)}function removeEventListener(target,eventName,handler,capture=false){target.removeEventListener(eventName,handler,capture)}function focusElement(el){el.focus()}function getClientWidth(el){return el.clientWidth|0}function getClientHeight(el){return el.clientHeight|0}function getScrollTop(el){return el.scrollTop|0}function setScrollTop(el,value){el.scrollTop=value}function getScrollHeight(el){return el.scrollHeight|0}function preventDefault(event){event.preventDefault()}function stopPropagation(event){event.stopPropagation()}function eventKey(event){return event.key}function eventCode(event){return event.code}function eventKeyCode(event){return event.keyCode|0}function eventCtrlKey(event){return event.ctrlKey||event.metaKey}function eventShiftKey(event){return event.shiftKey}function eventAltKey(event){return event.altKey}function eventInputValue(event){const t=event.target;return t&&typeof t.value==="string"?t.value:""}function inputSetValue(el,value){el.value=value}function inputGetValue(el){return el.value}function canvasGetContext2d(canvas){try{return canvas.getContext("2d")}catch{return null}}function canvasSetSize(canvas,width,height){canvas.width=width;canvas.height=height}function canvasFillRect(ctx,x,y,w,h,color){if(!ctx){return}ctx.fillStyle=color;ctx.fillRect(x,y,w,h)}function clearChildren(el){while(el.firstChild){el.removeChild(el.firstChild)}}function setTabIndex(el,value){el.tabIndex=value}function getClipboardText(){if(navigator.clipboard&&navigator.clipboard.readText){return navigator.clipboard.readText()}return Promise.resolve("")}function setClipboardText(text){memoryClipboard=text;if(navigator.clipboard&&navigator.clipboard.writeText){return navigator.clipboard.writeText(text)}return Promise.resolve()}let memoryClipboard="";function clipboardRead(){return memoryClipboard}function clipboardWrite(text){memoryClipboard=text;try{void navigator.clipboard?.writeText(text)}catch{}}function clipboardReadEvent(event){const data=event.clipboardData?.getData("text/plain");if(typeof data==="string"&&data.length>0){memoryClipboard=data;return data}return memoryClipboard}function clipboardWriteEvent(event,text){memoryClipboard=text;event.clipboardData?.setData("text/plain",text)}function eventClientX(event){return event.clientX|0}function eventClientY(event){return event.clientY|0}function eventButton(event){return event.button|0}function eventDetail(event){return event.detail|0}function rectLeft(el){return el.getBoundingClientRect().left|0}function rectTop(el){return el.getBoundingClientRect().top|0}function getScrollLeft(el){return el.scrollLeft|0}function setScrollLeft(el,value){el.scrollLeft=value}function blurElement(el){el.blur()}function setPlaceholder(el,value){el.placeholder=value}function setDisplay(el,value){el.style.display=value}function classListAdd(el,name){el.classList.add(name)}function classListRemove(el,name){el.classList.remove(name)}function hostCall(obj,name,a,b,c){if(obj==null){return undefined}const fn=obj[name];if(typeof fn!=="function"){return undefined}try{return fn.call(obj,a,b,c)}catch(err){console.warn("hostCall",name,err);return undefined}}function hostThen(value,cb){if(value&&typeof value.then==="function"){value.then(cb,()=>cb(undefined));return}cb(value)}function jsArrayLen(value){if(Array.isArray(value)){return value.length}if(value&&Array.isArray(value.suggestions)){return value.suggestions.length}if(value&&Array.isArray(value.items)){return value.items.length}if(value&&Array.isArray(value.lenses)){return value.lenses.length}if(value&&Array.isArray(value.symbols)){return value.symbols.length}if(value&&Array.isArray(value.contents)){return value.contents.length}return 0}function jsArrayAt(value,index){if(Array.isArray(value)){return value[index]}const arr=value?.suggestions??value?.items??value?.lenses??value?.symbols??value?.contents;return Array.isArray(arr)?arr[index]:undefined}function jsPropString(value,key,fallback=""){if(value==null){return fallback}const v=value[key];if(v==null){return fallback}if(typeof v==="string"){return v}if(typeof v==="object"&&typeof v.value==="string"){return v.value}if(typeof v==="object"&&typeof v.label==="string"){return v.label}return String(v)}function jsPropInt(value,key,fallback=0){if(value==null){return fallback}const v=value[key];return typeof v==="number"?(v|0):fallback}function emptyBuf(){return Array(1).join("")}function beginIdList(holder){holder._ids=[]}function pushId(holder,id){holder._ids.push(id|0)}function takeIdList(holder){const out=holder._ids??[];holder._ids=[];return out}function concat2(a,b){return a+b}function pushNewBuffer(tree,text,lineStarts){const buf={buffer:text,lineStarts};tree.tmpBuffer=buf;tree.buffers.push(buf)}function makeNodePos(node,remainder,start){const rem=remainder|0;const off=start|0;const pos=[node,rem,off];pos.node=node;pos.remainder=rem;pos.nodeStartOffset=off;return pos}function hostNodeNext(node,sentinel){if(node.right!==sentinel){let cur=node.right;while(cur.left!==sentinel){cur=cur.left}return cur}let cur=node;let guard=0;while(cur.parent!==sentinel&&guard<100000){guard++;if(cur.parent.left===cur){break}cur=cur.parent}if(cur.parent===sentinel||guard>=100000){return sentinel}return cur.parent}function hostAccumulatedValue(tree,node,index){if(index<0){return 0}const piece=node.piece;const lineStarts=tree.buffers[piece.bufferIndex].lineStarts;const expected=(piece.start.line+index+1)|0;if(expected>piece.end.line){return((lineStarts[piece.end.line]|0)+piece.end.column-(lineStarts[piece.start.line]|0)-piece.start.column)|0}return((lineStarts[expected]|0)-(lineStarts[piece.start.line]|0)-piece.start.column)|0}function hostOffsetOfNode(tree,node){let pos=node.size_left|0;let cur=node;while(cur!==tree.root){if(cur.parent.right===cur){pos=(pos+(cur.parent.size_left|0)+cur.parent.piece.length)|0}cur=cur.parent}return pos}function hostNodeAt(tree,offset,sentinel){offset=offset|0;if(tree.cacheValid){const cached=tree.cacheNode;const cStart=tree.cacheNodeStartOffset|0;const cLen=cached.piece.length|0;if(cStart<=offset&&cStart+cLen>=offset){return makeNodePos(cached,offset-cStart,cStart)}}let rest=offset;let x=tree.root;let nodeStartOffset=0;let guard=0;while(x!==sentinel&&guard<100000){const sizeLeft=x.size_left|0;const pieceLen=x.piece.length|0;if(sizeLeft>rest){x=x.left}else if(sizeLeft+pieceLen>=rest){nodeStartOffset=(nodeStartOffset+sizeLeft)|0;tree.cacheNode=x;tree.cacheNodeStartOffset=nodeStartOffset;tree.cacheNodeStartLineNumber=0;tree.cacheHasLine=false;tree.cacheValid=true;return makeNodePos(x,rest-sizeLeft,nodeStartOffset)}else{rest=(rest-sizeLeft-pieceLen)|0;nodeStartOffset=(nodeStartOffset+sizeLeft+pieceLen)|0;x=x.right}guard++}return makeNodePos(sentinel,0,nodeStartOffset)}function hostNodeAt2(tree,lineNumber,column,sentinel){let line=lineNumber|0;let col=column|0;let x=tree.root;let nodeStartOffset=0;let guard=0;while(x!==sentinel&&guard<100000){const lfLeft=x.lf_left|0;const pieceLf=x.piece.lineFeedCnt|0;const xLeft=x.left;if(xLeft!==sentinel&&lfLeft>=line-1){x=xLeft}else if(lfLeft+pieceLf>line-1){const prevAccumulatedValue=hostAccumulatedValue(tree,x,line-lfLeft-2);const accumulatedValue=hostAccumulatedValue(tree,x,line-lfLeft-1);nodeStartOffset=(nodeStartOffset+x.size_left)|0;let rem=(prevAccumulatedValue+col-1)|0;if(rem>accumulatedValue){rem=accumulatedValue}return makeNodePos(x,rem,nodeStartOffset)}else if(lfLeft+pieceLf===line-1){const prevAccumulatedValue=hostAccumulatedValue(tree,x,line-lfLeft-2);const pieceLen=x.piece.length|0;if((prevAccumulatedValue+col-1)<=pieceLen){return makeNodePos(x,(prevAccumulatedValue+col-1)|0,nodeStartOffset)}col=(col-(pieceLen-prevAccumulatedValue))|0;break}else{line=(line-lfLeft-pieceLf)|0;nodeStartOffset=(nodeStartOffset+x.size_left+x.piece.length)|0;x=x.right}guard++}x=hostNodeNext(x,sentinel);let walk=0;while(x!==sentinel&&walk<100000){const pieceLf=x.piece.lineFeedCnt|0;const pieceLen=x.piece.length|0;if(pieceLf>0){const accumulatedValue=hostAccumulatedValue(tree,x,0);const start=hostOffsetOfNode(tree,x);let rem=(col-1)|0;if(rem>accumulatedValue){rem=accumulatedValue}return makeNodePos(x,rem,start)}else if(pieceLen>=col-1){return makeNodePos(x,(col-1)|0,hostOffsetOfNode(tree,x))}else{col=(col-pieceLen)|0}x=hostNodeNext(x,sentinel);walk++}return makeNodePos(sentinel,0,nodeStartOffset)}function nodeAtStash(tree,offset,sentinel,slot){if(!tree._stash){tree._stash=[null,null]}tree._stash[slot|0]=hostNodeAt(tree,offset,sentinel)}function nodeAt2Stash(tree,lineNumber,column,sentinel,slot){if(!tree._stash){tree._stash=[null,null]}tree._stash[slot|0]=hostNodeAt2(tree,lineNumber,column,sentinel)}function stashNode(tree,slot){return tree._stash[slot|0].node}function stashRem(tree,slot){return tree._stash[slot|0].remainder|0}function stashStart(tree,slot){return tree._stash[slot|0].nodeStartOffset|0}function hostCursorLine(cursor){return(cursor.line??cursor[0]??0)|0}function hostCursorCol(cursor){return(cursor.column??cursor[1]??0)|0}function hostOffsetInBuffer(tree,bufferIndex,cursor){const lineStarts=tree.buffers[bufferIndex].lineStarts;return(lineStarts[hostCursorLine(cursor)]+hostCursorCol(cursor))|0}function hostGetLineFeedCnt(tree,bufferIndex,start,end){const endLine=hostCursorLine(end);const endCol=hostCursorCol(end);const startLine=hostCursorLine(start);if(endCol===0){return(endLine-startLine)|0}const lineStarts=tree.buffers[bufferIndex].lineStarts;if(endLine===lineStarts.length-1){return(endLine-startLine)|0}const nextLineStartOffset=lineStarts[endLine+1]|0;const endOffset=(lineStarts[endLine]+endCol)|0;if(nextLineStartOffset>endOffset+1){return(endLine-startLine)|0}const previousCharOffset=(endOffset-1)|0;if(tree.buffers[bufferIndex].buffer.charCodeAt(previousCharOffset)===13){return(endLine-startLine+1)|0}return(endLine-startLine)|0}function hostPositionInBuffer(tree,node,remainder){const piece=node.piece;const lineStarts=tree.buffers[piece.bufferIndex].lineStarts;const startOffset=(lineStarts[piece.start.line]+piece.start.column+(remainder|0))|0;let low=piece.start.line|0;let high=piece.end.line|0;let mid=low;let midStart=0;let midStop=0;while(low<=high){mid=(low+(((high-low)/2)|0))|0;midStart=lineStarts[mid]|0;if(mid===lineStarts.length-1){midStop=tree.buffers[piece.bufferIndex].buffer.length|0}else{midStop=lineStarts[mid+1]|0}if(startOffset<midStart){high=(mid-1)|0}else if(startOffset>=midStop){low=(mid+1)|0}else{break}}return{line:mid,column:(startOffset-midStart)|0}}function hostGetIndexOf(tree,node,accumulatedValue){const piece=node.piece;const pos=hostPositionInBuffer(tree,node,accumulatedValue);const lineCnt=(pos.line-piece.start.line)|0;const span=(hostOffsetInBuffer(tree,piece.bufferIndex,piece.end)-hostOffsetInBuffer(tree,piece.bufferIndex,piece.start))|0;if(span===(accumulatedValue|0)){const realLineCnt=hostGetLineFeedCnt(tree,node.piece.bufferIndex,piece.start,pos);if(realLineCnt!==lineCnt){return{index:realLineCnt,remainder:0}}}return{index:lineCnt,remainder:pos.column|0}}function hostGetOffsetAt(tree,lineNumber,column,sentinel){let leftLen=0;let x=tree.root;let line=lineNumber|0;let guard=0;while(x!==sentinel&&guard<100000){guard++;if(x.left!==sentinel&&(x.lf_left+1)>=line){x=x.left}else if((x.lf_left+x.piece.lineFeedCnt+1)>=line){leftLen=(leftLen+x.size_left)|0;const acc=hostAccumulatedValue(tree,x,(line-x.lf_left-2)|0);return(leftLen+acc+(column|0)-1)|0}else{line=(line-x.lf_left-x.piece.lineFeedCnt)|0;leftLen=(leftLen+x.size_left+x.piece.length)|0;x=x.right}}return leftLen}function makePos(line,column){const lineN=line|0;const colN=column|0;const pos=[lineN,colN];pos.lineNumber=lineN;pos.column=colN;return pos}function hostGetPositionAt(tree,offset,sentinel){let rest=offset|0;if(rest<0){rest=0}let x=tree.root;let lfCnt=0;const originalOffset=rest;let guard=0;while(x!==sentinel&&guard<100000){guard++;if(x.size_left!==0&&x.size_left>=rest){x=x.left}else if((x.size_left+x.piece.length)>=rest){const out=hostGetIndexOf(tree,x,(rest-x.size_left)|0);lfCnt=(lfCnt+x.lf_left+out.index)|0;if(out.index===0){const lineStartOffset=hostGetOffsetAt(tree,lfCnt+1,1,sentinel);const column=(originalOffset-lineStartOffset)|0;return makePos(lfCnt+1,column+1)}return makePos(lfCnt+1,out.remainder+1)}else{rest=(rest-x.size_left-x.piece.length)|0;lfCnt=(lfCnt+x.lf_left+x.piece.lineFeedCnt)|0;if(x.right===sentinel){const lineStartOffset=hostGetOffsetAt(tree,lfCnt+1,1,sentinel);const column=(originalOffset-rest-lineStartOffset)|0;return makePos(lfCnt+1,column+1)}x=x.right}}return makePos(1,1)}function hostCalcSize(node,sentinel){if(node===sentinel){return 0}return(node.size_left+node.piece.length+hostCalcSize(node.right,sentinel))|0}function hostCalcLf(node,sentinel){if(node===sentinel){return 0}return(node.lf_left+node.piece.lineFeedCnt+hostCalcLf(node.right,sentinel))|0}function hostLeftest(node,sentinel){while(node.left!==sentinel){node=node.left}return node}function hostLeftRotate(tree,x,sentinel){const y=x.right;y.size_left=(y.size_left+x.size_left+x.piece.length)|0;y.lf_left=(y.lf_left+x.lf_left+x.piece.lineFeedCnt)|0;x.right=y.left;if(y.left!==sentinel){y.left.parent=x}y.parent=x.parent;if(x.parent===sentinel){tree.root=y}else if(x.parent.left===x){x.parent.left=y}else{x.parent.right=y}y.left=x;x.parent=y}function hostRightRotate(tree,y,sentinel){const x=y.left;y.left=x.right;if(x.right!==sentinel){x.right.parent=y}x.parent=y.parent;y.size_left=(y.size_left-(x.size_left+x.piece.length))|0;y.lf_left=(y.lf_left-(x.lf_left+x.piece.lineFeedCnt))|0;if(y.parent===sentinel){tree.root=x}else if(y===y.parent.right){y.parent.right=x}else{y.parent.left=x}x.right=y;y.parent=x}function hostUpdateMeta(tree,x,delta,lfDelta,sentinel){while(x!==tree.root&&x!==sentinel){if(x.parent.left===x){x.parent.size_left=(x.parent.size_left+delta)|0;x.parent.lf_left=(x.parent.lf_left+lfDelta)|0}x=x.parent}}function hostRecomputeMeta(tree,x,sentinel){if(x===tree.root){return}while(x!==tree.root&&x===x.parent.right){x=x.parent}if(x===tree.root){return}x=x.parent;const delta=(hostCalcSize(x.left,sentinel)-x.size_left)|0;const lfDelta=(hostCalcLf(x.left,sentinel)-x.lf_left)|0;x.size_left=(x.size_left+delta)|0;x.lf_left=(x.lf_left+lfDelta)|0;while(x!==tree.root&&(delta!==0||lfDelta!==0)){if(x.parent.left===x){x.parent.size_left=(x.parent.size_left+delta)|0;x.parent.lf_left=(x.parent.lf_left+lfDelta)|0}x=x.parent}}function hostDetach(node){node.alive=false;node.parent=node;node.left=node;node.right=node}function rbDeleteTree(tree,z,sentinel){let y;let x;if(z.left===sentinel){y=z;x=y.right}else if(z.right===sentinel){y=z;x=y.left}else{y=hostLeftest(z.right,sentinel);x=y.right}if(y===tree.root){tree.root=x;x.color=0;hostDetach(z);sentinel.parent=sentinel;tree.root.parent=sentinel;return}const yWasRed=y.color===1;if(y===y.parent.left){y.parent.left=x}else{y.parent.right=x}if(y===z){x.parent=y.parent;hostRecomputeMeta(tree,x,sentinel)}else{if(y.parent===z){x.parent=y}else{x.parent=y.parent}hostRecomputeMeta(tree,x,sentinel);y.left=z.left;y.right=z.right;y.parent=z.parent;y.color=z.color;if(z===tree.root){tree.root=y}else if(z===z.parent.left){z.parent.left=y}else{z.parent.right=y}if(y.left!==sentinel){y.left.parent=y}if(y.right!==sentinel){y.right.parent=y}y.size_left=z.size_left;y.lf_left=z.lf_left;hostRecomputeMeta(tree,y,sentinel)}hostDetach(z);if(x.parent.left===x){const newSizeLeft=hostCalcSize(x,sentinel);const newLFLeft=hostCalcLf(x,sentinel);if(newSizeLeft!==x.parent.size_left||newLFLeft!==x.parent.lf_left){const delta=(newSizeLeft-x.parent.size_left)|0;const lfDelta=(newLFLeft-x.parent.lf_left)|0;x.parent.size_left=newSizeLeft;x.parent.lf_left=newLFLeft;hostUpdateMeta(tree,x.parent,delta,lfDelta,sentinel)}}hostRecomputeMeta(tree,x.parent,sentinel);if(yWasRed){sentinel.parent=sentinel;return}while(x!==tree.root&&x.color===0){if(x===x.parent.left){let w=x.parent.right;if(w.color===1){w.color=0;x.parent.color=1;hostLeftRotate(tree,x.parent,sentinel);w=x.parent.right}if(w.left.color===0&&w.right.color===0){w.color=1;x=x.parent}else{if(w.right.color===0){w.left.color=0;w.color=1;hostRightRotate(tree,w,sentinel);w=x.parent.right}w.color=x.parent.color;x.parent.color=0;w.right.color=0;hostLeftRotate(tree,x.parent,sentinel);x=tree.root}}else{let w=x.parent.left;if(w.color===1){w.color=0;x.parent.color=1;hostRightRotate(tree,x.parent,sentinel);w=x.parent.left}if(w.left.color===0&&w.right.color===0){w.color=1;x=x.parent}else{if(w.left.color===0){w.right.color=0;w.color=1;hostLeftRotate(tree,w,sentinel);w=x.parent.left}w.color=x.parent.color;x.parent.color=0;w.left.color=0;hostRightRotate(tree,x.parent,sentinel);x=tree.root}}}x.color=0;sentinel.parent=sentinel}function splitLinesHost(text){const lines=[];let cur="";for(let i=0;i<text.length;i++){const ch=text.charAt(i);if(ch==="\n"){lines.push(cur);cur=""}else if(ch!=="\r"){cur+=ch}}lines.push(cur);return lines}function makeDiffChange(os,oe,ms,me){const change=[os,oe,ms,me];change.originalStart=os;change.originalEnd=oe;change.modifiedStart=ms;change.modifiedEnd=me;return change}class HostFastInts{pos=[0,0,0,0,0,0,0,0];neg=[0,0,0,0,0,0,0,0];get(idx){if(idx<0){const i=-idx-1;return i>=this.neg.length?0:this.neg[i]}return idx>=this.pos.length?0:this.pos[idx]}set(idx,value){if(idx<0){const i=-idx-1;while(this.neg.length<=i){this.neg.push(0)}this.neg[i]=value}else{while(this.pos.length<=idx){this.pos.push(0)}this.pos[idx]=value}}}class HostFastPaths{pos=[];neg=[];get(idx){if(idx<0){const i=-idx-1;return i>=this.neg.length?null:this.neg[i]}return idx>=this.pos.length?null:this.pos[idx]}set(idx,value){if(idx<0){const i=-idx-1;while(this.neg.length<=i){this.neg.push(null)}this.neg[i]=value}else{while(this.pos.length<=idx){this.pos.push(null)}this.pos[idx]=value}}}function hostSnake(seqX,seqY,x,y){let xi=x|0;let yi=y|0;while(xi<seqX.length&&yi<seqY.length&&seqX[xi]===seqY[yi]){xi++;yi++}return xi}function hostComputeLineDiff(original,modified){const seqX=splitLinesHost(original);const seqY=splitLinesHost(modified);const result=[];if(seqX.length===0&&seqY.length===0){return result}if(seqX.length===0){result.push(makeDiffChange(0,0,0,seqY.length));return result}if(seqY.length===0){result.push(makeDiffChange(0,seqX.length,0,0));return result}const V=new HostFastInts();const paths=new HostFastPaths();const first=hostSnake(seqX,seqY,0,0);V.set(0,first);paths.set(0,first===0?null:{prev:null,x:0,y:0,length:first});let foundK=0;let done=false;let d=0;const limit=seqX.length+seqY.length+2;while(!done&&d<=limit){d++;const lowerBound=-Math.min(d,seqY.length+(d%2));const upperBound=Math.min(d,seqX.length+(d%2));for(let k=lowerBound;k<=upperBound;k+=2){let maxXofDLineTop=-1;if(k!==upperBound){maxXofDLineTop=V.get(k+1)}let maxXofDLineLeft=-1;if(k!==lowerBound){maxXofDLineLeft=V.get(k-1)+1}const x=Math.min(Math.max(maxXofDLineTop,maxXofDLineLeft),seqX.length);const y=x-k;if(x<=seqX.length&&y<=seqY.length){const newMaxX=hostSnake(seqX,seqY,x,y);V.set(k,newMaxX);const lastPath=x===maxXofDLineTop?paths.get(k+1):paths.get(k-1);paths.set(k,newMaxX!==x?{prev:lastPath,x,y,length:newMaxX-x}:lastPath);if(V.get(k)===seqX.length&&V.get(k)-k===seqY.length){foundK=k;done=true;break}}}}let path=paths.get(foundK);let lastAligningPosS1=seqX.length;let lastAligningPosS2=seqY.length;while(true){let endX=0;let endY=0;let nextX=0;let nextY=0;let next=null;let hasPath=false;if(path!=null){hasPath=true;endX=path.x+path.length;endY=path.y+path.length;nextX=path.x;nextY=path.y;next=path.prev}if(endX!==lastAligningPosS1||endY!==lastAligningPosS2){result.push(makeDiffChange(endX,lastAligningPosS1,endY,lastAligningPosS2))}if(!hasPath){break}lastAligningPosS1=nextX;lastAligningPosS2=nextY;path=next}const reversed=[];for(let r=result.length-1;r>=0;r--){reversed.push(result[r])}return reversed}function hostWorkbenchCommand(kind){window.dispatchEvent(new CustomEvent("lil-workbench",{detail:String(kind||"")}))}function jsUndefined(){return undefined}function windowSelf(){return globalThis}function throwError(msg){throw new Error(msg)};return {get "stringSlice"(){return stringSlice},get "stringReplace"(){return stringReplace},get "stringSplit"(){return stringSplit},get "stringFromCharCode1"(){return stringFromCharCode1},get "newRegexp"(){return newRegexp},get "regexTest"(){return regexTest},get "regexExec"(){return regexExec},get "regexLastIndex"(){return regexLastIndex},get "regexSetLastIndex"(){return regexSetLastIndex},get "dateNow"(){return dateNow},get "mathRandom"(){return mathRandom},get "scheduleTimeoutMs"(){return scheduleTimeoutMs},get "clearTimeoutId"(){return clearTimeoutId},get "requestAnimationFrameOrNull"(){return requestAnimationFrameOrNull},get "createElement"(){return createElement},get "domCreateElement"(){return domCreateElement},get "createTextNode"(){return createTextNode},get "appendChild"(){return appendChild},get "removeChild"(){return removeChild},get "setTextContent"(){return setTextContent},get "getTextContent"(){return getTextContent},get "setInnerHTML"(){return setInnerHTML},get "getInnerHTML"(){return getInnerHTML},get "setClassName"(){return setClassName},get "setStyle"(){return setStyle},get "setAttribute"(){return setAttribute},get "addEventListener"(){return addEventListener},get "removeEventListener"(){return removeEventListener},get "focusElement"(){return focusElement},get "getClientWidth"(){return getClientWidth},get "getClientHeight"(){return getClientHeight},get "getScrollTop"(){return getScrollTop},get "setScrollTop"(){return setScrollTop},get "getScrollHeight"(){return getScrollHeight},get "preventDefault"(){return preventDefault},get "stopPropagation"(){return stopPropagation},get "eventKey"(){return eventKey},get "eventCode"(){return eventCode},get "eventKeyCode"(){return eventKeyCode},get "eventCtrlKey"(){return eventCtrlKey},get "eventShiftKey"(){return eventShiftKey},get "eventAltKey"(){return eventAltKey},get "eventInputValue"(){return eventInputValue},get "inputSetValue"(){return inputSetValue},get "inputGetValue"(){return inputGetValue},get "canvasGetContext2d"(){return canvasGetContext2d},get "canvasSetSize"(){return canvasSetSize},get "canvasFillRect"(){return canvasFillRect},get "clearChildren"(){return clearChildren},get "setTabIndex"(){return setTabIndex},get "getClipboardText"(){return getClipboardText},get "setClipboardText"(){return setClipboardText},get "clipboardRead"(){return clipboardRead},get "clipboardWrite"(){return clipboardWrite},get "clipboardReadEvent"(){return clipboardReadEvent},get "clipboardWriteEvent"(){return clipboardWriteEvent},get "eventClientX"(){return eventClientX},get "eventClientY"(){return eventClientY},get "eventButton"(){return eventButton},get "eventDetail"(){return eventDetail},get "rectLeft"(){return rectLeft},get "rectTop"(){return rectTop},get "getScrollLeft"(){return getScrollLeft},get "setScrollLeft"(){return setScrollLeft},get "blurElement"(){return blurElement},get "setPlaceholder"(){return setPlaceholder},get "setDisplay"(){return setDisplay},get "classListAdd"(){return classListAdd},get "classListRemove"(){return classListRemove},get "hostCall"(){return hostCall},get "hostThen"(){return hostThen},get "jsArrayLen"(){return jsArrayLen},get "jsArrayAt"(){return jsArrayAt},get "jsPropString"(){return jsPropString},get "jsPropInt"(){return jsPropInt},get "emptyBuf"(){return emptyBuf},get "beginIdList"(){return beginIdList},get "pushId"(){return pushId},get "takeIdList"(){return takeIdList},get "concat2"(){return concat2},get "pushNewBuffer"(){return pushNewBuffer},get "makeNodePos"(){return makeNodePos},get "nodeAtStash"(){return nodeAtStash},get "nodeAt2Stash"(){return nodeAt2Stash},get "stashNode"(){return stashNode},get "stashRem"(){return stashRem},get "stashStart"(){return stashStart},get "hostGetOffsetAt"(){return hostGetOffsetAt},get "hostGetPositionAt"(){return hostGetPositionAt},get "rbDeleteTree"(){return rbDeleteTree},get "hostComputeLineDiff"(){return hostComputeLineDiff},get "hostWorkbenchCommand"(){return hostWorkbenchCommand},get "jsUndefined"(){return jsUndefined},get "windowSelf"(){return windowSelf},get "throwError"(){return throwError},get "hostPaintEditor"(){return h0["hostPaintEditor"]},get "hostCoordsToPosition"(){return h0["hostCoordsToPosition"]},get "hostStyleFindWidget"(){return h0["hostStyleFindWidget"]},get "eventIsComposing"(){return h0["eventIsComposing"]},get "eventDeltaY"(){return h0["eventDeltaY"]}}})($lh0);let Vg=$lh1["emptyBuf"];let Wg=$lh1["stringSlice"];let Xg=$lh1["stringReplace"];let Yg=$lh1["newRegexp"];let bh=$lh1["rbDeleteTree"];let ch=$lh1["hostGetOffsetAt"];let dh=$lh1["stashNode"];let eh=$lh1["stashRem"];let fh=$lh1["concat2"];let gh=$lh1["nodeAt2Stash"];let hh=$lh1["nodeAtStash"];let ih=$lh1["pushNewBuffer"];let jh=$lh1["stashStart"];let kh=$lh1["regexExec"];let lh=$lh1["hostGetPositionAt"];let mh=$lh1["beginIdList"];let nh=$lh1["pushId"];let oh=$lh1["takeIdList"];let ph=$lh1["jsUndefined"];let qh=$lh1["stringFromCharCode1"];let rh=$lh1["domCreateElement"];let sh=$lh1["setClassName"];let th=$lh1["setStyle"];let uh=$lh1["setTabIndex"];let vh=$lh1["setAttribute"];let wh=$lh1["setPlaceholder"];let xh=$lh1["appendChild"];let yh=$lh1["hostStyleFindWidget"];let zh=$lh1["setDisplay"];let Ah=$lh1["setTextContent"];let Bh=$lh1["hostPaintEditor"];let Ch=$lh1["inputSetValue"];let Dh=$lh1["hostCoordsToPosition"];let Eh=$lh1["clipboardWrite"];let Fh=$lh1["clipboardRead"];let Gh=$lh1["eventKey"];let Hh=$lh1["eventCtrlKey"];let Ih=$lh1["eventShiftKey"];let Jh=$lh1["eventAltKey"];let Kh=$lh1["preventDefault"];let Lh=$lh1["eventIsComposing"];let Mh=$lh1["clipboardWriteEvent"];let Nh=$lh1["hostCall"];let Oh=$lh1["jsArrayLen"];let Ph=$lh1["jsArrayAt"];let Qh=$lh1["jsPropString"];let Rh=$lh1["jsPropInt"];let Sh=$lh1["focusElement"];let Th=$lh1["inputGetValue"];let Uh=$lh1["setInnerHTML"];let Vh=$lh1["hostThen"];let Wh=$lh1["hostWorkbenchCommand"];let Xh=$lh1["addEventListener"];let Yh=$lh1["clipboardReadEvent"];let Zh=$lh1["eventButton"];let $h=$lh1["eventClientX"];let _h=$lh1["eventClientY"];let ai=$lh1["eventDetail"];let bi=$lh1["rectLeft"];let ci=$lh1["rectTop"];let di=$lh1["windowSelf"];let fi=$lh1["stringSplit"];let gi=$lh1["regexTest"];let hi=$lh1["regexLastIndex"];let ii=$lh1["regexSetLastIndex"];let ji=$lh1["dateNow"];let ki=$lh1["mathRandom"];let li=$lh1["scheduleTimeoutMs"];let mi=$lh1["clearTimeoutId"];let ni=$lh1["requestAnimationFrameOrNull"];let oi=$lh1["createTextNode"];let pi=$lh1["removeChild"];let qi=$lh1["getTextContent"];let ri=$lh1["getInnerHTML"];let si=$lh1["removeEventListener"];let ti=$lh1["getClientWidth"];let ui=$lh1["getClientHeight"];let vi=$lh1["getScrollTop"];let wi=$lh1["setScrollTop"];let xi=$lh1["getScrollHeight"];let yi=$lh1["stopPropagation"];let zi=$lh1["eventCode"];let Ai=$lh1["eventKeyCode"];let Bi=$lh1["eventInputValue"];let Ci=$lh1["canvasGetContext2d"];let Di=$lh1["canvasSetSize"];let Ei=$lh1["canvasFillRect"];let Fi=$lh1["clearChildren"];let Gi=$lh1["throwError"];let Hi=$lh1["getScrollLeft"];let Ii=$lh1["setScrollLeft"];let Ji=$lh1["blurElement"];let Ki=$lh1["classListAdd"];let Li=$lh1["classListRemove"];let Mi=$lh1["eventDeltaY"];let Ni=$lh1["hostComputeLineDiff"];let $lh2=(function(){// Microsoft Monaco Editor 0.56.0, MIT. See NOTICE.md and provider/provenance.json.
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
`;function disposable(fn){return{dispose:typeof fn==="function"?fn:()=>{}};}function wordUntil(model,position){const word=model.getWordAtPosition?.(position);const column=position?.column??1;if(!word){return{word:"",startColumn:column,endColumn:column};}const take=Math.max(0,column-word.startColumn);return{word:String(word.word??"").slice(0,take),startColumn:word.startColumn,endColumn:column,};}function enhanceModel(model){if(!model||model.__tsReady)return model;model.__tsReady=true;if(typeof model.getWordUntilPosition!=="function"){model.getWordUntilPosition=(position)=>wordUntil(model,position);}if(typeof model.isDisposed!=="function"){model.isDisposed=()=>Boolean(model.__disposed);}if(typeof model.isAttachedToEditor!=="function"){model.isAttachedToEditor=()=>true;}if(typeof model.isTooLargeForSyncing!=="function"){model.isTooLargeForSyncing=()=>false;}if(typeof model.onDidChangeAttached!=="function"){model.onDidChangeAttached=()=>disposable();}if(typeof model.onWillDispose!=="function"){const orig=typeof model.dispose==="function"?model.dispose.bind(model):()=>{};const listeners=[];model.onWillDispose=(listener)=>{listeners.push(listener);return disposable(()=>{const i=listeners.indexOf(listener);if(i>=0)listeners.splice(i,1);});};model.dispose=()=>{model.__disposed=true;for(const listener of listeners.slice())listener(model);return orig();};}if(typeof model.getOptions!=="function"){model.getOptions=()=>({tabSize:2,insertSpaces:true});}return model;}function syncPaintMarkers(monaco,model){if(!model)return;const rows=monaco.editor.getModelMarkers?.({resource:model.uri})??[];model._paintMarkers=rows.map((m)=>({line:m.startLineNumber,sc:m.startColumn,ec:m.endColumn,severity:Number(m.severity??8),}));}function patchMonacoApi(monaco){const modelCreated=[];const modelDisposed=[];const modelLanguage=[];const languageWaiters=new Map();const languages=monaco.languages;languages.CompletionItemKind=languages.CompletionItemKind??monaco.CompletionItemKind??{Method:0,Function:1,Constructor:2,Field:3,Variable:4,Class:5,Interface:7,Module:8,Property:9,Enum:15,Keyword:17,File:20,};languages.CompletionItemTag={Deprecated:1};languages.SignatureHelpTriggerKind={Invoke:1,TriggerCharacter:2,ContentChange:3};languages.DocumentHighlightKind={Text:0,Read:1,Write:2};languages.InlayHintKind={Type:1,Parameter:2};languages.SymbolKind=languages.SymbolKind??{File:0,Module:1,Namespace:2,Package:3,Class:4,Method:5,Property:6,Field:7,Constructor:8,Enum:9,Interface:10,Function:11,Variable:12,Constant:13,String:14,Number:15,Boolean:16,Array:17,Object:18,Key:19,Null:20,EnumMember:21,Struct:22,Event:23,Operator:24,TypeParameter:25,};if(typeof languages.onLanguage!=="function"){languages.onLanguage=(languageId,callback)=>{const ids=(languages.getLanguages?.()??[]).map((row)=>row.id);if(ids.includes(languageId)){queueMicrotask(callback);return disposable();}const list=languageWaiters.get(languageId)??[];list.push(callback);languageWaiters.set(languageId,list);return disposable(()=>{languageWaiters.set(languageId,(languageWaiters.get(languageId)??[]).filter((fn)=>fn!==callback),);});};}languages.registerOnTypeFormattingEditProvider=(selector,provider)=>languages.registerDocumentFormattingEditProvider(selector,provider);if(typeof languages.registerDocumentRangeFormattingEditProvider!=="function"){languages.registerDocumentRangeFormattingEditProvider=(selector,provider)=>{return languages.registerDocumentFormattingEditProvider(selector,{provideDocumentFormattingEdits(model,options,token){const range=model.getFullModelRange?.()??{startLineNumber:1,startColumn:1,endLineNumber:model.getLineCount?.()??1,endColumn:(model.getLineLength?.(model.getLineCount?.()??1)??0)+1,};return provider.provideDocumentRangeFormattingEdits(model,range,options,token);},provideDocumentRangeFormattingEdits:provider.provideDocumentRangeFormattingEdits?.bind(provider),});};}const origCreate=monaco.editor.createModel.bind(monaco.editor);monaco.editor.createModel=(value,language,uri)=>{const model=enhanceModel(origCreate(value,language,uri));for(const listener of modelCreated.slice())listener(model);return model;};const origGetModels=monaco.editor.getModels.bind(monaco.editor);monaco.editor.getModels=()=>origGetModels().map(enhanceModel);const origGetModel=monaco.editor.getModel.bind(monaco.editor);monaco.editor.getModel=(uri)=>{const model=origGetModel(uri);return model?enhanceModel(model):model;};const origSetMarkers=monaco.editor.setModelMarkers.bind(monaco.editor);monaco.editor.setModelMarkers=(model,owner,markers)=>{origSetMarkers(model,owner,markers);syncPaintMarkers(monaco,model);};monaco.editor.onDidCreateModel=(listener)=>{modelCreated.push(listener);return disposable(()=>{const i=modelCreated.indexOf(listener);if(i>=0)modelCreated.splice(i,1);});};monaco.editor.onWillDisposeModel=(listener)=>{modelDisposed.push(listener);return disposable(()=>{const i=modelDisposed.indexOf(listener);if(i>=0)modelDisposed.splice(i,1);});};monaco.editor.onDidChangeModelLanguage=(listener)=>{modelLanguage.push(listener);return disposable(()=>{const i=modelLanguage.indexOf(listener);if(i>=0)modelLanguage.splice(i,1);});};monaco.editor.createWebWorker=(opts)=>(0,h9["createWebWorker"])(opts);monaco.MarkerTag={Unnecessary:1,Deprecated:2};}async function attachTypescript(monaco){patchMonacoApi(monaco);const ts=await loadRegister();monaco.languages.typescript=ts;monaco.typescript=ts;ts.typescriptDefaults?.setEagerModelSync?.(true);ts.javascriptDefaults?.setEagerModelSync?.(true);ts.typescriptDefaults?.setCompilerOptions?.({target:ts.ScriptTarget?.ES2020??7,module:ts.ModuleKind?.ESNext??99,moduleResolution:ts.ModuleResolutionKind?.NodeJs??2,jsx:ts.JsxEmit?.Preserve??1,jsxImportSource:"solid-js",allowNonTsExtensions:true,allowImportingTsExtensions:true,allowJs:true,noEmit:true,strict:true,});ts.javascriptDefaults?.setCompilerOptions?.({allowNonTsExtensions:true,allowJs:true,checkJs:true,jsx:ts.JsxEmit?.Preserve??1,noEmit:true,});ts.typescriptDefaults?.addExtraLib?.(SOLID_LIB,"ts:solid-js.d.ts");return ts;}return{attachTypescript,SOLID_LIB};};return {get "createAttach"(){return createAttach}}})($lh9);let $lh12=(function(h10,h11){function createPackage(bootMonaco,moduleUrl){const{attachTypescript}=(0,h11["createAttach"])((0,h10["createProvider"])(moduleUrl));function configureWorkers(baseHref){const base=baseHref??new URL("./workers/",moduleUrl).href;globalThis.MonacoEnvironment={getWorker(_id,label){const file=label==="json"?"json.worker.js":label==="css"||label==="scss"||label==="less"?"css.worker.js":label==="html"||label==="handlebars"||label==="razor"?"html.worker.js":label==="typescript"||label==="javascript"?"ts.worker.js":"editor.worker.js";return new Worker(new URL(file,base),{name:String(label??file)})},}}configureWorkers();function createMonaco(){const monaco=bootMonaco();globalThis.monaco=monaco;globalThis.__lilEditor=true;return monaco}const monaco=createMonaco();const ready=attachTypescript(monaco);return{monaco,ready,bootMonaco,attachTypescript,createMonaco,configureWorkers};};return {get "createPackage"(){return createPackage}}})($lh10,$lh11);let ei=$lh12["createPackage"];let q={parent:null,left:null,right:null,color:0,piece:null,size_left:0,lf_left:0,alive:!1};p(q,[0,[0,0],[0,0],0,0],0);let o=q;let s=13,t=10,u=65535;let ia=1;let Ja={startLineNumber:0,startColumn:0,endLineNumber:0,endColumn:0};h(Ja,1,1,1,1);let La={parent:null,left:null,right:null,color:0,deco:null,maxEndLine:0,maxEndColumn:0,alive:!1};za(La,{id:0,range:Ja,className:"",hoverMessage:"",isWholeLine:!1,metadata:0});let xa=La;let _a=[];let Pb=[],Qb=!1;let nc=1,oc=2,pc=4,qc=8,rc=[];let uc=19,vc=8,wc=56;let Ld=[];let le=0;let Ef="vs",Ff=[],Gf=[],Hf={listeners:[],disposed:!1},If={listeners:[],disposed:!1};let ag=!1;let bg=2048,cg=1024,dg=512,eg=256;let Cg={listeners:[],disposed:!1},Dg={listeners:[],disposed:!1},Eg=[],Fg=[],Gg=[],Hg=[],Ig=[],Jg=[];let Ng=ei(bootMonaco,import.meta.url),Ug=Ng.monaco,Og=Ug,Pg=Ug,Qg=Ng.ready,Rg=Ng.attachTypescript,Sg=Ng.createMonaco,Tg=Ng.configureWorkers;export{Og as monaco,Pg as default,Qg as ready,Rg as attachTypescript,Sg as createMonaco,Tg as configureWorkers,bootMonaco};