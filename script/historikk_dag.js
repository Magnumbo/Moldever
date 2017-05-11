$.getJSON('http://weather.molde.vgs.no/api/day/', function (data) {

    console.log(data);

    series = [{
        name: 'Temperatur',
        data: data['outTemp'].map(Number),
        type: 'spline',
        marker: {
            enabled: false,
            states: {
                hover: {
                    enabled: true
                }
            }
        },
        tooltip: {
            valueSuffix: '°C'
        },
        zIndex: 1//,
       // color: '#FF3333',
        //negativeColor: '#48AFE8'
    },{
        name: 'Nedbør',
        data:  data['rain'].map(Number),
        type: 'column',
        color: '#68CFE8',
        yAxis: 1,
        groupPadding: 0,
        pointPadding: 0,
        borderWidth: 0,
        shadow: false,
        dataLabels: {
            enabled: true,
            formatter: function () {
                if (this.y > 0) {
                    return this.y;
                }
            },
            style: {
                fontSize: '8px'
            }
        },
        tooltip: {
            valueSuffix: 'mm'
        }
    },{
        name: 'Lufttrykk',
        color: Highcharts.getOptions().colors[2],
        data: data['barometer'].map(Number),
        marker: {
            enabled: false
        },
        shadow: false,
        tooltip: {
            valueSuffix: ' hPa'
        },
        dashStyle: 'shortdot',
        yAxis:2
    },{
        name: 'UV',
        data: data['UV'].map(Number),
        type: 'spline',
        marker: {
            enabled: false,
            states: {
                hover: {
                    enabled: true
                }
            }
        },
        tooltip: {
            valueSuffix: ''
        },
        dashStyle: 'shortdot',
        zIndex: 1,
        // color: '#FF3333',
        //negativeColor: '#48AFE8'
        yAxis:3
    }];

    Highcharts.chart('historikk', {
        chart: {
            marginBottom: 70,
            marginRight: 40,
            marginTop: 50,
            plotBorderWidth: 1,
            height: 310
        },
        title: {
            text: 'Siste 24 timer'
        },
        tooltip: {
            shared: true
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: []
        },
        yAxis: [{ // temperature axis
            title: {
                text: null
            },
            labels: {
                format: '{value}°',
                style: {
                    fontSize: '10px'
                },
                x: -3
            },
            plotLines: [{ // zero plane
                value: 0,
                color: '#BBBBBB',
                width: 1,
                zIndex: 2
            }],
            // Custom positioner to provide even temperature ticks from top down
            tickPositioner: function () {
                var max = Math.ceil(this.max) + 1,
                    pos = max - 12, // start
                    ret;

                if (pos < this.min) {
                    ret = [];
                    while (pos <= max) {
                        ret.push(pos += 1);
                    }
                } // else return undefined and go auto

                return ret;

            },
            maxPadding: 0.3,
            tickInterval: 1,
            gridLineColor: (Highcharts.theme && Highcharts.theme.background2) || '#F0F0F0'

        }, { // precipitation axis
            title: {
                text: null
            },
            labels: {
                enabled: false
            },
            gridLineWidth: 0,
            tickLength: 0

        }, { // Air pressure
            allowDecimals: false,
            title: { // Title on top of axis
                text: 'hPa',
                offset: 0,
                align: 'high',
                rotation: 0,
                style: {
                    fontSize: '10px',
                    color: Highcharts.getOptions().colors[2]
                },
                textAlign: 'left',
                x: 3
            },
            labels: {
                style: {
                    fontSize: '8px',
                    color: Highcharts.getOptions().colors[2]
                },
                y: 2,
                x: 3
            },
            gridLineWidth: 0,
            opposite: true,
            showLastLabel: false
        },
            { // Sol
                labels: {
                    format: '{value}',
                    style: {
                    }
                },
                title: {
                    text: 'UV',
                    style: {
                    }
                },
                opposite: true
            }

        ],

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
});

