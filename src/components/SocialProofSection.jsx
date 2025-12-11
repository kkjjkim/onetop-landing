import React from 'react';
import { motion } from 'framer-motion';

// Section 4: 성공 사례 (Social Proof)
// 실시간으로 올라가는 롤링 배너(Ticker)를 통해 신뢰도를 증명합니다.
const SocialProofSection = () => {
    // 가상의 성공 사례 데이터
    const successCases = [
        "제조업 김** 대표님 2억 원 승인 완료",
        "도소매 이** 대표님 5천만 원 승인 완료",
        "IT/SW 박** 대표님 1억 원 승인 완료",
        "건설업 최** 대표님 3억 원 승인 완료",
        "서비스업 정** 대표님 5천만 원 승인 완료",
        "제조업 강** 대표님 1.5억 원 승인 완료",
        "스타트업 윤** 대표님 1억 원 승인 완료",
        "유통업 조** 대표님 7천만 원 승인 완료",
    ];

    return (
        <section className="py-20 bg-primary text-white overflow-hidden">
            <div className="container mx-auto px-4 text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    이미 <span className="text-brand">1,200명의 대표님</span>이<br />
                    자금을 확보하셨습니다.
                </h2>
                <p className="text-slate-400">
                    지금 이 순간에도 승인 사례가 나오고 있습니다.
                </p>
            </div>

            {/* 롤링 배너 (Ticker) */}
            <div className="relative w-full max-w-2xl mx-auto h-[300px] overflow-hidden bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm">
                {/* 그라데이션 오버레이 (위/아래 자연스럽게 사라지도록) */}
                <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-primary to-transparent z-10" />
                <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-primary to-transparent z-10" />

                <div className="py-4">
                    <motion.div
                        animate={{ y: [0, -1000] }}
                        transition={{
                            repeat: Infinity,
                            duration: 20,
                            ease: "linear",
                        }}
                        className="space-y-4 px-6"
                    >
                        {/* 무한 스크롤을 위해 데이터를 두 번 반복 렌더링 */}
                        {[...successCases, ...successCases, ...successCases].map((text, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5"
                            >
                                <span className="font-medium text-slate-200">{text.split(' ')[0]} {text.split(' ')[1]}</span>
                                <span className="font-bold text-brand-light">{text.split(' ').slice(2).join(' ')}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default SocialProofSection;
