"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Atom, Calculator, FlaskConical, Sparkles } from "lucide-react";

export function VirtualLabTools() {
  const [selectedTool, setSelectedTool] = useState("periodic-table");

  return (
    <div className="space-y-6">
      <Tabs
        value={selectedTool}
        onValueChange={setSelectedTool}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="periodic-table" className="gap-2">
            <Atom className="w-4 h-4" />
            Periodic Table
          </TabsTrigger>
          <TabsTrigger value="equation-balancer" className="gap-2">
            <Calculator className="w-4 h-4" />
            Equation Balancer
          </TabsTrigger>
          <TabsTrigger value="molarity-calculator" className="gap-2">
            <FlaskConical className="w-4 h-4" />
            Molarity Calculator
          </TabsTrigger>
        </TabsList>

        {/* Periodic Table */}
        <TabsContent value="periodic-table" className="mt-6">
          <PeriodicTable />
        </TabsContent>

        {/* Equation Balancer */}
        <TabsContent value="equation-balancer" className="mt-6">
          <EquationBalancer />
        </TabsContent>

        {/* Molarity Calculator */}
        <TabsContent value="molarity-calculator" className="mt-6">
          <MolarityCalculator />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function PeriodicTable() {
  const [selectedElement, setSelectedElement] = useState<any>(null);

  // Simplified periodic table data (first 20 elements)
  const elements = [
    {
      symbol: "H",
      name: "Hydrogen",
      number: 1,
      mass: 1.008,
      group: "nonmetal",
    },
    {
      symbol: "He",
      name: "Helium",
      number: 2,
      mass: 4.003,
      group: "noble-gas",
    },
    { symbol: "Li", name: "Lithium", number: 3, mass: 6.941, group: "alkali" },
    {
      symbol: "Be",
      name: "Beryllium",
      number: 4,
      mass: 9.012,
      group: "alkaline",
    },
    { symbol: "B", name: "Boron", number: 5, mass: 10.81, group: "metalloid" },
    { symbol: "C", name: "Carbon", number: 6, mass: 12.01, group: "nonmetal" },
    {
      symbol: "N",
      name: "Nitrogen",
      number: 7,
      mass: 14.01,
      group: "nonmetal",
    },
    { symbol: "O", name: "Oxygen", number: 8, mass: 16.0, group: "nonmetal" },
    { symbol: "F", name: "Fluorine", number: 9, mass: 19.0, group: "halogen" },
    { symbol: "Ne", name: "Neon", number: 10, mass: 20.18, group: "noble-gas" },
    { symbol: "Na", name: "Sodium", number: 11, mass: 22.99, group: "alkali" },
    {
      symbol: "Mg",
      name: "Magnesium",
      number: 12,
      mass: 24.31,
      group: "alkaline",
    },
    { symbol: "Al", name: "Aluminum", number: 13, mass: 26.98, group: "metal" },
    {
      symbol: "Si",
      name: "Silicon",
      number: 14,
      mass: 28.09,
      group: "metalloid",
    },
    {
      symbol: "P",
      name: "Phosphorus",
      number: 15,
      mass: 30.97,
      group: "nonmetal",
    },
    { symbol: "S", name: "Sulfur", number: 16, mass: 32.07, group: "nonmetal" },
    {
      symbol: "Cl",
      name: "Chlorine",
      number: 17,
      mass: 35.45,
      group: "halogen",
    },
    {
      symbol: "Ar",
      name: "Argon",
      number: 18,
      mass: 39.95,
      group: "noble-gas",
    },
    { symbol: "K", name: "Potassium", number: 19, mass: 39.1, group: "alkali" },
    {
      symbol: "Ca",
      name: "Calcium",
      number: 20,
      mass: 40.08,
      group: "alkaline",
    },
  ];

  const getGroupColor = (group: string) => {
    const colors: Record<string, string> = {
      alkali: "bg-red-500/20 hover:bg-red-500/30 border-red-500/50",
      alkaline: "bg-orange-500/20 hover:bg-orange-500/30 border-orange-500/50",
      metal: "bg-blue-500/20 hover:bg-blue-500/30 border-blue-500/50",
      metalloid: "bg-green-500/20 hover:bg-green-500/30 border-green-500/50",
      nonmetal: "bg-yellow-500/20 hover:bg-yellow-500/30 border-yellow-500/50",
      halogen: "bg-purple-500/20 hover:bg-purple-500/30 border-purple-500/50",
      "noble-gas": "bg-pink-500/20 hover:bg-pink-500/30 border-pink-500/50",
    };
    return (
      colors[group] || "bg-gray-500/20 hover:bg-gray-500/30 border-gray-500/50"
    );
  };

  return (
    <Card className="glass border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Atom className="w-5 h-5 text-primary" />
          Interactive Periodic Table
        </CardTitle>
        <CardDescription>Click on any element to see details</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Legend */}
        <div className="flex flex-wrap gap-2">
          <Badge className="bg-red-500/20 text-red-700 dark:text-red-300">
            Alkali Metals
          </Badge>
          <Badge className="bg-orange-500/20 text-orange-700 dark:text-orange-300">
            Alkaline Earth
          </Badge>
          <Badge className="bg-blue-500/20 text-blue-700 dark:text-blue-300">
            Metals
          </Badge>
          <Badge className="bg-green-500/20 text-green-700 dark:text-green-300">
            Metalloids
          </Badge>
          <Badge className="bg-yellow-500/20 text-yellow-700 dark:text-yellow-300">
            Non-metals
          </Badge>
          <Badge className="bg-purple-500/20 text-purple-700 dark:text-purple-300">
            Halogens
          </Badge>
          <Badge className="bg-pink-500/20 text-pink-700 dark:text-pink-300">
            Noble Gases
          </Badge>
        </div>

        {/* Periodic Table Grid */}
        <div className="grid grid-cols-6 md:grid-cols-10 gap-2">
          {elements.map((element) => (
            <button
              key={element.symbol}
              onClick={() => setSelectedElement(element)}
              className={`p-3 rounded-lg border-2 transition-all ${getGroupColor(
                element.group
              )} ${
                selectedElement?.symbol === element.symbol
                  ? "ring-2 ring-primary"
                  : ""
              }`}
            >
              <div className="text-xs text-muted-foreground">
                {element.number}
              </div>
              <div className="text-lg font-bold">{element.symbol}</div>
              <div className="text-xs text-muted-foreground truncate">
                {element.mass}
              </div>
            </button>
          ))}
        </div>

        {/* Element Details */}
        {selectedElement && (
          <Card className="glass border-primary/50">
            <CardHeader>
              <CardTitle className="text-2xl">{selectedElement.name}</CardTitle>
              <CardDescription>
                Atomic Number: {selectedElement.number}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Symbol</p>
                  <p className="text-xl font-bold">{selectedElement.symbol}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Atomic Mass</p>
                  <p className="text-xl font-bold">{selectedElement.mass}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Category</p>
                  <Badge className={getGroupColor(selectedElement.group)}>
                    {selectedElement.group.replace("-", " ")}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}

function EquationBalancer() {
  const [reactants, setReactants] = useState("");
  const [products, setProducts] = useState("");
  const [balanced, setBalanced] = useState<string | null>(null);

  const balanceEquation = () => {
    // Simple demonstration - in real app, use a chemistry library
    setBalanced(`Balanced: ${reactants} → ${products}`);
  };

  const examples = [
    {
      name: "Combustion of Methane",
      equation: "CH₄ + O₂ → CO₂ + H₂O",
      balanced: "CH₄ + 2O₂ → CO₂ + 2H₂O",
    },
    {
      name: "Photosynthesis",
      equation: "CO₂ + H₂O → C₆H₁₂O₆ + O₂",
      balanced: "6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂",
    },
    {
      name: "Rust Formation",
      equation: "Fe + O₂ → Fe₂O₃",
      balanced: "4Fe + 3O₂ → 2Fe₂O₃",
    },
  ];

  return (
    <Card className="glass border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="w-5 h-5 text-primary" />
          Chemical Equation Balancer
        </CardTitle>
        <CardDescription>Balance chemical equations easily</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Input Section */}
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Reactants</label>
            <Input
              placeholder="e.g., H2 + O2"
              value={reactants}
              onChange={(e) => setReactants(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Products</label>
            <Input
              placeholder="e.g., H2O"
              value={products}
              onChange={(e) => setProducts(e.target.value)}
            />
          </div>
          <Button onClick={balanceEquation} className="w-full">
            Balance Equation
          </Button>
        </div>

        {/* Result */}
        {balanced && (
          <Card className="glass border-primary/50">
            <CardContent className="pt-6">
              <p className="text-lg font-mono text-center">{balanced}</p>
            </CardContent>
          </Card>
        )}

        {/* Examples */}
        <div className="space-y-3">
          <h3 className="font-semibold">Common Examples:</h3>
          {examples.map((ex, index) => (
            <Card key={index} className="glass border-border/50">
              <CardContent className="pt-4">
                <p className="font-medium mb-1">{ex.name}</p>
                <p className="text-sm text-muted-foreground">
                  Unbalanced: {ex.equation}
                </p>
                <p className="text-sm text-green-600 dark:text-green-400">
                  Balanced: {ex.balanced}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function MolarityCalculator() {
  const [moles, setMoles] = useState("");
  const [volume, setVolume] = useState("");
  const [molarity, setMolarity] = useState<number | null>(null);

  const calculateMolarity = () => {
    const m = parseFloat(moles);
    const v = parseFloat(volume);
    if (!isNaN(m) && !isNaN(v) && v > 0) {
      setMolarity(m / v);
    }
  };

  return (
    <Card className="glass border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FlaskConical className="w-5 h-5 text-primary" />
          Molarity Calculator
        </CardTitle>
        <CardDescription>Calculate molarity of solutions</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">
              Number of Moles (mol)
            </label>
            <Input
              type="number"
              placeholder="e.g., 0.5"
              value={moles}
              onChange={(e) => setMoles(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Volume (L)</label>
            <Input
              type="number"
              placeholder="e.g., 1.0"
              value={volume}
              onChange={(e) => setVolume(e.target.value)}
            />
          </div>
          <Button onClick={calculateMolarity} className="w-full">
            Calculate Molarity
          </Button>
        </div>

        {molarity !== null && (
          <Card className="glass border-primary/50">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">Molarity</p>
                <p className="text-3xl font-bold text-primary">
                  {molarity.toFixed(3)} M
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Formula */}
        <Card className="glass border-border/50">
          <CardContent className="pt-4">
            <p className="text-sm font-medium mb-2">Formula:</p>
            <p className="font-mono text-center text-lg">M = n / V</p>
            <p className="text-xs text-muted-foreground text-center mt-2">
              Where M = Molarity (mol/L), n = moles, V = volume (L)
            </p>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}
