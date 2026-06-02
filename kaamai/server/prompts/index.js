// KaamAI — Prompt templates for all 6 modules
// Each prompt is India-specific, professional, and language-aware

function langInstruction(language) {
  if (!language) return 'Respond in English.'
  if (language === 'Hindi' || language === 'Simple Hindi') return 'Respond entirely in Hindi (Devanagari script).'
  if (language === 'Hinglish') return 'Respond in Hinglish — Hindi written in English letters mixed with English words, the way Indians naturally text and speak.'
  return 'Respond in English.'
}

// ─── CA MODULE ───────────────────────────────────────────────────────────────

const CA_SYSTEM = `You are a senior Chartered Accountant in India with 20 years of experience handling CBIC notices, GST audits, ITD correspondence, and client communications. You write professional, accurate, legally sound replies in formal Indian business letter format. You understand Indian tax law deeply — GST Acts, CGST/SGST/IGST distinctions, CBIC notice types (DRC-01, DRC-01A, ADT-01, SCN), income tax provisions, and standard CA firm letter formats. Always use formal Indian salutations, proper reference lines, and professional closings. Never use American or Western examples.`

function caPrompt(taskId, formData) {
  switch (taskId) {
    case 'gst_notice':
      return `${langInstruction(formData.language)}

A client has received the following GST notice/has this situation:
${formData.notice_text}
${formData.gstin ? `GSTIN: ${formData.gstin}` : ''}

Draft a professional, complete reply letter to the Jurisdictional GST Officer. Include:
- Proper reference to the notice
- Clear factual response addressing each point raised
- Relevant GST Act provisions cited where applicable
- Professional tone throughout
- Proper letter format with subject line, salutation, body paragraphs, and closing
- [Placeholder] for CA firm name, address, and membership number`

    case 'client_reminder':
      return `${langInstruction(formData.language)}

Draft a professional reminder letter from a CA firm to a client.
Client Name: ${formData.client_name}
Reason for reminder: ${formData.reason}

The letter should be firm but professional, maintain the client relationship, be clear about what is needed and when, and end with a polite but definite request for action. Use standard Indian CA firm letter format.`

    case 'itd_response':
      return `${langInstruction(formData.language)}

A client received this Income Tax Department notice:
${formData.notice_text}
${formData.pan ? `PAN: ${formData.pan}` : ''}

Draft a complete, professional response to the Assessing Officer. Include:
- Reference to the notice with section number if mentioned
- Point-by-point response to each query
- Relevant Income Tax Act sections cited
- Request for any relief or clarification needed
- Professional CA firm letter format with [Placeholder] for details`

    case 'engagement_letter':
      return `${langInstruction(formData.language)}

Draft a professional CA engagement letter for:
Client Name: ${formData.client_name}
Services to be provided: ${formData.services}
${formData.fee ? `Agreed fees: ${formData.fee}` : ''}

The letter should cover: scope of services, client responsibilities, fee structure, payment terms, confidentiality, limitation of liability, and professional standards compliance (ICAI guidelines). Use formal Indian CA firm format.`

    default:
      return `Help with CA task: ${taskId}. Details: ${JSON.stringify(formData)}`
  }
}

// ─── ADVOCATE MODULE ──────────────────────────────────────────────────────────

const ADVOCATE_SYSTEM = `You are a practicing advocate in India with 15 years of experience in civil, criminal, and commercial law. You draft precise legal notices, applications, and communications under Indian law. You cite relevant sections of IPC, CrPC, CPC, Consumer Protection Act, and other Indian statutes appropriately. Your writing is formal, legally sound, and follows Indian court and legal office conventions. You understand High Court and District Court procedures across India.`

