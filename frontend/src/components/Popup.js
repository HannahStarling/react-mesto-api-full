import React, { useEffect } from 'react';

function Popup({ isOpen, containerType, btnAriaText, onClose, className, children, ...props }) {
  useEffect(() => {
    if (!isOpen) return;
    function closeByEscape(e) {
      if (e.key === 'Escape') {
        onClose();
      }
    }
    document.addEventListener('keydown', closeByEscape);
    return () => document.removeEventListener('keydown', closeByEscape);
  }, [isOpen, onClose]);

  function handleClick() {
    onClose();
  }

  function stopHandleClick(e) {
    e.stopPropagation();
  }

  return (
    <section className={`popup page__popup ${className}`.trim()} onClick={handleClick}>
      <div className={`popup__container ${containerType}`} onClick={stopHandleClick}>
        {children}
        <button
          onClick={onClose}
          className='button popup__btn popup__btn_action_close'
          type='button'
          aria-label={btnAriaText}
        />
      </div>
    </section>
  );
}

export default Popup;
