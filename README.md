# 🌍 Calculadora de Emissão de CO2

Calculadora web interativa para estimar emissões de CO2 de diferentes meios de transporte, com foco em rotas entre capitais do Nordeste brasileiro.

## 📋 Sobre o Projeto

Este projeto foi desenvolvido como parte do curso de **GitHub Copilot** da **DIO (Digital Innovation One)**. A aplicação permite calcular e comparar as emissões de carbono de diferentes tipos de veículos em rotas específicas, promovendo a conscientização ambiental.

## ✨ Funcionalidades

- 🚗 **Seleção de Veículos**: Escolha entre 6 tipos diferentes (carro, moto, ônibus, avião, trem, bicicleta)
- 📍 **Rotas Pré-definidas**: 30+ rotas entre capitais do Nordeste
- 🧮 **Cálculo Automático**: Emissões calculadas em tempo real
- 🌳 **Créditos de Carbono**: Visualize equivalências em árvores e energia
- 📊 **Comparação de Veículos**: Compare emissões entre todos os meios de transporte
- 📱 **Design Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- 🎨 **Interface Moderna**: Paleta verde-azul com gradientes e animações suaves

## 🎯 Capitais do Nordeste Incluídas

- **BA** - Salvador
- **SE** - Aracaju
- **AL** - Maceió
- **PE** - Recife
- **PB** - João Pessoa
- **RN** - Natal
- **CE** - Fortaleza
- **PI** - Teresina
- **MA** - São Luís

## 📊 Dados de Emissão

| Veículo | Emissão (kg CO2/km) |
|---------|---------------------|
| Bicicleta | 0.000 |
| Trem | 0.041 |
| Moto | 0.084 |
| Ônibus | 0.089 |
| Carro | 0.192 |
| Avião | 0.255 |

*Valores baseados em médias de emissões por passageiro*

## 🚀 Como Usar

1. Abra o arquivo `index.html` no seu navegador
2. Selecione o tipo de veículo desejado
3. Escolha ou digite a origem e o destino (use as capitais do Nordeste para rotas pré-definidas)
4. Clique em "Calcular Emissões"
5. Visualize os resultados, créditos de carbono e comparações

### Exemplo de Uso

```
Origem: Recife, PE
Destino: João Pessoa, PB
Veículo: Carro
Distância: 120 km
Resultado: 23.04 kg de CO2
```

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica e acessível
- **CSS3**: Design responsivo com variáveis CSS e gradientes
- **JavaScript**: Lógica de cálculo e manipulação do DOM
- **Metodologia BEM**: Organização de classes CSS

## 📁 Estrutura do Projeto

```
Calculadora-de-CO2/
│
├── index.html              # Página principal
├── Style/
│   └── style.css          # Estilos e responsividade
├── javascript/
│   └── script.js          # Lógica e cálculos
├── README.md              # Documentação
└── LICENSE                # Licença do projeto
```

## 💻 Desenvolvimento

### Pré-requisitos

- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Editor de código (VS Code recomendado)

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/Calculadora-de-CO2.git
```

2. Navegue até o diretório:
```bash
cd Calculadora-de-CO2
```

3. Abra o `index.html` no navegador ou use um servidor local:
```bash
# Com Python 3
python -m http.server 8000

# Com Node.js (http-server)
npx http-server
```

## 🎨 Paleta de Cores

- **Verde Primário**: `#00b894`
- **Azul Secundário**: `#0984e3`
- **Azul-Verde Accent**: `#00cec9`
- **Gradientes**: Transições suaves entre verde e azul

## 🧪 Testes no Console

O projeto inclui funções auxiliares acessíveis via console:

```javascript
// Calcular emissão diretamente
window.co2Calculator.calculate('carro', 100);

// Listar todas as rotas
window.co2Calculator.listRoutes();

// Ver dados dos veículos
window.co2Calculator.listVehicles();
```

## 📱 Responsividade

- **Desktop**: Layout completo com grid de 6 colunas
- **Tablet (≤768px)**: Grid adaptativo de 3 colunas
- **Mobile (≤480px)**: Grid de 2 colunas com layout vertical

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fazer um Fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abrir um Pull Request

## 📝 Melhorias Futuras

- [ ] Integração com API de mapas para cálculo automático de distância
- [ ] Exportar relatórios em PDF
- [ ] Gráficos interativos com Chart.js
- [ ] Modo escuro
- [ ] Histórico de cálculos
- [ ] Compartilhamento em redes sociais
- [ ] Mais regiões do Brasil

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

Desenvolvido como projeto do curso **GitHub Copilot** da **DIO**

---

**Desenvolvido com 💚 para um mundo mais sustentável**

*Março de 2026*

projeto de calculadora de C02 feito com github copilot para o curso de GitHub Copilot da DIO
