import Axios from "axios";

export default async function post(
    url,
    data,
    callBack,
    errorCallBack,
    isMultipart = false
) {
    let config = {
        method: "post",
        url,
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            "X-CSRF-TOKEN": document
                .querySelector('meta[name="csrf-token"]')
                .getAttribute("content")
        },
        data
    };

    if (isMultipart) {
        config = {
            ...config,
            "Content-Type": "multipart/form-data"
        };
    }

    await Axios(config)
        .then(response => {
            callBack(response);
        })
        .catch(error => {
            errorCallBack(error);
        });
}
