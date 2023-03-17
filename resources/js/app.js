document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var sidenav = M.Sidenav.init(elems);
  });

  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.dropdown-trigger');
    var instances = M.Dropdown.init(elems);
  });


  

 // // let name;

// // do {
// //    name = prompt("Enter Your Name")
// // } while (!name);


// const textarea = document.querySelector("#textarea")
// const sub = document.querySelector(".send")
// const chat = document.querySelector(".chat")


// sub.addEventListener("click",()=>{
//     sandMassgae(textarea.value)
//     textarea.value = ""
// })


// const sandMassgae = (massage) =>{
//     let msg ={
//         name:name,
//         massage
//     }

//     // append mag in Dom
//     appundMassage(msg, "outgoing")

//     // send to server via socket
//     socket.emit("massage",msg)
// }


// const appundMassage = (msg,type) =>{
//     let newDev = document.createElement('div')
//     newDev.classList.add(type,"chat-box")
    
//     let markup = `
//     <h4> ${msg.name}</h4>
//     <p>${msg.massage}</p>     
//     `
//     newDev.innerHTML = markup;
//     chat.prepend(newDev) 
// }


// // Receved massage form server

// socket.on("massage",(msg)=>{
//     appundMassage(msg,"incoming")
// })


// // Typing Status
// const typing = document.querySelector(".typing")
// console.log(typing.innerText);

// textarea.addEventListener("keyup",(e)=>{
//     socket.emit("typing",{name})
// })

// socket.on("typing",(data)=>{
//     typing.innerHTML = `<b>${data.name}</b> is typing...`
//     typingStatusUpdate(()=>{
//         typing.innerHTML = ""
//     },1000)
// })

// let typingTime = null

// const typingStatusUpdate =(func,time)=>{

//     if(typingTime){
//         clearTimeout(typingTime)
//     }

//     typingTime =  setTimeout(() => {
//         func()
//     }, time);
// }



