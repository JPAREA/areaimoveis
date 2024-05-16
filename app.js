document.getElementById('viabilityCalculator').addEventListener('submit', function(event) {
    event.preventDefault();
    performCalculations();
});

function performCalculations() {
    const fetchInputValue = id => {
        let value = document.getElementById(id).value;
        value = value.replace(/[R$\s.]/g, '').replace(',', '.');
        return parseFloat(value) || 0;
    };

    // Valores do imóvel
    let estimatedBidValue = fetchInputValue('estimatedBidValue');
    let estimatedSaleValue = fetchInputValue('estimatedSaleValue');
    
    // Leiloeiro
    let auctioneerFeePercentage = fetchInputValue('auctioneerFee');
    let auctioneerFee = auctioneerFeePercentage / 100 * estimatedBidValue;

    // Custos de documentação
    let deedCosts = fetchInputValue('deedCosts');
    let funrejus = fetchInputValue('funrejus') / 100 * estimatedBidValue;
    let itbi = fetchInputValue('itbi') / 100 * estimatedBidValue;
    let propertyRegistration = fetchInputValue('propertyRegistration');
    let totalDocumentCosts = deedCosts + funrejus + itbi + propertyRegistration;

    // Custos de Imissão na posse
    let lawyerCosts = fetchInputValue('lawyerCosts');
    let processCosts = fetchInputValue('processCosts');
    let totalPosessionCosts = lawyerCosts + processCosts;

    // Custos de Reforma
    let laborCosts = fetchInputValue('laborCosts');
    let materialsCosts = fetchInputValue('materialsCosts');
    let totalReformCosts = laborCosts + materialsCosts;

    // Despesas do imóvel
    let iptu = fetchInputValue('iptu');
    let condoFee = fetchInputValue('condoFee');
    let estimatedTimeToSell = fetchInputValue('estimatedTimeToSell');
    let totalPropertyExpenses = (iptu + condoFee) * estimatedTimeToSell;

    // Custo de venda
    let brokeragePercentage = fetchInputValue('brokerage') / 100;
    let brokerage = brokeragePercentage * estimatedSaleValue;

    // Recursos necessários para operação antes de impostos
    let resourcesForOperationBeforeTax = estimatedBidValue + auctioneerFee + totalDocumentCosts + totalReformCosts + totalPosessionCosts + totalPropertyExpenses + brokerage;

    // Imposto de Renda sobre Ganho de Capital
    let capitalGainTaxPercentage = fetchInputValue('capitalGainTax') / 100;
    let capitalGainTax = capitalGainTaxPercentage * (estimatedSaleValue - resourcesForOperationBeforeTax);

    // Recursos necessários para operação, incluindo imposto
    let totalOperationalCosts = resourcesForOperationBeforeTax + capitalGainTax;

    // Lucro Líquido Final
    let netProfit = estimatedSaleValue - totalOperationalCosts;
    
    // Retorno do Investimento
    let returnOnInvestment = (netProfit / totalOperationalCosts) * 100;
    
    // Performance Renda FIXA
    let selicAnnual = fetchInputValue('selicAnnual') / 100;
    let fixedIncomePerformance = (selicAnnual / 12 * estimatedTimeToSell) * totalOperationalCosts;

    // Exibir resultados
    displayResults(totalOperationalCosts, auctioneerFee, totalDocumentCosts, totalReformCosts, totalPosessionCosts, totalPropertyExpenses, capitalGainTax, brokerage, netProfit, returnOnInvestment, fixedIncomePerformance);
}

function displayResults(totalOperationalCosts, auctioneerFee, totalDocumentCosts, totalReformCosts, totalPosessionCosts, totalPropertyExpenses, capitalGainTax, brokerage, netProfit, returnOnInvestment, fixedIncomePerformance) {
    document.getElementById('results').innerHTML = `
        <h2>Resultado Final</h2>
        <p>Leiloeiro: ${formatCurrency(auctioneerFee)}</p>
        <p>Documentação:  ${formatCurrency(totalDocumentCosts)}</p>
        <p>Custo Reforma:  ${formatCurrency(totalReformCosts)}</p>
        <p>Imissão na Posse:  ${formatCurrency(totalPosessionCosts)}</p>
        <p>Despesas do Imóvel: ${formatCurrency(totalPropertyExpenses)}</p>
        <p>Imposto de Renda sobre Ganho de Capital: ${formatCurrency(capitalGainTax)}</p>
        <p>Corretagem:  ${formatCurrency(brokerage)}</p>
        <p>Lucro Líquido Final:  ${formatCurrency(netProfit)}</p>
        <p>Retorno do Investimento: ${returnOnInvestment.toFixed(2)}%</p>
        <p>Performance Renda FIXA:  ${formatCurrency(fixedIncomePerformance)}</p>
        <p>Recursos necessários para operação:  ${formatCurrency(totalOperationalCosts)}</p>
    `;
}

function formatCurrency(value) {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function recalculate() {
    performCalculations();
}
