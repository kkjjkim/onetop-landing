import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Calendar, ChevronRight, DollarSign, Loader2 } from 'lucide-react';
import { getPolicyMatch } from '../utils/policyLogic';

// 설문조사 컴포넌트
// 업종 -> 업력 -> 매출 -> [분석 로딩] -> 결과 도출
const Survey = ({ onComplete }) => {
    const [step, setStep] = useState(1); // 1:업종, 2:업력, 3:매출, 4:로딩
    const [formData, setFormData] = useState({
        industry: '',
        biz_age: '',
        revenue: ''
    });
    const [loadingText, setLoadingText] = useState('가산점 알고리즘 가동 중...');

    // 로딩 멘트 롤링 (Interactive Loading)
    useEffect(() => {
        if (step === 4) {
            const texts = [
                "업종별 가산점 계산 중...",
                "부결 이력 필터링 중...",
                "최적 자금 매칭 중..."
            ];
            let i = 0;
            const interval = setInterval(() => {
                setLoadingText(texts[i % texts.length]);
                i++;
            }, 1000);

            // 3초 후 완료
            const timeout = setTimeout(() => {
                const result = getPolicyMatch(formData);
                onComplete(result, formData);
            }, 3000);

            return () => {
                clearInterval(interval);
                clearTimeout(timeout);
            };
        }
    }, [step, formData, onComplete]);

    // 업종 선택지
    const industries = [
        { id: 'manufacture', label: '제조업', icon: '🏭' },
        { id: 'it', label: 'IT / SW', icon: '💻' },
        { id: 'wholesale', label: '도소매', icon: '📦' },
        { id: 'other', label: '기타 서비스', icon: '🔧' },
    ];

    // 업력 선택지
    const ages = [
        { id: 'pre', label: '예비 창업자' },
        { id: 'under_3', label: '3년 미만' },
        { id: 'under_7', label: '7년 미만' },
        { id: 'over_7', label: '7년 이상' },
    ];

    // 매출 선택지
    const revenues = [
        { id: 'under_1', label: '1억원 미만' },
        { id: '1_10', label: '1억 ~ 10억원' },
        { id: 'over_10', label: '10억원 이상' },
    ];

    const handleSelect = (key, value) => {
        setFormData(prev => ({ ...prev, [key]: value }));

        if (step < 3) {
            setTimeout(() => setStep(step + 1), 200);
        } else {
            // 매출 선택 완료 시 로딩 단계로 이동
            setTimeout(() => setStep(4), 200);
        }
    };

    // 단계별 질문 및 데이터
    const getStepConfig = () => {
        switch (step) {
            case 1: return { title: "어떤 업종을 운영 중이신가요?", subtitle: "가산점이 가장 높은 업종을 찾아냅니다.", data: industries, key: 'industry' };
            case 2: return { title: "사업자등록증 상 개업일은 언제인가요?", subtitle: "업력에 따라 지원 가능한 자금이 달라집니다.", data: ages, key: 'biz_age', icon: <Calendar /> };
            case 3: return { title: "직전 연도 매출액은 얼마인가요?", subtitle: "매출 규모에 맞는 한도를 계산합니다.", data: revenues, key: 'revenue', icon: <DollarSign /> };
            default: return null;
        }
    };

    const config = getStepConfig();

    return (
        <div id="survey-section" className="flex flex-col items-center justify-center min-h-[60vh] px-4 py-12 bg-white">
            <AnimatePresence mode='wait'>
                {step === 4 ? (
                    // 로딩 화면
                    <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-center space-y-6"
                    >
                        <div className="relative w-24 h-24 mx-auto">
                            <motion.div
                                className="absolute inset-0 border-4 border-slate-100 rounded-full"
                            />
                            <motion.div
                                className="absolute inset-0 border-4 border-brand border-t-transparent rounded-full"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-2xl">🤖</span>
                            </div>
                        </div>
                        <h3 className="text-xl font-bold text-slate-800">
                            {loadingText}
                        </h3>
                        <p className="text-slate-500">잠시만 기다려주세요...</p>
                    </motion.div>
                ) : (
                    // 설문 단계
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="w-full max-w-md space-y-8"
                    >
                        {/* 진행률 바 */}
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-brand"
                                initial={{ width: `${((step - 1) / 3) * 100}%` }}
                                animate={{ width: `${(step / 3) * 100}%` }}
                            />
                        </div>

                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-slate-900 mb-2">
                                {config.title}
                            </h2>
                            <p className="text-slate-500 text-sm">
                                {config.subtitle}
                            </p>
                        </div>

                        <div className="space-y-3">
                            {config.data.map((item) => (
                                <OptionButton
                                    key={item.id}
                                    label={item.label}
                                    icon={item.icon || config.icon}
                                    onClick={() => handleSelect(config.key, item.id)} // id를 저장 (로직 처리를 위해)
                                />
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const OptionButton = ({ label, icon, onClick }) => (
    <motion.button
        whileHover={{ scale: 1.02, backgroundColor: '#EFF6FF', borderColor: '#3B82F6' }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        className="flex items-center justify-between w-full p-5 text-left transition-colors bg-white border rounded-xl border-slate-200 group shadow-sm hover:shadow-md"
    >
        <div className="flex items-center space-x-3">
            <span className="text-2xl text-slate-400 group-hover:text-brand">{icon}</span>
            <span className="text-lg font-medium text-slate-700 group-hover:text-brand-dark">{label}</span>
        </div>
        <ChevronRight className="text-slate-300 group-hover:text-brand" />
    </motion.button>
);

export default Survey;

