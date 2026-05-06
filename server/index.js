import pkg from "activemq";
const { createClient } = pkg;

const client = createClient({
  host: "mq-test.maxi-retail.ru",
  port: 61617,
  ssl: true,
  rejectUnauthorized: false,
  login: "almuzalewsky",
  passcode: "r8D1zYcnFy",
});

client.connect();

client.on("connect", () => {
  console.log("Подключились к брокеру!");

  client.send("/queue/test", {}, "test message");
  console.log("Сообщение отправлено в очередь");

  client.disconnect();
});

client.on("error", (err) => {
  console.error("Ошибка подключения:", err.message);
});

client.on("disconnect", () => {
  console.log("Отключились");
});
