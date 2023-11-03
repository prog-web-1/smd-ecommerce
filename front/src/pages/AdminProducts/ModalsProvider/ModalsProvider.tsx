import { useEffect, useState } from "react";
import { alertError, alertSuccess } from "../../../components/Alert/Alert";
import { DeleteModal } from "../../../components/DeleteModal/DeleteModal";
import { SaveModal } from "../../../components/SaveModal/SaveModal"
import { validateAllInputs } from "../../../tools/validateInputs";
//import { createEntity, deleteEntity, editEntity, finalizarTurma, getDisciplinas, getStudents, getTeachers } from "../requester";
import { fieldValidations, getSaveModalFields } from "./getSaveModalFields";
import { updateEntities } from "../AdminProducts";
import { createProduct, deleteProduct, editProduct, getCategoriesOptions } from "./requests";

export let openSaveModal:(targetEntity?: Record<string, unknown>)=>void;
export let openDeleteModal:(targetEntity: Record<string, unknown>)=>void;

export function ModalsProvider() {
    const [targetEntity, setTargetEntity] = useState<Record<string, unknown>>({});
    const [isOpenSaveModal, setIsOpenSaveModal] = useState(false);
    const [errorMessages, setErrorMessages] = useState<Record<string, string>>({});
    const [entity, setEntity] = useState<Record<string, unknown>>({});
    const [isEdit, setIsEdit] = useState(false);
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
    const [categoriesOptions, setCategoriesOptions] = useState<{
        value: string;
        label: string;
    }[]>([]);

    useEffect(()=>{
        getCategoriesOptions().then(options=>{
            setCategoriesOptions(options);
        })
    }, [])

    openSaveModal = (targetEntity?: Record<string, unknown>)=>{ 
        if(targetEntity){
            if(targetEntity.id) {
                setIsEdit(true);
            } 
            setTargetEntity({...targetEntity}); 
            setEntity({
                nome: targetEntity.nome,
                foto: targetEntity.foto,
                descricao: targetEntity.descricao,
                quantidade: targetEntity.quantidade,
                preco: targetEntity.preco,
                category: {id: (targetEntity.category as Record<string, unknown>).id},
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
                        titleLabel={isEdit ? "Editar produto" : "Nova produto"}
                        showModal={isOpenSaveModal}
                        closeModal={()=>{setIsOpenSaveModal(false); setTargetEntity({}); setErrorMessages({});}}
                        targetEntity={targetEntity}
                        fields={
                            getSaveModalFields({
                                initialEntity: targetEntity, 
                                errorMessages, 
                                onChange: (field: string, value: string | Date | string[] | number | Record<string, unknown>)=>{
                                    const newEntity = {...entity}
                                    newEntity[field] = value;
                                    setEntity(newEntity);
                                },
                                setFieldValidation: (field: string, value: string)=>{
                                    const newValidation = {...errorMessages};
                                    newValidation[field] = value;
                                    setErrorMessages(newValidation);
                                },
                                categoriesOptions: categoriesOptions,
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
                                    const validationResult = validateAllInputs({entity, validations});
                                    if(validationResult.success) {
                                        if(isEdit) {
                                            const success = await editProduct({entity, id: targetEntity.id as string});
                                            if(success) {
                                                alertSuccess("Produto editado com sucesso.");
                                                setEntity({});
                                                setTargetEntity({});
                                                setIsOpenSaveModal(false); 
                                                setErrorMessages({});
                                                updateEntities();
                                            }
                                        } else {
                                            const success = await createProduct({entity});
                                            if(success) {
                                                alertSuccess("Produto criado com sucesso.");
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
                        titleLabel={"Remover Produto"}
                        showModal={isOpenDeleteModal}
                        closeModal={()=>{setIsOpenDeleteModal(false)}}
                        callback={async ()=>{
                            const success = await deleteProduct(targetEntity.id as string);
                            if(success) {
                                alertSuccess("Produto removida com sucesso.")
                                setIsOpenDeleteModal(false);
                                setTargetEntity({});
                                updateEntities();
                            }
                        }}
                        bodyLabel={"Essa ação irá remover o produto."}
                    />
            }
        </div>
    )
}