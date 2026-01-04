export const useToast = () => {
    const show = useState('toast-show', () => false)
    const message = useState('toast-message', () => '')
    const action = useState('toast-action', () => '')


    const triggerToast = (msg: string, action: string, duration = 5000) => {
        show.value = false


        nextTick(() => {
            message.value = msg
            show.value = true
        })


        setTimeout(() => {
            show.value = false

        }, duration)
    }
    return {
        show,
        message,
        triggerToast,
        action
    }
}