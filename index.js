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
// COMANDOS PRIVADOS (NÃO PUBLICA NO CANAL)
// ===============================
bot.onText(/\/green/, (msg) => {
  greens++;
});

bot.onText(/\/red/, (msg) => {
  reds++;
});

// ===============================
// FUNÇÃO RESULTADOS
// ===============================
function enviarResultados() {
  const total = greens + reds;
  const assertividade =
    total === 0 ? 0 : ((greens / total) * 100).toFixed(0);

  const mensagem = `
📊 RESULTADOS DO DIA

🟢 Greens: ${greens}
🔴 Reds: ${reds}
📈 Assertividade: ${assertividade}%

Seguimos focados e disciplinados.
`;

  bot.sendMessage(CHANNEL_ID, mensagem);
}

// ===============================
// CRONS (HORA PORTUGAL - UTC)
// ===============================

// Bom dia — 09:00
cron.schedule("0 9 * * *", () => {
  bot.sendMessage(
    CHANNEL_ID,
    "🌅 Bom dia!\nFica atento aos sinais do Radar de Golos."
  );
});

// Lembrete — 12:30
cron.schedule("30 12 * * *", () => {
  bot.sendMessage(
    CHANNEL_ID,
    "🔔 Atenção\nFica atento aos próximos sinais do Radar de Golos."
  );
});

// Lembrete extra — 13:30
cron.schedule("30 13 * * *", () => {
  bot.sendMessage(
    CHANNEL_ID,
    "📢 Aviso\nOs sinais do Radar de Golos serão publicados em breve."
  );
});

// Resultados do dia — 00:00
cron.schedule("0 0 * * *", () => {
  enviarResultados();
  greens = 0;
  reds = 0;
});

// Boa noite — 01:00
cron.schedule("0 1 * * *", () => {
  bot.sendMessage(
    CHANNEL_ID,
    "🌙 Boa noite!\nObrigado por acompanharem 💙"
  );
});

console.log("🤖 Bot online e a funcionar");
