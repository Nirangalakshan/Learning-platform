# Chemistry Lab Practicals Feature 🧪

## Overview

The Chemistry Lab Practicals feature provides students with:

- **8 Comprehensive Experiments** with detailed procedures
- **Virtual Lab Tools** including periodic table, equation balancer, and molarity calculator
- **AI-Powered Lab Reports** with automatic template generation
- **Progress Tracking** for completed experiments
- **Report Management** to save, view, and download lab reports

## Features

### 1. Experiments Library

- **Acid-Base Titration** - Learn quantitative analysis
- **Soap Preparation** - Understand saponification
- **Qualitative Salt Analysis** - Identify unknown compounds
- **pH Determination** - Master acid-base concepts
- **Electrochemical Cells** - Explore redox reactions
- **Reaction Rates** - Study kinetics
- **Organic Synthesis** - Prepare organic compounds
- **Flame Tests** - Identify metal ions

Each experiment includes:

- Clear aim and objectives
- Theoretical background
- Materials list
- Safety precautions
- Step-by-step procedure
- Observation templates
- Calculation guidelines
- Expected results

### 2. Virtual Lab Tools

- **Interactive Periodic Table** - Click elements for details
- **Chemical Equation Balancer** - Balance equations easily
- **Molarity Calculator** - Calculate solution concentrations

### 3. Lab Report Generator

- AI-assisted template generation
- Manual editing capabilities
- Save reports to database
- Download as text files
- Track all previous reports

### 4. Progress Tracking

- Mark experiments as completed
- View completion statistics
- Track learning progress

## Database Setup

### Required Tables

Run the SQL schema file to create necessary tables:

```bash
# Navigate to your Supabase project
# Go to SQL Editor
# Copy and paste the contents of: supabase/lab-practicals-schema.sql
# Execute the SQL
```

### Tables Created:

1. **completed_experiments**

   - Tracks which experiments students have completed
   - Fields: id, user_id, experiment_id, completed_at

2. **lab_reports**
   - Stores student lab reports
   - Fields: id, user_id, experiment_id, experiment_title, aim, observations, calculations, result, conclusion, created_at, updated_at

Both tables have Row Level Security (RLS) policies enabled to ensure data privacy.

## File Structure

```
app/
  api/
    generate-lab-report/
      route.ts              # API for AI lab report generation
  dashboard/
    lab-practicals/
      page.tsx              # Main lab practicals page
components/
  lab/
    experiment-viewer.tsx   # Detailed experiment view
    lab-report-generator.tsx # Report creation interface
    virtual-lab-tools.tsx   # Virtual chemistry tools
supabase/
  lab-practicals-schema.sql # Database schema
```

## Usage

### For Students:

1. **Browse Experiments**: Navigate to Lab Practicals from the dashboard
2. **Select an Experiment**: Click on any experiment card to view details
3. **Study the Procedure**: Read through aim, theory, materials, safety, and procedure
4. **Mark as Complete**: Once performed, mark the experiment as completed
5. **Create Lab Report**: Go to Reports tab and generate an AI template or create manually
6. **Use Virtual Tools**: Access periodic table and calculators from Virtual Tools tab

### For Developers:

All experiment data is currently hardcoded in the main page component. To add new experiments:

1. Add to the `experiments` array in `app/dashboard/lab-practicals/page.tsx`
2. Add detailed content to `experimentDetails` in `components/lab/experiment-viewer.tsx`

## API Endpoints

### POST `/api/generate-lab-report`

Generates an AI-assisted lab report template.

**Request Body:**

```json
{
  "experimentTitle": "Acid-Base Titration",
  "experimentId": "exp-1"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "aim": "...",
    "observations": "...",
    "calculations": "...",
    "result": "...",
    "conclusion": "..."
  }
}
```

## Customization

### Adding New Experiments

1. Add to the experiments array
2. Include all required fields: id, title, description, difficulty, duration, category, safetyLevel
3. Add corresponding detailed content in experimentDetails object

### Modifying Virtual Tools

Edit `components/lab/virtual-lab-tools.tsx` to:

- Add more elements to periodic table
- Enhance equation balancer logic
- Add new calculators (e.g., dilution calculator, pH calculator)

## Future Enhancements

- [ ] Video demonstrations for experiments
- [ ] Interactive 3D molecular visualizations
- [ ] Quiz section for each experiment
- [ ] Peer review system for lab reports
- [ ] Export reports as PDF
- [ ] Add more virtual lab tools
- [ ] Integration with AI Assistant for experiment-specific help
- [ ] Collaborative experiments
- [ ] AR/VR lab simulations

## Safety Notice

⚠️ **Important**: This is an educational tool. Always perform actual lab experiments under proper supervision with appropriate safety equipment and in a well-equipped laboratory environment.

## Support

For issues or feature requests, please contact the development team.

---

Built with Next.js, React, Supabase, and Apilage AI ✨
