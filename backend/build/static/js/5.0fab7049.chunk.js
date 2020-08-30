(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[5],{182:function(e,t,n){"use strict";var a=n(0),r=n.n(a),c=n(164),o=n(168),l=Object(c.a)((function(){return{header:{marginTop:30}}}));t.a=function(e){var t=e.text,n=l();return r.a.createElement(o.a,{component:"h1",variant:"h4",className:n.header},t)}},190:function(e,t,n){"use strict";var a=n(4),r=n.n(a),c=n(9),o=n(39),l=n.n(o),i=n(61),u="/api/users",s=function(){var e=Object(c.a)(r.a.mark((function e(t,n){var a;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,l.a.post(u,{username:t,password:n});case 2:return a=e.sent,e.abrupt("return",a.data);case 4:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),m=function(){var e=Object(c.a)(r.a.mark((function e(t){var n;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,l.a.post(u+"/username-available",{username:t});case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),d=function(){var e=Object(c.a)(r.a.mark((function e(t,n){var a,c;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=n.map((function(e){return e.id})),e.next=3,l.a.put(u+"/songs",{username:t,songIds:a},{headers:Object(i.a)()});case 3:return c=e.sent,e.abrupt("return",c.data);case 5:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}();t.a={create:s,usernameAvailable:m,editSongs:d}},191:function(e,t,n){"use strict";var a=n(0),r=n.n(a),c=n(236),o=n(237),l=n(168),i=n(164),u=n(234),s=n(19),m=n(23),d=n(178),f=n(12),g=function(e){var t=e.loggedIn,n=Object(s.b)(),a=Object(d.k)();return r.a.createElement(u.a,{color:"inherit",onClick:function(){t&&(n(Object(m.e)()),n(Object(f.d)(f.a.logout))),a.push("/")}},t?"Log out":"Log in")},E=n(179),b=Object(i.a)((function(){return{navButton:{textDecoration:"none",color:"white",padding:20}}})),v=function(e){var t=e.path,n=e.text,a=e.onClick,c=b();return r.a.createElement(u.a,{component:E.Link,to:t,onClick:a,color:"inherit",className:c.navButton},n)},p=Object(i.a)((function(){return{root:{flex:1}}})),O=function(e){var t=e.loggedIn,n=p();return r.a.createElement("div",{className:n.root},t?r.a.createElement(v,{path:"/songs/",text:"Your songs"}):r.a.createElement("span",null))},h=n(235),j=n(259),C=n(59),k=function(){var e=Object(s.b)(),t=Object(s.c)((function(e){return e.statuses.darkMode}));return r.a.createElement(h.a,{control:r.a.createElement(j.a,{checked:t,onChange:function(){return e(Object(C.d)())},color:"secondary"}),label:"Dark mode",labelPlacement:"top",style:{margin:6,marginRight:30}})},S=Object(i.a)((function(){return{root:{flexGrow:1},title:{fontSize:20,paddingRight:15}}}));t.a=function(e){var t=e.loggedIn,n=S();return r.a.createElement("div",{className:n.root},r.a.createElement(c.a,{position:"static"},r.a.createElement(o.a,null,r.a.createElement(l.a,{className:n.title},"SongWriter"),r.a.createElement(O,{loggedIn:t}),r.a.createElement(k,null),r.a.createElement(g,{loggedIn:t}))))}},254:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(191),o=n(164),l=n(166),i=n(179),u=n(178),s=n(4),m=n.n(s),d=n(9),f=n(244),g=n(234),E=n(19),b=n(249),v=n(52),p=n(55),O=n(182),h=n(185),j=n(253),C=n(247),k=n(246),S=n(168),y=n(184),N=n(172),w=n(221),x=n(245),R=n(243),T=n(257),I=n(239),B=n(240),D=n(241),L=n(242),_=function(e){var t=e.open,n=e.setOpen,a=e.handleConfirmClick;return r.a.createElement(T.a,{open:t,onClose:function(){return n(!1)}},r.a.createElement(I.a,null,"Delete this song?"),r.a.createElement(B.a,null,r.a.createElement(D.a,null,"Once deleted, this song cannot be restored.")),r.a.createElement(L.a,null,r.a.createElement(g.a,{onClick:a,color:"secondary",variant:"contained"},"Delete permanently"),r.a.createElement(g.a,{onClick:function(){return n(!1)},variant:"contained"},"Cancel")))},A=function(e){var t=e.song,n=Object(a.useState)(null),c=Object(y.a)(n,2),o=c[0],l=c[1],i=Object(a.useState)(!1),u=Object(y.a)(i,2),s=u[0],m=u[1],d=Object(E.b)(),f=Object(E.c)((function(e){return e.auth.user})),b=Object(E.c)((function(e){return e.statuses.darkMode})),v=function(){l(null)};return r.a.createElement(r.a.Fragment,null,r.a.createElement(N.a,{onClick:function(e){l(e.target)}},r.a.createElement(R.a,null)),r.a.createElement(w.a,{onClose:v,open:null!==o,anchorEl:o,elevation:1,keepMounted:!0},r.a.createElement(x.a,null,r.a.createElement(g.a,{onClick:function(){d(Object(p.c)(t,f.username)),v()},variant:b?"contained":"outlined",color:"primary"},"Clone")),r.a.createElement(x.a,null,r.a.createElement(g.a,{onClick:function(){m(!0),v()},variant:b?"contained":"outlined",color:"secondary"},"Delete"))),r.a.createElement(_,{open:s,setOpen:m,handleConfirmClick:function(){d(Object(p.g)(t))}}))},W=n(248),M=Object(o.a)((function(e){return{item:{color:e.palette.primary.main},container:{display:"flex",justifyContent:"space-between"},title:{textAlign:"left",marginTop:8,marginBottom:8}}})),F=Object(h.c)((function(){return r.a.createElement(j.a,{style:{marginTop:18,marginLeft:-12}},r.a.createElement(C.a,null,r.a.createElement(W.a,null)))})),V=function(e){var t=e.song,n=M();return r.a.createElement(l.a,{maxWidth:"xl",className:n.container},r.a.createElement(F,null),r.a.createElement(k.a,{component:i.Link,to:"/songs/".concat(t.id),divider:!0,className:n.item},r.a.createElement(S.a,{variant:"h6",className:n.title},t.title)),r.a.createElement(A,{song:t}))},z=Object(h.b)((function(e){var t=e.song;return r.a.createElement(V,{song:t})})),G=Object(h.a)((function(e){var t=e.songs;return r.a.createElement(l.a,{maxWidth:!1,align:"left"},t.map((function(e,t){return r.a.createElement(z,{key:e.id,index:t,song:e})})))})),H=n(200),Y=n.n(H),J=n(190),K=n(12),q=Object(o.a)((function(){return{list:{marginTop:10},addSongButton:{margin:8}}})),P=function(){var e=q(),t=Object(E.c)((function(e){return e.songs})),n=Object(E.c)((function(e){return e.auth.user})),a=Object(E.b)(),c=Object(u.k)(),o=function(){var e=Object(d.a)(m.a.mark((function e(r){var c,o,l;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c=r.oldIndex,o=r.newIndex,l=Y()(t,c,o),a(Object(p.n)(l)),e.prev=3,e.next=6,J.a.editSongs(n.username,l);case 6:e.next=11;break;case 8:e.prev=8,e.t0=e.catch(3),a(Object(K.d)(K.a.dataDesync));case 11:case"end":return e.stop()}}),e,null,[[3,8]])})));return function(t){return e.apply(this,arguments)}}();return r.a.createElement("div",null,r.a.createElement(O.a,{text:"Your songs"}),r.a.createElement(f.a,{className:e.list},0!==t.length?r.a.createElement(G,{songs:t,onSortEnd:o,useWindowAsScrollContainer:!0,useDragHandle:!0}):r.a.createElement("p",null,"No songs found")),r.a.createElement(g.a,{onClick:function(){a(Object(p.d)(v.a.getDefaultSong(n))).then((function(e){c.push("/songs/"+e.id)})).catch((function(){return console.log("Error creating song")}))},variant:"contained",color:"primary",startIcon:r.a.createElement(b.a,null),className:e.addSongButton},"New song"))},Q=n(252),U=n(235),X=n(259),Z=n(251),$=n(77),ee=n(25),te=n(3),ne=n(62),ae=Object(o.a)((function(e){return{section:{borderWidth:2,borderStyle:"solid",borderRadius:5,borderColor:e.palette.primary.main,padding:20,marginBottom:3,overflow:"auto",whiteSpace:"nowrap",backgroundColor:e.palette.background.paper},normalViewRoot:{marginTop:-12,marginBottom:-15},name:{marginTop:10},linesDiv:{marginTop:12,marginBottom:10},line:{marginBottom:5},editForm:{marginBottom:15},nameField:{marginBottom:10},bottomDiv:{display:"flex"},lineSubmitButton:{marginTop:10,marginBottom:-25},cloneButton:{marginTop:10,marginBottom:-25},deleteButton:{marginTop:10,marginBottom:-25,marginLeft:"auto"},dragHandle:{marginLeft:"auto",marginTop:10,marginBottom:-25}}})),re=function(e){var t=e.songId,n=e.sectionId,c=Object(a.useState)(!1),o=Object(y.a)(c,2),l=o[0],i=o[1],u=ae(),s=Object(E.b)(),m=Object(h.c)((function(){return r.a.createElement(j.a,{className:u.dragHandle},r.a.createElement(C.a,null,r.a.createElement(W.a,null)))})),d=Object(E.c)((function(e){return e.songs.find((function(e){return e.id===t})).sections.find((function(e){return e.id===n}))})),f=Object(E.c)((function(e){return e.errors.find((function(e){return e.type===ne.c.SECTION_NAME_ERROR&&e.id===n}))})),b=Object(E.c)((function(e){return e.errors.find((function(e){return e.type===ne.c.SECTION_LINES_ERROR&&e.id===n}))})),O=Object(E.c)((function(e){return e.statuses.editMode})),k=Object(E.c)((function(e){return e.statuses.chords})),N=Object(E.c)((function(e){return e.statuses.darkMode})),w=function(e){if("Tab"===e.key&&!e.shiftKey){e.preventDefault();var t=e.target.value,n=e.target.selectionStart,a=e.target.selectionEnd;e.target.value=t.substring(0,n)+"    "+t.substring(a),e.target.selectionStart=a+4-(a-n),e.target.selectionEnd=a+4-(a-n)}},x=function(e){return e.replace(/ /g,"\xa0")},R=function(e){var a=e.target.value,r=Object(te.a)(Object(te.a)({},d),{},{lines:Object(ee.a)(d.lines),name:a});0===a.length||a.length>50?s(Object(ne.a)(ne.c.SECTION_NAME_ERROR,n)):s(Object(ne.d)(ne.c.SECTION_NAME_ERROR,n)),s(Object(p.h)(t,r))},T=function(e){var a=v.a.linesStringToArray(e.target.value),r=Object(te.a)(Object(te.a)({},d),{},{lines:a});v.a.validateLines(a)?s(Object(ne.d)(ne.c.SECTION_LINES_ERROR,n)):s(Object(ne.a)(ne.c.SECTION_LINES_ERROR,n)),s(Object(p.h)(t,r))},I=function(){console.log("Cloning",d),s(Object(p.b)(t,d))},B=function(e){e.preventDefault(),l?s(Object(p.f)(t,d)):i(!0)};return r.a.createElement("div",{className:u.section},O?r.a.createElement("form",{className:u.editForm},r.a.createElement(Q.a,{label:"Edit name",name:"name",onChange:R,defaultValue:d.name,error:void 0!==f,helperText:f?"Length must be 1-50 characters":"",className:u.nameField}),r.a.createElement("div",null,r.a.createElement(Q.a,{multiline:!0,label:"Lines",name:"lines",onChange:T,onKeyDown:w,defaultValue:v.a.linesArrayToString(d.lines),rows:d.lines.size,error:void 0!==b,fullWidth:!0,helperText:b?"Max 200 characters for one line":""})),r.a.createElement("div",{className:u.bottomDiv},r.a.createElement(g.a,{onClick:I,size:"small",color:"primary",variant:N?"contained":"outlined",className:u.cloneButton},"Clone"),r.a.createElement(m,null),r.a.createElement(g.a,{onClick:B,size:"small",color:"secondary",variant:N?"contained":"outlined",className:u.deleteButton},l?"Confirm deletion":"Delete"))):r.a.createElement("div",{className:u.normalViewRoot},r.a.createElement(S.a,{variant:"h6",className:u.name},d.name),r.a.createElement("div",{className:u.linesDiv},d.lines.map((function(e,t){return r.a.createElement("div",{key:t},r.a.createElement(S.a,{variant:"body1",className:u.line},k?v.a.addChordsToLine(e):x(e)))})))))},ce=Object(h.b)((function(e){var t=e.section,n=e.song;return r.a.createElement(re,{songId:n.id,sectionId:t.id})})),oe=Object(h.a)((function(e){var t=e.song;return r.a.createElement(l.a,{maxWidth:!1,align:"left"},t.sections.map((function(e,n){return r.a.createElement(ce,{key:e.id,index:n,section:e,song:t})})))})),le=function(e){var t=e.song,n=Object(E.b)(),a=function(e){var a=e.oldIndex,r=e.newIndex,c=Y()(t.sections,a,r);n(Object(p.m)(t,c))};return 0===t.sections.length?r.a.createElement(l.a,null,r.a.createElement("h2",null,"No sections")):r.a.createElement(oe,{song:t,onSortEnd:a,useDragHandle:!0,useWindowAsScrollContainer:!0})},ie=n(218),ue=n.n(ie),se=n(258),me=n(219),de=n.n(me),fe=n(250),ge=Object(o.a)((function(e){return{root:{},closeButton:{position:"absolute",right:e.spacing(1),top:e.spacing(1),color:e.palette.grey[500]}}})),Ee=function(e){var t=e.onClick,n=ge();return r.a.createElement(N.a,{onClick:t,className:n.closeButton},r.a.createElement(fe.a,null))},be=function(e){var t=e.handleSaveConfirmClick,n=e.handleSaveDiscardClick,a=e.unsavedChanges,c=e.saveAllowed,o=void 0===c||c,l=function(e){return r.a.createElement(g.a,{onClick:u(e),color:"primary",variant:"contained"},"Save and leave")},i=function(e){return r.a.createElement(se.a,{title:"Resolve errors before saving",arrow:!0},r.a.createElement("span",null," ",r.a.createElement(g.a,{onClick:u(e),color:"primary",variant:"contained",disabled:!0},"Can't save")))},u=function(e){return function(){t(),e()}},s=function(e){return function(){n(),e()}};return r.a.createElement(de.a,{when:a()},(function(e){return function(e,t,n){return r.a.createElement(T.a,{open:e,onClose:t},r.a.createElement(I.a,null,"You have unsaved changes"),r.a.createElement(B.a,null,r.a.createElement(D.a,null,"If you leave without saving, all changes will be lost!")),r.a.createElement(L.a,null,o?l(n):i(n),r.a.createElement(g.a,{onClick:s(n),color:"secondary",variant:"contained"},"Leave without saving"),r.a.createElement(Ee,{onClick:t})))}(e.isActive,e.onCancel,e.onConfirm)}))},ve=function(e){var t=e.open,n=e.setOpen,a=e.handleConfirmClick,c=e.handleDiscardClick,o=e.saveAllowed,l=void 0===o||o;return r.a.createElement(T.a,{open:t,onClose:function(){return n(!1)}},r.a.createElement(I.a,null,"Save changes?"),r.a.createElement(B.a,null,r.a.createElement(D.a,null,"Save or discard the changes you have made.")),r.a.createElement(L.a,null,l?r.a.createElement(g.a,{onClick:a,color:"primary",variant:"contained"},"Save changes"):r.a.createElement(se.a,{title:"Resolve errors before saving",arrow:!0},r.a.createElement("span",null," ",r.a.createElement(g.a,{onClick:a,color:"primary",variant:"contained",disabled:!0},"Can't save"))),r.a.createElement(g.a,{onClick:c,color:"secondary",variant:"contained"},"Discard changes"),r.a.createElement(Ee,{onClick:function(){return n(!1)}})))},pe=n(59),Oe=Object(o.a)((function(e){return{menuContainer:{marginBottom:e.spacing(1),display:"flex",justifyContent:"flex-end"},chordToggleSwitch:{marginRight:"auto"},editModeSwitch:{marginLeft:e.spacing(1)},titleField:{marginTop:20,marginBottom:4},addSectionButton:{marginTop:e.spacing(1)},deleteSongButton:{marginLeft:"auto"}}})),he=function(){var e=Object(a.useState)(!1),t=Object(y.a)(e,2),n=t[0],c=t[1],o=Object(a.useState)(!1),i=Object(y.a)(o,2),s=i[0],m=i[1],d=Oe(),f=Object(u.m)().id,v=Object(E.b)(),h=Object(u.k)(),j=Object(E.c)((function(e){return e.songs.find((function(e){return e.id===f}))})),C=Object(E.c)((function(e){return e.errors})),k=C.find((function(e){return e.type===ne.c.SONG_TITLE_ERROR})),S=Object(E.c)((function(e){return e.statuses.editMode})),N=Object(E.c)((function(e){return e.statuses.chords})),w=Object(E.c)((function(e){return e.statuses.darkMode})),x=Object(E.c)((function(e){return e.snapshot}));Object(a.useEffect)((function(){return v(Object($.b)()),function(){v(Object(pe.b)())}}),[v]);var R=function(){v(Object(pe.c)())},T=function(){v(Object($.c)(j)),v(Object(p.l)(j))},I=function(){S?D():B()},B=function(){v(Object($.c)(j)),v(Object(pe.e)())},D=function(){F()?m(!0):(v(Object(pe.e)()),v(Object($.b)()))},L=function(){m(!1),v(Object(pe.e)()),v(Object($.b)()),v(Object(p.l)(j))},A=function(){m(!1),v(Object(pe.e)()),v(Object(p.j)(x)),v(Object($.b)())},W=function(e){""===e.target.value||e.target.value.length>50?v(Object(ne.a)(ne.c.SONG_TITLE_ERROR)):k&&v(Object(ne.d)(ne.c.SONG_TITLE_ERROR)),v(Object(p.i)(j,e.target.value))},M=function(){v(Object(p.a)(j))},F=function(){return!ue.a.isEmpty(x)&&!ue.a.isEqual(x,j)};return j?r.a.createElement("div",null,S?r.a.createElement("div",{style:{width:"".concat(8*j.title.length+25,"px")}},r.a.createElement(Q.a,{label:"Edit title",onChange:W,defaultValue:j.title,error:void 0!==k,helperText:k?"Length must be 1-50 characters":"",fullWidth:!0,className:d.titleField})):r.a.createElement(O.a,{text:j.title}),r.a.createElement("div",null,r.a.createElement("div",{className:d.menuContainer},function(){if(!S)return r.a.createElement(U.a,{control:r.a.createElement(X.a,{onChange:R,checked:N,color:"primary"}),label:"Show chords",className:d.chordToggleSwitch})}(),function(){if(F())return r.a.createElement(g.a,{onClick:T,color:"primary",variant:w?"contained":"outlined",disabled:0!==C.length},"Save changes")}(),r.a.createElement(U.a,{control:r.a.createElement(X.a,{onChange:I,checked:S,color:"primary"}),label:"Edit mode",className:d.editModeSwitch})),r.a.createElement(le,{song:j})),r.a.createElement(l.a,{maxWidth:!1},S?r.a.createElement(g.a,{onClick:M,variant:"contained",color:"primary",startIcon:r.a.createElement(b.a,null),className:d.addSectionButton},"New section"):r.a.createElement("div",null)),r.a.createElement(l.a,{align:"right",maxWidth:!1},S?r.a.createElement(g.a,{onClick:function(){return c(!0)},variant:"contained",color:"secondary",startIcon:r.a.createElement(Z.a,null),className:d.deleteSongButton},"Delete song"):r.a.createElement("div",null)),r.a.createElement(_,{open:n,setOpen:c,handleConfirmClick:function(){v(Object(p.g)(j)),v(Object($.b)()),h.push("/songs/")}}),r.a.createElement(ve,{open:s,setOpen:m,handleConfirmClick:L,handleDiscardClick:A,saveAllowed:0===C.length}),r.a.createElement(be,{handleSaveConfirmClick:L,handleSaveDiscardClick:A,unsavedChanges:F,saveAllowed:0===C.length})):r.a.createElement("div",null,r.a.createElement(O.a,{text:"Loading song"}),r.a.createElement("p",null,"Check the url if it takes too long"))},je=Object(o.a)((function(){return{mainContainer:{justifyContent:"center",alignItems:"center",padding:20}}}));t.default=function(){var e=je(),t=Object(E.b)(),n=Object(E.c)((function(e){return e.auth.user}));return Object(a.useEffect)((function(){t(Object(p.k)(n))}),[t,n]),r.a.createElement(r.a.Fragment,null,r.a.createElement(i.BrowserRouter,null,r.a.createElement(c.a,{loggedIn:!0}),r.a.createElement(l.a,{maxWidth:!1,className:e.mainContainer},r.a.createElement(l.a,{maxWidth:"lg",align:"center"},r.a.createElement(u.g,null,r.a.createElement(u.d,{path:"/songs/:id"},r.a.createElement(he,null)),r.a.createElement(u.d,{path:"/songs/"},r.a.createElement(P,null)),r.a.createElement(u.d,{path:"/"},r.a.createElement("p",null,"Welcome")))))))}}}]);
//# sourceMappingURL=5.0fab7049.chunk.js.map