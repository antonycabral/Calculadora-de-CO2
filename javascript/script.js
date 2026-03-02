/* ============================================
   CALCULADORA DE EMISSÃO DE CO2 - JAVASCRIPT
   ============================================ */

// ============================================
// DADOS DE EMISSÃO POR VEÍCULO (kg CO2/km)
// ============================================
const emissionData = {
    carro: {
        name: 'Carro',
        icon: '🚗',
        emissionPerKm: 0.192, // kg CO2 por km
        description: 'Carro de passeio médio (gasolina)'
    },
    moto: {
        name: 'Moto',
        icon: '🏍️',
        emissionPerKm: 0.084, // kg CO2 por km
        description: 'Motocicleta convencional'
    },
    onibus: {
        name: 'Ônibus',
        icon: '🚌',
        emissionPerKm: 0.089, // kg CO2 por km por passageiro
        description: 'Ônibus convencional (por passageiro)'
    },
    aviao: {
        name: 'Avião',
        icon: '✈️',
        emissionPerKm: 0.255, // kg CO2 por km por passageiro
        description: 'Avião comercial (por passageiro)'
    },
    trem: {
        name: 'Trem',
        icon: '🚆',
        emissionPerKm: 0.041, // kg CO2 por km por passageiro
        description: 'Trem elétrico (por passageiro)'
    },
    bicicleta: {
        name: 'Bicicleta',
        icon: '🚲',
        emissionPerKm: 0, // kg CO2 por km
        description: 'Transporte sustentável - Zero emissões'
    }
};

// ============================================
// ROTAS PRÉ-DEFINIDAS - CAPITAIS DO NORDESTE
// ============================================
const predefinedRoutes = {
    // Aracaju
    'aracaju-salvador': { origin: 'Aracaju, SE', destination: 'Salvador, BA', distance: 356 },
    'aracaju-maceio': { origin: 'Aracaju, SE', destination: 'Maceió, AL', distance: 294 },
    'aracaju-recife': { origin: 'Aracaju, SE', destination: 'Recife, PE', distance: 502 },
    
    // Salvador
    'salvador-aracaju': { origin: 'Salvador, BA', destination: 'Aracaju, SE', distance: 356 },
    'salvador-fortaleza': { origin: 'Salvador, BA', destination: 'Fortaleza, CE', distance: 1389 },
    'salvador-recife': { origin: 'Salvador, BA', destination: 'Recife, PE', distance: 839 },
    'salvador-maceio': { origin: 'Salvador, BA', destination: 'Maceió, AL', distance: 632 },
    
    // Fortaleza
    'fortaleza-natal': { origin: 'Fortaleza, CE', destination: 'Natal, RN', distance: 537 },
    'fortaleza-teresina': { origin: 'Fortaleza, CE', destination: 'Teresina, PI', distance: 634 },
    'fortaleza-joao-pessoa': { origin: 'Fortaleza, CE', destination: 'João Pessoa, PB', distance: 688 },
    'fortaleza-salvador': { origin: 'Fortaleza, CE', destination: 'Salvador, BA', distance: 1389 },
    'fortaleza-sao-luis': { origin: 'Fortaleza, CE', destination: 'São Luís, MA', distance: 1070 },
    
    // Recife
    'recife-joao-pessoa': { origin: 'Recife, PE', destination: 'João Pessoa, PB', distance: 120 },
    'recife-natal': { origin: 'Recife, PE', destination: 'Natal, RN', distance: 297 },
    'recife-maceio': { origin: 'Recife, PE', destination: 'Maceió, AL', distance: 285 },
    'recife-salvador': { origin: 'Recife, PE', destination: 'Salvador, BA', distance: 839 },
    'recife-aracaju': { origin: 'Recife, PE', destination: 'Aracaju, SE', distance: 502 },
    
    // Natal
    'natal-joao-pessoa': { origin: 'Natal, RN', destination: 'João Pessoa, PB', distance: 185 },
    'natal-fortaleza': { origin: 'Natal, RN', destination: 'Fortaleza, CE', distance: 537 },
    'natal-recife': { origin: 'Natal, RN', destination: 'Recife, PE', distance: 297 },
    
    // João Pessoa
    'joao-pessoa-recife': { origin: 'João Pessoa, PB', destination: 'Recife, PE', distance: 120 },
    'joao-pessoa-natal': { origin: 'João Pessoa, PB', destination: 'Natal, RN', distance: 185 },
    'joao-pessoa-fortaleza': { origin: 'João Pessoa, PB', destination: 'Fortaleza, CE', distance: 688 },
    
    // Maceió
    'maceio-recife': { origin: 'Maceió, AL', destination: 'Recife, PE', distance: 285 },
    'maceio-aracaju': { origin: 'Maceió, AL', destination: 'Aracaju, SE', distance: 294 },
    'maceio-salvador': { origin: 'Maceió, AL', destination: 'Salvador, BA', distance: 632 },
    
    // Teresina
    'teresina-fortaleza': { origin: 'Teresina, PI', destination: 'Fortaleza, CE', distance: 634 },
    'teresina-sao-luis': { origin: 'Teresina, PI', destination: 'São Luís, MA', distance: 446 },
    
    // São Luís
    'sao-luis-teresina': { origin: 'São Luís, MA', destination: 'Teresina, PI', distance: 446 },
    'sao-luis-fortaleza': { origin: 'São Luís, MA', destination: 'Fortaleza, CE', distance: 1070 },
};

