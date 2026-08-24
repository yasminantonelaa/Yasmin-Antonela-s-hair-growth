document.addEventListener('DOMContentLoaded', function() {
    // Player de Áudio
    const audioPlayer = document.getElementById('audioPlayer');
    const closeMusicBtn = document.getElementById('closeMusicBtn');
    const musicPopup = document.getElementById('musicPopup');

    // Tenta dar play automaticamente; se o navegador bloquear, aguarda o primeiro clique na página
    if (audioPlayer) {
        audioPlayer.play().catch(() => {
            const playOnInteraction = () => {
                audioPlayer.play();
                document.removeEventListener('click', playOnInteraction);
            };
            document.addEventListener('click', playOnInteraction);
        });
    }

    closeMusicBtn.addEventListener('click', () => {
        if (audioPlayer) audioPlayer.pause();
        musicPopup.style.display = 'none';
    });

    // Calculadora
    const btnCalcular = document.getElementById('btnCalcular');
    btnCalcular.addEventListener('click', calcularCrescimento);

    // Chatbot
    const chatToggleBtn = document.getElementById('chatToggleBtn');
    const closeChatBtn = document.getElementById('closeChatBtn');
    const chatWindow = document.getElementById('chatWindow');
    const sendBtn = document.getElementById('sendBtn');
    const userInput = document.getElementById('userInput');
    const chatMessages = document.getElementById('chatMessages');

    chatToggleBtn.addEventListener('click', () => chatWindow.classList.toggle('hidden'));
    closeChatBtn.addEventListener('click', () => chatWindow.classList.add('hidden'));

    sendBtn.addEventListener('click', enviarMensagem);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') enviarMensagem();
    });

    async function enviarMensagem() {
        const texto = userInput.value.trim();
        if (!texto) return;

        adicionarMensagem(texto, 'user-message');
        userInput.value = '';

        const loadingMessage = adicionarMensagem('Pensando...', 'bot-message');

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: texto })
            });

            const data = await response.json();
            loadingMessage.innerText = data.reply || 'Ops, amiga! Não consegui entender. Tente novamente! 💕';
        } catch (erro) {
            console.error(erro);
            loadingMessage.innerText = 'Erro ao se conectar com o servidor! 💕';
        }
    }

    function adicionarMensagem(texto, classe) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${classe}`;
        msgDiv.innerText = texto;
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        return msgDiv;
    }
});

function calcularCrescimento() {
    const dataInput = document.getElementById('dataCorte').value;
    if (!dataInput) {
        alert('Por favor, selecione uma data!');
        return;
    }

    const dataCorte = new Date(dataInput);
    const hoje = new Date();
    const difTempo = hoje - dataCorte;

    if (difTempo < 0) {
        alert('A data não pode ser no futuro!');
        return;
    }

    const difDias = Math.floor(difTempo / (1000 * 60 * 60 * 24));
    const crescimentoCm = (difDias * (1 / 30.44)).toFixed(1);

    document.getElementById('dias').innerText = difDias;
    document.getElementById('cm').innerText = crescimentoCm;
    document.getElementById('resultado').style.display = 'block';
}