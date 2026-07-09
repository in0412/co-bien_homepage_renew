/**
 * @file index.js
 * @description AhnLab 컨셉 코비엔 홈페이지 동적 인터랙션 및 제어 스크립트
 * @author Antigravity
 */

document.addEventListener('DOMContentLoaded', () => {
  
  // 1. 헤더 스크롤 섀도우 추가 효과
  const initHeaderScroll = () => {
    try {
      const header = document.getElementById('main-header');
      if (!header) {
        throw new Error("헤더 요소(#main-header)를 찾을 수 없습니다.");
      }

      window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      });
    } catch (error) {
      console.error("[헤더 스크롤 에러] ", error.message);
    }
  };

  // 2. 모바일 메뉴 토글 제어
  const initMobileNav = () => {
    try {
      const menuToggle = document.getElementById('menu-toggle');
      const mobileNav = document.getElementById('mobile-nav');
      
      if (!menuToggle || !mobileNav) {
        throw new Error("모바일 메뉴 관련 DOM 요소를 찾을 수 없습니다.");
      }

      const toggleIcon = menuToggle.querySelector('i');

      menuToggle.addEventListener('click', () => {
        mobileNav.classList.toggle('active');
        if (mobileNav.classList.contains('active')) {
          toggleIcon.className = 'fa-solid fa-xmark';
        } else {
          toggleIcon.className = 'fa-solid fa-bars';
        }
      });

      // 모바일 링크 클릭 시 메뉴 닫기
      const mobileItems = document.querySelectorAll('.mobile-nav-item');
      mobileItems.forEach(item => {
        item.addEventListener('click', () => {
          mobileNav.classList.remove('active');
          toggleIcon.className = 'fa-solid fa-bars';
        });
      });
    } catch (error) {
      console.error("[모바일 네비게이션 에러] ", error.message);
    }
  };

  // 3. 연혁 탭 스위칭 제어
  const initHistoryTabs = () => {
    try {
      const tabButtons = document.querySelectorAll('.history-tab-btn');
      const tabPanes = document.querySelectorAll('.history-pane');

      if (tabButtons.length === 0 || tabPanes.length === 0) {
        throw new Error("연혁 탭 버튼 혹은 탭 본문 요소를 찾을 수 없습니다.");
      }

      tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          const targetRange = btn.getAttribute('data-history-range');
          if (!targetRange) return;

          // 모든 탭 버튼 활성화 해제
          tabButtons.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');

          // 해당하는 연혁 탭 본문 활성화
          tabPanes.forEach(pane => {
            pane.classList.remove('active');
            if (pane.getAttribute('id') === `history-${targetRange}`) {
              pane.classList.add('active');
            }
          });
        });
      });
    } catch (error) {
      console.error("[연혁 탭 전환 에러] ", error.message);
    }
  };

  // 4. 온라인 비즈니스 문의 폼 제출 제어
  const initContactForm = () => {
    try {
      const contactForm = document.getElementById('business-contact-form');
      if (!contactForm) {
        // 일부 페이지에 폼이 존재하지 않을 시 경고 없이 종료하기 위해 return 처리
        return;
      }

      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        try {
          const compName = document.getElementById('comp_name').value.trim();
          const senderName = document.getElementById('sender_name').value.trim();
          const senderEmail = document.getElementById('sender_email').value.trim();
          const senderPhone = document.getElementById('sender_phone').value.trim();
          const message = document.getElementById('message').value.trim();

          if (!compName || !senderName || !senderEmail || !senderPhone || !message) {
            throw new Error("필수 문의 항목이 채워지지 않았습니다.");
          }

          // 비즈니스 문의 등록 완료 팝업
          alert(`[비즈니스 문의 등록 완료]\n\n회사명: ${compName}\n담당자: ${senderName}님\n\n문의사항이 성공적으로 등록되었습니다. 빠른 시일 내에 기재해주신 이메일/연락처로 연락드리겠습니다.`);
          
          contactForm.reset();
        } catch (innerErr) {
          alert(`[등록 실패] 입력 내용을 다시 한번 확인해 주세요.\n(${innerErr.message})`);
          console.error("[문의 폼 유효성 검사 실패] ", innerErr.message);
        }
      });
    } catch (error) {
      console.error("[온라인 문의 폼 에러] ", error.message);
    }
  };



  // 6. 스크롤 위치에 따른 네비게이션 메뉴 활성화 (Scroll Spy)
  const initScrollSpy = () => {
    try {
      const navItems = document.querySelectorAll('.nav-links .nav-item');
      const targetSectionIds = ['about', 'business', 'projects', 'partners', 'contact'];
      const targetSections = [];
      
      targetSectionIds.forEach(id => {
        const sec = document.getElementById(id);
        if (sec) targetSections.push(sec);
      });

      if (navItems.length === 0 || targetSections.length === 0) return;

      window.addEventListener('scroll', () => {
        let currentSectionId = "";
        
        targetSections.forEach(section => {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.clientHeight;
          // 헤더 높이 및 여유 오프셋을 감안하여 활성 섹션 매칭
          if (window.scrollY >= sectionTop - 160) {
            currentSectionId = section.getAttribute('id');
          }
        });

        navItems.forEach(item => {
          item.classList.remove('active');
          const href = item.getAttribute('href');
          if (href === `#${currentSectionId}`) {
            item.classList.add('active');
          }
        });
      });
    } catch (error) {
      console.error("[스크롤 스파이 에러] ", error.message);
    }
  };

  // IT 네트워크 파티클 캔버스 애니메이션
  const initHeroCanvas = () => {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    
    // 코비엔 관련 텍스트 배열
    const bizTexts = [
      'ASSET 컴플라이언스 솔루션을\n제공하는 회사',
      '여신, 사후관리, 후처리, 담보 특화\n전문 SI 업체',
      '금융업무를 완벽히 이해하는\n고객이 인정하는 SM 전문가 지원',
      '금융업무 특화 전문 보안 솔루션\n및 완벽한 유지보수'
    ];
    
    const initSize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    
    initSize();
    window.addEventListener('resize', initSize);
    
    class Particle {
      constructor(isTextNode) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 1.5;
        this.vy = (Math.random() - 0.5) * 1.5;
        this.radius = Math.random() * 2 + 1;
        
        // 텍스트 관련 속성
        this.isTextNode = isTextNode;
        if (this.isTextNode) {
          this.text = bizTexts[Math.floor(Math.random() * bizTexts.length)];
          this.phase = Math.random() * Math.PI * 2; // 페이드 인/아웃 위상차
          this.fadeSpeed = 0.0005 + Math.random() * 0.0005; // 페이드 인/아웃 속도
          this.radius = Math.random() * 3 + 2; // 텍스트 노드는 조금 더 크게
          this.textAlpha = 0;
        }
      }
      update(time) {
        this.x += this.vx;
        this.y += this.vy;
        
        if (this.x < 0 || this.x > width) this.vx = -this.vx;
        if (this.y < 0 || this.y > height) this.vy = -this.vy;
        
        // 텍스트 노드 알파값 계산 (Sine 파형으로 부드럽게 깜빡임)
        if (this.isTextNode && time) {
          // -0.5 ~ 1.5 범위로 만들어 완전히 사라지는 구간을 둠
          const rawAlpha = Math.sin(time * this.fadeSpeed + this.phase) * 1.5 - 0.25;
          this.textAlpha = Math.max(0, Math.min(1, rawAlpha));
        }
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.isTextNode ? `rgba(255, 255, 255, ${Math.max(0.3, this.textAlpha)})` : 'rgba(0, 162, 232, 0.8)';
        ctx.fill();
        
        // 텍스트 그리기
        if (this.isTextNode && this.textAlpha > 0.01) {
          ctx.font = '600 1.05rem "Noto Sans KR"';
          ctx.fillStyle = `rgba(255, 255, 255, ${this.textAlpha})`;
          // 약간의 그림자 효과를 주어 가독성 향상
          ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
          ctx.shadowBlur = 5;
          
          const lines = this.text.split('\n');
          for (let k = 0; k < lines.length; k++) {
            ctx.fillText(lines[k], this.x + 14, this.y - 12 + (k * 24));
          }
          
          ctx.shadowBlur = 0; // 그림자 초기화
        }
      }
    }
    
    const initParticles = () => {
      particles = [];
      const numParticles = Math.min(Math.floor((width * height) / 10000), 150);
      const numTextNodes = Math.min(10, Math.floor(numParticles / 6)); // 긴 문장이므로 노드 수 약간 축소
      
      for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle(i < numTextNodes));
      }
    };
    
    initParticles();
    window.addEventListener('resize', initParticles);
    
    const animate = (time) => {
      ctx.clearRect(0, 0, width, height);
      
      for (let i = 0; i < particles.length; i++) {
        particles[i].update(time);
        particles[i].draw();
        
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 162, 232, ${0.3 - dist/500})`;
            ctx.lineWidth = 1.5;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(animate);
    };
    
    requestAnimationFrame(animate);
  };




  // 초기화 함수 실행
  initHeaderScroll();
  initMobileNav();
  initHistoryTabs();
  initContactForm();
  initScrollSpy();
  initHeroCanvas();
});
