var WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({ port: 8181 });
   var waitUser=[];
wss.on('connection', function (ws) {
    console.log('client connected');
    ws.on('message', function (message) {
        waitUser.push({ "message": message, "ws": ws });
        ws.send("开始匹配");
        if(waitUser.length>=2){
            for (let i =waitUser.length-1; i >=0;i-=2) {
                waitUser[i].ws.send("与"+waitUser[i-1].message+"匹配成功");
                waitUser[i-1].ws.send("与"+waitUser[i].message+"匹配成功");
                waitUser.pop();
                waitUser.pop();
            }
        }
        console.log(waitUser);
    });
});