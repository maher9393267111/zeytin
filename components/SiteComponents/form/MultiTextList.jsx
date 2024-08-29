
import { MdDeleteForever } from "react-icons/md";

import { useState } from "react";
import TextInput from "./textInput";

const MultiTextList = ({ type, form, setForm }) => {
  const [input, setInput] = useState({
   title: '' , value: "", titletr:'' ,valuetr:''
  });

  const [isError, setError] = useState({});

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const addHandler = () => {
    if (!input.value) return;
    const list = [...form[type]];
     list.push(input);
    
    setForm({ ...form, [type]: list });
    setInput({  title: '' , value: "", titletr:'' ,valuetr:''});
  };

  const enterHandler = (e) => {
    if (e.key === "Enter") {
      addHandler();
    }
  };

  const deleteItemHandler = (index) => {
    const list = [...form[type]];
    list.splice(index, 1);
    setForm({ ...form, [type]: list });
  };

  return (
    <div className="my-5 border-2 p-1 rounded-md  !font-estedad">
      {form[type]?.length !== 0 && (
        <div className="flex flex-wrap gap-1  break-words">
          {form[type]?.map((item, index) => (
            <div
              key={index}
              className="select-none w-fit border-2 break-words py-1 pr-3 min-w-16 rounded-md flex justify-between  "
            >
              <p className="break-words w-11/12">{item?.title}</p>
              <span
                className="text-red-500 px-1 pb-2 md cursor-pointer"
                onClick={() => deleteItemHandler(index)}
              >
                <MdDeleteForever />
              </span>
            </div>
          ))}
        </div>
      )}
      <div className="py-3 flex flex-col md:flex-row items-center md:gap-2">
        <TextInput
          type="text"
          placeholder={"العنوان"}
          name="title"
          form={input}
          changehandler={changeHandler}
          isError={isError}
          enterHandler={enterHandler}
          enter={true}
        />



<TextInput
          type="text"
          placeholder={'المواصفات'}
          name="value"
          form={input}
          changehandler={changeHandler}
          isError={isError}
          enterHandler={enterHandler}
          enter={true}
        />


<TextInput
          type="text"
          placeholder={'العنوان بالانكليزية'}
          name="titletr"
          form={input}
          changehandler={changeHandler}
          isError={isError}
          enterHandler={enterHandler}
          enter={true}
        />




<TextInput
          type="text"
          placeholder={'المواصفات بالانكليزية'}
          name="valuetr"
          form={input}
          changehandler={changeHandler}
          isError={isError}
          enterHandler={enterHandler}
          enter={true}
        />


        <div>
          <button
            type="button"
            onClick={addHandler}
            className="mr-2  text-lg   !font-estedad border-2 rounded-md px-2 py-1"
          >
           اضافة
          </button>
        </div>
      </div>
    </div>
  );
};

export default MultiTextList;