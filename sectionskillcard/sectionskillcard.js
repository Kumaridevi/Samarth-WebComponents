var scripts = document.getElementsByTagName("script");
var currentScriptPath = scripts[scripts.length - 1].src;
var path1 = currentScriptPath.substring(0, currentScriptPath.lastIndexOf(
            '/')) + '/templates/sectionskillconversation.html';

angular.module('samarth-webcomponents')
    .component('mysectionSkillCard', {
        templateUrl: currentScriptPath.substring(0, currentScriptPath.lastIndexOf(
            '/')) + '/templates/sectionskillcard.html',
        controller: sectionskillcardCtrl,
        bindings: {
            candidateid: '<',
            showheader: '<',
            languagedata:'='
        },
        transclude: {
            verify: "verify"
        }
    })
    .filter('capitalize', function() {
        return function(input) {
            return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() :
                '';
        }
    });


function sectionskillcardCtrl($http, sectionskillcard, $mdDialog, datagenerate,
    $rootScope) {
    
    var ctrl = this;
   

    // var candidateid = UserAuthService.getUser().uname;
    console.log("Inside skill section", ctrl.candidateid);
    ctrl.loadLangData = function(lang) {
        datagenerate.getjson("section", lang).then(function(result) {
            ctrl.items = result;

        }); //end datagenerate
    }


    // ctrl.loadLangData(getItem("lang"));

    function getItem(key) {
        // return localStorageService.get(key);
    }
    //$scope.loadLangData("Hindi");
    ctrl.loadLangData("English");
    // $rootScope.$on("lang_changed", function(event, data) {

    //     ctrl.loadLangData(data.language);
    // });
    ctrl.limitval = 6;
    ctrl.limitval2 =6;
    ctrl.value = 40;
    ctrl.skill = {};
    ctrl.primary = [];
    ctrl.plen = 0;
    ctrl.slen = 0;
    ctrl.secondary = [];
    ctrl.total = 0; 
    ctrl.increaseLimit = function() {
        ctrl.limitval = ctrl.limitval + 6;
    }

    ctrl.decreaseLimit = function() {
        ctrl.limitval = ctrl.limitval - 6;
    }
    ctrl.increaseLimit2 = function() {
        ctrl.limitval2 = ctrl.limitval2 + 6;
    }

    ctrl.decreaseLimit2 = function() {
        ctrl.limitval2 = ctrl.limitval2 - 6;
    }

    sectionskillcard.getjson(ctrl.candidateid).then(function(result) {
        ctrl.skill = result;
        //console.log("skill object", ctrl.skill);

        for (var prop in ctrl.skill) {
            for (var key in ctrl.skill[prop]) {
                //console.log(ctrl.skill[prop][key])
                for (var k in ctrl.skill[prop][key]) {

                    if (ctrl.skill[prop][key][k] == "Primary") //extracting all skill object containing primary type
                    {

                        ctrl.primary.push(ctrl.skill[prop][key]); //making array of object containing skill of  type primary   
                    }
                    if (ctrl.skill[prop][key][k] == "Secondary") //extracting all skill object containing primary type
                    {
                        ctrl.secondary.push(ctrl.skill[prop][key]); //making array of object containing skill type secondary
                    }
                }
            }
        }
        ctrl.total = ctrl.primary.length + ctrl.secondary.length;
        ctrl.plen = ctrl.primary.length;
        ctrl.slen = ctrl.secondary.length;
        // console.log(ctrl.primary);

    });
    $rootScope.$on("skilldatachanged", function() {
        sectionskillcard.getjson(ctrl.candidateid).then(function(result) {
            ctrl.skill = result;
            //console.log("skill object", ctrl.skill);
            ctrl.primary = [];
            ctrl.secondary = [];
            ctrl.total = 0;
            ctrl.plen = 0;
            ctrl.slen = 0;
            for (var prop in ctrl.skill) {
                for (var key in ctrl.skill[prop]) {
                    //console.log(ctrl.skill[prop][key])
                    for (var k in ctrl.skill[prop][key]) {

                        if (ctrl.skill[prop][key][k] == "Primary") //extracting all skill object containing primary type
                        {

                            ctrl.primary.push(ctrl.skill[prop][key]); //making array of object containing skill of  type primary   
                        }
                        if (ctrl.skill[prop][key][k] == "Secondary") //extracting all skill object containing primary type
                        {
                            ctrl.secondary.push(ctrl.skill[prop][key]); //making array of object containing skill type secondary
                        }
                    }
                }
            }
            ctrl.total = ctrl.primary.length + ctrl.secondary.length;
            ctrl.plen = ctrl.primary.length;
            ctrl.slen = ctrl.secondary.length;
            // console.log(ctrl.primary);

        });
    })


    ctrl.status = '  ';
    ctrl.customFullscreen = false;
    ctrl.showAdvanced = function(ev, value, title) {
        $mdDialog.show({
                controller: DialogController,
                templateUrl: path1,
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                locals: {
                    val: value,
                    header: title
                },
                fullscreen: ctrl.customFullscreen // Only for -xs, -sm breakpoints.
            })
            .then(function(answer) {
                ctrl.status = 'You said the information was "' + answer + '".';
            }, function() {
                ctrl.status = 'You cancelled the dialog.';
            });
    };

    function DialogController($scope, $mdDialog, val, header) {
        $scope.exp = [];
        for (i = 0; i <= 40; i++) {
            $scope.exp.push(i);
        }
        // var candidateid = UserAuthService.getUser().uname;
        $scope.skillObject = val;
        var skill = val.skillname;
        //console.log("coming", skill);
        $scope.header = header;
        $scope.hide = function() {
            $mdDialog.hide();
        };
        $scope.cancel = function() {
            $mdDialog.cancel();
        };
        $scope.save = function(skillobj, header) {
            // console.log("after save", $scope.skillObj);
            var skillObj = {
                "skills": [{
                    "skillname": skillobj.skillname,
                    "category": skillobj.category,
                    "expertise": skillobj.expertise,
                    "experience": skillobj.experience,
                    "metadata": {}
                }]
            };

            if (header === "Add Skill") {
                $http({ 
                    method: "post",
                    url: "/proxy/skill/" + ctrl.candidateid,
                    data: skillObj
                }).then(function mySucces(response)  { 
                    console.log("res", response.data[0])
                    $rootScope.$emit("skilldatachanged", {});
                    // alert(response);
                }, function myError(response) { 
                    console.log("error in adding skill section") 
                });
            }
            if (header === "Edit Skill") {
                $http({ 
                    method: "patch",
                    url: "/proxy/skill/" + ctrl.candidateid + "/" + skill,
                    data: skillObj
                }).then(function mySucces(response)  { 
                    console.log("res", response)
                    $rootScope.$emit("skilldatachanged", {});
                    // alert(response);
                }, function myError(response) { 
                    console.log('error in updating skill section'); 
                });
            }
            $mdDialog.hide();
        };
    }


}
