import React, { Component } from 'react';
import * as d3 from 'd3';

class Child1 extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.renderChart();
    }

    componentDidUpdate() {
        this.renderChart();
    }

    renderChart() {
        const data = this.props.data1;

        const margin = { top: 50, right: 50, bottom: 50, left: 60 };
        const width = 600 - margin.left - margin.right;
        const height = 300 - margin.top - margin.bottom;

        d3.select(".child1_svg").selectAll("*").remove();

        const svg = d3.select(".child1_svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const xScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.total_bill)])
            .range([0, width]);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.tip)])
            .range([height, 0]);

        svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(xScale))
            .append("text")
            .attr("x", width / 2)
            .attr("y", 40)
            .attr("fill", "black")
            .style("font-size", "16px")
            .text("Total Bill");

        svg.append("g")
            .call(d3.axisLeft(yScale))
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", -40)
            .attr("x", -height / 2)
            .attr("fill", "black")
            .style("font-size", "16px")
            .text("Tips");

        svg.selectAll(".dot")
            .data(data)
            .enter()
            .append("circle")
            .attr("class", "dot")
            .attr("cx", d => xScale(d.total_bill))
            .attr("cy", d => yScale(d.tip))
            .attr("r", 5)
            .attr("fill", "#69b3a2");

        svg.append("text")
            .attr("x", width / 2)
            .attr("y", -10)
            .attr("text-anchor", "middle")
            .style("font-size", "24px")
            .text("Total Bill vs Tips");
    }

    render() {
        return <svg className="child1_svg"></svg>;
    }
}

export default Child1;