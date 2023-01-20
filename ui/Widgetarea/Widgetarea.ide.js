TW.IDE.Widgets.Widgetarea = function () {
    // this.widgetIconUrl = function () {
    //     return "http://localhost:8015/Thingworx/Common/thingworx/widgets/mashup/mashup.ide.png";
    // };

    this.widgetProperties = function () {
        var properties = {
            name: "Widgetarea",
            description: "Widgetarea Chart",
            category: ["Common"],
            isExtension: true,
            supportsAutoResize: true,
            properties: {
                Widthbar: {
                    baseType: "NUMBER",
                    defaultValue: 460,
                },
                Heightbar: {
                    baseType: "NUMBER",
                    defaultValue: 200,
                },
                Paddingchart: {
                    baseType: "NUMBER",
                    defaultValue: 10,
                },
                TableData: {
                    baseType: "INFOTABLE",
                    isBindingTarget: true,
                },
                ShowLegend: {
                    baseType: "BOOLEAN",
                    defaultValue: true,
                },

                StartTime: {
                    baseType: "DATETIME",
                    isBindingTarget: true,
                    defaultValue: new Date("2022/06/12 00:00:00"),
                },
                EndTime: {
                    baseType: "DATETIME",
                    isBindingTarget: true,
                    defaultValue: new Date("2022/06/13 00:00:00"),
                },


                StyleTooltip: {
                    description: "Style for Tooltip",
                    baseType: "STYLEDEFINITION",
                    defaultValue: "DefaultTooltipStyle",
                },
                StyleYaxis: {
                    description: "Style for Y Axis",
                    baseType: "STYLEDEFINITION",
                    defaultValue: "DefaultTimePickerStyle",
                },
                StyleXaxis: {
                    description: "Style for X axis",
                    baseType: "STYLEDEFINITION",
                    defaultValue: "DefaultTimeDatePickerStyle",
                },
                StyleLegend: {
                    description: "Style for Legend",
                    baseType: "STYLEDEFINITION",
                    defaultValue: "DefaultTimeBGStyle",
                },
                Tickcountarea: {
                    baseType: "NUMBER",
                    defaultValue: 2,
                },
                ShowGrid: {
                    baseType: "BOOLEAN",
                    defaultValue: true,
                },
                IsleftLegend: {
                    baseType: "BOOLEAN",
                    defaultValue: true,
                },
                MinYaxis: {
                    baseType: "NUMBER",
                    defaultValue: 0,
                },
                MaxYaxis: {
                    baseType: "NUMBER",
                    defaultValue: 10,
                },
            },
        };

        return properties;
    };

    // The function is called before any property is updated in the ThingWorx Composer. You can perform validations on the new property value before it is committed. If the validation fails, you can return a message string to inform the user about the invalid input. The new property value is not be committed. If nothing is returned during the validation, then the value is assumed valid.
    //  this.beforeSetProperty = function (name, value) {
    //     // Validate Input Properties

    // };

    this.afterSetProperty = function (name, value) {
        this.updatedProperties();
        return true;
    };

    this.afterLoad = function () {};

    this.renderHtml = function () {
        return "<div class=widget-content widget-Widgetarea>" + "</div>";
    };

    // this.afterRender = function () {
    //     // NOTE: this.jqElement is the jquery reference to your html dom element
    //     // 		 that was returned in renderHtml()

    //     // get a reference to the value element
    //     valueElem = this.jqElement.find(".HelloWorld-property");
    //     // update that DOM element based on the property value that the user set
    //     // in the mashup bHelloWorldlder
    //     valueElem.text(this.getProperty("Name"));
    // };

    this.afterRender = function () {
        this.setupWidget();
    };

    this.setupWidget = function () {
        var widgetID = this.jqElementId;
        d3v4.select(`#${widgetID}`).selectAll("*").remove();
        // Handle Properties
        try {
            var allWidgetProps = this.allWidgetProperties().properties;

            var widgetProps = {};

            for (const [key, value] of Object.entries(allWidgetProps)) {
                if (key.includes("Style")) {
                    widgetProps[key] = TW.getStyleFromStyleDefinition(
                        this.getProperty(key)
                    );
                } else {
                    widgetProps[key] = this.getProperty(key);
                }
            }

            console.log("widgetProps idle area");
            console.log(widgetProps);
     
        } catch (error) {
            console.log(error);
        }

        var widthwindows = 460,
            heightwindowss = 200;

        var marginwindows = {
            top: 10,
            right: 10,
            bottom: 10,
            left: 10,
        };

        var varbooleanlegend = true;

        var startdate = new Date("2022-06-12T00:00:00.000Z");

        var varenddate = new Date("2022-06-13T00:00:00.000Z");

        var margin = {
                top: 0 + marginwindows.top,
                right: 0 + marginwindows.right,
                bottom: 40 + marginwindows.bottom,
                left: 30 + marginwindows.left,
            },
            width = widthwindows - margin.left - margin.right,
            height = heightwindowss - margin.top - margin.bottom;

        var makemy_dataviz_area = d3v4
            .select(`#${widgetID}`)
            .append("div")
            .attr("id", "my_dataviz_area")
            .style("width", width + (margin.left + margin.right) + "px")
            .style("height", height + (margin.top + margin.bottom) + "px");

   
            

        var tooltipdiv = d3v4
            .select("#my_dataviz_area")
            .append("div")
            .attr("id", "tooltip")
            .attr("class", "hidden");

        tooltipdiv.append("p").attr("id", "name");
        tooltipdiv.append("p").attr("id", "value");

        var svg = d3v4
            .select("#my_dataviz_area")
            .append("svg")
            // .attr('style', 'background-color:black')
            .attr("width", width + (margin.left + margin.right))
            .attr("height", height + (margin.top + margin.bottom))
            .append("g")
            .attr(
                "transform",
                "translate(" + margin.left + "," + margin.top + ")"
            );

        var secondcontainer = d3v4
            .select("#my_dataviz_area")
            .append("div")
            .attr("id", "secondcontainer")
            .attr("class", "secondcontainer")
            // .style("background-color", "#eaeaea")
            .style("display", "flex")
            .style("width", width + "px")
            // .style("height", 18 +"px")
            .style("flex-direction", "row-reverse")
            .style("margin-top", -18 + "px")
            .style("margin-left", margin.left + "px");

        //Read the data

        const dataarray = {
            rows: [
                {
                    options: {
                        rows: [
                            {
                                color: {
                                    rows: [
                                        {
                                            id: 1,
                                            value: "#e0ff00",
                                        },
                                        {
                                            id: 2,
                                            value: "#00ff00",
                                        },
                                    ],
                                },
                                type: {
                                    rows: [
                                        {
                                            id: 1,
                                            value: "example 1",
                                        },
                                        {
                                            id: 2,
                                            value: "example 2",
                                        },
                                    ],
                                },
                            },
                        ],
                    },
                    values: {
                        rows: [
                            {
                                date: "2022-06-12T07:00:00.000Z",
                                id: 1,
                                value: "10",
                            },
                      

                            {
                                date: "2022-06-13T07:00:00.000Z",
                                id: 1,
                                value: "10",
                            },
                            {
                                date: "2022-06-12T07:00:00.000Z",
                                id: 2,
                                value: "5",
                            },
                            {
                                date: "2022-06-13T08:00:00.000Z",
                                id: 2,
                                value: "5",
                            },
                        ],
                    },
                },
            ],
        };

        var optionscolor = dataarray.rows[0].options.rows[0].color.rows;

        var optionstype = dataarray.rows[0].options.rows[0].type.rows;

        // var valuesarray = dataarray.rows[0].values.rows;

        var valuesarray = [];

        var enddate = new Date(
            new Date(varenddate).getTime() + 60 * 60 * 24 * 1000
        );

        dataarray.rows[0].values.rows.forEach((data, i) => {
            if (new Date(data.date) <= new Date(enddate)) {
                valuesarray.push(data);
            }
        });

        valuesarray.sort(function (a, b) {
            return new Date(a.date) - new Date(b.date);
        });

        function makeformatdate(datereal) {
   
            const datenew = new Date(datereal);
        
            return (
                datenew.getFullYear() +
                "-" +
                (datenew.getMonth() < 10
                    ? "0" + (datenew.getMonth() +1)
                    : (datenew.getMonth() + 1)) +
                "-" +
                datenew.getDate()
            );
        }

        var arraydate = [];
        var arraynamedata = [];

        valuesarray.forEach((data, i) => {
            if (
                arraydate.findIndex(
                    (element) => element.date === makeformatdate(data.date)
                ) < 0
            ) {
                arraydate.push({
                    date: makeformatdate(data.date),
                    value: 0,
                });
            }

            if (
                arraynamedata.findIndex(
                    (element) =>
                        element.id === data.id &&
                        element.date === makeformatdate(data.date)
                ) < 0
            ) {
                const objectrow = {
                    date: makeformatdate(data.date),
                    id: data.id,
                    name: data.id,
                    color: data.id,
                    value: parseInt(data.value),
                    databar: [],
                };

                if (
                    optionscolor.findIndex(
                        (element) => element.id === data.id
                    ) >= 0
                ) {
                    objectrow.color =
                        optionscolor[
                            optionscolor.findIndex(
                                (element) => element.id === data.id
                            )
                        ].value;
                } else {
                    objectrow.color =
                        "#" + Math.floor(Math.random() * 16777215).toString(16);
                }

                if (
                    optionstype.findIndex(
                        (element) => element.id === data.id
                    ) >= 0
                ) {
                    objectrow.name =
                        optionstype[
                            optionstype.findIndex(
                                (element) => element.id === data.id
                            )
                        ].value;
                } else {
                    objectrow.name = "name-" + data.id;
                }

                arraynamedata.push(objectrow);
            } else {
                arraynamedata[
                    arraynamedata.findIndex(
                        (element) =>
                            element.id === data.id &&
                            element.date === makeformatdate(data.date)
                    )
                ].value += parseInt(data.value);
            }
        });
   

        // arraydate = arraydate.filter((item, index) => {
        //     return arraydate.indexOf(item) == index;
        // });

        arraynamedata.forEach((data, i) => {
            const temparraydate = JSON.parse(JSON.stringify(arraydate));
            arraynamedata[i].databar = temparraydate;
        });

        var newdatatable = [];
        arraynamedata.forEach((data, i) => {
            if (
                newdatatable.findIndex((element) => element.id === data.id) < 0
            ) {
                const temparraydate = JSON.parse(JSON.stringify(arraydate));
                const objnewdatatable = {
                    id: data.id,
                    name: data.name,
                    color: data.color,
                    value: parseInt(data.value),
                    databar: temparraydate,
                };

                objnewdatatable.databar[
                    arraydate.findIndex((element) => element.date === data.date)
                ].value = data.value;
                newdatatable.push(objnewdatatable);
            } else {
                newdatatable[
                    newdatatable.findIndex((element) => element.id === data.id)
                ].databar[
                    arraydate.findIndex((element) => element.date === data.date)
                ].value = data.value;
            }
        });

    

        const datatable = newdatatable;

        // const datatable = [
        //     {
        //         name: "Agregate",
        //         color: "#e0ff00",
        //         databar: [
        //             {
        //                 date: "2013-04-28",
        //                 value: 60,
        //             },
        //             {
        //                 date: "2013-04-29",
        //                 value: 35,
        //             },
        //             {
        //                 date: "2013-04-30",
        //                 value: 70,
        //             },
        //             {
        //                 date: "2013-04-31",
        //                 value: 30,
        //             },
        //             {
        //                 date: "2013-05-1",
        //                 value: 20,
        //             },
        //         ],
        //     },

        //     {
        //         name: "Actual",
        //         color: "#00ff00",
        //         databar: [
        //             {
        //                 date: "2013-04-28",
        //                 value: 6,
        //             },
        //             {
        //                 date: "2013-04-29",
        //                 value: 5,
        //             },
        //             {
        //                 date: "2013-04-30",
        //                 value: 13,
        //             },
        //             {
        //                 date: "2013-04-31",
        //                 value: 52,
        //             },
        //             {
        //                 date: "2013-05-1",
        //                 value: 10,
        //             },
        //         ],
        //     },
        // ];

        function olahdata(data) {
            const datatablenew = [];
            data.concat(data).forEach((element, i) => {
                if (i === 0) {
                    datatablenew.push({
                        date: i,
                        value: 0,
                    });
                } else {
                    if (i % 2 !== 0) {
                        datatablenew.push({
                            date: i,
                            value: data[(i - 1) / 2].value,
                        });
                    } else {
                        datatablenew.push({
                            date: i,
                            value:
                                (data[i / 2].value + data[i / 2 - 1].value) / 2,
                        });
                    }
                }
            });

            return datatablenew;
        }

        function newaxisdata(data) {
            const result = [];
            const increase = Math.floor(data.length / tickcount);

            for (var i = 0; i < tickcount; i++) {
                if (i === 0) {
                    result.push(data[i]);
                } else if (i === tickcount - 1) {
                    result.push(data[data.length - 1]);
                } else {
                    result.push(data[i * increase]);
                }
            }

            return result;
        }

        const tickcount = Math.floor(width / 36 / 2);

        const Drawelement = (databartable) => {
            var data = [];

            if (databartable[0].databar.length > tickcount) {
                data = newaxisdata(databartable[0].databar);
            } else {
                data = databartable[0].databar;
            }

            // Add X axis --> it is a date format

            var x0 = d3v4.scaleBand().range([0, width]);
            var x1 = d3v4.scaleBand().range([0, width]);
            // .padding(0.1);

     

            x0.domain(
                data.map(function (d) {
                    return d.date;
                })
            );

            x1.domain(
                olahdata(data).map(function (d) {
                    return d.date;
                })
            );

            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                // .attr("fill", "#000")
                .call(
                    d3v4.axisBottom(x0)
                    // .tickSize(-height)
                );

            // Add Y axis

            var y = d3v4
                .scaleLinear()
                .domain([
                    0,
                    (3 / 2) *
                        d3v4.max(data, function (d) {
                            return d.value;
                        }),
                ])
                .range([height, 0]);

            svg.append("g").attr("transform", "translate(0,0)").call(
                d3v4.axisLeft(y).tickSizeOuter(0)
                // .tickSize(-width)
            );
            svg.append("defs");

            const createGradient = (i) => {
                const gradient = svg
                    .select("defs")
                    .append("linearGradient")
                    .attr("id", "gradient" + i)
                    .attr("x1", "0%")
                    .attr("y1", "0%")
                    .attr("x2", "0%")
                    .attr("y2", "100%");

                gradient
                    .append("stop")
                    .attr("offset", "0%")
                    .attr(
                        "style",
                        "stop-color:" +
                            databartable[i].color +
                            ";stop-opacity:1"
                    );

                gradient
                    .append("stop")
                    .attr("offset", "100%")
                    .attr(
                        "style",
                        "stop-color:" +
                            databartable[i].color +
                            ";stop-opacity:0"
                    );
            };

            databartable.forEach((element, i) => {
                createGradient(i);
                // Add the area
                svg.append("path")
                    .datum(olahdata(element.databar))
                    .attr("fill", "url(#gradient" + i + ")")
                    .attr("fill-opacity", 0.3)
                    .attr("stroke", "none")
                    .attr(
                        "d",
                        d3v4
                            .area()
                            .x(function (d) {
                                return x1(d.date);
                            })
                            .y0(height)
                            .y1(function (d) {
                                return y(d.value);
                            })
                    );

                // Add the line
                svg.append("path")
                    .datum(olahdata(element.databar))
                    .attr("fill", "none")
                    .attr("stroke", element.color)
                    .attr("stroke-width", 4)
                    .attr(
                        "d",
                        d3v4
                            .line()
                            .x(function (d) {
                                return x1(d.date);
                            })
                            .y(function (d) {
                                return y(d.value);
                            })
                    );

                // Add the line
                svg.selectAll("myCircles")
                    .data(olahdata(element.databar))
                    .enter()
                    .append("circle")
                    .attr("fill", element.color)
                    .attr("stroke", "#ffffff")
                    .attr("cx", function (d, i) {
                        if (i % 2 === 1) {
                            return x1(d.date);
                        } else {
                            return x1("");
                        }
                    })
                    .attr("cy", function (d, i) {
                        if (i % 2 === 1) {
                            return y(d.value);
                        }

                        return y(0);
                    })
                    .attr("r", 3)
                    .on("mouseenter", function (d) {
                        d3v4.select("#tooltip")
                        .style("left", d3v4.event.offsetX + "px")
                        .style("top", d3v4.event.offsetY + "px")
                            .style("opacity", 1)
                            .style("display", "block")
                            .select("#name")
                            .text(element.name);

                        d3v4.select("#tooltip")

                            .select("#value")
                            .text(round(d.value, 1));
                    })
                    .on("mousemove", function (d) {
                        d3v4.select("#tooltip")
                        .style("left", d3v4.event.offsetX + "px")
                        .style("top", d3v4.event.offsetY + "px")
                            .style("opacity", 1)
                            .style("display", "block")
                            .select("#name")
                            .text(element.name);

                        d3v4.select("#tooltip")
                            .select("#value")
                            .text(round(d.value, 1));
                    })

                    .on("mouseleave", (d) =>
                        d3v4.select("#tooltip").style("display", "none")
                    );
            });

            // svg.call(createGradient);

            var legend = secondcontainer
                .selectAll(".legend")
                .data(databartable)
                .enter()
                .append("div")
                .attr("class", "legend")
                .style("margin-bottom", "9px")
                .style("display", function (d) {
                    if (varbooleanlegend) {
                        return "flex";
                    } else {
                        return "none";
                    }
                })
                .style("height", "18px");
            legend
                .append("div")
                .attr("class", "legendtext")
                .text(function (d) {
                    return d.name;
                });
            legend
                .append("div")
                .attr("class", "legendbox")

                .style("background-color", function (d) {
                    return d.color;
                });

            // var legend = svg
            //     .selectAll(".legend")
            //     .data(["oke", "tidak"])
            //     .enter()
            //     .append("g")
            //     .attr("class", "legend")
            //     .attr("transform", function (d, i) {
            //         return "translate(" + i * -200 + "," + (height + 23) + ")";
            //     });

            // legend
            //     .append("rect")
            //     .attr("x", width - 48)
            //     .attr("width", 18)
            //     .attr("height", 18)
            //     .style("fill", databartable[0].color);

            // legend
            //     .append("text")
            //     .attr("x", width - 54)
            //     .attr("y", 9)
            //     .attr("dy", ".35em")
            //     .style("text-anchor", "end")
            //     .text(function (d) {
            //         return d;
            //     });
            // Add the line
            // svg.selectAll("myCircles")
            //   .data(data)
            //   .enter()
            //   .append("circle")
            //     .attr("fill", "#000000")
            //     .attr("stroke", "none")
            //     .attr("cx", function(d) { return x(d.date) })
            //     .attr("cy", function(d) { return y(d.value) })
            //     .attr("r", 5)
        };

        Drawelement(datatable);

        function round(value, precision) {
            var multiplier = Math.pow(10, precision || 0);
            return Math.round(value * multiplier) / multiplier;
        }
    };

    // this.widgetEvents = function () {
    //     return {
    //         DoubleClicked: {
    //             description:
    //                 "Event triggered when a row has been double clicked",
    //         },
    //         Clicked: {
    //             description: "Event triggered when a row has been clicked",
    //         },
    //     };
    // };
};
