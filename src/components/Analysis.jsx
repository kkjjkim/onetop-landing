import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

// 분석 대기 화면 컴포넌트
// 사용자가 선택한 데이터를 바탕으로 분석하는 척(!) 연출을 보여줍니다.
const Analysis = ({ data, onFinish }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // 3초 동안 진행률을 0%에서 100%로 올립니다.
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(onFinish, 500); // 100% 도달 후 잠시 대기했다가 완료 처리
                    return 100;
                }
                return prev + 2; // 진행 속도 조절
            });
        }, 50); // 0.05초마다 업데이트

        return () => clearInterval(interval);
    }, [onFinish]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-8"
            >
                {/* 로딩 아이콘 애니메이션 */}
                <div className="relative flex items-center justify-center w-24 h-24 mx-auto">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 border-4 rounded-full border-slate-200 border-t-accent"
                    />
                    <Loader2 className="text-accent" size={40} />
                </div>

                {/* 진행 상태 텍스트 */}
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-primary">
                        데이터를 분석하고 있습니다...
                    </h2>
                    <p className="text-lg text-slate-500">
                        선택하신 <span className="font-bold text-accent">[{data.industry}]</span> 데이터를 대조 중입니다.
                    </p>
                </div>

                {/* 진행률 숫자 */}
                <div className="text-4xl font-black text-slate-200">
                    {progress}%
                </div>
            </motion.div>
        </div>
    );
};

export default Analysis;
