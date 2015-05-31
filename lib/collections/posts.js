Posts = new Mongo.Collection('posts');

Posts.allow({
  insert: function(userId, doc) {
    // Only allow posting for logged in users
    return !! userId;
  }
});