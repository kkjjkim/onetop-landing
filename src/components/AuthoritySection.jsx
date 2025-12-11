import React from 'react';
import { ShieldCheck, Award, FileCheck } from 'lucide-react';

// Section 3: 권위 & 신뢰 (The Authority)
// 심사위원 출신임을 강조하여 신뢰도를 높입니다.
const AuthoritySection = () => {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4 max-w-5xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                        아무나 흉내 낼 수 없는<br />
                        <span className="text-brand">현직 심사위원의 노하우</span>
                    </h2>
                    <p className="text-slate-600 text-lg">
                        단순 매칭이 아닙니다. 심사위원이 보는 <strong>'합격 포인트'</strong>를 정확히 짚어냅니다.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* 카드 1 */}
                    <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 hover:shadow-xl transition-shadow text-center group">
                        <div className="w-16 h-16 mx-auto bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform">
                            <ShieldCheck className="text-brand" size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-primary mb-3">정부 지원사업 심사위원</h3>
                        <p className="text-slate-500 leading-relaxed">
                            실제 심사 현장에서<br />
                            수천 건의 사업계획서를<br />
                            평가한 경험
                        </p>
                    </div>

                    {/* 카드 2 */}
                    <div className="p-8 bg-brand/5 rounded-3xl border border-brand/10 hover:shadow-xl transition-shadow text-center group relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-brand text-white text-xs font-bold px-3 py-1 rounded-bl-xl">
                            핵심 경쟁력
                        </div>
                        <div className="w-16 h-16 mx-auto bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform">
                            <Award className="text-brand" size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-primary mb-3">독자적 매칭 알고리즘</h3>
                        <p className="text-slate-500 leading-relaxed">
                            300여 개의 정책자금 중<br />
                            <strong>승인 확률 90% 이상</strong>인<br />
                            자금만 선별
                        </p>
                    </div>

                    {/* 카드 3 */}
                    <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 hover:shadow-xl transition-shadow text-center group">
                        <div className="w-16 h-16 mx-auto bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform">
                            <FileCheck className="text-brand" size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-primary mb-3">1:1 맞춤 전략 수립</h3>
                        <p className="text-slate-500 leading-relaxed">
                            기업의 재무 상태와<br />
                            기술력을 분석하여<br />
                            최적의 로드맵 제시
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AuthoritySection;
