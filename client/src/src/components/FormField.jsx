import React from 'react'
import { useState } from "react"

const FormField = ({labelName, placeholder, inputType, value, handleChange, isTextArea}) => {

    // const [isTextArea, setIsTextArea] = useState(false)

  return (
    <label className='flex-1 flex-col flex w-full'>
        {labelName && (
            <span className='font-epilogue font-medium text-[14px] leading-[22px] text-[#808191] mb-[10px]'>
                {labelName}
            </span>
        )}
         {isTextArea ? (
        <textarea 
          required
          defaultValue={value}
          onChange={handleChange}
          rows={10}
          placeholder={placeholder}
          className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]"
        />
      ) : (
        <input 
          required
          defaultValue={value}
          onChange={handleChange}
          type={inputType}
          step="0.1"
          placeholder={placeholder}
          className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]"
        />
      )}
    </label>
  )
}

export default FormField