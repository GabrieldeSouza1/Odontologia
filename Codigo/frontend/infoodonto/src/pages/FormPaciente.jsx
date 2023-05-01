import Logo from "../img/logo.png"
import Input from "../components/input/Input"
import styles from "../css/FormPaciente.module.css"



const FormPaciente = () => {
    let condicoesPaciente = [];
    let url = "http://localhost:3000"

    function cadastrar(){
        let condicao = []
        document.querySelectorAll('.tag').forEach(e=>{
            condicao.push( {"_id": 1, "nome" : `${e.textContent}`})
        })
        console.log(condicao)
        fetch(`${url}/api/paciente`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify({
                "name" : document.getElementById("name").value,
                "cpf" : document.getElementById("cpf").value,
                "email" : document.getElementById("email").value,
                "senha" : document.getElementById("senha").value,
                "condicoes": condicao,

            },
            )
        }).then(() => {
            console.log("cadastrado com sucesso")
        })
            .catch((err) => {
                console.log(err)
            })
    
    
    }
    return (

        <div className={ styles.body }>
            <div className="logo">
                <img src={Logo} alt="Logo" />
            </div>


            <div className={styles.form}>
                <div className={styles.uni}><Input type="text" placeholder="Nome" id="name"/></div>
                <div className={styles.uni}><Input type="text" placeholder="CPF" id="cpf"/></div>
                <div className={styles.uni}><Input type="text" placeholder="Email" id="email"/></div>
                <div className={styles.uni}><Input type="password" placeholder="Senha" id="senha"/></div>
                <div className={styles.uni}><Input type="options" placeholder="Condições" id="condicao" option={["diabete", "alergia"]}/></div>
            </div>
 
            <div className={styles.divButton}>
                <button className={styles.confirmar} onClick={cadastrar}>Confirmar</button>
            </div>



        </div>
    )
}

export default FormPaciente;