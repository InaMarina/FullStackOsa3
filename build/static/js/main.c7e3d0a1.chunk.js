(this.webpackJsonppuhelinluettelo=this.webpackJsonppuhelinluettelo||[]).push([[0],{17:function(e,n,t){e.exports=t(40)},39:function(e,n,t){},40:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),u=t(15),c=t.n(u),o=t(16),l=t(2),i=t(4),m=t.n(i),f="/api/persons",d=function(){return m.a.get(f).then((function(e){return e.data}))},h=function(e){return m.a.post(f,e).then((function(e){return e.data}))},s=function(e){return m.a.delete("".concat(f,"/").concat(e)).then((function(e){return e.data}))},v=function(e,n){return m.a.put("".concat(f,"/").concat(e),n).then((function(e){return e.data}))},b=function(e){var n=e.person;return r.a.createElement(r.a.Fragment,null,r.a.createElement("p",null,n.name," ",n.number))},g=function(e){var n=e.persons,t=e.onclick;return console.log(n),r.a.createElement(r.a.Fragment,null,r.a.createElement("ul",null,n.map((function(e){return r.a.createElement("div",{key:e.id},r.a.createElement(b,{person:e}),r.a.createElement("button",{onClick:function(){return t(e.id)}},"delete"))}))))},E=function(e){return r.a.createElement("div",null,e.text," ",r.a.createElement("input",{value:e.value,onChange:e.onChange}))},p=function(e){return r.a.createElement(r.a.Fragment,null,r.a.createElement("form",{onSubmit:e.onSubmit},r.a.createElement(E,{text:e.text1,value:e.value1,onChange:e.onChange1}),r.a.createElement(E,{text:e.text2,value:e.value2,onChange:e.onChange2}),r.a.createElement("button",{type:"submit"},"add")))},j=function(e){return r.a.createElement("div",null,e.text," ",r.a.createElement("input",{value:e.value,onChange:e.onChange}))},O=function(){var e=Object(a.useState)([]),n=Object(l.a)(e,2),t=n[0],u=n[1],c=Object(a.useState)(""),i=Object(l.a)(c,2),m=i[0],f=i[1],b=Object(a.useState)(""),E=Object(l.a)(b,2),O=E[0],C=E[1],w=Object(a.useState)(""),x=Object(l.a)(w,2),k=x[0],S=x[1],y=Object(a.useState)([]),D=Object(l.a)(y,2),F=D[0],A=D[1],J=Object(a.useState)(null),N=Object(l.a)(J,2),B=N[0],I=N[1];Object(a.useEffect)((function(){console.log("effect"),d().then((function(e){u(e),A(e)}))}),[]);var P=function(e){var n=e.message;return null===n?null:r.a.createElement("div",{className:"error"},n)};return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(P,{message:B}),r.a.createElement(j,{text:"filter shown with",value:k,onChange:function(e){if(S(e.target.value),e.target.value.length>0){var n=Object(o.a)(t).filter((function(n){return n.name.startsWith(e.target.value)}));A(n)}0===e.target.value.length&&A(t)}}),r.a.createElement("h2",null,"Add a new"),r.a.createElement(p,{onSubmit:function(e){e.preventDefault();var n={name:m,number:O};if(t.filter((function(e){return e.name===m})).length>0){if(window.confirm("".concat(m," is already added to phonebook, replace the number with a new one?"))){var a=t.find((function(e){return e.name===m}));v(a.id,{name:a.name,number:O}).then((function(e){u(t.map((function(n){return n.id!==a.id?n:e}))),I("Changed number of  ".concat(a.name)),f(""),C("")}))}}else h(n).then((function(e){return console.log(e)})),d().then((function(e){u(e),A(e),I("Added ".concat(m," to the phonebook")),setTimeout((function(){I(null)}),5e3)})),f(""),C("")},text1:"name: ",value1:m,onChange1:function(e){f(e.target.value)},text2:"number: ",value2:O,onChange2:function(e){C(e.target.value)}}),r.a.createElement("h2",null,"Numbers"),r.a.createElement(g,{persons:F,onclick:function(e){var n=t.find((function(n){return n.id===e}));window.confirm("Delete ".concat(n.name))&&s(e).then((function(a){u(t.filter((function(n){return n.id!==e}))),A(t.filter((function(n){return n.id!==e}))),I("Deleted ".concat(n.name))})).catch((function(){u(t.filter((function(n){return n.id!==e}))),I("".concat(n.name," had already been removed"),"error")}))}}))};t(39);c.a.render(r.a.createElement(O,null),document.getElementById("root"))}},[[17,1,2]]]);
//# sourceMappingURL=main.c7e3d0a1.chunk.js.map