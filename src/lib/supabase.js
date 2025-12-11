import { createClient } from '@supabase/supabase-js'

// Supabase 프로젝트 URL과 Anon Key를 여기에 입력하세요.
// 지금은 개발용 임시 값을 넣어두었습니다.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project-url.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key'

// Supabase 클라이언트 생성
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 이 코드는 Supabase 클라이언트를 초기화하는 역할을 합니다.
// 환경 변수(.env)에서 URL과 Key를 가져오도록 설정되어 있습니다.
