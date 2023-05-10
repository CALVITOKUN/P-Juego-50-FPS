var canvas;
var ctx;
var FPS = 50;

var anchoF = 50;
var altoF = 50;

var muro = '#044f14';
var puerta = '#3a1700';
var tierra = '#c6892f';
var llave = '#c6bc00';
let puntos;
var protagonista;

var enemigo=[]; // Array de enemigos
var cerdo=[]; // Array de enemigos

var imagenAntorcha; 
var imagenlava;
let tileMap;


var musica;
var sonido1, sonido2, sonido3;


musica = new Howl({
  src: ['music/fortaleza.mp3'],
  loop: false
});

sonido1 = new Howl({
  src: ['sound/fuego.wav'],
  loop: false
});

sonido2 = new Howl({
  src: ['sound/llave.wav'],
  loop: false
});

sonido3 = new Howl({
  src: ['sound/puerta.wav'],
  loop: false
});

let fase = 0;

let victoria;

let escenario = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,1,2,0,0,0,2,2,2,2,0,0,2,2,2,2,2,2,2,0],
  [0,0,2,2,2,2,2,0,0,2,0,0,2,0,0,0,0,0,2,0],
  [0,0,2,0,0,0,2,2,0,2,2,2,2,0,0,0,0,0,2,0],
  [0,0,2,2,2,0,0,2,0,0,0,2,0,0,0,0,0,0,2,0],
  [0,2,2,0,0,0,0,2,0,0,0,2,0,0,0,0,0,0,2,0],
  [0,0,2,0,0,0,2,2,2,0,0,2,2,2,0,0,0,2,2,0],
  [0,2,2,2,0,0,2,0,0,0,0,0,0,2,0,0,0,2,2,0],
  [0,2,2,3,0,0,2,0,0,2,2,2,2,2,0,0,0,2,2,0],
  [0,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,0],
  [0,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,0],
  [0,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,0],
  [0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0],
  [0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0],
  [0,2,2,2,2,2,2,2,2,2,2,2,2,2,1,2,2,3,2,0],
  [0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0],
  [0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
]

let escenario2 = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,2,2,0,0,0,2,2,2,2,0,0,2,2,2,2,0,0,0,0],
  [0,0,2,2,2,2,2,0,0,2,0,0,2,0,0,0,0,0,0,0],
  [0,0,2,0,0,0,2,2,0,2,2,2,2,0,0,0,0,0,0,0],
  [0,0,2,2,2,0,0,2,0,0,0,2,0,0,0,0,0,0,0,0],
  [0,2,2,0,0,0,0,2,0,0,0,2,0,0,0,0,0,0,0,0],
  [0,0,2,0,0,0,2,2,2,0,0,2,2,2,0,0,0,0,0,0],
  [0,2,2,2,0,0,2,0,0,0,1,0,0,2,0,0,0,0,0,0],
  [0,2,2,3,0,0,2,0,0,2,2,2,2,2,0,0,0,0,0,0],
  [0,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0],
  [0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0],
  [0,2,2,2,2,2,2,2,2,2,2,2,2,2,1,2,2,3,2,0],
  [0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0],
  [0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
]

// DIBUJO EL ESCENARIO

function dibujaEscenario(){

  for(y=0;y<18;y++){
    for(x=0;x<20;x++){

      if (fase== 1){
      var tile = escenario[y][x];
      ctx.drawImage(tileMap,tile*32,0,32,32,anchoF*x,altoF*y,anchoF,altoF);
    } else {
      
      var tile = escenario2[y][x];
      ctx.drawImage(tileMap,tile*32,0,32,32,anchoF*x,altoF*y,anchoF,altoF);
    }
  }
}
}


