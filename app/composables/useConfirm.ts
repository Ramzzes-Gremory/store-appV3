const resolvePromise = shallowRef<((val: boolean) => void) | null>(null)

export const useConfirm = () => {
    const isOpen = useState('confirm-open', () => false)
    const message = useState('confirm-message', () => '')



    const ask = (msg: string): Promise<boolean> => {
        message.value = msg
        isOpen.value = true
        return new Promise<boolean>((res) => {
            resolvePromise.value = res
        })
    }

    const confirm = (result: boolean) => {
        isOpen.value = false
        if (resolvePromise.value) {
            resolvePromise.value(result)
            resolvePromise.value = null
        }
    }

    return { isOpen, message, ask, confirm }
}