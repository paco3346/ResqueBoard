angular.module("app").directive("iconJob",function(){"use strict";var a={1:{icon:"job_waiting.png",name:"Pending"},2:{icon:"job_running.png",name:"Running"},3:{icon:"job_failed.png",name:"Failed"},4:{icon:"job_complete.png",name:"Completed"},63:{icon:"job_scheduled.png",name:"Scheduled"}};return{restrict:"E",template:"<img height=24 width=24 />",replace:!0,scope:{status:"="},link:function(b,c){c.attr("src","img/"+a[b.status].icon),c.attr("title",a[b.status].name+" job")}}});