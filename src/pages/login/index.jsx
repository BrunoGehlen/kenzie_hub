import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextField } from "@material-ui/core";
import axios from "axios";
import { useHistory } from "react-router-dom";
import DefaultButton from "../../components/shared/buttons/defaultButton";
import {
  Form,
  ContainerForm,
  ButtonContainer,
  HDiv,
  ContainerContentForm,
} from "./style";

const Login = () => {
  const history = useHistory();

  const schema = yup.object({
    email: yup.string().email().required("Campo obrigatório"),
    password: yup
      .string()
      .min(3, "Mínimo 3 caractéres")
      .required("Campo obrigatório"),
  });

  const { register, handleSubmit, errors, setError } = useForm({
    resolver: yupResolver(schema),
  });

  const handleForm = (data) => {
    console.log(data);
    // const request =  await userLoginThunk(data, setError)
    // history.push("/members");
    axios
      .post("https://kenziehub.me/sessions", data)
      .then((res) => {
        window.localStorage.setItem("authToken", res.data.auth_token);
        history.push("/members");
      })
      .catch((err) =>
        setError("password", { message: "Senha ou usuário inválido" })
      );
  };

  return (
    <ContainerForm>
      <Form onSubmit={handleSubmit(handleForm)}>
        <ContainerContentForm>
          <HDiv>
            <h1>Login</h1>
          </HDiv>
          <div>
            <TextField
              margin="normal"
              label="Email"
              name="email"
              inputRef={register}
              error={!!errors.user}
              helperText={errors.user?.message}
            />
          </div>
          <div>
            <TextField
              margin="normal"
              label="Senha"
              name="password"
              inputRef={register}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          </div>

          <ButtonContainer>
            <DefaultButton
              aria-controls="customized-menu"
              aria-haspopup="true"
              variant="contained"
              color="primary"
              type="submit"
            >
              Entrar
            </DefaultButton>
          </ButtonContainer>

          <ButtonContainer>
            <DefaultButton
              aria-controls="customized-menu"
              aria-haspopup="true"
              variant="contained"
              color="primary"
              type="submit"
              onClick={() => history.push("/register/1")}
            >
              Se cadastrar
            </DefaultButton>
          </ButtonContainer>
        </ContainerContentForm>
      </Form>
    </ContainerForm>
  );
};

export default Login;
