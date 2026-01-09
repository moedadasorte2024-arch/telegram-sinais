import TelegramBot from "node-telegram-bot-api";

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHANNEL_ID = process.env.TELEGRAM_CHANNEL;

const bot = new TelegramBot(BOT_TOKEN, { polling: false });

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

  await bot.sendMessage(CHANNEL_ID, message);
  console.log("Sinal enviado com sucesso");
}

sendSignal();
