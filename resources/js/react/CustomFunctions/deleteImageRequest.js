import Axios from "axios";
import url from "../url";

export default async function deleteImageReq(
    image,
    questions,
    callBack,
    errorCallBack
) {
    if (!image) return;

    let imageCount = 0;

    questions.forEach(question => {
        if (question.image.id == image.id) {
            imageCount++;
        }

        question.options.forEach(option => {
            if (option.image.id == image.id) {
                imageCount++;
            }
        });
    });

    if (imageCount != 1) return;

    let config = {
        method: "delete",
        url: `${url}/api/image/${image.id}/delete`,
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            "X-CSRF-TOKEN": document
                .querySelector('meta[name="csrf-token"]')
                .getAttribute("content")
        },
    };

    Axios(config)
        .then(response => {
            callBack(response);
        })
        .catch(error => {
            errorCallBack(error);
        });
}
