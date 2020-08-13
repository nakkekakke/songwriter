(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{105:function(e,t,n){e.exports=n(140)},110:function(e,t,n){},140:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(9),c=n.n(o),i=(n(110),n(25)),l=n(33),u=n(172),s=n(174),d=n(91),m=n(175),f=n(170),g=Object(f.a)((function(){return{root:{flexGrow:1},title:{fontSize:20,paddingRight:15},buttonsDiv:{flex:1},linkButton:{textDecoration:"none",color:"white",padding:20}}})),p=function(){var e=g();return r.a.createElement("div",{className:e.root},r.a.createElement(u.a,{position:"static"},r.a.createElement(s.a,null,r.a.createElement(d.a,{className:e.title},"SongWriter"),r.a.createElement("div",{className:e.buttonsDiv},r.a.createElement(m.a,{component:l.Link,to:"/songs/",color:"inherit",className:e.linkButton},"Your songs")),r.a.createElement(m.a,{color:"inherit",className:e.logout},"Logout"))))},E=n(182),v=n(13),h=n(177),b=n(176),O=Object(f.a)((function(){return{item:{}}})),S=function(e){var t=e.song,n=O();return r.a.createElement(b.a,{component:l.Link,to:"/songs/".concat(t.id),divider:!0,className:n.item},r.a.createElement("h2",null,t.title))},j=n(19),y=n(178),w=n(41),N=function(e){var t=e.match(/[^\r\n]+/g);return t||[]},C=function(){return{title:"New song",sections:[{id:1,name:"New section",lines:[]}]}},k=function(e){for(var t="",n=0;n<e.length;n++)t=t.concat(e[n]),n+1<e.length&&(t=t.concat("\n"));return t},x=function(e){return N(e).map((function(e){return e.trim()})).filter((function(e){return""!==e}))},T=function(e){return N(e).size},D=C,I=function(e){if(0===e.sections.length)return e.sections=[{id:1,name:"New section",lines:[]}],e;var t=e.sections.reduce((function(e,t){return t.id>e.id?t:e})).id;console.log(t);var n=Object(w.a)(Object(w.a)({},{id:1,name:"New section",lines:[]}),{},{id:t+1});return e.sections.push(n),e},A=n(10),B=n.n(A),_=n(18),R=n(49),G=n.n(R),L="/api/songs/",M={getAll:function(){var e=Object(_.a)(B.a.mark((function e(){var t;return B.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("Getting songs..."),e.next=3,G.a.get(L);case 3:return t=e.sent,e.abrupt("return",t.data);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),getOne:function(){var e=Object(_.a)(B.a.mark((function e(t){var n;return B.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,G.a.get(L+t);case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),create:function(){var e=Object(_.a)(B.a.mark((function e(t){var n;return B.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("Creating new song..."),e.next=3,G.a.post(L,t);case 3:return n=e.sent,e.abrupt("return",n.data);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),edit:function(){var e=Object(_.a)(B.a.mark((function e(t){var n;return B.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("REACT: Editing song: ",t),e.next=3,G.a.put(L+t.id,t);case 3:return n=e.sent,console.log("REACT: Edited!"),e.abrupt("return",n.data);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),destroy:function(){var e=Object(_.a)(B.a.mark((function e(t){var n;return B.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("Deleting song with id:",t),e.next=3,G.a.delete(L+t);case 3:return n=e.sent,e.abrupt("return",n.data);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},W=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"INIT_SONGS":return t.data;case"CREATE_SONG":var n=e.concat(t.data);return n;case"EDIT_SONG":console.log("Editing song:",t.data);var a=t.data.id;return e.map((function(e){return e.id!==a?e:t.data}));case"DELETE_SONG":return e.filter((function(e){return e.id!==t.data.id}));case"EDIT_SECTION":var r=t.data.songId,o=t.data.section.id,c=e.find((function(e){return e.id===r})),i=c.sections.map((function(e){return e.id!==o?e:t.data.section}));return e.map((function(e){return e.id!==r?e:Object(w.a)(Object(w.a)({},c),{},{sections:i})}));case"DELETE_SECTION":var l=t.data.songId,u=t.data.section.id,s=e.find((function(e){return e.id===l})),d=s.sections.filter((function(e){return e.id!==u}));return e.map((function(e){return e.id!==l?e:Object(w.a)(Object(w.a)({},s),{},{sections:d})}));default:return e}},H=Object(f.a)((function(){return{root:{},addSongButton:{margin:8}}})),J=function(){var e=H(),t=Object(j.c)((function(e){return e.songs})),n=Object(j.b)(),a=Object(v.k)();console.log("Rendered",t.length,"songs");return r.a.createElement("div",{className:e.root},r.a.createElement("h1",null,"Songs"),r.a.createElement(h.a,null,0!==t.length?t.map((function(e){return r.a.createElement(S,{key:e.id,to:"/songs/".concat(e.id),song:e})})):r.a.createElement("p",null,"No songs found")),r.a.createElement(m.a,{className:e.addSongButton,variant:"contained",color:"primary",startIcon:r.a.createElement(y.a,null),onClick:function(){var e;n((e=D(),function(){var t=Object(_.a)(B.a.mark((function t(n){var a;return B.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,M.create(e);case 3:return a=t.sent,console.log("Created:",a),n({type:"CREATE_SONG",data:a}),t.abrupt("return",a);case 9:t.prev=9,t.t0=t.catch(0),console.log(t.t0);case 12:case"end":return t.stop()}}),t,null,[[0,9]])})));return function(e){return t.apply(this,arguments)}}())).then((function(e){a.push("/songs/"+e.id),console.log("Redirected!")})).catch((function(e){return console.log("Error creating new song:",e)}))}},"New song"))},F=n(189),V=n(193),z=n(183),P=n(184),Y=n(185),q=n(186),K=n(187),Q={},U=function(){return console.log("Resetting snapshot"),function(e){e({type:"RESET_SNAPSHOT"})}},X=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Q,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SAVE_SNAPSHOT":return t.data;case"RESET_SNAPSHOT":return Q;default:return e}},Z=n(190),$=n(179),ee=n(53),te=n(180),ne=Object(f.a)((function(e){return{section:{borderWidth:2,borderStyle:"solid",borderRadius:5,borderColor:e.palette.primary.main,padding:20,marginBottom:3,overflow:"auto",whiteSpace:"nowrap",backgroundColor:"#fff"},normalViewRoot:{marginTop:-12,marginBottom:-15},line:{marginTop:-5},editForm:{marginBottom:15},nameField:{marginBottom:10},buttonDiv:{display:"flex"},lineSubmitButton:{marginTop:10,marginBottom:-25},deleteButton:{marginTop:10,marginBottom:-25,marginLeft:"auto"},dragHandle:{marginLeft:"auto",marginTop:10,marginBottom:-25}}})),ae=function(e){var t=e.songId,n=e.section,o=e.editMode,c=Object(a.useState)(n.name),l=Object(i.a)(c,2),u=l[0],s=l[1],d=Object(a.useState)(k(n.lines)),f=Object(i.a)(d,2),g=f[0],p=f[1],E=Object(a.useState)(!1),v=Object(i.a)(E,2),h=v[0],b=v[1],O=ne(),S=Object(j.b)(),y=Object(ee.c)((function(){return r.a.createElement(Z.a,{className:O.dragHandle}," ",r.a.createElement($.a,null,r.a.createElement(te.a,null))," ")})),w=function(e){e.preventDefault(),console.log("Submitting name:",u);var a=x(g),r={id:n.id,name:u,lines:a};S(function(e,t){return function(){var n=Object(_.a)(B.a.mark((function n(a){return B.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:a({type:"EDIT_SECTION",data:{songId:e,section:t}});case 1:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}()}(t,r));var o=k(a);e.target.lines.value=o,p(o)},N=function(e){s(e.target.value)},C=function(e){p(e.target.value)},D=function(e){e.preventDefault(),console.log("Delete button pressed!"),h?(console.log("Delete for realz"),S(function(e,t){return function(){var n=Object(_.a)(B.a.mark((function n(a){return B.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:a({type:"DELETE_SECTION",data:{songId:e,section:t}});case 1:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}()}(t,n))):b(!0)};return r.a.createElement("div",{className:O.section},o?r.a.createElement("form",{className:O.editForm,onSubmit:w},r.a.createElement(F.a,{className:O.nameField,label:"Edit name",name:"name",defaultValue:u,onChange:N}),r.a.createElement("div",null,r.a.createElement(F.a,{multiline:!0,label:"Lines",name:"lines",rows:T(g),defaultValue:g,onChange:C,fullWidth:!0})),r.a.createElement("div",{className:O.buttonDiv},r.a.createElement(m.a,{className:O.lineSubmitButton,size:"small",color:"primary",variant:"outlined",type:"submit"},"Save"),r.a.createElement(y,null),r.a.createElement(m.a,{className:O.deleteButton,size:"small",color:"secondary",variant:"outlined",onClick:D},h?"Confirm deletion":"Delete"))):r.a.createElement("div",{className:O.normalViewRoot},r.a.createElement("h2",null,n.name),n.lines.map((function(e,t){return r.a.createElement("p",{className:O.line,key:t},e)}))))},re=n(87),oe=n.n(re),ce=Object(f.a)((function(){return{root:{}}})),ie=Object(ee.b)((function(e){var t=e.section,n=e.song,a=e.editMode;return r.a.createElement(ae,{songId:n.id,section:t,editMode:a})})),le=Object(ee.a)((function(e){var t=e.song,n=e.editMode;return r.a.createElement(E.a,{maxWidth:!1,align:"left"},t.sections.map((function(e,a){return r.a.createElement(ie,{key:e.id,index:a,section:e,song:t,editMode:n})})))})),ue=function(e){var t=e.song,n=e.editMode,a=Object(j.b)(),o=(ce(),function(e){var n=e.oldIndex,r=e.newIndex,o=oe()(t.sections,n,r);a(function(e,t){var n=JSON.parse(JSON.stringify(e));return n.sections=t,function(){var e=Object(_.a)(B.a.mark((function e(t){return B.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t({type:"EDIT_SONG",data:n});case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()}(t,o))});return 0===t.sections.length?r.a.createElement(E.a,null,r.a.createElement("h2",null,"No sections")):r.a.createElement(le,{song:t,editMode:n,onSortEnd:o,useDragHandle:!0,useWindowAsScrollContainer:!0})},se=n(66),de=n.n(se),me=n(62),fe=n.n(me),ge=function(e){var t=e.handleSaveAgreeClick,n=e.handleSaveDiscardClick,a=e.unsavedChanges,o=function(e){return function(){t(),e()}},c=function(e){return function(){n(),e()}};return r.a.createElement(fe.a,{when:a()},(function(e){return function(e,t,n){return r.a.createElement(V.a,{open:e,onClose:t},r.a.createElement(z.a,null,"You have made unsaved changes"),r.a.createElement(P.a,null,r.a.createElement(Y.a,null,"If you leave without saving, all changes will be lost!")),r.a.createElement(q.a,null,r.a.createElement(m.a,{onClick:o(n),color:"primary",variant:"contained"},"Leave and save"),r.a.createElement(m.a,{onClick:c(n),color:"secondary",variant:"contained"},"Leave without saving"),r.a.createElement(m.a,{onClick:t,variant:"contained"},"Cancel")))}(e.isActive,e.onCancel,e.onConfirm)}))},pe=Object(f.a)((function(){return{root:{},menuContainer:{marginBottom:3},titleField:{margin:15},addSectionButton:{marginTop:8},deleteSongButton:{marginLeft:"auto"}}})),Ee=function(e){e.setAlertMessage,e.setAlertIsError;var t=Object(a.useState)(!1),n=Object(i.a)(t,2),o=n[0],c=n[1],l=Object(a.useState)(!1),u=Object(i.a)(l,2),s=u[0],d=u[1],f=Object(a.useState)(!1),g=Object(i.a)(f,2),p=g[0],h=g[1],b=Object(a.useState)(!1),O=Object(i.a)(b,2),S=O[0],w=O[1],N=pe(),C=Object(v.m)().id,k=Object(j.b)(),x=Object(v.k)(),T=Object(j.c)((function(e){return e.songs.find((function(e){return e.id===C}))})),D=Object(j.c)((function(e){return e.snapshot}));console.log("Song render:",T);var A=function(){k(function(e){return console.log("Saving snapshot:",e),function(t){t({type:"SAVE_SNAPSHOT",data:e})}}(T)),c(!0)},R=function(){console.log("Exiting edit mode"),h(!0)},G=function(){console.log("Saving!"),h(!1),c(!1),k(U()),k(function(e){return function(){var t=Object(_.a)(B.a.mark((function t(n){var a;return B.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,M.edit(e);case 3:a=t.sent,n({type:"EDIT_SONG",data:a}),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),console.log(t.t0);case 10:case"end":return t.stop()}}),t,null,[[0,7]])})));return function(e){return t.apply(this,arguments)}}()}(T))},L=function(){console.log("Discarding changes!"),h(!1),c(!1),k(U()),k(function(e){return function(){var t=Object(_.a)(B.a.mark((function t(n){return B.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:n({type:"EDIT_SONG",data:e});case 1:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()}(D)),console.log("Snapshot after reset:",D)},W=function(e){console.log(e.target.value),""===e.target.value?w(!0):S&&w(!1),k(function(e,t){var n=JSON.parse(JSON.stringify(e));return n.title=t,function(){var e=Object(_.a)(B.a.mark((function e(t){return B.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t({type:"EDIT_SONG",data:n});case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()}(T,e.target.value))},H=function(){console.log("Add new section!"),k(function(e){var t=JSON.parse(JSON.stringify(e));return t=I(t),function(){var e=Object(_.a)(B.a.mark((function e(n){return B.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n({type:"EDIT_SONG",data:t});case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()}(T))},J=function(){console.log("Deleting song here"),k(function(e){return function(){var t=Object(_.a)(B.a.mark((function t(n){var a;return B.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,M.destroy(e.id);case 3:a=t.sent,console.log("Destroy returned:",a),n({type:"DELETE_SONG",data:e}),t.next=11;break;case 8:t.prev=8,t.t0=t.catch(0),console.log(t.t0);case 11:case"end":return t.stop()}}),t,null,[[0,8]])})));return function(e){return t.apply(this,arguments)}}()}(T)),x.push("/songs/")};return T?r.a.createElement("div",{className:N.root},o?r.a.createElement(F.a,{error:S,className:N.titleField,label:"Edit title",defaultValue:T.title,onChange:W,helperText:S?"Title cannot be empty!":""}):r.a.createElement("h1",null,T.title),r.a.createElement("div",null,r.a.createElement(E.a,{align:"right",maxWidth:!1,className:N.menuContainer},r.a.createElement(m.a,{color:"primary",variant:"contained",onClick:function(){o?R():A()}},o?"Exit edit mode":"Edit mode")),r.a.createElement(ue,{song:T,editMode:o})),r.a.createElement(E.a,{maxWidth:!1},o?r.a.createElement(m.a,{className:N.addSectionButton,variant:"contained",color:"primary",startIcon:r.a.createElement(y.a,null),onClick:H},"New section"):r.a.createElement("div",null)),r.a.createElement(E.a,{align:"right",maxWidth:!1},o?r.a.createElement(m.a,{className:N.deleteSongButton,variant:"contained",color:"secondary",startIcon:r.a.createElement(K.a,null),onClick:function(){return d(!0)}},"Delete song"):r.a.createElement("div",null)),r.a.createElement(V.a,{open:s,onClose:function(){return d(!1)}},r.a.createElement(z.a,null,"Delete this song?"),r.a.createElement(P.a,null,r.a.createElement(Y.a,null,"Once deleted, this song cannot be restored (not even by discarding changes when exiting Edit Mode).")),r.a.createElement(q.a,null,r.a.createElement(m.a,{onClick:J,color:"secondary",variant:"contained"},"Delete permanently"),r.a.createElement(m.a,{onClick:function(){return d(!1)},variant:"contained"},"Cancel"))),r.a.createElement(V.a,{open:p,onClose:function(){return h(!1)}},r.a.createElement(z.a,null,"Save changes?"),r.a.createElement(P.a,null,r.a.createElement(Y.a,null,"Save or discard the changes you have made.")),r.a.createElement(q.a,null,r.a.createElement(m.a,{onClick:G,color:"primary",variant:"contained"},"Save changes"),r.a.createElement(m.a,{onClick:L,color:"secondary",variant:"contained"},"Discard changes"),r.a.createElement(m.a,{onClick:function(){return h(!1)},variant:"contained"},"Cancel"))),r.a.createElement(ge,{handleSaveAgreeClick:G,handleSaveDiscardClick:L,unsavedChanges:function(){return!de.a.isEmpty(D)&&!de.a.isEqual(D,T)}})):r.a.createElement("div",null,r.a.createElement("h1",null,"Loading"),r.a.createElement("p",null,"Check the url if it takes too long"))},ve=n(194),he=n(191),be=function(e){var t=e.message,n=e.isError,a=e.handleClose;return r.a.createElement("div",null,r.a.createElement(ve.a,{open:""!==t,autoHideDuration:5e3,onClose:a},r.a.createElement(he.a,{variant:"filled",onClose:a,severity:n?"error":"success"},t)))},Oe=Object(f.a)((function(){return{mainContainer:{justifyContent:"center",alignItems:"center",padding:20},contentContainer:{}}})),Se=function(){console.log("App render");var e=Object(a.useState)(""),t=Object(i.a)(e,2),n=t[0],o=t[1],c=Object(a.useState)(!1),u=Object(i.a)(c,2),s=u[0],d=u[1],m=Oe(),f=Object(j.b)();Object(a.useEffect)((function(){console.log("App effect"),f(function(){var e=Object(_.a)(B.a.mark((function e(t){var n;return B.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,M.getAll();case 3:n=e.sent,console.log("Initialized:",n),t({type:"INIT_SONGS",data:n}),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),console.log(e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(t){return e.apply(this,arguments)}}())}),[f]);return r.a.createElement(r.a.Fragment,null,r.a.createElement(l.BrowserRouter,null,r.a.createElement(p,null),r.a.createElement(E.a,{maxWidth:!1,className:m.mainContainer},r.a.createElement(E.a,{maxWidth:!1,align:"center",className:m.contentContainer},r.a.createElement(v.g,null,r.a.createElement(v.d,{path:"/songs/:id"},r.a.createElement(Ee,{setAlertMessage:o,setAlertIsError:d})),r.a.createElement(v.d,{path:"/songs/"},r.a.createElement(J,null)),r.a.createElement(v.d,{path:"/"},r.a.createElement("p",null,"Welcome")))),r.a.createElement(be,{message:n,isError:s,handleClose:function(e,t){"clickaway"!==t&&o("")}}))))},je=n(188),ye=n(44),we=n(88),Ne=n(89),Ce=Object(Ne.composeWithDevTools)({trace:!0}),ke=Object(ye.combineReducers)({songs:W,snapshot:X}),xe=Object(ye.createStore)(ke,Ce(Object(ye.applyMiddleware)(we.a)));c.a.render(r.a.createElement(je.a,null,r.a.createElement(j.a,{store:xe},r.a.createElement(Se,null))),document.getElementById("root"))}},[[105,1,2]]]);
//# sourceMappingURL=main.beb8e2f6.chunk.js.map