import React from 'react';
import Rest from '../../utils/rest';
import {Link, Redirect} from 'react-router-dom';

const baseUrl = 'https://mymoney-pablo.firebaseio.com/';

const {useGet} = Rest(baseUrl); 

const Meses = () => {
    const data = useGet('meses');
    console.log('aaa >>>> '+JSON.stringify(data));
    if(data.loading){
        return <p>loading</p>;
    }
    
    if(data.error && data.error === 'Permission denied'){
        console.log('teste');
        return <Redirect to="/login" />
    }
    
    return(
        <table className="table">
            {Object.keys(data.data).length > 0 && 
            <thead>
                <th>Mês</th>
                <th>Previsão de Entrada</th>
                <th>Entrada</th>
                <th>Previsão de Saída</th>
                <th>Saída</th>
            </thead>
            }
            <tbody>
                {
                Object
                .keys(data.data)
                .map(mes => {
                    return(
                    <tr key={mes}>
                        <td><Link to={`/movimentacoes/${mes}`}>{mes}</Link></td>
                        <td>{data.data[mes].previsao_entrada}</td>
                        <td>{data.data[mes].entradas}</td>
                        <td>{data.data[mes].previsao_saida}</td>
                        <td>{data.data[mes].saidas}</td>
                    </tr>
                    )
                })
                }
            </tbody>
        </table>
    )
    
}

export default Meses;