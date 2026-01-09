import TelegramBot from "node-telegram-bot-api";

const token = process.env.BOT_TOKEN;
const channelId = "@radardegolos";

if (!token) {
  console.error("BOT_TOKEN não definido");
  process.exit(1);
}

const bot = new TelegramBot(token, { polling: false });

(async () => {
  try {
    console.log("A iniciar bot...");
    await bot.sendMessage(channelId, "🤖 Bot iniciado com sucesso!");
    console.log("Mensagem enviada. Bot OK.");
    process.exit(0);
  } catch (err) {
    console.error("Erro:", err.message);
    process.exit(1);
  }
})();
let greens = 0;
let reds = 0;

// Comandos de resultado
bot.onText(/\/green/, (msg) => {
  if (msg.chat.type === "private" || msg.chat.id === process.env.CHANNEL_ID) return;
  greens++;
});

bot.onText(/\/red/, (msg) => {
  if (msg.chat.type === "private" || msg.chat.id === process.env.CHANNEL_ID) return;
  reds++;
});

// Envio automático às 23:55
cron.schedule('55 23 * * *', () => {
  const total = greens + reds;
  const taxa = total > 0 ? Math.round((greens / total) * 100) : 0;

  const mensagem = `
📊 RESULTADO DO DIA — Radar de Golos

✅ Greens: ${greens}
❌ Reds: ${reds}
📈 Taxa de acerto: ${taxa}%

Disciplina e gestão são a chave 📌
`;

  bot.sendMessage(process.env.CHANNEL_ID, mensagem);

  // Reset diário
  greens = 0;
  reds = 0;
});
