import {WebSocketServer,WebSocket} from 'ws'

const wss = new WebSocketServer({port:8080});
interface User{
    socket:WebSocket;
    room:string;
}
let allsocket:User[]=[];
wss.on("connection" , (socket)=>{
   
    socket.on("message",(message)=>{
        const parsedMessage=JSON.parse(message.toString());
        console.log(parsedMessage);
        if(parsedMessage.type=="join"){
            allsocket.push({
                socket,
                room:parsedMessage.payload.roomId
            })
        }
        if(parsedMessage.type=="chat"){
            let currentRoom=null;
            for(let i=0;i<allsocket.length;i++){
                if(allsocket[i]!.socket==socket){
                    currentRoom=allsocket[i]!.room
                }
            }
            for(let i=0;i<allsocket.length;i++){
                if(allsocket[i]!.room== currentRoom){
                    const client=allsocket[i]!.socket
                    client.send(parsedMessage.payload.message);
                }
            }
        }
       
    })


    
   socket.on("close", () => {
    allsocket = allsocket.filter(u => u.socket !== socket);
   });

    
})
