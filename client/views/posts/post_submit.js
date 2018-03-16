Template.postSubmit.events({
  'submit form': function(e) {
    e.preventDefault();

    var post = {
      url: $(e.target).find('[id=url]').val(),
      title: $(e.target).find('[id=title]').val(),
      message: $(e.target).find('[id=message]').val(),
    };

    Meteor.call('post', post, function(error, id) {
      if(error) {
        swal('Error', 'Something went wrong! ' + error.reason, 'error');
        id = error.details;
      }

      Router.go('postsList');
    });
  }
});
