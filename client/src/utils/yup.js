import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Entrez un email valide")
    .required("Ce champs est obligatoire"),
  password: Yup.string().required("Ce champs est obligatoire"),
});

export default validationSchema;
