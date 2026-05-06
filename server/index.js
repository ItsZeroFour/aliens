import stompit from "stompit";

const connectOptions = {
  host: "mq-test.maxi-retail.ru",
  port: 61613,
  ssl: true,
  tls: {
    rejectUnauthorized: false,
  },
  connectHeaders: {
    host: "/",
    login: "almuzalewsky",
    passcode: "r8D1zYcnFy",
  },
};

stompit.connect(connectOptions, (err, client) => {
  if (err) {
    console.error("❌ Ошибка подключения:", err.message);
    return;
  }

  console.log("✅ Подключились к брокеру!");

  const sendHeaders = {
    destination: "/queue/test",
    "content-type": "text/plain",
  };

  const frame = client.send(sendHeaders);
  frame.write("test message");
  frame.end();

  console.log("✅ Сообщение отправлено");

  client.disconnect();
});
