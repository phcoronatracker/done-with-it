import api from "./client";

const registerUser = (values) => {
    api.post("/register", {
        name: values.name,
        email: values.email,
        password: values.password,
    }).then((res) => res);
};

export default registerUser;
