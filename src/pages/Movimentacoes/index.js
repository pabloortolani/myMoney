import  React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import {useMovimentacaoApi} from '../../api';
import InfoMes from './infoMes';
import AdicionarMovimentacao from './AdicionarMovimentacao';

const Movimentacoes = ({match}) => {
    const {movimentacoes, salvarNovaMovimentacao, removerMovimentacao} = useMovimentacaoApi(match.params.data);

    const salvarMovimentacao = async(dados) => {
        await salvarNovaMovimentacao(dados)
        movimentacoes.refetch();
        setTimeout(()=>{
            //infoMes.refetch();
        }, 5000)
    }

    const removerMovimentacaoClick = async(id) => {
        await removerMovimentacao(`movimentacoes/${match.params.data}/${id}`);
        movimentacoes.refetch();
        setTimeout(()=>{
            //infoMes.refetch();
        }, 5000)
    }
    
    if(movimentacoes.error === 'Permission denied'){
        return <Redirect to="/login" />
    }

    return(
        <div className="container">
            <h1>Movimetações</h1>
            <InfoMes data={match.params.data}/>
            <table className="table">
                <thead>
                    <th>Decrição</th>
                    <th>Valor</th>
                </thead>
                <tbody>
                    { movimentacoes.data &&
                    Object
                    .keys(movimentacoes.data)
                    .map(movimentacao => {
                        return(
                        <tr key={movimentacao}>
                            <td>{movimentacoes.data[movimentacao].descricao}</td>
                            <td className="text-right">
                                {movimentacoes.data[movimentacao].valor} {' '}
                                <button className="btn btn-danger" onClick={() => removerMovimentacaoClick(movimentacao)}>-</button>
                            </td>
                        </tr>
                        )
                    })
                    }
                    <AdicionarMovimentacao salvarNovaMovimentacao={salvarMovimentacao} />
                </tbody>
            </table>
        </div>
    )
}

export default Movimentacoes;