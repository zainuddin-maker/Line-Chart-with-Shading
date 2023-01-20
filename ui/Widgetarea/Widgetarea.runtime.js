TW.Runtime.Widgets.Widgetarea = function () {
    this.renderHtml = function () {
        // return any HTML you want rendered for your widget
        // If you want it to change depending on properties that the user
        // has set, you can use this.getProperty(propertyName). In
        // this example, we'll just return static HTML
        return "<div class=widget-content widget-Widgetarea>" + "</div>";
    };

    // };

    this.updateProperty = function (updatePropertyInfo) {
        // TargetProperty tells you which of your bound properties changed
        if (updatePropertyInfo.TargetProperty === "TableData") {
            this.setProperty(
                "TableData",
                updatePropertyInfo.RawDataFromInvoke.rows
            );
           
        }

        this.setupWidget();
    };

    this.afterRender = function () {
        this.setupWidget();
    };

    this.setupWidget = function () {
        var widgetID = this.jqElementId;
        // Remove all old/existing DOM element
        d3v4.select(`#${widgetID}`).selectAll("*").remove();
        // Handle Properties
        try {
            var allWidgetProps = this.properties;

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

            console.log("widgetProps running area");
            console.log(widgetProps);
        } catch (error) {
            console.log("error");
        }

        //Read the data

        // const datatable = widgetProps.TableData
        // const data =JSON.parse(databartable[0].databar);

        //(`#${widgetID}`)

        var widthwindows = widgetProps.Widthbar,
            heightwindowss = widgetProps.Heightbar;

        var marginwindows = {
            top: widgetProps.Paddingchart,
            right: widgetProps.Paddingchart,
            bottom: widgetProps.Paddingchart,
            left: widgetProps.Paddingchart,
        };

        // var widthwindows = 460,
        //     heightwindowss = 200;

        // var marginwindows = {
        //     top: 10,
        //     right: 10,
        //     bottom: 10,
        //     left: 10,
        // };

        var varbooleanlegend = widgetProps.ShowLegend;

        var startdate = new Date(widgetProps.StartTime);

        var varenddate = new Date(widgetProps.EndTime);

        //Read the data

        const dataarray = {
            rows: widgetProps.TableData,
        };

        //tooltipe

        var fontsizetooltipstring = widgetProps.StyleTooltip.textSize;
        var backgroundcolortooltip = widgetProps.StyleTooltip.backgroundColor;
        let textcolortooltip =widgetProps.StyleTooltip.foregroundColor;

        // xaxis

        // var colortickchartx = "#eaff00"

        var colorlinechart = widgetProps.StyleXaxis.lineColor; // line color
        var fontcolor = widgetProps.StyleXaxis.foregroundColor; // text color

        // yaxis
        // var colortickcharty = "#00f"
        var colorlinecharty = widgetProps.StyleYaxis.lineColor; // line color
        var fontcolory = widgetProps.StyleYaxis.foregroundColor; //text color

        var tickcounty = widgetProps.Tickcountarea;
        let booleantick = widgetProps.ShowGrid;

        var miny0 = widgetProps.MinYaxis;

        var maxy0 = widgetProps.MaxYaxis;

        if (!miny0) {
            miny0 = 0;
        }

        //legend
        let fontcolorlegend = widgetProps.StyleLegend.foregroundColor; //text color
        let fontsizelegend = widgetProps.StyleLegend.textSize;

        let booleanleft = widgetProps.IsleftLegend;

        const convertFontSize = (textSize) => {
            var result = textSize;
            switch (textSize) {
                case "xsmall":
                    result = "9px";
                    break;
                case "small":
                    result = "10px";
                    break;
                case "normal":
                    result = "11px";
                    break;
                case "large":
                    result = "12px";
                    break;
                case "xlarge":
                    result = "14px";
                    break;
                case "xxl":
                    result = "16px";
                    break;
                case "2xl":
                    result = "18px";
                    break;
                case "3xl":
                    result = "22px";
                    break;
                default:
                    result = "22px";
            }

            return result;
        };

        var margin = {
                top: 0 + marginwindows.top,
                right: 0 + marginwindows.right,
                bottom: 40 + marginwindows.bottom,
                left: 30 + marginwindows.left,
            },
            width = widthwindows - margin.left - margin.right,
            height = heightwindowss - margin.top - margin.bottom;

        var makemy_dataviz = d3v4
            .select(`#${widgetID}`)
            .append("div")
            .attr("id", "my_dataviz")
            .style("width", width + (margin.left + margin.right) + "px")
            .style("height", height + (margin.top + margin.bottom) + "px");

        var tooltipdiv = d3v4
            .select("#my_dataviz")
            .append("div")
            .attr("id", "tooltip_area")
            .attr("class", "hidden");

        tooltipdiv.append("p").attr("id", "name");
        tooltipdiv.append("p").attr("id", "value");

        var svg = d3v4
            .select("#my_dataviz")
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
            .select("#my_dataviz")
            .append("div")
            .attr("id", "secondcontainer_area")
            .attr("class", "secondcontainer_area")
            // .style("background-color", "#eaeaea")
            .style("display", "flex")
            .style("width", width + "px")
            // .style("height", 18 +"px")
            .style("flex-direction", "row-reverse")
            .style("margin-top", -18 + "px")
            .style("margin-left", margin.left + "px");

        //Read the data

        var optionscolor = dataarray.rows[0].options.rows[0].color.rows;

        var optionstype = dataarray.rows[0].options.rows[0].type.rows;

        // var valuesarray = dataarray.rows[0].values.rows;

        function makedatanew(dataarray) {
            var valuesarray = [];

            dataarray.rows[0].values.rows.forEach((data, i) => {
                if (
                    new Date(data.date) <= new Date(varenddate) &&
                    new Date(data.date) >= new Date(startdate)
                ) {
                    valuesarray.push(data);
                }
            });

            valuesarray.sort(function (a, b) {
                return new Date(a.date) - new Date(b.date);
            });

            function makeformatdate(datereal) {
                const datenew = new Date(datereal);
        
                return (
                    datenew.getDate() +
                    "/" +
                    (datenew.getMonth() < 10
                    ? "0" + (datenew.getMonth() +1)
                    : (datenew.getMonth() + 1)) +
                    "/" +
                   datenew.getFullYear()
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
                            "#" +
                            Math.floor(Math.random() * 16777215).toString(16);
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
                    newdatatable.findIndex(
                        (element) => element.id === data.id
                    ) < 0
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
                        arraydate.findIndex(
                            (element) => element.date === data.date
                        )
                    ].value = data.value;
                    newdatatable.push(objnewdatatable);
                } else {
                    newdatatable[
                        newdatatable.findIndex(
                            (element) => element.id === data.id
                        )
                    ].databar[
                        arraydate.findIndex(
                            (element) => element.date === data.date
                        )
                    ].value = data.value;
                }
            });

            return newdatatable;
        }

        var datatable = makedatanew(dataarray);

        var booleannulldata = false;

        if (datatable.length === 0) {
            booleannulldata = true;
            dataarray.rows[0].options.rows[0].type.rows.forEach((element) => {
                dataarray.rows[0].values.rows.push({
                    date: new Date(startdate),
                    id: element.id,
                    value: "5",
                });
                dataarray.rows[0].values.rows.push({
                    date: new Date(varenddate),
                    id: element.id,
                    value: "5",
                });
            });

            datatable = makedatanew(dataarray);
        }

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

        function olahdatanew(data) {
            const datatablenew = [];
            data.concat(data).forEach((element, i) => {
                if (i === 0) {
                    // datatablenew.push({
                    //     date: i,
                    //     value: 0,
                    // });
                } else {
                    if (i % 2 !== 0) {
                        datatablenew.push({
                            date: i,
                            value: data[(i - 1) / 2].value,
                        });
                    } else {
                        datatablenew.push({
                            date: i,
                            value: (data[i / 2].value + data[i / 2 - 1].value) / 2,
                        });
                    }
                }
            });
        
            return datatablenew;
        }

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

            let ticksizecount = 5;
            let ticksizecountx = 5;
            if (booleantick) {
                ticksizecount = -width;
                ticksizecountx = -height;
            }

            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                // .attr("fill", "#000")
                .call(d3v4.axisBottom(x0).tickSize(ticksizecountx))
                .selectAll("text")
                // .attr("fill", "#000")
                .attr("transform", "rotate(-15)")
                .attr("y",15);
            svg.select(".x.axis").selectAll("text").style("fill", fontcolor);
            svg.select(".x.axis")
                .selectAll("path")
                .style("fill", "none")
                .style("stroke", colorlinechart)
                .style("shape-rendering", "crispEdges");
            svg.select(".x.axis")
                .selectAll("line")
                .style("fill", "none")
                .style("stroke", colorlinechart)
                .style("shape-rendering", "crispEdges");

            let ylist = [];

            databartable.forEach((element) => {
                ylist = ylist.concat(element.databar);
            });

            var y = d3v4
                .scaleLinear()
                .domain([
                    miny0,

                    d3v4.max(ylist, function (d) {
                        if (!maxy0) {
                            return d.value;
                        } else {
                            return maxy0;
                        }
                    }),
                ])
                .range([height, 0]);

            svg.append("g")
                .attr("class", "y0 axis")
                .attr("transform", "translate(0,0)")
                .call(
                    d3v4
                        .axisLeft(y)
                        .ticks(tickcounty, ".1f")
                        .tickSize(ticksizecount)
                );

            svg.select(".y0.axis")
                .selectAll("path")
                .style("fill", "none")
                .style("stroke", colorlinecharty)
                .style("shape-rendering", "crispEdges");
            svg.select(".y0.axis")
                .selectAll("line")
                .style("fill", "none")
                .style("stroke", colorlinecharty)
                .style("shape-rendering", "crispEdges");

            svg.select(".y0.axis").selectAll("text").style("fill", fontcolory);

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

            if (!booleannulldata) {
                databartable.forEach((element, i) => {
                    createGradient(i);
                    // Add the area
                    svg.append("path")
                    .datum(olahdatanew(element.databar))
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
                });

                databartable.forEach((element, i) => {
                    // Add the line
                    svg.append("path")
                    .datum(olahdatanew(element.databar))
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
                });

                databartable.forEach((element, i) => {
                    // Add the line
                    svg.selectAll("whatever")
                        .data(olahdata(element.databar))
                        .enter()
                        .append("circle")
                        .attr("fill", element.color)
                        .attr("stroke", "#ffffff")
                        .attr("display", function (d, i) {
                            if (i % 2 === 1) {
                                return "";
                            } else {
                                return "none";
                            }
                        })
                        .attr("cx", function (d, i) {
                            if (i % 2 === 1) {
                                return x1(d.date);
                            }
                        })
                        .attr("cy", function (d, i) {
                            if (i % 2 === 1) {
                                return y(d.value);
                            }
                        })
                        .attr("r", 3)
                        .on("mouseenter", function (d) {
                            d3v4.select("#tooltip_area")
                                .style("left", d3v4.event.offsetX + "px")
                                .style("top", d3v4.event.offsetY + "px")
                                .style("opacity", 1)
                                .style("display", "block")
                                .style(
                                    "background-color",
                                    backgroundcolortooltip
                                )
                                .style("color",textcolortooltip)
                                .style(
                                    "font-size",
                                    convertFontSize(fontsizetooltipstring)
                                )
                                .style(
                                    "line-height",
                                    convertFontSize(fontsizetooltipstring)
                                )
                                .select("#name")
                                .style("font-weight", "bold")
                                .text(element.name);

                            d3v4.select("#tooltip_area")

                                .select("#value")
                                .text(round(d.value, 1));
                        })
                        .on("mousemove", function (d) {
                            d3v4.select("#tooltip_area")
                                .style("left", d3v4.event.offsetX + "px")
                                .style("top", d3v4.event.offsetY + "px")
                                .style("opacity", 1)
                                .style("display", "block")
                                .style(
                                    "background-color",
                                    backgroundcolortooltip
                                )
                                .style("color",textcolortooltip)
                                .style(
                                    "font-size",
                                    convertFontSize(fontsizetooltipstring)
                                )
                                .style(
                                    "line-height",
                                    convertFontSize(fontsizetooltipstring)
                                )
                                .select("#name")
                                .style("font-weight", "bold")
                                .text(element.name);

                            d3v4.select("#tooltip_area")
                                .select("#value")
                                .text(round(d.value, 1));
                        })

                        .on("mouseleave", (d) =>
                            d3v4.select("#tooltip_area").style("opacity", 0)
                        );
                });
            }
            var legend = secondcontainer
                .selectAll(".legend")
                .data(databartable)
                .enter()
                .append("div")
                .attr("class", "legend_area")
                .style("margin-bottom", "9px")
                .style("display", function (d) {
                    if (varbooleanlegend) {
                        return "flex";
                    } else {
                        return "none";
                    }
                })
                .style("height", "18px");

            if (booleanleft) {
                legend
                    .append("div")
                    .attr("class", "legendtext_area")
                    .style("color", fontcolorlegend)
                    .style("font-size", convertFontSize(fontsizelegend))
                    .text(function (d) {
                        return d.name;
                    });
                legend
                    .append("div")
                    .attr("class", "legendbox_area")

                    .style("background-color", function (d) {
                        return d.color;
                    });
            } else {
                legend
                    .append("div")
                    .attr("class", "legendbox_area")

                    .style("background-color", function (d) {
                        return d.color;
                    });

                legend
                    .append("div")
                    .attr("class", "legendtext_area")
                    .style("color", fontcolorlegend)
                    .style("font-size", convertFontSize(fontsizelegend))
                    .text(function (d) {
                        return d.name;
                    });
            }
        };

        Drawelement(datatable);

        function round(value, precision) {
            var multiplier = Math.pow(10, precision || 0);
            return Math.round(value * multiplier) / multiplier;
        }
    };
};