function advocatePrompt(taskId, formData) {
  switch (taskId) {
    case 'legal_notice':
      return `${langInstruction(formData.language)}

Draft a formal legal notice for:
Notice to be sent to: ${formData.to_name}
Reason / grievance: ${formData.reason}
Demand / relief sought: ${formData.demand}

Include: proper heading "LEGAL NOTICE", date, address block [Placeholder], clear statement of facts, relevant legal provisions, specific demand with a response deadline of 15 days, consequences of non-compliance, and advocate's signature block [Placeholder]. The notice must be legally sound under Indian law.`

    case 'bail_points':
      return `${langInstruction(formData.language)}

Prepare strong bail application arguments for:
Case details / FIR summary: ${formData.case_details}
${formData.accused_info ? `Accused background: ${formData.accused_info}` : ''}

List the key legal points and arguments for bail under Section 437/439 CrPC (or BNSS equivalent). Include: nature of offence analysis, flight risk assessment, tampering with evidence risk, roots in community, family circumstances, likelihood of cooperation with investigation, relevant case law citations, and humanitarian grounds if applicable. Format as numbered points that an advocate can use directly in court.`

    case 'clause_explain':
      return `${formData.language === 'Simple Hindi' ? langInstruction('Simple Hindi') : 'Respond in very simple, plain English that a non-lawyer can understand.'}

Explain the following legal clause in simple, plain language. Avoid legal jargon. Use an everyday analogy if helpful. Then summarize in one sentence what it means practically for the person who has to sign or follow it.

Clause:
${formData.clause_text}`

    case 'client_update':
      return `${langInstruction(formData.language)}

Draft a professional letter from an advocate to a client with the following update:
Client Name: ${formData.client_name}
Update / information: ${formData.update}

The letter should be professional, clear, reassuring where appropriate, explain any next steps, and maintain client confidence. Use formal Indian legal letter format.`

    default:
      return `Help with advocate task: ${taskId}. Details: ${JSON.stringify(formData)}`
  }
}

// ─── STUDENT MODULE ───────────────────────────────────────────────────────────

const STUDENT_SYSTEM = `You are an expert tutor teaching Indian students from Class 6 to Class 12, and competitive exam aspirants (JEE, NEET, UPSC, CA Foundation). You explain concepts in simple language using relatable Indian examples — cricket, chai, Indian cities, Indian history, Bollywood where appropriate. You always highlight what is important for board exams (CBSE/ICSE/State boards). You use memory tricks and mnemonics. You follow NCERT syllabus structure. You never use Western or American examples when Indian ones work better.`

function studentPrompt(taskId, formData) {
  switch (taskId) {
    case 'explain':
      return `${langInstruction(formData.language)}

Explain the following concept clearly for a ${formData.class} student studying ${formData.subject}:
Topic: ${formData.topic}

Include:
1. Simple definition in one sentence
2. Detailed explanation using a relatable Indian example
3. A memory trick or mnemonic if helpful
4. Key points to remember for board/competitive exam
5. Two practice questions at the end

Keep it engaging, clear, and appropriate for ${formData.class} level.`

    case 'practice':
      return `Generate 5 ${formData.type} practice questions for:
Class/Exam: ${formData.class}
Subject: ${formData.subject}
Chapter/Topic: ${formData.chapter}

For each question provide:
- The question
- The correct answer
- A brief explanation of why that answer is correct
- Mark value (typical board exam weightage)

Make questions progressively harder (easy → medium → hard). Follow CBSE/NCERT pattern.`

    case 'check_answer':
      return `You are an experienced CBSE/Indian board examiner. Evaluate this student's answer:

Question: ${formData.question}
Student's Answer: ${formData.answer}
Class/Exam: ${formData.class}

Provide:
1. Score out of 10 (be fair, use Indian board marking standards)
2. What was correct — be specific and encouraging
3. What was missing or incorrect — be constructive
4. What the ideal answer should include (key points)
5. Examiner's tip for this type of question

Be encouraging but honest. Use the tone of a good teacher.`

    case 'summarize':
      return `${langInstruction(formData.language)}

Create a comprehensive exam-focused summary for:
Class: ${formData.class}
Subject: ${formData.subject}
Chapter: ${formData.chapter}

Include:
1. Chapter overview in 2-3 sentences
2. Key concepts (numbered list, each with brief explanation)
3. Important formulas / dates / definitions to memorize
4. Most likely exam questions from this chapter
5. Quick revision checklist — 5-7 bullet points

Format it so a student can revise the entire chapter in under 10 minutes. Follow NCERT/CBSE syllabus.`

    default:
      return `Help student with: ${taskId}. Details: ${JSON.stringify(formData)}`
  }
}

// ─── KIRANA MODULE ────────────────────────────────────────────────────────────

