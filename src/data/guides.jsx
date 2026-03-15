import React from 'react';
import { Wrench, BatteryCharging, AlertTriangle, Wind, ZapOff, CheckCircle } from 'lucide-react';
import PedalGuide from '../components/PedalGuide';
import BatteryGuide from '../components/BatteryGuide';
import TirePressureGuide from '../components/TirePressureGuide';

export const guidesData = {
  categories: [
    {
      id: "basic",
      title: "기본 가이드",
      items: [
        {
          id: "pedal",
          title: "페달 장착 방법",
          icon: <Wrench size={18} />,
          summary: [
            "좌(L)/우(R) 페달 식별 및 결합 방향 확인",
            "크랭크 파손 방지를 위한 수동 가결합 필수",
            "15mm 렌치를 이용한 규정 토크 완전 체결"
          ],
          placeholderType: "gif",
          placeholderText: "페달 장착 시연 GIF",
          customComponent: PedalGuide
        },
        {
          id: "handlebar",
          title: "핸들/스템 정렬",
          icon: <Wrench size={18} />,
          summary: [
            "앞바퀴와 핸들바가 수직(90도)이 되도록 육안으로 맞춥니다.",
            "육각 렌치를 이용하여 스템(Stem) 측면의 볼트를 조입니다.",
            "위아래 볼트를 번갈아 가며 고르게 힘을 주어 체결합니다."
          ],
          placeholderType: "image",
          placeholderText: "핸들바 정렬 및 육각볼트 위치 사진"
        },
        {
          id: "tire-pressure-basic",
          title: "타이어 공기압 체크",
          icon: <Wind size={18} />,
          summary: [
            "주행 전 타이어 측면에 표기된 적정 공기압(PSI)을 확인하세요.",
            "계절에 따라 여름철에는 최대치보다 약간 적게, 겨울철에는 더 보충하는 것이 좋습니다.",
            "주기적인 공기압 관리는 펑크 예방과 주행거리 향상에 큰 도움이 됩니다."
          ],
          placeholderType: "image",
          placeholderText: "타이어 공기 주입 사진",
          customComponent: TirePressureGuide
        }
      ]
    },
    {
      id: "battery-guide",
      title: "배터리 가이드",
      items: [
        {
          id: "charging",
          title: "배터리 충전",
          icon: <BatteryCharging size={18} />,
          summary: [
            "자전거 전원을 끄고 열쇠로 잠금을 해제하여 배터리를 분리합니다.",
            "충전기 단자를 배터리에 먼저 꽂은 후 220V 콘센트에 플러그를 연결합니다.",
            "어댑터 불빛이 빨간색(충전중)에서 녹색(완충)으로 변하면 플러그를 뽑습니다."
          ],
          placeholderType: "image",
          placeholderText: "배터리 충전 포트 연결 사진",
          customComponent: BatteryGuide
        },
        {
          id: "battery-care",
          title: "겨울철/장기 보관법",
          icon: <BatteryCharging size={18} />,
          summary: [
            "겨울철이나 장기 보관 시에는 배터리를 실내 온도 보관을 권장합니다.",
            "완전 방전(0%) 상태로 방치하지 말고 최소 50% 이상 충전해 둡니다.",
            "한 달에 한 번 이상 상태를 점검하고 보충 충전해 줍니다."
          ],
          placeholderType: "image",
          placeholderText: "배터리 보관 권장 온도/환경 안내 이미지"
        }
      ]
    },
    {
      id: "troubleshooting",
      title: "상황별 해결방법",
      // 중분류(Sub-categories)를 추가한 구조
      subCategories: [
        {
          id: "power-issues",
          title: "전원 및 배터리",
          items: [
            {
              id: "error-power",
              title: "전원이 켜지지 않아요 (Error 01)",
              icon: <ZapOff size={18} />,
              summary: [
                "배터리 잔량이 충분한지 어댑터 연결 혹은 게이지로 확인합니다.",
                "배터리가 프레임 단자에 완벽히 밀착되어 열쇠로 100% 잠겨 있는지 점검합니다.",
                "단자 쪽에 이물질이 있거나 금속 핀 손상이 없는지 살펴봅니다."
              ],
              placeholderType: "image",
              placeholderText: "배터리 단자 결합 확인 및 열쇠 잠금 사진"
            }
          ]
        },
        {
          id: "noise-issues",
          title: "주행 및 소음",
          items: [
            {
              id: "error-brake",
              title: "주행 중 브레이크 소음",
              icon: <AlertTriangle size={18} />,
              summary: [
                "신품의 경우 브레이크 패드가 자리를 잡는 과정(Bedding-in)에서 나는 정상적인 마찰음일 수 있습니다.",
                "디스크 로터에 오염 물질(기름, 세정제 등)이 묻었을 경우 알콜 스왑으로 닦아줍니다.",
                "캘리퍼의 위치가 심하게 어긋난 경우 주변 샵에서 정렬(세팅)을 권장합니다."
              ],
              placeholderType: "image",
              placeholderText: "로터 세척 및 캘리퍼 위치 확인 사진"
            }
          ]
        },
        {
          id: "maintenance-issues",
          title: "기타 점검",
          items: [
            {
              id: "error-tire",
              title: "타이어 공기압 (주행감 저하)",
              icon: <Wind size={18} />,
              summary: [
                "가장 먼저 타이어 측면에 적혀 있는 적정 PSI 수치를 확인합니다.",
                "일반적으로 팻바이크는 20~25 PSI, 일반 모델은 35~45 PSI 전후로 세팅합니다.",
                "엄지손가락으로 타이어를 강하게 눌렀을 때 푹 들어가지 않을 정도가 적당합니다."
              ],
              placeholderType: "image",
              placeholderText: "펌프 밸브 연결 및 적정 압력 계기판 사진"
            }
          ]
        }
      ]
    }
  ]
};

// Generate a flat array of all items for easy search and individual rendering
// 3단계 구조(categories -> subCategories -> items)를 고려하여 추출 로직 수정
export const allGuideItems = guidesData.categories.reduce((acc, cat) => {
  if (cat.items) {
    return [...acc, ...cat.items];
  }
  if (cat.subCategories) {
    const subItems = cat.subCategories.reduce((subAcc, subCat) => [...subAcc, ...subCat.items], []);
    return [...acc, ...subItems];
  }
  return acc;
}, []);
