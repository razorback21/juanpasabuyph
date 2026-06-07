import React, { useState, forwardRef, useImperativeHandle } from "react";
import FsLightbox from "fslightbox-react";

const Lightbox = forwardRef(({ sources }, ref) => {
    const [slide, setSlide] = useState(0);
    const [toggler, setToggler] = useState(false);

    useImperativeHandle(ref, () => ({
        open: (index = 0) => {
            console.log('Lightbox open called with index:', index);
            setSlide(index);
            setToggler(!toggler);
        },
        close: () => {
            console.log('Lightbox close called');
            setToggler(!toggler);
        },
        goTo: (index) => {
            console.log('Lightbox goTo called with index:', index);
            setSlide(index);
            setToggler(!toggler);
        },
    }));

    return (
        <FsLightbox
            toggler={toggler}
            sources={sources}
            slide={slide + 1}
        />
    );
});

export default Lightbox;
