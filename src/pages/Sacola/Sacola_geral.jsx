import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';
import { GlobalContext } from '../../contexts/GlobalContext';
import Header from '../../components/Header';
import './Sacola_geral.css';
import Footer from '../../components/Footer';

function Sacola_geral() {

    const { tipo_de_header, set_tipo_de_header } = useContext(GlobalContext);
    const { usuario_logado, set_usuario_logado } = useContext(GlobalContext);
    const { sacola, set_sacola } = useContext(GlobalContext);

  return (
    
    <AnimatePresence>

        <motion.div className='container_sacola_geral' initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.6 }}>
        
        <Header tipo={tipo_de_header} />

        <div className="alinhamento_conteudo_tela_sacola_geral">

        <h1 className='titulo_tela_sacola'>Sacola</h1>

        <div className="container_conteudo_sacola_geral">

            <div className="container_produtos_na_sacola_geral">

                {sacola && sacola.length > 0 ? sacola.map((produto, i) => (

                    <div key={i} className='container_produto_sacola_geral'>

                        <div className="container_imagem_do_produto_sacola_geral">

                            <img src={produto.imagem[0]} alt="" />

                        </div>

                        <div className="container_info_produto_sacola_geral">

                            <div className="container_titulo_produto_sacola_geral">

                                <h2>{produto.nome}</h2>
                                <button><img src="./img/Lixeiraicon.svg"alt="" /></button>

                            </div>

                            <span>Tamanho: {produto.tamanho}</span>
                            <span>Cor: {produto.cor[0]}</span>

                            <span>{produto.preco}</span>

                        </div>

                    </div>
                )) : 
                
                <div className='container_nenhum_item_sacola_geral'>
                    
                    <img src="./img/icons/icone_sacola_a.svg" alt="" />
                    <span>Hmm... Parece que você ainda não adicionou um item a sacola!</span>
                
                </div>}

            </div>

            <div className="container_resumo_do_pedido_sacola_geral">

                <h3>Resumo do Pedido</h3>
                
                <div className="container_texto_do_resumo_pedido">

                <p>Seu carrinho está pronto! Verifique todos os seus itens, certifique-se de que tudo está correto e finalize sua compra com segurança e tranquilidade.</p>
                
                </div>

                <div className="container_valores_sacola_geral">

                    <div className="container_sub_total_sacola_geral">

                        <span>Subtotal</span>
                        <span>R$564,99</span>
                    
                    </div>

                    <div className="container_total_sacola_geral">

                        <span>Total</span>
                        <span>R$564,99</span>
                    
                    </div>
                
                    <div className="container_botao_de_finalizar_compra">

                        <button>Finalizar Compra <img src='./img/icons/icone_botao_finalizar_compra.svg'/></button>

                    </div>
                
                </div>

            </div>

        </div>

        </div>

        <Footer/>

        </motion.div>

    </AnimatePresence>
  )
}

export default Sacola_geral
