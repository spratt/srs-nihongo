(this["webpackJsonpsrs-nihongo"]=this["webpackJsonpsrs-nihongo"]||[]).push([[0],{22:function(e,t,n){e.exports=n.p+"static/media/data.f9e1437d.yaml"},29:function(e,t,n){e.exports=n(63)},34:function(e,t,n){},63:function(e,t,n){"use strict";n.r(t);var s=n(0),r=n.n(s),a=n(19),i=n.n(a),o=(n(34),n(26)),u=n(6),c=n(7),l=n(27),h=n(28),f=n(2),m=n(3),d=n(20),p=n.n(d),v=n(21);function k(e,t){if(e.length<t)return e;for(var n,s=e.slice(),r=[];r.length<t;){var a=(n=s.length,Math.floor(Math.random()*Math.floor(n)));r.push(s[a]),s.splice(a,1)}return r}function w(e){return k(e,e.length)}var y=new Date(864e13),b=function(){function e(){Object(u.a)(this,e)}return Object(c.a)(e,[{key:"nextQuestion",value:function(){return"Not implemented"}},{key:"feedback",value:function(e,t){}},{key:"isReady",value:function(){return!1}},{key:"whenReady",value:function(){return y}}]),e}(),Q=function(){function e(t){Object(u.a)(this,e),this.promptValues=void 0,this.promptValues=w(t).map((function(e){return{prompt:e,value:1}}))}return Object(c.a)(e,[{key:"nextQuestion",value:function(){return this.promptValues[0].prompt}},{key:"findPromptValue",value:function(e){var t=this.promptValues.filter((function(t){return t.prompt===e}));return 0===t.length?null:t[0]}},{key:"feedback",value:function(e,t){var n=this.findPromptValue(e);if(null!==n){var s=n;s.value*=t?1.1:.9,this.promptValues.sort((function(e,t){return e.value-t.value})),console.dir(this.promptValues)}}},{key:"isReady",value:function(){return!0}},{key:"whenReady",value:function(){return new Date}}]),e}(),E=n(22),g=n.n(E);function C(){var e=Object(f.a)([""]);return C=function(){return e},e}function x(){var e=Object(f.a)([""]);return x=function(){return e},e}function j(){var e=Object(f.a)(["\n  font-size: 2rem;\n  width: 100%;\n  background-color: orangered;\n"]);return j=function(){return e},e}function q(){var e=Object(f.a)(["\n  font-size: 2rem;\n  width: 100%;\n  background-color: lightgreen;\n"]);return q=function(){return e},e}function O(){var e=Object(f.a)(["\n  font-size: 2rem;\n  width: 100%;\n"]);return O=function(){return e},e}function A(){var e=Object(f.a)(["\n  padding-left: 1rem;\n  font-size: 1.5em;\n  color: palevioletred;\n"]);return A=function(){return e},e}function S(){var e=Object(f.a)(["\n  @media screen and (min-width: 48rem) {\n  width: 48rem;\n  margin: 0 auto;\n  }\n"]);return S=function(){return e},e}var M=String.fromCodePoint(127881),P=m.a.div(S()),V=m.a.h1(A()),R=m.a.button(O()),z=m.a.button(q()),L=m.a.button(j()),W=m.a.h2(x()),D=m.a.h3(C());function B(e){return r.a.createElement("div",null,r.a.createElement("div",null,"Correct: ",e.correct),r.a.createElement("div",null,"Answered: ",e.answered))}var G=function(e){Object(h.a)(n,e);var t=Object(l.a)(n);function n(e){var s,r,a;return Object(u.a)(this,n),(s=t.call(this,e)).questionPicker=void 0,s.mounted=!1,console.log("new App()"),s.questionPicker=new b,(r="GET",a=g.a,new Promise((function(e,t){var n=new XMLHttpRequest;n.withCredentials=!0,n.addEventListener("load",(function(){200===n.status?e(n):t(n)})),n.addEventListener("error",(function(){t(n)})),n.addEventListener("abort",(function(){t(n)})),n.open(r,a),n.send()}))).then((function(e){var t=p.a.load(e.response);s.setQuestions(30,t.facts)})).catch((function(e){return console.error(e)})),s.state={facts:{},responses:[],question:n.emptyQuestion,maxQuestions:0,numCorrect:0,numAnswered:0,seenSet:{}},s}return Object(c.a)(n,[{key:"componentDidMount",value:function(){this.mounted=!0}},{key:"decMaxQuestions",value:function(){this.state.maxQuestions-1<4||this.setQuestions(this.state.maxQuestions-1,this.state.facts)}},{key:"incMaxQuestions",value:function(){this.state.maxQuestions+1>Object.keys(this.state.facts).length||this.setQuestions(this.state.maxQuestions+1,this.state.facts)}},{key:"setQuestions",value:function(e,t){var s=Object.keys(t).slice(0,e);this.questionPicker=new Q(s);var r=s.map((function(e){return t[e].response}));if(this.mounted){var a={facts:t,responses:r,question:n.emptyQuestion,maxQuestions:e,seenSet:{}};this.setState(a)}else this.state={facts:t,responses:r,question:n.emptyQuestion,maxQuestions:e,numCorrect:this.state.numCorrect,numAnswered:this.state.numAnswered,seenSet:{}};this.nextQuestion({})}},{key:"nextQuestion",value:function(e){if(0!==Object.keys(this.state.facts).length&&this.questionPicker.isReady()){var t=this.questionPicker.nextQuestion(),n=this.state.facts[t],s=[n.response],r=this.state.responses.filter((function(e){return e!==n.response}));s.push.apply(s,Object(o.a)(k(r,3)));var a=v.clone(e);a[n.prompt]={},this.mounted?this.setState({question:{fact:n,responses:w(s)},answer:void 0,seenSet:a}):this.state={facts:this.state.facts,responses:this.state.responses,question:{fact:n,responses:w(s)},maxQuestions:this.state.maxQuestions,numCorrect:this.state.numCorrect,numAnswered:this.state.numAnswered,seenSet:a,answer:void 0}}}},{key:"handleClick",value:function(e){if(null===this.state.answer||void 0===this.state.answer){this.setState({answer:e});var t=this.state.numAnswered+1,n=this.state.numCorrect;e===this.state.question.fact.response?(this.questionPicker.feedback(this.state.question.fact.prompt,!0),n++):this.questionPicker.feedback(this.state.question.fact.prompt,!1),this.setState({numAnswered:t,numCorrect:n})}}},{key:"hasAnswered",value:function(){return null!==this.state.answer&&void 0!==this.state.answer}},{key:"isCorrectAnswer",value:function(e){return e===this.state.question.fact.response}},{key:"isWrongAnswer",value:function(e){return this.state.answer===e&&e!==this.state.question.fact.response}},{key:"renderCard",value:function(){var e=this,t=this.state.question.responses.map((function(t,n){return e.hasAnswered()?e.isCorrectAnswer(t)?r.a.createElement(z,{key:n,onClick:function(){return e.nextQuestion(e.state.seenSet)}},t):e.isWrongAnswer(t)?r.a.createElement(L,{key:n,onClick:function(){return e.nextQuestion(e.state.seenSet)}},t):r.a.createElement(R,{key:n,onClick:function(){return e.nextQuestion(e.state.seenSet)}},t):r.a.createElement(R,{key:n,onClick:function(){return e.handleClick(t)}},t)}));return r.a.createElement("div",null,r.a.createElement(W,null,this.state.question.fact.prompt),t)}},{key:"renderMnemonic",value:function(){if(!this.hasAnswered())return r.a.createElement(D,null);var e="";return e=this.isCorrectAnswer(this.state.answer||"")?M+M+M+"Great job!"+M+M+M:"Try to remember: "+this.state.question.fact.mnemonic,r.a.createElement(D,null,e)}},{key:"render",value:function(){var e=this,t=Object.keys(this.state.seenSet).length,n=Object.keys(this.state.facts).length;return r.a.createElement(P,null,r.a.createElement("header",null,r.a.createElement(V,null,"S.R.S. \u65e5\u672c\u8a9e")),r.a.createElement(B,{answered:this.state.numAnswered,correct:this.state.numCorrect}),r.a.createElement("div",null,r.a.createElement("span",null,"Seen ",t," / "),r.a.createElement("button",{onClick:function(){return e.decMaxQuestions()}},"-"),r.a.createElement("span",null,this.state.maxQuestions),r.a.createElement("button",{onClick:function(){return e.incMaxQuestions()}},"+"),r.a.createElement("span",null," / ",n," total")),this.renderCard(),this.renderMnemonic())}}]),n}(r.a.Component);G.emptyQuestion={fact:{prompt:"",response:"",related:[],mnemonic:""},responses:[]};var J=G;Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(J,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[29,1,2]]]);
//# sourceMappingURL=main.69959f46.chunk.js.map