(function() {

    angular.module('login.directives', [])

    .directive('postForm', function() {
        return {
            controller: function($scope) {
                $scope.post = function() {
                    // Some generic POST behavior
                };
            },
            link: function(scope, iElem, iAttr) {
                scope.postPath = iAttr['postPath'];
            }
        };
    });


})();