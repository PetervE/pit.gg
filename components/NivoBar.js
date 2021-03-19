import React from "react";
import { ResponsiveBar } from "@nivo/bar";

export default function NivoBar(props) {
  const darkModeActive = props.darkModeActive;
  return (
    <ResponsiveBar
      data={props.data}
      theme={{
        legends: {
          text: { fill: darkModeActive ? "white" : "black" },
        },
        axis: {
          legend: { text: { fill: darkModeActive ? "white" : "black" } },
          ticks: {
            line: {
              stroke: "green",
            },
            text: {
              fill: darkModeActive ? "white" : "black",
            },
          },
        },
        grid: {
          line: {
            stroke: darkModeActive ? "white" : "black",
            strokeWidth: 1,
            strokeDasharray: "0 0",
          },
        },
      }}
      keys={[
        "set 1",
        "set 2",
        "set 3",
        "set 4",
        "set 5",
        "set 6",
        "set 7",
        "set 8",
        "set 9",
        "set 10",
      ]}
      indexBy="date"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "nivo" }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "#38bcb2",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "#eed312",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      fill={[
        {
          match: {
            id: "fries",
          },
          id: "dots",
        },
        {
          match: {
            id: "sandwich",
          },
          id: "lines",
        },
      ]}
      borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "",
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Volume (KG)",
        legendPosition: "middle",
        legendOffset: -40,
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "top-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      animate={true}
      motionStiffness={90}
      motionDamping={15}
    />
  );
}
