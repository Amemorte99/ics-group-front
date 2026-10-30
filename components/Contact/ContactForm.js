// components/Contact/ContactForm.js
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);
import { API_URL } from '../../utils/baseUrl';
import { useI18n } from '../../lib/i18n';

const alertContent = (tx) => {
    MySwal.fire({
        title: tx({ fr: 'Message envoyé !', en: 'Message sent!', ar: 'تم إرسال الرسالة!' }),
        text: tx({ fr: 'Nous vous répondrons dans les plus brefs délais.', en: 'We will reply as soon as possible.', ar: 'سنرد عليكم في أقرب وقت ممكن.' }),
        icon: 'success',
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
        background: '#ffffff',
        iconColor: '#4CAF50',
    });
};

const ContactForm = () => {
    const { tx } = useI18n();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            await axios.post(`${API_URL}/contact`, {
                name: data.name,
                email: data.email,
                phone: data.number,
                subject: data.subject,
                message: data.text,
            });
            reset();
            alertContent(tx);
        } catch (error) {
            MySwal.fire({
                title: tx({ fr: 'Erreur', en: 'Error', ar: 'خطأ' }),
                text: error.response?.status === 429
                    ? tx({ fr: 'Trop de tentatives, réessayez dans une minute.', en: 'Too many attempts, please try again in a minute.', ar: 'محاولات كثيرة، أعيدوا المحاولة بعد دقيقة.' })
                    : tx({ fr: 'Une erreur est survenue. Veuillez réessayer.', en: 'Something went wrong. Please try again.', ar: 'حدث خطأ. يرجى المحاولة مرة أخرى.' }),
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
                <span className="form-badge">📩 {tx({ fr: 'Formulaire', en: 'Form', ar: 'نموذج' })}</span>
                <h3 className="form-title">{tx({ fr: 'Envoyez-nous un message', en: 'Send us a message', ar: 'أرسلوا لنا رسالة' })}</h3>
                <p className="form-subtitle">
                    {tx({ fr: 'Remplissez le formulaire ci-dessous, nous vous répondrons rapidement.', en: 'Fill in the form below and we will reply quickly.', ar: 'املأوا النموذج أدناه وسنرد عليكم سريعًا.' })}
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="form-grid">
                    <div className="field-group">
                        <label className="field-label">{tx({ fr: 'Nom complet', en: 'Full name', ar: 'الاسم الكامل' })} <span className="required">*</span></label>
                        <input
                            type="text"
                            name="name"
                            placeholder={tx({ fr: 'Jean Dupont', en: 'John Smith', ar: 'محمد أحمد' })}
                            className={`field-input ${errors.name ? 'error' : ''}`}
                            ref={register({ 
                                required: tx({ fr: 'Le nom est requis', en: 'Name is required', ar: 'الاسم مطلوب' }),
                                minLength: { value: 2, message: tx({ fr: 'Minimum 2 caractères', en: 'Minimum 2 characters', ar: 'حرفان على الأقل' }) }
                            })}
                        />
                        {errors.name && <span className="field-error">{errors.name.message}</span>}
                    </div>

                    <div className="field-group">
                        <label className="field-label">{tx({ fr: 'Email', en: 'Email', ar: 'البريد الإلكتروني' })} <span className="required">*</span></label>
                        <input
                            type="email"
                            name="email"
                            placeholder="exemple@email.com"
                            className={`field-input ${errors.email ? 'error' : ''}`}
                            ref={register({ 
                                required: tx({ fr: "L'email est requis", en: 'Email is required', ar: 'البريد الإلكتروني مطلوب' }),
                                pattern: { value: /^\S+@\S+$/i, message: tx({ fr: 'Email invalide', en: 'Invalid email', ar: 'بريد إلكتروني غير صالح' }) }
                            })}
                        />
                        {errors.email && <span className="field-error">{errors.email.message}</span>}
                    </div>

                    <div className="field-group">
                        <label className="field-label">{tx({ fr: 'Téléphone', en: 'Phone', ar: 'الهاتف' })} <span className="required">*</span></label>
                        <input
                            type="tel"
                            name="number"
                            placeholder="+235 64 78 88 31"
                            className={`field-input ${errors.number ? 'error' : ''}`}
                            ref={register({ 
                                required: tx({ fr: 'Le téléphone est requis', en: 'Phone is required', ar: 'رقم الهاتف مطلوب' }),
                                minLength: { value: 8, message: tx({ fr: 'Minimum 8 chiffres', en: 'Minimum 8 digits', ar: '8 أرقام على الأقل' }) }
                            })}
                        />
                        {errors.number && <span className="field-error">{errors.number.message}</span>}
                    </div>

                    <div className="field-group">
                        <label className="field-label">{tx({ fr: 'Sujet', en: 'Subject', ar: 'الموضوع' })} <span className="required">*</span></label>
                        <input
                            type="text"
                            name="subject"
                            placeholder={tx({ fr: 'Objet de votre message', en: 'Subject of your message', ar: 'موضوع رسالتكم' })}
                            className={`field-input ${errors.subject ? 'error' : ''}`}
                            ref={register({ 
                                required: tx({ fr: 'Le sujet est requis', en: 'Subject is required', ar: 'الموضوع مطلوب' }),
                                minLength: { value: 3, message: tx({ fr: 'Minimum 3 caractères', en: 'Minimum 3 characters', ar: '3 أحرف على الأقل' }) }
                            })}
                        />
                        {errors.subject && <span className="field-error">{errors.subject.message}</span>}
                    </div>

                    <div className="field-group full-width">
                        <label className="field-label">{tx({ fr: 'Message', en: 'Message', ar: 'الرسالة' })} <span className="required">*</span></label>
                        <textarea
                            name="text"
                            rows="5"
                            placeholder={tx({ fr: 'Décrivez votre projet en détail...', en: 'Describe your project in detail...', ar: 'صفوا مشروعكم بالتفصيل...' })}
                            className={`field-input textarea ${errors.text ? 'error' : ''}`}
                            ref={register({ 
                                required: tx({ fr: 'Le message est requis', en: 'Message is required', ar: 'الرسالة مطلوبة' }),
                                minLength: { value: 10, message: tx({ fr: 'Minimum 10 caractères', en: 'Minimum 10 characters', ar: '10 أحرف على الأقل' }) }
                            })}
                        />
                        {errors.text && <span className="field-error">{errors.text.message}</span>}
                    </div>
                </div>

                <button type="submit" className="submit-btn" disabled={isSubmitting}>
                    {isSubmitting ? (
                        <>
                            <span className="spinner"></span>
                            {tx({ fr: 'Envoi en cours...', en: 'Sending...', ar: 'جارٍ الإرسال...' })}
                        </>
                    ) : (
                        <>
                            {tx({ fr: 'Envoyer le message', en: 'Send message', ar: 'إرسال الرسالة' })}
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