const KIRANA_SYSTEM = `You help Indian small business owners — kirana store owners, traders, shop owners, and vyaparis — write professional messages and letters. Your tone is respectful, clear, and practical. You understand Indian small business culture, relationships with suppliers (distributors/wholesalers), customer dynamics, and local business practices. You write in the language requested — Hindi, English, or Hinglish — keeping it simple and direct.`

function kiranaPrompt(taskId, formData) {
  switch (taskId) {
    case 'supplier_letter':
      return `${langInstruction(formData.language)}

Write a professional message/letter from a shop owner to their supplier:
Supplier Name: ${formData.supplier_name}
Issue/Request: ${formData.issue}

The message should be firm but maintain the business relationship. Be specific about the problem and what resolution is expected. Keep it short — 150-200 words maximum. Format as a WhatsApp-ready message that can also be sent as a letter.`

    case 'customer_reply':
      return `${langInstruction(formData.language)}

Write a professional reply from a shop owner to a customer complaint/query:
Customer complaint/query: ${formData.complaint}
${formData.situation ? `Shop owner's situation: ${formData.situation}` : ''}

The reply should acknowledge the customer, be apologetic where appropriate, explain the situation briefly, offer a solution or next step, and maintain a positive relationship. Keep it polite and professional. Format for WhatsApp/SMS.`

    case 'job_ad':
      return `${langInstruction(formData.language)}

Write a clear job advertisement for:
Role: ${formData.role}
${formData.requirements ? `Requirements: ${formData.requirements}` : ''}
${formData.salary ? `Salary: ${formData.salary}` : ''}

Make it suitable for posting in a WhatsApp group, local newspaper, or shop notice board. Include what the job involves, requirements, salary (if provided), and how to apply/contact. Keep it practical and attractive.`

    case 'order_confirmation':
      return `${langInstruction(formData.language)}

Write an order confirmation message for:
Customer: ${formData.customer_name}
Items ordered: ${formData.items}
${formData.delivery ? `Delivery: ${formData.delivery}` : ''}

Make it professional but friendly. Confirm the order details, mention delivery timeline, and invite them to contact for any changes. Format for WhatsApp.`

    default:
      return `Help kirana owner with: ${taskId}. Details: ${JSON.stringify(formData)}`
  }
}

// ─── DOCTOR MODULE ────────────────────────────────────────────────────────────

const DOCTOR_SYSTEM = `You assist Indian doctors and medical professionals in drafting clinical letters, certificates, and patient communications. You follow standard Indian medical documentation practices, MCI/NMC guidelines, and hospital letter formats. You write in formal medical English appropriate for Indian healthcare settings. You understand Indian hospital systems, referral networks, and patient communication norms. Never include actual medical advice — only help with documentation and communication.`

function doctorPrompt(taskId, formData) {
  switch (taskId) {
    case 'referral':
      return `Draft a professional patient referral letter:
Patient Name: ${formData.patient_name}
Diagnosis/Condition: ${formData.diagnosis}
Referred To: ${formData.referred_to}
Reason for Referral: ${formData.reason}

Include: date [placeholder], referring doctor details [placeholder], patient demographics [placeholder for age/sex], clinical summary, specific reason for referral, relevant investigations done, current medications if applicable, urgency level, and professional closing. Follow standard Indian hospital referral letter format.`

    case 'certificate':
      return `Draft a professional medical certificate:
Patient Name: ${formData.patient_name}
Condition/Illness: ${formData.condition}
${formData.rest_days ? `Rest Recommended: ${formData.rest_days} days` : ''}
Purpose: ${formData.purpose}

Include: certificate heading, date, doctor's statement, patient details [placeholder for age/address], medical findings summary, fitness/unfitness declaration, duration of rest if applicable, and doctor's stamp/signature block [placeholder]. Follow standard Indian medical certificate format.`

    case 'appointment':
      return `${langInstruction(formData.language)}

Write a professional appointment reminder message for:
Patient: ${formData.patient_name}
Date & Time: ${formData.date_time}
${formData.doctor ? `Doctor: ${formData.doctor}` : ''}

Include: warm greeting, appointment confirmation, clinic name [placeholder], any preparation instructions (e.g., fasting if applicable), contact number [placeholder] for rescheduling, and polite closing. Format for WhatsApp/SMS. Keep it brief and clear.`

    case 'patient_letter':
      return `${langInstruction(formData.language)}

Draft a professional communication from doctor/clinic to patient:
Patient: ${formData.patient_name}
Message/Information: ${formData.message}

The communication should be professional, compassionate, clear, and reassuring. Use simple language the patient can understand. Include clinic letterhead placeholder and doctor's name placeholder. Follow Indian medical communication standards.`

    default:
      return `Help doctor with: ${taskId}. Details: ${JSON.stringify(formData)}`
  }
}