var antorcha = function(x,y){
  this.x = x;
  this.y = y;

  this.retraso = 10;
  this.contador = 0;
  this.fotograma = 0; //0-3


  this.cambiaFotograma = function(){
    if(this.fotograma < 3) {
      this.fotograma++;
    }
    else{
      this.fotograma = 0;
    }

  }


  this.dibuja = function(){

    if(this.contador < this.retraso){
      this.contador++;
    }
    else{
      this.contador = 0;
      this.cambiaFotograma();
    }

    ctx.drawImage(tileMap,this.fotograma*32,64,32,32,anchoF*x,altoF*y,anchoF,altoF);
  }


}
var lava = function(x,y){
  this.x = x;
  this.y = y;
  this.dibuja = function(){

    ctx.drawImage(tileMap,this.fotograma*128,64,32,32,anchoF*x,altoF*y,anchoF,altoF);

  }


}



//CLASE ENEMIGO
var malo = function(x,y){
    this.x = x;
    this.y = y;

    this.direccion = Math.floor(Math.random()*4);

    this.retraso = 50;
    this.fotograma = 0;


    this.dibuja = function(){
      ctx.drawImage(tileMap,128,0,32,32,this.x*anchoF,this.y*altoF,anchoF,altoF);
    }


    this.compruebaColision = function(x,y){
        var colisiona = false;

        if(escenario[y][x]==0){
          colisiona = true;
        }
        return colisiona;
    }
    this.compruebaColision = function(x,y){
      var colisiona = false;

      if(escenario2[y][x]==0){
        colisiona = true;
      }
      return colisiona;
  }

    this.mueve = function(){

      protagonista.colisionEnemigo(this.x, this.y);


      if(this.contador < this.retraso){
        this.contador++;
      }

      else{
        this.contador = 0;


  
        //ARRIBA
        if(this.direccion == 0){
          if(this.compruebaColision(this.x, this.y - 1)==false){
            this.y--;
          }
          else{
            this.direccion = Math.floor(Math.random()*4);
          }
        }
      
        


        
        //ABAJO
        if(this.direccion == 1){
          if(this.compruebaColision(this.x, this.y + 1)==false){
            this.y++;
          }
          else{
            this.direccion = Math.floor(Math.random()*4);
          }
        }

        //IZQUIERDA
        if(this.direccion == 2){
          if(this.compruebaColision(this.x - 1, this.y)==false){
            this.x--;
          }
          else{
            this.direccion = Math.floor(Math.random()*4);
          }
        }

        //IZQUIERDA
        if(this.direccion == 3){
          if(this.compruebaColision(this.x + 1, this.y)==false){
            this.x++;
          }
          else{
            this.direccion = Math.floor(Math.random()*4);
          }
        }
      }

    }

}


