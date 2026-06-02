export const MODULES = {
  ca: {
    id: 'ca',
    name: 'CA / Accountant',
    hindi: 'Chartered Accountant',
    icon: '📋',
    color: 'var(--ca)',
    colorDim: 'var(--ca-dim)',
    price: 99,
    tasks: [
      { id: 'gst_notice', label: 'GST Notice Reply', hindi: 'GST Notice ka Jawab' },
      { id: 'client_reminder', label: 'Client Reminder Letter', hindi: 'Client ko Reminder' },
      { id: 'itd_response', label: 'ITD / CBIC Response', hindi: 'Income Tax Response' },
      { id: 'engagement_letter', label: 'Engagement Letter', hindi: 'Engagement Letter' },
    ],
    fields: {
      gst_notice: [
        { id: 'notice_text', label: 'Paste the notice or describe it', hindi: 'Notice yahan paste karein', type: 'textarea', required: true },
        { id: 'gstin', label: 'GSTIN (optional)', hindi: 'GSTIN number', type: 'text', required: false },
        { id: 'language', label: 'Language', type: 'select', options: ['English', 'Hindi', 'Hinglish'], required: true },
      ],
      client_reminder: [
        { id: 'client_name', label: 'Client Name', hindi: 'Client ka naam', type: 'text', required: true },
        { id: 'reason', label: 'What is the reminder for?', hindi: 'Kisliye reminder?', type: 'textarea', required: true },
        { id: 'language', label: 'Language', type: 'select', options: ['English', 'Hindi', 'Hinglish'], required: true },
      ],
      itd_response: [
        { id: 'notice_text', label: 'Paste the ITD notice', hindi: 'ITD notice paste karein', type: 'textarea', required: true },
        { id: 'pan', label: 'PAN (optional)', type: 'text', required: false },
        { id: 'language', label: 'Language', type: 'select', options: ['English', 'Hindi', 'Hinglish'], required: true },
      ],
      engagement_letter: [
        { id: 'client_name', label: 'Client Name', hindi: 'Client ka naam', type: 'text', required: true },
        { id: 'services', label: 'Services to be provided', hindi: 'Kaunsi services?', type: 'textarea', required: true },
        { id: 'fee', label: 'Fee Amount', hindi: 'Fees kitni?', type: 'text', required: false },
        { id: 'language', label: 'Language', type: 'select', options: ['English', 'Hindi', 'Hinglish'], required: true },
      ],
    }
  },

  advocate: {
    id: 'advocate',
    name: 'Advocate / Legal',
    hindi: 'Vakil & Legal Clerk',
    icon: '⚖️',
    color: 'var(--advocate)',
    colorDim: 'var(--advocate-dim)',
    price: 99,
    tasks: [
      { id: 'legal_notice', label: 'Legal Notice', hindi: 'Legal Notice Banana' },
      { id: 'bail_points', label: 'Bail Application Points', hindi: 'Bail ke Points' },
      { id: 'clause_explain', label: 'Explain a Clause Simply', hindi: 'Clause Samjhao' },
      { id: 'client_update', label: 'Client Update Letter', hindi: 'Client ko Update' },
    ],
    fields: {
      legal_notice: [
        { id: 'to_name', label: 'Notice to (Name)', hindi: 'Kisko bhejni hai?', type: 'text', required: true },
        { id: 'reason', label: 'Reason for notice', hindi: 'Kisliye notice?', type: 'textarea', required: true },
        { id: 'demand', label: 'What are you demanding?', hindi: 'Kya maang rahe hain?', type: 'textarea', required: true },
        { id: 'language', label: 'Language', type: 'select', options: ['English', 'Hindi', 'Hinglish'], required: true },
      ],
      bail_points: [
        { id: 'case_details', label: 'Case details / FIR summary', hindi: 'Case ki details', type: 'textarea', required: true },
        { id: 'accused_info', label: 'Accused background (family, job, etc)', hindi: 'Accused ki jaankari', type: 'textarea', required: false },
        { id: 'language', label: 'Language', type: 'select', options: ['English', 'Hindi', 'Hinglish'], required: true },
      ],
      clause_explain: [
        { id: 'clause_text', label: 'Paste the clause', hindi: 'Clause paste karein', type: 'textarea', required: true },
        { id: 'language', label: 'Explain in', type: 'select', options: ['Simple English', 'Simple Hindi'], required: true },
      ],
      client_update: [
        { id: 'client_name', label: 'Client Name', hindi: 'Client ka naam', type: 'text', required: true },
        { id: 'update', label: 'What is the update?', hindi: 'Kya update hai?', type: 'textarea', required: true },
        { id: 'language', label: 'Language', type: 'select', options: ['English', 'Hindi', 'Hinglish'], required: true },
      ],
    }
  },

  student: {
    id: 'student',
    name: 'Student',
    hindi: 'Class 9–12, JEE, NEET, UPSC',
    icon: '📚',
    color: 'var(--student)',
    colorDim: 'var(--student-dim)',
    price: 49,
    tasks: [
      { id: 'explain', label: 'Explain a Concept', hindi: 'Concept Samjhao' },
      { id: 'practice', label: 'Generate Practice Questions', hindi: 'Practice Questions Banao' },
      { id: 'check_answer', label: 'Check My Answer', hindi: 'Mera Jawab Check Karo' },
      { id: 'summarize', label: 'Summarize a Chapter', hindi: 'Chapter Summary' },
    ],
    fields: {
      explain: [
        { id: 'topic', label: 'Topic or concept', hindi: 'Kaunsa topic?', type: 'text', required: true },
        { id: 'class', label: 'Class / Exam', type: 'select', options: ['Class 6','Class 7','Class 8','Class 9','Class 10','Class 11','Class 12','JEE','NEET','UPSC','CA Foundation'], required: true },
        { id: 'subject', label: 'Subject', type: 'select', options: ['Maths','Physics','Chemistry','Biology','History','Geography','Economics','Accountancy','Business Studies','English','Hindi','Science'], required: true },
        { id: 'language', label: 'Explain in', type: 'select', options: ['Simple Hindi', 'Simple English', 'Hinglish'], required: true },
      ],
      practice: [
        { id: 'chapter', label: 'Chapter or topic', hindi: 'Kaunsa chapter?', type: 'text', required: true },
        { id: 'class', label: 'Class / Exam', type: 'select', options: ['Class 6','Class 7','Class 8','Class 9','Class 10','Class 11','Class 12','JEE','NEET','UPSC','CA Foundation'], required: true },
        { id: 'subject', label: 'Subject', type: 'select', options: ['Maths','Physics','Chemistry','Biology','History','Geography','Economics','Accountancy','Business Studies','English','Hindi','Science'], required: true },
        { id: 'type', label: 'Question type', type: 'select', options: ['MCQ (Board style)','Short answer','Long answer','Numericals'], required: true },
      ],
      check_answer: [
        { id: 'question', label: 'The question', hindi: 'Sawaal kya tha?', type: 'textarea', required: true },
        { id: 'answer', label: 'Your answer', hindi: 'Aapka jawab', type: 'textarea', required: true },
        { id: 'class', label: 'Class / Exam', type: 'select', options: ['Class 9','Class 10','Class 11','Class 12','JEE','NEET','UPSC'], required: true },
      ],
      summarize: [
        { id: 'chapter', label: 'Chapter name or paste text', hindi: 'Chapter ka naam ya text', type: 'textarea', required: true },
        { id: 'class', label: 'Class', type: 'select', options: ['Class 6','Class 7','Class 8','Class 9','Class 10','Class 11','Class 12'], required: true },
        { id: 'subject', label: 'Subject', type: 'select', options: ['Maths','Physics','Chemistry','Biology','History','Geography','Economics','Accountancy','Business Studies','English','Hindi','Science'], required: true },
        { id: 'language', label: 'Summary in', type: 'select', options: ['Hindi', 'English', 'Hinglish'], required: true },
      ],
    }
  },

  kirana: {
    id: 'kirana',
    name: 'Kirana / Shop Owner',
    hindi: 'Vyapari & Dukandar',
    icon: '🏪',
    color: 'var(--kirana)',
    colorDim: 'var(--kirana-dim)',
    price: 49,
    tasks: [
      { id: 'supplier_letter', label: 'Supplier Complaint / Request', hindi: 'Supplier ko Letter' },
      { id: 'customer_reply', label: 'Reply to Customer', hindi: 'Customer ko Jawab' },
      { id: 'job_ad', label: 'Job Advertisement', hindi: 'Naukri ka Ad' },
      { id: 'order_confirmation', label: 'Order Confirmation', hindi: 'Order Confirm Karo' },
    ],
    fields: {
      supplier_letter: [
        { id: 'supplier_name', label: 'Supplier name', hindi: 'Supplier ka naam', type: 'text', required: true },
        { id: 'issue', label: 'What is the issue?', hindi: 'Kya problem hai?', type: 'textarea', required: true },
        { id: 'language', label: 'Language', type: 'select', options: ['Hindi', 'English', 'Hinglish'], required: true },
      ],
      customer_reply: [
        { id: 'complaint', label: 'What did the customer say?', hindi: 'Customer ne kya kaha?', type: 'textarea', required: true },
        { id: 'situation', label: 'Your side of the story', hindi: 'Aapki baat', type: 'textarea', required: false },
        { id: 'language', label: 'Language', type: 'select', options: ['Hindi', 'English', 'Hinglish'], required: true },
      ],
      job_ad: [
        { id: 'role', label: 'Job role', hindi: 'Kaunsi naukri?', type: 'text', required: true },
        { id: 'requirements', label: 'Requirements', hindi: 'Kya chahiye?', type: 'textarea', required: false },
        { id: 'salary', label: 'Salary (optional)', hindi: 'Salary kitni?', type: 'text', required: false },
        { id: 'language', label: 'Language', type: 'select', options: ['Hindi', 'English', 'Hinglish'], required: true },
      ],
      order_confirmation: [
        { id: 'customer_name', label: 'Customer name', hindi: 'Customer ka naam', type: 'text', required: true },
        { id: 'items', label: 'Items ordered', hindi: 'Kya order kiya?', type: 'textarea', required: true },
        { id: 'delivery', label: 'Delivery date / details', hindi: 'Delivery kab?', type: 'text', required: false },
        { id: 'language', label: 'Language', type: 'select', options: ['Hindi', 'English', 'Hinglish'], required: true },
      ],
    }
  },

  doctor: {
    id: 'doctor',
    name: 'Doctor / Clinic',
    hindi: 'Doctor & Medical Staff',
    icon: '🩺',
    color: 'var(--doctor)',
    colorDim: 'var(--doctor-dim)',
    price: 99,
    tasks: [
      { id: 'referral', label: 'Patient Referral Letter', hindi: 'Referral Letter' },
      { id: 'certificate', label: 'Medical Certificate', hindi: 'Medical Certificate' },
      { id: 'appointment', label: 'Appointment Reminder', hindi: 'Appointment Reminder' },
      { id: 'patient_letter', label: 'Patient Communication', hindi: 'Patient ko Letter' },
    ],
    fields: {
      referral: [
        { id: 'patient_name', label: 'Patient name', type: 'text', required: true },
        { id: 'diagnosis', label: 'Diagnosis / condition', type: 'textarea', required: true },
        { id: 'referred_to', label: 'Referred to (doctor/department)', type: 'text', required: true },
        { id: 'reason', label: 'Reason for referral', type: 'textarea', required: true },
      ],
      certificate: [
        { id: 'patient_name', label: 'Patient name', type: 'text', required: true },
        { id: 'condition', label: 'Condition / illness', type: 'textarea', required: true },
        { id: 'rest_days', label: 'Rest recommended (days)', type: 'text', required: false },
        { id: 'purpose', label: 'Purpose of certificate', type: 'select', options: ['Office/Work leave','School/College','Insurance','Legal','Other'], required: true },
      ],
      appointment: [
        { id: 'patient_name', label: 'Patient name', type: 'text', required: true },
        { id: 'date_time', label: 'Appointment date & time', type: 'text', required: true },
        { id: 'doctor', label: 'Doctor name', type: 'text', required: false },
        { id: 'language', label: 'Language', type: 'select', options: ['English', 'Hindi', 'Hinglish'], required: true },
      ],
      patient_letter: [
        { id: 'patient_name', label: 'Patient name', type: 'text', required: true },
        { id: 'message', label: 'What do you want to communicate?', type: 'textarea', required: true },
        { id: 'language', label: 'Language', type: 'select', options: ['English', 'Hindi', 'Hinglish'], required: true },
      ],
    }
  },

  freelancer: {
    id: 'freelancer',
    name: 'Freelancer',
    hindi: 'Designer, Developer, Creator',
    icon: '💼',
    color: 'var(--freelancer)',
    colorDim: 'var(--freelancer-dim)',
    price: 49,
    tasks: [
      { id: 'proposal', label: 'Client Proposal', hindi: 'Client Proposal' },
      { id: 'invoice_followup', label: 'Invoice Follow-up', hindi: 'Payment Maango' },
      { id: 'project_brief', label: 'Project Brief', hindi: 'Project Brief Banao' },
      { id: 'linkedin_bio', label: 'LinkedIn Bio', hindi: 'LinkedIn Bio' },
    ],
    fields: {
      proposal: [
        { id: 'client_name', label: 'Client name', type: 'text', required: true },
        { id: 'project', label: 'Project description', type: 'textarea', required: true },
        { id: 'rate', label: 'Your rate / budget', type: 'text', required: false },
        { id: 'skills', label: 'Your relevant skills', type: 'textarea', required: true },
      ],
      invoice_followup: [
        { id: 'client_name', label: 'Client name', type: 'text', required: true },
        { id: 'amount', label: 'Amount due', type: 'text', required: true },
        { id: 'days_overdue', label: 'Days overdue', type: 'text', required: true },
        { id: 'tone', label: 'Tone', type: 'select', options: ['Polite first reminder','Firm second reminder','Final warning'], required: true },
      ],
      project_brief: [
        { id: 'project', label: 'Project name / type', type: 'text', required: true },
        { id: 'goals', label: 'Goals and deliverables', type: 'textarea', required: true },
        { id: 'timeline', label: 'Timeline', type: 'text', required: false },
        { id: 'client', label: 'Client industry / context', type: 'text', required: false },
      ],
      linkedin_bio: [
        { id: 'name', label: 'Your name', type: 'text', required: true },
        { id: 'skills', label: 'Your skills / expertise', type: 'textarea', required: true },
        { id: 'experience', label: 'Years of experience + notable work', type: 'textarea', required: true },
        { id: 'goal', label: 'What are you looking for?', type: 'text', required: false },
      ],
    }
  }
}

export const MODULE_ORDER = ['ca', 'advocate', 'student', 'kirana', 'doctor', 'freelancer']
