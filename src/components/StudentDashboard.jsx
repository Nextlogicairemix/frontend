import React, { useState, useEffect } from 'react';
import { Sparkles, Lock, Check, Zap, TrendingUp, Clock, Award } from 'lucide-react';

// API_URL would be imported from config in production
// const API_URL = 'http://localhost:5000/api';

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState('tools');
  const [student, setStudent] = useState(null);
  const [tools, setTools] = useState([]);
  const [courseProgress, setCourseProgress] = useState([]);
  const [selectedTool, setSelectedTool] = useState(null);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [history, setHistory] = useState([]);

  // Mock student data - replace with actual API call
  useEffect(() => {
    fetchStudentData();
    fetchAvailableTools();
    fetchCourseProgress();
    fetchHistory();
  }, []);

  const fetchStudentData = async () => {
    // Replace with actual API call
    setStudent({
      name: 'Sarah Johnson',
      email: 'sarah.j@school.edu',
      accessCode: 'ABC123DEF',
      school: 'Lincoln High School',
      courseCompleted: true,
      usesLeft: 47
    });
  };

  const fetchAvailableTools = async () => {
    // Replace with actual API call to /api/tools/available
    setTools([
      { id: 1, name: 'Twitter Thread', type: 'tweet', icon: '🐦', enabled: true, premium: false, description: 'Create engaging Twitter threads' },
      { id: 2, name: 'Summary Writer', type: 'summary', icon: '📝', enabled: true, premium: false, description: 'Summarize long content' },
      { id: 3, name: 'LinkedIn Post', type: 'linkedin', icon: '💼', enabled: true, premium: false, description: 'Professional LinkedIn content' },
      { id: 4, name: 'Email Writer', type: 'email', icon: '✉️', enabled: true, premium: false, description: 'Craft professional emails' },
      { id: 5, name: 'Blog Post', type: 'blog', icon: '📰', enabled: false, premium: false, description: 'Write engaging blog posts' },
      { id: 6, name: 'Essay Outliner', type: 'essay', icon: '📚', enabled: false, premium: true, description: 'Structure your essays' }
    ]);
  };

  const fetchCourseProgress = async () => {
    // Replace with actual API call
    setCourseProgress([
      { module: 1, title: 'AI Basics', completed: true, completedAt: '2024-01-15' },
      { module: 2, title: 'Ethical AI Use', completed: true, completedAt: '2024-01-20' },
      { module: 3, title: 'Prompt Engineering', completed: true, completedAt: '2024-01-25' },
      { module: 4, title: 'Advanced Techniques', completed: true, completedAt: '2024-02-01' }
    ]);
  };

  const fetchHistory = async () => {
    // Replace with actual API call
    setHistory([
      { id: 1, tool: 'Twitter Thread', input: 'Climate change solutions', date: '2024-02-05 10:30 AM' },
      { id: 2, tool: 'Summary Writer', input: 'Article about renewable energy', date: '2024-02-04 2:15 PM' },
      { id: 3, tool: 'LinkedIn Post', input: 'Internship experience', date: '2024-02-03 9:00 AM' }
    ]);
  };

  const handleGenerate = async () => {
    if (!input.trim() || !selectedTool) return;
    
    setIsGenerating(true);
    setOutput('');
    
    try {
      // Replace with actual API call to /api/remix
      await new Promise(resolve => setTimeout(resolve, 2000));
      setOutput(`Generated ${selectedTool.name} output:\n\nThis is where your AI-generated content would appear. Your teacher has enabled this tool for educational purposes.\n\nRemember to review, edit, and add your own insights to make this content truly yours!`);
      
      // Refresh history
      fetchHistory();
    } catch (error) {
      console.error('Generation error:', error);
      setOutput('Error generating content. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const getToolGradient = (index) => {
    const gradients = [
      'from-blue-500 to-cyan-500',
      'from-purple-500 to-pink-500',
      'from-orange-500 to-red-500',
      'from-green-500 to-emerald-500',
      'from-indigo-500 to-purple-500',
      'from-yellow-500 to-orange-500'
    ];
    return gradients[index % gradients.length];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl" style={{ animation: 'fadeIn 0.8s ease-out' }}>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                Welcome back, {student?.name || 'Student'}! ✨
              </h1>
              <p className="text-white/70 text-lg">
                {student?.school} • Access Code: <span className="font-mono bg-white/10 px-3 py-1 rounded-lg">{student?.accessCode}</span>
              </p>
            </div>
            <div className="text-right">
              <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-lg px-6 py-3 rounded-2xl border border-green-400/30">
                <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  {student?.usesLeft}
                </div>
                <div className="text-sm text-white/60">uses left</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex gap-4 bg-white/5 backdrop-blur-xl p-2 rounded-2xl border border-white/10">
          {[
            { id: 'tools', label: 'AI Tools', icon: Sparkles },
            { id: 'progress', label: 'Course Progress', icon: TrendingUp },
            { id: 'history', label: 'My History', icon: Clock }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-500 flex-1 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg shadow-purple-500/30 scale-105'
                  : 'hover:bg-white/10'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span className="font-semibold">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Tools Tab */}
        {activeTab === 'tools' && (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Tools Grid */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Available Tools
              </h2>
              <div className="space-y-3">
                {tools.map((tool, index) => (
                  <button
                    key={tool.id}
                    onClick={() => tool.enabled && student?.courseCompleted && setSelectedTool(tool)}
                    disabled={!tool.enabled || !student?.courseCompleted}
                    className={`w-full text-left p-5 rounded-2xl border transition-all duration-500 ${
                      tool.enabled && student?.courseCompleted
                        ? `bg-gradient-to-br ${getToolGradient(index)}/20 backdrop-blur-xl border-white/20 hover:scale-102 hover:shadow-lg cursor-pointer ${
                            selectedTool?.id === tool.id ? 'ring-2 ring-white shadow-xl scale-102' : ''
                          }`
                        : 'bg-white/5 border-white/10 opacity-50 cursor-not-allowed'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-3xl">{tool.icon}</span>
                          <div>
                            <h3 className="font-bold text-lg">{tool.name}</h3>
                            {tool.premium && (
                              <span className="text-xs bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-2 py-0.5 rounded-full font-semibold">
                                PREMIUM
                              </span>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-white/60">{tool.description}</p>
                      </div>
                      {!tool.enabled ? (
                        <Lock className="w-5 h-5 text-white/40" />
                      ) : student?.courseCompleted ? (
                        <Check className="w-5 h-5 text-green-400" />
                      ) : (
                        <Lock className="w-5 h-5 text-orange-400" />
                      )}
                    </div>
                    {!student?.courseCompleted && (
                      <div className="mt-3 text-xs text-orange-400 bg-orange-500/10 px-3 py-2 rounded-lg">
                        Complete course to unlock
                      </div>
                    )}
                    {!tool.enabled && student?.courseCompleted && (
                      <div className="mt-3 text-xs text-white/60 bg-white/5 px-3 py-2 rounded-lg">
                        Teacher hasn't enabled this tool
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Generation Area */}
            <div className="lg:col-span-2">
              {selectedTool ? (
                <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-4xl">{selectedTool.icon}</span>
                    <div>
                      <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                        {selectedTool.name}
                      </h2>
                      <p className="text-white/60">{selectedTool.description}</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Input */}
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-white/80">
                        Your Input
                      </label>
                      <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Enter your topic or content..."
                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 min-h-32"
                      />
                    </div>

                    {/* Generate Button */}
                    <button
                      onClick={handleGenerate}
                      disabled={!input.trim() || isGenerating}
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl hover:scale-102 transition-all duration-500 flex items-center justify-center gap-3"
                    >
                      {isGenerating ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Zap className="w-5 h-5" />
                          Generate with AI
                        </>
                      )}
                    </button>

                    {/* Output */}
                    {output && (
                      <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-xl border border-green-400/30 rounded-2xl p-6">
                        <label className="block text-sm font-semibold mb-3 text-green-400 flex items-center gap-2">
                          <Check className="w-4 h-4" />
                          AI Generated Output
                        </label>
                        <div className="bg-white/5 rounded-xl p-4 text-white/90 whitespace-pre-wrap">
                          {output}
                        </div>
                        <div className="mt-4 p-3 bg-blue-500/10 border border-blue-400/30 rounded-xl text-sm text-blue-300">
                          💡 <strong>Remember:</strong> Use this as a starting point. Add your own insights, verify facts, and make it your own!
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-16 border border-white/20 shadow-2xl text-center">
                  <Sparkles className="w-20 h-20 mx-auto mb-6 text-purple-400 opacity-50" />
                  <h3 className="text-2xl font-bold text-white/60 mb-2">Select a Tool to Get Started</h3>
                  <p className="text-white/40">Choose from the available tools on the left to begin generating content</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Progress Tab */}
        {activeTab === 'progress' && (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Course Progress
            </h2>
            <div className="space-y-4">
              {courseProgress.map((module, index) => (
                <div
                  key={module.module}
                  className={`bg-white/10 backdrop-blur-xl rounded-2xl p-6 border transition-all duration-500 ${
                    module.completed
                      ? 'border-green-400/50 bg-gradient-to-r from-green-500/10 to-emerald-500/10'
                      : 'border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold ${
                      module.completed
                        ? 'bg-gradient-to-br from-green-500 to-emerald-500'
                        : 'bg-white/10'
                    }`}>
                      {module.completed ? <Check className="w-8 h-8" /> : module.module}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-1">Module {module.module}: {module.title}</h3>
                      {module.completed ? (
                        <p className="text-green-400 text-sm flex items-center gap-2">
                          <Award className="w-4 h-4" />
                          Completed on {new Date(module.completedAt).toLocaleDateString()}
                        </p>
                      ) : (
                        <p className="text-orange-400 text-sm">In Progress</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Completion Badge */}
            {courseProgress.every(m => m.completed) && (
              <div className="mt-8 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-xl border border-yellow-400/30 rounded-2xl p-8 text-center">
                <Award className="w-16 h-16 mx-auto mb-4 text-yellow-400" />
                <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  Course Complete! 🎉
                </h3>
                <p className="text-white/70">You've unlocked all available AI tools. Keep learning and creating!</p>
              </div>
            )}
          </div>
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Generation History
            </h2>
            <div className="space-y-4">
              {history.map((item) => (
                <div
                  key={item.id}
                  className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:border-purple-400/30 transition-all duration-500 hover:scale-101 cursor-pointer"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-lg text-purple-400">{item.tool}</h3>
                    <span className="text-sm text-white/50">{item.date}</span>
                  </div>
                  <p className="text-white/70 bg-white/5 rounded-xl p-3">
                    "{item.input}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;