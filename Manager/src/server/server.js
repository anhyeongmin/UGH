const express = require('express');
const sendLunaNotification = require('./notification'); // notification.js를 불러옴
const app = express();

app.use(express.json());

// POST 요청으로 알림 보내기
app.post('/send-notification', (req, res) => {
  const { message } = req.body;
  sendLunaNotification(message);
  res.send('Notification sent');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
