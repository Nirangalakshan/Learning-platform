"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  AlertTriangle,
  CheckCircle2,
  Beaker,
  Shield,
  Eye,
  Timer,
  ListChecks,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ExperimentViewerProps {
  experiment: {
    id: string;
    title: string;
    description: string;
    difficulty: string;
    duration: string;
    category: string;
    safetyLevel: string;
  };
  onBack: () => void;
  onComplete: () => void;
  isCompleted: boolean;
}

const experimentDetails: Record<string, any> = {
  "exp-1": {
    aim: "To determine the concentration of a given acid solution by titrating it against a standard solution of sodium hydroxide using phenolphthalein indicator.",
    theory:
      "Titration is a quantitative analytical technique used to determine the concentration of an unknown solution. In acid-base titration, an acid reacts with a base to form salt and water. The equivalence point is reached when the moles of acid equal the moles of base.",
    materials: [
      "Burette (50 ml)",
      "Pipette (10 ml or 20 ml)",
      "Conical flask",
      "Beaker",
      "Funnel",
      "White tile",
      "Standard NaOH solution (0.1 M)",
      "Unknown acid solution",
      "Phenolphthalein indicator",
    ],
    safety: [
      "Wear safety goggles and lab coat at all times",
      "Handle NaOH with care - it's corrosive",
      "Clean up any spills immediately",
      "Wash hands after the experiment",
      "Do not pipette by mouth - use a pipette bulb",
    ],
    procedure: [
      "Rinse the burette with distilled water and then with the NaOH solution",
      "Fill the burette with standard NaOH solution and note the initial reading",
      "Pipette 10 ml or 20 ml of the acid solution into a clean conical flask",
      "Add 2-3 drops of phenolphthalein indicator to the flask",
      "Place the flask on a white tile under the burette",
      "Add NaOH solution slowly with constant swirling",
      "The endpoint is reached when the solution turns from colorless to pink",
      "Note the final burette reading",
      "Repeat the titration at least 3 times for accurate results",
      "Calculate the average titre value and determine the concentration",
    ],
    observations: [
      "Initial burette reading: _____ ml",
      "Final burette reading: _____ ml",
      "Volume of NaOH used (titre): _____ ml",
      "Color change: Colorless → Pink",
      "Concordant readings (within 0.1 ml)",
    ],
    calculations:
      "Use the formula: M₁V₁ = M₂V₂\nWhere M₁ = Molarity of acid (unknown)\nV₁ = Volume of acid\nM₂ = Molarity of base (0.1 M)\nV₂ = Average titre value",
    result: "The concentration of the given acid solution is _____ mol/L",
  },
  "exp-2": {
    aim: "To prepare soap from vegetable oil through the saponification process.",
    theory:
      "Saponification is the hydrolysis of an ester in the presence of a strong base to form an alcohol and the salt of a carboxylic acid. When vegetable oil (triglyceride) reacts with sodium hydroxide, it produces glycerol and sodium salts of fatty acids (soap).",
    materials: [
      "Vegetable oil (20 ml)",
      "Sodium hydroxide solution (20% w/v)",
      "Sodium chloride (common salt)",
      "Ethanol (20 ml)",
      "Beaker (250 ml)",
      "Glass rod",
      "Bunsen burner or hot plate",
      "Wire gauze",
      "Filter paper",
      "Funnel",
    ],
    safety: [
      "Wear gloves - NaOH is highly corrosive",
      "Wear safety goggles to protect eyes",
      "Work in a well-ventilated area",
      "Do not heat ethanol over open flame",
      "Keep flammable materials away from heat source",
      "If NaOH contacts skin, rinse immediately with water",
    ],
    procedure: [
      "Take 20 ml of vegetable oil in a beaker",
      "Add 20 ml of 20% NaOH solution to the oil",
      "Add 20 ml of ethanol to the mixture",
      "Heat the mixture gently with constant stirring for 15-20 minutes",
      "Do not allow the mixture to boil",
      "When the mixture becomes thick and pasty, stop heating",
      "Add saturated salt solution to precipitate the soap",
      "Cool the mixture and collect the soap by filtration",
      "Wash the soap with cold water",
      "Press between filter papers to remove excess water",
      "Allow to dry",
    ],
    observations: [
      "Initial mixture: Oil and NaOH form two layers",
      "After heating: Thick, pasty consistency",
      "After adding salt: Soap precipitates out",
      "Final product: Solid soap cake",
      "Color: Light yellow to white",
    ],
    calculations: "Not applicable for this qualitative experiment",
    result:
      "Soap was successfully prepared by saponification of vegetable oil with sodium hydroxide.",
  },
  "exp-3": {
    aim: "To identify unknown salt through systematic qualitative analysis.",
    theory:
      "Qualitative analysis involves identifying the cations and anions present in a salt through systematic chemical tests. This includes preliminary tests (color, flame test) and wet tests using specific reagents.",
    materials: [
      "Unknown salt sample",
      "Test tubes",
      "Test tube holder",
      "Bunsen burner",
      "Platinum wire",
      "Dilute HCl",
      "Dilute H₂SO₄",
      "Dilute HNO₃",
      "NaOH solution",
      "NH₄OH solution",
      "Various reagents for specific tests",
    ],
    safety: [
      "Handle acids with care",
      "Work in fume hood when heating",
      "Wear safety goggles",
      "Do not taste or smell chemicals directly",
      "Dispose of chemicals properly",
    ],
    procedure: [
      "Note the color and physical state of the salt",
      "Perform flame test for metallic ions",
      "Test solubility in water",
      "Perform preliminary tests with dilute acids",
      "Test for cations using group reagents",
      "Test for anions using specific reagents",
      "Confirm with confirmatory tests",
      "Identify the salt based on results",
    ],
    observations: [
      "Color of salt: _____",
      "Flame test result: _____",
      "Solubility: _____",
      "Cation identified: _____",
      "Anion identified: _____",
    ],
    calculations: "Not applicable",
    result: "The given salt is identified as _____",
  },
  "exp-4": {
    aim: "To determine the pH of various solutions using universal indicator and pH paper.",
    theory:
      "pH is a measure of hydrogen ion concentration in a solution. It ranges from 0-14, where pH < 7 is acidic, pH = 7 is neutral, and pH > 7 is basic. Universal indicator shows different colors at different pH values.",
    materials: [
      "pH paper/Universal indicator",
      "Test tubes",
      "Test tube rack",
      "Various solutions (HCl, NaOH, vinegar, soap solution, lemon juice, milk, water)",
      "Dropper",
      "pH color chart",
    ],
    safety: [
      "Wear safety goggles",
      "Handle acids and bases carefully",
      "Clean up spills immediately",
      "Do not mix concentrated acids and bases",
    ],
    procedure: [
      "Take small amount of each solution in separate test tubes",
      "Dip pH paper into the solution or add indicator drops",
      "Compare the color with standard pH chart",
      "Record the pH value",
      "Classify as acidic, basic, or neutral",
      "Test all given solutions",
      "Tabulate the results",
    ],
    observations: [
      "Solution tested, Color observed, pH value, Nature (acidic/basic/neutral)",
    ],
    calculations: "Not applicable",
    result: "pH values of various solutions have been determined successfully.",
  },
  "exp-5": {
    aim: "To construct a simple galvanic cell and understand electrochemical reactions.",
    theory:
      "A galvanic cell converts chemical energy into electrical energy through spontaneous redox reactions. It consists of two half-cells with different electrode potentials. Electrons flow from the anode (oxidation) to the cathode (reduction).",
    materials: [
      "Zinc strip",
      "Copper strip",
      "Zinc sulfate solution (1M)",
      "Copper sulfate solution (1M)",
      "Salt bridge (KCl or KNO₃)",
      "Two beakers",
      "Voltmeter",
      "Connecting wires",
      "Sandpaper",
    ],
    safety: [
      "Wear gloves when handling metal salts",
      "Clean metal strips properly",
      "Do not short circuit the cell",
      "Dispose of solutions properly",
    ],
    procedure: [
      "Clean zinc and copper strips with sandpaper",
      "Take ZnSO₄ solution in one beaker and CuSO₄ in another",
      "Dip zinc strip in ZnSO₄ and copper strip in CuSO₄",
      "Connect the two beakers with a salt bridge",
      "Connect zinc strip to negative terminal of voltmeter",
      "Connect copper strip to positive terminal",
      "Note the voltage reading",
      "Observe any changes in the electrodes",
      "Measure voltage at intervals",
    ],
    observations: [
      "Initial voltage: _____ V",
      "Electrode reactions observed",
      "Changes in solution color",
      "Voltage variation with time",
    ],
    calculations:
      "Calculate theoretical EMF using standard electrode potentials:\nE°cell = E°cathode - E°anode",
    result: "A galvanic cell was constructed and EMF measured as _____ V",
  },
  "exp-6": {
    aim: "To study the effect of concentration and temperature on the rate of reaction between sodium thiosulfate and hydrochloric acid.",
    theory:
      "The rate of a chemical reaction is influenced by various factors including concentration of reactants and temperature. According to collision theory, increasing concentration or temperature increases the frequency of effective collisions.",
    materials: [
      "Sodium thiosulfate solution (various concentrations)",
      "Dilute HCl",
      "Conical flask",
      "Paper with 'X' mark",
      "Stopwatch",
      "Thermometer",
      "Water bath",
      "Burette or measuring cylinder",
    ],
    safety: [
      "Handle acids carefully",
      "Work in ventilated area (SO₂ gas produced)",
      "Wear safety goggles",
      "Do not inhale fumes directly",
    ],
    procedure: [
      "Draw a clear 'X' on paper and place it under the flask",
      "Add measured volume of sodium thiosulfate to the flask",
      "Add HCl and start the stopwatch immediately",
      "Swirl gently and observe from above",
      "Stop the timer when 'X' is no longer visible",
      "Record the time",
      "Repeat with different concentrations",
      "Repeat at different temperatures",
      "Plot graphs of rate vs concentration and rate vs temperature",
    ],
    observations: [
      "Concentration, Volume of Na₂S₂O₃, Volume of HCl, Time taken, Rate (1/time)",
    ],
    calculations:
      "Rate of reaction = 1/time taken\nPlot: Rate vs Concentration and Rate vs Temperature",
    result:
      "Rate of reaction increases with increase in concentration and temperature.",
  },
  "exp-7": {
    aim: "To prepare aspirin (acetylsalicylic acid) by acetylation of salicylic acid.",
    theory:
      "Aspirin is synthesized by the esterification of salicylic acid with acetic anhydride in the presence of an acid catalyst. This is an important pharmaceutical synthesis.",
    materials: [
      "Salicylic acid (2 g)",
      "Acetic anhydride (5 ml)",
      "Concentrated H₂SO₄ (few drops)",
      "Ice cold water",
      "Ethanol",
      "Conical flask",
      "Filter paper",
      "Funnel",
      "Water bath",
    ],
    safety: [
      "Acetic anhydride is corrosive - handle with care",
      "Work in fume hood",
      "Concentrated H₂SO₄ is highly corrosive",
      "Wear gloves and goggles",
      "Do not inhale vapors",
    ],
    procedure: [
      "Take 2 g of salicylic acid in a dry conical flask",
      "Add 5 ml of acetic anhydride",
      "Add 2-3 drops of concentrated H₂SO₄ (catalyst)",
      "Heat the mixture in water bath at 50-60°C for 10-15 minutes",
      "Cool the mixture and add ice cold water slowly",
      "Crystals of aspirin will precipitate",
      "Filter and wash with cold water",
      "Recrystallize from ethanol if needed",
      "Dry and weigh the product",
      "Calculate percentage yield",
    ],
    observations: [
      "Weight of salicylic acid: 2 g",
      "Theoretical yield calculation",
      "Actual yield: _____ g",
      "Appearance: White crystals",
      "Melting point: ~135°C",
    ],
    calculations: "Percentage yield = (Actual yield / Theoretical yield) × 100",
    result: "Aspirin was successfully synthesized with a yield of _____",
  },
  "exp-8": {
    aim: "To identify metal cations based on characteristic flame colors.",
    theory:
      "When metal salts are heated in a flame, electrons absorb energy and jump to higher energy levels. When they return to ground state, they emit light of characteristic wavelengths, producing specific flame colors.",
    materials: [
      "Bunsen burner",
      "Platinum or nichrome wire",
      "Dilute HCl",
      "Metal salt samples (Na⁺, K⁺, Ca²⁺, Sr²⁺, Ba²⁺, Cu²⁺)",
      "Watch glass",
    ],
    safety: [
      "Tie back long hair",
      "Wear safety goggles",
      "Be careful with open flame",
      "Clean wire between tests",
      "Work in well-lit but not too bright area",
    ],
    procedure: [
      "Clean the platinum wire by dipping in HCl and heating in flame",
      "Continue until wire produces no color in the flame",
      "Dip the clean wire in HCl, then in the salt sample",
      "Hold the wire in the hottest part of the flame",
      "Observe and note the color produced",
      "Clean the wire before testing next sample",
      "Repeat for all samples",
      "Match colors with known standards",
    ],
    observations: [
      "Sodium (Na⁺): Golden yellow/Bright orange",
      "Potassium (K⁺): Lilac/Violet",
      "Calcium (Ca²⁺): Brick red/Orange-red",
      "Strontium (Sr²⁺): Crimson red",
      "Barium (Ba²⁺): Apple green",
      "Copper (Cu²⁺): Blue-green",
    ],
    calculations: "Not applicable",
    result:
      "Metal cations were identified based on their characteristic flame colors.",
  },
};

