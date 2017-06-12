jsPlumb.ready(function(){
    jsPlumb.bind('connection',function(info){
        alert("Connected");
    });
});

$(document).ready(function(){
    alert("Load");
});