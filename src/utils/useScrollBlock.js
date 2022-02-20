import { useRef } from "react";

const safeDocument = typeof document !== "undefined" ? document : {};

const useScrollBlock = () => {
  const scrollBlocked = useRef();
  const scrollOffset = useRef();
  const html = safeDocument.documentElement;
  const { body } = safeDocument;
  const nav = safeDocument.getElementsByClassName("nav")[0];

  const blockScroll = () => {
    if (!body || !body.style || scrollBlocked.current || !nav) return;

    const scrollBarWidth = window.innerWidth - html.clientWidth;
    const bodyPaddingRight =
      parseInt(
        window.getComputedStyle(body).getPropertyValue("padding-right")
      ) || 0;

    html.style.position = "relative";
    html.style.overflow = "hidden";
    body.style.position = "relative";
    body.style.overflow = "hidden";
    body.style.paddingRight = `${bodyPaddingRight + scrollBarWidth}px`;
    nav.style.paddingRight = `${bodyPaddingRight + scrollBarWidth}px`;
    // mobile compatibility
    scrollOffset.current = window.pageYOffset;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollOffset.current}px`;
    document.body.style.width = "100%";

    scrollBlocked.current = true;
  };

  const allowScroll = () => {
    if (!body || !body.style || !scrollBlocked.current || !nav) return;

    html.style.position = "";
    html.style.overflow = "";
    body.style.position = "";
    body.style.overflow = "";
    body.style.paddingRight = "";
    nav.style.paddingRight = "";
    // mobile compatibility
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.width = "";
    window.scrollTo(0, scrollOffset.current);

    scrollBlocked.current = false;
  };

  return [blockScroll, allowScroll];
};

export default useScrollBlock;
