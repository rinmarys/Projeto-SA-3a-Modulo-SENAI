import React, { useContext, useEffect, useRef, useState } from 'react';
import './Chat.css';
import { GlobalContext } from '../../contexts/GlobalContext';
import axios from 'axios';
import Pop_up_excluir_conversa from './Pop_up_excluir_conversa';
import api from '../../services/api';

function Chat() {

    const { array_clientes, set_array_clientes } = useContext(GlobalContext);
    const { array_brechos, set_array_brechos } = useContext(GlobalContext);
    const { conversa_atual, set_conversa_atual } = useContext(GlobalContext);
    const { conversa_aberta, set_conversa_aberta } = useContext(GlobalContext);
    const { chat_aberto, set_chat_aberto } = useContext(GlobalContext);
    const { array_chat, set_array_chat } = useContext(GlobalContext);
    const { pessoa_com_quem_esta_conversando, set_pessoa_com_quem_esta_conversando } = useContext(GlobalContext);
    const { usuario_logado, set_usuario_logado } = useContext(GlobalContext);
    const [ inpt_de_pesquisa_chat, set_inpt_de_pesquisa_chat ] = useState(``);
    const [ array_de_pesquisa_chat, set_array_de_pesquisa_chat ] = useState([]);
    const { pop_up_notificacao_excluir_conversa, set_pop_up_notificacao_excluir_conversa } = useContext(GlobalContext);
    const { altura_inicial_chat, set_altura_inicial_chat } = useContext(GlobalContext);
    const { altura_inicial_header_chat, set_altura_inicial_header_chat } = useContext(GlobalContext);
    const ref_inpt_de_pesquisa = useRef(null);
    const [ conversas_entre_usuarios, set_conversas_entre_usuarios ] = useState([]);

    useEffect(() => {

        buscar_clientes();
        buscar_chat();
        buscar_brechos();

    }, []);

    useEffect(() => {

    }, [usuario_logado]);
    
    useEffect(() => {

      if(pop_up_notificacao_excluir_conversa){

        setTimeout(() => {

          set_pop_up_notificacao_excluir_conversa(false);

        }, 2000);
      };

    }, [pop_up_notificacao_excluir_conversa]);

    useEffect(() => {

      const encontrar_cliente = array_clientes.find(_id => _id == usuario_logado._id);
      const encontrar_brecho = array_brechos.find(_id => usuario_logado._id == _id);
      console.log(encontrar_cliente);
      console.log(usuario_logado);
      

      if(encontrar_cliente){

        set_array_de_pesquisa_chat(usuario_logado.conversas.filter(brecho => brecho.nome_brecho.toLowerCase().includes(inpt_de_pesquisa_chat.toLowerCase())));
      };
      
      if(encontrar_brecho){        
        
        set_array_de_pesquisa_chat(usuario_logado.conversas.filter(cliente => cliente.nome.toLowerCase().includes(inpt_de_pesquisa_chat.toLocaleLowerCase())));
        
      };

    }, [inpt_de_pesquisa_chat]);

    async function buscar_brechos(){

      try {

        const brechos = await api.get(`/brechos`);
        set_array_brechos(brechos.data);
        
      } catch (erro) {
        
        console.error(erro);
      };
    };

    async function buscar_clientes(){

        try {

            const clientes = await api.get(`/clientes`);
            set_array_clientes(clientes.data);

        } catch (erro) {
          
            console.error(erro);
        };
    };

    async function buscar_chat(){

      try {
        
        const chat = await api.get(`/chats`);
        set_array_chat(chat.data);

      } catch (erro) {
        
        console.error(erro);
      };
    };

    function ir_para_conversa(_id){

      const pessoa_selecionada = array_clientes.find(cliente => cliente._id == _id);
      const brecho_selecionado = array_brechos.find(brecho => brecho._id == _id);
      
      if(pessoa_selecionada != null){

        set_pessoa_com_quem_esta_conversando(pessoa_selecionada);

        if(array_chat.length != 0){

          const mensagens_filtradas_cliente_com_brecho = array_chat.filter(mensagem => {
            
            return mensagem.id_dono_mensagem == usuario_logado._id && mensagem.id_quem_recebeu_mensagem == pessoa_selecionada._id || mensagem.id_dono_mensagem == pessoa_selecionada._id && mensagem.id_quem_recebeu_mensagem == usuario_logado._id;
          });

          set_conversa_atual(mensagens_filtradas_cliente_com_brecho);
        };
      };

      if(brecho_selecionado != null){

        set_pessoa_com_quem_esta_conversando(brecho_selecionado);

        if (array_chat.length != 0) {  
  
          const mensagens_filtradas_brecho_com_cliente = array_chat.filter(mensagem => {
  
            return mensagem.id_dono_mensagem == usuario_logado._id && mensagem.id_quem_recebeu_mensagem == brecho_selecionado._id || mensagem.id_dono_mensagem == brecho_selecionado._id && mensagem.id_quem_recebeu_mensagem == usuario_logado._id;
          });

          set_conversa_atual(mensagens_filtradas_brecho_com_cliente);
        };
      };
  
      set_conversa_aberta(true);
      set_chat_aberto(false);
    };

    function ultima_mensagem(_id){

      for(let i = array_chat.length - 1; i >= 0; i--){

        if(array_chat[i].id_dono_mensagem == _id && usuario_logado._id == array_chat[i].id_quem_recebeu_mensagem){

          return array_chat[i].mensagem;
        };

        if(array_chat[i].id_dono_mensagem == usuario_logado._id && array_chat[i].id_quem_recebeu_mensagem == _id){
          
          return array_chat[i].mensagem;
        };

      };

      return ``;
    };

    function hora_da_ultima_mensagem(id_cliente){

      for(let i = array_chat.length - 1; i >= 0; i--){

        if(array_chat[i].id_dono_mensagem == id_cliente && usuario_logado._id == array_chat[i].id_quem_recebeu_mensagem){

          return array_chat[i].hora;
        };

        if(array_chat[i].id_dono_mensagem == usuario_logado._id && array_chat[i].id_quem_recebeu_mensagem == id_cliente){

          return array_chat[i].hora;
        };
      };
      
      return `00:00`;
    };

    function verificar_mensagens_nao_lida(_id){

      let contador = 0;

      for(let i = 0; i < array_chat.length; i++){

        if(array_chat[i].id_dono_mensagem == _id && array_chat[i].mensagem_lida_quem_recebeu == false && usuario_logado != _id){

          contador += 1;
        };
      };

      return contador;
    };

    function exibir_contador(_id){

      let aparecer_contador = false;

      for(let i = 0; i < array_chat.length; i++){

        if(array_chat[i].id_dono_mensagem == _id && array_chat[i].mensagem_lida_quem_recebeu == false && usuario_logado._id != _id){

          aparecer_contador = true;
        };
      };
      
      return aparecer_contador;
    };

    function cor_do_horario_da_mensagem(_id){

      let cor_da_hora = `#3e2a219e`;

      for(let i = 0; i < array_chat.length; i++){

        if(array_chat[i].id_dono_mensagem == _id && array_chat[i].mensagem_lida_quem_recebeu == false && usuario_logado._id != _id){

          cor_da_hora = `#466330`;
        };
      };

      return cor_da_hora;
    };

    function fechar_chat(){

      if(altura_inicial_chat == `10%`){

        set_altura_inicial_chat(`70%`);
        set_altura_inicial_header_chat(`15%`);
      } else {

      setTimeout(() => {
          
        set_altura_inicial_header_chat(`100%`);

      }, 325);
        
      set_altura_inicial_chat(`10%`);
      set_conversa_aberta(false);
      };
    };

    function acionar_inpt_de_pesquisa(){

      ref_inpt_de_pesquisa.current.focus();
    };

    function pegar_nome_brecho(nome){

      const pegar_sobrenome = nome.trim().split(` `);

      if(pegar_sobrenome.length != 1 ){

        return `${pegar_sobrenome[0]} ${pegar_sobrenome[pegar_sobrenome.length - 1]}`;
      
      } else {

        return pegar_sobrenome[0];
      };
    };

    function exibir_imagem_de_perfil(_id){

      const encontrar_cliente = array_clientes.find(cliente => cliente._id == _id);
      const encontrar_brecho = array_brechos.find(brecho => brecho._id == _id);

      if(encontrar_brecho){

        return encontrar_brecho.logo;
      };

      if(encontrar_cliente){

        return encontrar_cliente.imagem_de_perfil
      };
    };

  return (
    <div className='container_chat' style={{height: altura_inicial_chat}}>
      
      <div className="container_header_chat" style={{height: altura_inicial_header_chat}}>
        
        <div className='container_header_chat_pesquisa'>
          
          <h2>ChatFly</h2>
          <div className="container_inpt_pesquisa_chat" onClick={acionar_inpt_de_pesquisa}>

          <img src="./img/LupaIcon.svg" alt="" />
          <input type="text" placeholder='Pesquise' ref={ref_inpt_de_pesquisa} value={inpt_de_pesquisa_chat} onChange={e => set_inpt_de_pesquisa_chat(e.target.value)}/>
          </div>
        
        </div>

        <button onClick={fechar_chat} className='botao_de_abrir_e_fechar_chat'>{altura_inicial_chat == `10%` ? <img src='./img/imagem_abrir_chat.svg' alt=''/> : <img src='./img/imagem_fechar_chat.svg' alt=''/>}</button>
      
      </div> 

      {pop_up_notificacao_excluir_conversa && <div className='fundo_escuro_para_notificacao'></div>}
      {pop_up_notificacao_excluir_conversa && <Pop_up_excluir_conversa/>}

      <div className="container_conversas_chat">

        {inpt_de_pesquisa_chat == `` ? usuario_logado.conversas.map((conversa, i ) => (

          <div key={i} className='container_corversa_chat' onClick={() => ir_para_conversa(conversa._id)}>

            <div className='container_usuario_chat'>
              
              <div className='container_conversa_chat_imagem_de_perfil'>

               <img src={exibir_imagem_de_perfil(conversa._id)} referrerPolicy="no-referrer" crossOrigin="anonymous" alt=""/>
              
              </div>
             
              <div className="container_conversa_chat_titulo">
              
                <div className='container_conversa_chat_titulo_info'>
                  
                  <h2>{conversa._id != usuario_logado._id ? pegar_nome_brecho(conversa.nome_brecho || conversa.nome) : ``}{conversa._id == usuario_logado._id ? `(você)` : ``}</h2>
                  <p style={{color: cor_do_horario_da_mensagem(conversa._id)}}>{hora_da_ultima_mensagem(conversa._id)}</p>
                
                </div>
                
                <div className='container_ultima_mensagem_chat'>
                
                  <p>{ultima_mensagem(conversa._id)}</p>
                  
                  {exibir_contador(conversa._id) && 
                  
                    <div className="container_contador_de_mensagens_nao_lida">

                      <span>{verificar_mensagens_nao_lida(conversa._id)}</span>
                  
                    </div>
                  }

                </div>
             
              </div>
            
            </div>

          </div>
        ))
        : array_de_pesquisa_chat.map((conversa, i) => (

          <div key={i} className='container_corversa_chat' onClick={() => ir_para_conversa(conversa._id)}>

            <div className='container_usuario_chat' onClick={() => ir_para_conversa(conversa._id)}>
              
              <div className='container_conversa_chat_imagem_de_perfil'>

               <img src={conversa.imagem_de_perfil || conversa.logo} referrerPolicy="no-referrer" crossOrigin="anonymous" alt=""/>
              
              </div>
             
              <div className="container_conversa_chat_titulo">
              
                <div className='container_conversa_chat_titulo_info'>
                  
                  <h2>{conversa._id != usuario_logado._id ? pegar_nome_brecho(conversa.nome_brecho) : ``}{conversa._id == usuario_logado._id ? `(você)` : ``}</h2>
                  <p style={{color: cor_do_horario_da_mensagem(conversa._id)}}>{hora_da_ultima_mensagem(conversa._id)}</p>
                
                </div>
                
                <div className='container_ultima_mensagem_chat'>
                
                  <p>{ultima_mensagem(conversa._id)}</p>
                  
                  {exibir_contador(conversa._id) && 
                  
                  <div className="container_contador_de_mensagens_nao_lida">

                    <span>{verificar_mensagens_nao_lida(conversa._id)}</span>
                
                  </div>
                  }

                </div>
             
              </div>
            
            </div>

          </div>
        ))
      }

      </div>

    </div>
  )
}

export default Chat
