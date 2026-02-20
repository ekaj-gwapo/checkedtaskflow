"use client"

import Link from "next/link"
import { TaskProvider, useTaskContext } from "@/lib/task-context"
import { TopCompletersChart } from "@/components/top-completers-chart"
import { Button } from "@/components/ui/button"
import { ArrowLeft, BarChart3 } from "lucide-react"

function DashboardContent() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="border-b border-border bg-card sticky top-0 z-10">
        <div className="flex items-center gap-4 p-4 lg:p-6 max-w-7xl mx-auto w-full">
          <Link href="/">
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">Team Performance Dashboard</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-6 overflow-y-auto">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Chart Card */}
          <div className="bg-card rounded-lg border border-border p-6">
            <h2 className="text-lg font-semibold text-foreground mb-6">Top Task Completers</h2>
            <TopCompletersChart />
          </div>

          {/* Info Card */}
          <div className="bg-secondary/50 rounded-lg border border-border p-4">
            <h3 className="font-semibold text-foreground mb-2">Performance Metrics</h3>
            <p className="text-sm text-muted-foreground">
              This chart displays the top performing team members based on completed tasks. It helps track individual performance and recognize high achievers in your organization.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default function TeamDashboardPage() {
  return (
    <TaskProvider>
      <DashboardContent />
    </TaskProvider>
  )
}
