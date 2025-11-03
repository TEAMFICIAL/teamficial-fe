'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { MODAL_COMPONENTS, ModalPropsMap, ModalType } from '@/constants/ModalList';

interface ModalContextProps {
  modalType: ModalType | null;
  modalProps: ModalPropsMap[keyof ModalPropsMap] | null;
  openModal: <T extends keyof ModalPropsMap>(
    type: T,
    props?: Omit<ModalPropsMap[T], 'onClose' | 'isOpen'>,
  ) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextProps | null>(null);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modalType, setModalType] = useState<ModalType | null>(null);
  const [modalProps, setModalProps] = useState<ModalPropsMap[keyof ModalPropsMap] | null>(null);

  const openModal = <T extends keyof ModalPropsMap>(
    type: T,
    props?: Omit<ModalPropsMap[T], 'onClose' | 'isOpen'>,
  ) => {
    setModalType(type);
    setModalProps(props as ModalPropsMap[T]);
  };

  const closeModal = () => {
    setModalType(null);
    setModalProps(null);
  };

  const renderModal = () => {
    if (!modalType) return null;

    const ModalComponent = MODAL_COMPONENTS[modalType] as React.ComponentType<
      ModalPropsMap[typeof modalType]
    >;

    const props = modalProps as ModalPropsMap[typeof modalType];

    return <ModalComponent {...props} isOpen={true} onClose={closeModal} />;
  };

  return (
    <ModalContext.Provider value={{ modalType, modalProps, openModal, closeModal }}>
      {children}
      {renderModal()}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error('useModal must be used within a ModalProvider');
  return context;
};
