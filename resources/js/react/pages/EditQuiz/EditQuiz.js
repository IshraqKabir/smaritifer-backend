import { Box, Button, Checkbox, Divider, Stack, Text } from "@chakra-ui/core";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";

import Title from "./Components/Title";
import Description from "./Components/Description";
import QuizImage from "./Components/QuizImage";
import QuizBadgeImage from "./Components/QuizBadgeImage";
import CertificateTitle from "./Components/CertificateTitle";
import StartAt from "./Components/StartAt/StartAt";
import EndAt from "./Components/EndAt/EndAt";
import Duration from "./Components/Duration";
import PassingPercentage from "./Components/PassingPercentage";
import Serial from "./Components/Serial";
import post from "../../CustomFunctions/post";
import url from "../../url";

const validate = values => {
    const errors = {};

    if (!values.title) {
        errors.title = "Title Is Required!";
    }

    if (!values.description) {
        errors.description = "Description Is Required!";
    }

    if (!values.certificate_title) {
        errors.certificate_title = "Certificate Title Is Required!";
    }

    return errors;
};

const start_at = {
    hour: quiz.start_at.split(" ")[1].split(":")[0],
    min: quiz.start_at.split(" ")[1].split(":")[1],
    date: quiz.start_at.split(" ")[0]
};

const end_at = {
    hour: quiz.end_at.split(" ")[1].split(":")[0],
    min: quiz.end_at.split(" ")[1].split(":")[1],
    date: quiz.end_at.split(" ")[0]
};

