Posts = new Meteor.Collection('posts');

Meteor.methods({
  post: function(postAtributes) {
    var user = Meteor.user(),
        postWithSameLink = Posts.findOne({url: postAtributes.url});

    // ensure the user is logged in
    if(!user)
      throw new Meteor.Error(401, 'You need to login to post new stories.');

    // ensure the post has a title
    if(!postAtributes.title)
      throw new Meteor.Error(422, 'Please fill in a headline.');

    // check that there are no previous posts with the same link
    if(postAtributes.url && postWithSameLink) {
      throw new Meteor.Error(302,
        'This link has already been posted.',
        postWithSameLink._id
      );
    }

    // pick out the whitelisted keys
    var post = _.extend(_.pick(postAtributes, 'url', 'title', 'message'), {
      userId: user._id,
      author: user.username,
      submitted: new Date().getTime()
    });

    var postId = Posts.insert(post);

    return postId;
  }
});
