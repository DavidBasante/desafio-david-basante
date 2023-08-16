class CaixaDaLanchonete {
    constructor() {
        this.cardapio = {
            cafe: { item: "Café", valor: 3.00 },
            chantily: { item: "Chantily (extra do Café)", valor: 1.50 },
            suco: { item: "Suco Natural", valor: 6.20 },
            sanduiche: { item: "Sanduíche", valor: 6.50 },
            queijo: { item: "Queijo (extra do Sanduíche)", valor: 2.00 },
            salgado: { item: "Salgado", valor: 7.25 },
            combo1: { item: "1 Suco e 1 Sanduíche", valor: 9.50 },
            combo2: { item: "1 Café e 1 Sanduíche", valor: 7.50 },
        };
    }

    temNoCardapio(codigo) {
        return this.cardapio.hasOwnProperty(codigo);
    }

    calcularValorDaCompra(metodoDePagamento, itens) {
        if (!['debito', 'credito', 'dinheiro'].includes(metodoDePagamento)) {
            return "Forma de pagamento inválida!";
        }

        if (itens.length === 0) {
            return "Não há itens no carrinho de compra!";
        }

        let valorTotal = 0;
        const quantidadeItens = {};

        for (const item of itens) {
            const [codigoItem, quantidade] = item.split(",");
            
            if (!this.temNoCardapio(codigoItem)) {
                return "Item inválido!";
            }

            if (quantidade <= 0) {
                return "Quantidade inválida!";
            }
            
            const valorItem = this.cardapio[codigoItem].valor * quantidade;
            
            if (quantidadeItens[codigoItem]) {
                quantidadeItens[codigoItem] += quantidade;
            } else {
                quantidadeItens[codigoItem] = quantidade;
            }

            // Verificar se item extra foi pedido sem o principal
            if (this.cardapio[codigoItem].item.includes("extra") && !this.temNoCardapio(codigoItem.replace("extra", ""))) {
                return "Item extra não pode ser pedido sem o principal";
            }

            valorTotal += valorItem;
        }

        if (metodoDePagamento === "dinheiro") {
            valorTotal *= 0.95;
        } else if (metodoDePagamento === "credito") {
            valorTotal *= 1.03;
        }

        return `R$ ${valorTotal.toFixed(2).replace('.', ',')}`;
    }
}

export { CaixaDaLanchonete };