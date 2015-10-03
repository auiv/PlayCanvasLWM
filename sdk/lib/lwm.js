!function(e){"use strict";var t=e.lwm={pc:e.pc},n={exports:t};t.HOOK_INTO_PLAYCANVAS=e.hasOwnProperty("LWM_HOOK_INTO_PLAYCANVAS")?e.LWM_HOOK_INTO_PLAYCANVAS:!0,function(e){e.using=function(e,t){if(!e)throw new Error("using | `instance` parameter is null!");if(!(e.destroy instanceof Function))throw new Error("using | `instance` parameter does not have `destroy` function!");if(!(t instanceof Function))throw new Error("using | `action` parameter is not a function!");var n;try{n=t(e)}finally{e.destroy()}return n},e.stringFromBytes=function(e){if(!Array.isArray(e))throw new Error("using | `bytes` parameter is not an array!");return String.fromCharCode.apply(null,e)},e.stringFromBuffer=function(e){if(!(e instanceof ArrayBuffer))throw new Error("using | `buffer` parameter is not type of ArrayBuffer!");var t,n,r,o=new Uint16Array(e),a="";for(t=0,n=o.length;n>t;t+=65535)r=65535,t+65535>n&&(r=n-t),a+=String.fromCharCode.apply(null,o.subarray(t,t+r));return a}}(n.exports),function(e){function t(){this.mesh=-1,this.node=-1}function n(){this.min=[],this.max=[]}function r(){this.aabb=new n,this.base=-1,this.count=-1,this.type="",this.vertices=-1,this.indices=[]}function o(){this.name="",this.position=[],this.rotation=[],this.scale=[]}function a(){this.type="",this.components=-1,this.data=[]}function i(){this.position=new a,this.texCoord0=new a,this.normal=new a}function s(){this.version=-1,this.meshInstances=[],this.meshes=[],this.nodes=[],this.parents=[],this.skins=[],this.vertices=[]}function p(){this.model=new s}t.prototype=Object.create(null),t.prototype.mesh=-1,t.prototype.node=-1,n.prototype=Object.create(null),n.prototype.min=null,n.prototype.max=null,r.AABB=n,r.prototype=Object.create(null),r.prototype.aabb=null,r.prototype.base=-1,r.prototype.count=-1,r.prototype.type=null,r.prototype.vertices=-1,r.prototype.indices=null,o.prototype=Object.create(null),o.prototype.name=null,o.prototype.position=null,o.prototype.rotation=null,o.prototype.scale=null,a.prototype=Object.create(null),a.prototype.type=null,a.prototype.components=-1,a.prototype.data=null,i.VertexData=a,i.prototype=Object.create(null),i.prototype.position=null,i.prototype.texCoord0=null,i.prototype.normal=null,s.MeshInstance=t,s.Mesh=r,s.Node=o,s.Vertex=i,s.prototype=Object.create(null),s.prototype.version=-1,s.prototype.meshInstances=null,s.prototype.meshes=null,s.prototype.nodes=null,s.prototype.parents=null,s.prototype.skins=null,s.prototype.vertices=null,p.ModelData=s,p.prototype=Object.create(null),p.prototype.model=null,e.ModelFileFormat=p}(n.exports),function(e){function t(e,t){if(!e)throw new Error("BinaryReader | `buffer` parameter cannot be null!");if(!(e instanceof ArrayBuffer))throw new Error("BinaryReader | `buffer` parameter is not type of ArrayBuffer!");this._data=new DataView(e),this._position=0,this._size=e.byteLength,this._useLittleEndian=!t}t.SEEK_MODE={BEGIN:0,END:1,CURRENT:2},t.prototype=Object.create(null),t.prototype._data=null,t.prototype._position=0,t.prototype._size=0,t.prototype._useLittleEndian=!1,Object.defineProperty(t.prototype,"position",{get:function(){return this._position}}),Object.defineProperty(t.prototype,"size",{get:function(){return this._size}}),t.prototype.destroy=function(){this._data=null,this._position=0,this._size=0},t.prototype.seek=function(e,n){var r=this._position,o=this._size;e===t.SEEK_MODE.BEGIN?this._position=Math.max(0,Math.min(o,n)):e===t.SEEK_MODE.END?this._position=Math.max(0,Math.min(o,o-n)):e===t.SEEK_MODE.CURRENT&&(this._position=Math.max(0,Math.min(o,r+n)))},t.prototype.readBytes=function(e){var t,n=this._data,r=this._position,o=this._size,a=this._useLittleEndian,i=[];if(!n)throw new Error("BinaryReader::readBytes | instance is not initialized!");if(0>e)throw new Error("BinaryReader::readBytes | `count` parameter is less than 0!");if(r+e>o)throw new Error("BinaryReader::readBytes | there is no more space to read from!");for(t=0;e>t;++t)i.push(n.getInt8(r+t,a));return this._position+=e,i},t.prototype.readByte=function(){var e,t=this._data,n=this._position,r=this._size,o=this._useLittleEndian;if(!t)throw new Error("BinaryReader::readByte | instance is not initialized!");if(n+1>r)throw new Error("BinaryReader::readByte | there is no more space to read from!");return e=t.getInt8(n,o),this._position++,e},t.prototype.readInt32=function(){var e,t=this._data,n=this._position,r=this._size,o=this._useLittleEndian;if(!t)throw new Error("BinaryReader::readInt32 | instance is not initialized!");if(n+4>r)throw new Error("BinaryReader::readInt32 | there is no more space to read from!");return e=t.getInt32(n,o),this._position+=4,e},t.prototype.readUint32=function(){var e,t=this._data,n=this._position,r=this._size,o=this._useLittleEndian;if(!t)throw new Error("BinaryReader::readUint32 | instance is not initialized!");if(n+4>r)throw new Error("BinaryReader::readUint32 | there is no more space to read from!");return e=t.getUint32(n,o),this._position+=4,e},t.prototype.readSingle=function(){var e,t=this._data,n=this._position,r=this._size,o=this._useLittleEndian;if(!t)throw new Error("BinaryReader::readSingle | instance is not initialized!");if(n+4>r)throw new Error("BinaryReader::readSingle | there is no more space to read from!");return e=t.getFloat32(n,o),this._position+=4,e},e.BinaryReader=t}(n.exports),function(e){function t(){}var n=e.using,r=e.stringFromBytes,o=e.BinaryReader,a=e.ModelFileFormat,i={NONE:0,SMALL_SIZE_OF_PACKED_DATA:1},s=new DataView(new ArrayBuffer(4));t.isHeaderValid=function(e){if(!(e instanceof ArrayBuffer))throw new Error("Serializer::unpack | `buffer` parameter is not type of ArrayBuffer!");return n(new o(e),function(e){var t=e.readBytes(4);return t[0]==="L".charCodeAt(0)&&t[1]==="W".charCodeAt(0)&&t[2]==="M".charCodeAt(0)&&0===t[3]})},t.prototype=Object.create(null),t.prototype.unpack=function(e){if(!(e instanceof ArrayBuffer))throw new Error("Serializer::unpack | `buffer` parameter is not type of ArrayBuffer!");return n(new o(e),function(e){var t,n,o,s,p,u,l,d,c,h,f,y,m,w,g,_,E,S,k,A,M,I,B,L,v,C,O,z,D,b,x=new a,N=x.model,T=0,F=0,P=0,H=0,R=0;if(t=e.readBytes(4),t[0]!=="L".charCodeAt(0)||t[1]!=="W".charCodeAt(0)||t[2]!=="M".charCodeAt(0)||0!==t[3])throw new Error("Serializer::unpack | wrong header signature!");if(n=e.readByte(),o=0!==e.readByte(),N=x.model,N.version=e.readByte(),n===i.NONE?(T=e.readInt32(),F=e.readInt32(),P=e.readInt32(),H=e.readInt32(),R=e.readInt32()):n===i.SMALL_SIZE_OF_PACKED_DATA&&(s=this.unpackIntsQuantized(e),T=s[0],F=s[1],P=s[2],H=s[3],R=s[4]),T>0)if(n===i.NONE)for(v=0;T>v;++v)p=new a.ModelData.MeshInstance,p.mesh=e.readInt32(),p.node=e.readInt32(),N.meshInstances.push(p);else if(n===i.SMALL_SIZE_OF_PACKED_DATA){if(s=this.unpackIntsQuantized(e),s.length!==2*T)throw new Error("Serializer::unpack | mesh instances count does not match unpacked items count!");for(v=0,C=0;T>v;++v)p=new a.ModelData.MeshInstance,p.mesh=s[C++],p.node=s[C++],N.meshInstances.push(p)}if(F>0)if(n===i.NONE)for(v=0;F>v;++v){for(u=new a.ModelData.Mesh,h=e.readByte(),f=e.readBytes(h),u.type=r(f),u.base=e.readInt32(),u.count=e.readInt32(),u.vertices=e.readInt32(),y=new a.ModelData.Mesh.AABB,y.min.push(e.readSingle()),y.min.push(e.readSingle()),y.min.push(e.readSingle()),y.max.push(e.readSingle()),y.max.push(e.readSingle()),y.max.push(e.readSingle()),u.aabb=y,C=0;C<u.count;++C)u.indices.push(e.readUint32());N.meshes.push(u)}else if(n===i.SMALL_SIZE_OF_PACKED_DATA){if(m=this.unpackStringsQuantized(e),m.length!==F)throw new Error("Serializer::unpack | meshes count does not match unpacked items count!");if(w=this.unpackIntsQuantized(e),w.length!==3*F)throw new Error("Serializer::unpack | meshes count does not match unpacked items count!");for(v=0,C=0,O=0;F>v;++v){u=new a.ModelData.Mesh,u.type=m[C++],u.base=w[O++],u.count=w[O++],u.vertices=w[O++],y=new a.ModelData.Mesh.AABB,y.min.push(e.readSingle()),y.min.push(e.readSingle()),y.min.push(e.readSingle()),y.max.push(e.readSingle()),y.max.push(e.readSingle()),y.max.push(e.readSingle()),u.aabb=y;var V=this.unpackUintsQuantized(e);if(V.length!==u.count)throw new Error("Serializer::unpack | mesh "+v+" indices count does not match unpacked items count!");for(l=0;l<u.count;++l)u.indices.push(V[l]);N.meshes.push(u)}}if(P>0)if(n===i.NONE)for(v=0;P>v;++v)l=new a.ModelData.Node,d=e.readByte(),c=e.readBytes(d),l.name=r(c),l.position.push(e.readSingle()),l.position.push(e.readSingle()),l.position.push(e.readSingle()),l.rotation.push(e.readSingle()),l.rotation.push(e.readSingle()),l.rotation.push(e.readSingle()),l.scale.push(e.readSingle()),l.scale.push(e.readSingle()),l.scale.push(e.readSingle()),N.nodes.push(l);else if(n===i.SMALL_SIZE_OF_PACKED_DATA){if(s=this.unpackStringsQuantized(e),s.length!==P)throw new Error("Serializer::unpack | nodes count does not match unpacked items count!");for(v=0;P>v;++v)l=new a.ModelData.Node,l.name=s[v],l.position.push(e.readSingle()),l.position.push(e.readSingle()),l.position.push(e.readSingle()),l.rotation.push(e.readSingle()),l.rotation.push(e.readSingle()),l.rotation.push(e.readSingle()),l.scale.push(e.readSingle()),l.scale.push(e.readSingle()),l.scale.push(e.readSingle()),N.nodes.push(l)}if(H>0)if(n===i.NONE)for(v=0;H>v;++v)N.parents.push(e.readInt32());else if(n===i.SMALL_SIZE_OF_PACKED_DATA){if(s=this.unpackIntsQuantized(e),s.length!==H)throw new Error("Serializer::unpack | parents count does not match unpacked items count!");for(v=0;H>v;++v)N.parents.push(s[v])}if(R>0)if(n===i.NONE)for(v=0;R>v;++v){for(g=new a.ModelData.Vertex,_=new a.ModelData.Vertex.VertexData,h=e.readByte(),f=e.readBytes(h),_.type=r(f),_.components=e.readInt32(),E=e.readInt32(),C=0;E>C;++C)_.data.push(e.readSingle());for(g.position=_,_=new a.ModelData.Vertex.VertexData,h=e.readByte(),f=e.readBytes(h),_.type=r(f),_.components=e.readInt32(),E=e.readInt32(),C=0;E>C;++C)_.data.push(e.readSingle());for(g.texCoord0=_,_=new a.ModelData.Vertex.VertexData,h=e.readByte(),f=e.readBytes(h),_.type=r(f),_.components=e.readInt32(),E=e.readInt32(),C=0;E>C;++C)_.data.push(e.readSingle());g.normal=_,N.vertices.push(g)}else if(n===i.SMALL_SIZE_OF_PACKED_DATA){if(m=this.unpackStringsQuantized(e),m.length!==3*R)throw new Error("Serializer::unpack | vertices count does not match unpacked items count!");if(S=this.unpackIntsQuantized(e),S.length!==3*R)throw new Error("Serializer::unpack | vertices count does not match unpacked items count!");var Q=this.unpackIntsQuantized(e);if(Q.length!==3*R)throw new Error("Serializer::unpack | vertices count does not match unpacked items count!");for(v=0,z=0,D=0,b=0;R>v;++v){for(g=new a.ModelData.Vertex,k=g.position,A=g.texCoord0,M=g.normal,k.type=m[z++],A.type=m[z++],M.type=m[z++],k.components=S[D++],A.components=S[D++],M.components=S[D++],I=Q[b++],B=Q[b++],L=Q[b++],C=0;I>C;++C)k.data.push(e.readSingle());for(C=0;B>C;++C)A.data.push(e.readSingle());for(C=0;L>C;++C)M.data.push(e.readSingle());o?(k.data=this.unpackFloatsLosslessQuantized(e),B>0&&(A.data=this.unpackFloatsLosslessQuantized(e)),L>0&&(M.data=this.unpackFloatsLosslessQuantized(e))):(k.data=this.unpackFloatsLossyQuantized(e),B>0&&(A.data=this.unpackFloatsLossyQuantized(e)),L>0&&(M.data=this.unpackFloatsLossyQuantized(e))),N.vertices.push(g)}}return x}.bind(this))},t.prototype.unpackUints=function(e){var n,r,a,i,s,p,u,l,d,c=e.readInt32(),h=e.readUint32(),f=e.readByte();if(0>=c)return null;if(n=new Array(c),0==f)for(d=0;c>d;++d)n[d]=h;else if(32>f){for(r=t.calculateBitsMask(f),a=0,i=0|e.readUint32(),s=0,p=0,u=0,l=0,d=0;c>d;++d)a=(i&r<<s)>>s&r,s+=f,s>=32&&(s-=32,p=f-s,u=t.calculateBitsMask(p),l=t.calculateBitsMask(s),i=e.readUint32()>>>0,a&=u,a|=(i&l)<<p),n[d]=((a&r)>>>0)+h;0==s&&e.seek(o.SEEK_MODE.CURRENT,-4)}else for(d=0;c>d;++d)n[d]=e.readUint32();return n},t.prototype.unpackInts=function(e){var n,r,a,i,s,p,u,l,d,c=e.readInt32(),h=e.readInt32(),f=e.readByte();if(0>=c)return null;if(n=new Array(c),0==f)for(d=0;c>d;++d)n[d]=h;else if(32>f){for(r=t.calculateBitsMask(f),a=0,i=0|e.readInt32(),s=0,p=0,u=0,l=0,d=0;c>d;++d)a=(i&r<<s)>>s&r,s+=f,s>=32&&(s-=32,p=f-s,u=t.calculateBitsMask(p),l=t.calculateBitsMask(s),i=e.readInt32()>>>0,a&=u,a|=(i&l)<<p),n[d]=((a&r)>>>0)+h;0==s&&e.seek(o.SEEK_MODE.CURRENT,-4)}else for(d=0;c>d;++d)n[d]=e.readInt32();return n},t.prototype.unpackFloatsLossless=function(e){var n,r,o=this.unpackInts(e),a=this.unpackInts(e),i=this.unpackInts(e),s=new Array(a.length),p=e._useLittleEndian;for(n=0,r=a.length;r>n;++n)s[n]=t.floatFromScientific(0!=o[n],a[n],i[n],p);return s},t.prototype.unpackFloatsLossy=function(e){var t,n,r=e.readByte(),o=this.unpackInts(e),a=new Array(o.length),i=Math.pow(10,-r);for(t=0,n=o.length;n>t;++t)a[t]=o[t]*i;return a},t.prototype.unpackStrings=function(e){var t,n,o,a,i=this.unpackInts(e),s=this.unpackInts(e),p=r(s),u=new Array(i.length);for(t=0,o=0,n=i.length;n>t;++t)a=i[t],u[t]=p.substring(o,o+a),o+=a;return u},t.prototype.unpackIntsQuantized=function(e){var t,n,r,o,a,i,s,p=e.readInt32();if(0>p)return this.unpackInts(e);for(t=e.readInt32(),n=new Array(t),o=0,s=0;p>o;++o)for(r=this.unpackInts(e),a=0,i=r.length;i>a;++a)n[s++]=r[a];return n},t.prototype.unpackUintsQuantized=function(e){var t,n,r,o,a,i,s,p=e.readInt32();if(0>p)return this.unpackUints(e);for(t=e.readInt32(),n=new Array(t),o=0,s=0;p>o;++o)for(r=this.unpackUints(e),a=0,i=r.length;i>a;++a)n[s++]=r[a];return n},t.prototype.unpackFloatsLosslessQuantized=function(e){var t,n,r,o,a,i,s,p=e.readInt32();if(0>p)return this.unpackFloatsLossless(e);for(t=e.readInt32(),n=new Array(t),o=0,s=0;p>o;++o)for(r=this.unpackFloatsLossless(e),a=0,i=r.length;i>a;++a)n[s++]=r[a];return n},t.prototype.unpackFloatsLossyQuantized=function(e){var t,n,r,o,a,i,s,p=e.readInt32();if(0>p)return this.unpackFloatsLossy(e);for(t=e.readInt32(),n=new Array(t),o=0,s=0;p>o;++o)for(r=this.unpackFloatsLossy(e),a=0,i=r.length;i>a;++a)n[s++]=r[a];return n},t.prototype.unpackStringsQuantized=function(e){var t,n,r,o,a,i,s,p=e.readInt32();if(0>p)return this.unpackStrings(e);for(t=e.readInt32(),n=new Array(t),o=0,s=0;p>o;++o)for(r=this.unpackStrings(e),a=0,i=r.length;i>a;++a)n[s++]=r[a];return n},t.calculateBitsMask=function(e){return(1<<e)-1},t.floatFromScientific=function(e,t,n,r){var o=8388607&n|(255&t)<<23|(e?1:0)<<31;return s.setInt32(0,o,r),s.getFloat32(0,r)},e.Serializer=t}(n.exports),function(e){function t(e){this._device=e}if(e.HOOK_INTO_PLAYCANVAS&&e.pc){var n=e.pc,r=e.stringFromBuffer,o=e.Serializer;t.DEFAULT_MATERIAL=n.ModelHandler.DEFAULT_MATERIAL.clone(),t.prototype=Object.create(null),t.prototype._device=null,t.prototype.load=function(e,t){console.log("LWMModelHandler::load | ",e),n.net.http.get(e,function(e){t&&t(null,e)},{withCredentials:!1,responseType:"arraybuffer",error:function(r,o,a){t&&t(n.string.format("Error loading LWM model: {0} [status: {1}]",e,r))}})},t.prototype.open=function(e,t){var a,i,s;if(!(t instanceof ArrayBuffer))throw new Error("LWMModelHandler::open | `data` parameter is not type of ArrayBuffer!");return o.isHeaderValid(t)?(console.log("LWMModelHandler::open | LWM header found - unpack"),i=new o,a=i.unpack(t)):(console.log("LWMModelHandler::open | LWM header not found - parse as JSON string"),s=r(t),a=JSON.parse(s)),this.ensureVertices(a),n.ModelHandler.prototype.open.call(this,e,a)},t.prototype.patch=function(e,t){console.log("LWMModelHandler::patch | ",e.resource,e.data),n.ModelHandler.prototype.patch.call(this,e,t)},t.prototype.ensureVertices=function(e){var t,r,o,a,i,s,p,u,l=e.model,d=l?l.vertices:null;if(d)for(t=0,o=d.length;o>t;++t)if(a=d[t],i=a.position,s=a.texCoord0,p=a.normal,i&&s&&p){for(r=s.data.length,u=(n.data.length/n.components|0)*s.components;u>r;++r)s.data.push(0);for(r=p.data.length,u=(n.data.length/n.components|0)*p.components;u>r;++r)s.data.push(0)}},e.LWMModelHandler=t}}(n.exports),function(e){function t(e){this._pc=e}var n=e.LWMModelHandler;t.prototype=Object.create(null),t.prototype._pc=null,t.prototype._pc_http_isBinaryContentType=null,t.prototype.hook=function(){var e,t,r,o,a=this._pc,i=a?a.net:null,s=i?i.Http:null,p=i?i.http:null,u=a?a.Application:null;if(s&&(s.ContentType&&!s.ContentType.hasOwnProperty("LWM")&&(console.log("PlayCanvasHook::hook | add content type"),s.ContentType.LWM="application/octet-stream"),s.binaryExtensions&&s.binaryExtensions.indexOf(".lwm")<0&&(console.log("PlayCanvasHook::hook | add binary extension"),s.binaryExtensions.push(".lwm")),this._pc_http_isBinaryContentType||(console.log("PlayCanvasHook::hook | override ::isBinaryContentType"),this._pc_http_isBinaryContentType=s.prototype.isBinaryContentType,s.prototype.isBinaryContentType=function(e){var t=[s.ContentType.WAV,s.ContentType.OGG,s.ContentType.MP3,s.ContentType.BIN,s.ContentType.DDS,s.ContentType.LWM];return t.indexOf(e)>=0}),p&&(p.isBinaryContentType=s.prototype.isBinaryContentType)),u&&u._applications){console.log("PlayCanvasHook::hook | override model handler"),e=u._applications;for(o in e)e.hasOwnProperty(o)&&(t=e[o],t&&(r=t.loader,r&&r.addHandler("lwmmodel",new n(t.graphicsDevice))))}},e.PlayCanvasHook=t}(n.exports),t.HOOK_INTO_PLAYCANVAS&&(e.pc?new t.PlayCanvasHook(e.pc).hook():console.error("Cannot hook into PlayCanvas - there is no PlayCanvas namespace available to use!"))}(window);