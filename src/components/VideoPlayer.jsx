import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw, Repeat, Volume2, VolumeX, Maximize, Minimize } from 'lucide-react';

const formatTime = (timeInSeconds) => {
  if (isNaN(timeInSeconds) || timeInSeconds === null) return '0:00';
  const mins = Math.floor(timeInSeconds / 60);
  const secs = Math.floor(timeInSeconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

export default function VideoPlayer({ 
  src, 
  title, 
  maxWidth = '600px', 
  maxHeight = '600px',
  style = {},
  className = '' 
}) {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const progressBarRef = useRef(null);
  const toastTimeoutRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isLooping, setIsLooping] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [toastMsg, setToastMsg] = useState(null);
  const [showCenterIcon, setShowCenterIcon] = useState(false);

  const showStatusToast = useCallback((msg) => {
    setToastMsg(msg);
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = setTimeout(() => {
      setToastMsg(null);
    }, 1600);
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
        triggerCenterFeedback();
      }).catch(err => console.log('Playback error:', err));
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
      triggerCenterFeedback();
    }
  };

  const triggerCenterFeedback = () => {
    setShowCenterIcon(true);
    setTimeout(() => setShowCenterIcon(false), 500);
  };

  const toggleLoop = (e) => {
    e.stopPropagation();
    const nextLoop = !isLooping;
    setIsLooping(nextLoop);
    if (videoRef.current) {
      videoRef.current.loop = nextLoop;
    }
    showStatusToast(nextLoop ? '🔁 무한 반복 켜짐' : '⏹️ 1회 재생 후 멈춤');
  };

  const handleReplay = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play().then(() => {
      setIsPlaying(true);
      showStatusToast('⏮️ 처음부터 재생');
    }).catch(err => console.log('Replay error:', err));
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
    showStatusToast(nextMuted ? '🔇 음소거' : '🔊 소리 켜짐');
  };

  const toggleFullscreen = (e) => {
    e.stopPropagation();
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen().catch(() => {
          videoRef.current?.requestFullscreen?.();
        });
      } else if (videoRef.current?.webkitEnterFullscreen) {
        // iOS Safari support
        videoRef.current.webkitEnterFullscreen();
      }
    } else {
      document.exitFullscreen?.();
    }
  };

  const handleSeek = (e) => {
    e.stopPropagation();
    if (!progressBarRef.current || !videoRef.current || !duration) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    const newTime = ratio * duration;
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  useEffect(() => {
    const onFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', onFsChange);
    return () => {
      document.removeEventListener('fullscreenchange', onFsChange);
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    };
  }, []);

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      ref={containerRef}
      className={`custom-video-player-container ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        width: '100%',
        maxWidth,
        margin: '1.5rem auto',
        borderRadius: '12px',
        overflow: 'hidden',
        background: '#090d16',
        boxShadow: 'var(--shadow-md)',
        border: '1px solid var(--surface-border)',
        userSelect: 'none',
        ...style
      }}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        src={src}
        autoPlay
        loop={isLooping}
        muted={isMuted}
        playsInline
        title={title}
        aria-label={title || '가이드 시연 영상'}
        onClick={togglePlay}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onTimeUpdate={() => {
          if (videoRef.current) setCurrentTime(videoRef.current.currentTime);
        }}
        onLoadedMetadata={() => {
          if (videoRef.current) setDuration(videoRef.current.duration);
        }}
        onEnded={() => {
          if (!isLooping) setIsPlaying(false);
        }}
        style={{
          width: '100%',
          maxHeight,
          objectFit: 'contain',
          display: 'block',
          cursor: 'pointer',
          background: '#090d16'
        }}
      />

      {/* Center Feedback Animation (Play / Pause when clicked) */}
      {showCenterIcon && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'rgba(0, 0, 0, 0.65)',
          color: '#fff',
          borderRadius: '50%',
          width: '64px',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
          backdropFilter: 'blur(4px)',
          animation: 'fadeZoom 0.4s ease-out forwards'
        }}>
          {isPlaying ? <Play size={28} style={{ marginLeft: '4px' }} /> : <Pause size={28} />}
        </div>
      )}

      {/* Paused Overlay Center Button (when not playing and controls not hovered) */}
      {!isPlaying && !showCenterIcon && (
        <button
          onClick={togglePlay}
          aria-label="재생"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'rgba(47, 98, 134, 0.85)',
            border: '2px solid rgba(255, 255, 255, 0.8)',
            color: '#fff',
            borderRadius: '50%',
            width: '56px',
            height: '56px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
            transition: 'transform 0.15s ease, background 0.15s ease'
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1.1)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1.0)'}
        >
          <Play size={24} style={{ marginLeft: '3px' }} />
        </button>
      )}

      {/* Floating Status Toast (Loop On/Off, Replay, etc.) */}
      {toastMsg && (
        <div style={{
          position: 'absolute',
          top: '12px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(20, 26, 38, 0.88)',
          color: '#fff',
          padding: '6px 14px',
          borderRadius: '20px',
          fontSize: '0.8rem',
          fontWeight: 600,
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          pointerEvents: 'none',
          zIndex: 10
        }}>
          {toastMsg}
        </div>
      )}

      {/* Custom Control Bar (Always visible or visible on hover/touch) */}
      <div 
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'linear-gradient(to top, rgba(10, 15, 25, 0.95) 0%, rgba(10, 15, 25, 0.7) 65%, transparent 100%)',
          padding: '24px 12px 10px 12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          opacity: isHovered || !isPlaying ? 1 : 0.85,
          transition: 'opacity 0.25s ease',
          zIndex: 5
        }}
      >
        {/* Interactive Progress Bar */}
        <div
          ref={progressBarRef}
          onClick={handleSeek}
          style={{
            position: 'relative',
            width: '100%',
            height: '6px',
            background: 'rgba(255, 255, 255, 0.25)',
            borderRadius: '3px',
            cursor: 'pointer',
            overflow: 'hidden'
          }}
          title="재생 위치 이동"
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              width: `${progressPercent}%`,
              background: 'linear-gradient(90deg, var(--ci-primary, #2f6286), var(--ci-secondary, #72bf44))',
              borderRadius: '3px',
              transition: 'width 0.1s linear'
            }}
          />
        </div>

        {/* Action Controls Row */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '8px',
          color: '#fff'
        }}>
          {/* Left: Play/Pause, Replay, Time */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {/* Play/Pause */}
            <button
              onClick={(e) => { e.stopPropagation(); togglePlay(); }}
              aria-label={isPlaying ? '일시정지' : '재생'}
              title={isPlaying ? '일시정지' : '재생'}
              style={{
                background: 'rgba(255, 255, 255, 0.12)',
                border: 'none',
                color: '#fff',
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'background 0.15s ease'
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)'}
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} style={{ marginLeft: '2px' }} />}
            </button>

            {/* Replay */}
            <button
              onClick={handleReplay}
              aria-label="처음부터 다시보기"
              title="처음부터 다시보기"
              style={{
                background: 'rgba(255, 255, 255, 0.12)',
                border: 'none',
                color: '#fff',
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'background 0.15s ease'
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)'}
            >
              <RotateCcw size={15} />
            </button>

            {/* Time Stamp */}
            <span style={{
              fontSize: '0.75rem',
              color: 'rgba(255, 255, 255, 0.85)',
              marginLeft: '4px',
              fontFamily: 'monospace',
              letterSpacing: '0.5px'
            }}>
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          {/* Right: Loop Button, Mute, Fullscreen */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {/* Loop Toggle Button with clear visual badge state */}
            <button
              onClick={toggleLoop}
              aria-label={isLooping ? '반복 재생 켜짐' : '반복 재생 꺼짐'}
              title={isLooping ? '반복 재생 켜짐 (클릭하여 1회 재생으로 변경)' : '1회 재생 (클릭하여 무한 반복 켜기)'}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                padding: '4px 9px',
                borderRadius: '20px',
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                border: isLooping 
                  ? '1px solid rgba(114, 191, 68, 0.8)' 
                  : '1px solid rgba(255, 255, 255, 0.2)',
                background: isLooping 
                  ? 'rgba(114, 191, 68, 0.22)' 
                  : 'rgba(255, 255, 255, 0.1)',
                color: isLooping 
                  ? '#86efac' 
                  : 'rgba(255, 255, 255, 0.65)'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = isLooping 
                  ? 'rgba(114, 191, 68, 0.35)' 
                  : 'rgba(255, 255, 255, 0.2)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = isLooping 
                  ? 'rgba(114, 191, 68, 0.22)' 
                  : 'rgba(255, 255, 255, 0.1)';
              }}
            >
              <Repeat size={14} style={{ color: isLooping ? '#86efac' : 'inherit' }} />
              <span>반복 {isLooping ? 'ON' : 'OFF'}</span>
            </button>

            {/* Mute / Unmute */}
            <button
              onClick={toggleMute}
              aria-label={isMuted ? '음소거 해제' : '음소거'}
              title={isMuted ? '음소거 해제' : '음소거'}
              style={{
                background: 'rgba(255, 255, 255, 0.12)',
                border: 'none',
                color: '#fff',
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'background 0.15s ease'
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)'}
            >
              {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
            </button>

            {/* Fullscreen Toggle */}
            <button
              onClick={toggleFullscreen}
              aria-label={isFullscreen ? '전체화면 종료' : '전체화면'}
              title={isFullscreen ? '전체화면 종료' : '전체화면'}
              style={{
                background: 'rgba(255, 255, 255, 0.12)',
                border: 'none',
                color: '#fff',
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'background 0.15s ease'
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)'}
            >
              {isFullscreen ? <Minimize size={15} /> : <Maximize size={15} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
