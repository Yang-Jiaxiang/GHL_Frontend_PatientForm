import { useState } from "react";
import {
    Select,
    MenuItem,
    InputLabel,
    Button,
    TextField,
    FormControl,
} from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import { format } from "date-fns";
import { QRCode } from "react-qr-svg";

import Format from "./Format.json";

const Form = () => {
    const [userData, setUserData] = useState({});
    const [value, setValue] = useState(new Date("2014-08-18T21:11:54"));
    const style = {
        marginTop: "20px",
        textAlign: "center",
    };

    return (
        <div style={style}>
            <div>
                {Format.Format.map((Format) => {
                    if (Format.formtype === "Text") {
                        return (
                            <TextField
                                key={Format.name}
                                type={Format.type}
                                id="ID"
                                label={Format.label}
                                variant="outlined"
                                sx={{
                                    width: "60%",
                                    marginTop: "20px",
                                }}
                                required={Format.required}
                                onChange={(event) => {
                                    setUserData({
                                        ...userData,
                                        [Format.name]: event.target.value,
                                    });
                                }}
                            />
                        );
                    }

                    if (Format.formtype === "Select") {
                        return (
                            <div>
                                <FormControl
                                    sx={{
                                        alignItems: "center",
                                        width: "60%",
                                        marginTop: "20px",
                                    }}
                                    key={Format.name}
                                >
                                    <InputLabel id="demo-simple-select-label">
                                        {Format.name}
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        value={Format[Format.name]}
                                        key={Format.name}
                                        sx={{
                                            width: "100%",
                                        }}
                                        onChange={(event) => {
                                            setUserData({
                                                ...userData,
                                                [Format.name]:
                                                    event.target.value,
                                            });
                                        }}
                                    >
                                        {Format.label.map((label) => {
                                            return (
                                                <MenuItem
                                                    value={label.name}
                                                    key={label.name}
                                                >
                                                    {label.label}
                                                </MenuItem>
                                            );
                                        })}
                                    </Select>
                                </FormControl>
                            </div>
                        );
                    }

                    if (Format.formtype === "Time") {
                        return (
                            <div style={{ marginTop: "20px" }}>
                                <LocalizationProvider
                                    dateAdapter={AdapterDateFns}
                                >
                                    <DesktopDatePicker
                                        label={Format.label}
                                        inputFormat="yyyy/MM/dd"
                                        value={value}
                                        onChange={(newValue) => {
                                            let Time = format(
                                                newValue,
                                                "yyyy-MM-dd"
                                            );
                                            setValue(newValue);
                                            setUserData({
                                                ...userData,
                                                [Format.name]: Time,
                                            });
                                        }}
                                        renderInput={(params) => (
                                            <TextField {...params} />
                                        )}
                                    />
                                </LocalizationProvider>
                            </div>
                        );
                    }
                })}
            </div>

            <Button
                sx={{
                    width: "60%",
                    marginTop: "20px",
                    fontSize: "20px",
                }}
                variant="contained"
                onClick={() => console.log(userData)}
            >
                產生條碼
            </Button>

            <div className="QRcode" styel="display: none">
                <QRCode
                    level="Q"
                    style={{ width: 256 }}
                    value={JSON.stringify(userData)}
                />
            </div>
        </div>
    );
};

export default Form;
