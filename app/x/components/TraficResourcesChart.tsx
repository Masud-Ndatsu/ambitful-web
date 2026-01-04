"use client";

import { Pie, PieChart } from "recharts";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart";

export const description = "A pie chart with a legend";

const chartData = [
  { browser: "chrome", opportunities: 275, fill: "var(--color-chrome)" },
  { browser: "safari", opportunities: 200, fill: "var(--color-safari)" },
  { browser: "firefox", opportunities: 187, fill: "var(--color-firefox)" },
  { browser: "edge", opportunities: 173, fill: "var(--color-edge)" },
  { browser: "other", opportunities: 90, fill: "var(--color-other)" },
];

const chartConfig = {
  opportunities: {
    label: "Opportunities",
  },
  chrome: {
    label: "Chrome",
    color: "var(--chart-1)",
  },
  safari: {
    label: "Safari",
    color: "var(--chart-2)",
  },
  firefox: {
    label: "Firefox",
    color: "var(--chart-3)",
  },
  edge: {
    label: "Edge",
    color: "var(--chart-4)",
  },
  other: {
    label: "Other",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

export default function TraficResourcesChart() {
  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[300px]"
    >
      <PieChart>
        <Pie data={chartData} dataKey="opportunities" nameKey="browser" />
        <ChartLegend
          content={<ChartLegendContent nameKey="browser" />}
          className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
        />
      </PieChart>
    </ChartContainer>
  );
}
