const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const NVIDIA_API_KEY = process.env.NVIDIA_API_KEY;

app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;

        if (!NVIDIA_API_KEY) {
            console.error("ERRO: NVIDIA_API_KEY não encontrada no .env");
            return res.status(500).json({ reply: "Ops! Chave de API não configurada no servidor." });
        }

        const systemPrompt = `Você é a melhor amiga da usuária no site "Yasmin Antonela's Hair Growth". 
Seu papel é responder com muito carinho, acolhimento e entusiasmo. 
Dê dicas valiosas de cuidados com o cabelo e frases de autoestima "girl power". 
Mantenha as respostas curtas, gentis e cheias de emojis fofos.`;

        // Chamada usando o modelo padrão NIM de altíssima estabilidade
        const response = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${NVIDIA_API_KEY.trim()}`,
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "meta/llama-3.1-70b-instruct",
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: message }
                ],
                temperature: 0.6,
                max_tokens: 300,
                stream: false
            })
        });

        const rawText = await response.text();

        if (!response.ok) {
            console.error(`Erro ${response.status} retornado pela NVIDIA:`, rawText);
            return res.status(response.status).json({ 
                reply: `Ops, amiga! Ocorreu um erro (${response.status}) ao conectar com a IA.` 
            });
        }

        const data = JSON.parse(rawText);
        let botReply = data.choices?.[0]?.message?.content || "Não consegui gerar uma resposta.";

        res.json({ reply: botReply });

    } catch (error) {
        console.error("Erro interno no servidor:", error);
        res.status(500).json({ reply: "Erro interno no servidor ao processar a mensagem." });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});