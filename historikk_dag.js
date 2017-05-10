var series;

var loopIt = function(data) {
    data.forEach(function(item) {
        /*
         var time = new Date(Number(item) * 1000);
         console.log(time);
         */
        console.log(item);
    });
};

var doIt = function() {
    var url = 'http://weather.molde.vgs.no/api/day/hour_average/';
    var url_naa = 'http://weather.molde.vgs.no/api/day/';
    var req_naa = new XMLHttpRequest();

    var req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var data = JSON.parse(this.responseText);


            series = [{
                'name': 'Temperatur',
                'data': data['outTemp'].map(Number)

            }, {
                'name': 'Trykk',
                yAxis: 1,
                'data': data['barometer'].map(Number)

            }];

            Highcharts.chart('container', {
                chart: {
                    type: 'line'
                },
                title: {
                    text: 'Siste 24 timer'
                },
                subtitle: {
                    text: ''
                },
                xAxis: {
                    categories: []
                },
                yAxis: [{
                    title: {
                        text: 'Temperature (°C)'
                    }
                }, { // Secondary yAxis
                    title: {
                        text: 'Trykk (hPa)',
                        style: {
                            color: Highcharts.getOptions().colors[0]
                        }
                    },
                    labels: {
                        format: '{value} ',
                        style: {
                            color: Highcharts.getOptions().colors[0]
                        }
                    },
                    opposite: true
                }],
                plotOptions: {
                    line: {
                        dataLabels: {
                            enabled: false
                        },
                        enableMouseTracking: true
                    }
                },
                series: series
            });
        }
    };
    req.open("GET", url, true);
    req.send();


};

doIt();


