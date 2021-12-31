import React, { useEffect } from "react";
import { HorizontalBar }  from 'react-chartjs-3'
import { ChartColors, ChartEnumColors } from "./ChartColors";

export const CardHorizontalBar = ({ PropsDataSet, PropsLabels, title, width, height, max }) => {

    const Dataset = [{ label: (PropsDataSet ? PropsDataSet.label || "Data value" :  "Data value"), data: [], backgroundColor: [] }]
    let labels = []

    PropsLabels && PropsLabels.length && PropsLabels.map( label => labels = [...labels, label])
    PropsDataSet.data && PropsDataSet.data.length && PropsDataSet.data.map ( value => Dataset[0].data = [...Dataset[0].data, value] )
    PropsDataSet.backgroundColors && PropsDataSet.backgroundColors.length && PropsDataSet.backgroundColors.map( color => Dataset[0].backgroundColor = [...Dataset[0].backgroundColor, ( ChartEnumColors[color] || ChartColors[color] || ChartColors[0] ) ] )

    labels && labels.sort((a,b) => a - b)

    return (
        <HorizontalBar 
            data={{
                labels: labels,
                datasets: Dataset
            }}
            height={height || 150}
            width={width || 350}
            options={{
                legend: false,
                fill: false,
                title:{
                    display: title && true,
                    text: title && title
                },
                scales: {
                    xAxes:[{ ticks: { beginAtZero: true, max: max } }],
                    yAxes:[{ ticks: { lineHeight: 5, fontSize: 10 } }],
                }
            }}
        />
    )

}