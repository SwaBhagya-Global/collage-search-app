'use client';

type FAQ = {
  question: string;
  answer: string;
};

const homepageFaqs: FAQ[] = [
  {
    question: 'What is admissioninmba.com?',
    answer:
      'admissioninmba.com is a platform that helps students search MBA and PGDM colleges across India and explore options based on budget, exam score, specialization, and location.',
  },
  {
    question: 'How can admissioninmba.com help me choose the right MBA college?',
    answer:
      'You can use admissioninmba.com to explore MBA and PGDM colleges, compare options, and shortlist institutes that match your budget, exam score, city preference, and career goals.',
  },
  {
    question: 'Can I find MBA colleges across India on admissioninmba.com?',
    answer:
      'Yes, admissioninmba.com helps students search MBA and PGDM colleges across India, making it easier to compare colleges in different cities and states from one place.',
  },
  {
    question: 'What is the eligibility criteria for MBA admission in India?',
    answer:
      'Most MBA colleges in India require a bachelor’s degree from a recognized university, usually with at least 50% marks, while some relaxation may apply for reserved categories and final-year students.',
  },
  {
    question: 'Can final-year students apply for MBA admission?',
    answer:
      'Yes, many MBA and PGDM colleges allow final-year students to apply, provided they complete graduation and submit required documents within the institute’s deadline.',
  },
  {
    question: 'Which entrance exams are accepted for MBA admission in India?',
    answer:
      'Commonly accepted MBA entrance exams include CAT, XAT, MAT, CMAT, NMAT, SNAP, and several state-level or institute-specific tests, depending on the college.',
  },
  {
    question: 'What is the MBA admission process step by step?',
    answer:
      'The MBA admission process usually includes checking eligibility, appearing for an entrance exam if required, shortlisting colleges, filling application forms, attending interview rounds, and confirming admission after selection.',
  },
  {
    question: 'Which is better: MBA or PGDM?',
    answer:
      'MBA and PGDM can both be strong options, and the better choice depends on your career goals, preferred institute, curriculum style, fees, and placement outcomes.',
  },
];

const cityFaqs: FAQ[] = [
  {
    question: 'Which are the best MBA colleges in this city?',
    answer:
      'The best MBA colleges in a city are usually those with strong placements, recognized approvals, good faculty, industry exposure, and a fee structure that matches the student’s budget and goals.',
  },
  {
    question: 'How do I choose the best MBA college in Bengaluru?',
    answer:
      'Choose an MBA college in Bengaluru by comparing placements, specialization options, fees, approvals, internship exposure, and overall return on investment.',
  },
  {
    question: 'Are there low-fee MBA colleges in this city?',
    answer:
      'Yes, many cities have MBA colleges across different budget ranges, including lower-fee options. Students should compare total cost with placement outcomes before making a shortlist.',
  },
  {
    question: 'Which MBA colleges in this city accept MAT or CMAT?',
    answer:
      'Many private MBA and PGDM colleges in major cities accept MAT or CMAT scores. The accepted exam and cutoff vary by institute, so students should check each college profile carefully.',
  },
  {
    question: 'Is this city good for MBA placements?',
    answer:
      'A city can be a good MBA destination if it offers strong industry access, better internship opportunities, recruiter presence, and long-term networking value for management students.',
  },
  {
    question: 'How important is location when choosing an MBA college?',
    answer:
      'Location matters because it can affect internships, commuting, living costs, corporate exposure, and placement access. However, the college’s own reputation and outcomes matter more than the city name alone.',
  },
  {
    question: 'Can I compare city-wise MBA colleges by fees and placements?',
    answer:
      'Yes, students should compare city-wise MBA colleges using fees, average package, specialization strength, exam acceptance, and placement consistency to make a better decision.',
  },
  {
    question: 'Which city is better for MBA: Bengaluru, Pune, Mumbai, or Delhi NCR?',
    answer:
      'The better city depends on your budget, industry interest, cost of living preference, and target colleges. Students should compare colleges within each city instead of choosing only by location brand value.',
  },
];

const collegeFaqs: FAQ[] = [
  {
    question: 'What are the eligibility criteria for admission to this MBA college?',
    answer:
      'Eligibility usually includes a bachelor’s degree from a recognized university, minimum qualifying marks, and a valid entrance exam score if required by the institute.',
  },
  {
    question: 'Which entrance exams are accepted by this college?',
    answer:
      'This college may accept exams such as CAT, MAT, CMAT, XAT, NMAT, or institute-level selection, depending on its admission policy for the current session.',
  },
  {
    question: 'What is the total fee for the MBA or PGDM program?',
    answer:
      'The total fee usually includes tuition and may also include or exclude hostel, exam, library, and other charges. Students should always review the full fee breakup before taking admission.',
  },
  {
    question: 'Does this college offer scholarships?',
    answer:
      'Many MBA and PGDM colleges offer scholarships based on merit, entrance exam score, category, or financial need. The amount and eligibility criteria vary by institute.',
  },
  {
    question: 'What is the placement record of this college?',
    answer:
      'The placement record should be evaluated using average package, highest package, placement percentage, recruiter mix, internship support, and the quality of roles offered to students.',
  },
  {
    question: 'Does this college provide hostel facilities?',
    answer:
      'Many MBA colleges provide hostel or accommodation support, but availability, distance, and cost vary by campus. Students should confirm hostel fees and facilities separately from tuition.',
  },
  {
    question: 'Which MBA specializations are offered by this college?',
    answer:
      'MBA and PGDM colleges commonly offer specializations such as Marketing, Finance, Human Resources, Business Analytics, Operations, and International Business, depending on the program structure.',
  },
  {
    question: 'How do I apply to this college?',
    answer:
      'The application process usually includes checking eligibility, submitting an application form, uploading documents, and attending interview or counseling rounds if required.',
  },
  {
    question: 'Is this college good in terms of return on investment?',
    answer:
      'A college offers good ROI when the total fee is balanced by consistent placement outcomes, industry exposure, recruiter quality, and long-term career value after graduation.',
  },
  {
    question: 'Should I choose this college for MBA admission?',
    answer:
      'You should choose this college only after comparing its fees, placement quality, approvals, faculty, specialization strength, and location advantage with other shortlisted options.',
  },
];

