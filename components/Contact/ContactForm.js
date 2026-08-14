// components/Contact/ContactForm.js
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);
import baseUrl from '../../utils/baseUrl';

const alertContent = () => {
    MySwal.fire({
        title: '✅ Message envoyé !',
        text: 'Nous vous répondrons dans les plus brefs délais.',
        icon: 'success',
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
        background: '#ffffff',
        iconColor: '#4CAF50',
    });
};

const INITIAL_STATE = {
    name: "",
    email: "",
    number: "",
    subject: "",
    text: ""
};

const ContactForm = () => {
    const [contact, setContact] = useState(INITIAL_STATE);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleChange = e => {
        const { name, value } = e.target;
        setContact(prev => ({ ...prev, [name]: value }));
    };

    const onSubmit = async () => {
        setIsSubmitting(true);
        try {
            const url = `${baseUrl}/api/contact`;
            await axios.post(url, contact);
            setContact(INITIAL_STATE);
            alertContent();
        } catch (error) {
            MySwal.fire({
                title: '❌ Erreur',
                text: 'Une erreur est survenue. Veuillez réessayer.',
                icon: 'error',
                confirmButtonText: 'OK',
                confirmButtonColor: '#4CAF50',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="form-wrapper">
            <div className="form-header">
                <span className="form-badge">📩 Formulaire</span>
                <h3 className="form-title">Envoyez-nous un message</h3>
                <p className="form-subtitle">
                    Remplissez le formulaire ci-dessous, nous vous répondrons rapidement.
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="form-grid">
                    <div className="field-group">
                        <label className="field-label">Nom complet <span className="required">*</span></label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Jean Dupont"
                            className={`field-input ${errors.name ? 'error' : ''}`}
                            value={contact.name}
                            onChange={handleChange}
                            {...register("name", { 
                                required: "Le nom est requis",
                                minLength: { value: 2, message: "Minimum 2 caractères" }
                            })}
                        />
                        {errors.name && <span className="field-error">{errors.name.message}</span>}
                    </div>

                    <div className="field-group">
                        <label className="field-label">Email <span className="required">*</span></label>
                        <input
                            type="email"
                            name="email"
                            placeholder="exemple@email.com"
                            className={`field-input ${errors.email ? 'error' : ''}`}
                            value={contact.email}
                            onChange={handleChange}
                            {...register("email", { 
                                required: "L'email est requis",
                                pattern: { value: /^\S+@\S+$/i, message: "Email invalide" }
                            })}
                        />
                        {errors.email && <span className="field-error">{errors.email.message}</span>}
                    </div>

                    <div className="field-group">
                        <label className="field-label">Téléphone <span className="required">*</span></label>
                        <input
                            type="tel"
                            name="number"
                            placeholder="+235 64 78 88 31"
                            className={`field-input ${errors.number ? 'error' : ''}`}
                            value={contact.number}
                            onChange={handleChange}
                            {...register("number", { 
                                required: "Le téléphone est requis",
                                minLength: { value: 8, message: "Minimum 8 chiffres" }
                            })}
                        />
                        {errors.number && <span className="field-error">{errors.number.message}</span>}
                    </div>

                    <div className="field-group">
                        <label className="field-label">Sujet <span className="required">*</span></label>
                        <input
                            type="text"
                            name="subject"
                            placeholder="Objet de votre message"
                            className={`field-input ${errors.subject ? 'error' : ''}`}
                            value={contact.subject}
                            onChange={handleChange}
                            {...register("subject", { 
                                required: "Le sujet est requis",
                                minLength: { value: 3, message: "Minimum 3 caractères" }
                            })}
                        />
                        {errors.subject && <span className="field-error">{errors.subject.message}</span>}
                    </div>

                    <div className="field-group full-width">
                        <label className="field-label">Message <span className="required">*</span></label>
                        <textarea
                            name="text"
                            rows="5"
                            placeholder="Décrivez votre projet en détail..."
                            className={`field-input textarea ${errors.text ? 'error' : ''}`}
                            value={contact.text}
                            onChange={handleChange}
                            {...register("text", { 
                                required: "Le message est requis",
                                minLength: { value: 10, message: "Minimum 10 caractères" }
                            })}
                        />
                        {errors.text && <span className="field-error">{errors.text.message}</span>}
                    </div>
                </div>

                <button type="submit" className="submit-btn" disabled={isSubmitting}>
                    {isSubmitting ? (
                        <>
                            <span className="spinner"></span>
                            Envoi en cours...
                        </>
                    ) : (
                        <>
                            Envoyer le message
                            <svg className="btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </>
                    )}
                </button>
            </form>

            <style jsx>{`
                .form-wrapper {
                    background: #ffffff;
                    border-radius: 20px;
                    padding: 32px 28px;
                    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
                    border: 1px solid #f0f2f5;
                }

                .form-header {
                    margin-bottom: 24px;
                }

                .form-badge {
                    display: inline-block;
                    font-size: 12px;
                    font-weight: 600;
                    color: #4CAF50;
                    background: rgba(76, 175, 80, 0.08);
                    padding: 4px 14px;
                    border-radius: 50px;
                    letter-spacing: 0.5px;
                    margin-bottom: 8px;
                }

                .form-title {
                    font-size: 20px;
                    font-weight: 700;
                    color: #0A0A2E;
                    margin: 0 0 4px 0;
                }

                .form-subtitle {
                    font-size: 14px;
                    color: #8c8f9c;
                    margin: 0;
                    line-height: 1.6;
                }

                .form-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 16px;
                }

                .full-width {
                    grid-column: 1 / -1;
                }

                .field-group {
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                }

                .field-label {
                    font-size: 13px;
                    font-weight: 600;
                    color: #1a1a2e;
                }

                .required {
                    color: #dc3545;
                }

                .field-input {
                    width: 100%;
                    padding: 12px 16px;
                    font-size: 14px;
                    font-family: inherit;
                    color: #1a1a2e;
                    background: #f8fafc;
                    border: 2px solid #e8edf2;
                    border-radius: 12px;
                    transition: all 0.3s ease;
                    outline: none;
                }

                .field-input::placeholder {
                    color: #b0b8c4;
                }

                .field-input:focus {
                    border-color: #4CAF50;
                    background: #ffffff;
                    box-shadow: 0 0 0 4px rgba(76, 175, 80, 0.08);
                }

                .field-input.error {
                    border-color: #dc3545;
                    background: #fff8f8;
                }

                .field-input.error:focus {
                    box-shadow: 0 0 0 4px rgba(220, 53, 69, 0.08);
                }

                .textarea {
                    resize: vertical;
                    min-height: 120px;
                    line-height: 1.6;
                }

                .field-error {
                    font-size: 12px;
                    color: #dc3545;
                    margin-top: 2px;
                }

                .submit-btn {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    width: 100%;
                    margin-top: 20px;
                    padding: 14px 32px;
                    font-size: 15px;
                    font-weight: 700;
                    color: #ffffff;
                    background: linear-gradient(135deg, #1B5E20, #4CAF50);
                    border: none;
                    border-radius: 14px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 20px rgba(27, 94, 32, 0.2);
                }

                .submit-btn:hover:not(:disabled) {
                    transform: translateY(-3px);
                    box-shadow: 0 8px 30px rgba(27, 94, 32, 0.3);
                }

                .submit-btn:disabled {
                    opacity: 0.7;
                    cursor: not-allowed;
                }

                .btn-arrow {
                    width: 20px;
                    height: 20px;
                    transition: transform 0.3s ease;
                }

                .submit-btn:hover:not(:disabled) .btn-arrow {
                    transform: translateX(4px);
                }

                .spinner {
                    display: inline-block;
                    width: 20px;
                    height: 20px;
                    border: 3px solid rgba(255, 255, 255, 0.3);
                    border-top-color: #fff;
                    border-radius: 50%;
                    animation: spin 0.8s linear infinite;
                }

                @keyframes spin {
                    to { transform: rotate(360deg); }
                }

                @media (max-width: 768px) {
                    .form-wrapper {
                        padding: 24px 20px;
                    }

                    .form-grid {
                        grid-template-columns: 1fr;
                        gap: 14px;
                    }

                    .full-width {
                        grid-column: 1;
                    }

                    .form-title {
                        font-size: 18px;
                    }

                    .field-input {
                        padding: 10px 14px;
                        font-size: 13px;
                    }

                    .submit-btn {
                        padding: 12px 24px;
                        font-size: 14px;
                    }
                }

                @media (max-width: 480px) {
                    .form-wrapper {
                        padding: 20px 16px;
                    }
                }
            `}</style>
        </div>
    );
};

export default ContactForm;