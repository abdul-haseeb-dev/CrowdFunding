import React, {useState} from 'react'
import { useNavigate } from "react-router-dom"
import { ethers } from 'ethers'
import { money } from "../assets"
import { CustomButton } from "../components"
import { checkIfImage } from "../utils"
import { FormField } from "../components"
import { useStateContext } from '../context'

const CreateCampaign = () => {
  
  const navigate = useNavigate()
  const [isLoading, setisLoading] = useState(false)
  const { createCampaign } = useStateContext();
  const [form, setform] = useState({
    name:'',
    title: '',
    description: '',
    target: '',
    deadline: '',
    image: ''
  })

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value })
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    checkIfImage(form.image, async (exists) => {
      if(exists) {
        setIsLoading(true)
        await createCampaign({ ...form, target: ethers.utils.parseUnits(form.target, 18)})
        setIsLoading(false);
        navigate('/');
      } else {
        alert('Provide valid image URL')
        setForm({ ...form, image: '' });
      }
    })
  }
  return (
    <div className='bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4'>
      {isLoading && "Loader..."}
      <div className='flex justify-center items-center p-[16px] sm:min-w w-[380px] bg-[#3a3a43] rounded-[10px]'>
        <h1 className='font-epilogue text-white font-bold sm:text-[25px] text-[18px] leading-[38px]'>
          Start Campaigns
        </h1>
      </div>

      <form onSubmit={handleSubmit} className='flex flex-col w-full gap-[30px] mt-[65px]'>
        <div className='flex flex-wrap gap-[40px]'>
            <FormField
              labelName = "Your Name *"
              placeholder = "Abdul Haseeb"
              inputType = "text"
              value = {form.title}
              handleChange = {(e) => handleFormFieldChange('name',e)}
            />
            <FormField
               labelName = "Campaign Title *"
               placeholder = "Write a Title"
               inputType = "text"
               value = {form.title}
               handleChange = {(e) => handleFormFieldChange('title', e)}
            />
        </div>

        <FormField
          labelName = "Description *"
          placeholder = "Write Your Description"
          inputType = "text"
          isTextArea
          value = {form.description}
          handleChange = {(e) => ('description', e)}
        />

        

        <div className='w-full flex bg-[#861657] rounded-[10px] justify-center items-center'>
          <img src={money} alt="Money Banner" className='w-[40px] h-[40px]'/>
          <h4 className='font-epilogue text-white font-bold justify-center items-center text-[25px] text-white ml-[20px] '>You Will Get 100% Of The Amount Raised!</h4>
        </div>

        <div className="flex flex-wrap gap-[40px]">
          <FormField 
            labelName="Goal *"
            placeholder="ETH 0.50"
            inputType="text"
            value={form.target}
            handleChange={(e) => handleFormFieldChange('target', e)}
          />
          <FormField 
            labelName="End Date *"
            placeholder="End Date"
            inputType="date"
            value={form.deadline}
            handleChange={(e) => handleFormFieldChange('deadline', e)}
          />
        </div>

        <FormField 
            labelName="Campaign image *"
            placeholder="Place image URL of your campaign"
            inputType="url"
            value={form.image}
            handleChange={(e) => handleFormFieldChange('image', e)}
          />

          <div className="flex justify-center items-center mt-[40px]">
            <CustomButton 
              btnType="submit"
              title="Submit new campaign"
              styles="bg-[#1dc071]"
            />
          </div>
      </form>
    </div>
  )
}

export default CreateCampaign