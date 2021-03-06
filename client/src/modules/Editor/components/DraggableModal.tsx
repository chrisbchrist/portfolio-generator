import React, { useState, useCallback } from 'react'
import { Button } from 'antd'
import { DraggableModal, DraggableModalProvider } from 'ant-design-draggable-modal'
import 'ant-design-draggable-modal/dist/index.css'
import { DraggableModalProps } from "ant-design-draggable-modal/dist";

export const ModalWithButton = () => {
    const [visible, setVisible] = useState(false)
    const onOk = useCallback(() => setVisible(true), [])
    const onCancel = useCallback(() => setVisible(false), [])
    // @ts-ignore
    // @ts-ignore
    return (
        <DraggableModalProvider>
            <Button onClick={onOk}>Open</Button>
            <DraggableModal visible={visible} onOk={onOk} onCancel={onCancel} footer={null}/>

        </DraggableModalProvider>
    )
}