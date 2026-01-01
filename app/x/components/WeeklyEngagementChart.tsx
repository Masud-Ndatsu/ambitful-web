"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

// Weekly engagement data for the last 7 days
const weeklyData = [
  {
    day: "Mon",
    views: 45,
    bookmarks: 8,
  },
  {
    day: "Tue",
    views: 62,
    bookmarks: 15,
  },
  {
    day: "Wed",
    views: 78,
    bookmarks: 19,
  },
  {
    day: "Thu",
    views: 54,
    bookmarks: 12,
  },
  {
    day: "Fri",
    views: 89,
    bookmarks: 25,
  },
  {
    day: "Sat",
    views: 32,
    bookmarks: 6,
  },
  {
    day: "Sun",
    views: 21,
    bookmarks: 4,
  },
];

const chartConfig = {
  views: {
    label: "Views",
    // color: "hsl(var(--chart-1))",
  },
  bookmarks: {
    label: "Bookmarks",
    // color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const WeeklyEngagementChart = () => {
  // Calculate total engagement for the week
  const totalViews = weeklyData.reduce((sum, day) => sum + day.views, 0);
  const totalBookmarks = weeklyData.reduce(
    (sum, day) => sum + day.bookmarks,
    0
  );

  // Calculate percentage change (simulated for demo)
  const weeklyGrowth = 12.3;

  return (
    <>
      <ChartContainer className="h-full w-full pt-8" config={chartConfig}>
        <BarChart accessibilityLayer data={weeklyData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="day"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            fontSize={12}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            fontSize={12}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <Bar
            dataKey="views"
            stackId="a"
            fill="var(--color-views)"
            radius={[0, 0, 4, 4]}
          />
          <Bar
            dataKey="bookmarks"
            stackId="a"
            fill="var(--color-bookmarks)"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ChartContainer>
    </>
  );
};

export default WeeklyEngagementChart;