const examFaqs: FAQ[] = [
  {
    question: 'Which MBA colleges accept CAT score?',
    answer:
      'Many top MBA and PGDM colleges accept CAT scores, but the required score range and selection process vary from one institute to another.',
  },
  {
    question: 'Which MBA colleges accept MAT score?',
    answer:
      'Many private MBA and PGDM colleges across India accept MAT scores. Students should compare these colleges by placements, fees, and approval status before applying.',
  },
  {
    question: 'Which MBA colleges accept CMAT score?',
    answer:
      'A large number of AICTE-approved institutes and business schools accept CMAT scores for MBA and PGDM admissions, especially in the private management education segment.',
  },
  {
    question: 'Can I get MBA admission with a low exam score?',
    answer:
      'Yes, students with a lower score may still find suitable colleges through alternative accepted exams, lower cutoff institutes, or profile-based admission opportunities.',
  },
  {
    question: 'Is CAT compulsory for MBA admission?',
    answer:
      'No, CAT is not compulsory for every MBA college in India because many institutes also accept MAT, CMAT, XAT, NMAT, or conduct their own admission process.',
  },
  {
    question: 'Which exam is best for MBA admission in India?',
    answer:
      'The best exam depends on the type of colleges you want to target, your preparation level, and how wide you want to keep your admission options.',
  },
  {
    question: 'Can I apply to multiple MBA colleges with one exam score?',
    answer:
      'Yes, one valid exam score can usually be used to apply to multiple colleges that accept that exam, which helps students build a wider shortlist.',
  },
  {
    question: 'How do I shortlist colleges based on my exam score?',
    answer:
      'Shortlist colleges by matching your score range with accepted exams, then compare them on fees, placements, city preference, and specialization strength.',
  },
];
const navItems = [
  { label: "Homepage FAQs", id: "homepage-faqs" },
  { label: "City Page FAQs", id: "city-faqs" },
  { label: "College Detail FAQs", id: "college-faqs" },
  { label: "Exam Page FAQs", id: "exam-faqs" },
];

function FAQSection({
  title,
  description,
  faqs,
}: {
  title: string;
  description: string;
  faqs: FAQ[];
}) {
  return (
    <section className="mb-12">
      <h2 className="mb-6 text-3xl font-bold">{title}</h2>
      <p className="mb-6 text-gray-600">{description}</p>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <details
            key={index}
            className="rounded-lg border bg-white p-4 shadow-sm"
          >
            <summary className="cursor-pointer font-semibold">
              {faq.question}
            </summary>

            <p className="mt-3 text-gray-600">{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export default function FAQPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-10 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center rounded-full bg-[#409fcf] px-5 py-2">
          <span className="text-sm font-semibold text-white">
            MBA / PGDM FAQ Hub
          </span>
        </div>
        <h1 className="mb-4 text-4xl font-bold">
          Frequently Asked Questions
        </h1>

        <p>
          Find answers about MBA admissions, city-wise colleges, exam acceptance, fees, scholarships, placements, and college selection.
          This page is designed for admissioninmba.com and follows a clean, expandable FAQ style similar to a university FAQ page.
        </p>
      </div>

      {/* Navigation Cards */}
      <div className="mb-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {navItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="rounded-xl border bg-white p-5 text-lg font-semibold shadow-sm transition-all hover:border-teal-600 hover:bg-[#2563eb] hover:text-white"
          >
            {item.label}
          </a>
        ))}
      </div>

      <section id="homepage-faqs" className="scroll-mt-24">
        <FAQSection 
          title="Homepage FAQs" 
          description=" Use these broad questions on your main FAQ page or homepage section to support search intent around MBA admissions and college discovery across India."
          faqs={homepageFaqs} />
      </section>
      {/* <FAQSection
        title="Homepage FAQs"
        faqs={homepageFaqs}
      /> */}

      <section id="city-faqs" className="scroll-mt-24">
        <FAQSection
          title="City Page FAQs"
          description="Use these on Bengaluru, Delhi NCR, Mumbai, Pune, Hyderabad, Chennai, and similar city pages where students search local MBA options."
          faqs={cityFaqs}
        />
      </section>


      <section id="college-faqs" className="scroll-mt-24">
        <FAQSection
          title="College Detail FAQs"
          description="Place these on individual college profile pages where students want specific answers before applying."
          faqs={collegeFaqs}
        />
      </section>

      <section id="exam-faqs" className="scroll-mt-24">
        <FAQSection
          title="Exam Page FAQs"
          description="Use these on CAT, MAT, CMAT, XAT, NMAT, and similar exam landing pages to improve answer relevance for exam-intent users."
          faqs={examFaqs}
        />
      </section>
    </div>
  );
}