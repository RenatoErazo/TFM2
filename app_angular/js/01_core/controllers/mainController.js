(function(_) {

    angular.module('login.controllers', [])
        .controller('MainController', ['$scope', '$routeParams', 'logeoService', '$location', '$rootScope', '$localStorage', '$window', '$filter', function($scope, $routeParams, logeoService, $location, $rootScope, $localStorage, $window, $filter) {

            $scope.tcarrera ="";
            $scope.variable ="5";
            $scope.resultado ="7.5";
            $scope.total = "";
            
            $scope.docentes ="";
            $scope.primer = "";
            $scope.graduados = "";
            $scope.RTotal ="";

            $scope.changeBullet = function(type) {

                logeoService.callBulletCharts({ type: type }).then(function(data) {

                    $scope.restBullet(data);

                });


            }


            $scope.changeSpeed = function(type) {

                logeoService.speed({ type: type }).then(function(data) {

                    $scope.restSpeed(data);

                });


            }

            $scope.changeTotal = function(type) {
                
                logeoService.total({ type: type }).then(function(data) {

                    $scope.restTotal(data);

                });


            }

            $scope.changetfuncion = function(type) {
                
                logeoService.tfuncion({ type: type }).then(function(data) {

                    $scope.resttfuncion(data);

                });


            }



            // auto ejecutan
            logeoService.callBulletCharts({ type: 'C' }).then(function(data) {

                $scope.initBullet(data);

            });

             logeoService.treeMap().then(function(data) {

                $scope.initTreeMap(data);

            }); 

            logeoService.speed().then(function(data) {

                $scope.initSpeed(data);

            }); 

            logeoService.total().then(function(data) {
                
                $scope.initTotal(data);
                
            }); 
                
            logeoService.tfuncion().then(function(data) {
                
                $scope.inittfuncion(data);
                
            }); 
            // Init Bullet

            var margin = { top: 5, right: 40, bottom: 20, left: 180 },
                width = 760 - margin.left - margin.right,
                height = 50 - margin.top - margin.bottom;

            var chart = d3.bullet()
                .width(width)
                .height(height);

            var svg = "";

            
            $scope.initBullet = function(data) {

                //if (error) throw error;
                svg = d3.select("#Bullet").selectAll("svg")
                    .data(data)
                    .enter().append("svg")
                    .attr("class", "bullet")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
                    .call(chart);

                var title = svg.append("g")
                    .style("text-anchor", "end")
                    .attr("transform", "translate(-6," + height / 2 + ")");

                title.append("text")
                    .attr("class", "title")
                    .text(function(d) { return d.title; });

                title.append("text")
                    .attr("class", "subtitle")
                    .attr("dy", "1em")
                    .text(function(d) { return d.subtitle; });

                /* d3.selectAll("button").on("click", function() {
                    svg.datum(randomize).call(chart.duration(1000)); // TODO automatic transition
                }); */


            }

            $scope.restBullet = function(data) {
                    console.log(data);
                    svg.datum(function(d, i) {
                            d.ranges = data[i].ranges;
                            d.measures = data[i].measures;
                            d.markers = data[i].markers;
                            return d;
                        })
                        .call(chart.duration(1000));
                }
                // End Bullet


            // ==========================   Init TreeMap 


               $scope.initTreeMap = function(data) {
                      
                var w = 450 ,
                h = 250 ,
                x = d3.scale.linear().range([0, w]),
                y = d3.scale.linear().range([0, h]),
                color = d3.scale.category20c(),
                root,
                node;
            
            var treemap = d3.layout.treemap()
                .round(false)
                .size([w, h])
                .sticky(true)
            //    .value(function(d) { return d["好き度"]; });
                .value(function(d) { return d.total; });
            
            var svg = d3.select("#treemap").append("div")
                .attr("class", "chart")
                .style("width", w + "px")
                .style("height", h + "px")
              .append("svg:svg")
                .attr("width", w)
                .attr("height", h)
              .append("svg:g")
                .attr("transform", "translate(.5,.5)");
            
            //d3.json("kinoko_takenoko.json", function(data) {
           // d3.json("pesos.json", function(data) {
              node = root = data;
              console.log(data);
              var nodes = treemap.nodes(root)
                  .filter(function(d) {return !d.children; });
            
              var cell = svg.selectAll("g")
                  .data(nodes)
                .enter().append("svg:g")
                  .attr("class", "cell")
                  .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
                  //.on("click", alert(node.value));
                  .on("click", function(d) { return zoom(node == d.parent ? root : d.parent); });
            
              cell.append("svg:rect")
                  .attr("width", function(d) { return d.dx - 1; })
                  .attr("height", function(d) { return d.dy - 1; })
                  .style("fill", function(d) {return color(d.parent.name ); });
            
              cell.append("svg:text")
                  .attr("x", function(d) { return d.dx / 2; })
                  .attr("y", function(d) { return d.dy / 2; })
                  .attr("dy", ".35em")
                  .attr("text-anchor", "middle")
                  /* .text(function(d) { return (d.name + " Estudiantes: " + d.total); }) */
                  .text(function(d) { return (d.name ); })
            
                  .style("opacity", function(d) { d.w = this.getComputedTextLength(); return d.dx > d.w ? 1 : 0; });
            
              d3.select(window).on("click", function() { zoom(root); });
              //d3.select(window).on("click", alert(this));
            
                  actual = this.value;
            
              d3.select("select").on("change", function() {
                //treemap.value(this.value == "size" ? size : count).nodes(root);
                treemap.value((this.value == "total") ? total : (this.value == "docentes") ? docentes : (this.value == "primer") ? primer : graduados).nodes(root);
                zoom(node,act);
            
             
            
              });
            ;
            
            function docentes(d) {
              return d.docentes;
            }
            
            function total(d) {
              return d.total;
            }
            
            function primer(d) {
              return d.primer;
            }
            
            function graduados(d) {
              return d.graduados;
            }
            
            function cash(d) {
              return d.cash;
            }
            
            function count(d) {
              return 1;
            }
            
            function zoom(d,act) {
              var kx = w / d.dx, ky = h / d.dy;
              x.domain([d.x, d.x + d.dx]);
              y.domain([d.y, d.y + d.dy]);
            
              actual = act;
            
              var t = svg.selectAll("g.cell").transition()
                  .duration(d3.event.altKey ? 7500 : 750)
                  .attr("transform", function(d) { return "translate(" + x(d.x) + "," + y(d.y) + ")"; });
            
              t.select("rect")
                  .attr("width", function(d) { return kx * d.dx - 1; })
                  .attr("height", function(d) { return ky * d.dy - 1; })
            
              t.select("text")
                  .attr("x", function(d) { return kx * d.dx / 2; })
                  .attr("y", function(d) { return ky * d.dy / 2; })
                  .style("opacity", function(d) { return kx * d.dx > d.w ? 1 : 0; })
                  /*.text(function (d){
                        return 
                    (actual == "total" ) ? (d.name + " Estudiantes: " + d.total) 
                            : (actual == "primer" ) ? (d.name + " Primer Semestre: " + d.primer) 
                            : (actual == "docentes" ) ? (d.name + " Docentes de la carrera: " + d.docentes)
                            : (d.name + " Graduados: " + d.graduados);
                          })*/
                  ;
                  
            
              node = d;
              d3.event.stopPropagation();
              console.log(d.name);
              carrera = d.name;

              $scope.docentes = d.children[0].docentes;
              $scope.primer = d.children[0].primer;
              $scope.graduados = d.children[0].graduados;
              $scope.RTotal =d.children[0].total;
  

              if (carrera == "Comex")
                {
                    $scope.changeBullet("C");
                    $scope.changeSpeed("C");
                    $scope.changeTotal("C");
                    $scope.tcarrera = "comex";
                }
                
              else
                if (carrera == "Marketing")
                    {
                    $scope.changeBullet("M");
                    $scope.changeSpeed("M");
                    $scope.changeTotal("M");
                    $scope.tcarrera = "marketing";
                }
                else
                    if (carrera == "Finanzas")
                        {
                    $scope.changeBullet("F");
                    $scope.changeSpeed("F");
                    $scope.changeTotal("F");
                    $scope.tcarrera = "finanzas";
                }
                else
                    if (carrera == "Empresas")
                        {
                    $scope.changeBullet("E");
                    $scope.changeSpeed("E");
                    $scope.changeTotal("E");
                    $scope.tcarrera = "empresas";
                }
              //(carrera == "Comex")?$scope.changeBullet("C"):$scope.changeBullet("M");
            }


                  } 
            // ==========================   fin TreeMAP

            // ========================== INICIO SPEED      

            var gauge = function(container, configuration) {
                        var that = {};
                        var config = {
                            size						: 100,
                            clipWidth					: 100,
                            clipHeight					: 90,
                            ringInset					: 20,
                            ringWidth					: 20,
                            
                            pointerWidth				: 10,
                            pointerTailLength			: 5,
                            pointerHeadLengthPercent	: 0.9,
                            
                            minValue					: 0,
                            maxValue					: 100,
                            
                            minAngle					: -90,
                            maxAngle					: 90,
                            
                            transitionMs				: 750,
                            
                            majorTicks					: 5,
                            labelFormat					: d3.format(',g'),
                            labelInset					: 10,
                            
                            arcColorFn					: d3.interpolateHsl(d3.rgb('#e8e2ca'), d3.rgb('#3e6c0a'))
                        };
                        var range = undefined;
                        var r = undefined;
                        var pointerHeadLength = undefined;
                        var value = 0;
                        
                        var svg = undefined;
                        var arc = undefined;
                        var scale = undefined;
                        var ticks = undefined;
                        var tickData = undefined;
                        var pointer = undefined;

                        var donut = d3.layout.pie();
                        
                        function deg2rad(deg) {
                            return deg * Math.PI / 180;
                        }
                        
                        function newAngle(d) {
                            var ratio = scale(d);
                            var newAngle = config.minAngle + (ratio * range);
                            return newAngle;
                        }
                        
                        function configure(configuration) {
                            var prop = undefined;
                            for ( prop in configuration ) {
                                config[prop] = configuration[prop];
                            }
                            
                            range = config.maxAngle - config.minAngle;
                            r = config.size / 2;
                            pointerHeadLength = Math.round(r * config.pointerHeadLengthPercent);

                            // a linear scale that maps domain values to a percent from 0..1
                            scale = d3.scale.linear()
                                .range([0,1])
                                .domain([config.minValue, config.maxValue]);  //.domain([config.minValue, config.maxValue]);------------------------------>>> ESCALA GAUGE
                                
                            ticks = scale.ticks(config.majorTicks);
                            tickData = d3.range(config.majorTicks).map(function() {return 1/config.majorTicks;});
                            
                            arc = d3.svg.arc()
                                .innerRadius(r - config.ringWidth - config.ringInset)
                                .outerRadius(r - config.ringInset)
                                .startAngle(function(d, i) {
                                    var ratio = d * i;
                                    return deg2rad(config.minAngle + (ratio * range));
                                })
                                .endAngle(function(d, i) {
                                    var ratio = d * (i+1);
                                    return deg2rad(config.minAngle + (ratio * range));
                                });
                        }
                        that.configure = configure;
                        
                        function centerTranslation() {
                            return 'translate('+r +','+ r +')';
                        }
                        
                        function isRendered() {
                            return (svg !== undefined);
                        }
                        that.isRendered = isRendered;
                        
                        function render(newValue) {
                            svg = d3.select(container)
                                .append('svg:svg')
                                    .attr('class', 'gauge')
                                    .attr('width', config.clipWidth)
                                    .attr('height', config.clipHeight);
                            
                            var centerTx = centerTranslation();
                            
                            var arcs = svg.append('g')
                                    .attr('class', 'arc')
                                    .attr('transform', centerTx);
                            
                            arcs.selectAll('path')
                                    .data(tickData)
                                .enter().append('path')
                                    .attr('fill', function(d, i) {
                                        return config.arcColorFn(d * i);
                                    })
                                    .attr('d', arc);
                            
                            var lg = svg.append('g')
                                    .attr('class', 'label')
                                    .attr('transform', centerTx);
                            lg.selectAll('text')
                                    .data(ticks)
                                .enter().append('text')
                                    .attr('transform', function(d) {
                                        var ratio = scale(d);
                                        var newAngle = config.minAngle + (ratio * range);
                                        return 'rotate(' +newAngle +') translate(0,' +(config.labelInset - r) +')';
                                    })
                                    .text(config.labelFormat);

                            var lineData = [ [config.pointerWidth / 2, 0], 
                                            [0, -pointerHeadLength],
                                            [-(config.pointerWidth / 2), 0],
                                            [0, config.pointerTailLength],
                                            [config.pointerWidth / 2, 0] ];
                            var pointerLine = d3.svg.line().interpolate('monotone');
                            var pg = svg.append('g').data([lineData])
                                    .attr('class', 'pointer')
                                    .attr('transform', centerTx);
                                    
                            pointer = pg.append('path')
                                .attr('d', pointerLine/*function(d) { return pointerLine(d) +'Z';}*/ )
                                .attr('transform', 'rotate(' +config.minAngle +')');
                                
                            update(newValue === undefined ? 0 : newValue);
                        }
                        that.render = render;
                        
                        function update(newValue, newConfiguration) {
                            if ( newConfiguration  !== undefined) {
                                configure(newConfiguration);
                            }
                            var ratio = scale(newValue);
                            var newAngle = config.minAngle + (ratio * range);
                            pointer.transition()
                                .duration(config.transitionMs)
                                .ease('elastic')
                                .attr('transform', 'rotate(' +newAngle +')');
                        }
                        that.update = update;

                        configure(configuration);
                        
                        return that;
                    };      


             var powerGauge = gauge('#power-gauge', {
                            size: 120,
                            clipWidth: 120,
                            clipHeight: 75,
                            ringWidth: 20,
                            maxValue: 100,
                            transitionMs: 4000,
                        });

            var powerGauge2 = gauge('#power-gauge2', {
                size: 120,
                clipWidth: 120,
                clipHeight: 75,
                ringWidth: 20,
                maxValue: 100,
                transitionMs: 4000,
            });
            var powerGauge3 = gauge('#power-gauge3', {
                size: 120,
                clipWidth: 120,
                clipHeight: 75,
                ringWidth: 20,
                maxValue: 100,
                transitionMs: 4000,
            });

            var powerGauge4 = gauge('#power-gauge4', {
                size: 120,
                clipWidth: 120,
                clipHeight: 75,
                ringWidth: 20,
                maxValue: 100,
                transitionMs: 4000,
            });

            var powerGauge5 = gauge('#power-gauge5', {
                size: 120,
                clipWidth: 120,
                clipHeight: 75,
                ringWidth: 20,
                maxValue: 100,
                transitionMs: 4000,
            });       


            $scope.initSpeed = function(data) 
            {
                
                    
                //=========================  2

                    
                        
                         
                        powerGauge.render();
                        powerGauge2.render();
                        powerGauge3.render();
                        powerGauge4.render();
                        powerGauge5.render();
                         
                        function updateReadings() {
                            // just pump in random data here...



                            var datos = [];
                        data.forEach(function(element) {
                            if (element.carrera == $scope.tcarrera)
                                datos.push(element);
                        }, this);


                            powerGauge.update(datos[0].pertinencia);
                            powerGauge2.update(datos[1].academia);
                            powerGauge3.update(datos[2].curricular);
                            powerGauge4.update(datos[3].ambiente);
                            powerGauge5.update(datos[4].estudiantes);
                        }
                        
                        // every few seconds update reading values
                        updateReadings();
                        setInterval(function() {
                            updateReadings();
                        }, 5 * 1000);
                    
                        // ================================= Redibujar
                
                    


                //=========================  2

            }


                    $scope.restSpeed = function(data)
                    {
                        var datos = [];
                        data.forEach(function(element) {
                            if (element.carrera == $scope.tcarrera)
                                datos.push(element);
                        }, this);
   
                            function updateSpeeds(){
                            powerGauge.update(datos[0].pertinencia);
                            powerGauge2.update(datos[1].academia);
                            powerGauge3.update(datos[2].curricular);
                            powerGauge4.update(datos[3].ambiente);
                            powerGauge5.update(datos[4].estudiantes);
                        
                            }
                        updateSpeeds();
   
                        }
            // ========================== FIN SPEED
            

            //============================ INICIO TEXT TOTAL =========================

            $scope.initTotal = function(data) 
            {
                
                    
                


                        var datos = [];
                        data.forEach(function(element) {
                            if (element.carrera == $scope.tcarrera)
                                datos.push(element);
                        }, this);

                            $scope.total = datos[0].total;
                            
                           
                        }
                        
                        

            


                    $scope.restTotal = function(data)
                    {
                        var datos = [];
                        data.forEach(function(element) {
                            if (element.carrera == $scope.tcarrera)
                                datos.push(element);
                        }, this);

                            $scope.total = datos[0].total;
                            
                           
                        }
                        
 



            //============================ FIN TEXT TOTAL =========================


               //============================ INICIO funcion =========================

              /*  $scope.inittfuncion = function(data) 
               {
                   
                                        
                                    // Set the dimensions of the canvas / graph
                    var margin = {top: 30, right: 15, bottom: 30, left: 24},
                    width = 150 - margin.left - margin.right,
                    height = 110 - margin.top - margin.bottom;

                    // Parse the date / time
                    var parseDate = d3.time.format("%d-%b-%y").parse;

                    // Set the ranges
                    var x = d3.scale.linear().range([0, width]);
                    var y = d3.scale.linear().range([height, 0]);

                    // Define the axes
                    var xAxis = d3.svg.axis().scale(x)
                    .orient("bottom").ticks(5);

                    var yAxis = d3.svg.axis().scale(y)
                    .orient("left").ticks(5);

                    // Define the line
                    var valueline = d3.svg.line()
                    .x(function(d) { return x(d.x); })
                    .y(function(d) { return y(d.y); });

                    // Adds the svg canvas
                    var svg = d3.select("#f3")
                        .append("svg")
                        .attr("width", width + margin.left + margin.right)
                        .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                        .attr("transform", 
                            "translate(" + margin.left + "," + margin.top + ")");


                    //====================================================== NUEVA POBLACION DE DATOS
   
   
                    data.forEach(function(d) {
                        d.x = d.x;
                        d.y = +d.y;
                    });
                
                    // Scale the range of the data
                    x.domain(d3.extent(data, function(d) { return d.x; }));
                    y.domain([0, d3.max(data, function(d) { return d.y; })]);
                
                    // Add the valueline path.
                    svg.append("path")
                        .attr("class", "line")
                        .attr("d", valueline(data));
                
                    svg.append("circle")
                    .attr("cx",100)
                    .attr("cy",35.44)
                    .attr("r",3);
                
                    // Add the X Axis
                    svg.append("g")
                        .attr("class", "x axis")
                        .attr("transform", "translate(0," + height + ")")
                        .call(xAxis);
                
                    // Add the Y Axis
                    svg.append("g")
                        .attr("class", "y axis")
                        .call(yAxis);
                               
                              
                   }
                           
 
                    $scope.resttfuncion = function(data)
                    {
                           var datos = [];
                           data.forEach(function(element) {
                               if (element.carrera == $scope.tcarrera)
                                   datos.push(element);
                           }, this);
   
                               $scope.total = "DESDE FUNCION";
                               
                              
                     }
 */
   
               //============================ FIN funcion =========================
   



        }])

})();