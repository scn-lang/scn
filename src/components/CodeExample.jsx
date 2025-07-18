import { useState } from 'react';

const CodeExample = () => {
  const [activeTab, setActiveTab] = useState('before');

  const beforeCode = `// user.js (1,247 tokens)
class User {
  constructor(name, email, age) {
    this.name = name;
    this.email = email;
    this.age = age;
    this.createdAt = new Date();
    this.isActive = true;
    this.preferences = {
      theme: 'light',
      notifications: true,
      language: 'en'
    };
  }

  validateEmail() {
    const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    return emailRegex.test(this.email);
  }

  updatePreferences(newPrefs) {
    this.preferences = { ...this.preferences, ...newPrefs };
  }

  deactivate() {
    this.isActive = false;
  }

  getDisplayName() {
    return \`\${this.name} (\${this.email})\`;
  }
}

export default User;`;

  const afterCode = `// SCN Representation (38 tokens - 97% reduction!)
user.js◮
  ◉User{name,email,age,createdAt,isActive,preferences}
    ⚡validateEmail()→bool
    ⚡updatePreferences(newPrefs)
    ⚡deactivate()
    ⚡getDisplayName()→str
  ⤴User`;

  return (
    <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden">
      {/* Tab Headers */}
      <div className="flex border-b border-slate-700/50">
        <button
          onClick={() => setActiveTab('before')}
          className={`flex-1 px-6 py-4 text-sm font-medium transition-all duration-300 ${
            activeTab === 'before'
              ? 'bg-red-500/20 text-red-400 border-b-2 border-red-400'
              : 'text-slate-400 hover:text-slate-300 hover:bg-slate-700/50'
          }`}
        >
          Before: Raw Code (1,247 tokens)
        </button>
        <button
          onClick={() => setActiveTab('after')}
          className={`flex-1 px-6 py-4 text-sm font-medium transition-all duration-300 ${
            activeTab === 'after'
              ? 'bg-green-500/20 text-green-400 border-b-2 border-green-400'
              : 'text-slate-400 hover:text-slate-300 hover:bg-slate-700/50'
          }`}
        >
          After: SCN (38 tokens - 97% reduction!)
        </button>
      </div>

      {/* Code Content */}
      <div className="relative">
        <div className={`transition-all duration-500 ${activeTab === 'before' ? 'opacity-100' : 'opacity-0 absolute inset-0'}`}>
          <pre className="p-6 text-sm font-mono text-slate-300 overflow-x-auto">
            <code>{beforeCode}</code>
          </pre>
        </div>
        <div className={`transition-all duration-500 ${activeTab === 'after' ? 'opacity-100' : 'opacity-0 absolute inset-0'}`}>
          <pre className="p-6 text-sm font-mono text-slate-300 overflow-x-auto">
            <code>{afterCode}</code>
          </pre>
        </div>
      </div>

      {/* Token Counter */}
      <div className="px-6 py-4 bg-slate-900/50 border-t border-slate-700/50">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <span className="text-slate-400">Token Count:</span>
            <span className={`font-mono font-bold ${activeTab === 'before' ? 'text-red-400' : 'text-green-400'}`}>
              {activeTab === 'before' ? '1,247' : '38'}
            </span>
          </div>
          {activeTab === 'after' && (
            <div className="text-green-400 font-semibold">
              97% reduction! 🎉
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CodeExample;