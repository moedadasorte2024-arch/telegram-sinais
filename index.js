import TelegramBot from "node-telegram-bot-api";
import cron from "node-cron";
import express from "express";

const app = express();
app.get("/", (req, res) => res.send("Bot online"));
app.listen(3000);

// ========================
// CONFIGURAÇÃO
// ========================
const TOKEN = process.env.BOT_TOKEN;
const CHANNEL_ID = "@radardegolos";

const bot = new TelegramBot(TOKEN, { polling: true });

// ========================
// CONTADORES
// ========================
let greens = 0;
let reds = 0;

// ========================
// COMANDOS MANUAIS (CHAT COM BOT)
// ========================
bot.onText(/\/green/, (msg) => {
  greens++;
  bot.sendMessage(msg.chat.id, "🟢 GREEN");
});

bot.onText(/\/red/, (msg) => {
  reds++;
  bot.sendMessage(msg.chat.id, "🔴 RED");
});

bot.onText(/\/resultado/, (msg) => {
  const total = greens + reds;
  const accuracy = total > 0 ? ((greens / total) * 100).toFixed(0) : 0;

  bot.sendMessage(
    msg.chat.id,
    `📊 Resultados do dia\n\n🟢 Greens: ${greens}\n🔴 Reds: ${reds}\n🎯 Assertividade: ${accuracy}%`
  );
});

// ========================
// MENSAGENS AUTOMÁTICAS
// ========================

// 09:00 — Bom dia
cron.schedule("0 9 * * *", () => {
  bot.sendMessage(
    CHANNEL_ID,
    "☀️ Bom dia!\n\nBem-vindo ao Radar de Golos.\nHoje seguimos focados e disciplinados."
  );
});

// 12:30 — Lembrete
cron.schedule("30 12 * * *", () => {
  bot.sendMessage(
    CHANNEL_ID,
    "⏰ Lembrete\n\nGestão de banca é fundamental.\nAposte com responsabilidade."
  );
});

// 14:30 — Sinal
cron.schedule("30 14 * * *", () => {
  bot.sendMessage(
    CHANNEL_ID,
    "⚽ SINAL\n\nJogo: Exemplo FC vs Teste FC\nMercado: Over 2.5\nOdd: 1.65"
  );
});

// 15:30 — Sinal
cron.schedule("30 15 * * *", () => {
  bot.sendMessage(
    CHANNEL_ID,
    "⚽ SINAL\n\nJogo: Alpha FC vs Beta FC\nMercado: Ambas Marcam\nOdd: 1.70"
  );
});

// 17:30 — Sinal
cron.schedule("30 17 * * *", () => {
  bot.sendMessage(
    CHANNEL_ID,
    "⚽ SINAL\n\nJogo: City vs United\nMercado: Over 1.5\nOdd: 1.60"
  );
});

// 18:30 — Sinal
cron.schedule("30 18 * * *", () => {
  bot.sendMessage(
    CHANNEL_ID,
    "⚽ SINAL\n\nJogo: Roma vs Milan\nMercado: Over 2.5\nOdd: 1.75"
  );
});

// 23:55 — Resultados do dia
cron.schedule("55 23 * * *", () => {
  const total = greens + reds;
  const accuracy = total > 0 ? ((greens / total) * 100).toFixed(0) : 0;

  bot.sendMessage(
    CHANNEL_ID,
    `📊 Resultados do dia\n\n🟢 Greens: ${greens}\n🔴 Reds: ${reds}\n🎯 Assertividade: ${accuracy}%`
  );
});

// 00:30 — Boa noite + reset
cron.schedule("30 0 * * *", () => {
  bot.sendMessage(
    CHANNEL_ID,
    "🌙 Boa noite\n\nObrigado por acompanharem o Radar de Golos.\nAmanhã há mais!"
  );

  greens = 0;
  reds = 0;
});
