import React, { useState, forwardRef, useImperativeHandle } from "react";
import FsLightbox from "fslightbox-react";

const Lightbox = forwardRef(({ sources }, ref) => {
    const [slide, setSlide] = useState(0);
    const [open, setOpen] = useState(false);
    const [key, setKey] = useState(0);

    useImperativeHandle(ref, () => ({
        open: (index = 0) => {
            setSlide(index);
            setKey((k) => k + 1);
            setOpen(true);
        },
        close: () => setOpen(false),
        goTo: (index) => {
            setSlide(index);
            setKey((k) => k + 1);
            setOpen(true);
        },
    }));

    return (
        <FsLightbox
            key={key}
            toggler={open}
            sources={sources}
            slide={slide + 1}
            onClose={() => setOpen(false)}
        />
    );
});

export default Lightbox;
