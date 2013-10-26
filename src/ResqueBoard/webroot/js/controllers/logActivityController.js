angular.module("app").controller("logActivityController",[function(){"use strict";function a(a){var c=new WebSocket("ws://"+CUBE_URL+"/1.0/event/get");c.onopen=function(){c.send(JSON.stringify({expression:l[a].expression,start:formatISO(e)}))},c.onmessage=function(c){b(a,JSON.parse(c.data))}}function b(a,b){$("input[data-rel="+n[b.data.level].name+"]").is(":checked")&&($("#log-area").append($("#log-template").render(p(a,b))),f.verbosity.hasOwnProperty(n[b.data.level].name)||g("verbosity",n[b.data.level].name,$("#log-sweeper-form span[data-rel="+n[b.data.level].name+"]")),f.type.hasOwnProperty([a])||g("type",a,$("#log-sweeper-form span[data-rel="+a+"]")),h("verbosity",n[b.data.level].name,1),h("type",a,1),h("general","g",1))}function c(a){return"string"==typeof a?a.replace(new RegExp("(\\.|:)","gm"),""):void 0}function d(a){return"string"==typeof a?+a.replace(/,/g,""):void 0}var e=new Date(Date.now()),f={general:{g:$("[data-rel=log-counter]")},type:{},verbosity:{}},g=function(a,b,c){f[a][b]=c},h=function(a,b,c){var e=f[a][b];e.html(d(e.html())+c)},i=function(a,b,c){var e=f[a][b],g=d(e.html());g-c>=0&&e.html(g-c)},j=function(a){a.each(function(){var a=$(this);i("type",a.data("type"),1),i("verbosity",a.data("verbosity"),1),i("general","g",1)})},k=function(){for(var a in f)if(f.hasOwnProperty(a))for(var b in f[a])f[a].hasOwnProperty(b)&&f[a][b].html(0)},l={sleep:{expression:"sleep",format:function(a){return"for "+a.second+" seconds"}},got:{expression:"got",format:function(a){return'job <a href="/jobs/view?job_id='+a.args.payload.id+'" rel="contents" title="View job details">#'+a.args.payload.id+"</a>"}},process:{expression:"process",format:function(a){return'job <a href="/jobs/view?job_id='+a.job_id+'" rel="contents" title="View job details">#'+a.job_id+"</a>"}},fork:{expression:"fork",format:function(a){return'job <a href="/jobs/view?job_id='+a.job_id+'" rel="contents" title="View job details">#'+a.job_id+"</a>"}},done:{expression:"done",format:function(a){return'job <a href="/jobs/view?job_id='+a.job_id+'" rel="contents" title="View job details">#'+a.job_id+"</a>"}},fail:{expression:"fail",format:function(a){return'job <a href="/jobs/view?job_id='+a.job_id+'" rel="contents" title="View job details">#'+a.job_id+"</a>"}},start:{expression:"start",format:function(a){return"worker #"+a.worker}},stop:{expression:"shutdown",format:function(a){return"worker #"+a.worker}},pause:{expression:"pause",format:function(a){return"worker #"+a.worker}},resume:{expression:"resume",format:function(a){return"worker #"+a.worker}},prune:{expression:"prune",format:function(a){return"worker #"+a.worker}}};for(var m in l)l.hasOwnProperty(m)&&a(m);var n={100:{name:"debug",classStyle:"label-success"},200:{name:"info",classStyle:"label-info"},300:{name:"warning",classStyle:"label-warning"},400:{name:"error",classStyle:"label-important"},500:{name:"critical",classStyle:"label-inverse"},550:{name:"alert",classStyle:"label-inverse"}},o={},p=function(a,b){return{time:b.time,hourTime:moment(b.time).format("H:mm:ss"),action:a,levelName:n[b.data.level].name,levelClass:n[b.data.level].classStyle,detail:l[a].format(b.data),worker:b.data.worker,workerClass:c(b.data.worker),color:q(b)}},q=function(a){return void 0===o[a.data.worker]&&(o[a.data.worker]=r[Object.keys(o).length]),o[a.data.worker]},r=["#1f77b4","#aec7e8","#ff7f0e","#ffbb78","#2ca02c","#98df8a","#d62728","#ff9896","#9467bd","#c5b0d5","#8c564b","#c49c94","#e377c2","#f7b6d2","#7f7f7f","#c7c7c7","#bcbd22","#dbdb8d #","17becf","#9edae5"];$("#clear-log-area").on("click",function(){$("#log-area").children().remove(),k()}),$("#log-filter-form").on("change","input",function(){var a=$(this).data("rel");$("#log-area").append('<li class="filter-event"><b>'+($(this).is(":checked")?"Start":"Stop")+"</b> listening to <em>"+a+"</em> events</li>");var b=$.cookie("ResqueBoard.mutedLevel",{path:"/logs"});if(b=b.split(","),$(this).is(":checked")){var c=b.indexOf(a);-1!==c&&b.splice(c,1)}else b[b.length]=a;$.cookie("ResqueBoard.mutedLevel",b.join(","),{expires:365,path:"/logs"})}),$("#log-sweeper-form").on("click","button[data-rel=verbosity]",function(){var a=$("#log-area").children("li[data-verbosity="+$(this).data("level")+"]");return j(a),a.remove(),!1}),$("#log-sweeper-form").on("click","button[data-rel=type]",function(){var a=$("#log-area").children("li[data-type="+$(this).data("type")+"]");return j(a),a.remove(),!1})}]);