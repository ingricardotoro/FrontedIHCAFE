'use strict';
$(document).ready(function() {
    // Calender js
    $(function() {
        $('.widget-calender').pignoseCalendar();
    });


    $(document).ready(function() {
        areaChart();
    });

    /*Area chart*/
    function areaChart() {
        window.areaChart = Morris.Area({
            element: 'last-activity',
            data: [{
                y: '2006',
                a: 10
            },
            {
                y: '2007',
                a: 65
            },
            {
                y: '2008',
                a: 25
            },
            {
                y: '2009',
                a: 25
            },
            {
                y: '2010',
                a: 60
            },
            {
                y: '2011',
                a: 20
            },
            ],
            xkey: 'y',
            resize: true,
            hideHover: true,
            redraw: true,
            ykeys: ['a'],
            labels: ['Series A'],
            lineColors: ['#0073aa ']
        });
        window.areaChart = Morris.Area({
            element: 'turnoverareachart',
            data: [{
                y: '2006',
                a: 10
            },
            {
                y: '2007',
                a: 15
            },
            {
                y: '2008',
                a: 10
            },
            {
                y: '2009',
                a: 35
            },
            {
                y: '2010',
                a: 20
            },
            {
                y: '2011',
                a: 32
            },
            ],
            xkey: 'y',
            resize: true,
            axes: false,
            padding: 0,
            hideHover: true,
            grid: false,
            smooth: false,
            redraw: true,
            ykeys: ['a'],
            labels: ['Series A'],
            lineColors: ['#0073aa ']
        });
    }

    // new js

    $("#week-status-chart-1").html('');
    var widchart = $("#week-status-chart-1").width();
    var state1 = new Rickshaw.Graph({
        element: document.getElementById("week-status-chart-1"),
        width: widchart,
        height: 75,
        renderer: 'line',
        series: [{
            color: "#f7e07f",
            data: [{
                x: 0,
                y: 20
            }, {
                x: 1,
                y: 24
            }, {
                x: 2,
                y: 50
            }, {
                x: 3,
                y: 10
            }, {
                x: 4,
                y: 60
            }],
            name: ''
        }]
    });
    state1.render();

    $("#week-status-chart-2").html('');
    var widchart = $("#week-status-chart-2").width();
    var state2 = new Rickshaw.Graph({
        element: document.getElementById("week-status-chart-2"),
        width: widchart,
        height: 75,
        renderer: 'line',
        series: [{
            color: "#71d5c2",
            data: [{
                x: 0,
                y: 20
            }, {
                x: 1,
                y: 24
            }, {
                x: 2,
                y: 50
            }, {
                x: 3,
                y: 10
            }, {
                x: 4,
                y: 60
            }],
            name: ''
        }]
    });
    state2.render();
        //  Resource bar
        $(".resource-barchart1").sparkline([5, 6, 3, 4, 7, 4, 2, 8, 3], {
            type: 'bar',
            barWidth: '12px',
            height: '70px',
            barColor: '#04e0b4',
            tooltipClassname: 'abc'
        });
        $(".resource-barchart2").sparkline([5, 6, 3, 4, 7, 4, 2, 8, 3], {
            type: 'bar',
            barWidth: '12px',
            height: '70px',
            barColor: '#fcd43d',
            tooltipClassname: 'abc'
        });
        $(".resource-barchart3").sparkline([5, 6, 3, 4, 7, 4, 2, 8, 3], {
            type: 'bar',
            barWidth: '12px',
            height: '70px',
            barColor: '#0393d8',
            tooltipClassname: 'abc'
        });

        /* Tristate chart */
        $(window).resize(function() {
            //  Resource bar
            $(".resource-barchart1").sparkline([5, 6, 3, 4, 7, 4, 2, 8, 3], {
                type: 'bar',
                barWidth: '12px',
                height: '70px',
                barColor: '#04e0b4',
                tooltipClassname: 'abc'
            });
            $(".resource-barchart2").sparkline([5, 6, 3, 4, 7, 4, 2, 8, 3], {
                type: 'bar',
                barWidth: '12px',
                height: '70px',
                barColor: '#fcd43d',
                tooltipClassname: 'abc'
            });
            $(".resource-barchart3").sparkline([5, 6, 3, 4, 7, 4, 2, 8, 3], {
                type: 'bar',
                barWidth: '12px',
                height: '70px',
                barColor: '#0393d8',
                tooltipClassname: 'abc'
            });
        });

        var chart = c3.generate({
            bindto: '#proj',
            color: {
                pattern: ['#239a55', '#0073aa', '#f1c40f']
            },
            data: {
                columns: [
                ["Project Progress", 0.2, 0.2, 0.2, 0.2, 0.2, 0.4, 0.3, 0.2, 0.2, 0.1, 0.2, 0.2, 0.1, 0.1, 0.2, 0.4, 0.4, 0.3, 0.3, 0.3, 0.2, 0.4, 0.2, 0.5, 0.2, 0.2, 0.4, 0.2, 0.2, 0.2, 0.2, 0.4, 0.1, 0.2, 0.2, 0.2, 0.2, 0.1, 0.2, 0.2, 0.3, 0.3, 0.2, 0.6, 0.4, 0.3, 0.2, 0.2, 0.2, 0.2],
                ["Project Returned", 1.4, 1.5, 1.5, 1.3, 1.5, 1.3, 1.6, 1.0, 1.3, 1.4, 1.0, 1.5, 1.0, 1.4, 1.3, 1.4, 1.5, 1.0, 1.5, 1.1, 1.8, 1.3, 1.5, 1.2, 1.3, 1.4, 1.4, 1.7, 1.5, 1.0, 1.1, 1.0, 1.2, 1.6, 1.5, 1.6, 1.5, 1.3, 1.3, 1.3, 1.2, 1.4, 1.2, 1.0, 1.3, 1.2, 1.3, 1.3, 1.1, 1.3],
                ["Project Sold", 2.5, 1.9, 2.1, 1.8, 2.2, 2.1, 1.7, 1.8, 1.8, 2.5, 2.0, 1.9, 2.1, 2.0, 2.4, 2.3, 1.8, 2.2, 2.3, 1.5, 2.3, 2.0, 2.0, 1.8, 2.1, 1.8, 1.8, 1.8, 2.1, 1.6, 1.9, 2.0, 2.2, 1.5, 1.4, 2.3, 2.4, 1.8, 1.8, 2.1, 2.4, 2.3, 1.9, 2.3, 2.5, 2.3, 1.9, 2.0, 2.3, 1.8],
                ],
                type : 'donut',
                onclick: function (d, i) { console.log("onclick", d, i); },
                onmouseover: function (d, i) { console.log("onmouseover", d, i); },
                onmouseout: function (d, i) { console.log("onmouseout", d, i); }
            },
            donut: {
                title: "Project Overview"
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
