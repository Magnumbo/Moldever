<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>

<script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
<script src="https://code.highcharts.com/stock/highstock.js"></script>
<script src="https://code.highcharts.com/stock/modules/exporting.js"></script>

<div id="container" style="height: 400px; min-width: 310px"></div>


<script>
    $.getJSON('http://weather.molde.vgs.no/api/month/1493501600', function (data) {
        // Create the chart
        var start = data['archive_day_ET']['dateTime'][0]*1000;
        var series = [{
            'name': 'max temp',
            'data': data['archive_day_outTemp']['max'].map(Number),
            'pointStart':  start,
            'pointInterval': 3600,
            'tooltip': {
                'valueDecimals': 1,
                'valueSuffix': '°F'
            }
        },
            {
                'name': 'min temp',
                'data': data['archive_day_outTemp']['min'].map(Number),
                'pointStart': start,
                'pointInterval': 3600,
                'tooltip': {
                    'valueDecimals': 1,
                    'valueSuffix': '°F'
                }
            }
        ];
        console.log(data);
        //var start = data['archive_day_ET'];
        Highcharts.stockChart('container', {
            rangeSelector: {
                buttons: [{
                    type: 'day',
                    count: 3,
                    text: '3d'
                }, {
                    type: 'week',
                    count: 1,
                    text: '1w'
                }, {
                    type: 'month',
                    count: 1,
                    text: '1m'
                }, {
                    type: 'month',
                    count: 6,
                    text: '6m'
                }, {
                    type: 'year',
                    count: 1,
                    text: '1y'
                }, {
                    type: 'all',
                    text: 'All'
                }],
                selected: 3
            },
            yAxis: {
                title: {
                    text: 'Temperature (°C)'
                }
            },
            title: {
                text: 'Molde'
            },
            subtitle: {
                text: 'Built chart in ...' // dummy text to reserve space for dynamic subtitle
            },
            series: series
        });
    });
</script>


</body>


</html>