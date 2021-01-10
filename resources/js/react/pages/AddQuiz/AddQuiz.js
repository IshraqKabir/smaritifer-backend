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

const AddQuiz = props => {
    // is loading
    const [isLoading, setIsLoading] = useState(false);
    // images
    const [quizImage, setQuizImage] = useState("");
    const [quizBadgeImage, setQuizBadgeImage] = useState("");
    // start at states
    const [startAtDate, setStartAtDate] = useState(new Date());
    const [startAtHour, setStartAtHour] = useState(0);
    const [startAtMin, setStartAtMin] = useState(0);
    // end at states
    const [endAtDate, setEndAtDate] = useState(new Date());
    const [endAtHour, setEndAtHour] = useState(0);
    const [endAtMin, setEndAtMin] = useState(0);
    // duration states
    const [dHour, setDHour] = useState(0);
    const [dMin, setDMin] = useState(10);
    const [dSecond, setDSecond] = useState(0);
    // passing percentage
    const [passingPercentage, setPassingPercentage] = useState(80);
    // serial
    const [serial, setSerial] = useState(1);
    // retake
    const [retake, setRetake] = useState(true);
    // assessment
    const [assessment, setAssessment] = useState(false);
    // is_feautured
    const [is_featured, set_is_featured] = useState(true);

    const handleSubmit = values => {
        setIsLoading(true);
        // dont change
        let start_at = `${startAtDate.toISOString().substr(0, 10)} ${
            startAtHour < 10 ? `0${startAtHour}` : startAtHour
        }:${startAtMin < 10 ? `0${startAtMin}` : startAtMin}`;

        let end_at = `${endAtDate.toISOString().substr(0, 10)} ${
            endAtHour < 10 ? `0${endAtHour}` : endAtHour
        }:${endAtMin < 10 ? `0${endAtMin}` : endAtMin}`;

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
            window.location.href = `${url}`
        };

        const errorCallBack = error => {};

        post(`${url}/api/quiz/store`, values, callBack, errorCallBack);
    };

    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            certificate_title: "",
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
                            Create New Quiz
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
                            defaultIsChecked={retake}
                            variantColor="green"
                            value={retake}
                            onChange={e => setRetake(!retake)}
                        >
                            Retake
                        </Checkbox>
                        <Divider color="#f1f2f7" />
                        <Checkbox
                            defaultIsChecked={is_featured}
                            variantColor="green"
                            value={is_featured}
                            onChange={e => set_is_featured(!is_featured)}
                        >
                            Is Featured
                        </Checkbox>
                        <Divider color="#f1f2f7" />
                        <Checkbox
                            defaultIsChecked={assessment}
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
                        Add Quiz
                    </Button>
                </form>
            </Box>
        </Box>
    );
};

export default AddQuiz;
