(this["webpackJsonpsrs-nihongo"]=this["webpackJsonpsrs-nihongo"]||[]).push([[0],{22:function(e,t,n){e.exports=n.p+"static/media/data.f9e1437d.yaml"},29:function(e,t,n){e.exports=n(63)},34:function(e,t,n){},63:function(e,t,n){"use strict";n.r(t);var r=n(0),s=n.n(r),a=n(19),o=n.n(a),i=(n(34),n(26)),u=n(6),c=n(7),l=n(27),f=n(28),h=n(2),d=n(3),m=n(20),p=n.n(m),v=n(21);function k(e,t){if(e.length<t)return e;for(var n,r=e.slice(),s=[];s.length<t;){var a=(n=r.length,Math.floor(Math.random()*Math.floor(n)));s.push(r[a]),r.splice(a,1)}return s}function w(e){return k(e,e.length)}var y=new Date(864e13),b=function(){function e(){Object(u.a)(this,e)}return Object(c.a)(e,[{key:"nextQuestion",value:function(){return"Not implemented"}},{key:"feedback",value:function(e,t){}},{key:"isReady",value:function(){return!1}},{key:"whenReady",value:function(){return y}}]),e}(),g=function(){function e(t){Object(u.a)(this,e),this.promptValues=void 0,this.promptValues=w(t).map((function(e){return{prompt:e,value:1}}))}return Object(c.a)(e,[{key:"nextQuestion",value:function(){return this.promptValues[0].prompt}},{key:"findPromptValue",value:function(e){var t=this.promptValues.filter((function(t){return t.prompt===e}));return 0===t.length?null:t[0]}},{key:"feedback",value:function(e,t){var n=this.findPromptValue(e);if(null!==n){var r=n;r.value*=t?1.1:.9,this.promptValues.sort((function(e,t){return e.value-t.value})),console.dir(this.promptValues)}}},{key:"isReady",value:function(){return!0}},{key:"whenReady",value:function(){return new Date}}]),e}(),E=n(22),j=n.n(E);function q(){var e=Object(h.a)([""]);return q=function(){return e},e}function C(){var e=Object(h.a)([""]);return C=function(){return e},e}function O(){var e=Object(h.a)(["\n  font-size: 2rem;\n  width: 100%;\n  background-color: orangered;\n"]);return O=function(){return e},e}function A(){var e=Object(h.a)(["\n  font-size: 2rem;\n  width: 100%;\n  background-color: lightgreen;\n"]);return A=function(){return e},e}function Q(){var e=Object(h.a)(["\n  font-size: 2rem;\n  width: 100%;\n"]);return Q=function(){return e},e}function x(){var e=Object(h.a)(["\n  padding-left: 1rem;\n  font-size: 1.5em;\n  color: palevioletred;\n"]);return x=function(){return e},e}function S(){var e=Object(h.a)(["\n  @media screen and (min-width: 48rem) {\n  width: 48rem;\n  margin: 0 auto;\n  }\n"]);return S=function(){return e},e}var P=String.fromCodePoint(127881),V=d.a.div(S()),M=d.a.h1(x()),R=d.a.button(Q()),z=d.a.button(A()),L=d.a.button(O()),W=d.a.h2(C()),B=d.a.h3(q());function D(e){return s.a.createElement("div",null,s.a.createElement("div",null,"Correct: ",e.correct),s.a.createElement("div",null,"Answered: ",e.answered),s.a.createElement("div",null,"Seen: ",e.seen,"/",e.total))}var G=function(e){Object(f.a)(n,e);var t=Object(l.a)(n);function n(e){var r,s,a;return Object(u.a)(this,n),(r=t.call(this,e)).questionPicker=void 0,console.log("new App()"),r.questionPicker=new b,(s="GET",a=j.a,new Promise((function(e,t){var n=new XMLHttpRequest;n.withCredentials=!0,n.addEventListener("load",(function(){200===n.status?e(n):t(n)})),n.addEventListener("error",(function(){t(n)})),n.addEventListener("abort",(function(){t(n)})),n.open(s,a),n.send()}))).then((function(e){var t=p.a.load(e.response),s=Object.keys(t.facts);r.questionPicker=new g(s);var a=s.map((function(e){return t.facts[e].response}));r.state={facts:t.facts,responses:a,question:n.emptyQuestion,numCorrect:0,numAnswered:0,seenSet:{}},r.nextQuestion()})).catch((function(e){return console.error(e)})),r.state={facts:{},responses:[],question:n.emptyQuestion,numCorrect:0,numAnswered:0,seenSet:{}},r}return Object(c.a)(n,[{key:"nextQuestion",value:function(){if(console.log("nextQuestion() called"),0!==Object.keys(this.state.facts).length)if(this.questionPicker.isReady()){console.log("nextQuestion() this.state"),console.dir(this.state);var e=this.questionPicker.nextQuestion(),t=this.state.facts[e],n=[t.response],r=this.state.responses.filter((function(e){return e!==t.response}));n.push.apply(n,Object(i.a)(k(r,3)));var s=v.clone(this.state.seenSet);s[t.prompt]={};var a={facts:this.state.facts,responses:this.state.responses,question:{fact:t,responses:w(n)},answer:void 0,seenSet:s};console.log("nextQuestion() new state"),console.dir(a),this.setState(a)}else console.log("this.questionPicker isn't ready");else console.log("nextQuestion() empty facts")}},{key:"handleClick",value:function(e){if(null===this.state.answer||void 0===this.state.answer){this.setState({answer:e});var t=this.state.numAnswered+1,n=this.state.numCorrect;e===this.state.question.fact.response?(this.questionPicker.feedback(this.state.question.fact.prompt,!0),n++):this.questionPicker.feedback(this.state.question.fact.prompt,!1),this.setState({numAnswered:t,numCorrect:n})}}},{key:"hasAnswered",value:function(){return null!==this.state.answer&&void 0!==this.state.answer}},{key:"isCorrectAnswer",value:function(e){return e===this.state.question.fact.response}},{key:"isWrongAnswer",value:function(e){return this.state.answer===e&&e!==this.state.question.fact.response}},{key:"renderCard",value:function(){var e=this,t=this.state.question.responses.map((function(t,n){return e.hasAnswered()?e.isCorrectAnswer(t)?s.a.createElement(z,{key:n,onClick:function(){return e.nextQuestion()}},t):e.isWrongAnswer(t)?s.a.createElement(L,{key:n,onClick:function(){return e.nextQuestion()}},t):s.a.createElement(R,{key:n,onClick:function(){return e.nextQuestion()}},t):s.a.createElement(R,{key:n,onClick:function(){return e.handleClick(t)}},t)}));return s.a.createElement("div",null,s.a.createElement(W,null,this.state.question.fact.prompt),t)}},{key:"renderMnemonic",value:function(){if(!this.hasAnswered())return s.a.createElement(B,null);var e="";return e=this.isCorrectAnswer(this.state.answer||"")?P+P+P+"Great job!"+P+P+P:"Try to remember: "+this.state.question.fact.mnemonic,s.a.createElement(B,null,e)}},{key:"render",value:function(){return s.a.createElement(V,null,s.a.createElement("header",null,s.a.createElement(M,null,"S.R.S. \u65e5\u672c\u8a9e")),s.a.createElement(D,{answered:this.state.numAnswered,correct:this.state.numCorrect,seen:Object.keys(this.state.seenSet).length,total:Object.keys(this.state.facts).length}),this.renderCard(),this.renderMnemonic())}}]),n}(s.a.Component);G.emptyQuestion={fact:{prompt:"",response:"",related:[],mnemonic:""},responses:[]};var J=G;Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(s.a.createElement(s.a.StrictMode,null,s.a.createElement(J,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[29,1,2]]]);
//# sourceMappingURL=main.3f51c769.chunk.js.map