import React, { useState, useEffect } from 'react';
import { BookOpen, FileText, Award, Users, Search, Moon, Sun, Settings, CheckSquare, Plus, Trash2, ArrowRight } from 'lucide-react';

interface Student {
  id: string;
  name: string;
  exam: string;
  quiz: string;
  note: string;
}

interface ClassRoom {
  id: string;
  name: string;
  students: Student[];
}

export default function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'archive' | 'classes' | 'notes'>('dashboard');
  const [darkMode, setDarkMode] = useState(false);
  
  // بيانات الأقسام والتلاميذ (محفوظة محلياً في ذاكرة الهاتف localStorage)
  const [classes, setClasses] = useState<ClassRoom[]>(() => {
    const saved = localStorage.getItem('professor_classes');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return [
      {
        id: '1',
        name: 'الرابعة متوسط 1',
        students: [
          { id: 's1', name: 'أحمد بن محمد', exam: '14', quiz: '15', note: 'مشارك ومهتم بالدرس' },
          { id: 's2', name: 'فاطمة الزهراء', exam: '17', quiz: '18', note: 'ممتازة في التحليل التاريخي' }
        ]
      },
      {
        id: '2',
        name: 'الثالثة متوسط 2',
        students: [
          { id: 's3', name: 'محمد أمين', exam: '11', quiz: '12', note: 'يحتاج متابعة في الخرائط' }
        ]
      }
    ];
  });

  const [selectedClassId, setSelectedClassId] = useState<string | null>(null);
  const [newClassName, setNewClassName] = useState('');
  const [newStudentName, setNewStudentName] = useState('');

  useEffect(() => {
    localStorage.setItem('professor_classes', JSON.stringify(classes));
  }, [classes]);

  // إضافة قسم جديد
  const handleAddClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClassName.trim()) return;
    const newClass: ClassRoom = {
      id: Date.now().toString(),
      name: newClassName.trim(),
      students: []
    };
    setClasses([...classes, newClass]);
    setNewClassName('');
  };

  // حذف قسم
  const handleDeleteClass = (classId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('هل أنت متأكد من حذف هذا القسم وكل بياناته؟')) {
      setClasses(classes.filter(c => c.id !== classId));
      if (selectedClassId === classId) setSelectedClassId(null);
    }
  };

  // إضافة تلميذ للقسم المحدد
  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentName.trim() || !selectedClassId) return;
    setClasses(classes.map(c => {
      if (c.id === selectedClassId) {
        return {
          ...c,
          students: [
            ...c.students,
            { id: Date.now().toString(), name: newStudentName.trim(), exam: '', quiz: '', note: '' }
          ]
        };
      }
      return c;
    }));
    setNewStudentName('');
  };

  // تحديث بيانات تلميذ (العلامات والملاحظات)
  const handleUpdateStudent = (studentId: string, field: 'exam' | 'quiz' | 'note', value: string) => {
    if (!selectedClassId) return;
    setClasses(classes.map(c => {
      if (c.id === selectedClassId) {
        return {
          ...c,
          students: c.students.map(s => {
            if (s.id === studentId) {
              return { ...s, [field]: value };
            }
            return s;
          })
        };
      }
      return c;
    }));
  };

  const selectedClass = classes.find(c => c.id === selectedClassId);

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-slate-900 text-slate-100' : 'bg-[#fdfbf7] text-slate-800'} font-sans transition-colors duration-200 pb-20`}>
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
          >
            {darkMode ? <Sun size={20} className="text-amber-400" /> : <Moon size={20} className="text-slate-600" />}
          </button>
        </div>
      </header>

      {/* المحتوى الرئيسي */}
      <main className="p-4 max-w-5xl mx-auto">
        {/* شاشة لوحة التحكم الرئيسية */}
        {activeTab === 'dashboard' && (
          <div>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div 
                onClick={() => setActiveTab('archive')}
                className={`p-4 rounded-2xl border ${darkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-amber-900/10 shadow-sm'} hover:shadow-md transition-all cursor-pointer flex items-center gap-4`}
              >
                <div className="p-3 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400"><BookOpen size={28} /></div>
                <div>
                  <h3 className="font-bold text-lg">المطويات والملخصات</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">أكثر من 25 مطوية جاهزة للطباعة والعرض</p>
                </div>
              </div>

              <div 
                onClick={() => setActiveTab('archive')}
                className={`p-4 rounded-2xl border ${darkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-amber-900/10 shadow-sm'} hover:shadow-md transition-all cursor-pointer flex items-center gap-4`}
              >
                <div className="p-3 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400"><FileText size={28} /></div>
                <div>
                  <h3 className="font-bold text-lg">الفروض والاختبارات</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">بنك الفروض الثلاثية مع عناصر الإجابة</p>
                </div>
              </div>

              <div 
                onClick={() => setActiveTab('notes')}
                className={`p-4 rounded-2xl border ${darkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-amber-900/10 shadow-sm'} hover:shadow-md transition-all cursor-pointer flex items-center gap-4`}
              >
                <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"><Award size={28} /></div>
                <div>
                  <h3 className="font-bold text-lg">خلاصة التجارب والمنهجية</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">عصارة 15 سنة من التدريس والمرافقة</p>
                </div>
              </div>

              <div 
                onClick={() => setActiveTab('classes')}
                className={`p-4 rounded-2xl border ${darkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-amber-900/10 shadow-sm'} hover:shadow-md transition-all cursor-pointer flex items-center gap-4`}
              >
                <div className="p-3 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400"><Users size={28} /></div>
                <div>
                  <h3 className="font-bold text-lg">دفتر التنقيط والأقسام</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">إدارة الأفواج، العلامات، وملاحظات التلاميذ</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* شاشة الأقسام ودفتر التنقيط */}
        {activeTab === 'classes' && (
          <div>
            {!selectedClassId ? (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <Users className="text-purple-600" /> الأفواج والأقسام المسجلة
                  </h2>
                  <span className="text-xs bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300 px-2.5 py-1 rounded-full font-medium">
                    {classes.length} أقسام
                  </span>
                </div>

                {/* نموذج إضافة قسم جديد */}
                <form onSubmit={handleAddClass} className="mb-6 flex gap-2">
                  <input 
                    type="text"
                    value={newClassName}
                    onChange={(e) => setNewClassName(e.target.value)}
                    placeholder="اسم القسم الجديد (مثال: الأولى متوسط 3)..."
                    className={`flex-1 px-4 py-2.5 rounded-xl border ${darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-amber-900/20'} focus:outline-none focus:ring-2 focus:ring-purple-600`}
                  />
                  <button 
                    type="submit"
                    className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-colors shadow-sm"
                  >
                    <Plus size={18} /> إضافة قسم
                  </button>
                </form>

                {/* قائمة الأقسام */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {classes.map((cls) => (
                    <div 
                      key={cls.id}
                      onClick={() => setSelectedClassId(cls.id)}
                      className={`p-4 rounded-xl border ${darkMode ? 'bg-slate-800 border-slate-700 hover:border-purple-500' : 'bg-white border-amber-900/10 hover:border-purple-500'} cursor-pointer shadow-sm transition-all flex justify-between items-center`}
                    >
                      <div>
                        <h3 className="font-bold text-lg">{cls.name}</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{cls.students.length} تلميذ مسجل</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={(e) => handleDeleteClass(cls.id, e)}
                          className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                          title="حذف القسم"
                        >
                          <Trash2 size={18} />
                        </button>
                        <ArrowRight size={18} className="text-slate-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                {/* رأس تفاصيل القسم */}
                <div className="flex items-center justify-between mb-4">
                  <button 
                    onClick={() => setSelectedClassId(null)}
                    className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1"
                  >
                    <ArrowRight size={16} className="rotate-180" /> العودة لقائمة الأقسام
                  </button>
                  <h2 className="text-lg font-bold text-purple-600 dark:text-purple-400">
                    {selectedClass?.name}
                  </h2>
                </div>

                {/* إضافة تلميذ جديد للقسم */}
                <form onSubmit={handleAddStudent} className="mb-4 flex gap-2">
                  <input 
                    type="text"
                    value={newStudentName}
                    onChange={(e) => setNewStudentName(e.target.value)}
                    placeholder="اسم ولقب التلميذ الجديد..."
                    className={`flex-1 px-3 py-2 rounded-lg border text-sm ${darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-amber-900/20'} focus:outline-none focus:ring-2 focus:ring-purple-600`}
                  />
                  <button 
                    type="submit"
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1 shadow-sm"
                  >
                    <Plus size={16} /> إضافة تلميذ
                  </button>
                </form>

                {/* جدول دفتر التنقيط */}
                <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                  <table className="w-full text-right border-collapse">
                    <thead>
                      <tr className={`border-b text-xs ${darkMode ? 'bg-slate-800/90 border-slate-700 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'}`}>
                        <th className="p-3">التلميذ</th>
                        <th className="p-3 w-20 text-center">الفرض (/20)</th>
                        <th className="p-3 w-20 text-center">الاختبار (/20)</th>
                        <th className="p-3 w-24 text-center">المعدل</th>
                        <th className="p-3">ملاحظات وسلوك</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-sm">
                      {selectedClass?.students.map((student) => {
                        const examNum = parseFloat(student.exam) || 0;
                        const quizNum = parseFloat(student.quiz) || 0;
                        const avg = (student.exam !== '' && student.quiz !== '') ? ((quizNum + (examNum * 2)) / 3).toFixed(2) : '-';

                        return (
                          <tr key={student.id} className={darkMode ? 'bg-slate-900/50' : 'bg-white'}>
                            <td className="p-3 font-medium">{student.name}</td>
                            <td className="p-2 text-center">
                              <input 
                                type="number" 
                                min="0" 
                                max="20" 
                                step="0.25"
                                value={student.quiz}
                                onChange={(e) => handleUpdateStudent(student.id, 'quiz', e.target.value)}
                                className={`w-16 text-center py-1 rounded border text-sm ${darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-300'}`}
                              />
                            </td>
                            <td className="p-2 text-center">
                              <input 
                                type="number" 
                                min="0" 
                                max="20" 
                                step="0.25"
                                value={student.exam}
                                onChange={(e) => handleUpdateStudent(student.id, 'exam', e.target.value)}
                                className={`w-16 text-center py-1 rounded border text-sm ${darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-300'}`}
                              />
                            </td>
                            <td className="p-3 text-center font-bold text-amber-600 dark:text-amber-400">
                              {avg}
                            </td>
                            <td className="p-2">
                              <input 
                                type="text"
                                value={student.note}
                                onChange={(e) => handleUpdateStudent(student.id, 'note', e.target.value)}
                                placeholder="ملاحظة..."
                                className={`w-full px-2 py-1 rounded border text-xs ${darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-300'}`}
                              />
                            </td>
                          </tr>
                        );
                      })}
                      {selectedClass?.students.length === 0 && (
                        <tr>
                          <td colSpan={5} className="text-center py-8 text-slate-400 text-sm">
                            لا يوجد تلاميذ في هذا القسم حالياً. أضف تلميذاً للبدء.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* شاشة الأرشيف والمطويات */}
        {activeTab === 'archive' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
              <BookOpen className="text-amber-600" /> أرشيف المطويات والفروض
            </h2>
            <div className={`p-4 rounded-xl border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-amber-900/10'} shadow-sm`}>
              <h3 className="font-bold text-base mb-1">مطويات التاريخ والجغرافيا (السنة الرابعة متوسط)</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">ملخصات شاملة للوحدات التعليمية الثلاثة جاهزة للمراجعة.</p>
              <span className="inline-block bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 text-xs px-2.5 py-1 rounded-md font-medium">25 مطوية متوفرة</span>
            </div>
            <div className={`p-4 rounded-xl border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-amber-900/10'} shadow-sm`}>
              <h3 className="font-bold text-base mb-1">بنك الفروض والاختبارات الفصلية</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">نماذج مقترحة مع سلم التنقيط وعناصر الإجابة النموذجية.</p>
              <span className="inline-block bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 text-xs px-2.5 py-1 rounded-md font-medium">أكثر من 15 نموذجاً</span>
            </div>
          </div>
        )}

        {/* شاشة خلاصة التجارب والمنهجية */}
        {activeTab === 'notes' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
              <Award className="text-emerald-600" /> خلاصة 15 سنة من الخبرة والمنهجية
            </h2>
            <div className={`p-4 rounded-xl border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-amber-900/10'} shadow-sm`}>
              <h3 className="font-bold text-base mb-2 text-emerald-600 dark:text-emerald-400">منهجية الإجابة في التاريخ والجغرافيا</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                توجيهات دقيقة ومستخلصة من خبرة طويلة في التصحيح في شهادة التعليم المتوسط، تساعد التلميذ على هيكلة الإجابة، المصطلحات المفتاحية، وكيفية التعامل مع تحليل السندات التاريخية والجغرافية.
              </p>
            </div>
          </div>
        )}
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
