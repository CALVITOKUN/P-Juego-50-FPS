let canvas; /* caja ,variable para asignar,canvas de html a objetos canvas de javascript */
let ctx; /* casillas,variable para las rejillas de bitmap del canvas */
let FPS=100; /* frames por segundos */

/*edicion de cada cuadrado*/

let anchoF=25;
let altoF=16;

/*Colores objetos y estructura*/

let pared='#508787';    /* GRIS PAREDES ,COLOR 2 '#B44F39' ,Posición 0 */
let puerta ='#81745F';  /* MARRON-GRIS PUERTA , Posición 1 */ 
let suelo='#B44F39';    /* MARRON , #508787 COLOR 2 , Posición 2*/
let llave='#E9EC2C';    /* AMARILLO , Posición 3 */ 
let agua='#6CB3E7';     /* AGUA Posición 4 */
let lava='#FD3E0A';     /* LAVA Posición 5*/
let borde= '#6F655B';
let muro='#B44F39';

let imagenAntorcha;
let tileMap;

let mapa = [
    [6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6],
    [6,0,0,0,7,7,0,0,0,0,0,0,0,0,0,7,0,0,0,0,7,0,0,0,7,0,0,0,7,6],
    [6,0,7,0,0,7,0,7,7,0,7,7,7,7,0,0,0,7,7,0,0,0,7,0,0,0,7,0,0,6],
    [6,0,7,7,0,0,0,0,7,0,0,7,0,7,0,7,7,7,7,7,7,7,7,7,7,7,7,0,7,6],
    [6,0,0,0,0,7,0,0,7,0,0,7,0,7,0,7,0,7,0,7,0,7,7,0,0,0,7,0,0,6],
    [6,0,7,0,7,7,7,7,7,0,7,7,0,7,0,0,0,0,0,0,0,0,7,0,7,7,7,7,7,6],
    [6,0,7,0,0,0,0,0,0,0,7,0,0,7,7,7,0,7,0,7,0,7,7,0,0,0,7,0,7,6],
    [6,0,7,0,7,0,7,7,7,7,7,0,0,0,0,7,0,0,0,0,0,0,7,0,7,0,7,0,7,6],
    [6,7,7,0,7,0,7,0,7,0,7,0,7,0,0,7,0,7,0,7,0,7,7,0,7,0,0,0,0,6],
    [6,0,0,0,7,0,7,0,0,0,7,0,7,7,0,7,0,7,0,7,0,0,0,0,7,0,7,7,0,6],
    [6,0,7,7,7,0,7,7,7,0,7,0,0,7,7,7,0,0,0,7,7,7,7,7,7,0,7,7,0,6],
    [6,0,7,1,0,0,0,0,7,0,7,7,0,0,0,7,7,0,0,0,0,0,0,0,0,0,7,7,0,6],
    [6,0,0,0,0,0,7,0,7,0,0,0,0,7,0,1,7,7,7,7,7,0,7,7,7,7,7,7,0,6],
    [6,0,7,7,7,7,7,0,7,0,7,0,0,0,0,0,0,0,0,0,7,0,7,0,0,0,0,7,0,6],
    [6,0,7,0,7,0,0,0,7,0,7,7,0,7,0,7,0,7,0,7,7,0,7,0,7,7,0,7,0,6],
    [6,7,7,0,7,0,7,0,7,0,7,0,0,7,0,7,0,0,0,0,0,0,7,0,7,0,0,7,0,6],
    [6,0,0,0,7,0,0,0,0,0,0,0,0,7,0,7,0,7,7,7,0,7,7,0,0,0,0,0,0,6],
    [6,0,7,0,0,0,7,0,7,0,7,0,7,7,7,7,7,7,0,0,0,7,0,0,0,7,7,0,7,6],
    [6,0,7,0,7,0,0,0,7,0,7,0,0,0,0,0,0,0,0,0,0,7,0,7,0,7,0,0,0,6],
    [6,0,7,0,7,7,0,0,7,0,7,7,0,7,0,7,0,7,7,7,0,7,0,7,0,7,0,7,0,6],
    [6,0,0,0,0,0,0,0,7,0,0,7,0,7,0,7,0,7,0,7,0,7,0,0,0,7,7,7,7,6],
    [6,7,0,7,0,0,7,0,7,7,0,0,0,0,0,7,0,0,0,7,0,7,7,7,0,0,0,0,0,6],
    [6,0,0,7,0,0,7,0,7,7,7,7,7,0,7,7,0,7,0,7,7,7,0,7,0,7,0,7,7,6],
    [6,7,7,7,7,0,7,0,0,0,0,0,7,0,7,0,0,0,0,0,0,0,0,7,0,7,0,7,0,6],
    [6,0,0,0,7,0,7,0,7,7,7,7,7,0,7,0,7,7,7,0,7,7,7,7,0,7,0,7,0,6],
    [6,7,7,0,0,0,7,0,7,0,0,0,7,0,0,0,0,0,7,0,0,0,0,0,0,0,0,7,0,6],
    [6,0,7,0,7,0,0,0,7,0,7,0,7,0,7,0,7,0,7,0,7,0,0,0,0,7,0,7,0,6],
    [6,0,0,0,0,0,7,0,0,0,7,7,7,7,7,7,7,0,7,0,7,7,7,7,0,7,0,7,7,6],
    [6,0,7,0,7,0,7,0,7,0,0,0,0,7,0,0,0,0,7,0,0,0,0,0,0,7,0,0,3,6],
    [6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6]
  
];

