/* jshint esversion: 6*/
/** @namespace */
const calculatrice = (function calculatrice(){
    "use strict";

var touche, afficher="", nbActuel, total, calculPrecedent;
var arrNombre= [], arrOperateur= [], arrValeur = [], arrTemp = [];


/**
 *  fonction appelé lorsque l'on appui sur "=", permet de lancer les fonctions de calculs
 *  et de verifications
 * @alias calculatrice.resultat
 * @return {undefined}
 */

const resultat =  function resultat(){
    nbActuel = this.textContent;

    arrValeur.push(nbActuel);
    nombreACalculer(nbActuel);
    operateur(nbActuel);
    afficherCalcul(nbActuel);

    if (nbActuel === "=") {
        calculer();
    }
};

/**
 * fonction permettant d' afficher les calculs, en prenant en compt toutes les possibilitées
 * de touches qui serait cliqué par l'utilisateur
 * @alias calculatrice.afficherCalcul
 * @param {string} n   texte contenu dans la touche qui est selectionné
 * @return {undefined}
 */

const afficherCalcul = function afficherCalcul(n){
    // on supprime le 0 inialement present dans la zone de resultat
    // et on afficher le bouton cliqué tant que on a pas cliqué sur =
    if(n !== 'AC' && n !== '='){
        if (afficher.textContent === '0' || Number(afficher.textContent) === total  && !isNaN(n)){
            if (afficher.textContent !== '0') {
                calculPrecedent.innerHTML = afficher.textContent;
            } else{
            afficher.innerHTML = n;
            arrNombre= [];
            arrOperateur =[];
            }
        } else if (isNaN(n) && arrValeur[arrValeur.length-2] === "%") {
            afficher.innerHTML +=n;
        // permet de ne pas cliqué sur de operateur à la suite
        } else if (isNaN(n) && isNaN(arrValeur[arrValeur.length-2])) {
            afficher.innerHTML +="";
        } else if (afficher.textContent.length < 18) {
            afficher.innerHTML += n;
        }
    // si la touche cliqué est egal a AC on reinialise a 0
    }else if (n === 'AC') {
        afficher.innerHTML = 0;
        calculPrecedent.innerHTML = "";
        arrNombre= [];
        arrOperateur =[];
        arrValeur=[];
    }
};

/**
 * fonction permettant de verfier le calcul en utilisant isNaN
 * @alias calculatrice.verifier
 * @param {number} total  valeur final du calcul
 * @return {boolean} true si il s'agit d'un number ou false et un message d'erreur dans le cas contraire
 */

const verifier = function verifier(total){
    if (isNaN(total)) {
        calculPrecedent.innerHTML = afficher.textContent + " =";
        afficher.textContent = 'error';
        return false;
    }else {
        return true;
    }
};

/**
 * fonction permettant  de verifier si le texte contenu dans la case cliqué est un nombre
 * et si oui l'ajouter a un tableau contant les nombres à calculer
 * @alias calculatrice.nombreACalculer
 * @param {string} n  texte contenu dans valeur actuellement cliqué
 * @return {undefined}
 */

const nombreACalculer = function nombreACalculer(n){
    // si il s'agit d'un nombre on l'ajoute a un tableau temporaire
    if(afficher.textContent.length < 18 && !isNaN(n) || n === "."){
        if ( n !== arrValeur[arrValeur.length-2] ||  n !== "."){
            arrTemp.push(n);
        }
    }
    // Des qu'on arrive sur autre chose q'un chiffre on joint les chiffres que l'on place dans un nouveau tableau
    if(n === "+" || n === "-" || n === "*" || n === "/" || n === "=" || n === "%"){
        let temp = arrTemp.join("");
        arrTemp.splice( 0 , temp.length);
        if (temp !== "") {
            arrNombre.push(temp);
        }
    }
}

/**
 * fonction permettant  de verifier si le texte contenu dans la case cliqué est un operatuer
 * et si oui l'ajouter à un tableau contenant tous les operateurs
 * @alias calculatrice.operateur
 * @param {string} n  texte contenu dans valeur actuellement cliqué
 * @return {undefined}
 */

const operateur = function operateur(n){
    if (afficher.textContent.length < 18 && n === "+" || n === "-" || n === "*" || n === "/" || n === "%") {
        // on verifie que l'on ne click pas sur deux operateurs de suite
        if (arrValeur[arrValeur.length-2] !=="+" && arrValeur[arrValeur.length-2] !=="-" &&
        arrValeur[arrValeur.length-2] !=="*" && arrValeur[arrValeur.length-2] !=="/"){
            arrOperateur.push(n);
        }
    }
    // cas particlier pour le pourcentage quand on click sur un chiffre on ajoute *
    if (!isNaN(arrValeur[arrValeur.length-1]) && arrValeur[arrValeur.length-2] === "%") {
        arrOperateur.push("*");
        afficher.innerHTML += "*";
    }
};

/**
 * fonction permettant  de lancer toute les fonctions de calcul en fonction des operateurs
 * present dans le tableau contenant tous les opereateurs cliqués puis d'afficher le
 * resultat final
 * @alias calculatrice.calculer
 * @return {undefined}
 */

const calculer = function calculer(){
    while (arrOperateur.indexOf('%') !== -1) {
        pourcentage();
    }
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

    let reponse = verifier(total);
    if (reponse === true ) {
        calculPrecedent.innerHTML = afficher.textContent + " =";
        afficher.innerHTML = total;
        arrValeur.push(total);
    }

};

/**
 * fonction permettant  de lancer le calcul des pourcentages
 * @alias calculatrice.pourcentage
 * @return {undefined}
 */

const pourcentage = function pourcentage(){
    let op = arrOperateur.indexOf("%");
    total = Number(arrNombre[op]) / 100;
    arrNombre.splice( op,1);
    arrNombre.splice(op, 0, total);
    arrOperateur.splice(op,1);
}

/**
 * fonction permettant  de lancer le calcul des multiplications
 * @alias calculatrice.multiplication
 * @return {undefined}
 */

const multiplication = function multiplication(){
    let op = arrOperateur.indexOf("*");
    total = Number(arrNombre[op])* Number(arrNombre[op+1]);
    arrNombre.splice( op,2);
    arrNombre.splice(op, 0, total);
    arrOperateur.splice(op,1);
}

/**
 * fonction permettant  de lancer le calcul des divisions
 * @alias calculatrice.division
 * @return {undefined}
 */

const division = function division(){
    let op = arrOperateur.indexOf("/");
    total = Number(arrNombre[op])/ Number(arrNombre[op+1]);
    arrNombre.splice( op,2);
    arrNombre.splice(op, 0, total);
    arrOperateur.splice(op,1);
}

/**
 * fonction permettant  de lancer le calcul des additions
 * @alias calculatrice.addition
 * @return {undefined}
 */

const addition = function addition(){
    let op = arrOperateur.indexOf("+");
    total = Number(arrNombre[op])+ Number(arrNombre[op+1]);
    arrNombre.splice( op,2);
    arrNombre.splice(op, 0, total);
    arrOperateur.splice(op,1);
}

/**
 * fonction permettant  de lancer le calcul des soustractions
 * @alias calculatrice.soustraction
 * @return {undefined}
 */

const soustraction = function soustraction(){
    let op = arrOperateur.indexOf("-");
    total = Number(arrNombre[op])- Number(arrNombre[op+1]);
    arrNombre.splice( op,2);
    arrNombre.splice(op, 0, total);
    arrOperateur.splice(op,1);
}

/**
 * fonction lancer après le chargement du index.html, récuperation des éléments du DOM
 * ecoute les clicks pour chaque touche, et lancement de la fonction resultat
 * @alias calculatrice.init
 * @return {undefined}
 */

const init = function init(){
    afficher = document.getElementById('afficher');
    touche =  document.querySelectorAll('.touche');
    calculPrecedent =  document.getElementById('calculPrecedent');

    for (let i = 0; i < touche.length; i++) {
        touche[i].onclick= resultat;
    };
};

window.addEventListener("DOMContentLoaded", init);

}());
