angular.module("app").directive("graphHorizonChart",function(){"use strict";return{restrict:"E",template:"<div></div>",replace:!0,scope:{workers:"=",length:"="},link:function(a,b){var c=cubism.context().size(466),d=c.cube("//"+CUBE_URL),e=c.horizon().metric(d.metric).height(b.parent().parent().height()),f=[],g=function(){f=[],b.empty();for(var d in a.workers)f.push('sum(done.eq(worker, "'+a.workers[d].id+'"))');d3.select(b[0]).selectAll(".horizon").data(f).enter().append("div").attr("class","horizon").call(e.extent([-180,180]).title(null)),d3.select(b[0]).append("div").attr("class","rule").call(c.rule()),d3.select(b[0]).append("div").attr("class","axis").call(c.axis().orient("bottom").ticks(d3.time.minutes,10).tickSize(6,3,0).tickFormat(d3.time.format("%H:%M")))};g(),a.$watch("length",function(a,b){a!==b&&g()})}}});