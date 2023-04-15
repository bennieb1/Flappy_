/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Other/javascript.js to edit this template
 */


let moveSpeed = 3;

let gravity = .4;

let bird = document.querySelector('.bird');

let birdProps = bird.getBoundingClientRect();

let background = document.querySelector('.background').getBoundingClientRect();

let scoreValue = document.querySelector('.scoreValue');

let mesg = document.querySelector('.mesg');

let scoreTitle = document.querySelector('.scoreTitle');

let gameState = 'Start';

document.addEventListener('keydown', (e) => {
    
    if(e.key == 'Enter' && gameState != 'play'){
        
        document.querySelectorAll('.pipes').forEach((e)=>{
           e.remove(); 
        });
        bird.style.top = '40vh';
        gameState = 'Play';
        mesg.innerHTML = '';
        scoreTitle.innerHTML = 'SCORE :';
        scoreValue.innerHTML = '0';
        play();
        
    }
    
});

function play(){
     function applyGravity(){
        
        if(gameState!= 'Play') return;
        birdDie = birdDie + gravity;
        document.addEventListener('keydown', (e)=>{
           
           if(e.key == 'ArrowUp' || e.key ==''){
               birdDie = -6.7;
           }
            
        });
        if (birdProps.top <= 0 ||
        birdProps.bottom >= background.bottom) {
      gameState = 'End';
      mesg.innerHTML = 'Press Enter To Restart';
      mesg.style.left = '28vw';
      return;
    }
     bird.style.top = birdProps.top + birdDie + 'px';
    birdProps = bird.getBoundingClientRect();
    requestAnimationFrame(applyGravity);
    }
    requestAnimationFrame(applyGravity);
    
    let pipeSep = 0;
    
    let pipeGap = 40;
    
    function createPipe(){
        
          if (gameState != 'Play') return;
      
    // Create another set of pipes
    // if distance between two pipe has exceeded
    // a predefined value
    if (pipeSep > 110) {
      pipeSep = 0;
        
      // Calculate random position of pipes on y axis
      let pipePost = Math.floor(Math.random() * 44) + 8;
      let pipesInv = document.createElement('div');
      pipesInv.className = 'pipes';
      pipesInv.style.top = pipePost - 75 + 'vh';
      pipesInv.style.left = '100vw';
        
      // Append the created pipe element in DOM
      document.body.appendChild(pipesInv);
      let pipeSpr = document.createElement('div');
      pipeSpr.className = 'pipes';
      pipeSpr.style.top = pipePost + pipeGap + 'vh';
      pipeSpr.style.left = '100vw';
      pipeSpr.increaseScore = '1';
        
      // Append the created pipe element in DOM
      document.body.appendChild(pipeSpr);
    }
    pipeSep++;
    requestAnimationFrame(createPipe);
  }
   requestAnimationFrame(createPipe);
    function move(){
        if(gameState != 'Play') return;
        
        let pipes = document.querySelectorAll('.pipes');
        pipes.forEach((elem)=>{
            let pipesProps = elem.getBoundingClientRect();
            birdProps = bird.getBoundingClientRect();
           
            if(pipesProps.right <= 0){
                elem.remove();
            }else{
                if(birdProps.left < pipesProps.left +
          pipesProps.width &&
          birdProps.left +
          birdProps.width > pipesProps.left &&
          birdProps.top < pipesProps.top +
          pipesProps.height &&
          birdProps.top +
          birdProps.height > pipesProps.top
          ){
        gameState = 'End';
          mesg.innerHTML = 'Press Enter To Restart';
          mesg.style.left = '28vw';
          return;
          }
          else{
              if( pipesProps.right < birdProps.left &&
            pipesProps.right + 
            moveSpeed >= birdProps.left &&
            elem.increaseScore == '1' ){
        scoreValue.innerHTML = +scoreValue.innerHTML + 1;
            }
             elem.style.left = 
            pipesProps.left - moveSpeed + 'px';
          }
          
            }
            
        });
        requestAnimationFrame(move);
    }
    requestAnimationFrame(move);
    
    let birdDie = 0;
    
   
 
    }

