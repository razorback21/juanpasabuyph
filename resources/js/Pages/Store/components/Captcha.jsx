import { forwardRef, useEffect, useState, useImperativeHandle } from "react";

const Captcha = forwardRef((props, ref) => {
    const [captcha, setCaptcha] = useState("");
    const [key, setKey] = useState("");

    useEffect(() => {
        getCaptcha();
    }, []);

    useImperativeHandle(ref, () => ({
        getKey: () => key,
        refresh: getCaptcha,
    }));

    function getCaptcha() {
        fetch("/captcha/api/flat")
            .then((response) => response.json())
            .then((data) => {
                setCaptcha(data.img);
                setKey(data.key);
            });
    }

    return (
        <>
            {captcha ? (
                <div
                    className="flex flex-col items-center justify-center cursor-pointer"
                    onClick={getCaptcha}
                >
                    <img src={captcha} alt="Captcha" />
                    <p className="text-gray-500 mt-1 text-[10px]">
                        Click on the captcha to refresh
                    </p>
                    <input type="hidden" name="key" value={key} />
                </div>
            ) : (
                <div className="flex items-center w-1/2">
                    <div className="flex items-center gap-2">
                        <svg
                            className="animate-spin h-5 w-5 text-gray-500"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                        </svg>
                        <span className="text-gray-500">
                            Refreshing captcha...
                        </span>
                    </div>
                </div>
            )}
        </>
    );
});

export default Captcha;
