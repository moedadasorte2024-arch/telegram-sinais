import fetch from "node-fetch";

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHANNEL_ID = process.env.TELEGRAM_CHANNEL;

async function sendSignal() {
  const message = `
⚽ FUTEBOL | Radar de Golos

Jogo: Lille vs Rennes
Mercado: Over 2.5 Golos
Odd mínima recomendada: 1.60
Tipo: Pré-jogo
Hora: 20:00

🎯 Aposta disponível na ESC
👉 LINK_AFILIADO_ESC
`;

  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: CHANNEL_ID,
      text: message
    })
  });

  console.log("Sinal enviado com sucesso");
}

// ENVIA UM SINAL A CADA 6 HORAS (24/7)
setInterval(sendSignal, 6 * 60 * 60 * 1000);

// envia logo ao iniciar
sendSignal();
