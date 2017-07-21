// Angular module, router, animation
angular.module('blog', ['ui.router', 'ngAnimate'])

	// Animation for slide up and down
	.animation('.slide', function() {
		var NG_HIDE_CLASS = 'ng-hide';
		return {
			beforeAddClass: function(element, className, done) {
				if(className === NG_HIDE_CLASS) {
					element.slideUp(done);
				}
			},
			removeClass: function(element, className, done) {
				if(className === NG_HIDE_CLASS) {
					element.hide().slideDown(done);
				}
			}
		}
	})

	// UI Router
	.config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
			// route for home page
            .state('app', {
                url:'/',
                views: {
                    'header': {
                        templateUrl : 'views/header.html',
                        controller  : 'postsController'
                    },
                    'content': {
                        templateUrl : 'views/home.html',
                        controller  : 'postsController'
                    },
                    'footer': {
                        templateUrl : 'views/footer.html',
                    }
                }
            })
        
            // route for blog page
            .state('app.blog', {
                url:'blog',
                views: {
                    'content@': {
                        templateUrl : 'views/blog.html',
                        controller  : 'postsController'                  
                    }
                }
            })

            // route for about page
            .state('app.about', {
                url:'about',
                views: {
                    'content@': {
                        templateUrl : 'views/about.html',
                        controller  : 'postsController'                  
                    }
                }
            })
        
            // route for contacts page
            .state('app.contacts', {
                url:'contacts',
                views: {
                    'content@': {
                        templateUrl : 'views/contacts.html',
                        controller  : 'initMapController'                  
                    }
                }
            })

            // route for post page
            .state('app.post', {
                url: 'blog/:id',
                views: {
                    'content@': {
                        templateUrl : 'views/post.html',
                        controller  : 'postsController'
                   }
                }
            })

            // route for post page
            .state('app.search', {
                url: 'search',
                views: {
                    'content@': {
                        templateUrl : 'views/search.html',
                        controller  : 'postsController'
                   }
                }
            });
    
        $urlRouterProvider.otherwise('/');
    })

;

