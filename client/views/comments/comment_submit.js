Template.commentSubmit.events({
  'sumit form': function(e, template) {
    e.preventDefault();

    var $body = $(e.target).find('[id=body]');
    var comment = {
      body: $body.val(),
      postId: template.data._id
    };

    Meteor.call('comment', comment, function(error, commentId) {
      if(error) {
        throwError(error.reason);
      } else {
        $body.val('');
      }
    });
  }
});
