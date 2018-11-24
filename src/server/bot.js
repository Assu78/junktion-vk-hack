module.exports = (vk, groupId) => {
  const { updates } = vk;
  console.log('Starting pooling...');

  function reply(peerId, message) {
    const { api } = vk;
    api.call('messages.send', {
      peer_id: peerId,
      message,
      random_id: Math.floor(Math.random() * 100000000) + 1,
    }).catch(error => console.error(error));
  }

  updates.startPolling({
    pollingGroupId: groupId
  }).then(() => {
    console.log(`Registered for ${groupId}`);
  });

  updates.on('message', (context, next) => {
    // TODO: check group id
    if (context.senderId === 518184949) { // TODO: dont forget to adjust it
      return next();
    }
    // console.log(context.text);
    console.log(context);
    reply(context.peerId, context.text.toUpperCase());
    next();
  });
};
