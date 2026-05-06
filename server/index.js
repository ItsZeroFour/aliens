import pkg from 'activemq';
const { createProducer } = pkg;

const producer = createProducer({
  host: 'mq-test.maxi-retail.ru',
  port: 61617,
  ssl: true,
  rejectUnauthorized: false,
  login: 'almuzalewsky',
  passcode: 'r8D1zYcnFy',
  destination: '/queue/test',
});

producer.on('connect', () => {
  console.log('✅ Подключились к брокеру!');

  producer.send('test message', (err) => {
    if (err) {
      console.error('❌ Ошибка отправки:', err.message);
    } else {
      console.log('✅ Сообщение отправлено в очередь');
    }
    producer.disconnect();
  });
});

producer.on('error', (err) => {
  console.error('❌ Ошибка подключения:', err.message);
});

producer.on('disconnect', () => {
  console.log('🔌 Отключились');
});

producer.connect();