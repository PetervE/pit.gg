import { ResponsiveLine } from "@nivo/line";

export default function NivoLine(props) {
  const darkModeActive = props.darkModeActive;
  return (
    <ResponsiveLine
      data={props.data}
      // colors={[randomRgbaString(1)]}
      colors={{ scheme: "accent" }}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
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
      yFormat=" >-.2f"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "transportation",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "count",
        legendOffset: -40,
        legendPosition: "middle",
      }}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: "top-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
}
