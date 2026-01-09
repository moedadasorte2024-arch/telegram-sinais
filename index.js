import TelegramBot from "node-telegram-bot-api";
import cron from "node-cron";

const token = process.env.BOT_TOKEN;
const channelId = "@radardegolos";

if (!token) {
  console.error("BOT_TOKEN não definido");
  process.exit(1);
}

const bot = new TelegramBot(token, { polling: false });

console.log("🤖 Bot iniciado com sucesso");

// =====================
// MENSAGENS AUTOMÁTICAS
// =====================

// 09:00 — Bom dia
cron.schedule("0 9 * * *", () => {
  bot.sendMessage(channelId, "☀️ Bom dia! Bem-vindo ao Radar de Golos ⚽📊");
});

// 12:30 — Lembrete
cron.schedule("30 12 * * *", () => {
  bot.sendMessage(channelId, "⏰ Lembrete: fique atento aos sinais de hoje!");
});

// 14:30 — Sinal
cron.schedule("30 14 * * *", () => {
  bot.sendMessage(channelId, "📢 SINAL DO DIA\n\nJogo:\nMercado:\nOdd:\nUnidade:");
});

// 15:30 — Sinal
cron.schedule("30 15 * * *", () => {
  bot.sendMessage(channelId, "📢 NOVO SINAL DISPONÍVEL ⚽");
});

// 17:30 — Sinal
cron.schedule("30 17 * * *", () => {
  bot.sendMessage(channelId, "📢 MAIS UM SINAL AO VIVO ⚽");
});

// 18:30 — Sinal
cron.schedule("30 18 * * *", () => {
  bot.sendMessage(channelId, "📢 ÚLTIMO SINAL DA TARDE ⚽");
});

// 23:55 — Resultados do dia
cron.schedule("55 23 * * *", () => {
  bot.sendMessage(channelId, "📊 RESULTADOS DO DIA\n\nGreens: X\nReds: X");
});

// 00:30 — Boa noite
cron.schedule("30 0 * * *", () => {
  bot.sendMessage(channelId, "🌙 Boa noite! Amanhã há mais sinais 🚀");
});
