
/* jshint esversion: 6*/
const calculatrice = (function calculatrice(){
    "use strict";

var touche, afficher="", nbActuel;
var arr= [], arrNombre= [], arrOperateur= [];

// fonction permettant de reinialiser la calculatrice
const reinitialiser = function reinitialiser(n){

    // Dand un premier tant on supprimer le 0 inialement present dans la zone de resultat
    // et on afficher le bouton cliqué tant que on a pas cliqué sur =
    // si la touche cliqué est egal a AC on reinialise a 0;
    if(n !== 'AC' && n !== '='){
        if (afficher.textContent === '0') {
            afficher.innerHTML = "";
        }
        afficher.innerHTML += n;
    }else if (n === 'AC') {
        afficher.innerHTML = 0;
        arrNombre= [];
        arrOperateur =[];
    }
};

const verifier = function verifier(){

    // fonction permettant de verifier le contenu et renvoie true si tous est correct
    if (afficher.textContent.length<3) {
        if (isNaN(afficher.textContent)) {
            afficher.textContent = 'error';
            return false;
        }
    }

    if (afficher.textContent !== "error"){
        return true;
    }
};

const nombreACalculer = function nombreACalculer(n){
    // si il s'agit d'un nombre on lajoute au tableau
    if(!isNaN(n) || n === "."){
        arr.push(n);
    }
    // Des qu'on arrive sur autre chose q'un chiffre on joint les chiffres
    if(n === "+" || n === "-" || n === "*" || n === "/" || n === "="){
        let temp = arr.join("");
        arr.splice( 0 , temp.length);
        if (temp !== "") {
            arrNombre.push(temp);
        }
    }
}

const operateur = function operateur(n){

    if (n === "+" || n === "-" || n === "*" || n === "/") {
            arrOperateur.push(n);
    }

};

const resultat =  function resultat(){
    nbActuel = this.textContent;

    nombreACalculer(nbActuel);
    operateur(nbActuel);
    reinitialiser(nbActuel);

    if (nbActuel === "=") {
        calculer();
    }

};

const calculer = function calculer(){
    let verifierReponse = verifier();
    if(verifierReponse === true){
        while(arrOperateur.indexOf('*') !== -1){
            multiplication();
        }
        while(arrOperateur.indexOf('/') !== -1){
            division();
        }
        while(arrOperateur.indexOf('+') !== -1){
            addition();
        }
        while(arrOperateur.indexOf('-') !== -1){
            soustraction();
        }
    }
};

const addition = function addition(){
    let op = arrOperateur.indexOf("+");
    let total = Number(arrNombre[op])+ Number(arrNombre[op+1]);
    arrNombre.splice( op,2);
    arrNombre.splice(op, 0, total);
    arrOperateur.splice(op,1);
    afficher.innerHTML = total;
}

const soustraction = function soustraction(){
    let op = arrOperateur.indexOf("-");
    let total = Number(arrNombre[op])- Number(arrNombre[op+1]);
    arrNombre.splice( op,2);
    arrNombre.splice(op, 0, total);
    arrOperateur.splice(op,1);
    afficher.innerHTML = total;
}

const multiplication = function multiplication(){
    let op = arrOperateur.indexOf("*");
    let total = Number(arrNombre[op])* Number(arrNombre[op+1]);
    arrNombre.splice( op,2);
    arrNombre.splice(op, 0, total);
    arrOperateur.splice(op,1);
    afficher.innerHTML = total;
}

const division = function division(){
    let op = arrOperateur.indexOf("/");
    let total = Number(arrNombre[op])/ Number(arrNombre[op+1]);
    arrNombre.splice( op,2);
    arrNombre.splice(op, 0, total);
    arrOperateur.splice(op,1);
    afficher.innerHTML = total;
}


const init = function init(){
    // récuperation des éléments du DOM
    afficher = document.getElementById('afficher');
    touche =  document.querySelectorAll('.touche');

    // ecoute les clicks pour chaques touches
    for (let i = 0; i < touche.length; i++) {
        touche[i].onclick= resultat;
    };

};

window.addEventListener("DOMContentLoaded", init);


}());
