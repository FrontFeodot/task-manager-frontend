import { RefObject, useEffect } from 'react';

const useToolbarStyling = (containerRef: RefObject<HTMLDivElement>) => {
  const container = containerRef.current;

  useEffect(() => {
    if (container) {
      observer.observe(container, { childList: true, subtree: true });
    }
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [container]);

  const adjustPosition = (modal: HTMLElement) => {
    if (!container) return;

    const modalRect = modal.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    const adjustAxis = (
      modalPos: number,
      containerPos: number,
      containerSize: number,
      baseValue: number,
      isXAxis: boolean
    ) => {
      const overflow =
        modalPos +
        modalRect[isXAxis ? 'width' : 'height'] -
        containerPos -
        containerSize;
      const underflow = containerPos - modalPos;

      if (overflow > 0) return baseValue - overflow - (isXAxis ? 20 : 8);
      if (underflow > 0) return baseValue + underflow + (isXAxis ? 0 : -8);
      return baseValue;
    };

    const newLeft = adjustAxis(
      modalRect.left,
      containerRect.left,
      containerRect.width,
      parseFloat(modal.style.left) || modal.offsetLeft,
      true
    );

    const newTop = adjustAxis(
      modalRect.top,
      containerRect.top,
      containerRect.height,
      parseFloat(modal.style.top) || modal.offsetTop,
      false
    );

    modal.style.left = `${newLeft}px`;
    modal.style.top = `${newTop}px`;
  };

  const isTargetModal = (el: HTMLElement): boolean =>
    el.classList.contains('rdw-dropdown-wrapper') ||
    /rdw-[^-]+-modal/.test(el.className);

  const observer = new MutationObserver((mutations) => {
    for (const { addedNodes } of mutations) {
      addedNodes.forEach((node) => {
        if (node instanceof HTMLElement && isTargetModal(node)) {
          requestAnimationFrame(() => adjustPosition(node));
        }
      });
    }
  });
};

export default useToolbarStyling;
