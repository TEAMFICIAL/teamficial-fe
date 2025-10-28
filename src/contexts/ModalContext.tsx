'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import ApplyModal from '@/components/modal/apply/ApplyModal';
import ApplyCompleteModal from '@/components/modal/ApplyCompleteModal';
import DeleteModal from '@/components/modal/DeleteModal';

interface ApplyModalProps {
  onClose: () => void;
  projectId?: number;
}

interface ApplyCompleteModalProps {
  onClose: () => void;
  projectName?: string;
}

interface DeleteModalProps {
  onClose: () => void;
  onConfirm?: () => void;
}

export type ModalType = 'apply' | 'applyComplete' | 'delete' | null;

type ModalPropsMap = {
  apply: ApplyModalProps;
  applyComplete: ApplyCompleteModalProps;
  delete: DeleteModalProps;
};

interface ModalContextProps {
  modalType: ModalType;
  modalProps: ModalPropsMap[keyof ModalPropsMap] | null;
  openModal: <T extends keyof ModalPropsMap>(
    type: T,
    props?: Omit<ModalPropsMap[T], 'onClose'>,
  ) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextProps | null>(null);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modalType, setModalType] = useState<ModalType>(null);
  const [modalProps, setModalProps] = useState<ModalPropsMap[keyof ModalPropsMap] | null>(null);

  const openModal = <T extends keyof ModalPropsMap>(
    type: T,
    props?: Omit<ModalPropsMap[T], 'onClose'>,
  ) => {
    setModalType(type);
    setModalProps((props as ModalPropsMap[keyof ModalPropsMap]) || null);
  };

  const closeModal = () => {
    setModalType(null);
    setModalProps(null);
  };

  const renderModal = () => {
    switch (modalType) {
      case 'apply':
        return <ApplyModal {...(modalProps as ApplyModalProps)} onClose={closeModal} />;
      case 'applyComplete':
        return (
          <ApplyCompleteModal {...(modalProps as ApplyCompleteModalProps)} onClose={closeModal} />
        );
      case 'delete':
        return <DeleteModal {...(modalProps as DeleteModalProps)} onClose={closeModal} />;
      default:
        return null;
    }
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
