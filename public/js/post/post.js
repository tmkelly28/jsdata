'use strict'; 

app.config(function($stateProvider) {
	$stateProvider.state('post', {
		url: '/post/:postId',
		templateUrl: 'js/post/post.html',
		controller: 'PostCtrl', 
		resolve: {
			users: function(User){
				// GET - > '/api/users'
				return User.findAll()
			},
			thePost: function(Post, $stateParams) {
				return Post.find($stateParams.postId);
			}
		}
	})
});

// add necessary dependencies 
app.controller('PostCtrl', function(thePost, Post, $state, $scope, User) {

	$scope.editing = false;

	/* 1. FIND POST
		use state params to retrieve the post id and attach post object to scope 
		on controller load 
	*/

	$scope.post = thePost;
	console.log(thePost);
	
	// User.find($scope.post.author)
	// 	.then(function(author) {
	// 	console.log('AUTHOR', author);
	// 	$scope.author = author.name;
	// 	}).then(null, function(err) {
	// 		console.log(err);
	// 	})


	/*
		2. DELETE POST 
		create a function that destroys the post, adds an alert that the post has been 
		successfully deleted, and redirects to the main state. 
	*/
	$scope.deletePost = function(id) {
		Post.destroy(id)
		.then (function() {
			alert('post has been deleted');
			$state.go('main');
		})
	}

	/*
		3. EDIT POST 
		create a function that edits the post, adds an alert that the post has been 
		successfully edited, and displays the edited post.  

	*/
	$scope.showEdit = function() {
		$scope.editing = !$scope.editing;
	};

})