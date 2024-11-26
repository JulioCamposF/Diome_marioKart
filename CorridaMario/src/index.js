//OBJETOS para representar os personagens com 3 atributos
const player1 = {
    nome:"Mario",
    velocidade:4,
    manobrabilidade:3,
    poder:3,
    pontos:0,
};
const player2 = {
    nome:"Luigi",
    velocidade:3,
    manobrabilidade:4,
    poder:4,
    pontos:0,
}

//função de rolar dados
async function rollDice(){
    //o floor é usado para arredondar e o +1 usamos para aproximar do 6
   return Math.floor(Math.random() * 6)+1;

}

//função para criar os blocos de disputa
async function getRandomBlock(){
    let random = Math.random();
    let result;


    switch(true){
        case random < 0.33:
            result = "RETA";
        break;

        case random < 0.66:
            result = "CURVA";
        break;
        
        default:
            result="CONFRONTO";
            break;
    }
    //retorna o resultado do sorteio
    return result; 
}

async function logRollResult(characterName,block,diceResult,attribute){
    console.log(`${characterName} Rolou o dado de ${block} ${diceResult}+${attribute}=${diceResult+attribute}`);
    
}


async function playRaceEngine(character1,character2){
    for(let round = 1;round<=5;round++){
        console.log(`Rodada- ${round}`);

        //sorteio do bloco , se será uma disputa e uma reta , curva ou embate

        let block = await getRandomBlock();
        console.log(`Bloco: ${block}`);

        
let diceResult1 = await rollDice();
let diceResult2 = await rollDice();

let totalTesteSkill1=0;
let totalTesteSkill2=0;
let powerResult1 = 0;
let powerResult2 = 0;

if(block =='RETA'){
    totalTesteSkill1=diceResult1+character1.velocidade;
    totalTesteSkill2=diceResult2+character2.velocidade;
   
    await logRollResult(character1.nome,"velocidade",diceResult1,character1.velocidade);
    await logRollResult(character2.nome,"velocidade",diceResult2,character2.velocidade);
}
if(block =='CURVA'){
    totalTesteSkill1=diceResult1+character1.manobrabilidade
    totalTesteSkill2=diceResult2+character2.manobrabilidade
    await logRollResult(character1.nome,"manobrabilidade",diceResult1,character1.manobrabilidade);
    await logRollResult(character2.nome,"manobrabilidade",diceResult2,character2.manobrabilidade);
}
if(block =='CONFRONTO'){
    powerResult1 = diceResult1+character1.poder
    powerResult2 = diceResult2+character2.poder
    await logRollResult(character1.nome,"poder",diceResult1,character1.poder);
    await logRollResult(character2.nome,"poder",diceResult2,character2.poder); 
    console.log(`${character1.nome} confrontou com ${character2.nome}!`);

    if(powerResult1 > powerResult2){
        if(character2.pontos>0){
            console.log(`O ${character1.nome} Venceu este confronto!!`);
            character2.pontos--;
            console.log(`O ${character2.nome} Levou uma porrada e perdeu esta rodada!!`);
        }
            
    }

    if(powerResult2 > powerResult1){
        if(character1.pontos>0){
            console.log(`O ${character2.nome} Venceu este confronto!!`);
            character1.pontos--;
            console.log(`O ${character1.nome} Levou uma porrada e perdeu esta rodada!!`); 
        }
            
    }

    if(powerResult2 === powerResult1){
        console.log("Confronto empatado ! Nenhum ponto foi perdido");
    }
}

// para  reta e curvas
if (totalTesteSkill1 > totalTesteSkill2){
    console.log(`${character1.nome} marcou um ponto!`);
    character1.pontos++;
}
if(totalTesteSkill2 > totalTesteSkill1){
    console.log(`${character2.nome} marcou um ponto!`);
    character2.pontos++;
}
// fim

//para o confronto







console.log("-- -- -- -- -- -- -- -- -- -- --")


    }
//rolar os dados

}


async function declareWinner(char1,char2){
    console.log("Resultado Final:")
    console.log(`${char1.nome}: ${char1.pontos} pontos`)
    console.log(`${char2.nome}: ${char2.pontos} pontos`)

    if(char1.pontos>char2.pontos){
        console.log(`\n${char1.nome} venceu a corrida! Parabens! 🏆`);
    }else if(char2.pontos>char1.pontos){
        console.log(`\n${char2.nome} venceu a corrida! Parabens! 🏆`);
    }else{
        console.log(`A corrida terminou em empate !`);
    }


}





//esta funcção irá chamar as outras , nossa funcção de entrada
(async function main(){
    console.log(`Bandeirada!!! - Corrida entre ${player1.nome} e ${player2.nome}  Começou...\n`);


    //faço a chamada da função de inicio da corrida
    await playRaceEngine(player1,player2);

    await declareWinner(player1,player2);


})();//estas () serve para indicar que a função é auto invocavel para não ter que ficar chamando


//pareu na blocks (switch case)
