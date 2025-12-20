import { Card, CardContent } from "@/components/ui/card"
import { Dna, FlaskConical, Atom, Calculator } from "lucide-react"

const subjects = [
  {
    icon: Dna,
    name: "Biology",
    emoji: "🧬",
    description: "Explore life sciences from cells to ecosystems",
    chapters: 24,
  },
  {
    icon: FlaskConical,
    name: "Chemistry",
    emoji: "🧪",
    description: "Master organic, inorganic, and physical chemistry",
    chapters: 20,
  },
  {
    icon: Atom,
    name: "Physics",
    emoji: "⚛️",
    description: "Understand mechanics, waves, and modern physics",
    chapters: 18,
  },
  {
    icon: Calculator,
    name: "Combined Maths",
    emoji: "🔢",
    description: "Excel in pure and applied mathematics",
    chapters: 22,
  },
]

export function SubjectsSection() {
  return (
    <section id="subjects" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-balance">
            Choose Your <span className="text-secondary text-glow-gold">Subjects</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Complete coverage for all A/L Science stream subjects
          </p>
        </div>

        {/* Subjects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {subjects.map((subject, index) => (
            <Card
              key={index}
              className="glass border-border/50 rounded-2xl group hover:glow-green cursor-pointer transition-all duration-300 hover:scale-105"
            >
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">{subject.emoji}</div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">{subject.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{subject.description}</p>
                <div className="text-xs text-primary font-medium">{subject.chapters} Chapters</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
