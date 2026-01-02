
import React, { useState } from 'react';
import { UserProfile, Skill } from '../types';

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    fullName: 'John Smith',
    targetDomain: 'Enterprise Software',
    email: 'john.smith@example.com',
    phone: '+1 234 567 890',
    education: 'B.S. Computer Science, Stanford',
    skills: [
      { name: 'JavaScript', level: 'INTERMEDIATE' },
      { name: 'React', level: 'ADVANCED' },
      { name: 'Python', level: 'BEGINNER' },
    ],
    certifications: [
      { name: 'AWS Certified Solutions Architect', issuer: 'Amazon Web Services' },
      { name: 'Google Cloud Associate', issuer: 'Google Cloud' },
    ]
  });

  const [newSkill, setNewSkill] = useState('');

  const handleSave = () => {
    setIsEditing(false);
    // Persist changes logic would go here
  };

  const removeSkill = (index: number) => {
    setProfile(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const addSkill = () => {
    if (!newSkill.trim()) return;
    setProfile(prev => ({
      ...prev,
      skills: [...prev.skills, { name: newSkill, level: 'INTERMEDIATE' }]
    }));
    setNewSkill('');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-slate-900">Professional Profile</h2>
        <div className="flex gap-4">
          {isEditing ? (
            <button 
              onClick={handleSave}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-blue-700 shadow-lg"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              Save Changes
            </button>
          ) : (
            <button 
              onClick={() => setIsEditing(true)}
              className="bg-slate-900 text-white px-6 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-black shadow-lg"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
              Edit Profile
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-8">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-center p-8">
            <div className="relative inline-block group">
              <div className="w-32 h-32 bg-slate-100 rounded-full mx-auto flex items-center justify-center text-4xl font-bold text-slate-300 mb-6 overflow-hidden">
                <img src="https://picsum.photos/128/128" alt="Profile" className="w-full h-full object-cover" />
                {isEditing && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full cursor-pointer">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-2">Full Name</h3>
                {isEditing ? (
                  <input 
                    type="text" 
                    value={profile.fullName} 
                    onChange={e => setProfile({...profile, fullName: e.target.value})}
                    className="w-full text-center p-2 border border-slate-200 rounded text-black text-sm outline-none focus:ring-1 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-slate-900 font-bold">{profile.fullName}</p>
                )}
              </div>

              <div>
                <h3 className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-2">Target Domain</h3>
                {isEditing ? (
                  <input 
                    type="text" 
                    value={profile.targetDomain} 
                    onChange={e => setProfile({...profile, targetDomain: e.target.value})}
                    className="w-full text-center p-2 border border-slate-200 rounded text-black text-sm outline-none focus:ring-1 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-slate-900 font-medium">{profile.targetDomain}</p>
                )}
              </div>
            </div>

            <div className="space-y-4 text-sm text-slate-600 text-left pt-6 border-t border-slate-100 mt-6">
               <div className="flex items-center gap-3">
                  <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  {isEditing ? (
                    <input type="email" value={profile.email} onChange={e => setProfile({...profile, email: e.target.value})} className="flex-1 bg-transparent text-black" />
                  ) : profile.email}
               </div>
               <div className="flex items-center gap-3">
                  <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  {isEditing ? (
                    <input type="text" value={profile.phone} onChange={e => setProfile({...profile, phone: e.target.value})} className="flex-1 bg-transparent text-black" />
                  ) : profile.phone}
               </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 space-y-8">
           <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8">
              <div className="flex justify-between items-center mb-6">
                 <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                   <svg className="w-6 h-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.175 0l-3.976 2.888c-.783.57-1.838-.197-1.539-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.382-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
                   Skills & Expertise
                 </h3>
              </div>
              
              {isEditing && (
                <div className="relative mb-8 flex gap-2">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={e => setNewSkill(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && addSkill()}
                    placeholder="Add a new skill (e.g. Docker)"
                    className="flex-1 pl-4 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-black"
                  />
                  <button onClick={addSkill} className="bg-blue-600 text-white px-6 rounded-lg font-bold">Add</button>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {profile.skills.map((skill, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 group">
                    <div>
                      <span className="text-sm font-bold text-slate-800">{skill.name}</span>
                      <span className="ml-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 uppercase">
                        {skill.level}
                      </span>
                    </div>
                    {isEditing && (
                      <button onClick={() => removeSkill(i)} className="text-slate-300 hover:text-red-500 transition-colors">
                         <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    )}
                  </div>
                ))}
              </div>
           </div>

           <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8">
              <div className="flex items-center gap-2 mb-8">
                <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                <h3 className="text-xl font-bold text-slate-900">Certifications</h3>
              </div>
              <div className="space-y-6">
                {profile.certifications.map((cert, i) => (
                  <div key={i} className="flex items-start justify-between border-b border-slate-100 pb-6 last:border-0 last:pb-0">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-slate-50 rounded-lg flex items-center justify-center text-slate-300">
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800">{cert.name}</h4>
                        <p className="text-sm text-slate-500">{cert.issuer}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
