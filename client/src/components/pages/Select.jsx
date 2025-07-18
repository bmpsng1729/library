


function Select({
    options,
    label,
    className,
    ref,
    ...props
}) {
   
  return (
    <div className='w-full'>
      {label && <label > {label}</label>

      }
      <select
      {...props}
      ref={ref}
      className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        
      >
      {
        options?.map((option)=>(
            <option key={option} value={option}> {option}</option>
        ))
      }
      </select>
    </div>
  )
}

export default Select
