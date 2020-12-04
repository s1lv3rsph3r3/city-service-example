class EventServiceProvider {
  static subscribeToChannel(subscriber, userId, domain, channel) {
    const channelName = `${userId}::${domain}::${channel}`;
    subscriber.subscribe(channelName, (err, count) => {
      /* Do nothing here */
      console.log(`Subscribed to following channel: ${channelName}`);
      console.log(err, count);
    });
  }
}

module.exports = EventServiceProvider;
