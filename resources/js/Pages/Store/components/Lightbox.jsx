import React, { useState, forwardRef, useImperativeHandle } from "react";
import FsLightbox from "fslightbox-react";

const Lightbox = forwardRef(({ sources }, ref) => {
    const [toggler, setToggler] = useState(false);

    useImperativeHandle(ref, () => ({
        open: () => setToggler(true),
        close: () => setToggler(false),
        toggle: () => setToggler(!toggler),
    }));

    return (
        <>
            <FsLightbox toggler={toggler} sources={sources} />
        </>
    );
});

export default Lightbox;
