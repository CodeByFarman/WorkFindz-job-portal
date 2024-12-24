import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // To capture URL query params

const BlogList = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const { id } = useParams();  // Capture the dynamic id from the URL
  const toggleAccordion = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };



  const questions = [
    {
      id: "1",
      question: "How to ace a virtual interview?",
      answer: (
        <ul className="text-muted list-inside">
          <li>
            <strong>Technology Check:</strong> Employers now frequently contact candidates through virtual interviews in today's job market, so it's critical to know how to perform well in this setting. Making sure you have the appropriate technology is the first step to ace a virtual interview. To prevent technical difficulties during the interview, test your camera, microphone, and internet connection in advance. Whether it's Zoom, Microsoft Teams, or another video conferencing service, be sure you're using a platform you know how to use. Additionally, provide a fallback option in case of technological issues, such as a different device or phone number that people can reach you at.
          </li>
          <li>
            <strong>Mind Your Surroundings:</strong> Next, be mindful of your surroundings. Select a peaceful, well-lit area where you won't be bothered. In order to avoid appearing shaded on camera, make sure the room is well-lit if natural light isn't an option. Consider your background and choose a clean, neutral area. Consider employing a virtual backdrop that complements a business environment if you don't have the perfect backdrop. The interviewer can concentrate more on you and less on background noise or clutter if the space is tidy and free of distractions.
          </li>
          <li>
            <strong>Testing Technology in Advance:</strong> Testing your technology beforehand is the first step to guaranteeing a seamless virtual interview. To prevent technical difficulties during the interview, make sure your internet connection is steady and test your camera and microphone. Verify that the software on your computer is up to date, and get acquainted with the functions of the video conferencing application (such as Zoom, Skype, Microsoft Teams, etc.) by practicing using it. Having a fallback plan, such a phone number for the interviewer or a different device to utilize, is also a smart idea in case something goes wrong.
          </li>
          <li>
            <strong>Be Ready, But Remain Adaptable:</strong> Before your virtual interview, do the same research on the business and the position that you would for an in-person interview. Be ready to talk about your background and credentials, and prepare intelligent questions. But keep in mind that there may occasionally be unforeseen difficulties with virtual interviews, like minor technical issues or background noise. If something goes wrong, maintain your composure and flexibility. Ask the interviewer to repeat themselves or provide clarification if you have a small problem, such as the screen freezing or the audio quality being bad. Even in the face of minor setbacks, keeping a positive outlook shows professionalism and flexibility.
          </li>
        </ul>
      ),
    },
    {
      id: "2",
        question: "How to write an effective resume?",
        answer: (
          <ul className="text-muted list-inside">
            <li>
              <strong>Select the Appropriate Format for Your Resume:</strong> 
              Choose a format that best fits your career stage. For entry-level candidates or those with limited experience, consider using a functional or combination format to highlight your skills and achievements. Experienced professionals may benefit from a chronological format that emphasizes their work history in reverse order.
            </li>
            <li>
              <strong>Create an Engaging Professional Summary:</strong> 
              Start your resume with a concise and tailored professional summary that highlights your key skills, experience, and achievements. Customize this section for each job application, focusing on the qualifications that are most relevant to the role.
            </li>
            <li>
              <strong>Focus on Results in Your Work Experience:</strong> 
              When describing your professional experience, emphasize your achievements using measurable indicators. Use bullet points to outline responsibilities and accomplishments. For instance, write “Led a team of 10, increasing productivity by 20% in six months” instead of just “Managed a team.”
            </li>
            <li>
              <strong>Highlight Relevant Skills and Certifications:</strong> 
              Tailor the skills section to the job description by listing technical skills, soft skills, and industry-specific expertise. Include relevant certifications that showcase your qualifications for the position.
            </li>
            <li>
              <strong>Ensure Accuracy and Customization:</strong> 
              Make sure your resume is concise, well-formatted, and proofread. Tailor your resume to the specific job by emphasizing skills and experiences that align with the employer’s requirements.
            </li>
            <li>
              <strong>Additional Tips for an Effective Resume:</strong>
              <ul className="pl-4">
                <li>Include your contact details prominently.</li>
                <li>Highlight your educational background.</li>
                <li>Showcase your achievements, awards, and certifications.</li>
                <li>Proofread and edit thoroughly to ensure there are no errors.</li>
              </ul>
            </li>
          </ul>
        ),
    },
    {
      id: "3",
        question: "Interview Tips For Job Seekers!",
        answer: (
          <ul className="text-muted list-inside">
            <li>
              <strong>Examine the Business Completely:</strong> Doing extensive research on the company is the first step to acing any interview. Understand its goals, core values, offerings, and recent achievements. This knowledge will help you tailor your responses to align with the company's objectives and culture, demonstrating genuine interest in the position.
            </li>
            <li>
              <strong>Get Ready for Frequently Asked Interview Questions:</strong> Practice answering common questions like "Tell me about yourself," "What are your strengths and weaknesses?" and "Why do you want to work here?" Even though you cannot prepare for every question, rehearsing aloud will help you respond naturally and confidently.
            </li>
            <li>
              <strong>Pose Insightful Questions:</strong> Prepare thoughtful questions to ask the interviewer. This shows your interest in the role and gives you insights into the company culture and job expectations.
            </li>
            <li>
              <strong>Sell Yourself, But Maintain Your Humility:</strong> Highlight your strengths and unique qualifications while remaining modest. Balance confidence with humility to leave a positive impression.
            </li>
            <li>
              <strong>Prepare for Behavioral Inquiries:</strong> Anticipate behavioral questions and use the STAR method (Situation, Task, Action, Result) to structure your answers. This approach helps showcase your problem-solving skills and achievements effectively.
            </li>
            <li>
              <strong>Consider the Company's Culture When Dressing:</strong> Dress professionally to make a positive impression, even if the company has a casual dress code. A polished appearance shows respect for the interviewer and seriousness about the opportunity.
            </li>
            <li>
              <strong>Be Aware of Your Body Language:</strong> Maintain good posture, make eye contact, and avoid nervous behaviors like fidgeting. Nonverbal cues convey confidence and engagement.
            </li>
            <li>
              <strong>Get Ready for Salary Discussions:</strong> If the topic arises, research standard pay rates for the role and be prepared to discuss your expectations confidently and professionally.
            </li>
            <li>
              <strong>Write a Thank-You Note as a Follow-Up:</strong> Send a thank-you email after the interview to express gratitude and reinforce your enthusiasm for the position. Restate briefly how your skills align with the company's needs.
            </li>
            <li>
              <strong>Remain Composed and Authentic:</strong> Stay calm and be yourself throughout the interview. Authenticity goes a long way in creating a genuine connection with the interviewer.
            </li>
          </ul>
        ),
      },
      {
        id: "4",
        question: "The Importance of Networking in Job Searching",
        answer: (
          <ul className="text-muted list-inside">
            <li>
              <strong>Access the Hidden Job Market:</strong> Networking is one of the most effective strategies for job searching, providing access to opportunities that may not be advertised. By cultivating and maintaining professional connections, you can tap into the hidden job market, where many positions are filled through word-of-mouth or referrals rather than traditional job postings. Attend industry events, join professional associations, or connect with people on LinkedIn to build a network that can offer referrals or job leads.
            </li>
            <li>
              <strong>Gain Industry Insights:</strong> Networking is not only about finding jobs but also about learning from professionals in your field. Conversations with industry experts can provide valuable insights into trends, challenges, and potential growth areas. This knowledge can make you stand out in interviews by demonstrating your up-to-date expertise and enthusiasm for the sector. Discussing your career goals with others can also lead to new ideas and perspectives that you might not have considered before.
            </li>
            <li>
              <strong>Build Your Personal Brand:</strong> Networking is crucial for establishing your professional reputation. By consistently engaging with others in your field, sharing your expertise, and offering assistance, you position yourself as a knowledgeable and reliable professional. This can lead to future collaborations, partnerships, and job referrals. Effective networking ensures that you remain at the forefront of people's minds when opportunities arise, making you a valuable connection within your professional community.
            </li>
            <li>
              <strong>Boost Confidence and Motivation:</strong> Networking can provide emotional support during the often challenging job search process. Regular interactions with mentors and peers can offer encouragement, guidance, and motivation. A strong network ensures that you are not alone in your job hunt and helps you stay positive, determined, and focused on achieving your career goals.
            </li>
            <li>
              <strong>Foster Meaningful Connections:</strong> Networking goes beyond meeting new people—it's about creating lasting, meaningful relationships that can support your career growth. It’s not just about finding job openings; it’s also about gaining knowledge, building your brand, and receiving the support you need. Whether you’re starting your job search or seeking a career shift, networking should be a key part of your strategy to unlock new opportunities and achieve long-term professional success.
            </li>
          </ul>
        ),
      },
      {
        id: "5",
        question: "Understanding a Job Description: The Key to Tailoring Your Application",
        answer: (
          <ul className="text-muted list-inside">
            <li>
              <strong>Analyze the Responsibilities:</strong> A job description is more than just a list of tasks—it’s a guide to understanding what an employer seeks in a candidate. Start by carefully reading and evaluating the primary duties of the position. Highlight these responsibilities to showcase your relevant experience and skills in your cover letter and resume, as these often represent the core focus of the role.
            </li>
            <li>
              <strong>Focus on Required Skills and Qualifications:</strong> Pay close attention to the required abilities and qualifications mentioned in the job description. These could include certifications, education levels, or technical expertise. Identify the essential requirements and emphasize them in your application. If you lack certain qualifications but possess transferable skills or a willingness to learn, mention this in your cover letter to bridge the gap effectively.
            </li>
            <li>
              <strong>Understand the Company Culture and Values:</strong> Many job descriptions provide clues about the company’s work environment and values, such as a focus on teamwork, innovation, or independence. Tailor your application to highlight how your personal work style aligns with these values. Demonstrating cultural alignment can give you a competitive edge over other candidates.
            </li>
            <li>
              <strong>Use Action Verbs and Keywords:</strong> Identify action verbs and key phrases in the job description. Employers often use these to identify the best candidates and to filter applications through Applicant Tracking Systems (ATS). Incorporating these terms into your resume and cover letter can help ensure your application passes the initial screening process and stands out to hiring managers.
            </li>
            <li>
              <strong>Customize Your Application:</strong> By thoroughly analyzing the job description and tailoring your application accordingly, you can increase your chances of making a strong impression. Highlight your qualifications, showcase cultural fit, and ensure your application is keyword-optimized to secure your spot as a top candidate for the role.
            </li>
          </ul>
        ),
      }, 
  ];

    // Set the active question based on the `id` from the URL.
    useEffect(() => {
      if (id) {
        const foundIndex = questions.findIndex((question) => question.id === id);
        if (foundIndex !== -1) {
          setActiveIndex(foundIndex);
        }
      }
    }, [id]);

  return (
    <main className="main">
      <div className="archive-header pt-50 pb-50 text-center">
      <div  className="container">
          <h3 className="mb-30 text-center w-75 mx-auto">
            Relevant news and more for you. Welcome to our blog
          </h3>
        </div>
      </div>

      <div className="post-loop-grid">
        <div  className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="post-listing">
                {questions.map((item, index) => (
                  <div
                    className="card-blog-1 mb-30 post-list hover-up wow animate__animated animate__fadeIn"
                    key={index}
                    data-wow-delay=".0s"
                  >
                    <div
                      className="card-block-info"
                      style={{ cursor: "pointer" }}
                      onClick={() => toggleAccordion(index)}
                    >
                      <h3 className="post-title mb-15">{item.question}</h3>
                      {activeIndex === index && (
                        <div className="post-content">{item.answer}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default BlogList;
