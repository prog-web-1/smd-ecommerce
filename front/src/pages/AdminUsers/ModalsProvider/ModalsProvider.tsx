import { useState } from "react";
import { alertError, alertSuccess } from "../../../components/Alert/Alert";
import { DeleteModal } from "../../../components/DeleteModal/DeleteModal";
import { SaveModal } from "../../../components/SaveModal/SaveModal"
import { validateAllInputs } from "../../../tools/validateInputs";
import { fieldValidations, getSaveModalFields } from "./getSaveModalFields";
import { updateEntities } from "../AdminUsers";
import { createUser, deleteUser, editUser } from "./requests";

export let openSaveModal:(targetEntity?: Record<string, unknown>)=>void;
export let openDeleteModal:(targetEntity: Record<string, unknown>)=>void;

export function ModalsProvider() {
    const [targetEntity, setTargetEntity] = useState<Record<string, unknown>>({});
    const [isOpenSaveModal, setIsOpenSaveModal] = useState(false);
    const [errorMessages, setErrorMessages] = useState<Record<string, string>>({});
    const [entity, setEntity] = useState<Record<string, unknown>>({});
    const [isEdit, setIsEdit] = useState(false);
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

    openSaveModal = (targetEntity?: Record<string, unknown>)=>{ 
        if(targetEntity){
            if(targetEntity.id) {
                setIsEdit(true);
            } 
            setTargetEntity({...targetEntity}); 
            setEntity({
                nome: targetEntity.nome,
                login: targetEntity.login,
                email: targetEntity.email,
                endereco: targetEntity.endereco,
            });
        } else {
            setIsEdit(false);
        }
        setIsOpenSaveModal(true);
    }

    openDeleteModal = (targetEntity: Record<string, unknown>)=>{ 
        setTargetEntity({...targetEntity}); 
        setIsOpenDeleteModal(true);
    }

    return (
        <div>
            {
                isOpenSaveModal && 
                    <SaveModal
                        titleLabel={isEdit ? "Editar usuário" : "Nova usuário"}
                        showModal={isOpenSaveModal}
                        closeModal={()=>{setIsOpenSaveModal(false); setTargetEntity({}); setErrorMessages({});}}
                        targetEntity={targetEntity}
                        fields={
                            getSaveModalFields({
                                initialEntity: targetEntity, 
                                errorMessages, 
                                onChange: (field: string, value: string | Date | string[] | number)=>{
                                    const newEntity = {...entity}
                                    newEntity[field] = value;
                                    setEntity(newEntity);
                                },
                                setFieldValidation: (field: string, value: string)=>{
                                    const newValidation = {...errorMessages};
                                    newValidation[field] = value;
                                    setErrorMessages(newValidation);
                                },
                            })
                        }
                        footerButtons={[
                            {
                                label: "Cancelar",
                                callback: ()=>{
                                    setTargetEntity({});
                                    setEntity({});
                                    setIsOpenSaveModal(false); 
                                    setErrorMessages({});
                                }
                            },
                            {
                                label: "Salvar",
                                callback: async ()=>{
                                    const validations = {...fieldValidations};
                                    const newEntity = {...entity} as Record<string, unknown>;

                                    if(isEdit) {
                                        if(!newEntity.senha || !((newEntity.senha as string).length > 0)) {
                                            validations.senha = [];
                                            delete newEntity.senha;
                                        }
                                    }

                                    const validationResult = validateAllInputs({entity: newEntity, validations});

                                    if(validationResult.success) {
                                        if(isEdit) {
                                            const success = await editUser({entity: newEntity, id: targetEntity.id as string});
                                            if(success) {
                                                alertSuccess("Usuário editado com sucesso.");
                                                setEntity({});
                                                setTargetEntity({});
                                                setIsOpenSaveModal(false); 
                                                setErrorMessages({});
                                                updateEntities();
                                            }
                                        } else {
                                            const success = await createUser({entity: newEntity});
                                            if(success) {
                                                alertSuccess("Usuário criado com sucesso.");
                                                setEntity({});
                                                setTargetEntity({});
                                                setIsOpenSaveModal(false); 
                                                setErrorMessages({});
                                                updateEntities();
                                            }
                                        }
                                    } else {
                                        alertError("Um ou mais campos não estão corretamente preenchidos.");
                                        setErrorMessages(validationResult.errors);
                                    }
                                }
                            },
                        ]}
                    />
            }
            {
                isOpenDeleteModal && 
                    <DeleteModal
                        titleLabel={"Remover usuário"}
                        showModal={isOpenDeleteModal}
                        closeModal={()=>{setIsOpenDeleteModal(false)}}
                        callback={async ()=>{
                            const success = await deleteUser(targetEntity.id as string);
                            if(success) {
                                alertSuccess("Usuário removido com sucesso.")
                                setIsOpenDeleteModal(false);
                                setTargetEntity({});
                                updateEntities();
                            }
                        }}
                        bodyLabel={"Essa ação irá remover o usuário."}
                    />
            }
        </div>
    )
}