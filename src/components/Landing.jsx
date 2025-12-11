import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck } from 'lucide-react';

// 랜딩 페이지 컴포넌트
// 사용자가 처음 접속했을 때 보게 되는 화면입니다.
const Landing = ({ onStart }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
            {/* 애니메이션 효과를 위한 motion.div 사용 */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-3xl space-y-8"
            >
                {/* 신뢰감을 주는 뱃지 */}
                <div className="inline-flex items-center px-4 py-2 space-x-2 rounded-full bg-blue-50 text-accent">
                    <ShieldCheck size={20} />
                    <span className="text-sm font-semibold">정부 지원사업 심사위원 감수</span>
                </div>

                {/* 메인 헤드라인 */}
                <h1 className="text-4xl font-bold leading-tight md:text-6xl text-primary">
                    2025년 정책자금,<br />
                    <span className="text-accent">AI가 3초 만에</span> 진단해 드립니다.
                </h1>

                {/* 서브 텍스트 */}
                <p className="text-lg text-slate-600 md:text-xl">
                    복잡한 서류 없이, 간단한 선택만으로<br className="md:hidden" />
                    우리 기업에 딱 맞는 자금을 확인하세요.
                </p>

                {/* 시작하기 버튼 */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onStart}
                    className="inline-flex items-center px-8 py-4 text-lg font-bold text-white transition-colors rounded-full shadow-lg bg-accent hover:bg-accent-hover"
                >
                    무료 진단 시작하기
                    <ArrowRight className="ml-2" size={24} />
                </motion.button>

                {/* 하단 신뢰 문구 */}
                <p className="text-sm text-slate-400">
                    * 개인정보는 상담 목적 외에는 절대 사용되지 않습니다.
                </p>
            </motion.div>
        </div>
    );
};

export default Landing;
