const admin = require("firebase-admin");
const fastify = require("fastify")({logger: true, keepAliveTimeout: 5000});
const util = require("util");

const serviceAccount = require("./serviceAccountKey.json");
const delay = util.promisify(setTimeout);

//Initialize Firebase
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

//remote Push Notification 
async function sendAlarmNotification(token) {
    return admin.messaging().send({
        token,
        notification: {
            body: 'Uma nova arte foi adicionada ao nosso catálogo, vá para o explorer e confira!',
            title: 'Nova Arte disponível'
        },
        data: {
            type: "alarmNotification",
        },
    });
}

// Partial Push Notification
async function sendPartialNotification(token) {
    return admin.messaging().send({
      token,
      data: {
        type: "partial_notification",
        notifee: JSON.stringify({
          body: "I'm your push notification",
          android: {
            channelId: "default",
          },
        }),
      },
    });
  }
  
  // Declare a notification route
  fastify.post("/notifications", async (request) => {
    await delay(5000);
    await sendPartialNotification(JSON.parse(request.body).token);
    return "OK";
  });
  
  // Declare a alarm route
  fastify.post("/alarm", async (request) => {
    await delay(5000);
    await sendAlarmNotification(JSON.parse(request.body).token);
    return "OK";
  });
  
  // Run the server
  const start = async () => {
    try {
      await fastify.listen(3000);
    } catch (err) {
      fastify.log.error(err);
      process.exit(1);
    }
  };
  start();

