import  React, {useState} from 'react';
import Rest from '../utils/rest';
import Meses from './Home/Meses';

const baseUrl = 'https://mymoney-pablo.firebaseio.com/';

const {useGet, usePost, useDelete, usePath} = Rest(baseUrl); 

const Movimentacoes = ({match}) => {

    const data = useGet(`movimentacoes/${match.params.data}`);
    const dataMeses = useGet(`meses/${match.params.data}`);
    const [postPatch, patch] = usePath();
    const [postData, salvar] = usePost(`movimentacoes/${match.params.data}`);
    const [removeData, remover] = useDelete();
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState(0);

    const onChangeDescricao = evt => {
        setDescricao(evt.target.value);
    }

    const onChangeValor = evt => {
        setValor(evt.target.value);
    }

    const salvarMovimentacao = async() => {
        if(!isNaN(valor) && valor.search(/^[-]?\d+(\.)?\d+?$/) >= 0){
            await salvar({
                descricao: descricao,
                valor: parseFloat(valor)
            })
            setDescricao('');
            setValor(0);
            data.refetch();
            setTimeout(()=>{
                dataMeses.refetch();
            }, 5000) 
        }
    }

    const removerMovimentacao = async(id) => {
        await remover(`movimentacoes/${match.params.data}/${id}`);
        data.refetch();
        setTimeout(()=>{
            dataMeses.refetch();
        }, 5000)
    }

    const alterarPrevisaoEntrada = (evt) => {
        patch(`meses/${match.params.data}`, {previsao_entrada: evt.target.value});
    }

    const alterarPrevisaoSaida = (evt) => {
        patch(`meses/${match.params.data}`, {previsao_saida: evt.target.value});
    }

    return(
        <div className="container">
            <h1>Movimetações</h1>
            {!dataMeses.loading && dataMeses.data &&
            <div>
                Previsão Entrada: {dataMeses.data.previsao_entrada} <input type="text" onBlur={alterarPrevisaoEntrada}/> / Previsão Saída: {dataMeses.data.previsao_saida} <input type="text" onBlur={alterarPrevisaoSaida}/><br/>
                Entradas: {dataMeses.data.entradas} / Saídas: {dataMeses.data.saidas}
            </div>
            }
            <table className="table">
                <thead>
                    <th>Decrição</th>
                    <th>Valor</th>
                </thead>
                <tbody>
                    { data.data &&
                    Object
                    .keys(data.data)
                    .map(movimentacao => {
                        return(
                        <tr key={movimentacao}>
                            <td>{data.data[movimentacao].descricao}</td>
                            <td className="text-right">
                                {data.data[movimentacao].valor} {' '}
                                <button className="btn btn-danger" onClick={() => removerMovimentacao(movimentacao)}>-</button>
                            </td>
                        </tr>
                        )
                    })
                    }
                    <tr>
                        <td><input type="text" value={descricao} onChange={onChangeDescricao}></input></td>
                        <td className="text-right">
                            <input type="text" value={valor} onChange={onChangeValor}></input> {' '}
                            <button className="btn btn-success" onClick={salvarMovimentacao}>+</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Movimentacoes;