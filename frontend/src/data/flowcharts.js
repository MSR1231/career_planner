// frontend/src/data/flowcharts.js

export const flowcharts = {
  "Science & Technology": `
graph TD
    MBBS --> Doctor[Doctor | Industries: Hospitals, Clinics, Research | Exams: NEET PG, MD/MS | Entrepreneurship: Private Clinic]
    MBBS --> Surgeon[Surgeon | Industries: Hospitals, Clinics | Exams: NEET PG, MS | Entrepreneurship: Own Clinic]
    BDS --> Dentist[Dentist | Industries: Clinics, Hospitals | Exams: NEET-DENTAL, MDS | Private Practice]
    BAMS --> AyurvedicDoctor[Ayurvedic/Homeopathy Doctor | Industries: Wellness centers, Clinics | Exams: Licensing | Entrepreneurship: Own Clinic]
    BScNursing --> Nurse[Nurse | Industries: Hospitals, Healthcare | Higher Education: GNM, PG Nursing | Private Jobs: Hospitals]
    BPharm --> Pharmacist[Pharmacist | Industries: Pharma Companies, Hospitals | Exams/Higher Education: GPAT, MBA Pharma | Entrepreneurship: Pharmacy Shop]
    BTech --> SoftwareEngineer[Software Engineer | Industries: IT, Software | Exams: GATE, Certifications | Entrepreneurship: Startup]
    BTech --> CivilEngineer[Civil Engineer | Industries: Construction, Manufacturing | Exams: GATE | Entrepreneurship: Consultancy]
    BScCS --> DataAnalyst[Data Analyst | Industries: IT, Analytics | Higher Education: MSc, Certifications | Entrepreneurship: Freelance Projects]
    BArch --> Architect[Architect | Industries: Construction, Urban Planning | Exams/Higher Education: NATA, M.Arch | Entrepreneurship: Design Studio]
    Diploma --> Technician[Technician | Industries: Manufacturing, Production | Certifications | Entrepreneurship: Service Center]
`,

  "Arts & Humanities": `
graph TD
    BA --> Writer[Writer | Industries: Media, Publishing, Freelance | Higher Education: MA, NET | Entrepreneurship: Freelance Writing]
    BA --> Teacher[Teacher | Industries: Schools, Coaching | Exams: TET, NET | Higher Education: M.Ed | Entrepreneurship: Coaching Center]
    BFA --> Artist[Artist | Industries: Cultural, Media | Higher Education: PG Art | Entrepreneurship: Studio / Freelance]
    Music --> Performer[Performer | Industries: Cultural, Events | Certifications | Entrepreneurship: Own Studio / Freelance]
    BCom --> Accountant[Accountant | Industries: Banking, Corporates | Exams/Higher Ed: CA, CMA, CS | Entrepreneurship: Accounting Firm]
    BBA --> Manager[Manager | Industries: Business, Marketing | Higher Education: MBA | Entrepreneurship: Startup / Consulting]
`,

  "Commerce & Finance": `
graph TD
    BCom --> Accountant[Accountant | Industries: Banking, Audit, Corporate | Exams/Higher Ed: CA, CMA, CS, MBA Finance | Entrepreneurship: Accounting Firm]
    BCom --> FinanceExecutive[Finance Executive | Industries: Banks, Corporates | Higher Education: MBA, Certifications | Entrepreneurship: Consulting]
    BBA --> Manager[Manager | Industries: Business, Marketing | Higher Education: MBA | Entrepreneurship: Startup / Consulting]
    Economics --> Analyst[Analyst | Industries: Banks, Corporates, Research | Higher Education: MBA, CFA | Entrepreneurship: Consultancy]
    CommerceVocational --> TaxConsultant[Tax Consultant | Industries: Financial Services | Certifications: CPA, GST Practitioner | Entrepreneurship: Tax Firm]
`,

  "Vocational & Practical": `
graph TD
    DiplomaVoc --> Technician[Technician | Industries: Manufacturing, IT, Healthcare | Certifications: Job-specific | Entrepreneurship: Service Center]
    ITCert --> SoftwareDeveloper[Software Developer | Industries: IT, Startups | Certifications: Python, Java, Cloud | Entrepreneurship: Freelance Projects]
    Hospitality --> HotelManager[Hotel Manager | Industries: Tourism, Events | Certifications: Food Safety, Management | Entrepreneurship: Own Hotel / Event Company]
    TradeCraft --> Artisan[Artisan | Industries: Small Business, Freelance | Certifications: Skill-based | Entrepreneurship: Own Business / Workshop]
`
};