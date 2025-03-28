import { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {

    const [ array_clientes, set_array_clientes ] = useState([]);
    const [ array_brechos, set_array_brechos ] = useState([]);
    const [ array_produtos, set_array_produtos ] = useState([]);
    const [ array_categorias, set_array_categorias ] = useState([]);
    const [ array_enderecos, set_array_enderecos ] = useState([]);
    const [ usuario_logado, set_usuario_logado ] = useState([]);
    const [ array_chat, set_array_chat ] = useState([]);
    const [ endereco_do_cliente, set_endereco_do_cliente ] = useState({cep: ``, bairro: ``, logradouro: ``, cidade: ``, estado: ``, numero: ``, complemento: ``});
    const [ form_de_cadastro_cliente, set_form_de_cadastro_cliente ] = useState({nome: ``, email: ``, senha: ``, telefone: ``, cpf: ``, data_de_nascimento: ``, imagem_de_perfil: `./img/img_perfil_provisorio.svg`, confirmar_senha: ``});
    const [ cadastro_parte_um_cliente, set_cadastro_parte_um_cliente ] = useState(true);
    const [ cadastro_parte_dois_cliente, set_cadastro_parte_dois_cliente ] = useState(false);
    const [ cadastro_parte_tres_cliente, set_cadastro_parte_tres_cliente ] = useState(false);
    const [ inicio_dashboard, set_inicio_dashboard ] = useState(true);
    const [ clientes_dashboard, set_clientes_dashboard ] = useState(false);
    const [ brechos_dashboard, set_brechos_dashboard ] = useState(false);
    const [ produtos_dashboard, set_produtos_dashboard ] = useState(false);
    const [ categorias_dashboard, set_categorias_dashboard ] = useState(false);
    const [ id_do_cliente_a_excluir, set_id_do_cliente_a_excluir ] = useState(``);
    const [ abrir_pop_up_dashboard, set_abrir_pop_up_dashboard ] = useState(false);
    const [ pop_up_notificacao_excluir_dashboard, set_pop_up_notificacao_excluir_dashboard ] = useState(false);
    const [ pop_up_de_cadastrar_categoria, set_pop_up_de_cadastrar_categoria ] = useState(false);
    const [ pop_up_notificacao_cadastro_categoria, set_pop_up_notificacao_cadastro_categoria ] = useState(false);
    const [ pop_up_de_editar_categoria, set_pop_up_de_editar_categoria ] = useState(false); 
    const [ id_categoria, set_id_categoria ] = useState(``);
    const [ pop_up_notificacao_editar_categoria, set_pop_up_notificacao_editar_categoria ] = useState(false);
    const [ pop_up_de_excluir_categoria, set_pop_up_de_excluir_categoria ] = useState(false);
    const [ pop_up_notificacao_excluir_categoria, set_pop_up_notificacao_excluir_categoria ] = useState(false);
    const [ chat_aberto, set_chat_aberto ] = useState(false);

    const [formCadastroBrecho, setFormCadastroBrecho] = useState({ nome_vendedor: ``, data_de_nascimento_vendedor: ``, nome_brecho: ``, email: ``, telefone: ``, CNPJ: ``, logo: ``, confirmarSenha: `` });
    const [enderecoDoBrecho, setEnderecoDoBrecho] = useState({ cep: ``, bairro: ``, logradouro: ``, cidade: ``, estado: ``, numero: ``, complemento: `` })
    const [cadastroParteUmBrecho, setCadastroParteUmBrecho] = useState(true)
    const [cadastroParteDoisBrecho, setCadastroParteDoisBrecho] = useState(false)
    const [cadastroParteTresBrecho, setCadastroParteTresBrecho] = useState(false)
    const [ arrayBrechos, setArrayBrechos ] = useState([])
    const [ imagemPerfilCadastroBrecho, setImagemPerfilCadastroBrecho ] = useState(null)

    return (
        <GlobalContext.Provider value={{

            array_clientes,
            set_array_clientes,
            array_enderecos,
            set_array_enderecos,
            array_brechos,
            set_array_brechos,
            array_produtos,
            set_array_produtos,
            array_categorias,
            set_array_categorias,
            form_de_cadastro_cliente,
            set_form_de_cadastro_cliente,
            cadastro_parte_um_cliente,
            set_cadastro_parte_um_cliente,
            cadastro_parte_dois_cliente,
            set_cadastro_parte_dois_cliente,
            cadastro_parte_tres_cliente,
            set_cadastro_parte_tres_cliente,
            endereco_do_cliente,
            set_endereco_do_cliente,
            inicio_dashboard,
            set_inicio_dashboard,
            clientes_dashboard,
            set_clientes_dashboard,
            produtos_dashboard,
            set_produtos_dashboard,
            brechos_dashboard,
            set_brechos_dashboard,
            categorias_dashboard,
            set_categorias_dashboard,
            id_do_cliente_a_excluir,
            set_id_do_cliente_a_excluir,
            abrir_pop_up_dashboard,
            set_abrir_pop_up_dashboard,
            pop_up_notificacao_excluir_dashboard,
            set_pop_up_notificacao_excluir_dashboard,
            pop_up_de_cadastrar_categoria,
            set_pop_up_de_cadastrar_categoria,
            pop_up_notificacao_cadastro_categoria,
            set_pop_up_notificacao_cadastro_categoria,
            pop_up_de_editar_categoria,
            set_pop_up_de_editar_categoria,
            id_categoria,
            set_id_categoria,
            pop_up_notificacao_editar_categoria,
            set_pop_up_notificacao_editar_categoria,
            pop_up_de_excluir_categoria,
            set_pop_up_de_excluir_categoria,
            pop_up_notificacao_excluir_categoria,
            set_pop_up_notificacao_excluir_categoria,
            chat_aberto,
            set_chat_aberto,
            array_chat,
            set_array_chat,

            formCadastroBrecho,
            setFormCadastroBrecho,
            enderecoDoBrecho,
            setEnderecoDoBrecho,
            cadastroParteUmBrecho,
            setCadastroParteUmBrecho,
            cadastroParteDoisBrecho,
            setCadastroParteDoisBrecho,
            cadastroParteTresBrecho,
            setCadastroParteTresBrecho,
            arrayBrechos,
            setArrayBrechos,
            imagemPerfilCadastroBrecho,
            setImagemPerfilCadastroBrecho
        }}>
            {children}
        </GlobalContext.Provider>
    )
}