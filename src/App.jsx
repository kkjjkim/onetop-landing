import React, { useState, useEffect, useRef } from 'react';

// --- Components ---

const FadeInUp = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setIsVisible(true);
      });
    }, { threshold: 0.1 });
    if (domRef.current) observer.observe(domRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
        }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const Counter = ({ end, duration = 2000, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const domRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !hasAnimated) {
        setHasAnimated(true);
        let start = 0;
        const increment = end / (duration / 16);
        const timer = setInterval(() => {
          start += increment;
          if (start >= end) {
            setCount(end);
            clearInterval(timer);
          } else {
            setCount(Math.floor(start));
          }
        }, 16);
      }
    });
    if (domRef.current) observer.observe(domRef.current);
  }, [end, duration, hasAnimated]);

  return <span ref={domRef}>{count.toLocaleString()}{suffix}</span>;
};

// --- Mock Data ---
const RECENT_APPROVALS = [
  { region: '경기', industry: '제조업', amount: '3억 원', type: '운전자금' },
  { region: '서울', industry: 'IT개발', amount: '1.5억 원', type: '창업자금' },
  { region: '충남', industry: '도소매', amount: '5억 원', type: '시설자금' },
  { region: '인천', industry: '수출업', amount: '2억 원', type: '운전자금' },
  { region: '부산', industry: '서비스', amount: '1억 원', type: '경영안정' },
  { region: '경기', industry: '바이오', amount: '10억 원', type: 'R&D자금' },
];

