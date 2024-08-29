

import { useState } from "react";

const TextInput2 = ({
  className,
  name,
  type,
  placeholder,
  form,
  isError,
  changehandler,
  textArea = false,
  enterHandler,
  enter = false,
}) => {
  const [fisrt, setFirst] = useState(false);
  const [isFocuse, setFocuse] = useState(false);

  const focusHandler = () => {
    setFocuse(true);
  };

  const blurHandler = () => {
    setFocuse(false);
  };

  return (
    <>
      {!textArea && (
        <label
          name={name}
          className={`${className} border-2  ${
            isError[name] && !isFocuse && fisrt ? "border-red-400" : ""
          } relative my-[7px] rounded-md`}
          onFocus={focusHandler}
          onBlur={blurHandler}
          onClick={() => setFirst(true)}
        >
          <span
            className={`absolute text-sm text-gray-400 ${
              isFocuse || form[name].length !== 0
                ? "top-[-13px] right-1 bg-white rounded-md px-1"
                : "top-[9px] right-2"
            }  select-none cursor-text transition-all`}
          >
            {placeholder}
          </span>

          <input
            className={`px-2 w-full py-[8px] ${
              type === "number" ? "appearance-none" : ""
            }  rounded-md outline-header-theme ${
              isError[name] ? "outline-red-400" : ""
            } transition-colors`}
            type={type}
            name={name}
            value={form[name]}
            onFocus={() => setFirst(true)}
            onChange={changehandler}
            required={false}
            onKeyDown={enter ? enterHandler : null}
          />
        </label>
      )}

      {textArea && (
        <label
          name={name}
          className={`${className} border-2 ${isFocuse ? "border-header-theme" : ""} ${
            isError[name] && !isFocuse && fisrt ? "border-red-400" : ""
          } relative my-[7px] rounded-md`}
          onFocus={focusHandler}
          onBlur={blurHandler}
          onClick={() => setFirst(true)}
        >
          <span
            className={`absolute text-sm text-gray-400 ${
              isFocuse || form[name].length !== 0
                ? "top-[-15px] right-1 bg-white rounded-md px-1"
                : "top-[7px] right-2"
            }  select-none cursor-text transition-all`}
          >
            {placeholder}
          </span>

          <textarea
            className={`px-2 w-full py-[14px] resize-none inline-block rounded-md outline-none  transition-colors`}
            name={name}
            value={form[name]}
            onFocus={() => setFirst(true)}
            onChange={changehandler}
            required={false}
          />
        </label>
      )}
    </>
  );
};

export default TextInput2;