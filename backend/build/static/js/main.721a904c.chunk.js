(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[1],{107:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),c=n(14),u=n.n(c),o=(n(84),n(3)),i=n.n(o),s=n(9),l=n(19),f=n(23),d=n(133),p=n(135),g=n(137),O=n(138),v=Object(d.a)((function(){return{root:{marginTop:114},text:{marginBottom:15}}})),E=function(){var e=v();return a.a.createElement("div",null,a.a.createElement(p.a,{align:"center",className:e.root},a.a.createElement(g.a,{component:"h1",variant:"h4",className:e.text},"Loading"),a.a.createElement(O.a,{size:70,thickness:4})))},S=n(144),m=n(143),b=n(13),h=function(){var e=Object(l.b)(),t=Object(l.c)((function(e){return e.alert})),n=function(t,n){"clickaway"!==n&&e(Object(b.c)())};return a.a.createElement(S.a,{open:t.open,autoHideDuration:5e3,onClose:n,style:{marginBottom:5}},a.a.createElement(m.a,{variant:"filled",onClose:n,severity:t.type},t.message))},y=a.a.lazy(Object(s.a)(i.a.mark((function e(){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Promise.all([n.e(0),n.e(4),n.e(5)]).then(n.bind(null,219));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))),I=a.a.lazy(Object(s.a)(i.a.mark((function e(){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Promise.all([n.e(0),n.e(6)]).then(n.bind(null,220));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))),N=function(){var e=Object(l.b)(),t=Object(l.c)((function(e){return e.auth.user}));return Object(r.useEffect)((function(){var t=localStorage.getItem("SongWriterUser");if(console.log("Getting user effect"),t){var n=JSON.parse(t);e(Object(f.d)(n))}}),[e]),a.a.createElement("div",null,a.a.createElement(r.Suspense,{fallback:a.a.createElement(E,null)},t?a.a.createElement(y,null):a.a.createElement(I,null)),a.a.createElement(h,null))},j=n(142),T=n(34);u.a.render(a.a.createElement(j.a,null,a.a.createElement(l.a,{store:T.a},a.a.createElement(N,null))),document.getElementById("root"))},13:function(e,t,n){"use strict";n.d(t,"a",(function(){return a})),n.d(t,"d",(function(){return u})),n.d(t,"c",(function(){return o}));var r=n(5),a={authFailure:{message:"Authentication failed. Please log in again.",type:"error"},authSuccess:{message:"Authentication succeeded.",type:"success"},loginSuccess:{message:"Logged in.",type:"success"},loginFailure:{message:"Invalid credentials.",type:"error"},welcome:{message:"Welcome!",type:"success"},songCreated:{message:"Song created.",type:"success"},songSaved:{message:"Song saved.",type:"success"},logout:{message:"Logged out.",type:"success"},signupSuccess:{message:"Signup successful! You can now log in.",type:"success"},signupFailure:{message:"Username is already taken!",type:"error"},validationFailure:{message:"Saving failed due to invalid input data.",type:"error"}},c={message:"",type:"",open:!1},u=function(e){return console.log("Creating alert",e),function(t){t({type:"SHOW_ALERT",data:Object(r.a)({},e)})}},o=function(){return console.log("Hiding alert"),function(e){e({type:"HIDE_ALERT"})}};t.b=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:c,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SHOW_ALERT":return console.log("Alert reducer show",Object(r.a)(Object(r.a)({},t.data),{},{open:!0})),Object(r.a)(Object(r.a)({},t.data),{},{open:!0});case"HIDE_ALERT":return console.log("Alert reducer hide"),Object(r.a)(Object(r.a)({},e),{},{open:!1});default:return e}}},23:function(e,t,n){"use strict";n.d(t,"c",(function(){return d})),n.d(t,"d",(function(){return p})),n.d(t,"e",(function(){return g})),n.d(t,"a",(function(){return O}));var r=n(3),a=n.n(r),c=n(9),u=n(5),o=n(39),i=n.n(o),s={authenticate:function(){var e=Object(c.a)(a.a.mark((function e(t,n){var r;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,i.a.post("/api/token",{username:t,password:n});case 2:return r=e.sent,e.abrupt("return",r.data);case 4:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}()},l=n(13),f={loginInProgress:!1,loggedIn:!1,user:null},d=function(e,t){return console.log("logging in user:",e),function(){var n=Object(c.a)(a.a.mark((function n(r){var c;return a.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r({type:"LOGIN_REQUEST",data:{username:e,password:t}}),n.prev=1,n.next=4,s.authenticate(e,t);case 4:c=n.sent,localStorage.setItem("SongWriterUser",JSON.stringify(c)),r({type:"LOGIN_SUCCESS",data:c}),r(Object(l.d)(l.a.loginSuccess)),n.next=15;break;case 10:n.prev=10,n.t0=n.catch(1),console.log("Login failed"),r({type:"LOGIN_FAILURE"}),r(Object(l.d)(l.a.loginFailure));case 15:case"end":return n.stop()}}),n,null,[[1,10]])})));return function(e){return n.apply(this,arguments)}}()},p=function(e){return console.log("auto-login for",e),function(t){t({type:"LOGIN_WITH_TOKEN",data:e})}},g=function(){return localStorage.removeItem("SongWriterUser"),function(e){e({type:"LOGOUT_SUCCESS"})}},O=function(){return localStorage.removeItem("SongWriterUser"),function(e){e({type:"AUTH_FAILURE"})}};t.b=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:f,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"LOGIN_REQUEST":return Object(u.a)(Object(u.a)({},e),{},{loginInProgress:!0});case"LOGIN_SUCCESS":return{loginInProgress:!1,loggedIn:!0,user:t.data};case"LOGIN_FAILURE":return f;case"LOGIN_WITH_TOKEN":return{loginInProgress:!1,loggedIn:!0,user:t.data};case"LOGOUT_SUCCESS":case"AUTH_FAILURE":return f;default:return e}}},34:function(e,t,n){"use strict";var r=n(21),a=n(70),c=n(71),u=n(48),o=n(65),i=n(23),s=n(13),l=n(52),f=Object(c.composeWithDevTools)({trace:!0}),d=Object(r.combineReducers)({songs:u.e,snapshot:o.a,auth:i.b,alert:s.b,errors:l.b}),p=Object(r.createStore)(d,f(Object(r.applyMiddleware)(a.a)));t.a=p},46:function(e,t,n){"use strict";var r=n(25),a=n(5),c=function(e){var t=e.match(/[^\r\n]+/g);return t||[]},u=function(){return{id:1,name:"New section",lines:[]}},o=function(e){return 0===e.sections.length?1:e.sections.map((function(e){return e.id})).reduce((function(e,t){return t>e?t:e}))+1},i=function(e){return 0===e.sections.length?u():Object(a.a)(Object(a.a)({},u()),{},{id:o(e)})};t.a={linesArrayToString:function(e){for(var t="",n=0;n<e.length;n++)t=t.concat(e[n]),n+1<e.length&&(t=t.concat("\n"));return t},linesStringToArray:function(e){return c(e).map((function(e){return e.trim()})).filter((function(e){return""!==e}))},lineCount:function(e){return c(e).size},getDefaultSong:function(e){return{title:"New song",sections:[u()],username:e?e.username:null}},addNewSection:function(e){var t=i(e);return e.sections.push(t),e},createNewSection:i,cloneAndAddSection:function(e,t){var n=Object(a.a)(Object(a.a)({},t),{},{id:o(e)});return Object(a.a)(Object(a.a)({},e),{},{sections:[].concat(Object(r.a)(e.sections),[n])})},validateLines:function(e){for(var t=0;t<e.length;t++)if(e[t].length>200)return!1;return!0}}},48:function(e,t,n){"use strict";n.d(t,"d",(function(){return b})),n.d(t,"c",(function(){return h})),n.d(t,"i",(function(){return y})),n.d(t,"k",(function(){return I})),n.d(t,"g",(function(){return N})),n.d(t,"l",(function(){return j})),n.d(t,"j",(function(){return T})),n.d(t,"h",(function(){return _})),n.d(t,"f",(function(){return R})),n.d(t,"a",(function(){return w})),n.d(t,"b",(function(){return A})),n.d(t,"m",(function(){return x}));var r=n(25),a=n(3),c=n.n(a),u=n(9),o=n(5),i=n(39),s=n.n(i),l=n(34),f=n(23),d=n(13),p=s.a.create();p.interceptors.response.use((function(e){return e}),(function(e){return 401===e.response.status&&(console.log(e.response.message),l.a.dispatch(Object(f.a)()),l.a.dispatch(Object(d.d)(d.a.authFailure))),Promise.reject(e.message)}));var g=p,O=function(){var e=JSON.parse(localStorage.getItem("SongWriterUser"));return e&&e.token?{Authorization:"Bearer ".concat(e.token)}:{}},v="/api/songs/",E=function(){return{headers:O()}},S={getAll:function(){var e=Object(u.a)(c.a.mark((function e(t){var n;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("Getting songs..."),e.next=3,g.get(v,Object(o.a)(Object(o.a)({},E()),{},{params:t}));case 3:return n=e.sent,e.abrupt("return",n.data);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),getOne:function(){var e=Object(u.a)(c.a.mark((function e(t){var n;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,g.get(v+t,E());case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),create:function(){var e=Object(u.a)(c.a.mark((function e(t){var n;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("Creating new song..."),e.next=3,g.post(v,t,E());case 3:return n=e.sent,e.abrupt("return",n.data);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),edit:function(){var e=Object(u.a)(c.a.mark((function e(t){var n;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,g.put(v+t.id,t,E());case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),destroy:function(){var e=Object(u.a)(c.a.mark((function e(t){var n;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("Deleting song with id:",t),e.next=3,g.delete(v+t,E());case 3:return n=e.sent,e.abrupt("return",n.data);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},m=n(46),b=function(e){return function(){var t=Object(u.a)(c.a.mark((function t(n){var r;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,S.create(e);case 3:return r=t.sent,console.log("Created:",r),n({type:"CREATE_SONG",data:r}),t.abrupt("return",r);case 9:t.prev=9,t.t0=t.catch(0),console.log(t.t0);case 12:case"end":return t.stop()}}),t,null,[[0,9]])})));return function(e){return t.apply(this,arguments)}}()},h=function(e,t){var n={title:e.title,sections:Object(r.a)(e.sections),username:t};return b(n)},y=function(e,t){var n=JSON.parse(JSON.stringify(e));return n.title=t,function(e){e({type:"EDIT_SONG",data:n})}},I=function(e){return function(){var t=Object(u.a)(c.a.mark((function t(n){var r;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,console.log("user:",e),t.next=4,S.getAll(e);case 4:r=t.sent,console.log("Initialized:",r),n({type:"INIT_SONGS",data:r}),t.next=12;break;case 9:t.prev=9,t.t0=t.catch(0),console.log(t.t0);case 12:case"end":return t.stop()}}),t,null,[[0,9]])})));return function(e){return t.apply(this,arguments)}}()},N=function(e){return function(){var t=Object(u.a)(c.a.mark((function t(n){var r;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,S.destroy(e.id);case 3:r=t.sent,console.log("Destroy returned:",r),n({type:"DELETE_SONG",data:e}),t.next=11;break;case 8:t.prev=8,t.t0=t.catch(0),console.log(t.t0);case 11:case"end":return t.stop()}}),t,null,[[0,8]])})));return function(e){return t.apply(this,arguments)}}()},j=function(e){return function(){var t=Object(u.a)(c.a.mark((function t(n){return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,console.log("Saving"),t.next=4,S.edit(e);case 4:t.next=10;break;case 6:t.prev=6,t.t0=t.catch(0),console.log("tuli errori:",t.t0),n(Object(d.d)(d.a.validationFailure));case 10:case"end":return t.stop()}}),t,null,[[0,6]])})));return function(e){return t.apply(this,arguments)}}()},T=function(e){return function(t){t({type:"EDIT_SONG",data:e})}},_=function(e,t){return function(n){n({type:"EDIT_SECTION",data:{songId:e,section:t}})}},R=function(e,t){return function(n){n({type:"DELETE_SECTION",data:{songId:e,section:t}})}},w=function(e){var t=JSON.parse(JSON.stringify(e));return t=m.a.addNewSection(t),function(e){e({type:"EDIT_SONG",data:t})}},A=function(e,t){return function(n){n({type:"CLONE_SECTION",data:{songId:e,section:t}})}},x=function(e,t){var n=JSON.parse(JSON.stringify(e));return n.sections=t,function(e){e({type:"EDIT_SONG",data:n})}};t.e=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"INIT_SONGS":return t.data;case"CREATE_SONG":var n=e.concat(t.data);return n;case"EDIT_SONG":var r=t.data.id;return e.map((function(e){return e.id!==r?e:t.data}));case"DELETE_SONG":return e.filter((function(e){return e.id!==t.data.id}));case"EDIT_SECTION":var a=t.data.songId,c=t.data.section.id,u=e.find((function(e){return e.id===a})),i=u.sections.map((function(e){return e.id!==c?e:t.data.section}));return e.map((function(e){return e.id!==a?e:Object(o.a)(Object(o.a)({},u),{},{sections:i})}));case"DELETE_SECTION":var s=t.data.songId,l=t.data.section.id,f=e.find((function(e){return e.id===s})),d=f.sections.filter((function(e){return e.id!==l}));return e.map((function(e){return e.id!==s?e:Object(o.a)(Object(o.a)({},f),{},{sections:d})}));case"CLONE_SECTION":var p=t.data.songId,g=t.data.section.id,O=e.find((function(e){return e.id===p})),v=O.sections.find((function(e){return e.id===g})),E=m.a.cloneAndAddSection(O,v);return e.map((function(e){return e.id!==p?e:E}));default:return e}}},52:function(e,t,n){"use strict";n.d(t,"c",(function(){return a})),n.d(t,"a",(function(){return c})),n.d(t,"d",(function(){return u}));var r=n(25),a={SONG_TITLE_ERROR:"SONG_TITLE_ERROR",SECTION_NAME_ERROR:"SECTION_NAME_ERROR",SECTION_LINES_ERROR:"SECTION_LINES_ERROR"},c=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;return function(n){n({type:"CREATE_ERROR",data:{type:e,id:t}})}},u=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;return console.log("Type is:",e,"id is:",t),function(n){n({type:"REMOVE_ERROR",data:{type:e,id:t}})}};t.b=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"CREATE_ERROR":return[].concat(Object(r.a)(e),[t.data]);case"REMOVE_ERROR":return e.filter((function(e){return!(e.type===t.data.type&&e.id===t.data.id)}));default:return e}}},65:function(e,t,n){"use strict";n.d(t,"c",(function(){return a})),n.d(t,"b",(function(){return c}));var r={},a=function(e){return console.log("Saving snapshot:",e),function(t){t({type:"SAVE_SNAPSHOT",data:e})}},c=function(){return console.log("Resetting snapshot"),function(e){e({type:"RESET_SNAPSHOT"})}};t.a=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:r,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SAVE_SNAPSHOT":return t.data;case"RESET_SNAPSHOT":return r;default:return e}}},79:function(e,t,n){e.exports=n(107)},84:function(e,t,n){}},[[79,2,3]]]);
//# sourceMappingURL=main.721a904c.chunk.js.map