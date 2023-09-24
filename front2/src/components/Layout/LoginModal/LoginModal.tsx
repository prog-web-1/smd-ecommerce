import { useState } from "react";
import FormGroup from "../../../components/FormGroup/FormGroup";
import { EmptyModal } from "../../EmptyModal/EmptyModal";
import { LabelButton } from "../../LabelButton/LabelButton";

import "./LoginModal.css";

interface ILoginModalProps {
    showModal: boolean;
    closeModal: ()=>void;
    openRegisterModal: ()=>void;
}

export function LoginModal(props: ILoginModalProps) {
    const [errorMessages, setErrorMessages] = useState<Record<string, string>>({});
    const [entity, setEntity] = useState<Record<string, unknown>>({});
    const fieldsValidations = {
        login: ["mandatory"],
        password: ["password"],
    };

    return (
        <>
            <EmptyModal
                titleLabel={"Login"}
                showModal={props.showModal}
                closeModal={props.closeModal}
                customWidth="400px"
                body={
                    <div>
                        <FormGroup 
                            id="login" 
                            type="text" 
                            size="100" 
                            placeholder="Login" 
                            validations={fieldsValidations.login}
                            onChange={(value: string | Date | string[] )=>{
                                const newEntity = {...entity}
                                newEntity["login"] = value;
                                setEntity(newEntity)
                            }}
                            setFieldValidation={(field: string, value: string)=>{
                                const newValidation = {...errorMessages};
                                newValidation[field] = value;
                                setErrorMessages(newValidation);
                            }}
                            errorMessage={errorMessages && errorMessages.login ? errorMessages.login : ""}
                        />
                        <FormGroup 
                            id="password" 
                            type="password" 
                            size="100"
                            placeholder="Senha" 
                            validations={fieldsValidations.password}
                            onChange={(value: string | Date | string[] )=>{
                                const newEntity = {...entity}
                                newEntity["password"] = value;
                                setEntity(newEntity)
                            }}
                            setFieldValidation={(field: string, value: string)=>{
                                const newValidation = {...errorMessages};
                                newValidation[field] = value;
                                setErrorMessages(newValidation);
                            }}
                            errorMessage={errorMessages && errorMessages.password ? errorMessages.password : ""}
                        />
                        <div style={{marginTop: "20px", display: "flex"}}>
                            <LabelButton 
                                label="Cadastre-se"  
                                extraClass="form-login-button" 
                                isSecondary={true} 
                                callback={()=>{
                                    props.openRegisterModal();
                                    props.closeModal();
                                    
                                }}
                            />
                            <LabelButton
                                label="Entrar"  
                                extraClass="form-login-button" 
                                callback={()=>{
                                    props.closeModal();
                                }}
                            />
                        </div>
                    </div>
                }
            />
        </>
    )
}