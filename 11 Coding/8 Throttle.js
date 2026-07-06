// Q : Throttle

function throttle(callback, delay) {
  let canRun = true;
  return function (...args) {
    if (!canRun) return;

    callback(...args);
    canRun = false;
    setTimeout(() => {
      canRun = true;
    }, delay);
  };
}

const handleScroll = throttle(()=>{console.log("Scrolling. . .")} ,2000);
handleScroll()
    handleScroll()
    handleScroll()
    handleScroll()
