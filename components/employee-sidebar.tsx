"use client"

import { useTaskContext } from "@/lib/task-context"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { TopCompletersChart } from "@/components/top-completers-chart"
import { Users, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface EmployeeSidebarProps {
  selectedEmployeeId: string | null
  onSelectEmployee: (employeeId: string | null) => void
}

export function EmployeeSidebar({
  selectedEmployeeId,
  onSelectEmployee,
}: EmployeeSidebarProps) {
  const { allEmployees, tasks } = useTaskContext()

  const getEmployeeTaskStats = (employeeId: string) => {
    const employeeTasks = tasks.filter((t) => t.assigneeId === employeeId)
    const total = employeeTasks.length
    const inProgress = employeeTasks.filter(
      (t) => t.status === "in-progress"
    ).length
    const completed = employeeTasks.filter(
      (t) => t.status === "completed"
    ).length
    const overdue = employeeTasks.filter(
      (t) => t.status !== "completed" && new Date(t.dueDate) < new Date()
    ).length
    return { total, inProgress, completed, overdue }
  }

  return (
    <aside className="w-64 shrink-0 border-r border-border bg-card flex flex-col h-full">
      {/* Sidebar Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-primary" />
          <h2 className="text-sm font-semibold text-foreground">Team Overview</h2>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          {allEmployees.length} team members
        </p>
      </div>

      <ScrollArea className="flex-1">
        <div className="flex flex-col gap-4 p-3">
          {/* Performance Chart */}
          <div>
            <TopCompletersChart />
          </div>

          {/* Employees Section */}
          <div className="border-t border-border pt-3">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 mb-2">Employees</h3>
            <div className="flex flex-col gap-0.5">
          {/* All Employees option */}
          <button
            onClick={() => onSelectEmployee(null)}
            className={cn(
              "w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors",
              selectedEmployeeId === null
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-accent hover:text-foreground"
            )}
          >
            <div
              className={cn(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                selectedEmployeeId === null
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground"
              )}
            >
              <Users className="h-3.5 w-3.5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">All Employees</p>
              <p className="text-xs text-muted-foreground">
                {tasks.length} total tasks
              </p>
            </div>
            {selectedEmployeeId === null && (
              <ChevronRight className="h-3.5 w-3.5 shrink-0 text-primary" />
            )}
          </button>

          {/* Divider */}
          <div className="h-px bg-border mx-2 my-1.5" />

          {/* Employee List */}
          {allEmployees.map((employee) => {
            const stats = getEmployeeTaskStats(employee.id)
            const isSelected = selectedEmployeeId === employee.id
            const initials = employee.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()

            return (
              <button
                key={employee.id}
                onClick={() => onSelectEmployee(employee.id)}
                className={cn(
                  "w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors",
                  isSelected
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
              >
                <Avatar className="h-8 w-8 shrink-0">
                  <AvatarFallback
                    className={cn(
                      "text-xs font-medium",
                      isSelected
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-foreground"
                    )}
                  >
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p
                    className={cn(
                      "text-sm font-medium truncate",
                      isSelected ? "text-foreground" : ""
                    )}
                  >
                    {employee.name}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[11px]">
                      {stats.total} task{stats.total !== 1 ? "s" : ""}
                    </span>
                    {stats.inProgress > 0 && (
                      <span className="flex items-center gap-1 text-[11px] text-[hsl(var(--warning))]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--warning))]" />
                        {stats.inProgress}
                      </span>
                    )}
                    {stats.overdue > 0 && (
                      <span className="flex items-center gap-1 text-[11px] text-destructive">
                        <span className="h-1.5 w-1.5 rounded-full bg-destructive" />
                        {stats.overdue}
                      </span>
                    )}
                  </div>
                </div>
                {isSelected && (
                  <ChevronRight className="h-3.5 w-3.5 shrink-0 text-primary" />
                )}
              </button>
            )
          })}
            </div>
          </div>
        </div>
      </ScrollArea>
    </aside>
  )
}
