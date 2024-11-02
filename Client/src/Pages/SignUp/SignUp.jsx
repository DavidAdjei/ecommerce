import React, { useEffect, useState } from 'react';
import { useSearchParams } from "react-router-dom";
import Step1 from '../../component/SignUp/Step1';
import Step2 from '../../component/SignUp/Step2';
import Step3 from '../../component/SignUp/Step3';
import Loader from '../../features/Loader';

function SignUp() {
    const [step, setStep] = useState(1);
    const [role, setRole] = useState("");
    const [searchParams] = useSearchParams();
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const paramStep = searchParams.get("step");
        const paramRole = searchParams.get("role");

        if (paramStep && paramRole) {
            setStep(parseInt(paramStep));
            setRole(paramRole);
        }
        
        setLoading(false);
    }, [searchParams]);

    const nextStep = () => setStep((prev) => prev + 1);

    return (
        <div>
            {loading ? (
                <Loader />
            ) : (
                <>
                    {step === 1 && <Step1 setRole={setRole} nextStep={nextStep} />}
                    {step === 2 && <Step2 role={role} setUserData={setUserData} nextStep={nextStep} step={step} />}
                    {step === 3 && role === "seller" && (
                        <Step3 setUserData={setUserData} userData={userData} step={step} role={role} />
                    )}
                </>
            )}
        </div>
    );
};

export default SignUp;
