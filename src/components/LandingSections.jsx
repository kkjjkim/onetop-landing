import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { TrendingUp, AlertTriangle, ShieldCheck, Lock, ChevronDown } from 'lucide-react';

/* 
 * 섹션 컴포넌트들을 모아둔 파일
 * Scroll Telling 흐름: Hook -> Problem -> Authority -> (Simulation) -> Gap & CTA 
 */

// 공통 애니메이션 설정
const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

// --- Section 1 [Hook] ---
// "2026년 정책자금, 대표님 사업장의 예상 한도는?" (Toss Style Redesign)
export const HeroSection = ({ onStartDiagnosis }) => {
    return (
        <section className="relative flex flex-col items-center justify-center min-h-[90vh] px-4 text-center overflow-hidden bg-white">
            {/* 배경 은은한 그라데이션 (Fintech Style) */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-50/50 to-white -z-10" />

            {/* 장식용 블러 원 (은은하게) */}
            <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-3xl opacity-60" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[300px] h-[300px] bg-indigo-50/40 rounded-full blur-3xl opacity-60" />

            <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                className="relative z-10 max-w-4xl mx-auto space-y-8"
            >
                {/* 2026년 태그 */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="inline-block"
                >
                    <span className="px-4 py-1.5 text-sm font-bold text-blue-600 bg-blue-50 rounded-full border border-blue-100">
                        2026년 정책자금 접수 시작
                    </span>
                </motion.div>

                {/* 메인 타이틀 */}
                <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-7xl">
                    2026년 정책자금,<br />
                    대표님 사업장의 <span className="text-brand">예상 한도</span>는?
                </h1>

                {/* 서브 타이틀 */}
                <p className="text-xl font-medium text-slate-500 md:text-2xl break-keep">
                    복잡한 서류 없이, 업종과 매출만으로<br className="hidden md:block" />
                    AI가 3초 만에 진단합니다.
                </p>

                {/* CTA 버튼 (Toss Style) */}
                <motion.div
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="pt-4"
                >
                    <button
                        onClick={onStartDiagnosis}
                        className="px-10 py-5 text-xl font-bold text-white transition-all shadow-xl rounded-2xl bg-brand hover:bg-brand-hover hover:shadow-2xl shadow-brand/30 ring-1 ring-white/20"
                    >
                        내 예상 한도 무료로 확인하기
                    </button>
                    <p className="mt-4 text-sm font-medium text-slate-400">
                        * 개인정보 입력 없이 즉시 확인 가능
                    </p>
                </motion.div>
            </motion.div>

            {/* 스크롤 유도 화살표 */}
            <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="absolute bottom-12 text-slate-300"
            >
                <ChevronDown size={36} strokeWidth={2.5} />
            </motion.div>
        </section>
    );
};

// --- Section 2 [Problem] ---
// "매출이 높아도 '코드'가 안 맞으면 부결됩니다."
export const ProblemSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section ref={ref} className="py-24 bg-slate-50">
            <div className="container px-4 mx-auto max-w-4xl">
                <motion.div
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={fadeUp}
                    className="text-center space-y-4 mb-12"
                >
                    <div className="inline-flex items-center justify-center w-12 h-12 mb-4 bg-red-100 rounded-full">
                        <AlertTriangle className="text-red-500" size={24} />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
                        매출이 높은데 왜 <span className="text-red-500">부결</span>될까요?
                    </h2>
                    <p className="text-lg text-slate-600">
                        정책자금은 성적순이 아닙니다.<br />
                        기관이 선호하는 <strong>'코드(Code)'</strong>가 맞지 않으면 무조건 탈락입니다.
                    </p>
                </motion.div>

                {/* 그래프 처럼 보이는 시각화 요소 */}
                <div className="grid gap-8 md:grid-cols-2">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm"
                    >
                        <h3 className="text-lg font-bold text-slate-500 mb-4">❌ 일반적인 신청 기업</h3>
                        <div className="space-y-3">
                            <div className="w-full bg-slate-100 h-8 rounded-full overflow-hidden">
                                <div className="bg-slate-400 h-full w-[30%] flex items-center justify-end px-2 text-xs text-white font-bold">승인율 30%</div>
                            </div>
                            <p className="text-sm text-slate-500">단순 매출 증빙만 제출 시</p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="p-6 bg-white border-2 border-brand/20 rounded-2xl shadow-lg relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 px-3 py-1 text-xs font-bold text-white bg-brand rounded-bl-lg">가산점 적용</div>
                        <h3 className="text-lg font-bold text-brand mb-4">⭕ 코드 매칭 기업</h3>
                        <div className="space-y-3">
                            <div className="w-full bg-slate-100 h-8 rounded-full overflow-hidden">
                                <div className="bg-brand h-full w-[90%] flex items-center justify-end px-2 text-xs text-white font-bold">승인율 90%</div>
                            </div>
                            <p className="text-sm text-slate-500">업종/기술 가산점 항목 매칭 시</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

// --- Section 3 [Authority] ---
// "현직 심사위원이 설계한 알고리즘으로 분석합니다."
export const AuthoritySection = () => {
    return (
        <section className="py-24 bg-white border-t border-slate-100">
            <div className="container px-4 mx-auto max-w-4xl text-center">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    className="space-y-6"
                >
                    <ShieldCheck className="w-16 h-16 mx-auto text-brand" />
                    <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
                        현직 심사위원의 기준을 담았습니다
                    </h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        수천 건의 심사 경험을 바탕으로 설계된 알고리즘이<br />
                        대표님께 가장 유리한 자금을 찾아냅니다.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 mt-8">
                        {['공인 경영지도사', '前 정부지원사업 심사위원', '기업 R&D 평가위원'].map((badge, idx) => (
                            <span key={idx} className="px-4 py-2 font-medium text-slate-600 bg-slate-100 rounded-lg">
                                {badge}
                            </span>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

// --- Section 5 [Gap & CTA] ---
// 결과 화면 + 블러 처리 + Sticky CTA
export const ResultSection = ({ result, onUnlock }) => {
    if (!result) return null;

    return (
        <div id="result-section" className="py-20 bg-slate-50 min-h-screen flex flex-col items-center justify-center">
            <div className="container max-w-md px-4 mx-auto">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100"
                >
                    <div className="bg-primary p-6 text-center">
                        <p className="text-blue-200 text-sm mb-1">분석 완료</p>
                        <h2 className="text-2xl font-bold text-white">
                            대표님께 딱 맞는 자금을<br />찾았습니다!
                        </h2>
                    </div>

                    <div className="p-8 space-y-8">
                        <div>
                            <p className="text-sm font-bold text-slate-400 mb-2">추천 자금명</p>
                            <div className="text-2xl font-bold text-brand bg-blue-50 p-4 rounded-xl text-center">
                                {result.name}
                            </div>
                            <p className="text-xs text-slate-500 mt-2 text-center">{result.desc}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="text-center p-4 border border-slate-100 rounded-xl relative group cursor-pointer" onClick={onUnlock}>
                                <p className="text-sm text-slate-400 mb-2">예상 한도</p>
                                <div className="filter blur-md select-none text-xl font-bold text-slate-800">
                                    {result.limit}
                                </div>
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Lock size={20} className="text-slate-400" />
                                </div>
                            </div>
                            <div className="text-center p-4 border border-slate-100 rounded-xl relative group cursor-pointer" onClick={onUnlock}>
                                <p className="text-sm text-slate-400 mb-2">평균 금리</p>
                                <div className="filter blur-md select-none text-xl font-bold text-slate-800">
                                    {result.rate}
                                </div>
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Lock size={20} className="text-slate-400" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-yellow-50 p-4 rounded-xl flex items-start space-x-3">
                            <AlertTriangle className="text-yellow-500 shrink-0" size={20} />
                            <p className="text-sm text-yellow-700">
                                <strong>주의:</strong> 업력/신용도에 따라 한도와 금리가 달라질 수 있습니다. 정확한 수치는 조회가 필요합니다.
                            </p>
                        </div>

                        <button
                            onClick={onUnlock}
                            className="w-full py-4 text-lg font-bold text-white bg-brand rounded-xl hover:bg-brand-hover shadow-lg shadow-brand/30 animate-pulse"
                        >
                            [무료] 가려진 한도/금리 확인하기
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};
