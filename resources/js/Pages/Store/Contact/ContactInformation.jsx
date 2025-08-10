export default function ContactInformation() {
    return (
        <section>
            <div className="mb-7">
                <h3 className="text-2xl font-bold leading-tight tracking-[-0.015em]">
                    Contact Information
                </h3>
                <div className="mt-4 space-y-3">
                    <p className="flex items-center gap-3 text-base font-normal leading-normal">
                        <svg
                            fill="currentColor"
                            height="20"
                            viewBox="0 0 256 256"
                            width="20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M224,48H32a8,8,0,0,0-8,8V192a8,8,0,0,0,8,8H224a8,8,0,0,0,8-8V56A8,8,0,0,0,224,48Zm-8,16L128,128,40,64Zm0,128H40V80l82.67,55.11a8,8,0,0,0,9.32,0L216,80Z"></path>
                        </svg>
                        <a
                            href="mailto:johndonellsustiguer@gmail.com"
                            className="hover:text-[#e92933] hover:underline"
                        >
                            johndonellsustiguer@gmail.com
                        </a>
                    </p>
                    <p className="flex items-center gap-3 text-base font-normal leading-normal">
                        <svg
                            fill="currentColor"
                            height="20"
                            viewBox="0 0 256 256"
                            width="20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M222.62,168.69,199.05,145.12a24,24,0,0,0-33.94,0l-19.6,19.6a8,8,0,0,1-7.6,2.32C112,159.2,88.8,136,81,110.08a8,8,0,0,1,2.32-7.6l19.6-19.6a24,24,0,0,0,0-33.94L81.31,33.38a24,24,0,0,0-33.94,0L33,47.78A24,24,0,0,0,24,67.16C24,157.62,98.38,232,188.84,232a24,24,0,0,0,19.38-9l14.4-14.4A24,24,0,0,0,222.62,168.69ZM192,216c-79.4,0-144-64.6-144-144a8,8,0,0,1,3-6.34l14.4-14.4a8,8,0,0,1,11.31,0l23.57,23.57a8,8,0,0,1,0,11.31l-19.6,19.6a24,24,0,0,0-6.95,22.78C90,151.26,104.74,166,127.22,178a24,24,0,0,0,22.78-6.95l19.6-19.6a8,8,0,0,1,11.31,0l23.57,23.57a8,8,0,0,1,0,11.31l-14.4,14.4A8,8,0,0,1,192,216Z"></path>
                        </svg>
                        <span>+971561854485</span>
                    </p>
                </div>
            </div>
            <div>
                <div>
                    <h3 className="text-2xl font-bold leading-tight tracking-[-0.015em] mb-4">
                        Our Location
                    </h3>
                    <div className="aspect-video w-full overflow-hidden rounded-xl shadow-md">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125759.21790223029!2d122.49021340895536!3d10.720321225892454!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33aee538f5949953%3A0xfc3237e476112591!2sIloilo%20City%2C%20Iloilo%2C%20Philippines!5e0!3m2!1sen!2s!4v1710400561983!5m2!1sen!2s&z=12"
                            className="h-full w-full border-0"
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
            </div>
        </section>
    );
}
