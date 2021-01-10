import Axios from "axios";

export default async function deleteRequest (url, data, callBack, errorCallBack) {
    let config = {
        method: "delete",
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

    await Axios(config)
        .then(response => {
            callBack(response);
        })
        .catch(error => {
            errorCallBack(error);
        });
}
