import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, FileText, ArrowRight } from 'lucide-react';
import LeadFormModal from './LeadFormModal';

// 결과 페이지 컴포넌트
// 분석 결과를 보여주고 상담 신청을 유도합니다.
const Result = ({ data }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // 간단한 자금 매칭 로직
    // 실제로는 더 복잡한 알고리즘이 필요하겠지만, 여기서는 예시로 구현했습니다.
    const getRecommendation = () => {
        const { industry, biz_age } = data;

        if (biz_age === '예비 창업자' || biz_age === '3년 미만') {
            return {
                title: '창업기반지원자금',
                desc: '우수한 기술력과 사업성을 보유한 초기 창업기업을 위한 자금',
                limit: '최대 1억원',
                rate: '연 2.5% 내외'
            };
        } else if (industry === '제조업') {
            return {
                title: '신성장기반자금',
                desc: '제조업 혁신 및 설비 투자를 위한 대규모 지원 자금',
                limit: '최대 10억원',
                rate: '연 3.0% 내외'
            };
        } else {
            return {
                title: '일반경영안정자금',
                desc: '중소기업의 원활한 경영 활동을 지원하는 운전자금',
                limit: '최대 5억원',
                rate: '연 3.5% 내외'
            };
        }
    };

    const recommendation = getRecommendation();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 pb-10">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-lg space-y-6"
            >
                {/* 상단 헤더 */}
                <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-green-100 text-green-600">
                        <Check size={32} />
                    </div>
                    <h2 className="text-2xl font-bold text-primary">
                        진단이 완료되었습니다.
                    </h2>
                    <p className="mt-2 text-slate-500">
                        고객님께 가장 적합한 정책자금을 찾았습니다.
                    </p>
                </div>

                {/* 추천 자금 카드 */}
                <div className="overflow-hidden bg-white border shadow-xl rounded-2xl border-slate-100">
                    <div className="p-6 bg-primary text-white">
                        <span className="inline-block px-3 py-1 mb-2 text-xs font-semibold rounded-full bg-accent/20 text-accent">
                            AI 추천 1순위
                        </span>
                        <h3 className="text-3xl font-bold">{recommendation.title}</h3>
                        <p className="mt-2 text-slate-300">{recommendation.desc}</p>
                    </div>
                    <div className="p-6 space-y-4 bg-white">
                        <div className="flex justify-between py-3 border-b border-slate-100">
                            <span className="text-slate-500">예상 한도</span>
                            <span className="font-bold text-primary">{recommendation.limit}</span>
                        </div>
                        <div className="flex justify-between py-3 border-b border-slate-100">
                            <span className="text-slate-500">예상 금리</span>
                            <span className="font-bold text-primary">{recommendation.rate}</span>
                        </div>

                        {/* 상담 신청 버튼 */}
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="flex items-center justify-center w-full py-4 mt-4 text-lg font-bold text-white transition-all rounded-xl bg-accent hover:bg-accent-hover shadow-lg hover:shadow-accent/30"
                        >
                            <FileText className="mr-2" size={20} />
                            상세 한도 리포트 받기
                        </button>
                    </div>
                </div>

                {/* 추가 안내 */}
                <div className="p-4 text-sm text-center rounded-lg bg-slate-50 text-slate-500">
                    * 위 결과는 단순 진단용이며, 실제 심사 결과와 다를 수 있습니다.<br />
                    정확한 가능 여부는 <strong>전문가 상담</strong>을 통해 확인하세요.
                </div>
            </motion.div>

            {/* DB 수집 모달 */}
            <LeadFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                data={data}
            />
        </div>
    );
};

export default Result;
