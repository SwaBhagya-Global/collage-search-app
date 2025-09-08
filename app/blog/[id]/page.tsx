'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import DOMPurify from 'dompurify';

// Sample data same as BlogPage
const posts = [
  {
    id: 1,
    date: 'Sept 07, 2025',
    title: 'Why Choose an MBA in India? Top Benefits for Your Career',
    content: `
     <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="ProgId" content="Word.DocumentW" />
<meta name="Generator" content="Microsoft Word 15" />
<meta name="Originator" content="Microsoft Word 15" />
<link rel="File-List
" href="file:///C:/Users/patil/AppData/Local/Temp/msohtmlclip1/01/clip_filelist.xml" />
<xml>
</xml>
<link rel="themeData
" href="file:///C:/Users/patil/AppData/Local/Temp/msohtmlclip1/01/clip_themedata.thmx" />
<link rel="colorSchemeMapping
" href="file:///C:/Users/patil/AppData/Local/Temp/msohtmlclip1/01/clip_colorschememapping.xml" />
<xml>
</xml>
<xml>
</xml>
<style>
</style>
<style>
/* Style Definitions */
table.MsoNormalTable
{mso-style-name:"Table Normal";
mso-tstyle-rowband-size:0;
mso-tstyle-colband-size:0;
mso-style-noshow:yes;
mso-style-priority:99;
mso-style-parent:"";
mso-padding-alt:0cm 5.4pt 0cm 5.4pt;
mso-para-margin-top:0cm;
mso-para-margin-right:0cm;
mso-para-margin-bottom:10.0pt;
mso-para-margin-left:0cm;
line-height:115%;
mso-pagination:widow-orphan;
font-size:11.0pt;
font-family:"Calibri",sans-serif;
mso-ascii-font-family:Calibri;
mso-ascii-theme-font:minor-latin;
mso-hansi-font-family:Calibri;
mso-hansi-theme-font:minor-latin;
mso-bidi-font-family:"Times New Roman";
mso-bidi-theme-font:minor-bidi;
mso-ansi-language:EN-US;
mso-fareast-language:EN-US;}
</style>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="ProgId" content="Word.DocumentW" />
<meta name="Generator" content="Microsoft Word 15" />
<meta name="Originator" content="Microsoft Word 15" />
<link rel="File-List
" href="file:///C:/Users/patil/AppData/Local/Temp/msohtmlclip1/01/clip_filelist.xml" />
<xml>
</xml>
<link rel="themeData
" href="file:///C:/Users/patil/AppData/Local/Temp/msohtmlclip1/01/clip_themedata.thmx" />
<link rel="colorSchemeMapping
" href="file:///C:/Users/patil/AppData/Local/Temp/msohtmlclip1/01/clip_colorschememapping.xml" />
<xml>
</xml>
<xml>
</xml>
<style>
</style>
<style>
/* Style Definitions */
table.MsoNormalTable
{mso-style-name:"Table Normal";
mso-tstyle-rowband-size:0;
mso-tstyle-colband-size:0;
mso-style-noshow:yes;
mso-style-priority:99;
mso-style-parent:"";
mso-padding-alt:0cm 5.4pt 0cm 5.4pt;
mso-para-margin-top:0cm;
mso-para-margin-right:0cm;
mso-para-margin-bottom:10.0pt;
mso-para-margin-left:0cm;
line-height:115%;
mso-pagination:widow-orphan;
font-size:11.0pt;
font-family:"Calibri",sans-serif;
mso-ascii-font-family:Calibri;
mso-ascii-theme-font:minor-latin;
mso-hansi-font-family:Calibri;
mso-hansi-theme-font:minor-latin;
mso-bidi-font-family:"Times New Roman";
mso-bidi-theme-font:minor-bidi;
mso-ansi-language:EN-US;
mso-fareast-language:EN-US;}
</style>
<p class="MsoNormalM"><b><span>Introduction</span></b></p>
<p class="MsoNormalM"><span>An MBA (Master of Business
Administration) is one of the most sought-after postgraduate degrees across the
globe. In India, it continues to attract thousands of students each year
because of the immense career opportunities, prestige, and skill development it
offers. Whether you’re a fresh graduate or a working professional looking to
climb the corporate ladder, an MBA can be a life-changing decision. But why
choose an MBA in India specifically? Let’s explore the reasons.</span></p>
<p class="MsoNormalM"><b><span>1. Wide Range of
Specializations</span></b></p>
<p class="MsoNormalM"><span>Indian business schools
offer a diverse range of MBA specializations such as Marketing, Finance, Human
Resources, Business Analytics, Operations, and International Business. This
variety ensures that students can align their academic path with their career
goals.</span></p>
<p class="MsoNormalM"><b><span>2. Affordable Quality
Education</span></b></p>
<p class="MsoNormalM"><span>Compared to MBA programs in
the US or UK, pursuing an MBA in India is more affordable while still
delivering high-quality education. Institutes like IIMs, XLRI, ISB, and many
private universities provide excellent learning environments without the financial
burden of international tuition fees.</span></p>
<p class="MsoNormalM"><b><span>3. Strong Industry
Connections and Placements</span></b></p>
<p class="MsoNormalM"><span>One of the biggest
advantages of doing an MBA in India is the strong industry-academia link. Top
colleges often have tie-ups with leading corporations, which results in high
placement rates. Students get access to internships, live projects, and
industry mentorship that pave the way for rewarding careers.</span></p>
<p class="MsoNormalM"><b><span>4. Networking Opportunities</span></b></p>
<p class="MsoNormalM"><span>Networking is a key pillar
of an MBA. In India, students meet peers from diverse academic and professional
backgrounds. These connections often turn into lifelong networks that help in
entrepreneurship, job referrals, and collaborations.</span></p>
<p class="MsoNormalM"><b><span>5. Entrepreneurial
Ecosystem</span></b></p>
<p class="MsoNormalM"><span>India is currently one of
the fastest-growing startup hubs in the world. Business schools in India
encourage entrepreneurship by offering incubators, mentorship programs, and
seed funding opportunities. An MBA equips students with both the confidence and
skillset to launch their own ventures.</span></p>
<p class="MsoNormalM"><b><span>6. Career Growth and Salary
Prospects</span></b></p>
<p class="MsoNormalM"><span>MBA graduates in India
often enjoy rapid career advancement and significant salary hikes. According to
placement reports, graduates from top B-schools are offered packages ranging
from ₹10 LPA to ₹25+ LPA, with global opportunities also opening up.</span></p>
<p class="MsoNormalM"><b><span>Conclusion</span></b></p>
<p class="MsoNormalM"><span>Choosing an MBA in India is
more than just earning a degree. It’s about gaining access to a network of
opportunities, mentors, and career paths that can transform your professional
journey. With the right specialization and institute, an MBA in India can open
doors to unparalleled growth.</span></p>
<p class="MsoNormalM"><span>Looking to explore the best MBA colleges in
India? Visit www.<a href="https://admissioninmba.com" target="_new">admissioninmba.com</a> to compare colleges, courses, and apply
directly today.</span></p>

    `,
    author: 'Admin',
    image: '/blog.png'
  },
  {
    id: 2,
    date: 'Sept 07, 2025',
    title: 'Top MBA Specializations in India and Their Career Scope',
    content: `
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="ProgId" content="Word.DocumentW" />
<meta name="Generator" content="Microsoft Word 15" />
<meta name="Originator" content="Microsoft Word 15" />
<link rel="File-List
" href="file:///C:/Users/patil/AppData/Local/Temp/msohtmlclip1/01/clip_filelist.xml" />
<xml>
</xml>
<link rel="themeData
" href="file:///C:/Users/patil/AppData/Local/Temp/msohtmlclip1/01/clip_themedata.thmx" />
<link rel="colorSchemeMapping
" href="file:///C:/Users/patil/AppData/Local/Temp/msohtmlclip1/01/clip_colorschememapping.xml" />
<xml>
</xml>
<xml>
</xml>
<style>
</style>
<style>
/* Style Definitions */
table.MsoNormalTable
{mso-style-name:"Table Normal";
mso-tstyle-rowband-size:0;
mso-tstyle-colband-size:0;
mso-style-noshow:yes;
mso-style-priority:99;
mso-style-parent:"";
mso-padding-alt:0cm 5.4pt 0cm 5.4pt;
mso-para-margin-top:0cm;
mso-para-margin-right:0cm;
mso-para-margin-bottom:10.0pt;
mso-para-margin-left:0cm;
line-height:115%;
mso-pagination:widow-orphan;
font-size:11.0pt;
font-family:"Calibri",sans-serif;
mso-ascii-font-family:Calibri;
mso-ascii-theme-font:minor-latin;
mso-hansi-font-family:Calibri;
mso-hansi-theme-font:minor-latin;
mso-bidi-font-family:"Times New Roman";
mso-bidi-theme-font:minor-bidi;
mso-ansi-language:EN-US;
mso-fareast-language:EN-US;}
</style>
<p class="MsoNormalM"><b><span>Introduction</span></b></p>
<p class="MsoNormalM"><span>Choosing the right
specialization is one of the most important decisions during an MBA. With
dozens of options available, students often wonder which path will lead to the
best career outcomes. In India, certain MBA specializations are highly sought
after due to their relevance in the current job market and future growth
potential.</span></p>
<p class="MsoNormalM"><b><span>1. MBA in Marketing</span></b></p>
<p class="MsoNormalM"><span>Marketing remains one of
the most popular MBA choices. Students learn branding, sales strategies,
digital marketing, and consumer behavior. Job opportunities include roles like
Brand Manager, Marketing Consultant, and Product Manager.</span></p>
<p class="MsoNormalM"><b><span>Career Scope:</span></b><b></b></p>
<p class="MsoNormalM"><span>FMCG, E-commerce, and
Digital Marketing agencies</span></p>
<p class="MsoNormalM"><span>Average salary: ₹8–20 LPA
for top graduates</span></p>
<p class="MsoNormalM"><b><span>2. MBA in Finance</span></b></p>
<p class="MsoNormalM"><span>If numbers excite you,
Finance is a great fit. It covers investment banking, corporate finance,
portfolio management, and financial planning.</span></p>
<p class="MsoNormalM"><b><span>Career Scope:</span></b><b></b></p>
<p class="MsoNormalM"><span>Roles in banks, investment
firms, and consulting companies</span></p>
<p class="MsoNormalM"><span>Average salary: ₹9–25 LPA
in top institutions</span></p>
<p class="MsoNormalM"><b><span>3. MBA in Human Resource
Management (HRM)</span></b></p>
<p class="MsoNormalM"><span>HR professionals ensure
smooth talent management in organizations. The specialization includes training
in recruitment, compensation, labor laws, and employee engagement.</span></p>
<p class="MsoNormalM"><b><span>Career Scope:</span></b><b></b></p>
<p class="MsoNormalM"><span>Roles: HR Manager, Talent
Acquisition Specialist, Training &amp; Development Manager</span></p>
<p class="MsoNormalM"><span>Average salary: ₹6–15 LPA</span></p>
<p class="MsoNormalM"><b><span>4. MBA in Business
Analytics</span></b></p>
<p class="MsoNormalM"><span>With data driving
businesses today, Business Analytics is one of the hottest fields. Students
learn data interpretation, predictive analysis, and AI-based decision-making.</span></p>
<p class="MsoNormalM"><b><span>Career Scope:</span></b><b></b></p>
<p class="MsoNormalM"><span>Industries: IT, Healthcare,
Finance, E-commerce</span></p>
<p class="MsoNormalM"><span>Average salary: ₹10–22 LPA</span></p>
<p class="MsoNormalM"><b><span>5. MBA in Operations and
Supply Chain</span></b></p>
<p class="MsoNormalM"><span>This specialization focuses
on production, logistics, and supply chain optimization. It’s highly relevant
with India becoming a global manufacturing hub.</span></p>
<p class="MsoNormalM"><b><span>Career Scope:</span></b><b></b></p>
<p class="MsoNormalM"><span>Roles: Operations Manager,
Supply Chain Consultant, Logistics Head</span></p>
<p class="MsoNormalM"><span>Average salary: ₹8–18 LPA</span></p>
<p class="MsoNormalM"><b><span>Conclusion</span></b></p>
<p class="MsoNormalM"><span>Choosing an MBA
specialization should depend on your interests, aptitude, and long-term career
vision. Each specialization has a unique scope in India’s growing economy, so
align it with your career aspirations.</span></p>
<p class="MsoNormalM"><span>Confused about which MBA specialization is
right for you? Compare colleges and programs at <a href="https://admissioninmba.com/" target="_new">admissioninmba.com</a></span></p>

    `,
    author: 'Admin',
    image: '/blog.png'
  },
];

export default function BlogDetailPage() {
  const params = useParams();
  const id = params?.id;
  const [blog, setBlog] = useState<typeof posts[0] | null>(null);

  useEffect(() => {
    if (id) {
      const blogId = parseInt(id);
      const found = posts.find(post => post.id === blogId);
      setBlog(found || null);
    }
  }, [id]);

  if (!blog) {
    return <div className="text-center py-10 text-gray-500">Blog not found or still loading...</div>;
  }

  const sanitizedContent = DOMPurify.sanitize(blog.content);

  return (
    <div className="w-full bg-gray-100 py-12 px-4 flex flex-col items-center">
      
      {/* Title */}
      <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">{blog.title}</h1>

      {/* Date and Author */}
      <div className="text-sm text-gray-600 mb-10 text-center">
        <span>{blog.date}</span> &bull; <span>{blog.author}</span>
      </div>

      {/* Image */}
      <div className="w-full flex justify-center mb-12">
        <div className="w-7/12 h-[400px] overflow-hidden rounded-md">
          <Image
            src={blog.image}
            alt={blog.title}
            width={600}
            height={400}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="w-full max-w-3xl text-gray-700 leading-relaxed space-y-6">
        <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
      </div>
    </div>
  );
}
