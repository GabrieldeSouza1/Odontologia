const mongoose = require("mongoose")
const { Schema } = mongoose;

const dentistaSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        senha: {
            type: String,
            required: true
        },
        insituicao: {
            nome: {
                type: String,
                required: true
            },
            cnpj: {
                type: String,
                required: true
            }
        }
    },
    { timestemps: true }
)

const Dentista = mongoose.model("Dentista", dentistaSchema)

module.exports = {
    Dentista,
    dentistaSchema
}