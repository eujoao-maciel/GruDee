// validations
const validation = (value, message, res) => {

    if (!value) {
        res.status(400).json({ error: message })
        return
    }

}

export default validation