// --- Checklist Data ---
const CHECKLIST_ITEMS = [
  "자금 조달을 위해 여러 곳에 문의했지만 '조건이 안 된다'는 답변만 들었다.",
  "바쁜 업무 때문에 사업계획서나 재무제표 관리에 신경 쓸 여유가 전혀 없다.",
  "정책자금 브로커에게 속아 과도한 수수료를 냈거나 서류를 조작한 경험이 있다.",
  "현직 은행원이나 국가공인 전문가의 도움 없이 혼자 해결하려고 했다.",
  "기업 신용 등급이 낮거나 부채 비율이 높아 금융기관 접근에 어려움을 겪고 있다.",
  "2026년 정책자금 확보 로드맵이 전혀 세워져 있지 않다.",
];

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHeroPassed, setIsHeroPassed] = useState(false);
  const [formState, setFormState] = useState({ company: '', name: '', phone: '', sales: '' });
  const heroRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      if (heroRef.current) {
        setIsHeroPassed(window.scrollY > heroRef.current.offsetHeight - 100);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzdwtQJ4KN7racN72gzgQtStA22GYAoWNvYY183kB0wS5xODPToYzObiJj96uByk2qb/exec';

    console.log('폼 제출 시작:', formState);

    try {
      const formData = new FormData();
      formData.append('company', formState.company);
      formData.append('name', formState.name);
      formData.append('phone', formState.phone);
      formData.append('sales', formState.sales);

      // URLSearchParams로 변환하여 전송 (Google Apps Script와 더 호환성이 좋음)
      const params = new URLSearchParams();
      params.append('company', formState.company);
      params.append('name', formState.name);
      params.append('phone', formState.phone);
      params.append('sales', formState.sales);

      const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString()
      });

      console.log('요청 전송 완료 (no-cors 모드에서는 응답 확인 불가)');
    } catch (error) {
      console.error('폼 제출 에러:', error);
    }

    alert("무료 진단 신청이 완료되었습니다.\n담당 경영지도사가 빠르게 연락드리겠습니다.");
    setFormState({ company: '', name: '', phone: '', sales: '' });
  };

  return (
    <div className="min-h-screen bg-navy-900 text-white font-sans selection:bg-gold-500 selection:text-navy-900 overflow-x-hidden pb-20 md:pb-0">

      {/* Top Banner Ticker */}
      <div className="bg-gold-500 text-navy-900 text-xs font-bold py-2 overflow-hidden whitespace-nowrap relative z-50">
        <div className="animate-scroll inline-block">
          {[...RECENT_APPROVALS, ...RECENT_APPROVALS, ...RECENT_APPROVALS].map((item, i) => (
            <span key={i} className="mx-6">
              <i className="fa-solid fa-bell mr-2"></i>
              [{item.region}] {item.industry} <b>{item.amount} {item.type} 승인 완료</b> (최근)
            </span>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <nav className={`fixed w-full z-40 transition-all duration-300 ${isScrolled ? 'bg-navy-900/95 shadow-lg py-3 backdrop-blur-md' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/onetop-logo.png" alt="원탑경영컨설팅" className="w-10 h-10" />
            <div className="flex flex-col leading-none">
              <span className="text-lg font-bold tracking-tight text-white">ONE TOP</span>
              <span className="text-xs text-gold-500 font-medium tracking-widest">MANAGEMENT</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#contact" className="px-6 py-2.5 bg-transparent border border-gold-500 text-gold-500 font-bold rounded hover:bg-gold-500 hover:text-navy-900 transition-all">
              무료 진단 신청
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section (Hook: 도발적 질문) */}
      <header ref={heroRef} className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000"
            alt="Business Building"
            className="w-full h-full object-cover opacity-20 transform scale-105 animate-pulse"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-900 via-navy-900/80 to-navy-900"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 pt-20 text-center">
          <FadeInUp>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-600 text-white text-sm font-bold mb-8 backdrop-blur-sm shadow-xl">
              <span className="w-2 h-2 rounded-full bg-red-300 animate-pulse"></span>
              대표님, 정말 '아무에게나' 맡기시겠습니까?
            </div>
          </FadeInUp>

          <FadeInUp delay={200}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8">
              [긴급] 2026년 정책자금,<br />
              <span className="text-gold-gradient">우리 회사 한도 조회하기</span><br />
              (30초 소요)
            </h1>
          </FadeInUp>

          <FadeInUp delay={400}>
            <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-12 font-light">
              "무자격자의 도움을 받으실 건가요?"<br />
              <strong className="text-white">전직 은행원 출신, 국가공인 경영지도사</strong>가<br />
              심사위원의 언어로 기업의 가치를 증명해 드립니다.
            </p>
          </FadeInUp>

          <FadeInUp delay={600}>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <a
                href="#contact"
                className="w-full md:w-auto px-10 py-5 bg-gold-500 text-navy-900 text-lg font-bold rounded-lg shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:shadow-[0_0_50px_rgba(212,175,55,0.6)] hover:bg-gold-400 transition-all transform hover:-translate-y-1 relative overflow-hidden group"
              >
                <span className="relative z-10">전문가 무료 상담 신청하기</span>
                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:animate-shimmer"></div>
              </a>
            </div>
          </FadeInUp>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-slate-500">
          <i className="fa-solid fa-chevron-down text-2xl"></i>
        </div>
      </header>

      {/* Stats Section */}
      <section className="py-10 bg-navy-800 border-y border-white/5 relative z-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/10">
            <div>
              <p className="text-3xl md:text-4xl font-bold text-white mb-1"><Counter end={96} suffix="%" /></p>
              <p className="text-xs md:text-sm text-slate-400 uppercase tracking-wider">승인 성공률</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-white mb-1"><Counter end={350} suffix="억+" /></p>
              <p className="text-xs md:text-sm text-slate-400 uppercase tracking-wider">누적 승인 금액</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-white mb-1"><Counter end={1200} suffix="건+" /></p>
              <p className="text-xs md:text-sm text-slate-400 uppercase tracking-wider">누적 상담 건수</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-white mb-1"><Counter end={14} suffix="년" /></p>
              <p className="text-xs md:text-sm text-slate-400 uppercase tracking-wider">금융 경력</p>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Agitation (Pain: 왜 자금 조달에 실패하는가) */}
      <section id="problem" className="py-24 bg-white text-navy-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-red-500 font-bold tracking-widest uppercase mb-2 block">Pain Point</span>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              반드시 알아야 할<br />
              <span className="relative inline-block">
                정책자금 '반려'의 3가지 진실
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-red-500 opacity-50" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
                </svg>
              </span>
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              한 번의 반려 기록은 향후 6개월 이상 자금 조달을 막을 수 있습니다.<br />
              실패 원인을 정확히 알아야 다음 기회가 있습니다.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: 'fa-file-circle-xmark', title: '허술한 사업계획서', desc: '은행/기술보증기금/신보 등 기관별 심사 포인트가 다릅니다. 복사 붙여넣기 식 서류는 심사위원에게 1분 안에 간파당합니다.' },
              { icon: 'fa-user-secret', title: '무자격자 컨설팅', desc: '실제 심사위원은 박사급, 국가공인 전문자격사들입니다. 심사 경험도 없는 비전문가에게 의뢰하는 순간 이미 실패입니다.' },
              { icon: 'fa-arrow-trend-down', title: '선행 재무 관리 부재', desc: '단순히 매출만 높다고 승인되지 않습니다. 부채비율, 유동비율, 가지급금 정리 등 재무제표가 선행 관리되어야 합니다.' }
            ].map((item, idx) => (
              <FadeInUp key={idx} delay={idx * 100}>
                <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:shadow-xl transition-all h-full group">
                  <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-red-500 text-2xl mb-6 group-hover:scale-110 transition-transform">
                    <i className={`fa-solid ${item.icon}`}></i>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              </FadeInUp>
            ))}
          </div>
        </div>
      </section>

      {/* Self-Diagnosis Checklist */}
      <section id="checklist" className="py-24 bg-navy-800 text-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-gold-500 font-bold tracking-widest uppercase mb-2 block">Self Diagnosis</span>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              혹시 대표님도 해당되시나요?<br />
              <span className="text-slate-300">지금 바로 3가지만 체크해보세요.</span>
            </h2>
          </div>

          <div className="max-w-3xl mx-auto bg-navy-900 rounded-3xl p-8 md:p-12 shadow-2xl border border-gold-500/30">
            <ul className="space-y-6">
              {CHECKLIST_ITEMS.map((item, idx) => (
                <FadeInUp key={idx} delay={idx * 100}>
                  <li className="flex items-start gap-4 p-4 bg-navy-700/50 rounded-lg border border-gold-500/20">
                    <div className="flex-shrink-0 mt-1">
                      <i className="fa-solid fa-square-check text-gold-500 text-2xl"></i>
                    </div>
                    <p className="text-lg font-light text-slate-200 leading-relaxed">{item}</p>
                  </li>
                </FadeInUp>
              ))}
            </ul>

            <FadeInUp delay={700}>
              <div className="mt-10 text-center bg-red-600/20 border border-red-500/50 p-6 rounded-xl">
                <p className="text-xl font-bold text-red-400">
                  <i className="fa-solid fa-triangle-exclamation mr-2"></i>
                  이 중 <strong>3개 이상</strong> 해당된다면, 이미 자금 확보의 골든타임을 놓치고 계실 수 있습니다.
                </p>
                <p className="text-slate-300 mt-3">지금 당장 전문가와 상담하여 다음 단계를 준비하세요.</p>
              </div>
              <a
                href="#contact"
                className="mt-6 w-full px-10 py-4 bg-gold-500 text-navy-900 text-lg font-bold rounded-lg shadow-lg hover:bg-gold-400 transition-all flex justify-center items-center gap-2"
              >
                긴급 무료 자가진단 및 상담 신청
              </a>
            </FadeInUp>
          </div>
        </div>
      </section>

      {/* Authority Section (Solution: 은행원 출신의 해결책) */}
      <section id="authority" className="py-24 bg-navy-950 relative overflow-hidden">
        {/* Background Graphic */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gold-500/5 -skew-x-12 translate-x-20"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeInUp>
              <div className="relative">
                <img
                  src="/ceo-profile.jpg"
                  alt="김경중 대표"
                  className="rounded-2xl shadow-2xl border-4 border-navy-800 transition-all duration-700 object-cover object-top h-[600px] w-full"
                />
                <div className="absolute -bottom-10 -right-10 bg-gold-500 text-navy-900 p-8 rounded-tr-3xl rounded-bl-3xl shadow-xl hidden md:block">
                  <p className="text-sm font-bold opacity-80 mb-1">REPRESENTATIVE</p>
                  <p className="text-2xl font-bold">대표 김 경 중</p>
                </div>
              </div>
            </FadeInUp>

            <div>
              <FadeInUp delay={200}>
                <h4 className="text-gold-500 font-bold tracking-widest uppercase mb-4">The Solution</h4>
                <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">
                  단순 서류 대행이 아닌,<br />
                  <span className="text-slate-300">은행과 정부기관의 문을 엽니다.</span>
                </h2>
              </FadeInUp>

              <div className="space-y-6">
                <FadeInUp delay={300}>
                  <div className="flex gap-6 items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-navy-800 rounded-lg flex items-center justify-center text-gold-500 border border-white/10 mt-1">
                      <i className="fa-solid fa-building-columns text-xl"></i>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">은행 내부 심사 로직 완벽 분석</h3>
                      <p className="text-slate-400">前 시중은행 경력 10년 이상의 대표가 은행 내부 심사 규정(CSS)을 토대로 기업의 등급을 최적화하고 승인 확률을 극대화합니다.</p>
                    </div>
                  </div>
                </FadeInUp>

                <FadeInUp delay={400}>
                  <div className="flex gap-6 items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-navy-800 rounded-lg flex items-center justify-center text-gold-500 border border-white/10 mt-1">
                      <i className="fa-solid fa-scale-balanced text-xl"></i>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">국가기관 전문위원의 시각</h3>
                      <p className="text-slate-400">중소벤처기업부, 창업진흥원 등 다수 기관 자문/전문위원 활동 경험을 바탕으로, 심사위원이 원하는 핵심 내용과 보고서 구조를 정확히 압니다.</p>
                    </div>
                  </div>
                </FadeInUp>

                <FadeInUp delay={500}>
                  <div className="flex gap-6 items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-navy-800 rounded-lg flex items-center justify-center text-gold-500 border border-white/10 mt-1">
                      <i className="fa-solid fa-id-card text-xl"></i>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">국가공인 경영지도사의 안전성</h3>
                      <p className="text-slate-400">합법적인 컨설팅 자격(경영지도사)을 갖춘 전문가가 진행하여 불법 브로커 리스크 없이 투명하고 합리적인 비용으로 최고의 결과물을 보장합니다.</p>
                    </div>
                  </div>
                </FadeInUp>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-24 bg-slate-100 text-navy-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">왜 <span className="text-gold-600">원탑경영컨설팅</span>이어야 할까요?</h2>
            <p className="text-slate-600">결과로 증명하는 차이를 확인하세요.</p>
          </div>

          <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">
            <div className="grid grid-cols-3 bg-navy-900 text-white py-4 text-center font-bold text-sm md:text-base">
              <div className="py-2">구분</div>
              <div className="py-2 text-slate-400">일반 브로커</div>
              <div className="py-2 text-gold-500">원탑 컨설팅</div>
            </div>
            <div className="divide-y divide-slate-100">
              {[
                { label: '전문성', bad: '보험/영업 사원 출신', good: '은행원/경영지도사 출신' },
                { label: '수수료', bad: '과도한 성공보수 요구', good: '업계 최저 수준의 합리적 비용' },
                { label: '접근 방식', bad: '서류 조작/허위 신고', good: '기업 가치 분석 및 합법적 설계' },
                { label: '사후 관리', bad: '자금 수령 후 연락 두절', good: '지속적 등급 관리 및 추가 매칭' },
                { label: 'R&D 연계', bad: '불가능 (전문성 부재)', good: '벤처/이노비즈/R&D 로드맵 제공' },
              ].map((row, idx) => (
                <div key={idx} className="grid grid-cols-3 text-center py-6 items-center hover:bg-slate-50 transition-colors">
                  <div className="font-bold text-slate-700">{row.label}</div>
                  <div className="text-slate-500 text-sm md:text-base">{row.bad}</div>
                  <div className="text-navy-900 font-bold text-sm md:text-base bg-blue-50/50 py-1 rounded mx-2">{row.good}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Success Cases (Proof with Visuals) */}
      <section id="cases" className="py-24 bg-navy-900 relative">
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <span className="text-gold-500 font-bold tracking-widest uppercase mb-2 block">Proof & Results</span>
              <h2 className="text-3xl md:text-4xl font-bold">가능성을 확신으로 바꾼<br />실제 승인 사례</h2>
            </div>
            <a href="#contact" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2">
              더 많은 사례 보기 <i className="fa-solid fa-arrow-right"></i>
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Case 1 */}
            <FadeInUp>
              <div className="bg-navy-800 rounded-2xl p-8 border border-white/5 hover:border-gold-500/50 transition-all group h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-slate-600 bg-slate-700">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
                      className="w-full h-full object-cover filter blur-[2px] opacity-80"
                      alt="Customer"
                    />
                  </div>
                  <div>
                    <span className="bg-blue-900/50 text-blue-300 text-xs font-bold px-2 py-1 rounded border border-blue-500/30">제조업 K사</span>
                    <p className="text-slate-300 font-bold text-sm mt-1">대표 김○○님</p>
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-4 group-hover:text-gold-400 transition-colors">"부채비율 400% 악조건,<br />기술력 평가로 뚫었습니다."</h3>
                <p className="text-slate-400 text-sm mb-6">
                  타 기관에서 부채 과다로 거절. 대표님의 특허 기술 가치를 평가받아 기술보증기금 벤처캠프 전형으로 우회 접수하여 승인.
                </p>
                <div className="bg-navy-900 rounded-lg p-4 flex justify-around items-center">
                  <div className="text-center">
                    <p className="text-xs text-slate-500">금리</p>
                    <p className="font-bold text-red-400 text-lg"><i className="fa-solid fa-arrow-down mr-1"></i>2.8%</p>
                  </div>
                  <div className="w-px h-8 bg-white/10"></div>
                  <div className="text-center">
                    <p className="text-xs text-slate-500">한도</p>
                    <p className="font-bold text-green-400 text-lg"><i className="fa-solid fa-arrow-up mr-1"></i>3억</p>
                  </div>
                </div>
              </div>
            </FadeInUp>

            {/* Case 2 */}
            <FadeInUp delay={200}>
              <div className="bg-navy-800 rounded-2xl p-8 border border-white/5 hover:border-gold-500/50 transition-all group h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-slate-600 bg-slate-700">
                    <img
                      src="https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&w=200&q=80"
                      className="w-full h-full object-cover filter blur-[2px] opacity-80"
                      alt="Customer"
                    />
                  </div>
                  <div>
                    <span className="bg-purple-900/50 text-purple-300 text-xs font-bold px-2 py-1 rounded border border-purple-500/30">IT 스타트업 P사</span>
                    <p className="text-slate-300 font-bold text-sm mt-1">대표 이○○님</p>
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-4 group-hover:text-gold-400 transition-colors">"R&D 과제 탈락 후 재설계,<br />무상환 자금 확보."</h3>
                <p className="text-slate-400 text-sm mb-6">
                  사업계획서의 논리적 모순 수정 및 심사위원 선호 BM으로 피봇팅. 디딤돌 과제 선정으로 갚지 않아도 되는 지원금 확보.
                </p>
                <div className="bg-navy-900 rounded-lg p-4 flex justify-around items-center">
                  <div className="text-center">
                    <p className="text-xs text-slate-500">상환의무</p>
                    <p className="font-bold text-white text-lg">없음</p>
                  </div>
                  <div className="w-px h-8 bg-white/10"></div>
                  <div className="text-center">
                    <p className="text-xs text-slate-500">기업가치</p>
                    <p className="font-bold text-green-400 text-lg"><i className="fa-solid fa-arrow-up mr-1"></i>2배</p>
                  </div>
                </div>
              </div>
            </FadeInUp>

            {/* Case 3 */}
            <FadeInUp delay={400}>
              <div className="bg-navy-800 rounded-2xl p-8 border border-white/5 hover:border-gold-500/50 transition-all group h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-slate-600 bg-slate-700">
                    <img
                      src="https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=200&q=80"
                      className="w-full h-full object-cover filter blur-[2px] opacity-80"
                      alt="Customer"
                    />
                  </div>
                  <div>
                    <span className="bg-emerald-900/50 text-emerald-300 text-xs font-bold px-2 py-1 rounded border border-emerald-500/30">도소매 Y사</span>
                    <p className="text-slate-300 font-bold text-sm mt-1">대표 최○○님</p>
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-4 group-hover:text-gold-400 transition-colors">"재무제표 관리로<br />신용등급 2단계 상승."</h3>
                <p className="text-slate-400 text-sm mb-6">
                  가지급금 정리 및 자본금 증자 솔루션 제공. 재무 건전성을 확보하여 기존 대출 대환 및 추가 한도 2배 이상 증액 성공.
                </p>
                <div className="bg-navy-900 rounded-lg p-4 flex justify-around items-center">
                  <div className="text-center">
                    <p className="text-xs text-slate-500">신용등급</p>
                    <p className="font-bold text-green-400 text-lg"><i className="fa-solid fa-arrow-up mr-1"></i>BB+</p>
                  </div>
                  <div className="w-px h-8 bg-white/10"></div>
                  <div className="text-center">
                    <p className="text-xs text-slate-500">여유자금</p>
                    <p className="font-bold text-white text-lg">확보</p>
                  </div>
                </div>
              </div>
            </FadeInUp>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-white text-navy-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">어떻게 진행되나요?</h2>
            <p className="text-slate-600">상담부터 사후관리까지 원스톱으로 진행됩니다.</p>
          </div>

          <div className="relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-slate-200 -z-10"></div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                { step: '01', title: '무료 진단', desc: '기업 등급 및 한도 가조회' },
                { step: '02', title: '전략 수립', desc: '최적의 정책자금 매칭' },
                { step: '03', title: '실행 및 승인', desc: '서류 작성 및 현장 실사 대비' },
                { step: '04', title: '사후 관리', desc: '등급 관리 및 추가 자금 로드맵' }
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-6 text-center group">
                  <div className="w-24 h-24 bg-navy-50 rounded-full flex items-center justify-center text-navy-900 font-bold text-2xl mx-auto mb-6 border-4 border-white shadow-lg group-hover:bg-gold-500 group-hover:text-white transition-colors relative z-10">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-slate-500 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section (단순 리스트 형식) */}
      <section className="py-24 bg-slate-50 text-navy-900">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">자주 묻는 질문</h2>
            <p className="text-slate-600">대표님들이 가장 많이 궁금해하는 핵심 질문과 답변입니다.</p>
          </div>
          <div className="space-y-6">
            {[
              { q: '이미 다른 곳에서 부결되었습니다. 가능할까요?', a: '네, 가능합니다. 부결 사유를 정확히 분석하여 이를 보완하거나, 다른 성격의 자금(시설자금, R&D 등)으로 우회 전략을 수립하면 승인 가능성이 있습니다.' },
              { q: '컨설팅 비용은 얼마나 드나요?', a: '상담 및 1차 진단은 무료입니다. 계약 시 발생하는 착수금과 성공보수는 업계 최저 수준의 합리적인 비용으로 책정되며, 계약서에 투명하게 명시됩니다.' },
              { q: '무상지원금(바우처)도 컨설팅도 진행하시나요?', a: '네, 진행합니다. 단순 대필이 아닙니다. 평가위원 관점에서 합격 확률을 극대화하는 정석적인 컨설팅입니다. 심사 경험이 있는 전문가가 직접 기획하고 작성하여, 심사위원이 점수를 줄 수밖에 없는 사업계획서를 완성해 드립니다.' },
              { q: '신용등급이 낮은데 괜찮을까요?', a: '신용등급이 낮다면 등급에 영향을 덜 받는 특화 자금을 노려야 합니다. 대표님의 상황에 맞는 자금을 찾아드립니다.' },
            ].map((item, idx) => (
              <FadeInUp key={idx} delay={idx * 100}>
                <div className="bg-white rounded-xl shadow-lg border-l-4 border-gold-500 overflow-hidden p-6">
                  <p className="font-bold text-lg mb-2 flex items-start gap-2">
                    <span className="text-gold-500">Q.</span> {item.q}
                  </p>
                  <div className="pt-2 border-t border-slate-100">
                    <p className="text-slate-600 leading-relaxed flex items-start gap-2">
                      <span className="font-bold text-navy-900">A.</span> {item.a}
                    </p>
                  </div>
                </div>
              </FadeInUp>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section (Consulting Form) */}
      <section id="contact" className="py-24 bg-navy-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        {/* Decoration */}
        <div className="absolute -left-20 top-20 w-72 h-72 bg-gold-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute -right-20 bottom-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl flex flex-col md:flex-row gap-12">

            <div className="md:w-1/2">
              <span className="text-gold-500 font-bold tracking-widest uppercase mb-4 block">Contact Us</span>
              <h2 className="text-4xl font-bold mb-6">대표님의 사업,<br /><span className="text-gold-500">아무에게나 맡기시겠습니까?</span></h2>
              <p className="text-slate-300 mb-8 leading-relaxed">
                2026년 정책자금 선점을 위한 골든타임입니다.<br />
                지금 무료 상담을 신청하시고 자금 확보 가능성을 확인하세요.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-4 text-slate-300">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gold-500">
                    <i className="fa-solid fa-phone"></i>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">대표 전화</p>
                    <p className="font-bold text-lg">010-8533-0140</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-slate-300">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gold-500">
                    <i className="fa-solid fa-location-dot"></i>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">오시는 길</p>
                    <p className="font-bold">경기도 성남시 분당구 황새울로 200번길 36, 519호</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:w-1/2 bg-white rounded-2xl p-6 md:p-8 text-navy-900 shadow-xl">
              <h3 className="text-xl font-bold mb-6 text-center">무료 진단 및 상담 신청</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">성함</label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={e => setFormState({ ...formState, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:border-navy-900 transition-colors"
                    placeholder="홍길동"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">연락처</label>
                  <input
                    type="tel"
                    required
                    value={formState.phone}
                    onChange={e => setFormState({ ...formState, phone: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:border-navy-900 transition-colors"
                    placeholder="010-1234-5678"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-navy-900 hover:bg-navy-800 text-white font-bold py-4 rounded-lg shadow-lg transition-all transform hover:-translate-y-1 flex justify-center items-center gap-2"
                  >
                    <span>내 한도 무료로 문자 받기</span>
                    <i className="fa-solid fa-paper-plane"></i>
                  </button>
                  <p className="text-center text-xs text-slate-400 mt-3">
                    <i className="fa-solid fa-lock mr-1"></i>정보는 상담 목적으로만 사용되며 안전하게 보호됩니다.
                  </p>
                </div>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy-950 py-12 border-t border-white/5 text-slate-500 text-xs md:text-sm">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="mb-4 md:mb-0">
              <span className="text-white font-bold text-lg">ONE TOP CONSULTING</span>
            </div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">이용약관</a>
              <a href="#" className="hover:text-white transition-colors">개인정보처리방침</a>
              <a href="#" className="hover:text-white transition-colors">오시는길</a>
            </div>
          </div>

          <div className="border-t border-white/5 pt-8">
            <p className="leading-relaxed">
              (주)원탑경영컨설팅 | 대표자: 김경중 | 사업자등록번호: 520-81-02461<br />
              주소: 경기도 성남시 분당구 황새울로 200번길 36, 519호 | 전화: 010-8533-0140 | 이메일: onetopkkj@gmail.com<br />
              <span className="opacity-50">Copyright © 2024 One Top Consulting. All rights reserved. 본 사이트의 콘텐츠는 저작권법의 보호를 받습니다.</span>
            </p>
          </div>
        </div>
      </footer>

      {/* Sticky Global CTA (Desktop) */}
      <a
        href="#contact"
        className={`fixed right-6 bottom-6 z-[60] 
                   bg-gold-500 text-navy-900 font-bold py-3 px-6 rounded-full shadow-2xl 
                   transition-all duration-300 transform 
                   ${isHeroPassed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20 pointer-events-none'}
                   hover:bg-gold-400 hover:scale-105 hidden md:flex items-center gap-2`}
      >
        <i className="fa-solid fa-bolt"></i> 긴급 무료 진단 신청
      </a>

      {/* Sticky Mobile CTA */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-navy-900 border-t border-white/10 p-4 z-50 flex gap-2 shadow-2xl">
        <a href="tel:010-8533-0140" className="flex-1 bg-white text-navy-900 font-bold py-3 rounded flex items-center justify-center gap-2">
          <i className="fa-solid fa-phone"></i> 전화 상담
        </a>
        <a href="#contact" className="flex-[2] bg-gold-500 text-navy-900 font-bold py-3 rounded flex items-center justify-center gap-2">
          무료 진단 신청하기 <i className="fa-solid fa-angle-right"></i>
        </a>
      </div>
    </div>
  );
}
