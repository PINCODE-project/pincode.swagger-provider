import {useClickOutside, useDisclosure} from "@mantine/hooks";
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import styles from './EmojiPicker.module.css'

export function EmojiPicker(props) {
    const [isOpen, {open, close, toggle}] = useDisclosure(false);

    return (
        <div className={styles.container}>
            <div
                onClick={(event) => {
                    event.preventDefault()
                    event.stopPropagation()
                    toggle()
                }}
                className={styles.input}
            >
                {props.field.getValue()}
            </div>

            <div className={styles.emojiPicker}>
                {
                    isOpen &&
                    <Picker
                        data={data}
                        onEmojiSelect={(value) => props.field.setValue(value.native)}
                    />
                }
            </div>
        </div>
    );
}
