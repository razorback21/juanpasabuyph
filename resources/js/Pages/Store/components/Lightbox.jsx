import React, { useState, forwardRef, useImperativeHandle } from "react";
import FsLightbox from "fslightbox-react";

const Lightbox = forwardRef(({ sources, slide }, ref) => {
    const [toggler, setToggler] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);

    useImperativeHandle(ref, () => ({
        open: (index = 0) => {
            setCurrentSlide(index);
            setToggler(true);
        },
        close: () => setToggler(false),
        toggle: () => {
            if (!toggler) setCurrentSlide(0);
            setToggler(!toggler);
        },
        goTo: (index) => {
            setCurrentSlide(index);
            setToggler(true);
        },
    }));

    return (
        <>
            <FsLightbox
                toggler={toggler}
                sources={sources}
                slide={currentSlide + 1}
            />
        </>
    );
});

export default Lightbox;
