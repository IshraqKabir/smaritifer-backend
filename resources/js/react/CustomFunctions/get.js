import Axios from "axios";

export default async function get(
    url,
    data,
    callBack,
    errorCallBack,
) {
    let config = {
        method: "get",
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

    Axios(config)
        .then(response => {
            callBack(response);
        })
        .catch(error => {
            errorCallBack(error);
        });
}
