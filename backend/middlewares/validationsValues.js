// validations
const validation = (value, message, res) => {

    if (!value) {
        res.status(400).json({ message: message })
        return
    }

}

export default validation