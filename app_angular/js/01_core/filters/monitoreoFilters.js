(function () {

  angular.module('delta.filters')
    .filter('estadoMonitoreo', function () {
      return function (input) {
          if (!input) return "";
            if(input=='P')
                return 'Pendiente';
            else if(input=='F')
                return 'Finalizado';
            else if(input=='G')
                return 'En proceso';
            else if(input=='X')
                return 'Eliminada';
      };
    })

})();