// ============================================
// VARIÁVEIS GLOBAIS
// ============================================
let selectedVehicle = null;
let calculatedDistance = 0;
let currentEmission = 0;

// ============================================
// INICIALIZAÇÃO
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupVehicleSelection();
    setupRouteForm();
    setupRouteAutocomplete();
    setupPopularRoutes();
    updateFooterDate();
    
    console.log('🌍 Calculadora de CO2 inicializada!');
}

// ============================================
// SELEÇÃO DE VEÍCULOS
// ============================================
function setupVehicleSelection() {
    const vehicleCards = document.querySelectorAll('.vehicle-card');
    
    vehicleCards.forEach(card => {
        card.addEventListener('click', function() {
            const input = this.querySelector('.vehicle-card__input');
            if (input) {
                input.checked = true;
                selectedVehicle = input.value;
                
                // Remove seleção de outros cards
                vehicleCards.forEach(c => c.classList.remove('selected'));
                this.classList.add('selected');
                
                console.log(`✅ Veículo selecionado: ${selectedVehicle}`);
            }
        });
    });
    
    // Listener para inputs de rádio
    const radioInputs = document.querySelectorAll('.vehicle-card__input');
    radioInputs.forEach(input => {
        input.addEventListener('change', function() {
            selectedVehicle = this.value;
            console.log(`✅ Veículo selecionado: ${selectedVehicle}`);
        });
    });
}

// ============================================
// FORMULÁRIO DE ROTA
// ============================================
function setupRouteForm() {
    const form = document.getElementById('routeForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        calculateEmissions();
    });
}

// ============================================
// AUTOCOMPLETE PARA ROTAS
// ============================================
function setupRouteAutocomplete() {
    const originInput = document.getElementById('origin');
    const destinationInput = document.getElementById('destination');
    const distanceInput = document.getElementById('distance');
    
    // Criar elemento de feedback visual
    const routeFeedback = document.createElement('div');
    routeFeedback.id = 'route-feedback';
    routeFeedback.style.cssText = `
        margin-top: 0.5rem;
        padding: 0.75rem;
        border-radius: 0.5rem;
        font-size: 0.9rem;
        font-weight: 600;
        display: none;
        align-items: center;
        gap: 0.5rem;
    `;
    distanceInput.parentElement.appendChild(routeFeedback);
    
    // Quando origem ou destino mudam, tentar encontrar rota pré-definida
    function checkPredefinedRoute() {
        const origin = originInput.value.toLowerCase().trim();
        const destination = destinationInput.value.toLowerCase().trim();
        
        if (!origin || !destination) {
            routeFeedback.style.display = 'none';
            return;
        }
        
        // Normalizar nomes das cidades removendo acentos e caracteres especiais
        const normalizeCity = (city) => {
            return city
                .split(',')[0]
                .trim()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .toLowerCase()
                .replace(/\s+/g, '-');
        };
        
        const originCity = normalizeCity(origin);
        const destinationCity = normalizeCity(destination);
        
        // Criar chave de busca
        const routeKey = `${originCity}-${destinationCity}`;
        
        if (predefinedRoutes[routeKey]) {
            const route = predefinedRoutes[routeKey];
            distanceInput.value = route.distance;
            
            // Mostrar feedback positivo
            routeFeedback.innerHTML = `✅ Rota encontrada: <strong>${route.distance} km</strong>`;
            routeFeedback.style.backgroundColor = 'var(--color-success)';
            routeFeedback.style.color = 'white';
            routeFeedback.style.display = 'flex';
            
            console.log(`📍 Rota encontrada: ${route.origin} → ${route.destination} (${route.distance} km)`);
        } else {
            // Mostrar que a rota não foi encontrada
            if (origin && destination) {
                routeFeedback.innerHTML = `ℹ️ Rota não cadastrada. Informe a distância manualmente.`;
                routeFeedback.style.backgroundColor = 'var(--color-gray-300)';
                routeFeedback.style.color = 'var(--color-gray-800)';
                routeFeedback.style.display = 'flex';
            }
        }
    }
    
    // Adicionar eventos em múltiplos momentos
    originInput.addEventListener('input', checkPredefinedRoute);
    originInput.addEventListener('change', checkPredefinedRoute);
    originInput.addEventListener('blur', checkPredefinedRoute);
    
    destinationInput.addEventListener('input', checkPredefinedRoute);
    destinationInput.addEventListener('change', checkPredefinedRoute);
    destinationInput.addEventListener('blur', checkPredefinedRoute);
    
    // Adicionar datalist com sugestões
    createCityDatalist();
}

