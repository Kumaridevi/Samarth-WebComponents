(function(){
  'use strict';
    angular
        .module("samarth-webcomponents",[])
        .config(jobPostconfig);
        function jobPostconfig($stateProvider, $urlRouterProvider){
        $urlRouterProvider.otherwise('/');
         $stateProvider
         .state('index.home.jobPost', {
            url:'/jobPost',
            views: {
                'content@': {
                    templateUrl: 'jobPost/template/jobPost.html',
                }
            }
     
        })
     }
 })();   
