import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, RefreshCw, Building2, Calendar, Loader2 } from 'lucide-react';

// Section 1: AI 진단 위젯
// 기존의 Landing -> Survey -> Analysis -> Result 흐름을 하나의 박스 안에서 처리합니다.
const DiagnosisWidget = () => {
    const [step, setStep] = useState('intro'); // intro, industry, age, analysis, result
    const [data, setData] = useState({ industry: '', biz_age: '' });

    // 단계별 핸들러
    const handleStart = () => setStep('industry');

    const handleSelectIndustry = (value) => {
        setData(prev => ({ ...prev, industry: value }));
        setStep('age');
    };

    const handleSelectAge = (value) => {
        setData(prev => ({ ...prev, biz_age: value }));
        setStep('analysis');
    };

    // 분석 완료 후 결과 표시
    const handleAnalysisComplete = () => {
        setStep('result');
    };

    // 다시 진단하기
    const handleReset = () => {
        setStep('intro');
        setData({ industry: '', biz_age: '' });
    };

    return (
        <div className="w-full max-w-md mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden border border-slate-100 min-h-[500px] flex flex-col relative">
            {/* 상단 헤더 바 */}
            <div className="bg-primary px-6 py-4 flex justify-between items-center">
                <span className="text-white font-bold text-sm flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    AI 정책자금 진단
                </span>
                {step !== 'intro' && (
                    <button onClick={handleReset} className="text-slate-400 hover:text-white transition-colors">
                        <RefreshCw size={16} />
                    </button>
                )}
            </div>

            {/* 컨텐츠 영역 */}
            <div className="flex-1 p-6 flex flex-col justify-center relative">
                <AnimatePresence mode="wait">

                    {/* 1. 인트로 화면 */}
                    {step === 'intro' && (
                        <IntroView key="intro" onStart={handleStart} />
                    )}

                    {/* 2. 업종 선택 화면 */}
                    {step === 'industry' && (
                        <SelectionView
                            key="industry"
                            title="어떤 업종을 운영 중이신가요?"
                            options={[
                                { id: 'manufacture', label: '제조업', icon: '🏭' },
                                { id: 'it', label: 'IT / SW', icon: '💻' },
                                { id: 'wholesale', label: '도소매', icon: '📦' },
                                { id: 'other', label: '기타 서비스', icon: 'etc' },
                            ]}
                            onSelect={handleSelectIndustry}
                        />
                    )}

                    {/* 3. 업력 선택 화면 */}
                    {step === 'age' && (
                        <SelectionView
                            key="age"
                            title="사업 개시일로부터 얼마나 되셨나요?"
                            options={[
                                { id: 'pre', label: '예비 창업자', icon: '🌱' },
                                { id: 'under_3', label: '3년 미만', icon: '👶' },
                                { id: 'under_7', label: '7년 미만', icon: '👦' },
                                { id: 'over_7', label: '7년 이상', icon: '👨‍💼' },
                            ]}
                            onSelect={handleSelectAge}
                        />
                    )}

                    {/* 4. 분석 화면 */}
                    {step === 'analysis' && (
                        <AnalysisView key="analysis" data={data} onFinish={handleAnalysisComplete} />
                    )}

                    {/* 5. 결과 화면 */}
                    {step === 'result' && (
                        <ResultView key="result" data={data} />
                    )}

                </AnimatePresence>
            </div>
        </div>
    );
};

// --- 하위 컴포넌트들 ---

const IntroView = ({ onStart }) => (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="text-center space-y-6"
    >
        <div className="space-y-2">
            <h2 className="text-2xl font-bold text-primary leading-tight">
                2025년 정책자금,<br />
                <span className="text-brand">얼마나 받을 수 있을까요?</span>
            </h2>
            <p className="text-slate-500 text-sm">
                대표님 사업장에 딱 맞는 자금을<br />
                AI가 3초 만에 분석해 드립니다.
            </p>
        </div>
        <button
            onClick={onStart}
            className="w-full py-4 bg-brand hover:bg-brand-hover text-white font-bold rounded-xl shadow-lg shadow-brand/30 transition-all flex items-center justify-center gap-2 group"
        >
            무료 진단 시작하기
            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
        </button>
    </motion.div>
);

const SelectionView = ({ title, options, onSelect }) => (
    <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="space-y-4"
    >
        <h3 className="text-xl font-bold text-primary text-center mb-6">{title}</h3>
        <div className="grid grid-cols-1 gap-3">
            {options.map((opt) => (
                <button
                    key={opt.id}
                    onClick={() => onSelect(opt.label)}
                    className="flex items-center p-4 border border-slate-200 rounded-xl hover:border-brand hover:bg-brand-light transition-all text-left group"
                >
                    <span className="text-2xl mr-3">{opt.icon}</span>
                    <span className="font-medium text-slate-700 group-hover:text-brand-hover">{opt.label}</span>
                    <ArrowRight className="ml-auto text-slate-300 group-hover:text-brand opacity-0 group-hover:opacity-100 transition-all" size={18} />
                </button>
            ))}
        </div>
    </motion.div>
);

const AnalysisView = ({ data, onFinish }) => {
    React.useEffect(() => {
        const timer = setTimeout(onFinish, 2500);
        return () => clearTimeout(timer);
    }, [onFinish]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center space-y-6"
        >
            <div className="relative w-20 h-20 mx-auto">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-full h-full border-4 border-slate-100 border-t-brand rounded-full"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <Loader2 className="text-brand" size={32} />
                </div>
            </div>
            <div>
                <h3 className="text-xl font-bold text-primary">데이터 분석 중...</h3>
                <p className="text-slate-500 mt-2 text-sm">
                    <span className="text-brand font-bold">[{data.industry}]</span> 업종 데이터를<br />
                    대조하고 있습니다.
                </p>
            </div>
        </motion.div>
    );
};

const ResultView = ({ data }) => {
    // 간단한 결과 로직
    const getResult = () => {
        if (data.biz_age === '예비 창업자' || data.biz_age === '3년 미만') return { name: '청년전용창업자금', amount: '최대 1억원' };
        if (data.industry === '제조업') return { name: '신성장기반자금', amount: '최대 10억원' };
        return { name: '일반경영안정자금', amount: '최대 5억원' };
    };
    const result = getResult();

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-6"
        >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 text-green-600 rounded-full mb-2">
                <Check size={32} strokeWidth={3} />
            </div>

            <div className="space-y-1">
                <p className="text-slate-500 text-sm">대표님께 추천하는 자금은</p>
                <h3 className="text-2xl font-bold text-brand">{result.name}</h3>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <p className="text-sm text-slate-500 mb-1">예상 한도</p>
                <p className="text-3xl font-black text-primary">{result.amount}</p>
            </div>

            <p className="text-xs text-slate-400">
                * 정확한 한도와 금리는 심층 상담이 필요합니다.<br />
                아래로 스크롤하여 상세 내용을 확인하세요.
            </p>

            <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="pt-4 text-brand font-medium text-sm"
            >
                👇 아래에서 상세 리포트 확인
            </motion.div>
        </motion.div>
    );
};

export default DiagnosisWidget;
