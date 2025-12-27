# Chemistry Lab Practicals - Quick Setup Guide

## 🎯 What's Included

### Pages & Routes

- **Main Page**: `/dashboard/lab-practicals`
  - Experiments library with 8 chemistry practicals
  - Progress tracking (completed vs total)
  - Three tabs: Experiments, Virtual Tools, Lab Reports

### Components Created

1. **ExperimentViewer** (`components/lab/experiment-viewer.tsx`)

   - Displays detailed experiment information
   - Tabs for: Aim, Theory, Materials, Safety, Procedure, Results
   - Mark as completed functionality

2. **VirtualLabTools** (`components/lab/virtual-lab-tools.tsx`)

   - Interactive periodic table (first 20 elements)
   - Chemical equation balancer with examples
   - Molarity calculator

3. **LabReportGenerator** (`components/lab/lab-report-generator.tsx`)
   - AI-powered report template generation
   - Manual report creation with form fields
   - Save, download, and delete reports
   - View all saved reports

### API Routes

- **POST** `/api/generate-lab-report` - AI-assisted lab report generation using Apilage AI

### Database Schema

- **Tables**:
  - `completed_experiments` - Track student progress
  - `lab_reports` - Store lab reports with all sections

## 🚀 Setup Instructions

### 1. Database Setup

```sql
-- Run this in Supabase SQL Editor
-- Copy from: supabase/lab-practicals-schema.sql
```

### 2. Verify Installation

- [x] Main page created at `app/dashboard/lab-practicals/page.tsx`
- [x] Components created in `components/lab/`
- [x] API route created at `app/api/generate-lab-report/route.ts`
- [x] Sidebar updated with new navigation item
- [x] Database schema file ready

### 3. Access the Feature

1. Navigate to your dashboard
2. Click "Lab Practicals" in the sidebar (flask icon 🧪)
3. Browse experiments, use virtual tools, or create lab reports

## 📚 8 Included Experiments

1. **Acid-Base Titration** (Medium, 45 min)

   - Analytical Chemistry
   - Medium safety risk

2. **Preparation of Soap** (Easy, 60 min)

   - Organic Chemistry
   - High safety risk (NaOH)

3. **Qualitative Analysis of Salts** (Hard, 90 min)

   - Inorganic Chemistry
   - Medium safety risk

4. **pH Determination** (Easy, 30 min)

   - Analytical Chemistry
   - Low safety risk

5. **Electrochemical Cells** (Medium, 50 min)

   - Physical Chemistry
   - Medium safety risk

6. **Rate of Reaction Study** (Medium, 60 min)

   - Physical Chemistry
   - Low safety risk

7. **Preparation of Organic Compounds** (Hard, 75 min)

   - Organic Chemistry
   - High safety risk

8. **Flame Test Analysis** (Easy, 25 min)
   - Inorganic Chemistry
   - Medium safety risk

## 🎨 Features

### Visual Design

- ✨ Gradient purple-pink theme for chemistry branding
- 📊 Progress statistics dashboard
- 🏷️ Color-coded difficulty and safety badges
- 🎯 Interactive experiment cards
- 📱 Fully responsive design

### Functionality

- ✅ Mark experiments as completed
- 💾 Save reports to Supabase
- ⬇️ Download reports as text files
- 🤖 AI template generation
- 🔍 Interactive periodic table
- ⚖️ Chemical equation balancer
- 🧮 Molarity calculator

## 🔧 Next Steps

### Required:

1. **Run the SQL schema** in your Supabase project:

   - Go to Supabase Dashboard → SQL Editor
   - Copy content from `supabase/lab-practicals-schema.sql`
   - Execute

2. **Test the feature**:
   - Visit `/dashboard/lab-practicals`
   - Try selecting an experiment
   - Test the virtual tools
   - Create a sample lab report

### Optional Enhancements:

- Add more experiments
- Enhance virtual tools (add more elements, better equation balancer)
- Add PDF export for reports
- Integrate with AI Assistant
- Add video demonstrations
- Create quiz section for experiments

## 📝 Notes

- All experiment data is currently static (can be moved to database if needed)
- AI generation uses your existing Apilage AI setup
- RLS policies ensure data privacy
- Reports can be downloaded for offline use

## 🐛 Troubleshooting

**If experiments don't show:**

- Check that the page loaded correctly
- Verify Supabase connection

**If AI generation fails:**

- Verify APILAGE_API_KEY and APILAGE_API_URL in .env.local
- Check API quota/limits

**If saving fails:**

- Run the database schema SQL
- Check Supabase connection
- Verify RLS policies are enabled

---

✅ **Ready to use!** Navigate to Lab Practicals in your dashboard.
