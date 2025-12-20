import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { User, Mail, Bell, Globe, Shield, LogOut } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 pt-16 lg:pt-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </div>

      <div className="max-w-3xl space-y-6">
        {/* Profile Settings */}
        <Card className="glass border-border/50 rounded-2xl">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-2xl">N</div>
              <div>
                <h3 className="font-semibold text-foreground">Nira Perera</h3>
                <p className="text-sm text-muted-foreground">A/L Science Student</p>
              </div>
              <Button variant="outline" size="sm" className="ml-auto bg-transparent">
                Change Photo
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Full Name</label>
                <Input defaultValue="Nira Perera" className="py-5 rounded-xl bg-input border-border/50" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Email</label>
                <Input
                  defaultValue="nira@example.com"
                  type="email"
                  className="py-5 rounded-xl bg-input border-border/50"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Exam Year</label>
                <Input defaultValue="2025" className="py-5 rounded-xl bg-input border-border/50" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">District</label>
                <Input defaultValue="Colombo" className="py-5 rounded-xl bg-input border-border/50" />
              </div>
            </div>

            <Button>Save Changes</Button>
          </CardContent>
        </Card>

        {/* Subjects */}
        <Card className="glass border-border/50 rounded-2xl">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Mail className="w-5 h-5 text-primary" />
              My Subjects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge className="bg-primary/20 text-primary px-3 py-1">Biology 🧬</Badge>
              <Badge className="bg-primary/20 text-primary px-3 py-1">Chemistry 🧪</Badge>
              <Badge className="bg-primary/20 text-primary px-3 py-1">Physics ⚛️</Badge>
            </div>
            <Button variant="outline" size="sm" className="bg-transparent">
              Edit Subjects
            </Button>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="glass border-border/50 rounded-2xl">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Bell className="w-5 h-5 text-primary" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: "Study Reminders", desc: "Daily study plan notifications" },
              { label: "Quiz Alerts", desc: "New quiz availability" },
              { label: "Progress Updates", desc: "Weekly progress reports" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between p-3 bg-input rounded-xl">
                <div>
                  <p className="font-medium text-foreground text-sm">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
                <div className="w-12 h-6 bg-primary/20 rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-primary rounded-full" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Language */}
        <Card className="glass border-border/50 rounded-2xl">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Globe className="w-5 h-5 text-primary" />
              Language
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3">
              <Button className="flex-1">English</Button>
              <Button variant="outline" className="flex-1 bg-transparent">
                සිංහල
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="glass border-destructive/30 rounded-2xl">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2 text-destructive">
              <Shield className="w-5 h-5" />
              Danger Zone
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full bg-transparent text-destructive border-destructive/50">
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
            <Button variant="outline" className="w-full bg-transparent text-destructive border-destructive/50">
              Delete Account
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
