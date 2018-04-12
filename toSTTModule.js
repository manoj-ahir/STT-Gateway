

let toModule = function(data){
    ws.on('open', function (data) {
        //console.log(data);
        ws.send('some stuff111');
    });    
    ws.close(); 
}

module.exports = {
    toModule: toModule
};