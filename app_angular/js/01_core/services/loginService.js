(function() {

    angular.module('login.services', [])


    .factory('logeoService', ['$http', '$q', '$filter', '$window', 'glbConst', function($http, $q, $filter, $window, glbConst) {

        function callBulletCharts(data) {

            var deferred = $q.defer();
            var json = "";

            if (data.type == 'C')
                json = './jsons/indVsEva.json';
            else if (data.type == 'M')
                json = './jsons/indVsEva2.json';
            else if (data.type == 'E')
                json = './jsons/indVsEvaEmp.json';
            else if (data.type == 'F')
                json = './jsons/indVsEvaFin.json';

            //$http.get(glbConst.url +  'usuario_controller?)
            $http.get(json)
                .then(
                    function(response) {

                        objectResp = response.data;
                        deferred.resolve(objectResp);
                    },
                    function(response) {
                        // Handle error here
                        objectResp = response.data.response;
                        deferred.resolve(objectResp);
                    })


            return deferred.promise;
        }
        // ================================= TREE MAP
        function treeMap() {

            var deferred = $q.defer();

            //$http.get(glbConst.url +  'usuario_controller?)
            $http.get('./jsons/carreras.json')
                .then(
                    function(response) {

                        objectResp = response.data;
                        deferred.resolve(objectResp);
                    },
                    function(response) {
                        // Handle error here
                        objectResp = response.data.response;
                        deferred.resolve(objectResp);
                    })


            return deferred.promise;
        }

        //============================ SPEED
        function speed() {

            var deferred = $q.defer();

            //$http.get(glbConst.url +  'usuario_controller?)
            $http.get('./jsons/speed.json')
                .then(
                    function(response) {

                        objectResp = response.data;
                        deferred.resolve(objectResp);
                    },
                    function(response) {
                        // Handle error here
                        objectResp = response.data.response;
                        deferred.resolve(objectResp);
                    })


            return deferred.promise;
        }

         //============================ Text (Para el total alcanzado en indicadores de carrera)
         function total() {
            
                        var deferred = $q.defer();
            
                        //$http.get(glbConst.url +  'usuario_controller?)
                        $http.get('./jsons/indicadores.json')
                            .then(
                                function(response) {
            
                                    objectResp = response.data;
                                    deferred.resolve(objectResp);
                                },
                                function(response) {
                                    // Handle error here
                                    objectResp = response.data.response;
                                    deferred.resolve(objectResp);
                                })
            
            
                        return deferred.promise;
                    }

        //============================ Tfuncion (Para el total alcanzado en indicadores de carrera)
        function tfuncion() {
            
                        var deferred = $q.defer();
            
                        //$http.get(glbConst.url +  'usuario_controller?)
                        $http.get('./jsons/data.json')
                            .then(
                                function(response) {
            
                                    objectResp = response.data;
                                    deferred.resolve(objectResp);
                                },
                                function(response) {
                                    // Handle error here
                                    objectResp = response.data.response;
                                    deferred.resolve(objectResp);
                                })
            
            
                        return deferred.promise;
                    }

            
        return {
            callBulletCharts: callBulletCharts,
            treeMap: treeMap,
            speed: speed,
            total:total,
            tfuncion:tfuncion

        };

    }]);
})();