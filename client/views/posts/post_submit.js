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
        // display the error to the user
        throwError(error.reason);

        if(error.error === 302)
          Router.go('postPage', {_id: error.details});
      } else {
        Router.go('postPage', {_id: id});
      }
    });
  }
});
