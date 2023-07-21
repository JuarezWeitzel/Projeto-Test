import InputMask from "react-input-mask";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import styles from "./home.module.css";
import { FiCheck } from "react-icons/fi";

interface PropsDisplay {
  uid: any;
  nome: string;
  nome2: string;
  item: string;
  telefone: string | number;
  telefone2: string | number;
  email: string;
  email2: string;
  dataComeco: string | number;
  dataFinal: string | number;
  check: string | boolean;
}

export function Home() {
  var [uid, setUid] = useState(-1);
  const [nome, setNome] = useState("");
  const [nome2, setNome2] = useState("");
  const [item, setItem] = useState("");
  const [telefone, setTelefone] = useState("");
  const [telefone2, setTelefone2] = useState("");
  const [email, setEmail] = useState("");
  const [email2, setEmail2] = useState("");
  const [dataFinal, setDataFinal] = useState("");
  const [display, setDisplay] = useState<PropsDisplay[]>([]);
  const firstRender = useRef(true);
  const [check, setCheck] = useState<boolean>(false);
  const [check2, setCheck2] = useState<boolean>();

  const dataHj = new Date();
  const dia = String(dataHj.getDate()).padStart(2, "0");
  const mes = String(dataHj.getMonth() + 1).padStart(2, "0");
  const ano = dataHj.getFullYear();

  let dataAtual = dia + "/" + mes + "/" + ano;
  let dataComparacao = ano + "-" + mes + "-" + dia;

  useEffect(() => {
    const listaDeEmprestados = localStorage.getItem("@ListaDeEmprestados");

    if (listaDeEmprestados) {
      setDisplay(JSON.parse(listaDeEmprestados));
    }
  }, []);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    localStorage.setItem("@ListaDeEmprestados", JSON.stringify(display));
  }, [display, check2]);

  function dataAtualFormatada() {
    var data = new Date(dataFinal),
      dia = (data.getDate() + 1).toString().padStart(2, "0"),
      mes = (data.getMonth() + 1).toString().padStart(2, "0"),
      ano = data.getFullYear();
    return dia + "/" + mes + "/" + ano;
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (dataComparacao >= dataFinal) {
      alert("Informe uma data a partir de hoje!");
      return;
    }

    setDisplay((lista) => [
      ...lista,
      {
        uid,
        nome,
        nome2,
        item,
        telefone,
        telefone2,
        dataComeco: dataAtual,
        dataFinal: dataAtualFormatada(),
        email,
        email2,
        check,
      },
    ]);

    setUid((uid = uid + 1));

    setNome("");
    setItem("");
    setTelefone("");
    setEmail("");
    setDataFinal("");
    setNome2("");
    setTelefone2("");
    setEmail2("");
  }

  function handleDelete(item: Number | string) {
    const remove = display.filter((objeto) => objeto.uid !== item);
    setDisplay(remove);
  }

  function handleItemDevolvido(item: boolean) {
    check2 == item;
    console.log(item);
    console.log(display);

    setDisplay((lista) => [...lista]);
  }

  const Total = useMemo(() => {
    return display.length;
  }, [display]);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <form onSubmit={handleSubmit} className={styles.form1}>
          <h1>Cadastro</h1>

          <fieldset className={styles.vaiEmprestar}>
            <legend className={styles.legendVaiEmprestar}>Vai Emprestar</legend>

            <input
              className={styles.input1}
              placeholder="Digite nome..."
              type="text"
              value={nome2}
              onChange={(e) => setNome2(e.target.value)}
              required
            />

            <input
              className={styles.input1}
              placeholder="Informe seu E-mail..."
              type="email"
              value={email2}
              onChange={(e) => setEmail2(e.target.value)}
              required
            />

            <InputMask
              placeholder="Digite seu telefone..."
              className={styles.input1}
              mask="(99) 99999-9999"
              value={telefone2} 
              onChange={(e) => setTelefone2(e.target.value)}>
            </InputMask>
          </fieldset>

          <fieldset className={styles.PegouEmprestado}>
            <legend className={styles.legendPegouEmprestado}>
              Pegou Emprestado
            </legend>

            <input
              className={styles.input1}
              placeholder="Digite nome..."
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />

            <input
              className={styles.input1}
              placeholder="Informe seu E-mail..."
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <InputMask
              placeholder="Digite seu telefone..."
              className={styles.input1}
              mask="(99) 99999-9999"
              value={telefone} 
              onChange={(e) => setTelefone(e.target.value)}>
            </InputMask>

            <input
              className={styles.input1}
              placeholder="Item emprestado..."
              type="text"
              value={item}
              onChange={(e) => setItem(e.target.value)}
              required
            />

            <fieldset className={styles.borda}>
              <h2 className={styles.h2DataDevolucao}>DATA DE DEVOLUÇÃO!</h2>
              <span className={styles.dataAtual}>
                Data de Hoje: {dataAtual}
              </span>
              <input
                className={styles.data}
                type="date"
                value={dataFinal}
                onChange={(e) => setDataFinal(e.target.value)}
                required
              />
            </fieldset>
          </fieldset>

          <button className={styles.Cadastrar} type="submit">
            Cadastrar
          </button>
        </form>

        {display && display.length > 0 && <h2> Lista Total: {Total} </h2>}

        {display && display.length > 0 && (
          <div className={styles.h1}>
            <h1>Lista de Itens</h1>
          </div>
        )}

        {display && display.length > 0 ? (
          display.map((item, index) => (
            <section className={styles.section} key={index}>
              <div className={styles.display2}>
                {item.check == true && (
                  <div className={styles.itemDevolvidoCheck}>
                    Item Devolvido!
                    <FiCheck size={25} className={styles.check} />
                  </div>
                )}

                <fieldset className={styles.emprestouResultado}>
                  <legend className={styles.legendEmprestouResultado}>
                    Emprestou
                  </legend>
                  <span>ID: {item.uid} </span>
                  <span>Nome: {item.nome2}</span>
                  <span>E-mail: {item.email2} </span>
                  <span>Telefone: {item.telefone2} </span>
                </fieldset>

                <fieldset className={styles.pegouEmprestadoResultado}>
                  <legend className={styles.legendPegouEmprestadoResultado}>
                    Pegou Emprestado
                  </legend>

                  <span>Nome: {item.nome}</span>
                  <span>E-mail: {item.email} </span>
                  <span>Telefone: {item.telefone} </span>
                  <span>Item: {item.item}</span>
                  <span>Data Começo: {item.dataComeco}</span>
                  <span>Data da Entrega: {item.dataFinal}</span>
                </fieldset>

                <div className={styles.botoes}>
                  <button
                    onClick={() => handleDelete(item.uid)}
                    className={styles.delete}
                  >
                    Excluir
                  </button>
                  <button
                    className={styles.itemDevolvido}
                    onClick={() => handleItemDevolvido((item.check = true))}
                  >
                    Item Devolvido
                  </button>
                </div>
              </div>
            </section>
          ))
        ) : (
          <p>Não há Itens emprestados!</p>
        )}
      </main>
    </div>
  );
}
