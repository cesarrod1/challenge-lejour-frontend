import './App.css';
import { Line, Pie, Doughnut,Polar, Bar } from 'react-chartjs-2';
import { useEffect, useState } from 'react';

const App = () => {
  const [chartDataBar, setChartDataBar] = useState({});
  const [chartDataDou, setChartDataDou] = useState({});
  const [chartDataPie, setChartDataPie] = useState({});
  const [chartDataPol, setChartDataPol] = useState({});

  const [scrollClasses, setScrollClasses] = useState(['scroll']);
  const [graphicsClasses, setGraphicsCalsses] = useState(['graphics']);

  const contratos = (aceitos, rejeitados) => {
    setChartDataBar({
      labels: ['CONTRATOS ACEITOS', 'CONTRATOS REJEITADOS', ],
      datasets: [
        {
          label: 'TOTAL DE CONTRATOS',
          data: [aceitos, rejeitados],
          backgroundColor: 
            'rgb(104, 191, 183)'
        ,
          borderWidth: 4
        }
      ]
    })
  };
  
  const casamentos = (CREATED, CONFIRMED,VISITED,CANCELED) => {
    setChartDataDou({
      labels: ['Criado', 'Confirmado', 'Visitado', 'Cancelado' ],
      datasets: [
        {
          label: '',
          data: [CREATED, CONFIRMED,VISITED,CANCELED],
          backgroundColor: [
             'rgb(104, 191, 183)',
             'rgb(104, 0, 183)',
             'rgb(45, 191, 183)',
             'rgb(0, 191, 200)'           
          ]
        ,
          borderWidth: 4
        }
      ]
    })
  };

  const categorias = (foto, lista,assessoria,espaco,buffet) => {
    setChartDataPie({
      labels: ['Foto e Filmagem', 'Lista de Presentes', 'Assessoria de casamento', 'Espaço, Buffet' ],
      datasets: [
        {
          label: '',
          data: [foto, lista, assessoria, espaco, buffet],
          backgroundColor: [
             'rgb(104, 191, 183)',
             'rgb(255, 0, 0)',
             'rgb(0, 0, 255)',
             'rgb(0, 255, 0)'           
          ]
        ,
          borderWidth: 4
        }
      ]
    })
  };

  const favoritos = (arr) => {
    setChartDataPol({
      labels: ['Buquê - Giuliana Flores', 'Buffet 7 Mares', 'Fotografo Paulista', 'Decoração LS' ],
      datasets: [
        {
          label: '',
          data: arr,
          backgroundColor: [
             'rgb(104, 191, 183)',
             'rgb(104, 0, 183)',
             'rgb(45, 191, 183)',
             'rgb(0, 191, 200)'           
          ]
        ,
          borderWidth: 4
        }
      ]
    })
  };


  useEffect(() => {
    fetch('http://localhost:8080/invoiceacceptedcount')
      .then(response => response.json())
      .then(data => contratos(data.TRUE, data.FALSE));

    fetch('http://localhost:8080/appointmentstatuscount')
      .then(response => response.json())
      .then(data => casamentos(data.CREATED, data.CONFIRMED,data.VISITED,data.CANCELED));

    fetch('http://localhost:8080/appointmentcategorycount')
      .then(response => response.json())
      .then(data => categorias(data['foto-e-filmagem'], data['lista-de-presentes'], data['assessoria-de-casamento'], data.espaco, data.buffet));

    fetch('http://localhost:8080/favoritevendorcount')
      .then(response => response.json())
      .then(data => {
        var arr = Object.values(data);
        arr.sort(function(a, b) {
          return a - b;
        });

        favoritos(arr.reverse().slice(0, 4));
        console.log(arr.reverse().slice(0, 4));
      })
  }, []);

  let scroll_classes = ['scroll'];

  const handleClick = (e) => {
    setScrollClasses(() => ['scroll', 'scroll-right']);
    setGraphicsCalsses(()=> ['graphics', 'graphics-right']);
  };

  const handleClickCasais = (e) => {
    setScrollClasses(() => ['scroll', 'scroll-left']);
    setGraphicsCalsses(()=> ['graphics', 'graphics-left']);
  };

  return (
    <div className="App">
      <div className="header">
        <div>
          <div>
            <img src={`${process.env.PUBLIC_URL}/lejour_logo.png`} width="29" height="45" alt="" loading="lazy" />
          </div>
          <div className="htext">
          <span>Dashboard</span>
          <span>Gerenciar</span>
          <span className="signout">
              <span className="signout-icon">
                <svg viewBox="0 0 24 24" fit="" height="100%" width="100%" preserveAspectRatio="xMidYMid meet" focusable="false"> 
                  <path d="M22 19.2c-.9-3.7-3.7-6.5-7.2-7.5 1.6-1 2.6-2.7 2.6-4.7 0-3-2.5-5.5-5.5-5.5S6.5 4.1 6.5 7.1c0 2 1 3.7 2.6 4.7-3.5 1-6.3 3.8-7.2 7.5-.2.7 0 1.5.5 2.1.5.6 1.2 1 2 1h15.1c.8 0 1.5-.4 2-1 .5-.7.7-1.4.5-2.2zM7.7 7.1c0-2.4 1.9-4.3 4.3-4.3s4.3 1.9 4.3 4.3-1.9 4.3-4.3 4.3-4.3-1.9-4.3-4.3zm12.9 13.5c-.3.3-.7.5-1.1.5h-15c-.4 0-.8-.2-1.1-.5-.2-.3-.3-.7-.2-1.1 1-4.1 4.7-6.9 8.9-6.9s7.9 2.9 8.9 6.9c0 .4-.1.8-.4 1.1z"></path>
                </svg> 
              </span>
             <span className="signout-text">Sair</span>
          </span>
          </div>
        </div>
      </div>
      <div className="content">
        <h1>Dashboard</h1>
        <div className="panel">
          <div className="selector">
            <div className="htext sz" onClick={event => handleClickCasais(event)}>Casais</div>
            <div className="htext sz" onClick={event => handleClick(event)}>Fornecedores</div>
          </div>
          <div className="scroll-container">
            <div className={scrollClasses.join(' ')}></div>
          </div>
          <div className="graphics-container">
            <div className={graphicsClasses.join(' ')}>
              <div className="gfx">
                <Bar  data={chartDataBar} options={{ responsive: true, background:'#f00' }} />
              </div>
              <div className="gfx">
                <Doughnut data={chartDataDou} options={{ responsive: true }} />
              </div>
              <div className="gfx">
                <Pie data={chartDataPie} options={{ responsive: true }} />
              </div>
              <div className="gfx">
                <Polar data={chartDataPol} options={{ responsive: true ,  width:'200px'}} />
              </div>
            </div>
          </div>
          <div className="btn-container">
            <div className="btn-ver-mais">Ver mais Gráficos</div>
          </div>
        </div>
      </div>
      <div className="footer">
        <div>
          <div>
            <img src={`${process.env.PUBLIC_URL}/lejour_logo_w.png`} width="29" height="45" alt="" loading="lazy" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
