const express = require(`express`);
const cors = require(`cors`);
const body_parser = require(`body-parser`);
const http = require(`http`);
const app = express();
const { Server } = require(`socket.io`);
const porta = 3000;
const server = http.createServer(app);
const upload = require(`./config/multer.js`);
const conectar_com_mongo = require(`./mongo/mongo.js`);
const Cliente = require(`./models/Cliente.js`);
const Endereco = require(`./models/Endereco.js`);
const Chat = require(`./models/Chat.js`);
const Estoque = require(`./models/Estoque.js`);
const Categoria = require(`./models/Categoria.js`);
const Brecho = require(`./models/Brecho.js`);
const Produto = require(`./models/Produto.js`);

conectar_com_mongo();
app.use(cors());
  
const io = new Server(server, {

    cors: {

        origin: `*`,
        methods: [`GET`, `POST`, `PUT`],
    }
});

app.use(body_parser.json());
app.use(`/uploads`, express.static(`uploads`));

app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
    next();
});

server.listen(porta,  () => console.log(`Servidor HTTP rodando na porta ${porta}`));

io.on(`connection`, (socket) => {
        
    socket.on(`nova_mensagem`, (mensagem) => {

        socket.broadcast.emit(`receber_mensagem`, mensagem);
    });

    socket.on(`mensagem_a_atualizar`, mensagem => {

        socket.broadcast.emit(`receber_mensagem`, mensagem);
    })

    socket.on(`disconnect`, () => {

        console.log(`Usuário desconectado!`, socket.id);
    });
});

app.get('/', (req, res) => {
    
    res.send('Conexão com mongo funcionando!');
});

app.get(`/clientes`, async (req, res) => {

    try {
    
        const clientes = await Cliente.find();
        res.status(200).json(clientes);

    } catch (erro) {
        
        console.error(erro);
    };
});

app.get(`/clientes/:id`, async (req, res) => {

    const { id } = req.params;
   
    try {
    
    const cliente = await Cliente.findById(id);
    res.status(200).json(cliente);

   } catch (erro) {
    
    console.error(erro);
   };
});

app.post(`/clientes`, async (req, res) => {

    const cliente = new Cliente(req.body);

    try {
        
    const cliente_cadastrado = await cliente.save();
    res.status(201).json(cliente_cadastrado);

    } catch (erro) {
      
        console.error(erro);
    };
});

app.put(`/clientes/:_id`, async (req, res) => {

    const { _id } = req.params;

    try {

        const cliente_atualizado = Cliente.findByIdAndUpdate(_id, req.body, {new: true});
        res.status(200).json(cliente_atualizado);
        
    } catch (erro) {
      
        console.error(erro);
    };
});

app.delete(`/clientes/:id`, async (req, res) => {

    const { id } = req.params;

    try {
        
        await Cliente.findByIdAndDelete(id);
        res.status(200).json(`Cliente excluído`);

    } catch (erro) {
      
        console.error(erro);
    };
});

app.get(`/enderecos`, async (req, res) => {

    try {
        
        const enderecos = await Endereco.find();
        res.status(200).json(enderecos);

    } catch (erro) {
      
        console.error(erro);
    };
});

app.get(`/enderecos/:id`, async (req, res) => {

    const { id } = req.params;

    try {
        
    const endereco = await Endereco.findById(id);
    res.status(200).json(endereco);

    } catch (erro) {
      
        console.error(erro);
    };
});

app.post(`/enderecos`, async (req, res) => {

    const endereco = new Endereco(req.body);
    try {
        
        const cadastrar_endereco = endereco.save();
        res.status(201).json(cadastrar_endereco);

    } catch (erro) {
      
        console.error(erro);
    };
});

app.put(`/enderecos/:id`, async (req, res) => {

    const { id } = req.params;
    delete req.body._id;

    try {
        
       const endereco_atualizado = await Endereco.findByIdAndUpdate(id, req.body, {new: true});
       res.status(200).json(endereco_atualizado);

    } catch (erro) {
      
        console.error(erro);
    };
});

app.delete(`/enderecos/:id`, async (req, res) => {

    const { id } = req.params;

    try {
        
        await Endereco.findByIdAndDelete(id);
        res.status(200).json(`Endereço excluído`);

    } catch (erro) {
      
        console.error(erro);
    };
});

app.get(`/chats`, async (req, res) => {

    try {
        
        const mensagens = await Chat.find();
        res.status(200).json(mensagens);

    } catch (erro) {
      
        console.error(erro);
    };
});

app.get(`/chats/:id`, async (req, res) => {

    const { id } = req.params;
    

    try {

        const conversa = await Chat.findById(id);
        res.status(200).json(conversa);
        
    } catch (erro) {
      
        console.error(erro);
    };
});

