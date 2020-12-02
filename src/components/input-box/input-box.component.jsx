import React, {useState} from 'react';

export default function InputBox({className, onSubmit, ...options}) {
    let [value, setValue] = useState('');
    let handleChange = function(event){
        setValue(event.target.value);
    }
    let handleKeyDown = (event) =>{
        if(event.which === 13){
            if(onSubmit){
                onSubmit(event.target.value);
                setValue('');
            }
        }
    }
    return (
        <input 
            value={value} 
            className={className} 
            onChange={handleChange} 
            onKeyDown={handleKeyDown}
            {...options}>
        </input>
    )
}
