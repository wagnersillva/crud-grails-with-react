import React, { useEffect } from "react";
import { Pie }  from 'react-chartjs-3'
import { ChartColors, ChartEnumColors } from "./ChartColors";

export const CardPie = ({ PropsDataSet, PropsLabels, title, width, height, max }) => {

    const Dataset = [{ label: (PropsDataSet ? PropsDataSet.label || "Data value" :  "Data value"), data: [], backgroundColor: [] }]
    let labels = []

    PropsLabels && PropsLabels.length && PropsLabels.map( label => labels = [...labels, label])
    PropsDataSet.data && PropsDataSet.data.length && PropsDataSet.data.map ( value => Dataset[0].data = [...Dataset[0].data, value] )
    PropsDataSet.backgroundColors && PropsDataSet.backgroundColors.length && PropsDataSet.backgroundColors.map( color => Dataset[0].backgroundColor = [...Dataset[0].backgroundColor, ( ChartEnumColors[color] || ChartColors[color] || ChartColors[0] ) ] )

    labels && labels.sort((a,b) => a - b)

    return (
        <Pie 
            data={{
                labels: labels,
                datasets: Dataset
            }}
            height={height || 150}
            width={350}
            options={{
                legend: {
                    display: false,
                },
                title:{
                    display:false,
                    text: title && title
                },
                
                tooltips: {
                    titleAlign: "left",
                    // axis: "xy"
                }
            }}
        />
    )

}