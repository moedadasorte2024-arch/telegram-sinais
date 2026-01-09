import TelegramBot from "node-telegram-bot-api";
import cron from "node-cron";

// ===============================
// CONFIGURAÇÃO
// ===============================
const BOT_TOKEN = process.env.BOT_TOKEN;
const CHANNEL_ID = "@radardegolos";

if (!BOT_TOKEN) {
  console.error("BOT_TOKEN não definido");
  process.exit(1);
}

const bot = new TelegramBot(BOT_TOKEN, { polling: true });

// ===============================
// CONTADORES
// ===============================
let greens = 0;
let reds = 0;

// ===============================
// COMANDOS MANUAIS
// ===============================
bot.onText(/\/green/, (msg) => {
  greens++;
  bot.sendMessage(CHANNEL_ID, "🟢 GREEN");
});

bot.onText(/\/red/, (msg) => {
  reds++;
  bot.sendMessage(CHANNEL_ID, "🔴 RED");
});

bot.onText(/\/resultado/, (msg) => {
  enviarResultados();
});

// ===============================
// FUNÇÃO RESULTADOS
// ===============================
function enviarResultados() {
  const total = greens + reds;
  const assertividade =
    total === 0 ? 0 : ((greens / total) * 100).toFixed(0);

  const mensagem = `
📊 *Resultados do dia*
🟢 Greens: ${greens}
🔴 Reds: ${reds}
🎯 Assertividade: ${assertividade}%
`;

  bot.sendMessage(CHANNEL_ID, mensagem, { parse_mode: "Markdown" });
}

// ===============================
// CRON — RESULTADOS AUTOMÁTICOS
// ===============================
// Ajusta o horário se quiseres
cron.schedule("0 23 * * *", () => {
  enviarResultados();

  // reset para o dia seguinte
  greens = 0;
  reds = 0;
});

// ===============================
// BOM DIA / LEMBRETE
// ===============================
cron.schedule("0 10 * * *", () => {
  bot.sendMessage(
    CHANNEL_ID,
    "☀️ Bom dia!\nFica atento aos sinais de hoje 🎯⚽"
  );
});

// ===============================
// BOA NOITE
// ===============================
cron.schedule("0 0 * * *", () => {
  bot.sendMessage(
    CHANNEL_ID,
    "🌙 Boa noite!\nObrigado por acompanharem 💙"
  );
});

console.log("🤖 Bot online");
