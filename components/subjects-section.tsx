import { Card, CardContent } from "@/components/ui/card"
import { Dna, FlaskConical, Atom, Calculator, ArrowRight } from "lucide-react"

const subjects = [
  {
    icon: Dna,
    name: "Biology",
    emoji: "🧬",
    description: "Explore life sciences from cells to ecosystems",
    chapters: 24,
    gradient: "from-green-500 to-emerald-600",
    bgGradient: "from-green-50 to-emerald-50",
  },
  {
    icon: FlaskConical,
    name: "Chemistry",
    emoji: "🧪",
    description: "Master organic, inorganic, and physical chemistry",
    chapters: 20,
    gradient: "from-purple-500 to-purple-600",
    bgGradient: "from-purple-50 to-purple-100",
  },
  {
    icon: Atom,
    name: "Physics",
    emoji: "⚛️",
    description: "Understand mechanics, waves, and modern physics",
    chapters: 18,
    gradient: "from-blue-500 to-blue-600",
    bgGradient: "from-blue-50 to-blue-100",
  },
  {
    icon: Calculator,
    name: "Combined Maths",
    emoji: "🔢",
    description: "Excel in pure and applied mathematics",
    chapters: 22,
    gradient: "from-orange-500 to-amber-500",
    bgGradient: "from-orange-50 to-amber-50",
  },
]

export function SubjectsSection() {
  return (
    <section id="subjects" className="py-24 bg-gray-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-4">
            Subjects
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900 text-balance">Choose Your Subjects</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Complete coverage for all A/L Science stream subjects
          </p>
        </div>

        {/* Subjects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {subjects.map((subject, index) => (
            <Card
              key={index}
              className="bg-white border border-gray-200 rounded-2xl group hover:shadow-xl hover:shadow-purple-500/10 cursor-pointer transition-all duration-300 hover:-translate-y-1"
            >
              <CardContent className="p-6">
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${subject.bgGradient} flex items-center justify-center mb-5`}
                >
                  <span className="text-2xl">{subject.emoji}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{subject.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{subject.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-purple-600">{subject.chapters} Chapters</span>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
