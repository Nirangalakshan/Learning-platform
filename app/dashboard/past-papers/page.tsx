import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Download, Eye, Search, Calendar, Filter } from "lucide-react"

const papers = [
  {
    id: "1",
    year: "2023",
    subject: "Biology",
    paper: "Paper I",
    type: "MCQ",
    hasSolutions: true,
  },
  {
    id: "2",
    year: "2023",
    subject: "Biology",
    paper: "Paper II",
    type: "Essay",
    hasSolutions: true,
  },
  {
    id: "3",
    year: "2022",
    subject: "Chemistry",
    paper: "Paper I",
    type: "MCQ",
    hasSolutions: true,
  },
  {
    id: "4",
    year: "2022",
    subject: "Physics",
    paper: "Paper II",
    type: "Essay",
    hasSolutions: false,
  },
  {
    id: "5",
    year: "2021",
    subject: "Combined Maths",
    paper: "Paper I",
    type: "Pure Maths",
    hasSolutions: true,
  },
  {
    id: "6",
    year: "2021",
    subject: "Combined Maths",
    paper: "Paper II",
    type: "Applied Maths",
    hasSolutions: true,
  },
]

const years = ["2023", "2022", "2021", "2020", "2019", "2018"]

export default function PastPapersPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 pt-16 lg:pt-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Past Papers</h1>
        <p className="text-muted-foreground">Access 15 years of A/L past papers with solutions</p>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input placeholder="Search papers..." className="pl-10 py-5 rounded-xl bg-input border-border/50" />
        </div>
        <Button variant="outline" className="gap-2 bg-transparent">
          <Filter className="w-4 h-4" />
          Filters
        </Button>
      </div>

      {/* Year Pills */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-6">
        <Badge className="bg-primary text-primary-foreground px-4 py-2 cursor-pointer">All Years</Badge>
        {years.map((year) => (
          <Badge
            key={year}
            variant="secondary"
            className="px-4 py-2 cursor-pointer hover:bg-primary/20 transition-colors"
          >
            {year}
          </Badge>
        ))}
      </div>

      {/* Papers by Subject */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="glass">
          <TabsTrigger value="all">All Subjects</TabsTrigger>
          <TabsTrigger value="biology">Biology</TabsTrigger>
          <TabsTrigger value="chemistry">Chemistry</TabsTrigger>
          <TabsTrigger value="physics">Physics</TabsTrigger>
          <TabsTrigger value="maths">Maths</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {papers.map((paper) => (
              <Card
                key={paper.id}
                className="glass border-border/50 rounded-2xl hover:border-primary/50 transition-all"
              >
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <FileText className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      {paper.year}
                    </div>
                  </div>

                  <h3 className="font-semibold text-foreground mb-1">
                    {paper.subject} - {paper.paper}
                  </h3>
                  <div className="flex items-center gap-2 mb-4">
                    <Badge variant="secondary">{paper.type}</Badge>
                    {paper.hasSolutions && <Badge className="bg-primary/20 text-primary">Solutions Available</Badge>}
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button size="sm" className="flex-1">
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {["biology", "chemistry", "physics", "maths"].map((subject) => (
          <TabsContent key={subject} value={subject} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {papers
                .filter((p) => p.subject.toLowerCase().includes(subject === "maths" ? "maths" : subject))
                .map((paper) => (
                  <Card
                    key={paper.id}
                    className="glass border-border/50 rounded-2xl hover:border-primary/50 transition-all"
                  >
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                          <FileText className="w-6 h-6 text-primary" />
                        </div>
                        <span className="text-sm text-muted-foreground">{paper.year}</span>
                      </div>
                      <h3 className="font-semibold text-foreground mb-1">{paper.paper}</h3>
                      <Badge variant="secondary" className="mb-4">
                        {paper.type}
                      </Badge>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                          View
                        </Button>
                        <Button size="sm" className="flex-1">
                          Download
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
