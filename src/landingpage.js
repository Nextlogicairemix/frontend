import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Eye, CheckCircle, Lock, BarChart3, AlertTriangle, Menu, X, ChevronDown, Users, Zap } from 'lucide-react';
export default function LandingPage() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/10 backdrop-blur-md z-50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <Shield className="w-8 h-8 text-white" />
              <span className="text-white text-xl font-bold">NextLogic AI</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-white/80 hover:text-white transition">Features</a>
              <a href="#how-it-works" className="text-white/80 hover:text-white transition">How It Works</a>
              <a href="#pricing" className="text-white/80 hover:text-white transition">Pricing</a>
              <Link 
                to="/login" 
                className="text-white/80 hover:text-white transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-white text-purple-900 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                Start Free Trial
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 space-y-4">
              <a href="#features" className="block text-white/80 hover:text-white transition">Features</a>
              <a href="#how-it-works" className="block text-white/80 hover:text-white transition">How It Works</a>
              <a href="#pricing" className="block text-white/80 hover:text-white transition">Pricing</a>
              <Link to="/login" className="block text-white/80 hover:text-white transition">Login</Link>
              <Link
                to="/signup"
                className="block bg-white text-purple-900 px-6 py-2 rounded-lg font-semibold text-center hover:bg-gray-100 transition"
              >
                Start Free Trial
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <Shield className="w-4 h-4 text-green-400" />
              <span className="text-white/90 text-sm">FERPA Compliant</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <Users className="w-4 h-4 text-blue-400" />
              <span className="text-white/90 text-sm">500+ Schools</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <CheckCircle className="w-4 h-4 text-purple-400" />
              <span className="text-white/90 text-sm">14-Day Free Trial</span>
            </div>
          </div>

          {/* Hero Content */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Stop AI Cheating<br />
              <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                Without Stopping AI
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto">
              Give teachers real-time control over student AI usage. Monitor every interaction,
              prevent cheating, and teach responsible AI use.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup"
                className="bg-white text-purple-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105"
              >
                Start Free Trial
              </Link>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/10 transition">
                Watch Demo
              </button>
            </div>
            <p className="text-white/60 mt-4">No credit card required • Setup in 5 minutes</p>
          </div>

          {/* Mock Dashboard Preview */}
          <div className="max-w-5xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-4 shadow-2xl">
              <div className="bg-gray-900 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-semibold">Live Student Activity</h3>
                  <div className="flex gap-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-white/60 text-sm">3 students active</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="bg-yellow-500/20 border-l-4 border-yellow-500 p-3 rounded">
                    <p className="text-white text-sm">⚠️ Sarah M. - Excessive AI usage detected</p>
                  </div>
                  <div className="bg-green-500/20 border-l-4 border-green-500 p-3 rounded">
                    <p className="text-white text-sm">✓ John D. - Using AI for research (approved)</p>
                  </div>
                  <div className="bg-blue-500/20 border-l-4 border-blue-500 p-3 rounded">
                    <p className="text-white text-sm">ℹ️ Emma R. - Asked for help with citations</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Everything You Need to Control AI Usage
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Powerful tools that give you complete visibility and control
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <Eye className="w-12 h-12 text-purple-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Real-Time Monitoring</h3>
              <p className="text-white/70">
                See exactly when and how students use AI. Get instant alerts for suspicious activity.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <AlertTriangle className="w-12 h-12 text-yellow-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Visual Alerts</h3>
              <p className="text-white/70">
                Student screens turn red when AI cheating is detected. Instant visual deterrent.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <Lock className="w-12 h-12 text-green-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Granular Controls</h3>
              <p className="text-white/70">
                Choose which AI features students can access. Block, allow, or approve per assignment.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <BarChart3 className="w-12 h-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Usage Analytics</h3>
              <p className="text-white/70">
                Track AI usage patterns. Identify which students need extra support or intervention.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <Shield className="w-12 h-12 text-pink-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">FERPA Compliant</h3>
              <p className="text-white/70">
                Built with student privacy in mind. SOC 2 certified and fully FERPA compliant.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <Zap className="w-12 h-12 text-orange-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Quick Setup</h3>
              <p className="text-white/70">
                Get started in 5 minutes. Simple browser extension. No complex IT setup required.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-white/70">
              Three simple steps to start monitoring AI usage
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                1
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Create Your Account</h3>
                <p className="text-white/70 text-lg">
                  Sign up in 30 seconds. Add your students or share a class code. No credit card needed for trial.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                2
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Students Install Extension</h3>
                <p className="text-white/70 text-lg">
                  Students install our lightweight browser extension. Takes 10 seconds. Works on Chrome, Edge, and Brave.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                3
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Monitor & Control</h3>
                <p className="text-white/70 text-lg">
                  See all AI usage in your dashboard. Set permissions per assignment. Get alerts for suspicious activity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-white/70">
              Start free. Upgrade anytime. Cancel anytime.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-2">Free</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">$0</span>
                <span className="text-white/60">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-white/80">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  Up to 30 students
                </li>
                <li className="flex items-center gap-2 text-white/80">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  Basic monitoring
                </li>
                <li className="flex items-center gap-2 text-white/80">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  Email support
                </li>
              </ul>
              <Link
                to="/signup"
                className="block w-full bg-white/20 text-white text-center py-3 rounded-lg font-semibold hover:bg-white/30 transition"
              >
                Start Free
              </Link>
            </div>

            {/* Teacher Plan */}
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl p-8 border-2 border-white transform scale-105">
              <div className="bg-white text-purple-900 text-sm font-bold px-3 py-1 rounded-full inline-block mb-4">
                MOST POPULAR
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Teacher</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">$19</span>
                <span className="text-white/80">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-white">
                  <CheckCircle className="w-5 h-5" />
                  Unlimited students
                </li>
                <li className="flex items-center gap-2 text-white">
                  <CheckCircle className="w-5 h-5" />
                  Real-time alerts
                </li>
                <li className="flex items-center gap-2 text-white">
                  <CheckCircle className="w-5 h-5" />
                  Full analytics
                </li>
                <li className="flex items-center gap-2 text-white">
                  <CheckCircle className="w-5 h-5" />
                  Priority support
                </li>
              </ul>
              <Link
                to="/signup"
                className="block w-full bg-white text-purple-900 text-center py-3 rounded-lg font-bold hover:bg-gray-100 transition"
              >
                Start Free Trial
              </Link>
            </div>

            {/* School Plan */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-2">School</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">Custom</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-white/80">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  Unlimited teachers
                </li>
                <li className="flex items-center gap-2 text-white/80">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  Admin dashboard
                </li>
                <li className="flex items-center gap-2 text-white/80">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  SSO integration
                </li>
                <li className="flex items-center gap-2 text-white/80">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  Dedicated support
                </li>
              </ul>
              <button className="w-full border-2 border-white text-white py-3 rounded-lg font-semibold hover:bg-white/10 transition">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Take Control of AI in Your Classroom?
          </h2>
          <p className="text-xl text-white/70 mb-8">
            Join 500+ teachers who are teaching responsible AI use while preventing cheating.
          </p>
          <Link
            to="/signup"
            className="inline-block bg-white text-purple-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105"
          >
            Start Your Free Trial
          </Link>
          <p className="text-white/60 mt-4">14-day free trial • No credit card required</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-6 h-6 text-white" />
                <span className="text-white font-bold">NextLogic AI</span>
              </div>
              <p className="text-white/60 text-sm">
                Empowering teachers to teach responsible AI use while preventing cheating.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#features" className="text-white/60 hover:text-white transition">Features</a></li>
                <li><a href="#pricing" className="text-white/60 hover:text-white transition">Pricing</a></li>
                <li><a href="#" className="text-white/60 hover:text-white transition">Demo</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-white/60 hover:text-white transition">About</a></li>
                <li><a href="#" className="text-white/60 hover:text-white transition">Blog</a></li>
                <li><a href="#" className="text-white/60 hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-white/60 hover:text-white transition">Privacy</a></li>
                <li><a href="#" className="text-white/60 hover:text-white transition">Terms</a></li>
                <li><a href="#" className="text-white/60 hover:text-white transition">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-white/60 text-sm">
            © 2024 NextLogic AI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}