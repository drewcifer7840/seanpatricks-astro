/**
 * ================================================================
 * ETCH NAV COMPONENT - System.css Refactored
 * ================================================================
 */

document.addEventListener("DOMContentLoaded", () => {

  // 1. STICKY HEADER & SCROLL LOGIC
  const header = document.querySelector('.header-wrapper');

  if (header) {
    let lastY = window.scrollY;
    let ticking = false;
    let isHidden = false;
    const hideThreshold = 200;

    const updateHeader = () => {
      const currentY = Math.max(0, window.scrollY);

      header.classList.toggle('scrolling', currentY > 0);

      if (currentY > hideThreshold) {
        const isMenuOpen = document.body.classList.contains('menu-open');
        if (!isMenuOpen) {
          if (currentY > lastY && !isHidden) {
            header.classList.add('hide');
            isHidden = true;
          } else if (currentY < lastY && isHidden) {
            header.classList.remove('hide');
            isHidden = false;
          }
        }
      } else {
        header.classList.remove('hide');
        isHidden = false;
      }

      lastY = currentY;
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(updateHeader);
        ticking = true;
      }
    }, { passive: true });
  }

  // 2. MOBILE OFF-CANVAS TOGGLE
  const toggleBtn = document.querySelector('.toggle');
  const menuWrapper = document.querySelector('.menu-wrapper');
  const body = document.body;

  if (toggleBtn && menuWrapper) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';

      toggleBtn.setAttribute('aria-expanded', !isExpanded);
      toggleBtn.classList.toggle('active');
      menuWrapper.classList.toggle('open');
      body.classList.toggle('menu-open');

      if (!isExpanded) {
        body.style.overflow = 'hidden';
      } else {
        body.style.overflow = '';
      }
    });

    const backdrop = document.querySelector('.menu-wrapper-backdrop');
    if (backdrop) {
      backdrop.addEventListener('click', () => {
        if (toggleBtn.classList.contains('active')) {
          toggleBtn.click();
        }
      });
    }
  }

  // 3. DROPDOWN & MEGA-MENU LOGIC
  const dropdowns = document.querySelectorAll('.menu-dropdown');

  dropdowns.forEach(dropdown => {
    const trigger = dropdown.querySelector('.menu-dropdown__trigger');
    const content = dropdown.querySelector('.menu-dropdown__content-wrapper');
    const backBtn = dropdown.querySelector('.menu-dropdown-back-button');
    let hoverTimeout;

    if (!trigger || !content) return;

    dropdown.addEventListener('mouseenter', () => {
      if (window.innerWidth > 991) {
        clearTimeout(hoverTimeout);
        openDropdown(dropdown, trigger);
      }
    });

    dropdown.addEventListener('mouseleave', () => {
      if (window.innerWidth > 991) {
        hoverTimeout = setTimeout(() => {
          closeDropdown(dropdown, trigger);
        }, 150);
      }
    });

    trigger.addEventListener('click', (e) => {
      if (window.innerWidth <= 991) {
        e.preventDefault();
        const isOpen = dropdown.classList.contains('is-open');

        dropdowns.forEach(sibling => {
          if (sibling !== dropdown) {
            closeDropdown(sibling, sibling.querySelector('.menu-dropdown__trigger'));
          }
        });

        if (isOpen) {
          closeDropdown(dropdown, trigger);
        } else {
          openDropdown(dropdown, trigger);
        }
      }
    });

    if (backBtn) {
      backBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        closeDropdown(dropdown, trigger);
      });
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      dropdowns.forEach(d => closeDropdown(d, d.querySelector('.menu-dropdown__trigger')));
      if (toggleBtn && toggleBtn.classList.contains('active')) toggleBtn.click();
    }
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.menu-dropdown')) {
      dropdowns.forEach(d => closeDropdown(d, d.querySelector('.menu-dropdown__trigger')));
    }
  });

  function openDropdown(dropdown, trigger) {
    dropdown.classList.add('is-open');
    trigger.classList.add('active');
    trigger.setAttribute('aria-expanded', 'true');
  }

  function closeDropdown(dropdown, trigger) {
    dropdown.classList.remove('is-open');
    if (trigger) {
      trigger.classList.remove('active');
      trigger.setAttribute('aria-expanded', 'false');
    }
  }

});
