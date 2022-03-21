import React from 'react';

function Form({ formBlockClass, onSubmit, name, hasInput, title, children, buttonText, ...props }) {
  return (
    <form onSubmit={onSubmit} className={`${formBlockClass}__form`} id={name} name={name}>
      <h2 className={`${formBlockClass}__title ${hasInput ? `` : `${formBlockClass}__title_type_noinputs`}`.trim()}>
        {title}
      </h2>
      <fieldset className={`${formBlockClass}__input-container`}>
        {children}
        <button className={`button ${formBlockClass}__btn ${formBlockClass}__btn_action_submit`} type='submit'>
          {buttonText}
        </button>
      </fieldset>
    </form>
  );
}

export default Form;
