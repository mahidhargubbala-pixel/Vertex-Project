
import React from 'react';
import { Course } from '../types';

const LearningLibrary: React.FC = () => {
  const platforms = [
    { name: 'Coursera', rating: '4.8', type: 'ACADEMIC', icon: 'https://logo.clearbit.com/coursera.org', url: 'https://www.coursera.org' },
    { name: 'Udemy', rating: '4.5', type: 'PRACTICAL', icon: 'https://logo.clearbit.com/udemy.com', url: 'https://www.udemy.com' },
    { name: 'freeCodeCamp', rating: '4.9', type: 'DEVELOPER', icon: 'https://logo.clearbit.com/freecodecamp.org', url: 'https://www.freecodecamp.org' },
    { name: 'LinkedIn Learning', rating: '4.2', type: 'BUSINESS', icon: 'https://logo.clearbit.com/linkedin.com', url: 'https://www.linkedin.com/learning' },
    { name: 'Pluralsight', rating: '4.6', type: 'IT', icon: 'https://logo.clearbit.com/pluralsight.com', url: 'https://www.pluralsight.com' },
    { name: 'GeeksforGeeks', rating: '4.7', type: 'CS FUNDAMENTALS', icon: 'https://logo.clearbit.com/geeksforgeeks.org', url: 'https://www.geeksforgeeks.org' },
  ];

  const courses: Course[] = [
    {
      platform: 'COURSERA',
      title: 'Google Data Analytics Professional Certificate',
      duration: '6 Months',
      level: 'Beginner',
      students: '1.2M+',
      type: 'PAID',
      url: 'https://www.coursera.org/professional-certificates/google-data-analytics'
    },
    {
      platform: 'FRONTEND MASTERS',
      title: 'JavaScript: The Hard Parts',
      duration: '12 Hours',
      level: 'Advanced',
      students: '45K+',
      type: 'SUBSCRIPTION',
      url: 'https://frontendmasters.com/courses/javascript-hard-parts-v2/'
    },
    {
      platform: 'EDX',
      title: "CS50's Introduction to Computer Science",
      duration: '12 Weeks',
      level: 'Beginner',
      students: '5M+',
      type: 'FREE',
      url: 'https://www.edx.org/learn/computer-science/harvard-university-cs50-s-introduction-to-computer-science'
    },
    {
      platform: 'COURSERA',
      title: 'Full-Stack Web Development with React Specialization',
      duration: '4 Months',
      level: 'Intermediate',
      students: '300K+',
      type: 'PAID',
      url: 'https://www.coursera.org/specializations/full-stack-react'
    },
    {
      platform: 'UDACITY',
      title: 'AI Programming with Python Nanodegree',
      duration: '3 Months',
      level: 'Intermediate',
      students: '80K+',
      type: 'PAID',
      url: 'https://www.udacity.com/course/ai-programming-with-python-nanodegree--nd089'
    },
    {
      platform: 'AWS',
      title: 'AWS Cloud Practitioner Essentials',
      duration: '6 Hours',
      level: 'Beginner',
      students: '900K+',
      type: 'FREE',
      url: 'https://explore.skillbuilder.aws/learn/course/external/view/elearning/134/aws-cloud-practitioner-essentials'
    }
  ];

  // Map course titles to relevant stock images for UI visual appeal
  const getCourseImage = (title: string) => {
    if (title.includes('Data')) return 'https://images.unsplash.com/photo-1551288049-bbbda546697a?auto=format&fit=crop&q=80&w=400';
    if (title.includes('JavaScript') || title.includes('Web')) return 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=400';
    if (title.includes('Python') || title.includes('AI')) return 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=80&w=400';
    if (title.includes('AWS') || title.includes('Cloud')) return 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=400';
    return 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=400';
  };

  return (
    <div className="space-y-12 py-4">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold text-slate-900 tracking-tight">Learning Library</h2>
        <p className="text-slate-500 text-lg">Curated resources to accelerate your growth.</p>
      </div>

      <div className="section-highlight p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
           <div className="flex-1 max-w-md relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Search platforms..."
                className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              />
           </div>
           <div className="flex gap-4">
            <button className="glass-card flex items-center gap-2 px-6 py-2 bg-white rounded-xl text-sm font-bold text-slate-600">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Filters
            </button>
           </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-lg font-bold text-slate-900 px-2">Top Platforms</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {platforms.map((platform, idx) => (
              <a 
                key={idx} 
                href={platform.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="glass-card p-6 text-center group rounded-2xl block"
              >
                <div className="w-16 h-16 bg-white border border-slate-100 rounded-2xl mx-auto flex items-center justify-center mb-4 p-2 shadow-sm group-hover:shadow-md transition-shadow">
                   <img src={platform.icon} alt={platform.name} className="max-w-full max-h-full object-contain" onError={(e) => {
                     (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${platform.name}&background=random`;
                   }} />
                </div>
                <h4 className="font-bold text-slate-900 text-sm mb-1">{platform.name}</h4>
                <div className="flex items-center justify-center gap-1 mb-2">
                   <svg className="w-3 h-3 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                   </svg>
                   <span className="text-xs font-bold text-slate-700">{platform.rating}</span>
                </div>
                <p className="text-[9px] font-bold text-slate-400 tracking-widest uppercase">{platform.type}</p>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-lg font-bold text-slate-900 px-2 flex items-center gap-2">
          <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Recommended Courses for You
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, idx) => (
            <a 
              key={idx} 
              href={course.url}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card flex flex-col justify-between group overflow-hidden rounded-3xl"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={getCourseImage(course.title)} 
                  alt={course.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className={`text-[10px] font-bold tracking-widest px-3 py-1 rounded-full bg-white/90 shadow-sm ${
                    course.type === 'FREE' ? 'text-green-700' : 'text-slate-700'
                  }`}>
                    {course.type}
                  </span>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <p className="text-[10px] font-bold text-blue-600 tracking-widest uppercase">{course.platform}</p>
                </div>
                <h4 className="text-lg font-bold text-slate-900 leading-tight group-hover:text-blue-600 transition-colors h-14 overflow-hidden">{course.title}</h4>
                <div className="flex flex-wrap gap-4 pt-4 border-t border-slate-50">
                   <div className="flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      <span className="text-[11px] font-bold text-slate-600">{course.duration}</span>
                   </div>
                   <div className="flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      <span className="text-[11px] font-bold text-slate-600">{course.level}</span>
                   </div>
                </div>
              </div>
              <div className="p-6 pt-0 flex items-center justify-between">
                <div className="flex items-center gap-1">
                   <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                   <span className="text-[10px] font-bold text-slate-400">{course.students}</span>
                </div>
                <span className="text-xs font-bold text-blue-600 group-hover:translate-x-1 transition-transform">Enroll Now &rarr;</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LearningLibrary;
