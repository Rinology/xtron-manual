import React from 'react';
import { Wrench, BatteryCharging, AlertTriangle, Wind, ZapOff, CheckCircle, MonitorPlay, Settings, ShieldAlert, VolumeX, Monitor, Power, Activity, PersonStanding, Gauge, Lightbulb, ArrowLeftRight, Navigation, Key, Zap } from 'lucide-react';
import PedalGuide from '../components/PedalGuide';
import BatteryGuide from '../components/BatteryGuide';
import TirePressureGuide from '../components/TirePressureGuide';
import SuntourGuide from '../components/SuntourGuide';
import WinterBatteryGuide from '../components/WinterBatteryGuide';
import LCDPowerGuide from '../components/LCDPowerGuide';
import LCDDisplayModeGuide from '../components/LCDDisplayModeGuide';
import LCDPasGuide from '../components/LCDPasGuide';
import LCDWalkModeGuide from '../components/LCDWalkModeGuide';
import LCDCruiseGuide from '../components/LCDCruiseGuide';
import LCDLightGuide from '../components/LCDLightGuide';
import NoiseInspectionGuide from '../components/NoiseInspectionGuide';
import HandlebarGuide from '../components/HandlebarGuide';
import SeatHeightGuide from '../components/SeatHeightGuide';
import HandleHeightGuide from '../components/HandleHeightGuide';
import FoldingGuide from '../components/FoldingGuide';
import BrakeGuide from '../components/BrakeGuide';
import GearGuide from '../components/GearGuide';
import ErrorPowerGuide from '../components/ErrorPowerGuide';
import ErrorBrakeGuide from '../components/ErrorBrakeGuide';
import ErrorTireGuide from '../components/ErrorTireGuide';
import BatterySeatpostGuide from '../components/BatterySeatpostGuide';
import BatteryKTX4pinGuide from '../components/BatteryKTX4pinGuide';
import BatteryKTX6pinGuide from '../components/BatteryKTX6pinGuide';
import NoiseFenderGuide from '../components/NoiseFenderGuide';

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
          youtubeLink: "https://youtu.be/rgEEC-B9zR8",
          summary: ["좌(L)/우(R) 페달 식별 및 결합 방향 확인"],
          customComponent: PedalGuide
        },
        {
          id: "handlebar",
          title: "핸들/스템 정렬",
          icon: <Wrench size={18} />,
          summary: ["앞바퀴와 핸들바가 수직(90도)이 되도록 육안으로 맞춥니다."],
          customComponent: HandlebarGuide
        },
        {
          id: "tire-pressure-basic",
          title: "타이어 공기압 체크",
          icon: <Wind size={18} />,
          summary: ["주행 전 타이어 측면에 표기된 적정 공기압(PSI)을 확인하세요."],
          customComponent: TirePressureGuide
        },
        {
          id: "suntour-seatpost",
          title: "썬투어 서스펜션 교체",
          icon: <Wrench size={18} />,
          youtubeLink: "https://youtu.be/T0fKF32Y158",
          summary: ["안장과 싯포스트를 분리하고 썬투어 싯포스트를 결합합니다."],
          customComponent: SuntourGuide
        },
        {
          id: "seat-height",
          title: "안장 높이 조절",
          icon: <Wrench size={18} />,
          summary: ["페달을 가장 아래로 했을 때 무릎이 살짝 구부러지는 높이가 적절합니다."],
          customComponent: SeatHeightGuide
        },
        {
          id: "handle-height",
          title: "핸들바 높이 조절",
          icon: <Navigation size={18} />,
          summary: ["표시된 한계선(Minimum Insertion Line) 이상으로 뽑지 주의하세요."],
          customComponent: HandleHeightGuide
        },
        {
          id: "folding",
          title: "자전거 접기/펴기",
          icon: <ArrowLeftRight size={18} />,
          summary: ["핸들과 안장을 완전히 내리고 메인 프레임을 접습니다."],
          customComponent: FoldingGuide
        },
        {
          id: "brake-guide",
          title: "안전한 브레이킹 (모터컷)",
          icon: <ShieldAlert size={18} />,
          summary: ["레버를 당길 때 즉시 모터 동력을 차단하는 모터컷 원리 설명"],
          customComponent: BrakeGuide
        },
        {
          id: "gear-guide",
          title: "기어 변속 방법",
          icon: <Settings size={18} />,
          summary: ["체인이 굴러가고(주행 중) 있을 때만 1단씩 변속하세요."],
          customComponent: GearGuide
        },
      ]
    },
    {
      id: "lcd-manual",
      title: "LCD 가이드",
      items: [
        {
          id: "lcd-power",
          title: "전원 켜기/끄기",
          icon: <Power size={18} />,
          summary: ["가운데 전원 버튼(M)을 3초간 길게 누르면 전원이 켜지고 꺼집니다."],
          customComponent: LCDPowerGuide
        },
        {
          id: "lcd-display-mode",
          title: "화면 모드 변경",
          icon: <MonitorPlay size={18} />,
          summary: ["가운데 전원 버튼(M)을 짧게 누를 때마다 화면 정보가 전환됩니다."],
          customComponent: LCDDisplayModeGuide
        },
        {
          id: "lcd-pas-mode",
          title: "PAS 단계 설정",
          icon: <Activity size={18} />,
          summary: ["상/하단 버튼을 짧게 눌러 모터 어시스트 0~5단계를 세팅합니다."],
          customComponent: LCDPasGuide
        },
        {
          id: "lcd-walk-mode",
          title: "도보 모드 (끌바)",
          icon: <PersonStanding size={18} />,
          summary: ["정지 상태에서 ▼ 버튼을 길게 누르면 사람 걷는 속도로 밀어줍니다."],
          customComponent: LCDWalkModeGuide
        },
        {
          id: "lcd-cruise-mode",
          title: "크루즈 모드",
          icon: <Gauge size={18} />,
          summary: ["기능 작동 시 스로틀이나 페달 조작 없이도 정속 주행합니다."],
          customComponent: LCDCruiseGuide
        },
        {
          id: "lcd-light",
          title: "전조등/백라이트 켜기",
          icon: <Lightbulb size={18} />,
          summary: ["▲ 버튼을 길게 누르면 라이트가 점등됩니다."],
          customComponent: LCDLightGuide
        }
      ]
    },
    {
      id: "battery-guide",
      title: "배터리 가이드",
      items: [
        {
          id: "battery-seatpost",
          title: "싯포스트 배터리 탈착",
          icon: <Key size={18} />,
          summary: ["싯포스트 일체형 배터리의 장착 및 분리 방법"],
          customComponent: BatterySeatpostGuide
        },
        {
          id: "battery-ktx-4pin",
          title: "KTX 배터리 탈착 (4핀)",
          icon: <BatteryCharging size={18} />,
          summary: ["KTX 외장 배터리 4핀 커넥터 모델의 탈착 방법"],
          customComponent: BatteryKTX4pinGuide
        },
        {
          id: "battery-ktx-6pin",
          title: "KTX 배터리 탈착 (6핀)",
          icon: <BatteryCharging size={18} />,
          summary: ["KTX 외장 배터리 6핀 커넥터 모델의 탈착 방법"],
          customComponent: BatteryKTX6pinGuide
        },
        {
          id: "charging",
          title: "배터리 충전 방법 (공통)",
          icon: <Zap size={18} />,
          summary: ["충전기 포트를 배터리에 먼저 꽂고, 그 후 콘센트를 연결합니다."],
          customComponent: BatteryGuide
        },
        {
          id: "battery-care",
          title: "겨울철/장기 보관법",
          icon: <BatteryCharging size={18} />,
          summary: ["배터리는 실내 보관을 원칙으로 하며 심방전을 주의하세요."],
          customComponent: WinterBatteryGuide
        }
      ]
    },
    {
      id: "troubleshooting",
      title: "상황별 해결방법",
      subCategories: [
        {
          id: "power-issues",
          title: "전원 및 배터리",
          items: [
            {
              id: "error-power",
              title: "전원이 켜지지 않아요 (Error 01)",
              icon: <ZapOff size={18} />,
              summary: ["배터리 본체 하단의 열쇠 잠금이 100% 들어갔는지 점검합니다."],
              customComponent: ErrorPowerGuide
            }
          ]
        },
        {
          id: "noise-issues",
          title: "주행 및 소음",
          items: [
            {
              id: "noise-fender",
              title: "모터/흙받이 진동 소음",
              icon: <Wrench size={18} />,
              summary: ["진동음의 90%는 흙받이 청상 접합부의 금속 마찰음입니다."],
              customComponent: NoiseFenderGuide
            },
            {
              id: "noise-inspection",
              title: "브레이크 소음 점검",
              icon: <VolumeX size={18} />,
              summary: ["브레이크 쇳소리 유형(서걱/끼익/딱딱)별 원인과 해결책"],
              customComponent: NoiseInspectionGuide
            },
            {
              id: "error-brake",
              title: "주행 중 브레이크 소음 (심화)",
              icon: <AlertTriangle size={18} />,
              summary: ["길들이기·로터 오염·캘리퍼 틀어짐 등 원인별 자가 조치법"],
              customComponent: ErrorBrakeGuide
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
              summary: ["타이어 측면 적정 PSI에 맞춰 공기를 보충합니다."],
              customComponent: ErrorTireGuide
            }
          ]
        }
      ]
    }
  ]
};

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