function createCityDatalist() {
    const cities = [
        'Aracaju, SE',
        'Salvador, BA',
        'Fortaleza, CE',
        'Recife, PE',
        'Natal, RN',
        'João Pessoa, PB',
        'Maceió, AL',
        'Teresina, PI',
        'São Luís, MA'
    ];
    
    // Criar datalist para origem
    const originDatalist = document.createElement('datalist');
    originDatalist.id = 'cities-list';
    cities.forEach(city => {
        const option = document.createElement('option');
        option.value = city;
        originDatalist.appendChild(option);
    });
    document.body.appendChild(originDatalist);
    
    // Adicionar datalist aos inputs
    document.getElementById('origin').setAttribute('list', 'cities-list');
    document.getElementById('destination').setAttribute('list', 'cities-list');
}

// ============================================
// ROTAS POPULARES
// ============================================
function setupPopularRoutes() {
    const routeChips = document.querySelectorAll('.route-chip');
    const originInput = document.getElementById('origin');
    const destinationInput = document.getElementById('destination');
    const distanceInput = document.getElementById('distance');
    
    routeChips.forEach(chip => {
        chip.addEventListener('click', function() {
            const origin = this.getAttribute('data-origin');
            const destination = this.getAttribute('data-destination');
            const distance = this.getAttribute('data-distance');
            
            // Preencher os campos
            originInput.value = origin;
            destinationInput.value = destination;
            distanceInput.value = distance;
            
            // Adicionar efeito visual
            this.style.backgroundColor = 'var(--color-success)';
            this.style.color = 'white';
            
            setTimeout(() => {
                this.style.backgroundColor = '';
                this.style.color = '';
            }, 500);
            
            // Mostrar feedback
            const routeFeedback = document.getElementById('route-feedback');
            if (routeFeedback) {
                routeFeedback.innerHTML = `✅ Rota selecionada: <strong>${distance} km</strong>`;
                routeFeedback.style.backgroundColor = 'var(--color-success)';
                routeFeedback.style.color = 'white';
                routeFeedback.style.display = 'flex';
            }
            
            // Scroll suave para o botão de calcular
            document.getElementById('calculateBtn').scrollIntoView({ 
                behavior: 'smooth', 
                block: 'nearest' 
            });
            
            console.log(`🎯 Rota popular selecionada: ${origin} → ${destination} (${distance} km)`);
        });
    });
}

// ============================================
// CÁLCULO DE EMISSÕES
// ============================================
function calculateEmissions() {
    // Validações
    if (!selectedVehicle) {
        alert('⚠️ Por favor, selecione um tipo de veículo!');
        return;
    }
    
    const distanceInput = document.getElementById('distance');
    const distance = parseFloat(distanceInput.value);
    
    if (!distance || distance <= 0) {
        alert('⚠️ Por favor, informe uma distância válida!');
        return;
    }
    
    calculatedDistance = distance;
    
    // Calcular emissão
    const vehicleData = emissionData[selectedVehicle];
    currentEmission = distance * vehicleData.emissionPerKm;
    
    console.log(`🧮 Cálculo: ${distance} km × ${vehicleData.emissionPerKm} kg/km = ${currentEmission.toFixed(2)} kg CO2`);
    
    // Exibir resultados
    displayResults();
    displayCarbonCredits();
    displayComparison();
    
    // Scroll suave para resultados
    setTimeout(() => {
        document.getElementById('resultsSection').scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }, 100);
}

