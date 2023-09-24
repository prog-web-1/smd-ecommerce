import { useState } from "react";
import { LoginModal } from "./LoginModal/LoginModal";
import { RegisterModal } from "./RegisterModal/RegisterModal";

export let openLoginModal: ()=>void;
export let openRegisterModal: ()=>void;

export function ModalsProvider() {
    const [isOpenLoginModal, setIsOpenLoginModal] = useState(false);
    const [isOpenRegisterModal, setIsOpenRegisterModal] = useState(false);

    openLoginModal = ()=>{setIsOpenLoginModal(true)};
    openRegisterModal = ()=>{setIsOpenRegisterModal(true)};

    return (
        <>
            {isOpenLoginModal && <LoginModal showModal={isOpenLoginModal} closeModal={()=>{setIsOpenLoginModal(false)}} openRegisterModal={()=>{setIsOpenRegisterModal(true)}} />}
            {isOpenRegisterModal && <RegisterModal showModal={isOpenRegisterModal} closeModal={()=>{setIsOpenRegisterModal(false)}} />}
        </>
    )
}