import Typography from "@mui/material/Typography";
import { HamburgerMenu, RefineThemedLayoutV2HeaderProps } from "@refinedev/mui";
import React from "react";


export const Title: React.FC<RefineThemedLayoutV2HeaderProps> = ({
    sticky = true,
}) => {

    return (
        <Typography
            sx={{
                display: {
                    xs: "none",
                    sm: "inline-block",
                },
            }}
            variant="h1"
        >
            Quem
        </Typography>
    );
};
