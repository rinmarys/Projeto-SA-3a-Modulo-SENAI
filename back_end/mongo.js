const mongoose = require(`mongoose`);
require(`dotenv`).config();

async function conectar_com_mongo(){

    try {
        
        await mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true});

    } catch (erro) {
      
        console.error(erro);
    };
};

module.exports = conectar_com_mongo;