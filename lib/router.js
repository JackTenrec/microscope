
Router.configure({
  loadingTemplate: 'loading',
  waitOn: function() { return Meteor.subscribe('posts'); },
  layoutTemplate: 'layout',
  clearErrors: function() { Errors.clearSeen(); this.next(); }
});

Router.map(function() {
  this.route('postsList', {path: '/'});

  this.route('postPage', {
    path: 'posts/:_id',
    data: function() { return Posts.findOne(this.params._id); }
  });

  this.route('postEdit', {
    path: '/posts/:_id/edit',
    data: function() { return Posts.findOne(this.params._id); }
  });

  this.route('postSubmit', {
    path: '/submit'
  });
});

var requireLogin = function() {
  if(! Meteor.user()) {
    if(Meteor.loggingIn())
      this.render('loading');
    else
      this.render('accessDenied');
  } else {
    this.next();
  }
}

Router.before(requireLogin, { only: 'postSubmit' });
