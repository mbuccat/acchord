(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{13:function(e,t,a){e.exports=a.p+"static/media/album.27544c82.png"},14:function(e,t,a){e.exports=a.p+"static/media/track.91c3ee31.png"},15:function(e,t,a){e.exports=a(43)},21:function(e,t,a){},43:function(e,t,a){"use strict";a.r(t);var r=a(0),n=a.n(r),c=a(11),o=a.n(c),s=(a(20),a(21),a(1)),l=n.a.createContext(null);var m=function(){var e=Object(r.useContext)(l),t=e.user,a=e.setUser;return n.a.createElement("nav",{className:"navbar navbar-dark bg-dark navbar-expand px-3 justify-content-between"},n.a.createElement("h1",{className:"navbar-brand m-0",style:{fontFamily:"Montserrat, sans-serif"}},"acchord"),t.username&&t.token&&n.a.createElement("button",{type:"button",className:"btn btn-dark",onClick:function(){a({username:null,token:null}),localStorage.removeItem("acchordUsername"),localStorage.removeItem("token")}},"Sign Out"))},u=a(2),i=a.n(u),d=a(12),b=a(23),p=b.string().trim().min(1).max(50).required(),f=b.string().trim().min(1).max(1e3).required(),h=b.object({username:b.string().alphanum().min(3).max(30).required(),password:b.string().trim().min(8).max(20).pattern(/^[\S]*$/).required()});var v=function(){var e=Object(r.useContext)(l).setUser,t=Object(r.useState)(!1),a=Object(s.a)(t,2),c=a[0],o=a[1],m=Object(r.useState)(!0),u=Object(s.a)(m,2),b=u[0],p=u[1],f=Object(r.useState)(null),v=Object(s.a)(f,2),E=v[0],g=v[1],j=Object(r.useState)(""),k=Object(s.a)(j,2),w=k[0],O=k[1],y=Object(r.useState)(""),N=Object(s.a)(y,2),x=N[0],C=N[1],P=function(){var e=Object(d.a)(i.a.mark((function e(t){var a,r,n,o,s,l;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.prev=1,a=t.target.form.username.value,r=t.target.form.password.value,e.next=6,h.validate({username:a,password:r});case 6:if(n=e.sent,void 0!==(o=n.error)){e.next=13;break}g({username:a,password:r}),O(""),e.next=14;break;case 13:throw o;case 14:e.next=21;break;case 16:e.prev=16,e.t0=e.catch(1),s=e.t0.message.includes("username")?"username":"password",l=c?"Please make sure your ".concat(s," meets the requirements."):"Error with username or password.",O(l);case 21:case"end":return e.stop()}}),e,null,[[1,16]])})));return function(t){return e.apply(this,arguments)}}();return Object(r.useEffect)((function(){E&&c?fetch("".concat(S,"/auth/signup"),{method:"POST",body:JSON.stringify(E),headers:{"content-type":"application/json"}}).then((function(e){return e.ok?(g(null),C("Account created! Please log in."),o(!1),void p(!0)):e.json().then((function(e){throw new Error(e.message)}))})).catch((function(e){var t=e.message.includes("fetch")?"Something went wrong! Please try again later.":e.message;O(t)})):E&&b&&fetch("".concat(S,"/auth/login"),{method:"POST",body:JSON.stringify(E),headers:{"content-type":"application/json"}}).then((function(e){return e.ok?e.json():e.json().then((function(e){throw new Error(e.message)}))})).then((function(t){localStorage.token=t.token,localStorage.setItem("acchordUsername",E.username),e({username:E.username,token:t.token})})).catch((function(e){var t=e.message.includes("fetch")?"Something went wrong! Please try again later.":e.message;O(t)}))}),[E,c,b,e]),n.a.createElement("div",{className:"p-4 border border-dark rounded"},w&&n.a.createElement("div",{className:"alert alert-danger",role:"alert"},w),x&&n.a.createElement("div",{className:"alert alert-success",role:"alert"},x),c&&n.a.createElement("form",{id:"signUpForm"},n.a.createElement("h2",null,"Sign Up"),n.a.createElement("div",{className:"form-group"},n.a.createElement("label",{htmlFor:"username"},"Username"),n.a.createElement("input",{type:"username",className:"form-control",id:"username","aria-describedby":"usernameHelp",placeholder:"Enter a username"}),n.a.createElement("small",{id:"usernameHelp",className:"form-text text-muted"},"Must be 3 to 20 characters. Only letters or numbers.")),n.a.createElement("div",{className:"form-group"},n.a.createElement("label",{htmlFor:"password"},"Password"),n.a.createElement("input",{type:"password",className:"form-control",id:"password","aria-describedby":"passwordHelp",placeholder:"Enter a password"}),n.a.createElement("small",{id:"passwordHelp",className:"form-text text-muted"},"Must be 8 to 20 characters. No spaces.")),n.a.createElement("button",{type:"submit",form:"signUpForm",className:"btn-sm btn-dark",onClick:P},"Sign Up")),b&&n.a.createElement("form",{id:"logInForm"},n.a.createElement("h2",null,"Log In"),n.a.createElement("div",{className:"form-group"},n.a.createElement("label",{htmlFor:"username"},"Username"),n.a.createElement("input",{type:"username",className:"form-control",id:"username",placeholder:"Enter your username"})),n.a.createElement("div",{className:"form-group"},n.a.createElement("label",{htmlFor:"password"},"Password"),n.a.createElement("input",{type:"password",className:"form-control",id:"password",placeholder:"Enter your password"})),n.a.createElement("button",{type:"submit",form:"logInForm",className:"btn-sm btn-dark",onClick:P},"Log In"),n.a.createElement("div",{className:"w-100"}),n.a.createElement("button",{type:"button",className:"btn btn-link text-muted px-0",onClick:function(e){e.preventDefault(),p(!1),o(!0)}},"Sign up for an account")))};var E=function(e){var t=e.mediaName,a=e.mediaCreator,c=(e.mediaType,Object(r.useContext)(l).user,Object(r.useState)()),o=Object(s.a)(c,2),m=o[0],u=o[1],i=Object(r.useState)(!0),d=Object(s.a)(i,2),b=d[0],p=(d[1],Object(r.useState)("")),h=Object(s.a)(p,2),v=h[0],E=h[1],g=Object(r.useState)(""),j=Object(s.a)(g,2),k=j[0],w=(j[1],"Reviewing ".concat(t," by ").concat(a)),O=Object(r.useCallback)((function(e){e.preventDefault();var t=e.target.form.reviewtext.value,a=f.validate(t).error;if(void 0===a)u(t);else{var r=a.message.includes("1000")?"Please shorten your review to 1000 characters or less.":"Please check your review for errors.";E(r)}}),[u]);return Object(r.useEffect)((function(){m&&E(n.a.createElement("p",{className:"mb-0"},"Posting has been disabled! Instead, please see"," ",n.a.createElement("a",{href:"https://github.com/mbuccat/acchord"},"the code repository")," ","for a demo."))}),[m]),n.a.createElement("div",{className:"col-sm-12 p-4 border border-dark rounded"},k&&n.a.createElement("div",{className:"alert alert-success mb-0"},k),v&&n.a.createElement("div",{className:"alert alert-danger mb-0"},v),b&&n.a.createElement("div",{className:"ReviewForm"},n.a.createElement("h2",null,w),n.a.createElement("form",{id:"review-form"},n.a.createElement("textarea",{className:"form-control mb-1",id:"reviewtext",rows:"3",placeholder:"Your review"}),n.a.createElement("button",{type:"button",className:"btn btn-danger mr-1",onClick:function(e){e.preventDefault(),window.location.reload(!1)}},"Cancel"),n.a.createElement("button",{type:"submit",form:"review-form",className:"btn btn-dark",onClick:O},"Submit"))))};var g=function(e){var t=e.searchResults;return n.a.createElement("div",{className:"col-sm-12 p-4 border border-dark rounded"},n.a.createElement("ul",{className:"list-group list-unstyled"},n.a.createElement("h2",null,"Did you mean:"),t),n.a.createElement("button",{type:"button",className:"btn btn-danger",onClick:function(e){e.preventDefault(),window.location.reload(!1)}},"Cancel"))};var j=function(){var e=Object(r.useContext)(l).user,t=Object(r.useState)(),a=Object(s.a)(t,2),c=a[0],o=a[1],m=Object(r.useState)("Searching..."),u=Object(s.a)(m,2),i=u[0],d=u[1],b=Object(r.useState)("track"),f=Object(s.a)(b,2),h=f[0],v=f[1],j=Object(r.useState)("default"),k=Object(s.a)(j,2),w=k[0],O=k[1],y=Object(r.useState)("default"),N=Object(s.a)(y,2),x=N[0],C=N[1],P=Object(r.useState)(!0),U=Object(s.a)(P,2),I=U[0],q=U[1],F=Object(r.useState)(!1),D=Object(s.a)(F,2),T=D[0],J=D[1],M=Object(r.useState)(!1),R=Object(s.a)(M,2),H=R[0],A=R[1],L=Object(r.useState)(""),W=Object(s.a)(L,2),Y=W[0],B=W[1],V=Object(r.useCallback)((function(e){e.preventDefault();var t=e.target.query.value,a=p.validate(t).error;if(void 0===a)o(t);else{var r=a.message.includes("50")?"Please shorten your query.":"Please check your query.";B(r)}}),[o]),$=Object(r.useCallback)((function(e){e.preventDefault(),O(e.target.dataset.medianame),C(e.target.dataset.mediacreator),J(!1),A(!0)}),[O,C]),z=Object(r.useCallback)((function(e){var t=e.data;0===t.length?d(n.a.createElement("div",{className:"alert alert-danger"},"No matches found.")):d(t.map((function(e){return n.a.createElement("li",null,n.a.createElement("button",{type:"button",className:"btn btn-light mb-2 btn-sm w-100 text-left",onClick:$,"data-medianame":e.title,"data-mediacreator":e.artist.name},e.title," ","by"," ",e.artist.name))})))}),[d,$]);return Object(r.useEffect)((function(){c&&(q(!1),J(!0),B(""),fetch("".concat(S,"/api/search"),{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({query:c,mediaType:h,token:e.token})}).then((function(e){return e.ok?e.json():e.json().then((function(e){throw new Error(e.message)}))})).then((function(e){return z(e.jsonFromMusicApi)})).catch((function(e){B(e.message)})))}),[c,h,z,e.token]),n.a.createElement("div",null,I&&n.a.createElement("div",{className:"p-4 border border-dark rounded"},Y&&n.a.createElement("div",{className:"alert alert-danger"},Y),n.a.createElement("form",{onSubmit:V},n.a.createElement("h2",null,"I want to review:"),n.a.createElement("div",{className:"w-100"}),n.a.createElement("div",{className:"input-group"},n.a.createElement("div",{className:"input-group-prepend"},n.a.createElement("select",{className:"custom-select",onChange:function(e){v(e.target.value)}},n.a.createElement("option",{defaultValue:!0,value:"track"},"a track"),n.a.createElement("option",{value:"album"},"an album"))),n.a.createElement("input",{type:"string",className:"form-control",name:"query",placeholder:"Which ".concat(h,"?")})))),T&&n.a.createElement(g,{searchResults:i}),H&&n.a.createElement(E,{mediaName:w,mediaCreator:x,mediaType:h}))},k=a(13),w=a.n(k),O=a(14),y=a.n(O);var N=function(){var e=Object(r.useState)([]),t=Object(s.a)(e,2),a=t[0],c=t[1],o=Object(r.useState)(""),l=Object(s.a)(o,2),m=l[0],u=l[1];return Object(r.useEffect)((function(){fetch("".concat(S,"/api/reviews")).then((function(e){if(e.ok)return e.json();throw new Error("Request failed!")})).then((function(e){!function(e){c(e.reverse().map((function(e,t){var a=e.content,r=e.created,c=e.mediaCreator,o=e.mediaName,s=e.mediaType,l="".concat(o," by ").concat(c),m="track"===s?y.a:w.a;return n.a.createElement("li",{className:"media mb-5",key:t},n.a.createElement("img",{className:"mr-3",src:m,width:"50",height:"50",alt:"media type icon"}),n.a.createElement("div",{className:"media-body"},n.a.createElement("h5",{className:"mt-0 mb-1"},l),a," ",n.a.createElement("br",null),n.a.createElement("small",null,new Date(r).toLocaleString())))})))}(e.reviews)})).catch((function(){u("Unable to load reviews. You may be making too many requests.")}))}),[]),n.a.createElement("div",{className:"p-4 border border-dark rounded"},n.a.createElement("h2",{className:"mb-4"},"Recent reviews"),m&&n.a.createElement("div",{className:"alert alert-danger mb-0"},m),n.a.createElement("ul",{className:"list-unstyled"},a))},S="localhost"===window.location.hostname?"http://localhost:3001":"https://acchord.herokuapp.com";function x(){var e=Object(r.useState)({username:localStorage.getItem("acchordUsername"),token:localStorage.getItem("token")}),t=Object(s.a)(e,2),a=t[0],c=t[1],o=Object(r.useMemo)((function(){return{user:a,setUser:c}}),[a,c]);return Object(r.useEffect)((function(){a.token&&fetch("".concat(S,"/auth/token"),{method:"POST",body:JSON.stringify({token:a.token}),headers:{"content-type":"application/json"}}).then((function(e){if(!e.ok)throw new Error("Unable to verify token.")})).catch((function(){localStorage.removeItem("token"),localStorage.removeItem("acchordUsername"),c({username:null,token:null})}))}),[a.token,c]),n.a.createElement("div",{className:"App container-fluid p-0 m-0"},n.a.createElement(l.Provider,{value:o},n.a.createElement(m,null),a.username?n.a.createElement("div",{className:"row px-4 mt-3"},n.a.createElement("div",{className:"Welcome col-sm-12"},n.a.createElement("h1",{className:"mb-0"},"Welcome,"," ",a.username,"."))):n.a.createElement("div",null),n.a.createElement("div",{className:"row justify-content-center px-4 py-0"},n.a.createElement("div",{className:"col-12 order-12 col-lg-8 order-lg-1 pt-3"},n.a.createElement(N,null)),n.a.createElement("div",{className:"col-12 order-1 col-lg-4 order-lg-12 pt-3"},!a.username&&!a.token&&n.a.createElement(v,null),a.username&&a.token&&n.a.createElement(j,null)))))}o.a.render(n.a.createElement(n.a.StrictMode,null,n.a.createElement(x,null)),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.bcc2982a.chunk.js.map