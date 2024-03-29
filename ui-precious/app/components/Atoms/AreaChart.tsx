import React from "react";
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { 
  Box,
  useTheme, 
} from "@mui/material";

const NoSSRChart = dynamic(() => import('react-apexcharts'), { ssr: false })

const chartSeries = (data: [number, number][], shorthandLabel: string) => [
  {
    name: shorthandLabel,
    type: 'area',
    data: data,
  },
]

const chartOptions = (
  color: string,
  labelFormat: (n: number) => string, 
  min: number, 
  max: number,
): ApexCharts.ApexOptions => ({
  grid: {
    show: false,
    padding: {
      left: 0,
      right: 0,
    },
  },
  legend: {
    show: false,
  },
  chart: {
    height: 350,
    type: 'line',
    toolbar: {
      show: false,
    },
    fontFamily: "'Konnect', serif",
    zoom: {
      enabled: false,
    },
    sparkline: {
      enabled: true,
    },
  },
  stroke: {
    width: [2, 2],
    colors: [color],
    curve: 'smooth',
  },
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'light',
      type: 'vertical',
      shadeIntensity: 0.3,
      gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
      inverseColors: false,
      opacityFrom: 0.7,
      opacityTo: 0,
      // stops: [0, 80, 100],
    },
  },
  colors: [color],
  markers: {
    colors: [color],
    strokeColors: [color],
    strokeWidth: 1,
  },
  tooltip: {
    theme: 'dark',
    y: {
      formatter: labelFormat,
    }
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    type: 'datetime',
    tooltip: {
      enabled: false,
    },
    labels: {
      formatter: (_, timestamp: number) => {
        return new Date(timestamp).toLocaleTimeString();
      },
      show: false,
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    show: false,
    min: min,
    max: max,
  },
})

export type AreaChartProps = {
  data: [number, number][];
  height: number;
  shorthandLabel: string;
  labelFormat: (n: number) => string;
  color?: string,
}

export const AreaChart:React.FC<AreaChartProps> = ({ 
  data, 
  height, 
  shorthandLabel, 
  labelFormat,
  color, 
}) => {
  const theme = useTheme();

  let min = Math.min(...data.map((x) => x[1]));
  let max = Math.max(...data.map((x) => x[1]));

  min = min - (max - min) * 0.3;
  max = max + max * 0.01;

  const [options, setOptions] = useState<ApexCharts.ApexOptions>(
    chartOptions(color || theme.palette.primary.main, labelFormat, min, max)
  )

  useEffect(() => {
    setOptions(chartOptions(color || theme.palette.primary.main, labelFormat, min, max))
  }, [])

  useEffect(() => {
    setOptions({
      ...options,
      ...chartOptions(color || theme.palette.primary.main, labelFormat, min, max),
    })
  }, [data, color])

  return (
    <Box 
      height={height}
      overflow="hidden"
    >
      <NoSSRChart
        options={options}
        series={
          chartSeries(
            data.map((x) => [x[0], x[1]]),
            shorthandLabel
          )
        }
        type="area"
        height="100%"
      />
    </Box>
  )
}