export function ExperimentViewer({
  experiment,
  onBack,
  onComplete,
  isCompleted,
}: ExperimentViewerProps) {
  const [activeStep, setActiveStep] = useState(0);
  const details = experimentDetails[experiment.id] || {};

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Experiments
        </Button>
        {!isCompleted && (
          <Button onClick={onComplete} className="gap-2">
            <CheckCircle2 className="w-4 h-4" />
            Mark as Completed
          </Button>
        )}
        {isCompleted && (
          <Badge className="gap-2 bg-green-500/10 text-green-600 dark:text-green-400">
            <CheckCircle2 className="w-4 h-4" />
            Completed
          </Badge>
        )}
      </div>

      {/* Experiment Details Card */}
      <Card className="glass border-border/50">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-2xl mb-2">
                {experiment.title}
              </CardTitle>
              <CardDescription>{experiment.description}</CardDescription>
            </div>
            <div className="flex gap-2">
              <Badge variant="outline">{experiment.category}</Badge>
              <Badge variant="outline">{experiment.difficulty}</Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Tabs for different sections */}
      <Tabs defaultValue="procedure" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="aim">Aim</TabsTrigger>
          <TabsTrigger value="theory">Theory</TabsTrigger>
          <TabsTrigger value="materials">Materials</TabsTrigger>
          <TabsTrigger value="safety">Safety</TabsTrigger>
          <TabsTrigger value="procedure">Procedure</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
        </TabsList>

        {/* Aim */}
        <TabsContent value="aim" className="mt-6">
          <Card className="glass border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-primary" />
                Aim of the Experiment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg leading-relaxed">{details.aim}</p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Theory */}
        <TabsContent value="theory" className="mt-6">
          <Card className="glass border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Beaker className="w-5 h-5 text-primary" />
                Theory & Background
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-base leading-relaxed whitespace-pre-line">
                {details.theory}
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Materials */}
        <TabsContent value="materials" className="mt-6">
          <Card className="glass border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ListChecks className="w-5 h-5 text-primary" />
                Materials Required
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {details.materials?.map((item: string, index: number) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Safety */}
        <TabsContent value="safety" className="mt-6">
          <Card className="glass border-border/50 border-orange-500/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-600 dark:text-orange-400">
                <Shield className="w-5 h-5" />
                Safety Precautions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {details.safety?.map((item: string, index: number) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-lg bg-orange-500/5"
                  >
                    <AlertTriangle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Procedure */}
        <TabsContent value="procedure" className="mt-6">
          <Card className="glass border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Timer className="w-5 h-5 text-primary" />
                Step-by-Step Procedure
              </CardTitle>
              <CardDescription>
                Estimated time: {experiment.duration}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {details.procedure?.map((step: string, index: number) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                      {index + 1}
                    </div>
                    <div className="flex-1 pt-1">
                      <p className="leading-relaxed">{step}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Results */}
        <TabsContent value="results" className="mt-6">
          <div className="space-y-4">
            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle>Observations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {details.observations?.map((obs: string, index: number) => (
                    <p key={index} className="text-muted-foreground">
                      • {obs}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>

            {details.calculations &&
              details.calculations !== "Not applicable" && (
                <Card className="glass border-border/50">
                  <CardHeader>
                    <CardTitle>Calculations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <pre className="whitespace-pre-wrap font-mono text-sm bg-muted p-4 rounded-lg">
                      {details.calculations}
                    </pre>
                  </CardContent>
                </Card>
              )}

            <Card className="glass border-border/50 border-green-500/30">
              <CardHeader>
                <CardTitle className="text-green-600 dark:text-green-400">
                  Result
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg">{details.result}</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
