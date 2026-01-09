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

// ====================
// CONTADORES
// ====================
let greens = 0;
let reds = 0;

// ====================
// COMANDOS MANUAIS
// ====================
bot.onText(/\/green/i, () => {
  greens++;
  bot.sendMessage(CHANNEL_ID, "🟢 GREEN");
});

bot.onText(/\/red/i, () => {
  reds++;
  bot.sendMessage(CHANNEL_ID, "🔴 RED");
});

bot.onText(/\/resultado/i, () => {
  const total = greens + reds;
  const assertividade = total > 0 ? ((greens / total) * 100).toFixed(1) : 0;

  bot.sendMessage(
    CHANNEL_ID,
    `📊 RESULTADOS DO DIA\n
🟢 Greens: ${greens}
🔴 Reds: ${reds}
🎯 Assertividade: ${assertividade}%`
  );
});

// ====================
// RESET DIÁRIO (00:00)
// ====================
cron.schedule("0 0 * * *", () => {
  greens = 0;
  reds = 0;
});

// ====================
// BOM DIA
// ====================
cron.schedule("0 9 * * *", () => {
  bot.sendMessage(
    CHANNEL_ID,
    "☀️ Bom dia!\nMais um dia para buscar greens 💪"
  );
});

// ====================
// SINAL
// ====================
cron.schedule("30 14 * * *", () => {
  bot.sendMessage(
    CHANNEL_ID,
    "⚽ SINAL\nOver 2.5\nOdd 1.75"
  );
});

// ====================
// LEMBRETE
// ====================
cron.schedule("0 16 * * *", () => {
  bot.sendMessage(
    CHANNEL_ID,
    "⏰ Lembrete\nGestão de banca é essencial 📊"
  );
});

// ====================
// BOA NOITE
// ====================
cron.schedule("55 23 * * *", () => {
  const total = greens + reds;
  const assertividade = total > 0 ? ((greens / total) * 100).toFixed(1) : 0;

  bot.sendMessage(
    CHANNEL_ID,
    `🌙 Boa noite!\n
🟢 Greens: ${greens}
🔴 Reds: ${reds}
🎯 Assertividade: ${assertividade}%\n
Obrigado por acompanharem 💙`
  );
});
