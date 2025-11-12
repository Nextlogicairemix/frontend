// src/components/AIRemixTool.js
import React, { useState } from 'react';
import { Sparkles, Copy, AlertCircle, Loader, Eye } from 'lucide-react';

const API_URL = process.env.REACT_APP_API_URL || "https://backend-8ryu.onrender.com";

export default function AIRemixTool() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [remixType, setRemixType] = useState('tweet');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [usageCount, setUsageCount] = useState(0);
  const [copied, setCopied] = useState(false);

  const remixOptions = [
    { value: 'tweet', label: '🐦 Twitter Thread', category: 'Social Media' },
    { value: 'linkedin', label: '💼 LinkedIn Post', category: 'Social Media' },
    { value: 'instagram', label: '📸 Instagram Caption', category: 'Social Media' },
    { value: 'facebook', label: '👥 Facebook Post', category: 'Social Media' },
    { value: 'reddit', label: '🤖 Reddit Post', category: 'Social Media' },
    { value: 'youtube', label: '🎥 YouTube Description', category: 'Social Media' },
    { value: 'tiktok', label: '🎵 TikTok Caption', category: 'Social Media' },
    { value: 'pinterest', label: '📌 Pinterest Description', category: 'Social Media' },
    { value: 'summary', label: '📝 Quick Summary', category: 'Writing' },
    { value: 'bullets', label: '• Bullet Points', category: 'Writing' },
    { value: 'expand', label: '📖 Expand Text', category: 'Writing' },
    { value: 'email', label: '✉️ Professional Email', category: 'Writing' },
    { value: 'ad', label: '📢 Ad Copy', category: 'Marketing' },
    { value: 'blog', label: '📰 Blog Post', category: 'Writing' },
    { value: 'story', label: '📚 Story/Narrative', category: 'Creative' },
    { value: 'professional', label: '👔 Professional Tone', category: 'Tone' },
    { value: 'casual', label: '😊 Casual Tone', category: 'Tone' },
    { value: 'creative', label: '✨ Creative Tone', category: 'Tone' }
  ];

  const handleRemix = async () => {
    if (!inputText.trim()) {
      setError('Please enter some text to remix!');
      return;
    }

    setLoading(true);
    setError('');
    setOutputText('');

    try {
      const response = await fetch(`${API_URL}/api/ai/remix`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          content: inputText,
          remixType: remixType
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setOutputText(data.output);
        setUsageCount(data.usageCount);
      } else {
        setError(data.error || 'Failed to remix content');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
      console.error('Remix error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(outputText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      alert('Failed to copy. Please select and copy manually.');
    }
  };

  const groupedOptions = remixOptions.reduce((acc, option) => {
    if (!acc[option.category]) {
      acc[option.category] = [];
    }
    acc[option.category].push(option);
    return acc;
  }, {});

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Sparkles className="w-8 h-8 text-yellow-400" />
          <div>
            <h2 className="text-2xl font-bold text-white">AI Content Remix</h2>
            <p className="text-white/60 text-sm">Transform your content with AI</p>
          </div>
        </div>
        {usageCount > 0 && (
          <div className="flex items-center gap-2 bg-purple-500/20 px-4 py-2 rounded-lg">
            <Eye className="w-4 h-4 text-purple-300" />
            <span className="text-white text-sm font-semibold">
              {usageCount} uses today
            </span>
          </div>
        )}
      </div>

      {/* Monitoring Notice */}
      <div className="mb-4 bg-blue-500/20 border-l-4 border-blue-400 p-3 rounded">
        <p className="text-white/90 text-sm flex items-center gap-2">
          <Eye className="w-4 h-4" />
          <span>Teacher Monitoring Active - All AI usage is logged</span>
        </p>
      </div>

      {/* Input/Output Grid */}
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-white font-semibold mb-2">Your Content</label>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste your text here... (blog post, notes, email, etc.)"
            className="w-full h-64 p-4 rounded-xl border-2 border-white/20 bg-white/5 text-white placeholder-white/40 focus:border-purple-400 focus:outline-none resize-none"
          />
        </div>
        <div>
          <label className="block text-white font-semibold mb-2">AI Output</label>
          <div className="relative">
            <div className="w-full h-64 p-4 rounded-xl border-2 border-white/20 bg-white/5 text-white overflow-y-auto">
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <Loader className="w-8 h-8 text-purple-400 animate-spin" />
                </div>
              ) : outputText ? (
                <p className="whitespace-pre-wrap">{outputText}</p>
              ) : (
                <p className="text-white/40">Your remixed content will appear here...</p>
              )}
            </div>
            {outputText && !loading && (
              <button
                onClick={handleCopy}
                className="absolute top-2 right-2 bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg transition"
                title="Copy to clipboard"
              >
                <Copy className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 items-end">
        <div className="flex-1">
          <label className="block text-white font-semibold mb-2">Remix Style</label>
          <select
            value={remixType}
            onChange={(e) => setRemixType(e.target.value)}
            className="w-full p-3 rounded-xl border-2 border-white/20 bg-white/10 text-white font-semibold focus:border-purple-400 focus:outline-none"
          >
            {Object.entries(groupedOptions).map(([category, options]) => (
              <optgroup key={category} label={category}>
                {options.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>
        <button
          onClick={handleRemix}
          disabled={loading || !inputText.trim()}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-8 rounded-xl transition transform hover:scale-105 flex items-center gap-2"
        >
          {loading ? (
            <>
              <Loader className="w-5 h-5 animate-spin" />
              Remixing...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Remix It!
            </>
          )}
        </button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mt-4 bg-red-500/20 border-l-4 border-red-500 p-3 rounded flex items-start gap-2">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-white/90 text-sm">{error}</p>
        </div>
      )}

      {/* Copy Success */}
      {copied && (
        <div className="mt-4 bg-green-500/20 border-l-4 border-green-500 p-3 rounded">
          <p className="text-white/90 text-sm">✓ Copied to clipboard!</p>
        </div>
      )}
    </div>
  );
}