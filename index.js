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
// COMANDOS PRIVADOS (NÃO PUBLICA)
// ===============================
bot.onText(/\/green/, () => {
  greens++;
});

bot.onText(/\/red/, () => {
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
// CRONS — HORA PORTUGAL (UTC)
// ===============================

// 09:00 — Bom dia
cron.schedule("0 9 * * *", () => {
  bot.sendMessage(
    CHANNEL_ID,
    "🌅 Bom dia!\n\nPreparação diária em andamento.\nFica atento aos sinais do Radar de Golos."
  );
});

// 11:00 — Lembrete 1 (Preparação Premium)
cron.schedule("0 11 * * *", () => {
  bot.sendMessage(
    CHANNEL_ID,
    `🔔 PREPARAÇÃO DOS SINAIS | Radar de Golos

Os sinais publicados no Radar de Golos são definidos com base em:

• Análise do mercado e variação das odds
• Estatísticas recentes e histórico das equipas
• Tendência ofensiva e volume de golos
• Contexto competitivo e forma atual

⚠️ Aposte sempre com responsabilidade.`
  );
});

// 11:30 — Casa de apostas oficial
cron.schedule("30 11 * * *", () => {
  bot.sendMessage(
    CHANNEL_ID,
    `🏦 CASA DE APOSTAS OFICIAL

Os sinais do Radar de Golos são analisados com base nesta casa de apostas.

👉 [APOSTAR AQUI](https://teulink.com)

⚠️ Jogue com responsabilidade.`
  );
});

// 12:30 — Lembrete 3
cron.schedule("30 12 * * *", () => {
  bot.sendMessage(
    CHANNEL_ID,
    "🔔 Atenção\n\nOs próximos sinais do Radar de Golos serão publicados em breve."
  );
});

// 00:00 — Resultados do dia
cron.schedule("0 0 * * *", () => {
  enviarResultados();
  greens = 0;
  reds = 0;
});

// 01:00 — Boa noite
cron.schedule("0 1 * * *", () => {
  bot.sendMessage(
    CHANNEL_ID,
    "🌙 Boa noite!\n\nObrigado por acompanharem o Radar de Golos 💙"
  );
});

console.log("🤖 Bot online e totalmente operacional");
