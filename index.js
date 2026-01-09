require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const cron = require('node-cron');

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHANNEL_ID = process.env.CHANNEL_ID;

const bot = new TelegramBot(BOT_TOKEN, { polling: true });

let greens = 0;
let reds = 0;
let agendados = [];

// ===== FUNÇÃO DE ENVIO =====
function send(text) {
  bot.sendMessage(CHANNEL_ID, text);
}

// ===== GREEN / RED =====
bot.onText(/\/green/i, (msg) => {
  greens++;
  bot.sendMessage(msg.chat.id, '🟢 GREEN');
});

bot.onText(/\/red/i, (msg) => {
  reds++;
  bot.sendMessage(msg.chat.id, '🔴 RED');
});

// ===== COMANDO /agenda =====
bot.onText(/\/agenda (\d{2}:\d{2}) (.+)/i, (msg, match) => {
  const hora = match[1];
  const dados = match[2].split('|').map(t => t.trim());

  if (dados.length !== 3) {
    bot.sendMessage(msg.chat.id, '❌ Usa:\n/agenda HH:MM Jogo | Mercado | Odd');
    return;
  }

  const [jogo, mercado, odd] = dados;
  const jogoFormatado = jogo.replace(' vs ', ' 🆚 ');

  agendados.push({ hora, jogo: jogoFormatado, mercado, odd });
  bot.sendMessage(msg.chat.id, `✅ Sinal agendado para ${hora}`);
});

// ===== VERIFICA A CADA MINUTO =====
cron.schedule('* * * * *', () => {
  const agora = new Date();
  const horaAtual = agora.toTimeString().slice(0,5);

  agendados = agendados.filter(sinal => {
    if (sinal.hora === horaAtual) {
      send(`⚽️ SINAL - Radar de Golos

Jogo: ${sinal.jogo}
Mercado: ${sinal.mercado}
Odd: ${sinal.odd}
💰 Valor da aposta: 1 unidade

⚠️ Aposte com responsabilidade`);
      return false;
    }
    return true;
  });
});

// ===== MENSAGENS FIXAS =====

// Bom dia
cron.schedule('0 9 * * *', () => {
  send(`👋 Bom dia e bem-vindo ao Radar de Golos

Sinais diários de apostas desportivas,
sempre com responsabilidade.`);
});

// Lembrete
cron.schedule('30 12 * * *', () => {
  send(`🔔 Atenção

Os próximos sinais do Radar de Golos serão publicados em breve.`);
});

// Resultados
cron.schedule('55 23 * * *', () => {
  const total = greens + reds;
  const acc = total > 0 ? ((greens / total) * 100).toFixed(2) : 0;

  send(`📊 RESULTADOS DO DIA

🟢 Greens: ${greens}
🔴 Reds: ${reds}
🎯 Assertividade: ${acc}%`);

  greens = 0;
  reds = 0;
});

// Boa noite
cron.schedule('30 0 * * *', () => {
  send(`🌙 Boa noite

Obrigado por acompanharem o Radar de Golos.`);
});
