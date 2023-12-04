const prompt = require("prompt-sync")();

//objets attaques

let hitOne = {
    name: "Frappe Rapide",
    power: - 10,
    accuracy: 2
}

let hitTwo = {
    name: "Soin Léger",
    power: 15,
    accuracy: 3
}
let hitThree = {
    name: "Coup puissant",
    power: - 20,
    accuracy: 3
}
let hitFour = {
    name: "Frappe Dévastatrice",
    power: - 30,
    accuracy: 4
}
//objets Joueurs

let playerOne = {
    name: "Guerrier du Feu",
    pv: 100,
}
let bot = {
    name: "Sombre Lutin",
    pv: 100,
}
// Variables

let hitTable = [hitOne, hitTwo, hitThree, hitFour]

//Intro
console.log("\x1b[35mBIENVENUE DANS L'ARENE, DEFFENDEZ-VOUS COMME VOUS POUVEZ !!!\x1b[0m")
console.log("\x1b[35m========FIGHT========\x1b[0m")
console.log("==\x1b[32m PV \x1b[34mGuerrier du feu restant : " + "\x1b[32m" + playerOne.pv + "\x1b[0m" + " == " + " ==\x1b[32m PV \x1b[34mSombre Lutin restant : " + "\x1b[32m" + bot.pv + "\x1b[0m" + " == ")

//Fonction random
function randomize(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
//Fonction choix attaque Joueur

let choiceAttack = (att) => {

    console.log("\x1b[34mC'est au tour de Guerrier pourrit d'attaquer \x1b[0m")
    att.forEach((el, i) => {
        console.log("." + (i + 1) + ") " + el.name)
    });
    let choice = parseInt(prompt("\x1b[31mChoisis ton attaque:\x1b[0m "))
    while (choice < 1 || choice > 4) {
        choice = prompt(" Commande invalide recommence: ")
    }
    while (choice != 1 && choice != 2 && choice != 3 && choice != 4) {
        choice = prompt(" Commande invalide recommence: ")
    }
    return att[choice - 1]
}
//fonction choix attaque Cpu

let choiceAttackCpu = async (at) => {

    console.log("\x1b[34mC'est au tour de Lutin Crasseux d'attaquer\x1b[0m ")
    await sleep(4000)
    let choiceRandom = randomize(1, hitTable.length)
    return at[choiceRandom - 1]
}

//Fonction attaque Player

let attackPlayer = (atkPlayer) => {
    let tuch = randomize(1, atkPlayer.accuracy) == atkPlayer.accuracy4
    if (tuch) {
        if (atkPlayer.name == "Soin Léger") {
            playerOne.pv += atkPlayer.power
            console.log("====\x1b[32mTu as utilisé " + atkPlayer.name + "\x1b[0m ====");
            console.log("====Il vous reste : " + "\x1b[32m" + playerOne.pv + " PV" + " \x1b[0m ====")
        }
        else {

            bot.pv += atkPlayer.power
            console.log("====\x1b[32mTu as utilisé " + atkPlayer.name + "\x1b[0m ====");
            console.log("====\x1b[32mTu as touché " + bot.name + "\x1b[0m ====");
            console.log("====Il lui reste : " + "\x1b[32m" + bot.pv + " PV" + "\x1b[0m  ====")
        }
    } else {
        console.log("\x1b[31m!!!ATTAQUE MANQUEE!!!\x1b[0m");
    }
}

//Fonction attaque Cpu

let attackCpu = (atkCpu) => {

    let tuch = randomize(1, atkCpu.accuracy) == atkCpu.accuracy
   
    if (tuch) {
        
        if (atkCpu.name == "Soin Léger") {
            bot.pv += atkCpu.power
            console.log("====\x1b[32mLutin Crasseux a utilisé " + atkCpu.name + "\x1b[0m ====");
            console.log("====Il lui reste : " + "\x1b[32m" + bot.pv + " PV" + " \x1b[0m ====")
        }

        else {
            playerOne.pv += atkCpu.power
            console.log("====\x1b[32mLutin Crasseux a utilisé " + atkCpu.name + "\x1b[0m ====");
            console.log("====\x1b[32mLutin Crasseux a touché " + playerOne.name + " \x1b[0m====");
            console.log("====Il vous reste : " + "\x1b[32m" + playerOne.pv + " PV" + " \x1b[0m ====")
        }
    } else {
        console.log("\x1b[31m!!!ATTAQUE MANQUEE!!!\x1b[0m");
    }
}

//Fonction Jeu

let game = async () => {
    while (bot.pv > 0 && playerOne.pv > 0) {
        await sleep(4000)
        attackPlayer(choiceAttack(hitTable))
        console.log("***********************************************")
        attackCpu(await choiceAttackCpu(hitTable))
        console.log("***********************************************");
        console.log("==\x1b[32m PV \x1b[34mGuerrier du feu restant : " + "\x1b[32m" + playerOne.pv + "\x1b[0m" + " == " + " ==\x1b[32m PV \x1b[34mSombre Lutin restant : " + "\x1b[32m" + bot.pv + "\x1b[0m" + " == ")
        if (bot.pv <= 0) {
            console.log("\x1b[35m=== " + " GAME OVER Lutin Crasseux tu t'es fais botter le cul par Guerrrier du Feux !!! " + " === \x1b[0m")
        }
        else if (playerOne.pv <= 0) {
            console.log("\x1b[35m=== " + " GAME OVER Guerrier du Feu tu t'es fais botter le cul par Luttin Crasseux !!! " + " === \x1b[0m")
        }
    }
}

//Fonction attente
function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}


game()

