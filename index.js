import TelegramBot from "node-telegram-bot-api";
import cron from "node-cron";

// ====================
// CONFIGURAÇÃO
// ====================
const BOT_TOKEN = process.env.BOT_TOKEN;
const CHANNEL_ID = process.env.BOT_CHANNEL;

if (!BOT_TOKEN || !CHANNEL_ID) {
  console.error("Variáveis de ambiente não definidas");
  process.exit(1);
}

const bot = new TelegramBot(BOT_TOKEN, { polling: true });

console.log("🤖 Bot iniciado com sucesso");

// ====================
// COMANDOS MANUAIS
// ====================
bot.onText(/\/green/i, () => {
  bot.sendMessage(CHANNEL_ID, "🟢 GREEN");
});

bot.onText(/\/red/i, () => {
  bot.sendMessage(CHANNEL_ID, "🔴 RED");
});

bot.onText(/\/resultado/i, () => {
  bot.sendMessage(
    CHANNEL_ID,
    "📊 RESULTADOS DO DIA\n\n🟢 GREEN\n🔴 RED"
  );
});

// ====================
// CRON — BOM DIA
// ====================
cron.schedule("0 9 * * *", () => {
  bot.sendMessage(
    CHANNEL_ID,
    "☀️ Bom dia!\nFiquem atentos aos sinais de hoje 🔔"
  );
});

// ====================
// CRON — SINAL
// ====================
cron.schedule("30 14 * * *", () => {
  bot.sendMessage(
    CHANNEL_ID,
    "⚽ SINAL\nOver 2.5\nOdd 1.75"
  );
});

// ====================
// CRON — LEMBRETE
// ====================
cron.schedule("0 16 * * *", () => {
  bot.sendMessage(
    CHANNEL_ID,
    "⏰ Lembrete\nGestão é a chave do sucesso 💰"
  );
});

// ====================
// CRON — BOA NOITE
// ====================
cron.schedule("0 23 * * *", () => {
  bot.sendMessage(
    CHANNEL_ID,
    "🌙 Boa noite!\nObrigado por acompanharem 💙"
  );
});
