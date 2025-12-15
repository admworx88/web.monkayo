"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

const chartData = [
  { month: "Jan", revenue: 4500, expenses: 2400 },
  { month: "Feb", revenue: 5200, expenses: 2800 },
  { month: "Mar", revenue: 4800, expenses: 2600 },
  { month: "Apr", revenue: 6100, expenses: 3200 },
  { month: "May", revenue: 5900, expenses: 3100 },
  { month: "Jun", revenue: 7200, expenses: 3800 },
]

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(180, 70%, 45%)",
  },
  expenses: {
    label: "Expenses",
    color: "hsl(220, 70%, 55%)",
  },
} satisfies ChartConfig

export function RevenueChart() {
  return (
    <Card className="@container/card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>
              January - June 2024
            </CardDescription>
          </div>
          <CardAction>
            <Tabs defaultValue="revenue" className="w-fit">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="revenue">Revenue</TabsTrigger>
                <TabsTrigger value="expenses">Expenses</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardAction>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[300px] w-full"
        >
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="hsl(180, 70%, 45%)"
                  stopOpacity={0.3}
                />
                <stop
                  offset="95%"
                  stopColor="hsl(180, 70%, 45%)"
                  stopOpacity={0}
                />
              </linearGradient>
              <linearGradient id="fillExpenses" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="hsl(220, 70%, 55%)"
                  stopOpacity={0.3}
                />
                <stop
                  offset="95%"
                  stopColor="hsl(220, 70%, 55%)"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              className="text-xs"
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area
              dataKey="revenue"
              type="monotone"
              fill="url(#fillRevenue)"
              fillOpacity={0.4}
              stroke="hsl(180, 70%, 45%)"
              strokeWidth={2}
            />
            <Area
              dataKey="expenses"
              type="monotone"
              fill="url(#fillExpenses)"
              fillOpacity={0.4}
              stroke="hsl(220, 70%, 55%)"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
