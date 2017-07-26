// Angular module
angular.module('blog')

	// Posts Controller, dependency injection
	.controller('postsController', ['$scope', '$stateParams', '$sce', 'blogService','$location', '$anchorScroll', function($scope, $stateParams, $sce, blogService, $location, $anchorScroll) {

		$scope.sortedBy = 'date';
		
		// Show active menu-item
		$scope.isActive = function (viewLocation) {
		     var active = (viewLocation === $location.path());
		     return active;
		};

		$scope.blogService = blogService;

		// Call function and return posts 
        $scope.posts = blogService.getPosts();

		// Single post
        var post = blogService.getPost(parseInt($stateParams.id,10));
	    // var post = $scope.posts[parseInt($stateParams.id,10)];
        $scope.post = post;

		// Convert to html
		$scope.trust = function(htmlCode){
			return $sce.trustAsHtml(htmlCode);
		};

		// New post
        $scope.newpost = { header: '', description: '', image: '' };
        
        $scope.submitPost = function() {
            
            // record the date
            $scope.newpost.date = new Date().toISOString();

            console.log($scope.newpost);
            
            // push post into the posts array
            $scope.posts.push($scope.newpost);

            // reset the form to pristine
            $scope.postForm.$setPristine(); 
            
            // reset JavaScript object that holds the post
            $scope.newpost = { header: '', description: '', image: '' } 

            // hide form
            $('.create-post').slideUp(200);
        }

        // New comment
        $scope.newcomment = { author: '', comment: '' };
        
        $scope.submitComment = function() {
            
            // record the date
            $scope.newcomment.date = new Date().toISOString();

            console.log($scope.newcomment);
            
            // push commetn into the comments array
            $scope.post.comments.push($scope.newcomment);
            
            // reset the form to pristine
            $scope.commentForm.$setPristine(); 
            
            // reset JavaScript object that holds the comment
            $scope.newcomment = { author: '', comment: '' } 

        }

        // Show submenu
        $scope.showSubmenu = false;

        $scope.overSubmenu = function(){
        	$scope.showSubmenu = true;
        }

        $scope.hideSubmenu = function(){
        	$scope.showSubmenu = false;
        }

        // On page loading scroll
		angular.element(document).ready(function() {

			$(window).scroll(function() {
				if (($(".header").length > 0)) { 
					if(($(this).scrollTop() > 0)) {
						$(".header").addClass("fixed-header-on");
						$(".menu__item, .socials__item").addClass("fixed-header-on-font");
					} else {
						$(".header").removeClass("fixed-header-on");
						$(".menu__item, .socials__item").removeClass("fixed-header-on-font");
					}
				};
			});
		});

	}])
	
	// Controller for slider and scroll
	.controller('SliderController', ['$scope', '$interval', function($scope, $interval) {

		// pause
		$scope.pause = false; 

		// On page loading start slider
		angular.element(document).ready(function() {

        	// Slider content fade In
		    $(".slider__header").fadeIn(3000); 

		    $scope.showSlide = function(){ 
				var currentWidth = $(".slider__slide").width();
				$(".slider__slides").stop().animate({
		            left: - currentWidth
		        }, 'slow', function () {
		            $('.slider__slide:first-child').appendTo('.slider__slides');
		            $('.slider__slides').css('left', '');
		        });
			}

			$scope.stop = function(){
				$scope.pause = !$scope.pause;
			}

			$interval(function(){
				if(!$scope.pause){
					$scope.showSlide();
				}
			}, 3000);
			  
		});
	}])

	// Controller for Google map
	.controller('initMapController', ['$scope', 'GMap', function($scope, GMap) {
		
        GMap.init();

	}])
;
