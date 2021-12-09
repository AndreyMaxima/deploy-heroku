const context = require('request-context')
const path = require('path')
const fs = require('fs')

fs.existsSync(path.join(__dirname, '../logs')) && fs.mkdirSync(path.join(__dirname, '../logs'))

const options = {
  logDirectory:path.join(__dirname, '../logs'), // Директория для хранения логгов (должна существовать)
  fileNamePattern: '<DATE>.log', // Паттерн файла логов
  dateFormat: 'DD.MM.YYYY' // Формат даты
}

const logger = require('simple-node-logger').createRollingFileLogger(options) // Создание логгера

module.exports = {
  ...logger,
  info: (message) => logger.info(context.get('uuid'), ' ', message), // Переназначение метода, для автоматического логирования UUID запроса
  error: (message) => logger.error(context.get('uuid'), ' ', message),
  fatal: (message) => logger.fatal(context.get('uuid'), ' ', message),
}
