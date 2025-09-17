export const flowcharts = {
  "Science & Technology": `
graph TD
  MBBS("MBBS"):::degree --> Doctor["Doctor: Hospitals, Clinics, Research, NEET PG, MD/MS"]:::career
  MBBS --> Surgeon["Surgeon: Hospitals, NEET PG, MS"]:::career
  BDS("BDS"):::degree --> Dentist["Dentist: Clinics, NEET-DENTAL"]:::career
  BAMS("BAMS"):::degree --> AyurvedicDoctor["Ayurvedic Doctor: Licensing"]:::career
  BScNursing("BSc Nursing"):::degree --> Nurse["Nurse: GNM, PG Nursing"]:::career
  BPharm("BPharm"):::degree --> Pharmacist["Pharmacist: GPAT, MBA Pharma"]:::career
  BTech("BTech"):::degree --> SoftwareEngineer["Software Engineer: GATE"]:::career
  BTech --> CivilEngineer["Civil Engineer: GATE"]:::career
  BScCS("BSc CS"):::degree --> DataAnalyst["Data Analyst: MSc, Certifications"]:::career
  BArch("BArch"):::degree --> Architect["Architect: NATA, M.Arch"]:::career
  Diploma("Diploma"):::degree --> Technician["Technician: Certifications"]:::career

  classDef degree fill:#4A90E2,color:#fff,stroke:#1C5CBC,stroke-width:2px,font-size:18px;
  classDef career fill:#F5A623,color:#000,stroke:#D48806,stroke-width:2px,font-size:16px;
  
  click Doctor "https://en.wikipedia.org/wiki/Physician" "More about Doctor careers"
  click Surgeon "https://en.wikipedia.org/wiki/Surgeon" "More about Surgeon careers"
  click Dentist "https://en.wikipedia.org/wiki/Dentistry" "More about Dentistry"
  click AyurvedicDoctor "https://en.wikipedia.org/wiki/Ayurveda" "About Ayurvedic Medicine"
  click Nurse "https://en.wikipedia.org/wiki/Nursing" "Nursing careers"
  click Pharmacist "https://en.wikipedia.org/wiki/Pharmacist" "Pharmacist profession"
  click SoftwareEngineer "https://en.wikipedia.org/wiki/Software_engineer" "Software Engineer role"
  click CivilEngineer "https://en.wikipedia.org/wiki/Civil_engineering" "Civil Engineering"
  click DataAnalyst "https://en.wikipedia.org/wiki/Data_analysis" "Data Analyst"
  click Architect "https://en.wikipedia.org/wiki/Architectural_profession" "Architect profession"
  click Technician "https://en.wikipedia.org/wiki/Technician" "Technician information"
`,

  "Arts & Humanities": `
graph TD
  BA("BA"):::degree --> Writer["Writer: MA, NET"]:::career
  BA --> Teacher["Teacher: TET, NET"]:::career
  BFA("BFA"):::degree --> Artist["Artist: PG Art"]:::career
  Music("Music"):::degree --> Performer["Performer: Cultural Events"]:::career
  BCom("BCom"):::degree --> Accountant["Accountant: CA, CMA, CS"]:::career
  BBA("BBA"):::degree --> Manager["Manager: MBA"]:::career

  classDef degree fill:#7ED6DF,color:#000,stroke:#2CA3C9,stroke-width:2px,font-size:18px;
  classDef career fill:#FFD460,color:#000,stroke:#B29A2F,stroke-width:2px,font-size:16px;

  click Writer "https://en.wikipedia.org/wiki/Writer"
  click Teacher "https://en.wikipedia.org/wiki/Teacher"
  click Artist "https://en.wikipedia.org/wiki/Artist"
  click Performer "https://en.wikipedia.org/wiki/Performer"
  click Accountant "https://en.wikipedia.org/wiki/Accountant"
  click Manager "https://en.wikipedia.org/wiki/Manager"
`,

  "Commerce & Finance": `
graph TD
  BCom("BCom"):::degree --> Accountant["Accountant: CA, MBA Finance"]:::career
  BCom --> FinanceExecutive["Finance Executive: MBA"]:::career
  BBA("BBA"):::degree --> Manager["Manager: MBA"]:::career
  Economics("Economics"):::degree --> Analyst["Analyst: CFA"]:::career
  CommerceVocational("Commerce Vocational"):::degree --> TaxConsultant["Tax Consultant: CPA, GST"]:::career

  classDef degree fill:#A971D8,color:#F9F9F9,stroke:#6525B4,stroke-width:2px,font-size:18px;
  classDef career fill:#FFD4D4,color:#000,stroke:#B1515F,stroke-width:2px,font-size:16px;

  click Accountant "https://en.wikipedia.org/wiki/Accountant"
  click FinanceExecutive "https://en.wikipedia.org/wiki/Financial_adviser"
  click Manager "https://en.wikipedia.org/wiki/Manager"
  click Analyst "https://en.wikipedia.org/wiki/Financial_analyst"
  click TaxConsultant "https://en.wikipedia.org/wiki/Tax_advisor"
`,

  "Vocational & Practical": `
graph TD
  DiplomaVoc("Diploma/Vocational"):::degree --> Technician["Technician"]:::career
  ITCert("IT Certification"):::degree --> SoftwareDeveloper["Software Developer"]:::career
  Hospitality("Hospitality"):::degree --> HotelManager["Hotel Manager"]:::career
  TradeCraft("Trade/Craft"):::degree --> Artisan["Artisan"]:::career

  classDef degree fill:#F7A541,color:#000,stroke:#C97806,stroke-width:2px,font-size:18px;
  classDef career fill:#F9D67E,color:#000,stroke:#B18E29,stroke-width:2px,font-size:16px;

  click Technician "https://en.wikipedia.org/wiki/Technician"
  click SoftwareDeveloper "https://en.wikipedia.org/wiki/Software_developer"
  click HotelManager "https://en.wikipedia.org/wiki/Hotel_manager"
  click Artisan "https://en.wikipedia.org/wiki/Artisan"
`
};
