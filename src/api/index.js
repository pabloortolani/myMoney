import Rest from '../utils/rest';

const baseUrl = 'https://mymoney-pablo.firebaseio.com/';

const {useGet, usePost, useDelete, usePath} = Rest(baseUrl); 

export const useMesApi = (data) => {
    const infoMes = useGet(`meses/${data}`);
    const [postPatch, alterarMes] = usePath(`meses/${data}`);
    return {infoMes, alterarMes};
}

export const useMovimentacaoApi = (data) => {
    const movimentacoes = useGet(`movimentacoes/${data}`);
    const [postData, salvarNovaMovimentacao] = usePost(`movimentacoes/${data}`);
    const [removeData, removerMovimentacao] = useDelete();
    return {movimentacoes, salvarNovaMovimentacao, removerMovimentacao};
}