Template.postSubmit.events({
  'submit form': function(e) {
    e.preventDefault();

    var post = {
      url: $(e.target).find('[id=url]').val(),
      title: $(e.target).find('[id=title]').val(),
      message: $(e.target).find('[id=message]').val(),
    };

    post._id = Posts.insert(post);
    Router.go('postPage', post);
  }
});
