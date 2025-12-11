/**
 * 정책자금 매칭 로직 (Logic-Based Matching)
 * 
 * 입력: 업종, 업력, 매출
 * 출력: 자금명, 한도(블러용), 금리(블러용), 특징
 */

export const getPolicyMatch = (data) => {
    const { industry, biz_age, revenue } = data;

    // Default Match (매칭되지 않는 경우 기본값)
    let match = {
        name: "일반경영안정자금",
        limit: "최대 1억원",
        rate: "연 2.5%~",
        desc: "소상공인 및 중소기업을 위한 일반 운영 자금"
    };

    /**
     * 매칭 규칙 (Switch-Case Logic)
     * 
     * 1. 청년(3년미만) + 제조/IT -> 청년전용창업자금 / 혁신성장지원자금
     * 2. 중년(7년이상) + 제조 -> 제조현장 스마트화 자금 / 운전자금
     * 3. 소상공인(도소매) -> 일반경영안정자금
     */

    // Case 1: 청년 창업 (3년 미만 + 제조/IT)
    if (biz_age === 'under_3' && (industry === 'manufacture' || industry === 'it')) {
        match = {
            name: "청년전용창업자금",
            limit: "최대 2억원",
            rate: "연 2.0% 고정",
            desc: "대표님 같은 청년 혁신 기업을 위한 특별 우대 자금"
        };
        // IT업종은 혁신성장으로 유도할 수도 있으나 로직 단순화를 위해 청년자금 우선 매칭
        if (industry === 'it') {
            match.name = "혁신성장지원자금";
            match.limit = "최대 5억원";
        }
    }
    // Case 2: 성장기/성숙기 (7년 이상 + 제조)
    // 'over_7'이 7년 이상이라고 가정
    else if (biz_age === 'over_7' && industry === 'manufacture') {
        match = {
            name: "제조현장 스마트화 자금",
            limit: "최대 10억원",
            rate: "연 2.8% 변동",
            desc: "제조 공정 효율화를 위한 시설 및 운전 자금"
        };
    }
    // Case 3: 소상공인 (도소매)
    else if (industry === 'wholesale') {
        match = {
            name: "일반경영안정자금",
            limit: "최대 7천만원",
            rate: "연 3.2%~",
            desc: "도소매업 사장님을 위한 든든한 운영 자금"
        };
    }
    // 그 외 (예비창업자 등)
    else if (biz_age === 'pre') {
        match = {
            name: "예비창업패키지 연계 자금",
            limit: "최대 1억원",
            rate: "연 2.0%~",
            desc: "사업자 등록 전후로 신청 가능한 초기 자금"
        };
    }

    return match;
};
