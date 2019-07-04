let canvas = document.getElementById("jeuCanvas");      // On récupère le canvas
let context = canvas.getContext("2d");                  // On extrait le contexte, on précise le 2d
let widthCanvas =parseInt(document.getElementById("jeuCanvas").getAttribute("width"));
let heightCanvas =parseInt(document.getElementById("jeuCanvas").getAttribute("height"));

// On défini les variables
let tabRowCount = 3;                  // nombre de ligne
let tabColumnCount = 3;               // nombre de colonne
let tabWidth = widthCanvas/3;         // largueur 
let tabHeight = heightCanvas/3;       // hauteur
let tabPadding = 5;                   // padding

let isPlaying = true;

function tab(a){
  // Boucle pour créer le tableau à deux dimensions
  let tableau = [];     
  for(var c=0; c < tabColumnCount; c++) {       // colonnes
      tableau[c] = [];
      for(var r=0; r < tabRowCount; r++) {       // lignes
          tableau[c][r] = a;         // on ajoute la lettre
      }
  }
  return tableau;
}

let tableau = tab({ x: 0, y: 0 });    // on ajoute l'objet
let oxo = tab("");                    // variable avec champ vide pour vérifier s'il y a un X ou O dans la case

// Fonction pour boucler les éléments dans le tableau et les dessiner
function drawElement() {
  for(let c=0; c < tabColumnCount; c++) {
      for(let r=0; r < tabRowCount; r++) {
          // positionner les carrés à la bonne place
          let tabX = (c*(tabWidth+tabPadding));     // position tabX déterminé par la largueur et le padding multiplié par le nombre de colonne
          let tabY = (r*(tabHeight+tabPadding));
          tableau[c][r].x = tabX;         // Boucler à travers les colonnes et lignes pour attribuer une position x et y
          tableau[c][r].y = tabY;
          context.beginPath();
          context.rect(tabX, tabY, tabWidth, tabHeight);
          context.fillStyle = "rgb(248,228,255)";
          context.fill();
          context.closePath();
      }
  }
}

function drawX(x,y) {       // On dessine le X
      context.beginPath();
      context.font = "normal 150px Verdana, Arial, serif";
      context.fillStyle = "red";
      context.fillText("X",x*tabWidth+(tabWidth/4), (y+1)*tabHeight-(tabHeight/4));   // a modif
      context.closePath();
}

function drawO(x,y) {               // On dessine le O
  context.font = "normal 150px Verdana, Arial, serif";
  context.fillStyle = "green";
  context.fillText("O", x*tabWidth+(tabWidth/4), (y+1)*tabHeight-(tabHeight/4));    // a modif
}

function verifColumnAndRow(oxoTableau){
    // On fait une ligne pour vérifier les colonnes puis les lignes
    for(let i=0; i< oxoTableau.length; i++){
        if(oxoTableau[0][i] != "" && oxoTableau[0][i] === oxoTableau[1][i] && oxoTableau[0][i] === oxoTableau[2][i]){
            return true;
        }
        if(oxoTableau[i][0] != "" && oxoTableau[i][0] === oxoTableau[i][1] && oxoTableau[i][0] === oxoTableau[i][2]){
            return true;
        }
    }
    return false;
}
function verifDia(oxoTableau){
    // On vérifie les diagonales
    if(oxoTableau[0][0] != "" && oxoTableau[0][0] === oxoTableau[1][1] && oxoTableau[0][0] === oxoTableau[2][2]){
        return true;
    }
    else if(oxoTableau[0][2] != "" && oxoTableau[0][2] === oxoTableau[1][1] && oxoTableau[0][2] === oxoTableau[2][0]){
        return true;
    }
    else{ 
      return false;
    }
}

function verification(oxoTableau){
    return verifDia(oxoTableau) ||verifColumnAndRow(oxoTableau);
}

drawElement();


// EVENEMENTS
/*let nbr = Math.floor((Math.random()*10)%2);*/
let tourX = true;
document.getElementById("joueur1").style.display = "block";

document.addEventListener("click", (e)=>{
  // On récupère l'endroit où l'on clic en X et Y
  let x = Math.floor((e.clientX - canvas.offsetLeft) / (widthCanvas / 3)); 
  let y = Math.floor((e.clientY - canvas.offsetTop) / (heightCanvas / 3));

  /*if(nbr === 0){
    tourX = true;
    nbr=1;
  }
  else{
    tourX = false;
    nbr = 0;
  }*/

  if(tourX == true){
    if(oxo[y][x] === ""){
      drawX(x,y);
      oxo[y][x] = "X";
      tourX = false;
      document.getElementById("joueur1").style.display = "none";    // Une fois que le joueur 1 a joué, il disparaît et le joueur 2 apparaît
      document.getElementById("joueur2").style.display = "block";
    }
  }
  else{
    if(oxo[y][x] === ""){
      drawO(x,y);
      oxo[y][x] = "0";
      tourX = true;
      document.getElementById("joueur1").style.display = "block";
      document.getElementById("joueur2").style.display = "none";
    }
  }
  
function verifEnd(){
  if(verification(oxo) == true){
    if(oxo[y][x] === "X"){
      alert("Le joueur 1 gagne !");
      document.location.reload();
    }
    else{
      alert("Le joueur 2 gagne !");
      document.location.reload();
    }
}
}
setTimeout(function(){verifEnd()},500); 

  console.log(oxo);
  console.log(verification(oxo));
}, false);
