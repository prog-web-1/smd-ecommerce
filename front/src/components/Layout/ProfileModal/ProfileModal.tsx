import { useEffect, useState } from "react";
import FormGroup from "../../../components/FormGroup/FormGroup";
import { EmptyModal } from "../../EmptyModal/EmptyModal";
import { LabelButton } from "../../LabelButton/LabelButton";
import { validateAllInputs } from "../../../tools/validateInputs";
import { alertError, alertSuccess } from "../../Alert/Alert";

import "./ProfileModal.css";
import { editProfile, getUserData } from "./requests";

interface IRegisterModalProps {
    showModal: boolean;
    closeModal: ()=>void;
}

export function ProfileModal(props: IRegisterModalProps) {
    const [errorMessages, setErrorMessages] = useState<Record<string, string>>({});
    const [editable, setEditable] = useState(false);
    const [entity, setEntity] = useState<Record<string, unknown>>({});
    const [defaultValue, setDefaultValue] = useState<Record<string, unknown>>({});
    const fieldsValidations = {
        login: ["mandatory"],
        password: ["password"],
        name: ["mandatory"],
        email: ["email"],
        address: ["mandatory"],
    };

    useEffect(()=>{
        getUserData().then(response=>{
            const userData = response.data;
            setDefaultValue({
                login: userData.login,
                email: userData.email,
                address: userData.endereco,
                name: userData.nome, 
            });
            setEntity({
                login: userData.login,
                email: userData.email,
                address: userData.endereco,
                name: userData.nome, 
            });
        })
    }, [])

    return (
        <>
            <EmptyModal
                titleLabel={"Meu perfil"}
                showModal={props.showModal}
                closeModal={props.closeModal}
                customWidth="400px"
                body={
                    <div>
                        <FormGroup 
                            defaultValue={defaultValue.login as string}
                            id="login"
                            type="text" 
                            size="100" 
                            placeholder="Login" 
                            disabled={!editable}
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
                            disabled={!editable}
                            validations={fieldsValidations.password}
                            onChange={(value: string | Date | string[] )=>{
                                const newEntity = {...entity};
                                newEntity["password"] = value;
                                setEntity(newEntity);

                                if(!value || value === "") {
                                    const newValidation = {...errorMessages};
                                    delete newValidation["password"];
                                    setErrorMessages(newValidation);
                                }
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
                            defaultValue={defaultValue.name as string}
                            type="text" 
                            size="100" 
                            placeholder="Nome" 
                            disabled={!editable}
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
                            defaultValue={defaultValue.email as string}
                            type="text" 
                            size="100" 
                            placeholder="Email" 
                            disabled={!editable}
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
                            defaultValue={defaultValue.address as string}
                            disabled={!editable}
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
                                label={editable ? "Salvar" : "Editar"}
                                extraClass="form-login-button" 
                                callback={async ()=>{
                                    if(editable) {
                                        const validations = {...fieldsValidations};

                                        if(!entity.password || entity.password === "") {
                                            validations.password = [];
                                        }
                                        
                                        const validationResult = validateAllInputs({entity, validations});

                                        if(validationResult.success) {
                                            const response = await editProfile({
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

                                                localStorage.setItem("user", JSON.stringify(user));
    
                                                alertSuccess("Perfil editado com sucesso!");
                                                props.closeModal();
                                            }
                                        } else {
                                            alertError("Um ou mais campos não estão corretamente preenchidos.");
                                        }
                                    } else {
                                        setEditable(true);
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