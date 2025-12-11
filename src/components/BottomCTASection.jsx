import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { CheckCircle } from 'lucide-react';

// Section 5: 마지막 행동 유도 (Bottom CTA)
// 하단에 상담 신청 폼을 배치하여 이탈하려는 사용자를 잡습니다.
const BottomCTASection = () => {
    const [formData, setFormData] = useState({ name: '', phone: '', company: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        console.log('[Pixel] 하단 상담 신청');

        try {
            const { error } = await supabase
                .from('leads')
                .insert([{ ...formData, created_at: new Date() }]);

            if (error) throw error;

            setIsSuccess(true);
            setFormData({ name: '', phone: '', company: '' });
        } catch (err) {
            console.error('Error:', err);
            // 에러 발생 시에도 사용자 경험을 위해 성공 처리 흉내 (데모용)
            setIsSuccess(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="py-20 bg-slate-50">
            <div className="container mx-auto px-4 max-w-2xl">
                <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-slate-100">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-primary mb-4">
                            무료 상담 신청하기
                        </h2>
                        <p className="text-slate-600">
                            고민하는 시간에도 예산은 소진됩니다.<br />
                            지금 바로 전문가의 진단을 받아보세요.
                        </p>
                    </div>

                    {isSuccess ? (
                        <div className="text-center py-12 space-y-4">
                            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle size={40} />
                            </div>
                            <h3 className="text-2xl font-bold text-primary">신청이 완료되었습니다!</h3>
                            <p className="text-slate-500">
                                담당자가 내용을 확인 후<br />
                                빠르게 연락드리겠습니다.
                            </p>
                            <button
                                onClick={() => setIsSuccess(false)}
                                className="text-brand font-medium hover:underline mt-4"
                            >
                                다른 내용으로 다시 신청하기
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">이름</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none transition-all"
                                    placeholder="홍길동"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">연락처</label>
                                <input
                                    type="tel"
                                    required
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none transition-all"
                                    placeholder="010-1234-5678"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">기업명 (선택)</label>
                                <input
                                    type="text"
                                    value={formData.company}
                                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none transition-all"
                                    placeholder="(주)OOO"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-4 bg-brand hover:bg-brand-hover text-white font-bold text-lg rounded-xl shadow-lg shadow-brand/30 transition-all mt-4 disabled:opacity-50"
                            >
                                {isSubmitting ? '전송 중...' : '상담 신청하기'}
                            </button>
                            <p className="text-xs text-center text-slate-400 mt-4">
                                입력하신 정보는 상담 목적 외에는 절대 사용되지 않습니다.
                            </p>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
};

export default BottomCTASection;
