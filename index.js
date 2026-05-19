document.addEventListener('DOMContentLoaded', () => {
  
  // 1. 헤더 스크롤 효과 (Scrolled Class)
  const header = document.getElementById('main-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 2. 모바일 메뉴 토글
  const menuToggle = document.getElementById('menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const toggleIcon = menuToggle.querySelector('i');

  menuToggle.addEventListener('click', () => {
    mobileNav.classList.toggle('active');
    if (mobileNav.classList.contains('active')) {
      toggleIcon.className = 'fa-solid fa-xmark';
    } else {
      toggleIcon.className = 'fa-solid fa-bars';
    }
  });

  // 모바일 네비게이션 클릭 시 닫기
  const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
  mobileNavItems.forEach(item => {
    item.addEventListener('click', () => {
      mobileNav.classList.remove('active');
      toggleIcon.className = 'fa-solid fa-bars';
    });
  });

  // 3. 스크롤 위치에 따른 네비게이션 링크 활성화
  const sections = document.querySelectorAll('section');
  const navItems = document.querySelectorAll('.nav-item');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop - 150) {
        current = section.getAttribute('id');
      }
    });

    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href') === `#${current}`) {
        item.classList.add('active');
      }
    });
  });

  // 4. 스크롤 리빌 애니메이션 (Intersection Observer)
  // 애니메이션 효과를 줄 엘리먼트들에 reveal 클래스를 지정합니다.
  const cardsAndSections = document.querySelectorAll('.about-card, .ceo-message-box, .business-card, .solution-item, .recruit-jobs, .map-layout, .contact-form');
  
  cardsAndSections.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target); // 한번 나타나면 관찰 중지
      }
    });
  }, {
    threshold: 0.1, // 10% 이상 노출 시 실행
    rootMargin: '0px 0px -50px 0px' // 하단 여백 감지 조절
  });

  cardsAndSections.forEach(el => {
    revealObserver.observe(el);
  });

  // 5. 모달 제어 (CEO 인사말 & 입사지원)
  const ceoModal = document.getElementById('ceo-modal');
  const ceoTrigger = document.getElementById('ceo-modal-trigger');
  const closeCeo = document.getElementById('close-ceo-modal');

  const applyModal = document.getElementById('apply-modal');
  const applyTrigger = document.getElementById('apply-btn');
  const closeApply = document.getElementById('close-apply-modal');

  // CEO 모달
  if (ceoTrigger && ceoModal) {
    ceoTrigger.addEventListener('click', () => {
      ceoModal.showModal();
    });
  }
  if (closeCeo && ceoModal) {
    closeCeo.addEventListener('click', () => {
      ceoModal.close();
    });
  }

  // 입사지원 모달
  if (applyTrigger && applyModal) {
    applyTrigger.addEventListener('click', () => {
      applyModal.showModal();
    });
  }
  if (closeApply && applyModal) {
    closeApply.addEventListener('click', () => {
      applyModal.close();
    });
  }

  // 모달 바깥부분 클릭 시 닫기
  [ceoModal, applyModal].forEach(modal => {
    if (modal) {
      modal.addEventListener('click', (e) => {
        const dialogDimensions = modal.getBoundingClientRect();
        if (
          e.clientX < dialogDimensions.left ||
          e.clientX > dialogDimensions.right ||
          e.clientY < dialogDimensions.top ||
          e.clientY > dialogDimensions.bottom
        ) {
          modal.close();
        }
      });
    }
  });

  // 6. 비즈니스 문의 폼 제출 이벤트
  const contactForm = document.getElementById('business-contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const compName = document.getElementById('comp_name').value;
      const senderName = document.getElementById('sender_name').value;

      // 현대적인 알림 디자인 대체 (alert 사용)
      alert(`[문의 완료]\n\n${compName}의 ${senderName}님, 문의가 성공적으로 등록되었습니다.\n기재해주신 연락처/이메일로 빠른 시일 내에 연락드리겠습니다.`);
      
      contactForm.reset();
    });
  }
});
