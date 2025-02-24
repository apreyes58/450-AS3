import React, { Component } from 'react';
import * as d3 from 'd3';

class Child2 extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        console.log("Component Has been mounted");
        this.renderChart();
    }

    componentDidUpdate(prevProps) {
        this.renderChart();
    }

    renderChart() {
        const { data2 } = this.props;

        const days = ["Sun", "Sat", "Fri", "Thur"];
        const averageTips = days.map(day => {
            const filteredData = data2.filter(d => d.day === day);
            const totalTips = filteredData.reduce((sum, d) => sum + d.tip, 0);
            return {
                day: day,
                averageTip: totalTips / filteredData.length
            };
        });

        const margin = { top: 50, right: 50, bottom: 50, left: 60 };
        const width = 600 - margin.left - margin.right;
        const height = 300 - margin.top - margin.bottom;

        d3.select(".child2_svg").selectAll("*").remove();

        const svg = d3.select(".child2_svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const x = d3.scaleBand()
            .domain(days)
            .range([0, width])
            .padding(0.1);

        const y = d3.scaleLinear()
            .domain([0, d3.max(averageTips, d => d.averageTip)])
            .nice()
            .range([height, 0]);

        svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x))
            .append("text")
            .attr("x", width / 2)
            .attr("y", 30)
            .attr("fill", "#000")
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .text("Day");

        svg.append("g")
            .call(d3.axisLeft(y))
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", -margin.left)
            .attr("x", -height / 2)
            .attr("dy", "1em")
            .attr("fill", "#000")
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .text("Average Tip");

        svg.selectAll(".bar")
            .data(averageTips)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", d => x(d.day))
            .attr("y", d => y(d.averageTip))
            .attr("width", x.bandwidth())
            .attr("height", d => height - y(d.averageTip))
            .attr("fill", "#69b3a2");

        svg.append("text")
            .attr("x", width / 2)
            .attr("y", -10)
            .attr("text-anchor", "middle")
            .style("font-size", "24px")
            .text("Average Tip by Day");
    }

    render() {
        return <svg className="child2_svg"></svg>;
    }
}

export default Child2;