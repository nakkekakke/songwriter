(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[1],{106:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),c=n(13),u=n.n(c),o=(n(83),n(2)),s=n.n(o),i=n(6),f=n(19),l=n(23),p=n(132),d=n(134),g=n(136),v=n(137),O=Object(p.a)((function(){return{root:{marginTop:114}}})),h=function(){var e=O();return a.a.createElement("div",null,a.a.createElement(d.a,{align:"center",className:e.root},a.a.createElement(g.a,{component:"h1",variant:"h4"},"Loading"),a.a.createElement("h1",null,"Loading"),a.a.createElement(v.a,{size:70,thickness:4})))},m=n(143),S=n(142),b=n(15),E=function(){var e=Object(f.b)(),t=Object(f.c)((function(e){return e.alert})),n=function(t,n){"clickaway"!==n&&e(Object(b.c)())};return a.a.createElement(m.a,{open:t.open,autoHideDuration:5e3,onClose:n,style:{marginBottom:5}},a.a.createElement(S.a,{variant:"filled",onClose:n,severity:t.type},t.message))},y=a.a.lazy(Object(i.a)(s.a.mark((function e(){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Promise.all([n.e(0),n.e(4),n.e(5)]).then(n.bind(null,208));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))),j=a.a.lazy(Object(i.a)(s.a.mark((function e(){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Promise.all([n.e(0),n.e(6)]).then(n.bind(null,209));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))),w=function(){var e=Object(f.b)(),t=Object(f.c)((function(e){return e.auth.user}));return Object(r.useEffect)((function(){var t=localStorage.getItem("SongWriterUser");if(console.log("Getting user effect"),t){var n=JSON.parse(t);e(Object(l.d)(n))}}),[e]),a.a.createElement("div",null,a.a.createElement(r.Suspense,{fallback:a.a.createElement(h,null)},t?a.a.createElement(y,null):a.a.createElement(j,null)),a.a.createElement(E,null))},I=n(141),N=n(33);u.a.render(a.a.createElement(I.a,null,a.a.createElement(f.a,{store:N.a},a.a.createElement(w,null))),document.getElementById("root"))},15:function(e,t,n){"use strict";n.d(t,"a",(function(){return a})),n.d(t,"d",(function(){return u})),n.d(t,"c",(function(){return o}));var r=n(5),a={authFailure:{message:"Authentication failed. Please log in again.",type:"error"},authSuccess:{message:"Authentication succeeded.",type:"success"},loginSuccess:{message:"Logged in.",type:"success"},loginFailure:{message:"Invalid credentials.",type:"error"},welcome:{message:"Welcome!",type:"success"},songCreated:{message:"Song created.",type:"success"},songSaved:{message:"Song saved.",type:"success"},logout:{message:"Logged out.",type:"success"},signupSuccess:{message:"Signup successful! You can now log in.",type:"success"},signupFailure:{message:"Username is already taken!",type:"error"}},c={message:"",type:"",open:!1},u=function(e){return console.log("Creating alert",e),function(t){t({type:"SHOW_ALERT",data:Object(r.a)({},e)})}},o=function(){return console.log("Hiding alert"),function(e){e({type:"HIDE_ALERT"})}};t.b=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:c,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SHOW_ALERT":return console.log("Alert reducer show",Object(r.a)(Object(r.a)({},t.data),{},{open:!0})),Object(r.a)(Object(r.a)({},t.data),{},{open:!0});case"HIDE_ALERT":return console.log("Alert reducer hide"),Object(r.a)(Object(r.a)({},e),{},{open:!1});default:return e}}},23:function(e,t,n){"use strict";n.d(t,"c",(function(){return p})),n.d(t,"d",(function(){return d})),n.d(t,"e",(function(){return g})),n.d(t,"a",(function(){return v}));var r=n(2),a=n.n(r),c=n(6),u=n(5),o=n(38),s=n.n(o),i={authenticate:function(){var e=Object(c.a)(a.a.mark((function e(t,n){var r;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s.a.post("/api/token",{username:t,password:n});case 2:return r=e.sent,e.abrupt("return",r.data);case 4:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}()},f=n(15),l={loginInProgress:!1,loggedIn:!1,user:null},p=function(e,t){return console.log("logging in user:",e),function(){var n=Object(c.a)(a.a.mark((function n(r){var c;return a.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r({type:"LOGIN_REQUEST",data:{username:e,password:t}}),n.prev=1,n.next=4,i.authenticate(e,t);case 4:c=n.sent,localStorage.setItem("SongWriterUser",JSON.stringify(c)),r({type:"LOGIN_SUCCESS",data:c}),r(Object(f.d)(f.a.loginSuccess)),n.next=15;break;case 10:n.prev=10,n.t0=n.catch(1),console.log("Login failed"),r({type:"LOGIN_FAILURE"}),r(Object(f.d)(f.a.loginFailure));case 15:case"end":return n.stop()}}),n,null,[[1,10]])})));return function(e){return n.apply(this,arguments)}}()},d=function(e){return console.log("auto-login for",e),function(t){t({type:"LOGIN_WITH_TOKEN",data:e})}},g=function(){return localStorage.removeItem("SongWriterUser"),function(e){e({type:"LOGOUT_SUCCESS"})}},v=function(){return localStorage.removeItem("SongWriterUser"),function(e){e({type:"AUTH_FAILURE"})}};t.b=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:l,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"LOGIN_REQUEST":return Object(u.a)(Object(u.a)({},e),{},{loginInProgress:!0});case"LOGIN_SUCCESS":return{loginInProgress:!1,loggedIn:!0,user:t.data};case"LOGIN_FAILURE":return l;case"LOGIN_WITH_TOKEN":return{loginInProgress:!1,loggedIn:!0,user:t.data};case"LOGOUT_SUCCESS":case"AUTH_FAILURE":return l;default:return e}}},33:function(e,t,n){"use strict";var r=n(21),a=n(69),c=n(70),u=n(47),o=n(63),s=n(23),i=n(15),f=Object(c.composeWithDevTools)({trace:!0}),l=Object(r.combineReducers)({songs:u.d,snapshot:o.a,auth:s.b,alert:i.b}),p=Object(r.createStore)(l,f(Object(r.applyMiddleware)(a.a)));t.a=p},45:function(e,t,n){"use strict";var r=n(64),a=n(5),c=function(e){var t=e.match(/[^\r\n]+/g);return t||[]},u=function(){return{id:1,name:"New section",lines:[]}},o=function(e){return 0===e.sections.length?1:e.sections.map((function(e){return e.id})).reduce((function(e,t){return t>e?t:e}))+1},s=function(e){return 0===e.sections.length?u():Object(a.a)(Object(a.a)({},u()),{},{id:o(e)})};t.a={linesArrayToString:function(e){for(var t="",n=0;n<e.length;n++)t=t.concat(e[n]),n+1<e.length&&(t=t.concat("\n"));return t},linesStringToArray:function(e){return c(e).map((function(e){return e.trim()})).filter((function(e){return""!==e}))},lineCount:function(e){return c(e).size},getDefaultSong:function(e){return{title:"New song",sections:[u()],username:e?e.username:null}},addNewSection:function(e){var t=s(e);return e.sections.push(t),e},createNewSection:s,cloneAndAddSection:function(e,t){var n=Object(a.a)(Object(a.a)({},t),{},{id:o(e)});return Object(a.a)(Object(a.a)({},e),{},{sections:[].concat(Object(r.a)(e.sections),[n])})}}},47:function(e,t,n){"use strict";n.d(t,"c",(function(){return S})),n.d(t,"h",(function(){return b})),n.d(t,"j",(function(){return E})),n.d(t,"f",(function(){return y})),n.d(t,"k",(function(){return j})),n.d(t,"i",(function(){return w})),n.d(t,"g",(function(){return I})),n.d(t,"e",(function(){return N})),n.d(t,"a",(function(){return T})),n.d(t,"b",(function(){return _})),n.d(t,"l",(function(){return x}));var r=n(2),a=n.n(r),c=n(6),u=n(5),o=n(38),s=n.n(o),i=n(33),f=n(23),l=n(15),p=s.a.create();p.interceptors.response.use((function(e){return e}),(function(e){return 401===e.response.status&&(console.log(e.response.message),i.a.dispatch(Object(f.a)()),i.a.dispatch(Object(l.d)(l.a.authFailure))),Promise.reject(e.message)}));var d=p,g=function(){var e=JSON.parse(localStorage.getItem("SongWriterUser"));return e&&e.token?{Authorization:"Bearer ".concat(e.token)}:{}},v="/api/songs/",O=function(){return{headers:g()}},h={getAll:function(){var e=Object(c.a)(a.a.mark((function e(t){var n;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("Getting songs..."),e.next=3,d.get(v,Object(u.a)(Object(u.a)({},O()),{},{params:t}));case 3:return n=e.sent,e.abrupt("return",n.data);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),getOne:function(){var e=Object(c.a)(a.a.mark((function e(t){var n;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,d.get(v+t,O());case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),create:function(){var e=Object(c.a)(a.a.mark((function e(t){var n;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("Creating new song..."),e.next=3,d.post(v,t,O());case 3:return n=e.sent,e.abrupt("return",n.data);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),edit:function(){var e=Object(c.a)(a.a.mark((function e(t){var n;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,d.put(v+t.id,t,O());case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),destroy:function(){var e=Object(c.a)(a.a.mark((function e(t){var n;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("Deleting song with id:",t),e.next=3,d.delete(v+t,O());case 3:return n=e.sent,e.abrupt("return",n.data);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},m=n(45),S=function(e){return function(){var t=Object(c.a)(a.a.mark((function t(n){var r;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,h.create(e);case 3:return r=t.sent,console.log("Created:",r),n({type:"CREATE_SONG",data:r}),t.abrupt("return",r);case 9:t.prev=9,t.t0=t.catch(0),console.log(t.t0);case 12:case"end":return t.stop()}}),t,null,[[0,9]])})));return function(e){return t.apply(this,arguments)}}()},b=function(e,t){var n=JSON.parse(JSON.stringify(e));return n.title=t,function(){var e=Object(c.a)(a.a.mark((function e(t){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t({type:"EDIT_SONG",data:n});case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},E=function(e){return function(){var t=Object(c.a)(a.a.mark((function t(n){var r;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,console.log("user:",e),t.next=4,h.getAll(e);case 4:r=t.sent,console.log("Initialized:",r),n({type:"INIT_SONGS",data:r}),t.next=12;break;case 9:t.prev=9,t.t0=t.catch(0),console.log(t.t0);case 12:case"end":return t.stop()}}),t,null,[[0,9]])})));return function(e){return t.apply(this,arguments)}}()},y=function(e){return function(){var t=Object(c.a)(a.a.mark((function t(n){var r;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,h.destroy(e.id);case 3:r=t.sent,console.log("Destroy returned:",r),n({type:"DELETE_SONG",data:e}),t.next=11;break;case 8:t.prev=8,t.t0=t.catch(0),console.log(t.t0);case 11:case"end":return t.stop()}}),t,null,[[0,8]])})));return function(e){return t.apply(this,arguments)}}()},j=function(e){return function(){var t=Object(c.a)(a.a.mark((function t(n){var r;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,h.edit(e);case 3:r=t.sent,n({type:"EDIT_SONG",data:r}),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),console.log(t.t0);case 10:case"end":return t.stop()}}),t,null,[[0,7]])})));return function(e){return t.apply(this,arguments)}}()},w=function(e){return function(){var t=Object(c.a)(a.a.mark((function t(n){return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:n({type:"EDIT_SONG",data:e});case 1:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},I=function(e,t){return function(){var n=Object(c.a)(a.a.mark((function n(r){return a.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:r({type:"EDIT_SECTION",data:{songId:e,section:t}});case 1:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}()},N=function(e,t){return function(){var n=Object(c.a)(a.a.mark((function n(r){return a.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:r({type:"DELETE_SECTION",data:{songId:e,section:t}});case 1:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}()},T=function(e){var t=JSON.parse(JSON.stringify(e));return t=m.a.addNewSection(t),function(){var e=Object(c.a)(a.a.mark((function e(n){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n({type:"EDIT_SONG",data:t});case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},_=function(e,t){return function(n){n({type:"CLONE_SECTION",data:{songId:e,section:t}})}},x=function(e,t){var n=JSON.parse(JSON.stringify(e));return n.sections=t,function(){var e=Object(c.a)(a.a.mark((function e(t){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t({type:"EDIT_SONG",data:n});case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()};t.d=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"INIT_SONGS":return t.data;case"CREATE_SONG":var n=e.concat(t.data);return n;case"EDIT_SONG":var r=t.data.id;return e.map((function(e){return e.id!==r?e:t.data}));case"DELETE_SONG":return e.filter((function(e){return e.id!==t.data.id}));case"EDIT_SECTION":var a=t.data.songId,c=t.data.section.id,o=e.find((function(e){return e.id===a})),s=o.sections.map((function(e){return e.id!==c?e:t.data.section}));return e.map((function(e){return e.id!==a?e:Object(u.a)(Object(u.a)({},o),{},{sections:s})}));case"DELETE_SECTION":var i=t.data.songId,f=t.data.section.id,l=e.find((function(e){return e.id===i})),p=l.sections.filter((function(e){return e.id!==f}));return e.map((function(e){return e.id!==i?e:Object(u.a)(Object(u.a)({},l),{},{sections:p})}));case"CLONE_SECTION":var d=t.data.songId,g=t.data.section.id,v=e.find((function(e){return e.id===d})),O=v.sections.find((function(e){return e.id===g})),h=m.a.cloneAndAddSection(v,O);return e.map((function(e){return e.id!==d?e:h}));default:return e}}},63:function(e,t,n){"use strict";n.d(t,"c",(function(){return a})),n.d(t,"b",(function(){return c}));var r={},a=function(e){return console.log("Saving snapshot:",e),function(t){t({type:"SAVE_SNAPSHOT",data:e})}},c=function(){return console.log("Resetting snapshot"),function(e){e({type:"RESET_SNAPSHOT"})}};t.a=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:r,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SAVE_SNAPSHOT":return t.data;case"RESET_SNAPSHOT":return r;default:return e}}},78:function(e,t,n){e.exports=n(106)},83:function(e,t,n){}},[[78,2,3]]]);
//# sourceMappingURL=main.b86d029c.chunk.js.map