// ============================================
// EXIBIR RESULTADOS
// ============================================
function displayResults() {
    const resultsSection = document.getElementById('resultsSection');
    const totalEmissionElement = document.getElementById('totalEmission');
    const emissionDescriptionElement = document.getElementById('emissionDescription');
    const selectedVehicleElement = document.getElementById('selectedVehicle');
    const travelDistanceElement = document.getElementById('travelDistance');
    
    // Mostrar seção
    resultsSection.hidden = false;
    resultsSection.classList.add('fade-in');
    
    // Atualizar valores
    const emissionNumber = totalEmissionElement.querySelector('.result-card__number');
    emissionNumber.textContent = currentEmission.toFixed(2);
    
    // Descrição contextual
    const vehicleData = emissionData[selectedVehicle];
    let description = '';
    
    if (currentEmission === 0) {
        description = '🎉 Parabéns! Você escolheu um meio de transporte totalmente sustentável!';
    } else if (currentEmission < 10) {
        description = '✅ Excelente escolha! Emissão relativamente baixa.';
    } else if (currentEmission < 50) {
        description = '⚠️ Emissão moderada. Considere alternativas mais sustentáveis.';
    } else {
        description = '🚨 Emissão alta! Existem opções mais ecológicas disponíveis.';
    }
    
    emissionDescriptionElement.textContent = description;
    
    // Estatísticas
    selectedVehicleElement.textContent = `${vehicleData.icon} ${vehicleData.name}`;
    travelDistanceElement.textContent = `${calculatedDistance} km`;
}

// ============================================
// CRÉDITOS DE CARBONO
// ============================================
function displayCarbonCredits() {
    const creditsSection = document.getElementById('carbonCreditsSection');
    const creditsNeededElement = document.getElementById('creditsNeeded');
    const treesEquivalentElement = document.getElementById('treesEquivalent');
    const energyEquivalentElement = document.getElementById('energyEquivalent');
    
    // Mostrar seção
    creditsSection.hidden = false;
    creditsSection.classList.add('fade-in');
    
    // Calcular créditos (1 crédito = 1 tonelada de CO2)
    const creditsNeeded = (currentEmission / 1000).toFixed(3);
    creditsNeededElement.textContent = creditsNeeded;
    
    // Equivalências
    // 1 árvore absorve aproximadamente 21.77 kg de CO2 por ano
    const treesNeeded = Math.ceil(currentEmission / 21.77);
    treesEquivalentElement.textContent = `${treesNeeded} árvore${treesNeeded !== 1 ? 's' : ''} plantada${treesNeeded !== 1 ? 's' : ''} (absorção anual)`;
    
    // 1 kWh de carvão gera aprox. 0.95 kg de CO2
    const energyEquivalent = (currentEmission / 0.95).toFixed(0);
    energyEquivalentElement.textContent = `${energyEquivalent} kWh de energia de carvão`;
}

