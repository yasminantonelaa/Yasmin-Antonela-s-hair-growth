# 🌸 Yasmin Antonela's Hair Growth

Site pessoal para acompanhar e incentivar o crescimento capilar, com calculadora de crescimento, cronograma capilar interativo e uma chatbot de IA ("IAsmin") para dar dicas de cuidados e motivação. 💕

## ✨ Funcionalidades

- **Contador de Crescimento**: informe a data do último corte e veja quantos dias se passaram e o crescimento estimado (em cm), com base numa média de crescimento mensal.
- **Cronograma Capilar Semanal**: grade com hidratação, nutrição, reconstrução e dias de pausa, com dicas passo a passo e "misturinhas caseiras" ao passar o mouse sobre cada dia.
- **Chatbot "IAsmin"**: assistente virtual com IA que responde dicas de cuidados capilares e mensagens de autoestima, via integração com a API da NVIDIA (modelo Llama 3.1).
- **Player de música local**: pop-up com áudio de fundo tocando automaticamente.
- **Seção Girl Power**: frases de incentivo para manter a disciplina no cronograma.

## 🛠️ Tecnologias

**Front-end**
- HTML5, CSS3 e JavaScript puro (vanilla)
- Google Fonts (Amatic SC)

**Back-end**
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/) — servidor e proxy da API de IA
- [cors](https://www.npmjs.com/package/cors)
- [dotenv](https://www.npmjs.com/package/dotenv) — variáveis de ambiente
- [node-fetch](https://www.npmjs.com/package/node-fetch) — requisições HTTP ao provedor de IA

**IA**
- API da [NVIDIA (NIM)](https://build.nvidia.com/) com o modelo `meta/llama-3.1-70b-instruct`

## 📁 Estrutura do projeto

```
yasmin-hair-growth/
├── .env                  # Variáveis de ambiente (não enviado ao Git)
├── .gitignore            # Arquivos ignorados pelo Git
├── package.json          # Dependências e scripts do Node.js
├── server.js             # Servidor Express & Proxy da API de IA
└── public/               # Arquivos estáticos do Front-end
    ├── index.html        # Estrutura HTML da aplicação
    ├── style.css          # Estilização, fontes e layout
    ├── script.js          # Lógica do front-end e requisições
    └── midnight-sun.mp3   # Arquivo de áudio local
```

## 🚀 Como rodar localmente

### Pré-requisitos
- [Node.js](https://nodejs.org/) instalado (versão 16 ou superior recomendada)
- Uma chave de API válida da NVIDIA (NIM)

### Passo a passo

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/yasmin-hair-growth.git
   cd yasmin-hair-growth
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Crie um arquivo `.env` na raiz do projeto com sua chave de API:
   ```env
   NVIDIA_API_KEY=sua_chave_aqui
   PORT=3000
   ```

4. Coloque o arquivo de áudio `midnight-sun.mp3` dentro da pasta `public/` (ele não é versionado por padrão, dependendo da configuração do `.gitignore`).

5. Inicie o servidor:
   ```bash
   npm start
   ```

6. Acesse no navegador:
   ```
   http://localhost:3000
   ```

## 🔑 Variáveis de ambiente

| Variável         | Descrição                                             | Obrigatória |
|------------------|--------------------------------------------------------|:-----------:|
| `NVIDIA_API_KEY` | Chave de API para acessar o modelo de IA da NVIDIA (NIM) | ✅ |
| `PORT`           | Porta em que o servidor irá rodar (padrão: `3000`)       | ❌ |

> ⚠️ **Nunca** compartilhe sua chave de API publicamente nem faça commit do arquivo `.env`. Ele já está incluído no `.gitignore`.

## 🔌 Endpoints da API

### `POST /api/chat`
Envia uma mensagem do usuário para a chatbot e retorna a resposta gerada pela IA.

**Body (JSON):**
```json
{
  "message": "Como faço hidratação capilar?"
}
```

**Resposta (JSON):**
```json
{
  "reply": "Oii, amiga! 🌸 Para hidratar..."
}
```

## 💡 Melhorias futuras

- Salvar o histórico de cortes e hidratações em um banco de dados
- Permitir múltiplos usuários com login
- Gráfico de evolução do crescimento capilar
- Notificações/lembretes do cronograma capilar

## 📜 Licença

Projeto pessoal, sem licença de uso comercial definida.

---

Com carinho, Yasmin Antonela (eu) que quer ver o cabelo grande 💕
