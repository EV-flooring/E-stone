// GLightbox 초기화
const lightbox = GLightbox({
  selector: '.glightbox',
  touchNavigation: true,
  loop: true,
  zoomable: false,
  history: false
});

let lbStateActive = false;      
let closingByPopstate = false;  

// 라이트박스 "처음 열릴 때"만 history 1번 추가
document.querySelectorAll('.glightbox').forEach(item => {
  item.addEventListener('click', () => {
    if (!lbStateActive) {
      history.pushState({ glightbox: true }, '', location.href);
      lbStateActive = true;
    }
  });
});

// 뒤로가기 누르면 라이트박스만 닫기
window.addEventListener('popstate', (e) => {
  // 라이트박스 state가 활성화된 상태에서 뒤로가기가 발생하면 닫기
  if (lbStateActive) {
    const opened = document.querySelector('.glightbox-open');
    if (opened) {
      closingByPopstate = true;
      lightbox.close();
    }
    lbStateActive = false; 
  }
});

// 라이트박스를 "일반 닫기(X/바깥 클릭)"로 닫았을 때 스택 정리
lightbox.on('close', () => {
  if (lbStateActive && !closingByPopstate) {
    // 사용자가 X로 닫으면, 우리가 넣어둔 state를 제거하기 위해 한 칸 뒤로
    history.back();
    lbStateActive = false;
  }
  closingByPopstate = false;
});
