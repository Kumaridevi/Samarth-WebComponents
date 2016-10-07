var scripts = document.getElementsByTagName("script");
var currentScriptPath = scripts[scripts.length - 1].src;

var app = angular
    .module('samarth-webcomponents')
    .component('myWorkexperiencecard', {
        templateUrl: currentScriptPath.substring(0, currentScriptPath.lastIndexOf(
            '/')) + 'templates/sectionsworkexperiencecard.html',
        controller: workexperienceCardController

    });

function workexperienceCardController($http, $mdDialog) {
    var ctrl = this;
    ctrl.workexperiance = {};
    $http.get('api/profiles/01').then(function success(response) {
        for (var prop in response.data) {
            if (prop == "Work Experiance") { 
                ctrl.workexperiance[prop] = response.data[prop];

            }

        }
        for (var prop in ctrl.workexperiance) {
            for (var key in ctrl.workexperiance[prop]) {

            }

        }
        console.log("workexp", ctrl.workexperiance);
    })

}
