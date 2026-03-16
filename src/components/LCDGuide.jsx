import React from 'react';
import { Monitor, Settings2, PersonStanding, Lightbulb, Zap, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

const LCDGuide = () => {
  return (
    <section className="space-y-8 text-gray-800" style={{ marginBottom: '4rem', paddingTop: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ background: 'var(--ci-secondary-light)', padding: '0.75rem', borderRadius: '12px' }}>
          <Monitor size={28} color="var(--ci-secondary)" />
        </div>
        <h3 className="guide-title text-2xl font-bold text-gray-900">LCD 계기판 완벽 가이드</h3>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-6 rounded-xl shadow-sm border border-gray-100"
      >
        <h4 className="text-lg font-bold mb-4 text-gray-900 border-b pb-2 flex items-center gap-2">
          <Settings2 className="text-gray-500" size={20} />
          버튼별 기본 조작 방법
        </h4>
        
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <span className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg shadow-sm border border-blue-200">M</span>
            <div>
              <strong className="block text-gray-900 mb-1 text-base">전원 버튼 (가운데)</strong>
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 text-sm text-gray-700 space-y-2">
                <p>• <strong className="text-blue-600">길게 누르기 (3초):</strong> 자전거 전원 켜기 / 끄기</p>
                <p>• <strong className="text-blue-600">짧게 누르기:</strong> 계기판 화면 모드 변경 (하단 표시 정보 전환)</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <span className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center font-bold text-lg shadow-sm border border-gray-300">▲</span>
            <div>
              <strong className="block text-gray-900 mb-1 text-base">상단 버튼</strong>
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 text-sm text-gray-700 space-y-2">
                <p>• <strong className="text-gray-900">짧게 누르기:</strong> PAS(페달 어시스트) 단계 <strong className="text-green-600">올리기</strong> (0단~5단)</p>
                <p>• <strong className="text-gray-900">길게 누르기 (3초):</strong> 전조등 및 계기판 백라이트 <strong className="text-yellow-600">켜기 / 끄기</strong></p>
              </div>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <span className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center font-bold text-lg shadow-sm border border-gray-300">▼</span>
            <div>
              <strong className="block text-gray-900 mb-1 text-base">하단 버튼</strong>
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 text-sm text-gray-700 space-y-2">
                <p>• <strong className="text-gray-900">짧게 누르기:</strong> PAS(페달 어시스트) 단계 <strong className="text-red-600">내리기</strong></p>
                <p>• <strong className="text-gray-900">주행 중 길게 누르기:</strong> 크루즈 모드 활성화 (일정 속도 유지)</p>
                <p>• <strong className="text-gray-900">정차 중 길게 누르기:</strong> 도보 모드 활성화 (시속 4~6km 진행)</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="glass-panel p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col h-full"
        >
          <div className="flex items-center gap-2 mb-3">
            <Monitor className="text-purple-500" size={20} />
            <h4 className="font-bold text-gray-800 text-base">화면 모드 변경 (M버튼 짧게)</h4>
          </div>
          <p className="text-sm text-gray-600 mb-4 h-8">가운데 버튼(M)을 짧게 누를 때마다 계기판 하단의 정보가 바뀝니다.</p>
          <div className="space-y-2 flex-grow">
            <div className="bg-gray-50 p-2 rounded text-sm flex justify-between">
              <span className="text-gray-600">기본 화면</span>
              <strong className="text-purple-700">1회 주행거리 / 주행시간</strong>
            </div>
            <div className="bg-gray-50 p-2 rounded text-sm flex justify-between">
              <span className="text-gray-600">두번째 화면 (ODO)</span>
              <strong className="text-purple-700">총 누적 주행거리 / 평균속도</strong>
            </div>
            <div className="bg-gray-50 p-2 rounded text-sm flex justify-between">
              <span className="text-gray-600">세번째 화면 (VOL)</span>
              <strong className="text-purple-700">현재 배터리 전압 / 최고속도</strong>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="glass-panel p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col h-full"
        >
          <div className="flex items-center gap-2 mb-3">
            <Activity className="text-green-500" size={20} />
            <h4 className="font-bold text-gray-800 text-base">PAS 단계 설정 (▲ / ▼)</h4>
          </div>
          <p className="text-sm text-gray-600 mb-4 h-8">모터가 페달링을 도와주는 힘의 세기를 설정합니다.</p>
          <div className="bg-green-50 p-3 rounded-lg border border-green-100 text-sm text-green-900 space-y-2">
            <p><strong>0단계:</strong> 모터 개입 없음 (일반 자전거와 동일)</p>
            <p><strong>1단계 ~ 5단계:</strong> 단계가 높을수록 모터가 강하게 밀어줍니다.</p>
            <p className="text-xs text-green-700 mt-2">* 처음 타실 때는 1단으로 출발하여 서서히 적응하시는 것을 권장합니다.</p>
          </div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-panel p-6 rounded-xl shadow-sm border border-gray-100"
      >
        <h4 className="text-lg font-bold mb-4 text-gray-900 border-b pb-2 flex items-center gap-2">
          <PersonStanding className="text-blue-500" size={20} />
          알아두면 유용한 특수 기능
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-blue-100 rounded-lg overflow-hidden">
            <div className="bg-blue-50 px-4 py-2 font-bold text-blue-800 border-b border-blue-100">
              도보 모드 (끌바 기능)
            </div>
            <div className="p-4 text-sm text-gray-700 leading-relaxed">
              <p className="mb-2">자전거에서 내려 끌고 가야 할 때 유용합니다. 육교나 언덕길에서 힘을 들이지 않고 자전거를 옮길 수 있습니다.</p>
              <ul className="list-disc pl-4 text-blue-700 font-medium">
                <li><strong>발동:</strong> 정차 상태에서 하단 버튼(▼) 길게 누르기</li>
                <li><strong>효과:</strong> 시속 4~6km 의 걷는 속도로 전진</li>
                <li><strong>해제:</strong> 누르고 있던 버튼에서 손 떼기</li>
              </ul>
            </div>
          </div>
          
          <div className="border border-indigo-100 rounded-lg overflow-hidden">
            <div className="bg-indigo-50 px-4 py-2 font-bold text-indigo-800 border-b border-indigo-100">
              크루즈 모드
            </div>
            <div className="p-4 text-sm text-gray-700 leading-relaxed">
              <p className="mb-2">장거리 직진 주행 시 페달이나 스로틀을 조작하지 않고도 현재 속도를 자동으로 유지합니다.</p>
              <ul className="list-disc pl-4 text-indigo-700 font-medium">
                <li><strong>발동:</strong> 주행 중 하단 버튼(▼) 3초간 누르기</li>
                <li><strong>효과:</strong> 계기판에 "P"자(또는 크루즈 아이콘)가 뜨며 속도 유지</li>
                <li><strong>해제:</strong> 브레이크를 잡거나 등 아무 버튼이나 누르기</li>
              </ul>
            </div>
          </div>
          
          <div className="border border-yellow-100 rounded-lg overflow-hidden md:col-span-2">
            <div className="bg-yellow-50 px-4 py-2 font-bold text-yellow-800 border-b border-yellow-100 flex items-center gap-2">
              <Lightbulb size={18} /> 전조등 켜기
            </div>
            <div className="p-4 flex flex-col sm:flex-row items-center gap-4 text-sm text-gray-700">
              <div className="flex-grow">
                상단 버튼(▲)을 3초간 길게 누르면 <strong>전면 헤드라이트(전조등)</strong>가 켜짐과 동시에, <strong>계기판 야간 백라이트</strong>가 들어와 어두운 곳에서도 계기판을 선명하게 볼 수 있습니다. 끄실 때도 동일하게 3초간 길게 누릅니다.
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default LCDGuide;
