const functions = require('firebase-functions'); // Vaipermitir criar as funções
const admin = require('firebase-admin'); // Acesso geral ao banco de dados

admin.initializeApp(); // Logar no firebase

/* Exporta para o firebase uma função chamada "soma", 
qualquer movimentação que ocorrer em "/movimentacoes/{dia}" execute a função "soma" */
exports.soma = functions.database.ref('/movimentacoes/{dia}')
/* Toda vez que eu escrever algo em "/movimentacoes/{dia}" execute essa função assincrona
change = Mudança em si
context = Contexto da mudança
*/
.onWrite(async(change, context) => {
    // Pega a referencia do mês. Exemplo de como pode vir a referência "/meses/2019-08/".
    const mesesRef = admin.database().ref('/meses/'+context.params.dia);
    // Referência da onde eu estou. after: Depois que ela acontecer.
    const movimentacoesRef = change.after.ref;
    // Armazena na constante o Snapshot (Foto Instantanea). Vou esperar o "movimentacoesRef" me trazer os dados.
    const movimentacoesSS = await movimentacoesRef.once('value');
    // Toda vez que usa o "Once" retorna um Snapshot, tem que converter em dados de verdade.
    const movimentacoes = movimentacoesSS.val();

    let entradas = 0;
    let saidas = 0;

    //Percorre objeto para calcular as entradas e saídas
    Object.keys(movimentacoes).forEach(m => {
        if(movimentacoes[m].valor > 0){
            entradas += movimentacoes[m].valor;
        }else{
            saidas += movimentacoes[m].valor;
        }
    })

    //Atualiza no firebase as entradas e saídas
    return mesesRef.transaction(current => {
        if(current === null){
            return{
                entradas,
                saidas,
                previsao_entrada: 0,
                previsao_saida: 0
            }
        }else{
            return{
                ...current,
                entradas,
                saidas
            }
        }
    })

});
