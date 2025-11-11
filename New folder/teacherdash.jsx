import React, { useState, useEffect } from 'react';
import { Users, Key, Settings, BookOpen, TrendingUp, CheckCircle, XCircle, Sparkles, Zap, Award, Clock } from 'lucide-react';

const API_URL = 'https://back-thbr.onrender.com';

export default function TeacherDashboard() {
  const [view, setView] = useState('overview');
  const [accessCodes, setAccessCodes] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedCode, setSelectedCode] = useState(null);
  const [codeTools, setCodeTools] = useState([]);
  const [loading, setLoading] = useState(false);

  const allTools = [
    { id: 'tweet', name: 'Twitter Thread', category: 'Social Media', premium: false, icon: '🐦', color: 'from-blue-400 to-cyan-400' },
    { id: 'linkedin', name: 'LinkedIn Post', category: 'Social Media', premium: false, icon: '💼', color: 'from-blue-500 to-indigo-500' },
    { id: 'summary', name: 'Summarizer', category: 'Writing', premium: false, icon: '📝', color: 'from-green-400 to-emerald-400' },
    { id: 'email', name: 'Professional Email', category: 'Communication', premium: true, icon: '✉️', color: 'from-purple-400 to-pink-400' },
    { id: 'blog', name: 'Blog Post', category: 'Writing', premium: true, icon: '📰', color: 'from-orange-400 to-red-400' },
    { id: 'ad', name: 'Ad Copy', category: 'Marketing', premium: true, icon: '📢', color: 'from-yellow-400 to-orange-400' },
    { id: 'story', name: 'Story Writer', category: 'Creative', premium: true, icon: '📖', color: 'from-pink-400 to-rose-400' },
    { id: 'smalltalk', name: 'Small Talk', category: 'Communication', premium: true, icon: '💬', color: 'from-teal-400 to-cyan-400' },
    { id: 'salespitch', name: 'Sales Pitch', category: 'Business', premium: true, icon: '🎯', color: 'from-indigo-400 to-purple-400' },
    { id: 'thanks', name: 'Thank You Note', category: 'Communication', premium: true, icon: '🙏', color: 'from-green-400 to-teal-400' },
    { id: 'followup', name: 'Follow-up Email', category: 'Communication', premium: true, icon: '📬', color: 'from-blue-400 to-purple-400' },
    { id: 'apology', name: 'Apology Letter', category: 'Communication', premium: true, icon: '💐', color: 'from-red-400 to-pink-400' },
    { id: 'reminder', name: 'Reminder', category: 'Communication', premium: true, icon: '⏰', color: 'from-amber-400 to-orange-400' },
    { id: 'agenda', name: 'Meeting Agenda', category: 'Business', premium: true, icon: '📋', color: 'from-slate-400 to-gray-400' },
    { id: 'interview', name: 'Interview Prep', category: 'Career', premium: true, icon: '🎤', color: 'from-violet-400 to-purple-400' },
  ];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setAccessCodes([
        { code: 'ABC123', school_name: 'Lincoln High School', created_at: '2024-01-15' },
        { code: 'XYZ789', school_name: 'Washington Academy', created_at: '2024-02-20' },
      ]);
      
      setStudents([
        { id: 1, name: 'Sarah Johnson', email: 'sarah@school.edu', course_completed: true, access_code: 'ABC123', last_active: '2024-11-01' },
        { id: 2, name: 'Mike Chen', email: 'mike@school.edu', course_completed: false, access_code: 'ABC123', last_active: '2024-10-28' },
        { id: 3, name: 'Emily Davis', email: 'emily@school.edu', course_completed: true, access_code: 'XYZ789', last_active: '2024-11-03' },
      ]);
    } catch (error) {
      console.error('Failed to load data:', error);
    }
  };

  const createAccessCode = async () => {
    const schoolName = prompt('Enter school name:');
    if (!schoolName) return;

    try {
      const response = await fetch(`${API_URL}/api/admin/create_code`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          school_name: schoolName,
          default_tools: ['tweet', 'summary', 'linkedin']
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        alert(`Access code created: ${data.code}`);
        loadData();
      }
    } catch (error) {
      console.error('Error creating code:', error);
    }
  };

  const loadCodeTools = async (code) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/admin/access_code/${code}/tools`, {
        credentials: 'include'
      });
      
      if (response.ok) {
        const data = await response.json();
        setCodeTools(data.tools);
        setSelectedCode(code);
      }
    } catch (error) {
      console.error('Error loading tools:', error);
    }
    setLoading(false);
  };

  const toggleTool = async (toolId, currentlyEnabled) => {
    try {
      const response = await fetch(`${API_URL}/api/admin/access_code/${selectedCode}/tools`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          tool_type: toolId,
          enabled: !currentlyEnabled
        })
      });
      
      if (response.ok) {
        loadCodeTools(selectedCode);
      }
    } catch (error) {
      console.error('Error toggling tool:', error);
    }
  };

  const saveToolPreset = async (preset) => {
    const presets = {
      basic: ['tweet', 'summary', 'linkedin'],
      writing: ['tweet', 'summary', 'linkedin', 'blog', 'email'],
      business: ['tweet', 'email', 'salespitch', 'agenda', 'followup'],
      all: allTools.map(t => t.id)
    };

    try {
      const response = await fetch(`${API_URL}/api/admin/access_code/${selectedCode}/tools/bulk`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enabled_tools: presets[preset] })
      });
      
      if (response.ok) {
        loadCodeTools(selectedCode);
      }
    } catch (error) {
      console.error('Error saving preset:', error);
    }
  };

  const groupByCategory = (tools) => {
    const grouped = {};
    tools.forEach(tool => {
      if (!grouped[tool.category]) {
        grouped[tool.category] = [];
      }
      grouped[tool.category].push(tool);
    });
    return grouped;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with Glassmorphism */}
        <div className="relative overflow-hidden bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 mb-8 border border-white/20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl -z-10"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-pink-400/20 to-orange-400/20 rounded-full blur-3xl -z-10"></div>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
              <Sparkles className="text-white" size={32} />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Teacher Dashboard
              </h1>
              <p className="text-gray-600 mt-1">Empower your students with AI learning tools</p>
            </div>
          </div>
        </div>

        {/* Navigation Pills */}
        <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
          {[
            { id: 'overview', label: 'Overview', icon: TrendingUp, gradient: 'from-blue-500 to-cyan-500' },
            { id: 'codes', label: 'Access Codes', icon: Key, gradient: 'from-purple-500 to-pink-500' },
            { id: 'students', label: 'Students', icon: Users, gradient: 'from-green-500 to-emerald-500' },
            { id: 'tools', label: 'Tool Management', icon: Settings, gradient: 'from-orange-500 to-red-500' },
          ].map(({ id, label, icon: Icon, gradient }) => (
            <button
              key={id}
              onClick={() => setView(id)}
              className={`group flex items-center gap-3 px-6 py-4 rounded-2xl font-semibold transition-all duration-300 whitespace-nowrap ${
                view === id
                  ? `bg-gradient-to-r ${gradient} text-white shadow-2xl scale-105`
                  : 'bg-white/70 backdrop-blur-sm text-gray-700 hover:bg-white hover:shadow-xl hover:scale-105'
              }`}
            >
              <Icon size={22} className={view === id ? 'animate-pulse' : 'group-hover:rotate-12 transition-transform'} />
              {label}
            </button>
          ))}
        </div>

        {/* Overview View */}
        {view === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { 
                label: 'Total Students', 
                value: students.length, 
                icon: Users, 
                gradient: 'from-blue-500 to-cyan-500',
                bg: 'from-blue-50 to-cyan-50'
              },
              { 
                label: 'Completed Course', 
                value: students.filter(s => s.course_completed).length, 
                icon: Award, 
                gradient: 'from-green-500 to-emerald-500',
                bg: 'from-green-50 to-emerald-50'
              },
              { 
                label: 'Access Codes', 
                value: accessCodes.length, 
                icon: Key, 
                gradient: 'from-purple-500 to-pink-500',
                bg: 'from-purple-50 to-pink-50'
              },
            ].map((stat, idx) => (
              <div 
                key={idx}
                className={`relative overflow-hidden bg-gradient-to-br ${stat.bg} rounded-3xl shadow-xl p-8 hover:shadow-2xl hover:scale-105 transition-all duration-300 group`}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/30 rounded-full blur-2xl -z-10 group-hover:scale-150 transition-transform duration-500"></div>
                <div className="flex items-center gap-6">
                  <div className={`bg-gradient-to-br ${stat.gradient} p-5 rounded-2xl shadow-lg group-hover:rotate-12 transition-transform duration-300`}>
                    <stat.icon className="text-white" size={36} />
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm font-medium mb-1">{stat.label}</p>
                    <p className="text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                      {stat.value}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Access Codes View */}
        {view === 'codes' && (
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Access Codes
              </h2>
              <button
                onClick={createAccessCode}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2 font-semibold"
              >
                <Zap size={20} />
                Create New Code
              </button>
            </div>

            <div className="space-y-4">
              {accessCodes.map((code) => (
                <div 
                  key={code.code} 
                  className="relative overflow-hidden bg-gradient-to-br from-white to-purple-50 rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 border-2 border-purple-100 hover:border-purple-300 group"
                >
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-3xl -z-10 group-hover:scale-150 transition-transform duration-500"></div>
                  
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-4 mb-3">
                        <span className="text-3xl font-mono font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                          {code.code}
                        </span>
                        <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-lg">
                          {students.filter(s => s.access_code === code.code).length} students
                        </span>
                      </div>
                      <p className="text-gray-700 font-semibold text-lg">{code.school_name}</p>
                      <p className="text-gray-500 text-sm flex items-center gap-2 mt-2">
                        <Clock size={14} />
                        Created: {code.created_at}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setView('tools');
                        loadCodeTools(code.code);
                      }}
                      className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-5 py-3 rounded-xl hover:from-purple-200 hover:to-pink-200 hover:shadow-lg transition-all duration-300 flex items-center gap-2 font-semibold"
                    >
                      <Settings size={20} />
                      Manage Tools
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Students View */}
        {view === 'students' && (
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-8">
              Students
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-4 px-6 text-gray-600 font-bold">Name</th>
                    <th className="text-left py-4 px-6 text-gray-600 font-bold">Email</th>
                    <th className="text-left py-4 px-6 text-gray-600 font-bold">Access Code</th>
                    <th className="text-left py-4 px-6 text-gray-600 font-bold">Course Status</th>
                    <th className="text-left py-4 px-6 text-gray-600 font-bold">Last Active</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.id} className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 transition-colors">
                      <td className="py-4 px-6 font-semibold text-gray-800">{student.name}</td>
                      <td className="py-4 px-6 text-gray-600">{student.email}</td>
                      <td className="py-4 px-6">
                        <span className="font-mono font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                          {student.access_code}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        {student.course_completed ? (
                          <span className="flex items-center gap-2 text-green-600 font-semibold bg-green-100 px-3 py-1.5 rounded-full w-fit">
                            <CheckCircle size={18} />
                            Complete
                          </span>
                        ) : (
                          <span className="flex items-center gap-2 text-orange-600 font-semibold bg-orange-100 px-3 py-1.5 rounded-full w-fit">
                            <BookOpen size={18} />
                            In Progress
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-gray-500">{student.last_active}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tool Management View */}
        {view === 'tools' && (
          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-6">
                Tool Management
              </h2>
              
              {!selectedCode ? (
                <div className="text-center py-16">
                  <div className="bg-gradient-to-br from-orange-100 to-red-100 w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Settings className="text-orange-500" size={64} />
                  </div>
                  <p className="text-gray-600 text-lg mb-6">Select an access code to manage tools</p>
                  <button
                    onClick={() => setView('codes')}
                    className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 font-semibold"
                  >
                    View Access Codes
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-8 pb-6 border-b-2 border-gray-200">
                    <p className="text-gray-600 mb-3 text-sm font-medium">Managing tools for:</p>
                    <div className="flex items-center gap-4">
                      <span className="text-3xl font-mono font-black bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                        {selectedCode}
                      </span>
                      <button
                        onClick={() => setSelectedCode(null)}
                        className="text-gray-500 hover:text-gray-700 font-medium hover:underline"
                      >
                        Change
                      </button>
                    </div>
                  </div>

                  {/* Quick Presets */}
                  <div className="mb-8">
                    <p className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <Zap className="text-yellow-500" size={24} />
                      Quick Presets
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {[
                        { id: 'basic', label: 'Basic', emoji: '🌱', desc: 'Twitter, Summary, LinkedIn', gradient: 'from-green-400 to-emerald-400' },
                        { id: 'writing', label: 'Writing', emoji: '✍️', desc: 'Basic + Blog, Email', gradient: 'from-blue-400 to-indigo-400' },
                        { id: 'business', label: 'Business', emoji: '💼', desc: 'Professional tools', gradient: 'from-purple-400 to-pink-400' },
                        { id: 'all', label: 'All Tools', emoji: '🚀', desc: 'Enable everything', gradient: 'from-orange-400 to-red-400' },
                      ].map((preset) => (
                        <button
                          key={preset.id}
                          onClick={() => saveToolPreset(preset.id)}
                          className={`group bg-gradient-to-br ${preset.gradient} p-6 rounded-2xl hover:shadow-2xl hover:scale-105 transition-all duration-300 text-left`}
                        >
                          <div className="text-4xl mb-3 group-hover:scale-125 transition-transform duration-300">{preset.emoji}</div>
                          <div className="font-bold text-white text-xl mb-1">{preset.label}</div>
                          <div className="text-sm text-white/90">{preset.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Individual Tools */}
                  {loading ? (
                    <div className="text-center py-16">
                      <div className="relative w-20 h-20 mx-auto">
                        <div className="absolute inset-0 rounded-full border-4 border-purple-200"></div>
                        <div className="absolute inset-0 rounded-full border-4 border-purple-600 border-t-transparent animate-spin"></div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-8">
                      {Object.entries(groupByCategory(allTools)).map(([category, tools]) => (
                        <div key={category}>
                          <h3 className="text-2xl font-bold text-gray-800 mb-5 flex items-center gap-3">
                            <div className="w-2 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
                            {category}
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {tools.map((tool) => {
                              const isEnabled = codeTools.find(t => t.id === tool.id)?.enabled || false;
                              return (
                                <div
                                  key={tool.id}
                                  className={`group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 cursor-pointer ${
                                    isEnabled
                                      ? `bg-gradient-to-br ${tool.color} shadow-2xl scale-105`
                                      : 'bg-white hover:bg-gray-50 shadow-lg hover:shadow-xl'
                                  }`}
                                  onClick={() => toggleTool(tool.id, isEnabled)}
                                >
                                  <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3 flex-1">
                                      <span className="text-4xl group-hover:scale-125 transition-transform duration-300">
                                        {tool.icon}
                                      </span>
                                      <div>
                                        <h4 className={`font-bold text-lg ${isEnabled ? 'text-white' : 'text-gray-800'}`}>
                                          {tool.name}
                                        </h4>
                                        {tool.premium && (
                                          <span className={`inline-block mt-1 text-xs px-2 py-0.5 rounded-full font-semibold ${
                                            isEnabled ? 'bg-white/30 text-white' : 'bg-purple-100 text-purple-700'
                                          }`}>
                                            Premium
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                    <div className={`p-2 rounded-full ${isEnabled ? 'bg-white/30' : 'bg-gray-100'}`}>
                                      {isEnabled ? (
                                        <CheckCircle className="text-white" size={24} />
                                      ) : (
                                        <XCircle className="text-gray-400" size={24} />
                                      )}
                                    </div>
                                  </div>
                                  <p className={`text-sm font-medium ${isEnabled ? 'text-white/90' : 'text-gray-500'}`}>
                                    {isEnabled ? '✓ Enabled - Click to disable' : 'Click to enable'}
                                  </p>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}