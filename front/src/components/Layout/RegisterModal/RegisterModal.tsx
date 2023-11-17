import { useState } from "react";
import FormGroup from "../../../components/FormGroup/FormGroup";
import { EmptyModal } from "../../EmptyModal/EmptyModal";
import { LabelButton } from "../../LabelButton/LabelButton";
import { validateAllInputs } from "../../../tools/validateInputs";
import { alertError, alertSuccess } from "../../Alert/Alert";
import { registerRequest } from "./requests";

import "./RegisterModal.css";

interface IRegisterModalProps {
    showModal: boolean;
    closeModal: ()=>void;
}

export function RegisterModal(props: IRegisterModalProps) {
    const [errorMessages, setErrorMessages] = useState<Record<string, string>>({});
    const [entity, setEntity] = useState<Record<string, unknown>>({});
    const fieldsValidations = {
        login: ["mandatory"],
        password: ["password"],
        name: ["mandatory"],
        email: ["email"],
        address: ["mandatory"],
    };

    return (
        <>
            <EmptyModal
                titleLabel={"Cadastre-se"}
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
                        <FormGroup 
                            id="name" 
                            type="text" 
                            size="100" 
                            placeholder="Nome" 
                            validations={fieldsValidations.name}
                            onChange={(value: string | Date | string[] )=>{
                                const newEntity = {...entity}
                                newEntity["name"] = value;
                                setEntity(newEntity)
                            }}
                            setFieldValidation={(field: string, value: string)=>{
                                const newValidation = {...errorMessages};
                                newValidation[field] = value;
                                setErrorMessages(newValidation);
                            }}
                            errorMessage={errorMessages && errorMessages.name ? errorMessages.name : ""}
                        />
                        <FormGroup 
                            id="email" 
                            type="text" 
                            size="100" 
                            placeholder="Email" 
                            validations={fieldsValidations.email}
                            onChange={(value: string | Date | string[] )=>{
                                const newEntity = {...entity}
                                newEntity["email"] = value;
                                setEntity(newEntity)
                            }}
                            setFieldValidation={(field: string, value: string)=>{
                                const newValidation = {...errorMessages};
                                newValidation[field] = value;
                                setErrorMessages(newValidation);
                            }}
                            errorMessage={errorMessages && errorMessages.email ? errorMessages.email : ""}
                        />
                        <FormGroup 
                            id="address" 
                            type="text" 
                            size="100" 
                            placeholder="Endereço" 
                            validations={fieldsValidations.address}
                            onChange={(value: string | Date | string[] )=>{
                                const newEntity = {...entity}
                                newEntity["address"] = value;
                                setEntity(newEntity)
                            }}
                            setFieldValidation={(field: string, value: string)=>{
                                const newValidation = {...errorMessages};
                                newValidation[field] = value;
                                setErrorMessages(newValidation);
                            }}
                            errorMessage={errorMessages && errorMessages.address ? errorMessages.address : ""}
                        />
                        <div style={{marginTop: "20px", display: "flex"}}>
                            <LabelButton 
                                label="Cancelar"  
                                extraClass="form-login-button" 
                                isSecondary={true} 
                                callback={()=>{
                                    props.closeModal();
                                }}
                            />
                            <LabelButton 
                                label="Cadastrar"
                                extraClass="form-login-button" 
                                callback={async ()=>{
                                    const validations = {...fieldsValidations};
                                    const validationResult = validateAllInputs({entity, validations});
                                    if(validationResult.success) {
                                        const response = await registerRequest({
                                            nome: entity.name as string,
                                            login: entity.login as string,
                                            endereco: entity.address as string,
                                            email: entity.email as string,
                                            senha: entity.password as string,
                                        });

                                        if(response.success) {
                                            const user = {
                                                email: response.data.email,
                                                endereco: response.data.endereco,
                                                login: response.data.login,
                                                nome: response.data.nome,
                                            };
                                            const tokenExpireDate = new Date();
                                            tokenExpireDate.setDate(tokenExpireDate.getDate() + 1);

                                            localStorage.setItem("token", response.data.access_token as string);
                                            localStorage.setItem("user", JSON.stringify(user));
                                            localStorage.setItem("expire_token", JSON.stringify(tokenExpireDate));

                                            alertSuccess("Registro efetuado com sucesso!");

                                            setTimeout(()=>{
                                                window.location.reload();
                                            }, 500)
                                        }
                                    } else {
                                        alertError("Um ou mais campos não estão corretamente preenchidos.")
                                    }
                                }}
                            />
                        </div>
                    </div>
                }
            />
        </>
    )
}