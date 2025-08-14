GruDee

Rede social (projeto de estudo) — Node.js (backend) + React (frontend)

Projeto criado para aprendizado. Pode conter inconsistências e bugs — serve como ambiente para estudar MVC, autenticação, uploads e Redux.

Tecnologias
Backend: Node.js, Express, Mongoose, Multer, JWT, bcrypt
Frontend: React (+ Redux)
Banco: MongoDB Atlas (conectar via MONGO_URI)
Funcionalidades principais
Registro / Login (autenticação JWT)
Perfil e edição de perfil
Dashboard / Home
Upload básico de imagens (pasta backend/images)
Organização em MVC no backend

Requisitos
Node.js (v16+ recomendado)
npm 
Conta no MongoDB Atlas

Como rodar (guia rápido)

1. Baixar o projeto
git clone https://github.com/eujoao-maciel/GruDee.git
cd GruDee

2. Backend
cd backend
# Se não existir package.json, crie um rápido (opcional):
# npm init -y
npm install

Atenção: crie a pasta para armazenar imagens:

mkdir images

Crie o arquivo .env (ou conecte seu config.js) com pelo menos estas variáveis:

PORT=5000
# Cole aqui a sua connection string do MongoDB Atlas.
# NÃO comite este arquivo em repositórios públicos (contém credenciais).
# Exemplo (substitua <username> e <password> ou cole a URI completa):
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.ybe03vz.mongodb.net/GruDee?retryWrites=true&w=majority&appName=Cluster0

# Chave usada para assinar tokens JWT (ex.: 'mysecret')
MYSECRET=mysecret

CLIENT_URL=http://localhost:3000
NODE_ENV=development

Em seguida, inicie o servidor:

npm run serve
# (ou) node index.js

O package.json do backend já vem com script serve usando nodemon.

3. Frontend

cd ../frontend
npm install
# Veja o package.json do frontend para confirmar o script de start
npm run dev   # ou npm start

Abra o frontend (normalmente em http://localhost:3000 ou conforme seu script).

Observações e dicas (problemas comuns)

Conexão com MongoDB Atlas: cole a URI completa no MONGO_URI (incluindo usuário/senha). Se der erro, verifique IP whitelist e network access no Atlas.

CORS: se o frontend reclamar, habilite CORS no backend (cors()), ou ajuste CLIENT_URL/origem permitida.

Uploads: a pasta backend/images é esperada para armazenar arquivos enviados por multer. Se multer retorna erro de diretório, crie a pasta.

JWT: ao criar/validar tokens, confira se JWT_SECRET está definido em .env.

Scripts do frontend: dependendo de como o frontend foi criado (CRA, Vite etc.), o comando para rodar pode ser npm start ou npm run dev. Verifique frontend/package.json.

Estrutura (resumo)

GruDee/
├─ backend/   # Node + Express (MVC)
│  ├─ controllers/
│  ├─ models/
│  ├─ routes/
│  ├─ images/   # criar manualmente
│  └─ index.js
├─ frontend/  # React + Redux
└─ README.md

Para contribuir / testar

Abra issues descrevendo bugs ou melhorias.

Se for adicionar feature, prefira criar branch com nome feature/<nome>.

Aviso final

Este projeto é de estudo. Não use segredos reais em commits públicos. Se quiser, posso ajudar a melhorar o README, adicionar instruções específicas do frontend (script exato) ou gerar um .env.example pronto.

Boa codificação!Se quiser, eu adapto o README para inglês, ou gero um .env.example e um postman_collection.json mínimo.

