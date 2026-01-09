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
