const { exec } = require('child_process');

const sendLunaNotification = (message) => {
  const command = `luna-send -n 1 luna://com.webos.notification/createToast '{ "message": "${message}" }'`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error sending notification: ${error.message}`);
      return;
    }
    console.log(`Notification sent: ${stdout}`);
  });
};

module.exports = sendLunaNotification;
