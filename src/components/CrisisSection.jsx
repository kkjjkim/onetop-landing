import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

// Section 2: 위기 조성 (The Problem)
// 정책자금 예산 소진 속도를 시각적으로 보여주어 긴급함을 조성합니다.
const CrisisSection = () => {
    return (
        <section className="py-20 bg-slate-50">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="text-center mb-12 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm font-bold">
                        <AlertTriangle size={16} />
                        긴급 공지
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-primary">
                        정책자금 예산,<br />
                        1분기에 <span className="text-accent">60%가 소진</span>됩니다.
                    </h2>
                    <p className="text-slate-600">
                        망설이는 순간, 우리 기업이 받을 수 있는 자금은 사라집니다.<br />
                        남들보다 먼저 신청해야 승인 확률이 높아집니다.
                    </p>
                </div>

                {/* 그래프 시각화 */}
                <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100">
                    <div className="space-y-6">
                        {/* 1분기 */}
                        <div>
                            <div className="flex justify-between mb-2 text-sm font-bold text-slate-700">
                                <span>1분기 (1~3월)</span>
                                <span className="text-accent">60% 소진</span>
                            </div>
                            <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: '60%' }}
                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                    viewport={{ once: true }}
                                    className="h-full bg-accent"
                                />
                            </div>
                        </div>

                        {/* 2분기 */}
                        <div>
                            <div className="flex justify-between mb-2 text-sm font-medium text-slate-500">
                                <span>2분기 (4~6월)</span>
                                <span>30% 소진</span>
                            </div>
                            <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: '30%' }}
                                    transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
                                    viewport={{ once: true }}
                                    className="h-full bg-slate-400"
                                />
                            </div>
                        </div>

                        {/* 하반기 */}
                        <div>
                            <div className="flex justify-between mb-2 text-sm font-medium text-slate-400">
                                <span>하반기 (7~12월)</span>
                                <span>10% 잔여 (경쟁 치열)</span>
                            </div>
                            <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: '10%' }}
                                    transition={{ duration: 1.5, delay: 0.4, ease: "easeOut" }}
                                    viewport={{ once: true }}
                                    className="h-full bg-slate-300"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 p-4 bg-slate-50 rounded-xl text-center text-sm text-slate-500">
                        * 2024년 중소벤처기업부 예산 소진 추이 기준
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CrisisSection;
