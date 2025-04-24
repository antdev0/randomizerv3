import { useState } from 'react';

export const useConvertToBase64 = () => {
    const [base64, setBase64] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const convertToBase64 = (file: File) => {
        // Validate file type (only accept PNG, JPG, and JPEG)
        if (!file.type.match('image/png') && !file.type.match('image/jpeg')) {
            setError('Please upload a PNG, JPG, or JPEG file.');
            setBase64(null);
            return;
        }

        // Create a FileReader to convert the file to Base64
        const reader = new FileReader();
        
        reader.onloadend = () => {
            setBase64(reader.result as string);
            setError(null);
        };

        reader.onerror = () => {
            setError('Error reading the file.');
            setBase64(null);
        };

        reader.readAsDataURL(file);
    };

    return { base64, error, convertToBase64 };
};

export default useConvertToBase64;
