import React from 'react';
import Rest from './utils/rest';
import Header from './elements/Header';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './pages/Home/';
import Movimentacoes from './pages/Movimentacoes'
/*
axios
.get('https://mymoney-pablo.firebaseio.com/valor.json')
.then(res=>{
  console.log(res.data);
})
*/
/*
axios
.post('https://mymoney-pablo.firebaseio.com/valor.json',{
  outro: "Ana Rosa"
})
.then(res =>{
  console.log(res);
});
*/

const baseUrl = 'https://mymoney-pablo.firebaseio.com/';

const {useGet, usePost, useDelete} = Rest(baseUrl); 

const url = "https://mymoney-pablo.firebaseio.com/movimentacoes/2019-10.json";

function App() {
  //const data = useGet('movimentacoes/2019-10');
  //const [postData, post] = usePost('movimentacoes/2019-10');
  //const [deleteData, remove] = useDelete();
  
  //const data2 = useGet('http://httpbin.org/ip');

  const saveNew = () =>{
    //post({valor:10, descricao: 'Olá'});
  }

  const doRemove = () => {
    //remove('movimentacoes/2019-10/-Lr0HhndKrS4KOGkmE0E');
  }

  return (
    <Router>
      <div>
        <Header />
        <Route path="/" exact component={Home} />
        <Route path="/movimentacoes/:data" component={Movimentacoes} />
      </div>
    </Router>
  );
}

export default App;
