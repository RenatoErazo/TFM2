(function () {

  angular.module('delta.filters')
    .filter('estadoLanzarevaluacion', function () {
      return function (input) {
          if (!input) return "";
            if(input=='A')
                return 'Abierta';
            else if(input=='F')
                return 'Finalizado';
            else if(input=='X')
                return 'Eliminada';
      };
    })

})();
