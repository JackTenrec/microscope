Template.postEdit.helpers({
  post: function() {
    return Posts.findOne(Session.get('currentPostId'))
  }
});

Template.postEdit.events({
  'submit form': function(e) {
    e.preventDefault();

    var currentPostId = Session.get('currentPostId');

    var postProperties = {
      url: $(e.target).find('[id=url]').val(),
      title: $(e.target).find('[id=title]').val()
    }

    Posts.update(currentPostId, {$set: postProperties}, function(error) {
      if(error) {
        // display the error to the user
        swal('Error', 'Something went wrong! ' + error.reason, 'error');
      } else {
        Router.go('postPage', {_id: currentPostId});
      }
    })
  },

  'click delete': function(e) {
    e.preventDefault();

    swal({
      title: "Delete this post?",
      text: "Once deleted, you will not be able to recover this post!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        var currentPostId = Session.get('currentPostId');
        Posts.remove(currentPostId);
        swal("Poof! Your post has been deleted!", {
          icon: "success",
        });
        Router.go('postsList');
      } else {
        swal("Your post is safe!");
      }
    });
  }
});
