/**
 * 입력된 URL이 안전한 프로토콜(http, https, mailto 등)을 사용하는지 검증합니다.
 * 'javascript:' 와 같은 악성 프로토콜을 이용한 XSS 공격을 방지하기 위해 사용됩니다.
 * 
 * @param {string} url - 검증할 URL
 * @param {string} [fallbackUrl='#'] - 안전하지 않은 URL일 경우 반환할 기본 주소
 * @returns {string} 안전한 URL
 */
export function sanitizeUrl(url, fallbackUrl = '#') {
  if (!url) return fallbackUrl;
  
  try {
    // 문자열 공백 제거
    const trimmedUrl = url.trim();
    
    // 상대 경로이거나 슬래시로 시작하는 경우 안전하다고 간주 (예: /images/logo.png)
    if (trimmedUrl.startsWith('/') || trimmedUrl.startsWith('#') || trimmedUrl.startsWith('?')) {
      return trimmedUrl;
    }

    // URL 객체로 변환 시도 (문제가 있는 URL 형식이면 catch로 넘어감)
    const parsedUrl = new URL(trimmedUrl);
    
    // 허용된 프로토콜 목록
    const allowedProtocols = ['http:', 'https:', 'mailto:', 'tel:'];
    
    if (allowedProtocols.includes(parsedUrl.protocol)) {
      return trimmedUrl;
    }
    
    // 허용되지 않은 프로토콜(예: javascript:)이면 fallback 반환
    console.warn(`[Security Warning] Blocked unsafe URL protocol: ${parsedUrl.protocol}`);
    return fallbackUrl;
  } catch (e) {
    // URL 파싱 에러 시 기본적으로 안전하지 않다고 간주
    return fallbackUrl;
  }
}
