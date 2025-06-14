import React from 'react'
import "./Contato.css";
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { Link } from 'react-router-dom';

export default function Contato() {
  return (
    <div>
      <Header tipo='usuario' />

      <div className='cabecalho-tela-contato'>
      <Link className='link-tela-contato' to={"/."}>Início</Link>
        <p>/Contato</p>
      </div>

      <div className='container-info-contato'>
        <div className='cabecario-info-contato'>
          <div className='circulo-icon-contato'><img src=".img/telefone.svg" alt="" /></div>
          <h3>Ligue Para Nós</h3>
        </div>

      </div>

      <div className='container-entre-em-contato'>
      <div className='info-importante-entre-em-contato'>
      <div className='nome-entre-em-contato'>
        <label>Nome Completo</label>
        <input type="text" />
      </div>
      <div className='email-entre-em-contato'>
        <label>Email</label>
        <input type="text" />
      </div>
      <div className='telefone-entre-em-contato'>
        <label>Telefone</label>
        <input type="number" />
      </div>
      </div>

      <div className='menssagem-cliente-entre-em-contato'>
        <input type="text" placeholder='Escreva sua Menssagem'/>
      </div>

      <button className='but-entre-em-contato'>Enviar Menssagem</button>
      </div>

      <Footer />
    </div>
  )
}