/*Dibujamos el mapa*/

function dibujarmapa(){
    let color;/* variable que carga los colores de los elementos... */
    for(y=0;y<30;y++){  /* Bucle que recorre las filas */
        for(x=0;x<30;x++){  /* Bucle que recorre las columnas */

            if(mapa[y][x]==0) /* lectura de posicion de mapa y carga de color de elemento */ 
                color = pared;

            if(mapa[y][x]==1)
                color = puerta;

            if(mapa[y][x]==2)
                color = suelo;

            if(mapa[y][x]==3)
                color = llave;

            if(mapa[y][x]==4)
                color = agua;

            if(mapa[y][x]==5)
                color = lava;

            if(mapa[y][x]==6)
                color = borde;
            
            if(mapa[y][x]==7)
                color = muro;


            ctx.fillStyle = color; /* CREA EL COLOR DEL CTX */
            ctx.fillRect(x*anchoF,y*altoF,anchoF,altoF); /* ASIGNA LA POSICON DE LA REGILLA DE 50*50 PX */

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
};
/*personaje principal */

let jugador = function(){
    /* cordenadas X e Y del personaje */
    this.x = 1; 
    this.y = 1;
    this.color = '#FF9AF7';

    this.dibujarpersonaje = function(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x*anchoF,this.y*altoF,anchoF,altoF);
    };

    this.margenes = function(x,y){
        let colision = false;
        
        if(mapa[y][x]==2){
            colision = true;
        }
        if(mapa[y][x]==6){
            colision = true;
        }
        if(mapa[y][x]==7){
            colision = true;
        }
        return(colision);
    }

    /*movimientos jugador */
    this.saltar = function(){
        if(this.margenes(this.x,this.y-1)==false)
        this.y--;
    }

    this.abajo = function(){
        if(this.margenes(this.x,this.y+1)==false)
        this.y++;
        
    }

    this.izquierda = function(){
        if(this.margenes(this.x-1,this.y)==false)
        this.x--;
    }

    this.derecha = function(){
        if(this.margenes(this.x+1,this.y)==false)
        this.x++;
        
    }
}

function inicializa(){ /* CREA INICALMETE EL OBJETO CANVAS */
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    

    //MOVIMIENTOS PERSONAJE
                    //constructor
    personaje = new jugador();
    
    //LECTURA TECLADO

    document.addEventListener('keydown',function(tecla){

        if(tecla.keyCode==38){
            personaje.saltar();
        }
        if(tecla.keyCode==40){
            personaje.abajo();
        }
        if(tecla.keyCode==37){
            personaje.izquierda();
        }
        if(tecla.keyCode==39){
            personaje.derecha();
        }

    })
    






    /* Temporizador (1000/FPS = es el refresco) */
    setInterval( function(){
        principal();
    },1000/FPS);


};
function borrarmapa(){
    canvas.width=750;
    canvas.height=480;
};

function principal(){
    borrarmapa();
    dibujarmapa();
    personaje.dibujarpersonaje();

};


