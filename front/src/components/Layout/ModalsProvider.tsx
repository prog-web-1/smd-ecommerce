import { useState } from "react";
import { LoginModal } from "./LoginModal/LoginModal";
import { RegisterModal } from "./RegisterModal/RegisterModal";
import { ProfileModal } from "./ProfileModal/ProfileModal";
import { DeleteAccountModal } from "./DeleteAccountModal/DeleteAccountModal";

export let openLoginModal: ()=>void;
export let openRegisterModal: ()=>void;
export let openProfileModal: ()=>void;

export function ModalsProvider() {
    const [isOpenLoginModal, setIsOpenLoginModal] = useState(false);
    const [isOpenRegisterModal, setIsOpenRegisterModal] = useState(false);
    const [isOpenProfileModal, setIsOpenProfileModal] = useState(false);

    openLoginModal = ()=>{setIsOpenLoginModal(true)};
    openRegisterModal = ()=>{setIsOpenRegisterModal(true)};
    openProfileModal = ()=>{setIsOpenProfileModal(true)};

    return (
        <>
            {isOpenLoginModal && <LoginModal showModal={isOpenLoginModal} closeModal={()=>{setIsOpenLoginModal(false)}} openRegisterModal={()=>{setIsOpenRegisterModal(true)}} />}
            {isOpenRegisterModal && <RegisterModal showModal={isOpenRegisterModal} closeModal={()=>{setIsOpenRegisterModal(false)}} />}
            {isOpenProfileModal && <ProfileModal showModal={isOpenProfileModal} closeModal={()=>{setIsOpenProfileModal(false)}} />}
            <DeleteAccountModal />
        </>
    )
}