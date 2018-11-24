const express = require('express');
const os = require('os');
const cors = require('cors');
const { VK } = require('vk-io');
const createBot = require('./bot');

const app = express();

const vk = new VK();

function get_token() {
  const direct = vk.auth.direct();
  return direct.run().then(response => response.token);
}

vk.setOptions({
  appId: '6761332',
  appSecret: 'JcuMse0IBTbFCbYRvPqz',
  apiMode: 'parallel_selected',
  login: 'user_BkloJaUu94WYmPB',
  password: 'etWOmRVMr9zTLm3',
  token: 'd327fe8fe08854ccaf1e4f73a121089dafd1dd8e76cceda261815bb3d4d9bf37b1e92881a292ba95718d6'
});


app.use(express.static('dist'));
app.use(express.json());
app.get('/api/friends', (req, res) => {
  vk.api.call('friends.get', {
    fields: ['nickname', 'id', 'photo_50']
  }).then((apiRes) => {
    res.send(apiRes);
  });
});

app.post('/api/event', (req, res) => {
  const friendList = req.body.ids.toString().replace('[', '').replace(']', '');
  console.log(friendList);
  vk.api.call('messages.createChat', {
    user_ids: friendList,
    title: 'Get wasted!!!'
  }).then((apiRes) => {
    const chatId = apiRes;
    createBot(vk, chatId);
    res.send({});
  }).catch((error) => {
    console.error(error);
    res.status(500);
  });
});

app.use(cors());
app.listen(8080, () => {
  // get_token().then(token => console.log(token));
  console.log('Listening on port 8080!');
});
