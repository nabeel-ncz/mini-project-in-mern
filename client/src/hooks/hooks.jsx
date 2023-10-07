import { useState } from "react";

export const useFormData = (defaultValue) => {
    const [ form, setForm ] = useState({...defaultValue});
    const handleChange = (event) => {
        setForm((prev) => {
            return {
                ...prev,
                [event.target.name]: event.target.value,
            };
        });
    }
    return [form, setForm, handleChange];
};