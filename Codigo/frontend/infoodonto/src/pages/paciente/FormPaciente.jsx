import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../img/logo.png";
import Input from "../../components/input/Input";
import styles from "../../css/FormPaciente.module.css";
import { getCondicao } from "../../services/api";

import { AiOutlineArrowLeft } from "react-icons/ai";

const FormPaciente = () => {
  const [condicoesPaciente, setCondicoesPaciente] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getCondicao();
      const condicoes = data.map((item) => item);
      setCondicoesPaciente(condicoes);
    };
    fetchData();
  }, []);

  function cadastrar() {
    let condicao = [];

    document.querySelectorAll(".MuiChip-filled").forEach((e) => {
      condicao.push(e.getAttribute("id"));
    });

    fetch(`http://localhost:3000/api/paciente`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: document.getElementById("name").value,
        cpf: document.getElementById("cpf").value,
        email: document.getElementById("email").value,
        senha: document.getElementById("senha").value,
        condicoes: condicao,
      }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        alert(data.msg);

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div className={styles.body}>
      <div className="divArrow">
        <a href="/">
          <AiOutlineArrowLeft className="arrowBack" />
        </a>
      </div>

      <div className={styles.logo}>
        <img src={Logo} alt="Logo" />
      </div>

      <div className={styles.form}>
        <div className={styles.divInputs}>
          <div className={styles.uni}>
            <Input type="text" placeholder="Nome" id="name" />
          </div>
          <div className={styles.uni}>
            <Input type="text" placeholder="CPF" id="cpf" />
          </div>
          <div className={styles.uni}>
            <Input type="text" placeholder="Email" id="email" />
          </div>
          <div className={styles.uni}>
            <Input type="password" placeholder="Senha" id="senha" />
          </div>
          <div className={styles.uni}>
            <Input
              type="option"
              placeholder="Selecione aqui as suas condições médicas"
              id="condicao"
              option={condicoesPaciente}
            >
              {" "}
            </Input>
          </div>
        </div>
      </div>

      <div className={styles.divButton}>
        <button className={styles.confirmar} onClick={cadastrar}>
          Cadastrar
        </button>
      </div>
    </div>
  );
};
export default FormPaciente;