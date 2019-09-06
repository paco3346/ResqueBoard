angular.module("app").controller("loadOverviewController",[function(){"use strict";var a=500,b=$("#chart"),c=20,d=45,e=35,f=35,g=b.width(),h=b.height(),i={},j=[],k=d3.select("#chart").append("svg").attr("width",g).attr("height",h),l=k.append("text").attr("x",g/2).attr("y",h/2).attr("text-anchor","center").text("Loading …"),m=k.append("g").attr("class","x-axis").attr("transform","translate("+f+","+(h-e)+")"),n=k.append("g").attr("class","y-axis").attr("transform","translate("+(f-5)+","+c+")"),o=k.append("g").attr("class","y-axis right").attr("transform","translate("+(g-d+5)+","+c+")"),p=d3.svg.axis().orient("bottom").tickSize(-h+c-5+e,3,0).tickPadding(7),q=d3.svg.axis().tickSize(-g+f+d-5,3,0).orient("left").tickFormat(d3.format("s")).tickPadding(7),r=d3.svg.axis().orient("right").tickPadding(7),s={axis:{left:q,right:r,bottom:p},max:{left:{},right:{}}},t=k.append("g").attr("width",g-f+d).attr("height",h-c+e).attr("transform","translate("+f+","+c+")");k.append("text").attr("x",-90).attr("y",f+10).attr("transform","rotate(-90)").style("text-anchor","left").text("Jobs number").attr("class","graph-legend"),k.append("text").attr("x",-c).attr("y",g-f-10).attr("transform","rotate(-90)").style("text-anchor","end").text("Processing time in ms").attr("class","graph-legend");var u=function(a){var b=a.data("startDate"),c=a.data("endDate"),d=a.data("step");d3.json("//"+CUBE_URL+"/1.0/metric/get?expression=sum(got)&start="+encodeURIComponent(b)+"&stop="+encodeURIComponent(c)+"&step="+d,function(a){l.remove(),j=a.map(function(a){return{time:new Date(a.time),value:0}}),a=a.map(function(a){return{time:new Date(a.time),value:a.value}}),s.max.left.processed={value:d3.max(a.map(function(a){return a.value})),status:1};var b=t.append("path").datum(a).attr("class","graph-line").attr("id","g-line-processed"),c=t.append("path").datum(a).attr("class","graph-area").attr("id","g-area-got");i.processed={line:b,area:c,data:a,yAxis:"left"},x(i.processed)})},v=function(b,c,d,e,f,g){return i.hasOwnProperty(f)?(s.max[g][f].status=1,i[f].line.datum(i[f].data),i[f].area.datum(i[f].data),i[f].line.transition().duration(a).style("opacity",1),void x(i[f])):void d3.json("//"+CUBE_URL+"/1.0/metric/get?expression="+e+"&start="+encodeURIComponent(b)+"&stop="+encodeURIComponent(c)+"&step="+d,function(a){a=a.map(function(a){return{time:new Date(a.time),value:a.value}}),s.max[g][f]={value:d3.max(a.map(function(a){return a.value})),status:1};var b=t.append("path").datum(a).attr("class","graph-line").attr("id","g-line-"+f),c=t.append("path").attr("class","graph-area").attr("id","g-area-"+f);"right"!==g?c.datum(a):c.datum(j),i[f]={line:b,area:c,data:a,yAxis:g},x(i[f])})},w=function(a){i.hasOwnProperty(a)&&(i[a].line.datum(j),i[a].area.datum(j),s.max[i[a].yAxis][a].status=0,x(i[a]))},x=function(b){function j(b){b.transition().duration(a).attr("d",t)}function k(c){i[c].yAxis===b.yAxis&&(i[c].area.transition().duration(a).attr("d",r),0===s.max[i[c].yAxis][c].status?(i[c].line.call(j),i[c].line.transition().delay(a).duration(100).style("opacity",0)):(i[c].line.style("opacity",1),i[c].line.call(j)))}var l=d3.scale.linear().domain([0,1.25*d3.max(d3.values(s.max[b.yAxis]).map(function(a){return 1===a.status?a.value:0}))]).range([h-c-e,0]),q=d3.time.scale().domain([b.data[0].time,b.data[b.data.length-1].time]).range([0,g-f-d]),r=d3.svg.area().x(function(a){return q(a.time)}).y0(function(){return h-e-c}).y1(function(a){return l(a.value)}),t=d3.svg.line().x(function(a){return q(a.time)}).y(function(a){return l(a.value)});for(var u in i)i.hasOwnProperty(u)&&k(u);p.scale(q),s.axis[b.yAxis].scale(l),"left"===b.yAxis?n.transition().duration(a).call(s.axis[b.yAxis]):o.transition().duration(a).call(s.axis[b.yAxis]),m.transition().duration(a).call(p)};u($("#date-range .active a")),$("#type-range").on("click","a",function(a){a.preventDefault();var b=$(this),c=$(this).parent().find("i");b.hasClass("active")?(w(b.data("type")),b.removeClass("active"),c.removeClass("icon-check"),c.addClass("icon-check-empty")):(b.addClass("active"),v(b.data("startDate"),b.data("endDate"),b.data("step"),b.data("expression"),b.data("type"),b.data("axis")),c.removeClass("icon-check-empty"),c.addClass("icon-check"))}),$(".date-range-form").on("click","button",function(a){a.preventDefault();var b=$(this).parents("form"),c={hour:"0",day:"1",month:"1",year:""},d="";"week"===$(this).data("range")?d=b.find("select option:selected").val():(b.find("select[name=range-hour]").length>0&&(c.hour=b.find("select[name=range-hour] option:selected").val()),b.find("select[name=range-day]").length>0&&(c.day=b.find("select[name=range-day] option:selected").val()),c.month=b.find("select[name=range-month] option:selected").val(),c.year=b.find("input[name=range-year]").val(),d=c.year+"-"+c.month+"-"+c.day+"T"+c.hour+":00:00"),window.location=b.attr("action")+$(this).data("range")+"/"+d})}]);