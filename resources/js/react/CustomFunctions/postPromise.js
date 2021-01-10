import Axios from "axios";

export default function postPromise(
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

    let p = new Promise((resolve, reject) => {
        Axios(config)
            .then(response => {
                callBack(response);
                resolve();
            })
            .catch(err => {
                errorCallBack(err);
                reject();
            });
    });
    return p;
}
