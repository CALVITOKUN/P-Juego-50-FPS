let canvas; /* caja ,variable para asignar,canvas de html a objetos canvas de javascript */
let ctx; /* casillas,variable para las rejillas de bitmap del canvas */
let FPS=50; /* frames por segundos */

/*edicion de cada cuadrado*/

let anchoF=50;
let altoF=50;

/*Colores objetos y estructura*/

let pared='#508787';    /* GRIS PAREDES ,COLOR 2 '#B44F39' ,Posición 0 */
let puerta ='#81745F';  /* MARRON-GRIS PUERTA , Posición 1 */ 
let suelo='#B44F39';    /* MARRON , #508787 COLOR 2 , Posición 2*/
let llave='#E9EC2C';    /* AMARILLO , Posición 3 */ 
let agua='#6CB3E7';     /* AGUA Posición 4 */
let lava='#FD3E0A';     /* LAVA Posición 5*/


let mapa = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [0,0,0,0,2,0,0,0,0,0,0,0,0,0,1],
    [0,2,0,0,2,0,0,0,0,0,0,0,2,2,2],
    [0,0,0,0,2,2,0,0,0,2,0,0,2,2,0],
    [0,0,0,2,2,2,0,3,2,2,0,0,2,0,0],
    [2,2,0,0,0,2,2,2,2,2,5,5,2,0,0],
    [0,2,2,0,0,0,0,0,2,2,2,2,2,0,0],
    [0,0,0,0,2,2,0,0,0,0,0,0,0,0,0],
    [4,4,4,4,4,4,4,4,4,4,4,4,4,4,4]
];

/*Dibujamos el mapa*/

function dibujarmapa(){
    let color;/* variable que carga los colores de los elementos... */
    for(y=0;y<10;y++){  /* Bucle que recorre las filas */
        for(x=0;x<15;x++){  /* Bucle que recorre las columnas */

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
                color = persona;

            ctx.fillStyle = color; /* CREA EL COLOR DEL CTX */
            ctx.fillRect(x*anchoF,y*altoF,anchoF,altoF); /* ASIGNA LA POSICON DE LA REGILLA DE 50*50 PX */

        }
    }
};
/*personaje principal */

let jugador = function(){
    /* cordenadas X e Y del personaje */
    this.x = 6; 
    this.y = 8;
    this.color = '#FF9AF7';

    this.dibujaP = function(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x*anchoF,this.y*altoF,anchoF,altoF);
    };

    this.margenes = function(x,y){
        let colision = false;
        
        if(mapa[y][x]==0){
            colision=true
        }
        return(colision);
    }

    /*movimientos jugador */
    this.saltar = function(){
        if(this.margenes(this.x,this.y-2)==false)
        this.y--;
    };

    this.abajo = function(){
        if(this.margenes(this.x,this.y+1)==false)
        this.y++;
        
    };

    this.izquierda = function(){
        if(this.margenes(this.y,this.x-1)==false)
        this.x--;
    };

    this.derecha = function(){
        if(this.margenes(this.y,this.x+1)==false)
        this.x++;
        
    };
};


function inicializa(){ /* CREA INICALMETE EL OBJETO CANVAS */
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    





    /* Temporizador (1000/FPS = es el refresco) */
    setInterval( function(){
        principal();
    },1000/FPS);


};
function borrarmapa(){
    canvas.width=750;
    canvas.height=500;
}

function principal(){
    borrarmapa();
    dibujarmapa();




};


