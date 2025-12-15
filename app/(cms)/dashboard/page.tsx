import { SiteHeader } from "@/app/(cms)/dashboard/components/site-header"
import { SectionCards } from "@/app/(cms)/dashboard/components/section-cards"
import { RevenueChart } from "@/app/(cms)/dashboard/components/revenue-chart"
import { DataTable } from "@/app/(cms)/dashboard/components/data-table"

import data from "@/app/(cms)/dashboard/data.json"

export default function DashboardPage() {
  return (
    <div className="@container/main flex flex-1 flex-col">
      <SiteHeader />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-4 lg:gap-6 lg:p-6">
        <div className="flex items-center">
          <h1 className="text-xl font-mono font-bold tracking-tight lg:text-2xl">
            Financial Dashboard
          </h1>
        </div>
        <SectionCards />
        <div className="grid gap-4 lg:gap-6 @5xl/main:grid-cols-2">
          <RevenueChart />
          <div className="flex flex-col gap-4">
            <div className="grid gap-4 @xl/main:grid-cols-2">
              <div className="rounded-none border border-border/50 bg-gradient-to-br from-teal-500/5 via-cyan-500/5 to-card p-6 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">Active Sessions</div>
                  <div className="h-2 w-2 rounded-full bg-teal-500 animate-pulse" />
                </div>
                <div className="mt-2 text-3xl font-mono font-bold tabular-nums">573</div>
                <div className="mt-1 text-xs text-muted-foreground">+201 from last hour</div>
              </div>
              <div className="rounded-none border border-border/50 bg-gradient-to-br from-violet-500/5 via-fuchsia-500/5 to-card p-6 backdrop-blur-sm">
                <div className="text-sm text-muted-foreground">Conversion Rate</div>
                <div className="mt-2 text-3xl font-mono font-bold tabular-nums">24.8%</div>
                <div className="mt-1 text-xs text-muted-foreground">+4.3% from last week</div>
              </div>
            </div>
            <div className="rounded-none border border-border/50 bg-gradient-to-br from-card via-card to-teal-500/5 p-6 backdrop-blur-sm">
              <div className="text-sm font-semibold mb-4">Recent Activity</div>
              <div className="space-y-3">
                {[
                  { user: "Sarah Johnson", action: "completed purchase", amount: "$1,250", time: "2m ago" },
                  { user: "Michael Chen", action: "updated profile", amount: null, time: "15m ago" },
                  { user: "Emma Wilson", action: "made payment", amount: "$2,100", time: "1h ago" },
                ].map((activity, i) => (
                  <div key={i} className="flex items-center justify-between text-sm border-l-2 border-teal-500/30 pl-3 hover:border-teal-500 transition-colors">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{activity.user}</p>
                      <p className="text-xs text-muted-foreground truncate">{activity.action}</p>
                    </div>
                    <div className="text-right ml-4">
                      {activity.amount && (
                        <p className="text-sm font-mono font-semibold text-teal-600 dark:text-teal-400">
                          {activity.amount}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="@container/card">
          <DataTable data={data} />
        </div>
      </div>
    </div>
  )
}
