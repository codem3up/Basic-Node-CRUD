module.exports = function(ws){
    var server = ws.createServer(function (conn) {
      
       ws.myConnections.push(conn);
       
	   console.log("New connection:")
       conn.on("text", function (str) {
           console.log("Received " + str)
           for(var i = 0; i < ws.myConnections.length; i++){
               ws.myConnections[i].sendText(str);
           }
	   })
    
       conn.on("close", function (code, reason) {
           console.log("Connection closed")
	   })
    
    }).listen(8001)
}