//cerdo
var cerdoo = function(x,y){
  this.x = x;
  this.y = y;

  this.direccion = Math.floor(Math.random()*4);

  this.retraso = 50;
  this.fotograma = 0;


  this.dibuja = function(){
    ctx.drawImage(tileMap,160,0,32,32,this.x*anchoF,this.y*altoF,anchoF,altoF);
  }


  this.compruebaColision = function(x,y){
      var colisiona = false;

      if(escenario[y][x]==0){
        colisiona = true;
      }
      return colisiona;
  }
  this.compruebaColision = function(x,y){
    var colisiona = false;

    if(escenario2[y][x]==0){
      colisiona = true;
    }
    return colisiona;
}

  this.mueve = function(){

    protagonista.colisionEnemigo(this.x, this.y);
    
    
    if(this.contador < this.retraso){
      this.contador++;
    }
    

    else{
      this.contador = 0;
    
//cerdo


      //ARRIBA
      if(this.direccion == 0){
        if(this.compruebaColision(this.x, this.y - 1)==false){
          this.y--;
        }
        else{
          this.direccion = Math.floor(Math.random()*4);
        }
      }
    
      


      
      //ABAJO
      if(this.direccion == 1){
        if(this.compruebaColision(this.x, this.y + 1)==false){
          this.y++;
        }
        else{
          this.direccion = Math.floor(Math.random()*4);
        }
      }

      //IZQUIERDA
      if(this.direccion == 2){
        if(this.compruebaColision(this.x - 1, this.y)==false){
          this.x--;
        }
        else{
          this.direccion = Math.floor(Math.random()*4);
        }
      }

      //IZQUIERDA
      if(this.direccion == 3){
        if(this.compruebaColision(this.x + 1, this.y)==false){
          this.x++;
        }
        else{
          this.direccion = Math.floor(Math.random()*4);
        }
      }
    }

  }

}
//OBJETO JUGADOR
var jugador = function(){
  this.x = 1;
  this.y = 1;
  this.color = '#820c01';
  this.llave = false;


  this.dibuja = function(){
    ctx.drawImage(tileMap,32,32,32,32,this.x*anchoF,this.y*altoF,anchoF,altoF);
  }


  this.colisionEnemigo = function(x,y){
    if(this.x == x && this.y == y){
        this.muerte();
    }

  }


  this.margenes = function(x,y){
    var colision = false;

    if(escenario[y][x]==0){
      colision = true;
    }

    return(colision);
  }
  this.margenes = function(x,y){
    var colision = false;

    if(escenario[y][x]==0){
      colision = true;
    }

    return(colision);
  }



  this.arriba = function(){
    if(this.margenes(this.x, this.y-1)==false){
      this.y--;
      this.logicaObjetos();
    }
  }


  this.abajo = function(){
    if(this.margenes(this.x, this.y+1)==false){
      this.y++;
      this.logicaObjetos();
    }
  }

  this.izquierda = function(){
    if(this.margenes(this.x-1, this.y)==false){
      this.x--;
      this.logicaObjetos();
    }
  }

  this.derecha = function(){
    if(this.margenes(this.x+1, this.y)==false){
      this.x++;
      this.logicaObjetos();
    }
  }

  this.victoria = function(){

    sonido3.play();
    console.log('Has ganado!');
    puntos = puntos +100
    if (puntos>puntosmax){
     localStorag.setItem('puntos',puntosmax);
    }

    this.x = 1;
    this.y = 1;

    this.llave = false;   //el jugador ya no tiene la llave
    escenario[8][3] = 3;  //volvemos a poner la llave en su sitio
  }


  this.muerte = function(){

    sonido1.play();
    console.log('Has perdido!');

    this.x = 1;
    this.y = 1;

    this.llave = false;   //el jugador ya no tiene la llave
    escenario[8][3] = 3;  //volvemos a poner la llave en su sitio
  }

  




  this.logicaObjetos = function(){
    var objeto = escenario[this.y][this.x];

    //OBTIENE LLAVE
    if(objeto == 3){

      sonido2.play();

      this.llave = true;
      escenario[this.y][this.x]=2;

      console.log('Has obtenido la llave!!');
      puntos = puntos +50;
      sessionStorage.setItem("puntos",puntos);
      document.getElementById('puntos').innerHTML = sessionStorage.getElementById("puntos");
    }



    //ABRIMOS LA PUERTA
    if(objeto == 1){
      if(this.llave == true)
        this.victoria(fase++)
        let marcadorPuntos = document.getElementById("puntos");
      let cantidadpuntos = parseInt(marcadorPuntos.textContent);
      cantidadpuntos +=100;
      cantidadpuntos.textContent = cantidadpuntos.toString();}
      else{
		  
        console.log('No tienes la llave, no puedes pasar!');
      }
    }


  }

