require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const cron = require('node-cron');

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });
const CHAT_ID = process.env.CHAT_ID;

// ========================
// MENSAGENS AUTOMÁTICAS
// ========================

// Bom dia
cron.schedule('0 9 * * *', () => {
  bot.sendMessage(CHAT_ID, `👋 Bom dia!

Bem-vindo ao Radar de Golos ⚽️
Sinais ao longo do dia.
Aposte sempre com responsabilidade.`);
});

// Lembrete
cron.schedule('30 12 * * *', () => {
  bot.sendMessage(CHAT_ID, `🔔 Atenção

Os próximos sinais do Radar de Golos serão publicados em breve.`);
});

// Resultados do dia
cron.schedule('55 23 * * *', () => {
  bot.sendMessage(CHAT_ID, `📊 RESULTADOS DO DIA

🟢 Greens: X
🔴 Reds: X
🎯 Assertividade: X%

Obrigado por acompanharem 🙏`);
});

// Boa noite
cron.schedule('30 0 * * *', () => {
  bot.sendMessage(CHAT_ID, `🌙 Boa noite!

Obrigado por acompanharem o Radar de Golos.
Voltamos amanhã ⚽️`);
});

// ========================
// AGENDAR SINAIS MANUAIS
// ========================

bot.onText(/\/sinal (\d{2}):(\d{2})\n([\s\S]+)/, (msg, match) => {
  const hour = match[1];
  const minute = match[2];
  const text = match[3];

  const cronTime = `${minute} ${hour} * * *`;

  cron.schedule(cronTime, () => {
    bot.sendMessage(CHAT_ID, text);
  });

  bot.sendMessage(msg.chat.id, `✅ Sinal agendado para ${hour}:${minute}`);
});

// ========================
// CONFIRMAÇÃO
// ========================

bot.sendMessage(CHAT_ID, '🤖 Bot online — mensagens automáticas ativas');