app.post(`/chats`, async (req, res) => {

    const mensagem = new Chat(req.body);

    try {

        const mensagem_postada = await mensagem.save();
        res.status(201).json(mensagem_postada);
        
    } catch (erro) {
      
        console.error(erro);
    };
});

app.put(`/chats/:id`, async (req, res) => {

    const { id } = req.params;
    delete req.body._id;    

    try {

        const mensagem = await Chat.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(mensagem);
        
    } catch (erro) {
      
        console.error(erro);
    };
});

app.delete(`/chats/:id`, async (req, res) => {

    const { id } = req.params;

    try {

        await Chat.findByIdAndDelete(id);
        res.status(200).json(`Mensagem excluída com sucesso!`);
        
    } catch (erro) {
      
        console.error(erro);
    };
});

app.get (`/estoques`, async (req, res) =>{
    try {
        const estoque = await Estoque.find();
        res.status(200).json(estoque)
    } catch (error) {
        console.error(error)
    }
})

app.get(`/estoques/:id`, async (req, res) =>{

    const { id } = req.params;

    try {
        const estoque = await Estoque.findById(id);
        res.status(200).json(estoque);
    } catch (error) {
        console.error(error); 
    }
})

app.get(`/categorias`, async (req, res) => {

    try {

        const categorias = await Categoria.find();
        res.status(200).json(categorias);
        
    } catch (erro) {
      
        console.error(erro);
    };
});

app.get(`/categorias/:id`, async (req, res) => {

    const { id } = req.params;

    try {
        
        const categoria = await Categoria.findById(id);
        res.status(200).json(categoria);

    } catch (erro) {
      
        console.error(erro);
    };
});

app.post(`/categorias`, async (req, res) => {

    const categoria = new Categoria(req.body);

    try {

    const nova_categoria = await categoria.save();
    res.status(201).json(nova_categoria);
        
    } catch (erro) {
      
        console.error(erro);
    };
});

app.put(`/categorias/:id`, async (req, res) => {

    const { id } = req.params;
    delete req.body._id;

    try {

        const categoria = await Categoria.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(categoria);
        
    } catch (erro) {
      
        console.error(erro);
    };
});

app.delete(`/categorias/:id`, async (req, res) => {

    const { id } = req.params;

    try {

        const categoria = await Categoria.findByIdAndDelete(id);
        res.status(200).json(categoria);
        
    } catch (erro) {
      
        console.error(erro);
    };
});

// brechos

app.get(`/brechos`, async (req, res) => {

    try {

        const brechos = await Brecho.find();
        res.status(200).json(brechos);
        
    } catch (erro) {
      
        console.error(erro);
    };
});

app.get(`/brechos/:id`, async (req, res) => {

    const { id } = req.params;

    try {
        
        const brecho = await Brecho.findById(id);
        res.status(200).json(brecho);

    } catch (erro) {
      
        console.error(erro);
    };
});

app.post(`/brechos`, async (req, res) => {

    const brecho = new Brecho(req.body);

    try {

    const novo_brecho = await brecho.save();
    res.status(201).json(novo_brecho);
        
    } catch (erro) {
      
        console.error(erro);
    };
});

app.put(`/brechos/:id`, async (req, res) => {

    const { id } = req.params;
    delete req.body._id;

    try {

        const brecho = await Brecho.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(brecho);
        
    } catch (erro) {
      
        console.error(erro);
    };
});

app.delete(`/brechos/:id`, async (req, res) => {

    const { id } = req.params;

    try {

        const brecho = await Brecho.findByIdAndDelete(id);
        res.status(200).json(brecho);
        
    } catch (erro) {
      
        console.error(erro);
    };
});

app.get(`/produtos`, async (req, res) =>{

    try {
        const produtos = await Produto.find()
        res.status(200).json(produtos);
        
    } catch (error) {

        console.error(error)
    }
})

app.get(`/produtos/:id`, async (req, res) =>{

    const { id } =req.params

    try {
        const produto = await Produto.findById(id)
        res.status(200).json(produto);
        
    } catch (error) {
        console.error(error)
    }
})

app.post('/produtos', async (req, res) => {
  try {
    // req.body já deve conter o array de URLs da imagem no campo "imagem"
    const produto = new Produto({...req.body});
    const novo_produto = await produto.save();
    res.status(201).json(novo_produto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao salvar produto' });
  }
});


app.put(`/produtos/:id`, async (req, res) =>{
    
    const { id } = req.params;
    delete req.body._id;

    try {

        const produto = await Produto.findByIdAndUpdate(id, req.body, { new: true});
        res.status(200).json(produto);

    } catch (error) {
        console.error(error)
    }
})

app.delete(`/produtos/:id`, async (req, res) =>{

    const { id } = req.params;

    try {

        const produto = await Produto.findByIdAndDelete(id)
        res.status(200).json(produto);

    } catch (error) {
        console.error(error)
    }
})

