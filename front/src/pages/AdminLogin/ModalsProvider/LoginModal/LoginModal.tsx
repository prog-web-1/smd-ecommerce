import { useState } from "react";
import { loginRequest } from "./requests";
import { EmptyModal } from "../../../../components/EmptyModal/EmptyModal";
import FormGroup from "../../../../components/FormGroup/FormGroup";
import { LabelButton } from "../../../../components/LabelButton/LabelButton";
import { validateAllInputs } from "../../../../tools/validateInputs";
import { alertError, alertSuccess } from "../../../../components/Alert/Alert";

import "./LoginModal.css";

export function LoginModal() {
    const [errorMessages, setErrorMessages] = useState<Record<string, string>>({});
    const [entity, setEntity] = useState<Record<string, unknown>>({});
    const fieldsValidations = {
        login: ["mandatory"],
        password: ["mandatory"],
    };

    return (
        <>
            <EmptyModal
                titleLabel={"Login"}
                showModal={true}
                closeModal={()=>{/* */}}
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
                        <div style={{marginTop: "20px", display: "flex", justifyContent: "flex-end"}}>
                            <LabelButton
                                label="Entrar"  
                                extraClass="form-login-button" 
                                callback={async ()=>{
                                    const validations = {...fieldsValidations};
                                    const validationResult = validateAllInputs({entity, validations});

                                    if(validationResult.success) {
                                        const response = await loginRequest({
                                            login: entity.login as string,
                                            senha: entity.password as string,
                                        });

                                        if(response.success) {
                                            if(response.data.administrador === true) {
                                                const user = {
                                                    email: response.data.email,
                                                    endereco: response.data.endereco,
                                                    login: response.data.login,
                                                    nome: response.data.nome,
                                                };
                                                const tokenExpireDate = new Date();
                                                tokenExpireDate.setDate(tokenExpireDate.getDate() + 1);

                                                localStorage.setItem("token", response.data.access_token as string);
                                                localStorage.setItem("admin", JSON.stringify(user));
                                                localStorage.setItem("user", JSON.stringify(user));
                                                localStorage.setItem("expire_token", JSON.stringify(tokenExpireDate));

                                                alertSuccess("Login efetuado com sucesso!");

                                                setTimeout(()=>{
                                                    window.location.pathname = "/admin/reports";
                                                }, 500)
                                            } else {
                                                alertError("Usuário não autorizado.")
                                            }
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