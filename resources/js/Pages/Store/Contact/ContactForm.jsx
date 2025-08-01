import {
    useState,
    useEffect,
    useImperativeHandle,
    useRef,
    forwardRef,
} from "react";
import { router, usePage } from "@inertiajs/react";

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
                    className="flex items-center w-1/2 pt-7 hover:cursor-pointer"
                    onClick={getCaptcha}
                >
                    <img src={captcha} alt="Captcha" />
                    <input type="hidden" name="key" value={key} />
                </div>
            ) : (
                <div className="flex items-center w-1/2 pt-7">
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

export default function ContactForm() {
    const page = usePage();
    const { errors } = page.props;
    const captchaRef = useRef(null);
    const formDataRef = useRef({
        name: "",
        email: "",
        subject: "",
        message: "",
        key: "",
    });
    function handleFormData(e) {
        formDataRef.current[e.target.name] = e.target.value;
        formDataRef.current.key = captchaRef.current?.getKey();
        console.log(captchaRef.current?.getKey());
    }

    function handleSubmit() {
        console.log(formDataRef.current);
        router.post(route("contact.store"), formDataRef.current);
    }

    // refresh captcha on error
    useEffect(() => {
        errors.captcha && captchaRef.current?.refresh();
    }, [errors.captcha]);

    return (
        <section className="flex flex-wrap justify-between items-center gap-4 mb-8">
            <h2 className="tracking-tight text-5xl font-black leading-tight min-w-72">
                Get in Touch
            </h2>
            <p className="text-gray-500 text-lg font-normal leading-relaxed">
                Have questions or feedback? We'd love to hear from you. Fill out
                the form, and we'll get back to you as soon as possible.
            </p>

            <form className="mt-6 space-y-6 w-full">
                <div>
                    <label
                        className="block text-sm font-medium leading-normal pb-1.5"
                        for="name"
                    >
                        Full Name
                    </label>
                    <input
                        className="text-gray-500 form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg focus:outline-0 focus:ring-2 border border-[#dfe0e2] bg-white focus:border-[var(--primary-color)] h-12 placeholder:text-[var(--text-secondary)] px-4 text-base font-normal leading-normal transition-colors"
                        id="name"
                        name="name"
                        placeholder="e.g. Juan Baltazar"
                        type="text"
                        onChange={handleFormData}
                    />
                    {errors.name && (
                        <p className="text-red-500 text-[11px] mt-1 font-normal leading-normal">
                            {errors.name}
                        </p>
                    )}
                </div>
                <div>
                    <label
                        className="block text-sm font-medium leading-normal pb-1.5"
                        for="email"
                    >
                        Email Address
                    </label>
                    <input
                        className="text-gray-500 form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg focus:outline-0 focus:ring-2 border border-[#dfe0e2] bg-white focus:border-gray-500 h-12 placeholder:text-[var(--text-secondary)] px-4 text-base font-normal leading-normal transition-colors"
                        id="email"
                        name="email"
                        placeholder="your.email@example.com"
                        type="email"
                        onChange={handleFormData}
                    />
                    {errors.email && (
                        <p className="text-red-500 text-[11px] mt-1 font-normal leading-normal">
                            {errors.email}
                        </p>
                    )}
                </div>
                <div>
                    <label
                        className="block text-sm font-medium leading-normal pb-1.5"
                        for="subject"
                    >
                        Subject
                    </label>
                    <input
                        className="text-gray-500 form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg focus:outline-0 focus:ring-2 border border-[#e3d4d5] bg-white focus:border-gray-500 h-12 placeholder:text-[var(--text-secondary)] px-4 text-base font-normal leading-normal transition-colors"
                        id="subject"
                        name="subject"
                        placeholder="How can we help?"
                        type="text"
                        onChange={handleFormData}
                    />
                    {errors.subject && (
                        <p className="text-red-500 text-[11px] mt-1 font-normal leading-normal">
                            {errors.subject}
                        </p>
                    )}
                </div>
                <div className="flex flex-wrap justify-between items-center gap-4">
                    <div>
                        <label
                            className="block text-sm font-medium leading-normal pb-1.5"
                            for="captcha"
                        >
                            Captcha
                        </label>
                        <input
                            className="text-gray-500 form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg focus:outline-0 focus:ring-2 border border-[#e3d4d5] bg-white focus:border-[var(--primary-color)] h-12 placeholder:text-[var(--text-secondary)] px-4 text-base font-normal leading-normal transition-colors"
                            id="captcha"
                            name="captcha"
                            placeholder="Enter captcha"
                            type="text"
                            onChange={handleFormData}
                        />
                        {errors.captcha && (
                            <p className="text-red-500 text-[11px] mt-1 font-normal leading-normal">
                                {errors.captcha}
                            </p>
                        )}
                    </div>
                    <Captcha ref={captchaRef} />
                </div>
                <div>
                    <label
                        className="block text-sm font-medium leading-normal pb-1.5"
                        for="message"
                    >
                        Message
                    </label>
                    <textarea
                        className="text-gray-500 form-textarea flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg focus:outline-0 focus:ring-2 border border-[#e3d4d5] bg-white focus:border-[var(--primary-color)] min-h-32 placeholder:text-[var(--text-secondary)] p-4 text-base font-normal leading-normal transition-colors"
                        id="message"
                        name="message"
                        placeholder="Write your message here..."
                        rows="5"
                        onChange={handleFormData}
                    ></textarea>
                    {errors.message && (
                        <p className="text-red-500 text-[11px] mt-1 font-normal leading-normal">
                            {errors.message}
                        </p>
                    )}
                </div>
                <div>
                    <button
                        className="flex w-full md:w-auto min-w-[120px] cursor-pointer items-center justify-center overflow-hidden rounded-sm h-12 px-6 bg-red-600 hover:bg-red-700 text-white text-base font-semibold leading-normal tracking-[0.015em] transition-colors shadow-sm hover:shadow-md"
                        type="button"
                        onClick={handleSubmit}
                    >
                        <span className="truncate">Send Message</span>
                    </button>
                </div>
            </form>
        </section>
    );
}
