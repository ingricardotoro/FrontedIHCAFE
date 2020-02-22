'use strict';
$(document).ready(function() {
    // Calender js
    $(function() {
        $('.widget-calender').pignoseCalendar();
    });

    function myStopFunction() {
        clearInterval(myVar);
    }
    $(".dial").knob({
        draw: function() {
            // "tron" case
            if (this.$.data('skin') == 'tron') {
                this.cursorExt = 0.3;
                var a = this.arc(this.cv) // Arc
                    ,
                    pa // Previous arc
                    , r = 1;
                this.g.lineWidth = this.lineWidth;
                if (this.o.displayPrevious) {
                    pa = this.arc(this.v);
                    this.g.beginPath();
                    this.g.strokeStyle = this.pColor;
                    this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, pa.s, pa.e, pa.d);
                    this.g.stroke();
                }
                this.g.beginPath();
                this.g.strokeStyle = r ? this.o.fgColor : this.fgColor;
                this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, a.s, a.e, a.d);
                this.g.stroke();
                this.g.lineWidth = 2;
                this.g.beginPath();
                this.g.strokeStyle = this.o.fgColor;
                this.g.arc(this.xy, this.xy, this.radius - this.lineWidth + 1 + this.lineWidth * 2 / 3, 0, 2 * Math.PI, false);
                this.g.stroke();
                return false;
            }
        }
    });

    $(document).ready(function() {
        areaChart();
    });
    /*Area chart*/
    function areaChart() {
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
        // Morris bar chart
        Morris.Bar({
            element: 'analythics-graph',
            barSizeRatio:0.25,
            data: [{
                y: '2006',
                a: 30
            }, {
                y: '2007',
                a: 40
            }, {
                y: '2008',
                a: 55
            }, {
                y: '2009',
                a: 75
            }, {
                y: '2010',
                a: 50
            }, {
                y: '2011',
                a: 42
            }, {
                y: '2012',
                a: 32
            }],
            xkey: 'y',
            lineWidth:'10px',
            ykeys: ['a'],
            labels: ['A'],
            barColors: ['#5D9CEC'],
            hideHover: 'auto',
            gridLineColor: '#ddd',
            resize: true
        });
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
    //  Visitors bar
    $(".resource-barchart").sparkline([5, 6, 2, 4, 9, 1, 8, 3, 6, 4, 2, 5], {
        type: 'bar',
        barWidth: '8px',
        height: '50px',
        barColor: '#239a55',
        tooltipClassname: 'abc'
    });
    /*custom line chart*/
    $(".customchart").sparkline([15, 30, 27, 35, 50, 71, 60], {
        type: 'line',
        width: '100%',
        height: '300px',
        tooltipClassname: 'chart-sparkline',
        chartRangeMax: '50',
        lineColor: '#0073aa',
        fillColor: 'rgba(0, 115, 170, 0.5)'
    });

    $(".customchart").sparkline([0, 25, 10, 7, 25, 35, 30], {
        type: 'line',
        width: '100%',
        height: '300px',
        composite: '!0',
        tooltipClassname: 'chart-sparkline',
        chartRangeMax: '40',
        lineColor: '#239a55',
        fillColor: 'rgba(35, 154, 85, .5)'
    });
    /*Pie*/
    $(".visitor-chart").sparkline([1, 2], {
        type: 'pie',
        width: '100px',
        height: '65px',
        sliceColors: ['#ccc', '#0073aa'],
        tooltipClassname: 'chart-sparkline'
    });
    /*custom line chart*/
    $(".sale-chart").sparkline([0, 6, 3, 10, 8, 3, 6, 15, 3, 14, 2, 9, 12, 0], {
        type: 'line',
        width: '100%',
        height: '65px',
        tooltipClassname: 'chart-sparkline',
        chartRangeMax: '50',
        lineColor: '#ccc',
        fillColor: '#ccc'
    });

    $(".sale-chart").sparkline([0, 6, 3, 10, 8, 3, 6, 15, 3, 0, 0, 0, 0, 0], {
        type: 'line',
        width: '100%',
        height: '65px',
        composite: '!0',
        tooltipClassname: 'chart-sparkline',
        chartRangeMax: '40',
        lineColor: '#fcd43d',
        fillColor: '#fcd43d'
    });
    /* Tristate chart */
    $(window).resize(function() {
        //  Resource bar
        $(".resource-barchart1").sparkline([5, 6, 3, 4, 7, 4, 8, 3, 6], {
            type: 'bar',
            barWidth: '12px',
            height: '70px',
            barColor: '#04e0b4',
            tooltipClassname: 'abc'
        });
        $(".resource-barchart2").sparkline([5, 6, 3, 4, 7, 4, 8, 3, 6], {
            type: 'bar',
            barWidth: '12px',
            height: '70px',
            barColor: '#fcd43d',
            tooltipClassname: 'abc'
        });
        $(".resource-barchart3").sparkline([5, 6, 3, 4, 7, 4, 8, 3, 6], {
            type: 'bar',
            barWidth: '12px',
            height: '70px',
            barColor: '#0393d8',
            tooltipClassname: 'abc'
        });
        //  Visitors bar
        $(".resource-barchart").sparkline([5, 6, 2, 4, 9, 1, 8, 3, 6, 4, 2, 5], {
            type: 'bar',
            barWidth: '8px',
            height: '50px',
            barColor: '#239a55',
            tooltipClassname: 'abc'
        });
        /*custom line chart*/
        $(".customchart").sparkline([15, 30, 27, 35, 50, 71, 60], {
            type: 'line',
            width: '100%',
            height: '300px',
            tooltipClassname: 'chart-sparkline',
            chartRangeMax: '50',
            lineColor: '#0073aa',
            fillColor: 'rgba(0, 115, 170, 0.5)'
        });

        $(".customchart").sparkline([0, 25, 10, 7, 25, 35, 30], {
            type: 'line',
            width: '100%',
            height: '300px',
            composite: '!0',
            tooltipClassname: 'chart-sparkline',
            chartRangeMax: '40',
            lineColor: '#239a55',
            fillColor: 'rgba(35, 154, 85, .5)'
        });
        /*Pie*/
        $(".visitor-chart").sparkline([1, 2], {
            type: 'pie',
            width: '100px',
            height: '65px',
            sliceColors: ['#ccc', '#0073aa'],
            tooltipClassname: 'chart-sparkline'
        });
        /*custom line chart*/
        $(".sale-chart").sparkline([0, 6, 3, 10, 8, 3, 6, 15, 3, 14, 2, 9, 12, 0], {
            type: 'line',
            width: '100%',
            height: '65px',
            tooltipClassname: 'chart-sparkline',
            chartRangeMax: '50',
            lineColor: '#ccc',
            fillColor: '#ccc'
        });

        $(".sale-chart").sparkline([0, 6, 3, 10, 8, 3, 6, 15, 3, 0, 0, 0, 0, 0], {
            type: 'line',
            width: '100%',
            height: '65px',
            composite: '!0',
            tooltipClassname: 'chart-sparkline',
            chartRangeMax: '40',
            lineColor: '#fcd43d',
            fillColor: '#fcd43d'
        });
    });

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
