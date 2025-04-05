// hooks/useMessageForm.js
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const useMessageForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [formData, setFormData] = useState({
    nombreCliente: "",
    apellidoCliente: "",
    celular: "",
    correo: "",
    propiedad_id: "",
    detalle: "",
  });

  const [formErrors, setFormErrors] = useState({
    nombreCliente: '',
    apellidoCliente: '',
    celular: '',
    correo: '',
    propiedad_id: '',
    detalle: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const codigoPropiedad = searchParams.get('codigo');
    
    if (codigoPropiedad) {
      setFormData(prev => ({
        ...prev,
        propiedad_id: codigoPropiedad
      }));
    }
  }, [location.search]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    // Limpiar error al escribir
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    let isValid = true;
  
    if (!formData.nombreCliente.trim()) {
      errors.nombreCliente = "El nombre es requerido";
      isValid = false;
    }
  
    if (!formData.apellidoCliente.trim()) {
      errors.apellidoCliente = "El apellido es requerido";
      isValid = false;
    }
  
    if (!formData.celular.trim()) {
      errors.celular = "El celular es requerido";
      isValid = false;
    } else if (!/^\d+$/.test(formData.celular)) {
      errors.celular = "Solo se permiten números";
      isValid = false;
    }
  
    if (!formData.correo.trim()) {
      errors.correo = "El correo es requerido";
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.correo)) {
      errors.correo = "Correo inválido";
      isValid = false;
    }
  
    if (!formData.detalle.trim()) {
      errors.detalle = "El mensaje es requerido";
      isValid = false;
    }
  
    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validateForm()) return;
  
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitSuccess(true);
      setTimeout(() => navigate('/'), 3000);
    } catch (error) {
      setFormErrors({ general: "Hubo un problema al enviar el mensaje" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    formErrors,
    isSubmitting,
    submitSuccess,
    handleChange,
    handleSubmit
  };
};