import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Shield,
  Eye,
  CheckCircle,
  Lock,
  FileText,
  BarChart3,
  BookOpen,
  AlertTriangle,
  Users,
  Zap
} from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900 text-white overflow-x-hidden">
      
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-lg border-b border-white/10">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src="/assets/logo.png" alt="NextLogic AI Logo" className="h-12 w-12" />
            <h1 className="text-2xl font-black">NextLogic AI</h1>
          </div>
          <div className="hidden md:flex gap-6 items-center">
            <a href="#features" className="text-white/80 hover:text-white transition-all">Features</a>
            <a href="#how-it-works" className="text-white/80 hover:text-white transition-all">How It Works</a>
            <a href="#pricing" className="text-white/80 hover:text-white transition-all">Pricing</a>
            <Link to="/login" className="text-white/80 hover:text-white transition-all">Login</Link>
            <Link to="/signup" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-6 py-2 rounded-full font-bold transition-all shadow-lg">
              Start Free Trial
            </Link>
          </div>
        </nav>
      </header>

      {/* Trust Bar */}
      <div className="fixed top-16 left-0 right-0 z-40 bg-white/5 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs md:text-sm text-white/80">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-green-400" />
              <span>FERPA Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-blue-400" />
              <span>Full Teacher Oversight</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-purple-400" />
              <span>500+ Schools Trust Us</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-32 px-4">
        {/* Animated Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="container mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Hero Content */}
            <div className="text-center lg:text-left space-y-8">
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start text-sm">
                <span className="bg-green-500/20 border border-green-400/30 px-4 py-2 rounded-full">
                  ✓ FERPA Compliant
                </span>
                <span className="bg-blue-500/20 border border-blue-400/30 px-4 py-2 rounded-full">
                  👥 500+ Schools
                </span>
                <span className="bg-purple-500/20 border border-purple-400/30 px-4 py-2 rounded-full">
                  🔒 Bank-Level Security
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl font-black leading-tight">
                Stop AI Cheating
                <span className="block bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
                  Without Stopping AI
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-white/90">
                Monitor every student AI interaction. Get instant visual alerts. Control which AI features are available per assignment. Teach responsible AI skills while maintaining academic integrity.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  onClick={() => navigate('/signup')}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-8 py-4 rounded-xl font-bold text-lg shadow-2xl transition-all transform hover:scale-105"
                >
                  Start Free Trial - 3 Sessions
                </button>
                <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 px-8 py-4 rounded-xl font-bold text-lg transition-all">
                  Watch Demo (2 min)
                </button>
              </div>

              <div className="flex items-center gap-4 justify-center lg:justify-start pt-4">
                <div className="flex -space-x-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 border-2 border-white"></div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 border-2 border-white"></div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-400 border-2 border-white"></div>
                </div>
                <div className="text-sm text-left">
                  <div className="font-bold">Over 5,000 teachers</div>
                  <div className="text-white/70">maintaining academic integrity</div>
                </div>
              </div>
            </div>

            {/* Right: Mock Dashboard */}
            <div className="relative">
              <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
                <div className="space-y-4">
                  <div className="flex items-center justify-between bg-white/10 p-4 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-green-400"></div>
                      <div>
                        <div className="font-bold">Sarah Johnson</div>
                        <div className="text-sm text-white/60">Currently active</div>
                      </div>
                    </div>
                    <div className="bg-green-500/20 border border-green-400 px-3 py-1 rounded-full text-green-300 text-sm font-bold">
                      ✓ Normal
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between bg-yellow-500/10 border-2 border-yellow-400/50 p-4 rounded-xl animate-pulse">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-yellow-400"></div>
                      <div>
                        <div className="font-bold">Mike Chen</div>
                        <div className="text-sm text-white/60">High AI usage detected</div>
                      </div>
                    </div>
                    <div className="bg-yellow-500/30 border border-yellow-400 px-3 py-1 rounded-full text-yellow-300 text-sm font-bold">
                      ⚠ Alert
                    </div>
                  </div>

                  <div className="mt-6 bg-gradient-to-r from-red-500/20 to-orange-500/20 border-2 border-red-400/50 p-4 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="w-5 h-5 text-red-400" />
                      <span className="font-bold text-red-300">Background Alert Active</span>
                    </div>
                    <p className="text-sm text-white/80">Student Mike Chen is using AI assistance above threshold. Review session immediately.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-4 bg-black/30">
        <div className="container mx-auto">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              The Problem Every Teacher Faces
            </h2>
            <p className="text-xl text-white/80">
              Students need to learn AI skills for the future, but how do you prevent cheating while teaching responsible AI use?
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-red-500/10 border border-red-400/30 p-8 rounded-2xl">
              <div className="text-5xl mb-4">😰</div>
              <h3 className="text-2xl font-bold mb-3">Can't Detect AI Use</h3>
              <p className="text-white/70">Traditional detection tools are unreliable. Students know how to bypass them. You can't tell if work is authentic.</p>
            </div>

            <div className="bg-orange-500/10 border border-orange-400/30 p-8 rounded-2xl">
              <div className="text-5xl mb-4">🚫</div>
              <h3 className="text-2xl font-bold mb-3">Banning AI Isn't the Answer</h3>
              <p className="text-white/70">Students will need AI skills for college and careers. You want to teach responsible use, not ban it entirely.</p>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-400/30 p-8 rounded-2xl">
              <div className="text-5xl mb-4">⏰</div>
              <h3 className="text-2xl font-bold mb-3">Time-Consuming Oversight</h3>
              <p className="text-white/70">Manually reviewing student work for AI use takes hours you don't have. You need automated monitoring.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Complete Visibility & Control
            </h2>
            <p className="text-xl text-white/80">
              NextLogic AI gives you X-ray vision into student AI usage
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              {
                icon: <Eye className="w-8 h-8 text-green-300" />,
                title: "Real-Time Monitoring",
                desc: "See exactly when students are using AI, what prompts they're entering, and how much AI assistance they're receiving.",
                color: "green"
              },
              {
                icon: <AlertTriangle className="w-8 h-8 text-yellow-300" />,
                title: "Visual Background Alerts",
                desc: "Student screens change color when suspicious AI activity is detected. Spot issues instantly without constant monitoring.",
                color: "yellow"
              },
              {
                icon: <Lock className="w-8 h-8 text-purple-300" />,
                title: "Control AI Features Per Assignment",
                desc: "Enable or disable specific AI tools with one click. Allow grammar checks but block essay generation.",
                color: "purple"
              },
              {
                icon: <FileText className="w-8 h-8 text-blue-300" />,
                title: "Complete Session Logs",
                desc: "Every AI interaction is logged and timestamped. Review student work history anytime with full transparency.",
                color: "blue"
              },
              {
                icon: <BarChart3 className="w-8 h-8 text-pink-300" />,
                title: "Usage Analytics",
                desc: "Track AI usage patterns across students and assignments. Identify who needs help and who's over-relying on AI.",
                color: "pink"
              },
              {
                icon: <BookOpen className="w-8 h-8 text-indigo-300" />,
                title: "Teach Responsible AI",
                desc: "Built-in lessons and prompts teach students ethical AI use. Prepare them for college and careers with AI literacy.",
                color: "indigo"
              }
            ].map((feature, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-all">
                <div className={`bg-${feature.color}-500/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-white/70">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 bg-black/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-white/80">
              Start free. Scale with your school. No hidden fees.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Free Trial */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">Free Trial</h3>
                <div className="text-5xl font-black mb-2">$0</div>
                <p className="text-white/60">Try it risk-free</p>
              </div>
              <ul className="space-y-3 mb-8 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span>3 monitored sessions</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span>All core features</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span>Up to 25 students</span>
                </li>
              </ul>
              <button
                onClick={() => navigate('/signup')}
                className="w-full bg-white/10 hover:bg-white/20 border border-white/30 py-3 rounded-xl font-bold transition-all"
              >
                Start Free Trial
              </button>
            </div>

            {/* Teacher Plan */}
            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm border-2 border-purple-400 p-8 rounded-2xl relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-1 rounded-full text-sm font-bold">
                Most Popular
              </div>
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">Teacher Plan</h3>
                <div className="text-5xl font-black mb-2">$19</div>
                <p className="text-white/60">per month</p>
              </div>
              <ul className="space-y-3 mb-8 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span><strong>Unlimited</strong> sessions</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span>Up to 150 students</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span>Advanced analytics</span>
                </li>
              </ul>
              <button
                onClick={() => navigate('/signup')}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 py-3 rounded-xl font-bold transition-all"
              >
                Get Started
              </button>
            </div>

            {/* School Plan */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">School Plan</h3>
                <div className="text-5xl font-black mb-2">Custom</div>
                <p className="text-white/60">Contact for pricing</p>
              </div>
              <ul className="space-y-3 mb-8 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span><strong>Unlimited</strong> everything</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span>Custom access codes</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span>Dedicated support</span>
                </li>
              </ul>
              <button className="w-full bg-white/10 hover:bg-white/20 border border-white/30 py-3 rounded-xl font-bold transition-all">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-gradient-to-br from-purple-900 via-pink-900 to-orange-900">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            Ready to Regain Control?
          </h2>
          <p className="text-xl md:text-2xl text-white/90 mb-8">
            Join 5,000+ teachers who stopped worrying about AI cheating
          </p>
          <button
            onClick={() => navigate('/signup')}
            className="bg-white text-purple-900 hover:bg-gray-100 px-10 py-5 rounded-xl font-bold text-xl shadow-2xl transition-all transform hover:scale-105"
          >
            Start Free Trial - No Credit Card
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-black/50 border-t border-white/10">
        <div className="container mx-auto text-center">
          <p className="text-white/40">© 2025 NextLogic AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}