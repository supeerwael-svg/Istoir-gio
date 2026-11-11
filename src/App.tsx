import React, { useState } from 'react';
import { BookOpen, FileText, Award, Users, Search, Moon, Sun, Settings, CheckSquare } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'archive' | 'classes' | 'notes'>('dashboard');
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-slate-900 text-slate-100' : 'bg-[#fdfbf7] text-slate-800'} font-sans transition-colors duration-200`}>
      {/* شريط العنوان العلوي */}
      <header className={`px-4 py-3 border-b ${darkMode ? 'border-slate-800 bg-slate-900/90' : 'border-amber-900/10 bg-white/90'} sticky top-0 z-50 backdrop-blur flex justify-between items-center shadow-sm`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-amber-700 flex items-center justify-center text-white font-bold shadow-md border-2 border-amber-500">
            أ
          </div>
          <div>
            <h1 className="font-bold text-base leading-tight">أرشيف أستاذ الاجتماعيات</h1>
            <span className="text-xs text-amber-600 dark:text-amber-400">إصدار خاص - خبرة 15 سنة</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setDarkMode(!darkMode)} 
            className="p-2 rounded-full hover:bg-amber-500/10 transition-colors"
            title="تغيير المظهر"
          >
            {darkMode ? <Sun size={20} className="text-amber-400" /> : <Moon size={20} className="text-slate-600" />}
          </button>
          <button className="p-2 rounded-full hover:bg-amber-500/10 transition-colors">
            <Settings size={20} className={darkMode ? 'text-slate-300' : 'text-slate-600'} />
          </button>
        </div>
      </header>

      {/* المحتوى الرئيسي */}
      <main className="p-4 max-w-5xl mx-auto pb-24">
        {/* شريط البحث السريع */}
        <div className="mb-6 relative">
          <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
            <Search size={18} />
          </span>
          <input 
            type="text" 
            placeholder="ابحث في المطويات، الفروض، أو الدروس..." 
            className={`w-full pr-10 pl-4 py-2.5 rounded-xl border ${darkMode ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-400' : 'bg-white border-amber-900/20 text-slate-800 placeholder-slate-400'} focus:outline-none focus:ring-2 focus:ring-amber-600 shadow-sm`}
          />
        </div>

        {/* أقسام التطبيق الرئيسية */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div 
            onClick={() => setActiveTab('archive')}
            className={`p-4 rounded-2xl border ${darkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-amber-900/10 shadow-sm'} hover:shadow-md transition-all cursor-pointer flex items-center gap-4`}
          >
            <div className="p-3 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <BookOpen size={28} />
            </div>
            <div>
              <h3 className="font-bold text-lg">المطويات والملخصات</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">أكثر من 25 مطوعة جاهزة للطباعة والعرض</p>
            </div>
          </div>

          <div 
            onClick={() => setActiveTab('archive')}
            className={`p-4 rounded-2xl border ${darkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-amber-900/10 shadow-sm'} hover:shadow-md transition-all cursor-pointer flex items-center gap-4`}
          >
            <div className="p-3 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <FileText size={28} />
            </div>
            <div>
              <h3 className="font-bold text-lg">الفروض والاختبارات</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">بنك الفروض الثلاثية مع عناصر الإجابة</p>
            </div>
          </div>

          <div 
            onClick={() => setActiveTab('notes')}
            className={`p-4 rounded-2xl border ${darkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-amber-900/10 shadow-sm'} hover:shadow-md transition-all cursor-pointer flex items-center gap-4`}
          >
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <Award size={28} />
            </div>
            <div>
              <h3 className="font-bold text-lg">خلاصة التجارب والمنهجية</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">عصارة 15 سنة من التدريس والمرافقة</p>
            </div>
          </div>

          <div 
            onClick={() => setActiveTab('classes')}
            className={`p-4 rounded-2xl border ${darkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-amber-900/10 shadow-sm'} hover:shadow-md transition-all cursor-pointer flex items-center gap-4`}
          >
            <div className="p-3 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
              <Users size={28} />
            </div>
            <div>
              <h3 className="font-bold text-lg">دفتر التنقيط والأقسام</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">إدارة الأفواج، العلامات، وملاحظات التلاميذ</p>
            </div>
          </div>
        </div>
      </main>

      {/* شريط التنقل السفلي */}
      <nav className={`fixed bottom-0 inset-x-0 border-t ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-amber-900/10'} py-2 px-6 flex justify-around items-center shadow-lg`}>
        <button onClick={() => setActiveTab('dashboard')} className={`flex flex-col items-center gap-1 ${activeTab === 'dashboard' ? 'text-amber-600 dark:text-amber-400' : 'text-slate-400'}`}>
          <BookOpen size={22} />
          <span className="text-[10px]">الرئيسية</span>
        </button>
        <button onClick={() => setActiveTab('archive')} className={`flex flex-col items-center gap-1 ${activeTab === 'archive' ? 'text-amber-600 dark:text-amber-400' : 'text-slate-400'}`}>
          <FileText size={22} />
          <span className="text-[10px]">الأرشيف</span>
        </button>
        <button onClick={() => setActiveTab('classes')} className={`flex flex-col items-center gap-1 ${activeTab === 'classes' ? 'text-amber-600 dark:text-amber-400' : 'text-slate-400'}`}>
          <Users size={22} />
          <span className="text-[10px]">الأقسام</span>
        </button>
        <button onClick={() => setActiveTab('notes')} className={`flex flex-col items-center gap-1 ${activeTab === 'notes' ? 'text-amber-600 dark:text-amber-400' : 'text-slate-400'}`}>
          <CheckSquare size={22} />
          <span className="text-[10px]">التنقيط</span>
        </button>
      </nav>
    </div>
  );
}
