"use client"

import { useRouter } from "next/navigation"
import { TaskProvider, useTaskContext } from "@/lib/task-context"
import { TopCompletersChart } from "@/components/top-completers-chart"
import { AppHeader } from "@/components/app-header"
import { LoginScreen } from "@/components/login-screen"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

function DashboardContent() {
  const router = useRouter()
  const { currentUser, currentRole } = useTaskContext()

  if (!currentUser || !currentRole) {
    return <LoginScreen />
  }

  return (
    <div className="flex flex-col h-screen">
      <AppHeader />
      <main className="flex-1 flex flex-col min-h-0 overflow-y-auto bg-background">
        {/* Header */}
        <div className="border-b border-border bg-card sticky top-0 z-10">
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
        <div className="p-4 lg:p-6 flex-1">
          <div className="max-w-6xl mx-auto">
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
      </main>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <TaskProvider>
      <DashboardContent />
    </TaskProvider>
  )
}
