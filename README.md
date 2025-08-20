# GruDee

**Rede social (projeto de estudo)** — Node.js (backend) + React (frontend)

> Projeto criado para aprendizado. Pode conter inconsistências e bugs — serve como ambiente para estudar MVC, autenticação, uploads e Redux.

---

## Tecnologias

* Backend: Node.js, Express, Mongoose, Multer, JWT, bcrypt
* Frontend: React (+ Redux)
* Banco: MongoDB Atlas (conectar via `MONGO_URI`)

---

## Funcionalidades principais

* Registro / Login (autenticação JWT)
* Perfil e edição de perfil
* Dashboard / Home 
* Upload básico de imagens (pasta `backend/images`)
* Organização em MVC no backend

---

## Requisitos

* Node.js (v16+ recomendado)
* npm ou yarn
* Conta no MongoDB Atlas

---

## Como rodar (guia rápido)

**1. Baixar o projeto**

```bash
git clone https://github.com/eujoao-maciel/GruDee.git
cd GruDee
```

**2. Backend**

```bash
cd backend
# Se não existir package.json, crie um rápido (opcional):
# npm init -y
npm install
```

Crie o arquivo `.env` (ou conecte seu `config.js`) com pelo menos estas variáveis:

```env
# Cole aqui a sua connection string do MongoDB Atlas.
# NÃO comite este arquivo em repositórios públicos (contém credenciais).
# Exemplo (substitua <username> e <password> ou cole a URI completa):

# Chave usada para assinar tokens JWT (ex.: 'mysecret')
MYSECRET=mysecret
```

Em seguida, inicie o servidor:

```bash
npm run serve
```

**3. Frontend**

```bash
cd ../frontend
npm install
npm run dev 
```

---

## Observações e dicas (problemas comuns)

* **Conexão com MongoDB Atlas:** cole a URI completa no `MONGO_URI` (incluindo usuário/senha). Se der erro, verifique IP whitelist e network access no Atlas.
* **CORS:** se o frontend reclamar, habilite CORS no backend (`cors()`), ou ajuste `CLIENT_URL`/origem permitida.
* **JWT:** ao criar/validar tokens, confira se `JWT_SECRET` está definido em `.env`.
* **Scripts do frontend:** dependendo de como o frontend foi criado (CRA, Vite etc.), o comando para rodar pode ser `npm start` ou `npm run dev`. Verifique `frontend/package.json`.

---

## Estrutura (resumo)

```
GruDee/
├─ backend/   # Node + Express (MVC)
│  ├─ controllers/
│  ├─ models/
│  ├─ routes/
│  ├─ images/   # criar manualmente
│  └─ index.js
├─ frontend/  # React + Redux
│  └─ src/
│     ├─ components/
│     ├─ hooks/
│     ├─ pages/        
│     ├─ services/
│     ├─ slices/
│     ├─ utils/
│     ├─ App.jsx
│     ├─ main.jsx
│     ├─ store.jsx
│     └─ index.css
└─ README.md
```

---

