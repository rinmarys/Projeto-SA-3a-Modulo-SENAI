import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { GlobalContext } from '../contexts/GlobalContext';
import HeaderUsuario from '../components/HeaderUsuario';
import HeaderBrecho from '../components/HeaderBrecho';
import Footer from '../components/Footer';
import Chat from '../components/chat/Chat';
import Chat_conversa from '../components/chat/Chat_conversa';
import './Tela_inicial.css'
import { Link } from 'react-router-dom';

function Tela_incial() {

  const { array_clientes, set_array_clientes } = useContext(GlobalContext);
  const { array_brechos, set_array_brechos } = useContext(GlobalContext);
  const { chat_aberto, set_chato_aberto } = useContext(GlobalContext);
  const { conversa_aberta, set_conversa_aberta } = useContext(GlobalContext);
  const { usuario_logado, set_usuario_logado } = useContext(GlobalContext);

  useEffect(() => {

    informacoes_clientes();

  }, []);

  async function informacoes_clientes() {

    try {

      const resultado = await axios.get(`http://localhost:3000/clientes`);
      set_array_clientes(resultado.data);

    } catch (erro) {

      console.log(erro);
    };
  };

  return (
    <div>

      <HeaderUsuario />

      {/* home page seção um */}
      <div className="home-page-secao-um-container">
        <div className="secao-um-texto-container">
          <h1>ENCONTRE ROUPAS QUE COMBINAM COM SEU ESTILO</h1>
          <p>Explore nossa seleção exclusiva de roupas em brechós cuidadosamente curados, onde cada peça reflete personalidade e estilo único. Encontre itens que combinam com você e expressam sua individualidade de forma autêntica.</p>
          <button>Compre Já</button>
        </div>

        <div className="container-imagem-roupas-numero-um">
        </div>

        <img className='estrela-verde-home-page' src="img/Estrela_dois_cadastro.svg" alt="estrela verde grande" />
        <img className='estrela-amarela-home-page' src="img/Estrela_um_cadastro.svg" alt="estrela amarela pequena" />
      </div>

      <div className="line-home-page-secao-um">
      </div>
      {/* home page seção um */}

      {/* home page seção dois */}
      <div className="home-page-secao-dois-container">
        <div className="container-sinalizacao-brechos-home-page">
          <div className="icon-quadrado-brechos-home-page"></div>
          <p>Brechós</p>
        </div>

        <div className="container-titulo-brechos-home-page">
          <p>BRECHÓS</p>
        </div>

        {/* Mudar dps para ficar verde só quando a pessoa passar o mouse encima */}
        <div className="buttons-anterior-proximo">
          <button className='seta-anterior-carrossel'><img src="./img/icons/setaAnteriorCarrossel.svg" alt="seta anterior carrossel" /></button>
          <button className='seta-proximo-carrossel'><img src="./img/icons/setaProximoCarrossel.svg" alt="seta proximo carrossel" /></button>
        </div>
        {/* Mudar dps para ficar verde só quando a pessoa passar o mouse encima */}

        <div className="container-brechos-cards-home-page">
          <div className="card-brecho-home-page">
            <div className="container-imagem-brecho-cinza">
              <div className="container-imagem-brecho">
                <img src="./img/img_perfil_provisorio.svg" alt="" />
              </div>
            </div>

            <h2 className="nome-brecho">Brechó Moda Sustentavel</h2>
          </div>
        </div>

        <div className="button-ver-todos-os-brechos-home-page">
          <button>Ver todos</button>
        </div>
      </div>
      {/* home page seção dois */}

      {/* home page seção tres */}
      <div className="home-page-secao-tres-container">
        <div className="container-sinalizacao-destaques-home-page">
          <div className="icon-quadrado-destaques-home-page"></div>
          <p>Destaques</p>
        </div>

        <div className="home-page-titulo-secao-tres">
          <p>LANÇAMENTOS</p>
        </div>

        <div className="container-cards-alinhamento-lancamentos-secao-tres">
          <div className="card-lancamento-secao-tres">
            <div className="alinhamento-img-perfil-nome-usuario-secao-tres">
              <img src="./img/img_perfil_provisorio.svg" alt="" />

              <Link to={'/perfil_brecho'} className='nome-brech-card-lancamento'>Brecho sustentavel</Link>
            </div>

            <div className="container-card-imagem-roupa-lancamentos">
              <img src="./img/img_perfil_provisorio.svg" alt="" />
            </div>

            <div className="alinhamento-preco-roupa-card-lancamento">
              <p className='nome-roupa-lancamentos-card'>Camiseta bonita</p>

              <p className='preco-roupa-lancamentos-card'>R$ 21.50</p>
            </div>
          </div>
        </div>

        <div className="alinhamento-buttons-secao-tres-lancamentos">
          <button>Ver todos</button>
        </div>
      </div>
      {/* home page seção tres */}

      {/* home page seção quatro */}
      <div className="home-page-container-secao-quatro">
        <div className="container-titulo-secao-quatro">
          <p>ENCONTRE O QUE PROCURA</p>
        </div>

        <div className="alinhamento-cards-secao-quatro">
          <div className="container-um-cards-secao-quatro">
            <div className="card-um-secao-quatro">
              {/* <img src="./img/imagens_telaInicial/CardImagemUmTelaInicial.svg" alt="Roupas" /> */}
              <p>Roupas</p>
            </div>

            <div className="card-dois-secao-quatro">
              {/* <img src="./img/imagens_telaInicial/CardImagemDoisTelaInicial.svg" alt="Accesórios" /> */}
              <p>Accesórios</p>
            </div>
          </div>

          <div className="container-dois-cards-secao-quatro">
            <div className="card-tres-secao-quatro">
              {/* <img src="./img/imagens_telaInicial/CardImagemTresTelaInicial.svg" alt="Doações" /> */}
              <p>Doações</p>
            </div>

            <div className="card-quatro-secao-quatro">
              {/* <img src="./img/imagens_telaInicial/CardImagemQuatroTelaInicial.svg" alt="Calçados" /> */}
              <p>Calçados</p>
            </div>
          </div>
        </div>
      </div>
      {/* home page seção quatro */}

      <Footer />

      {usuario_logado != `` && !conversa_aberta && <Chat />}
      {conversa_aberta && <Chat_conversa />}

    </div>
  )
}

export default Tela_incial