const EditQuiz = props => {
    // is loading
    const [isLoading, setIsLoading] = useState(false);
    // images
    const [quizImage, setQuizImage] = useState(quiz.image ? quiz.image : "");
    const [quizBadgeImage, setQuizBadgeImage] = useState(
        quiz.base_badge_image ? quiz.base_badge_image : ""
    );
    // start at states
    const [startAtDate, setStartAtDate] = useState(new Date(start_at.date));
    const [startAtHour, setStartAtHour] = useState(start_at.hour);
    const [startAtMin, setStartAtMin] = useState(start_at.min);
    // end at states
    const [endAtDate, setEndAtDate] = useState(new Date(end_at.date));
    const [endAtHour, setEndAtHour] = useState(end_at.hour);
    const [endAtMin, setEndAtMin] = useState(end_at.min);
    // duration states
    const [dHour, setDHour] = useState(0);
    const [dMin, setDMin] = useState(10);
    const [dSecond, setDSecond] = useState(0);
    // passing percentage
    const [passingPercentage, setPassingPercentage] = useState(
        quiz.passing_percentage
    );
    // serial
    const [serial, setSerial] = useState(quiz.serial);
    // retake
    const [retake, setRetake] = useState(quiz.retake);
    // assessment
    const [assessment, setAssessment] = useState(quiz.assessment);
    // is_feautured
    const [is_featured, set_is_featured] = useState(quiz.is_featured);

    const handleSubmit = values => {
        setIsLoading(true);
        // dont change
        let start_at = `${startAtDate.toISOString().substr(0, 10)} ${
            startAtHour < 10 ? `${startAtHour}` : startAtHour
        }:${startAtMin < 10 ? `${startAtMin}` : startAtMin}`;

        let end_at = `${endAtDate.toISOString().substr(0, 10)} ${
            endAtHour < 10 ? `${endAtHour}` : endAtHour
        }:${endAtMin < 10 ? `${endAtMin}` : endAtMin}`;

        let duration = `${dHour < 10 ? `0${dHour}` : dHour}:${
            dMin < 10 ? `0${dMin}` : dMin
        }:${dSecond < 10 ? `0${dSecond}` : dSecond}`;
        // till here

        values = {
            ...values,
            serial: serial,
            start_at: start_at,
            end_at: end_at,
            duration: duration,
            passing_percentage: passingPercentage,
            assessment: assessment,
            is_featured: is_featured,
            retake: retake
        };

        if (quizImage) {
            values = {
                ...values,
                image_id: quizImage.id
            };
        }

        if (quizBadgeImage) {
            values = {
                ...values,
                base_badge_image_id: quizBadgeImage.id
            };
        }

        const callBack = response => {
            setIsLoading(false);
            console.log(response.data);
        };

        const errorCallBack = error => {};

        post(
            `${url}/api/quiz/${quiz.id}/edit`,
            values,
            callBack,
            errorCallBack
        );
    };

    const formik = useFormik({
        initialValues: {
            title: quiz.title,
            description: quiz.description,
            certificate_title: quiz.certificate_title
        },
        validate,
        onSubmit: values => handleSubmit(values)
    });

    return (
        <Box bg="#f1f2f7" w="100%" minHeight="100vh" padding="20px">
            <Box bg="white" minHeight="100vh" padding="20px">
                <form onSubmit={formik.handleSubmit}>
                    <Stack>
                        <Text fontWeight="semibold" fontSize="lg">
                            Edit Quiz
                        </Text>
                        <Divider color="#f1f2f7" />
                        <Title formik={formik} />
                        <Divider color="#f1f2f7" />
                        <QuizImage
                            image={quizImage}
                            setImage={setQuizImage}
                            error={formik.errors.image}
                        />
                        <Divider color="#f1f2f7" />
                        <Description formik={formik} />
                        <Divider color="#f1f2f7" />
                        <QuizBadgeImage
                            image={quizBadgeImage}
                            setImage={setQuizBadgeImage}
                            error={formik.errors.image}
                        />
                        <Divider color="#f1f2f7" />
                        <CertificateTitle formik={formik} />
                        <Divider color="#f1f2f7" />
                        <StartAt
                            date={startAtDate}
                            setDate={setStartAtDate}
                            hour={startAtHour}
                            setHour={setStartAtHour}
                            min={startAtMin}
                            setMin={setStartAtMin}
                        />
                        <Divider color="#f1f2f7" />
                        <EndAt
                            date={endAtDate}
                            setDate={setEndAtDate}
                            hour={endAtHour}
                            setHour={setEndAtHour}
                            min={endAtMin}
                            setMin={setEndAtMin}
                        />
                        <Divider color="#f1f2f7" />
                        <Duration
                            hour={dHour}
                            setHour={setDHour}
                            min={dMin}
                            setMin={setDMin}
                            second={dSecond}
                            setSecond={setDSecond}
                        />
                        <Divider color="#f1f2f7" />
                        <Serial serial={serial} setSerial={setSerial} />
                        <Divider color="#f1f2f7" />
                        <PassingPercentage
                            passingPercentage={passingPercentage}
                            setPassingPercentage={setPassingPercentage}
                        />
                        <Divider color="#f1f2f7" />
                        <Checkbox
                            defaultIsChecked={quiz.retake}
                            variantColor="green"
                            value={retake}
                            onChange={e => setRetake(!retake)}
                        >
                            Retake
                        </Checkbox>
                        <Divider color="#f1f2f7" />
                        <Checkbox
                            defaultIsChecked={quiz.is_featured}
                            variantColor="green"
                            value={is_featured}
                            onChange={e => set_is_featured(!is_featured)}
                        >
                            Featured
                        </Checkbox>
                        <Divider color="#f1f2f7" />
                        <Checkbox
                            defaultIsChecked={quiz.assessment}
                            variantColor="green"
                            value={assessment}
                            onChange={e => setAssessment(!assessment)}
                        >
                            Assessment
                        </Checkbox>
                    </Stack>
                    <Divider />

                    <Button
                        type="submit"
                        isLoading={isLoading}
                        variantColor="blue"
                    >
                        Save
                    </Button>
                </form>
            </Box>
        </Box>
    );
};

export default EditQuiz;
