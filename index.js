import TelegramBot from "node-telegram-bot-api";
import cron from "node-cron";

// ==================
// CONFIGURAÇÃO
// ==================
const BOT_TOKEN = process.env.BOT_TOKEN || "8576458884:AAGkn2Nrt2zY-56h-e1GaE12xnvogz12r90";
const CHANNEL_ID = "@radardegolos";

const bot = new TelegramBot(BOT_TOKEN, { polling: false });

// ==================
// MENSAGENS
// ==================

// BOM DIA — 09:00 (com rotação)
const bomDiaMsgs = [
`☀️ BOM DIA

Análises em andamento.
Sinais ao longo do dia.`,

`☀️ BOM DIA

Mercado em observação.
Sinais durante o dia.`,

`☀️ BOM DIA

Jogos em análise.
Sinais mais tarde.`
];

// LEMBRETE — 12:30
const lembrete = `⏰ LEMBRETE

Mercado em acompanhamento.`;

// SINAL
const criarSinal = (jogo, mercado, odd) => `
🚨⚽ SINAL CONFIRMADO

🏟 ${jogo}
📊 ${mercado}
💰 Odd: ${odd}
🎯 Unidade: 1
⏱ Pré-jogo
`;

// GREEN / RED
const GREEN = `🟢 GREEN`;
const RED = `🔴 RED`;

// RESULTADOS — 23:55
const criarResultados = (greens, reds) => `
📊 RESULTADOS DO DIA

🟢 Greens: ${greens}
🔴 Reds: ${reds}
📈 Assertividade: 0%
`;

// BOA NOITE — 00:30
const boaNoite = `🌙 BOA NOITE

Obrigado a todos por acompanharem.`;

// ==================
// FUNÇÕES
// ==================
const enviar = (msg) => {
  bot.sendMessage(CHANNEL_ID, msg);
};

const aleatorio = (arr) =>
  arr[Math.floor(Math.random() * arr.length)];

// ==================
// AGENDAMENTOS
// ==================

// BOM DIA — 09:00
cron.schedule("0 9 * * *", () => {
  enviar(aleatorio(bomDiaMsgs));
});

// LEMBRETE — 12:30
cron.schedule("30 12 * * *", () => {
  enviar(lembrete);
});

// RESULTADOS — 23:55 (exemplo com 0/0)
cron.schedule("55 23 * * *", () => {
  enviar(criarResultados(0, 0));
});

// BOA NOITE — 00:30
cron.schedule("30 0 * * *", () => {
  enviar(boaNoite);
});

// ==================
// TESTE MANUAL (opcional)
// ==================
// enviar(criarSinal("Lille vs Rennes", "Over 2.5 Golos", "1.67"));
// enviar(GREEN);
// enviar(RED);

console.log("🤖 Bot Radar de Golos ativo 24/7");
