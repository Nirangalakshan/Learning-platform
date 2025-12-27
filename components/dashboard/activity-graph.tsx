"use client";

import { useMemo } from "react";
import { useTheme } from "next-themes";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { Clock, TrendingUp, Calendar, Zap, Activity } from "lucide-react";
import {
  format,
  subDays,
  isSameDay,
  startOfDay,
  differenceInDays,
} from "date-fns";

interface Session {
  id: string;
  session_start: string;
  session_end: string | null;
  duration_seconds: number | null;
}

interface ActivityGraphProps {
  sessions: Session[];
}

export function ActivityGraph({ sessions }: ActivityGraphProps) {
  const { theme } = useTheme();
  const tickColor = theme === "dark" ? "#ffffff" : "#000000";

  const stats = useMemo(() => {
    const today = new Date();
    const sortedSessions = [...sessions].sort(
      (a, b) =>
        new Date(b.session_start).getTime() -
        new Date(a.session_start).getTime()
    );

    // 1. Today's study time
    const todaySessions = sessions.filter((s) =>
      isSameDay(new Date(s.session_start), today)
    );
    const todaySeconds = todaySessions.reduce(
      (acc, curr) => acc + (curr.duration_seconds || 0),
      0
    );

    // 2. Weekly hours graph data
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const d = subDays(today, 6 - i);
      return {
        date: d,
        dayName: format(d, "EEE"), // Mon, Tue...
        fullDate: format(d, "MMM dd"),
        seconds: 0,
      };
    });

    sessions.forEach((session) => {
      const sessionDate = new Date(session.session_start);
      // Find matching day in last7Days
      const dayStat = last7Days.find((d) => isSameDay(d.date, sessionDate));
      if (dayStat) {
        dayStat.seconds += session.duration_seconds || 0;
      }
    });

    const chartData = last7Days.map((d) => ({
      name: d.dayName,
      hours: parseFloat((d.seconds / 3600).toFixed(1)),
      fullDate: d.fullDate,
    }));

    // 3. Study streak
    // Calculate consecutive days with at least one session, working backwards from today
    let streak = 0;
    // Check if there's activity today to start streak count
    // Or if the last activity was yesterday
    // Let's settle on: Current active streak.

    // Get unique days with activity sorted descending
    const daysWithActivity = Array.from(
      new Set(
        sessions.map((s) => startOfDay(new Date(s.session_start)).toISOString())
      )
    )
      .map((d) => new Date(d))
      .sort((a, b) => b.getTime() - a.getTime());

    if (daysWithActivity.length > 0) {
      if (isSameDay(daysWithActivity[0], startOfDay(today))) {
        streak = 1;
        for (let i = 0; i < daysWithActivity.length - 1; i++) {
          const current = daysWithActivity[i];
          const prev = daysWithActivity[i + 1];
          if (differenceInDays(current, prev) === 1) {
            streak++;
          } else {
            break;
          }
        }
      } else if (differenceInDays(today, daysWithActivity[0]) === 1) {
        // Streak continues if active yesterday
        streak = 1; // Count yesterday as 1? Usually streak implies up to now.
        // If user has not studied today, streak might be 0 or pending.
        // Let's count consecutive days including yesterday if today is empty.
        for (let i = 0; i < daysWithActivity.length - 1; i++) {
          const current = daysWithActivity[i];
          const prev = daysWithActivity[i + 1];
          if (differenceInDays(current, prev) === 1) {
            streak++;
          } else {
            break;
          }
        }
      } else {
        streak = 0;
      }
    }

    // 4. Average session duration
    const totalDuration = sessions.reduce(
      (acc, curr) => acc + (curr.duration_seconds || 0),
      0
    );
    const avgDurationSeconds =
      sessions.length > 0 ? totalDuration / sessions.length : 0;

    return {
      todayHours: (todaySeconds / 3600).toFixed(1),
      todayMinutes: Math.round(todaySeconds / 60),
      chartData,
      streak,
      avgSessionMinutes: Math.round(avgDurationSeconds / 60),
    };
  }, [sessions]);

  return (
    <Card className="glass border-primary/20 backdrop-blur-sm shadow-xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-xl font-bold">
            <Activity className="w-5 h-5 text-primary" />
            Study Activity
          </CardTitle>
          <div className="text-sm text-muted-foreground">Last 7 Days</div>
        </div>
        <CardDescription>
          Target your daily goals and keep the streak alive!
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-full bg-primary/20">
                <Clock className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground">Today</span>
            </div>
            <div className="text-2xl font-bold text-foreground">
              {stats.todayMinutes < 60
                ? `${stats.todayMinutes}m`
                : `${stats.todayHours}h`}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-blue-500/5 border border-blue-500/10">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-full bg-blue-500/20">
                <Zap className="w-4 h-4 text-blue-500" />
              </div>
              <span className="text-sm text-muted-foreground">Streak</span>
            </div>
            <div className="text-2xl font-bold text-foreground">
              {stats.streak}{" "}
              <span className="text-sm font-normal text-muted-foreground">
                days
              </span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-orange-500/5 border border-orange-500/10">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-full bg-orange-500/20">
                <Calendar className="w-4 h-4 text-orange-500" />
              </div>
              <span className="text-sm text-muted-foreground">Avg Session</span>
            </div>
            <div className="text-2xl font-bold text-foreground">
              {stats.todayHours}hrs
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-green-500/5 border border-green-500/10">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-full bg-green-500/20">
                <TrendingUp className="w-4 h-4 text-green-500" />
              </div>
              <span className="text-sm text-muted-foreground">Weekly Goal</span>
            </div>
            <div className="text-2xl font-bold text-foreground">
              {/* Just a placeholder or calculated metric */}
              85%
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="h-[300px] w-full mt-4 text-[#009966] dark:text-[#ffffff]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={stats.chartData}>
              <defs>
                <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="currentColor"
                    stopOpacity={0.3}
                  />
                  <stop offset="95%" stopColor="currentColor" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="hsl(var(--border))"
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: tickColor, fontSize: 12 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: tickColor, fontSize: 12 }}
                tickFormatter={(value) => `${value}h`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--popover))",
                  borderRadius: "5px",
                  border: "1px solid hsl(var(--border))",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
                formatter={(value: number) => [`${value} hours`, "Study Time"]}
                labelStyle={{
                  color: "hsl(var(--foreground))",
                  marginBottom: "4px",
                }}
                cursor={{
                  stroke: "currentColor",
                  strokeWidth: 2,
                  strokeDasharray: "4 4",
                }}
              />
              <Area
                type="monotone"
                dataKey="hours"
                stroke="currentColor"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorHours)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