0
var jugador = function(){
  this.x = 1;
  this.y = 1;
  this.color = '#820c01';
  this.llave = false;


  this.dibuja = function(){
    ctx.drawImage(tileMap,32,32,32,32,this.x*anchoF,this.y*altoF,anchoF,altoF);
  }


  this.colisionEnemigo = function(x,y){
    if(this.x == x && this.y == y){
        this.muerte();
    }

  }
 


  this.margenes = function(x,y){
    var colision = false;

    if(escenario2[y][x]==0){
      colision = true;
    }

    return(colision);
  }



  this.arriba = function(){
    if(this.margenes(this.x, this.y-1)==false){
      this.y--;
      this.logicaObjetos();
    }
  }


  this.abajo = function(){
    if(this.margenes(this.x, this.y+1)==false){
      this.y++;
      this.logicaObjetos();
    }
  }

  this.izquierda = function(){
    if(this.margenes(this.x-1, this.y)==false){
      this.x--;
      this.logicaObjetos();
    }
  }

  this.derecha = function(){
    if(this.margenes(this.x+1, this.y)==false){
      this.x++;
      this.logicaObjetos();
    }
  }

  this.victoria = function(){

    sonido3.play();
    console.log('Has ganado!');
    puntos = puntos +100
    if (puntos>puntosmax){
     localStorag.setItem('puntos',puntosmax);}

    this.x = 1;
    this.y = 1;

    this.llave = false;   //el jugador ya no tiene la llave
    escenario2[14][17] = 3;  //volvemos a poner la llave en su sitio
  }


  this.muerte = function(){

    sonido1.play();
    console.log('Has perdido!');

    this.x = 1;
    this.y = 1;

    this.llave = false;   //el jugador ya no tiene la llave
    escenario2[14][17] = 3;  //volvemos a poner la llave en su sitio
  }
 



  this.logicaObjetos = function(){
    var objeto = escenario2[this.y][this.x];

    //OBTIENE LLAVE
    if(objeto == 3){

      sonido2.play();

      this.llave = true;
      escenario2[this.y][this.x]=2;

      console.log('Has obtenido la llave!!');
      
    }



    //ABRIMOS LA PUERTA
    if(objeto == 1){
      if(this.llave == true)
        this.victoria(fase++)
        let marcadorPuntos = document.getElementById("puntos");
      let cantidadpuntos = parseInt(marcadorPuntos.textContent);
      cantidadpuntos +=100;
      cantidadpuntos.textContent = cantidadpuntos.toString();}
      else{
		  
        console.log('No tienes la llave, no puedes pasar!');
      }
    }


  }



// BUCLE PRINCIPAL

function inicializa(){
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');

  tileMap = new Image();
  tileMap.src = 'img/tilemap.png';

  musica.play();

  //CREAMOS AL JUGADOR
  protagonista = new jugador();

  //CREAMOS LA ANTORCHA
  imagenAntorcha = new antorcha(0,0);
  imagenAntorcha1 = new antorcha(0,17);
  imagenAntorcha2 = new antorcha(19,0);
  imagenAntorcha3 = new antorcha(19,17);
  imagenAntorcha4 = new antorcha(3,6);
 
    //CREAMOS LA lava
    imagenlava= new lava(1,15);
    imagenlava2= new lava(0,0);
   
  //CREAMOS LOS ENEMIGOS
  enemigo.push(new malo(3,3));
  enemigo.push(new malo(5,7));
  enemigo.push(new malo(7,7));
  enemigo.push(new malo(10,12));
  enemigo.push(new malo(17,15));
  enemigo.push(new malo(12,6));
  //CREAMOS CERDOS
  cerdo.push(new cerdoo(14,14));
  cerdo.push(new cerdoo(14,16));
  cerdo.push(new cerdoo(14,15));
  cerdo.push(new cerdoo(15,16));
  cerdo.push(new cerdoo(15,15));
  cerdo.push(new cerdoo(15,12));
  //LECTURA DEL TECLADO
  document.addEventListener('keydown',function(tecla){

    if(tecla.keyCode == 38){
      protagonista.arriba();
    }

    if(tecla.keyCode == 40){
      protagonista.abajo();
    }

    if(tecla.keyCode == 37){
      protagonista.izquierda();
    }

    if(tecla.keyCode == 39){
      protagonista.derecha();
    }

  });

  setInterval(function(){
    principal();
  },1000/FPS);
}


function borraCanvas(){
  canvas.width=1000;
  canvas.height=900;
}

//marcador


// GENERA TODO EL MOVIMIENTO DEL JUEGO

function principal(){
  borraCanvas();
  dibujaEscenario();
  imagenAntorcha.dibuja();
  imagenAntorcha1.dibuja();
  imagenAntorcha2.dibuja();
  imagenAntorcha3.dibuja();
  imagenAntorcha4.dibuja();
  imagenlava.dibuja();
  protagonista.dibuja();


  for(c=0; c<enemigo.length; c++){
    enemigo[c].mueve();
    enemigo[c].dibuja();
  }
  for(c=0; c<cerdo.length; c++){
    cerdo[c].mueve();
    cerdo[c].dibuja();
  }
}
