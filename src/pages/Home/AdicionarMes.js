import React, {useState, useRef} from 'react';
import {Redirect} from 'react-router-dom';

const minAno = 2019;
const maxAno = 2050;

const AdicionarMes = () => {
    const refAno = useRef();
    const refMes = useRef();
    const [redir, setRedir] = useState('');
    const anos = [];
    const meses = [];
    for(let i = minAno; i <= maxAno; i++){
        anos.push(i);
    }

    const zeroPad = numero => {
        if(numero < 10){
            return '0'+numero;
        }
        return numero;
    }

    for (let i = 1; i <= 12; i++){
        meses.push(zeroPad(i));
    }

    const verMes = () => {
        setRedir(refAno.current.value + '-' + refMes.current.value);
    }

    if(redir !== ''){
        return <Redirect to={"/movimentacoes/"+redir}></Redirect>
    }

    return(
        <React.Fragment>
            <h2>Adicionar Mês</h2>
            <select ref={refAno}>
                { anos.map(ano => <option key={ano} value={ano}>{ano}</option>) }
            </select>

            <select ref={refMes}>
                { meses.map(mes => <option key={mes} value={mes}>{mes}</option>) }
            </select>

            <button onClick={verMes}>Adicionar Mês</button>
        </React.Fragment>
    )
}

export default AdicionarMes;