// ============================================
// COMPARAÇÃO ENTRE VEÍCULOS
// ============================================
function displayComparison() {
    const comparisonSection = document.getElementById('comparisonSection');
    const tableBody = document.getElementById('comparisonTableBody');
    const insightsElement = document.getElementById('comparisonInsights');
    
    // Mostrar seção
    comparisonSection.hidden = false;
    comparisonSection.classList.add('fade-in');
    
    // Limpar tabela
    tableBody.innerHTML = '';
    
    // Calcular emissões de todos os veículos
    const comparisons = [];
    
    for (const [vehicleKey, vehicleData] of Object.entries(emissionData)) {
        const emission = calculatedDistance * vehicleData.emissionPerKm;
        const difference = emission - currentEmission;
        const percentDiff = currentEmission > 0 ? ((difference / currentEmission) * 100).toFixed(1) : 0;
        
        comparisons.push({
            key: vehicleKey,
            name: vehicleData.name,
            icon: vehicleData.icon,
            emission: emission,
            difference: difference,
            percentDiff: percentDiff,
            isCurrent: vehicleKey === selectedVehicle
        });
    }
    
    // Ordenar por emissão (menor para maior)
    comparisons.sort((a, b) => a.emission - b.emission);
    
    // Preencher tabela
    comparisons.forEach(comp => {
        const row = document.createElement('tr');
        if (comp.isCurrent) {
            row.style.backgroundColor = 'var(--color-primary-light)';
            row.style.fontWeight = 'bold';
        }
        
        const vehicleCell = document.createElement('td');
        vehicleCell.innerHTML = `${comp.icon} ${comp.name}${comp.isCurrent ? ' (Selecionado)' : ''}`;
        
        const emissionCell = document.createElement('td');
        emissionCell.textContent = comp.emission.toFixed(2);
        emissionCell.style.fontWeight = '600';
        
        const differenceCell = document.createElement('td');
        if (comp.emission === 0) {
            differenceCell.innerHTML = '🌟 Zero emissões';
            differenceCell.style.color = 'var(--color-success)';
        } else if (comp.isCurrent) {
            differenceCell.textContent = '-';
        } else if (comp.difference < 0) {
            differenceCell.innerHTML = `⬇️ ${Math.abs(comp.difference).toFixed(2)} kg (${Math.abs(comp.percentDiff)}% menor)`;
            differenceCell.style.color = 'var(--color-success)';
        } else if (comp.difference > 0) {
            differenceCell.innerHTML = `⬆️ ${comp.difference.toFixed(2)} kg (${comp.percentDiff}% maior)`;
            differenceCell.style.color = 'var(--color-danger)';
        } else {
            differenceCell.textContent = 'Igual';
        }
        
        row.appendChild(vehicleCell);
        row.appendChild(emissionCell);
        row.appendChild(differenceCell);
        tableBody.appendChild(row);
    });
    
    // Insights
    const bestVehicle = comparisons[0];
    const worstVehicle = comparisons[comparisons.length - 1];
    const currentVehicleData = emissionData[selectedVehicle];
    
    let insightHTML = '<h3 class="credits-equivalence__title">💡 Insights</h3>';
    
    if (bestVehicle.key === selectedVehicle) {
        insightHTML += '<p style="color: var(--color-success); font-weight: 600;">🎉 Parabéns! Você escolheu a opção mais sustentável!</p>';
    } else {
        const savings = currentEmission - bestVehicle.emission;
        insightHTML += `<p>💚 <strong>Melhor opção:</strong> ${bestVehicle.icon} ${bestVehicle.name} emite apenas ${bestVehicle.emission.toFixed(2)} kg de CO2</p>`;
        if (savings > 0) {
            insightHTML += `<p>📊 Você economizaria <strong>${savings.toFixed(2)} kg de CO2</strong> (${((savings / currentEmission) * 100).toFixed(1)}%) escolhendo ${bestVehicle.name}!</p>`;
        }
    }
    
    if (worstVehicle.key !== selectedVehicle && currentEmission > 0) {
        const difference = worstVehicle.emission - currentEmission;
        insightHTML += `<p style="color: var(--color-gray-600); margin-top: 1rem;">ℹ️ ${worstVehicle.icon} ${worstVehicle.name} emitiria ${difference.toFixed(2)} kg a mais nesta rota.</p>`;
    }
    
    insightsElement.innerHTML = insightHTML;
}

// ============================================
// UTILITÁRIOS
// ============================================
function updateFooterDate() {
    const dateElement = document.getElementById('currentDate');
    if (dateElement) {
        const now = new Date();
        const options = { year: 'numeric', month: 'long' };
        const dateString = now.toLocaleDateString('pt-BR', options);
        dateElement.textContent = dateString.charAt(0).toUpperCase() + dateString.slice(1);
    }
}

// ============================================
// EXEMPLOS DE USO (para testes no console)
// ============================================
window.co2Calculator = {
    // Calcular emissão direta
    calculate: function(vehicle, distance) {
        if (!emissionData[vehicle]) {
            console.error('Veículo não encontrado');
            return null;
        }
        return distance * emissionData[vehicle].emissionPerKm;
    },
    
    // Listar rotas disponíveis
    listRoutes: function() {
        console.table(predefinedRoutes);
    },
    
    // Ver dados de emissão
    listVehicles: function() {
        console.table(emissionData);
    }
};

console.log('💡 Dica: Use window.co2Calculator para acessar funções úteis no console!');
