import * as Yup from 'yup';
export const validateLoginForm = Yup.object().shape({
        email: Yup.string().required("Обязательное поле").email("Не корректный email"),
        password: Yup.string().required('Обязательное поле').min(4),
})

export const validateMessages = Yup.object().shape({
        messages: Yup.string().required("Вы не написали сообщение!"),
})
export const validateBookmark = Yup.object().shape({
        text: Yup.string().required("Вы ничего не написали!"),
})

export const validatePost = Yup.object().shape({
        postText: Yup.string().required("Вы ничего не написали!"),
})
