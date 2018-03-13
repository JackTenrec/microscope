Template.postSubmit.events({
  'submit form': function(e) {
    e.preventDefault();

    var post = {
      url: $(e.target).find('[id=url]').val(),
      title: $(e.target).find('[id=title]').val(),
      message: $(e.target).find('[id=message]').val(),
    };

    Meteor.call('post', post, function(error, id) {
      if(error)
        // return alert(error.reason);
        swal('Error:', 'Algo salio mal!', error.reason);

      Router.go('postPage', {_id: id});
    });
  }
});
