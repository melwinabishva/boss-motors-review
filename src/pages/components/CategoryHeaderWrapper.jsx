// CategoryHeaderWrapper.js
import React, { useEffect, useState } from "react";
import CategoryHeader from "./CategoryHeader";

const CategoryHeaderWrapper = (props) => {
    const [headerHeight, setHeaderHeight] = useState(0);

    useEffect(() => {
        const header = document.getElementById("main-header");
        if (header) {
            setHeaderHeight(header.offsetHeight);
        }

        const handleResize = () => {
            if (header) setHeaderHeight(header.offsetHeight);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div
            className="sticky bg-white z-30 shadow-sm"
            style={{ top: `${headerHeight}px` }}
        >
            <CategoryHeader {...props} />
        </div>
    );
};

export default CategoryHeaderWrapper;
