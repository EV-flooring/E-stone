// GLightbox 초기화
const lightbox = GLightbox({
  selector: '.glightbox',
  touchNavigation: true,
  loop: true,
  zoomable: false,
  history: false    
});

//  뒤로가기 누를 때 라이트박스만 닫히도록 제어
window.addEventListener("popstate", function () {
  const opened = document.querySelector('.glightbox-open');
  if (opened) {
    lightbox.close();
    history.pushState(null, null, location.href); // 페이지 이동 방지
  }
});

// 라이트박스 열릴 때 히스토리 스택 추가 → 뒤로가기로 닫을 수 있음
document.querySelectorAll('.glightbox').forEach(item => {
  item.addEventListener('click', () => {
    history.pushState(null, null, location.href);
  });
});
