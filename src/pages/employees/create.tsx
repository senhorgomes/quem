import { Create, useAutocomplete } from "@refinedev/mui";
import { Box, TextField, Autocomplete } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { IResourceComponentsProps } from "@refinedev/core";
import { Controller } from "react-hook-form";

export const EmployeeCreate: React.FC<IResourceComponentsProps> = () => {
    const {
        saveButtonProps,
        refineCore: { formLoading },
        register,
        control,
        formState: { errors },
    } = useForm();

    const { autocompleteProps: positionAutocompleteProps } = useAutocomplete({
        resource: "positions",
    });

    const { autocompleteProps: teamAutocompleteProps } = useAutocomplete({
        resource: "teams",
    });

    return (
        <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
            <Box
                component="form"
                sx={{ display: "flex", flexDirection: "column" }}
                autoComplete="off"
            >
                {/*
                    DatePicker component is not included in "@refinedev/mui" package.
                    To use a <DatePicker> component, you can follow the official documentation for Material UI.

                    Docs: https://mui.com/x/react-date-pickers/date-picker/#basic-usage
                */}
                <TextField
                    {...register("created_at", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.created_at}
                    helperText={(errors as any)?.created_at?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    label="Created At"
                    name="created_at"
                />
                <TextField
                    {...register("employee_firstname", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.employee_firstname}
                    helperText={(errors as any)?.employee_firstname?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="text"
                    label="Employee Firstname"
                    name="employee_firstname"
                />
                <TextField
                    {...register("employee_lastname", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.employee_lastname}
                    helperText={(errors as any)?.employee_lastname?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="text"
                    label="Employee Lastname"
                    name="employee_lastname"
                />
                <Controller
                    control={control}
                    name="position_id"
                    rules={{ required: "This field is required" }}
                    // eslint-disable-next-line
                    defaultValue={null as any}
                    render={({ field }) => (
                        <Autocomplete
                            {...positionAutocompleteProps}
                            {...field}
                            onChange={(_, value) => {
                                field.onChange(value?.id ?? value);
                            }}
                            getOptionLabel={(item) => {
                              console.log(item)
                                return (
                                    positionAutocompleteProps?.options?.find(
                                        (p) =>
                                            p?.id?.toString() ===
                                            (item?.id ?? item)?.toString(),
                                    )?.position_name ?? ""
                                );
                            }}
                            isOptionEqualToValue={(option, value) =>
                                value === undefined ||
                                option?.id?.toString() ===
                                    (value?.id ?? value)?.toString()
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Position"
                                    margin="normal"
                                    variant="outlined"
                                    error={!!(errors as any)?.position_id}
                                    helperText={
                                        (errors as any)?.position_id?.message
                                    }
                                    required
                                />
                            )}
                        />
                    )}
                />
                <TextField
                    {...register("email", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.email}
                    helperText={(errors as any)?.email?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="email"
                    label="Email"
                    name="email"
                />
                <TextField
                    {...register("phone_number", {
                        required: "This field is required",
                        valueAsNumber: true,
                    })}
                    error={!!(errors as any)?.phone_number}
                    helperText={(errors as any)?.phone_number?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="number"
                    label="Phone Number"
                    name="phone_number"
                />
                <Controller
                    control={control}
                    name="team_id"
                    rules={{ required: "This field is required" }}
                    // eslint-disable-next-line
                    defaultValue={null as any}
                    render={({ field }) => (
                        <Autocomplete
                            {...teamAutocompleteProps}
                            {...field}
                            onChange={(_, value) => {
                                field.onChange(value?.id ?? value);
                            }}
                            getOptionLabel={(item) => {
                                return (
                                    teamAutocompleteProps?.options?.find(
                                        (p) =>
                                            p?.id?.toString() ===
                                            (item?.id ?? item)?.toString(),
                                    )?.team_name ?? ""
                                );
                            }}
                            isOptionEqualToValue={(option, value) =>
                                value === undefined ||
                                option?.id?.toString() ===
                                    (value?.id ?? value)?.toString()
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Team"
                                    margin="normal"
                                    variant="outlined"
                                    error={!!(errors as any)?.team_id}
                                    helperText={
                                        (errors as any)?.team_id?.message
                                    }
                                    required
                                />
                            )}
                        />
                    )}
                />
            </Box>
        </Create>
    );
};
