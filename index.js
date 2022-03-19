const telegramApi = require('node-telegram-bot-api')
const {OWNER_ID, TOKEN} = require('./constant')
const bot = new telegramApi(TOKEN, {polling: true})
bot.setMyCommands([
    {command: '/assortment', description: 'Получить список нашей продукции'},
    {command: '/order', description: 'Сделать заказ'},
])


bot.on('message', async message => {
    let text = message.text
    let chatId = message.chat.id
    if (text === '/start') {
        await bot.sendMessage(chatId, `Добро пожаловать в телеграм-бот 17 специй\n/assortment - Получить список нашей продукции\n/order - Сделать заказ`)
        return
    }
    if (text === '/assortment') {
        await bot.sendMessage(chatId, `Наш ассортимент:\n\nАдыгейская соль:\nКлассическая\nОстренькая\nБрутальная\nЛесная\n\nСпеции:\nЧерный перец\nПаприка\nКуркума`)
        return
    }
    if (text === '/order') {
        await bot.sendMessage(chatId, `Чтобы сделать заказ, напишите сообщение которое начинается со слова "заказ"`)
        return
    }
    if (text.includes('заказ') || text.includes('Заказ')) {
        await bot.sendMessage(chatId, `Ваш заказ принят. Через некоторое время мы с вами свяжемся для уточнения заказа)`)
        await bot.sendMessage(OWNER_ID, `@${message.chat.username} (${message.chat.first_name} ${message.chat.last_name})\n${text}`)
        return
    }
    return bot.sendMessage(chatId, `Я вас не понимаю. Ознакомьтесь со списком доступных комманд введя /info`)
})