// ─── FREELANCER MODULE ────────────────────────────────────────────────────────

const FREELANCER_SYSTEM = `You help Indian freelancers — designers, developers, content creators, and consultants — write professional client communications, proposals, and profile content. You understand the Indian freelance market, platforms like Fiverr, Upwork, and LinkedIn, and the nuances of working with both Indian and international clients. Your writing is confident, professional, and value-focused. You help freelancers present themselves and their work in the best possible light.`

function freelancerPrompt(taskId, formData) {
  switch (taskId) {
    case 'proposal':
      return `Write a compelling freelance project proposal:
Client: ${formData.client_name}
Project: ${formData.project}
${formData.rate ? `Rate/Budget: ${formData.rate}` : ''}
Relevant Skills: ${formData.skills}

The proposal should: open with understanding of their problem, briefly introduce relevant experience, outline your approach/process, mention timeline, state the rate clearly and confidently, include 1-2 relevant past results or examples (generic placeholders if needed), and close with a clear call to action. Keep it under 300 words — clients don't read long proposals.`

    case 'invoice_followup':
      return `Write a ${formData.tone.toLowerCase()} email/message for payment follow-up:
Client: ${formData.client_name}
Amount Due: ${formData.amount}
Days Overdue: ${formData.days_overdue} days

The message should be professional throughout. ${formData.tone.includes('Polite') ? 'Assume good faith — maybe they forgot.' : formData.tone.includes('Firm') ? 'Make clear this cannot be delayed further.' : 'Make it absolutely clear this is the last reminder before formal action.'} Include invoice reference [placeholder], payment details [placeholder], and a clear deadline for payment.`

    case 'project_brief':
      return `Write a clear, professional project brief:
Project: ${formData.project}
Goals and Deliverables: ${formData.goals}
${formData.timeline ? `Timeline: ${formData.timeline}` : ''}
${formData.client ? `Client Context: ${formData.client}` : ''}

Include: project overview, specific deliverables (numbered list), timeline with milestones, assumptions and out-of-scope items, communication process, revision policy, and payment terms structure. This brief protects both freelancer and client — make it thorough but readable.`

    case 'linkedin_bio':
      return `Write a compelling LinkedIn About section (bio) for an Indian freelancer:
Name: ${formData.name}
Skills/Expertise: ${formData.skills}
Experience: ${formData.experience}
${formData.goal ? `Looking for: ${formData.goal}` : ''}

The bio should: open with a strong hook (not "I am a..."), highlight specific expertise and results, mention years of experience, include a human touch, end with what they are looking for/offering. Keep it under 200 words. Write in first person. Make it stand out from generic Indian LinkedIn profiles — no clichés like "passionate" or "result-oriented".`

    default:
      return `Help freelancer with: ${taskId}. Details: ${JSON.stringify(formData)}`
  }
}

// ─── ROUTER ───────────────────────────────────────────────────────────────────

function getSystemPrompt(moduleId) {
  switch (moduleId) {
    case 'ca': return CA_SYSTEM
    case 'advocate': return ADVOCATE_SYSTEM
    case 'student': return STUDENT_SYSTEM
    case 'kirana': return KIRANA_SYSTEM
    case 'doctor': return DOCTOR_SYSTEM
    case 'freelancer': return FREELANCER_SYSTEM
    default: return 'You are a helpful Indian professional assistant.'
  }
}

function getUserPrompt(moduleId, taskId, formData) {
  switch (moduleId) {
    case 'ca': return caPrompt(taskId, formData)
    case 'advocate': return advocatePrompt(taskId, formData)
    case 'student': return studentPrompt(taskId, formData)
    case 'kirana': return kiranaPrompt(taskId, formData)
    case 'doctor': return doctorPrompt(taskId, formData)
    case 'freelancer': return freelancerPrompt(taskId, formData)
    default: return `Help with ${moduleId} / ${taskId}: ${JSON.stringify(formData)}`
  }
}

module.exports = { getSystemPrompt, getUserPrompt }
