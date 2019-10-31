import React from 'react';
import {useMesApi} from '../../api';

const InfoMes = ({data}) => {

    const {infoMes, alterarMes} = useMesApi(data);

    const alterarPrevisaoEntrada = (evt) => {
        alterarMes({previsao_entrada: evt.target.value});
    }

    const alterarPrevisaoSaida = (evt) => {
        alterarMes({previsao_saida: evt.target.value});
    }

    if(infoMes.loading){
        return <h1>Carregando...</h1>
    }
    if(infoMes.data){
        return(
            <div>
                Previsão Entrada: {infoMes.data.previsao_entrada} <input type="text" onBlur={alterarPrevisaoEntrada}/> / Previsão Saída: {infoMes.data.previsao_saida} <input type="text" onBlur={alterarPrevisaoSaida}/><br/>
                Entradas: {infoMes.data.entradas} / Saídas: {infoMes.data.saidas}
            </div>
        )
    }
    return null;
}

export default InfoMes;