'use strict';
$(document).ready(function() {
    $(document).ready(function() {
        areaChart();
    });
    /*Area chart*/
    function areaChart() {

        window.lineChart = Morris.Line({
            element: 'task-status',
            data: [
                { y: '2006', a: 30, b: 10 },
                { y: '2007', a: 28, b: 60 },
                { y: '2008', a: 25, b: 20 },
                { y: '2009', a: 29, b: 50 },
                { y: '2010', a: 35, b: 22 },
                { y: '2011', a: 45, b: 70 },
                { y: '2012', a: 32, b: 26 },
                { y: '2013', a: 19, b: 75 },
                { y: '2014', a: 22, b: 35 },
                { y: '2015', a: 40, b: 65 },
                { y: '2016', a: 25, b: 10 }
            ],
            xkey: 'y',
            redraw: true,
            ykeys: ['a', 'b'],
            hideHover: 'auto',
            labels: ['Series A', 'Series B'],
            lineColors: ['#f1c40f', '#239a55']
        });
    };

    var chart = c3.generate({
        bindto: '#chart',
        color: {
        pattern: ['#239a55', '#0073aa', '#f1c40f']
    },
        data: {
            columns: [
                ["setosa", 0.2, 0.2, 0.2, 0.2, 0.2, 0.4, 0.3, 0.2, 0.2, 0.1, 0.2, 0.2, 0.1, 0.1, 0.2, 0.4, 0.4, 0.3, 0.3, 0.3, 0.2, 0.4, 0.2, 0.5, 0.2, 0.2, 0.4, 0.2, 0.2, 0.2, 0.2, 0.4, 0.1, 0.2, 0.2, 0.2, 0.2, 0.1, 0.2, 0.2, 0.3, 0.3, 0.2, 0.6, 0.4, 0.3, 0.2, 0.2, 0.2, 0.2],
                ["versicolor", 1.4, 1.5, 1.5, 1.3, 1.5, 1.3, 1.6, 1.0, 1.3, 1.4, 1.0, 1.5, 1.0, 1.4, 1.3, 1.4, 1.5, 1.0, 1.5, 1.1, 1.8, 1.3, 1.5, 1.2, 1.3, 1.4, 1.4, 1.7, 1.5, 1.0, 1.1, 1.0, 1.2, 1.6, 1.5, 1.6, 1.5, 1.3, 1.3, 1.3, 1.2, 1.4, 1.2, 1.0, 1.3, 1.2, 1.3, 1.3, 1.1, 1.3],
                ["virginica", 2.5, 1.9, 2.1, 1.8, 2.2, 2.1, 1.7, 1.8, 1.8, 2.5, 2.0, 1.9, 2.1, 2.0, 2.4, 2.3, 1.8, 2.2, 2.3, 1.5, 2.3, 2.0, 2.0, 1.8, 2.1, 1.8, 1.8, 1.8, 2.1, 1.6, 1.9, 2.0, 2.2, 1.5, 1.4, 2.3, 2.4, 1.8, 1.8, 2.1, 2.4, 2.3, 1.9, 2.3, 2.5, 2.3, 1.9, 2.0, 2.3, 1.8],
            ],
            type : 'donut',
            onclick: function (d, i) { console.log("onclick", d, i); },
            onmouseover: function (d, i) { console.log("onmouseover", d, i); },
            onmouseout: function (d, i) { console.log("onmouseout", d, i); }
        },
        donut: {
            title: "Minute Spent"
        }
    });

    /*Pie Chart*/

    var chart = c3.generate({
        bindto: '#transection',
        data: {
            // iris data from R
            columns: [
                ['Done', 150],
                ['Due', 180],
                ['Hold', 60]
            ],
            type: 'pie',
            onclick: function(d, i) { console.log("onclick", d, i); },
            onmouseover: function(d, i) { console.log("onmouseover", d, i); },
            onmouseout: function(d, i) { console.log("onmouseout", d, i); }
        },
        color: {
            pattern: ['#239a55', '#0073aa', '#f1c40f']
        },
    });
});
