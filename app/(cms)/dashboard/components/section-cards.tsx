import { IconTrendingDown, IconTrendingUp, IconCurrencyDollar, IconUsers, IconShoppingCart, IconChartLine } from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function SectionCards() {
  return (
    <div className="*:data-[slot=card]:from-teal-500/5 *:data-[slot=card]:via-cyan-500/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-br *:data-[slot=card]:shadow-xs *:data-[slot=card]:border-border/50 *:data-[slot=card]:backdrop-blur-sm lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card relative overflow-hidden group hover:border-teal-500/30 transition-all duration-300">
        <div className="absolute -right-12 -top-12 h-32 w-32 bg-gradient-to-br from-teal-500/10 to-cyan-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <CardHeader className="relative">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gradient-to-br from-teal-500/10 to-cyan-500/10">
              <IconCurrencyDollar className="size-4 text-teal-600 dark:text-teal-400" />
            </div>
            <CardDescription>Total Revenue</CardDescription>
          </div>
          <CardTitle className="text-2xl font-mono font-bold tabular-nums @[250px]/card:text-4xl text-teal-600 dark:text-teal-400">
            $45,231.89
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/30">
              <IconTrendingUp className="size-3" />
              +20.1%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="relative flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-semibold">
            Trending up this month <IconTrendingUp className="size-4 text-teal-600 dark:text-teal-400" />
          </div>
          <div className="text-muted-foreground text-xs">
            +$12,450 from last month
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card relative overflow-hidden group hover:border-teal-500/30 transition-all duration-300">
        <div className="absolute -right-12 -top-12 h-32 w-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <CardHeader className="relative">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-500/10">
              <IconUsers className="size-4 text-blue-600 dark:text-blue-400" />
            </div>
            <CardDescription>Active Customers</CardDescription>
          </div>
          <CardTitle className="text-2xl font-mono font-bold tabular-nums @[250px]/card:text-4xl">
            +2,350
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/30">
              <IconTrendingUp className="size-3" />
              +180.1%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="relative flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-semibold">
            Strong growth trend <IconTrendingUp className="size-4 text-green-600 dark:text-green-400" />
          </div>
          <div className="text-muted-foreground text-xs">
            From 1,302 to 3,652 customers
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card relative overflow-hidden group hover:border-teal-500/30 transition-all duration-300">
        <div className="absolute -right-12 -top-12 h-32 w-32 bg-gradient-to-br from-orange-500/10 to-red-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <CardHeader className="relative">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-orange-500/10">
              <IconShoppingCart className="size-4 text-orange-600 dark:text-orange-400" />
            </div>
            <CardDescription>Total Sales</CardDescription>
          </div>
          <CardTitle className="text-2xl font-mono font-bold tabular-nums @[250px]/card:text-4xl">
            +12,234
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/30">
              <IconTrendingUp className="size-3" />
              +19%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="relative flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-semibold">
            Sales momentum strong <IconTrendingUp className="size-4 text-green-600 dark:text-green-400" />
          </div>
          <div className="text-muted-foreground text-xs">
            +1,952 from previous period
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card relative overflow-hidden group hover:border-teal-500/30 transition-all duration-300">
        <div className="absolute -right-12 -top-12 h-32 w-32 bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <CardHeader className="relative">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-violet-500/10">
              <IconChartLine className="size-4 text-violet-600 dark:text-violet-400" />
            </div>
            <CardDescription>Monthly Goal</CardDescription>
          </div>
          <CardTitle className="text-2xl font-mono font-bold tabular-nums @[250px]/card:text-4xl">
            78%
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/30">
              <IconTrendingUp className="size-3" />
              +12%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="relative flex-col items-start gap-2 text-sm">
          <Progress value={78} className="h-2" />
          <div className="flex w-full items-center justify-between text-xs font-mono">
            <span className="text-muted-foreground">$23,400</span>
            <span className="font-semibold">$30,000</span>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
