import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);
import baseUrl from '../../utils/baseUrl';

const alertContent = () => {
    MySwal.fire({
        title: 'Merci !',
        text: 'Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.',
        icon: 'success',
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
    });
};

// État initial du formulaire
const INITIAL_STATE = {
    name: "",
    email: "",
    number: "",
    subject: "",
    text: ""
};

const ContactForm = () => {
    const [contact, setContact] = useState(INITIAL_STATE);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleChange = e => {
        const { name, value } = e.target;
        setContact(prevState => ({ ...prevState, [name]: value }));
    };

    const onSubmit = async (data) => {
        try {
            const url = `${baseUrl}/api/contact`;
            const { name, email, number, subject, text } = contact;
            const payload = { name, email, number, subject, text };
            await axios.post(url, payload);
            
            setContact(INITIAL_STATE);
            alertContent();
        } catch (error) {
            console.error("Erreur lors de l'envoi du message :", error);
            MySwal.fire({
                title: 'Erreur',
                text: 'Une erreur est survenue lors de l’envoi de votre message. Veuillez réessayer.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    return (
        <div className="contact-form">
            <form id="contactForm" onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    <div className="col-lg-6 col-md-6">
                        <div className="form-group">
                            <input 
                                type="text" 
                                name="name" 
                                placeholder="Votre nom" 
                                className="form-control" 
                                value={contact.name}
                                onChange={handleChange}
                                {...register("name", { required: true })}
                            />
                            {errors.name && <div className='invalid-feedback' style={{display: 'block'}}>Veuillez entrer votre nom</div>}
                        </div>
                    </div>

                    <div className="col-lg-6 col-md-6">
                        <div className="form-group">
                            <input 
                                type="email" 
                                name="email" 
                                placeholder="Votre email" 
                                className="form-control" 
                                value={contact.email}
                                onChange={handleChange}
                                {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                            />
                            {errors.email && <div className='invalid-feedback' style={{display: 'block'}}>Veuillez entrer un email valide</div>}
                        </div>
                    </div>

                    <div className="col-lg-6 col-md-6">
                        <div className="form-group">
                            <input 
                                type="text" 
                                name="number" 
                                placeholder="Votre téléphone" 
                                className="form-control" 
                                value={contact.number}
                                onChange={handleChange}
                                {...register("number", { required: true })}
                            />
                            {errors.number && <div className='invalid-feedback' style={{display: 'block'}}>Veuillez entrer votre numéro de téléphone</div>}
                        </div>
                    </div>

                    <div className="col-lg-6 col-md-6">
                        <div className="form-group">
                            <input 
                                type="text" 
                                name="subject" 
                                placeholder="Sujet" 
                                className="form-control" 
                                value={contact.subject}
                                onChange={handleChange}
                                {...register("subject", { required: true })}
                            />
                            {errors.subject && <div className='invalid-feedback' style={{display: 'block'}}>Veuillez entrer le sujet de votre message</div>}
                        </div>
                    </div>

                    <div className="col-lg-12 col-md-12">
                        <div className="form-group">
                            <textarea 
                                name="text" 
                                cols="30" 
                                rows="6" 
                                placeholder="Décrivez votre projet ou votre demande..." 
                                className="form-control" 
                                value={contact.text}
                                onChange={handleChange}
                                {...register("text", { required: true })}
                            />
                            {errors.text && <div className='invalid-feedback' style={{display: 'block'}}>Veuillez écrire votre message</div>}
                        </div>
                    </div>

                    <div className="col-lg-12 col-sm-12">
                        <button type="submit" className="btn btn-primary">
                            Envoyer le message
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default ContactForm;