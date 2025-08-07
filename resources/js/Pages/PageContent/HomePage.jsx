import { useRef } from "react";
import { Button } from "@/components/ui/button";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import Progressbar from "@/components/ProgressBar";

export default function HomePage({ heroImage }) {
    const progressBarRef = useRef(null);
    const imageFileRef = useRef(null);

    function handleHeroImageChange(e) {
        uploadImageHandler(e);
    }

    const uploadImageHandler = (e) => {
        e.preventDefault();

        const file = imageFileRef.current.files[0];
        if (!file) {
            alertRef.current.open({
                title: "Error",
                description: "Please select an image",
            });
            return;
        }

        const formData = new FormData();
        formData.append("image", file);

        router.post(route("home-assets.store"), formData, {
            forceFormData: true,
            onSuccess: () => {
                // Clear the file input
                imageFileRef.current.value = "";
                toast.success("Image uploaded successfully!");
            },
            onError: (errors) => {
                alertRef.current.open({
                    title: "Error",
                    description: `Failed to upload image. ${props.errors.image}`,
                });
                progressBarRef.current?.show(false);
                progressBarRef.current?.reset();
            },
            onStart: () => {
                progressBarRef.current?.reset();
            },
            onProgress: (event) => {
                console.log(event);
                progressBarRef.current?.show(true);
                progressBarRef.current?.setValue(event.percentage || 0);
            },
        });
    };

    return (
        <AuthenticatedLayout header="Home Page">
            <Head title="Home Page" />
            <Toaster />

            <div className="flex flex-col px-4 lg:px-6">
                <div className="flex justify-between items-center">
                    <section
                        className="w-full @container relative"
                        role="banner"
                    >
                        <div className="absolute top-12 right-12">
                            <Button
                                variant="destructive"
                                onClick={() => {
                                    document
                                        .querySelector('input[type="file"]')
                                        .click();
                                }}
                            >
                                Upload new Image
                            </Button>
                            <input
                                ref={imageFileRef}
                                type="file"
                                className="hidden"
                                onChange={handleHeroImageChange}
                            />
                        </div>
                        <div
                            className="bg-cover bg-no-repeat bg-center flex flex-col justify-end overflow-hidden rounded-xl min-h-[400px] sm:min-h-[500px] shadow-lg "
                            style={{
                                backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.1) 40%), url("${heroImage}")`,
                            }}
                        ></div>
                    </section>
                </div>
                <div className="mt-4 mx-auto">
                    <Progressbar />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
