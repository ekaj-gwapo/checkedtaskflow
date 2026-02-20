"use client"

import { useRouter } from "next/navigation"
import { TopCompletersChart } from "@/components/top-completers-chart"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function DashboardPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="flex items-center gap-4 p-4 lg:p-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold text-foreground">Team Performance Dashboard</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 lg:p-6">
        <div className="max-w-4xl mx-auto">
          {/* Chart Section */}
          <div className="bg-card rounded-lg border border-border p-6">
            <h2 className="text-lg font-semibold text-foreground mb-6">Top Task Completers</h2>
            <TopCompletersChart />
          </div>

          {/* Description */}
          <div className="mt-6 bg-secondary/50 rounded-lg border border-border p-4">
            <h3 className="font-semibold text-foreground mb-2">Dashboard Overview</h3>
            <p className="text-sm text-muted-foreground">
              This chart displays the top performing team members based on completed tasks. It helps track individual performance and recognize high achievers in your organization.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
