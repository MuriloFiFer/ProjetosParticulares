// Variáveis para armazenar recursos
let water = 50;
let food = 50;
let minerals = 50;
let energy = 50;

// Variáveis para o jogo
let days = 1;
let colonyName = "";
let playerName = "";

// Limite mínimo de recursos para sobrevivência
const minResourceLevel = 10;

// Função para começar o jogo
function startGame() {
    playerName = document.getElementById("playerName").value;
    colonyName = document.getElementById("colonyName").value;
    showIntro(); // Exibir introdução ao iniciar o jogo
    document.getElementById("gameInfo").style.display = "none";
    document.getElementById("resources").style.display = "block";
    document.getElementById("exploreBtn").style.display = "inline-block";
    document.getElementById("buildHabitatBtn").style.display = "inline-block";
    document.getElementById("buildFarmBtn").style.display = "inline-block";
    document.getElementById("buildMineBtn").style.display = "inline-block";
    document.getElementById("buildPowerplantBtn").style.display = "inline-block";
    updateDayCounter();
    updateColonyNameDisplay();
    updatePlayerNameDisplay();
    checkSurvival(); // Verificar condição de sobrevivência ao iniciar o jogo
}

// Função para atualizar a exibição do contador de dias na tela
function updateDayCounter() {
    document.getElementById("dayCounter").textContent = "Dia " + days;
}

// Função para atualizar o nome da colônia exibido na tela
function updateColonyNameDisplay() {
    document.getElementById("colonyNameDisplay").textContent = "Local da Colônia: " + colonyName;
}

// Função para atualizar o nome do jogador exibido na tela
function updatePlayerNameDisplay() {
    document.getElementById("playerNameDisplay").textContent = "Comandante: " + playerName;
}

// Função para exibir introdução
function showIntro() {
    alert("Bem-vindo ao jogo de sobrevivência espacial!\n\nComandante: " + playerName + "\n\nVocê é o líder de uma colônia espacial em um planeta distante. Após anos de exploração, sua colônia está enfrentando dificuldades devido à escassez de recursos. Sua missão é garantir a sobrevivência da colônia, explorando novos planetas em busca de recursos, construindo e gerenciando infraestruturas vitais e enfrentando desafios espaciais. Boa sorte, comandante " + playerName + "!");
}

// Função para explorar planetas
function explore() {
    // Incrementa o número de dias
    days++;

    // Simulação de recursos aleatórios encontrados
    water += Math.floor(Math.random() * 10);
    food += Math.floor(Math.random() * 10);
    minerals += Math.floor(Math.random() * 10);
    energy += Math.floor(Math.random() * 10);

    // Eventos aleatórios
    let randomEvent = Math.random();
    if (randomEvent < 0.05) {
        alert("Você encontrou uma veia rica em minerais!");
        minerals += 50;
    } else if (randomEvent < 0.1) {
        alert("Uma tempestade solar danificou suas usinas de energia!");
        energy -= 20;
    } else if (randomEvent < 0.15) {
        alert("Piratas espaciais atacaram sua colônia!");
        water -= 30;
        food -= 30;
        minerals -= 30;
        energy -= 30;
    }

    // Atualiza a exibição de recursos, o contador de dias e o nome da colônia
    updateResources();
    updateDayCounter();
    updateColonyNameDisplay();
    updatePlayerNameDisplay();
    checkSurvival(); // Verificar condição de sobrevivência após explorar
}

// Função para construir edifícios
function build(building) {
    // Verifica se há recursos suficientes para construir o edifício selecionado
    let waterCost, foodCost, mineralsCost, energyCost;
    let advantage = "";
    switch(building) {
        case 'habitat':
            waterCost = 10;
            foodCost = 10;
            mineralsCost = 10;
            energyCost = 10;
            advantage = "Mais espaço habitável!";
            break;
        // Adicione outros casos conforme necessário
    }

    // Verificação se há recursos suficientes
    if (water >= waterCost && food >= foodCost && minerals >= mineralsCost && energy >= energyCost) {
        water -= waterCost;
        food -= foodCost;
        minerals -= mineralsCost;
        energy -= energyCost;

        // Atualiza a exibição de recursos
        updateResources();

        // Mostra vantagem da construção
        alert("Construção concluída! " + advantage);

        // Incrementa o número de dias
        days++;

        // Atualiza a exibição do contador de dias
        updateDayCounter();

        // Verificar condição de sobrevivência após construir
        checkSurvival();
    } else {
        alert("Recursos insuficientes para construir " + building);
    }
}

// Função para verificar a condição de sobrevivência
function checkSurvival() {
    if (water < minResourceLevel || food < minResourceLevel || minerals < minResourceLevel || energy < minResourceLevel) {
        // Se algum recurso estiver abaixo do limite mínimo, o jogador perde o jogo
        alert("Recursos críticos estão baixos! A colônia não pode mais sobreviver. Tentando se recuperar...");

        // Espera por 3 segundos antes de verificar novamente a condição de sobrevivência
        setTimeout(function() {
            if (water < minResourceLevel || food < minResourceLevel || minerals < minResourceLevel || energy < minResourceLevel) {
                alert("Recursos críticos continuam baixos! A colônia não pode mais sobreviver. Fim de jogo!");
                // Você pode adicionar aqui alguma ação adicional, como reiniciar o jogo.
                location.reload(); // Reinicia o jogo, recarregando a página
            }
        }, 3000);
    }
}

// Função para atualizar a exibição de recursos na tela
function updateResources() {
    document.getElementById("water").textContent = water;
    document.getElementById("food").textContent = food;
    document.getElementById("minerals").textContent = minerals;
    document.getElementById("energy").textContent = energy;
}
