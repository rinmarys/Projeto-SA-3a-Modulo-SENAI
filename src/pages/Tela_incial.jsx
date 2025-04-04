import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { GlobalContext } from '../contexts/GlobalContext';
import HeaderUsuario from '../components/HeaderUsuario';
import HeaderBrecho from '../components/HeaderBrecho';
import Footer from '../components/Footer';
import Pop_up_chat from '../components/chat/Pop_up_chat';
import Chat from '../components/chat/Chat';
import Chat_conversa from '../components/chat/Chat_conversa';

function Tela_incial() {

  const { array_clientes, set_array_clientes } = useContext(GlobalContext);
  const { array_brechos, set_array_brechos } = useContext(GlobalContext);
  const { chat_aberto, set_chato_aberto } = useContext(GlobalContext);
  const { conversa_aberta, set_conversa_aberta } = useContext(GlobalContext);

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

      <HeaderUsuario/>

      {!chat_aberto && !conversa_aberta && <Pop_up_chat/>}
      {chat_aberto && <Chat/>}
      {conversa_aberta && <Chat_conversa/>}
      {array_clientes.map((usuario, i) => (

        <div key={i}>

          <p>Id: {usuario.id}</p>
          <p>Nome: {usuario.nome}</p>
          <p>Email: {usuario.email}</p>
          <p>Senha: {usuario.senha}</p>
          <p>Telefone: {usuario.telefone}</p>
          <p>Data de Nascimento: {usuario.data_de_nascimento}</p>
          <p>CPF: {usuario.cpf}</p>

        </div>
      ))}

      <Footer />
    </div>
  )
}

export default Tela_incial
